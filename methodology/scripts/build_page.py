#!/usr/bin/env python3
"""
Phase 6 — Build the static GitHub Pages site.

Reads prompts.json + manifest{,_v2,_v3,_v4}.json, emits index.html with:
  1. Hero
  2. Sticky filter bar (version checkboxes, model focus, size toggle)
  3. Per-prompt comparison tables (5 models × 5 versions), filterable
  4. Click any image → lightbox showing that (model, prompt) across all versions
  5. Honest limitations + methodology + reproduce

Vanilla HTML + CSS + tiny bit of JS. No framework.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROMPTS = json.loads((ROOT / "prompts.json").read_text())
MANIFESTS = {
    "old": json.loads((ROOT / "manifest.json").read_text()),
    "v1": json.loads((ROOT / "manifest.json").read_text()),   # v1 == "new" entries in main manifest
    "v2": json.loads((ROOT / "manifest_v2.json").read_text()) if (ROOT / "manifest_v2.json").exists() else {},
    "v3": json.loads((ROOT / "manifest_v3.json").read_text()) if (ROOT / "manifest_v3.json").exists() else {},
    "v4": json.loads((ROOT / "manifest_v4.json").read_text()) if (ROOT / "manifest_v4.json").exists() else {},
    "v5": json.loads((ROOT / "manifest_v5.json").read_text()) if (ROOT / "manifest_v5.json").exists() else {},
    "v6": json.loads((ROOT / "manifest_v6.json").read_text()) if (ROOT / "manifest_v6.json").exists() else {},
    "v7": json.loads((ROOT / "manifest_v7.json").read_text()) if (ROOT / "manifest_v7.json").exists() else {},
}
OUT = ROOT / "index.html"

MODELS = [
    ("claude_sonnet_46", "Claude Sonnet 4.6"),
    ("gpt_54", "GPT-5.4"),
    ("gemini_31_pro", "Gemini 3.1 Pro"),
    ("qwen3_235b", "Qwen3-235B"),
    ("gemma3_27b", "Gemma 3 27B"),
]

VERSIONS = [
    ("old", "old", "Upstream docs only"),
    ("v1", "v1", "Upstream + Recipes draft"),
    ("v2", "v2", "+ Particle Fields, Gestural marker"),
    ("v3", "v3", "+ Watercolor Form/Field split"),
    ("v4", "v4", "+ Spray Chaos, cpencil cap, anchor narrowing"),
    ("v5", "v5", "+ Charcoal mass color value floor"),
    ("v6", "v6", "+ De-prescriptivized, Form watercolor 3-pass reassertion"),
    ("v7", "v7", "+ Narrow multi-medium, in-code hints for weak models"),
]


def key_for(model: str, ver: str, pid: str) -> str:
    # "old" and "v1" both live in the main manifest with suffixes __old__ and __new__
    suffix = "new" if ver == "v1" else ver
    return f"{model}__{suffix}__{pid}"


def entry_for(model: str, ver: str, pid: str) -> dict:
    return MANIFESTS[ver].get(key_for(model, ver, pid), {})


def img_cell(entry: dict, model: str, ver: str, pid: str) -> str:
    if entry.get("rendered"):
        path = entry.get("png_path", "")
        if path:
            rel = Path(path).relative_to(ROOT)
            return (
                f'<button class="img-btn" data-model="{model}" data-ver="{ver}" data-pid="{pid}">'
                f'<img src="{rel}" alt="{model} {ver} {pid}" loading="lazy">'
                f'</button>'
            )
    err = entry.get("render_note") or entry.get("error") or "no render"
    return f'<div class="fail" title="{err[:200]}">no render</div>'


def compare_table(prompt: dict) -> str:
    pid = prompt["id"]
    head_cells = "".join(
        f'<th class="col-{v} v-{v}">{label}</th>'
        for v, label, _ in VERSIONS
    )
    rows = []
    for mk, mlabel in MODELS:
        cells = "".join(
            f'<td class="col-{v} v-{v}">{img_cell(entry_for(mk, v, pid), mk, v, pid)}</td>'
            for v, _, _ in VERSIONS
        )
        rows.append(
            f'<tr class="row-{mk}"><th class="model-label">{mlabel}</th>{cells}</tr>'
        )
    rows_html = "\n".join(rows)
    return f"""
    <section class="prompt-block" id="{pid}" data-prompt="{pid}">
      <header class="prompt-header">
        <div class="prompt-meta">
          <span class="prompt-id">{pid}</span>
          <span class="prompt-medium">{prompt['medium_focus']}</span>
        </div>
        <p class="prompt-text">{prompt['text']}</p>
      </header>
      <div class="compare-wrap">
        <table class="compare-table">
          <thead>
            <tr><th class="model-label"></th>{head_cells}</tr>
          </thead>
          <tbody>
            {rows_html}
          </tbody>
        </table>
      </div>
    </section>"""


def prompt_index() -> str:
    cards = []
    for p in PROMPTS["prompts"]:
        cards.append(
            f'<a href="#{p["id"]}" class="idx-card">'
            f'<span class="idx-id">{p["id"]}</span>'
            f'<span class="idx-medium">{p["medium_focus"]}</span>'
            f'</a>'
        )
    return f'<nav class="prompt-index">{"".join(cards)}</nav>'


def lightbox_data() -> str:
    """Return JSON of prompt text + image paths so JS can render the lightbox."""
    data = {}
    for p in PROMPTS["prompts"]:
        pid = p["id"]
        data[pid] = {"text": p["text"], "medium": p["medium_focus"], "cells": {}}
        for mk, _ in MODELS:
            data[pid]["cells"][mk] = {}
            for v, _, _ in VERSIONS:
                e = entry_for(mk, v, pid)
                if e.get("rendered") and e.get("png_path"):
                    rel = str(Path(e["png_path"]).relative_to(ROOT))
                    data[pid]["cells"][mk][v] = rel
                else:
                    data[pid]["cells"][mk][v] = None
    return json.dumps(data)


def build() -> str:
    tables = "\n".join(compare_table(p) for p in PROMPTS["prompts"])
    index_nav = prompt_index()
    version_checkboxes = "".join(
        f'<label class="chk"><input type="checkbox" class="ver-chk" data-ver="{v}" '
        f'{"checked" if v in ("old", "v6", "v7") else ""}> {label}</label>'
        for v, label, _ in VERSIONS
    )
    model_options = "".join(
        f'<option value="{mk}">{mlabel}</option>' for mk, mlabel in MODELS
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>p5.brush Recipes — before / after</title>
<style>
:root {{
  --bg: #fffaf3; --ink: #222; --muted: #6a6157;
  --old: #c9b89a; --v1: #4a8a66; --v2: #2f6b9a; --v3: #8e4fa3; --v4: #c2410c; --v5: #b91c5c; --v6: #0f766e; --v7: #db2777;
  --surface: #fff;
  --border: #e0d4bd;
  --border-strong: #c9b89a;
}}
* {{ box-sizing: border-box; }}
html {{ scroll-behavior: smooth; scroll-padding-top: 180px; }}
body {{
  font: 15px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  background: var(--bg); color: var(--ink); margin: 0;
}}
main {{ max-width: 1400px; margin: 0 auto; padding: 32px 24px 80px; }}
h1 {{ font-size: 2rem; line-height: 1.15; margin: 0 0 12px; }}
h2 {{ font-size: 1.4rem; margin: 48px 0 12px; border-bottom: 1px solid var(--border); padding-bottom: 6px; }}
.lede {{ font-size: 1.05rem; color: var(--muted); max-width: 72ch; margin: 0 0 16px; }}
nav.top {{ margin: 0 0 20px; }}
nav.top a {{ margin-right: 16px; color: var(--ink); text-decoration: underline; }}
code {{ background: #f0e6d0; padding: 1px 4px; border-radius: 2px; font-size: 0.9em; }}

/* Prompt index (chips) */
.prompt-index {{
  display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0 24px;
}}
.idx-card {{
  display: inline-flex; flex-direction: column; align-items: center;
  padding: 6px 10px; background: var(--surface); border: 1px solid var(--border);
  border-radius: 6px; text-decoration: none; color: var(--ink);
  font-size: 0.82rem; min-width: 72px;
}}
.idx-card:hover {{ border-color: var(--border-strong); background: #fff; }}
.idx-id {{ font-weight: 600; }}
.idx-medium {{ color: var(--muted); font-size: 0.75rem; }}

/* Sticky filter bar */
.filter-bar {{
  position: sticky; top: 0; z-index: 10;
  background: var(--bg); padding: 12px 0;
  border-bottom: 1px solid var(--border);
  display: flex; flex-wrap: wrap; gap: 18px; align-items: center;
  margin-bottom: 24px;
}}
.filter-bar strong {{ font-size: 0.85rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }}
.filter-group {{ display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }}
.chk {{ display: inline-flex; align-items: center; gap: 4px; font-size: 0.9rem; cursor: pointer; user-select: none; }}
.chk input {{ cursor: pointer; }}
select.model-focus {{
  font-size: 0.9rem; padding: 4px 8px; border: 1px solid var(--border); border-radius: 4px;
  background: var(--surface);
}}
.size-btns button {{
  font-size: 0.85rem; padding: 4px 10px; border: 1px solid var(--border); background: var(--surface);
  border-radius: 4px; cursor: pointer;
}}
.size-btns button.active {{ background: var(--ink); color: var(--bg); border-color: var(--ink); }}

/* Prompt block */
.prompt-block {{ margin: 40px 0; }}
.prompt-header {{ margin-bottom: 12px; }}
.prompt-meta {{ display: flex; gap: 10px; align-items: baseline; }}
.prompt-id {{ font-weight: 700; font-size: 1.1rem; }}
.prompt-medium {{ font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); background: var(--surface); padding: 2px 8px; border-radius: 3px; border: 1px solid var(--border); }}
.prompt-text {{ color: var(--muted); margin: 6px 0 0; max-width: 80ch; }}

/* Compare table */
.compare-wrap {{ overflow-x: auto; }}
.compare-table {{ border-collapse: separate; border-spacing: 6px; width: 100%; }}
.compare-table th.model-label {{
  text-align: left; font-size: 0.85rem; font-weight: 600; color: var(--muted);
  padding-right: 10px; width: 120px; vertical-align: middle;
  white-space: nowrap;
}}
.compare-table thead th {{
  font-size: 0.78rem; color: var(--muted); font-weight: 600;
  text-align: center; padding-bottom: 4px;
  text-transform: uppercase; letter-spacing: 0.08em;
}}
.compare-table thead th.col-old {{ color: var(--old); }}
.compare-table thead th.col-v1  {{ color: var(--v1); }}
.compare-table thead th.col-v2  {{ color: var(--v2); }}
.compare-table thead th.col-v3  {{ color: var(--v3); }}
.compare-table thead th.col-v4  {{ color: var(--v4); }}
.compare-table thead th.col-v5  {{ color: var(--v5); }}
.compare-table thead th.col-v6  {{ color: var(--v6); }}
.compare-table thead th.col-v7  {{ color: var(--v7); }}

.compare-table td {{ padding: 0; vertical-align: top; }}
.compare-table .img-btn {{
  display: block; width: 100%; aspect-ratio: 1/1; padding: 0; margin: 0; border: 2px solid transparent;
  background: #eee1c6; cursor: zoom-in; border-radius: 4px; overflow: hidden;
  transition: border-color 0.15s, transform 0.15s;
}}
.compare-table .img-btn:hover {{ border-color: var(--ink); transform: scale(1.02); }}
.compare-table .img-btn img {{ width: 100%; height: 100%; object-fit: cover; display: block; }}
.compare-table td.col-old .img-btn {{ border-color: rgba(201,184,154,0.5); }}
.compare-table td.col-v4  .img-btn {{ border-color: rgba(194,65,12,0.5); }}

.compare-table .fail {{
  aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center;
  background: #ffeeea; color: #c03; font-size: 0.7rem; border-radius: 4px;
  padding: 8px; text-align: center;
}}

/* Column visibility toggles */
body.hide-old .col-old {{ display: none; }}
body.hide-v1  .col-v1  {{ display: none; }}
body.hide-v2  .col-v2  {{ display: none; }}
body.hide-v3  .col-v3  {{ display: none; }}
body.hide-v4  .col-v4  {{ display: none; }}
body.hide-v5  .col-v5  {{ display: none; }}
body.hide-v6  .col-v6  {{ display: none; }}
body.hide-v7  .col-v7  {{ display: none; }}

/* Single-model focus */
body[data-focus]:not([data-focus=""]) tbody tr {{ display: none; }}
body[data-focus="claude_sonnet_46"] tbody tr.row-claude_sonnet_46 {{ display: table-row; }}
body[data-focus="gpt_54"] tbody tr.row-gpt_54 {{ display: table-row; }}
body[data-focus="gemini_31_pro"] tbody tr.row-gemini_31_pro {{ display: table-row; }}
body[data-focus="qwen3_235b"] tbody tr.row-qwen3_235b {{ display: table-row; }}
body[data-focus="gemma3_27b"] tbody tr.row-gemma3_27b {{ display: table-row; }}

/* Size modes */
body.size-md .compare-table {{ max-width: 100%; }}
body.size-md .compare-table thead th:not(.model-label) {{ min-width: 160px; }}
body.size-lg .compare-table thead th:not(.model-label) {{ min-width: 260px; }}
body.size-xl .compare-table thead th:not(.model-label) {{ min-width: 400px; }}

/* Lightbox */
.lightbox {{
  display: none; position: fixed; inset: 0; background: rgba(34,28,16,0.92);
  z-index: 1000; padding: 24px; overflow-y: auto;
}}
.lightbox.open {{ display: block; }}
.lightbox-inner {{ max-width: 1400px; margin: 0 auto; color: var(--bg); }}
.lightbox-header {{ display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }}
.lightbox-header h3 {{ margin: 0; color: var(--bg); font-size: 1.3rem; }}
.lightbox-header .close {{
  background: none; border: 1px solid var(--bg); color: var(--bg);
  padding: 4px 12px; border-radius: 3px; cursor: pointer; font-size: 0.9rem;
}}
.lightbox-prompt {{ color: #ded3c1; margin: 0 0 4px; }}
.lightbox-model {{ color: #ded3c1; font-size: 0.9rem; margin: 0 0 16px; }}
.lightbox-grid {{ display: grid; grid-template-columns: repeat(8, 1fr); gap: 12px; }}
.lightbox-cell {{ background: #2a2015; border-radius: 4px; overflow: hidden; }}
.lightbox-cell .lb-label {{ padding: 6px 10px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; background: #1a1410; }}
.lightbox-cell img {{ width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; }}
.lightbox-cell .lb-missing {{
  aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center;
  background: #3a2f22; color: #a89783; font-size: 0.8rem;
}}
.lightbox-cell.lb-old .lb-label {{ color: var(--old); }}
.lightbox-cell.lb-v1  .lb-label {{ color: var(--v1); }}
.lightbox-cell.lb-v2  .lb-label {{ color: var(--v2); }}
.lightbox-cell.lb-v3  .lb-label {{ color: var(--v3); }}
.lightbox-cell.lb-v4  .lb-label {{ color: var(--v4); }}
.lightbox-cell.lb-v5  .lb-label {{ color: var(--v5); }}
.lightbox-cell.lb-v6  .lb-label {{ color: var(--v6); }}
.lightbox-cell.lb-v7  .lb-label {{ color: var(--v7); }}

/* Legend */
.legend {{ display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.85rem; color: var(--muted); margin: 6px 0 8px; }}
.legend-item {{ display: inline-flex; align-items: center; gap: 5px; }}
.legend-dot {{ width: 10px; height: 10px; border-radius: 2px; display: inline-block; }}
.legend-dot.old {{ background: var(--old); }}
.legend-dot.v1  {{ background: var(--v1); }}
.legend-dot.v2  {{ background: var(--v2); }}
.legend-dot.v3  {{ background: var(--v3); }}
.legend-dot.v4  {{ background: var(--v4); }}
.legend-dot.v5  {{ background: var(--v5); }}
.legend-dot.v6  {{ background: var(--v6); }}
.legend-dot.v7  {{ background: var(--v7); }}

.footnote {{ color: var(--muted); font-size: 0.85rem; margin-top: 48px; border-top: 1px solid var(--border); padding-top: 16px; }}
.footnote a {{ color: var(--ink); }}

@media (max-width: 900px) {{
  .compare-table th.model-label {{ width: 90px; font-size: 0.75rem; }}
  body.size-md .compare-table thead th:not(.model-label) {{ min-width: 100px; }}
  .lightbox-grid {{ grid-template-columns: repeat(2, 1fr); }}
}}
</style>
</head>
<body class="size-md" data-focus="">
<main>

<h1>p5.brush Recipes — before / after</h1>
<p class="lede">
An additive <code>## Recipes</code> section for p5.brush's <code>llms.txt</code>, evaluated by running 12 prompts through 5 models across 5 successive versions of the Recipes text. Each cell is one seed; failures stay visible.
</p>
<nav class="top">
  <a href="#grid">Comparison</a>
  <a href="#limits">Limitations</a>
  <a href="#method">Methodology</a>
  <a href="https://github.com/acamposuribe/p5.brush">Upstream</a>
  <a href="https://github.com/kickingkeys/p5.brush/tree/cookbook-recipes">Fork</a>
</nav>

<h2 id="grid">Controlled comparison</h2>

<div class="legend">
  <span class="legend-item"><span class="legend-dot old"></span> old — upstream docs only</span>
  <span class="legend-item"><span class="legend-dot v1"></span> v1 — + Recipes draft</span>
  <span class="legend-item"><span class="legend-dot v2"></span> v2 — + Particle Fields, Gestural marker</span>
  <span class="legend-item"><span class="legend-dot v3"></span> v3 — + Watercolor Form/Field</span>
  <span class="legend-item"><span class="legend-dot v4"></span> v4 — + Spray Chaos, cpencil cap, anchor narrowing</span>
</div>

{index_nav}

<div class="filter-bar">
  <div class="filter-group">
    <strong>Show versions</strong>
    {version_checkboxes}
  </div>
  <div class="filter-group">
    <strong>Focus model</strong>
    <select class="model-focus">
      <option value="">All models</option>
      {model_options}
    </select>
  </div>
  <div class="filter-group size-btns">
    <strong>Size</strong>
    <button data-size="md" class="active">Medium</button>
    <button data-size="lg">Large</button>
    <button data-size="xl">X-Large</button>
  </div>
</div>

{tables}

<h2 id="limits">Honest limitations</h2>
<ul>
  <li><strong>Library ceilings are real.</strong> Marker and spray simulations can't fully reproduce their physical mediums. Recipes flag this honestly rather than promising perfection.</li>
  <li><strong>Open-source models have their own ceilings.</strong> Qwen3-235B and Gemma 3 27B sometimes produce runtime JS errors regardless of docs. Failures are shown, not hidden.</li>
  <li><strong>One seed per cell.</strong> This is a snapshot. Scripts and manifest are committed; anyone can rerun with more seeds.</li>
  <li><strong>No automated judge.</strong> Prior experiments showed VLM judges have ~0.36 human correlation and pathological biases. Trust your eyes.</li>
  <li><strong>Controlled test uses context injection.</strong> OpenRouter API calls don't fetch URLs, so the realistic URL-share flow is demonstrated only in the live clips.</li>
</ul>

<h2 id="method">Methodology</h2>
<ul>
  <li><strong>Prompts.</strong> 12 generative-art sketch ideas, selected from 24 blind-generated ideas (Opus 4.7 + GPT-5.4, independent queries). Coverage: ≥1 per medium (7), 3 multi-medium, 2 abstract/pattern.</li>
  <li><strong>Conditions.</strong> Old = upstream <code>README.md</code> + <code>llms.txt</code>. v1–v4 = upstream plus increasingly refined <code>## Recipes</code> sections. User prompt + structural rules identical across conditions.</li>
  <li><strong>Models.</strong> Claude Sonnet 4.6, GPT-5.4, Gemini 3.1 Pro, Qwen3-235B, Gemma 3 27B.</li>
  <li><strong>Rendering.</strong> Headless Puppeteer with Metal WebGL backend; p5.brush 2.1.0-beta pinned. Code pastes directly into a 600×600 WEBGL canvas.</li>
  <li><strong>Reproducibility.</strong> <code>scripts/run_ab.py</code> + <code>scripts/render_local.js</code> + <code>manifest*.json</code> in the repo. Rerun with any model set, any number of seeds.</li>
</ul>

<p class="footnote">
Forked from <a href="https://github.com/acamposuribe/p5.brush">acamposuribe/p5.brush</a>.
PR: <a href="https://github.com/acamposuribe/p5.brush/pulls">(link on open)</a>.
Methodology source: <a href="https://github.com/kickingkeys/p5.brush/tree/methodology/methodology">github.com/kickingkeys/p5.brush/methodology</a>.
</p>

</main>

<!-- Lightbox overlay -->
<div class="lightbox" id="lightbox">
  <div class="lightbox-inner">
    <div class="lightbox-header">
      <h3 id="lb-title"></h3>
      <button class="close" id="lb-close">Close ✕</button>
    </div>
    <p class="lightbox-prompt" id="lb-prompt"></p>
    <p class="lightbox-model" id="lb-model"></p>
    <div class="lightbox-grid" id="lb-grid"></div>
  </div>
</div>

<script>
const MODELS = {json.dumps([(mk, mlabel) for mk, mlabel in MODELS])};
const VERSIONS = {json.dumps([(v, label) for v, label, _ in VERSIONS])};
const DATA = {lightbox_data()};

// --- Filter: version checkboxes ---
document.querySelectorAll('.ver-chk').forEach(chk => {{
  chk.addEventListener('change', () => {{
    document.body.classList.toggle('hide-' + chk.dataset.ver, !chk.checked);
  }});
  // initial state
  document.body.classList.toggle('hide-' + chk.dataset.ver, !chk.checked);
}});

// --- Filter: model focus ---
document.querySelector('.model-focus').addEventListener('change', (e) => {{
  document.body.dataset.focus = e.target.value;
}});

// --- Size toggle ---
document.querySelectorAll('.size-btns button').forEach(btn => {{
  btn.addEventListener('click', () => {{
    document.body.classList.remove('size-md', 'size-lg', 'size-xl');
    document.body.classList.add('size-' + btn.dataset.size);
    document.querySelectorAll('.size-btns button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }});
}});

// --- Lightbox ---
const lb = document.getElementById('lightbox');
const lbTitle = document.getElementById('lb-title');
const lbPrompt = document.getElementById('lb-prompt');
const lbModel = document.getElementById('lb-model');
const lbGrid = document.getElementById('lb-grid');

function openLightbox(model, pid) {{
  const p = DATA[pid];
  if (!p) return;
  const modelLabel = MODELS.find(([k]) => k === model)[1];
  lbTitle.textContent = pid + ' — ' + p.medium;
  lbPrompt.textContent = p.text;
  lbModel.textContent = modelLabel;
  lbGrid.innerHTML = VERSIONS.map(([v, label]) => {{
    const path = p.cells[model][v];
    const body = path
      ? `<img src="${{path}}" alt="${{v}}">`
      : `<div class="lb-missing">no render</div>`;
    return `<div class="lightbox-cell lb-${{v}}"><div class="lb-label">${{label}}</div>${{body}}</div>`;
  }}).join('');
  lb.classList.add('open');
}}

document.querySelectorAll('.img-btn').forEach(btn => {{
  btn.addEventListener('click', () => openLightbox(btn.dataset.model, btn.dataset.pid));
}});

document.getElementById('lb-close').addEventListener('click', () => lb.classList.remove('open'));
lb.addEventListener('click', (e) => {{ if (e.target === lb) lb.classList.remove('open'); }});
document.addEventListener('keydown', (e) => {{ if (e.key === 'Escape') lb.classList.remove('open'); }});
</script>

</body>
</html>"""


if __name__ == "__main__":
    OUT.write_text(build())
    print(f"wrote {OUT} ({len(OUT.read_text()):,} chars)")
