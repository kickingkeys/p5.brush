#!/usr/bin/env python3
"""
Phase 6 — Build the static GitHub Pages site.

Reads prompts.json + manifest.json, emits index.html with:
  1. Hero
  2. Controlled comparison grid (all models x 12 prompts, old vs new per cell)
  3. Live clips section (embedded GIFs)
  4. Honest limitations
  5. Methodology
  6. Reproduce

Vanilla HTML + minimal CSS. No framework.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROMPTS = json.loads((ROOT / "prompts.json").read_text())
MANIFEST = json.loads((ROOT / "manifest.json").read_text())
MANIFEST_V2 = json.loads((ROOT / "manifest_v2.json").read_text()) if (ROOT / "manifest_v2.json").exists() else {}
MANIFEST_V3 = json.loads((ROOT / "manifest_v3.json").read_text()) if (ROOT / "manifest_v3.json").exists() else {}
OUT = ROOT / "index.html"

MODELS = [
    ("claude_sonnet_46", "Claude Sonnet 4.6"),
    ("gpt_54", "GPT-5.4"),
    ("gemini_31_pro", "Gemini 3.1 Pro"),
    ("qwen3_235b", "Qwen3-235B"),
    ("gemma3_27b", "Gemma 3 27B"),
]


def img_for(entry, cond):
    if entry.get("rendered"):
        path = entry.get("png_path", "")
        if path:
            rel = Path(path).relative_to(ROOT)
            return f'<img src="{rel}" alt="{cond}" loading="lazy">'
    err = entry.get("render_note") or entry.get("error") or "no render"
    return f'<div class="fail">failed: {err[:80]}</div>'


def cell(model_key: str, prompt_id: str) -> str:
    old_key = f"{model_key}__old__{prompt_id}"
    new_key = f"{model_key}__new__{prompt_id}"
    v2_key  = f"{model_key}__v2__{prompt_id}"
    v3_key  = f"{model_key}__v3__{prompt_id}"
    old_entry = MANIFEST.get(old_key, {})
    new_entry = MANIFEST.get(new_key, {})
    v2_entry  = MANIFEST_V2.get(v2_key, {})
    v3_entry  = MANIFEST_V3.get(v3_key, {})

    v2_half = (
        f'<div class="half"><span class="badge v2">v2</span>{img_for(v2_entry, "v2")}</div>'
        if v2_entry else ""
    )
    v3_half = (
        f'<div class="half"><span class="badge v3">v3</span>{img_for(v3_entry, "v3")}</div>'
        if v3_entry else ""
    )
    if v3_entry:
        pair_cls = "pair quad"
    elif v2_entry:
        pair_cls = "pair triple"
    else:
        pair_cls = "pair"

    return f"""
        <div class="cell">
          <div class="cell-label">{prompt_id}</div>
          <div class="{pair_cls}">
            <div class="half"><span class="badge old">old</span>{img_for(old_entry, 'old')}</div>
            <div class="half"><span class="badge new">v1</span>{img_for(new_entry, 'new')}</div>
            {v2_half}
            {v3_half}
          </div>
        </div>"""


def prompt_row(prompt: dict) -> str:
    cells = "\n".join(cell(mk, prompt["id"]) for mk, _ in MODELS)
    return f"""
      <section class="prompt-row" data-prompt="{prompt['id']}">
        <header>
          <h3>{prompt['id']} — {prompt['medium_focus']}</h3>
          <p class="prompt-text">{prompt['text']}</p>
        </header>
        <div class="models-grid">{cells}</div>
      </section>"""


def build() -> str:
    model_heads = "".join(f'<div class="model-head">{name}</div>' for _, name in MODELS)
    rows = "\n".join(prompt_row(p) for p in PROMPTS["prompts"])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>p5.brush Recipes — before / after</title>
<style>
:root {{
  --bg: #fffaf3; --ink: #222; --muted: #6a6157;
  --old: #c9b89a; --new: #4a8a66;
}}
* {{ box-sizing: border-box }}
body {{
  font: 16px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  background: var(--bg); color: var(--ink); margin: 0;
  padding: 0;
}}
main {{ max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px }}
h1 {{ font-size: 2.2rem; line-height: 1.15; margin: 0 0 12px }}
h2 {{ font-size: 1.5rem; margin: 48px 0 16px; border-bottom: 1px solid #e0d4bd; padding-bottom: 6px }}
h3 {{ font-size: 1.05rem; margin: 0 0 4px }}
.lede {{ font-size: 1.1rem; color: var(--muted); max-width: 72ch; margin: 0 0 16px }}
nav a {{ margin-right: 16px; color: var(--ink); text-decoration: underline }}
.prompt-text {{ color: var(--muted); font-size: 0.95rem; margin: 0 0 12px; max-width: 80ch }}
.prompt-row {{ margin: 36px 0 }}
.prompt-row header {{ margin-bottom: 12px }}
.models-grid {{
  display: grid;
  grid-template-columns: repeat({len(MODELS)}, 1fr);
  gap: 10px;
}}
.cell-label {{ font-size: 0.78rem; color: var(--muted); margin-bottom: 4px; font-variant: all-small-caps; letter-spacing: 0.06em }}
.pair {{ display: grid; grid-template-columns: 1fr 1fr; gap: 4px }}
.pair.triple {{ grid-template-columns: 1fr 1fr 1fr }}
.pair.quad {{ grid-template-columns: 1fr 1fr 1fr 1fr }}
.half {{ position: relative; background: #eee1c6; aspect-ratio: 1/1; overflow: hidden; border-radius: 4px }}
.half img {{ width: 100%; height: 100%; object-fit: cover; display: block }}
.badge {{
  position: absolute; top: 4px; left: 4px;
  font-size: 0.7rem; padding: 2px 6px; border-radius: 3px;
  font-weight: 600; background: rgba(255,250,243,0.9);
  z-index: 2;
}}
.badge.old {{ color: #8a6f38 }}
.badge.new {{ color: var(--new) }}
.badge.v2 {{ color: #2f6b9a }}
.badge.v3 {{ color: #8e4fa3 }}
.fail {{ padding: 8px; font-size: 0.75rem; color: #c03; background: #ffeeea; height: 100%; display: flex; align-items: center }}
.model-heads {{ display: grid; grid-template-columns: repeat({len(MODELS)}, 1fr); gap: 10px; margin-bottom: 8px; position: sticky; top: 0; background: var(--bg); padding: 10px 0; z-index: 5; border-bottom: 1px solid #e0d4bd }}
.model-head {{ font-size: 0.9rem; font-weight: 600; text-align: center }}
.limitations, .methodology {{ max-width: 80ch }}
.limitations li, .methodology li {{ margin: 6px 0 }}
code {{ background: #f0e6d0; padding: 1px 4px; border-radius: 2px; font-size: 0.9em }}
.footnote {{ color: var(--muted); font-size: 0.85rem; margin-top: 48px; border-top: 1px solid #e0d4bd; padding-top: 16px }}
</style>
</head>
<body>
<main>

<h1>p5.brush Recipes — before / after</h1>
<p class="lede">
An additive <code>## Recipes</code> section for p5.brush's <code>llms.txt</code>, evaluated by running the same 12 prompts through 5 models in two conditions: the upstream docs alone, vs the upstream docs with our Recipes section appended.
</p>
<nav>
  <a href="#grid">Comparison grid</a>
  <a href="#clips">Live sessions</a>
  <a href="#limits">Limitations</a>
  <a href="#method">Methodology</a>
  <a href="https://github.com/acamposuribe/p5.brush">Upstream</a>
  <a href="https://github.com/kickingkeys/p5.brush/tree/cookbook-recipes">Fork</a>
</nav>

<h2 id="grid">Controlled comparison</h2>
<p class="lede">
For each prompt, each model generates a sketch in four conditions: <span style="color:var(--old)">old</span> (upstream docs only), <span style="color:var(--new)">v1</span> (upstream + our Recipes), <span style="color:#2f6b9a">v2</span> (Recipes + Particle Fields, Gestural marker, tighter Pen), and <span style="color:#8e4fa3">v3</span> (v2 + Watercolor Form/Field split + "When NOT to apply graduated density"). One seed per cell. Failures stay visible — blank/error canvases are data.
</p>
<div class="model-heads">{model_heads}</div>
{rows}

<h2 id="clips">Live sessions</h2>
<p class="lede">
The controlled test above uses context injection via OpenRouter. Below are three screen recordings of the realistic deployment flow: a user shares the GitHub URL with their AI assistant, which fetches and uses the docs directly. Same prompts, three frontier models.
</p>
<p><em>Coming — see <code>methodology/clips/</code>.</em></p>

<h2 id="limits">Honest limitations</h2>
<ul class="limitations">
  <li><strong>Library ceilings are real.</strong> Marker simulation can't fully reproduce real marker streakiness; spray loses subject recognition without structural anchoring. Recipes flag this honestly rather than promising perfection.</li>
  <li><strong>Open-source models have their own ceilings.</strong> Qwen3-235B and Gemma 3 27B may struggle with p5.brush code regardless of docs. We include them for breadth and display failures alongside successes.</li>
  <li><strong>One seed per cell.</strong> This is a snapshot, not a distribution. Scripts and manifest are committed — anyone can rerun with more seeds.</li>
  <li><strong>No automated judge.</strong> Prior experiments showed VLM judges had ~0.36 human correlation and a translucency bias that penalized structured output. No scores. Trust your eyes.</li>
  <li><strong>Controlled test uses context injection.</strong> OpenRouter doesn't fetch URLs, so the realistic URL-share flow is demonstrated only in the live clips.</li>
</ul>

<h2 id="method">Methodology</h2>
<ul class="methodology">
  <li><strong>Prompts.</strong> 12 generative-art sketch ideas, selected from 24 blind-generated ideas (Opus 4.7 + GPT-5.4, independent queries). Coverage: ≥1 per medium (7), 3 multi-medium, 2 abstract/pattern. See <code>prompts.json</code> + <code>prompts_raw.json</code>.</li>
  <li><strong>A/B conditions.</strong> Old = upstream <code>README.md</code> + <code>llms.txt</code> in system prompt. New = same with the <code>## Recipes</code> section appended (+338 lines). User prompt + structural rules are identical across conditions.</li>
  <li><strong>Models.</strong> Claude Sonnet 4.6, GPT-5.4, Gemini 3.1 Pro, Qwen3-235B, Gemma 3 27B — frontier + open-source.</li>
  <li><strong>Rendering.</strong> Headless Puppeteer with Metal WebGL backend; p5.brush 2.1.0-beta pinned. Code pastes directly into a 600×600 WEBGL canvas.</li>
  <li><strong>Reproducibility.</strong> <code>scripts/run_ab.py</code> + <code>scripts/render_local.js</code> + <code>manifest.json</code> in the repo. Rerun with any model set, any number of seeds.</li>
</ul>

<p class="footnote">
Forked from <a href="https://github.com/acamposuribe/p5.brush">acamposuribe/p5.brush</a>.
PR: <a href="https://github.com/acamposuribe/p5.brush/pulls">(link on open)</a>.
Methodology source: <a href="https://github.com/kickingkeys/p5.brush/tree/methodology/methodology">github.com/kickingkeys/p5.brush/methodology</a>.
</p>

</main>
</body>
</html>"""


if __name__ == "__main__":
    OUT.write_text(build())
    print(f"wrote {OUT} ({len(OUT.read_text()):,} chars)")
