#!/usr/bin/env python3
"""
Retry failed cells for a given version against that version's docs.

Failure = generated=false OR rendered=false.
Version map:
  old -> main (upstream baseline, no Recipes)
  v1  -> recipes-v1
  v2  -> recipes-v2
  v3  -> recipes-v3
  v4  -> recipes-v4

Usage:
  python3 scripts/retry_failures.py old
  python3 scripts/retry_failures.py v1
  ...
"""
import json
import os
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
FORK_ROOT = ROOT.parent
PROMPTS = {p["id"]: p for p in json.loads((ROOT / "prompts.json").read_text())["prompts"]}

VERSION_TO_REF = {
    "old": "main",
    "v1":  "recipes-v1",
    "v2":  "recipes-v2",
    "v3":  "recipes-v3",
    "v4":  "recipes-v4",
    "v5":  "recipes-v5",
}

# Where each version's manifest + renders live.
# (manifest_path, key_suffix, renders_dir)
VERSION_TO_LAYOUT = {
    "old": (ROOT / "manifest.json",    "old", ROOT / "renders" / "old"),
    "v1":  (ROOT / "manifest.json",    "new", ROOT / "renders" / "new"),
    "v2":  (ROOT / "manifest_v2.json", "v2",  ROOT / "renders" / "v2"),
    "v3":  (ROOT / "manifest_v3.json", "v3",  ROOT / "renders" / "v3"),
    "v4":  (ROOT / "manifest_v4.json", "v4",  ROOT / "renders" / "v4"),
    "v5":  (ROOT / "manifest_v5.json", "v5",  ROOT / "renders" / "v5"),
}

MODELS = {
    "claude_sonnet_46": {"model_id": "anthropic/claude-sonnet-4.6", "max_tokens": 16000},
    "gpt_54":           {"model_id": "openai/gpt-5.4", "max_tokens": 16000},
    "gemini_31_pro":    {"model_id": "google/gemini-3.1-pro-preview", "max_tokens": 16000},
    "qwen3_235b":       {"model_id": "qwen/qwen3-235b-a22b-2507", "max_tokens": 16000},
    "gemma3_27b":       {"model_id": "google/gemma-3-27b-it", "max_tokens": 16000},
}

STRUCTURAL = """Write a COMPLETE p5.js sketch using the p5 build of p5.brush (not standalone).

Requirements:
1. Use `createCanvas(600, 600, WEBGL)` in `setup()`.
2. Call `brush.scaleBrushes(3)` in setup.
3. Use `background("#fffaf3")` for warm paper, or another warm paper tone you choose.
4. Use `translate(-width/2, -height/2)` at the start of `draw()`.
5. End `draw()` with `noLoop()`.
6. Use ONLY these brush names: 2B, HB, 2H, cpencil, pen, rotring, spray, marker, charcoal, pastel, crayon. No custom brushes.
7. Output ONLY the JavaScript code — no markdown fences, no commentary, no explanation.

Canvas is 600×600. Scale your composition accordingly."""


def git_show(ref: str, path: str) -> str:
    r = subprocess.run(
        ["git", "show", f"{ref}:{path}"],
        cwd=str(FORK_ROOT), capture_output=True, text=True, check=True,
    )
    return r.stdout


def load_system_for(version: str) -> str:
    ref = VERSION_TO_REF[version]
    llms = git_show(ref, "llms.txt")
    readme = git_show(ref, "README.md")
    return (
        "You are a coding assistant helping a creative-coder use p5.brush, "
        "a p5.js drawing library. Use the library docs below when generating code.\n\n"
        "=== README.md ===\n" + readme + "\n\n"
        "=== llms.txt ===\n" + llms
    )


def load_key() -> str:
    env_path = Path(os.path.expanduser("~/projects/work/websim/party/.env"))
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip()
    return os.environ.get("OPENROUTER_API_KEY", "")


def generate_one(key, cfg, system, user, js_path, api_key):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "HTTP-Referer": "https://github.com/kickingkeys/p5.brush",
        "Content-Type": "application/json",
    }
    payload = {
        "model": cfg["model_id"],
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "max_tokens": cfg["max_tokens"],
        "temperature": 0.7,
    }
    try:
        resp = httpx.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers, json=payload, timeout=240,
        )
        data = resp.json()
        if "choices" not in data:
            return key, False, str(data.get("error", data))[:200], None
        content = data["choices"][0]["message"]["content"] or ""
        content = re.sub(r"^```(?:javascript|js)?\n?", "", content.strip(), flags=re.MULTILINE)
        content = re.sub(r"\n?```\s*$", "", content.strip())
        if len(content) < 50:
            return key, False, "Empty/short response", None
        js_path.parent.mkdir(parents=True, exist_ok=True)
        js_path.write_text(content)
        return key, True, len(content.splitlines()), data.get("usage", {})
    except Exception as e:
        return key, False, f"{type(e).__name__}: {str(e)[:150]}", None


def render_one(js_path, png_path):
    try:
        result = subprocess.run(
            ["node", str(ROOT / "scripts" / "render_local.js"), str(js_path), str(png_path)],
            capture_output=True, text=True, timeout=60,
        )
        line = (result.stdout.strip().splitlines() or [""])[-1]
        try:
            status = json.loads(line)
        except json.JSONDecodeError:
            return False, f"non-json output: {result.stdout[:120]}"
        if status.get("status") == "ok" and png_path.exists() and png_path.stat().st_size > 3000:
            errs = status.get("errors", [])
            return True, (errs[0][:200] if errs else "")
        return False, status.get("message", "") or "; ".join(status.get("errors", []))[:200]
    except subprocess.TimeoutExpired:
        return False, "timeout"
    except Exception as e:
        return False, f"{type(e).__name__}: {str(e)[:150]}"


def retry_version(version: str) -> dict:
    manifest_path, suffix, renders_dir = VERSION_TO_LAYOUT[version]
    manifest = json.loads(manifest_path.read_text())

    failed = [
        (k, v) for k, v in manifest.items()
        if f"__{suffix}__" in k and (not v.get("generated") or not v.get("rendered"))
    ]
    if not failed:
        print(f"[{version}] no failures")
        return {"version": version, "failed_before": 0, "gen_ok": 0, "render_ok": 0, "still_failed": []}

    print(f"\n{'='*60}\n[{version}] retrying {len(failed)} failed cells (ref={VERSION_TO_REF[version]})\n{'='*60}")
    for k, v in failed:
        g = "G" if v.get("generated") else "g"
        r = "R" if v.get("rendered") else "r"
        print(f"  before  [{g}{r}] {k}")

    api_key = load_key()
    if not api_key:
        print("ERROR: no OPENROUTER_API_KEY", file=sys.stderr)
        sys.exit(1)
    system = load_system_for(version)
    print(f"\nsystem prompt: {len(system)} chars")

    # Phase 1: regenerate every failed cell (fresh gen, even if previous gen succeeded but render failed —
    # retrying the exact same code against the same renderer will just fail again).
    print(f"\nPHASE 1 — regenerate {len(failed)} cells (6 parallel)")
    tasks = []
    for k, _ in failed:
        # key format: <model>__<suffix>__<pid>
        parts = k.split("__")
        if len(parts) != 3:
            continue
        model, _, pid = parts
        if model not in MODELS or pid not in PROMPTS:
            continue
        js_path = renders_dir / f"{model}__{pid}.js"
        user = PROMPTS[pid]["text"] + "\n\n" + STRUCTURAL
        tasks.append((k, MODELS[model], system, user, js_path))

    gen_ok = 0
    with ThreadPoolExecutor(max_workers=6) as ex:
        futures = {ex.submit(generate_one, k, c, s, u, j, api_key): k for (k, c, s, u, j) in tasks}
        for i, fut in enumerate(as_completed(futures), 1):
            key, ok, info, usage = fut.result()
            js_path = next(j for (k, _, _, _, j) in tasks if k == key)
            if ok:
                gen_ok += 1
                manifest[key] = {
                    "generated": True, "lines": info, "js_path": str(js_path),
                    "js_exists": True, "usage": usage, "retry": True,
                }
                print(f"  [{i}/{len(tasks)}] ✓ gen {key} ({info} lines)")
            else:
                manifest[key] = {
                    "generated": False, "error": str(info), "js_path": str(js_path),
                    "js_exists": False, "retry": True,
                }
                print(f"  [{i}/{len(tasks)}] ✗ gen {key}: {info}")

    manifest_path.write_text(json.dumps(manifest, indent=2))

    # Phase 2: render everything that now has code
    to_render = [k for k, _ in failed if manifest.get(k, {}).get("generated")]
    print(f"\nPHASE 2 — render {len(to_render)} sequential")
    render_ok = 0
    for i, key in enumerate(to_render, 1):
        entry = manifest[key]
        js_path = Path(entry["js_path"])
        png_path = js_path.with_suffix(".png")
        ok, note = render_one(js_path, png_path)
        entry["rendered"] = ok
        entry["render_note"] = note
        entry["png_path"] = str(png_path) if ok else None
        entry["render_size"] = png_path.stat().st_size if png_path.exists() else 0
        if ok:
            render_ok += 1
        status = "✓" if ok else "✗"
        print(f"  [{i}/{len(to_render)}] {status} render {key} ({entry['render_size']}B) {note[:80]}")

    manifest_path.write_text(json.dumps(manifest, indent=2))

    still = [k for k, _ in failed if not (manifest.get(k, {}).get("generated") and manifest.get(k, {}).get("rendered"))]
    print(f"\n[{version}] summary: gen {gen_ok}/{len(tasks)} · render {render_ok}/{len(to_render)} · still failed {len(still)}")
    return {
        "version": version,
        "failed_before": len(failed),
        "gen_ok": gen_ok,
        "render_ok": render_ok,
        "still_failed": still,
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: retry_failures.py <old|v1|v2|v3|v4|all>", file=sys.stderr)
        sys.exit(1)
    target = sys.argv[1]
    versions = ["old", "v1", "v2", "v3", "v4"] if target == "all" else [target]

    results = []
    for v in versions:
        if v not in VERSION_TO_LAYOUT:
            print(f"unknown version: {v}", file=sys.stderr)
            continue
        results.append(retry_version(v))

    print(f"\n{'='*60}\nOVERALL RETRY SUMMARY\n{'='*60}")
    for r in results:
        print(f"  {r['version']:<4}  before={r['failed_before']}  gen_ok={r['gen_ok']}  render_ok={r['render_ok']}  still_failed={len(r['still_failed'])}")
        for k in r["still_failed"]:
            print(f"       still: {k}")
