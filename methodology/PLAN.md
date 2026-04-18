# Methodology & PR Plan — `## Recipes` Section for p5.brush `llms.txt`

**Goal**: Contribute an additive `## Recipes` section to `acamposuribe/p5.brush`'s `llms.txt` so that coding agents (Claude, GPT, Gemini, Qwen, Gemma, etc.) produce **medium-authentic** p5.brush output — not just code that runs.

**Evidence format**: A public GitHub Pages site on the fork showing live-session clips + a 120-cell controlled before/after grid + the methodology. The PR body links this page.

**Non-goal**: Replacing Alejandro's `llms.txt`. His two-builds section, API reference, and class docs are authoritative and load-bearing; we only *add*.

---

## Intent (why we're doing this)

Alejandro's current `README.md` (1,219 lines) + `llms.txt` (430 lines) cover the API exhaustively — every function, every param, every class, every gotcha. Together they answer *"what does p5.brush expose?"* completely.

They do **not** answer: *"which combinations of these APIs produce something that looks like a real watercolor painting vs a charcoal sketch vs a technical-pen botanical illustration?"*

The gap shows up in practice: agents given only the upstream docs write code that runs and uses valid APIs but produces generic digital output. Our experiments (355+ autoresearch iterations + 1,475 human pairwise ratings across 4 mediums, documented in `~/projects/experiments/p5-brush-medium-recipes/SESSION_LOG.md`) surfaced the non-obvious technique combinations that actually produce medium-authentic output:

- Graduated density (3-layer back-to-front scaling) is the universal 3D-form technique
- `wash()` + `fill()` layering is what makes watercolor read as watercolor
- `mass("pastel"/"crayon")` (not `mass("charcoal")`) is correct for charcoal mid/dark tones
- Different hatch angles per layer (30–60° offset) create cross-hatching
- Marker is `wash(color, 255)` + bold outline — never `fill()`
- Spray needs 5+ tonal passes with spatial offset toward light

These are real, discovered, and teachable — but currently live nowhere the agent can see them.

---

## Process (how we're doing it, step by step)

### Phase 0 — Fork setup (DONE at scaffold time)

- [x] Clone upstream `acamposuribe/p5.brush` to `~/projects/experiments/p5-brush-fork/`.
- [x] Scaffold `methodology/` directory (scripts, renders, clips, assets).
- [ ] Create GitHub fork (`suryanarreddi/p5.brush`) — user does this via `gh repo fork` when ready.
- [ ] Branches: `main` (tracks upstream), `cookbook-recipes` (clean PR branch — only touches `llms.txt` and `README.md`), `methodology` (evaluation infra + HTML page; deploys GitHub Pages).

### Phase 1 — Draft the `## Recipes` section

- [ ] Review upstream `llms.txt` end-to-end; identify the right insertion point (after "Shared API" / "Exposed Classes", before "Key Gotchas").
- [ ] Distill 7 recipes from our local `~/projects/experiments/p5-brush-medium-recipes/llm_text/llms.txt` (currently 524 lines) + `medium_guide_v3.md`. Strip anything redundant with upstream (setup, API ref, brush table).
- [ ] Add universal "Graduated Density" cross-medium principle section.
- [ ] Add medium-specific "Common Mistakes" entries.
- [ ] Add honest "Library Limitations" callout — marker flatness, spray form loss.
- [ ] Keep total addition to ~200–300 lines. Final `llms.txt` should be ~630–730 lines.

### Phase 2 — README signpost

- [ ] Add one short section near the top of `README.md` directing LLMs/agents to `llms.txt`'s Recipes section for medium-specific technique patterns.
- [ ] One paragraph, ≤5 lines. Non-intrusive for human readers.

### Phase 3 — Prompt generation (blind, frozen)

- [ ] Query 2 independent frontier models (Claude Opus 4.7, GPT-5.4) with the *same* instruction: *"You're a generative artist who just discovered p5.brush. Give me 12 short sketch ideas you'd ask your AI assistant to prototype — the kinds of things a creative coder experiments with. Keep them short, visual, non-technical."*
- [ ] Save raw outputs to `methodology/prompts_raw.json` (both models' full outputs).
- [ ] Dedupe, lightly edit for length parity, pick final 12 covering: ≥1 per medium (7) + multi-medium scenes + abstract/pattern.
- [ ] Commit to `methodology/prompts.json` (frozen — no edits past this point).
- [ ] Document selection rationale in `methodology/DECISIONS.md`.

### Phase 4 — Controlled A/B test (120 renders)

- [ ] Script: `methodology/scripts/run_ab.py`.
- [ ] 5 models via OpenRouter: Gemini 3.1 Pro, Claude Sonnet 4.6, GPT-5.4, Qwen3-235B, Gemma 3 27B.
- [ ] 2 conditions:
  - `old` = system prompt contains upstream `README.md` + upstream `llms.txt`
  - `new` = system prompt contains upstream `README.md` + forked `llms.txt` (with Recipes)
- [ ] 12 prompts × 5 models × 2 conditions × 1 seed = **120 renders**.
- [ ] Rendering: headless Puppeteer + WEBGL (reuse pipeline from p5-brush-medium-recipes).
- [ ] Output: PNGs to `methodology/renders/old/` and `methodology/renders/new/`, manifest at `methodology/manifest.json` (prompt, model, condition, seed, file path, render success, code excerpt).
- [ ] **Include failures** — a blank/crashed canvas is data. Do not exclude.
- [ ] Log model IDs with exact versions for reproducibility.

### Phase 5 — Live session clips (3 models)

- [ ] Record 3 screen clips (~30–45s each), one per model:
  - Claude (Claude Desktop or Claude Code, Opus 4.7)
  - Gemini (gemini.google.com, 3.1 Pro)
  - ChatGPT (GPT-5.4)
- [ ] Each clip: paste upstream repo URL → one prompt → see output. Then paste fork repo URL → same prompt → see output.
- [ ] Save as GIFs to `methodology/clips/`.
- [ ] Use the same seeds/prompts as Phase 4 where possible for narrative continuity.

### Phase 6 — Build HTML page

- [ ] `methodology/index.html` — static single-page site, no JS framework needed (vanilla + minimal CSS).
- [ ] Sections:
  1. **Hero** — one-line thesis + "PR link / upstream / fork" nav.
  2. **What a user actually does** — 3 live clips embedded side-by-side (old ↔ new per model).
  3. **Controlled comparison** — filterable grid of all 120 renders (prompt × model, old vs new toggle per cell). No VLM scores. Trust the eyes.
  4. **Honest limitations** — marker and spray ceilings, open-source model struggles, stale-agent caveat, no human evaluation at scale.
  5. **Methodology** — everything in this PLAN.md, linkable.
  6. **Reproduce** — `git clone`, `python run_ab.py`, manifest JSON download link.
- [ ] Deploy via GitHub Pages from `methodology` branch (`/methodology` folder).
- [ ] Final URL: `https://suryanarreddi.github.io/p5.brush/` (assuming fork at `suryanarreddi/p5.brush`).

### Phase 7 — PR

- [ ] Open PR from `cookbook-recipes` → `acamposuribe/p5.brush:main`.
- [ ] Body: one-paragraph pitch + link to methodology page + note that the change is additive (2 files, ~250 lines added).
- [ ] Do not overclaim. State: "we observed X across these 5 models on these 12 prompts; click through and see for yourself."
- [ ] Tag Alejandro if appropriate.

---

## Budget

- **Time**: ~5–6h of work + ~2.5h of render compute.
- **$**: ~$15–20 OpenRouter credits.
- **Calendar**: 1–2 days.

---

## Explicit limitations we'll surface on the page

1. **Library ceilings are real and not our fault**: marker can't render true marker flatness; spray loses subject without structural anchoring. Recipes include these honestly.
2. **Open-source models have their own ceilings**: Gemma 3 27B especially may struggle with p5.brush code regardless of docs. We include it for breadth, not expecting parity with frontier models.
3. **One seed per cell**: variance is real. We're showing a snapshot, not a distribution. Reproducible for anyone who wants to rerun with more seeds.
4. **No automated judge**: our prior experiments showed VLM judges have ~0.36 human correlation and a translucency bias. Page shows raw renders only.
5. **Controlled test uses context injection; realistic URL fetch is only demonstrated in the live clips**: these are two tests answering two different questions. Clearly labeled on the page.

---

## File layout (target end state in `methodology/` on `methodology` branch)

```
methodology/
├── PLAN.md                   # this file
├── DECISIONS.md              # running log of judgment calls
├── prompts_raw.json          # raw outputs from Opus and GPT-5.4
├── prompts.json              # frozen final 12 prompts
├── manifest.json             # full A/B run metadata
├── scripts/
│   ├── generate_prompts.py   # Phase 3
│   ├── run_ab.py             # Phase 4 orchestrator
│   ├── render.js             # Puppeteer headless renderer
│   └── build_page.py         # Phase 6 HTML generator
├── renders/
│   ├── old/                  # 60 PNGs
│   └── new/                  # 60 PNGs
├── clips/                    # 3 GIFs
├── assets/                   # CSS, favicon, etc.
└── index.html                # GitHub Pages entry
```

---

## Checkpoints (where we stop and get user approval)

1. **After this PLAN.md** — user reviews, approves direction.
2. **After drafting Recipes section text** — user reviews draft before it's committed to fork's `llms.txt`.
3. **After prompt generation** — user sees the 12 frozen prompts.
4. **After first 12 renders (1 model × 12 prompts × 2 conditions)** — sanity check the pipeline before running all 5 models.
5. **Before opening the PR** — user reviews final page.
