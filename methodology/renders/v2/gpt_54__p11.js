function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  const palette = {
    paper: "#fffaf3",
    sand: "#b79f7d",
    ochre: "#9e8156",
    clay: "#8b6a55",
    sage: "#7f8771",
    olive: "#6b6b4e",
    slate: "#6c7480",
    umber: "#5d473a",
    rust: "#8a5743",
    ink: "#2f2a26"
  };

  brush.noField();
  brush.noWash();
  brush.noMass();
  brush.noHatch();
  brush.noFill();
  brush.noStroke();

  // faint underpainting blocks
  const blocks = [
    { x: 38,  y: 54,  w: 172, h: 136, c: palette.sand,  a: 62 },
    { x: 182, y: 82,  w: 240, h: 154, c: palette.sage,  a: 52 },
    { x: 356, y: 48,  w: 188, h: 186, c: palette.ochre, a: 58 },
    { x: 72,  y: 212, w: 220, h: 150, c: palette.clay,  a: 48 },
    { x: 248, y: 226, w: 184, h: 128, c: palette.slate, a: 46 },
    { x: 404, y: 214, w: 132, h: 170, c: palette.olive, a: 50 },
    { x: 44,  y: 388, w: 182, h: 150, c: palette.ochre, a: 54 },
    { x: 198, y: 370, w: 210, h: 154, c: palette.rust,  a: 42 },
    { x: 388, y: 398, w: 160, h: 124, c: palette.sand,  a: 44 }
  ];

  brush.noStroke();
  for (let b of blocks) {
    brush.fill(b.c, b.a);
    brush.fillBleed(0.12, "out");
    brush.fillTexture(0.55, 0.25, false);
    brush.rect(b.x, b.y, b.w, b.h, "corner");
  }
  brush.noFill();

  // larger hatched composition rectangles
  const rects = [
    {
      x: 52, y: 66, w: 174, h: 142,
      fill: palette.sand, fillA: 48,
      hatchBrush: "cpencil", hatchColor: "#7d6b52", hatchWeight: 0.8,
      dist: 7, ang: 18, opts: { rand: 0.08, continuous: true },
      outlineBrush: "pen", outlineColor: "#4a4139", outlineWeight: 0.9
    },
    {
      x: 204, y: 92, w: 232, h: 146,
      fill: palette.sage, fillA: 44,
      hatchBrush: "rotring", hatchColor: "#58604d", hatchWeight: 0.45,
      dist: 8, ang: 92, opts: { rand: 0.04, continuous: true },
      outlineBrush: "pen", outlineColor: "#3d4338", outlineWeight: 0.9
    },
    {
      x: 356, y: 56, w: 166, h: 202,
      fill: palette.ochre, fillA: 50,
      hatchBrush: "cpencil", hatchColor: "#7a603f", hatchWeight: 0.75,
      dist: 6, ang: 120, opts: { rand: 0.07, continuous: true },
      outlineBrush: "HB", outlineColor: "#54463a", outlineWeight: 0.9
    },
    {
      x: 70, y: 208, w: 246, h: 170,
      fill: palette.clay, fillA: 40,
      hatchBrush: "cpencil", hatchColor: "#704f44", hatchWeight: 0.82,
      dist: 7, ang: 32, opts: { rand: 0.08, continuous: true },
      outlineBrush: "pen", outlineColor: "#4d3a32", outlineWeight: 0.95
    },
    {
      x: 256, y: 228, w: 182, h: 134,
      fill: palette.slate, fillA: 36,
      hatchBrush: "rotring", hatchColor: "#505761", hatchWeight: 0.42,
      dist: 5, ang: 0, opts: { rand: 0.05, continuous: true },
      outlineBrush: "HB", outlineColor: "#444950", outlineWeight: 0.85
    },
    {
      x: 404, y: 220, w: 128, h: 176,
      fill: palette.olive, fillA: 42,
      hatchBrush: "cpencil", hatchColor: "#56563d", hatchWeight: 0.8,
      dist: 7, ang: 148, opts: { rand: 0.08, continuous: true },
      outlineBrush: "pen", outlineColor: "#3f402d", outlineWeight: 0.88
    },
    {
      x: 48, y: 386, w: 188, h: 144,
      fill: palette.ochre, fillA: 42,
      hatchBrush: "cpencil", hatchColor: "#816645", hatchWeight: 0.75,
      dist: 8, ang: 78, opts: { rand: 0.08, continuous: true },
      outlineBrush: "HB", outlineColor: "#564737", outlineWeight: 0.88
    },
    {
      x: 208, y: 366, w: 220, h: 160,
      fill: palette.rust, fillA: 34,
      hatchBrush: "cpencil", hatchColor: "#774739", hatchWeight: 0.78,
      dist: 6, ang: 24, opts: { rand: 0.08, continuous: true },
      outlineBrush: "pen", outlineColor: "#4b3129", outlineWeight: 0.92
    },
    {
      x: 396, y: 406, w: 150, h: 116,
      fill: palette.sand, fillA: 36,
      hatchBrush: "rotring", hatchColor: "#6e624f", hatchWeight: 0.4,
      dist: 7, ang: 98, opts: { rand: 0.05, continuous: true },
      outlineBrush: "HB", outlineColor: "#4d463f", outlineWeight: 0.8
    }
  ];

  for (let r of rects) {
    push();
    brush.noStroke();
    brush.noHatch();
    brush.fill(r.fill, r.fillA);
    brush.fillBleed(0.1, "out");
    brush.fillTexture(0.45, 0.2, false);
    brush.rect(r.x, r.y, r.w, r.h, "corner");

    brush.noFill();
    brush.hatchStyle(r.hatchBrush, r.hatchColor, r.hatchWeight);
    brush.hatch(r.dist, r.ang, r.opts);
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();

    brush.set(r.outlineBrush, r.outlineColor, r.outlineWeight);
    brush.noFill();
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    pop();
  }

  // selected cross-hatching overlays for denser intersections
  const overlays = [
    { x: 206, y: 92,  w: 20,  h: 116, b: "2H", c: "#5f5648", wt: 0.45, d: 10, a: 25 },
    { x: 356, y: 92,  w: 80,  h: 146, b: "2B", c: "#53483d", wt: 0.7,  d: 6,  a: 140 },
    { x: 256, y: 228, w: 60,  h: 134, b: "2H", c: "#50545b", wt: 0.4,  d: 7,  a: 88 },
    { x: 404, y: 228, w: 34,  h: 134, b: "2B", c: "#444536", wt: 0.65, d: 5,  a: 34 },
    { x: 208, y: 386, w: 28,  h: 140, b: "2H", c: "#63463f", wt: 0.45, d: 8,  a: 102 },
    { x: 396, y: 406, w: 32,  h: 116, b: "2B", c: "#5d564d", wt: 0.65, d: 5,  a: 8 }
  ];

  for (let o of overlays) {
    brush.noFill();
    brush.hatchStyle(o.b, o.c, o.wt);
    brush.hatch(o.d, o.a, { rand: 0.06, continuous: true });
    brush.rect(o.x, o.y, o.w, o.h, "corner");
    brush.noHatch();
  }

  // line work subdivisions
  const divs = [
    ["rotring", "#534b43", 0.35, 52, 136, 226, 136],
    ["rotring", "#534b43", 0.35, 134, 66, 134, 208],
    ["pen", "#4e5747", 0.55, 204, 168, 436, 168],
    ["rotring", "#4d544a", 0.35, 320, 92, 320, 238],
    ["HB", "#594734", 0.65, 356, 138, 522, 138],
    ["rotring", "#594734", 0.35, 438, 56, 438, 258],
    ["pen", "#5b463f", 0.55, 70, 286, 316, 286],
    ["rotring", "#5b463f", 0.35, 146, 208, 146, 378],
    ["HB", "#4e5460", 0.55, 256, 296, 438, 296],
    ["rotring", "#4e5460", 0.3, 350, 228, 350, 362],
    ["pen", "#454630", 0.5, 468, 220, 468, 396],
    ["HB", "#6c543d", 0.55, 48, 458, 236, 458],
    ["rotring", "#6c543d", 0.35, 132, 386, 132, 530],
    ["pen", "#59392f", 0.55, 208, 446, 428, 446],
    ["rotring", "#59392f", 0.35, 318, 366, 318, 526],
    ["HB", "#5a534a", 0.5, 396, 464, 546, 464]
  ];

  for (let d of divs) {
    brush.set(d[0], d[1], d[2]);
    brush.line(d[3], d[4], d[5], d[6]);
  }

  // gestural colored pencil seams
  const seamLines = [
    { c: "#84684c", w: 0.55, pts: [[92, 104], [164, 112], [236, 124], [328, 120]], curv: 0.25 },
    { c: "#62705e", w: 0.5,  pts: [[214, 116], [286, 136], [366, 146], [430, 136]], curv: 0.3 },
    { c: "#725444", w: 0.55, pts: [[84, 326], [160, 310], [242, 302], [332, 314]], curv: 0.35 },
    { c: "#545b66", w: 0.45, pts: [[272, 260], [314, 278], [366, 284], [430, 274]], curv: 0.35 },
    { c: "#7a4c3a", w: 0.55, pts: [[212, 398], [274, 408], [356, 402], [430, 416]], curv: 0.3 }
  ];

  for (let s of seamLines) {
    brush.set("cpencil", s.c, s.w);
    brush.spline(s.pts, s.curv);
  }

  // subtle graphite construction marks
  brush.set("2H", "#7c746a", 0.35);
  for (let y = 80; y <= 520; y += 88) {
    brush.line(36, y, 564, y + random(-6, 6));
  }
  for (let x = 78; x <= 520; x += 104) {
    brush.line(x, 40, x + random(-5, 5), 560);
  }

  // darker anchor edges
  const anchors = [
    [226, 92, 226, 208],
    [356, 56, 356, 258],
    [316, 208, 316, 378],
    [438, 228, 438, 362],
    [236, 386, 236, 530],
    [428, 366, 428, 526]
  ];
  brush.set("2B", "#3c342d", 0.72);
  for (let a of anchors) {
    brush.line(a[0], a[1], a[2], a[3]);
  }

  noLoop();
}