function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(42);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Grass stem helper ---
  function drawGrassStem(x, baseY, height, lean, weightVal, brushName, col) {
    brush.set(brushName, col, weightVal);
    let pts = [];
    let steps = 10;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let px = x + lean * t * t * 60;
      let py = baseY - height * t;
      pts.push([px, py]);
    }
    brush.spline(pts, 0.35);
  }

  // --- Seed head: feathery top ---
  function drawFeatheryHead(cx, cy, radius, angle, density) {
    brush.set("2H", "#555", 0.5);
    for (let i = 0; i < density; i++) {
      let a = angle - 40 + (80 / density) * i + random(-5, 5);
      let len = radius * random(0.5, 1.0);
      let x2 = cx + cos(a) * len;
      let y2 = cy + sin(a) * len;
      brush.line(cx, cy, x2, y2);
    }
  }

  // --- Seed head: oval cluster ---
  function drawOvalHead(cx, cy, w, h, col) {
    brush.noFill();
    brush.set("HB", col, 0.7);
    let pts = [];
    let n = 28;
    for (let i = 0; i <= n; i++) {
      let a = (i / n) * 360;
      let r = 1 + noise(cos(a) * 0.12 + cx * 0.01, sin(a) * 0.12 + cy * 0.01) * 0.25;
      pts.push([
        cx + cos(a) * w * r,
        cy + sin(a) * h * r
      ]);
    }
    brush.spline(pts, 0.4);
    // internal texture hatching
    brush.hatchStyle("2H", col, 0.4);
    brush.hatch(3, 60, { rand: 0.08, continuous: true });
    brush.beginShape(0.3);
    for (let i = 0; i < n; i++) {
      brush.vertex(pts[i][0], pts[i][1]);
    }
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Drooping seed cluster ---
  function drawDroopingCluster(cx, cy, col) {
    brush.set("HB", col, 0.65);
    let count = 14;
    for (let i = 0; i < count; i++) {
      let a = -90 + (180 / count) * i + random(-8, 8);
      let len = random(12, 28);
      let mx = cx + cos(a) * len * 0.5 + random(-3, 3);
      let my = cy + sin(a) * len * 0.5 + random(-2, 2);
      let ex = cx + cos(a + random(-20, 20)) * len;
      let ey = cy + sin(a + random(-10, 10)) * len + random(4, 10);
      brush.spline([[cx, cy], [mx, my], [ex, ey]], 0.5);
      // tiny seed dot
      brush.set("2B", col, 0.9);
      brush.line(ex, ey, ex + random(-2, 2), ey + random(2, 5));
    }
  }

  // --- Leaf blade ---
  function drawLeaf(x, y, angle, length, col) {
    brush.set("HB", col, 0.6);
    let ex = x + cos(angle) * length;
    let ey = y + sin(angle) * length;
    let mx = (x + ex) / 2 + cos(angle - 90) * length * 0.08;
    let my = (y + ey) / 2 + sin(angle - 90) * length * 0.08;
    brush.spline([[x, y], [mx, my], [ex, ey]], 0.45);
  }

  // --- Hatch zone for tonal shading ---
  function hatchZone(pts, spacing, angle, col, w, rand) {
    brush.hatchStyle("2H", col, w);
    brush.hatch(spacing, angle, { rand: rand, continuous: true });
    brush.beginShape(0.3);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  // =====================
  // COMPOSITION
  // =====================

  // Background subtle texture — very light hatch over whole canvas area
  brush.hatchStyle("2H", "#ccc", 0.3);
  brush.hatch(28, 15, { rand: 0.15 });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // ---- CLUSTER 1: Left-center tall grass with feathery heads ----
  let stems1 = [
    { x: 110, lean: 1.1, h: 310, w: 0.55, b: "HB", c: "#333" },
    { x: 130, lean: 0.7, h: 290, w: 0.45, b: "2H", c: "#555" },
    { x: 150, lean: 1.4, h: 330, w: 0.6,  b: "HB", c: "#2a2a2a" },
    { x: 95,  lean: -0.5, h: 270, w: 0.4, b: "2H", c: "#666" },
    { x: 165, lean: 0.9, h: 300, w: 0.5,  b: "HB", c: "#444" },
  ];
  for (let s of stems1) {
    drawGrassStem(s.x, 580, s.h, s.lean, s.w, s.b, s.c);
  }
  // Feathery heads for cluster 1
  drawFeatheryHead(110 + 1.1 * 60, 580 - 310, 22, -85, 18);
  drawFeatheryHead(130 + 0.7 * 60, 580 - 290, 18, -80, 15);
  drawFeatheryHead(150 + 1.4 * 60, 580 - 330, 26, -88, 20);
  drawFeatheryHead(95 - 0.5 * 60, 580 - 270, 16, -92, 14);
  drawFeatheryHead(165 + 0.9 * 60, 580 - 300, 20, -83, 17);

  // Leaves on cluster 1 stems
  drawLeaf(120, 400, -55, 70, "#444");
  drawLeaf(145, 370, -120, 55, "#555");
  drawLeaf(100, 430, -60, 60, "#555");
  drawLeaf(160, 350, -50, 80, "#333");

  // ---- CLUSTER 2: Center — drooping seed heads ----
  let stems2 = [
    { x: 270, lean: 0.3, h: 350, w: 0.6,  b: "HB", c: "#2a2a2a" },
    { x: 295, lean: -0.2, h: 320, w: 0.5, b: "2H", c: "#555" },
    { x: 315, lean: 0.6, h: 370, w: 0.65, b: "HB", c: "#333" },
    { x: 250, lean: 0.1, h: 300, w: 0.45, b: "2H", c: "#666" },
    { x: 335, lean: -0.4, h: 340, w: 0.55, b: "HB", c: "#444" },
  ];
  for (let s of stems2) {
    drawGrassStem(s.x, 590, s.h, s.lean, s.w, s.b, s.c);
  }
  drawDroopingCluster(270 + 0.3 * 60, 590 - 350, "#333");
  drawDroopingCluster(295 - 0.2 * 60, 590 - 320, "#444");
  drawDroopingCluster(315 + 0.6 * 60, 590 - 370, "#2a2a2a");
  drawDroopingCluster(250 + 0.1 * 60, 590 - 300, "#555");
  drawDroopingCluster(335 - 0.4 * 60, 590 - 340, "#333");

  // Leaves on cluster 2
  drawLeaf(275, 430, -60, 85, "#444");
  drawLeaf(300, 400, -115, 65, "#555");
  drawLeaf(320, 450, -55, 75, "#333");
  drawLeaf(255, 460, -65, 70, "#555");
  drawLeaf(340, 420, -50, 90, "#444");

  // ---- CLUSTER 3: Right — oval seed heads ----
  let stems3 = [
    { x: 460, lean: -1.0, h: 300, w: 0.55, b: "HB", c: "#333" },
    { x: 480, lean: -0.6, h: 280, w: 0.45, b: "2H", c: "#555" },
    { x: 500, lean: -1.3, h: 320, w: 0.6,  b: "HB", c: "#2a2a2a" },
    { x: 445, lean: -0.3, h: 260, w: 0.4,  b: "2H", c: "#666" },
    { x: 520, lean: -0.8, h: 290, w: 0.5,  b: "HB", c: "#444" },
  ];
  for (let s of stems3) {
    drawGrassStem(s.x, 575, s.h, s.lean, s.w, s.b, s.c);
  }
  drawOvalHead(460 - 1.0 * 60, 575 - 300, 10, 18, "#333");
  drawOvalHead(480 - 0.6 * 60, 575 - 280, 8,  15, "#444");
  drawOvalHead(500 - 1.3 * 60, 575 - 320, 12, 20, "#2a2a2a");
  drawOvalHead(445 - 0.3 * 60, 575 - 260, 7,  13, "#555");
  drawOvalHead(520 - 0.8 * 60, 575 - 290, 9,  16, "#333");

  // Leaves on cluster 3
  drawLeaf(465, 420, -125, 75, "#444");
  drawLeaf(490, 390, -55, 65, "#555");
  drawLeaf(505, 440, -120, 80, "#333");
  drawLeaf(450, 450, -60, 60, "#555");

  // ---- Scattered single stems in background ----
  let scatterStems = [
    { x: 60,  lean: 0.5,  h: 200, w: 0.35, b: "2H", c: "#888" },
    { x: 200, lean: -0.3, h: 180, w: 0.3,  b: "2H", c: "#999" },
    { x: 390, lean: 0.4,  h: 210, w: 0.35, b: "2H", c: "#888" },
    { x: 555, lean: -0.6, h: 195, w: 0.3,  b: "2H", c: "#aaa" },
    { x: 420, lean: 0.2,  h: 160, w: 0.3,  b: "2H", c: "#999" },
  ];
  for (let s of scatterStems) {
    drawGrassStem(s.x, 590, s.h, s.lean, s.w, s.b, s.c);
    let tx = s.x + s.lean * 60;
    let ty = 590 - s.h;
    drawFeatheryHead(tx, ty, 10, -88, 9);
  }

  // ---- Ground line / base hatching ----
  hatchZone(
    [[30, 575], [570, 575], [570, 600], [30, 600]],
    4, 10, "#bbb", 0.35, 0.1
  );

  // Second denser shadow hatch on ground
  hatchZone(
    [[60, 580], [540, 580], [540, 600], [60, 600]],
    2.5, 160, "#aaa", 0.3, 0.08
  );

  // ---- Detail: fine cross-hatch shadow zones on some stems ----
  // Left cluster base shadow
  hatchZone(
    [[80, 540], [190, 540], [200, 580], [70, 580]],
    5, 45, "#ccc", 0.3, 0.06
  );
  hatchZone(
    [[80, 540], [190, 540], [200, 580], [70, 580]],
    6, 120, "#ccc", 0.3, 0.06
  );

  // Center cluster base shadow
  hatchZone(
    [[230, 545], [360, 545], [370, 585], [220, 585]],
    5, 50, "#ccc", 0.3, 0.06
  );
  hatchZone(
    [[230, 545], [360, 545], [370, 585], [220, 585]],
    6, 130, "#ccc", 0.3, 0.06
  );

  // Right cluster base shadow
  hatchZone(
    [[420, 540], [545, 540], [555, 578], [410, 578]],
    5, 40, "#ccc", 0.3, 0.06
  );
  hatchZone(
    [[420, 540], [545, 540], [555, 578], [410, 578]],
    7, 115, "#ccc", 0.3, 0.06
  );

  // ---- Contour detail lines on some seed heads (2B for emphasis) ----
  brush.set("2B", "#222", 0.8);
  // Re-outline a few prominent oval heads
  brush.noFill();
  brush.beginShape(0.4);
  let hcx = 500 - 1.3 * 60, hcy = 575 - 320;
  for (let i = 0; i <= 24; i++) {
    let a = (i / 24) * 360;
    brush.vertex(hcx + cos(a) * 12, hcy + sin(a) * 20);
  }
  brush.endShape(true);

  brush.set("2B", "#333", 0.75);
  brush.beginShape(0.4);
  hcx = 460 - 1.0 * 60; hcy = 575 - 300;
  for (let i = 0; i <= 24; i++) {
    let a = (i / 24) * 360;
    brush.vertex(hcx + cos(a) * 10, hcy + sin(a) * 18);
  }
  brush.endShape(true);

  // ---- A few stray loose marks for unfinished feel ----
  brush.set("2H", "#aaa", 0.35);
  brush.line(30, 320, 55, 310);
  brush.line(570, 410, 590, 400);
  brush.line(25, 500, 40, 495);
  brush.set("HB", "#bbb", 0.4);
  brush.line(580, 260, 598, 252);

  // Very faint annotation-style marks (like a naturalist sketchbook)
  brush.set("2H", "#ccc", 0.3);
  brush.spline([[10, 150], [30, 145], [50, 148]], 0.3);
  brush.spline([[555, 180], [575, 175], [595, 178]], 0.3);

  noLoop();
}