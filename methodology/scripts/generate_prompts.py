#!/usr/bin/env python3
"""
Phase 3 — Blind prompt generation.

Queries Claude Opus 4.7 and GPT-5.4 independently with the same prompt,
saves both raw outputs. Dedup and final-12 selection happens by hand.

Output:
  methodology/prompts_raw.json   — both models' raw responses
"""
import json
import os
import sys
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "prompts_raw.json"

MODELS = {
    "opus_47": {
        "endpoint": "https://openrouter.ai/api/v1/chat/completions",
        "model_id": "anthropic/claude-opus-4.7",
        "max_tokens": 4000,
    },
    "gpt_54": {
        "endpoint": "https://openrouter.ai/api/v1/chat/completions",
        "model_id": "openai/gpt-5.4",
        "max_tokens": 4000,
    },
}

SYSTEM = (
    "You help brainstorm small sketch ideas a generative-coder might try."
)

USER = """You're a generative artist who just discovered p5.brush — a p5.js library with natural drawing tools (pencils, charcoal, markers, watercolor fills, hatch patterns, vector fields).

Give me 12 short sketch ideas you'd ask your AI coding assistant to prototype — the kinds of generative-art / creative-coding experiments you'd explore to feel out what the library can do.

Requirements:
- Keep each idea to one or two sentences.
- Visual and non-technical (no API names).
- Concrete enough that an assistant knows what to draw (subject + style/medium cues), but open enough to leave interpretation.
- Mix: some single-medium (watercolor, charcoal, pencil, marker, colored pencil, technical pen, spray), some mixed-medium, some abstract/pattern-based, some gestural/figurative.
- Avoid photorealism and UI-style tasks. These are sketches, not illustrations of specific people/logos.

Return a JSON array of 12 strings, nothing else. No preamble, no trailing text. Just the array."""


def load_key() -> str:
    env_path = Path(os.path.expanduser("~/projects/work/websim/party/.env"))
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1]
    return os.environ.get("OPENROUTER_API_KEY", "")


def call(model_key: str, cfg: dict, api_key: str) -> dict:
    headers = {
        "Authorization": f"Bearer {api_key}",
        "HTTP-Referer": "https://github.com/kickingkeys/p5.brush",
        "Content-Type": "application/json",
    }
    payload = {
        "model": cfg["model_id"],
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": USER},
        ],
        "max_tokens": cfg["max_tokens"],
        "temperature": 0.9,
    }
    resp = httpx.post(cfg["endpoint"], headers=headers, json=payload, timeout=180)
    data = resp.json()
    if "choices" not in data:
        return {"ok": False, "error": data, "raw": None, "parsed": None}
    raw = data["choices"][0]["message"]["content"] or ""
    parsed = None
    try:
        s = raw.strip()
        if s.startswith("```"):
            s = s.split("```", 2)[1]
            if s.startswith("json"):
                s = s[4:]
            s = s.strip()
        if s.endswith("```"):
            s = s.rsplit("```", 1)[0].strip()
        parsed = json.loads(s)
    except Exception as e:
        parsed = {"parse_error": str(e)}
    return {"ok": True, "raw": raw, "parsed": parsed, "usage": data.get("usage", {})}


def main():
    api_key = load_key()
    if not api_key:
        print("ERROR: no OPENROUTER_API_KEY", file=sys.stderr)
        sys.exit(1)

    out = {"system": SYSTEM, "user": USER, "models": {}}
    for name, cfg in MODELS.items():
        print(f"→ querying {name} ({cfg['model_id']})...", flush=True)
        result = call(name, cfg, api_key)
        out["models"][name] = {"model_id": cfg["model_id"], **result}
        if result["ok"]:
            parsed = result["parsed"]
            if isinstance(parsed, list):
                print(f"  ✓ {len(parsed)} ideas")
            else:
                print(f"  ⚠ parse issue: {parsed}")
        else:
            print(f"  ✗ {result.get('error')}")

    OUT.write_text(json.dumps(out, indent=2))
    print(f"\n→ wrote {OUT}")


if __name__ == "__main__":
    main()
