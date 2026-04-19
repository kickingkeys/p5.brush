function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Smear/trail behind the leap ---
  brush.field("hand");
  brush.wiggle(5);

  // Heavy smudge trails - wide sweeping masses behind the figure
  brush.mass("crayon", "#2a2520", {
    strength: 0.85,
    precision: 0.18,
    gradient: 0.55,
    outline: false
  });

  // Left trailing smear (behind the back leg)
  brush.beginShape(0.55);
  brush.vertex(80, 310);
  brush.vertex(130, 290);
  brush.vertex(175, 305);
  brush.vertex(200, 330);
  brush.vertex(185, 360);
  brush.vertex(140, 370);
  brush.vertex(90, 355);
  brush.vertex(70, 335);
  brush.endShape(true);

  // Upper body trailing smear
  brush.beginShape(0.5);
  brush.vertex(110, 195);
  brush.vertex(155, 175);
  brush.vertex(200, 185);
  brush.vertex(215, 210);
  brush.vertex(195, 235);
  brush.vertex(150, 240);
  brush.vertex(105, 225);
  brush.endShape(true);

  brush.noMass();

  // Lighter secondary smears - motion blur effect
  brush.mass("pastel", "#3d3530", {
    strength: 0.5,
    precision: 0.25,
    gradient: 0.7,
    outline: false
  });

  brush.beginShape(0.6);
  brush.vertex(60, 270);
  brush.vertex(105, 255);
  brush.vertex(140, 268);
  brush.vertex(155, 295);
  brush.vertex(130, 320);
  brush.vertex(80, 318);
  brush.vertex(55, 298);
  brush.endShape(true);

  brush.noMass();

  // --- Hatch shading for depth and smudge texture ---
  brush.hatchStyle("charcoal", "#1a1510", 1.8);
  brush.hatch(5, 35, { rand: 0.22, continuous: true });

  // Torso shadow zone
  brush.beginShape(0.4);
  brush.vertex(265, 200);
  brush.vertex(300, 185);
  brush.vertex(335, 200);
  brush.vertex(345, 235);
  brush.vertex(325, 265);
  brush.vertex(285, 270);
  brush.vertex(258, 248);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("charcoal", "#2a2520", 1.2);
  brush.hatch(7, 110, { rand: 0.18, continuous: true });

  // Hip/pelvis shadow
  brush.beginShape(0.4);
  brush.vertex(270, 275);
  brush.vertex(310, 265);
  brush.vertex(340, 280);
  brush.vertex(345, 315);
  brush.vertex(315, 330);
  brush.vertex(275, 325);
  brush.vertex(258, 305);
  brush.endShape(true);
  brush.noHatch();

  // --- Figure body: core charcoal mass ---
  brush.mass("crayon", "#1e1a16", {
    strength: 0.75,
    precision: 0.38,
    gradient: 0.3,
    outline: true
  });

  // Torso
  brush.beginShape(0.45);
  brush.vertex(258, 195);
  brush.vertex(295, 178);
  brush.vertex(335, 192);
  brush.vertex(348, 230);
  brush.vertex(340, 268);
  brush.vertex(305, 280);
  brush.vertex(265, 268);
  brush.vertex(250, 232);
  brush.endShape(true);

  brush.noMass();

  // Pelvis / hip mass
  brush.mass("crayon", "#211d19", {
    strength: 0.7,
    precision: 0.42,
    gradient: 0.25,
    outline: false
  });

  brush.beginShape(0.45);
  brush.vertex(262, 272);
  brush.vertex(305, 262);
  brush.vertex(345, 275);
  brush.vertex(352, 318);
  brush.vertex(325, 340);
  brush.vertex(285, 345);
  brush.vertex(255, 330);
  brush.vertex(248, 298);
  brush.endShape(true);

  brush.noMass();

  // --- Extended leap leg (front leg, thrust forward and up) ---
  brush.mass("pastel", "#252018", {
    strength: 0.65,
    precision: 0.35,
    gradient: 0.4,
    outline: false
  });

  // Front thigh - angling up-right
  brush.beginShape(0.5);
  brush.vertex(330, 315);
  brush.vertex(365, 295);
  brush.vertex(405, 300);
  brush.vertex(440, 320);
  brush.vertex(450, 355);
  brush.vertex(415, 375);
  brush.vertex(370, 365);
  brush.vertex(335, 345);
  brush.endShape(true);

  // Front shin/lower leg continuing the arc
  brush.beginShape(0.5);
  brush.vertex(440, 315);
  brush.vertex(475, 295);
  brush.vertex(515, 290);
  brush.vertex(540, 310);
  brush.vertex(545, 345);
  brush.vertex(520, 368);
  brush.vertex(480, 370);
  brush.vertex(445, 352);
  brush.endShape(true);

  brush.noMass();

  // --- Back leg (trailing behind, bent at knee) ---
  brush.mass("pastel", "#231f1b", {
    strength: 0.62,
    precision: 0.32,
    gradient: 0.45,
    outline: false
  });

  // Back thigh sweeping behind
  brush.beginShape(0.5);
  brush.vertex(260, 330);
  brush.vertex(230, 345);
  brush.vertex(195, 360);
  brush.vertex(170, 388);
  brush.vertex(172, 418);
  brush.vertex(200, 430);
  brush.vertex(235, 415);
  brush.vertex(258, 385);
  brush.vertex(268, 355);
  brush.endShape(true);

  // Back lower leg - kicked up behind (bent knee)
  brush.beginShape(0.5);
  brush.vertex(172, 415);
  brush.vertex(155, 390);
  brush.vertex(148, 360);
  brush.vertex(158, 330);
  brush.vertex(182, 315);
  brush.vertex(210, 318);
  brush.vertex(225, 342);
  brush.vertex(215, 372);
  brush.vertex(195, 400);
  brush.endShape(true);

  brush.noMass();

  // --- Arms: outstretched for balance ---
  // Left arm reaching back-left
  brush.mass("crayon", "#1e1b17", {
    strength: 0.6,
    precision: 0.4,
    gradient: 0.5,
    outline: false
  });

  brush.beginShape(0.55);
  brush.vertex(262, 210);
  brush.vertex(235, 198);
  brush.vertex(200, 190);
  brush.vertex(165, 195);
  brush.vertex(135, 210);
  brush.vertex(118, 232);
  brush.vertex(128, 252);
  brush.vertex(155, 255);
  brush.vertex(190, 242);
  brush.vertex(228, 230);
  brush.vertex(258, 228);
  brush.endShape(true);

  // Right arm reaching forward-right and up
  brush.beginShape(0.55);
  brush.vertex(338, 205);
  brush.vertex(368, 188);
  brush.vertex(402, 175);
  brush.vertex(438, 168);
  brush.vertex(468, 172);
  brush.vertex(488, 190);
  brush.vertex(480, 212);
  brush.vertex(452, 218);
  brush.vertex(418, 210);
  brush.vertex(380, 215);
  brush.vertex(348, 225);
  brush.endShape(true);

  brush.noMass();

  // --- Head ---
  brush.mass("crayon", "#201c18", {
    strength: 0.65,
    precision: 0.5,
    gradient: 0.2,
    outline: true
  });

  brush.beginShape(0.5);
  brush.vertex(285, 155);
  brush.vertex(305, 142);
  brush.vertex(325, 148);
  brush.vertex(335, 165);
  brush.vertex(328, 185);
  brush.vertex(308, 192);
  brush.vertex(288, 185);
  brush.vertex(278, 168);
  brush.endShape(true);

  brush.noMass();

  // --- Gestural charcoal strokes over the whole figure for looseness ---
  brush.set("charcoal", "#111008", 1.4);

  // Spine gesture line - sweeping arc of the leap
  brush.spline([
    [300, 162],
    [298, 195],
    [295, 240],
    [300, 285],
    [308, 330]
  ], 0.45);

  // Left arm gesture
  brush.spline([
    [258, 218],
    [215, 205],
    [168, 202],
    [130, 222]
  ], 0.4);

  // Right arm gesture
  brush.spline([
    [342, 212],
    [390, 180],
    [448, 170],
    [485, 195]
  ], 0.4);

  // Front leg gesture
  brush.spline([
    [308, 340],
    [370, 320],
    [430, 330],
    [500, 310],
    [542, 330]
  ], 0.42);

  // Back leg gesture
  brush.spline([
    [265, 345],
    [215, 375],
    [178, 405],
    [158, 368],
    [168, 330]
  ], 0.42);

  // --- Additional loose smear strokes for motion/smudge feel ---
  brush.set("charcoal", "#1a1510", 2.2);

  // Wide gestural smear lines behind the figure (motion blur)
  brush.spline([
    [55, 280],
    [105, 265],
    [155, 272],
    [200, 260],
    [245, 250]
  ], 0.35);

  brush.spline([
    [65, 320],
    [115, 308],
    [165, 315],
    [210, 305],
    [250, 295]
  ], 0.35);

  brush.spline([
    [75, 355],
    [120, 340],
    [168, 348],
    [210, 340],
    [252, 330]
  ], 0.35);

  // Loose head/neck strokes
  brush.set("charcoal", "#0f0d0a", 1.0);
  brush.spline([
    [300, 190],
    [302, 200],
    [300, 215]
  ], 0.3);

  // --- Sparse hatch for shadow depth on torso ---
  brush.hatchStyle("2B", "#161210", 1.5);
  brush.hatch(4, 58, { rand: 0.15, continuous: false });

  brush.beginShape(0.4);
  brush.vertex(268, 205);
  brush.vertex(295, 195);
  brush.vertex(320, 205);
  brush.vertex(328, 228);
  brush.vertex(310, 248);
  brush.vertex(278, 248);
  brush.vertex(260, 228);
  brush.endShape(true);

  brush.noHatch();

  // Cross-hatch on back thigh for depth
  brush.hatchStyle("charcoal", "#1a1510", 1.1);
  brush.hatch(6, 80, { rand: 0.2, continuous: true });

  brush.beginShape(0.45);
  brush.vertex(192, 360);
  brush.vertex(220, 348);
  brush.vertex(248, 358);
  brush.vertex(252, 385);
  brush.vertex(232, 408);
  brush.vertex(200, 412);
  brush.vertex(178, 395);
  brush.vertex(175, 370);
  brush.endShape(true);

  brush.noHatch();

  brush.noField();
  noLoop();
}