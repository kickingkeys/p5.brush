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

## 2026-04-18 — Recipes draft leads with a complete watercolor example, terser elsewhere

**Alternatives**: (a) uniform terse placeholders for all 7 mediums; (b) uniform full working examples for all 7; (c) watercolor-lead with complete example, others terse.

**Chose**: (c).

**Why**: Watercolor is the #1 ask and the hardest medium to get right (wash + fill layering + fillBleed direction is non-obvious). A weak model (Gemma 3 27B, Qwen3-235B) needs a complete working pattern to copy from — placeholder-heavy templates assume too much. Other mediums pattern-match from the Universal Principles 3-layer template + medium-specific code + Avoid block. Full working examples for all 7 would balloon llms.txt past what agent context windows handle cleanly.

**Cost**: Final llms.txt grows 430 → 768 lines (~+338). Still tractable; within most 128k+ context budgets.

---

## 2026-04-18 — Explicit "Avoid" block per medium

**Why**: Failure modes are as teachable as successes. Stronger models don't need them, but the 1% of edge cases where a strong model hallucinates `brush.fill()` for marker or `charcoal` hatching for technical pen are easier to prevent than diagnose. Weak models need them as guardrails. Costs ~3–4 lines per medium; bought cheaply.

---

## 2026-04-18 — "Colors render lighter than hex" insight promoted to Universal Principles

**Why**: This came out of the research phase (real, validated finding across all mediums), but a single-line observation in Universal Principles steers every color decision downstream without needing per-medium reminders. Under-noted in prior versions.

---

## 2026-04-19 — v6: de-prescriptivize + reassert Form 3-pass

**Hypothesis**: Subject-example lists (e.g. "graffiti, drips, tags signals Chaos") read as *category boundaries* rather than illustrations. Generalizing to principle-first prose should free models to interpret prompts more broadly without losing the underlying medium rules.

**Edits**: (1) "When NOT to apply graduated density" → "Two ways density can emerge" (positive principle, per-mark vs population). (2) Watercolor Form/Field trigger vocab softened to "e.g.". (3) Same for Spray Chaos/Form. (4) Added explicit "Form watercolor always uses ≥3 passes" bullet to fix v3→v5 p01 regression.

**Observed v5→v6** (60 cells, 5 models × 12 prompts):

- **Wins**: p01 Claude Sonnet 1→4 fills (target fix landed). p05 pen forest scaled up dramatically across all strong models (Claude +42, GPT +10, Gemini +8) — population-density framing produced richer hatched compositions.
- **Losses**: p03 Charcoal Claude lost 6 layers and near-paper `#b0aba2` crept back into mass colors despite the value-floor bullet being intact. p08–p10 multi-medium scenes simpler across strong models (drops of 3–6 layers each) — softer Form/Field vocabulary let models default to Field single-pass even for Form elements.
- **Neutral**: p06 marker, p12 abstract spray unchanged.

**Learning**: De-prescriptivization is a variance move, not a quality move. Softer prose broadens *all* adjacent rules, not just the target. Strong models (Claude) benefit on prompts where v5 was rigid but lose coherence on prompts that need sharp distinctions (multi-medium). The "≥3 passes" bullet only landed on Claude — GPT/Gemini/Qwen/Gemma need the hint inside code, not as prose.

---

## 2026-04-19 — v7: narrow reversion + in-code comment hints

**Hypothesis**: Two targeted fixes can keep v6's wins (p05, p01 Claude) while recovering v6's losses (p03 charcoal, p08–p10 multi-medium).

**Edits planned**: (1) Re-tighten Watercolor Form/Field trigger vocabulary for multi-medium specifically (partial revert of v6's softening — keep the "e.g." for simple prompts, re-tighten for "harbor boats, desert rocks" case). (2) Add `// all 3 passes — do not skip` comment inside the Form watercolor code snippet so weak models see the ≥3 rule while reading runnable code, not just prose. (3) Add analogous `// mass color must be < #888` comment inside charcoal example to reinforce value floor where Claude slipped.

**Why this combination**: v6 proved that prose bullets only reach Claude. Weaker models pattern-match off code comments. v6 also proved language softening cascades beyond the target sentence. Narrowing the softening to only the simple case + doubling down on code-comment hints should preserve variety where it helped and restore precision where it hurt.

---
