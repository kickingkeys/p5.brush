#!/usr/bin/env python3
"""Build a standalone v2 gallery page (v2.html) — just the new run images."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROMPTS = json.loads((ROOT / "prompts.json").read_text())
MANIFEST = json.loads((ROOT / "manifest_v2.json").read_text())
OUT = ROOT / "v2.html"

MODELS = [
    ("claude_sonnet_46", "Claude Sonnet 4.6"),
    ("gpt_54", "GPT-5.4"),
    ("gemini_31_pro", "Gemini 3.1 Pro"),
    ("qwen3_235b", "Qwen3-235B"),
    ("gemma3_27b", "Gemma 3 27B"),
]


def cell(mk: str, pid: str) -> str:
    entry = MANIFEST.get(f"{mk}__v2__{pid}", {})
    if entry.get("rendered"):
        rel = Path(entry["png_path"]).relative_to(ROOT)
        return f'<div class="cell"><img src="{rel}" alt="{mk} {pid}" loading="lazy"></div>'
    err = (entry.get("render_note") or entry.get("error") or "no render")[:90]
    return f'<div class="cell fail">{err}</div>'


def row(prompt: dict) -> str:
    cells = "".join(cell(mk, prompt["id"]) for mk, _ in MODELS)
    return f"""
    <section class="row">
      <header>
        <h3>{prompt['id']} — {prompt['medium_focus']}</h3>
        <p>{prompt['text']}</p>
      </header>
      <div class="grid">{cells}</div>
    </section>"""


heads = "".join(f'<div class="head">{n}</div>' for _, n in MODELS)
rows = "\n".join(row(p) for p in PROMPTS["prompts"])

html = f"""<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>p5.brush Recipes v2 — gallery</title>
<style>
:root {{ --bg:#fffaf3; --ink:#222; --muted:#6a6157; }}
*{{box-sizing:border-box}}
body{{font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;background:var(--bg);color:var(--ink);margin:0}}
main{{max-width:1400px;margin:0 auto;padding:32px 20px 80px}}
h1{{font-size:1.8rem;margin:0 0 8px}}
h3{{font-size:1rem;margin:0 0 4px}}
.lede{{color:var(--muted);max-width:70ch;margin:0 0 24px}}
.heads{{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:8px;position:sticky;top:0;background:var(--bg);padding:10px 0;border-bottom:1px solid #e0d4bd;z-index:5}}
.head{{font-size:0.85rem;font-weight:600;text-align:center}}
.row{{margin:28px 0}}
.row header{{margin-bottom:10px}}
.row header p{{color:var(--muted);font-size:0.9rem;margin:0;max-width:80ch}}
.grid{{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}}
.cell{{background:#eee1c6;aspect-ratio:1/1;overflow:hidden;border-radius:4px}}
.cell img{{width:100%;height:100%;object-fit:cover;display:block}}
.cell.fail{{padding:10px;font-size:0.75rem;color:#c03;background:#ffeeea;display:flex;align-items:center}}
</style></head><body><main>
<h1>p5.brush Recipes v2 — gallery</h1>
<p class="lede">Just the v2 images from the 60-cell run (5 models × 12 prompts). v2 = Recipes with Particle Fields, Gestural marker, tighter Pen, sweet-spot framing. For the old/v1/v2 side-by-side, see <a href="index.html">index.html</a>.</p>
<div class="heads">{heads}</div>
{rows}
</main></body></html>"""

OUT.write_text(html)
print(f"wrote {OUT} ({len(html):,} chars)")
