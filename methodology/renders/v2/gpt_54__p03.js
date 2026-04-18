function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noFill();
  brush.noWash();
  brush.noClip();

  // Motion smear behind the leap
  brush.field("hand");
  brush.wiggle(5);

  for (let i = 0; i < 55; i++) {
    let t = i / 54;
    let x = lerp(110, 275, t) + random(-18, 10);
    let y = lerp(395, 255, t) + random(-22, 18);
    let len = random(35, 95) * (1 - t * 0.45);

    brush.set("charcoal", color(40, 38, 34, 26), random(1.8, 3.6));
    brush.flowLine(x, y, len, random(-25, 18));
  }

  for (let i = 0; i < 38; i++) {
    let t = i / 37;
    let x = lerp(120, 300, t) + random(-22, 16);
    let y = lerp(410, 265, t) + random(-26, 22);
    brush.set("spray", color(30, 28, 26, 10), random(2.2, 4.6));
    brush.flowLine(x, y, random(20, 55), random(-20, 25));
  }

  // Smudged tonal masses
  brush.mass("pastel", "#3a342f", {
    strength: 0.88,
    precision: 0.22,
    gradient: 0.55,
    outline: false
  });

  brush.beginShape(0.45);
  brush.vertex(235, 260);
  brush.vertex(260, 240);
  brush.vertex(290, 232);
  brush.vertex(320, 244);
  brush.vertex(333, 272);
  brush.vertex(322, 300);
  brush.vertex(296, 314);
  brush.vertex(265, 311);
  brush.vertex(241, 290);
  brush.endShape(true);

  brush.beginShape(0.35);
  brush.vertex(265, 316);
  brush.vertex(285, 308);
  brush.vertex(314, 323);
  brush.vertex(348, 351);
  brush.vertex(374, 385);
  brush.vertex(384, 407);
  brush.vertex(366, 411);
  brush.vertex(339, 390);
  brush.vertex(309, 357);
  brush.vertex(283, 334);
  brush.endShape(true);

  brush.beginShape(0.35);
  brush.vertex(256, 320);
  brush.vertex(240, 344);
  brush.vertex(222, 372);
  brush.vertex(199, 404);
  brush.vertex(170, 438);
  brush.vertex(150, 454);
  brush.vertex(139, 449);
  brush.vertex(149, 428);
  brush.vertex(173, 391);
  brush.vertex(194, 360);
  brush.vertex(216, 333);
  brush.endShape(true);

  brush.beginShape(0.35);
  brush.vertex(309, 292);
  brush.vertex(340, 280);
  brush.vertex(372, 259);
  brush.vertex(408, 234);
  brush.vertex(449, 208);
  brush.vertex(486, 191);
  brush.vertex(500, 196);
  brush.vertex(485, 212);
  brush.vertex(446, 231);
  brush.vertex(404, 253);
  brush.vertex(368, 277);
  brush.vertex(336, 299);
  brush.endShape(true);

  brush.beginShape(0.35);
  brush.vertex(248, 286);
  brush.vertex(220, 268);
  brush.vertex(198, 247);
  brush.vertex(176, 220);
  brush.vertex(158, 191);
  brush.vertex(146, 159);
  brush.vertex(153, 149);
  brush.vertex(171, 170);
  brush.vertex(191, 200);
  brush.vertex(214, 232);
  brush.vertex(239, 261);
  brush.endShape(true);

  brush.noMass();

  // Broad charcoal hatching to deepen the smudge cloud
  brush.hatchStyle("charcoal", color(35, 32, 30, 32), 1.8);
  brush.hatch(7, -28, { rand: 0.24, continuous: true, gradient: 0.45 });
  brush.beginShape(0.35);
  brush.vertex(88, 422);
  brush.vertex(118, 386);
  brush.vertex(168, 340);
  brush.vertex(220, 301);
  brush.vertex(268, 275);
  brush.vertex(302, 268);
  brush.vertex(318, 282);
  brush.vertex(286, 312);
  brush.vertex(228, 356);
  brush.vertex(174, 401);
  brush.vertex(126, 443);
  brush.vertex(96, 457);
  brush.endShape(true);
  brush.noHatch();

  // Main gestural contour of the body
  brush.set("charcoal", "#1e1c1a", 1.45);

  // Spine / torso
  brush.spline([
    [252, 304, 0.9],
    [261, 286, 1.0],
    [274, 267, 1.1],
    [290, 251, 1.0],
    [306, 243, 0.8]
  ], 0.55);

  // Head
  brush.circle(313, 214, 18, 0.4);

  // Neck / shoulder line
  brush.spline([
    [286, 240, 0.8],
    [301, 233, 0.9],
    [321, 232, 0.8],
    [338, 239, 0.7]
  ], 0.45);

  // Front arm reaching forward
  brush.beginStroke("curve", 332, 242);
  brush.move(-18, 44, 0.95);
  brush.move(-12, 42, 0.82);
  brush.endStroke(-8, 0.42);

  // Rear arm flung back
  brush.beginStroke("curve", 286, 246);
  brush.move(205, 30, 0.9);
  brush.move(225, 34, 0.72);
  brush.endStroke(245, 0.35);

  // Supporting leg extended downward/back
  brush.beginStroke("curve", 278, 315);
  brush.move(120, 46, 1.1);
  brush.move(125, 58, 0.95);
  brush.move(132, 52, 0.7);
  brush.endStroke(138, 0.28);

  // Leading leg thrust forward
  brush.beginStroke("curve", 287, 314);
  brush.move(28, 54, 1.08);
  brush.move(18, 70, 0.92);
  brush.move(8, 63, 0.65);
  brush.endStroke(-2, 0.24);

  // Secondary contour accents
  brush.set("2B", "#26221f", 1.0);
  brush.spline([
    [258, 303, 0.5],
    [250, 287, 0.7],
    [252, 268, 0.75],
    [264, 251, 0.6]
  ], 0.35);

  brush.spline([
    [300, 318, 0.6],
    [320, 345, 0.55],
    [342, 372, 0.45],
    [360, 397, 0.3]
  ], 0.35);

  brush.spline([
    [250, 318, 0.6],
    [228, 348, 0.55],
    [203, 382, 0.45],
    [177, 421, 0.3]
  ], 0.35);

  // Heavy rubbed shadow under torso and hips
  brush.mass("crayon", "#221f1c", {
    strength: 0.78,
    precision: 0.28,
    gradient: 0.35,
    outline: false
  });
  brush.beginShape(0.5);
  brush.vertex(244, 286);
  brush.vertex(268, 272);
  brush.vertex(302, 272);
  brush.vertex(323, 287);
  brush.vertex(314, 311);
  brush.vertex(286, 323);
  brush.vertex(255, 317);
  brush.vertex(239, 299);
  brush.endShape(true);
  brush.noMass();

  // Smudged charcoal sweep around the figure for motion
  brush.set("charcoal", color(25, 23, 22, 34), 2.2);
  for (let i = 0; i < 16; i++) {
    let oy = random(-16, 16);
    brush.beginStroke("curve", 118 + random(-12, 8), 402 + oy);
    brush.move(-22 + random(-8, 8), random(50, 86), random(0.75, 1.15));
    brush.move(-10 + random(-7, 7), random(44, 78), random(0.45, 0.9));
    brush.endStroke(random(-8, 8), random(0.18, 0.42));
  }

  // Fine searching lines
  brush.set("HB", "#45403a", 0.65);
  brush.spline([
    [304, 198, 0.3],
    [316, 202, 0.35],
    [324, 214, 0.28]
  ], 0.5);

  brush.spline([
    [331, 243, 0.3],
    [362, 230, 0.28],
    [402, 210, 0.2]
  ], 0.25);

  brush.spline([
    [247, 246, 0.28],
    [220, 219, 0.25],
    [186, 178, 0.18]
  ], 0.25);

  // A few pale erased-like construction traces
  brush.set("2H", color(110, 102, 94, 35), 0.55);
  brush.arc(292, 280, 76, 205, 332);
  brush.arc(286, 312, 108, 345, 145);

  brush.noField();
  noLoop();
}