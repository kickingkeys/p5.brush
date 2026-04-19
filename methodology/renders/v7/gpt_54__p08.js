function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noiseSeed(12);
  randomSeed(12);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // soft sky glow
  brush.noStroke();
  brush.fillTexture(0.72, 0.28);

  brush.fill("#f2d8b8", 42);
  brush.fillBleed(0.5, "out");
  brush.circle(300, 120, 210);

  brush.fill("#d8dbe7", 36);
  brush.fillBleed(0.55, "out");
  brush.circle(250, 150, 260);

  brush.fill("#c7d4df", 34);
  brush.fillBleed(0.5, "out");
  brush.circle(380, 170, 250);

  // fog banks across the harbor
  for (let i = 0; i < 12; i++) {
    let cx = random(40, 560);
    let cy = random(160, 360);
    let rw = random(90, 180);
    let rh = random(35, 80);

    brush.fill(random(["#d7dde3", "#cfd7df", "#e6ddd0", "#c8d2da"]), random(18, 34));
    brush.fillBleed(random(0.42, 0.62), "out");
    organicBlob(cx, cy, rw, rh, 24, 0.55);
  }

  // distant water haze
  for (let i = 0; i < 8; i++) {
    let y = map(i, 0, 7, 285, 410);
    brush.fill("#b7c7d1", random(18, 28));
    brush.fillBleed(0.38, "out");
    organicBand(300, y, 620, random(18, 36), 28);
  }

  // distant shore silhouettes
  brush.noStroke();
  brush.fillTexture(0.65, 0.3);

  brush.fill("#9eabb0", 30);
  brush.fillBleed(0.28, "out");
  beginHarborMass(0.45, 1.0, 0.0);

  brush.fill("#7e8a90", 22);
  brush.fillBleed(0.34, "in");
  beginHarborMass(0.45, 0.82, 18.0);

  // faint boat masses
  for (let i = 0; i < 6; i++) {
    let x = 90 + i * 75 + random(-10, 10);
    let y = random(300, 360);
    let w = random(42, 80);
    let h = random(10, 22);

    brush.fill("#7a8790", random(18, 28));
    brush.fillBleed(0.25, "out");
    boatHullWash(x, y, w, h);

    brush.fill("#91a0a8", random(12, 20));
    brush.fillBleed(0.3, "out");
    boatHullWash(x + random(-3, 3), y + random(-4, 2), w * 0.75, h * 0.8);
  }

  // larger foreground boats as soft watercolor forms
  let boats = [
    { x: 155, y: 355, w: 110, h: 26, mast: 115 },
    { x: 305, y: 378, w: 135, h: 30, mast: 148 },
    { x: 455, y: 345, w: 98, h: 24, mast: 126 }
  ];

  for (let b of boats) {
    brush.fill("#74848e", 34);
    brush.fillBleed(0.26, "out");
    boatHullWash(b.x, b.y, b.w, b.h);

    brush.fill("#90a0aa", 18);
    brush.fillBleed(0.3, "in");
    boatHullWash(b.x, b.y - 2, b.w * 0.82, b.h * 0.72);

    brush.fill("#b8c4cc", 12);
    brush.fillBleed(0.22, "out");
    organicBlob(b.x, b.y - b.mast * 0.42, b.w * 0.48, b.mast * 0.82, 18, 0.45);
  }

  // reflections / damp horizontal softness
  brush.set("spray", "#9db0ba", 0.9);
  brush.field("waves");
  for (let i = 0; i < 140; i++) {
    let x = random(20, 580);
    let y = random(340, 560);
    brush.flowLine(x, y, random(8, 24), 0);
  }
  brush.noField();

  brush.set("2H", "#a9b4bb", 0.45);
  for (let i = 0; i < 60; i++) {
    let y = random(360, 560);
    let x1 = random(20, 520);
    let len = random(25, 90);
    brush.line(x1, y, x1 + len, y + random(-2, 2));
  }

  // graphite structure: masts
  brush.noFill();
  brush.set("HB", "#6a7074", 0.48);
  for (let b of boats) {
    let mx = b.x + random(-6, 6);
    let topY = b.y - b.mast;
    brush.line(mx, b.y - 4, mx, topY);

    if (random() < 0.8) {
      let mx2 = mx + random(16, 32);
      let topY2 = b.y - b.mast * random(0.65, 0.88);
      brush.set("2H", "#7e8589", 0.34);
      brush.line(mx2, b.y - 3, mx2, topY2);
      brush.set("HB", "#6a7074", 0.48);
    }
  }

  // distant masts
  brush.set("2H", "#8e9599", 0.28);
  for (let i = 0; i < 10; i++) {
    let x = 70 + i * 46 + random(-8, 8);
    let yBase = random(308, 360);
    let yTop = yBase - random(48, 110);
    brush.line(x, yBase, x, yTop);
  }

  // rigging and ropes
  brush.set("2H", "#7f868a", 0.24);
  for (let b of boats) {
    let mx = b.x + random(-6, 6);
    let topY = b.y - b.mast;
    brush.spline([
      [mx, topY + 10, 0.4],
      [mx + random(18, 42), topY + random(22, 38), 0.28],
      [mx + random(30, 55), b.y - random(8, 18), 0.18]
    ], 0.35);

    brush.spline([
      [mx, topY + random(8, 18), 0.36],
      [mx - random(16, 34), topY + random(26, 44), 0.24],
      [mx - random(24, 46), b.y - random(6, 16), 0.16]
    ], 0.35);
  }

  // harbor ropes / sparse linear hints
  brush.set("2B", "#666b6f", 0.2);
  for (let i = 0; i < 18; i++) {
    let x1 = random(30, 570);
    let y1 = random(260, 430);
    let x2 = x1 + random(-45, 45);
    let y2 = y1 + random(-18, 18);
    brush.line(x1, y1, x2, y2);
  }

  // shoreline and dock suggestions
  brush.set("HB", "#73787c", 0.32);
  brush.spline([
    [0, 330, 0.2],
    [90, 322, 0.28],
    [180, 334, 0.24],
    [260, 326, 0.22],
    [340, 335, 0.25],
    [430, 324, 0.22],
    [520, 332, 0.24],
    [600, 328, 0.2]
  ], 0.25);

  // a few pen accents, very faint
  brush.set("pen", "#5d6368", 0.18);
  for (let b of boats) {
    brush.line(b.x - b.w * 0.35, b.y, b.x + b.w * 0.4, b.y + random(-1, 2));
  }

  // foreground fog veil to soften graphite integration
  brush.noStroke();
  for (let i = 0; i < 7; i++) {
    brush.fill("#fffaf3", random(10, 18));
    brush.fillBleed(0.5, "out");
    organicBand(300, 250 + i * 42, 640, random(24, 42), 26);
  }

  noLoop();
}

function organicBlob(cx, cy, rw, rh, count, curvature) {
  brush.beginShape(curvature);
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let nr = 0.72 + noise(cx * 0.01 + cos(a) * 0.7, cy * 0.01 + sin(a) * 0.7, i * 0.08) * 0.55;
    let x = cx + cos(a) * rw * nr * 0.5;
    let y = cy + sin(a) * rh * nr * 0.5;
    brush.vertex(x, y);
  }
  brush.endShape(true);
}

function organicBand(cx, cy, w, h, count) {
  brush.beginShape(0.45);
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let nx = noise(i * 0.09, cy * 0.01);
    let ny = noise(50 + i * 0.08, cy * 0.01);
    let x = cx + cos(a) * (w * 0.5) * (0.86 + nx * 0.22);
    let y = cy + sin(a) * (h * 0.5) * (0.72 + ny * 0.4);
    brush.vertex(x, y);
  }
  brush.endShape(true);
}

function boatHullWash(cx, cy, w, h) {
  brush.beginShape(0.25);
  brush.vertex(cx - w * 0.48, cy);
  brush.vertex(cx - w * 0.32, cy + h * 0.45);
  brush.vertex(cx + w * 0.22, cy + h * 0.42);
  brush.vertex(cx + w * 0.48, cy - h * 0.04);
  brush.vertex(cx + w * 0.28, cy - h * 0.28);
  brush.vertex(cx - w * 0.18, cy - h * 0.24);
  brush.endShape(true);
}

function beginHarborMass(curv, scaleAmt, yShift) {
  let pts = [
    [0, 325], [58, 314], [122, 328], [176, 320], [234, 336], [292, 312],
    [346, 330], [402, 318], [470, 334], [530, 316], [600, 326], [600, 395], [0, 395]
  ];
  let cx = 300;
  let cy = 344 + yShift;

  brush.beginShape(curv);
  for (let p of pts) {
    let x = lerp(cx, p[0], scaleAmt);
    let y = lerp(cy, p[1] + yShift, scaleAmt);
    brush.vertex(x, y);
  }
  brush.endShape(true);
}