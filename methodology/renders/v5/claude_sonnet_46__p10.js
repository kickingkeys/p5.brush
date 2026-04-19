function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky wash (upper portion) ---
  brush.noStroke();
  brush.wash("#e8d5b0", 180);
  brush.rect(0, 0, 600, 260, "corner");
  brush.noWash();

  // --- Layered sand washes ---
  // Bottom sand layer
  brush.wash("#d4b483", 200);
  brush.fill("#c9a96e", 160);
  brush.fillBleed(0.18, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 260);
  brush.vertex(600, 260);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // Mid sand layer with texture
  brush.wash("#c8a05a", 140);
  brush.fill("#bf9648", 120);
  brush.fillBleed(0.22, "out");
  brush.fillTexture(0.6, 0.35);
  brush.beginShape(0.4);
  brush.vertex(0, 310);
  brush.vertex(120, 305);
  brush.vertex(240, 318);
  brush.vertex(360, 308);
  brush.vertex(480, 315);
  brush.vertex(600, 308);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // Foreground sand layer
  brush.wash("#b8893a", 130);
  brush.fill("#a87c30", 110);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.7, 0.4);
  brush.beginShape(0.4);
  brush.vertex(0, 400);
  brush.vertex(80, 392);
  brush.vertex(180, 408);
  brush.vertex(300, 395);
  brush.vertex(420, 410);
  brush.vertex(540, 398);
  brush.vertex(600, 405);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // Darkest foreground sand strip
  brush.wash("#9e7228", 120);
  brush.fill("#8c6420", 100);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.75, 0.45);
  brush.beginShape(0.3);
  brush.vertex(0, 510);
  brush.vertex(150, 502);
  brush.vertex(300, 515);
  brush.vertex(450, 505);
  brush.vertex(600, 512);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // --- Desert crack lines using 2B ---
  brush.noFill();
  brush.set("2B", "#5a4020", 0.5);
  // Main crack network
  brush.spline([[120, 420], [145, 445], [160, 480], [155, 520], [170, 560]], 0.4);
  brush.spline([[160, 480], [185, 490], [210, 505]], 0.3);
  brush.spline([[155, 520], [130, 535], [110, 555]], 0.3);

  brush.spline([[300, 410], [315, 440], [305, 475], [320, 510], [310, 550]], 0.4);
  brush.spline([[305, 475], [280, 488], [260, 500]], 0.3);
  brush.spline([[320, 510], [345, 525], [360, 548]], 0.3);

  brush.spline([[460, 425], [475, 455], [465, 490], [480, 530]], 0.4);
  brush.spline([[465, 490], [440, 502], [420, 515]], 0.3);
  brush.spline([[480, 530], [500, 545], [510, 565]], 0.3);

  // Smaller cracks
  brush.set("2B", "#6b4e28", 0.35);
  brush.spline([[70, 470], [85, 490], [80, 515]], 0.3);
  brush.spline([[220, 445], [235, 460], [228, 480]], 0.3);
  brush.spline([[380, 435], [395, 452], [388, 468]], 0.3);
  brush.spline([[530, 460], [545, 478], [538, 495]], 0.3);

  // --- Jagged charcoal rock formations ---
  brush.wiggle(3);

  // Left rock formation
  brush.noStroke();
  brush.mass("crayon", "#2a2015", { strength: 0.85, precision: 0.35, gradient: 0.4, outline: false });
  brush.beginShape(0.2);
  brush.vertex(0, 380);
  brush.vertex(30, 330);
  brush.vertex(55, 290);
  brush.vertex(75, 310);
  brush.vertex(95, 275);
  brush.vertex(115, 300);
  brush.vertex(130, 268);
  brush.vertex(150, 290);
  brush.vertex(165, 310);
  brush.vertex(175, 380);
  brush.vertex(160, 395);
  brush.vertex(80, 400);
  brush.vertex(0, 410);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#1a1408", { strength: 0.65, precision: 0.4, gradient: 0.35 });
  brush.beginShape(0.2);
  brush.vertex(0, 380);
  brush.vertex(30, 330);
  brush.vertex(55, 290);
  brush.vertex(75, 310);
  brush.vertex(95, 275);
  brush.vertex(115, 300);
  brush.vertex(130, 268);
  brush.vertex(150, 290);
  brush.vertex(165, 310);
  brush.vertex(175, 380);
  brush.vertex(100, 395);
  brush.vertex(0, 410);
  brush.endShape(true);
  brush.noMass();

  // Left rock charcoal outline
  brush.set("charcoal", "#1e1608", 1.2);
  brush.beginShape(0.2);
  brush.vertex(0, 380);
  brush.vertex(30, 330);
  brush.vertex(55, 290);
  brush.vertex(75, 310);
  brush.vertex(95, 275);
  brush.vertex(115, 300);
  brush.vertex(130, 268);
  brush.vertex(150, 290);
  brush.vertex(165, 310);
  brush.vertex(175, 380);
  brush.endShape(false);

  // Left rock hatching
  brush.hatchStyle("charcoal", "#2a1e0a", 0.8);
  brush.hatch(5, 120, { rand: 0.15, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(0, 380);
  brush.vertex(30, 330);
  brush.vertex(55, 290);
  brush.vertex(75, 310);
  brush.vertex(95, 275);
  brush.vertex(115, 300);
  brush.vertex(130, 268);
  brush.vertex(150, 290);
  brush.vertex(165, 310);
  brush.vertex(175, 380);
  brush.vertex(100, 395);
  brush.vertex(0, 410);
  brush.endShape(true);
  brush.noHatch();

  // Center rock formation
  brush.noStroke();
  brush.mass("crayon", "#221c0e", { strength: 0.9, precision: 0.3, gradient: 0.45, outline: false });
  brush.beginShape(0.2);
  brush.vertex(230, 360);
  brush.vertex(255, 305);
  brush.vertex(275, 270);
  brush.vertex(295, 290);
  brush.vertex(318, 255);
  brush.vertex(340, 278);
  brush.vertex(358, 260);
  brush.vertex(375, 282);
  brush.vertex(390, 265);
  brush.vertex(410, 290);
  brush.vertex(420, 320);
  brush.vertex(415, 365);
  brush.vertex(380, 385);
  brush.vertex(300, 390);
  brush.vertex(240, 382);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#150f04", { strength: 0.7, precision: 0.35, gradient: 0.5 });
  brush.beginShape(0.2);
  brush.vertex(230, 360);
  brush.vertex(255, 305);
  brush.vertex(275, 270);
  brush.vertex(295, 290);
  brush.vertex(318, 255);
  brush.vertex(340, 278);
  brush.vertex(358, 260);
  brush.vertex(375, 282);
  brush.vertex(390, 265);
  brush.vertex(410, 290);
  brush.vertex(420, 320);
  brush.vertex(415, 365);
  brush.vertex(380, 385);
  brush.vertex(300, 390);
  brush.vertex(240, 382);
  brush.endShape(true);
  brush.noMass();

  // Center rock charcoal stroke
  brush.set("charcoal", "#1a1208", 1.4);
  brush.beginShape(0.2);
  brush.vertex(230, 360);
  brush.vertex(255, 305);
  brush.vertex(275, 270);
  brush.vertex(295, 290);
  brush.vertex(318, 255);
  brush.vertex(340, 278);
  brush.vertex(358, 260);
  brush.vertex(375, 282);
  brush.vertex(390, 265);
  brush.vertex(410, 290);
  brush.vertex(420, 320);
  brush.vertex(415, 365);
  brush.endShape(false);

  // Center rock hatching
  brush.hatchStyle("charcoal", "#241a08", 0.9);
  brush.hatch(4, 105, { rand: 0.18, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(230, 360);
  brush.vertex(255, 305);
  brush.vertex(275, 270);
  brush.vertex(295, 290);
  brush.vertex(318, 255);
  brush.vertex(340, 278);
  brush.vertex(358, 260);
  brush.vertex(375, 282);
  brush.vertex(390, 265);
  brush.vertex(410, 290);
  brush.vertex(420, 320);
  brush.vertex(415, 365);
  brush.vertex(380, 385);
  brush.vertex(300, 390);
  brush.vertex(240, 382);
  brush.endShape(true);
  brush.noHatch();

  // Right rock formation
  brush.noStroke();
  brush.mass("crayon", "#1e1a0c", { strength: 0.88, precision: 0.32, gradient: 0.42, outline: false });
  brush.beginShape(0.2);
  brush.vertex(460, 370);
  brush.vertex(480, 318);
  brush.vertex(500, 285);
  brush.vertex(522, 300);
  brush.vertex(540, 272);
  brush.vertex(558, 295);
  brush.vertex(575, 280);
  brush.vertex(600, 305);
  brush.vertex(600, 395);
  brush.vertex(560, 390);
  brush.vertex(500, 395);
  brush.vertex(465, 388);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#120e04", { strength: 0.65, precision: 0.38, gradient: 0.48 });
  brush.beginShape(0.2);
  brush.vertex(460, 370);
  brush.vertex(480, 318);
  brush.vertex(500, 285);
  brush.vertex(522, 300);
  brush.vertex(540, 272);
  brush.vertex(558, 295);
  brush.vertex(575, 280);
  brush.vertex(600, 305);
  brush.vertex(600, 395);
  brush.vertex(560, 390);
  brush.vertex(500, 395);
  brush.vertex(465, 388);
  brush.endShape(true);
  brush.noMass();

  // Right rock charcoal outline
  brush.set("charcoal", "#181208", 1.3);
  brush.beginShape(0.2);
  brush.vertex(460, 370);
  brush.vertex(480, 318);
  brush.vertex(500, 285);
  brush.vertex(522, 300);
  brush.vertex(540, 272);
  brush.vertex(558, 295);
  brush.vertex(575, 280);
  brush.vertex(600, 305);
  brush.endShape(false);

  // Right rock hatching
  brush.hatchStyle("charcoal", "#201808", 0.85);
  brush.hatch(4.5, 95, { rand: 0.16, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(460, 370);
  brush.vertex(480, 318);
  brush.vertex(500, 285);
  brush.vertex(522, 300);
  brush.vertex(540, 272);
  brush.vertex(558, 295);
  brush.vertex(575, 280);
  brush.vertex(600, 305);
  brush.vertex(600, 395);
  brush.vertex(560, 390);
  brush.vertex(500, 395);
  brush.vertex(465, 388);
  brush.endShape(true);
  brush.noHatch();

  brush.noField();

  // --- Horizon line using pen ---
  brush.noFill();
  brush.set("pen", "#3a2e18", 0.4);
  brush.line(0, 262, 600, 262);

  // Small horizon variation with rotring for texture
  brush.set("rotring", "#4a3a20", 0.25);
  brush.line(0, 264, 200, 265);
  brush.line(200, 265, 400, 263);
  brush.line(400, 263, 600, 265);

  // --- HB pencil texture on sand ---
  brush.set("HB", "#8c7040", 0.3);
  brush.hatchStyle("HB", "#9a7a45", 0.3);
  brush.hatch(18, 8, { rand: 0.12, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(0, 310);
  brush.vertex(600, 310);
  brush.vertex(600, 520);
  brush.vertex(0, 520);
  brush.endShape(true);
  brush.noHatch();

  // 2H for fine sand texture
  brush.hatchStyle("2H", "#b09050", 0.25);
  brush.hatch(22, 172, { rand: 0.1, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(0, 360);
  brush.vertex(600, 360);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Atmospheric sky haze with spray ---
  brush.set("spray", "#c8b080", 1.8);
  for (let i = 0; i < 30; i++) {
    brush.flowLine(random(0, 600), random(180, 260), random(20, 50), random(360));
  }

  brush.set("spray", "#d4bc90", 1.2);
  for (let i = 0; i < 20; i++) {
    brush.flowLine(random(0, 600), random(200, 255), random(15, 35), random(360));
  }

  brush.noStroke();

  noLoop();
}