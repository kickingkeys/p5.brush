function setup() {
  createCanvas(600, 600, WEBGL);
  background("#faf6ee");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(42);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Stem helper ---
  function drawStem(x1, y1, x2, y2, brushName, w) {
    brush.set(brushName, "#2a2a2a", w);
    brush.line(x1, y1, x2, y2);
  }

  // --- Grass blade: a gentle spline ---
  function grassBlade(bx, by, len, lean, brushName, w, col) {
    brush.set(brushName, col, w);
    let pts = [];
    let steps = 6;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = bx + lean * t * t * 60;
      let y = by - len * t;
      pts.push([x, y]);
    }
    brush.spline(pts, 0.4);
  }

  // --- Seed head: ellipse-like hatch cluster ---
  function seedHead(cx, cy, rx, ry, angle, density, col) {
    brush.noStroke();
    brush.noFill();
    brush.hatchStyle("2H", col, 0.5);
    brush.hatch(density, angle, { rand: 0.15, gradient: 0.2 });
    brush.beginShape(0.0);
    let steps = 24;
    for (let i = 0; i <= steps; i++) {
      let a = (i / steps) * 360;
      let px = cx + rx * cos(a);
      let py = cy + ry * sin(a);
      brush.vertex(px, py);
    }
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Outline seed head ---
  function outlineSeedHead(cx, cy, rx, ry, brushName, w, col) {
    brush.set(brushName, col, w);
    brush.noFill();
    brush.noHatch();
    brush.beginShape(0.15);
    let steps = 20;
    for (let i = 0; i <= steps; i++) {
      let a = (i / steps) * 360;
      let px = cx + rx * cos(a);
      let py = cy + ry * sin(a);
      brush.vertex(px, py);
    }
    brush.endShape(true);
  }

  // --- Bristle seed head: radiating lines from tip ---
  function bristleHead(cx, cy, length, spread, count, brushName, w, col) {
    brush.set(brushName, col, w);
    for (let i = 0; i < count; i++) {
      let a = -90 + (i - count / 2) * spread;
      let ex = cx + length * cos(a);
      let ey = cy + length * sin(a);
      brush.line(cx, cy, ex, ey);
    }
  }

  // --- Spikelet: small teardrop awns ---
  function spikelet(cx, cy, num, spacing, angle, brushName, w, col) {
    brush.set(brushName, col, w);
    for (let i = 0; i < num; i++) {
      let offset = (i - num / 2) * spacing;
      let ax = cx + offset * cos(angle + 90);
      let ay = cy + offset * sin(angle + 90);
      let tipX = ax + 14 * cos(angle - 90);
      let tipY = ay + 14 * sin(angle - 90);
      brush.line(ax, ay, tipX, tipY);
      // tiny awn
      brush.set(brushName, col, w * 0.6);
      brush.line(ax, ay, ax + 8 * cos(angle - 60), ay + 8 * sin(angle - 60));
    }
  }

  // --- Leaf: thin curved spline ---
  function leaf(bx, by, len, lean, brushName, w, col) {
    brush.set(brushName, col, w);
    let pts = [];
    let steps = 5;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = bx + lean * sin(t * 180) * 18;
      let y = by - len * t;
      pts.push([x, y]);
    }
    brush.spline(pts, 0.5);
  }

  // =============================================
  // COMPOSITION
  // =============================================

  let darkGray = "#1a1a1a";
  let midGray = "#3a3a3a";
  let lightGray = "#6a6a6a";
  let veryLight = "#999999";

  // ---- PLANT 1: Tall wheat-like grass, left-center ----
  let p1x = 155, p1y = 560;
  // Main stem
  brush.set("HB", darkGray, 0.7);
  brush.spline([[p1x, p1y], [p1x - 5, p1y - 120], [p1x + 8, p1y - 240], [p1x - 3, p1y - 360], [p1x + 2, p1y - 430]], 0.35);

  // Spikelets along stem
  for (let i = 0; i < 7; i++) {
    let t = i / 6;
    let sx = p1x + (-3 + 5 * t);
    let sy = (p1y - 200) - t * 220;
    let side = (i % 2 === 0) ? 1 : -1;
    brush.set("2H", midGray, 0.5);
    brush.line(sx, sy, sx + side * 18, sy - 10);
    brush.set("2H", lightGray, 0.4);
    brush.line(sx + side * 18, sy - 10, sx + side * 22, sy - 22);
  }

  // Top head: dense spikelet cluster
  let th1x = p1x + 2, th1y = p1y - 430;
  spikelet(th1x, th1y + 30, 5, 7, -80, "2H", 0.45, midGray);
  spikelet(th1x, th1y + 10, 5, 6, -85, "2H", 0.45, midGray);
  spikelet(th1x, th1y - 10, 4, 6, -88, "2H", 0.4, lightGray);

  // Leaves
  leaf(p1x, p1y - 100, 80, 1, "HB", 0.55, midGray);
  leaf(p1x, p1y - 180, 60, -1, "HB", 0.5, midGray);

  // ---- PLANT 2: Round seed head on wiry stem, right of center ----
  let p2x = 310, p2y = 570;
  brush.set("HB", darkGray, 0.6);
  brush.spline([[p2x, p2y], [p2x + 10, p2y - 100], [p2x + 20, p2y - 220], [p2x + 5, p2y - 350]], 0.3);

  // Round seed head with hatching
  let sh2x = p2x + 5, sh2y = p2y - 350;
  seedHead(sh2x, sh2y, 28, 32, 40, 5, lightGray);
  outlineSeedHead(sh2x, sh2y, 28, 32, "HB", 0.6, midGray);

  // Tiny seeds radiating
  bristleHead(sh2x, sh2y - 28, 18, 12, 9, "2H", 0.35, lightGray);

  // Side branch
  brush.set("2H", midGray, 0.5);
  brush.spline([[p2x + 12, p2y - 200], [p2x + 45, p2y - 250], [p2x + 60, p2y - 290]], 0.4);
  seedHead(p2x + 60, p2y - 295, 14, 16, 55, 6, veryLight);
  outlineSeedHead(p2x + 60, p2y - 295, 14, 16, "2H", 0.5, lightGray);

  // Leaves
  leaf(p2x + 5, p2y - 80, 70, -1.2, "HB", 0.55, midGray);
  leaf(p2x + 12, p2y - 170, 55, 1, "2H", 0.45, lightGray);

  // ---- PLANT 3: Bristle grass, far right ----
  let p3x = 470, p3y = 555;
  brush.set("HB", darkGray, 0.65);
  brush.spline([[p3x, p3y], [p3x - 8, p3y - 130], [p3x + 5, p3y - 270], [p3x - 2, p3y - 390]], 0.3);

  // Bristle head
  let bh3x = p3x - 2, bh3y = p3y - 390;
  bristleHead(bh3x, bh3y, 26, 8, 13, "2H", 0.38, lightGray);
  bristleHead(bh3x, bh3y, 16, 5, 9, "HB", 0.5, midGray);

  // Small sub-spikelets
  for (let i = 0; i < 5; i++) {
    let sy2 = bh3y + i * 18;
    let side2 = (i % 2 === 0) ? 1 : -1;
    brush.set("2H", lightGray, 0.4);
    brush.line(bh3x, sy2, bh3x + side2 * 14, sy2 + 6);
  }

  leaf(p3x, p3y - 100, 65, 1.1, "HB", 0.5, midGray);
  leaf(p3x - 5, p3y - 200, 50, -0.9, "2H", 0.45, lightGray);

  // ---- PLANT 4: Fine grass blades, far left ----
  for (let b = 0; b < 5; b++) {
    let bx4 = 55 + b * 12;
    let by4 = 565 + random(-8, 8);
    let blen = 160 + random(-30, 50);
    let lean = random(-1, 1);
    let bw = random(0.4, 0.65);
    grassBlade(bx4, by4, blen, lean, "2H", bw, lightGray);
  }
  // A couple darker blades
  grassBlade(62, 560, 200, 0.6, "HB", 0.55, midGray);
  grassBlade(80, 558, 175, -0.4, "HB", 0.5, midGray);

  // ---- PLANT 5: Drooping seed cluster, center ----
  let p5x = 230, p5y = 565;
  brush.set("HB", darkGray, 0.6);
  brush.spline([[p5x, p5y], [p5x + 5, p5y - 110], [p5x - 5, p5y - 230], [p5x + 10, p5y - 330]], 0.35);

  // Drooping branches
  let dbranches = [
    { ox: p5x + 2, oy: p5y - 280, ex: p5x + 38, ey: p5y - 255 },
    { ox: p5x + 5, oy: p5y - 300, ex: p5x - 30, ey: p5y - 278 },
    { ox: p5x + 8, oy: p5y - 320, ex: p5x + 28, ey: p5y - 300 },
    { ox: p5x + 10, oy: p5y - 330, ex: p5x - 22, ey: p5y - 312 },
  ];
  for (let db of dbranches) {
    brush.set("2H", midGray, 0.45);
    brush.spline([[db.ox, db.oy], [(db.ox + db.ex) / 2, (db.oy + db.ey) / 2 + 8], [db.ex, db.ey]], 0.5);
    // tiny seed at tip
    brush.set("2H", lightGray, 0.4);
    brush.circle(db.ex, db.ey, 3, 0.3);
  }

  leaf(p5x, p5y - 90, 60, -1.3, "HB", 0.5, midGray);
  leaf(p5x + 3, p5y - 170, 50, 1.1, "2H", 0.45, lightGray);

  // ---- PLANT 6: Tall thin stem far right edge, partial ----
  let p6x = 565, p6y = 570;
  brush.set("2H", lightGray, 0.5);
  brush.spline([[p6x, p6y], [p6x - 4, p6y - 150], [p6x + 3, p6y - 300], [p6x - 2, p6y - 420]], 0.3);
  bristleHead(p6x - 2, p6y - 420, 20, 10, 11, "2H", 0.35, veryLight);

  // ---- PLANT 7: Short grass cluster, bottom center ----
  for (let b = 0; b < 7; b++) {
    let bx7 = 260 + b * 14 + random(-5, 5);
    let by7 = 580 + random(-5, 5);
    let blen = 80 + random(-20, 30);
    let lean = random(-0.8, 0.8);
    grassBlade(bx7, by7, blen, lean, "2H", 0.4, lightGray);
  }

  // ---- TONAL SHADING: subtle hatch on plant 1 seed area ----
  brush.set("2H", veryLight, 0.35);
  brush.hatchStyle("2H", veryLight, 0.35);
  brush.hatch(4, 50, { rand: 0.1, gradient: 0.4 });
  brush.beginShape(0.2);
  for (let i = 0; i <= 16; i++) {
    let a = (i / 16) * 360;
    brush.vertex(th1x + 22 * cos(a), th1y + 26 * sin(a));
  }
  brush.endShape(true);
  brush.noHatch();

  // ---- Ground line: faint scratchy baseline ----
  brush.set("2H", lightGray, 0.4);
  brush.spline([[30, 575], [120, 572], [230, 577], [350, 573], [460, 576], [570, 572]], 0.2);

  // ---- A few loose fallen seeds on ground ----
  for (let s = 0; s < 8; s++) {
    let sx3 = 60 + s * 65 + random(-15, 15);
    let sy3 = 578 + random(-4, 4);
    brush.set("2H", veryLight, 0.4);
    brush.circle(sx3, sy3, 2 + random(1, 2), 0.5);
  }

  noLoop();
}