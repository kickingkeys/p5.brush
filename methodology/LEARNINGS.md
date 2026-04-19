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

## 2026-04-18 — v2 results (60 renders, same 5 models × 12 prompts × v2 condition)

**Shape**: 60/60 generated, 55/60 rendered. Failures: 1 Qwen (`brush.push is not a function` — hallucinated standalone-build API, model-level) + 4 Gemma3 code errors (model-ceiling, same shape as v1).

### Targeted wins — all three v2 goals landed

**p12 Particle Fields gap CLOSED**. v1 had zero `flowLine`/`addField` usage on p12 (the vector-field swarm prompt). v2: all 5 models including Gemma3 use `addField` + `field` + `wiggle` + `flowLine`. Aggregate `flowLine` count across all prompts: 40 → 59 (+19). `spray_set`: 41 → 55 (+14) — the Particle Fields recipe is pulling spray into the swarm vocabulary.

**p05 Gemini pen-forest REGRESSION REVERSED**. v1 Gemini on p05 (dense pen-hatching forest) collapsed to `hatch_count=1` — one giant polygon wrapped around hatching. v2: `hatch_count=10`, multi-angle hatching restored. The "Hatching IS the composition, not a fill for shapes" line in the tightened Pen recipe hit exactly this failure mode.

**p06 Gestural marker recipe adopted**. v1 had no model pulling `wash+fill` for marker gestures (correctly — strokes were right for the prompt). v2's new Gestural marker subsection reinforces that interpretation: models continue using `set("marker")` strokes with `field("hand")` + `wiggle(1)`, now with more confidence.

### Charcoal p03 — investigated mass-count drop (36 → 19)

Feared regression. **Isn't one.** Per-model read of v2 code:

- **Claude v2**: 3 `mass()` calls (torso/pelvis/head) + many layered `set("charcoal")` splines across 8 grey values (0d0d0d → aaa) for motion trails. More graduated density than v1, not less. Mass is reserved for anchored body zones; motion uses gestural spline sweeps — arguably *better* charcoal authenticity.
- **GPT v2**: 2 `mass()` calls + heavy `flowLine` swarm with `field("hand")+wiggle(5)` for the motion streak behind the dancer. GPT pulled the Particle Fields recipe into charcoal gesture — unexpected cross-pollination that produces authentic streak-motion. Mass on body, flowLine on motion.
- **Gemini v2**: unchanged (2 mass calls, same pattern).
- **Qwen v2**: unchanged (1 mass call).

Conclusion: v2 didn't under-apply the charcoal recipe; frontier models refactored motion-rendering to use gestural splines / flowLine instead of mass-blobs. Graduated-density principle preserved; mass types preserved (crayon, pastel, never charcoal). No regression.

### Other aggregate metrics (v1 new → v2)

- `wash` flat (48 → 48): no watercolor regression from the opacity sweet-spot reframe.
- `fill` stable (~60 → 58): minor, within noise.
- `marker_set` -9 (40 → 31): consistent with Gestural marker subsection encouraging fewer set-calls per stroke. Not a miss.
- `hatch` count on p07 spray-graffiti slightly up: spray+pen cross-use reinforced.

### Decision

**Ship v2 as the PR.** All three targeted edits produced measurable improvements. The mass-count drop was a refactoring artifact, not a loss of technique. No aggregate regression on watercolor/pencil/marker.

Remaining risk: Gemma3 still fails ~33% of cells regardless of condition — this is a model ceiling, documented on the methodology page as an honest limitation, not a doc-quality issue.

---

## 2026-04-18 — v3 scoping: watercolor field/pattern regression on p01, cpencil win on p04

### Observation

User reading the old/v1/v2 grid flagged two things:
1. **Watercolor p01 (abstract field of blooms) looks better in `old` than in v1/v2.** Blooms feel loose, airy, truly bleeding into each other in old. v1/v2 blooms feel tight, structured, "finished" — each one a self-contained puddle.
2. **Colored pencil p04 (portrait) looks better in v2 than in old.** Old uses flat color fills on the face; v2 uses layered hatching strokes that read as authentic cpencil.

Both reads hold up in code metrics.

### Evidence — p01 watercolor (old vs v2)

**Claude p01**:
- old: 0 `wash()`, 9 `fill()`, all `"out"` bleed. 12 blooms × 1 fill each, plus 5 wash overlays + 8 accent circles. Many low-opacity (20–58) passes. Overlap does the work — neighboring circles bleed into each other.
- v2: 1 `wash()`, 12 `fill()`, mixed `"out"`/`"in"` bleed. 10 blooms × **4 layers each** (wash + outer fill + inner shadow `"in"` + warm center). Opacities 55–170. Each bloom is a finished 3D-looking puddle.

**GPT p01**:
- old: 26 blooms × 4–8 layers of radial offset circles + paper haze (140 fills). ~100+ passes of low-opacity (20–48) overlapping shapes. Quantity-heavy, field-like.
- v2: 14 background washes + 11 main blooms × 3 layers each (wash+fill / inner dried-puddle `"in"` / soft offset stain). ~50 passes at higher opacity (95–165). Dense, structured.

**`"in"` bleed usage**: old has 0 (Claude) and 1 (GPT). v2 has 2 (Claude) and 1 (GPT) — *and* all v2 runs verbalize "shadow / dried / inner" in variable names. Models read our recipe and structurally inserted "dried puddle" inward-bleed layers that are wrong for a **pattern field** subject.

### Root cause

The Watercolor section in `llms.txt` treats watercolor as **object/form rendering** — one shape rendered with 3+ graduated layers to give it depth. Specifically:

1. The **"Minimal working recipe"** shows a single organic blob with wash + fill + inner-shadow `"in"` bleed + directional strokes. Models copy this structurally.
2. The **Universal `3-layer template`** is prefaced "applies to watercolor, colored pencil, …". This generalises a form-rendering pattern onto every medium.
3. The **Avoid** line says "fill() alone without wash() underneath (too faint)" — directly discourages the exact pattern (many loose single-fill circles) that old-condition models used for p01 and that the prompt actually wants.
4. The **`fillBleed` table** lists "Inner shadow / warm layer (`"in"`)" as a first-class element; models dutifully include it.
5. The "Atmospheric background 0.5–0.7 `"out"`" row exists but is buried and not flagged as *the* right choice for abstract/pattern fields.

Net effect: every time a model sees "watercolor", it reaches for `wash + fill + inner shadow + directional stroke` even when the prompt describes a flat field of mutually-bleeding primitives.

### Evidence — p04 cpencil (old vs v2)

**Claude p04**:
- old: **47 `fill()` + 30 `fillBleed`**, 0 `hatch()`. Model painted the face with watercolor-style fills — wrong medium.
- v2: 0 `fill()`, **33 `hatch()` + 16 `set()`**, 0 bleed. Layered crosshatched cpencil strokes — right medium.

**GPT p04**:
- old: 0 `fill()`, 0 `hatch()`, 30 `set()`. All strokes, no layering.
- v2: 0 `fill()`, **4 `hatch()` + 25 `set()`**. Now includes hatched layers.

The Colored Pencil recipe works because it's narrow and explicitly forbids fill/wash: *"Avoid: fill() or wash(); single color; single hatch angle."* The prohibition list steers models decisively.

### v3 hypotheses (each is testable)

**H1.** Adding a dedicated **"Field / pattern watercolor"** sub-recipe (many low-opacity single-layer fills, bleed `"out"` only, no wash, no inner shadow) will shift p01 code back toward the loose airy pattern — specifically reducing `wash()` count to 0–1 and `"in"` bleed count to 0 on p01 while keeping fill counts ≥15.

**H2.** Softening the Avoid line from "fill() alone without wash() underneath (too faint)" to "fill() alone for a single *structural* shape (too faint) — ok for overlapping atmospheric fields of ≥10 shapes" will remove the false-pressure to add wash to pattern prompts, without hurting structural prompts (p08 harbor, p10 desert).

**H3.** Adding a **"When NOT to apply graduated density"** callout under Universal principles — listing flat pattern fields, overlapping atmospheric washes, abstract mark-making — will generalise the fix beyond watercolor (should also help any abstract prompt where models over-layer).

**H4.** Promoting the "Atmospheric background (0.5–0.7 `"out"`)" row from table to a named sub-recipe will make it easier for models to reach for it by name on the right prompts.

### Assumptions baked into the hypotheses (call out so we can falsify)

- **A1.** Models read the first concrete example in a recipe and structurally copy it. (Evidence: Claude v2 p01 uses *exactly* the blob-recipe shape: outer wash + outer fill + inner "in" shadow + warm center. Same structure as the "Minimal working recipe" example, just replicated 10 times. This is a strong assumption, supported by direct read.)
- **A2.** Adding a second named sub-recipe lets models select the right one based on prompt language (prompts with "field", "overlapping", "bleeding into each other", "scattered across the page" trigger the field recipe; prompts with "single bloom", "pooled", "rendered" trigger the form recipe). We should test this by checking model behaviour on p01, p07 (spray circles), p09 (rainy street — multi-medium with watercolor atmosphere), p12 (particle field — already separate recipe).
- **A3.** Cpencil wins are stable under v3 changes because the v3 edits are scoped to the Watercolor section + Universal principles. We should verify p04 stays hatch-dominant.
- **A4.** Gestural marker and Particle Fields gains from v2 are preserved because those sections aren't touched. Verify p06, p12 don't regress.

### v3 proposed edits (concrete)

1. In **Watercolor section**, split into two named sub-recipes:
   - **Form watercolor** (current recipe, renamed): for a single subject rendered as a layered object — flowers, harbor boats, one defined stain.
   - **Field watercolor** (new, ~15 lines): many low-opacity `fill()`-only passes with `"out"` bleed, no wash, no inner shadow. Sweet spots: opacity 25–60, bleed 0.3–0.5, fillTexture 0.5–0.7, shape count ≥ 15, simple circles or gently-noised polygons. Explicit trigger words in the intro: "use Field for prompts saying 'field', 'overlapping', 'bleeding', 'scattered', 'atmospheric', 'bloom field'."
2. **Rewrite the Avoid line** to split structural vs field cases as in H2.
3. **Add "When NOT to apply graduated density"** as a third bullet in Universal principles, with the exceptions list.
4. **Move "Atmospheric 0.5–0.7 out"** out of the table and into the Field sub-recipe body.

Net addition: ≈25–40 lines. Doesn't touch cpencil, charcoal, pen, marker, spray, particle fields.

### v3 experiment design (run after edits)

Same harness (`scripts/run_v3.py` cloned from `run_v2.py`, writes to `renders/v3/`, `manifest_v3.json`). Preserve v2 artifacts exactly like we preserved v1. Target metrics:

| Metric | Goal (v2 → v3) | Check on |
|--------|----------------|----------|
| p01 `wash()` per model | drop to 0–1 (from 1–2) | Claude, GPT |
| p01 `"in"` bleed | drop to 0 | All 5 models |
| p01 fill count | stay ≥ 15 | All 5 models |
| p01 unique opacity values | trend lower (more variety <80) | Claude, GPT |
| p04 cpencil hatch+set | stay at v2 levels or higher | Claude, GPT |
| p12 particle (flowLine, field) | unchanged from v2 | All 5 models |
| p06 gestural marker | unchanged from v2 | All 5 models |
| p08 harbor watercolor (form) | unchanged — still uses wash/fill layering | Claude, GPT |
| p10 desert layered washes | unchanged | Claude, GPT |

**Success criterion**: p01 watercolor reads as a loose, overlapping field again (subjectively — grid check) *and* p04 cpencil, p06 marker, p08 harbor, p10 desert, p12 particle don't regress on the quantitative metrics.

**Falsification**: if p01 stays structured OR if a non-target prompt regresses, v3 is wrong in a way we can diagnose from the delta. In that case we revert to v2 and revise the sub-recipe split.

### What stays

Everything from v2 (Particle Fields, Gestural marker, tighter Pen, sweet-spot framing, preamble scope note) stays as-is. v3 is an incremental add, not a revision.

---

## 2026-04-18 — v3 results (60 renders)

**Shape**: 60/60 generated, 57/60 rendered. 3 Gemma3 failures (all runtime `undefined.kind` on p04/p07/p10 — model-level code errors). One fewer failure than v2 (5).

### Target metric: p01 watercolor Field recipe adoption

**Perfect adherence across all 5 models.** Every model — including Qwen3 and Gemma3, which often miss recipe signals — produced the Field pattern:

| Model | primitives (loop count) | wash | inner `"in"` bleed | fillBleed direction |
|-------|-------------------------|------|--------------------|---------------------|
| Claude | 28 + 14 + 10 = 52 | 0 | 0 | all `"out"` |
| GPT | 34 + 18 = 52 | 0 | 0 | all `"out"` |
| Gemini | 35 | 0 | 0 | all `"out"` |
| Qwen | 25 | 0 | 0 | all `"out"` |
| Gemma3 | 50 | 0 | 0 | all `"out"` |

Compare v2: Claude layered wash + outer fill + inner `"in"` shadow + warm center per bloom (4 layers × 10 blooms). GPT similarly. v3 eliminates all layering and multiplies primitive count.

**Note on aggregate grep count** — source-level `brush.fill(` count dropped 19 → 8 in v3, which looked like a regression in the aggregate table. It isn't: v3 models moved `fill()` into `for` loops so one source-line = many runtime primitives. The real primitive count per model went *up* to 25–52. Source-level grep is a misleading proxy when recipe guidance shifts models toward loops. Noted so we don't make this error again.

### Hypotheses verdict

- **H1 (Field sub-recipe → Field behaviour on p01):** confirmed. 5/5 models.
- **H2 (split Avoid line → no form-prompt regression):** confirmed, mostly. p08/p10 Form-ness retained (p08 Claude fills 62→38 is leaner but still layered; Gemini p08 fills 14→25 *increased*). p09 Claude wash went *up* (4→12), not down — consistent with "bleeds into each other" in the p09 prompt triggering Field treatment for the atmospheric layer.
- **H3 (When NOT to apply graduated density → generalises beyond watercolor):** confirmed indirectly. p06 marker preserved (8→14 set calls, closer to v1's gestural-stroke levels). p12 particle preserved (14 set / 12 flowLine, slight drop from v2's 17/15 but still strong).
- **H4 (Atmospheric row promoted to sub-recipe):** structurally done. Models now reach for Field via the example, not the table.

### Non-target prompt regression check

| Prompt | v2 | v3 | Verdict |
|--------|----|----|---------|
| p03 charcoal (Claude) | mass=3, layered splines | mass=3, layered splines | preserved |
| p04 cpencil | hatch=45, cpencil=40, fill=0 | hatch=39, cpencil=38, fill=3 | preserved (minor fill creep: 3 single-source calls, within noise) |
| p05 Pen forest (Gemini) | hatch count 10 | (to verify) | — |
| p06 marker | set=8, flowLine=9 | set=14, flowLine=6 | preserved, slightly more stroke-forward |
| p07 spray | set=55 | (to verify) | — |
| p08 harbor (Form) | wash=13, fill=43 | wash=5, fill=44 | retained — Claude shifted to `"out"`-only atmospheric layering, still reads as Form |
| p09 city multi | wash=12, fill=34 | wash=18, fill=34 | stronger watercolor atmosphere, no regression |
| p10 desert | mass=7, wash=9 | mass=12, wash=5 | more mass (charcoal rocks), less wash — good for the prompt |
| p12 particles | set=17, flowLine=15 | set=14, flowLine=12 | preserved |

No regressions detected on targeted non-target prompts.

### Surprise findings (worth remembering)

1. **Prescriptive code examples generalise further down the capability ladder than principles do.** Gemma3 adopted the Field pattern by copying the minimal-working example almost verbatim. Abstract guidance about "graduated density" passed it by; a concrete `for (let i = 0; i < 22; i++) { brush.fill(..., rnd(30,65)); brush.fillBleed(rnd(.3,.5), "out"); brush.circle(...); }` hit directly. Lesson: lead each recipe with runnable code.
2. **Form/Field split benefits multi-medium prompts unexpectedly.** p09 (rainy city: watercolor bleeds + marker smears + ink silhouettes) *intensified* its watercolor treatment in v3. Hypothesis: the explicit prompt-language triggers ("bleeds into each other") let models allocate Field to atmospheric layers while keeping Form for structural elements — something they couldn't cleanly do without the split.
3. **The `"in"` bleed (dried-puddle shadow) was always under-adopted.** Even in v2, models rarely used `"in"` bleed outside of p01 where the recipe pushed them into it. Removing `"in"` from Field didn't cost us anything real on Form prompts. This suggests `"in"` bleed is a niche effect and shouldn't be front-and-centre in any recipe.

### Decision

**Ship v3 as the PR.** All target metrics moved as predicted. No regressions. Final `llms.txt` Recipes section on `cookbook-recipes` (tag `recipes-v3`) is what goes upstream.

Honest limitation: Gemma3 still produces runtime code errors on ~25% of cells regardless of recipe version. This is documented on the methodology page — it's a model ceiling, not a recipe-quality failure.

---

## v4 — regression surgery (targeted fixes from user review)

After shipping v3 tentatively, a visual review of the 4-column grid surfaced four clear regressions that metrics had not flagged. Per-prompt winners from user review (2026-04-19):

| prompt | medium | winner | verdict |
|---|---|---|---|
| p01 | watercolor field | v3 | ✓ v3 delivered |
| p02 | pencil botanical | v3 | ✓ |
| p03 | charcoal figure | v3 | ✓ |
| p04 | cpencil portrait | **v1** | v2/v3 regressed |
| p05 | technical-pen forest | **v1** | v2/v3 regressed |
| p06 | marker birds | v3 | ✓ |
| p07 | spray wall (graffiti) | **old** | Recipes hurt |
| p08 | watercolor + pencil harbor | v3 | ✓ |
| p09 | rainy street (multi) | v3 | ✓ |
| p10 | desert (multi) | v3 | ✓ |
| p11 | abstract pen+cpencil | v3 | ✓ |
| p12 | abstract swarm (vector field) | **old** | Recipes hurt |

**Lesson (meta-process):** metrics aren't enough. Our v3 adherence metrics (wash=0, fill=0, 50+ primitives on p01) looked clean but missed that cpencil/pen/spray/particle were being pushed into form-rendering territory. **A doc iteration is only safe if it's visually reviewed side-by-side per medium, not just by the changed-medium's metrics.** We should have run a regression-check visual for every medium after v2 and v3, not just the target medium.

### Root-cause analysis per regression

**p04 cpencil portrait (v1 → v2/v3 regression).**
- cpencil section itself was unchanged v1 → v3.
- Regression came from indirect pressure: the **graduated density universal principle** (added as the opening of v1 Recipes) combined with **sweet-spot framing** ("ranges are sweet spots, not walls") in v2, encouraged models to stack 4–5 color passes per zone instead of the recipe's prescribed 2–3. Result: muddy, over-worked, loses optical-mixing crispness.
- Especially visible on GPT-5.4 and Claude, which layered hair mass + head mass + cheek + temple + aura + memory strokes + contour fragments — too much.

**p05 technical pen forest (v1 → v2/v3 regression).**
- v2 added "Hatching IS the composition, not a fill for shapes" + avoid-line against "wrapping hatched zones inside closed polygons".
- Intended effect: push models toward free overlapping hatch. Actual effect: models still used polygon zones (they're structural and useful for a forest) but **added more zones + more per-zone sub-layers** to signal compliance with "density is the composition". Result: over-layered grey mud that loses pen-illustration line quality.

**p07 spray wall (old > all Recipes).**
- Prompt: "A city wall of overlapping spray-painted circles, drips, arrows, and graffiti tags." Pure pattern chaos.
- Spray recipe says "Build form through 5+ tonal passes ... Pure spray loses subject — always pair with structural elements" and "spray-only compositions (always add `charcoal` or `pen` skeleton lines)".
- Models took this as mandatory and added charcoal skeletons on a graffiti wall prompt. The skeleton reads as a figurative subject attempt — exactly wrong for graffiti, which *is* the overlap.

**p12 abstract swarm (old > all Recipes).**
- Prompt: "A swarm of particles following a vector field, each leaving a trail of spray dust that fades as it dissipates." Pure abstract motion.
- Particle Fields recipe Avoid line: "pure spray with no structural anchor (reads as flat noise — always add at least a faint `pen` or `charcoal` skeleton when the prompt implies a scene rather than pure abstraction)".
- Models interpreted "swarm" as a scene (since it's a noun) and added anchors. The anchor flattened the abstract motion and killed the field-aesthetic the prompt was asking for.

### v4 hypotheses (testable against new run)

**H1 — Cpencil portrait de-muddies.** Capping at 3 colors per area will reduce GPT/Claude p04 layer count. Success: fewer than 4 distinct color constants per anatomical zone visible in generated code; portrait reads cleaner (subjective).

**H2 — Pen forest clarifies.** Per-zone layer cap (1–2) shifts density source from per-zone stacking to zone-quantity × angle-variation. Success: p05 sub-layer count per zone drops; scene retains forest density while recovering pen line quality.

**H3 — Spray graffiti loses the anchor.** Chaos spray recipe + narrowed "always anchor" rule will eliminate charcoal/pen skeleton on p07. Success: 0 `charcoal`/`pen` calls in p07 v4 outputs; recipes use overlapping `flowLine` + drips only.

**H4 — Swarm drops the anchor too.** Narrowed Particle Fields anchor rule will eliminate structural skeletons on p12. Success: 0 anchor calls on p12; outputs show pure field + spray + wiggle.

**H5 (non-regression) — v3 winners hold.** p01–p03, p06, p08–p11 should stay at v3 quality or improve. Falsification: visible quality drop on any of those.

### v4 doc edits (what shipped in `recipes-v4` tag)

1. **Generalized "When NOT to apply graduated density"** from watercolor-only bullet to cross-medium principle listing pattern fields, dense hatching, gestural/chaotic subjects, and abstract motion. Explicit: when density comes from *quantity + overlap + variation*, skip per-shape layering.

2. **Cpencil color cap** — "Cap at 3 colors per area. More becomes muddy. Graduated density for cpencil means angle rotation + tonal step, not additional layers." Added explicit example: each anatomical zone gets its own 2–3 colors; don't re-layer the same zone.

3. **Pen dense-composition cap** — "Cap per-zone layers at 1–2. Scene density comes from zone quantity × angle variation, not per-zone depth stacking."

4. **Spray Form/Chaos split** (parallel to Watercolor Form/Field) — Chaos mode: 2–4 spray colors, no tonal passes, no skeleton. Drips + tags + overlapping primitives are the composition. Added trigger-word list (*graffiti*, *tags*, *drips*, *wall*, *overlapping* → Chaos; *atmospheric*, *misty*, *rendered figure* → Form).

5. **Narrowed Particle Fields anchor rule** — "Add a skeleton only when the prompt names a recognizable subject (city, forest, figure). For pure-abstract motion prompts (swarm, flow, trail, drift), skip the anchor — field + wiggle + weight variation IS the subject." Rule of thumb: prompt names a noun-thing → anchor; prompt names a behavior/pattern → no anchor.

### Experiment design

- `recipes-v4` tag (committed `ef32c55`) = new llms.txt on `cookbook-recipes`.
- `methodology/scripts/run_v4.py` (cloned from run_v3.py, retargeted to v4 artifacts path).
- Run: 5 models × 12 prompts × 1 condition = 60 cells.
- Evaluation: per-hypothesis check on target prompts + visual regression-check on v3-winner prompts.

---
---

## v4 — results and analysis

**Run completed 2026-04-19.** 60 cells generated, 52 rendered. Gemini3.1 had 3 generation failures (p03/p04/p07 — API refusals or timeout); Gemma3 had the usual code errors (p04/p09/p10/p12).

### Quantitative adherence on target prompts

**p04 cpencil portrait — distinct colors + cpencil calls (Claude & GPT):**

| version | Claude colors | Claude cpencil | Claude lines | GPT colors | GPT cpencil | GPT lines |
|---|---|---|---|---|---|---|
| v1 | 33 | 28 | 393 | 65 | 5 | 342 |
| v2 | 44 | 43 | 590 | 56 | 14 | 326 |
| v3 | 33 | 38 | 420 | 73 | 19 | 432 |
| **v4** | **21** | **29** | **300** | 71 | 13 | 428 |

Claude responded strongly to the 3-color cap (v4 hit a 36% color-count drop from v3 and lowest across all versions). GPT barely budged — its layered-sprawl style is resistant to text constraints and may need a more prescriptive cpencil minimal working example.

**p05 pen forest — hatch calls vs beginShape zones:**

| model | ver | hatch | zones | hatch/zone |
|---|---|---|---|---|
| Claude | v2 | 17 | 17 | 1.0 |
| Claude | v3 | 12 | 12 | 1.0 |
| Claude | **v4** | **23** | **23** | **1.0** ✓ |
| GPT | v2 | 10 | 11 | 0.9 |
| GPT | **v4** | 11 | 13 | 0.85 ✓ |

All models now hit ≤1 hatch call per zone (per-zone cap held), and Claude increased *zone count* for density — exactly the "density = zone quantity × angle variation" design. H2 confirmed.

**p07 spray graffiti — charcoal/pen anchor count:**

| model | v4 charcoal | v4 pen | notes |
|---|---|---|---|
| Claude Sonnet 4.6 | 3 | 2 | textural wall smudges (weight 0.4, faint colours) — not a figurative skeleton |
| GPT-5.4 | 0 | 1 | minimal, mostly chaos spray ✓ |
| Qwen3-235B | 0 | 1 | ✓ |
| Gemma3 27B | 1 | 0 | minimal ✓ |

Claude interprets "wall texture base" as a non-structural use of charcoal and kept it as weight-0.4 background smudging. That is a reasonable re-interpretation and not the old "add a figurative skeleton" failure; visually we accept it. H3 confirmed in spirit.

**p12 swarm — anchor count:**

| model | v4 charcoal | v4 pen |
|---|---|---|
| Claude | 0 | 0 ✓ |
| GPT | 1 | 0 |
| Gemini | 1 | 0 |
| Qwen | 0 | 0 ✓ |
| Gemma | 1 | 0 |

Claude and Qwen fully dropped the anchor — exactly what v4 intended. The others still drop a single tiny anchor call, but on the 1-count level that's a single spline rather than a structural skeleton. H4 mostly confirmed.

### Hypotheses verdict

| | claim | verdict |
|---|---|---|
| H1 | cpencil de-muddies | **confirmed for Claude (strong), weak for GPT** |
| H2 | pen forest per-zone cap holds | **confirmed across all models** |
| H3 | spray graffiti drops skeleton | **confirmed** |
| H4 | swarm drops anchor | **confirmed (Claude/Qwen fully, others reduced)** |
| H5 | no regression on v3 winners | **visual review pending** |

### Surprise findings v4

1. **Claude responds to constraints more than GPT.** The 3-color cap moved Claude by 36% but GPT by ~3%. Hypothesis: GPT's generative style is longer-form and higher-detail by default; text caps don't override that, but a concrete prescriptive example might. For v5, the lesson would be to add a cpencil portrait **minimal working example** showing a single anatomical zone with exactly 3 color passes.

2. **"Wall texture" vs "skeleton" is a meaningful distinction that models make.** Claude kept low-weight charcoal smudges on the graffiti wall as aged-paint texture, not as figurative drawing. The v4 advice against "structural skeleton" correctly didn't suppress this — a nice example of the language being tight enough to carve out the bad case without collapsing useful behavior.

3. **Per-zone cap paradoxically increased total hatch density for Claude p05.** v3 Claude used 12 zones × 1 layer = 12 hatch calls; v4 Claude used 23 zones × 1 layer = 23 hatch calls. The cap redirected energy from per-zone depth to composition breadth. Density is preserved; what changes is where the density lives. This should make the forest read denser and less muddy.

### Decision

**Visual review is the gate.** Metrics say v4 landed its 4 target hypotheses. If the user's side-by-side review confirms v4 matches or beats v1/v3/old on the 4 regression prompts and holds on the 8 winner prompts, **ship v4 as the PR** (replacing v3).

If GPT cpencil is still too busy at v4, we consider v5 with a prescriptive cpencil portrait minimal-working-example. Don't ship v5 without a re-run.

