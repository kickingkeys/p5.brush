let palette = ["#8c6f4f", "#6d7c63", "#a87b5d", "#7b6a58", "#9b8d72", "#5f6e74"];
let penDark = "#2f2a26";
let pencilDark = "#4e4338";

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(42);
  noiseSeed(42);

  drawPaperGrid();
  drawBlocks();
  drawLinearAccents();

  noLoop();
}

function drawPaperGrid() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.set("2H", "#d8d0c4", 0.35);
  for (let x = 30; x <= width - 30; x += 36) {
    brush.line(x, 20, x + random(-4, 4), height - 20);
  }
  for (let y = 30; y <= height - 30; y += 40) {
    brush.line(20, y, width - 20, y + random(-4, 4));
  }
}

function drawBlocks() {
  let rects = [
    { x: 42,  y: 58,  w: 195, h: 128, c: palette[0], a1: 18,  a2: 102, s1: 10, s2: 16, dx: 10, dy: 8 },
    { x: 208, y: 42,  w: 162, h: 172, c: palette[4], a1: -12, a2: 76,  s1: 9,  s2: 15, dx: -8, dy: 12 },
    { x: 354, y: 64,  w: 188, h: 118, c: palette[5], a1: 8,   a2: 92,  s1: 8,  s2: 14, dx: 6, dy: -6 },
    { x: 70,  y: 188, w: 146, h: 176, c: palette[1], a1: 90,  a2: 28,  s1: 8,  s2: 14, dx: 0, dy: 10 },
    { x: 182, y: 210, w: 226, h: 132, c: palette[2], a1: -18, a2: 64,  s1: 9,  s2: 15, dx: 10, dy: 6 },
    { x: 394, y: 176, w: 136, h: 194, c: palette[3], a1: 84,  a2: 18,  s1: 8,  s2: 13, dx: -8, dy: 10 },
    { x: 58,  y: 382, w: 208, h: 138, c: palette[4], a1: 12,  a2: 108, s1: 10, s2: 17, dx: 12, dy: -6 },
    { x: 254, y: 356, w: 168, h: 160, c: palette[0], a1: -8,  a2: 82,  s1: 9,  s2: 15, dx: -10, dy: 8 },
    { x: 424, y: 390, w: 118, h: 124, c: palette[1], a1: 96,  a2: 28,  s1: 8,  s2: 13, dx: 6, dy: 8 }
  ];

  for (let r of rects) {
    drawLayeredRect(r);
  }
}

function drawLayeredRect(r) {
  let cx = r.x + r.w / 2;
  let cy = r.y + r.h / 2;

  // soft under-wash for muted block color
  brush.noStroke();
  brush.noHatch();
  brush.wash(r.c, 42);
  brush.rect(r.x, r.y, r.w, r.h, "corner");
  brush.noWash();

  // colored pencil layers
  brush.noFill();
  brush.hatchStyle("cpencil", r.c, 0.85);
  brush.hatch(r.s1, r.a1, { rand: 0.08, continuous: false, gradient: 0.12 });
  brush.rect(r.x, r.y, r.w, r.h, "corner");
  brush.noHatch();

  let darker = lerpColor(color(r.c), color("#3a3128"), 0.35);
  brush.hatchStyle("cpencil", darker, 0.65);
  brush.hatch(r.s2, r.a2, { rand: 0.06, continuous: false, gradient: 0.18 });
  brush.rect(r.x + r.dx, r.y + r.dy, r.w * 0.82, r.h * 0.78, "corner");
  brush.noHatch();

  // technical pen edge
  brush.set("pen", penDark, 0.7);
  brush.noFill();
  brush.noHatch();
  brush.rect(r.x, r.y, r.w, r.h, "corner");

  // interior rotring structure line
  brush.set("rotring", "#3d372f", 0.4);
  if (r.w > r.h) {
    let yy = cy + random(-r.h * 0.18, r.h * 0.18);
    brush.line(r.x + 8, yy, r.x + r.w - 8, yy + random(-6, 6));
  } else {
    let xx = cx + random(-r.w * 0.18, r.w * 0.18);
    brush.line(xx, r.y + 8, xx + random(-6, 6), r.y + r.h - 8);
  }

  // occasional graphite hatch to densify selected blocks
  if (random() < 0.65) {
    brush.hatchStyle("HB", pencilDark, 0.45);
    brush.hatch(random(14, 18), r.a1 + 90, { rand: 0.04, continuous: true, gradient: 0.1 });
    brush.rect(r.x + 4, r.y + 4, r.w - 8, r.h - 8, "corner");
    brush.noHatch();
  }
}

function drawLinearAccents() {
  brush.noFill();
  brush.noHatch();

  // major compositional lines
  brush.set("pen", penDark, 0.9);
  brush.line(46, 220, 552, 220);
  brush.line(266, 46, 266, 548);

  brush.set("rotring", "#4a433a", 0.45);
  brush.line(120, 92, 514, 92);
  brush.line(92, 442, 548, 442);
  brush.line(402, 60, 402, 520);

  // loose graphite framing
  brush.set("2B", "#5b5146", 0.8);
  brush.line(34, 34, 566, 34);
  brush.line(34, 34, 34, 566);

  // colored pencil bars for landscape-like spatial rhythm
  let bars = [
    { x1: 54, y1: 334, x2: 214, y2: 334, c: palette[2], w: 0.9 },
    { x1: 274, y1: 292, x2: 530, y2: 292, c: palette[1], w: 0.8 },
    { x1: 92, y1: 520, x2: 262, y2: 520, c: palette[0], w: 0.95 },
    { x1: 446, y1: 154, x2: 446, y2: 360, c: palette[5], w: 0.75 }
  ];

  for (let b of bars) {
    brush.set("cpencil", b.c, b.w);
    brush.line(b.x1, b.y1, b.x2, b.y2);
  }

  // faint survey-like secondary hatch fields
  brush.hatchStyle("2H", "#b9afa0", 0.35);
  brush.hatch(22, 0, { rand: 0.03, continuous: true, gradient: false });
  brush.rect(40, 40, 520, 500, "corner");
  brush.noHatch();

  brush.hatchStyle("rotring", "#7a6d5f", 0.25);
  brush.hatch(28, 90, { rand: 0.02, continuous: true, gradient: false });
  brush.rect(84, 84, 418, 390, "corner");
  brush.noHatch();
}