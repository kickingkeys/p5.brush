function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#1a1a2e");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Dark night sky and wet pavement base
  brush.noStroke();
  brush.wash("#1a1a2e", 255);
  brush.rect(0, 0, 600, 600);
  brush.noWash();

  // Warm paper overlay for watercolor ground
  brush.wash("#0d0d1a", 200);
  brush.rect(0, 0, 600, 380);
  brush.noWash();

  // Wet pavement - dark reflective surface
  brush.wash("#111122", 240);
  brush.rect(0, 350, 600, 250);
  brush.noWash();

  // ---- WATERCOLOR SKY BLEEDS ----
  brush.fillTexture(0.7, 0.5);
  brush.fillBleed(0.55, "out");
  brush.fill("#1b1b3a", 180);
  brush.noStroke();
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);
  brush.noFill();

  // Deep blue-purple sky wash
  brush.fillTexture(0.8, 0.4);
  brush.fillBleed(0.4, "out");
  brush.fill("#16213e", 160);
  brush.noStroke();
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 280);
  brush.vertex(300, 300);
  brush.vertex(0, 270);
  brush.endShape(true);
  brush.noFill();

  // ---- NEON REFLECTIONS ON PAVEMENT - WATERCOLOR BLEEDS ----
  // Magenta/pink neon bleed on pavement
  brush.fillTexture(0.6, 0.7);
  brush.fillBleed(0.65, "out");
  brush.fill("#ff2d78", 55);
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(80, 370);
  brush.vertex(220, 360);
  brush.vertex(240, 430);
  brush.vertex(100, 445);
  brush.endShape(true);
  brush.noFill();

  brush.fillBleed(0.7, "out");
  brush.fill("#ff2d78", 35);
  brush.beginShape(0.6);
  brush.vertex(90, 430);
  brush.vertex(230, 420);
  brush.vertex(250, 520);
  brush.vertex(80, 530);
  brush.endShape(true);
  brush.noFill();

  // Cyan/teal neon bleed on pavement
  brush.fillTexture(0.55, 0.6);
  brush.fillBleed(0.6, "out");
  brush.fill("#00e5ff", 45);
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(340, 365);
  brush.vertex(500, 358);
  brush.vertex(510, 420);
  brush.vertex(330, 428);
  brush.endShape(true);
  brush.noFill();

  brush.fillBleed(0.65, "out");
  brush.fill("#00e5ff", 30);
  brush.beginShape(0.6);
  brush.vertex(350, 420);
  brush.vertex(510, 415);
  brush.vertex(520, 510);
  brush.vertex(345, 518);
  brush.endShape(true);
  brush.noFill();

  // Amber/yellow neon bleed - street lamp
  brush.fillTexture(0.65, 0.5);
  brush.fillBleed(0.5, "out");
  brush.fill("#ffb300", 50);
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(270, 375);
  brush.vertex(340, 370);
  brush.vertex(345, 440);
  brush.vertex(265, 445);
  brush.endShape(true);
  brush.noFill();

  brush.fillBleed(0.55, "out");
  brush.fill("#ffb300", 30);
  brush.beginShape(0.6);
  brush.vertex(260, 440);
  brush.vertex(355, 435);
  brush.vertex(360, 540);
  brush.vertex(255, 545);
  brush.endShape(true);
  brush.noFill();

  // ---- NEON SIGN MARKER SMEARS ----
  // Pink neon sign - upper left area
  brush.set("marker", "#ff2d78", 2.0);
  brush.beginShape(0.2);
  brush.vertex(60, 120);
  brush.vertex(160, 118);
  brush.vertex(162, 145);
  brush.vertex(62, 147);
  brush.endShape(true);

  brush.set("marker", "#ff6699", 1.2);
  brush.beginShape(0.2);
  brush.vertex(65, 125);
  brush.vertex(155, 123);
  brush.vertex(157, 142);
  brush.vertex(67, 144);
  brush.endShape(true);

  // Cyan neon sign - upper right
  brush.set("marker", "#00e5ff", 1.8);
  brush.beginShape(0.2);
  brush.vertex(400, 100);
  brush.vertex(540, 98);
  brush.vertex(542, 128);
  brush.vertex(402, 130);
  brush.endShape(true);

  brush.set("marker", "#66f2ff", 1.0);
  brush.beginShape(0.2);
  brush.vertex(405, 105);
  brush.vertex(535, 103);
  brush.vertex(537, 123);
  brush.vertex(407, 125);
  brush.endShape(true);

  // Amber street lamp glow - marker
  brush.set("marker", "#ffb300", 2.5);
  brush.beginShape(0.3);
  brush.vertex(285, 80);
  brush.vertex(320, 78);
  brush.vertex(322, 220);
  brush.vertex(283, 222);
  brush.endShape(true);

  brush.set("marker", "#ffd54f", 1.5);
  brush.beginShape(0.3);
  brush.vertex(290, 85);
  brush.vertex(315, 83);
  brush.vertex(317, 215);
  brush.vertex(288, 217);
  brush.endShape(true);

  // Secondary neon - green sign
  brush.set("marker", "#00e676", 1.6);
  brush.beginShape(0.2);
  brush.vertex(180, 155);
  brush.vertex(280, 153);
  brush.vertex(282, 178);
  brush.vertex(182, 180);
  brush.endShape(true);

  brush.set("marker", "#69f0ae", 0.9);
  brush.beginShape(0.2);
  brush.vertex(185, 160);
  brush.vertex(275, 158);
  brush.vertex(277, 173);
  brush.vertex(187, 175);
  brush.endShape(true);

  // ---- RAIN STREAKS ----
  brush.noFill();
  brush.set("rotring", "#7799bb", 0.3);
  for (let i = 0; i < 80; i++) {
    let rx = random(0, 600);
    let ry = random(0, 380);
    let len = random(8, 22);
    brush.line(rx, ry, rx + random(-2, 2), ry + len);
  }

  // Rain on pavement
  brush.set("rotring", "#334466", 0.25);
  for (let i = 0; i < 50; i++) {
    let rx = random(0, 600);
    let ry = random(355, 600);
    let len = random(5, 14);
    brush.line(rx, ry, rx + random(-1, 1), ry + len);
  }

  // ---- BUILDING SILHOUETTES ----
  // Left building block
  brush.noStroke();
  brush.wash("#0a0a18", 240);
  brush.rect(0, 40, 55, 330);
  brush.noWash();

  brush.wash("#0a0a18", 240);
  brush.rect(55, 80, 45, 290);
  brush.noWash();

  // Right building block
  brush.wash("#0a0a18", 240);
  brush.rect(545, 30, 55, 340);
  brush.noWash();

  brush.wash("#0a0a18", 240);
  brush.rect(500, 70, 50, 300);
  brush.noWash();

  // Mid-left building
  brush.wash("#0c0c1e", 220);
  brush.rect(0, 180, 30, 190);
  brush.noWash();

  // Mid-right building
  brush.wash("#0c0c1e", 220);
  brush.rect(570, 150, 30, 220);
  brush.noWash();

  // Building window lights - sparse warm glows
  // Left building windows
  brush.set("marker", "#ffb300", 0.6);
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 2; col++) {
      if (random() > 0.45) {
        brush.line(
          8 + col * 20, 55 + row * 38,
          8 + col * 20, 65 + row * 38
        );
      }
    }
  }

  // Right building windows
  brush.set("marker", "#ffb300", 0.6);
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 2; col++) {
      if (random() > 0.45) {
        brush.line(
          552 + col * 20, 45 + row * 38,
          552 + col * 20, 55 + row * 38
        );
      }
    }
  }

  // Cyan window lights
  brush.set("marker", "#00e5ff", 0.5);
  for (let row = 0; row < 4; row++) {
    if (random() > 0.5) {
      brush.line(60, 95 + row * 42, 60, 103 + row * 42);
    }
  }

  // ---- STREET LAMP POST ----
  brush.set("2B", "#0a0a18", 1.8);
  brush.line(300, 230, 300, 370);
  brush.line(300, 230, 318, 218);
  brush.line(318, 218, 318, 228);

  // Lamp glow halo
  brush.fillTexture(0.9, 0.8);
  brush.fillBleed(0.6, "out");
  brush.fill("#ffb300", 60);
  brush.noStroke();
  brush.beginShape(0.7);
  for (let a = 0; a < 360; a += 20) {
    let r = 28 + noise(a * 0.05) * 10;
    brush.vertex(318 + cos(a) * r, 218 + sin(a) * r);
  }
  brush.endShape(true);
  brush.noFill();

  // ---- PASSERSBY SILHOUETTES ----
  brush.noFill();

  // Figure 1 - left, walking away
  let f1x = 110, f1y = 370;
  brush.set("charcoal", "#080810", 1.8);
  // Body
  brush.beginShape(0.3);
  brush.vertex(f1x - 8, f1y - 60);
  brush.vertex(f1x + 8, f1y - 62);
  brush.vertex(f1x + 12, f1y - 10);
  brush.vertex(f1x + 6, f1y);
  brush.vertex(f1x - 6, f1y);
  brush.vertex(f1x - 12, f1y - 12);
  brush.endShape(true);
  // Head
  brush.set("2B", "#080810", 1.4);
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 30) {
    brush.vertex(f1x + cos(a) * 9, f1y - 70 + sin(a) * 10);
  }
  brush.endShape(true);
  // Legs
  brush.set("charcoal", "#080810", 1.4);
  brush.line(f1x - 4, f1y, f1x - 8, f1y + 38);
  brush.line(f1x + 4, f1y, f1x + 10, f1y + 35);
  // Umbrella
  brush.set("2B", "#080810", 1.2);
  brush.line(f1x, f1y - 62, f1x, f1y - 90);
  brush.beginShape(0.4);
  brush.vertex(f1x - 28, f1y - 90);
  brush.vertex(f1x, f1y - 98);
  brush.vertex(f1x + 28, f1y - 90);
  brush.endShape(false);

  // Figure 2 - center-right, closer
  let f2x = 390, f2y = 385;
  brush.set("charcoal", "#060610", 2.2);
  brush.beginShape(0.3);
  brush.vertex(f2x - 10, f2y - 75);
  brush.vertex(f2x + 10, f2y - 77);
  brush.vertex(f2x + 14, f2y - 15);
  brush.vertex(f2x + 8, f2y);
  brush.vertex(f2x - 8, f2y);
  brush.vertex(f2x - 14, f2y - 18);
  brush.endShape(true);
  // Head
  brush.set("2B", "#060610", 1.8);
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 30) {
    brush.vertex(f2x + cos(a) * 11, f2y - 87 + sin(a) * 12);
  }
  brush.endShape(true);
  // Legs
  brush.set("charcoal", "#060610", 1.8);
  brush.line(f2x - 5, f2y, f2x - 10, f2y + 48);
  brush.line(f2x + 5, f2y, f2x + 12, f2y + 44);
  // Umbrella
  brush.set("2B", "#060610", 1.5);
  brush.line(f2x + 8, f2y - 77, f2x + 8, f2y - 112);
  brush.beginShape(0.4);
  brush.vertex(f2x - 26, f2y - 112);
  brush.vertex(f2x + 8, f2y - 122);
  brush.vertex(f2x + 42, f2y - 112);
  brush.endShape(false);

  // Figure 3 - far right, small/distant
  let f3x = 500, f3y = 368;
  brush.set("charcoal", "#0a0a1a", 1.2);
  brush.beginShape(0.3);
  brush.vertex(f3x - 5, f3y - 45);
  brush.vertex(f3x + 5, f3y - 46);
  brush.vertex(f3x + 7, f3y - 8);
  brush.vertex(f3x + 4, f3y);
  brush.vertex(f3x - 4, f3y);
  brush.vertex(f3x - 7, f3y - 10);
  brush.endShape(true);
  brush.set("2B", "#0a0a1a", 0.9);
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 40) {
    brush.vertex(f3x + cos(a) * 6, f3y - 52 + sin(a) * 7);
  }
  brush.endShape(true);
  brush.set("charcoal", "#0a0a1a", 0.9);
  brush.line(f3x - 3, f3y, f3x - 5, f3y + 26);
  brush.line(f3x + 3, f3y, f3x + 6, f3y + 24);

  // Figure 4 - far left, very distant
  let f4x = 38, f4y = 362;
  brush.set("charcoal", "#0c0c1c", 1.0);
  brush.beginShape(0.3);
  brush.vertex(f4x - 4, f4y - 36);
  brush.vertex(f4x + 4, f4y - 37);
  brush.vertex(f4x + 6, f4y - 6);
  brush.vertex(f4x + 3, f4y);
  brush.vertex(f4x - 3, f4y);
  brush.vertex(f4x - 6, f4y - 8);
  brush.endShape(true);
  brush.set("2B", "#0c0c1c", 0.7);
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 45) {
    brush.vertex(f4x + cos(a) * 5, f4y - 42 + sin(a) * 6);
  }
  brush.endShape(true);
  brush.set("charcoal", "#0c0c1c", 0.7);
  brush.line(f4x - 2, f4y, f4x - 4, f4y + 20);
  brush.line(f4x + 2, f4y, f4x + 5, f4y + 18);

  // ---- PAVEMENT LINE / CURB ----
  brush.set("2B", "#0a0a1a", 1.5);
  brush.line(0, 360, 600, 360);

  // Puddle reflections - neon smears on pavement
  brush.set("marker", "#ff2d78", 0.8);
  brush.spline([[100, 380], [140, 375], [170, 382], [200, 378]], 0.4);
  brush.spline([[110, 400], [150, 395], [180, 402]], 0.4);

  brush.set("marker", "#00e5ff", 0.7);
  brush.spline([[370, 378], [410, 373], [450, 380], [490, 376]], 0.4);
  brush.spline([[380, 398], [420, 393], [460, 400]], 0.4);

  brush.set("marker", "#ffb300", 0.6);
  brush.spline([[270, 382], [300, 378], [330, 384]], 0.4);
  brush.spline([[265, 402], [298, 398], [335, 404]], 0.4);

  // Reflection of lamp post in puddle
  brush.set("marker", "#ffb300", 0.5);
  brush.line(300, 362, 300, 430);

  // ---- ATMOSPHERIC RAIN OVERLAY ----
  brush.set("spray", "#334466", 1.5);
  for (let i = 0; i < 30; i++) {
    let rx = random(0, 600);
    let ry = random(0, 360);
    brush.flowLine(rx, ry, random(5, 18), 90 + random(-5, 5));
  }

  brush.noStroke();
  brush.noFill();

  noLoop();
}