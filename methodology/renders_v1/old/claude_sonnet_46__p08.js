function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#f5ede0");
  translate(-width / 2, -height / 2);

  // Sky washes - soft dawn gradients
  brush.noStroke();
  brush.noHatch();

  // Pale peach/lavender sky wash layers
  brush.fill("#e8c9a8", 60);
  brush.fillBleed(0.35, "out");
  brush.fillTexture(0.4, 0.3);
  brush.rect(0, 0, 600, 320, "corner");

  brush.fill("#d4b8c7", 40);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.5, 0.2);
  brush.rect(0, 0, 600, 200, "corner");

  brush.fill("#f0d5b0", 50);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.3, 0.25);
  brush.rect(0, 60, 600, 180, "corner");

  // Misty horizon glow
  brush.fill("#f7e8c8", 55);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.6, 0.1);
  brush.rect(80, 200, 440, 100, "corner");

  // Water - dark foggy harbor
  brush.fill("#8fa8b8", 65);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.5, 0.3);
  brush.rect(0, 320, 600, 280, "corner");

  brush.fill("#6d8fa0", 50);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.4, 0.2);
  brush.rect(0, 360, 600, 240, "corner");

  brush.fill("#7a9db0", 40);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.35, 0.15);
  brush.rect(0, 340, 600, 80, "corner");

  // Fog layer over horizon
  brush.fill("#ddd5c8", 55);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.7, 0.05);
  brush.rect(0, 280, 600, 120, "corner");

  brush.fill("#e5ddd0", 45);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.8, 0.05);
  brush.rect(0, 295, 600, 80, "corner");

  // Distant foggy landmass / dock shapes
  brush.fill("#a0b0b8", 55);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.5, 0.25);
  brush.beginShape(0.4);
  brush.vertex(0, 310);
  brush.vertex(80, 295);
  brush.vertex(160, 300);
  brush.vertex(200, 308);
  brush.vertex(200, 340);
  brush.vertex(0, 340);
  brush.endShape(true);

  brush.fill("#8898a5", 50);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.45, 0.2);
  brush.beginShape(0.3);
  brush.vertex(380, 305);
  brush.vertex(450, 295);
  brush.vertex(520, 300);
  brush.vertex(600, 308);
  brush.vertex(600, 340);
  brush.vertex(380, 340);
  brush.endShape(true);

  // Hull of boat left
  brush.fill("#5a4a3a", 80);
  brush.fillBleed(0.15, "out");
  brush.fillTexture(0.3, 0.4);
  brush.beginShape(0.2);
  brush.vertex(80, 360);
  brush.vertex(200, 352);
  brush.vertex(220, 368);
  brush.vertex(200, 382);
  brush.vertex(70, 382);
  brush.vertex(60, 372);
  brush.endShape(true);

  // Hull of boat center
  brush.fill("#4a3a2a", 85);
  brush.fillBleed(0.12, "out");
  brush.fillTexture(0.3, 0.4);
  brush.beginShape(0.2);
  brush.vertex(240, 355);
  brush.vertex(380, 348);
  brush.vertex(400, 366);
  brush.vertex(375, 385);
  brush.vertex(230, 385);
  brush.vertex(220, 368);
  brush.endShape(true);

  // Hull of boat right
  brush.fill("#5a4535", 75);
  brush.fillBleed(0.15, "out");
  brush.fillTexture(0.3, 0.35);
  brush.beginShape(0.2);
  brush.vertex(420, 358);
  brush.vertex(530, 352);
  brush.vertex(548, 368);
  brush.vertex(530, 384);
  brush.vertex(415, 384);
  brush.vertex(405, 370);
  brush.endShape(true);

  // Water reflections - soft washes
  brush.fill("#5a7080", 35);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.6, 0.1);
  brush.rect(70, 382, 160, 30, "corner");

  brush.fill("#4a6070", 30);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.6, 0.1);
  brush.rect(225, 385, 160, 35, "corner");

  brush.fill("#506878", 28);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.6, 0.1);
  brush.rect(408, 384, 145, 30, "corner");

  // Dark water ripple washes
  brush.fill("#4a6575", 30);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.5, 0.08);
  brush.rect(0, 420, 600, 60, "corner");

  brush.fill("#3d5a6a", 25);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.4, 0.08);
  brush.rect(0, 470, 600, 80, "corner");

  brush.fill("#486070", 20);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.35, 0.05);
  brush.rect(0, 530, 600, 70, "corner");

  // Now pencil lines for masts and rigging
  brush.noFill();
  brush.noHatch();

  // Mast 1 - left boat
  brush.set("HB", "#2a2520", 0.35);
  brush.wiggle(1.5);
  brush.line(130, 355, 125, 200);
  brush.line(125, 200, 120, 90);

  // Mast 2 - left boat
  brush.set("HB", "#2a2520", 0.3);
  brush.line(175, 352, 170, 220);
  brush.line(170, 220, 168, 130);

  // Crossbeam left boat
  brush.set("2H", "#3a3530", 0.3);
  brush.line(105, 230, 185, 225);
  brush.line(108, 175, 178, 170);

  // Mast center boat - tall
  brush.set("HB", "#252018", 0.4);
  brush.wiggle(1.2);
  brush.line(290, 348, 285, 180);
  brush.line(285, 180, 282, 60);

  // Mast center boat 2
  brush.set("HB", "#2a2520", 0.35);
  brush.line(340, 350, 336, 200);
  brush.line(336, 200, 334, 100);

  // Crossbeam center boat
  brush.set("2H", "#35302a", 0.28);
  brush.line(262, 200, 355, 195);
  brush.line(265, 155, 350, 150);
  brush.line(268, 110, 345, 106);

  // Mast right boat
  brush.set("HB", "#2a2520", 0.35);
  brush.wiggle(1.3);
  brush.line(465, 352, 460, 210);
  brush.line(460, 210, 458, 110);

  brush.set("HB", "#252018", 0.3);
  brush.line(510, 355, 506, 240);
  brush.line(506, 240, 504, 145);

  // Crossbeam right boat
  brush.set("2H", "#353028", 0.28);
  brush.line(442, 225, 522, 220);
  brush.line(445, 175, 518, 170);

  // Rigging ropes - diagonal lines
  brush.set("2H", "#3a3530", 0.22);
  brush.noField();

  // Left boat rigging
  brush.line(120, 90, 60, 360);
  brush.line(120, 90, 200, 355);
  brush.line(168, 130, 80, 360);
  brush.line(168, 130, 205, 355);
  brush.line(105, 230, 60, 362);
  brush.line(185, 225, 210, 357);

  // Center boat rigging
  brush.set("2H", "#302c25", 0.2);
  brush.line(282, 60, 240, 355);
  brush.line(282, 60, 360, 350);
  brush.line(334, 100, 250, 352);
  brush.line(334, 100, 390, 352);
  brush.line(262, 200, 238, 353);
  brush.line(355, 195, 385, 353);

  // Right boat rigging
  brush.set("2H", "#3a3530", 0.22);
  brush.line(458, 110, 420, 358);
  brush.line(458, 110, 525, 354);
  brush.line(504, 145, 430, 360);
  brush.line(504, 145, 535, 356);
  brush.line(442, 225, 418, 360);
  brush.line(522, 220, 538, 358);

  // Some charcoal smudge for foggy atmosphere over water
  brush.set("charcoal", "#8898a8", 0.3);
  brush.noField();
  brush.line(0, 330, 200, 328);
  brush.line(400, 326, 600, 330);
  brush.line(0, 345, 150, 342);
  brush.line(450, 342, 600, 346);

  // Faint pencil lines suggesting dock/pier
  brush.set("2B", "#3a3028", 0.4);
  brush.wiggle(1.0);
  brush.line(0, 335, 100, 332);
  brush.line(490, 330, 600, 334);

  // Vertical dock posts
  brush.set("HB", "#2e2820", 0.35);
  brush.noField();
  brush.line(30, 310, 32, 380);
  brush.line(65, 308, 67, 378);
  brush.line(100, 312, 102, 380);
  brush.line(500, 308, 502, 378);
  brush.line(535, 310, 537, 380);
  brush.line(568, 312, 570, 380);

  // Rope lines on dock
  brush.set("2H", "#3a3530", 0.2);
  brush.line(30, 340, 65, 338);
  brush.line(65, 338, 100, 340);
  brush.line(500, 338, 535, 336);
  brush.line(535, 336, 568, 338);

  // Faint horizon mist pencil
  brush.set("cpencil", "#b0a898", 0.25);
  brush.wiggle(2.0);
  brush.line(0, 318, 600, 318);
  brush.line(0, 322, 600, 322);

  // Soft fog spray over everything
  brush.set("spray", "#ddd5c5", 0.5);
  brush.noField();
  brush.line(0, 290, 600, 290);
  brush.line(0, 305, 600, 305);
  brush.line(0, 315, 600, 315);

  noLoop();
}