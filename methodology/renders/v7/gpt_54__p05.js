let trunks = [];
let shrubZones = [];
let shadowZones = [];
let branchCurves = [];
let seedValue = 41721;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  randomSeed(seedValue);
  noiseSeed(seedValue);
  background("#fffaf3");
  brush.scaleBrushes(3);

  generateForest();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  drawForest();
  noLoop();
}

function generateForest() {
  let trunkCount = 17;

  for (let i = 0; i < trunkCount; i++) {
    let depth = map(i, 0, trunkCount - 1, 0, 1);
    let x = map(i, 0, trunkCount - 1, 40, 560) + random(-18, 18);
    let yBase = random(520, 610);
    let h = random(220, 520) + depth * 120;
    let w = random(14, 34) + depth * 12;
    let lean = random(-26, 26);
    let curve = random(-18, 18);

    trunks.push(makeTrunk(x, yBase, w, h, lean, curve, depth));
  }

  trunks.sort((a, b) => a.depth - b.depth);

  for (let i = 0; i < 22; i++) {
    let x = random(30, 570);
    let y = random(330, 590);
    let w = random(80, 220);
    let h = random(35, 110);
    shrubZones.push(makeOrganicZone(x, y, w, h, 18, 0.38));
  }

  for (let i = 0; i < 18; i++) {
    let x = random(20, 580);
    let y = random(360, 595);
    let w = random(70, 240);
    let h = random(30, 95);
    shadowZones.push(makeOrganicZone(x, y, w, h, 22, 0.55));
  }

  for (let i = 0; i < trunks.length; i++) {
    let t = trunks[i];
    let branchCount = floor(random(2, 5));
    for (let j = 0; j < branchCount; j++) {
      let side = random() < 0.5 ? -1 : 1;
      let sy = lerp(t.topY + 30, t.baseY - 90, random(0.15, 0.75));
      let sx = lerp(t.leftAtY(sy), t.rightAtY(sy), random(0.35, 0.65));
      let len = random(40, 120) * (1.15 - t.depth * 0.45);
      branchCurves.push(makeBranch(sx, sy, len, side, t.depth));
    }
  }
}

function drawForest() {
  drawBackgroundAtmosphere();
  drawDistantVerticals();
  drawShadowWeave();
  drawShrubWeave();
  drawTrunkHatching();
  drawBranches();
  drawForegroundThickets();
  drawEdgeScratch();
}

function drawBackgroundAtmosphere() {
  brush.noFill();
  brush.noHatch();
  brush.set("rotring", "#000000", 0.22);

  for (let x = 20; x <= 580; x += 10) {
    let y1 = 35 + noise(x * 0.01, 10) * 40;
    let y2 = 590 - noise(x * 0.012, 90) * 120;
    brush.line(x + random(-2, 2), y1, x + random(-2, 2), y2);
  }

  brush.set("rotring", "#000000", 0.18);
  for (let y = 70; y <= 560; y += 16) {
    let pts = [];
    for (let x = 0; x <= 600; x += 28) {
      let yy = y + map(noise(x * 0.014, y * 0.01), 0, 1, -10, 10);
      pts.push([x, yy, 1]);
    }
    brush.spline(pts, 0.25);
  }
}

function drawDistantVerticals() {
  brush.noFill();
  brush.noHatch();
  brush.set("pen", "#000000", 0.5);

  for (let i = 0; i < 45; i++) {
    let x = random(0, 600);
    let topY = random(60, 240);
    let botY = random(350, 600);
    let sway = random(-12, 12);

    let pts = [];
    for (let s = 0; s <= 7; s++) {
      let t = s / 7;
      let xx = x + sin(t * 180 + random(-20, 20)) * sway * (0.4 + t);
      let yy = lerp(topY, botY, t);
      pts.push([xx, yy, random(0.8, 1.2)]);
    }
    brush.spline(pts, 0.42);
  }
}

function drawShadowWeave() {
  brush.noFill();

  for (let i = 0; i < shadowZones.length; i++) {
    let z = shadowZones[i];

    brush.hatchStyle("rotring", "#000000", 0.42);
    brush.hatch(random(2.1, 3.3), random(95, 120), {
      rand: 0.08,
      continuous: true,
      gradient: random(0.1, 0.28)
    });
    brush.polygon(z);

    brush.hatchStyle("rotring", "#000000", 0.38);
    brush.hatch(random(2.6, 4.2), random(55, 78), {
      rand: 0.07,
      continuous: true,
      gradient: random(0.08, 0.24)
    });
    brush.polygon(scalePolygon(z, centroid(z), random(0.82, 0.94)));

    if (random() < 0.65) {
      brush.hatchStyle("pen", "#000000", 0.52);
      brush.hatch(random(4.2, 6.2), random(130, 155), {
        rand: 0.05,
        continuous: true,
        gradient: random(0.05, 0.16)
      });
      brush.polygon(scalePolygon(z, centroid(z), random(0.58, 0.8)));
    }
  }

  brush.noHatch();
}

function drawShrubWeave() {
  brush.noFill();

  for (let i = 0; i < shrubZones.length; i++) {
    let z = shrubZones[i];

    brush.hatchStyle("rotring", "#000000", 0.28);
    brush.hatch(random(4.2, 6.8), random(18, 42), {
      rand: 0.12,
      continuous: true,
      gradient: random(0.08, 0.18)
    });
    brush.polygon(z);

    brush.hatchStyle("rotring", "#000000", 0.25);
    brush.hatch(random(5.0, 8.5), random(145, 168), {
      rand: 0.15,
      continuous: true,
      gradient: random(0.04, 0.14)
    });
    brush.polygon(scalePolygon(z, centroid(z), random(0.72, 0.9)));

    if (random() < 0.4) {
      brush.hatchStyle("pen", "#000000", 0.4);
      brush.hatch(random(7, 11), random(85, 105), {
        rand: 0.08,
        continuous: true,
        gradient: false
      });
      brush.polygon(scalePolygon(z, centroid(z), random(0.55, 0.72)));
    }
  }

  brush.noHatch();
}

function drawTrunkHatching() {
  brush.noFill();

  for (let i = 0; i < trunks.length; i++) {
    let t = trunks[i];
    let inner = scalePolygon(t.poly, centroid(t.poly), 0.8);
    let core = scalePolygon(t.poly, centroid(t.poly), 0.55);

    brush.hatchStyle("rotring", "#000000", 0.36 + t.depth * 0.18);
    brush.hatch(max(1.5, 5.5 - t.depth * 2.5), 86 + random(-4, 4), {
      rand: 0.04,
      continuous: true,
      gradient: 0.18
    });
    brush.polygon(t.poly);

    brush.hatchStyle("rotring", "#000000", 0.42 + t.depth * 0.22);
    brush.hatch(max(1.2, 4.2 - t.depth * 1.8), 94 + random(-5, 5), {
      rand: 0.04,
      continuous: true,
      gradient: 0.12
    });
    brush.polygon(inner);

    brush.hatchStyle("pen", "#000000", 0.55 + t.depth * 0.3);
    brush.hatch(max(2.2, 7 - t.depth * 2.5), 18 + random(-8, 8), {
      rand: 0.05,
      continuous: true,
      gradient: 0.08
    });
    brush.polygon(core);

    if (random() < 0.75) {
      brush.set("pen", "#000000", 0.7 + t.depth * 0.55);
      let barkLines = floor(5 + t.depth * 10);
      for (let k = 0; k < barkLines; k++) {
        let yy1 = lerp(t.topY + 8, t.baseY - 16, random());
        let yy2 = yy1 + random(18, 65);
        let xx1 = lerp(t.leftAtY(yy1), t.rightAtY(yy1), random(0.18, 0.82));
        let xx2 = xx1 + random(-4, 4);
        brush.line(xx1, yy1, xx2, min(yy2, t.baseY - 4));
      }
    }

    brush.set("pen", "#000000", 0.75 + t.depth * 0.7);
    let outlinePts = [];
    for (let p of t.spineLeft) outlinePts.push([p[0], p[1], 1]);
    brush.spline(outlinePts, 0.35);

    outlinePts = [];
    for (let p of t.spineRight) outlinePts.push([p[0], p[1], 1]);
    brush.spline(outlinePts, 0.35);
  }

  brush.noHatch();
}

function drawBranches() {
  brush.noFill();
  brush.noHatch();

  for (let b of branchCurves) {
    brush.set("pen", "#000000", b.weight);
    brush.spline(b.points, 0.5);

    if (random() < 0.65) {
      brush.set("rotring", "#000000", b.weight * 0.55);
      for (let i = 1; i < b.points.length - 1; i++) {
        let p = b.points[i];
        let a = b.angle + random(-40, 40);
        let len = random(10, 28) * (1.2 - b.depth * 0.35);
        let x2 = p[0] + cos(a) * len;
        let y2 = p[1] + sin(a) * len;
        brush.line(p[0], p[1], x2, y2);
      }
    }
  }
}

function drawForegroundThickets() {
  brush.noFill();
  brush.noHatch();

  for (let i = 0; i < 240; i++) {
    let x = random(0, 600);
    let y = random(410, 600);
    let h = random(18, 95);
    let a = random(250, 292);
    let x2 = x + cos(a) * random(3, 16);
    let y2 = y + sin(a) * h;

    brush.set(random() < 0.72 ? "rotring" : "pen", "#000000", random(0.22, 0.6));
    brush.line(x, y, x2, y2);
  }

  for (let i = 0; i < 90; i++) {
    let cx = random(20, 580);
    let cy = random(455, 600);
    let pts = [];
    let count = floor(random(3, 6));
    let dir = random(230, 305);

    pts.push([cx, cy, 1]);
    for (let j = 1; j < count; j++) {
      let step = j / (count - 1);
      pts.push([
        cx + cos(dir + random(-18, 18)) * random(8, 18) * j,
        cy + sin(dir + random(-12, 12)) * random(12, 32) * j,
        1 - step * 0.35
      ]);
    }

    brush.set("pen", "#000000", random(0.2, 0.5));
    brush.spline(pts, 0.4);
  }
}

function drawEdgeScratch() {
  brush.noFill();
  brush.noHatch();
  brush.set("rotring", "#000000", 0.16);

  for (let i = 0; i < 80; i++) {
    let side = floor(random(4));
    let x1, y1, x2, y2;

    if (side === 0) {
      x1 = random(0, 600);
      y1 = random(0, 30);
      x2 = x1 + random(-10, 10);
      y2 = y1 + random(10, 45);
    } else if (side === 1) {
      x1 = random(0, 600);
      y1 = random(570, 600);
      x2 = x1 + random(-10, 10);
      y2 = y1 - random(10, 45);
    } else if (side === 2) {
      x1 = random(0, 30);
      y1 = random(0, 600);
      x2 = x1 + random(10, 40);
      y2 = y1 + random(-10, 10);
    } else {
      x1 = random(570, 600);
      y1 = random(0, 600);
      x2 = x1 - random(10, 40);
      y2 = y1 + random(-10, 10);
    }

    brush.line(x1, y1, x2, y2);
  }
}

function makeTrunk(x, baseY, w, h, lean, curve, depth) {
  let ptsLeft = [];
  let ptsRight = [];
  let centerPts = [];
  let steps = 10;
  let topY = baseY - h;

  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let yy = lerp(baseY, topY, t);
    let sway = sin(t * 170) * curve + map(noise(x * 0.01, t * 2.4), 0, 1, -8, 8);
    let cx = x + lean * t + sway;
    let ww = w * (1 - t * 0.62) + random(-1.5, 1.5);

    centerPts.push([cx, yy]);
    ptsLeft.push([cx - ww * 0.5 + random(-2, 2), yy]);
    ptsRight.push([cx + ww * 0.5 + random(-2, 2), yy]);
  }

  let poly = [];
  for (let p of ptsLeft) poly.push([p[0], p[1]]);
  for (let i = ptsRight.length - 1; i >= 0; i--) poly.push([ptsRight[i][0], ptsRight[i][1]]);

  return {
    poly: poly,
    spineLeft: ptsLeft,
    spineRight: ptsRight,
    centerPts: centerPts,
    baseY: baseY,
    topY: topY,
    depth: depth,
    leftAtY: function(y) {
      return interpSide(this.spineLeft, y);
    },
    rightAtY: function(y) {
      return interpSide(this.spineRight, y);
    }
  };
}

function makeOrganicZone(x, y, w, h, count, rough) {
  let pts = [];
  let a0 = random(360);
  for (let i = 0; i < count; i++) {
    let a = a0 + (i / count) * 360;
    let rx = w * 0.5;
    let ry = h * 0.5;
    let nr = 1 + map(noise(cos(a) * 0.03 + x * 0.01, sin(a) * 0.03 + y * 0.01), 0, 1, -rough, rough);
    let px = x + cos(a) * rx * nr;
    let py = y + sin(a) * ry * nr;
    pts.push([px, py]);
  }
  return pts;
}

function makeBranch(x, y, len, side, depth) {
  let pts = [];
  let segs = floor(random(3, 6));
  let baseAngle = side < 0 ? random(150, 215) : random(-35, 25);

  pts.push([x, y, 1.2]);

  let px = x;
  let py = y;
  let a = baseAngle;

  for (let i = 0; i < segs; i++) {
    let step = len / segs * random(0.7, 1.2);
    a += random(-18, 18) + side * random(-7, 7);
    px += cos(a) * step;
    py += sin(a) * step;
    pts.push([px, py, max(0.45, 1 - i * 0.18)]);
  }

  return {
    points: pts,
    angle: baseAngle,
    weight: random(0.22, 0.72) * (1.25 - depth * 0.25),
    depth: depth
  };
}

function scalePolygon(poly, c, s) {
  let out = [];
  for (let p of poly) {
    out.push([
      lerp(c.x, p[0], s),
      lerp(c.y, p[1], s)
    ]);
  }
  return out;
}

function centroid(poly) {
  let sx = 0;
  let sy = 0;
  for (let p of poly) {
    sx += p[0];
    sy += p[1];
  }
  return { x: sx / poly.length, y: sy / poly.length };
}

function interpSide(sidePts, y) {
  for (let i = 0; i < sidePts.length - 1; i++) {
    let y1 = sidePts[i][1];
    let y2 = sidePts[i + 1][1];
    if ((y <= y1 && y >= y2) || (y >= y1 && y <= y2)) {
      let t = (y - y1) / (y2 - y1);
      return lerp(sidePts[i][0], sidePts[i + 1][0], t);
    }
  }
  return sidePts[sidePts.length - 1][0];
}