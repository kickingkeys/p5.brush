function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky wash (upper portion, pale warm tone) ---
  brush.noStroke();
  brush.wash("#e8d8b8", 180);
  brush.fillBleed(0.08, "out");
  brush.rect(0, 0, 600, 310, "corner");
  brush.noWash();

  // --- Desert floor layered washes ---
  // Base sand layer
  brush.noStroke();
  brush.fill("#d4b483", 160);
  brush.fillBleed(0.12, "out");
  brush.fillTexture(0.7, 0.4);
  brush.rect(0, 300, 600, 300, "corner");
  brush.noFill();

  // Mid sand wash
  brush.wash("#c9a46a", 130);
  brush.fillBleed(0.1, "out");
  brush.rect(0, 340, 600, 260, "corner");
  brush.noWash();

  // Deeper warm shadow wash at bottom
  brush.wash("#b8895a", 110);
  brush.fillBleed(0.09, "out");
  brush.rect(0, 420, 600, 180, "corner");
  brush.noWash();

  // Subtle cool shadow layer across lower third
  brush.fill("#a07848", 70);
  brush.fillBleed(0.15, "in");
  brush.fillTexture(0.6, 0.35);
  brush.rect(0, 460, 600, 140, "corner");
  brush.noFill();

  // --- Horizon line (single thin pen stroke) ---
  brush.set("pen", "#3a2e20", 0.5);
  brush.line(0, 310, 600, 310);
  brush.noStroke();

  // --- Desert crack hatching (horizontal bands across floor) ---
  brush.hatchStyle("2H", "#b89060", 0.5);
  brush.hatch(11, 0, { rand: 0.08, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(0, 310);
  brush.vertex(600, 310);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Second hatch angle for cracked texture
  brush.hatchStyle("HB", "#9a7845", 0.6);
  brush.hatch(18, 62, { rand: 0.12, continuous: false, gradient: 0.25 });
  brush.beginShape(0.1);
  brush.vertex(0, 360);
  brush.vertex(600, 360);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Fine crack lines with rotring
  brush.set("rotring", "#7a5c30", 0.35);
  brush.hatchStyle("rotring", "#7a5c30", 0.35);
  brush.hatch(28, 85, { rand: 0.18, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(30, 330);
  brush.vertex(570, 330);
  brush.vertex(570, 590);
  brush.vertex(30, 590);
  brush.endShape(true);
  brush.noHatch();

  // --- Individual crack lines across the desert floor ---
  brush.set("2B", "#5a3e20", 0.55);
  brush.line(80, 355, 160, 390);
  brush.line(160, 390, 190, 380);
  brush.line(190, 380, 260, 415);

  brush.line(300, 340, 370, 375);
  brush.line(370, 375, 340, 395);
  brush.line(340, 395, 410, 430);

  brush.line(120, 430, 200, 460);
  brush.line(200, 460, 175, 480);
  brush.line(175, 480, 240, 510);

  brush.line(380, 420, 450, 455);
  brush.line(450, 455, 420, 475);
  brush.line(420, 475, 490, 505);

  brush.line(50, 510, 140, 540);
  brush.line(140, 540, 120, 565);

  brush.line(460, 500, 550, 530);
  brush.line(550, 530, 530, 555);
  brush.line(530, 555, 580, 575);

  brush.line(200, 560, 310, 585);
  brush.line(310, 585, 290, 598);

  brush.noStroke();

  // --- Rock formations (left cluster) ---
  // Left large rock mass
  brush.mass("crayon", "#2a2018", { strength: 0.85, precision: 0.35, gradient: 0.4, outline: false });
  brush.hatchStyle("charcoal", "#1a1408", 1.8);
  brush.hatch(4, 70, { rand: 0.2, continuous: false });
  brush.beginShape(0.25);
  brush.vertex(30, 310);
  brush.vertex(90, 260);
  brush.vertex(130, 220);
  brush.vertex(170, 255);
  brush.vertex(200, 240);
  brush.vertex(230, 210);
  brush.vertex(255, 235);
  brush.vertex(270, 310);
  brush.vertex(30, 310);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Left rock highlight face
  brush.mass("crayon", "#4a3828", { strength: 0.55, precision: 0.5, gradient: 0.3, outline: false });
  brush.hatchStyle("charcoal", "#2e2010", 1.2);
  brush.hatch(7, 40, { rand: 0.14, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(90, 260);
  brush.vertex(130, 220);
  brush.vertex(170, 255);
  brush.vertex(200, 240);
  brush.vertex(200, 310);
  brush.vertex(90, 310);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Left secondary smaller rock
  brush.mass("crayon", "#1e1810", { strength: 0.75, precision: 0.4, gradient: 0.35, outline: false });
  brush.hatchStyle("charcoal", "#111008", 1.5);
  brush.hatch(5, 55, { rand: 0.18, continuous: false });
  brush.beginShape(0.25);
  brush.vertex(0, 310);
  brush.vertex(30, 290);
  brush.vertex(55, 268);
  brush.vertex(80, 275);
  brush.vertex(85, 310);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Rock formations (right cluster) ---
  // Right large jagged rock
  brush.mass("crayon", "#252015", { strength: 0.88, precision: 0.3, gradient: 0.45, outline: false });
  brush.hatchStyle("charcoal", "#18120a", 1.9);
  brush.hatch(4, 110, { rand: 0.22, continuous: false });
  brush.beginShape(0.22);
  brush.vertex(340, 310);
  brush.vertex(370, 275);
  brush.vertex(395, 240);
  brush.vertex(425, 215);
  brush.vertex(460, 245);
  brush.vertex(490, 220);
  brush.vertex(520, 255);
  brush.vertex(545, 230);
  brush.vertex(580, 265);
  brush.vertex(600, 310);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Right rock shadow face
  brush.mass("crayon", "#181208", { strength: 0.9, precision: 0.28, gradient: 0.5, outline: false });
  brush.hatchStyle("charcoal", "#0e0a04", 2.0);
  brush.hatch(3, 80, { rand: 0.25, continuous: false });
  brush.beginShape(0.2);
  brush.vertex(460, 245);
  brush.vertex(490, 220);
  brush.vertex(520, 255);
  brush.vertex(545, 230);
  brush.vertex(580, 265);
  brush.vertex(600, 310);
  brush.vertex(460, 310);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Right mid rock
  brush.mass("crayon", "#302818", { strength: 0.65, precision: 0.45, gradient: 0.3, outline: false });
  brush.hatchStyle("charcoal", "#201808", 1.3);
  brush.hatch(6, 95, { rand: 0.16, continuous: false });
  brush.beginShape(0.28);
  brush.vertex(340, 310);
  brush.vertex(360, 285);
  brush.vertex(390, 265);
  brush.vertex(420, 278);
  brush.vertex(430, 310);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Charcoal outlines on rock formations ---
  brush.wiggle(3);
  brush.set("charcoal", "#0e0a06", 1.2);

  // Left rock silhouette
  brush.spline([
    [30, 310], [90, 260], [130, 220], [170, 255],
    [200, 240], [230, 210], [255, 235], [270, 310]
  ], 0.25);

  // Left small rock
  brush.spline([
    [0, 310], [30, 290], [55, 268], [80, 275], [85, 310]
  ], 0.2);

  // Right rock silhouette
  brush.spline([
    [340, 310], [370, 275], [395, 240], [425, 215],
    [460, 245], [490, 220], [520, 255], [545, 230],
    [580, 265], [600, 310]
  ], 0.22);

  brush.noStroke();
  brush.noField();

  // --- Dust / atmospheric haze near horizon (spray) ---
  brush.set("spray", "#d4b483", 1.8);
  for (let i = 0; i < 60; i++) {
    let x = random(0, 600);
    let y = random(295, 330);
    brush.flowLine(x, y, random(8, 22), random(360));
  }

  // Lighter dust above horizon
  brush.set("spray", "#e8d0a0", 1.2);
  for (let i = 0; i < 40; i++) {
    let x = random(0, 600);
    let y = random(285, 310);
    brush.flowLine(x, y, random(5, 15), random(360));
  }

  // Sandy dust at base of rocks (left)
  brush.set("spray", "#c4a060", 1.5);
  for (let i = 0; i < 35; i++) {
    let x = random(20, 290);
    let y = random(305, 340);
    brush.flowLine(x, y, random(6, 18), random(360));
  }

  // Sandy dust at base of rocks (right)
  for (let i = 0; i < 35; i++) {
    let x = random(330, 600);
    let y = random(305, 345);
    brush.flowLine(x, y, random(6, 18), random(360));
  }

  brush.noStroke();

  // --- Subtle pen detail lines on rock faces ---
  brush.set("pen", "#2a1e0e", 0.4);
  // Left rock face fractures
  brush.line(105, 255, 125, 275);
  brush.line(125, 275, 115, 295);
  brush.line(150, 238, 165, 260);
  brush.line(165, 260, 155, 285);
  brush.line(205, 248, 220, 270);
  brush.line(220, 270, 210, 300);

  // Right rock face fractures
  brush.line(390, 260, 405, 280);
  brush.line(405, 280, 395, 300);
  brush.line(430, 235, 445, 258);
  brush.line(445, 258, 435, 285);
  brush.line(500, 238, 515, 262);
  brush.line(515, 262, 505, 290);
  brush.line(550, 248, 562, 268);
  brush.line(562, 268, 552, 295);

  brush.noStroke();

  noLoop();
}