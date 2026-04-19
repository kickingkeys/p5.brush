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

  drawPaperSpecks();
  drawGrassStudy();

  noLoop();
}

function drawPaperSpecks() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.set("2H", "#c9c1b7", 0.22);
  for (let i = 0; i < 130; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(1, 4);
    let a = random(360);
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }
}

function drawGrassStudy() {
  let stems = [];

  for (let i = 0; i < 18; i++) {
    let x = map(i, 0, 17, 70, 530) + random(-18, 18);
    let baseY = random(520, 595);
    let h = random(180, 360);
    let lean = random(-85, 85);
    let topY = baseY - h;
    let topX = x + lean;

    let mid1x = lerp(x, topX, 0.33) + random(-25, 25);
    let mid1y = lerp(baseY, topY, 0.33) + random(-10, 10);
    let mid2x = lerp(x, topX, 0.66) + random(-35, 35);
    let mid2y = lerp(baseY, topY, 0.66) + random(-10, 10);

    let pts = [
      [x, baseY, 0.95],
      [mid1x, mid1y, 0.8],
      [mid2x, mid2y, 0.55],
      [topX, topY, 0.3]
    ];

    stems.push({
      baseX: x,
      baseY: baseY,
      topX: topX,
      topY: topY,
      lean: lean,
      h: h,
      pts: pts,
      kind: random(["spike", "panicle", "tuft"]),
      sideBias: random([-1, 1]),
      incomplete: random() < 0.45
    });
  }

  stems.sort((a, b) => a.h - b.h);

  for (let s of stems) {
    drawStemShading(s);
  }

  for (let s of stems) {
    drawStemOutline(s);
    drawLeaves(s);
    drawSeedHead(s);
    if (random() < 0.55) {
      drawBrokenConstructionMarks(s);
    }
  }

  drawGroundHints();
}

function drawStemShading(s) {
  brush.noFill();
  brush.noMass();
  brush.noField();

  let angleA = 72 + s.lean * 0.08;
  let angleB = 112 + s.lean * 0.05;

  let shadowPoly = offsetPolylinePolygon(s.pts, 7, s.sideBias, 0.82);
  brush.hatchStyle("2H", "#6b6b6b", 0.38);
  brush.hatch(10, angleA, { rand: 0.08, continuous: true });
  brush.polygon(shadowPoly);
  brush.noHatch();

  let corePoly = offsetPolylinePolygon(s.pts, 4, s.sideBias, 0.72);
  brush.hatchStyle("HB", "#444444", 0.5);
  brush.hatch(6, angleB, { rand: 0.07, continuous: true });
  brush.polygon(corePoly);
  brush.noHatch();

  if (random() < 0.45) {
    let darkPoly = offsetPolylinePolygon(s.pts, 2.2, s.sideBias, 0.52);
    brush.hatchStyle("2B", "#2a2a2a", 0.62);
    brush.hatch(3.6, angleA + 36, { rand: 0.05, continuous: true });
    brush.polygon(darkPoly);
    brush.noHatch();
  }
}

function drawStemOutline(s) {
  brush.noFill();
  brush.noHatch();

  brush.set("HB", "#2f2f2f", 0.5);
  brush.spline(s.pts, 0.52);

  if (random() < 0.7) {
    let echo = [];
    for (let i = 0; i < s.pts.length; i++) {
      echo.push([
        s.pts[i][0] + random(-1.4, 1.4),
        s.pts[i][1] + random(-1.4, 1.4),
        max(0.2, s.pts[i][2] * random(0.8, 1.05))
      ]);
    }
    brush.set("2H", "#656565", 0.28);
    brush.spline(echo, 0.5);
  }
}

function drawLeaves(s) {
  let count = floor(random(2, 6));
  for (let i = 0; i < count; i++) {
    let t = random(0.18, 0.82);
    let p = pointOnSplineLike(s.pts, t);
    let dir = stemDirection(s.pts, t);
    let side = random([-1, 1]);
    let a = dir + side * random(18, 55);
    let len = map(1 - t, 0, 1, 25, 95) * random(0.8, 1.15);

    let p0 = [p.x, p.y];
    let p1 = [
      p.x + cos(a) * len * 0.42 + random(-6, 6),
      p.y + sin(a) * len * 0.42 + random(-6, 6)
    ];
    let p2 = [
      p.x + cos(a) * len + random(-8, 8),
      p.y + sin(a) * len + random(-8, 8)
    ];

    let widthA = random(4, 10);
    let widthB = random(1.5, 4);
    let perp = a + 90;

    let leafPoly = [
      [p0[0], p0[1]],
      [p1[0] + cos(perp) * widthA, p1[1] + sin(perp) * widthA],
      [p2[0], p2[1]],
      [p1[0] - cos(perp) * widthB, p1[1] - sin(perp) * widthB]
    ];

    brush.hatchStyle("2H", "#5a5a5a", 0.34);
    brush.hatch(8, a - 65, { rand: 0.08, continuous: true });
    brush.polygon(leafPoly);
    brush.noHatch();

    if (random() < 0.65) {
      brush.hatchStyle("HB", "#3f3f3f", 0.42);
      brush.hatch(5, a - 35, { rand: 0.06, continuous: true });
      let innerLeaf = scalePolygon(leafPoly, p0[0], p0[1], 0.82);
      brush.polygon(innerLeaf);
      brush.noHatch();
    }

    brush.set("HB", "#2f2f2f", 0.34);
    if (!(s.incomplete && random() < 0.35)) {
      brush.spline([
        [p0[0], p0[1], 0.8],
        [p1[0], p1[1], 0.5],
        [p2[0], p2[1], 0.2]
      ], 0.42);
    }

    if (random() < 0.75) {
      brush.set("2H", "#555555", 0.22);
      brush.line(
        p0[0] + random(-1, 1),
        p0[1] + random(-1, 1),
        p2[0] + random(-1, 1),
        p2[1] + random(-1, 1)
      );
    }
  }
}

function drawSeedHead(s) {
  if (s.kind === "spike") drawSpikeHead(s);
  if (s.kind === "panicle") drawPanicleHead(s);
  if (s.kind === "tuft") drawTuftHead(s);
}

function drawSpikeHead(s) {
  let top = pointOnSplineLike(s.pts, 1);
  let dir = stemDirection(s.pts, 0.95);
  let len = random(45, 90);
  let steps = floor(random(8, 15));

  brush.set("HB", "#2d2d2d", 0.42);
  if (!(s.incomplete && random() < 0.5)) {
    brush.spline([
      [top.x, top.y, 0.45],
      [top.x + cos(dir) * len * 0.45, top.y + sin(dir) * len * 0.45, 0.3],
      [top.x + cos(dir) * len, top.y + sin(dir) * len, 0.18]
    ], 0.35);
  }

  for (let i = 0; i < steps; i++) {
    let t = i / max(1, steps - 1);
    let cx = top.x + cos(dir) * len * t;
    let cy = top.y + sin(dir) * len * t;
    let sideLen = map(t, 0, 1, 16, 5) * random(0.8, 1.15);
    let spread = random(22, 38);

    for (let side of [-1, 1]) {
      if (s.incomplete && side === 1 && i > steps * 0.6 && random() < 0.7) continue;

      let a = dir + side * spread + random(-8, 8);
      let ex = cx + cos(a) * sideLen;
      let ey = cy + sin(a) * sideLen;

      brush.set("2H", "#5a5a5a", 0.2);
      brush.line(cx, cy, ex, ey);

      brush.set("HB", "#333333", 0.28);
      brush.line(cx + random(-0.8, 0.8), cy + random(-0.8, 0.8), ex, ey);

      if (random() < 0.35) {
        brush.set("2B", "#252525", 0.18);
        brush.line(
          ex,
          ey,
          ex + cos(a + random(-15, 15)) * random(4, 8),
          ey + sin(a + random(-15, 15)) * random(4, 8)
        );
      }
    }
  }

  if (random() < 0.65) {
    let poly = capsulePolygon(top.x, top.y, dir, len * 0.72, random(5, 9));
    brush.hatchStyle("2H", "#666666", 0.22);
    brush.hatch(7, dir + 90, { rand: 0.08, continuous: true });
    brush.polygon(poly);
    brush.noHatch();
  }
}

function drawPanicleHead(s) {
  let top = pointOnSplineLike(s.pts, 1);
  let dir = stemDirection(s.pts, 0.92);
  let branchCount = floor(random(8, 14));
  let headLen = random(50, 120);

  for (let i = 0; i < branchCount; i++) {
    let t = random(0.05, 0.95);
    let bx = top.x + cos(dir) * headLen * t * 0.3;
    let by = top.y + sin(dir) * headLen * t * 0.3 + random(-6, 6);

    let side = random([-1, 1]);
    let a = dir + side * random(25, 75) + random(-10, 10);
    let bl = map(t, 0, 1, 40, 16) * random(0.75, 1.15);

    if (!(s.incomplete && side === 1 && random() < 0.45)) {
      brush.set("HB", "#373737", 0.26);
      brush.spline([
        [bx, by, 0.5],
        [bx + cos(a) * bl * 0.45, by + sin(a) * bl * 0.45, 0.28],
        [bx + cos(a) * bl, by + sin(a) * bl, 0.12]
      ], 0.38);

      let seedN = floor(random(2, 5));
      for (let j = 0; j < seedN; j++) {
        let tt = map(j, 0, max(1, seedN - 1), 0.35, 1);
        let sx = bx + cos(a) * bl * tt + random(-2.5, 2.5);
        let sy = by + sin(a) * bl * tt + random(-2.5, 2.5);
        let rr = random(2.5, 5.5);

        let seedPoly = roughEllipsePolygon(sx, sy, rr * 1.3, rr, random(10, 14), a);
        brush.hatchStyle("2H", "#646464", 0.22);
        brush.hatch(5.5, a + 85, { rand: 0.1, continuous: true });
        brush.polygon(seedPoly);
        brush.noHatch();

        if (random() < 0.7) {
          brush.set("HB", "#363636", 0.2);
          brush.polygon(seedPoly);
        }
      }
    }
  }

  brush.set("2H", "#5c5c5c", 0.18);
  for (let i = 0; i < 22; i++) {
    let a = dir + random(-70, 70);
    let l = random(8, 22);
    let x = top.x + random(-16, 16);
    let y = top.y + random(-14, 14);
    if (!(s.incomplete && random() < 0.35)) {
      brush.line(x, y, x + cos(a) * l, y + sin(a) * l);
    }
  }
}

function drawTuftHead(s) {
  let top = pointOnSplineLike(s.pts, 1);
  let dir = stemDirection(s.pts, 0.96);
  let centerX = top.x + cos(dir) * random(6, 16);
  let centerY = top.y + sin(dir) * random(6, 16);
  let rays = floor(random(22, 40));
  let radius = random(22, 42);

  let core = roughEllipsePolygon(centerX, centerY, random(5, 9), random(4, 7), 12, dir);
  brush.hatchStyle("HB", "#4a4a4a", 0.26);
  brush.hatch(4.5, dir + 70, { rand: 0.09, continuous: true });
  brush.polygon(core);
  brush.noHatch();

  brush.set("HB", "#303030", 0.24);
  if (!(s.incomplete && random() < 0.4)) {
    brush.line(top.x, top.y, centerX, centerY);
  }

  for (let i = 0; i < rays; i++) {
    let a = map(i, 0, rays, -130, 130) + dir + random(-8, 8);
    let l = radius * random(0.7, 1.2);
    if (s.incomplete && i > rays * 0.58 && random() < 0.65) continue;

    let ex = centerX + cos(a) * l;
    let ey = centerY + sin(a) * l;

    brush.set("2H", "#5b5b5b", 0.18);
    brush.line(centerX, centerY, ex, ey);

    if (random() < 0.75) {
      brush.set("HB", "#383838", 0.22);
      brush.line(
        centerX + random(-0.7, 0.7),
        centerY + random(-0.7, 0.7),
        ex,
        ey
      );
    }

    if (random() < 0.32) {
      let barbA = a + random(-18, 18);
      brush.set("2H", "#626262", 0.14);
      brush.line(
        ex,
        ey,
        ex + cos(barbA) * random(4, 9),
        ey + sin(barbA) * random(4, 9)
      );
    }
  }
}

function drawBrokenConstructionMarks(s) {
  brush.noFill();
  brush.noHatch();

  let top = pointOnSplineLike(s.pts, 1);
  let bottom = pointOnSplineLike(s.pts, 0);
  let mx = (top.x + bottom.x) * 0.5;
  let my = (top.y + bottom.y) * 0.5;

  brush.set("2H", "#8a8177", 0.12);

  if (random() < 0.6) {
    let r = random(18, 34);
    let poly = roughEllipsePolygon(mx, my, r * 0.8, r, 20, random(180));
    let partial = [];
    let stop = floor(poly.length * random(0.45, 0.8));
    for (let i = 0; i < stop; i++) partial.push(poly[i]);
    brush.spline(partial.map(p => [p[0], p[1], 0.2]), 0.3);
  }

  if (random() < 0.75) {
    brush.line(mx - random(18, 42), my, mx + random(18, 42), my + random(-2, 2));
  }

  if (random() < 0.5) {
    brush.line(mx, my - random(18, 42), mx + random(-2, 2), my + random(18, 42));
  }
}

function drawGroundHints() {
  brush.noFill();
  brush.noHatch();

  for (let i = 0; i < 11; i++) {
    let x = random(50, 550);
    let y = random(540, 595);
    let w = random(18, 60);
    let a = random(-15, 15);

    brush.set("2H", "#666666", 0.18);
    brush.line(x - w * 0.5, y, x + w * 0.5, y + tan(a) * 4);

    if (random() < 0.4) {
      brush.set("HB", "#494949", 0.2);
      brush.line(x - w * 0.3, y + 2, x + w * 0.2, y + random(-2, 3));
    }
  }
}

function offsetPolylinePolygon(pts, halfW, sideBias, tMax) {
  let left = [];
  let right = [];
  let steps = 12;

  for (let i = 0; i <= steps; i++) {
    let t = map(i, 0, steps, 0, tMax);
    let p = pointOnSplineLike(pts, t);
    let dir = stemDirection(pts, t);
    let taper = map(t, 0, tMax, 1.0, 0.15);
    let wL = halfW * taper * (sideBias < 0 ? 1.15 : 0.55);
    let wR = halfW * taper * (sideBias > 0 ? 1.15 : 0.55);
    let n = dir + 90;

    left.push([p.x + cos(n) * wL, p.y + sin(n) * wL]);
    right.push([p.x - cos(n) * wR, p.y - sin(n) * wR]);
  }

  right.reverse();
  return left.concat(right);
}

function scalePolygon(poly, cx, cy, sc) {
  let out = [];
  for (let p of poly) {
    out.push([lerp(cx, p[0], sc), lerp(cy, p[1], sc)]);
  }
  return out;
}

function capsulePolygon(x, y, a, len, r) {
  let pts = [];
  let x2 = x + cos(a) * len;
  let y2 = y + sin(a) * len;
  let n = a + 90;

  for (let i = 0; i <= 10; i++) {
    let aa = a - 90 + i * 18;
    pts.push([x + cos(aa) * r, y + sin(aa) * r]);
  }
  for (let i = 0; i <= 10; i++) {
    let aa = a + 90 + i * 18;
    pts.push([x2 + cos(aa) * r * 0.8, y2 + sin(aa) * r * 0.8]);
  }
  return pts;
}

function roughEllipsePolygon(cx, cy, rx, ry, n, rot) {
  let pts = [];
  for (let i = 0; i < n; i++) {
    let a = map(i, 0, n, 0, 360);
    let rr1 = rx * random(0.88, 1.12);
    let rr2 = ry * random(0.88, 1.12);
    let x = cos(a) * rr1;
    let y = sin(a) * rr2;
    let xr = x * cos(rot) - y * sin(rot);
    let yr = x * sin(rot) + y * cos(rot);
    pts.push([cx + xr, cy + yr]);
  }
  return pts;
}

function pointOnSplineLike(pts, t) {
  let segs = pts.length - 1;
  let scaled = constrain(t, 0, 1) * segs;
  let i = floor(scaled);
  if (i >= segs) i = segs - 1;
  let tt = scaled - i;
  let p1 = pts[i];
  let p2 = pts[i + 1];
  return {
    x: lerp(p1[0], p2[0], tt),
    y: lerp(p1[1], p2[1], tt)
  };
}

function stemDirection(pts, t) {
  let pA = pointOnSplineLike(pts, max(0, t - 0.03));
  let pB = pointOnSplineLike(pts, min(1, t + 0.03));
  return atan2(pB.y - pA.y, pB.x - pA.x);
}