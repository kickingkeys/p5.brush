#!/usr/bin/env python3
"""
Phase 4 — Controlled A/B render test.

12 prompts × N models × 2 conditions (old = upstream docs, new = docs with Recipes)
× 1 seed. Code generation in parallel, rendering sequential.

Usage:
  python3 scripts/run_ab.py           # pilot: claude_sonnet_46 only
  python3 scripts/run_ab.py --all     # full 5-model run
  python3 scripts/run_ab.py --models claude_sonnet_46,gpt_54
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
FORK_ROOT = ROOT.parent
PROMPTS = json.loads((ROOT / "prompts.json").read_text())
MANIFEST_PATH = ROOT / "manifest.json"
RENDERS = ROOT / "renders"


def git_show(ref: str, path: str) -> str:
    r = subprocess.run(
        ["git", "show", f"{ref}:{path}"],
        cwd=str(FORK_ROOT), capture_output=True, text=True, check=True,
    )
    return r.stdout


def load_conditions() -> dict:
    # old = upstream baseline
    old_llms = git_show("main", "llms.txt")
    old_readme = git_show("main", "README.md")
    # new = forked with Recipes
    new_llms = git_show("cookbook-recipes", "llms.txt")
    new_readme = git_show("cookbook-recipes", "README.md")

    def fmt(readme: str, llms: str) -> str:
        return (
            "You are a coding assistant helping a creative-coder use p5.brush, "
            "a p5.js drawing library. Use the library docs below when generating code.\n\n"
            "=== README.md ===\n" + readme + "\n\n"
            "=== llms.txt ===\n" + llms
        )

    return {"old": fmt(old_readme, old_llms), "new": fmt(new_readme, new_llms)}


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


MODELS = {
    "claude_sonnet_46": {
        "model_id": "anthropic/claude-sonnet-4.6",
        "max_tokens": 16000,
    },
    "gpt_54": {
        "model_id": "openai/gpt-5.4",
        "max_tokens": 16000,
    },
    "gemini_31_pro": {
        "model_id": "google/gemini-3.1-pro-preview",
        "max_tokens": 16000,
    },
    "qwen3_235b": {
        "model_id": "qwen/qwen3-235b-a22b-2507",
        "max_tokens": 16000,
    },
    "gemma3_27b": {
        "model_id": "google/gemma-3-27b-it",
        "max_tokens": 16000,
    },
}


def load_key() -> str:
    env_path = Path(os.path.expanduser("~/projects/work/websim/party/.env"))
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip()
    return os.environ.get("OPENROUTER_API_KEY", "")


def load_manifest() -> dict:
    if MANIFEST_PATH.exists():
        return json.loads(MANIFEST_PATH.read_text())
    return {}


def save_manifest(m: dict) -> None:
    MANIFEST_PATH.write_text(json.dumps(m, indent=2))


def generate_one(key: str, cfg: dict, system: str, user: str, js_path: Path, api_key: str) -> tuple:
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
        # strip markdown fences if any
        content = re.sub(r"^```(?:javascript|js)?\n?", "", content.strip(), flags=re.MULTILINE)
        content = re.sub(r"\n?```\s*$", "", content.strip())
        if len(content) < 50:
            return key, False, "Empty/short response", None
        js_path.parent.mkdir(parents=True, exist_ok=True)
        js_path.write_text(content)
        return key, True, len(content.splitlines()), data.get("usage", {})
    except Exception as e:
        return key, False, f"{type(e).__name__}: {str(e)[:150]}", None


def render_one(js_path: Path, png_path: Path) -> tuple[bool, str]:
    try:
        result = subprocess.run(
            ["node", str(ROOT / "scripts" / "render_local.js"), str(js_path), str(png_path)],
            capture_output=True, text=True, timeout=60,
        )
        # render_local prints a JSON status line last
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


def run(selected_models: dict) -> None:
    api_key = load_key()
    if not api_key:
        print("ERROR: no OPENROUTER_API_KEY", file=sys.stderr)
        sys.exit(1)

    print(f"Loading conditions from git refs (main + cookbook-recipes)...")
    conditions = load_conditions()
    print(f"  old system prompt: {len(conditions['old'])} chars")
    print(f"  new system prompt: {len(conditions['new'])} chars")

    manifest = load_manifest()

    # Build task list
    tasks = []
    for model_name, cfg in selected_models.items():
        for cond_name in ("old", "new"):
            out_dir = RENDERS / cond_name
            out_dir.mkdir(parents=True, exist_ok=True)
            for prompt in PROMPTS["prompts"]:
                key = f"{model_name}__{cond_name}__{prompt['id']}"
                if manifest.get(key, {}).get("generated") and manifest[key].get("js_exists", True):
                    js_path = Path(manifest[key].get("js_path", "")) if manifest[key].get("js_path") else None
                    if js_path and js_path.exists():
                        continue
                js_path = out_dir / f"{model_name}__{prompt['id']}.js"
                user = prompt["text"] + "\n\n" + STRUCTURAL
                tasks.append((key, cfg, conditions[cond_name], user, js_path))

    print(f"\nPHASE 1 — code generation ({len(tasks)} calls, 6 parallel)")
    if tasks:
        with ThreadPoolExecutor(max_workers=6) as ex:
            futures = {
                ex.submit(generate_one, k, c, s, u, j, api_key): k
                for (k, c, s, u, j) in tasks
            }
            for i, fut in enumerate(as_completed(futures), 1):
                key, ok, info, usage = fut.result()
                js_path = next(j for (k, _, _, _, j) in tasks if k == key)
                if ok:
                    manifest[key] = {
                        "generated": True, "lines": info, "js_path": str(js_path),
                        "js_exists": True, "usage": usage,
                    }
                    print(f"  [{i}/{len(tasks)}] ✓ {key} ({info} lines)")
                else:
                    manifest[key] = {
                        "generated": False, "error": str(info), "js_path": str(js_path),
                        "js_exists": False,
                    }
                    print(f"  [{i}/{len(tasks)}] ✗ {key}: {info}")
                if i % 6 == 0:
                    save_manifest(manifest)
        save_manifest(manifest)

    to_render = [k for k, v in manifest.items() if v.get("generated") and not v.get("rendered")]
    print(f"\nPHASE 2 — rendering ({len(to_render)} sequential)")
    for i, key in enumerate(to_render, 1):
        entry = manifest[key]
        js_path = Path(entry["js_path"])
        png_path = js_path.with_suffix(".png")
        ok, note = render_one(js_path, png_path)
        entry["rendered"] = ok
        entry["render_note"] = note
        entry["png_path"] = str(png_path) if ok else None
        entry["render_size"] = png_path.stat().st_size if png_path.exists() else 0
        status = "✓" if ok else "✗"
        print(f"  [{i}/{len(to_render)}] {status} {key} ({entry['render_size']}B) {note[:80]}")
        if i % 6 == 0:
            save_manifest(manifest)
    save_manifest(manifest)

    print(f"\n{'='*60}\nRUN COMPLETE — {datetime.now().isoformat()}\n{'='*60}")
    gen = sum(1 for v in manifest.values() if v.get("generated"))
    ren = sum(1 for v in manifest.values() if v.get("rendered"))
    print(f"Total: {gen} generated, {ren} rendered, {gen - ren} render failures")
    print(f"\nPer model:")
    for m in selected_models:
        old_ok = sum(1 for k, v in manifest.items() if k.startswith(f"{m}__old__") and v.get("rendered"))
        new_ok = sum(1 for k, v in manifest.items() if k.startswith(f"{m}__new__") and v.get("rendered"))
        old_gen = sum(1 for k, v in manifest.items() if k.startswith(f"{m}__old__") and v.get("generated"))
        new_gen = sum(1 for k, v in manifest.items() if k.startswith(f"{m}__new__") and v.get("generated"))
        print(f"  {m:20s}  old: {old_gen}/12 gen, {old_ok}/12 render   new: {new_gen}/12 gen, {new_ok}/12 render")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="run all 5 models")
    ap.add_argument("--models", default="", help="comma-separated model keys")
    args = ap.parse_args()

    if args.all:
        selected = MODELS
    elif args.models:
        selected = {k: MODELS[k] for k in args.models.split(",") if k in MODELS}
    else:
        selected = {"claude_sonnet_46": MODELS["claude_sonnet_46"]}

    print(f"Models: {list(selected)}")
    run(selected)
