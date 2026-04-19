function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(12);
  noiseSeed(12);

  // Soft rainy sky glow
  brush.noStroke();
  brush.fillTexture(0.75, 0.42);
  brush.fillBleed(0.45, "out");

  for (let i = 0; i < 12; i++) {
    let x = random(70, 530);
    let y = random(40, 240);
    let r = random(70, 140);
    let cols = ["#34456b", "#4a355f", "#2f5263", "#5a3d69"];
    brush.fill(random(cols), random(20, 45));
    brush.circle(x, y, r, 0.35);
  }
  brush.noFill();

  // Distant architecture watercolor masses
  let b1 = [
    [20, 170], [60, 120], [110, 135], [150, 95], [210, 125],
    [245, 108], [285, 155], [285, 330], [20, 330]
  ];
  let b2 = [
    [210, 155], [250, 122], [300, 145], [335, 100], [380, 118],
    [430, 88], [495, 140], [495, 340], [210, 340]
  ];
  let b3 = [
    [365, 160], [420, 112], [470, 138], [515, 100], [575, 145],
    [585, 355], [365, 355]
  ];

  watercolorBuilding(b1, "#2b4156", "#3f5f7a", 0.82);
  watercolorBuilding(b2, "#3c3053", "#6a3e72", 0.82);
  watercolorBuilding(b3, "#23343b", "#29535b", 0.82);

  // Vertical rain haze over skyline
  brush.field("curved");
  for (let i = 0; i < 120; i++) {
    let x = random(0, 600);
    let y = random(20, 360);
    brush.set("spray", random(["#8ba0c7", "#b28ac7", "#8cb8c1"]), random(0.35, 0.8));
    brush.flowLine(x, y, random(10, 26), 90);
  }
  brush.noField();

  // Pavement base wash
  brush.noStroke();
  brush.wash("#8a8177", 135);
  brush.beginShape(0.28);
  brush.vertex(0, 350);
  brush.vertex(600, 350);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Wet pavement watercolor pools
  brush.fillTexture(0.8, 0.45);
  brush.fillBleed(0.38, "out");
  for (let i = 0; i < 10; i++) {
    let cx = random(70, 530);
    let cy = random(390, 575);
    let rx = random(60, 150);
    let ry = random(18, 55);
    brush.fill(random(["#4b5e76", "#5b4d69", "#6a5f57", "#3f6670"]), random(28, 55));
    puddle(cx, cy, rx, ry);
  }
  brush.noFill();

  // Neon signs as watercolor glow underneath
  glowRect(82, 180, 72, 42, "#ff4f7f", 45);
  glowRect(410, 165, 88, 48, "#3de1d0", 42);
  glowRect(305, 212, 60, 34, "#ffd04d", 38);
  glowRect(160, 235, 48, 30, "#8b6cff", 35);

  // Marker smears for neon signage
  neonSmear(86, 184, 64, 34, "#ff2f67");
  neonSmear(415, 170, 80, 38, "#1ccfc7");
  neonSmear(309, 216, 52, 26, "#ffbe1f");
  neonSmear(164, 239, 40, 22, "#7f5cff");

  // Reflections on pavement with marker strokes
  verticalReflection(118, 350, 520, "#ff2f67", 90, 1.2);
  verticalReflection(455, 350, 535, "#1ccfc7", 105, 1.35);
  verticalReflection(335, 350, 500, "#ffbe1f", 80, 1.0);
  verticalReflection(184, 350, 490, "#7f5cff", 70, 0.95);

  // Additional diffuse reflected color
  brush.noStroke();
  brush.fillTexture(0.55, 0.28);
  brush.fillBleed(0.5, "out");
  brush.fill("#ff4f7f", 28);
  puddle(118, 470, 55, 95);
  brush.fill("#3de1d0", 30);
  puddle(455, 465, 60, 110);
  brush.fill("#ffd04d", 24);
  puddle(335, 455, 48, 78);
  brush.fill("#8b6cff", 22);
  puddle(184, 452, 40, 70);
  brush.noFill();

  // Street rain lines
  brush.set("2H", "#6a7481", 0.48);
  for (let i = 0; i < 180; i++) {
    let x = random(0, 600);
    let y = random(70, 590);
    let len = random(8, 24);
    brush.line(x, y, x - random(2, 7), y + len);
  }

  // Sparse ink silhouettes of passersby
  passerby(120, 430, 0.9, "#1d2026");
  passerby(205, 455, 0.7, "#242029");
  passerby(300, 438, 1.0, "#17191d");
  passerby(390, 465, 0.78, "#22262b");
  passerby(500, 440, 0.88, "#1d2128");

  // A few umbrella arcs / accents
  brush.set("pen", "#191b20", 0.65);
  brush.arc(120, 410, 18, 200, 340);
  brush.arc(300, 415, 20, 200, 340);
  brush.arc(500, 418, 18, 200, 340);

  // Thin architectural ink suggestions
  brush.set("rotring", "#2a2d33", 0.28);
  for (let x = 30; x < 580; x += 35) {
    let top = random(90, 170);
    brush.line(x, top, x + random(-3, 3), 350 + random(-8, 8));
  }

  // Dark curb / foreground grounding
  brush.mass("crayon", "#23252a", {
    strength: 0.62,
    precision: 0.45,
    gradient: 0.3,
    outline: false
  });
  brush.beginShape(0.15);
  brush.vertex(0, 560);
  brush.vertex(600, 540);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noMass();

  noLoop();
}

function watercolorBuilding(pts, c1, c2, scaleInner) {
  let cx = 0;
  let cy = 0;
  for (let p of pts) {
    cx += p[0];
    cy += p[1];
  }
  cx /= pts.length;
  cy /= pts.length;

  brush.noStroke();
  brush.fillTexture(0.88, 0.5);
  brush.wash(c1, 95);
  brush.fill(c1, 88);
  brush.fillBleed(0.32, "out");
  brush.beginShape(0.42);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noWash();

  brush.fill(c2, 42);
  brush.fillBleed(0.42, "in");
  brush.beginShape(0.42);
  for (let p of pts) {
    brush.vertex(lerp(cx, p[0], scaleInner), lerp(cy, p[1], scaleInner));
  }
  brush.endShape(true);
  brush.noFill();
}

function puddle(cx, cy, rx, ry) {
  brush.beginShape(0.55);
  for (let i = 0; i < 24; i++) {
    let a = map(i, 0, 24, 0, 360);
    let n = noise(cx * 0.01 + cos(a) * 0.7, cy * 0.01 + sin(a) * 0.7);
    let rxf = rx * (0.82 + n * 0.38);
    let ryf = ry * (0.82 + n * 0.38);
    let x = cx + cos(a) * rxf;
    let y = cy + sin(a) * ryf * 0.55;
    brush.vertex(x, y);
  }
  brush.endShape(true);
}

function glowRect(x, y, w, h, col, alpha) {
  brush.noStroke();
  brush.fillTexture(0.72, 0.38);
  brush.fillBleed(0.52, "out");
  brush.fill(col, alpha);
  brush.rect(x - 10, y - 10, w + 20, h + 20, "corner");
  brush.fill(col, alpha * 0.8);
  brush.rect(x - 4, y - 4, w + 8, h + 8, "corner");
  brush.noFill();
}

function neonSmear(x, y, w, h, col) {
  brush.set("marker", col, 1.25);
  for (let yy = y; yy <= y + h; yy += 6) {
    brush.line(x + random(-2, 2), yy, x + w + random(-3, 3), yy + random(-1, 1));
  }
  brush.set("marker", col, 0.7);
  brush.line(x + 4, y + h * 0.25, x + w - 4, y + h * 0.25);
  brush.line(x + 6, y + h * 0.7, x + w - 8, y + h * 0.7);
}

function verticalReflection(x, yTop, yBottom, col, widthRange, weight) {
  brush.field("hand");
  brush.wiggle(1);
  brush.set("marker", col, weight);
  for (let i = 0; i < 18; i++) {
    let xx = x + random(-widthRange * 0.22, widthRange * 0.22);
    let y1 = random(yTop + 8, yTop + 45);
    let y2 = yBottom - random(5, 35);
    brush.spline([
      [xx, y1, 0.9],
      [xx + random(-10, 10), lerp(y1, y2, 0.35), 0.65],
      [xx + random(-14, 14), lerp(y1, y2, 0.72), 0.45],
      [xx + random(-10, 10), y2, 0.25]
    ], 0.45);
  }
  brush.noField();
}

function passerby(x, y, s, col) {
  let h = 92 * s;
  let w = 24 * s;

  // Head
  brush.noStroke();
  brush.fillTexture(0.45, 0.22);
  brush.fillBleed(0.12, "out");
  brush.fill(col, 155);
  brush.circle(x, y - h + 17 * s, 7 * s, 0.2);
  brush.noFill();

  // Body mass
  brush.mass("pastel", col, {
    strength: 0.52,
    precision: 0.62,
    gradient: 0.28,
    outline: false
  });
  brush.beginShape(0.35);
  brush.vertex(x - w * 0.35, y - h * 0.72);
  brush.vertex(x - w * 0.68, y - h * 0.1);
  brush.vertex(x - w * 0.38, y);
  brush.vertex(x + w * 0.38, y);
  brush.vertex(x + w * 0.68, y - h * 0.1);
  brush.vertex(x + w * 0.35, y - h * 0.72);
  brush.endShape(true);
  brush.noMass();

  // Ink contour
  brush.set("pen", col, 0.6);
  brush.beginShape(0.25);
  brush.vertex(x - w * 0.3, y - h * 0.68);
  brush.vertex(x - w * 0.56, y - h * 0.14);
  brush.vertex(x - w * 0.28, y);
  brush.vertex(x + w * 0.26, y);
  brush.vertex(x + w * 0.55, y - h * 0.14);
  brush.vertex(x + w * 0.28, y - h * 0.68);
  brush.endShape(true);

  // Legs
  brush.set("rotring", col, 0.3);
  brush.line(x - 4 * s, y, x - 8 * s, y + 22 * s);
  brush.line(x + 3 * s, y, x + 8 * s, y + 22 * s);

  // Reflection
  brush.set("2B", colorAlpha(col, 120), 0.55);
  brush.spline([
    [x, y + 5 * s, 0.65],
    [x + random(-4, 4), y + 20 * s, 0.45],
    [x + random(-8, 8), y + 42 * s, 0.25]
  ], 0.35);
}

function colorAlpha(hexCol, a) {
  let c = color(hexCol);
  return color(red(c), green(c), blue(c), a);
}