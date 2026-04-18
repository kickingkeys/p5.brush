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
