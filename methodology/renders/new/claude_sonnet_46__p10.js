function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Sky wash — pale warm tone above horizon
  brush.noStroke();
  brush.wash("#f5e8c8", 180);
  brush.rect(0, 0, 600, 310, "corner");
  brush.noWash();

  // Distant haze band just above horizon
  brush.wash("#e8d4a0", 120);
  brush.rect(0, 280, 600, 40, "corner");
  brush.noWash();

  // Ground base wash — sandy desert floor
  brush.wash("#d4b87a", 200);
  brush.rect(0, 310, 600, 290, "corner");
  brush.noWash();

  // Second sand layer — mid-ground warm tone
  brush.fill("#c9a85c", 160);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.7, 0.35);
  brush.noStroke();
  brush.beginShape(0.3);
  brush.vertex(0, 340);
  brush.vertex(80, 330);
  brush.vertex(160, 345);
  brush.vertex(240, 328);
  brush.vertex(320, 342);
  brush.vertex(400, 325);
  brush.vertex(480, 338);
  brush.vertex(600, 330);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Deep shadow wash in foreground cracks
  brush.fill("#b8934a", 140);
  brush.fillBleed(0.3, "in");
  brush.fillTexture(0.8, 0.4);
  brush.noStroke();
  brush.beginShape(0.2);
  brush.vertex(0, 420);
  brush.vertex(100, 410);
  brush.vertex(200, 425);
  brush.vertex(300, 415);
  brush.vertex(400, 428);
  brush.vertex(500, 412);
  brush.vertex(600, 420);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Darkest foreground shadow
  brush.fill("#a07830", 120);
  brush.fillBleed(0.2, "in");
  brush.fillTexture(0.6, 0.3);
  brush.noStroke();
  brush.beginShape(0.2);
  brush.vertex(0, 510);
  brush.vertex(120, 500);
  brush.vertex(240, 515);
  brush.vertex(360, 505);
  brush.vertex(480, 518);
  brush.vertex(600, 508);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Rock formation LEFT — jagged charcoal mass
  brush.noStroke();
  brush.mass("crayon", "#2a2018", { strength: 0.85, precision: 0.35, gradient: 0.4, outline: false });
  brush.beginShape(0.15);
  brush.vertex(0, 400);
  brush.vertex(0, 310);
  brush.vertex(25, 295);
  brush.vertex(45, 270);
  brush.vertex(60, 285);
  brush.vertex(75, 258);
  brush.vertex(90, 272);
  brush.vertex(108, 245);
  brush.vertex(122, 260);
  brush.vertex(138, 240);
  brush.vertex(155, 255);
  brush.vertex(170, 268);
  brush.vertex(185, 252);
  brush.vertex(200, 310);
  brush.vertex(210, 330);
  brush.vertex(195, 360);
  brush.vertex(180, 380);
  brush.vertex(140, 395);
  brush.vertex(80, 405);
  brush.endShape(true);
  brush.noMass();

  // Rock formation LEFT — charcoal outline strokes
  brush.set("charcoal", "#1a1208", 1.2);
  brush.noFill();
  brush.noHatch();
  brush.spline([
    [25, 295], [45, 270], [60, 285], [75, 258],
    [90, 272], [108, 245], [122, 260], [138, 240],
    [155, 255], [170, 268], [185, 252], [200, 310]
  ], 0.25);
  brush.noStroke();

  // Rock formation LEFT — shadow hatch
  brush.hatchStyle("2B", "#1a1208", 1.0);
  brush.hatch(4, 55, { rand: 0.15, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(0, 380);
  brush.vertex(0, 320);
  brush.vertex(30, 300);
  brush.vertex(60, 290);
  brush.vertex(90, 295);
  brush.vertex(110, 280);
  brush.vertex(130, 285);
  brush.vertex(150, 295);
  brush.vertex(160, 320);
  brush.vertex(140, 360);
  brush.vertex(90, 390);
  brush.vertex(40, 395);
  brush.endShape(true);
  brush.noHatch();

  // Rock formation RIGHT — jagged charcoal mass
  brush.noStroke();
  brush.mass("crayon", "#2a2018", { strength: 0.8, precision: 0.3, gradient: 0.35, outline: false });
  brush.beginShape(0.15);
  brush.vertex(380, 390);
  brush.vertex(400, 360);
  brush.vertex(415, 330);
  brush.vertex(420, 310);
  brush.vertex(435, 280);
  brush.vertex(450, 265);
  brush.vertex(462, 278);
  brush.vertex(475, 255);
  brush.vertex(490, 268);
  brush.vertex(505, 248);
  brush.vertex(520, 262);
  brush.vertex(535, 272);
  brush.vertex(548, 258);
  brush.vertex(562, 275);
  brush.vertex(575, 290);
  brush.vertex(590, 310);
  brush.vertex(600, 320);
  brush.vertex(600, 400);
  brush.vertex(520, 405);
  brush.vertex(450, 400);
  brush.endShape(true);
  brush.noMass();

  // Rock formation RIGHT — charcoal outline strokes
  brush.set("charcoal", "#1a1208", 1.1);
  brush.noFill();
  brush.spline([
    [420, 310], [435, 280], [450, 265], [462, 278],
    [475, 255], [490, 268], [505, 248], [520, 262],
    [535, 272], [548, 258], [562, 275], [575, 290], [590, 310]
  ], 0.25);
  brush.noStroke();

  // Rock formation RIGHT — shadow hatch
  brush.hatchStyle("2B", "#1a1208", 0.9);
  brush.hatch(4, 110, { rand: 0.12, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(430, 380);
  brush.vertex(440, 340);
  brush.vertex(450, 310);
  brush.vertex(465, 290);
  brush.vertex(490, 275);
  brush.vertex(520, 270);
  brush.vertex(555, 278);
  brush.vertex(580, 300);
  brush.vertex(600, 330);
  brush.vertex(600, 390);
  brush.vertex(550, 398);
  brush.vertex(480, 392);
  brush.endShape(true);
  brush.noHatch();

  // Small background rock cluster center-left
  brush.noStroke();
  brush.mass("pastel", "#1e1810", { strength: 0.65, precision: 0.45, gradient: 0.3 });
  brush.beginShape(0.2);
  brush.vertex(220, 320);
  brush.vertex(235, 305);
  brush.vertex(248, 292);
  brush.vertex(262, 300);
  brush.vertex(275, 288);
  brush.vertex(290, 295);
  brush.vertex(300, 310);
  brush.vertex(295, 325);
  brush.vertex(270, 332);
  brush.vertex(240, 330);
  brush.endShape(true);
  brush.noMass();

  // Desert crack lines — drawn with 2B pencil
  brush.set("2B", "#6b4c22", 0.6);
  brush.noFill();

  // Crack 1
  brush.spline([
    [80, 430], [110, 445], [140, 438], [175, 455],
    [210, 448], [240, 462], [260, 455]
  ], 0.3);

  // Crack 2 branching
  brush.spline([
    [140, 438], [148, 460], [152, 478], [145, 495]
  ], 0.2);

  // Crack 3
  brush.spline([
    [300, 470], [340, 458], [380, 472], [420, 462],
    [460, 478], [500, 468], [540, 482]
  ], 0.3);

  // Crack 4 branch
  brush.spline([
    [380, 472], [388, 492], [382, 510], [375, 528]
  ], 0.2);

  // Crack 5 — foreground wide
  brush.spline([
    [0, 520], [50, 508], [100, 522], [160, 515],
    [220, 528], [280, 518], [340, 532], [400, 520],
    [460, 535], [520, 525], [580, 538], [600, 532]
  ], 0.3);

  // Crack 6 branch
  brush.spline([
    [220, 528], [228, 548], [222, 568], [215, 588]
  ], 0.2);

  // Crack 7 small foreground
  brush.spline([
    [50, 555], [90, 545], [130, 558], [170, 550],
    [210, 562]
  ], 0.25);

  // Crack 8
  brush.spline([
    [350, 545], [400, 535], [450, 548], [500, 540],
    [550, 552], [600, 545]
  ], 0.25);

  brush.noStroke();

  // Sand texture — fine spray dots across ground plane
  brush.set("spray", "#c9a85c", 1.4);
  for (let i = 0; i < 180; i++) {
    let sx = random(0, 600);
    let sy = random(315, 600);
    brush.flowLine(sx, sy, random(3, 12), random(360));
  }

  // Darker sand texture
  brush.set("spray", "#9a7840", 1.0);
  for (let i = 0; i < 120; i++) {
    let sx = random(0, 600);
    let sy = random(370, 600);
    brush.flowLine(sx, sy, random(2, 8), random(360));
  }

  brush.noStroke();

  // Horizon line — single thin pen stroke
  brush.set("pen", "#3a2e1e", 0.35);
  brush.line(0, 310, 600, 310);

  // Second pass for slight variation
  brush.set("pen", "#3a2e1e", 0.25);
  brush.line(0, 312, 600, 312);

  brush.noStroke();

  noLoop();
}