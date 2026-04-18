function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fdf6ec");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // === BACKGROUND WASHES ===
  brush.noStroke();
  brush.fill("#e8d5c0", 18);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.3, 0.2);
  brush.circle(300, 290, 220);

  brush.fill("#d4bfa8", 12);
  brush.fillBleed(0.12, "out");
  brush.circle(300, 310, 180);

  // === NECK ===
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#c9a882", 0.9);
  brush.line(275, 430, 265, 510);
  brush.line(285, 432, 276, 512);
  brush.set("2H", "#d4b896", 0.7);
  brush.line(320, 430, 328, 510);
  brush.line(310, 432, 318, 512);
  brush.set("HB", "#b8976e", 0.5);
  brush.line(270, 435, 260, 515);
  brush.line(325, 435, 335, 515);

  // === FACE SHAPE - layered colored pencil ===
  brush.noStroke();
  brush.fill("#e2c9a8", 22);
  brush.fillBleed(0.06);
  brush.fillTexture(0.4, 0.25);
  brush.beginShape(0.4);
  brush.vertex(230, 210);
  brush.vertex(210, 260);
  brush.vertex(205, 320);
  brush.vertex(215, 380);
  brush.vertex(240, 420);
  brush.vertex(270, 438);
  brush.vertex(300, 442);
  brush.vertex(330, 438);
  brush.vertex(360, 420);
  brush.vertex(385, 380);
  brush.vertex(395, 320);
  brush.vertex(390, 260);
  brush.vertex(370, 210);
  brush.vertex(340, 190);
  brush.vertex(300, 185);
  brush.vertex(260, 190);
  brush.endShape(true);

  brush.fill("#dfc4a2", 15);
  brush.fillBleed(0.05);
  brush.fillTexture(0.35, 0.2);
  brush.beginShape(0.4);
  brush.vertex(235, 215);
  brush.vertex(215, 265);
  brush.vertex(210, 325);
  brush.vertex(220, 382);
  brush.vertex(245, 422);
  brush.vertex(272, 439);
  brush.vertex(300, 443);
  brush.vertex(328, 439);
  brush.vertex(355, 422);
  brush.vertex(380, 382);
  brush.vertex(390, 325);
  brush.vertex(385, 265);
  brush.vertex(365, 215);
  brush.vertex(338, 193);
  brush.vertex(300, 188);
  brush.vertex(263, 193);
  brush.endShape(true);

  // warm undertone
  brush.fill("#e8b88a", 9);
  brush.fillBleed(0.07, "in");
  brush.fillTexture(0.5, 0.3);
  brush.circle(300, 310, 160);

  // cool shadow undertone
  brush.fill("#9ab4c8", 8);
  brush.fillBleed(0.1, "in");
  brush.fillTexture(0.4, 0.2);
  brush.circle(260, 340, 80);
  brush.circle(340, 340, 80);

  // rosy cheeks
  brush.fill("#e8909a", 10);
  brush.fillBleed(0.18, "out");
  brush.fillTexture(0.6, 0.1);
  brush.circle(245, 340, 55);
  brush.circle(355, 340, 55);

  // === FACE OUTLINE STROKES ===
  brush.noFill();
  brush.set("2H", "#b08060", 0.6);
  brush.beginShape(0.45);
  brush.vertex(232, 212);
  brush.vertex(212, 262);
  brush.vertex(207, 322);
  brush.vertex(217, 382);
  brush.vertex(242, 422);
  brush.vertex(270, 440);
  brush.vertex(300, 444);
  brush.vertex(330, 440);
  brush.vertex(358, 422);
  brush.vertex(383, 382);
  brush.vertex(393, 322);
  brush.vertex(388, 262);
  brush.vertex(368, 212);
  brush.vertex(338, 192);
  brush.vertex(300, 186);
  brush.vertex(262, 192);
  brush.endShape(true);

  brush.set("cpencil", "#c8a070", 0.5);
  brush.beginShape(0.4);
  brush.vertex(228, 218);
  brush.vertex(208, 268);
  brush.vertex(203, 328);
  brush.vertex(213, 385);
  brush.vertex(238, 424);
  brush.vertex(268, 441);
  brush.vertex(300, 445);
  brush.vertex(332, 441);
  brush.vertex(362, 424);
  brush.vertex(387, 385);
  brush.vertex(397, 328);
  brush.vertex(392, 268);
  brush.vertex(372, 218);
  brush.vertex(340, 194);
  brush.vertex(300, 187);
  brush.vertex(260, 194);
  brush.endShape(true);

  // === HAIR ===
  brush.noFill();
  brush.set("charcoal", "#2a1a3e", 0.7);
  for (let i = 0; i < 18; i++) {
    let sx = 200 + i * 11;
    let sy = 185 + sin(i * 23) * 12;
    brush.line(sx, sy, sx - 5 + sin(i * 17) * 8, sy - 55 + cos(i * 13) * 10);
  }
  brush.set("2B", "#1e1030", 0.8);
  for (let i = 0; i < 14; i++) {
    let sx = 215 + i * 13;
    brush.line(sx, 190 + sin(i * 19) * 8, sx + sin(i * 11) * 10, 135 + cos(i * 17) * 12);
  }
  brush.set("cpencil", "#3d2255", 0.6);
  for (let i = 0; i < 20; i++) {
    let sx = 195 + i * 10.5;
    brush.line(sx, 195 + sin(i * 31) * 10, sx - 3 + sin(i * 23) * 12, 140 + sin(i * 7) * 15);
  }
  // side hair left
  brush.set("charcoal", "#2a1a3e", 0.6);
  for (let i = 0; i < 10; i++) {
    brush.line(205 + sin(i * 13) * 5, 200 + i * 18, 185 + sin(i * 17) * 8, 210 + i * 18);
  }
  // side hair right
  for (let i = 0; i < 10; i++) {
    brush.line(395 - sin(i * 13) * 5, 200 + i * 18, 415 - sin(i * 17) * 8, 210 + i * 18);
  }
  // hair color accent - purple
  brush.set("cpencil", "#6b3fa0", 0.5);
  for (let i = 0; i < 12; i++) {
    let sx = 220 + i * 12;
    brush.line(sx, 188 + sin(i * 29) * 6, sx + sin(i * 19) * 9, 148 + cos(i * 23) * 8);
  }

  // === EYEBROWS ===
  brush.set("2B", "#3a2040", 0.7);
  brush.spline([[240, 258], [258, 248], [278, 245], [295, 248]], 0.5);
  brush.spline([[305, 248], [322, 245], [342, 248], [358, 258]], 0.5);
  brush.set("HB", "#5a3060", 0.5);
  brush.spline([[242, 261], [260, 251], [280, 248], [294, 251]], 0.5);
  brush.spline([[306, 251], [320, 248], [340, 251], [356, 261]], 0.5);

  // === EYES ===
  // left eye socket shadow
  brush.noStroke();
  brush.fill("#8899bb", 14);
  brush.fillBleed(0.1, "out");
  brush.fillTexture(0.5, 0.2);
  brush.circle(268, 290, 32);

  // right eye socket shadow
  brush.fill("#8899bb", 14);
  brush.fillBleed(0.1, "out");
  brush.fillTexture(0.5, 0.2);
  brush.circle(332, 290, 32);

  // left eye iris
  brush.fill("#4a7a9b", 35);
  brush.fillBleed(0.08);
  brush.fillTexture(0.6, 0.3);
  brush.circle(268, 292, 16);

  // right eye iris
  brush.fill("#4a7a9b", 35);
  brush.fillBleed(0.08);
  brush.fillTexture(0.6, 0.3);
  brush.circle(332, 292, 16);

  // iris color variation
  brush.fill("#7ab8c8", 20);
  brush.fillBleed(0.06);
  brush.circle(268, 292, 12);
  brush.circle(332, 292, 12);

  // pupils
  brush.fill("#1a1020", 60);
  brush.fillBleed(0.04);
  brush.circle(268, 293, 7);
  brush.circle(332, 293, 7);

  // eye whites
  brush.fill("#f0ece8", 25);
  brush.fillBleed(0.05);
  brush.fillTexture(0.2, 0.1);
  brush.beginShape(0.5);
  brush.vertex(248, 290);
  brush.vertex(258, 283);
  brush.vertex(268, 281);
  brush.vertex(278, 283);
  brush.vertex(285, 290);
  brush.vertex(278, 297);
  brush.vertex(268, 299);
  brush.vertex(258, 297);
  brush.endShape(true);

  brush.beginShape(0.5);
  brush.vertex(315, 290);
  brush.vertex(322, 283);
  brush.vertex(332, 281);
  brush.vertex(342, 283);
  brush.vertex(352, 290);
  brush.vertex(342, 297);
  brush.vertex(332, 299);
  brush.vertex(322, 297);
  brush.endShape(true);

  // eye lines
  brush.noFill();
  brush.set("2B", "#1a1030", 0.7);
  brush.spline([[248, 290], [258, 282], [268, 280], [278, 282], [285, 290]], 0.5);
  brush.spline([[248, 290], [258, 298], [268, 300], [278, 298], [285, 290]], 0.5);
  brush.spline([[315, 290], [322, 282], [332, 280], [342, 282], [352, 290]], 0.5);
  brush.spline([[315, 290], [322, 298], [332, 300], [342, 298], [352, 290]], 0.5);

  // eyelashes upper left
  brush.set("charcoal", "#1a1030", 0.5);
  for (let i = 0; i < 8; i++) {
    let t = i / 7;
    let ex = 248 + t * 37;
    let ey = 282 + sin(t * 180) * 8;
    brush.line(ex, ey, ex - 1 + sin(i * 37) * 2, ey - 5 - sin(i * 53) * 2);
  }
  for (let i = 0; i < 8; i++) {
    let t = i / 7;
    let ex = 315 + t * 37;
    let ey = 282 + sin(t * 180) * 8;
    brush.line(ex, ey, ex - 1 + sin(i * 37) * 2, ey - 5 - sin(i * 53) * 2);
  }

  // === NOSE ===
  brush.set("2H", "#c09878", 0.6);
  brush.spline([[290, 315], [283, 345], [278, 368], [285, 378], [300, 382], [315, 378], [322, 368], [317, 345], [310, 315]], 0.4);
  brush.set("HB", "#b08060", 0.5);
  brush.spline([[295, 318], [288, 348], [283, 370], [290, 380], [300, 383], [310, 380], [317, 370], [312, 348], [305, 318]], 0.4);
  // nostril hints
  brush.set("2B", "#a07050", 0.6);
  brush.arc(288, 378, 8, 180, 360);
  brush.arc(312, 378, 8, 180, 360);

  // nose shadow
  brush.noStroke();
  brush.fill("#c08860", 8);
  brush.fillBleed(0.1, "in");
  brush.circle(292, 370, 18);
  brush.circle(308, 370, 18);

  // === MOUTH ===
  brush.noStroke();
  brush.fill("#c86878", 22);
  brush.fillBleed(0.09);
  brush.fillTexture(0.5, 0.3);
  brush.beginShape(0.5);
  brush.vertex(272, 408);
  brush.vertex(285, 402);
  brush.vertex(300, 400);
  brush.vertex(315, 402);
  brush.vertex(328, 408);
  brush.vertex(315, 418);
  brush.vertex(300, 421);
  brush.vertex(285, 418);
  brush.endShape(true);

  brush.fill("#e8909a", 18);
  brush.fillBleed(0.07);
  brush.fillTexture(0.4, 0.2);
  brush.beginShape(0.5);
  brush.vertex(274, 407);
  brush.vertex(286, 401);
  brush.vertex(300, 399);
  brush.vertex(314, 401);
  brush.vertex(326, 407);
  brush.vertex(314, 416);
  brush.vertex(300, 419);
  brush.vertex(286, 416);
  brush.endShape(true);

  brush.noFill();
  brush.set("2B", "#8a3040", 0.6);
  brush.spline([[272, 408], [285, 401], [300, 399], [315, 401], [328, 408]], 0.5);
  brush.spline([[272, 408], [285, 418], [300, 422], [315, 418], [328, 408]], 0.5);
  // cupid's bow
  brush.set("cpencil", "#b04050", 0.5);
  brush.spline([[278, 407], [290, 400], [300, 402], [310, 400], [322, 407]], 0.4);
  // lower lip highlight
  brush.set("2H", "#f0b8b8", 0.5);
  brush.spline([[286, 416], [300, 420], [314, 416]], 0.4);

  // === EARS ===
  brush.noFill();
  brush.set("2H", "#c9a882", 0.6);
  brush.arc(205, 308, 18, 90, 270);
  brush.arc(395, 308, 18, 270, 90);
  brush.set("HB", "#b08060", 0.5);
  brush.arc(207, 310, 15, 95, 265);
  brush.arc(393, 310, 15, 275, 85);

  // === FOREHEAD TEXTURE STROKES ===
  brush.set("2H", "#c8a880", 0.4);
  for (let i = 0; i < 6; i++) {
    let y = 210 + i * 8;
    brush.line(250 + sin(i * 37) * 5, y, 350 - sin(i * 29) * 5, y + 2);
  }

  // === CHEEK TEXTURE ===
  brush.set("2H", "#d4a898", 0.4);
  for (let i = 0; i < 8; i++) {
    brush.line(225 + sin(i * 41) * 4, 330 + i * 8, 255 + cos(i * 37) * 4, 332 + i * 8);
    brush.line(345 - sin(i * 41) * 4, 330 + i * 8, 375 - cos(i * 37) * 4, 332 + i * 8);
  }

  // === LOOSE EXPRESSIVE STROKES across face ===
  brush.set("cpencil", "#7a5090", 0.4);
  brush.line(240, 250, 280, 265);
  brush.line(320, 250, 360, 265);
  brush.line(260, 390, 295, 398);
  brush.line(305, 398, 340, 390);

  brush.set("2H", "#5a8ab0", 0.4);
  brush.line(215, 300, 235, 315);
  brush.line(365, 300, 385, 315);
  brush.line(270, 200, 290, 215);
  brush.line(310, 200, 330, 215);

  brush.set("HB", "#c06040", 0.4);
  brush.line(255, 360, 275, 370);
  brush.line(325, 360, 345, 370);

  // === SCATTERED MARKS - memory/mood quality ===
  brush.set("2H", "#9090c0", 0.35);
  for (let i = 0; i < 12; i++) {
    let x = 210 + (i * 157) % 180;
    let y = 200 + (i * 113) % 240;
    brush.line(x, y, x + sin(i * 73) * 15, y + cos(i * 61) * 8);
  }

  brush.set("cpencil", "#c0a060", 0.3);
  for (let i = 0; i < 8; i++) {
    let x = 220 + (i * 199) % 160;
    let y = 220 + (i * 137) % 200;
    brush.line(x, y, x + cos(i * 83) * 12, y + sin(i * 67) * 6);
  }

  // === SHOULDER HINTS ===
  brush.set("2H", "#c8b090", 0.6);
  brush.spline([[200, 520], [230, 510], [265, 508], [300, 510], [335, 508], [370, 510], [400, 520]], 0.4);
  brush.set("cpencil", "#b89878", 0.5);
  brush.spline([[195, 525], [228, 515], [265, 512], [300, 514], [335, 512], [372, 515], [405, 525]], 0.4);
  brush.set("2H", "#9090a8", 0.4);
  brush.spline([[210, 530], [240, 520], [270, 518], [300, 520], [330, 518], [360, 520], [390, 530]], 0.4);

  noLoop();
}