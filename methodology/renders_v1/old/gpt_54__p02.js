function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(19);
  noiseSeed(19);

  drawPaperGrain();
  drawGroundShadow();
  drawGrassCluster();

  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#6a665f", 0.28);

  for (let i = 0; i < 220; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let len = random(3, 8);
    let a = random(-20, 20);
    let x2 = x + cos(a) * len;
    let y2 = y + sin(a) * len;
    brush.line(x, y, x2, y2);
  }

  brush.set("spray", "#8a847b", 0.22);
  for (let i = 0; i < 60; i++) {
    let x = random(30, 570);
    let y = random(30, 570);
    brush.line(x, y, x + random(-1, 1), y + random(-1, 1));
  }
}

function drawGroundShadow() {
  brush.noStroke();
  brush.noHatch();
  brush.fill("#7f786f", 10);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.22, 0.15, false);

  brush.beginShape(0.15);
  brush.vertex(70, 505);
  brush.vertex(155, 493);
  brush.vertex(262, 500);
  brush.vertex(360, 490);
  brush.vertex(470, 502);
  brush.vertex(550, 514);
  brush.vertex(552, 530);
  brush.vertex(68, 532);
  brush.endShape(true);

  brush.noFill();
}

function drawGrassCluster() {
  let stems = [
    { x: 86,  y: 520, h: 210, lean: -10, plume: "light", fan: 0.85 },
    { x: 115, y: 522, h: 250, lean: -5,  plume: "seed",  fan: 0.95 },
    { x: 146, y: 526, h: 190, lean: 8,   plume: "light", fan: 0.72 },
    { x: 176, y: 525, h: 280, lean: -14, plume: "barley", fan: 1.0 },
    { x: 205, y: 522, h: 245, lean: -7,  plume: "seed", fan: 0.9 },
    { x: 237, y: 526, h: 175, lean: 15,  plume: "light", fan: 0.7 },
    { x: 268, y: 524, h: 305, lean: -6,  plume: "barley", fan: 1.05 },
    { x: 300, y: 522, h: 215, lean: 5,   plume: "seed", fan: 0.82 },
    { x: 332, y: 525, h: 335, lean: -16, plume: "light", fan: 1.12 },
    { x: 365, y: 523, h: 265, lean: 12,  plume: "barley", fan: 0.95 },
    { x: 398, y: 526, h: 220, lean: 22,  plume: "seed", fan: 0.88 },
    { x: 430, y: 525, h: 295, lean: 10,  plume: "light", fan: 1.0 },
    { x: 462, y: 521, h: 245, lean: 26,  plume: "seed", fan: 0.85 },
    { x: 496, y: 524, h: 200, lean: 18,  plume: "light", fan: 0.78 }
  ];

  for (let s of stems) {
    drawStem(s.x, s.y, s.h, s.lean, s.fan);
  }

  for (let s of stems) {
    let top = stemTop(s.x, s.y, s.h, s.lean);
    if (s.plume === "light") drawLightPanicle(top.x, top.y, s.h, s.lean);
    if (s.plume === "seed") drawSeedHead(top.x, top.y, s.h, s.lean);
    if (s.plume === "barley") drawBarleyHead(top.x, top.y, s.h, s.lean);
  }

  for (let s of stems) {
    drawBasalLeaves(s.x, s.y, s.h, s.lean);
  }

  drawLooseFragments();
}

function stemTop(x, y, h, lean) {
  let pts = stemPoints(x, y, h, lean);
  return pts[pts.length - 1];
}

function stemPoints(x, y, h, lean) {
  let p0 = [x, y];
  let p1 = [x + lean * 0.4, y - h * 0.28];
  let p2 = [x + lean * 0.9 + sin(lean * 3) * 3, y - h * 0.62];
  let p3 = [x + lean * 1.2, y - h];
  return bezierSamples(p0, p1, p2, p3, 13);
}

function drawStem(x, y, h, lean, fan) {
  let pts = stemPoints(x, y, h, lean);

  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#35322e", 0.42);
  brush.spline(pointsWithPressure(pts, 0.9, 0.42), 0.42);

  brush.set("2H", "#5a5650", 0.24);
  let offA = offsetPoints(pts, -1.3 * fan, 0.6);
  let offB = offsetPoints(pts, 1.0 * fan, -0.5);
  brush.spline(pointsWithPressure(offA, 0.45, 0.24), 0.35);
  brush.spline(pointsWithPressure(offB, 0.4, 0.2), 0.32);

  for (let i = 2; i < pts.length - 2; i++) {
    if (random() < 0.72) {
      let p = pts[i];
      let ang = map(i, 0, pts.length - 1, -72, 72) + lean * 0.5;
      let len = map(i, 0, pts.length - 1, 28, 72) * random(0.72, 1.12) * fan;
      drawLeafBlade(p.x, p.y, ang, len, random(0.55, 1.0));
    }
  }
}

function drawLeafBlade(x, y, ang, len, pres) {
  let dir = ang + random(-10, 10);
  let p0 = [x, y];
  let p1 = [x + cos(dir - 16) * len * 0.28, y + sin(dir - 16) * len * 0.28];
  let p2 = [x + cos(dir + 8) * len * 0.72, y + sin(dir + 8) * len * 0.72];
  let p3 = [x + cos(dir) * len, y + sin(dir) * len];

  let pts = bezierSamples(p0, p1, p2, p3, 8);

  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#373430", 0.26);
  brush.spline(pointsWithPressure(pts, 0.35 * pres, 0.14), 0.3);

  if (random() < 0.55) {
    brush.set("2H", "#625e58", 0.16);
    let off = offsetPoints(pts, random(-0.9, 0.9), random(-0.7, 0.7));
    brush.spline(pointsWithPressure(off, 0.2, 0.08), 0.24);
  }
}

function drawBasalLeaves(x, y, h, lean) {
  let count = floor(random(2, 5));
  for (let i = 0; i < count; i++) {
    let dir = random(-120, -45) + map(lean, -20, 25, -6, 6);
    if (random() < 0.5) dir = random(-135, -82);
    if (random() < 0.38) dir = random(-60, -10);
    let len = random(55, 120) + h * 0.03;
    let p0 = [x + random(-5, 5), y + random(-1, 4)];
    let p1 = [p0[0] + cos(dir - 10) * len * 0.32, p0[1] + sin(dir - 10) * len * 0.32];
    let p2 = [p0[0] + cos(dir + 10) * len * 0.72, p0[1] + sin(dir + 10) * len * 0.72];
    let p3 = [p0[0] + cos(dir) * len, p0[1] + sin(dir) * len];
    let pts = bezierSamples(p0, p1, p2, p3, 9);

    brush.set("HB", "#3b3834", 0.3);
    brush.spline(pointsWithPressure(pts, 0.52, 0.12), 0.33);

    if (random() < 0.75) {
      brush.set("2H", "#65615b", 0.18);
      let off = offsetPoints(pts, random(-1.1, 1.1), random(-0.8, 0.8));
      brush.spline(pointsWithPressure(off, 0.2, 0.05), 0.24);
    }
  }
}

function drawLightPanicle(x, y, h, lean) {
  let coreLen = map(h, 170, 340, 58, 92);
  let axisA = -92 + lean * 0.18 + random(-5, 5);

  let p0 = [x, y];
  let p1 = [x + cos(axisA - 10) * coreLen * 0.25, y + sin(axisA - 10) * coreLen * 0.25];
  let p2 = [x + cos(axisA + 6) * coreLen * 0.74, y + sin(axisA + 6) * coreLen * 0.74];
  let p3 = [x + cos(axisA) * coreLen, y + sin(axisA) * coreLen];
  let axisPts = bezierSamples(p0, p1, p2, p3, 10);

  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#33302c", 0.24);
  brush.spline(pointsWithPressure(axisPts, 0.34, 0.15), 0.26);

  for (let i = 1; i < axisPts.length - 1; i++) {
    let p = axisPts[i];
    let side = i % 2 === 0 ? -1 : 1;
    let n = floor(random(2, 4));
    for (let j = 0; j < n; j++) {
      let a = axisA + side * random(22, 58) + random(-8, 8);
      let len = map(i, 1, axisPts.length - 2, 24, 9) * random(0.75, 1.2);
      let qx = p.x + cos(a) * len;
      let qy = p.y + sin(a) * len;

      brush.set("2H", "#56514b", 0.16);
      brush.line(p.x, p.y, qx, qy);

      drawTinySeed(qx, qy, random(4, 7), a + random(-12, 12));
    }
  }

  for (let k = 0; k < 16; k++) {
    let px = x + random(-18, 18);
    let py = y - random(0, 26);
    brush.set("2H", "#6e695f", 0.1);
    brush.line(px, py, px + random(-4, 4), py + random(-3, 3));
  }
}

function drawSeedHead(x, y, h, lean) {
  let dir = -94 + lean * 0.18 + random(-4, 4);
  let len = map(h, 180, 280, 40, 66);
  let widthA = map(h, 180, 280, 16, 23);

  let left = [];
  let right = [];
  let center = [];

  for (let i = 0; i <= 8; i++) {
    let t = i / 8;
    let cx = x + cos(dir) * len * t;
    let cy = y + sin(dir) * len * t;
    let w = sin(t * 180) * widthA;
    let nx = cos(dir - 90);
    let ny = sin(dir - 90);
    left.push([cx - nx * w * 0.48, cy - ny * w * 0.48]);
    right.push([cx + nx * w * 0.4, cy + ny * w * 0.4]);
    center.push([cx, cy]);
  }

  let poly = left.concat(right.reverse());

  brush.noStroke();
  brush.noHatch();
  brush.fill("#5d5852", 8);
  brush.fillBleed(0.04, "out");
  brush.fillTexture(0.1, 0.08, false);
  brush.polygon(poly);
  brush.noFill();

  brush.set("HB", "#312f2b", 0.22);
  brush.spline(pointsWithPressure(center.map(p => ({ x: p[0], y: p[1] })), 0.3, 0.2), 0.18);

  brush.set("2H", "#524d47", 0.13);
  for (let i = 1; i < center.length - 1; i++) {
    let c = center[i];
    let lx = left[i][0];
    let ly = left[i][1];
    let rx = right[i][0];
    let ry = right[i][1];
    brush.line(lx, ly, rx, ry);
  }

  brush.noFill();
  brush.hatch(4.3, dir + 35, { rand: 0.16, continuous: false, gradient: 0.12 });
  brush.hatchStyle("2H", "#4a4641", 0.12);
  brush.polygon(poly);
  brush.noHatch();

  brush.set("HB", "#302d29", 0.2);
  let outline = poly.map(p => ({ x: p[0], y: p[1] }));
  brush.spline(pointsWithPressure(outline, 0.16, 0.16), 0.16);

  if (random() < 0.8) {
    brush.set("2H", "#5b5650", 0.12);
    for (let i = 0; i < 6; i++) {
      let t = random(0.12, 0.9);
      let cx = x + cos(dir) * len * t;
      let cy = y + sin(dir) * len * t;
      brush.line(cx, cy, cx + cos(dir + random(-18, 18)) * random(2, 5), cy + sin(dir + random(-18, 18)) * random(2, 5));
    }
  }
}

function drawBarleyHead(x, y, h, lean) {
  let dir = -92 + lean * 0.2 + random(-5, 5);
  let len = map(h, 240, 340, 64, 96);
  let grains = floor(map(h, 240, 340, 9, 14));

  let axisPts = [];
  for (let i = 0; i <= grains; i++) {
    let t = i / grains;
    let bend = sin(t * 180) * lean * 0.12;
    axisPts.push([
      x + cos(dir + bend) * len * t,
      y + sin(dir + bend) * len * t
    ]);
  }

  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#2f2c28", 0.22);
  brush.spline(pointsWithPressure(axisPts.map(p => ({ x: p[0], y: p[1] })), 0.28, 0.18), 0.22);

  for (let i = 1; i < axisPts.length - 1; i++) {
    let p = axisPts[i];
    let a = dir + random(-7, 7);
    let sideW = map(i, 1, axisPts.length - 2, 7, 3);
    let px1 = p[0] + cos(a - 90) * sideW;
    let py1 = p[1] + sin(a - 90) * sideW;
    let px2 = p[0] + cos(a + 90) * sideW;
    let py2 = p[1] + sin(a + 90) * sideW;
    let tipx = p[0] + cos(a) * random(7, 11);
    let tipy = p[1] + sin(a) * random(7, 11);

    brush.set("HB", "#34312d", 0.16);
    brush.line(px1, py1, tipx, tipy);
    brush.line(px2, py2, tipx, tipy);

    brush.set("2H", "#5d5852", 0.11);
    let awnLen = random(18, 42);
    brush.line(tipx, tipy, tipx + cos(a - random(10, 18)) * awnLen, tipy + sin(a - random(10, 18)) * awnLen);
    brush.line(tipx, tipy, tipx + cos(a + random(10, 18)) * awnLen, tipy + sin(a + random(10, 18)) * awnLen);

    if (random() < 0.7) {
      brush.set("2H", "#6c665f", 0.08);
      brush.line(
        tipx + random(-1, 1),
        tipy + random(-1, 1),
        tipx + cos(a) * random(10, 18),
        tipy + sin(a) * random(10, 18)
      );
    }
  }
}

function drawTinySeed(x, y, r, ang) {
  let pts = [];
  for (let i = 0; i < 10; i++) {
    let a = map(i, 0, 9, 0, 360);
    let rr = i < 5 ? r * random(0.6, 0.95) : r * random(0.45, 0.85);
    let ex = cos(a) * rr * 0.75;
    let ey = sin(a) * rr * 0.45;
    let rx = ex * cos(ang) - ey * sin(ang);
    let ry = ex * sin(ang) + ey * cos(ang);
    pts.push([x + rx, y + ry]);
  }

  brush.noStroke();
  brush.fill("#5f5a54", 6);
  brush.fillBleed(0.03, "out");
  brush.fillTexture(0.08, 0.04, false);
  brush.polygon(pts);
  brush.noFill();

  brush.set("2H", "#4a4641", 0.09);
  brush.spline(pointsWithPressure(pts.map(p => ({ x: p[0], y: p[1] })), 0.1, 0.08), 0.12);
}

function drawLooseFragments() {
  brush.noFill();
  brush.noHatch();

  for (let i = 0; i < 18; i++) {
    let x = random(58, 540);
    let y = random(420, 548);
    let a = random(-120, -20);
    let len = random(14, 38);

    brush.set("2H", "#777169", 0.11);
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);

    if (random() < 0.5) {
      drawTinySeed(
        x + cos(a) * random(len * 0.55, len),
        y + sin(a) * random(len * 0.55, len),
        random(3, 5),
        a
      );
    }
  }

  brush.set("HB", "#3a3732", 0.18);
  for (let i = 0; i < 10; i++) {
    let x1 = random(40, 560);
    let y1 = random(120, 560);
    let x2 = x1 + random(-10, 10);
    let y2 = y1 + random(-18, 18);
    brush.line(x1, y1, x2, y2);
  }
}

function bezierSamples(p0, p1, p2, p3, steps) {
  let pts = [];
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let mt = 1 - t;
    let x =
      mt * mt * mt * p0[0] +
      3 * mt * mt * t * p1[0] +
      3 * mt * t * t * p2[0] +
      t * t * t * p3[0];
    let y =
      mt * mt * mt * p0[1] +
      3 * mt * mt * t * p1[1] +
      3 * mt * t * t * p2[1] +
      t * t * t * p3[1];
    pts.push({ x, y });
  }
  return pts;
}

function pointsWithPressure(pts, startP, endP) {
  let out = [];
  for (let i = 0; i < pts.length; i++) {
    let t = i / max(1, pts.length - 1);
    out.push([pts[i].x, pts[i].y, lerp(startP, endP, t)]);
  }
  return out;
}

function offsetPoints(pts, dx, dy) {
  let out = [];
  for (let p of pts) {
    out.push({ x: p.x + dx, y: p.y + dy });
  }
  return out;
}