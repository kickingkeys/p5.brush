function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- smudge trails behind the motion ---
  brush.field("hand");
  brush.wiggle(5);

  // heavy smudge mass trailing left and below
  brush.mass("crayon", "#2a2a2a", { strength: 0.85, precision: 0.2, gradient: 0.5 });
  brush.noStroke();
  brush.beginShape(0.55);
  brush.vertex(160, 370);
  brush.vertex(110, 340);
  brush.vertex(80,  310);
  brush.vertex(70,  280);
  brush.vertex(90,  260);
  brush.vertex(130, 270);
  brush.vertex(160, 300);
  brush.vertex(180, 330);
  brush.vertex(185, 360);
  brush.endShape(true);
  brush.noMass();

  // secondary smudge — lighter, wider
  brush.mass("pastel", "#3c3c3c", { strength: 0.55, precision: 0.15, gradient: 0.7 });
  brush.beginShape(0.6);
  brush.vertex(100, 400);
  brush.vertex(60,  370);
  brush.vertex(45,  335);
  brush.vertex(55,  300);
  brush.vertex(85,  295);
  brush.vertex(120, 310);
  brush.vertex(145, 345);
  brush.vertex(150, 380);
  brush.endShape(true);
  brush.noMass();

  // faint smear extending further left
  brush.mass("pastel", "#555555", { strength: 0.30, precision: 0.1, gradient: 0.8 });
  brush.beginShape(0.65);
  brush.vertex(55,  430);
  brush.vertex(20,  400);
  brush.vertex(10,  365);
  brush.vertex(25,  335);
  brush.vertex(60,  340);
  brush.vertex(85,  365);
  brush.vertex(90,  400);
  brush.endShape(true);
  brush.noMass();

  brush.noField();

  // --- torso mass ---
  brush.field("hand");
  brush.wiggle(3);

  brush.mass("crayon", "#1e1e1e", { strength: 0.75, precision: 0.4, gradient: 0.3, outline: true });
  brush.noStroke();
  brush.beginShape(0.45);
  brush.vertex(270, 240);
  brush.vertex(255, 210);
  brush.vertex(260, 185);
  brush.vertex(280, 175);
  brush.vertex(310, 178);
  brush.vertex(330, 195);
  brush.vertex(335, 220);
  brush.vertex(325, 250);
  brush.vertex(310, 270);
  brush.vertex(285, 275);
  brush.endShape(true);
  brush.noMass();

  // mid-tone hatch over torso
  brush.hatchStyle("charcoal", "#2a2a2a", 1.1);
  brush.hatch(5, 55, { rand: 0.18, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(270, 240);
  brush.vertex(255, 210);
  brush.vertex(260, 185);
  brush.vertex(280, 175);
  brush.vertex(310, 178);
  brush.vertex(330, 195);
  brush.vertex(335, 220);
  brush.vertex(325, 250);
  brush.vertex(310, 270);
  brush.vertex(285, 275);
  brush.endShape(true);
  brush.noHatch();

  // --- hips / pelvis ---
  brush.mass("crayon", "#252525", { strength: 0.70, precision: 0.38, gradient: 0.4 });
  brush.beginShape(0.45);
  brush.vertex(265, 275);
  brush.vertex(250, 295);
  brush.vertex(248, 320);
  brush.vertex(260, 340);
  brush.vertex(285, 350);
  brush.vertex(315, 345);
  brush.vertex(335, 325);
  brush.vertex(338, 300);
  brush.vertex(325, 278);
  brush.vertex(300, 270);
  brush.endShape(true);
  brush.noMass();

  brush.noField();

  // --- leaping leg — extended forward-up (right leg) ---
  brush.field("hand");
  brush.wiggle(4);

  // thigh
  brush.set("charcoal", "#1a1a1a", 1.4);
  brush.spline([
    [310, 340, 1.2],
    [355, 300, 1.0],
    [400, 265, 0.85],
    [440, 240, 0.65],
    [470, 220, 0.4]
  ], 0.45);

  // shin / calf
  brush.set("charcoal", "#1a1a1a", 1.0);
  brush.spline([
    [470, 220, 0.6],
    [495, 200, 0.55],
    [510, 185, 0.45],
    [520, 175, 0.35]
  ], 0.4);

  // foot pointed
  brush.set("charcoal", "#222", 0.8);
  brush.spline([
    [520, 175, 0.4],
    [535, 165, 0.35],
    [548, 160, 0.25]
  ], 0.35);

  // --- trailing leg — kicked back (left leg) ---
  // upper leg going back-down
  brush.set("charcoal", "#1e1e1e", 1.5);
  brush.spline([
    [268, 345, 1.3],
    [230, 370, 1.1],
    [195, 390, 0.95],
    [165, 405, 0.75],
    [140, 415, 0.55]
  ], 0.5);

  // lower leg angled upward (knee bend)
  brush.set("charcoal", "#1e1e1e", 1.1);
  brush.spline([
    [140, 415, 0.7],
    [120, 395, 0.65],
    [108, 372, 0.55],
    [100, 350, 0.4]
  ], 0.45);

  // foot trailing
  brush.set("charcoal", "#222", 0.75);
  brush.spline([
    [100, 350, 0.4],
    [88,  338, 0.35],
    [76,  330, 0.25]
  ], 0.35);

  brush.noField();

  // --- arms ---
  brush.field("hand");
  brush.wiggle(4);

  // right arm — sweeping upward-right
  brush.set("charcoal", "#1c1c1c", 1.2);
  brush.spline([
    [325, 210, 0.9],
    [360, 185, 0.8],
    [395, 160, 0.7],
    [430, 140, 0.55],
    [460, 125, 0.4],
    [485, 118, 0.3]
  ], 0.5);

  // left arm — trailing behind and down
  brush.set("charcoal", "#1c1c1c", 1.1);
  brush.spline([
    [265, 215, 0.9],
    [235, 210, 0.8],
    [205, 215, 0.7],
    [175, 228, 0.6],
    [150, 245, 0.45],
    [130, 260, 0.3]
  ], 0.5);

  brush.noField();

  // --- head ---
  brush.field("hand");
  brush.wiggle(2);

  brush.mass("crayon", "#1e1e1e", { strength: 0.60, precision: 0.55, gradient: 0.2 });
  brush.noStroke();
  // head tilted back in leap
  brush.beginShape(0.5);
  brush.vertex(278, 160);
  brush.vertex(275, 145);
  brush.vertex(280, 130);
  brush.vertex(292, 120);
  brush.vertex(308, 118);
  brush.vertex(322, 125);
  brush.vertex(328, 140);
  brush.vertex(325, 158);
  brush.vertex(312, 168);
  brush.vertex(293, 168);
  brush.endShape(true);
  brush.noMass();

  // hair — loose gestural strokes
  brush.set("2B", "#111", 1.3);
  brush.spline([
    [278, 130, 0.8],
    [270, 118, 0.7],
    [265, 105, 0.55],
    [272, 95,  0.4]
  ], 0.5);
  brush.spline([
    [295, 120, 0.7],
    [290, 106, 0.6],
    [288, 92,  0.45]
  ], 0.45);
  brush.spline([
    [315, 122, 0.7],
    [320, 108, 0.6],
    [325, 95,  0.45],
    [330, 85,  0.3]
  ], 0.45);

  brush.noField();

  // --- gestural motion lines (velocity marks) ---
  brush.field("hand");
  brush.wiggle(6);

  brush.set("charcoal", "#555", 0.6);
  // sweeping arcs suggesting upward motion
  brush.spline([
    [200, 450, 0.5],
    [230, 400, 0.45],
    [265, 355, 0.4],
    [295, 320, 0.3]
  ], 0.55);

  brush.set("charcoal", "#666", 0.5);
  brush.spline([
    [170, 460, 0.45],
    [205, 415, 0.4],
    [240, 375, 0.35],
    [270, 340, 0.25]
  ], 0.55);

  brush.set("charcoal", "#777", 0.4);
  brush.spline([
    [145, 470, 0.4],
    [175, 430, 0.35],
    [210, 395, 0.3],
    [240, 362, 0.2]
  ], 0.55);

  // horizontal speed lines behind trailing leg
  brush.set("2B", "#444", 0.7);
  brush.spline([
    [40,  310, 0.5],
    [80,  305, 0.45],
    [120, 308, 0.35],
    [155, 318, 0.25]
  ], 0.35);

  brush.set("2B", "#555", 0.55);
  brush.spline([
    [30,  330, 0.45],
    [70,  328, 0.4],
    [110, 330, 0.3],
    [145, 338, 0.2]
  ], 0.35);

  brush.set("charcoal", "#666", 0.45);
  brush.spline([
    [25,  350, 0.4],
    [60,  350, 0.35],
    [95,  352, 0.28],
    [128, 358, 0.18]
  ], 0.35);

  brush.noField();

  // --- loose cross-hatch shadow under figure ---
  brush.hatchStyle("charcoal", "#3a3a3a", 0.9);
  brush.hatch(7, 30, { rand: 0.2, continuous: false });
  brush.noStroke();
  brush.beginShape(0.5);
  brush.vertex(200, 430);
  brush.vertex(180, 450);
  brush.vertex(190, 470);
  brush.vertex(230, 480);
  brush.vertex(310, 475);
  brush.vertex(370, 465);
  brush.vertex(380, 445);
  brush.vertex(350, 432);
  brush.vertex(280, 428);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#4a4a4a", 0.7);
  brush.hatch(9, 100, { rand: 0.15, continuous: false });
  brush.beginShape(0.5);
  brush.vertex(200, 430);
  brush.vertex(180, 450);
  brush.vertex(190, 470);
  brush.vertex(230, 480);
  brush.vertex(310, 475);
  brush.vertex(370, 465);
  brush.vertex(380, 445);
  brush.vertex(350, 432);
  brush.vertex(280, 428);
  brush.endShape(true);
  brush.noHatch();

  // --- final contour reinforcement ---
  brush.field("hand");
  brush.wiggle(3);

  brush.set("charcoal", "#111", 1.6);
  // torso outline
  brush.spline([
    [270, 240, 1.0],
    [258, 210, 0.9],
    [262, 185, 0.85],
    [282, 175, 0.8],
    [312, 178, 0.85],
    [332, 196, 0.9],
    [335, 222, 0.95],
    [323, 252, 0.9],
    [308, 272, 0.85],
    [283, 276, 0.8],
    [266, 270, 0.75]
  ], 0.4);

  brush.set("charcoal", "#111", 1.4);
  // hip outline
  brush.spline([
    [263, 278, 0.9],
    [249, 298, 0.85],
    [248, 322, 0.9],
    [262, 342, 0.95],
    [287, 352, 1.0],
    [317, 347, 0.95],
    [337, 327, 0.9],
    [340, 302, 0.85],
    [326, 280, 0.8]
  ], 0.4);

  brush.noField();

  noLoop();
}