function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(27);
  noiseSeed(27);

  const paper = "#fffaf3";

  // soft motion field for charcoal gesture
  brush.field("hand");
  brush.wiggle(4);

  // --- trailing smudges / motion haze ---
  noStroke();
  for (let i = 0; i < 14; i++) {
    let t = i / 13;
    let x = lerp(110, 275, t) + random(-18, 18);
    let y = lerp(390, 250, t) + random(-22, 22);
    let w = lerp(170, 90, t) + random(-10, 10);
    let h = lerp(90, 45, t) + random(-8, 8);

    push();
    translate(x, y);
    rotate(-22 + random(-8, 8));

    brush.mass("pastel", "#8f877e", {
      strength: 0.35 + t * 0.18,
      precision: 0.18,
      gradient: 0.55,
      outline: false
    });
    brush.beginShape(0.42);
    for (let a = 0; a < 360; a += 24) {
      let rx = cos(a) * (w * 0.5 + random(-10, 10));
      let ry = sin(a) * (h * 0.5 + random(-8, 8));
      brush.vertex(rx, ry);
    }
    brush.endShape(true);
    brush.noMass();
    pop();
  }

  // deeper charcoal clouds behind torso/hips
  for (let i = 0; i < 7; i++) {
    let x = 205 + i * 18 + random(-10, 10);
    let y = 320 - i * 14 + random(-12, 12);

    push();
    translate(x, y);
    rotate(-28 + random(-10, 10));
    brush.mass("crayon", "#5e5851", {
      strength: 0.55,
      precision: 0.22,
      gradient: 0.45,
      outline: false
    });
    brush.beginShape(0.4);
    for (let a = 0; a < 360; a += 30) {
      let r = 26 + random(-8, 8);
      brush.vertex(cos(a) * r * 1.8, sin(a) * r);
    }
    brush.endShape(true);
    brush.noMass();
    pop();
  }

  // airborne dust / rubbed charcoal
  brush.set("spray", "#7a746d", 2.2);
  for (let i = 0; i < 180; i++) {
    let x = random(95, 330);
    let y = random(205, 415);
    let len = random(4, 18);
    brush.flowLine(x, y, len, random(360));
  }

  // --- figure massing ---
  brush.noField();

  // torso mass
  brush.field("hand");
  brush.wiggle(3);
  brush.mass("pastel", "#6b655f", {
    strength: 0.5,
    precision: 0.3,
    gradient: 0.45,
    outline: false
  });
  brush.beginShape(0.48);
  brush.vertex(265, 300);
  brush.vertex(292, 262);
  brush.vertex(330, 240);
  brush.vertex(362, 252);
  brush.vertex(372, 292);
  brush.vertex(356, 332);
  brush.vertex(320, 350);
  brush.vertex(286, 338);
  brush.endShape(true);
  brush.noMass();

  // pelvis / upper thigh mass
  brush.mass("crayon", "#4d4842", {
    strength: 0.58,
    precision: 0.26,
    gradient: 0.35,
    outline: false
  });
  brush.beginShape(0.42);
  brush.vertex(286, 340);
  brush.vertex(320, 334);
  brush.vertex(348, 346);
  brush.vertex(338, 372);
  brush.vertex(300, 378);
  brush.vertex(276, 362);
  brush.endShape(true);
  brush.noMass();

  // head shadow
  brush.mass("pastel", "#5b5550", {
    strength: 0.42,
    precision: 0.35,
    gradient: 0.2,
    outline: false
  });
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 36) {
    let r = 23 + random(-4, 4);
    brush.vertex(330 + cos(a) * r * 0.95, 205 + sin(a) * r * 1.15);
  }
  brush.endShape(true);
  brush.noMass();

  // --- charcoal contour / gesture skeleton ---
  brush.set("charcoal", "#201d1b", 1.15);

  // spine / torso sweep
  brush.spline([
    [312, 355, 0.8],
    [302, 332, 1.05],
    [300, 300, 1.1],
    [315, 262, 0.95],
    [332, 222, 0.75]
  ], 0.55);

  // shoulder line
  brush.spline([
    [286, 274, 0.75],
    [317, 255, 1.0],
    [353, 250, 0.9],
    [382, 262, 0.7]
  ], 0.45);

  // supporting left arm trailing back
  brush.spline([
    [310, 270, 0.7],
    [268, 286, 0.82],
    [230, 314, 0.72],
    [190, 343, 0.45]
  ], 0.42);

  // reaching right arm upward
  brush.spline([
    [348, 258, 0.8],
    [388, 214, 0.88],
    [430, 164, 0.72],
    [467, 116, 0.35]
  ], 0.46);

  // neck + head
  brush.spline([
    [319, 244, 0.55],
    [324, 229, 0.45],
    [330, 216, 0.4]
  ], 0.35);

  brush.arc(331, 204, 18, 205, 20);

  // lifted front leg
  brush.spline([
    [323, 368, 0.95],
    [366, 338, 1.02],
    [423, 314, 0.82],
    [492, 296, 0.42]
  ], 0.5);

  // calf / foot flick
  brush.spline([
    [425, 314, 0.72],
    [474, 303, 0.5],
    [528, 300, 0.22]
  ], 0.35);

  // trailing back leg
  brush.spline([
    [304, 372, 0.92],
    [270, 414, 0.95],
    [230, 468, 0.72],
    [178, 535, 0.35]
  ], 0.52);

  // back foot
  brush.spline([
    [176, 536, 0.28],
    [152, 552, 0.18],
    [132, 558, 0.12]
  ], 0.25);

  // --- cross-hatched shadow accents ---
  brush.hatchStyle("2B", "#2c2825", 1.05);
  brush.hatch(5, 112, { rand: 0.16, continuous: true, gradient: 0.35 });
  brush.beginShape(0.42);
  brush.vertex(297, 286);
  brush.vertex(324, 257);
  brush.vertex(350, 253);
  brush.vertex(360, 286);
  brush.vertex(344, 318);
  brush.vertex(313, 328);
  brush.vertex(292, 312);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#3b3632", 0.8);
  brush.hatch(8, 35, { rand: 0.12, continuous: true, gradient: 0.2 });
  brush.beginShape(0.4);
  brush.vertex(286, 338);
  brush.vertex(316, 334);
  brush.vertex(340, 344);
  brush.vertex(333, 370);
  brush.vertex(302, 376);
  brush.vertex(280, 360);
  brush.endShape(true);
  brush.noHatch();

  // head charcoal ring
  brush.set("HB", "#2f2a27", 0.65);
  brush.circle(330, 205, 21, 0.35);

  // --- light corrective highlights with 2H ---
  brush.set("2H", "#90877d", 0.45);
  brush.spline([
    [309, 267, 0.3],
    [327, 254, 0.38],
    [347, 254, 0.3]
  ], 0.35);

  brush.spline([
    [350, 342, 0.28],
    [395, 325, 0.25],
    [445, 309, 0.18]
  ], 0.28);

  // groundless atmospheric streaks behind motion
  brush.field("hand");
  brush.wiggle(5);
  brush.set("charcoal", "#59534d", 0.55);
  for (let i = 0; i < 18; i++) {
    let y = 402 - i * 10 + random(-6, 6);
    brush.spline([
      [92 + random(-10, 8), y + random(-10, 10), 0.22],
      [170 + random(-12, 12), y - 18 + random(-10, 10), 0.33],
      [248 + random(-12, 12), y - 38 + random(-10, 10), 0.18]
    ], 0.3);
  }
  brush.noField();

  // subtle paper-preserving scuff lines
  brush.set("2H", "#a39a90", 0.3);
  for (let i = 0; i < 9; i++) {
    let x1 = 140 + i * 20 + random(-8, 8);
    let y1 = 430 - i * 15 + random(-5, 5);
    let x2 = x1 + random(50, 95);
    let y2 = y1 - random(18, 40);
    brush.line(x1, y1, x2, y2);
  }

  noLoop();
}