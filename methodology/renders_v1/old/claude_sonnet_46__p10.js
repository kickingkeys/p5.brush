function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5ede0");
  brush.scaleBrushes(3);
  angleMode(DEGREES);

  translate(-width / 2, -height / 2);

  // Sky wash - pale warm tone
  brush.wash("#e8d5b0", 180);
  brush.noStroke();
  brush.noHatch();
  brush.rect(0, 0, 600, 280);

  // Lower sky blush
  brush.wash("#d4b896", 90);
  brush.rect(0, 200, 600, 100);

  // Ground base layers - sandy desert washes
  brush.fill("#c8a96e", 140);
  brush.fillBleed(0.18, "out");
  brush.fillTexture(0.5, 0.3);
  brush.noStroke();
  brush.rect(0, 280, 600, 320);

  // Mid sand layer
  brush.fill("#b8955a", 110);
  brush.fillBleed(0.12, "in");
  brush.fillTexture(0.6, 0.4);
  brush.rect(0, 340, 600, 260);

  // Deep sand shadow at bottom
  brush.fill("#8c6b3a", 100);
  brush.fillBleed(0.1, "in");
  brush.fillTexture(0.7, 0.5);
  brush.rect(0, 450, 600, 150);

  // Crack network - thin pen lines across ground
  brush.set("pen", "#5a3e28", 0.4);
  brush.noFill();
  brush.noHatch();

  // Main horizontal crack
  brush.spline([[20, 310], [90, 318], [160, 308], [230, 322], [310, 312], [400, 325], [480, 315], [580, 320]], 0.4);

  // Branching cracks
  brush.spline([[90, 318], [100, 340], [115, 365], [108, 390]], 0.35);
  brush.spline([[115, 365], [135, 380], [155, 370]], 0.3);
  brush.spline([[160, 308], [170, 330], [165, 358], [180, 385], [175, 420]], 0.4);
  brush.spline([[175, 420], [195, 435], [210, 428]], 0.3);
  brush.spline([[230, 322], [240, 350], [255, 375], [250, 410], [265, 445]], 0.4);
  brush.spline([[255, 375], [275, 390], [290, 382]], 0.3);
  brush.spline([[310, 312], [320, 338], [315, 365], [330, 400], [325, 440]], 0.4);
  brush.spline([[330, 400], [350, 415], [370, 408]], 0.3);
  brush.spline([[400, 325], [410, 355], [405, 385], [420, 420]], 0.4);
  brush.spline([[480, 315], [490, 345], [485, 375], [500, 410], [495, 450]], 0.4);
  brush.spline([[495, 450], [515, 465], [530, 458]], 0.3);

  // Smaller surface cracks
  brush.set("pen", "#4a3020", 0.3);
  brush.spline([[50, 380], [75, 390], [90, 385], [110, 395]], 0.35);
  brush.spline([[200, 430], [225, 440], [240, 435]], 0.3);
  brush.spline([[350, 460], [375, 470], [395, 465], [415, 475]], 0.35);
  brush.spline([[440, 390], [460, 400], [475, 395]], 0.3);
  brush.spline([[540, 430], [560, 440], [575, 435]], 0.3);
  brush.spline([[130, 460], [155, 472], [170, 465]], 0.3);

  // Horizon line - thin precise pen
  brush.set("rotring", "#3a2a18", 0.5);
  brush.line(0, 285, 600, 285);

  // Rock formation left - jagged charcoal shapes
  brush.set("charcoal", "#2a2018", 0.9);
  brush.fill("#1e1a14", 180);
  brush.fillTexture(0.4, 0.6);
  brush.fillBleed(0.05, "in");

  brush.beginShape(0.1);
  brush.vertex(0, 285);
  brush.vertex(30, 260);
  brush.vertex(55, 230);
  brush.vertex(70, 245);
  brush.vertex(90, 210);
  brush.vertex(110, 240);
  brush.vertex(125, 225);
  brush.vertex(145, 255);
  brush.vertex(160, 270);
  brush.vertex(170, 285);
  brush.vertex(0, 285);
  brush.endShape(true);

  // Rock formation right - taller jagged
  brush.set("charcoal", "#241e14", 0.9);
  brush.fill("#1a1610", 185);
  brush.fillTexture(0.45, 0.65);
  brush.fillBleed(0.05, "in");

  brush.beginShape(0.1);
  brush.vertex(420, 285);
  brush.vertex(445, 255);
  brush.vertex(460, 225);
  brush.vertex(475, 245);
  brush.vertex(490, 200);
  brush.vertex(510, 220);
  brush.vertex(525, 195);
  brush.vertex(545, 215);
  brush.vertex(560, 240);
  brush.vertex(575, 260);
  brush.vertex(600, 255);
  brush.vertex(600, 285);
  brush.vertex(420, 285);
  brush.endShape(true);

  // Rock formation center-left - smaller
  brush.set("charcoal", "#28201a", 0.8);
  brush.fill("#201c12", 175);
  brush.fillTexture(0.4, 0.55);
  brush.fillBleed(0.04, "in");

  brush.beginShape(0.1);
  brush.vertex(200, 285);
  brush.vertex(220, 268);
  brush.vertex(235, 250);
  brush.vertex(250, 262);
  brush.vertex(265, 248);
  brush.vertex(278, 260);
  brush.vertex(290, 272);
  brush.vertex(300, 285);
  brush.vertex(200, 285);
  brush.endShape(true);

  // Rock texture - charcoal strokes on formations
  brush.set("charcoal", "#0e0c08", 0.6);
  brush.noFill();
  brush.hatch(4, 125, {rand: 0.3, continuous: false, gradient: 0.2});
  brush.hatchStyle("charcoal", "#181410", 0.5);

  // Left rock hatch
  brush.beginShape(0.1);
  brush.vertex(0, 285);
  brush.vertex(30, 260);
  brush.vertex(55, 230);
  brush.vertex(70, 245);
  brush.vertex(90, 210);
  brush.vertex(110, 240);
  brush.vertex(125, 225);
  brush.vertex(145, 255);
  brush.vertex(160, 270);
  brush.vertex(170, 285);
  brush.endShape(true);

  // Right rock hatch
  brush.hatch(4, 55, {rand: 0.3, continuous: false, gradient: 0.2});
  brush.beginShape(0.1);
  brush.vertex(420, 285);
  brush.vertex(445, 255);
  brush.vertex(460, 225);
  brush.vertex(475, 245);
  brush.vertex(490, 200);
  brush.vertex(510, 220);
  brush.vertex(525, 195);
  brush.vertex(545, 215);
  brush.vertex(560, 240);
  brush.vertex(575, 260);
  brush.vertex(600, 255);
  brush.vertex(600, 285);
  brush.endShape(true);

  // Desert ground texture - spray and 2B marks
  brush.noHatch();
  brush.noFill();
  brush.set("2B", "#8c6b3a", 0.4);

  for (let i = 0; i < 18; i++) {
    let x1 = 20 + i * 32;
    let y1 = 300 + noise(i * 0.4) * 40;
    let x2 = x1 + 15 + noise(i * 0.7) * 25;
    let y2 = y1 + noise(i * 0.9) * 15;
    brush.line(x1, y1, x2, y2);
  }

  // Deeper ground strokes
  brush.set("2B", "#7a5a2e", 0.35);
  for (let i = 0; i < 15; i++) {
    let x1 = 10 + i * 38;
    let y1 = 360 + noise(i * 0.5 + 10) * 50;
    let x2 = x1 + 20 + noise(i * 0.8 + 5) * 20;
    let y2 = y1 + noise(i * 1.1) * 12;
    brush.line(x1, y1, x2, y2);
  }

  // Sand ripple lines
  brush.set("HB", "#a07840", 0.35);
  brush.wiggle(2);
  for (let i = 0; i < 8; i++) {
    let y = 300 + i * 22 + noise(i * 0.6) * 10;
    brush.line(15, y, 580 + noise(i) * 15, y + noise(i * 1.3) * 8);
  }

  brush.noField();

  // Lower ripples
  brush.set("HB", "#8c6432", 0.3);
  brush.wiggle(1.5);
  for (let i = 0; i < 10; i++) {
    let y = 420 + i * 18 + noise(i * 0.4 + 20) * 8;
    brush.line(20, y, 575 + noise(i * 0.7) * 10, y + noise(i * 0.9 + 3) * 6);
  }

  brush.noField();

  // Scattered pebble/dust marks
  brush.set("spray", "#6b4e28", 0.5);
  for (let i = 0; i < 12; i++) {
    let x = 30 + i * 48 + noise(i * 1.2) * 20;
    let y = 380 + noise(i * 0.7 + 30) * 80;
    brush.line(x, y, x + 3, y + 2);
  }

  // Rock edge detail - fine pen lines
  brush.set("pen", "#1a1410", 0.4);
  brush.noFill();
  // Left rock edge details
  brush.spline([[55, 230], [60, 238], [65, 232], [70, 245]], 0.3);
  brush.spline([[90, 210], [95, 220], [100, 215], [110, 240]], 0.3);
  brush.spline([[125, 225], [130, 235], [135, 230], [145, 255]], 0.3);

  // Right rock edge details
  brush.spline([[460, 225], [465, 235], [470, 228], [475, 245]], 0.3);
  brush.spline([[490, 200], [498, 210], [504, 205], [510, 220]], 0.3);
  brush.spline([[525, 195], [532, 208], [538, 202], [545, 215]], 0.3);

  // Final horizon emphasis
  brush.set("rotring", "#2a1e10", 0.45);
  brush.line(0, 284, 600, 284);

  // Atmospheric dust near horizon
  brush.set("spray", "#c8a870", 0.3);
  for (let i = 0; i < 20; i++) {
    let x = noise(i * 1.5) * 600;
    let y = 278 + noise(i * 0.8 + 50) * 12;
    brush.line(x, y, x + noise(i * 2) * 8, y + 1);
  }
}

function draw() {
  translate(-width / 2, -height / 2);
  noLoop();
}