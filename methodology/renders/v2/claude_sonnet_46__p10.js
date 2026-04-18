function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky wash (upper portion) ---
  brush.noStroke();
  brush.wash("#e8d9c0", 180);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 300);
  brush.vertex(0, 300);
  brush.endShape(true);
  brush.noWash();

  // --- Desert ground - base sand layer ---
  brush.wash("#d4b483", 200);
  brush.fill("#c9a96e", 160);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.7, 0.4);
  brush.beginShape(0.3);
  brush.vertex(0, 290);
  brush.vertex(600, 290);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // --- Second sand layer - mid tone ---
  brush.fill("#bf9456", 140);
  brush.fillBleed(0.35, "out");
  brush.fillTexture(0.6, 0.35);
  brush.beginShape(0.4);
  brush.vertex(0, 320);
  brush.vertex(600, 310);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // --- Deeper sand layer - shadow depth ---
  brush.fill("#a87c44", 120);
  brush.fillBleed(0.25, "in");
  brush.fillTexture(0.5, 0.3);
  brush.beginShape(0.4);
  brush.vertex(0, 380);
  brush.vertex(600, 360);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // --- Horizon line - thin pen ---
  brush.set("pen", "#3a2e1e", 0.5);
  brush.line(0, 298, 600, 298);
  brush.noStroke();

  // --- Rock formation left - large jagged mass ---
  brush.mass("crayon", "#2e2418", {
    strength: 0.85,
    precision: 0.3,
    gradient: 0.4,
    outline: false
  });
  brush.hatchStyle("charcoal", "#1a1208", 1.2);
  brush.hatch(5, 55, { rand: 0.18, continuous: false });
  brush.beginShape(0.2);
  brush.vertex(0, 600);
  brush.vertex(0, 420);
  brush.vertex(20, 390);
  brush.vertex(35, 350);
  brush.vertex(55, 370);
  brush.vertex(70, 320);
  brush.vertex(90, 290);
  brush.vertex(110, 310);
  brush.vertex(125, 280);
  brush.vertex(145, 295);
  brush.vertex(160, 340);
  brush.vertex(180, 360);
  brush.vertex(200, 380);
  brush.vertex(210, 430);
  brush.vertex(220, 600);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Rock formation right - jagged spire cluster ---
  brush.mass("crayon", "#251e12", {
    strength: 0.9,
    precision: 0.25,
    gradient: 0.35,
    outline: false
  });
  brush.hatchStyle("charcoal", "#111008", 1.4);
  brush.hatch(4, 70, { rand: 0.2, continuous: false });
  brush.beginShape(0.2);
  brush.vertex(380, 600);
  brush.vertex(370, 460);
  brush.vertex(385, 400);
  brush.vertex(400, 360);
  brush.vertex(415, 330);
  brush.vertex(430, 310);
  brush.vertex(445, 295);
  brush.vertex(460, 280);
  brush.vertex(475, 300);
  brush.vertex(490, 270);
  brush.vertex(505, 285);
  brush.vertex(520, 295);
  brush.vertex(535, 310);
  brush.vertex(550, 340);
  brush.vertex(565, 370);
  brush.vertex(580, 400);
  brush.vertex(600, 440);
  brush.vertex(600, 600);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Mid-ground rock cluster center ---
  brush.mass("pastel", "#332a1a", {
    strength: 0.7,
    precision: 0.4,
    gradient: 0.3,
    outline: false
  });
  brush.hatchStyle("charcoal", "#221a0e", 1.0);
  brush.hatch(6, 40, { rand: 0.15, continuous: false });
  brush.beginShape(0.25);
  brush.vertex(240, 600);
  brush.vertex(235, 480);
  brush.vertex(250, 430);
  brush.vertex(265, 400);
  brush.vertex(280, 370);
  brush.vertex(295, 355);
  brush.vertex(310, 345);
  brush.vertex(325, 355);
  brush.vertex(338, 375);
  brush.vertex(350, 400);
  brush.vertex(360, 440);
  brush.vertex(368, 500);
  brush.vertex(370, 600);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Crack lines across desert floor ---
  brush.field("hand");
  brush.wiggle(2);

  brush.set("2B", "#5c4a2a", 0.5);
  brush.spline([
    [80, 350], [130, 365], [190, 358], [260, 375], [330, 362], [400, 380], [480, 368], [560, 385]
  ], 0.3);

  brush.set("HB", "#6b5535", 0.4);
  brush.spline([
    [0, 410], [60, 420], [140, 408], [220, 425], [300, 415]
  ], 0.25);

  brush.set("HB", "#6b5535", 0.4);
  brush.spline([
    [300, 430], [370, 418], [450, 435], [530, 422], [600, 440]
  ], 0.25);

  brush.set("2B", "#4a3a1e", 0.45);
  brush.spline([
    [30, 480], [100, 468], [170, 485], [240, 472]
  ], 0.3);

  brush.set("2B", "#4a3a1e", 0.45);
  brush.spline([
    [370, 490], [440, 475], [510, 492], [580, 480], [600, 485]
  ], 0.3);

  brush.set("HB", "#7a6040", 0.35);
  brush.spline([
    [50, 530], [120, 518], [200, 535], [280, 520], [350, 538]
  ], 0.2);

  brush.set("HB", "#7a6040", 0.35);
  brush.spline([
    [370, 545], [430, 530], [500, 548], [580, 535]
  ], 0.2);

  // --- Vertical crack fissures ---
  brush.set("2B", "#3d2e14", 0.4);
  brush.spline([
    [155, 345], [150, 380], [162, 420], [155, 460], [160, 510]
  ], 0.35);

  brush.set("HB", "#5a4525", 0.35);
  brush.spline([
    [320, 355], [315, 390], [325, 430], [318, 470]
  ], 0.3);

  brush.set("2B", "#3d2e14", 0.4);
  brush.spline([
    [450, 370], [445, 410], [455, 455], [448, 500], [452, 550]
  ], 0.35);

  brush.noField();

  // --- Sand texture hatch across ground ---
  brush.noStroke();
  brush.hatchStyle("2H", "#c8a870", 0.5);
  brush.hatch(9, 8, { rand: 0.08, continuous: false, gradient: 0.2 });
  brush.beginShape(0.3);
  brush.vertex(220, 320);
  brush.vertex(380, 320);
  brush.vertex(380, 600);
  brush.vertex(220, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Charcoal texture on rock faces ---
  brush.set("charcoal", "#1c1508", 0.8);
  brush.wiggle(3);
  brush.field("hand");

  brush.spline([
    [30, 380], [50, 360], [75, 340], [95, 355], [115, 340]
  ], 0.3);

  brush.spline([
    [415, 310], [435, 295], [458, 285], [478, 300], [495, 285]
  ], 0.3);

  brush.spline([
    [260, 370], [278, 355], [298, 348], [318, 358]
  ], 0.3);

  brush.noField();

  // --- Thin horizon detail strokes ---
  brush.set("rotring", "#8a7050", 0.3);
  brush.line(0, 302, 600, 302);
  brush.set("rotring", "#9a8060", 0.25);
  brush.line(0, 306, 600, 306);

  // --- Atmospheric haze near horizon ---
  brush.noStroke();
  brush.wash("#e8d0a8", 60);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 280);
  brush.vertex(600, 280);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);
  brush.noWash();

  noLoop();
}