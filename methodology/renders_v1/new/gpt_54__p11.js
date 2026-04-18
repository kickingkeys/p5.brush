let palette = {
  paper: "#fffaf3",
  line: "#2f2a26",
  olive: "#6f7656",
  sage: "#8a9272",
  ochre: "#a88b5a",
  clay: "#b06e58",
  umber: "#6d5846",
  dustBlue: "#738491",
  sand: "#c8b89b",
  stone: "#9c947f"
};

let rects = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  rects = [
    { x: 48,  y: 64,  w: 180, h: 118, fill: palette.sand,    hatchColor: palette.umber, hatchBrush: "cpencil", dist: 9,  ang: 28,  weight: 0.8, outline: "pen",    outlineColor: palette.line,    outlineWeight: 0.65, curve: 0.18 },
    { x: 182, y: 40,  w: 258, h: 150, fill: palette.sage,    hatchColor: palette.olive, hatchBrush: "cpencil", dist: 8,  ang: 92,  weight: 0.85, outline: "rotring", outlineColor: palette.line,    outlineWeight: 0.45, curve: 0.15 },
    { x: 392, y: 72,  w: 150, h: 118, fill: palette.ochre,   hatchColor: palette.umber, hatchBrush: "2H",      dist: 7,  ang: 138, weight: 0.7, outline: "pen",    outlineColor: palette.umber,   outlineWeight: 0.55, curve: 0.16 },
    { x: 74,  y: 176, w: 238, h: 146, fill: palette.dustBlue,hatchColor: palette.line,  hatchBrush: "rotring", dist: 6,  ang: 42,  weight: 0.45,outline: "pen",    outlineColor: palette.line,    outlineWeight: 0.7,  curve: 0.18 },
    { x: 248, y: 172, w: 220, h: 128, fill: palette.clay,    hatchColor: palette.umber, hatchBrush: "cpencil", dist: 7,  ang: 118, weight: 0.8, outline: "rotring", outlineColor: palette.line,    outlineWeight: 0.45, curve: 0.14 },
    { x: 420, y: 184, w: 118, h: 208, fill: palette.stone,   hatchColor: palette.line,  hatchBrush: "2H",      dist: 7,  ang: 12,  weight: 0.6, outline: "pen",    outlineColor: palette.line,    outlineWeight: 0.6,  curve: 0.12 },
    { x: 54,  y: 302, w: 170, h: 206, fill: palette.ochre,   hatchColor: palette.clay,  hatchBrush: "cpencil", dist: 8,  ang: 72,  weight: 0.8, outline: "pen",    outlineColor: palette.umber,   outlineWeight: 0.55, curve: 0.2  },
    { x: 176, y: 330, w: 258, h: 150, fill: palette.sand,    hatchColor: palette.olive, hatchBrush: "cpencil", dist: 9,  ang: 148, weight: 0.75,outline: "rotring", outlineColor: palette.line,    outlineWeight: 0.4,  curve: 0.16 },
    { x: 370, y: 292, w: 164, h: 168, fill: palette.sage,    hatchColor: palette.umber, hatchBrush: "2B",      dist: 5,  ang: 96,  weight: 0.75,outline: "pen",    outlineColor: palette.line,    outlineWeight: 0.6,  curve: 0.14 },
    { x: 230, y: 470, w: 238, h: 86,  fill: palette.dustBlue,hatchColor: palette.line,  hatchBrush: "rotring", dist: 6,  ang: 18,  weight: 0.4, outline: "pen",    outlineColor: palette.line,    outlineWeight: 0.62, curve: 0.12 }
  ];
}

function draw() {
  background(palette.paper);
  translate(-width / 2, -height / 2);
  randomSeed(11);
  noiseSeed(11);

  drawPaperGrain();
  drawUnderpainting();
  drawRectangles();
  drawCrossLinks();
  drawFrameLines();

  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#d8d0c3", 0.28);

  for (let i = 0; i < 220; i++) {
    let x = random(20, width - 20);
    let y = random(20, height - 20);
    let len = random(8, 22);
    let a = random(-20, 20);
    push();
    translate(x, y);
    rotate(a);
    brush.line(-len * 0.5, 0, len * 0.5, 0);
    pop();
  }
}

function drawUnderpainting() {
  brush.noStroke();
  brush.noHatch();
  brush.fillTexture(0.75, 0.35, false);
  brush.fillBleed(0.18, "out");

  let blocks = [
    { x: 30, y: 26, w: 260, h: 180, c: "#d8c7ad", a: 80 },
    { x: 300, y: 50, w: 250, h: 160, c: "#c0c7b3", a: 75 },
    { x: 42, y: 210, w: 210, h: 150, c: "#d7b59d", a: 65 },
    { x: 260, y: 214, w: 290, h: 112, c: "#c6b49d", a: 62 },
    { x: 22, y: 360, w: 260, h: 170, c: "#d6c4a5", a: 70 },
    { x: 286, y: 352, w: 268, h: 184, c: "#b8c2c7", a: 58 }
  ];

  for (let b of blocks) {
    brush.fill(b.c, b.a);
    organicRect(b.x, b.y, b.w, b.h, 10, 3, 0.52);
  }

  brush.noFill();
}

function drawRectangles() {
  for (let r of rects) {
    fillBlock(r);
    hatchBlock(r);
    if (random() < 0.75) {
      secondHatch(r);
    }
    outlineBlock(r);
  }
}

function fillBlock(r) {
  brush.noStroke();
  brush.noHatch();
  brush.fillTexture(0.8, 0.42, false);
  brush.fillBleed(0.16, "out");
  brush.fill(r.fill, 92);
  organicRect(r.x, r.y, r.w, r.h, 10, 2.5, 0.5);

  let cx = r.x + r.w * 0.5;
  let cy = r.y + r.h * 0.5;
  brush.fill(shadeColor(r.fill, -18), 46);
  brush.fillBleed(0.2, "in");
  scaledOrganicRect(cx, cy, r.w * 0.76, r.h * 0.74, 10, 2, 0.48);
  brush.noFill();
}

function hatchBlock(r) {
  brush.noFill();
  brush.hatchStyle(r.hatchBrush, r.hatchColor, r.weight);
  brush.hatch(r.dist, r.ang, { rand: 0.08, continuous: true, gradient: 0.18 });
  organicRect(r.x, r.y, r.w, r.h, 10, 2.5, r.curve);
  brush.noHatch();
}

function secondHatch(r) {
  let ang2 = r.ang + random([58, 64, 72, 84]);
  let col2 = shadeColor(r.hatchColor, random([-10, -6, 8]));
  let br2 = random(["2H", "HB", "cpencil", "rotring"]);
  let d2 = r.dist + random(2, 4);

  brush.noFill();
  brush.hatchStyle(br2, col2, max(0.35, r.weight * 0.72));
  brush.hatch(d2, ang2, { rand: 0.06, continuous: true, gradient: 0.1 });

  let cx = r.x + r.w * 0.5;
  let cy = r.y + r.h * 0.5;
  scaledOrganicRect(cx, cy, r.w * random(0.45, 0.72), r.h * random(0.45, 0.72), 10, 2, 0.42);
  brush.noHatch();
}

function outlineBlock(r) {
  brush.noFill();
  brush.noHatch();

  brush.set(r.outline, r.outlineColor, r.outlineWeight);
  organicOutline(r.x, r.y, r.w, r.h, 8, 1.8, r.curve);

  if (random() < 0.6) {
    brush.set("HB", shadeColor(r.outlineColor, -10), 0.32);
    let x1 = r.x + random(6, r.w * 0.35);
    let y1 = r.y + random(6, r.h * 0.35);
    let x2 = r.x + random(r.w * 0.65, r.w - 6);
    let y2 = r.y + random(r.h * 0.65, r.h - 6);
    brush.line(x1, y1, x2, y2);
  }
}

function drawCrossLinks() {
  brush.noFill();
  brush.noHatch();

  let links = [
    [[124, 182], [188, 178], [258, 198], [332, 194]],
    [[224, 112], [274, 160], [312, 218], [386, 248]],
    [[138, 418], [220, 392], [320, 398], [446, 376]],
    [[422, 122], [396, 182], [398, 260], [418, 334]],
    [[80, 298], [168, 308], [248, 294], [356, 302]]
  ];

  for (let i = 0; i < links.length; i++) {
    let pts = [];
    for (let p of links[i]) {
      pts.push([p[0] + random(-4, 4), p[1] + random(-4, 4), random(0.6, 1.0)]);
    }
    brush.set(i % 2 === 0 ? "pen" : "HB", i % 2 === 0 ? palette.line : palette.umber, i % 2 === 0 ? 0.42 : 0.5);
    brush.spline(pts, 0.35);
  }
}

function drawFrameLines() {
  brush.noFill();
  brush.noHatch();

  brush.set("rotring", "#3a342e", 0.4);
  brush.rect(18, 18, 564, 564, "corner");

  brush.set("2H", "#8a8173", 0.28);
  brush.line(28, 204, 572, 204);
  brush.line(28, 328, 572, 328);

  brush.set("HB", "#756a5b", 0.24);
  brush.line(294, 26, 294, 572);
}

function organicRect(x, y, w, h, stepsPerSide, jitter, curvature) {
  brush.beginShape(curvature);
  let pts = rectPoints(x, y, w, h, stepsPerSide, jitter);
  for (let p of pts) {
    brush.vertex(p[0], p[1]);
  }
  brush.endShape(true);
}

function scaledOrganicRect(cx, cy, w, h, stepsPerSide, jitter, curvature) {
  let x = cx - w * 0.5;
  let y = cy - h * 0.5;
  organicRect(x, y, w, h, stepsPerSide, jitter, curvature);
}

function organicOutline(x, y, w, h, stepsPerSide, jitter, curvature) {
  brush.beginShape(curvature);
  let pts = rectPoints(x, y, w, h, stepsPerSide, jitter);
  for (let p of pts) {
    brush.vertex(p[0], p[1], random(0.85, 1.15));
  }
  brush.endShape(true);
}

function rectPoints(x, y, w, h, stepsPerSide, jitter) {
  let pts = [];

  for (let i = 0; i < stepsPerSide; i++) {
    let t = i / stepsPerSide;
    pts.push([
      lerp(x, x + w, t) + random(-jitter, jitter),
      y + random(-jitter, jitter)
    ]);
  }
  for (let i = 0; i < stepsPerSide; i++) {
    let t = i / stepsPerSide;
    pts.push([
      x + w + random(-jitter, jitter),
      lerp(y, y + h, t) + random(-jitter, jitter)
    ]);
  }
  for (let i = 0; i < stepsPerSide; i++) {
    let t = i / stepsPerSide;
    pts.push([
      lerp(x + w, x, t) + random(-jitter, jitter),
      y + h + random(-jitter, jitter)
    ]);
  }
  for (let i = 0; i < stepsPerSide; i++) {
    let t = i / stepsPerSide;
    pts.push([
      x + random(-jitter, jitter),
      lerp(y + h, y, t) + random(-jitter, jitter)
    ]);
  }

  return pts;
}

function shadeColor(hex, amt) {
  let c = color(hex);
  let r = constrain(red(c) + amt, 0, 255);
  let g = constrain(green(c) + amt, 0, 255);
  let b = constrain(blue(c) + amt, 0, 255);
  return color(r, g, b);
}