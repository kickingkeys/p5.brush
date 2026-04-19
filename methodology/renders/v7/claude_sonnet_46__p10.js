function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky wash: pale ochre gradient bands ---
  brush.noStroke();
  brush.noHatch();

  brush.wash("#e8d9b0", 180);
  brush.rect(0, 0, 600, 310);
  brush.noWash();

  brush.fill("#e2cfa0", 120);
  brush.fillBleed(0.18, "out");
  brush.fillTexture(0.5, 0.2);
  brush.rect(0, 0, 600, 310);
  brush.noFill();

  // --- Ground: layered sand washes ---
  brush.wash("#d4b87a", 200);
  brush.rect(0, 295, 600, 305);
  brush.noWash();

  brush.fill("#c8a85e", 160);
  brush.fillBleed(0.22, "out");
  brush.fillTexture(0.65, 0.35);
  brush.rect(0, 295, 600, 305);
  brush.noFill();

  brush.fill("#b8943f", 90);
  brush.fillBleed(0.28, "in");
  brush.fillTexture(0.7, 0.4);
  brush.rect(0, 340, 600, 260);
  brush.noFill();

  brush.fill("#a07830", 70);
  brush.fillBleed(0.3, "in");
  brush.fillTexture(0.6, 0.3);
  brush.rect(0, 420, 600, 180);
  brush.noFill();

  // --- Cracked desert floor texture: thin 2H hatch lines ---
  brush.noFill();
  brush.hatchStyle("2H", "#b09060", 0.5);
  brush.hatch(9, 0, { rand: 0.12, continuous: false });
  brush.rect(0, 300, 600, 300);
  brush.noHatch();

  brush.hatchStyle("2H", "#907040", 0.4);
  brush.hatch(14, 90, { rand: 0.18, continuous: false });
  brush.rect(0, 310, 600, 290);
  brush.noHatch();

  brush.hatchStyle("HB", "#806030", 0.5);
  brush.hatch(22, 45, { rand: 0.25, continuous: false });
  brush.rect(0, 330, 600, 270);
  brush.noHatch();

  // --- Crack lines across the desert floor ---
  brush.set("2H", "#7a5c2a", 0.6);
  brush.spline([[30, 340], [90, 355], [160, 348], [220, 370], [300, 360], [370, 375]], 0.35);
  brush.spline([[200, 390], [260, 400], [310, 415], [380, 408], [440, 425]], 0.3);
  brush.spline([[80, 430], [150, 440], [200, 455], [270, 448], [320, 465]], 0.28);
  brush.spline([[350, 350], [400, 365], [460, 358], [520, 375], [580, 368]], 0.3);
  brush.spline([[420, 410], [470, 425], [530, 418], [590, 435]], 0.25);
  brush.spline([[50, 480], [120, 490], [190, 500], [260, 488], [320, 505]], 0.28);
  brush.spline([[300, 520], [360, 510], [420, 530], [490, 520], [560, 540]], 0.25);
  brush.spline([[10, 550], [80, 540], [140, 558], [210, 548], [280, 565]], 0.22);

  brush.set("HB", "#5a4020", 0.7);
  brush.spline([[100, 360], [130, 390], [120, 430], [145, 470]], 0.4);
  brush.spline([[310, 370], [330, 400], [320, 440], [340, 480]], 0.35);
  brush.spline([[480, 380], [500, 415], [490, 455], [510, 490]], 0.35);
  brush.spline([[200, 500], [215, 530], [205, 560], [220, 590]], 0.3);
  brush.spline([[450, 460], [465, 490], [455, 520], [470, 560]], 0.28);

  // --- Rock formations: jagged charcoal shapes ---
  brush.wiggle(3);

  // Left rock cluster
  brush.noFill();
  brush.noHatch();
  brush.mass("crayon", "#2a2218", { strength: 0.85, precision: 0.3, gradient: 0.2, outline: false });
  brush.beginShape(0.15);
  brush.vertex(-5, 600);
  brush.vertex(0, 480);
  brush.vertex(20, 410);
  brush.vertex(45, 370);
  brush.vertex(70, 330);
  brush.vertex(85, 295);
  brush.vertex(100, 265);
  brush.vertex(110, 290);
  brush.vertex(125, 310);
  brush.vertex(140, 295);
  brush.vertex(155, 270);
  brush.vertex(165, 295);
  brush.vertex(175, 320);
  brush.vertex(185, 300);
  brush.vertex(195, 315);
  brush.vertex(210, 340);
  brush.vertex(220, 380);
  brush.vertex(215, 430);
  brush.vertex(200, 500);
  brush.vertex(180, 600);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#1a1510", { strength: 0.7, precision: 0.4, gradient: 0.3, outline: false });
  brush.beginShape(0.2);
  brush.vertex(-5, 600);
  brush.vertex(0, 500);
  brush.vertex(15, 440);
  brush.vertex(35, 390);
  brush.vertex(60, 350);
  brush.vertex(80, 320);
  brush.vertex(100, 295);
  brush.vertex(115, 315);
  brush.vertex(130, 330);
  brush.vertex(150, 310);
  brush.vertex(170, 330);
  brush.vertex(185, 355);
  brush.vertex(195, 390);
  brush.vertex(190, 450);
  brush.vertex(175, 530);
  brush.vertex(160, 600);
  brush.endShape(true);
  brush.noMass();

  // Middle-left rock spire
  brush.mass("crayon", "#2e2418", { strength: 0.9, precision: 0.25, gradient: 0.15, outline: false });
  brush.beginShape(0.12);
  brush.vertex(230, 600);
  brush.vertex(225, 520);
  brush.vertex(235, 450);
  brush.vertex(245, 400);
  brush.vertex(255, 360);
  brush.vertex(262, 320);
  brush.vertex(268, 290);
  brush.vertex(272, 270);
  brush.vertex(278, 255);
  brush.vertex(284, 270);
  brush.vertex(290, 290);
  brush.vertex(298, 310);
  brush.vertex(305, 295);
  brush.vertex(310, 280);
  brush.vertex(316, 295);
  brush.vertex(320, 315);
  brush.vertex(328, 340);
  brush.vertex(335, 370);
  brush.vertex(340, 410);
  brush.vertex(338, 470);
  brush.vertex(325, 540);
  brush.vertex(310, 600);
  brush.endShape(true);
  brush.noMass();

  // Right rock formation
  brush.mass("crayon", "#251e14", { strength: 0.88, precision: 0.3, gradient: 0.2, outline: false });
  brush.beginShape(0.15);
  brush.vertex(420, 600);
  brush.vertex(415, 520);
  brush.vertex(420, 450);
  brush.vertex(430, 400);
  brush.vertex(440, 360);
  brush.vertex(448, 330);
  brush.vertex(455, 305);
  brush.vertex(462, 285);
  brush.vertex(468, 268);
  brush.vertex(474, 252);
  brush.vertex(480, 268);
  brush.vertex(486, 285);
  brush.vertex(494, 300);
  brush.vertex(502, 285);
  brush.vertex(508, 270);
  brush.vertex(515, 285);
  brush.vertex(522, 305);
  brush.vertex(530, 325);
  brush.vertex(540, 350);
  brush.vertex(548, 380);
  brush.vertex(555, 420);
  brush.vertex(558, 470);
  brush.vertex(552, 540);
  brush.vertex(540, 600);
  brush.endShape(true);
  brush.noMass();

  // Far right rock
  brush.mass("crayon", "#1e1a10", { strength: 0.75, precision: 0.35, gradient: 0.25, outline: false });
  brush.beginShape(0.15);
  brush.vertex(570, 600);
  brush.vertex(565, 530);
  brush.vertex(568, 470);
  brush.vertex(572, 420);
  brush.vertex(578, 380);
  brush.vertex(583, 350);
  brush.vertex(588, 330);
  brush.vertex(592, 315);
  brush.vertex(596, 330);
  brush.vertex(600, 350);
  brush.vertex(600, 600);
  brush.endShape(true);
  brush.noMass();

  // --- Charcoal hatch shading on rocks ---
  brush.noMass();
  brush.hatchStyle("charcoal", "#1a1510", 1.2);
  brush.hatch(5, 120, { rand: 0.18, continuous: false });

  brush.beginShape(0.15);
  brush.vertex(60, 310);
  brush.vertex(80, 290);
  brush.vertex(105, 275);
  brush.vertex(125, 295);
  brush.vertex(140, 310);
  brush.vertex(150, 340);
  brush.vertex(140, 370);
  brush.vertex(120, 360);
  brush.vertex(90, 345);
  brush.vertex(65, 330);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("charcoal", "#111008", 1.0);
  brush.hatch(4, 105, { rand: 0.2, continuous: false });
  brush.beginShape(0.15);
  brush.vertex(460, 265);
  brush.vertex(480, 250);
  brush.vertex(500, 268);
  brush.vertex(515, 285);
  brush.vertex(520, 310);
  brush.vertex(510, 335);
  brush.vertex(490, 325);
  brush.vertex(470, 310);
  brush.vertex(458, 290);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("charcoal", "#161210", 0.9);
  brush.hatch(6, 75, { rand: 0.15, continuous: false });
  brush.beginShape(0.12);
  brush.vertex(268, 260);
  brush.vertex(282, 248);
  brush.vertex(295, 262);
  brush.vertex(308, 278);
  brush.vertex(315, 300);
  brush.vertex(305, 318);
  brush.vertex(288, 308);
  brush.vertex(272, 295);
  brush.vertex(264, 278);
  brush.endShape(true);
  brush.noHatch();

  brush.noField();

  // --- Charcoal outline strokes on rocks ---
  brush.set("charcoal", "#1a1510", 1.8);
  brush.spline([[0, 480], [20, 410], [45, 370], [70, 330], [85, 295], [100, 265], [110, 285], [125, 308], [140, 293], [155, 268], [165, 292], [175, 318], [185, 298], [195, 314], [210, 338], [220, 380], [210, 450], [190, 530]], 0.18);

  brush.set("charcoal", "#14120c", 1.6);
  brush.spline([[230, 520], [235, 450], [245, 398], [255, 358], [262, 318], [270, 285], [278, 253], [285, 270], [292, 292], [300, 308], [307, 292], [312, 278], [318, 294], [324, 316], [332, 342], [338, 372], [340, 415], [336, 475], [322, 545]], 0.15);

  brush.set("charcoal", "#1c1812", 1.7);
  brush.spline([[420, 450], [430, 398], [440, 358], [448, 328], [455, 303], [462, 283], [468, 266], [474, 250], [481, 266], [488, 283], [496, 298], [504, 283], [510, 268], [517, 283], [524, 303], [532, 323], [542, 348], [550, 380], [556, 422], [558, 472], [550, 545]], 0.15);

  // --- Horizon line: single thin pen stroke ---
  brush.set("pen", "#3a2e1a", 0.5);
  brush.line(0, 308, 600, 308);

  brush.set("pen", "#2a2010", 0.35);
  brush.line(0, 304, 600, 304);

  // --- Atmospheric dust: sparse spray near horizon ---
  brush.set("spray", "#c8a060", 1.2);
  for (let i = 0; i < 30; i++) {
    let x = random(0, 600);
    let y = random(295, 330);
    brush.flowLine(x, y, random(8, 20), random(360));
  }

  brush.set("spray", "#b08040", 0.8);
  for (let i = 0; i < 20; i++) {
    let x = random(0, 600);
    let y = random(300, 340);
    brush.flowLine(x, y, random(5, 14), random(360));
  }

  noLoop();
}