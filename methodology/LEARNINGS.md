# Learnings Log

Running log of what the data taught us. One entry per analysis pass. Keeps the methodology page's "what we found and when" section honest.

---

## 2026-04-18 — Pilot A/B (Claude Sonnet 4.6 × 12 prompts × 2 conditions)

**Shape**: 24 code generations, 23 successful renders, 1 code-error failure (`new__p02`, `baseY is not defined` — a model-level typo where a shorthand property was left without a value; unrelated to the Recipes text).

**Condition context sizes**: old system prompt = 73.8k chars, new = 88.3k chars. Delta = +14.5k chars (the Recipes section). Both well within Sonnet 4.6's context budget.

### Headline finding: Recipes adherence is real and measurable

Comparing `old` vs `new` generated code on the same prompts shows the recipes are actually changing what the model produces — not just adding noise.

**Charcoal dancer (p03)** — the clearest signal:
- Old: used `set("charcoal")` + `hatchStyle("charcoal")` only. Zero `mass()` calls.
- New: used **8 `mass()` calls**, all with `"crayon"` or `"pastel"` (never `"charcoal"`), with strength stepped by tone (0.22 / 0.3 / 0.55 / 0.65 / 0.82). Textbook Recipes adherence.

**Desert multi-medium (p10)** — similar pattern:
- Old: `hatchStyle("charcoal")` + spray. No dry-media fill.
- New: introduced `mass("crayon")` + `mass("pastel")` for rock formations.

**Harbor watercolor (p08)** — opacity range:
- Old: fill opacities 40–65 across all layers. Recipes calls out 120–200 as the sweet spot; old's washes are too thin.
- New: fill opacities 70–150. Closer to the recommended range, reads fuller.

**Watercolor blooms (p01)**:
- Old: 0 `wash()` calls, 3 `fill()` calls. Flat.
- New: 1 `wash()` + 4 `fill()` calls with `fillBleed` + `fillTexture`. Layered the way Recipes prescribes.

### Where the signal was weaker

**Marker birds (p06)**: Both old and new used `set("marker")` as strokes (no `wash()`). The prompt asks for "quick marker gestures" — literally strokes — so neither model reached for the wash recipe. Not a miss: our Recipes text says marker uses `wash()` for flat color *areas*, strokes for outlines. Both interpretations were correct for the prompt.

**Spray graffiti (p07)**: Old had 9+ `set("spray")` calls with varied weights (2.8 / 2.5 / 2.2 / 2.0 / 1.2 / 1.0 / 0.9) — roughly the 5-pass pattern we recommend. New used fewer weight variations but added structural `brush.mass("crayon")`. Both are defensible; old happened to hit our recipe pattern from the prompt alone.

**Abstract Diebenkorn (p11)**: Old/new roughly equivalent. Abstract pattern work is the easiest case — hatching on rectangles doesn't need medium-specific coaching.

### Failures

1 of 24 (`new__p02`): Model typo — `{ x: 540, baseY, count: 5, ... }` where `baseY` was intended as shorthand property but no variable named `baseY` exists in scope. This is a code-generation bug, not a Recipes-quality signal. Counts as a data point for the grid (we leave it in, displaying the broken/blank canvas honestly), but does not inform Recipes iteration.

### Interpretation

Sonnet 4.6 with the Recipes section pulls out the specific techniques we documented — most clearly for charcoal (where the `mass("crayon")` / `mass("pastel")` tip is non-obvious) and for watercolor opacity ranges. For prompts where the standard API is already enough (spray gestures, marker strokes, abstract hatching), the delta is smaller but the output isn't worse.

Sonnet 4.6 is a ceiling test. The more important tests are the weaker models:
- Does Qwen3-235B (frontier open-source, still weaker on code) pick up the recipes?
- Does Gemma 3 27B (smaller model) see benefit, or does the extra context confuse it?
- Does Gemini 3.1 Pro behave like Sonnet, or does it have different failure modes?
- Does GPT-5.4 respond to explicit "Avoid" blocks differently?

### Decision: proceed to full 5-model run without Recipes iteration

No failure in the pilot exposed a gap in the Recipes text. The one failure was a model typo unrelated to our content. Adherence signals are clear enough on the ceiling model that running the full 5-model A/B will give us the real distribution — weak models, more prompts to analyze, and clearer iteration signal if needed.

Next: run all 5 models (108 more renders ≈ $5–10 + ~18 min of compute). Analyze again. Only then iterate the text.

---

## 2026-04-18 — Full A/B (5 models × 12 prompts × 2 conditions = 120 cells)

**Shape**: 120/120 generated, 109/120 rendered on first full pass (90.8%). Per-model render success (old vs new):

| Model | Old | New |
|---|---|---|
| claude_sonnet_46 | 12/12 | 12/12 |
| gpt_54 | 11/12 | 12/12 |
| gemini_31_pro | 11/12 | 9/12 |
| qwen3_235b | 12/12 | 12/12 |
| gemma3_27b | 8/12 | 10/12 |

### Headline: Recipes adherence generalizes across frontier models

Counting raw occurrences of the two Recipes-taught patterns that are clearest signals — `wash(` (watercolor layering) and `mass(` (charcoal/dry-media form):

| Model | Old wash | New wash | Old mass | New mass |
|---|---|---|---|---|
| claude_sonnet_46 | 6 | **16** | 0 | **11** |
| gpt_54 | 2 | **15** | 1 | **14** |
| gemini_31_pro | 0 | **10** | 1 | **4** |
| qwen3_235b | 7 | 7 | 1 | **4** |
| gemma3_27b | 0 | 0 | 0 | 1 |

Frontier models (Claude, GPT, Gemini) sharply pick up both patterns — especially `mass()`, which goes from near-zero to significant usage. Qwen3-235B already used `wash()` without prompting (flat delta) but picks up `mass()`. Gemma3 stays near-zero on both — model-scale limitation, not a text problem.

### Failures analyzed — none revealed a Recipes gap

**Gemini 3.1 Pro new/p07 + new/p12 (truncation at exactly 7996 tokens)**: the Recipes section encourages layered, multi-pass code. Gemini took the bait verbosely and hit `max_tokens=8000` mid-sketch. *This is a tooling issue, not a text issue* — bumped `max_tokens` to 16000 and retried. Confirms Recipes is increasing output complexity, which is the intent.

**Gemma3 27B code-quality errors** (5 failures: `let color = color(...)` TDZ, `endShape(CLOSE)` instead of `endShape(true)`, raw `brush.vertex()` in wrong context, etc.): these are JS/API-level errors that happen regardless of which llms.txt we ship. Gemma3 27B is the honest "model ceiling" example for the page. The old condition had 4 of these same classes of error too.

**GPT-5.4 old/p12 navigation timeout**: single infrastructure flake. Retried with no code change.

**Gemini 3.1 Pro old/p02 "No canvas" (141 lines)**: also truncation — code ends mid-vertex call. Same fix.

### Interpretation

The Recipes section does its job for the models that can absorb detailed guidance:
- **Claude Sonnet 4.6** and **GPT-5.4** adopt `mass()` / `wash()` from near-zero to ~10–15× per 12 prompts. Large effect.
- **Gemini 3.1 Pro** responds similarly but the verbosity it adds hits token limits on complex prompts — real behavior, now accommodated by `max_tokens=16000`.
- **Qwen3-235B** gets partial uplift (mass only) — it already knew watercolor layering.
- **Gemma3 27B** is context-saturated; the Recipes don't harm it, but they also don't help much. This is the realistic floor.

### Decision: no text iteration needed; rerun failing cells with higher token budget and ship

The failure patterns are model-quality / infrastructure issues, not Recipes-text gaps. The adherence signal on 5 models is strong and clean. Bumping `max_tokens` 8000→16000 and retrying the 5 truncated/timeout cells. Then building the methodology page from this dataset.

### Final render state (post-retry)

114/120 (95%). Remaining 6 all on Gemma 3 27B: two TDZ errors (`let color = color(...)`), two undefined-property accesses, two vertex-API misuses. Classic smaller-model basic-JS errors — the old condition had 4 of these same failure types too. Recipes text neither caused nor can fix these.

Per-model final:
| Model | Old | New |
|---|---|---|
| claude_sonnet_46 | 12/12 | 12/12 |
| gpt_54 | 12/12 | 12/12 |
| gemini_31_pro | 12/12 | 12/12 |
| qwen3_235b | 12/12 | 12/12 |
| gemma3_27b | 8/12 | 10/12 |

Note on the puppeteer ghost failures: the first retry run reported 0 of 5 regenerated cells as rendered (all "No canvas"). When I re-rendered them serially from a clean process, all 5 rendered successfully. Root cause is puppeteer state leaking after a timeout in an earlier sketch (gemma3_27b__old__p05 had a 30s `Runtime.callFunctionOn timed out`, after which subsequent renders in the same Node process returned "No canvas" for sketches that work fine from a fresh process). This is a renderer-harness issue worth noting but not worth fixing now — serial re-render from a clean process is reliable.

---

## 2026-04-18 — Deep qualitative analysis of v1 (114 rendered cells)

Beyond the wash()/mass() adherence counts, a per-prompt code read surfaced specific recipe gaps, regressions, and mis-steers. Artifacts preserved at `renders_v1/`, `manifest_v1.json`, git tag `recipes-v1`.

### Where v1 Recipes worked sharply (keep as-is)
- **Charcoal (p03)**: all four frontier models adopted `mass("crayon"/"pastel")` with graduated strengths (0.22 → 0.35 → 0.55). Textbook transfer of the non-obvious tip. This is the cleanest single-recipe win.
- **Watercolor layering (p01, p08, p09)**: wash opacities shifted from 20–55 (old) to 120–200 (new, matching our sweet spot). `fillBleed` + `fillTexture` used deliberately, not as afterthoughts.
- **State hygiene**: only 2 of 60 new cells have dangling state (Qwen3 missed `noWash`/`noHatch`). Zero bare-prefix `noField()` / `noMass()` violations — the "brush. prefix is required" fix on the Universal Principles landed cleanly.

### Gaps — Recipes had no effect on valid generative-art prompts
- **p12 particle-field work**: zero adherence delta, every model. No wash, no field-orchestration uptake. The Recipes has no recipe for "spray + field + wiggle" particle/atmospheric work, which is a common generative-art ask. v2 must add a `Particle Fields` recipe.
- **p06 "quick marker gestures"**: all five models used bare `set("marker")` strokes with zero washes. The current Marker recipe teaches *flat color areas + bold outlines*, skipping the pure-gestural use that the prompt literally requested. v2 should add a short `Gestural marker` subsection so the doc covers both modes.

### Regressions — v1 may have hurt Gemini on one prompt
- **p05 pen forest**: Gemini's OLD had rich multi-angle hatching (45°/135°, multiple densities, multiple pen types). Gemini's NEW wrapped hatching inside closed polygonal shapes — effectively using hatch to *fill shapes* instead of build the composition. Our cross-medium examples may have leaked "shape-build" patterns into the pen section. v2 should tighten the pen recipe to *line-only; hatching is the composition, not a fill for shapes*.

### Mis-steers — ranges read as constraints
- **Claude p09 (rainy night street)**: used `wash(255, 255, 255)` for an opaque night-sky background, deliberately breaking our 150–200 "sweet spot". The output is correct; the model silently did the right thing. But treating ranges as hard constraints is a failure mode on edge prompts. v2 should reframe ranges as *sweet spots, with one concrete counterexample (opaque night skies use wash 255)*.

### Model-capability ceiling — not a Recipes fix
- **Gemma 3 27B**: zero uptake of `wash()` across all 12 prompts in both conditions, near-zero `mass()`. The 14k-char context adds nothing at this model scale. v2 should add an honest preamble note that the patterns assist capable models; smaller/older models may ignore or misapply them. This strengthens, not weakens, the PR.

### Considered and rejected (for v2)
- **cpencil over-hatching warning** (Claude p04 had 25 hatch calls): without verifying the rendered output actually looks over-mechanical, a warning could suppress a valid technique. Leave as-is.
- **`fillBleed` "vary per shape" nuance**: Claude NEW drops fillBleed in some cells, but still produces watercolor-layered washes. The visual signal isn't strong enough to text-edit.

### v2 scope summary

Five focused edits to the Recipes section on `cookbook-recipes`:
1. Add new **Particle Fields** recipe (fills p12 gap). High confidence.
2. Tighten **Technical Pen** recipe: line-only, hatching is composition not shape-fill. Fixes p05 Gemini regression.
3. Add **Gestural marker** subsection within existing Marker recipe. Fills p06 coverage.
4. Reframe opacity ranges as "sweet spots" with a concrete counterexample (night skies = opaque wash). Minor safety net.
5. Add a one-paragraph **Preamble scope note**: these patterns assist capable models; smaller models may not absorb them. Honesty.

Net addition ≈ 60–80 lines on top of the existing 340. Still reviewable in one sitting.

### v2 experimental design

- Preserve v1 artifacts: ✅ `renders_v1/`, `manifest_v1.json`, git tag `recipes-v1`.
- Commit v2 edits to `cookbook-recipes` (single commit, clear message).
- Rerun A/B with a new `v2` condition (60 renders). Keep v1 `new` intact so we can show old → v1 → v2.
- Targeted validation:
  - p12 across all 5 models: does field/wash/wiggle adherence go up?
  - p05 Gemini: does it revert to multi-angle hatching without shape-wrapping?
  - p06 across all models: does any model pick up gestural marker explicitly?
  - General: overall adherence vs v1, no regressions elsewhere.

If v2 shows targeted improvements without regressions, ship v2 as the PR. If v2 regresses something, revert or tune further.

---

---
