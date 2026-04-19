function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#1a1a2e");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Deep night sky / upper background wash
  brush.noStroke();
  brush.fill("#1a1a2e", 255);
  brush.wash("#1a1a2e", 255);
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 380);
  brush.vertex(0, 380);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // Wet pavement — dark reflective ground
  brush.wash("#0d0d1a", 255);
  brush.beginShape(0);
  brush.vertex(0, 380);
  brush.vertex(600, 380);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Building silhouettes — dark ink masses
  function drawBuilding(x, w, h) {
    brush.wash("#0f0f1f", 240);
    brush.fill("#0f0f1f", 255);
    brush.noStroke();
    brush.beginShape(0);
    brush.vertex(x, 380);
    brush.vertex(x + w, 380);
    brush.vertex(x + w, 380 - h);
    brush.vertex(x, 380 - h);
    brush.endShape(true);
    brush.noWash();
    brush.noFill();
  }

  drawBuilding(0, 80, 200);
  drawBuilding(70, 60, 260);
  drawBuilding(120, 90, 180);
  drawBuilding(200, 50, 220);
  drawBuilding(240, 70, 150);
  drawBuilding(300, 80, 240);
  drawBuilding(370, 60, 190);
  drawBuilding(420, 90, 210);
  drawBuilding(500, 70, 170);
  drawBuilding(550, 60, 230);

  // Building window lights — tiny warm glows
  function drawWindows(bx, bw, bh, rows, cols) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (random() > 0.45) continue;
        let wx = bx + 8 + c * ((bw - 16) / max(cols - 1, 1));
        let wy = 380 - bh + 12 + r * 18;
        if (wy > 370) continue;
        let wcolor = random() > 0.5 ? "#ffe066" : "#ffd0a0";
        brush.wash(wcolor, 180);
        brush.noStroke();
        brush.beginShape(0);
        brush.vertex(wx - 3, wy - 4);
        brush.vertex(wx + 3, wy - 4);
        brush.vertex(wx + 3, wy + 4);
        brush.vertex(wx - 3, wy + 4);
        brush.endShape(true);
        brush.noWash();
      }
    }
  }

  drawWindows(0, 80, 200, 10, 4);
  drawWindows(70, 60, 260, 13, 3);
  drawWindows(120, 90, 180, 9, 4);
  drawWindows(200, 50, 220, 11, 3);
  drawWindows(240, 70, 150, 7, 3);
  drawWindows(300, 80, 240, 12, 4);
  drawWindows(370, 60, 190, 9, 3);
  drawWindows(420, 90, 210, 10, 4);
  drawWindows(500, 70, 170, 8, 3);
  drawWindows(550, 60, 230, 11, 3);

  // Neon sign bleeds — watercolor washes for glowing color
  // Magenta neon
  brush.noStroke();
  brush.fillTexture(0.6, 0.5);
  brush.fillBleed(0.55, "out");
  brush.fill("#ff2d78", 55);
  brush.circle(160, 200, 60);
  brush.fill("#ff2d78", 35);
  brush.fillBleed(0.7, "out");
  brush.circle(160, 200, 90);
  brush.noFill();

  // Cyan neon
  brush.fillTexture(0.55, 0.45);
  brush.fillBleed(0.5, "out");
  brush.fill("#00eeff", 50);
  brush.circle(390, 170, 55);
  brush.fill("#00eeff", 30);
  brush.fillBleed(0.65, "out");
  brush.circle(390, 170, 85);
  brush.noFill();

  // Yellow neon
  brush.fillTexture(0.5, 0.4);
  brush.fillBleed(0.45, "out");
  brush.fill("#ffe600", 45);
  brush.circle(510, 220, 45);
  brush.fill("#ffe600", 28);
  brush.fillBleed(0.6, "out");
  brush.circle(510, 220, 70);
  brush.noFill();

  // Violet neon
  brush.fillTexture(0.55, 0.45);
  brush.fillBleed(0.5, "out");
  brush.fill("#cc44ff", 45);
  brush.circle(75, 240, 40);
  brush.fill("#cc44ff", 28);
  brush.fillBleed(0.65, "out");
  brush.circle(75, 240, 65);
  brush.noFill();

  // Neon marker smears on buildings — bold color strokes
  brush.set("marker", "#ff2d78", 1.8);
  brush.wiggle(1);
  brush.spline([[130, 195], [155, 198], [180, 193]], 0.4);
  brush.spline([[138, 208], [162, 211], [178, 206]], 0.4);

  brush.set("marker", "#00eeff", 1.6);
  brush.spline([[360, 165], [385, 168], [415, 163]], 0.4);
  brush.spline([[368, 178], [392, 181], [412, 176]], 0.4);

  brush.set("marker", "#ffe600", 1.4);
  brush.spline([[488, 216], [508, 219], [528, 215]], 0.4);

  brush.set("marker", "#cc44ff", 1.3);
  brush.spline([[55, 236], [75, 239], [95, 235]], 0.4);

  brush.noField();

  // Wet pavement reflections — neon colors bleeding downward
  // Magenta reflection
  brush.noStroke();
  brush.fillTexture(0.7, 0.55);
  brush.fillBleed(0.6, "out");
  brush.fill("#ff2d78", 38);
  brush.beginShape(0.5);
  brush.vertex(110, 385);
  brush.vertex(210, 385);
  brush.vertex(220, 480);
  brush.vertex(100, 480);
  brush.endShape(true);
  brush.fill("#ff2d78", 22);
  brush.fillBleed(0.75, "out");
  brush.beginShape(0.5);
  brush.vertex(120, 385);
  brush.vertex(200, 385);
  brush.vertex(210, 520);
  brush.vertex(110, 520);
  brush.endShape(true);
  brush.noFill();

  // Cyan reflection
  brush.fillTexture(0.65, 0.5);
  brush.fillBleed(0.55, "out");
  brush.fill("#00eeff", 35);
  brush.beginShape(0.5);
  brush.vertex(340, 385);
  brush.vertex(440, 385);
  brush.vertex(450, 490);
  brush.vertex(330, 490);
  brush.endShape(true);
  brush.fill("#00eeff", 20);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  brush.vertex(350, 385);
  brush.vertex(430, 385);
  brush.vertex(440, 530);
  brush.vertex(340, 530);
  brush.endShape(true);
  brush.noFill();

  // Yellow reflection
  brush.fillTexture(0.6, 0.45);
  brush.fillBleed(0.5, "out");
  brush.fill("#ffe600", 32);
  brush.beginShape(0.5);
  brush.vertex(470, 385);
  brush.vertex(550, 385);
  brush.vertex(558, 470);
  brush.vertex(462, 470);
  brush.endShape(true);
  brush.noFill();

  // Violet reflection
  brush.fillTexture(0.6, 0.45);
  brush.fillBleed(0.5, "out");
  brush.fill("#cc44ff", 30);
  brush.beginShape(0.5);
  brush.vertex(40, 385);
  brush.vertex(115, 385);
  brush.vertex(120, 460);
  brush.vertex(35, 460);
  brush.endShape(true);
  brush.noFill();

  // Rain streaks on pavement — fine rotring lines
  brush.set("rotring", "#334466", 0.25);
  for (let i = 0; i < 80; i++) {
    let rx = random(0, 600);
    let ry = random(385, 590);
    let len = random(4, 18);
    brush.line(rx, ry, rx + random(-2, 2), ry + len);
  }

  // Rain streaks in sky — falling through air
  brush.set("rotring", "#2a3a55", 0.2);
  for (let i = 0; i < 60; i++) {
    let rx = random(0, 600);
    let ry = random(50, 375);
    let len = random(6, 22);
    brush.line(rx, ry, rx + random(-1, 1), ry + len);
  }

  // Puddle ripples on pavement
  brush.set("pen", "#2a3a5a", 0.3);
  for (let i = 0; i < 12; i++) {
    let px = random(50, 550);
    let py = random(420, 570);
    let pr = random(8, 25);
    brush.arc(px, py, pr, 0, 180);
    brush.arc(px, py, pr * 0.6, 10, 170);
  }

  // Passerby silhouettes — sparse ink figures
  function drawFigure(fx, fy, fh, color) {
    let hw = fh * 0.12;
    // Head
    brush.noStroke();
    brush.wash(color, 230);
    brush.circle(fx, fy, hw * 1.1);
    brush.noWash();
    // Body
    brush.wash(color, 220);
    brush.beginShape(0.2);
    brush.vertex(fx - hw, fy + hw * 1.2);
    brush.vertex(fx + hw, fy + hw * 1.2);
    brush.vertex(fx + hw * 1.3, fy + fh * 0.55);
    brush.vertex(fx - hw * 1.3, fy + fh * 0.55);
    brush.endShape(true);
    brush.noWash();
    // Legs
    brush.set("charcoal", color, 0.7);
    brush.line(fx - hw * 0.5, fy + fh * 0.55, fx - hw * 0.8, fy + fh);
    brush.line(fx + hw * 0.5, fy + fh * 0.55, fx + hw * 0.9, fy + fh);
    // Arm suggestion
    brush.set("charcoal", color, 0.5);
    brush.line(fx - hw * 1.2, fy + fh * 0.25, fx - hw * 1.8, fy + fh * 0.5);
  }

  // Place figures along the street
  drawFigure(95, 385, 70, "#0a0a18");
  drawFigure(185, 388, 60, "#080814");
  drawFigure(290, 386, 75, "#0c0c1e");
  drawFigure(370, 390, 55, "#0a0a16");
  drawFigure(450, 387, 68, "#0b0b1a");
  drawFigure(530, 389, 50, "#090914");

  // Umbrella suggestions over some figures
  brush.set("pen", "#1a1a30", 0.5);
  brush.arc(95, 382, 22, 180, 360);
  brush.line(95, 382, 95, 355);

  brush.set("pen", "#1a1a30", 0.45);
  brush.arc(290, 383, 26, 180, 360);
  brush.line(290, 383, 290, 353);

  brush.set("pen", "#1a1a30", 0.4);
  brush.arc(450, 384, 20, 180, 360);
  brush.line(450, 384, 450, 357);

  // Neon sign marker text suggestion — horizontal smears
  brush.set("marker", "#ff2d78", 1.2);
  for (let i = 0; i < 4; i++) {
    brush.line(133 + i * 8, 190 + i * 2, 133 + i * 8 + random(20, 35), 190 + i * 2 + random(-1, 1));
  }

  brush.set("marker", "#00eeff", 1.1);
  for (let i = 0; i < 3; i++) {
    brush.line(363 + i * 9, 162 + i * 2, 363 + i * 9 + random(18, 30), 162 + i * 2 + random(-1, 1));
  }

  // Street lamp glow
  brush.noStroke();
  brush.fillTexture(0.4, 0.3);
  brush.fillBleed(0.8, "out");
  brush.fill("#fffacc", 25);
  brush.circle(240, 310, 70);
  brush.fill("#fffacc", 15);
  brush.fillBleed(0.9, "out");
  brush.circle(240, 310, 110);
  brush.noFill();

  brush.fillTexture(0.4, 0.3);
  brush.fillBleed(0.8, "out");
  brush.fill("#fffacc", 25);
  brush.circle(480, 290, 65);
  brush.fill("#fffacc", 15);
  brush.fillBleed(0.9, "out");
  brush.circle(480, 290, 100);
  brush.noFill();

  // Lamp post poles
  brush.set("2B", "#111122", 0.6);
  brush.line(240, 380, 240, 310);
  brush.line(480, 380, 480, 290);
  brush.line(235, 310, 255, 310);
  brush.line(475, 290, 495, 290);

  // Street lamp reflection on pavement
  brush.noStroke();
  brush.fillTexture(0.5, 0.35);
  brush.fillBleed(0.65, "out");
  brush.fill("#fffacc", 20);
  brush.beginShape(0.5);
  brush.vertex(210, 385);
  brush.vertex(270, 385);
  brush.vertex(280, 460);
  brush.vertex(200, 460);
  brush.endShape(true);
  brush.noFill();

  brush.fillTexture(0.5, 0.35);
  brush.fillBleed(0.65, "out");
  brush.fill("#fffacc", 18);
  brush.beginShape(0.5);
  brush.vertex(452, 385);
  brush.vertex(508, 385);
  brush.vertex(516, 450);
  brush.vertex(444, 450);
  brush.endShape(true);
  brush.noFill();

  // Final atmospheric haze — very faint blue-violet overlay on sky
  brush.noStroke();
  brush.fillBleed(0.3, "out");
  brush.fill("#1a1060", 18);
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 380);
  brush.vertex(0, 380);
  brush.endShape(true);
  brush.noFill();

  noLoop();
}