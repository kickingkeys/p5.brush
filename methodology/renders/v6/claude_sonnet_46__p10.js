function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky wash (upper portion) ---
  brush.noStroke();
  brush.wash("#e8d5b0", 180);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.2);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 290);
  brush.vertex(0, 290);
  brush.endShape(true);
  brush.noWash();

  // --- Layered sand ground washes ---
  // Layer 1: pale sand base
  brush.wash("#d9b97a", 160);
  brush.beginShape(0.2);
  brush.vertex(0, 295);
  brush.vertex(600, 295);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Layer 2: warm mid-sand
  brush.fill("#c9a45a", 130);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.6, 0.35);
  brush.beginShape(0.3);
  brush.vertex(0, 310);
  brush.vertex(600, 310);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Layer 3: deeper ochre shadow at bottom
  brush.fill("#b8893e", 110);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.7, 0.4);
  brush.beginShape(0.3);
  brush.vertex(0, 420);
  brush.vertex(600, 420);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Layer 4: darkest ground shadow strip
  brush.fill("#9e7230", 90);
  brush.fillBleed(0.18, "out");
  brush.fillTexture(0.75, 0.45);
  brush.beginShape(0.3);
  brush.vertex(0, 530);
  brush.vertex(600, 530);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // --- Horizon line (thin pen) ---
  brush.set("pen", "#5a4020", 0.5);
  brush.line(0, 300, 600, 300);

  // --- Crack network in desert ground ---
  brush.set("HB", "#7a5c2a", 0.6);
  // Main crack 1
  brush.spline([
    [80, 320], [110, 345], [130, 370], [115, 400], [140, 435], [160, 480], [155, 540]
  ], 0.35);
  // Branch from crack 1
  brush.spline([
    [115, 400], [145, 415], [170, 410], [200, 425]
  ], 0.3);

  // Main crack 2
  brush.spline([
    [250, 310], [265, 340], [280, 375], [260, 410], [275, 450], [295, 490], [310, 560]
  ], 0.3);
  // Branch
  brush.spline([
    [260, 410], [290, 420], [320, 415], [355, 430]
  ], 0.28);

  // Main crack 3
  brush.spline([
    [420, 315], [405, 350], [420, 385], [400, 420], [415, 460], [430, 510]
  ], 0.3);
  // Branch
  brush.spline([
    [400, 420], [370, 435], [345, 450], [330, 475]
  ], 0.28);

  // Smaller cracks
  brush.set("HB", "#8a6535", 0.45);
  brush.spline([[500, 330], [520, 355], [510, 390], [530, 430]], 0.3);
  brush.spline([[530, 390], [555, 400], [575, 395]], 0.25);
  brush.spline([[180, 350], [200, 370], [195, 400]], 0.25);
  brush.spline([[350, 360], [365, 385], [355, 415], [370, 445]], 0.25);
  brush.spline([[60, 450], [85, 470], [100, 500], [90, 540]], 0.28);

  // Fine hairline cracks
  brush.set("2H", "#9a7540", 0.4);
  brush.spline([[200, 470], [220, 490], [215, 520]], 0.25);
  brush.spline([[450, 480], [470, 500], [465, 535]], 0.25);
  brush.spline([[300, 540], [320, 555], [310, 580]], 0.22);
  brush.spline([[130, 560], [150, 575], [145, 595]], 0.22);

  // --- Rock formations (jagged charcoal shapes) ---
  // Left rock mass
  brush.noFill();
  brush.hatchStyle("charcoal", "#2a2520", 1.2);
  brush.hatch(5, 70, { rand: 0.18, continuous: true });
  brush.beginShape(0.15);
  brush.vertex(0, 300);
  brush.vertex(30, 285);
  brush.vertex(55, 260);
  brush.vertex(70, 275);
  brush.vertex(90, 245);
  brush.vertex(108, 265);
  brush.vertex(125, 240);
  brush.vertex(140, 258);
  brush.vertex(155, 235);
  brush.vertex(170, 255);
  brush.vertex(185, 270);
  brush.vertex(190, 300);
  brush.vertex(0, 300);
  brush.endShape(true);
  brush.noHatch();

  // Left rock dark fill
  brush.mass("crayon", "#1a1510", { strength: 0.75, precision: 0.35, gradient: 0.4, outline: false });
  brush.beginShape(0.15);
  brush.vertex(0, 300);
  brush.vertex(30, 285);
  brush.vertex(55, 260);
  brush.vertex(70, 275);
  brush.vertex(90, 245);
  brush.vertex(108, 265);
  brush.vertex(125, 240);
  brush.vertex(140, 258);
  brush.vertex(155, 235);
  brush.vertex(170, 255);
  brush.vertex(185, 270);
  brush.vertex(190, 300);
  brush.vertex(0, 300);
  brush.endShape(true);
  brush.noMass();

  // Left rock charcoal outline
  brush.set("charcoal", "#111008", 1.4);
  brush.spline([
    [0, 300], [30, 285], [55, 260], [70, 275], [90, 245],
    [108, 265], [125, 240], [140, 258], [155, 235],
    [170, 255], [185, 270], [190, 300]
  ], 0.15);

  // Mid-left rock cluster
  brush.mass("crayon", "#201c14", { strength: 0.8, precision: 0.4, gradient: 0.35, outline: false });
  brush.beginShape(0.15);
  brush.vertex(210, 300);
  brush.vertex(225, 278);
  brush.vertex(238, 258);
  brush.vertex(252, 272);
  brush.vertex(265, 250);
  brush.vertex(278, 265);
  brush.vertex(290, 248);
  brush.vertex(302, 260);
  brush.vertex(315, 275);
  brush.vertex(320, 300);
  brush.vertex(210, 300);
  brush.endShape(true);
  brush.noMass();

  brush.hatchStyle("charcoal", "#1a1510", 1.0);
  brush.hatch(4, 110, { rand: 0.2, continuous: true });
  brush.beginShape(0.15);
  brush.vertex(210, 300);
  brush.vertex(225, 278);
  brush.vertex(238, 258);
  brush.vertex(252, 272);
  brush.vertex(265, 250);
  brush.vertex(278, 265);
  brush.vertex(290, 248);
  brush.vertex(302, 260);
  brush.vertex(315, 275);
  brush.vertex(320, 300);
  brush.vertex(210, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.set("charcoal", "#0d0a08", 1.2);
  brush.spline([
    [210, 300], [225, 278], [238, 258], [252, 272], [265, 250],
    [278, 265], [290, 248], [302, 260], [315, 275], [320, 300]
  ], 0.15);

  // Right rock formation
  brush.mass("crayon", "#181410", { strength: 0.85, precision: 0.38, gradient: 0.45, outline: false });
  brush.beginShape(0.15);
  brush.vertex(390, 300);
  brush.vertex(405, 272);
  brush.vertex(420, 252);
  brush.vertex(435, 268);
  brush.vertex(450, 240);
  brush.vertex(465, 255);
  brush.vertex(480, 235);
  brush.vertex(498, 252);
  brush.vertex(515, 242);
  brush.vertex(530, 258);
  brush.vertex(548, 268);
  brush.vertex(565, 252);
  brush.vertex(580, 268);
  brush.vertex(600, 260);
  brush.vertex(600, 300);
  brush.vertex(390, 300);
  brush.endShape(true);
  brush.noMass();

  brush.hatchStyle("charcoal", "#151210", 1.1);
  brush.hatch(5, 55, { rand: 0.15, continuous: true });
  brush.beginShape(0.15);
  brush.vertex(390, 300);
  brush.vertex(405, 272);
  brush.vertex(420, 252);
  brush.vertex(435, 268);
  brush.vertex(450, 240);
  brush.vertex(465, 255);
  brush.vertex(480, 235);
  brush.vertex(498, 252);
  brush.vertex(515, 242);
  brush.vertex(530, 258);
  brush.vertex(548, 268);
  brush.vertex(565, 252);
  brush.vertex(580, 268);
  brush.vertex(600, 260);
  brush.vertex(600, 300);
  brush.vertex(390, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.set("charcoal", "#0a0806", 1.5);
  brush.spline([
    [390, 300], [405, 272], [420, 252], [435, 268], [450, 240],
    [465, 255], [480, 235], [498, 252], [515, 242],
    [530, 258], [548, 268], [565, 252], [580, 268], [600, 260]
  ], 0.15);

  // Small isolated rock spire center
  brush.mass("crayon", "#1c1810", { strength: 0.7, precision: 0.45, gradient: 0.3, outline: false });
  brush.beginShape(0.15);
  brush.vertex(340, 300);
  brush.vertex(348, 282);
  brush.vertex(355, 265);
  brush.vertex(362, 278);
  brush.vertex(370, 260);
  brush.vertex(378, 272);
  brush.vertex(385, 285);
  brush.vertex(388, 300);
  brush.vertex(340, 300);
  brush.endShape(true);
  brush.noMass();

  brush.set("charcoal", "#0d0a08", 1.1);
  brush.spline([
    [340, 300], [348, 282], [355, 265], [362, 278],
    [370, 260], [378, 272], [385, 285], [388, 300]
  ], 0.15);

  // --- Horizon pen line reinforced ---
  brush.set("pen", "#3a2a10", 0.4);
  brush.line(0, 300, 600, 300);

  // --- Subtle sand texture hatching over ground ---
  brush.hatchStyle("2H", "#c4a060", 0.35);
  brush.hatch(14, 8, { rand: 0.08, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(0, 305);
  brush.vertex(600, 305);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Slightly denser mid-ground texture
  brush.hatchStyle("HB", "#a8813a", 0.3);
  brush.hatch(10, 175, { rand: 0.1, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(0, 400);
  brush.vertex(600, 400);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}