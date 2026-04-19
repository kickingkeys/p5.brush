function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(17);
  noiseSeed(17);

  drawPaperGrain();
  drawBotanicalStudy();
  drawLooseConstructionMarks();

  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#d8d2c8", 0.35);

  for (let i = 0; i < 140; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let len = random(4, 12);
    let a = random(-20, 20);
    brush.beginStroke("segments", x, y);
    brush.move(a, len, 0.4);
    brush.endStroke(a + random(-10, 10), 0.25);
  }
}

function drawBotanicalStudy() {
  let stems = [
    {
      baseX: 86, baseY: 560, topX: 120, topY: 180,
      bend1X: 78, bend1Y: 420, bend2X: 98, bend2Y: 285,
      seedType: "spray", seedScale: 0.95, lean: -24,
      leaves: [
        { t: 0.28, side: -1, len: 58, ang: -44, curve: 0.42 },
        { t: 0.50, side: 1, len: 46, ang: 35, curve: 0.35 },
        { t: 0.67, side: -1, len: 32, ang: -30, curve: 0.30 }
      ]
    },
    {
      baseX: 145, baseY: 565, topX: 190, topY: 136,
      bend1X: 136, bend1Y: 415, bend2X: 168, bend2Y: 248,
      seedType: "oval", seedScale: 1.0, lean: -10,
      leaves: [
        { t: 0.22, side: 1, len: 62, ang: 42, curve: 0.38 },
        { t: 0.44, side: -1, len: 48, ang: -36, curve: 0.34 },
        { t: 0.62, side: 1, len: 34, ang: 26, curve: 0.26 }
      ]
    },
    {
      baseX: 225, baseY: 565, topX: 234, topY: 156,
      bend1X: 220, bend1Y: 414, bend2X: 232, bend2Y: 268,
      seedType: "tuft", seedScale: 0.82, lean: 8,
      leaves: [
        { t: 0.25, side: -1, len: 52, ang: -46, curve: 0.42 },
        { t: 0.52, side: 1, len: 38, ang: 30, curve: 0.30 }
      ]
    },
    {
      baseX: 292, baseY: 566, topX: 326, topY: 120,
      bend1X: 290, bend1Y: 405, bend2X: 312, bend2Y: 230,
      seedType: "spray", seedScale: 1.18, lean: 18,
      leaves: [
        { t: 0.24, side: 1, len: 68, ang: 48, curve: 0.40 },
        { t: 0.41, side: -1, len: 55, ang: -42, curve: 0.36 },
        { t: 0.63, side: 1, len: 36, ang: 24, curve: 0.24 }
      ]
    },
    {
      baseX: 368, baseY: 564, topX: 388, topY: 172,
      bend1X: 362, bend1Y: 420, bend2X: 382, bend2Y: 286,
      seedType: "droop", seedScale: 0.92, lean: 26,
      leaves: [
        { t: 0.31, side: -1, len: 50, ang: -38, curve: 0.38 },
        { t: 0.52, side: 1, len: 42, ang: 28, curve: 0.28 },
        { t: 0.73, side: -1, len: 26, ang: -18, curve: 0.20 }
      ]
    },
    {
      baseX: 438, baseY: 564, topX: 454, topY: 145,
      bend1X: 428, bend1Y: 414, bend2X: 446, bend2Y: 248,
      seedType: "oval", seedScale: 0.88, lean: 6,
      leaves: [
        { t: 0.24, side: 1, len: 54, ang: 44, curve: 0.38 },
        { t: 0.46, side: -1, len: 44, ang: -32, curve: 0.30 },
        { t: 0.64, side: 1, len: 30, ang: 18, curve: 0.22 }
      ]
    },
    {
      baseX: 520, baseY: 565, topX: 494, topY: 186,
      bend1X: 514, bend1Y: 428, bend2X: 502, bend2Y: 300,
      seedType: "tuft", seedScale: 0.76, lean: -20,
      leaves: [
        { t: 0.30, side: -1, len: 58, ang: -48, curve: 0.42 },
        { t: 0.54, side: 1, len: 40, ang: 30, curve: 0.28 }
      ]
    }
  ];

  for (let s of stems) {
    drawStemShading(s);
  }
  for (let s of stems) {
    drawStemOutline(s);
    drawLeaves(s);
    drawSeedHead(s);
  }

  drawForegroundTangles();
}

function drawStemShading(s) {
  let stemPts = [
    [s.baseX, s.baseY, 0.45],
    [s.bend1X, s.bend1Y, 0.35],
    [s.bend2X, s.bend2Y, 0.28],
    [s.topX, s.topY, 0.18]
  ];

  brush.noFill();
  brush.set("2H", "#7f7f7f", 0.34);
  for (let i = 0; i < 2; i++) {
    let off = i * 1.8 + 0.8;
    let pts = offsetCurve(stemPts, off, s.lean > 0 ? -1 : 1);
    brush.spline(pts, 0.46);
  }

  brush.set("HB", "#595959", 0.26);
  let pts2 = offsetCurve(stemPts, 0.6, s.lean > 0 ? -1 : 1);
  brush.spline(pts2, 0.45);
}

function drawStemOutline(s) {
  let stemPts = [
    [s.baseX, s.baseY, 0.52],
    [s.bend1X, s.bend1Y, 0.42],
    [s.bend2X, s.bend2Y, 0.30],
    [s.topX, s.topY, 0.18]
  ];

  brush.noFill();
  brush.set("HB", "#353535", 0.58);
  brush.spline(stemPts, 0.48);

  brush.set("2B", "#262626", 0.34);
  let upper = stemPts.slice(2);
  brush.spline(upper, 0.42);
}

function drawLeaves(s) {
  for (let lf of s.leaves) {
    let p = pointOnStem(s, lf.t);
    let dx = p.dx;
    let dy = p.dy;
    let a = atan2(dy, dx);
    let dir = a + lf.ang;
    let tipX = p.x + cos(dir) * lf.len;
    let tipY = p.y + sin(dir) * lf.len;
    let midX = lerp(p.x, tipX, 0.52) + cos(dir + 90 * lf.side) * lf.len * 0.10;
    let midY = lerp(p.y, tipY, 0.52) + sin(dir + 90 * lf.side) * lf.len * 0.10;

    let centerPts = [
      [p.x, p.y, 0.35],
      [midX, midY, 0.26],
      [tipX, tipY, 0.08]
    ];

    brush.noFill();
    brush.set("HB", "#3a3a3a", 0.40);
    brush.spline(centerPts, lf.curve);

    brush.set("2H", "#707070", 0.22);
    for (let j = 0; j < 4; j++) {
      let tt = 0.18 + j * 0.16;
      let qx = bezPoint(p.x, midX, tipX, tt);
      let qy = bezPoint(p.y, midY, tipY, tt);
      let backA = atan2(tipY - p.y, tipX - p.x) + 150 * lf.side;
      let veinLen = map(j, 0, 3, lf.len * 0.20, lf.len * 0.08);
      brush.line(qx, qy, qx + cos(backA) * veinLen, qy + sin(backA) * veinLen);
    }

    if (random() < 0.8) {
      brush.set("2H", "#8a8a8a", 0.18);
      brush.line(
        tipX - cos(dir) * random(2, 5),
        tipY - sin(dir) * random(2, 5),
        tipX + cos(dir) * random(3, 7),
        tipY + sin(dir) * random(3, 7)
      );
    }
  }
}

function drawSeedHead(s) {
  if (s.seedType === "spray") drawSpraySeed(s);
  if (s.seedType === "oval") drawOvalSeed(s);
  if (s.seedType === "tuft") drawTuftSeed(s);
  if (s.seedType === "droop") drawDroopSeed(s);
}

function drawSpraySeed(s) {
  let top = { x: s.topX, y: s.topY };
  let branches = int(16 * s.seedScale);

  for (let i = 0; i < branches; i++) {
    let side = i % 2 === 0 ? -1 : 1;
    let spread = map(i, 0, branches - 1, -42, 42) + random(-10, 10);
    let len = random(26, 54) * s.seedScale;
    let a = -90 + s.lean * 0.55 + spread;
    let x2 = top.x + cos(a) * len;
    let y2 = top.y + sin(a) * len * 0.9;

    brush.set("HB", "#444444", 0.24);
    brush.line(top.x, top.y, x2, y2);

    let grains = int(random(3, 6));
    for (let g = 0; g < grains; g++) {
      let t = 0.35 + g * (0.5 / grains);
      let gx = lerp(top.x, x2, t);
      let gy = lerp(top.y, y2, t);
      let ga = a + side * random(18, 38);
      let gl = random(7, 13) * s.seedScale;

      brush.set("2H", "#666666", 0.18);
      brush.line(gx, gy, gx + cos(ga) * gl, gy + sin(ga) * gl);

      brush.set("HB", "#333333", 0.18);
      let px = gx + cos(ga) * gl;
      let py = gy + sin(ga) * gl;
      brush.line(px - 1, py - 1, px + 1.6, py + 0.8);
    }
  }
}

function drawOvalSeed(s) {
  let cx = s.topX;
  let cy = s.topY;
  let w = 18 * s.seedScale;
  let h = 58 * s.seedScale;
  let angle = s.lean * 0.6;

  push();
  translate(cx, cy);
  rotate(angle);

  let poly = capsulePoints(0, 0, w, h, 20);
  brush.noFill();

  brush.hatchStyle("2H", "#6a6a6a", 0.20);
  brush.hatch(5, 78, { rand: 0.06, continuous: true });
  brush.polygon(poly);
  brush.noHatch();

  brush.hatchStyle("HB", "#4c4c4c", 0.18);
  brush.hatch(3.2, 116, { rand: 0.05, continuous: true });
  brush.polygon(poly);
  brush.noHatch();

  brush.set("HB", "#323232", 0.42);
  brush.polygon(poly);

  brush.set("2B", "#2a2a2a", 0.18);
  brush.line(0, -h * 0.45, 0, h * 0.42);

  for (let i = 0; i < 8; i++) {
    let yy = map(i, 0, 7, -h * 0.34, h * 0.30);
    let half = w * 0.34 * (1 - abs(yy) / (h * 0.56));
    brush.set("2H", "#696969", 0.16);
    brush.line(-half, yy, half, yy + random(-0.8, 0.8));
  }

  pop();

  brush.set("HB", "#444444", 0.24);
  brush.line(s.topX, s.topY + h * 0.5, s.topX + sin(angle) * 4, s.topY + h * 0.82);
}

function drawTuftSeed(s) {
  let cx = s.topX;
  let cy = s.topY;
  let spokes = int(24 * s.seedScale);
  let coreR = 4 * s.seedScale;

  brush.set("HB", "#3f3f3f", 0.22);
  brush.circle(cx, cy + 6 * s.seedScale, coreR, 0.15);

  for (let i = 0; i < spokes; i++) {
    let a = -100 + map(i, 0, spokes - 1, -70, 70) + random(-6, 6) + s.lean * 0.4;
    let len = random(22, 44) * s.seedScale;
    let x2 = cx + cos(a) * len;
    let y2 = cy + sin(a) * len;

    brush.set("2H", "#666666", 0.18);
    brush.line(cx, cy + 4 * s.seedScale, x2, y2);

    brush.set("HB", "#4b4b4b", 0.10);
    brush.line(x2 - cos(a) * 3, y2 - sin(a) * 3, x2 + cos(a) * 4, y2 + sin(a) * 4);
  }

  brush.set("HB", "#444444", 0.22);
  brush.line(cx, cy + 6 * s.seedScale, cx, cy + 30 * s.seedScale);
}

function drawDroopSeed(s) {
  let startX = s.topX;
  let startY = s.topY;
  let endX = s.topX + 16 * s.seedScale;
  let endY = s.topY + 28 * s.seedScale;

  brush.set("HB", "#404040", 0.22);
  brush.spline([
    [startX, startY, 0.20],
    [startX + 8, startY + 12, 0.18],
    [endX, endY, 0.12]
  ], 0.4);

  push();
  translate(endX + 6, endY + 8);
  rotate(28);

  let poly = capsulePoints(0, 0, 14 * s.seedScale, 40 * s.seedScale, 18);

  brush.hatchStyle("2H", "#707070", 0.16);
  brush.hatch(5.5, 82, { rand: 0.08, continuous: true });
  brush.polygon(poly);
  brush.noHatch();

  brush.hatchStyle("HB", "#4c4c4c", 0.16);
  brush.hatch(3.6, 122, { rand: 0.06, continuous: true });
  brush.polygon(poly);
  brush.noHatch();

  brush.set("HB", "#323232", 0.36);
  brush.polygon(poly);

  pop();
}

function drawForegroundTangles() {
  for (let i = 0; i < 9; i++) {
    let x1 = random(20, 560);
    let y1 = random(500, 590);
    let x2 = x1 + random(-50, 50);
    let y2 = random(420, 520);
    let x3 = x2 + random(-30, 30);
    let y3 = y2 - random(40, 100);

    brush.noFill();
    brush.set("2H", "#7b7b7b", 0.18);
    brush.spline([
      [x1, y1, 0.25],
      [x2, y2, 0.16],
      [x3, y3, 0.08]
    ], 0.44);
  }
}

function drawLooseConstructionMarks() {
  brush.noFill();

  brush.set("2H", "#b9b1a7", 0.14);
  for (let i = 0; i < 18; i++) {
    let x = random(70, 530);
    let y = random(70, 520);
    brush.line(x - random(8, 18), y, x + random(8, 18), y + random(-2, 2));
  }

  brush.set("2H", "#c2bbaf", 0.12);
  for (let i = 0; i < 8; i++) {
    let x = random(90, 520);
    let y = random(80, 540);
    let r = random(8, 18);
    brush.arc(x, y, r, random(180, 260), random(280, 360));
  }
}

function pointOnStem(s, t) {
  let x = bezPoint(s.baseX, s.bend1X, s.bend2X, s.topX, t);
  let y = bezPoint(s.baseY, s.bend1Y, s.bend2Y, s.topY, t);
  let dx = bezTangent(s.baseX, s.bend1X, s.bend2X, s.topX, t);
  let dy = bezTangent(s.baseY, s.bend1Y, s.bend2Y, s.topY, t);
  return { x, y, dx, dy };
}

function offsetCurve(points, amt, side) {
  let out = [];
  for (let i = 0; i < points.length; i++) {
    let prev = points[max(0, i - 1)];
    let next = points[min(points.length - 1, i + 1)];
    let dx = next[0] - prev[0];
    let dy = next[1] - prev[1];
    let mag = sqrt(dx * dx + dy * dy) || 1;
    let nx = -dy / mag;
    let ny = dx / mag;
    out.push([
      points[i][0] + nx * amt * side,
      points[i][1] + ny * amt * side,
      points[i][2]
    ]);
  }
  return out;
}

function capsulePoints(cx, cy, w, h, steps) {
  let pts = [];
  let rx = w * 0.5;
  let ry = h * 0.5;

  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps - 1, -90, 90);
    let x = cx + cos(a) * rx;
    let y = cy - ry * 0.55 + sin(a) * rx;
    pts.push([x, y]);
  }

  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps - 1, 90, 270);
    let x = cx + cos(a) * rx;
    let y = cy + ry * 0.55 + sin(a) * rx;
    pts.push([x, y]);
  }

  return pts;
}