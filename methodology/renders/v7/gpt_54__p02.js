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

  drawPaperGrain();
  drawGrassStudy();
  drawLooseConstruction();

  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#8a867d", 0.28);

  for (let i = 0; i < 180; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let len = random(4, 10);
    let a = random(-20, 20);
    let x2 = x + cos(a) * len;
    let y2 = y + sin(a) * len;
    brush.line(x, y, x2, y2);
  }
}

function drawGrassStudy() {
  let stems = [
    { x: 92,  y: 560, h: 270, lean: -9,  kind: "panicle",  seedY: 0.25, tone: 0.75 },
    { x: 128, y: 560, h: 315, lean: -4,  kind: "spike",    seedY: 0.22, tone: 0.6 },
    { x: 168, y: 560, h: 290, lean: 6,   kind: "panicle",  seedY: 0.28, tone: 0.8 },
    { x: 214, y: 560, h: 340, lean: -2,  kind: "spike",    seedY: 0.18, tone: 0.9 },
    { x: 260, y: 560, h: 300, lean: 10,  kind: "tuft",     seedY: 0.34, tone: 0.65 },
    { x: 304, y: 560, h: 360, lean: 4,   kind: "spike",    seedY: 0.16, tone: 1.0 },
    { x: 350, y: 560, h: 325, lean: -7,  kind: "panicle",  seedY: 0.24, tone: 0.7 },
    { x: 402, y: 560, h: 285, lean: 11,  kind: "spike",    seedY: 0.25, tone: 0.78 },
    { x: 444, y: 560, h: 330, lean: 8,   kind: "panicle",  seedY: 0.2,  tone: 0.82 },
    { x: 492, y: 560, h: 275, lean: -12, kind: "tuft",     seedY: 0.3,  tone: 0.7 }
  ];

  for (let s of stems) {
    drawStemShadow(s);
  }

  for (let s of stems) {
    drawMainStem(s);
    if (s.kind === "spike") drawSpikeSeedHead(s);
    if (s.kind === "panicle") drawPanicleSeedHead(s);
    if (s.kind === "tuft") drawTuftSeedHead(s);
    drawLeafStrips(s);
  }

  drawForegroundCrossings();
}

function drawStemShadow(s) {
  let base = createStemPoints(s.x, s.y, s.h, s.lean, 8);
  let inner = [];
  let cx = base[0][0];
  let cy = base[0][1] - s.h * 0.5;

  for (let i = 0; i < base.length; i++) {
    let px = lerp(cx, base[i][0] + 4, 0.97);
    let py = lerp(cy, base[i][1], 0.97);
    inner.push([px, py]);
  }

  brush.noFill();
  brush.hatchStyle("2H", "#6f6a63", 0.35);
  brush.hatch(8, 68, { rand: 0.08, continuous: true });
  brush.beginShape(0.42);
  for (let p of base) brush.vertex(p[0], p[1]);
  for (let i = inner.length - 1; i >= 0; i--) brush.vertex(inner[i][0], inner[i][1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawMainStem(s) {
  let pts = createStemPoints(s.x, s.y, s.h, s.lean, 8);

  brush.noFill();
  brush.set("HB", "#37342f", 0.52 + s.tone * 0.12);
  brush.spline(pts.map(p => [p[0], p[1], 0.5 + random(-0.05, 0.08)]), 0.55);

  let darkPts = [];
  for (let i = 1; i < pts.length - 1; i++) {
    darkPts.push([pts[i][0] + 1.3, pts[i][1], 0.35]);
  }
  if (darkPts.length > 2) {
    brush.set("2B", "#26231f", 0.34);
    brush.spline(darkPts, 0.42);
  }

  let tip = getStemTip(pts);
  brush.set("2H", "#5a5751", 0.24);
  for (let i = 0; i < 3; i++) {
    let a = -80 + i * 10 + random(-4, 4);
    let l = random(16, 26);
    brush.line(tip.x, tip.y, tip.x + cos(a) * l, tip.y + sin(a) * l);
  }
}

function drawSpikeSeedHead(s) {
  let pts = createStemPoints(s.x, s.y, s.h, s.lean, 8);
  let tip = getStemTip(pts);
  let axisLen = random(78, 110);
  let axisAngle = -89 + s.lean * 0.7 + random(-3, 3);
  let segs = 12;

  let seedCenters = [];
  for (let i = 0; i < segs; i++) {
    let t = i / (segs - 1);
    let px = tip.x + cos(axisAngle) * axisLen * t;
    let py = tip.y + sin(axisAngle) * axisLen * t;
    seedCenters.push([px, py, t]);
  }

  brush.set("HB", "#2f2c28", 0.44);
  brush.spline(seedCenters.map(p => [p[0], p[1], 0.45]), 0.25);

  for (let c of seedCenters) {
    let size = lerp(7, 13, 1 - c[2]) * s.tone;
    drawSpikelet(c[0], c[1], axisAngle, size);
  }

  let bottom = seedCenters[int(seedCenters.length * 0.7)];
  let top = seedCenters[int(seedCenters.length * 0.25)];
  let hull = [
    [bottom[0] - 9, bottom[1] + 10],
    [bottom[0] + 8, bottom[1] + 2],
    [top[0] + 5, top[1] - 6],
    [top[0] - 7, top[1] + 2]
  ];

  brush.hatchStyle("2H", "#67635c", 0.32);
  brush.hatch(6, 62, { rand: 0.06, continuous: true });
  brush.beginShape(0.32);
  for (let p of hull) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawSpikelet(x, y, a, s) {
  let left = a - 132 + random(-6, 6);
  let right = a + 132 + random(-6, 6);

  brush.set("2H", "#4d4944", 0.2);
  brush.line(x, y, x + cos(left) * s * 0.9, y + sin(left) * s * 0.9);
  brush.line(x, y, x + cos(right) * s * 0.85, y + sin(right) * s * 0.85);

  brush.set("HB", "#312e2a", 0.26);
  brush.line(
    x + cos(left) * s * 0.18,
    y + sin(left) * s * 0.18,
    x + cos(left) * s * 0.7,
    y + sin(left) * s * 0.7
  );

  if (random() < 0.7) {
    brush.set("2B", "#25221e", 0.18);
    brush.line(x, y, x + cos(a - 90) * s * 0.45, y + sin(a - 90) * s * 0.45);
  }
}

function drawPanicleSeedHead(s) {
  let pts = createStemPoints(s.x, s.y, s.h, s.lean, 8);
  let tip = getStemTip(pts);
  let branchCount = int(random(8, 12));

  for (let i = 0; i < branchCount; i++) {
    let side = i % 2 === 0 ? -1 : 1;
    let stemT = map(i, 0, branchCount - 1, 0.05, 0.95);
    let bx = lerp(pts[2][0], tip.x, stemT);
    let by = lerp(pts[2][1], tip.y, stemT);
    let ang = -90 + side * random(18, 45) + s.lean * 0.25;
    let len = lerp(46, 16, stemT) * random(0.85, 1.15);

    let branchPts = [
      [bx, by, 0.42],
      [bx + cos(ang * 0.9) * len * 0.45, by + sin(ang * 0.9) * len * 0.45, 0.35],
      [bx + cos(ang) * len, by + sin(ang) * len, 0.22]
    ];

    brush.set("HB", "#34312d", 0.32);
    brush.spline(branchPts, 0.4);

    let ex = branchPts[2][0];
    let ey = branchPts[2][1];
    drawPanicleSeeds(ex, ey, ang, len, side);
  }
}

function drawPanicleSeeds(x, y, ang, len, side) {
  let n = int(random(3, 6));
  for (let i = 0; i < n; i++) {
    let off = i * 5.8;
    let px = x + cos(ang + side * 12) * off;
    let py = y + sin(ang + side * 12) * off;
    let l = random(8, 16);

    brush.set("2H", "#504c47", 0.18);
    brush.line(px, py, px + cos(ang + side * random(18, 34)) * l, py + sin(ang + side * random(18, 34)) * l);

    let sx = px + cos(ang + side * 28) * l;
    let sy = py + sin(ang + side * 28) * l;
    drawSeedOval(sx, sy, random(6, 9), ang + side * random(14, 30));
  }
}

function drawSeedOval(x, y, sz, a) {
  let pts = [];
  let rx = sz * 0.62;
  let ry = sz * 0.34;

  for (let i = 0; i < 10; i++) {
    let t = map(i, 0, 9, 0, 360);
    let nx = cos(t) * rx;
    let ny = sin(t) * ry;
    let px = x + nx * cos(a) - ny * sin(a);
    let py = y + nx * sin(a) + ny * cos(a);
    pts.push([px, py]);
  }

  brush.set("HB", "#312d29", 0.22);
  brush.beginShape(0.22);
  for (let p of pts) brush.vertex(p[0], p[1]);
  if (random() < 0.75) brush.endShape(true);
  else brush.endShape(false);

  brush.hatchStyle("2H", "#706b63", 0.22);
  brush.hatch(5, a + 25, { rand: 0.05, continuous: true });
  brush.beginShape(0.18);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawTuftSeedHead(s) {
  let pts = createStemPoints(s.x, s.y, s.h, s.lean, 8);
  let tip = getStemTip(pts);
  let radii = [18, 28, 38];

  for (let r of radii) {
    let count = int(map(r, 18, 38, 14, 24));
    for (let i = 0; i < count; i++) {
      let a = -90 + map(i, 0, count - 1, -70, 70) + random(-4, 4);
      let l = r + random(-4, 7);
      brush.set("2H", "#4d4944", 0.2);
      brush.line(tip.x, tip.y, tip.x + cos(a) * l, tip.y + sin(a) * l);
      if (random() < 0.45) {
        brush.set("HB", "#2f2b27", 0.18);
        brush.line(
          tip.x + cos(a) * l * 0.8,
          tip.y + sin(a) * l * 0.8,
          tip.x + cos(a) * (l + random(5, 10)),
          tip.y + sin(a) * (l + random(5, 10))
        );
      }
    }
  }

  brush.set("2B", "#26231f", 0.2);
  brush.circle(tip.x, tip.y, 2.8, 0.3);
}

function drawLeafStrips(s) {
  let leafCount = int(random(2, 5));
  for (let i = 0; i < leafCount; i++) {
    let side = random() < 0.5 ? -1 : 1;
    let y0 = s.y - random(30, s.h * 0.45);
    let x0 = s.x + random(-6, 6);
    let len = random(90, 180);
    let bend = side * random(24, 55);

    let p0 = [x0, y0];
    let p1 = [x0 + bend * 0.28, y0 - len * 0.35];
    let p2 = [x0 + bend, y0 - len];
    let edge1 = buildLeafEdge(p0, p1, p2, 0);
    let edge2 = buildLeafEdge(
      [x0 + 4, y0 + 2],
      [x0 + bend * 0.3 + 6, y0 - len * 0.34],
      [x0 + bend + 2, y0 - len + 4],
      3
    );

    brush.set("HB", "#3a3631", 0.34);
    brush.spline(edge1.map(p => [p[0], p[1], 0.4]), 0.5);

    if (random() < 0.85) {
      brush.set("2H", "#55514b", 0.2);
      brush.spline(edge2.map(p => [p[0], p[1], 0.28]), 0.45);
    }

    brush.hatchStyle("2H", "#6d6861", 0.22);
    brush.hatch(7, side > 0 ? 58 : 122, { rand: 0.08, continuous: true });
    brush.beginShape(0.35);
    for (let p of edge1) brush.vertex(p[0], p[1]);
    for (let i2 = edge2.length - 1; i2 >= 0; i2--) {
      brush.vertex(edge2[i2][0], edge2[i2][1]);
    }
    brush.endShape(true);
    brush.noHatch();

    if (random() < 0.4) {
      brush.set("2H", "#7a756d", 0.16);
      let cut = int(random(1, 3));
      for (let j = 0; j < cut; j++) {
        let t = random(0.15, 0.8);
        let px = lerp(edge1[0][0], edge1[edge1.length - 1][0], t);
        let py = lerp(edge1[0][1], edge1[edge1.length - 1][1], t);
        brush.line(px, py, px + side * random(6, 14), py - random(8, 16));
      }
    }
  }
}

function drawForegroundCrossings() {
  let crossingData = [
    { x: 70,  y: 540, len: 250, a: -58 },
    { x: 115, y: 565, len: 220, a: -68 },
    { x: 505, y: 568, len: 205, a: -112 },
    { x: 545, y: 548, len: 240, a: -118 }
  ];

  for (let c of crossingData) {
    let p0 = [c.x, c.y];
    let p1 = [c.x + cos(c.a) * c.len * 0.35, c.y + sin(c.a) * c.len * 0.35];
    let p2 = [c.x + cos(c.a + random(-10, 10)) * c.len, c.y + sin(c.a + random(-10, 10)) * c.len];
    let edge1 = buildLeafEdge(p0, p1, p2, 0);
    let edge2 = buildLeafEdge(
      [c.x + 5, c.y + 1],
      [p1[0] + 5, p1[1] + 3],
      [p2[0] + 2, p2[1] + 2],
      4
    );

    brush.set("HB", "#302d29", 0.38);
    brush.spline(edge1.map(p => [p[0], p[1], 0.42]), 0.44);

    brush.set("2H", "#59554f", 0.18);
    brush.spline(edge2.map(p => [p[0], p[1], 0.25]), 0.4);

    brush.hatchStyle("2H", "#777169", 0.18);
    brush.hatch(8, c.a + 88, { rand: 0.07, continuous: true });
    brush.beginShape(0.22);
    for (let p of edge1) brush.vertex(p[0], p[1]);
    for (let i = edge2.length - 1; i >= 0; i--) brush.vertex(edge2[i][0], edge2[i][1]);
    brush.endShape(true);
    brush.noHatch();

    if (random() < 0.7) {
      let breaks = int(random(2, 4));
      brush.set("2H", "#8b867f", 0.14);
      for (let i = 0; i < breaks; i++) {
        let t = random(0.2, 0.9);
        let px = lerp(edge1[0][0], edge1[edge1.length - 1][0], t);
        let py = lerp(edge1[0][1], edge1[edge1.length - 1][1], t);
        brush.line(px - 3, py + 2, px + 7, py - 5);
      }
    }
  }
}

function drawLooseConstruction() {
  brush.noFill();
  brush.noHatch();

  brush.set("2H", "#a39d94", 0.16);
  let frameY = 82;
  brush.line(56, frameY, 250, frameY);
  brush.line(58, frameY + 2, 58, frameY + 40);
  brush.line(248, frameY + 2, 248, frameY + 34);

  brush.set("2H", "#9a948a", 0.12);
  for (let i = 0; i < 9; i++) {
    let x = 410 + i * 14 + random(-3, 3);
    let y = 118 + i * 7 + random(-2, 2);
    brush.line(x, y, x + random(18, 40), y + random(6, 22));
  }

  brush.set("2H", "#b1aba2", 0.1);
  brush.arc(466, 154, 28, 195, 350);
  brush.arc(466, 154, 38, 200, 340);

  brush.set("2H", "#aaa49a", 0.12);
  brush.line(70, 505, 106, 505);
  brush.line(88, 488, 88, 524);
  brush.line(492, 72, 534, 94);
  brush.line(528, 78, 548, 122);
}

function createStemPoints(x, y, h, lean, wobble) {
  let pts = [];
  let segs = 7;
  for (let i = 0; i <= segs; i++) {
    let t = i / segs;
    let yy = y - h * t;
    let curve = sin(t * 90) * lean * 1.8 + sin(t * 210) * wobble;
    let xx = x + curve + (noise(x * 0.01, t * 2.2) - 0.5) * 10;
    pts.push([xx, yy]);
  }
  return pts;
}

function getStemTip(pts) {
  let p = pts[pts.length - 1];
  return { x: p[0], y: p[1] };
}

function buildLeafEdge(p0, p1, p2, offset) {
  let pts = [];
  let steps = 8;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let xa = lerp(p0[0], p1[0], t);
    let ya = lerp(p0[1], p1[1], t);
    let xb = lerp(p1[0], p2[0], t);
    let yb = lerp(p1[1], p2[1], t);
    let x = lerp(xa, xb, t) + offset * 0.3 + random(-0.5, 0.5);
    let y = lerp(ya, yb, t) + offset * 0.05 + random(-0.5, 0.5);
    pts.push([x, y]);
  }
  return pts;
}