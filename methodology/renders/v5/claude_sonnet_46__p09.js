function setup() {
  createCanvas(600, 600, WEBGL);
  background("#1a1a2e");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky and deep background ---
  brush.noStroke();
  brush.wash("#1a1a2e", 255);
  brush.rect(0, 0, 600, 600);
  brush.noWash();

  // Wet pavement (lower half) - warm dark base
  brush.wash("#0d0d1a", 240);
  brush.rect(0, 320, 600, 280);
  brush.noWash();

  // --- Watercolor bleeds: rain-soaked sky atmosphere ---
  brush.fillTexture(0.6, 0.4);
  brush.fillBleed(0.55, "out");
  brush.fill("#1e3a5f", 80);
  brush.noStroke();
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 280);
  brush.vertex(0, 280);
  brush.endShape(true);

  brush.fill("#0a2240", 90);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 100);
  brush.vertex(600, 100);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);

  // --- Neon color bleeds: building glow patches ---
  // Magenta neon glow (left side building)
  brush.fillTexture(0.5, 0.35);
  brush.fill("#cc0066", 45);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.6);
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 55 + cos(a) * 70;
    let ry = 160 + sin(a) * 90;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  brush.fill("#ff0088", 30);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 18; i++) {
    let a = (i / 18) * 360;
    let rx = 55 + cos(a) * 50;
    let ry = 160 + sin(a) * 65;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  // Cyan neon glow (right side)
  brush.fill("#00cccc", 40);
  brush.fillBleed(0.65, "out");
  brush.beginShape(0.6);
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 480 + cos(a) * 80;
    let ry = 140 + sin(a) * 100;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  brush.fill("#00ffff", 25);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 18; i++) {
    let a = (i / 18) * 360;
    let rx = 480 + cos(a) * 55;
    let ry = 140 + sin(a) * 70;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  // Amber/orange glow (center-ish)
  brush.fill("#ff6600", 35);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.55);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    let rx = 300 + cos(a) * 60;
    let ry = 190 + sin(a) * 75;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  brush.noFill();

  // --- Wet pavement reflections (watercolor bleeds below horizon) ---
  // Magenta reflection
  brush.fillTexture(0.55, 0.3);
  brush.fill("#cc0066", 55);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.6);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    let rx = 80 + cos(a) * 45;
    let ry = 390 + sin(a) * 30;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  brush.fill("#ff0088", 35);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    let rx = 100 + cos(a) * 30;
    let ry = 430 + sin(a) * 18;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  // Cyan reflection
  brush.fill("#00cccc", 50);
  brush.fillBleed(0.65, "out");
  brush.beginShape(0.6);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    let rx = 470 + cos(a) * 55;
    let ry = 400 + sin(a) * 32;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  brush.fill("#00ffff", 30);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    let rx = 460 + cos(a) * 35;
    let ry = 445 + sin(a) * 20;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  // Amber reflection center
  brush.fill("#ff6600", 45);
  brush.fillBleed(0.55, "out");
  brush.beginShape(0.55);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    let rx = 290 + cos(a) * 40;
    let ry = 410 + sin(a) * 22;
    brush.vertex(rx, ry);
  }
  brush.endShape(true);

  brush.noFill();

  // --- Horizon line / street edge watercolor ---
  brush.wash("#0a0a18", 200);
  brush.rect(0, 315, 600, 8);
  brush.noWash();

  // --- Marker neon smears: building signage and neon tubes ---
  // Magenta neon tube (left building)
  brush.set("marker", "#ff0088", 1.8);
  brush.line(20, 130, 100, 130);
  brush.set("marker", "#ff44aa", 1.0);
  brush.line(22, 128, 98, 128);

  brush.set("marker", "#ff0088", 1.4);
  brush.line(20, 155, 90, 155);

  brush.set("marker", "#cc0066", 2.0);
  brush.line(15, 180, 110, 180);
  brush.set("marker", "#ff0088", 0.8);
  brush.line(15, 178, 110, 178);

  // Vertical neon left
  brush.set("marker", "#ff0088", 1.2);
  brush.line(110, 100, 110, 220);
  brush.set("marker", "#ff44aa", 0.6);
  brush.line(112, 100, 112, 220);

  // Cyan neon tubes (right building)
  brush.set("marker", "#00cccc", 1.8);
  brush.line(420, 100, 540, 100);
  brush.set("marker", "#00ffff", 0.9);
  brush.line(420, 98, 540, 98);

  brush.set("marker", "#00aaaa", 2.0);
  brush.line(430, 125, 560, 125);

  brush.set("marker", "#00cccc", 1.5);
  brush.line(415, 150, 545, 150);
  brush.set("marker", "#00ffff", 0.7);
  brush.line(415, 148, 545, 148);

  // Vertical cyan right
  brush.set("marker", "#00cccc", 1.3);
  brush.line(420, 80, 420, 220);
  brush.set("marker", "#00ffff", 0.6);
  brush.line(418, 80, 418, 220);

  // Amber center signage
  brush.set("marker", "#ff8800", 1.6);
  brush.line(240, 160, 360, 160);
  brush.set("marker", "#ffaa00", 0.8);
  brush.line(240, 158, 360, 158);

  brush.set("marker", "#ff6600", 1.4);
  brush.line(255, 180, 345, 180);

  // Small scattered neon dots/smears
  brush.set("marker", "#ff0088", 0.7);
  brush.line(150, 200, 175, 200);
  brush.set("marker", "#00cccc", 0.6);
  brush.line(370, 210, 400, 210);
  brush.set("marker", "#ffaa00", 0.5);
  brush.line(200, 220, 220, 220);

  // --- Pavement reflection marker smears ---
  brush.wiggle(2);

  brush.set("marker", "#cc0044", 1.0);
  brush.line(30, 350, 120, 360);
  brush.set("marker", "#ff0088", 0.5);
  brush.line(25, 370, 115, 380);

  brush.set("marker", "#009999", 1.0);
  brush.line(430, 345, 530, 355);
  brush.set("marker", "#00cccc", 0.5);
  brush.line(425, 365, 525, 375);

  brush.set("marker", "#cc5500", 0.8);
  brush.line(240, 355, 340, 365);
  brush.set("marker", "#ff6600", 0.4);
  brush.line(245, 372, 335, 380);

  // Scattered small reflections on wet pavement
  brush.set("marker", "#ff0088", 0.4);
  brush.line(160, 400, 190, 405);
  brush.set("marker", "#00cccc", 0.35);
  brush.line(380, 395, 410, 400);
  brush.set("marker", "#ffaa00", 0.3);
  brush.line(270, 420, 300, 425);
  brush.set("marker", "#ff0088", 0.3);
  brush.line(80, 460, 100, 464);
  brush.set("marker", "#00cccc", 0.3);
  brush.line(490, 455, 515, 460);

  brush.noField();

  // --- Building silhouettes in ink (pen/rotring) ---
  // Left building block
  brush.set("pen", "#050510", 2.5);
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 320);
  brush.vertex(0, 50);
  brush.vertex(130, 50);
  brush.vertex(130, 320);
  brush.endShape(false);

  // Left building windows - dark ink
  brush.set("pen", "#050510", 1.5);
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      let wx = 18 + col * 38;
      let wy = 70 + row * 44;
      brush.rect(wx, wy, 22, 28);
    }
  }

  // Some windows with faint neon glow
  brush.wash("#ff0088", 60);
  brush.rect(18, 70, 22, 28);
  brush.rect(56, 114, 22, 28);
  brush.noWash();

  brush.wash("#00cccc", 50);
  brush.rect(94, 70, 22, 28);
  brush.rect(18, 158, 22, 28);
  brush.noWash();

  // Right building block
  brush.set("pen", "#050510", 2.5);
  brush.beginShape(0);
  brush.vertex(470, 320);
  brush.vertex(470, 30);
  brush.vertex(600, 30);
  brush.vertex(600, 320);
  brush.endShape(false);

  brush.set("pen", "#050510", 1.5);
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 2; col++) {
      let wx = 480 + col * 55;
      let wy = 50 + row * 42;
      brush.rect(wx, wy, 35, 28);
    }
  }

  brush.wash("#00cccc", 65);
  brush.rect(480, 50, 35, 28);
  brush.rect(535, 92, 35, 28);
  brush.noWash();

  brush.wash("#ff0088", 50);
  brush.rect(480, 134, 35, 28);
  brush.noWash();

  // Center-back buildings (shorter, receding)
  brush.set("pen", "#080818", 2.0);
  brush.beginShape(0);
  brush.vertex(140, 320);
  brush.vertex(140, 120);
  brush.vertex(220, 120);
  brush.vertex(220, 320);
  brush.endShape(false);

  brush.beginShape(0);
  brush.vertex(230, 320);
  brush.vertex(230, 140);
  brush.vertex(310, 140);
  brush.vertex(310, 320);
  brush.endShape(false);

  brush.beginShape(0);
  brush.vertex(320, 320);
  brush.vertex(320, 100);
  brush.vertex(400, 100);
  brush.vertex(400, 320);
  brush.endShape(false);

  brush.beginShape(0);
  brush.vertex(408, 320);
  brush.vertex(408, 130);
  brush.vertex(468, 130);
  brush.vertex(468, 320);
  brush.endShape(false);

  // Small windows on center buildings
  brush.set("pen", "#050510", 1.0);
  for (let row = 0; row < 4; row++) {
    brush.rect(148, 135 + row * 42, 16, 22);
    brush.rect(170, 135 + row * 42, 16, 22);
    brush.rect(198, 135 + row * 42, 16, 22);
  }

  brush.wash("#ffaa00", 55);
  brush.rect(148, 135, 16, 22);
  brush.rect(198, 177, 16, 22);
  brush.noWash();

  for (let row = 0; row < 3; row++) {
    brush.set("pen", "#050510", 1.0);
    brush.rect(238, 158 + row * 42, 18, 22);
    brush.rect(262, 158 + row * 42, 18, 22);
    brush.rect(286, 158 + row * 42, 18, 22);
  }

  // --- Street / pavement dark wash ---
  brush.wash("#080812", 210);
  brush.rect(0, 320, 600, 280);
  brush.noWash();

  // Sidewalk edge line
  brush.set("pen", "#111130", 1.8);
  brush.line(0, 390, 600, 390);
  brush.set("pen", "#111130", 0.8);
  brush.line(0, 392, 600, 392);

  // Street center line (faint)
  brush.set("pen", "#1a1a35", 0.8);
  brush.line(0, 480, 600, 480);

  // --- Rain streaks (charcoal/pen thin vertical lines) ---
  brush.wiggle(1);
  brush.set("pen", "#aaccff", 0.25);
  for (let i = 0; i < 80; i++) {
    let rx = random(0, 600);
    let ry = random(0, 320);
    let rlen = random(8, 25);
    brush.line(rx, ry, rx + random(-2, 2), ry + rlen);
  }

  // Rain on pavement
  brush.set("pen", "#8899cc", 0.2);
  for (let i = 0; i < 50; i++) {
    let rx = random(0, 600);
    let ry = random(320, 590);
    let rlen = random(5, 15);
    brush.line(rx, ry, rx + random(-1, 1), ry + rlen);
  }
  brush.noField();

  // --- Passerby silhouettes (charcoal ink figures) ---
  // Figure 1: far left, small (distance)
  brush.set("charcoal", "#050510", 1.8);
  brush.noFill();
  // Body
  brush.spline([
    [55, 310],
    [58, 285],
    [60, 265],
    [58, 248],
    [55, 235]
  ], 0.4);
  // Head
  brush.circle(57, 228, 9);
  // Legs
  brush.spline([[58, 285], [52, 300], [48, 315]], 0.3);
  brush.spline([[58, 285], [64, 300], [66, 315]], 0.3);
  // Arm/umbrella suggestion
  brush.set("charcoal", "#050510", 1.2);
  brush.line(57, 255, 40, 248);
  brush.line(40, 248, 30, 250);
  brush.line(40, 248, 50, 250);

  // Figure 2: center-left, medium distance
  brush.set("charcoal", "#050510", 2.2);
  brush.spline([
    [185, 315],
    [188, 288],
    [190, 265],
    [188, 245],
    [185, 230]
  ], 0.4);
  brush.circle(187, 222, 11);
  brush.spline([[188, 288], [180, 305], [176, 318]], 0.3);
  brush.spline([[188, 288], [196, 303], [198, 318]], 0.3);
  brush.set("charcoal", "#050510", 1.0);
  brush.line(188, 260, 168, 252);
  brush.line(168, 252, 155, 254);
  brush.line(168, 252, 180, 254);

  // Figure 3: center, slightly closer
  brush.set("charcoal", "#060612", 2.8);
  brush.spline([
    [290, 318],
    [293, 286],
    [295, 260],
    [292, 238],
    [288, 220]
  ], 0.45);
  brush.circle(291, 212, 13);
  brush.spline([[293, 286], [284, 304], [279, 318]], 0.3);
  brush.spline([[293, 286], [302, 302], [305, 318]], 0.3);
  // Coat suggestion
  brush.set("charcoal", "#060612", 1.5);
  brush.spline([[285, 240], [278, 268], [280, 290]], 0.3);
  brush.spline([[297, 240], [304, 268], [302, 290]], 0.3);

  // Figure 4: right side, walking away
  brush.set("charcoal", "#050510", 2.0);
  brush.spline([
    [420, 316],
    [423, 290],
    [425, 265],
    [422, 244],
    [418, 228]
  ], 0.4);
  brush.circle(421, 220, 12);
  brush.spline([[423, 290], [415, 307], [411, 318]], 0.3);
  brush.spline([[423, 290], [431, 305], [433, 318]], 0.3);
  brush.set("charcoal", "#050510", 1.0);
  brush.line(421, 255, 438, 248);
  brush.line(438, 248, 450, 250);
  brush.line(438, 248, 428, 250);

  // Figure 5: far right, small
  brush.set("charcoal", "#050510", 1.5);
  brush.spline([
    [540, 312],
    [543, 290],
    [545, 272],
    [542, 255],
    [539, 242]
  ], 0.35);
  brush.circle(541, 234, 9);
  brush.spline([[543, 290], [537, 304], [534, 314]], 0.3);
  brush.spline([[543, 290], [549, 303], [551, 314]], 0.3);

  // --- Puddle ripple suggestions on pavement ---
  brush.set("pen", "#1a2a4a", 0.4);
  brush.arc(150, 430, 28, 0, 180);
  brush.arc(155, 435, 18, 0, 180);
  brush.arc(350, 460, 22, 0, 180);
  brush.arc(355, 464, 14, 0, 180);
  brush.arc(480, 420, 25, 0, 180);

  // Neon color tint in puddles
  brush.set("pen", "#cc0066", 0.3);
  brush.arc(80, 445, 20, 0, 180);
  brush.set("pen", "#00aaaa", 0.3);
  brush.arc(500, 445, 22, 0, 180);
  brush.set("pen", "#ff6600", 0.3);
  brush.arc(290, 480, 18, 0, 180);

  // --- Foreground pavement texture (charcoal) ---
  brush.wiggle(1);
  brush.set("charcoal", "#0a0a20", 0.5);
  for (let i = 0; i < 12; i++) {
    let lx = random(0, 600);
    let ly = random(500, 590);
    brush.line(lx, ly, lx + random(20, 80), ly + random(-2, 2));
  }
  brush.noField();

  noLoop();
}