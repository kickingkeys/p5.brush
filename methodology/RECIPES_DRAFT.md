# Draft — `## Recipes` section for `llms.txt`

**Status**: Revised draft. Will be inserted at line 408 of `llms.txt` on the `cookbook-recipes` branch.

**Content below the horizontal rule is what goes into `llms.txt`.** The notes under "Revision rationale" are for the methodology record, not the PR.

---

## Recipes

Patterns for combining the APIs above to produce medium-authentic output. Each medium has a characteristic recipe — ingredients (which APIs), proportions (parameter ranges), and order (what goes on top of what). The patterns below work in both builds; substitute `brush.push / translate / angleMode / seed` for p5 equivalents when using standalone, and remember to call `brush.render()` at the end of each frame.

Empirical validation, source code, and model-by-model before/after comparisons: https://kickingkeys.github.io/p5.brush/

### Universal principles

**Graduated density creates 3D form.** Vary mark density to encode light and shadow — sparse/thin/low-opacity for highlights, dense/thick/high-opacity for shadows. Applies to every medium: hatch spacing for pencil, spray concentration for airbrush, fill opacity for watercolor. The paper itself is the lightest value. Draw back-to-front, lightest-to-darkest.

A reusable 3-layer template (applies to watercolor, colored pencil, technical pen, marker, and dry-media mass fills):

```js
// lightest → darkest; widest → narrowest
for (const [scale, opacity] of [[1.00, 150], [0.75, 180], [0.45, 210]]) {
  brush.fill(color, opacity);                // or wash(), or hatch(), etc.
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.5);
  for (const [x, y] of shapePts)
    brush.vertex(lerp(cx, x, scale), lerp(cy, y, scale));
  brush.endShape(CLOSE);
}
```

**Colors render lighter than the hex value.** p5.brush consistently produces lighter output than the specified color. Use darker hex values than you'd intuitively pick.

**`beginShape`/`vertex` beats `circle()` for organic forms.** Use `beginShape(curvature)` with 20–40+ vertices and `noise()`-perturbed positions. `brush.circle()` is uniform and reads as digital.

**`wiggle(n)` + `field(name)` are the hand-feel toggles.** `brush.wiggle(1–3)` adds hand-drawn wobble. `brush.field("hand")` gives gestural direction. Use both for charcoal; `wiggle(1)` only for marker; `field("curved")` for organic watercolor washes. Reset with `noField()`.

**Clean up state.** Always call `noStroke()`, `noFill()`, `noWash()`, `noHatch()`, `noMass()`, `noField()` after each feature. Forgotten state leaks into subsequent shapes.

---

### Watercolor

Translucent washes. Color bleeds at edges. Paper shows through. Three elements: (1) contained shapes with controlled bleed, (2) translucent layered fills, (3) directional strokes for form.

**Minimal working recipe — a single watercolor blob:**

```js
// Generate organic shape
const cx = 300, cy = 300, pts = [];
for (let i = 0; i < 36; i++) {
  const a = (i / 36) * 360;
  const r = 120 + noise(cos(a) * 0.05, sin(a) * 0.05) * 40;
  pts.push([cx + cos(a) * r, cy + sin(a) * r]);
}

// Wash base for color saturation + fill layer for watercolor texture
brush.fillTexture(0.85, 0.5);
brush.wash("#b8860b", 160);
brush.fill("#d4a017", 200);
brush.fillBleed(0.35, "out");
brush.noStroke();
brush.beginShape(0.5);
for (const p of pts) brush.vertex(p[0], p[1]);
brush.endShape(CLOSE);
brush.noWash();

// Inner warm-shadow layer — bleeds inward (dried-puddle effect)
brush.fill("#ff9900", 70);
brush.fillBleed(0.4, "in");
brush.beginShape(0.5);
for (const p of pts) brush.vertex(lerp(cx, p[0], 0.8), lerp(cy, p[1], 0.8));
brush.endShape(CLOSE);

// Directional strokes for form — cpencil following contours
brush.set("cpencil", "#b30000", 0.5);
brush.spline(pts.slice(0, 12), 0.3);
```

**`fillBleed` by element type:**

| Element | fillBleed | Notes |
|---------|-----------|-------|
| Structural (petals, leaves) | 0.25–0.4 (`"out"`) | Contained, soft edges |
| Inner shadow / warm layer | 0.3–0.5 (`"in"`) | Inward bleed = dried puddle |
| Atmospheric background | 0.5–0.7 (`"out"`) | Loose, dreamy, out-of-focus |
| Fine detail | 0.1–0.2 | Precise without spreading |

**Sweet spots**: fill opacity 120–200, wash opacity 150–200, `fillTexture(0.6–0.9, 0.3–0.6)`, curvature 0.4–0.55, 20–40+ vertices per organic shape. Warm cream backgrounds (`"#fdfbf4"`, `"#faf4ec"`) simulate watercolor paper.

**Avoid**: `fill()` alone without `wash()` underneath (too faint); uniform `fillBleed` on every shape; outlines around watercolor shapes (washes define edges); a single opaque pass instead of 2–4 layered fills.

---

### Pencil / Graphite — `2B`, `HB`, `2H`

Grayscale only (`#000`–`#666`). Lines and hatching, never fills. Tone emerges from hatch density and stroke-weight variation.

```js
brush.noFill();

// Contour with pressure variation
brush.set("HB", "#333", 1.0);
brush.spline([[x1, y1, 0.4], [x2, y2, 0.8], [x3, y3, 1.0]], 0.4);

// Light zone — sparse 2H
brush.hatchStyle("2H", "#666", 0.6);
brush.hatch(10, 45, { rand: 0.06, continuous: true });
brush.beginShape(0.3); /* outer shape */ brush.endShape(true);
brush.noHatch();

// Dark shadow — dense 2B cross-hatching at two angles
brush.hatchStyle("2B", "#222", 1.2);
brush.hatch(3, 45, { rand: 0.05, continuous: true });
brush.hatch(4, 120, { rand: 0.07, continuous: true });
brush.beginShape(0.4); /* shadow shape */ brush.endShape(true);
brush.noHatch();
```

**Hatch spacing by tone**: light 8–12, medium 5–7, dense 2–4. Always ≥2 angles per shadow zone for cross-hatching. Stroke weights 0.4–1.5 only — heavier loses pencil delicacy.

**Avoid**: `fill()` or `wash()`; uniform density; single-angle hatching; weights above 1.5; color (use `cpencil` for that).

---

### Charcoal

Bold, grainy, textured. Rich darks against paper. Full tonal range from paper-white to velvet black.

Use `brush.set("charcoal")` for strokes and `brush.mass("crayon")` or `brush.mass("pastel")` for textured fills — **not** `mass("charcoal")`. The crayon and pastel brushes produce better dry-media fill texture.

```js
brush.field("hand");    // organic mark direction
brush.wiggle(4);

// Light tone — sparse hatch only
brush.hatchStyle("charcoal", "#666", 0.8);
brush.hatch(8, 45, { rand: 0.12 });
brush.beginShape(0.3); /* light zone */ brush.endShape(true);
brush.noHatch();

// Mid tone — mass("pastel") + hatch
brush.mass("pastel", "#3a3a3a", { strength: 0.45, precision: 0.5, gradient: 0.6 });
brush.hatchStyle("charcoal", "#444", 1.0);
brush.hatch(6, 75, { rand: 0.15 });
brush.beginShape(0.3); /* mid zone */ brush.endShape(true);
brush.noMass(); brush.noHatch();

// Dark shadow — mass("crayon") + dense hatch
brush.mass("crayon", "#111", { strength: 0.85, precision: 0.3, outline: true });
brush.hatchStyle("charcoal", "#222", 2.0);
brush.hatch(4, 105, { rand: 0.2 });
brush.beginShape(0.3); /* dark zone */ brush.endShape(true);
brush.noMass(); brush.noHatch();

brush.noField();
```

**Critical**: preserve ≥30% of the canvas as light/paper values. Charcoal can only darken — the paper *is* your highlight. Plan light areas before drawing.

**`mass` strength by tone**: light 0.2–0.4 (1 pass), mid 0.45–0.65 (2 passes), dark 0.7–0.9 (3 passes).

**Avoid**: over-darkening to all-black (common failure mode); `mass("charcoal")`; watercolor APIs (`fill`, `wash`, `fillBleed`); mechanical marks (always `field("hand")` + `wiggle(3–5)`).

---

### Colored Pencil — `cpencil`

Waxy layered color through overlapping strokes. Strokes only — no fills. `cpencil` has built-in low opacity; color builds through overlap.

```js
brush.noFill();

// Base color
brush.hatchStyle("cpencil", "#cc4466", 0.8);
brush.hatch(4, 30, { rand: 0.05 });
brush.beginShape(0.4); /* shape */ brush.endShape(true);
brush.noHatch();

// Second color at a different angle — optical mixing
brush.hatchStyle("cpencil", "#993344", 0.6);
brush.hatch(5, 75, { rand: 0.05 });
brush.beginShape(0.4); /* same or smaller shape */ brush.endShape(true);
brush.noHatch();
```

Use 2–3 colors per area (light → mid → dark of the same hue) at different hatch angles (e.g. 30°, 75°, 120°). Different color per angle creates optical color mixing. Stroke weights 0.5–1.2.

**Avoid**: `fill()` or `wash()`; single color; single hatch angle (flat, un-mixed); stroke weights above 1.2 (loses waxy feel).

---

### Technical Pen — `pen`, `rotring`

Precise, uniform lines. Shading through graduated hatching density. Works for organic subjects (botanical illustration), not just geometric designs.

```js
// Outer contour: pen (slightly variable width)
brush.set("pen", "#000", 1.3);
brush.beginShape(0.3); /* outline shape */ brush.endShape(CLOSE);

// Graduated zones — different angle per zone prevents moiré
brush.hatchStyle("rotring", "#000", 0.3);
brush.hatch(4.0, 75, { rand: 0.05, continuous: true });
brush.beginShape(0.3); /* light zone — 55% scale */ brush.endShape(CLOSE);
brush.noHatch();

brush.hatchStyle("rotring", "#000", 0.5);
brush.hatch(1.5, 105, { rand: 0.05, continuous: true });
brush.beginShape(0.3); /* shadow — 25% scale */ brush.endShape(CLOSE);
brush.noHatch();
```

`pen` = slightly variable width, natural feel (best for outlines). `rotring` = more uniform, thinner (best for hatching). Hatch angles offset 15–30° per zone.

**Avoid**: fills (`fill`, `wash` — pen is line-only); single-angle hatching (causes moiré); using `charcoal` or `2B` for hatching (wrong texture).

---

### Marker

Bold, opaque, flat. Strong outlines. The **opposite** of watercolor — nothing translucent or soft. Clean, hard edges.

Only `brush.wash(color, 200–255)` for fills (never `brush.fill()` — that's translucent watercolor). Only `brush.set("marker")` for outlines (never charcoal or pencil brushes — those produce soft or grainy edges).

```js
brush.noStroke();

// Three values per color — depth from VALUE SHIFT, not transparency
brush.wash("#ff9988", 230);  // highlight
brush.beginShape(0.3); /* highlight area */ brush.endShape(CLOSE);

brush.wash("#ff6655", 230);  // main
brush.beginShape(0.3); /* body */ brush.endShape(CLOSE);

brush.wash("#cc3322", 230);  // shadow
brush.beginShape(0.3); /* shadow */ brush.endShape(CLOSE);
brush.noWash();

// Bold outlines on top
brush.set("marker", "#222", 2.5);
brush.beginShape(0.3); /* outline */ brush.endShape(CLOSE);
```

Depth = value shifts (light/mid/dark of the same hue), not transparency or bleed. `beginShape(0.2–0.4)` for harder, cleaner edges. `brush.wiggle(1)` adds subtle hand-applied feel without softening edges.

**Avoid**: `brush.fill()` (that's watercolor); `fillBleed()` (soft edges); charcoal or pencil brushes for outlines; wash opacity below 200.

**Library limitation**: p5.brush's marker simulation doesn't fully reproduce real marker streakiness. Best achievable is bold outlines + opaque wash fills + 3-value shading. If the user asks for a "realistic marker" look, set expectations.

---

### Spray / Airbrush

Soft, diffuse, atmospheric. Smooth gradients from many layered passes. No hard edges.

Build form through **5+ tonal passes** (dark → mid-dark → mid → light → highlight), not one or two heavy ones. Each lighter pass: lower weight, shorter line length, smaller radius, smaller count. Pure spray loses subject — always pair with structural elements.

```js
brush.field("curved");

// Pass 1 — shadow (bottom layer, heaviest)
brush.set("spray", "#881122", 3.0);
for (let i = 0; i < 150; i++) {
  brush.flowLine(cx + random(-15, 15), cy + random(15, 30),
                 random(12, 28), random(360));
}

// Pass 2 — mid-dark
brush.set("spray", "#cc3344", 2.2);
for (let i = 0; i < 120; i++) {
  brush.flowLine(cx + random(-10, 10), cy + random(-5, 20),
                 random(8, 20), random(360));
}

// Pass 3 — mid
brush.set("spray", "#dd5566", 1.5);
for (let i = 0; i < 100; i++) {
  brush.flowLine(cx + random(-8, 8), cy + random(-10, 10),
                 random(6, 15), random(360));
}

// Pass 4 — light
brush.set("spray", "#ee8899", 0.8);
for (let i = 0; i < 70; i++) {
  brush.flowLine(cx + random(-5, 5), cy + random(-15, 0),
                 random(4, 10), random(360));
}

// Pass 5 — highlight (top layer, lightest)
brush.set("spray", "#ffbbcc", 0.4);
for (let i = 0; i < 40; i++) {
  brush.flowLine(cx + random(-3, 3), cy + random(-20, -5),
                 random(3, 7), random(360));
}

brush.noField();

// Structural anchor — skeleton lines in charcoal or pen (NOT spray)
brush.set("charcoal", "#333", 1.0);
brush.spline(skeletonPoints, 0.4);
```

**Weight controls spread**: fine 0.3–1.0, medium 1.1–2.0, atmospheric 2.5–3.5. Offset each pass spatially toward the light source (shadow passes toward dark side, highlight passes toward light side).

**Avoid**: fewer than 5 passes (reads as flat noise); uniform weight across passes; outlines drawn with `spray` (loses crispness); spray-only compositions (always add `charcoal` or `pen` skeleton lines).

**Library limitation**: spray produces beautiful atmospheric effects but has no subject-recognition on its own. Structural anchoring is mandatory.

---

### Dry Media Fill — `mass()` with crayon / pastel

Opaque textured fill like crayons or oil pastels. `mass()` saves and restores brush and wiggle state automatically.

```js
brush.mass("crayon", "#cc5544", {
  strength: 0.7,   // 0–0.33 = 1 pass, 0.34–0.66 = 2, 0.67–1 = 3 passes
  precision: 0.5,  // low = rough/loose, high = controlled
  gradient: 0.3,   // directional fade
  outline: true
});
brush.beginShape(0.4); /* shape */ brush.endShape(true);
brush.noMass();
```

---

### Common cross-medium mistakes

| Mistake | Fix |
|---------|-----|
| Missing `brush.scaleBrushes(3)` | Marks invisible at 600×600 |
| Missing `translate(-width/2, -height/2)` (p5 build) | Drawing offset in WEBGL |
| Missing `brush.render()` at frame end (standalone build) | Nothing appears on screen |
| `brush.circle()` for organic shapes | Use `beginShape`/`vertex` with `noise()` |
| Uniform opacity/density across a shape | Vary for depth — darker/denser = closer |
| Fills on line-only mediums (pencil, pen, colored pencil) | Hatching and strokes only |
| Outlines around fill-based mediums (watercolor) | Washes define edges; no outlines |
| Confusing mediums | Charcoal ≠ pencil (bold gestural vs fine precise). Marker ≠ watercolor (opaque wash vs translucent fill). Pencil = grayscale; cpencil = color. |
| Forgetting `noWash()` / `noMass()` / `noHatch()` / `noField()` | State leaks into subsequent shapes |
| Hex colors read too saturated | p5.brush renders lighter than hex — use darker values |

---

## Revision rationale (not going into PR)

Changes from the first draft:

1. **Intro rewritten** — less self-referential. Cut "derived from experimental iteration." Empirical-validation link demoted to a secondary sentence.
2. **Universal Principles section expanded** with:
   - The "colors render lighter" insight (real, validated finding)
   - `wiggle()` + `field()` cross-medium toggles
   - `cleanup state` reminder
   - A concrete 3-layer graduated-density code template (LLMs copy code better than prose)
3. **Watercolor** now leads with a **complete minimal working sketch** (~20 lines) — an LLM can pattern-match on this directly without needing to hallucinate `shapePoints`.
4. **Colored Pencil and Technical Pen** now have explicit "Avoid" blocks (consistency with other sections).
5. **Spray** now shows the full **5-pass pattern** the research validated, rather than a 2-pass simplification.
6. **Build-compat caveat** strengthened in the intro (explicit call-outs for standalone's `brush.render()`).
7. **Common mistakes table** expanded with: missing `brush.render()`, hex-too-saturated, and extended "fills on line-only mediums" to include colored pencil.
8. **Marker wash opacity** — clarified the range (200–255) and why 230 specifically works.
9. **Line count**: ~265 lines. Upstream llms.txt grows from 430 → ~695. Still tractable for agent context windows.

**What I intentionally kept short**: Dry Media Fill (single code block, no rationale padding); the non-watercolor recipes (placeholder-based, terser). Rationale: watercolor is the hardest medium and the #1 request, deserves the complete-example treatment. Others pattern-match from placeholders reliably in stronger models and from the Universal Principles template for weaker ones.
