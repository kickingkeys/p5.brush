function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky wash (upper portion) ---
  brush.noStroke();
  brush.wash("#e8d9c0", 180);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.2);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 310);
  brush.vertex(0, 310);
  brush.endShape(true);
  brush.noWash();

  // --- Desert ground base layers ---
  // First sand wash
  brush.wash("#d4b483", 170);
  brush.fillBleed(0.1, "out");
  brush.beginShape(0.2);
  brush.vertex(0, 305);
  brush.vertex(600, 305);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Second sand layer with slight variation
  brush.fill("#c9a96e", 110);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.7, 0.4);
  brush.beginShape(0.3);
  brush.vertex(0, 320);
  brush.vertex(600, 320);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Third deeper sand layer
  brush.fill("#b8924f", 90);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.6, 0.3);
  brush.beginShape(0.3);
  brush.vertex(0, 370);
  brush.vertex(600, 370);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Bottom dark shadow wash
  brush.wash("#9a7540", 100);
  brush.fillBleed(0.2, "in");
  brush.beginShape(0.2);
  brush.vertex(0, 480);
  brush.vertex(600, 480);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // --- Cracked desert texture via sparse hatching ---
  brush.hatchStyle("2H", "#c4a06a", 0.5);
  brush.hatch(18, 12, { rand: 0.18, continuous: false, gradient: 0.2 });
  brush.noStroke();
  brush.beginShape(0.2);
  brush.vertex(0, 320);
  brush.vertex(600, 320);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#a07840", 0.4);
  brush.hatch(22, 80, { rand: 0.22, continuous: false });
  brush.noStroke();
  brush.beginShape(0.2);
  brush.vertex(0, 350);
  brush.vertex(600, 350);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Crack lines across desert floor
  brush.set("2B", "#8a6530", 0.4);
  brush.spline([[20, 340], [90, 348], [160, 342], [230, 355], [300, 345]], 0.4);
  brush.spline([[310, 360], [390, 352], [470, 365], [560, 358]], 0.4);
  brush.spline([[50, 390], [130, 398], [200, 385], [280, 402], [360, 390]], 0.3);
  brush.spline([[370, 410], [450, 402], [530, 415], [600, 408]], 0.3);
  brush.spline([[0, 430], [80, 438], [160, 425], [240, 440]], 0.3);
  brush.spline([[100, 460], [200, 452], [300, 465], [400, 455], [500, 468], [590, 460]], 0.3);
  brush.spline([[30, 500], [120, 492], [210, 505], [300, 495]], 0.25);
  brush.spline([[320, 520], [420, 512], [510, 525], [590, 518]], 0.25);

  // Branching crack details
  brush.set("2B", "#7a5525", 0.3);
  brush.spline([[160, 342], [155, 360], [148, 378]], 0.4);
  brush.spline([[230, 355], [240, 372], [235, 390]], 0.4);
  brush.spline([[90, 398], [85, 415], [92, 432]], 0.4);
  brush.spline([[200, 385], [210, 400], [205, 418]], 0.35);
  brush.spline([[460, 365], [455, 382], [462, 398]], 0.35);

  // --- Horizon line (single thin pen) ---
  brush.set("pen", "#4a3820", 0.6);
  brush.line(0, 308, 600, 308);

  // --- Rock formations left cluster ---
  brush.noStroke();
  brush.wash("#5a4a38", 200);
  brush.fillBleed(0.08, "out");
  // Large left rock
  brush.beginShape(0.15);
  brush.vertex(30, 308);
  brush.vertex(65, 250);
  brush.vertex(85, 220);
  brush.vertex(110, 240);
  brush.vertex(130, 208);
  brush.vertex(155, 230);
  brush.vertex(170, 308);
  brush.endShape(true);
  brush.noWash();

  brush.wash("#4a3c2a", 200);
  brush.fillBleed(0.06, "out");
  // Second left rock
  brush.beginShape(0.15);
  brush.vertex(140, 308);
  brush.vertex(160, 270);
  brush.vertex(178, 252);
  brush.vertex(195, 265);
  brush.vertex(210, 248);
  brush.vertex(228, 260);
  brush.vertex(240, 308);
  brush.endShape(true);
  brush.noWash();

  // Small left foreground rock
  brush.wash("#3d3025", 210);
  brush.fillBleed(0.05, "out");
  brush.beginShape(0.15);
  brush.vertex(0, 308);
  brush.vertex(0, 275);
  brush.vertex(18, 260);
  brush.vertex(40, 270);
  brush.vertex(55, 308);
  brush.endShape(true);
  brush.noWash();

  // --- Rock formations right cluster ---
  brush.wash("#524030", 200);
  brush.fillBleed(0.08, "out");
  // Large right rock
  brush.beginShape(0.15);
  brush.vertex(380, 308);
  brush.vertex(400, 265);
  brush.vertex(418, 238);
  brush.vertex(440, 218);
  brush.vertex(462, 235);
  brush.vertex(480, 212);
  brush.vertex(500, 228);
  brush.vertex(520, 215);
  brush.vertex(545, 238);
  brush.vertex(560, 308);
  brush.endShape(true);
  brush.noWash();

  brush.wash("#3e3022", 200);
  brush.fillBleed(0.06, "out");
  // Tall spire right
  brush.beginShape(0.1);
  brush.vertex(540, 308);
  brush.vertex(555, 270);
  brush.vertex(565, 245);
  brush.vertex(572, 220);
  brush.vertex(578, 198);
  brush.vertex(584, 220);
  brush.vertex(592, 248);
  brush.vertex(600, 270);
  brush.vertex(600, 308);
  brush.endShape(true);
  brush.noWash();

  // Far right small rock
  brush.wash("#4a3c2c", 190);
  brush.fillBleed(0.05, "out");
  brush.beginShape(0.15);
  brush.vertex(310, 308);
  brush.vertex(325, 280);
  brush.vertex(342, 265);
  brush.vertex(360, 278);
  brush.vertex(375, 308);
  brush.endShape(true);
  brush.noWash();

  // --- Rock texture with charcoal hatching ---
  brush.field("hand");
  brush.wiggle(2);

  // Left rock mass texture
  brush.hatchStyle("charcoal", "#2a2018", 1.0);
  brush.hatch(5, 55, { rand: 0.18, continuous: true });
  brush.noStroke();
  brush.beginShape(0.15);
  brush.vertex(30, 308);
  brush.vertex(65, 250);
  brush.vertex(85, 220);
  brush.vertex(110, 240);
  brush.vertex(130, 208);
  brush.vertex(155, 230);
  brush.vertex(170, 308);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("charcoal", "#1e1810", 1.2);
  brush.hatch(4, 130, { rand: 0.2, continuous: true });
  brush.noStroke();
  brush.beginShape(0.15);
  brush.vertex(140, 308);
  brush.vertex(160, 270);
  brush.vertex(178, 252);
  brush.vertex(195, 265);
  brush.vertex(210, 248);
  brush.vertex(228, 260);
  brush.vertex(240, 308);
  brush.endShape(true);
  brush.noHatch();

  // Right rock mass texture
  brush.hatchStyle("charcoal", "#221a10", 1.1);
  brush.hatch(5, 65, { rand: 0.15, continuous: true });
  brush.noStroke();
  brush.beginShape(0.15);
  brush.vertex(380, 308);
  brush.vertex(400, 265);
  brush.vertex(418, 238);
  brush.vertex(440, 218);
  brush.vertex(462, 235);
  brush.vertex(480, 212);
  brush.vertex(500, 228);
  brush.vertex(520, 215);
  brush.vertex(545, 238);
  brush.vertex(560, 308);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("charcoal", "#1a1408", 1.3);
  brush.hatch(3, 110, { rand: 0.22, continuous: true });
  brush.noStroke();
  brush.beginShape(0.1);
  brush.vertex(540, 308);
  brush.vertex(555, 270);
  brush.vertex(565, 245);
  brush.vertex(572, 220);
  brush.vertex(578, 198);
  brush.vertex(584, 220);
  brush.vertex(592, 248);
  brush.vertex(600, 270);
  brush.vertex(600, 308);
  brush.endShape(true);
  brush.noHatch();

  brush.noField();

  // --- Charcoal rock outlines and edge detail ---
  brush.set("charcoal", "#1e1610", 0.9);
  brush.wiggle(3);
  // Left rock outlines
  brush.spline([[30, 308], [65, 250], [85, 220], [110, 240], [130, 208], [155, 230], [170, 308]], 0.3);
  brush.spline([[140, 308], [160, 270], [178, 252], [195, 265], [210, 248], [228, 260], [240, 308]], 0.3);
  brush.spline([[0, 308], [0, 275], [18, 260], [40, 270], [55, 308]], 0.3);
  // Right rock outlines
  brush.spline([[380, 308], [400, 265], [418, 238], [440, 218], [462, 235], [480, 212], [500, 228], [520, 215], [545, 238], [560, 308]], 0.3);
  brush.spline([[540, 308], [555, 270], [565, 245], [572, 220], [578, 198], [584, 220], [592, 248], [600, 270]], 0.3);
  brush.spline([[310, 308], [325, 280], [342, 265], [360, 278], [375, 308]], 0.3);

  // Internal rock fracture lines
  brush.set("charcoal", "#2a2015", 0.5);
  brush.spline([[85, 220], [95, 255], [100, 285], [105, 308]], 0.4);
  brush.spline([[110, 240], [120, 268], [125, 290]], 0.4);
  brush.spline([[440, 218], [448, 252], [452, 280], [455, 308]], 0.4);
  brush.spline([[480, 212], [488, 245], [494, 275], [498, 308]], 0.4);
  brush.spline([[520, 215], [526, 248], [530, 275], [535, 308]], 0.35);
  brush.spline([[342, 265], [348, 285], [352, 308]], 0.4);

  // Shadow bases of rocks
  brush.set("2B", "#1a1208", 0.8);
  brush.wiggle(1);
  brush.line(30, 308, 170, 308);
  brush.line(140, 308, 240, 308);
  brush.line(0, 308, 55, 308);
  brush.line(380, 308, 560, 308);
  brush.line(540, 308, 600, 308);
  brush.line(310, 308, 375, 308);

  // --- Distant rock silhouettes near horizon ---
  brush.noStroke();
  brush.wash("#7a6a52", 140);
  brush.fillBleed(0.12, "out");
  brush.beginShape(0.2);
  brush.vertex(190, 308);
  brush.vertex(205, 295);
  brush.vertex(220, 290);
  brush.vertex(240, 295);
  brush.vertex(255, 288);
  brush.vertex(275, 295);
  brush.vertex(295, 308);
  brush.endShape(true);
  brush.noWash();

  brush.wash("#6e5e46", 130);
  brush.fillBleed(0.1, "out");
  brush.beginShape(0.2);
  brush.vertex(248, 308);
  brush.vertex(262, 298);
  brush.vertex(278, 292);
  brush.vertex(295, 296);
  brush.vertex(308, 290);
  brush.vertex(325, 295);
  brush.vertex(340, 308);
  brush.endShape(true);
  brush.noWash();

  // --- Horizon pen line (drawn last for crispness) ---
  brush.set("pen", "#3a2c18", 0.5);
  brush.wiggle(0.5);
  brush.line(0, 308, 600, 308);

  // Subtle atmospheric haze near horizon
  brush.set("spray", "#d4c4a0", 1.5);
  for (let i = 0; i < 30; i++) {
    brush.flowLine(random(0, 600), random(295, 320), random(15, 40), random(360));
  }

  // --- Foreground sand detail strokes ---
  brush.set("HB", "#b09060", 0.4);
  brush.wiggle(1);
  for (let y = 340; y < 580; y += 35) {
    let xStart = random(0, 60);
    let xEnd = random(540, 600);
    brush.spline([
      [xStart, y + random(-4, 4)],
      [xStart + random(80, 120), y + random(-5, 5)],
      [xStart + random(180, 240), y + random(-4, 4)],
      [xStart + random(280, 340), y + random(-5, 5)],
      [xEnd, y + random(-4, 4)]
    ], 0.3);
  }

  brush.noField();
  brush.noStroke();
  brush.noFill();
  brush.noHatch();
  brush.noWash();

  noLoop();
}