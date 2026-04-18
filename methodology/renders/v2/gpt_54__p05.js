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

  brush.noField();
  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noStroke();
  brush.noHatch();

  drawForestHatching();
  drawPaperSpecks();

  noLoop();
}

function drawForestHatching() {
  const trunks = [];
  const leftGap = 24;
  const rightGap = width - 24;

  for (let i = 0; i < 15; i++) {
    const x = map(i, 0, 14, 40, 560) + random(-14, 14);
    const baseW = map(noise(i * 0.23), 0, 1, 16, 42);
    const lean = random(-18, 18);
    const topY = random(-30, 110);
    const bottomY = 640;
    trunks.push({ x, baseW, lean, topY, bottomY });
  }

  trunks.sort((a, b) => a.x - b.x);

  brush.set("pen", "#111111", 1.05);

  for (let t of trunks) {
    let contour = trunkPolygon(t.x, t.topY, t.bottomY, t.baseW, t.lean, 18);
    brush.beginShape(0.18);
    for (let p of contour) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  for (let i = 0; i < 70; i++) {
    const y = map(i, 0, 69, 250, 598);
    const spacing = map(y, 250, 598, 11, 2.6);
    const ang = 84 + random(-4, 4);
    brush.hatchStyle("rotring", "#000000", 0.28);
    brush.hatch(spacing, ang, { rand: 0.08, continuous: true });
    brush.beginShape(0.08);
    brush.vertex(leftGap, y + random(-2, 2));
    brush.vertex(rightGap, y + random(-2, 2));
    brush.vertex(rightGap, 602);
    brush.vertex(leftGap, 602);
    brush.endShape(true);
    brush.noHatch();
  }

  for (let i = 0; i < 40; i++) {
    const y = map(i, 0, 39, 230, 598);
    const spacing = map(y, 230, 598, 13, 3.2);
    brush.hatchStyle("rotring", "#000000", 0.22);
    brush.hatch(spacing, 101 + random(-5, 5), { rand: 0.07, continuous: true });
    brush.beginShape(0.08);
    brush.vertex(leftGap, y + random(-3, 3));
    brush.vertex(rightGap, y + random(-3, 3));
    brush.vertex(rightGap, 602);
    brush.vertex(leftGap, 602);
    brush.endShape(true);
    brush.noHatch();
  }

  for (let i = 0; i < 34; i++) {
    const y = map(i, 0, 33, 265, 595);
    const wave = 10 + noise(i * 0.2) * 18;
    brush.hatchStyle("rotring", "#000000", 0.2);
    brush.hatch(map(y, 265, 595, 16, 4.2), 66 + random(-4, 4), { rand: 0.09, continuous: true });
    brush.beginShape(0.22);
    brush.vertex(leftGap, y + wave);
    brush.vertex(width * 0.28, y - wave * 0.4);
    brush.vertex(width * 0.52, y + wave * 0.6);
    brush.vertex(width * 0.77, y - wave * 0.35);
    brush.vertex(rightGap, y + wave * 0.3);
    brush.vertex(rightGap, 602);
    brush.vertex(leftGap, 602);
    brush.endShape(true);
    brush.noHatch();
  }

  for (let t of trunks) {
    const contour = trunkPolygon(t.x, t.topY, t.bottomY, t.baseW, t.lean, 18);

    brush.hatchStyle("rotring", "#000000", 0.35);
    brush.hatch(map(t.baseW, 16, 42, 6.8, 3.6), 89 + random(-2, 2), { rand: 0.04, continuous: true });
    brush.beginShape(0.16);
    for (let p of contour) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    const leftShadow = trunkSidePolygon(t.x, t.topY, t.bottomY, t.baseW, t.lean, 18, "left");
    brush.hatchStyle("rotring", "#000000", 0.48);
    brush.hatch(map(t.baseW, 16, 42, 4.6, 2.3), 102 + random(-3, 3), { rand: 0.05, continuous: true });
    brush.beginShape(0.12);
    for (let p of leftShadow) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    const darkCore = trunkCorePolygon(t.x, t.topY, t.bottomY, t.baseW, t.lean, 18, 0.18, 0.32);
    brush.hatchStyle("rotring", "#000000", 0.58);
    brush.hatch(map(t.baseW, 16, 42, 3.6, 1.8), 76 + random(-2, 2), { rand: 0.03, continuous: true });
    brush.beginShape(0.12);
    for (let p of darkCore) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    if (random() < 0.7) {
      const cut1 = map(random(), 0, 1, t.topY + 90, t.bottomY - 140);
      const cut2 = cut1 + random(25, 70);
      brush.hatchStyle("rotring", "#000000", 0.32);
      brush.hatch(2.4, 118 + random(-4, 4), { rand: 0.08, continuous: true });
      brush.beginShape(0.08);
      brush.vertex(t.x - t.baseW * 0.48, cut1);
      brush.vertex(t.x - t.baseW * 0.08, cut1 - 8);
      brush.vertex(t.x + t.baseW * 0.1, cut2);
      brush.vertex(t.x - t.baseW * 0.42, cut2 + 10);
      brush.endShape(true);
      brush.noHatch();
    }
  }

  for (let band = 0; band < 10; band++) {
    const y = map(band, 0, 9, 300, 585);
    const count = floor(map(y, 300, 585, 8, 28));
    for (let i = 0; i < count; i++) {
      const cx = random(20, 580);
      const w = random(14, 52);
      const h = random(10, 34);
      const pts = grassClump(cx, y + random(-10, 10), w, h);
      brush.hatchStyle("rotring", "#000000", map(y, 300, 585, 0.18, 0.36));
      brush.hatch(map(y, 300, 585, 7.5, 2.6), 70 + random(-16, 16), { rand: 0.15, continuous: true });
      brush.beginShape(0.25);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(true);
      brush.noHatch();
    }
  }

  for (let i = 0; i < 160; i++) {
    const x = random(0, 600);
    const y = random(290, 598);
    const len = random(16, 58);
    brush.set("rotring", "#000000", random(0.18, 0.34));
    brush.line(x, y, x + random(-10, 10), y + len);
  }

  for (let i = 0; i < 140; i++) {
    const x = random(0, 600);
    const y = random(240, 590);
    const len = random(18, 70);
    brush.set("rotring", "#000000", random(0.14, 0.26));
    brush.line(x, y, x + len * 0.45, y + len * 0.2);
  }

  for (let i = 0; i < 18; i++) {
    const y = map(i, 0, 17, 220, 595);
    const pts = [];
    const n = 9;
    for (let k = 0; k < n; k++) {
      const x = map(k, 0, n - 1, 10, 590);
      const yy = y + noise(i * 0.3, k * 0.18) * 32 - 16 + k * 0.2;
      pts.push([x, yy]);
    }
    brush.set("pen", "#000000", map(y, 220, 595, 0.28, 0.6));
    brush.spline(pts, 0.32);
  }

  for (let i = 0; i < 7; i++) {
    const x = random(30, 570);
    const w = random(80, 220);
    const top = random(120, 230);
    const bottom = random(300, 430);
    const poly = darkVerticalShadow(x, top, bottom, w);
    brush.hatchStyle("rotring", "#000000", 0.42);
    brush.hatch(random(2.6, 4.2), 92 + random(-3, 3), { rand: 0.06, continuous: true });
    brush.beginShape(0.18);
    for (let p of poly) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("rotring", "#000000", 0.26);
    brush.hatch(random(5.5, 8), 112 + random(-4, 4), { rand: 0.08, continuous: true });
    brush.beginShape(0.18);
    for (let p of poly) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  brush.noHatch();
  brush.noFill();
}

function trunkPolygon(x, topY, bottomY, baseW, lean, steps) {
  const ptsL = [];
  const ptsR = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = lerp(topY, bottomY, t);
    const cx = x + sin(t * 120 + x * 0.1) * 6 + lean * t;
    const w = lerp(baseW * 0.35, baseW, pow(t, 1.05)) + noise(x * 0.01, y * 0.01) * 4 - 2;
    ptsL.push([cx - w * 0.5 - noise(10 + x * 0.02, y * 0.02) * 6, y]);
    ptsR.push([cx + w * 0.5 + noise(20 + x * 0.02, y * 0.02) * 6, y]);
  }
  return ptsL.concat(ptsR.reverse());
}

function trunkSidePolygon(x, topY, bottomY, baseW, lean, steps, side) {
  const outer = [];
  const inner = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = lerp(topY, bottomY, t);
    const cx = x + sin(t * 120 + x * 0.1) * 6 + lean * t;
    const w = lerp(baseW * 0.35, baseW, pow(t, 1.05)) + noise(x * 0.01, y * 0.01) * 4 - 2;
    const shift = side === "left" ? -1 : 1;
    const outerX = cx + shift * (w * 0.5 + noise(20 + x * 0.02, y * 0.02) * 4);
    const innerX = cx + shift * (w * random(0.05, 0.18));
    outer.push([outerX, y]);
    inner.push([innerX, y]);
  }
  return outer.concat(inner.reverse());
}

function trunkCorePolygon(x, topY, bottomY, baseW, lean, steps, a, b) {
  const left = [];
  const right = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = lerp(topY, bottomY, t);
    const cx = x + sin(t * 120 + x * 0.1) * 6 + lean * t;
    const w = lerp(baseW * 0.35, baseW, pow(t, 1.05));
    left.push([cx - w * a + noise(40 + x * 0.01, y * 0.02) * 2, y]);
    right.push([cx + w * b + noise(60 + x * 0.01, y * 0.02) * 2, y]);
  }
  return left.concat(right.reverse());
}

function grassClump(cx, cy, w, h) {
  return [
    [cx - w * 0.5, cy + h * 0.45],
    [cx - w * 0.38, cy + h * 0.05],
    [cx - w * 0.22, cy - h * 0.5],
    [cx - w * 0.06, cy - h * 0.18],
    [cx + w * 0.08, cy - h * 0.65],
    [cx + w * 0.2, cy - h * 0.15],
    [cx + w * 0.36, cy - h * 0.42],
    [cx + w * 0.5, cy + h * 0.4]
  ];
}

function darkVerticalShadow(x, top, bottom, w) {
  return [
    [x - w * 0.5, top + random(-20, 10)],
    [x - w * 0.18, top + random(-8, 18)],
    [x + w * 0.1, top + random(-14, 14)],
    [x + w * 0.48, top + random(-10, 22)],
    [x + w * 0.42, bottom + random(-10, 16)],
    [x + w * 0.08, bottom + random(-18, 10)],
    [x - w * 0.22, bottom + random(-14, 14)],
    [x - w * 0.46, bottom + random(-8, 12)]
  ];
}

function drawPaperSpecks() {
  brush.set("rotring", "#000000", 0.08);
  for (let i = 0; i < 220; i++) {
    const x = random(0, 600);
    const y = random(0, 600);
    const d = random(0.5, 2.2);
    brush.line(x, y, x + d, y + d * 0.2);
  }
}