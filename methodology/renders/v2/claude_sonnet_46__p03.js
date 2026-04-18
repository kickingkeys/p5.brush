function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Smear / motion trails behind the leap ---
  brush.field("hand");
  brush.wiggle(5);

  // Heavy smudge trails — wide charcoal sweeps flowing backward
  brush.set("charcoal", "#1a1a1a", 2.8);
  brush.spline([[60, 420], [110, 370], [170, 310], [230, 270], [280, 240]], 0.5);

  brush.set("charcoal", "#2a2a2a", 2.2);
  brush.spline([[50, 450], [100, 400], [160, 345], [220, 295], [275, 260]], 0.5);

  brush.set("charcoal", "#333", 1.6);
  brush.spline([[40, 480], [90, 430], [155, 375], [215, 320], [270, 280]], 0.45);

  // Lighter smear wisps
  brush.set("charcoal", "#555", 1.0);
  brush.spline([[70, 460], [130, 405], [195, 355], [255, 305]], 0.4);

  brush.set("charcoal", "#666", 0.7);
  brush.spline([[55, 490], [115, 440], [180, 390], [240, 340]], 0.4);

  brush.set("charcoal", "#888", 0.5);
  brush.spline([[80, 500], [140, 450], [200, 400], [255, 355]], 0.35);

  brush.noField();

  // --- Mass fills for body zones ---
  brush.wiggle(3);
  brush.field("hand");

  // Torso — dark anchoring mass
  brush.mass("crayon", "#111111", { strength: 0.85, precision: 0.35, gradient: 0.4, outline: true });
  brush.hatchStyle("charcoal", "#1a1a1a", 1.8);
  brush.hatch(5, 60, { rand: 0.18, continuous: true });
  brush.beginShape(0.35);
  brush.vertex(290, 255);
  brush.vertex(310, 240);
  brush.vertex(335, 245);
  brush.vertex(350, 265);
  brush.vertex(355, 295);
  brush.vertex(345, 325);
  brush.vertex(325, 340);
  brush.vertex(305, 338);
  brush.vertex(288, 320);
  brush.vertex(282, 295);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Hip / pelvis
  brush.mass("pastel", "#222222", { strength: 0.75, precision: 0.4, gradient: 0.35 });
  brush.hatchStyle("charcoal", "#222", 1.5);
  brush.hatch(6, 80, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(288, 320);
  brush.vertex(305, 338);
  brush.vertex(325, 340);
  brush.vertex(345, 325);
  brush.vertex(358, 340);
  brush.vertex(355, 365);
  brush.vertex(338, 378);
  brush.vertex(310, 380);
  brush.vertex(290, 368);
  brush.vertex(282, 348);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Head ---
  brush.noField();
  brush.mass("crayon", "#1a1a1a", { strength: 0.65, precision: 0.5, gradient: 0.2, outline: true });
  brush.hatchStyle("charcoal", "#222", 1.2);
  brush.hatch(7, 40, { rand: 0.12 });
  brush.beginShape(0.5);
  brush.vertex(318, 195);
  brush.vertex(332, 188);
  brush.vertex(348, 190);
  brush.vertex(358, 202);
  brush.vertex(360, 218);
  brush.vertex(352, 232);
  brush.vertex(336, 238);
  brush.vertex(320, 233);
  brush.vertex(312, 220);
  brush.vertex(313, 207);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Neck
  brush.set("charcoal", "#1a1a1a", 1.4);
  brush.spline([[330, 238], [328, 248], [324, 255]], 0.3);

  // --- Outstretched arms ---
  brush.field("hand");
  brush.wiggle(4);

  // Leading arm — reaching forward-up
  brush.set("charcoal", "#111", 1.8);
  brush.spline([[310, 258], [340, 235], [375, 215], [415, 200], [455, 192], [490, 188]], 0.4);

  brush.set("charcoal", "#2a2a2a", 1.3);
  brush.spline([[315, 265], [348, 243], [382, 224], [420, 210], [458, 200], [492, 196]], 0.4);

  // Trailing arm — sweeping behind
  brush.set("charcoal", "#1a1a1a", 1.7);
  brush.spline([[296, 268], [268, 258], [238, 252], [205, 248], [172, 250], [145, 258]], 0.4);

  brush.set("charcoal", "#333", 1.1);
  brush.spline([[293, 278], [265, 268], [235, 262], [202, 258], [170, 260], [143, 268]], 0.35);

  // Hand gestures — loose marks
  brush.set("charcoal", "#111", 0.9);
  brush.spline([[490, 188], [498, 182], [505, 178], [512, 176]], 0.3);
  brush.spline([[492, 196], [500, 192], [508, 190]], 0.3);
  brush.spline([[490, 188], [496, 194], [502, 198], [507, 200]], 0.3);

  brush.set("charcoal", "#222", 0.8);
  brush.spline([[143, 268], [135, 275], [128, 280]], 0.3);
  brush.spline([[145, 258], [137, 263], [130, 266]], 0.3);

  brush.noField();

  // --- Legs in leap ---
  brush.field("hand");
  brush.wiggle(3);

  // Front leg — extended forward-down
  brush.set("charcoal", "#111", 2.0);
  brush.spline([[355, 365], [385, 385], [415, 408], [445, 435], [468, 462], [480, 490]], 0.45);

  brush.set("charcoal", "#2a2a2a", 1.4);
  brush.spline([[348, 372], [378, 392], [408, 415], [438, 442], [462, 468], [475, 495]], 0.4);

  // Foot — front
  brush.set("charcoal", "#111", 1.2);
  brush.spline([[480, 490], [490, 496], [500, 498], [510, 495]], 0.3);
  brush.spline([[475, 495], [486, 502], [497, 505], [507, 502]], 0.3);

  // Back leg — swept up behind
  brush.set("charcoal", "#1a1a1a", 2.0);
  brush.spline([[290, 368], [268, 388], [245, 412], [225, 440], [210, 468], [205, 495]], 0.45);

  brush.set("charcoal", "#2a2a2a", 1.4);
  brush.spline([[298, 375], [276, 395], [253, 418], [233, 446], [218, 472], [213, 498]], 0.4);

  // Foot — back
  brush.set("charcoal", "#111", 1.1);
  brush.spline([[205, 495], [196, 500], [188, 502], [180, 500]], 0.3);
  brush.spline([[213, 498], [204, 504], [196, 506]], 0.3);

  brush.noField();

  // --- Atmospheric smudge overlays for depth ---
  brush.field("hand");
  brush.wiggle(6);

  // Broad dark smear across lower body / motion zone
  brush.set("charcoal", "#1a1a1a", 3.5);
  brush.spline([[80, 380], [150, 350], [220, 330], [290, 320], [355, 315]], 0.5);

  brush.set("charcoal", "#222", 2.8);
  brush.spline([[70, 400], [145, 368], [215, 348], [285, 338], [350, 332]], 0.5);

  brush.set("charcoal", "#333", 2.0);
  brush.spline([[60, 420], [140, 390], [210, 368], [280, 358], [345, 350]], 0.45);

  // Lighter atmospheric wisps above figure
  brush.set("charcoal", "#888", 0.6);
  brush.spline([[200, 200], [260, 210], [320, 215], [380, 210], [440, 205]], 0.4);

  brush.set("charcoal", "#aaa", 0.4);
  brush.spline([[210, 215], [270, 222], [330, 225], [390, 220]], 0.35);

  brush.noField();

  // --- Hatch shading for form ---
  brush.wiggle(2);
  brush.field("hand");

  // Shadow under torso / hip
  brush.hatchStyle("2B", "#111", 1.4);
  brush.hatch(4, 50, { rand: 0.14, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(288, 310);
  brush.vertex(308, 320);
  brush.vertex(330, 325);
  brush.vertex(350, 318);
  brush.vertex(358, 340);
  brush.vertex(340, 360);
  brush.vertex(310, 365);
  brush.vertex(285, 355);
  brush.vertex(278, 335);
  brush.endShape(true);
  brush.noHatch();

  // Mid-tone on leading arm
  brush.hatchStyle("charcoal", "#333", 0.9);
  brush.hatch(7, 20, { rand: 0.1 });
  brush.beginShape(0.3);
  brush.vertex(340, 235);
  brush.vertex(375, 215);
  brush.vertex(415, 200);
  brush.vertex(418, 212);
  brush.vertex(378, 228);
  brush.vertex(344, 248);
  brush.endShape(true);
  brush.noHatch();

  brush.noField();

  // --- Final loose gestural marks on top ---
  brush.field("hand");
  brush.wiggle(5);

  // Quick gestural lines across figure for energy
  brush.set("charcoal", "#0d0d0d", 1.2);
  brush.line(280, 260, 360, 245);
  brush.line(295, 280, 355, 275);
  brush.line(285, 340, 360, 335);

  brush.set("charcoal", "#222", 0.8);
  brush.line(270, 300, 370, 295);
  brush.line(275, 320, 365, 315);

  // Loose contour reinforcement
  brush.set("2B", "#0a0a0a", 1.1);
  brush.spline([[310, 240], [335, 245], [355, 265], [352, 300], [335, 330], [308, 338], [285, 318], [283, 290], [295, 265]], 0.4);

  brush.set("2B", "#1a1a1a", 0.8);
  brush.spline([[320, 195], [348, 195], [360, 215], [352, 232], [332, 238], [315, 228], [312, 210]], 0.4);

  brush.noField();

  noLoop();
}