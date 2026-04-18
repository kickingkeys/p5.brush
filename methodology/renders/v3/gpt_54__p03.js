let bodyPts = [];
let trailPolys = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
  randomSeed(8);
  noiseSeed(8);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("hand");
  brush.wiggle(4);

  drawPaperTone();
  drawMotionSmudges();
  drawCharcoalMasses();
  drawFigureGesture();
  drawFigureContours();
  drawAccents();

  brush.noField();
  noLoop();
}

function drawPaperTone() {
  brush.noStroke();
  brush.fillTexture(0.2, 0.12, false);

  for (let i = 0; i < 3; i++) {
    brush.fill("#f6efe3", 18);
    brush.fillBleed(0.08, "out");
    let x = random(120, 500);
    let y = random(120, 500);
    let r = random(90, 150);
    brush.circle(x, y, r, 0.15);
  }

  brush.noFill();
}

function drawMotionSmudges() {
  let centers = [
    [185, 338],
    [225, 316],
    [268, 294],
    [312, 268],
    [354, 236]
  ];

  for (let i = 0; i < centers.length; i++) {
    let c = centers[i];
    let w = 150 - i * 12;
    let h = 78 - i * 4;
    let a = -18 + i * 2;
    let poly = blob(c[0], c[1], w, h, 26, a, 0.18 + i * 0.02);
    trailPolys.push(poly);
  }

  for (let i = 0; i < trailPolys.length; i++) {
    let alpha = 34 - i * 4;
    brush.mass("pastel", "#56514a", {
      strength: 0.72 - i * 0.08,
      precision: 0.22,
      gradient: 0.55,
      outline: false
    });
    brush.hatchStyle("charcoal", "#5a544d", 1.4);
    brush.hatch(8 - i, 18, { rand: 0.2, continuous: false, gradient: 0.35 });
    brush.noStroke();
    brush.fill("#6b645d", alpha);
    brush.fillBleed(0.12, "out");
    brush.polygon(trailPolys[i]);
    brush.noHatch();
    brush.noMass();
    brush.noFill();
  }

  brush.set("spray", "#6a625c", 1.6);
  for (let i = 0; i < 180; i++) {
    let x = random(90, 360);
    let y = random(200, 380);
    let len = random(10, 30);
    brush.flowLine(x, y, len, 0);
  }
}

function drawCharcoalMasses() {
  let torso = blob(365, 258, 70, 120, 28, -18, 0.22);
  let pelvis = blob(352, 318, 64, 46, 24, 10, 0.2);
  let head = blob(402, 182, 34, 42, 20, 8, 0.18);
  let thigh1 = blob(327, 352, 42, 108, 24, 42, 0.16);
  let calf1 = blob(292, 434, 30, 118, 22, 10, 0.16);
  let thigh2 = blob(402, 340, 34, 118, 22, -35, 0.16);
  let calf2 = blob(456, 394, 28, 112, 20, -56, 0.16);
  let upperArm1 = blob(334, 238, 26, 90, 20, -62, 0.15);
  let foreArm1 = blob(290, 186, 24, 88, 18, -30, 0.15);
  let upperArm2 = blob(414, 246, 24, 88, 20, 60, 0.15);
  let foreArm2 = blob(462, 196, 20, 92, 18, 35, 0.15);

  let masses = [
    torso, pelvis, head,
    thigh1, calf1, thigh2, calf2,
    upperArm1, foreArm1, upperArm2, foreArm2
  ];

  for (let i = 0; i < masses.length; i++) {
    let isCore = i < 3;
    brush.mass("crayon", isCore ? "#252321" : "#363230", {
      strength: isCore ? 0.88 : 0.68,
      precision: 0.28,
      gradient: 0.45,
      outline: false
    });
    brush.hatchStyle("charcoal", isCore ? "#2d2926" : "#49433d", isCore ? 1.8 : 1.1);
    brush.hatch(isCore ? 5 : 7, 110, { rand: 0.22, continuous: false, gradient: 0.3 });
    brush.noStroke();
    brush.fill(isCore ? "#3b3631" : "#5a534c", isCore ? 22 : 12);
    brush.fillBleed(0.1, "out");
    brush.polygon(masses[i]);
    brush.noHatch();
    brush.noMass();
    brush.noFill();
  }
}

function drawFigureGesture() {
  brush.noFill();
  brush.set("charcoal", "#2a2724", 2.2);

  brush.beginStroke("curve", 288, 444);
  brush.move(-78, 96, 0.72);
  brush.move(-34, 104, 1.05);
  brush.move(64, 70, 1.12);
  brush.move(104, 64, 0.86);
  brush.endStroke(38, 0.4);

  brush.beginStroke("curve", 355, 316);
  brush.move(52, 92, 0.84);
  brush.move(-8, 112, 0.78);
  brush.endStroke(-46, 0.3);

  brush.beginStroke("curve", 362, 262);
  brush.move(-145, 34, 0.72);
  brush.move(-122, 48, 0.46);
  brush.endStroke(-118, 0.18);

  brush.beginStroke("curve", 373, 246);
  brush.move(-32, -58, 0.55);
  brush.move(22, -54, 0.32);
  brush.endStroke(10, 0.16);

  brush.beginStroke("curve", 388, 246);
  brush.move(58, -28, 0.42);
  brush.move(30, -22, 0.16);
  brush.endStroke(-12, 0.08);

  brush.set("HB", "#55504a", 0.8);
  brush.spline(
    [
      [210, 358, 0.2],
      [252, 334, 0.35],
      [300, 306, 0.5],
      [346, 272, 0.75],
      [386, 220, 0.45]
    ],
    0.5
  );
}

function drawFigureContours() {
  brush.noFill();

  brush.set("2B", "#1f1d1b", 1.1);
  brush.spline(
    [
      [294, 438, 0.45],
      [302, 392, 0.78],
      [328, 338, 1.0],
      [350, 290, 1.02],
      [366, 248, 0.92],
      [392, 207, 0.62]
    ],
    0.45
  );

  brush.spline(
    [
      [394, 206, 0.42],
      [408, 182, 0.9],
      [414, 166, 0.4]
    ],
    0.4
  );

  brush.spline(
    [
      [368, 250, 0.6],
      [342, 228, 0.5],
      [318, 206, 0.28],
      [286, 178, 0.12]
    ],
    0.42
  );

  brush.spline(
    [
      [382, 248, 0.52],
      [414, 226, 0.35],
      [448, 206, 0.16]
    ],
    0.4
  );

  brush.spline(
    [
      [354, 318, 0.55],
      [390, 326, 0.44],
      [426, 356, 0.34],
      [460, 392, 0.18]
    ],
    0.35
  );

  brush.set("2H", "#7b746d", 0.6);
  brush.spline(
    [
      [308, 410, 0.24],
      [328, 360, 0.34],
      [356, 304, 0.44],
      [376, 250, 0.34]
    ],
    0.25
  );

  brush.spline(
    [
      [356, 316, 0.18],
      [376, 364, 0.2],
      [404, 404, 0.12]
    ],
    0.2
  );
}

function drawAccents() {
  brush.noFill();

  brush.set("charcoal", "#181716", 1.6);
  brush.arc(401, 182, 17, 190, 352);

  brush.set("2B", "#201e1c", 0.9);
  brush.line(392, 192, 378, 210);
  brush.line(407, 191, 417, 208);

  brush.hatchStyle("charcoal", "#3e3934", 1.0);
  brush.hatch(6, 124, { rand: 0.18, continuous: false, gradient: 0.45 });
  brush.polygon(blob(345, 282, 42, 56, 18, -12, 0.12));
  brush.noHatch();

  brush.set("charcoal", "#5b554f", 0.9);
  for (let i = 0; i < 22; i++) {
    let x1 = 150 + i * 10 + random(-8, 8);
    let y1 = 338 + random(-28, 22);
    let x2 = x1 + random(30, 80);
    let y2 = y1 + random(-8, 10);
    brush.line(x1, y1, x2, y2);
  }
}

function blob(cx, cy, w, h, count, rotDeg, rough) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let rn = 1 + map(noise(cx * 0.01 + i * 0.18, cy * 0.01 + i * 0.12), 0, 1, -rough, rough);
    let x = cos(a) * (w * 0.5) * rn;
    let y = sin(a) * (h * 0.5) * rn;
    let xr = x * cos(rotDeg) - y * sin(rotDeg);
    let yr = x * sin(rotDeg) + y * cos(rotDeg);
    pts.push([cx + xr, cy + yr]);
  }
  return pts;
}