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

  // --- soft rainy sky / atmosphere ---
  brush.noStroke();
  brush.fillTexture(0.9, 0.45);
  brush.wash("#d9d3c8", 70);
  brush.fill("#d6d0c6", 85);
  brush.fillBleed(0.55, "out");
  brush.beginShape(0.45);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 250);
  brush.vertex(0, 220);
  brush.endShape(true);
  brush.noWash();

  // distant blue-gray moisture haze
  let haze1 = organicBand(300, 180, 360, 90, 28, 0.9);
  brush.fill("#7a8ca3", 32);
  brush.fillBleed(0.5, "out");
  drawPoly(haze1, 0.55);

  let haze2 = organicBand(250, 220, 280, 70, 26, 1.8);
  brush.fill("#8f7ea6", 26);
  brush.fillBleed(0.45, "out");
  drawPoly(haze2, 0.55);
  brush.noFill();

  // --- vertical rain suggestion in atmosphere ---
  brush.set("2H", "#8fa0b6", 0.35);
  for (let i = 0; i < 140; i++) {
    let x = random(10, 590);
    let y = random(20, 360);
    let len = random(8, 26);
    brush.line(x + random(-1, 1), y, x + random(-3, 3), y + len);
  }

  brush.set("HB", "#b1bcc8", 0.28);
  for (let i = 0; i < 80; i++) {
    let x = random(0, 600);
    let y = random(80, 460);
    let len = random(10, 18);
    brush.line(x, y, x + random(-2, 2), y + len);
  }

  // --- soft building masses through watercolor bleeds ---
  paintBuilding(35, 115, 95, 215, "#5b6271", 72, 0.35, 0.65);
  paintBuilding(120, 90, 82, 250, "#6f6578", 62, 0.38, 1.2);
  paintBuilding(210, 130, 75, 195, "#495766", 68, 0.32, 2.0);
  paintBuilding(305, 85, 110, 235, "#564f63", 65, 0.36, 2.8);
  paintBuilding(420, 110, 72, 205, "#445260", 60, 0.3, 3.6);
  paintBuilding(500, 95, 70, 228, "#5c5367", 64, 0.34, 4.2);

  // distant structure lines
  brush.set("2H", "#77706c", 0.35);
  for (let x = 40; x < 580; x += 40) {
    brush.line(x, random(95, 145), x + random(-5, 5), random(260, 330));
  }

  // --- road / wet pavement base wash ---
  let road = [
    [70, 330],
    [530, 330],
    [598, 600],
    [0, 600]
  ];
  brush.noStroke();
  brush.fillTexture(0.95, 0.55);
  brush.wash("#5d5e69", 100);
  brush.fill("#646572", 128);
  brush.fillBleed(0.42, "out");
  brush.polygon(road);
  brush.noWash();

  // deeper center road lane bleed
  let roadInner = [
    [210, 334],
    [392, 334],
    [470, 600],
    [132, 600]
  ];
  brush.fill("#4d4f58", 82);
  brush.fillBleed(0.34, "in");
  brush.polygon(roadInner);
  brush.noFill();

  // --- perspective street guides / curb lines ---
  brush.set("HB", "#5f5c58", 0.5);
  brush.line(88, 330, 15, 600);
  brush.line(512, 330, 585, 600);
  brush.set("2H", "#8b847d", 0.35);
  brush.line(295, 330, 250, 600);
  brush.line(305, 330, 350, 600);

  // --- neon shop/window glows above the street ---
  neonGlow(150, 265, 62, 22, "#e73a7a", "#ff6f9f");
  neonGlow(250, 248, 48, 18, "#20b7d8", "#7cecff");
  neonGlow(358, 275, 72, 20, "#f08a19", "#ffc35e");
  neonGlow(470, 255, 58, 18, "#7d4df2", "#d29cff");

  // small vertical sign
  brush.noStroke();
  brush.fillTexture(0.75, 0.45);
  brush.wash("#6f2bd9", 110);
  brush.fill("#b268ff", 120);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.25);
  brush.vertex(505, 182);
  brush.vertex(528, 178);
  brush.vertex(531, 270);
  brush.vertex(505, 274);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // marker outline accents on signs
  brush.set("marker", "#3c2030", 0.9);
  brush.rect(150, 265, 62, 22, "center");
  brush.rect(250, 248, 48, 18, "center");
  brush.rect(358, 275, 72, 20, "center");
  brush.rect(470, 255, 58, 18, "center");

  // --- wet pavement reflections with marker smears ---
  smearReflection(150, 332, 44, 190, "#ff4c8d", "#ffd1de");
  smearReflection(250, 334, 34, 155, "#36c6ec", "#b2f3ff");
  smearReflection(358, 336, 54, 185, "#ffa134", "#ffe0a8");
  smearReflection(470, 336, 42, 170, "#945eff", "#ddc7ff");
  smearReflection(518, 338, 20, 145, "#a85fff", "#ead9ff");

  // broad wet sheen across road
  brush.noStroke();
  brush.fillTexture(0.8, 0.35);
  brush.fill("#d4d0c9", 24);
  brush.fillBleed(0.22, "out");
  let sheen = [
    [120, 390],
    [240, 375],
    [350, 395],
    [505, 378],
    [560, 472],
    [470, 530],
    [320, 508],
    [160, 536],
    [80, 480]
  ];
  brush.polygon(sheen);
  brush.noFill();

  // --- sparse passersby as ink silhouettes ---
  passerby(215, 420, 0.95);
  passerby(300, 448, 1.2);
  passerby(388, 410, 0.88);
  passerby(138, 460, 0.72);
  passerby(478, 452, 0.78);

  // umbrella hints
  brush.set("pen", "#2f3035", 0.55);
  brush.arc(215, 395, 22, 180, 360);
  brush.arc(300, 417, 28, 180, 360);
  brush.arc(388, 389, 20, 180, 360);

  // reflected silhouettes / puddle drag
  reflectionShadow(215, 438, 16, 70);
  reflectionShadow(300, 470, 20, 82);
  reflectionShadow(388, 426, 15, 68);
  reflectionShadow(138, 477, 12, 58);
  reflectionShadow(478, 468, 12, 62);

  // --- street texture / puddles / final ink touches ---
  brush.set("rotring", "#4f535c", 0.25);
  for (let i = 0; i < 50; i++) {
    let y = random(395, 590);
    let x = random(25, 575);
    brush.line(x, y, x + random(10, 40), y + random(-2, 2));
  }

  brush.set("2B", "#3f4147", 0.35);
  for (let i = 0; i < 26; i++) {
    let cx = random(40, 560);
    let cy = random(420, 585);
    brush.arc(cx, cy, random(8, 22), random(185, 210), random(305, 355));
  }

  // subtle charcoal depth under foreground
  brush.mass("crayon", "#4c4d55", {
    strength: 0.38,
    precision: 0.5,
    gradient: 0.25,
    outline: false
  });
  brush.beginShape(0.35);
  brush.vertex(0, 515);
  brush.vertex(600, 500);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noMass();

  noLoop();
}

function drawPoly(points, curvature) {
  brush.beginShape(curvature);
  for (let p of points) brush.vertex(p[0], p[1]);
  brush.endShape(true);
}

function organicBand(cx, cy, rx, ry, count, seedShift) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let n = noise(seedShift + cos(a) * 0.8, seedShift + sin(a) * 0.8);
    let r1 = rx * (0.82 + 0.38 * n);
    let r2 = ry * (0.82 + 0.35 * n);
    pts.push([cx + cos(a) * r1, cy + sin(a) * r2]);
  }
  return pts;
}

function paintBuilding(x, y, w, h, col, op, bleed, seedShift) {
  let pts = [
    [x + random(-4, 4), y + random(-6, 6)],
    [x + w + random(-4, 4), y + random(-6, 6)],
    [x + w + random(-8, 8), y + h + random(-8, 8)],
    [x + random(-8, 8), y + h + random(-8, 8)]
  ];

  brush.noStroke();
  brush.fillTexture(0.72, 0.42);
  brush.fill(col, op);
  brush.fillBleed(bleed, "out");
  brush.beginShape(0.18);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  brush.fill(lerpColorHex(col, "#1f2230", 0.35), op * 0.4);
  brush.fillBleed(0.22, "in");
  brush.beginShape(0.18);
  for (let p of pts) {
    let cx = x + w / 2;
    let cy = y + h / 2;
    brush.vertex(lerp(cx, p[0], 0.82), lerp(cy, p[1], 0.86));
  }
  brush.endShape(true);
  brush.noFill();

  // sparse window flecks
  brush.set("2H", "#d7cfbf", 0.2);
  for (let wy = y + 20; wy < y + h - 10; wy += random(16, 28)) {
    for (let wx = x + 10; wx < x + w - 8; wx += random(11, 18)) {
      if (random() < 0.28) {
        brush.line(wx, wy, wx + random(3, 7), wy + random(-1, 1));
      }
    }
  }
}

function neonGlow(x, y, w, h, washCol, fillCol) {
  brush.noStroke();
  brush.fillTexture(0.88, 0.55);
  brush.wash(washCol, 115);
  brush.fill(fillCol, 110);
  brush.fillBleed(0.45, "out");
  brush.rect(x, y, w, h, "center");
  brush.noWash();

  brush.fill(fillCol, 52);
  brush.fillBleed(0.62, "out");
  brush.rect(x, y, w * 1.35, h * 1.7, "center");
  brush.noFill();

  brush.set("marker", washCol, 0.5);
  for (let i = 0; i < 10; i++) {
    let yy = y + random(-h / 3, h / 3);
    brush.line(x - w * 0.4, yy, x + w * 0.4, yy + random(-1.5, 1.5));
  }
}

function smearReflection(x, yTop, w, h, colA, colB) {
  brush.noStroke();
  brush.fillTexture(0.8, 0.35);
  brush.fill(colA, 62);
  brush.fillBleed(0.32, "out");

  let pts = [
    [x - w * 0.48, yTop],
    [x + w * 0.48, yTop],
    [x + w * 0.22, yTop + h * 0.35],
    [x + w * 0.35, yTop + h * 0.68],
    [x + random(-8, 8), yTop + h],
    [x - w * 0.22, yTop + h * 0.7],
    [x - w * 0.32, yTop + h * 0.38]
  ];
  brush.beginShape(0.42);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  brush.fill(colB, 36);
  brush.fillBleed(0.22, "in");
  brush.beginShape(0.4);
  for (let p of pts) brush.vertex(lerp(x, p[0], 0.62), lerp(yTop, p[1], 0.86));
  brush.endShape(true);
  brush.noFill();

  brush.set("marker", colA, 0.65);
  for (let i = 0; i < 12; i++) {
    let yy = yTop + random(6, h - 6);
    let sw = map(yy, yTop, yTop + h, w * 0.65, w * 0.22);
    brush.line(x - sw / 2 + random(-3, 3), yy, x + sw / 2 + random(-3, 3), yy + random(-2, 2));
  }

  brush.set("cpencil", colB, 0.32);
  for (let i = 0; i < 14; i++) {
    let yy = yTop + random(5, h);
    brush.line(x + random(-w * 0.25, w * 0.25), yy, x + random(-w * 0.12, w * 0.12), yy + random(5, 15));
  }
}

function passerby(x, groundY, s) {
  let coat = [
    [x - 8 * s, groundY - 42 * s],
    [x + 8 * s, groundY - 42 * s],
    [x + 14 * s, groundY - 4 * s],
    [x - 12 * s, groundY - 1 * s]
  ];

  brush.noStroke();
  brush.fillTexture(0.35, 0.28);
  brush.fill("#35363c", 110);
  brush.fillBleed(0.08, "out");
  brush.beginShape(0.22);
  for (let p of coat) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  brush.fill("#4a4d57", 52);
  brush.fillBleed(0.12, "in");
  brush.beginShape(0.2);
  for (let p of coat) brush.vertex(lerp(x, p[0], 0.7), lerp(groundY - 20 * s, p[1], 0.8));
  brush.endShape(true);
  brush.noFill();

  brush.set("pen", "#25262a", 0.48);
  brush.line(x, groundY - 54 * s, x, groundY - 42 * s);
  brush.arc(x, groundY - 61 * s, 7 * s, 0, 360);
  brush.line(x - 4 * s, groundY - 3 * s, x - 7 * s, groundY + 14 * s);
  brush.line(x + 3 * s, groundY - 4 * s, x + 8 * s, groundY + 14 * s);

  brush.set("charcoal", "#2f3034", 0.3);
  brush.line(x - 3 * s, groundY - 28 * s, x - 14 * s, groundY - 10 * s);
}

function reflectionShadow(x, y, w, h) {
  brush.noStroke();
  brush.fill("#40424a", 34);
  brush.fillBleed(0.22, "out");
  let pts = [
    [x - w * 0.7, y],
    [x + w * 0.7, y],
    [x + w * 0.4, y + h * 0.4],
    [x + random(-4, 4), y + h],
    [x - w * 0.35, y + h * 0.45]
  ];
  brush.beginShape(0.45);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.set("marker", "#5d5f6b", 0.32);
  for (let i = 0; i < 5; i++) {
    let yy = y + random(0, h);
    brush.line(x - w * 0.25, yy, x + w * 0.18, yy + random(-1, 1));
  }
}

function lerpColorHex(c1, c2, t) {
  let a = color(c1);
  let b = color(c2);
  return color(
    lerp(red(a), red(b), t),
    lerp(green(a), green(b), t),
    lerp(blue(a), blue(b), t)
  );
}