function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#0a0a14");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky / background wash ---
  brush.fill("#0d0d22", 240);
  brush.fillBleed(0.05, "out");
  brush.noStroke();
  brush.rect(0, 0, 600, 600);
  brush.noFill();

  // Dark upper sky gradient
  brush.wash("#060610", 220);
  brush.rect(0, 0, 600, 320);
  brush.noWash();

  // --- Wet pavement base ---
  brush.wash("#0e0e1e", 230);
  brush.rect(0, 310, 600, 290);
  brush.noWash();

  brush.fill("#121228", 180);
  brush.fillBleed(0.15, "out");
  brush.rect(0, 310, 600, 290);
  brush.noFill();

  // --- Neon light sources in sky / buildings ---
  // Magenta neon sign bleed
  brush.fill("#cc0055", 90);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.3, 0.6);
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(80, 120);
  brush.vertex(160, 118);
  brush.vertex(162, 155);
  brush.vertex(78, 157);
  brush.endShape(true);
  brush.noFill();

  // Cyan neon sign bleed
  brush.fill("#00cccc", 80);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.3, 0.55);
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(370, 90);
  brush.vertex(460, 88);
  brush.vertex(462, 130);
  brush.vertex(368, 132);
  brush.endShape(true);
  brush.noFill();

  // Orange neon
  brush.fill("#ff6600", 75);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.25, 0.5);
  brush.noStroke();
  brush.beginShape(0.55);
  brush.vertex(490, 150);
  brush.vertex(560, 148);
  brush.vertex(562, 178);
  brush.vertex(488, 180);
  brush.endShape(true);
  brush.noFill();

  // Yellow window glow
  brush.fill("#ffcc44", 60);
  brush.fillBleed(0.55, "out");
  brush.noStroke();
  brush.beginShape(0.5);
  brush.vertex(200, 80);
  brush.vertex(240, 80);
  brush.vertex(242, 110);
  brush.vertex(198, 112);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#ffcc44", 50);
  brush.fillBleed(0.5, "out");
  brush.noStroke();
  brush.beginShape(0.5);
  brush.vertex(255, 85);
  brush.vertex(285, 85);
  brush.vertex(287, 108);
  brush.vertex(253, 110);
  brush.endShape(true);
  brush.noFill();

  // --- Building silhouettes (ink wash) ---
  brush.fill("#07070f", 255);
  brush.fillBleed(0.02, "out");
  brush.noStroke();

  // Left building block
  brush.beginShape(0.15);
  brush.vertex(0, 0);
  brush.vertex(110, 0);
  brush.vertex(112, 310);
  brush.vertex(0, 312);
  brush.endShape(true);

  // Left-center building
  brush.beginShape(0.15);
  brush.vertex(130, 60);
  brush.vertex(310, 58);
  brush.vertex(312, 315);
  brush.vertex(128, 315);
  brush.endShape(true);

  // Right building
  brush.beginShape(0.15);
  brush.vertex(340, 30);
  brush.vertex(600, 28);
  brush.vertex(600, 315);
  brush.vertex(338, 315);
  brush.endShape(true);
  brush.noFill();

  // --- Neon reflections on wet pavement ---
  // Magenta reflection
  brush.fill("#cc0055", 55);
  brush.fillBleed(0.8, "out");
  brush.fillTexture(0.5, 0.7);
  brush.noStroke();
  brush.beginShape(0.7);
  brush.vertex(60, 340);
  brush.vertex(180, 338);
  brush.vertex(185, 430);
  brush.vertex(55, 435);
  brush.endShape(true);
  brush.noFill();

  // Cyan reflection
  brush.fill("#00aaaa", 50);
  brush.fillBleed(0.75, "out");
  brush.fillTexture(0.45, 0.65);
  brush.noStroke();
  brush.beginShape(0.7);
  brush.vertex(340, 345);
  brush.vertex(470, 342);
  brush.vertex(475, 440);
  brush.vertex(335, 445);
  brush.endShape(true);
  brush.noFill();

  // Orange reflection
  brush.fill("#ff5500", 45);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.4, 0.6);
  brush.noStroke();
  brush.beginShape(0.7);
  brush.vertex(460, 360);
  brush.vertex(580, 358);
  brush.vertex(582, 440);
  brush.vertex(458, 443);
  brush.endShape(true);
  brush.noFill();

  // Yellow reflection streaks
  brush.fill("#cc9900", 40);
  brush.fillBleed(0.85, "out");
  brush.fillTexture(0.55, 0.75);
  brush.noStroke();
  brush.beginShape(0.75);
  brush.vertex(185, 350);
  brush.vertex(280, 348);
  brush.vertex(282, 470);
  brush.vertex(183, 475);
  brush.endShape(true);
  brush.noFill();

  // --- Neon marker smears on pavement ---
  brush.set("marker", "#cc0066", 1.8);
  brush.spline([[70, 370], [95, 375], [120, 368], [145, 378], [170, 372]], 0.5);
  brush.spline([[75, 395], [110, 400], [150, 393]], 0.4);

  brush.set("marker", "#00cccc", 1.5);
  brush.spline([[350, 375], [385, 380], [420, 372], [455, 382]], 0.5);
  brush.spline([[355, 400], [400, 406], [445, 398]], 0.4);

  brush.set("marker", "#ff6600", 1.2);
  brush.spline([[475, 385], [510, 390], [545, 383], [575, 392]], 0.5);

  brush.set("marker", "#ffcc00", 1.0);
  brush.spline([[195, 365], [230, 370], [265, 362], [295, 372]], 0.45);

  // Faint wide magenta smear
  brush.set("marker", "#880033", 2.5);
  brush.spline([[50, 420], [130, 428], [210, 418]], 0.6);

  brush.set("marker", "#005555", 2.2);
  brush.spline([[320, 425], [410, 432], [490, 422]], 0.6);

  // --- Rain streaks on pavement ---
  brush.set("2H", "#aabbcc", 0.3);
  for (let i = 0; i < 40; i++) {
    let rx = random(0, 600);
    let ry = random(320, 600);
    let rlen = random(8, 25);
    brush.line(rx, ry, rx + random(-2, 2), ry + rlen);
  }

  // Rain in sky
  brush.set("2H", "#334466", 0.25);
  for (let i = 0; i < 55; i++) {
    let rx = random(0, 600);
    let ry = random(0, 310);
    let rlen = random(6, 18);
    brush.line(rx, ry, rx + random(-1, 1), ry + rlen);
  }

  // --- Pavement puddle ripples ---
  brush.set("pen", "#223355", 0.3);
  for (let i = 0; i < 8; i++) {
    let px = random(40, 560);
    let py = random(350, 580);
    let pr = random(8, 22);
    brush.arc(px, py, pr, 190, 350);
  }
  brush.set("pen", "#334466", 0.25);
  for (let i = 0; i < 6; i++) {
    let px = random(40, 560);
    let py = random(360, 570);
    let pr = random(5, 14);
    brush.arc(px, py, pr, 200, 340);
  }

  // --- Passerby silhouettes ---
  // Figure 1 — left, walking right
  let f1x = 105, f1y = 420;
  brush.fill("#050508", 255);
  brush.fillBleed(0.03, "out");
  brush.noStroke();
  // body
  brush.beginShape(0.2);
  brush.vertex(f1x - 10, f1y - 70);
  brush.vertex(f1x + 10, f1y - 72);
  brush.vertex(f1x + 14, f1y - 20);
  brush.vertex(f1x + 12, f1y);
  brush.vertex(f1x - 8, f1y + 2);
  brush.vertex(f1x - 12, f1y - 20);
  brush.endShape(true);
  // head
  brush.beginShape(0.4);
  brush.vertex(f1x - 7, f1y - 80);
  brush.vertex(f1x + 7, f1y - 81);
  brush.vertex(f1x + 8, f1y - 70);
  brush.vertex(f1x - 6, f1y - 69);
  brush.endShape(true);
  // legs
  brush.beginShape(0.2);
  brush.vertex(f1x - 6, f1y);
  brush.vertex(f1x + 2, f1y);
  brush.vertex(f1x, f1y + 40);
  brush.vertex(f1x - 10, f1y + 42);
  brush.endShape(true);
  brush.beginShape(0.2);
  brush.vertex(f1x + 4, f1y);
  brush.vertex(f1x + 12, f1y);
  brush.vertex(f1x + 18, f1y + 38);
  brush.vertex(f1x + 8, f1y + 40);
  brush.endShape(true);
  brush.noFill();

  // umbrella
  brush.set("charcoal", "#111122", 0.6);
  brush.spline([[f1x - 22, f1y - 82], [f1x, f1y - 95], [f1x + 22, f1y - 83]], 0.5);
  brush.line(f1x, f1y - 95, f1x + 2, f1y - 68);

  // Figure 2 — center-right, walking left
  let f2x = 390, f2y = 440;
  brush.fill("#060609", 255);
  brush.fillBleed(0.02, "out");
  brush.noStroke();
  brush.beginShape(0.2);
  brush.vertex(f2x - 12, f2y - 80);
  brush.vertex(f2x + 12, f2y - 82);
  brush.vertex(f2x + 16, f2y - 20);
  brush.vertex(f2x + 14, f2y + 2);
  brush.vertex(f2x - 10, f2y + 4);
  brush.vertex(f2x - 14, f2y - 22);
  brush.endShape(true);
  brush.beginShape(0.4);
  brush.vertex(f2x - 8, f2y - 92);
  brush.vertex(f2x + 8, f2y - 93);
  brush.vertex(f2x + 9, f2y - 80);
  brush.vertex(f2x - 7, f2y - 79);
  brush.endShape(true);
  brush.beginShape(0.2);
  brush.vertex(f2x - 8, f2y + 2);
  brush.vertex(f2x + 2, f2y + 2);
  brush.vertex(f2x - 4, f2y + 48);
  brush.vertex(f2x - 14, f2y + 50);
  brush.endShape(true);
  brush.beginShape(0.2);
  brush.vertex(f2x + 4, f2y + 2);
  brush.vertex(f2x + 14, f2y + 2);
  brush.vertex(f2x + 20, f2y + 46);
  brush.vertex(f2x + 10, f2y + 48);
  brush.endShape(true);
  brush.noFill();

  brush.set("charcoal", "#111122", 0.6);
  brush.spline([[f2x - 26, f2y - 94], [f2x, f2y - 108], [f2x + 26, f2y - 95]], 0.5);
  brush.line(f2x, f2y - 108, f2x + 2, f2y - 80);

  // Figure 3 — far right, small/distant
  let f3x = 530, f3y = 390;
  brush.fill("#080810", 240);
  brush.fillBleed(0.04, "out");
  brush.noStroke();
  brush.beginShape(0.25);
  brush.vertex(f3x - 6, f3y - 48);
  brush.vertex(f3x + 6, f3y - 49);
  brush.vertex(f3x + 8, f3y - 12);
  brush.vertex(f3x + 6, f3y);
  brush.vertex(f3x - 4, f3y + 1);
  brush.vertex(f3x - 8, f3y - 14);
  brush.endShape(true);
  brush.beginShape(0.35);
  brush.vertex(f3x - 5, f3y - 56);
  brush.vertex(f3x + 5, f3y - 57);
  brush.vertex(f3x + 6, f3y - 48);
  brush.vertex(f3x - 4, f3y - 47);
  brush.endShape(true);
  brush.beginShape(0.2);
  brush.vertex(f3x - 4, f3y);
  brush.vertex(f3x + 2, f3y);
  brush.vertex(f3x - 2, f3y + 28);
  brush.vertex(f3x - 8, f3y + 29);
  brush.endShape(true);
  brush.beginShape(0.2);
  brush.vertex(f3x + 2, f3y);
  brush.vertex(f3x + 8, f3y);
  brush.vertex(f3x + 11, f3y + 26);
  brush.vertex(f3x + 5, f3y + 27);
  brush.endShape(true);
  brush.noFill();

  // Figure 4 — far left background, very faint
  let f4x = 38, f4y = 375;
  brush.fill("#0a0a18", 200);
  brush.fillBleed(0.06, "out");
  brush.noStroke();
  brush.beginShape(0.25);
  brush.vertex(f4x - 5, f4y - 42);
  brush.vertex(f4x + 5, f4y - 43);
  brush.vertex(f4x + 7, f4y - 10);
  brush.vertex(f4x + 5, f4y);
  brush.vertex(f4x - 3, f4y + 1);
  brush.vertex(f4x - 7, f4y - 12);
  brush.endShape(true);
  brush.beginShape(0.35);
  brush.vertex(f4x - 4, f4y - 50);
  brush.vertex(f4x + 4, f4y - 51);
  brush.vertex(f4x + 5, f4y - 42);
  brush.vertex(f4x - 3, f4y - 41);
  brush.endShape(true);
  brush.noFill();

  // --- Silhouette ink outlines for passersby ---
  brush.set("2B", "#030306", 0.8);
  brush.spline([[f1x - 12, f1y - 70], [f1x + 14, f1y - 72], [f1x + 12, f1y], [f1x - 8, f1y + 2], [f1x - 12, f1y - 20]], 0.3);
  brush.spline([[f2x - 14, f2y - 80], [f2x + 16, f2y - 82], [f2x + 14, f2y + 2], [f2x - 10, f2y + 4], [f2x - 14, f2y - 22]], 0.3);

  // --- Ink detail: window grids on buildings ---
  brush.set("pen", "#1a1a2e", 0.25);
  // Left building windows
  for (let wy = 20; wy < 290; wy += 35) {
    for (let wx = 10; wx < 100; wx += 30) {
      if (random() > 0.35) {
        brush.rect(wx, wy, 18, 20);
      }
    }
  }
  // Center building windows
  for (let wy = 75; wy < 300; wy += 32) {
    for (let wx = 140; wx < 295; wx += 28) {
      if (random() > 0.3) {
        brush.rect(wx, wy, 16, 18);
      }
    }
  }
  // Right building windows
  for (let wy = 45; wy < 305; wy += 30) {
    for (let wx = 350; wx < 580; wx += 32) {
      if (random() > 0.4) {
        brush.rect(wx, wy, 18, 16);
      }
    }
  }

  // Lit windows — warm yellow wash
  brush.wash("#ffcc44", 140);
  brush.rect(22, 55, 18, 20);
  brush.rect(52, 90, 18, 20);
  brush.rect(200, 80, 38, 28);
  brush.rect(255, 85, 28, 24);
  brush.rect(165, 110, 18, 18);
  brush.rect(420, 60, 20, 18);
  brush.rect(460, 95, 18, 18);
  brush.noWash();

  // Lit windows — cool blue-white
  brush.wash("#aaccff", 100);
  brush.rect(35, 130, 16, 18);
  brush.rect(68, 75, 18, 20);
  brush.rect(350, 50, 22, 18);
  brush.rect(500, 80, 18, 16);
  brush.noWash();

  // --- Atmospheric spray for rain/mist ---
  brush.set("spray", "#223355", 1.2);
  for (let i = 0; i < 60; i++) {
    let rx = random(0, 600);
    let ry = random(310, 600);
    brush.flowLine(rx, ry, random(5, 18), 270 + random(-15, 15));
  }

  brush.set("spray", "#112233", 0.8);
  for (let i = 0; i < 45; i++) {
    let rx = random(0, 600);
    let ry = random(0, 315);
    brush.flowLine(rx, ry, random(4, 14), 270 + random(-10, 10));
  }

  // Mist near horizon
  brush.set("spray", "#1a2a44", 2.0);
  for (let i = 0; i < 30; i++) {
    let rx = random(0, 600);
    brush.flowLine(rx, 310 + random(-15, 15), random(10, 30), 0 + random(-20, 20));
  }

  // --- Final charcoal texture on pavement ---
  brush.set("charcoal", "#0a0a18", 0.4);
  brush.hatchStyle("charcoal", "#0a0a18", 0.35);
  brush.hatch(18, 5, { rand: 0.18, continuous: false });
  brush.rect(0, 310, 600, 290);
  brush.noHatch();

  noLoop();
}