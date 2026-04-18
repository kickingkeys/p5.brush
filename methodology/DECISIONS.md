# Decisions Log

Running log of judgment calls made during this work. Each entry: date, decision, alternatives considered, why we chose what we chose. This becomes the "Methodology / Why" section of the final HTML page.

---

## 2026-04-18 — Recipes live inline in `llms.txt`, not a separate `COOKBOOK.md`

**Alternatives**: (a) separate `COOKBOOK.md` linked from README and llms.txt; (b) inline `## Recipes` section in `llms.txt`.

**Chose**: (b) inline in `llms.txt`.

**Why**: Maximum discoverability. Every LLM-aware tool (Claude Code, Cursor, most coding agents) auto-reads `llms.txt`. A separate file is one link-follow away, which is unreliable across agents. Since the goal is "agents produce medium-authentic output when users share the repo URL," putting the content in the file agents already read is strictly better.

**Cost**: `llms.txt` grows from 430 → ~650 lines. Still tractable.

---

## 2026-04-18 — PR branch stays minimal (2 files); methodology lives on separate branch

**Alternatives**: (a) everything on one branch; (b) PR branch vs methodology branch split.

**Chose**: (b).

**Why**: Alejandro's repo shouldn't carry our evaluation infrastructure. PR branch (`cookbook-recipes`) touches only `llms.txt` and `README.md` — additive, reviewable in minutes. Methodology branch has all the scripts, renders, HTML — deploys via GitHub Pages on the fork. The PR body links to the Pages site.

---

## 2026-04-18 — Prompts generated blind by 2 independent models, then frozen

**Alternatives**: (a) we write prompts ourselves; (b) pull from Alejandro's examples/ directory; (c) generate via one model; (d) generate via two independent models and dedupe.

**Chose**: (d).

**Why**: Self-authored prompts would unconsciously favor scenarios our recipes handle well. Two independent models reduce single-model bias. Freezing the prompt list before any rendering prevents after-the-fact cherry-picking. We'll also pull 2–3 prompt ideas from Alejandro's `example/` directory to ground it in real library usage.

---

## 2026-04-18 — Controlled test uses context injection; URL-share flow lives only in live clips

**Why**: OpenRouter API calls don't have web_search/fetch capabilities by default. If we want to test "what happens when the agent fetches the GitHub URL," we'd need a tool-use setup that varies by model and introduces noise. Better to split:
- **Controlled test (120 renders)**: exact doc content in context, isolates the doc's contribution.
- **Live clips (3 models)**: human operator uses Claude Desktop / ChatGPT / Gemini interactively, models actually fetch the URL. This is the realistic deployment flow.

Clearly labeled on the final page as two distinct experiments answering two distinct questions.

---

## 2026-04-18 — No automated judge on the final page

**Alternatives**: (a) VLM pairwise judge with honest caveats; (b) no judge, visual only; (c) small human panel.

**Chose**: (b).

**Why**: Prior experiments in `p5-brush-medium-recipes` showed VLM judges have ~0.36 human correlation and, when calibrated, develop pathological biases (e.g., translucency bias that penalizes structured output). Showing scores alongside renders would invite readers to anchor on numbers rather than their own eyes. A human panel is out of scope for a PR exhibit. The renders themselves are the argument.

---

## 2026-04-18 — 5 models, covering frontier + open-source

**Chose**: Gemini 3.1 Pro, Claude Sonnet 4.6, GPT-5.4, Qwen3-235B, Gemma 3 27B.

**Why**: Frontier three (Gemini, Claude, GPT) represent what most p5.brush users with AI assistants will have. Qwen3-235B and Gemma 3 27B represent the open-source path — worse at code generation but relevant for users running local/self-hosted models. Including open-source honestly shows the ceiling: better docs help, but they can't fully compensate for weaker code generation.

---

## 2026-04-18 — One seed per cell; reproducibility over variance

**Why**: 120 renders at 1 seed is a snapshot; 360 renders at 3 seeds is a distribution. For a PR exhibit, the snapshot is enough to let Alejandro and readers form an opinion. Scripts + manifest are committed, so anyone who wants variance can rerun.

---
