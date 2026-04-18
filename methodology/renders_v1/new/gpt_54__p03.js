function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(42);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Loose charcoal motion field
  brush.field("hand");
  brush.wiggle(4);

  // Smudged motion trails behind the leap
  drawSmudgeTrails();

  // Main gestural body masses
  drawBodyMasses();

  // Structural charcoal gesture lines
  drawGestureSkeleton();

  // Dark accents and contours
  drawAccents();

  // A few lighter searching lines
  drawConstruction();

  brush.noField();
  noLoop();
}

function drawSmudgeTrails() {
  let trailColor = "#3f3a36";

  // Broad dry-media smudges
  brush.mass("crayon", trailColor, {
    strength: 0.82,
    precision: 0.22,
    gradient: 0.65,
    outline: false
  });

  let blobs = [
    { x: 160, y: 330, rx: 95, ry: 42, rot: -18 },
    { x: 210, y: 300, rx: 90, ry: 36, rot: -12 },
    { x: 265, y: 270, rx: 72, ry: 28, rot: -8 },
    { x: 315, y: 245, rx: 58, ry: 22, rot: -3 }
  ];

  for (let b of blobs) {
    push();
    translate(b.x, b.y);
    rotate(b.rot);
    organicBlob(0, 0, b.rx, b.ry, 22, 0.22, true);
    pop();
  }
  brush.noMass();

  // Powdery charcoal hatch through the smudge
  brush.hatchStyle("charcoal", "#4a443f", 1.2);
  brush.hatch(8, 18, { rand: 0.16, continuous: false, gradient: 0.55 });

  for (let b of blobs) {
    push();
    translate(b.x, b.y);
    rotate(b.rot);
    organicBlob(0, 0, b.rx * 0.9, b.ry * 0.8, 20, 0.18, true);
    pop();
  }
  brush.noHatch();

  // Airy dust around the motion
  brush.set("spray", "#6a625b", 1.1);
  for (let i = 0; i < 220; i++) {
    let x = random(90, 330);
    let y = 230 + 0.48 * (330 - x) + random(-50, 50);
    brush.flowLine(x, y, random(5, 16), random(150, 220));
  }
}

function drawBodyMasses() {
  // Torso
  brush.mass("pastel", "#2f2b28", {
    strength: 0.66,
    precision: 0.45,
    gradient: 0.35,
    outline: false
  });
  push();
  translate(345, 250);
  rotate(-24);
  organicBlob(0, 0, 34, 68, 20, 0.14, true);
  pop();
  brush.noMass();

  // Pelvis / hip
  brush.mass("crayon", "#35302c", {
    strength: 0.72,
    precision: 0.38,
    gradient: 0.28,
    outline: false
  });
  push();
  translate(330, 308);
  rotate(18);
  organicBlob(0, 0, 36, 24, 18, 0.16, true);
  pop();
  brush.noMass();

  // Head
  brush.mass("pastel", "#3b3531", {
    strength: 0.52,
    precision: 0.52,
    gradient: 0.2,
    outline: false
  });
  push();
  translate(365, 168);
  rotate(-10);
  organicBlob(0, 0, 18, 22, 14, 0.1, true);
  pop();
  brush.noMass();

  // Front thigh
  brush.mass("crayon", "#2d2926", {
    strength: 0.74,
    precision: 0.32,
    gradient: 0.42,
    outline: false
  });
  limbShape(332, 318, 418, 248, 17, 11, -8);
  brush.noMass();

  // Front calf
  brush.mass("crayon", "#2d2926", {
    strength: 0.7,
    precision: 0.28,
    gradient: 0.5,
    outline: false
  });
  limbShape(418, 248, 506, 213, 12, 8, -6);
  brush.noMass();

  // Rear thigh
  brush.mass("pastel", "#3a3531", {
    strength: 0.58,
    precision: 0.36,
    gradient: 0.46,
    outline: false
  });
  limbShape(320, 319, 256, 380, 16, 10, 10);
  brush.noMass();

  // Rear calf
  brush.mass("pastel", "#3e3834", {
    strength: 0.54,
    precision: 0.3,
    gradient: 0.58,
    outline: false
  });
  limbShape(256, 380, 210, 458, 11, 7, 15);
  brush.noMass();

  // Leading upper arm
  brush.mass("pastel", "#34302d", {
    strength: 0.5,
    precision: 0.48,
    gradient: 0.35,
    outline: false
  });
  limbShape(352, 238, 430, 182, 10, 6, -15);
  brush.noMass();

  // Leading forearm
  brush.mass("pastel", "#34302d", {
    strength: 0.48,
    precision: 0.44,
    gradient: 0.42,
    outline: false
  });
  limbShape(430, 182, 502, 152, 7, 4, -12);
  brush.noMass();

  // Rear upper arm
  brush.mass("crayon", "#3b3632", {
    strength: 0.56,
    precision: 0.42,
    gradient: 0.35,
    outline: false
  });
  limbShape(333, 236, 286, 188, 10, 6, 10);
  brush.noMass();

  // Rear forearm
  brush.mass("crayon", "#3b3632", {
    strength: 0.52,
    precision: 0.4,
    gradient: 0.4,
    outline: false
  });
  limbShape(286, 188, 248, 132, 7, 4, 12);
  brush.noMass();
}

function drawGestureSkeleton() {
  brush.set("charcoal", "#241f1c", 1.9);

  // Spine and torso thrust
  brush.spline([
    [325, 328, 1.3],
    [334, 292, 1.15],
    [344, 254, 1.05],
    [355, 218, 0.95],
    [364, 184, 0.75]
  ], 0.55);

  // Shoulder line
  brush.spline([
    [292, 210, 0.7],
    [330, 225, 0.95],
    [372, 222, 1.0],
    [432, 195, 0.75]
  ], 0.45);

  // Hip line
  brush.spline([
    [292, 316, 0.7],
    [326, 309, 1.05],
    [356, 300, 0.85]
  ], 0.3);

  // Leading leg
  brush.spline([
    [330, 316, 1.15],
    [371, 286, 1.25],
    [422, 248, 1.0],
    [468, 224, 0.72],
    [520, 206, 0.45]
  ], 0.45);

  // Rear leg
  brush.spline([
    [320, 317, 1.0],
    [286, 348, 1.1],
    [254, 386, 0.95],
    [224, 430, 0.7],
    [200, 474, 0.45]
  ], 0.4);

  // Leading arm
  brush.spline([
    [352, 234, 0.8],
    [392, 206, 0.72],
    [438, 178, 0.55],
    [486, 154, 0.35]
  ], 0.42);

  // Rear arm
  brush.spline([
    [334, 232, 0.72],
    [307, 202, 0.62],
    [278, 170, 0.48],
    [246, 126, 0.32]
  ], 0.42);

  // Motion echo lines behind body
  brush.set("charcoal", "#5b544d", 1.25);
  for (let i = 0; i < 5; i++) {
    let dx = -18 - i * 18;
    let dy = 8 + i * 5;
    brush.spline([
      [325 + dx, 328 + dy, 0.8],
      [337 + dx, 282 + dy, 0.72],
      [351 + dx, 231 + dy, 0.6],
      [364 + dx, 182 + dy, 0.4]
    ], 0.5);
  }
}

function drawAccents() {
  brush.set("2B", "#171310", 1.25);

  // Core contour accents
  brush.spline([
    [357, 184, 0.7],
    [364, 168, 0.9],
    [373, 162, 0.55]
  ], 0.35);

  brush.spline([
    [350, 227, 0.75],
    [356, 257, 1.0],
    [347, 289, 0.9],
    [329, 317, 0.7]
  ], 0.45);

  brush.spline([
    [334, 317, 0.85],
    [380, 284, 1.0],
    [423, 248, 0.8]
  ], 0.35);

  brush.spline([
    [322, 318, 0.8],
    [287, 352, 0.82],
    [256, 385, 0.65]
  ], 0.35);

  // Feet / hands hints
  brush.line(500, 210, 519, 201);
  brush.line(198, 470, 212, 458);
  brush.line(488, 155, 503, 149);
  brush.line(240, 126, 252, 118);

  // Smudged dark under torso
  brush.hatchStyle("charcoal", "#231d1a", 1.6);
  brush.hatch(5, 105, { rand: 0.2, continuous: false, gradient: 0.3 });
  push();
  translate(342, 258);
  rotate(-18);
  organicBlob(0, 0, 28, 46, 16, 0.12, true);
  pop();
  brush.noHatch();
}

function drawConstruction() {
  // Faint searching/anatomy lines
  brush.set("HB", "#7a736c", 0.75);
  brush.spline([
    [300, 214, 0.3],
    [344, 248, 0.45],
    [390, 274, 0.25]
  ], 0.4);

  brush.spline([
    [278, 328, 0.25],
    [326, 310, 0.35],
    [381, 294, 0.2]
  ], 0.3);

  brush.set("2H", "#9c948b", 0.6);
  brush.line(350, 150, 350, 350);
  brush.line(220, 300, 500, 300);

  // Soft rotring hints to sharpen a few edges
  brush.set("rotring", "#2b2724", 0.45);
  brush.line(362, 161, 372, 160);
  brush.line(421, 248, 437, 241);
  brush.line(255, 385, 245, 396);
}

function limbShape(x1, y1, x2, y2, r1, r2, bend) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let len = sqrt(dx * dx + dy * dy);
  let nx = -dy / len;
  let ny = dx / len;
  let mx = (x1 + x2) * 0.5 + nx * bend;
  let my = (y1 + y2) * 0.5 + ny * bend;

  brush.beginShape(0.45);
  brush.vertex(x1 + nx * r1, y1 + ny * r1);
  brush.vertex(mx + nx * ((r1 + r2) * 0.5), my + ny * ((r1 + r2) * 0.5));
  brush.vertex(x2 + nx * r2, y2 + ny * r2);
  brush.vertex(x2 - nx * r2, y2 - ny * r2);
  brush.vertex(mx - nx * ((r1 + r2) * 0.5), my - ny * ((r1 + r2) * 0.5));
  brush.vertex(x1 - nx * r1, y1 - ny * r1);
  brush.endShape(true);
}

function organicBlob(cx, cy, rx, ry, steps, jitter, closeShape) {
  brush.beginShape(0.5);
  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps, 0, 360);
    let n = noise(cx * 0.01 + cos(a) * 0.7, cy * 0.01 + sin(a) * 0.7, i * 0.08);
    let rrX = rx * (1 + map(n, 0, 1, -jitter, jitter));
    let rrY = ry * (1 + map(n, 0, 1, -jitter, jitter));
    let x = cx + cos(a) * rrX;
    let y = cy + sin(a) * rrY;
    brush.vertex(x, y);
  }
  brush.endShape(closeShape);
}