function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(27);
  noiseSeed(27);

  const palette = [
    "#7d6a58", // umber
    "#a1876a", // sand
    "#8b7a63", // taupe
    "#6e7b6a", // muted olive
    "#8a5e4a", // clay
    "#b29d86", // pale earth
    "#5c6460"  // slate green
  ];

  const rects = [
    { x: 38,  y: 52,  w: 208, h: 146, fill: "#b29d86", hatch: "#8a5e4a", angle: 18, dist: 8,  stroke: "#6a594b", lw: 0.9, layer: 0 },
    { x: 180, y: 36,  w: 238, h: 118, fill: "#a1876a", hatch: "#6e7b6a", angle: 102, dist: 9, stroke: "#5d5248", lw: 0.8, layer: 0 },
    { x: 328, y: 58,  w: 214, h: 190, fill: "#8b7a63", hatch: "#b29d86", angle: 12, dist: 10, stroke: "#5c6460", lw: 0.8, layer: 0 },
    { x: 60,  y: 176, w: 170, h: 222, fill: "#6e7b6a", hatch: "#b29d86", angle: 95, dist: 7, stroke: "#5d6659", lw: 0.95, layer: 1 },
    { x: 206, y: 148, w: 174, h: 188, fill: "#8a5e4a", hatch: "#d1bfaa", angle: 24, dist: 8, stroke: "#694738", lw: 0.9, layer: 1 },
    { x: 352, y: 168, w: 194, h: 170, fill: "#7d6a58", hatch: "#a1876a", angle: 110, dist: 8, stroke: "#5d5248", lw: 0.9, layer: 1 },
    { x: 98,  y: 374, w: 214, h: 144, fill: "#b29d86", hatch: "#6e7b6a", angle: 8, dist: 9, stroke: "#736353", lw: 0.85, layer: 2 },
    { x: 278, y: 332, w: 242, h: 188, fill: "#a1876a", hatch: "#8a5e4a", angle: 98, dist: 10, stroke: "#67584e", lw: 0.9, layer: 2 },
    { x: 20,  y: 454, w: 162, h: 108, fill: "#8b7a63", hatch: "#d0baa5", angle: 32, dist: 7, stroke: "#60564e", lw: 0.75, layer: 3 },
    { x: 404, y: 406, w: 134, h: 140, fill: "#6e7b6a", hatch: "#b29d86", angle: 18, dist: 7, stroke: "#586058", lw: 0.8, layer: 3 }
  ];

  function jitteredRectPoints(x, y, w, h, j) {
    return [
      [x + random(-j, j),         y + random(-j, j)],
      [x + w + random(-j, j),     y + random(-j, j)],
      [x + w + random(-j, j),     y + h + random(-j, j)],
      [x + random(-j, j),         y + h + random(-j, j)]
    ];
  }

  function drawCpencilPass(pts, col, ang, spacing, weight, inset) {
    const cx = (pts[0][0] + pts[1][0] + pts[2][0] + pts[3][0]) * 0.25;
    const cy = (pts[0][1] + pts[1][1] + pts[2][1] + pts[3][1]) * 0.25;
    const inner = pts.map(p => [lerp(cx, p[0], inset), lerp(cy, p[1], inset)]);

    brush.noStroke();
    brush.noFill();
    brush.noWash();
    brush.noMass();
    brush.hatchStyle("cpencil", col, weight);
    brush.hatch(spacing, ang, { rand: 0.08, continuous: true, gradient: 0.18 });
    brush.polygon(inner);
    brush.noHatch();
  }

  function drawPenOutline(pts, col, wt) {
    brush.noFill();
    brush.noHatch();
    brush.noWash();
    brush.noMass();
    brush.set("pen", col, wt);
    brush.polygon(pts);
  }

  function drawRoughLine(x1, y1, x2, y2, col, wt) {
    brush.noFill();
    brush.noHatch();
    brush.noWash();
    brush.noMass();
    brush.set("rotring", col, wt);
    brush.line(x1, y1, x2, y2);
  }

  function drawRectBlock(r) {
    const pts = jitteredRectPoints(r.x, r.y, r.w, r.h, 2.8);

    brush.noStroke();
    brush.noHatch();
    brush.noWash();
    brush.noMass();
    brush.fill(r.fill, 70);
    brush.fillBleed(0.12, "out");
    brush.fillTexture(0.42, 0.24, false);
    brush.polygon(pts);
    brush.noFill();

    brush.hatchStyle("rotring", r.hatch, 0.42);
    brush.hatch(r.dist, r.angle, {
      rand: 0.06,
      continuous: true,
      gradient: 0.12
    });
    brush.polygon(pts);
    brush.noHatch();

    drawCpencilPass(pts, r.fill, r.angle + random(-8, 8), max(4, r.dist - 2), 0.72, 0.93);
    drawCpencilPass(pts, lerpColor(color(r.fill), color("#4e443d"), 0.25), r.angle + 58 + random(-6, 6), max(5, r.dist - 1), 0.56, 0.84);

    drawPenOutline(pts, r.stroke, r.lw);

    if (random() < 0.7) {
      const yCut = lerp(r.y + 16, r.y + r.h - 16, random());
      drawRoughLine(r.x + 6, yCut, r.x + r.w - 6, yCut + random(-5, 5), r.stroke, 0.34);
    }
    if (random() < 0.55) {
      const xCut = lerp(r.x + 16, r.x + r.w - 16, random());
      drawRoughLine(xCut, r.y + 6, xCut + random(-4, 4), r.y + r.h - 6, r.stroke, 0.32);
    }
  }

  brush.noFill();
  brush.noHatch();
  brush.noWash();
  brush.noMass();
  brush.noStroke();

  for (let layer = 0; layer < 4; layer++) {
    for (let r of rects) {
      if (r.layer === layer) drawRectBlock(r);
    }
  }

  for (let i = 0; i < 10; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const w = random(60, 180);
    const h = random(40, 120);

    brush.noStroke();
    brush.fill(random(palette), random(18, 34));
    brush.fillBleed(0.1, "out");
    brush.fillTexture(0.28, 0.12, false);
    brush.rect(x, y, w, h, "corner");
    brush.noFill();
  }

  brush.set("2H", "#8f8378", 0.32);
  for (let i = 0; i < 28; i++) {
    let y = random(40, 560);
    brush.line(random(20, 80), y, random(520, 580), y + random(-8, 8));
  }

  brush.set("2B", "#4e443d", 0.45);
  for (let i = 0; i < 7; i++) {
    let x1 = random(30, 200);
    let y1 = random(30, 570);
    let x2 = random(360, 570);
    let y2 = random(30, 570);
    brush.line(x1, y1, x2, y2);
  }

  noLoop();
}