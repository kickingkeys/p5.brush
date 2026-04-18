function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(17);
  noiseSeed(17);

  // Motion haze / charcoal smudges
  brush.noStroke();
  brush.noHatch();
  brush.fill("#2e2a28", 14);
  brush.fillBleed(0.38, "out");
  brush.fillTexture(0.75, 0.55);

  brush.beginShape(0.55);
  brush.vertex(150, 350);
  brush.vertex(205, 328);
  brush.vertex(270, 300);
  brush.vertex(330, 272);
  brush.vertex(395, 232);
  brush.vertex(455, 198);
  brush.vertex(500, 175);
  brush.vertex(485, 215);
  brush.vertex(430, 250);
  brush.vertex(365, 287);
  brush.vertex(300, 318);
  brush.vertex(235, 345);
  brush.vertex(180, 365);
  brush.endShape(true);

  brush.fill("#2e2a28", 10);
  brush.fillBleed(0.28, "out");
  brush.fillTexture(0.6, 0.4);
  brush.beginShape(0.45);
  brush.vertex(170, 382);
  brush.vertex(235, 350);
  brush.vertex(300, 322);
  brush.vertex(355, 300);
  brush.vertex(410, 268);
  brush.vertex(460, 235);
  brush.vertex(432, 285);
  brush.vertex(375, 318);
  brush.vertex(315, 344);
  brush.vertex(255, 370);
  brush.vertex(205, 392);
  brush.endShape(true);

  // Smudged directional trails
  brush.set("charcoal", "#2f2b29", 1.6);
  brush.strokeWeight(1.1);
  for (let i = 0; i < 26; i++) {
    let x1 = 120 + i * 12 + random(-8, 6);
    let y1 = 372 - i * 7 + random(-10, 10);
    let x2 = x1 + random(70, 130);
    let y2 = y1 - random(18, 52);
    brush.line(x1, y1, x2, y2);
  }

  brush.set("spray", "#3a3532", 1.25);
  for (let i = 0; i < 20; i++) {
    let x1 = 140 + i * 14 + random(-12, 12);
    let y1 = 360 - i * 6 + random(-12, 12);
    let x2 = x1 + random(45, 110);
    let y2 = y1 - random(10, 40);
    brush.line(x1, y1, x2, y2);
  }

  // Main gestural body
  brush.noFill();
  brush.noHatch();
  brush.set("charcoal", "#1f1b19", 1.9);

  // Spine / torso sweep
  brush.spline([
    [260, 378, 0.8],
    [285, 344, 1.0],
    [312, 300, 1.12],
    [333, 250, 1.0],
    [350, 202, 0.85]
  ], 0.72);

  // Pelvis to supporting upper thigh
  brush.spline([
    [272, 386, 0.95],
    [305, 398, 1.05],
    [345, 403, 0.95]
  ], 0.45);

  // Head
  brush.set("2B", "#201c1a", 1.2);
  brush.circle(356, 164, 18, 0.25);

  // Neck / shoulder bridge
  brush.set("charcoal", "#211d1b", 1.5);
  brush.spline([
    [344, 184, 0.65],
    [332, 202, 0.75],
    [316, 225, 0.82]
  ], 0.5);

  // Front arm reaching up
  brush.spline([
    [326, 224, 0.78],
    [360, 198, 0.72],
    [404, 162, 0.6],
    [446, 125, 0.5],
    [486, 96, 0.38]
  ], 0.78);

  // Hand flick
  brush.set("HB", "#272321", 0.9);
  brush.line(482, 96, 500, 86);
  brush.line(486, 97, 505, 95);

  // Rear arm flung backward
  brush.set("charcoal", "#292522", 1.3);
  brush.spline([
    [318, 236, 0.7],
    [282, 221, 0.62],
    [238, 205, 0.5],
    [196, 192, 0.36]
  ], 0.68);

  // Rear hand smear
  brush.set("spray", "#332e2b", 1.0);
  brush.line(190, 191, 158, 183);

  // Leading leg extended forward/up
  brush.set("charcoal", "#1d1917", 1.8);
  brush.spline([
    [307, 398, 1.0],
    [350, 350, 1.0],
    [410, 296, 0.88],
    [474, 250, 0.7],
    [535, 218, 0.5]
  ], 0.76);

  // Leading foot
  brush.set("2B", "#201c1a", 1.0);
  brush.spline([
    [532, 218, 0.45],
    [555, 212, 0.4],
    [570, 220, 0.32]
  ], 0.35);

  // Back leg kicked behind
  brush.set("charcoal", "#211d1b", 1.65);
  brush.spline([
    [292, 399, 0.96],
    [250, 437, 0.92],
    [204, 479, 0.78],
    [160, 522, 0.58],
    [120, 555, 0.42]
  ], 0.72);

  // Back foot
  brush.set("HB", "#26211f", 0.9);
  brush.spline([
    [118, 555, 0.35],
    [96, 566, 0.32],
    [78, 574, 0.28]
  ], 0.25);

  // Secondary construction / searching lines
  brush.set("2H", "#6a625d", 0.65);
  brush.line(274, 387, 344, 403);
  brush.line(318, 229, 365, 204);
  brush.line(309, 397, 475, 251);
  brush.line(292, 398, 160, 521);

  brush.set("HB", "#504844", 0.6);
  brush.spline([
    [257, 377, 0.5],
    [284, 336, 0.55],
    [309, 296, 0.5],
    [327, 254, 0.45],
    [345, 207, 0.4]
  ], 0.5);

  // Dense charcoal around torso / joints
  brush.set("charcoal", "#171413", 1.15);
  for (let i = 0; i < 14; i++) {
    let a = random(-35, 35);
    let len = random(20, 46);
    let sx = 312 + random(-18, 18);
    let sy = 302 + random(-24, 24);
    brush.beginStroke("segments", sx, sy);
    brush.move(a, len, random(0.6, 1.0));
    brush.endStroke(a - random(10, 25), random(0.4, 0.8));
  }

  // Smudged mass under torso and hips
  brush.noStroke();
  brush.fill("#25211f", 18);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.68, 0.48);
  brush.beginShape(0.6);
  brush.vertex(275, 376);
  brush.vertex(295, 346);
  brush.vertex(320, 312);
  brush.vertex(338, 272);
  brush.vertex(350, 235);
  brush.vertex(365, 248);
  brush.vertex(362, 294);
  brush.vertex(345, 340);
  brush.vertex(326, 383);
  brush.vertex(302, 410);
  brush.vertex(278, 402);
  brush.endShape(true);

  // Light hatch accents for form
  brush.hatch(8, 25, { rand: 0.12, gradient: 0.25 });
  brush.hatchStyle("2B", "#2f2a27", 0.65);
  brush.noFill();
  brush.beginShape(0.35);
  brush.vertex(292, 248);
  brush.vertex(336, 218);
  brush.vertex(360, 250);
  brush.vertex(338, 320);
  brush.vertex(298, 374);
  brush.vertex(270, 352);
  brush.endShape(true);
  brush.noHatch();

  // Grounding marks beneath implied landing path
  brush.set("cpencil", "#7a726b", 0.65);
  for (let i = 0; i < 9; i++) {
    let x = 205 + i * 28 + random(-6, 6);
    let y = 560 + random(-4, 4);
    brush.line(x - 18, y, x + 18, y + random(-2, 2));
  }

  // Final dark accents
  brush.set("2B", "#120f0e", 0.95);
  brush.line(350, 146, 360, 148);
  brush.line(349, 170, 343, 184);
  brush.line(531, 218, 548, 210);
  brush.line(118, 555, 100, 563);

  noLoop();
}