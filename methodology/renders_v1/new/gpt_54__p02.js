function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(14);
  noiseSeed(14);

  drawPaperGrain();
  drawGrassCluster();

  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.set("2H", "#8a857c", 0.22);
  for (let i = 0; i < 140; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let len = random(4, 12);
    let a = random(-20, 20);
    brush.beginStroke("segments", x, y);
    brush.move(a, len, 0.35);
    brush.endStroke(a + random(-8, 8), 0.2);
  }
}

function drawGrassCluster() {
  let stems = [];

  for (let i = 0; i < 8; i++) {
    stems.push(makeGrassStem(120 + i * 42 + random(-10, 10), 560, random(-8, 8), random(270, 420), "blade"));
  }

  stems.push(makeGrassStem(130, 560, -8, 360, "foxtail"));
  stems.push(makeGrassStem(188, 560, 4, 320, "seedSpray"));
  stems.push(makeGrassStem(255, 560, -3, 380, "foxtail"));
  stems.push(makeGrassStem(315, 560, 7, 340, "oat"));
  stems.push(makeGrassStem(385, 560, -6, 355, "seedSpray"));
  stems.push(makeGrassStem(455, 560, 5, 390, "oat"));
  stems.push(makeGrassStem(520, 560, -4, 300, "blade"));

  for (let s of stems) {
    drawStemStructure(s);
  }

  for (let s of stems) {
    if (s.type === "blade") drawBladeLeaves(s);
    if (s.type === "foxtail") drawFoxtailHead(s);
    if (s.type === "oat") drawOatHead(s);
    if (s.type === "seedSpray") drawSeedSpray(s);
  }

  addGroundHints();
}

function makeGrassStem(x, y, lean, h, type) {
  let pts = [];
  let steps = int(random(7, 10));
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let px = x + lean * t * 4 + sin(t * 140 + x * 0.2) * (10 + 8 * t) + noise(x * 0.01, t * 2.7) * 18 - 9;
    let py = y - h * t + sin(t * 180 + x) * 6;
    pts.push([px, py, 0.55 + 0.25 * sin(t * 90)]);
  }
  return { x, y, lean, h, type, pts };
}

function drawStemStructure(stem) {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.set("HB", "#2f2d29", 0.5);
  brush.spline(stem.pts, 0.45);

  brush.set("2H", "#5c5953", 0.22);
  let offPts = [];
  for (let i = 0; i < stem.pts.length; i++) {
    let p = stem.pts[i];
    offPts.push([p[0] + random(1, 3), p[1] + random(-2, 2), max(0.2, p[2] - 0.2)]);
  }
  brush.spline(offPts, 0.35);

  for (let i = 1; i < stem.pts.length - 1; i++) {
    if (random() < 0.55) {
      let p = stem.pts[i];
      let dir = random() < 0.5 ? -1 : 1;
      let len = random(18, 40) * (1 - i / stem.pts.length);
      let ang = dir < 0 ? random(205, 255) : random(285, 335);
      brush.set("2H", "#4f4c46", 0.18);
      brush.beginStroke("curve", p[0], p[1]);
      brush.move(ang, len * 0.65, 0.25);
      brush.endStroke(ang + dir * random(8, 16), 0.05);
    }
  }
}

function drawBladeLeaves(stem) {
  let n = int(random(3, 5));
  for (let i = 0; i < n; i++) {
    let idx = int(map(i, 0, n - 1, 2, stem.pts.length - 2));
    let p = stem.pts[idx];
    let side = i % 2 === 0 ? -1 : 1;
    let len = random(90, 170) * (1 - idx / stem.pts.length * 0.4);
    let baseAng = side < 0 ? random(190, 240) : random(300, 350);

    let leafPts = [];
    leafPts.push([p[0], p[1]]);
    let segments = 6;
    for (let j = 1; j <= segments; j++) {
      let t = j / segments;
      let a = baseAng + side * sin(t * 120) * 10;
      let prev = leafPts[j - 1];
      let segLen = len / segments * (1 - t * 0.25);
      let nx = prev[0] + cos(a) * segLen;
      let ny = prev[1] + sin(a) * segLen;
      leafPts.push([nx, ny, 0.45 - t * 0.25]);
    }

    brush.noFill();
    brush.noHatch();

    brush.set("HB", "#2c2a27", 0.36);
    brush.spline(leafPts, 0.42);

    let edge2 = [];
    for (let j = 0; j < leafPts.length; j++) {
      let lp = leafPts[j];
      let w = map(j, 0, leafPts.length - 1, 5, 0.6);
      edge2.push([lp[0] + side * w, lp[1] + j * 0.4]);
    }

    brush.set("2H", "#59554f", 0.16);
    brush.spline(edge2, 0.35);

    brush.hatchStyle("2H", "#69645d", 0.14);
    let hatchCount = 5;
    for (let h = 1; h < hatchCount; h++) {
      let t = h / hatchCount;
      let a = lerpPoint(leafPts[0], leafPts[1], t);
      let b = lerpPoint(edge2[0], edge2[1], t);
      brush.line(a.x, a.y, b.x, b.y);
    }

    let unfinished = int(random(2, 4));
    for (let u = 0; u < unfinished; u++) {
      let k = int(random(1, leafPts.length - 2));
      let pp = leafPts[k];
      brush.set("2H", "#777169", 0.1);
      brush.line(pp[0], pp[1], pp[0] + random(-6, 6), pp[1] + random(-3, 3));
    }
  }
}

function drawFoxtailHead(stem) {
  let top = stem.pts[stem.pts.length - 1];
  let next = stem.pts[stem.pts.length - 2];
  let dx = top[0] - next[0];
  let dy = top[1] - next[1];
  let ang = atan2(dy, dx);
  let len = random(70, 95);

  let axis = [];
  for (let i = 0; i <= 12; i++) {
    let t = i / 12;
    let x = top[0] + cos(ang - 90) * (t * len);
    let y = top[1] + sin(ang - 90) * (t * len);
    axis.push([x, y, 0.35]);
  }

  brush.set("HB", "#2f2c28", 0.3);
  brush.spline(axis, 0.25);

  for (let i = 1; i < axis.length - 1; i++) {
    let p = axis[i];
    let spread = map(i, 1, axis.length - 2, 16, 5);
    let density = int(map(i, 1, axis.length - 2, 6, 3));
    for (let j = 0; j < density; j++) {
      let side = random() < 0.5 ? -1 : 1;
      let a = ang - 90 + side * random(70, 110);
      let l = random(spread * 0.5, spread);
      brush.set("2H", "#55514b", 0.12);
      brush.beginStroke("segments", p[0], p[1]);
      brush.move(a, l, 0.2);
      brush.endStroke(a + side * random(-8, 8), 0.02);
    }
  }

  brush.hatchStyle("2H", "#65615a", 0.1);
  for (let i = 2; i < axis.length - 2; i += 2) {
    let p = axis[i];
    brush.line(p[0] - 4, p[1], p[0] + 4, p[1] + 1);
  }
}

function drawOatHead(stem) {
  let top = stem.pts[stem.pts.length - 1];
  let branchCount = int(random(5, 8));

  for (let i = 0; i < branchCount; i++) {
    let t = map(i, 0, branchCount - 1, 0.15, 0.95);
    let base = pointOnSplineApprox(stem.pts, t);
    let side = i % 2 === 0 ? -1 : 1;
    let a = side < 0 ? random(215, 255) : random(285, 325);
    let blen = random(24, 50) * (1 - t * 0.35);

    brush.set("HB", "#302d29", 0.22);
    brush.beginStroke("curve", base.x, base.y);
    brush.move(a, blen * 0.7, 0.2);
    brush.endStroke(a + side * random(8, 18), 0.05);

    let tipx = base.x + cos(a) * blen;
    let tipy = base.y + sin(a) * blen;
    drawSeedHull(tipx, tipy, a + random(-12, 12), random(16, 24), random(7, 10));
  }

  drawSeedHull(top[0], top[1] - 10, random(250, 290), 20, 8);
}

function drawSeedSpray(stem) {
  for (let i = 2; i < stem.pts.length; i++) {
    if (random() < 0.75) {
      let p = stem.pts[i];
      let side = random() < 0.5 ? -1 : 1;
      let a = side < 0 ? random(215, 255) : random(285, 325);
      let blen = random(16, 34);

      brush.set("2H", "#45413c", 0.15);
      brush.beginStroke("curve", p[0], p[1]);
      brush.move(a, blen * 0.8, 0.18);
      brush.endStroke(a + side * random(10, 22), 0.04);

      let tipx = p[0] + cos(a) * blen;
      let tipy = p[1] + sin(a) * blen;

      if (random() < 0.7) {
        drawSeedHull(tipx, tipy, a, random(11, 16), random(5, 7));
      } else {
        brush.set("HB", "#312e2a", 0.16);
        brush.circle(tipx, tipy, random(2.2, 3.6), 0.2);
      }
    }
  }
}

function drawSeedHull(x, y, ang, l, w) {
  let pts = [];
  for (let i = 0; i < 10; i++) {
    let a = map(i, 0, 9, 0, 360);
    let rx = cos(a) * l * 0.5;
    let ry = sin(a) * w * 0.5 * (sin(a) > 0 ? 1.1 : 0.85);
    let px = x + rx * cos(ang) - ry * sin(ang);
    let py = y + rx * sin(ang) + ry * cos(ang);
    pts.push([px, py]);
  }

  brush.noFill();
  brush.noHatch();

  brush.set("HB", "#2e2b27", 0.18);
  brush.polygon(pts);

  let mid1 = { x: x - cos(ang) * l * 0.35, y: y - sin(ang) * l * 0.35 };
  let mid2 = { x: x + cos(ang) * l * 0.38, y: y + sin(ang) * l * 0.38 };
  brush.set("2H", "#5a554f", 0.1);
  brush.line(mid1.x, mid1.y, mid2.x, mid2.y);

  for (let i = -2; i <= 2; i++) {
    let ox = cos(ang + 90) * i * 1.2;
    let oy = sin(ang + 90) * i * 1.2;
    brush.set("2H", "#6a655e", 0.08);
    brush.line(mid1.x + ox, mid1.y + oy, x + ox * 0.5, y + oy * 0.5);
  }

  if (random() < 0.75) {
    let awnLen = random(16, 34);
    let ax = x + cos(ang) * l * 0.5;
    let ay = y + sin(ang) * l * 0.5;
    brush.set("2H", "#46423d", 0.1);
    brush.beginStroke("curve", ax, ay);
    brush.move(ang + random(-8, 8), awnLen, 0.08);
    brush.endStroke(ang + random(-20, 20), 0.01);
  }
}

function addGroundHints() {
  brush.noFill();
  brush.noHatch();

  for (let i = 0; i < 18; i++) {
    let x = random(60, 540);
    let y = random(535, 585);
    let len = random(10, 32);
    let a = random(160, 20);
    brush.set("2H", "#6c675f", 0.12);
    brush.beginStroke("segments", x, y);
    brush.move(a, len, 0.15);
    brush.endStroke(a + random(-10, 10), 0.02);
  }

  for (let i = 0; i < 7; i++) {
    let x = random(90, 510);
    let y = random(520, 575);
    brush.set("HB", "#403c37", 0.12);
    brush.arc(x, y, random(8, 18), random(10, 40), random(110, 170));
  }
}

function lerpPoint(a, b, t) {
  return {
    x: lerp(a[0], b[0], t),
    y: lerp(a[1], b[1], t)
  };
}

function pointOnSplineApprox(pts, t) {
  let scaled = t * (pts.length - 1);
  let i = floor(scaled);
  let amt = scaled - i;
  let a = pts[constrain(i, 0, pts.length - 1)];
  let b = pts[constrain(i + 1, 0, pts.length - 1)];
  return {
    x: lerp(a[0], b[0], amt),
    y: lerp(a[1], b[1], amt)
  };
}