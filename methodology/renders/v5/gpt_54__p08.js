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

  // Sky wash
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.fillTexture(0.7, 0.35);
  brush.fillBleed(0.45, "out");

  let skyLayers = [
    { y: 0, h: 250, c: "#d8e0dc", a: 55 },
    { y: 20, h: 240, c: "#c8d5d4", a: 48 },
    { y: 45, h: 220, c: "#bfcfce", a: 40 },
    { y: 70, h: 190, c: "#e6d7bc", a: 26 }
  ];

  for (let layer of skyLayers) {
    brush.fill(layer.c, layer.a);
    brush.beginShape(0.5);
    for (let x = -20; x <= 620; x += 24) {
      let yy = layer.y + noise(x * 0.006, layer.y * 0.01) * 16;
      brush.vertex(x, yy);
    }
    for (let x = 620; x >= -20; x -= 24) {
      let yy = layer.y + layer.h + noise(x * 0.007, layer.h * 0.01) * 22;
      brush.vertex(x, yy);
    }
    brush.endShape(true);
  }

  // Distant fog banks
  for (let i = 0; i < 9; i++) {
    let cx = map(i, 0, 8, 20, 580) + random(-16, 16);
    let cy = random(110, 220);
    let rw = random(90, 170);
    let rh = random(40, 85);
    brush.fill(random(["#d7deda", "#d1d9d7", "#e5ddd0", "#cdd7d5"]), random(24, 42));
    brush.fillBleed(random(0.35, 0.55), "out");
    brush.beginShape(0.55);
    for (let a = 0; a < 360; a += 18) {
      let nx = cos(a) * rw * (0.5 + noise(i * 0.2, a * 0.03) * 0.7);
      let ny = sin(a) * rh * (0.5 + noise(40 + i * 0.2, a * 0.03) * 0.8);
      brush.vertex(cx + nx, cy + ny);
    }
    brush.endShape(true);
  }

  // Water base
  let waterLayers = [
    { y: 255, h: 360, c: "#b6c3c4", a: 60 },
    { y: 280, h: 330, c: "#a9b9bc", a: 50 },
    { y: 305, h: 300, c: "#c1cbc8", a: 35 }
  ];

  for (let layer of waterLayers) {
    brush.fill(layer.c, layer.a);
    brush.fillBleed(0.28, "out");
    brush.beginShape(0.45);
    for (let x = -20; x <= 620; x += 20) {
      let yy = layer.y + noise(100 + x * 0.008, layer.y * 0.01) * 14;
      brush.vertex(x, yy);
    }
    for (let x = 620; x >= -20; x -= 20) {
      let yy = layer.y + layer.h + noise(200 + x * 0.009, layer.h * 0.008) * 20;
      brush.vertex(x, yy);
    }
    brush.endShape(true);
  }

  // Soft harbor silhouettes in wash
  let shore = [
    [0, 295], [40, 286], [90, 292], [135, 280], [180, 288], [220, 276],
    [260, 284], [305, 272], [350, 281], [392, 270], [435, 278], [480, 269],
    [525, 276], [565, 271], [600, 278], [600, 335], [0, 335]
  ];
  brush.fill("#8e9b9d", 34);
  brush.fillBleed(0.2, "out");
  brush.polygon(shore);

  // Faint boat hulls
  function boatWash(cx, cy, w, h, col, alpha) {
    brush.fill(col, alpha);
    brush.fillBleed(0.22, "out");
    brush.beginShape(0.35);
    brush.vertex(cx - w * 0.52, cy - h * 0.1);
    brush.vertex(cx - w * 0.25, cy + h * 0.2);
    brush.vertex(cx + w * 0.28, cy + h * 0.2);
    brush.vertex(cx + w * 0.5, cy - h * 0.08);
    brush.vertex(cx + w * 0.18, cy - h * 0.28);
    brush.vertex(cx - w * 0.18, cy - h * 0.28);
    brush.endShape(true);
  }

  boatWash(155, 330, 88, 28, "#7f8d91", 24);
  boatWash(260, 346, 118, 34, "#849296", 28);
  boatWash(378, 324, 76, 24, "#768487", 20);
  boatWash(470, 352, 132, 36, "#899698", 26);

  // Reflections and mist on water
  for (let i = 0; i < 45; i++) {
    let x = random(40, 560);
    let y = random(330, 575);
    let len = random(30, 120);
    brush.set("spray", random(["#d9d8d0", "#b8c4c4", "#cad1cd", "#9eacad"]), random(0.45, 1.1));
    brush.line(x, y, x + random(-10, 10), y + len);
  }

  for (let i = 0; i < 24; i++) {
    let cx = random(60, 540);
    let cy = random(300, 430);
    let r = random(28, 65);
    brush.fill(random(["#edf0ea", "#dfe5df", "#d8dfdb"]), random(14, 26));
    brush.fillBleed(0.5, "out");
    brush.circle(cx, cy, r, 0.25);
  }

  // Graphite lines
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  // Horizon and dock hints
  brush.set("2H", "#7d7b76", 0.5);
  for (let i = 0; i < 8; i++) {
    let y = 287 + i * 5 + random(-1, 1);
    brush.line(20 + random(-8, 8), y, 580 + random(-8, 8), y + random(-2, 2));
  }

  // Boat structures
  function drawBoatLines(cx, cy, w, h, mastH, lean) {
    // hull
    brush.set("HB", "#686762", 0.62);
    brush.spline([
      [cx - w * 0.48, cy - h * 0.08, 0.55],
      [cx - w * 0.22, cy + h * 0.18, 0.6],
      [cx + w * 0.26, cy + h * 0.18, 0.58],
      [cx + w * 0.48, cy - h * 0.06, 0.5]
    ], 0.28);

    brush.set("2H", "#817f79", 0.42);
    brush.line(cx - w * 0.18, cy - h * 0.23, cx + w * 0.16, cy - h * 0.23);

    // mast
    brush.set("HB", "#66645f", 0.45);
    brush.line(cx, cy - h * 0.22, cx + lean, cy - mastH);

    // rope lines
    brush.set("2H", "#7f7b75", 0.32);
    brush.line(cx + lean, cy - mastH, cx - w * 0.24, cy - h * 0.12);
    brush.line(cx + lean, cy - mastH * 0.92, cx + w * 0.22, cy - h * 0.1);

    // reflection
    brush.set("2H", "#8e8a84", 0.22);
    brush.line(cx + random(-2, 2), cy + h * 0.05, cx + random(-6, 6), cy + mastH * 0.35);
  }

  drawBoatLines(155, 330, 88, 28, 128, -2);
  drawBoatLines(260, 346, 118, 34, 168, 4);
  drawBoatLines(378, 324, 76, 24, 116, -3);
  drawBoatLines(470, 352, 132, 36, 178, 2);

  // Distant masts
  for (let i = 0; i < 14; i++) {
    let x = map(i, 0, 13, 30, 575) + random(-10, 10);
    let yBase = random(278, 305);
    let h = random(55, 140);
    brush.set("2H", "#8a8781", random(0.18, 0.34));
    brush.line(x, yBase, x + random(-3, 3), yBase - h);

    if (random() < 0.7) {
      brush.line(x + random(-2, 2), yBase - h * 0.85, x + random(-25, 25), yBase - h * 0.45);
    }
    if (random() < 0.55) {
      brush.line(x + random(-1, 1), yBase - h * 0.7, x + random(-22, 22), yBase - h * 0.18);
    }
  }

  // Rope web across middle boats
  brush.set("2H", "#86827c", 0.24);
  let ropeSets = [
    [[255, 178], [230, 265]],
    [[264, 182], [292, 312]],
    [[472, 174], [435, 323]],
    [[473, 174], [516, 330]],
    [[154, 203], [126, 318]],
    [[154, 203], [184, 320]]
  ];
  for (let r of ropeSets) {
    brush.spline([
      [r[0][0], r[0][1], 0.3],
      [(r[0][0] + r[1][0]) * 0.5 + random(-8, 8), (r[0][1] + r[1][1]) * 0.5 + random(-10, 10), 0.25],
      [r[1][0], r[1][1], 0.22]
    ], 0.4);
  }

  // Subtle graphite hatching to suggest dock and hull shadows
  brush.hatchStyle("2H", "#8a867f", 0.22);
  brush.hatch(11, 8, { rand: 0.08, continuous: true, gradient: 0.2 });
  brush.beginShape(0.3);
  brush.vertex(80, 352);
  brush.vertex(208, 345);
  brush.vertex(212, 380);
  brush.vertex(84, 387);
  brush.endShape(true);

  brush.beginShape(0.3);
  brush.vertex(390, 372);
  brush.vertex(555, 365);
  brush.vertex(560, 405);
  brush.vertex(398, 412);
  brush.endShape(true);
  brush.noHatch();

  // Near-water horizontal pencil texture
  for (let i = 0; i < 55; i++) {
    let y = random(340, 585);
    let x1 = random(20, 520);
    let x2 = x1 + random(30, 110);
    brush.set(random() < 0.75 ? "2H" : "HB", random() < 0.8 ? "#8e8a83" : "#77746e", random(0.12, 0.28));
    brush.line(x1, y, x2, y + random(-3, 3));
  }

  // Very soft foreground smudge with charcoal accents
  brush.set("charcoal", "#9a9790", 0.25);
  for (let i = 0; i < 12; i++) {
    let x = random(40, 560);
    let y = random(500, 590);
    brush.line(x, y, x + random(-18, 18), y + random(-8, 8));
  }

  noLoop();
}