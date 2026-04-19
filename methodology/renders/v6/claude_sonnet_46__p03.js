function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Paper warm tone already set in setup via background

  // === SMUDGE TRAILS behind the dancer ===
  // Heavy atmospheric smudge trailing left (motion direction: leaping right and up)

  brush.field("hand");
  brush.wiggle(5);

  // Broad smear layer 1 - leftward trail
  brush.mass("crayon", "#b0aba2", {
    strength: 0.35,
    precision: 0.2,
    gradient: 0.7,
    outline: false
  });
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(60, 340);
  brush.vertex(110, 290);
  brush.vertex(170, 310);
  brush.vertex(200, 360);
  brush.vertex(180, 410);
  brush.vertex(120, 420);
  brush.vertex(70, 400);
  brush.endShape(true);
  brush.noMass();

  // Smear layer 2 - darker smudge core
  brush.mass("pastel", "#7a7570", {
    strength: 0.55,
    precision: 0.15,
    gradient: 0.6,
    outline: false
  });
  brush.beginShape(0.5);
  brush.vertex(80, 340);
  brush.vertex(130, 305);
  brush.vertex(165, 320);
  brush.vertex(175, 365);
  brush.vertex(155, 400);
  brush.vertex(100, 405);
  brush.vertex(75, 375);
  brush.endShape(true);
  brush.noMass();

  // Smear layer 3 - motion blur streaks
  brush.mass("pastel", "#555050", {
    strength: 0.4,
    precision: 0.1,
    gradient: 0.8,
    outline: false
  });
  brush.beginShape(0.4);
  brush.vertex(55, 320);
  brush.vertex(90, 280);
  brush.vertex(140, 295);
  brush.vertex(160, 340);
  brush.vertex(145, 385);
  brush.vertex(90, 390);
  brush.vertex(55, 355);
  brush.endShape(true);
  brush.noMass();

  brush.noField();

  // === DANCER FIGURE ===
  // The dancer leaps toward upper right, body arched

  brush.field("hand");
  brush.wiggle(3);

  // --- TORSO ---
  // Main torso mass
  brush.mass("crayon", "#2a2520", {
    strength: 0.72,
    precision: 0.45,
    gradient: 0.3,
    outline: false
  });
  brush.hatchStyle("charcoal", "#1a1510", 1.2);
  brush.hatch(6, 55, { rand: 0.18, continuous: true });
  brush.beginShape(0.45);
  brush.vertex(300, 230);
  brush.vertex(330, 210);
  brush.vertex(355, 220);
  brush.vertex(365, 255);
  brush.vertex(355, 290);
  brush.vertex(330, 305);
  brush.vertex(305, 295);
  brush.vertex(290, 265);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Torso highlight - lighter pass
  brush.hatchStyle("charcoal", "#4a4540", 0.7);
  brush.hatch(9, 120, { rand: 0.1, continuous: true });
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(308, 238);
  brush.vertex(325, 225);
  brush.vertex(342, 232);
  brush.vertex(348, 252);
  brush.vertex(340, 270);
  brush.vertex(322, 278);
  brush.vertex(308, 268);
  brush.vertex(302, 252);
  brush.endShape(true);
  brush.noHatch();

  // --- HEAD ---
  brush.mass("crayon", "#2a2520", {
    strength: 0.65,
    precision: 0.5,
    gradient: 0.25,
    outline: false
  });
  brush.beginShape(0.5);
  brush.vertex(330, 175);
  brush.vertex(348, 165);
  brush.vertex(362, 172);
  brush.vertex(368, 190);
  brush.vertex(360, 205);
  brush.vertex(342, 210);
  brush.vertex(328, 200);
  brush.vertex(323, 185);
  brush.endShape(true);
  brush.noMass();

  // Hair gestural marks
  brush.set("charcoal", "#111008", 1.8);
  brush.spline([[328, 175], [335, 162], [348, 155], [362, 160], [370, 172]], 0.5);
  brush.set("charcoal", "#1a1510", 1.4);
  brush.spline([[325, 182], [318, 168], [330, 155], [345, 150]], 0.4);
  brush.set("charcoal", "#222018", 1.0);
  brush.spline([[360, 165], [372, 155], [380, 160]], 0.3);

  // --- LEAPING LEFT LEG (extended back-left, trailing) ---
  // Upper left leg sweeping back
  brush.mass("crayon", "#252018", {
    strength: 0.68,
    precision: 0.38,
    gradient: 0.4,
    outline: false
  });
  brush.hatchStyle("charcoal", "#1a1510", 1.0);
  brush.hatch(5, 80, { rand: 0.2, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(305, 295);
  brush.vertex(285, 310);
  brush.vertex(255, 330);
  brush.vertex(220, 355);
  brush.vertex(205, 370);
  brush.vertex(215, 385);
  brush.vertex(240, 375);
  brush.vertex(270, 350);
  brush.vertex(305, 322);
  brush.vertex(325, 308);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Lower left leg kicking back
  brush.mass("crayon", "#2a2520", {
    strength: 0.60,
    precision: 0.35,
    gradient: 0.5,
    outline: false
  });
  brush.beginShape(0.4);
  brush.vertex(205, 370);
  brush.vertex(185, 390);
  brush.vertex(165, 415);
  brush.vertex(148, 438);
  brush.vertex(155, 450);
  brush.vertex(170, 448);
  brush.vertex(190, 428);
  brush.vertex(215, 405);
  brush.vertex(230, 385);
  brush.vertex(220, 375);
  brush.endShape(true);
  brush.noMass();

  // --- LEAPING RIGHT LEG (extended forward-up) ---
  brush.mass("crayon", "#222018", {
    strength: 0.70,
    precision: 0.42,
    gradient: 0.35,
    outline: false
  });
  brush.hatchStyle("charcoal", "#181510", 1.1);
  brush.hatch(5, 100, { rand: 0.18, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(330, 305);
  brush.vertex(350, 320);
  brush.vertex(375, 340);
  brush.vertex(400, 355);
  brush.vertex(420, 360);
  brush.vertex(435, 350);
  brush.vertex(430, 335);
  brush.vertex(408, 330);
  brush.vertex(382, 318);
  brush.vertex(355, 300);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Lower right leg angled up-right (split leap)
  brush.mass("crayon", "#2a2520", {
    strength: 0.62,
    precision: 0.38,
    gradient: 0.4,
    outline: false
  });
  brush.beginShape(0.4);
  brush.vertex(420, 360);
  brush.vertex(440, 375);
  brush.vertex(455, 400);
  brush.vertex(462, 425);
  brush.vertex(472, 432);
  brush.vertex(485, 428);
  brush.vertex(480, 412);
  brush.vertex(468, 390);
  brush.vertex(452, 368);
  brush.vertex(436, 350);
  brush.endShape(true);
  brush.noMass();

  // --- LEFT ARM (sweeping back-down) ---
  brush.mass("crayon", "#252018", {
    strength: 0.58,
    precision: 0.40,
    gradient: 0.45,
    outline: false
  });
  brush.beginShape(0.4);
  brush.vertex(300, 240);
  brush.vertex(275, 255);
  brush.vertex(248, 278);
  brush.vertex(222, 305);
  brush.vertex(205, 325);
  brush.vertex(212, 338);
  brush.vertex(228, 332);
  brush.vertex(252, 308);
  brush.vertex(278, 282);
  brush.vertex(305, 258);
  brush.endShape(true);
  brush.noMass();

  // Hand left
  brush.set("charcoal", "#1a1510", 1.5);
  brush.spline([[205, 325], [195, 340], [185, 352], [178, 360]], 0.5);
  brush.set("charcoal", "#222018", 1.1);
  brush.spline([[200, 330], [190, 348], [183, 365]], 0.4);

  // --- RIGHT ARM (reaching forward-up) ---
  brush.mass("crayon", "#222018", {
    strength: 0.60,
    precision: 0.42,
    gradient: 0.4,
    outline: false
  });
  brush.beginShape(0.4);
  brush.vertex(355, 228);
  brush.vertex(378, 215);
  brush.vertex(405, 200);
  brush.vertex(428, 185);
  brush.vertex(445, 175);
  brush.vertex(448, 160);
  brush.vertex(435, 155);
  brush.vertex(415, 165);
  brush.vertex(390, 180);
  brush.vertex(365, 196);
  brush.vertex(348, 210);
  brush.endShape(true);
  brush.noMass();

  // Hand right - reaching fingers
  brush.set("charcoal", "#1a1510", 1.4);
  brush.spline([[445, 175], [458, 162], [470, 150], [480, 142]], 0.5);
  brush.set("charcoal", "#222018", 1.0);
  brush.spline([[448, 168], [462, 155], [472, 145]], 0.4);
  brush.set("charcoal", "#2a2520", 0.9);
  brush.spline([[442, 172], [455, 165], [465, 162]], 0.3);

  // === GESTURAL CHARCOAL LINES over figure ===
  // These add the loose, gestural quality of a quick figure study

  brush.noField();
  brush.field("hand");
  brush.wiggle(4);

  // Main body gesture line
  brush.set("charcoal", "#111008", 2.2);
  brush.spline([
    [340, 195],
    [345, 225],
    [340, 260],
    [328, 290],
    [310, 315],
    [285, 335],
    [255, 355],
    [220, 375]
  ], 0.45);

  // Right arm gesture
  brush.set("charcoal", "#1a1510", 1.8);
  brush.spline([
    [355, 230],
    [385, 210],
    [415, 192],
    [445, 175],
    [468, 158],
    [478, 148]
  ], 0.4);

  // Right leg gesture
  brush.set("charcoal", "#181510", 1.9);
  brush.spline([
    [338, 300],
    [368, 325],
    [400, 348],
    [430, 360],
    [455, 385],
    [468, 415],
    [475, 438]
  ], 0.4);

  // Left leg gesture
  brush.set("charcoal", "#1a1510", 1.7);
  brush.spline([
    [308, 300],
    [272, 328],
    [238, 355],
    [210, 378],
    [185, 408],
    [158, 440],
    [148, 455]
  ], 0.45);

  // Spine arc - arched leap
  brush.set("charcoal", "#0d0c08", 1.5);
  brush.spline([
    [332, 205],
    [336, 240],
    [330, 272],
    [318, 298]
  ], 0.5);

  // === SMUDGE TRAILS - gestural motion marks ===
  // Horizontal smear lines suggesting speed

  brush.wiggle(6);

  // Heavy smear strokes trailing left
  brush.set("charcoal", "#3a3530", 2.5);
  brush.spline([[260, 280], [200, 285], [145, 292], [95, 300], [55, 308]], 0.3);

  brush.set("charcoal", "#2a2520", 2.0);
  brush.spline([[240, 310], [185, 318], [130, 325], [80, 332]], 0.3);

  brush.set("charcoal", "#333028", 1.8);
  brush.spline([[255, 260], [200, 265], [150, 270], [100, 278], [60, 285]], 0.25);

  brush.set("charcoal", "#3a3530", 1.5);
  brush.spline([[245, 340], [195, 348], [145, 358], [95, 368], [58, 378]], 0.3);

  brush.set("charcoal", "#2a2520", 1.2);
  brush.spline([[230, 365], [180, 374], [130, 382], [85, 390]], 0.25);

  // Lighter speed smears higher up
  brush.set("charcoal", "#4a4540", 1.0);
  brush.spline([[280, 235], [225, 238], [170, 242], [120, 248]], 0.2);

  brush.set("charcoal", "#555048", 0.8);
  brush.spline([[270, 215], [215, 218], [165, 222], [115, 228]], 0.2);

  // === ADDITIONAL TEXTURE - hatching on shadow areas ===

  brush.noField();
  brush.wiggle(2);

  // Shadow hatch under torso
  brush.hatchStyle("charcoal", "#181510", 1.3);
  brush.hatch(4, 65, { rand: 0.22, continuous: true });
  brush.noStroke();
  brush.beginShape(0.3);
  brush.vertex(295, 270);
  brush.vertex(315, 265);
  brush.vertex(340, 272);
  brush.vertex(355, 285);
  brush.vertex(348, 300);
  brush.vertex(325, 308);
  brush.vertex(300, 300);
  brush.vertex(288, 285);
  brush.endShape(true);
  brush.noHatch();

  // Shadow hatch on trailing leg
  brush.hatchStyle("charcoal", "#1a1510", 1.1);
  brush.hatch(5, 85, { rand: 0.2, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(205, 370);
  brush.vertex(185, 395);
  brush.vertex(168, 422);
  brush.vertex(158, 445);
  brush.vertex(168, 450);
  brush.vertex(185, 432);
  brush.vertex(205, 410);
  brush.vertex(222, 385);
  brush.endShape(true);
  brush.noHatch();

  // === LOOSE GESTURAL MARKS - final layer ===
  // Quick gestural strokes for energy

  brush.field("hand");
  brush.wiggle(5);

  brush.set("charcoal", "#0d0c08", 3.0);
  brush.spline([
    [308, 298],
    [290, 320],
    [268, 348],
    [242, 372],
    [218, 395],
    [195, 418],
    [172, 442]
  ], 0.5);

  brush.set("charcoal", "#111008", 2.5);
  brush.spline([
    [355, 298],
    [380, 322],
    [408, 348],
    [432, 368],
    [450, 392],
    [462, 418],
    [470, 440]
  ], 0.5);

  // Final accent - dark smudge at center of gravity
  brush.set("charcoal", "#080706", 3.5);
  brush.spline([
    [318, 250],
    [328, 268],
    [332, 288],
    [328, 305]
  ], 0.6);

  brush.noField();
  brush.noStroke();
  brush.noFill();
  brush.noHatch();
  brush.noMass();

  noLoop();
}