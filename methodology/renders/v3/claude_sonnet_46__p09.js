function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#1a1a2e");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Night sky / deep background wash ---
  brush.noStroke();
  brush.fill("#0d0d1a", 240);
  brush.fillBleed(0.05, "out");
  brush.rect(0, 0, 600, 600);
  brush.noFill();

  // --- Wet pavement base ---
  brush.wash("#1c1c30", 220);
  brush.rect(0, 320, 600, 280);
  brush.noWash();

  // Pavement sheen layers
  brush.fill("#22223a", 180);
  brush.fillBleed(0.12, "out");
  brush.fillTexture(0.4, 0.2);
  brush.rect(0, 330, 600, 270);
  brush.noFill();

  // --- Building silhouettes (dark ink masses) ---
  brush.wash("#0a0a18", 255);

  // Left building block
  brush.rect(0, 60, 140, 360);
  // Left building windows cutouts via marker overlay later

  // Center-left building
  brush.rect(110, 120, 100, 300);

  // Right building tall
  brush.rect(400, 40, 200, 380);

  // Center building mid
  brush.rect(240, 160, 160, 260);

  brush.noWash();

  // --- Building edges with pen ---
  brush.set("pen", "#080812", 1.2);
  brush.line(0, 60, 140, 60);
  brush.line(140, 60, 140, 420);
  brush.line(110, 120, 110, 420);
  brush.line(210, 120, 210, 420);
  brush.line(240, 160, 240, 420);
  brush.line(400, 160, 400, 420);
  brush.line(400, 40, 400, 420);
  brush.line(600, 40, 600, 420);
  brush.line(400, 40, 600, 40);
  brush.noStroke();

  // --- Neon signs and light sources ---

  // Red/pink neon glow — left side
  brush.fill("#ff2255", 18);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.3, 0.15);
  for (let i = 0; i < 5; i++) {
    brush.circle(68 + random(-4, 4), 180 + random(-4, 4), 55 + random(0, 20));
  }
  brush.noFill();

  // Cyan neon glow — center
  brush.fill("#00eeff", 14);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.25, 0.1);
  for (let i = 0; i < 5; i++) {
    brush.circle(300 + random(-5, 5), 195 + random(-5, 5), 60 + random(0, 25));
  }
  brush.noFill();

  // Yellow/amber neon — right
  brush.fill("#ffcc00", 16);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.3, 0.12);
  for (let i = 0; i < 4; i++) {
    brush.circle(490 + random(-4, 4), 160 + random(-4, 4), 50 + random(0, 20));
  }
  brush.noFill();

  // Magenta neon — far right
  brush.fill("#ff44cc", 15);
  brush.fillBleed(0.65, "out");
  for (let i = 0; i < 4; i++) {
    brush.circle(555 + random(-3, 3), 230 + random(-3, 3), 40 + random(0, 15));
  }
  brush.noFill();

  // --- Neon marker smears on signs ---
  brush.set("marker", "#ff2255", 2.5);
  brush.wiggle(1);
  brush.line(30, 178, 110, 178);
  brush.line(32, 185, 108, 185);

  brush.set("marker", "#00eeff", 2.2);
  brush.line(258, 193, 342, 193);
  brush.line(260, 200, 340, 200);

  brush.set("marker", "#ffcc00", 2.0);
  brush.line(455, 158, 525, 158);
  brush.line(457, 165, 523, 165);

  brush.set("marker", "#ff44cc", 1.8);
  brush.line(530, 228, 580, 228);
  brush.line(532, 235, 578, 235);
  brush.noField();

  // --- Window lights (small warm glows) ---
  let windowColors = ["#ffe8a0", "#ffd070", "#ffeecc", "#ffe090"];
  let windowPositions = [
    [18, 100], [18, 140], [18, 180], [60, 100], [60, 140],
    [120, 150], [120, 200], [160, 150], [160, 200],
    [415, 70], [415, 110], [455, 70], [455, 110],
    [495, 70], [495, 110], [535, 70], [535, 110],
    [415, 150], [455, 150], [495, 150], [535, 150],
    [250, 185], [250, 225], [290, 185], [290, 225], [330, 185],
  ];

  brush.noStroke();
  for (let w of windowPositions) {
    let c = random(windowColors);
    brush.fill(c, random(130, 200));
    brush.fillBleed(0.35, "out");
    brush.fillTexture(0.2, 0.08);
    brush.rect(w[0], w[1], random(14, 22), random(10, 16), "center");
    brush.noFill();
  }

  // --- Rain streaks ---
  brush.set("2H", "#8899bb", 0.35);
  brush.wiggle(0.5);
  for (let i = 0; i < 120; i++) {
    let rx = random(0, 600);
    let ry = random(0, 420);
    let rlen = random(8, 28);
    brush.line(rx, ry, rx + random(-2, 2), ry + rlen);
  }

  // Heavier rain streaks
  brush.set("2B", "#6677aa", 0.3);
  for (let i = 0; i < 60; i++) {
    let rx = random(0, 600);
    let ry = random(0, 420);
    let rlen = random(14, 40);
    brush.line(rx, ry, rx + random(-1, 1), ry + rlen);
  }
  brush.noField();

  // --- Wet pavement reflections ---

  // Red neon reflection on pavement
  brush.fill("#ff2255", 22);
  brush.fillBleed(0.75, "out");
  brush.fillTexture(0.5, 0.2);
  for (let i = 0; i < 4; i++) {
    brush.circle(68 + random(-8, 8), 420 + random(10, 60), 40 + random(0, 30));
  }
  brush.noFill();

  // Cyan reflection
  brush.fill("#00eeff", 18);
  brush.fillBleed(0.8, "out");
  brush.fillTexture(0.45, 0.18);
  for (let i = 0; i < 4; i++) {
    brush.circle(300 + random(-10, 10), 430 + random(10, 70), 45 + random(0, 35));
  }
  brush.noFill();

  // Yellow reflection
  brush.fill("#ffcc00", 20);
  brush.fillBleed(0.72, "out");
  brush.fillTexture(0.4, 0.15);
  for (let i = 0; i < 3; i++) {
    brush.circle(490 + random(-8, 8), 435 + random(8, 65), 38 + random(0, 28));
  }
  brush.noFill();

  // Magenta reflection
  brush.fill("#ff44cc", 18);
  brush.fillBleed(0.7, "out");
  for (let i = 0; i < 3; i++) {
    brush.circle(555 + random(-6, 6), 440 + random(8, 55), 32 + random(0, 22));
  }
  brush.noFill();

  // General wet sheen streaks on pavement
  brush.set("2H", "#334466", 0.4);
  for (let i = 0; i < 30; i++) {
    let px = random(0, 600);
    let py = random(330, 590);
    brush.line(px, py, px + random(-20, 20), py + random(2, 8));
  }
  brush.noStroke();

  // Puddle reflections — horizontal smears
  brush.fill("#1a2240", 120);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.6, 0.3);
  brush.rect(60, 490, 180, 18, "center");
  brush.rect(300, 510, 220, 14, "center");
  brush.rect(480, 530, 140, 12, "center");
  brush.noFill();

  // --- Passerby silhouettes ---
  // Each figure: dark ink wash body + charcoal outline

  // Figure 1 — far left, walking
  let f1x = 70, f1y = 390;
  brush.wash("#080810", 245);
  brush.fillTexture(0.3, 0.1);
  // Body
  brush.beginShape(0.25);
  brush.vertex(f1x - 10, f1y);
  brush.vertex(f1x + 10, f1y);
  brush.vertex(f1x + 12, f1y + 55);
  brush.vertex(f1x + 5, f1y + 55);
  brush.vertex(f1x + 7, f1y + 90);
  brush.vertex(f1x - 2, f1y + 90);
  brush.vertex(f1x - 8, f1y + 55);
  brush.vertex(f1x - 14, f1y + 55);
  brush.endShape(true);
  brush.noWash();
  // Head
  brush.wash("#080810", 245);
  brush.circle(f1x, f1y - 14, 13);
  brush.noWash();
  // Umbrella
  brush.set("charcoal", "#111122", 1.2);
  brush.line(f1x + 2, f1y - 26, f1x + 2, f1y - 55);
  brush.arc(f1x + 2, f1y - 55, 28, 180, 360);
  brush.noStroke();

  // Figure 2 — center-left
  let f2x = 195, f2y = 380;
  brush.wash("#060610", 250);
  brush.beginShape(0.2);
  brush.vertex(f2x - 9, f2y);
  brush.vertex(f2x + 9, f2y);
  brush.vertex(f2x + 11, f2y + 50);
  brush.vertex(f2x + 4, f2y + 50);
  brush.vertex(f2x + 6, f2y + 88);
  brush.vertex(f2x - 1, f2y + 88);
  brush.vertex(f2x - 7, f2y + 50);
  brush.vertex(f2x - 13, f2y + 50);
  brush.endShape(true);
  brush.noWash();
  brush.wash("#060610", 250);
  brush.circle(f2x, f2y - 13, 12);
  brush.noWash();

  // Figure 3 — center, slightly closer
  let f3x = 310, f3y = 395;
  brush.wash("#050510", 255);
  brush.beginShape(0.2);
  brush.vertex(f3x - 11, f3y);
  brush.vertex(f3x + 11, f3y);
  brush.vertex(f3x + 13, f3y + 60);
  brush.vertex(f3x + 5, f3y + 60);
  brush.vertex(f3x + 8, f3y + 100);
  brush.vertex(f3x - 2, f3y + 100);
  brush.vertex(f3x - 9, f3y + 60);
  brush.vertex(f3x - 15, f3y + 60);
  brush.endShape(true);
  brush.noWash();
  brush.wash("#050510", 255);
  brush.circle(f3x, f3y - 15, 14);
  brush.noWash();
  // Umbrella
  brush.set("charcoal", "#0d0d1a", 1.0);
  brush.line(f3x + 1, f3y - 28, f3x + 1, f3y - 58);
  brush.arc(f3x + 1, f3y - 58, 32, 180, 360);
  brush.noStroke();

  // Figure 4 — right side, distant/smaller
  let f4x = 450, f4y = 385;
  brush.wash("#060610", 240);
  brush.beginShape(0.2);
  brush.vertex(f4x - 7, f4y);
  brush.vertex(f4x + 7, f4y);
  brush.vertex(f4x + 9, f4y + 42);
  brush.vertex(f4x + 3, f4y + 42);
  brush.vertex(f4x + 5, f4y + 72);
  brush.vertex(f4x - 1, f4y + 72);
  brush.vertex(f4x - 6, f4y + 42);
  brush.vertex(f4x - 10, f4y + 42);
  brush.endShape(true);
  brush.noWash();
  brush.wash("#060610", 240);
  brush.circle(f4x, f4y - 10, 10);
  brush.noWash();

  // Figure 5 — far right, very small/distant
  let f5x = 555, f5y = 388;
  brush.wash("#080812", 220);
  brush.beginShape(0.2);
  brush.vertex(f5x - 5, f5y);
  brush.vertex(f5x + 5, f5y);
  brush.vertex(f5x + 6, f5y + 34);
  brush.vertex(f5x + 2, f5y + 34);
  brush.vertex(f5x + 3, f5y + 58);
  brush.vertex(f5x - 1, f5y + 58);
  brush.vertex(f5x - 4, f5y + 34);
  brush.vertex(f5x - 7, f5y + 34);
  brush.endShape(true);
  brush.noWash();
  brush.wash("#080812", 220);
  brush.circle(f5x, f5y - 8, 8);
  brush.noWash();

  // --- Figure reflections on wet pavement ---
  brush.fill("#0a0a1a", 60);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.7, 0.3);

  brush.beginShape(0.3);
  brush.vertex(f1x - 12, f1y + 90);
  brush.vertex(f1x + 12, f1y + 90);
  brush.vertex(f1x + 18, f1y + 125);
  brush.vertex(f1x - 18, f1y + 125);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#0a0a1a", 55);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.3);
  brush.vertex(f3x - 14, f3y + 100);
  brush.vertex(f3x + 14, f3y + 100);
  brush.vertex(f3x + 20, f3y + 138);
  brush.vertex(f3x - 20, f3y + 138);
  brush.endShape(true);
  brush.noFill();

  // --- Street lamp glow ---
  brush.fill("#ffe8a0", 12);
  brush.fillBleed(0.8, "out");
  brush.fillTexture(0.2, 0.05);
  for (let i = 0; i < 5; i++) {
    brush.circle(160 + random(-5, 5), 310 + random(-5, 5), 80 + random(0, 30));
  }
  brush.noFill();

  // Lamp post
  brush.set("2B", "#0a0a18", 1.5);
  brush.line(160, 310, 160, 420);
  brush.line(160, 310, 175, 295);
  brush.set("marker", "#ffe8a0", 1.8);
  brush.circle(175, 293, 6);
  brush.noStroke();

  // Lamp reflection on pavement
  brush.fill("#ffe8a0", 18);
  brush.fillBleed(0.7, "out");
  for (let i = 0; i < 3; i++) {
    brush.circle(160 + random(-6, 6), 480 + random(-10, 10), 35 + random(0, 20));
  }
  brush.noFill();

  // --- Final rain overlay on top of everything ---
  brush.set("2H", "#aabbdd", 0.25);
  for (let i = 0; i < 80; i++) {
    let rx = random(0, 600);
    let ry = random(0, 600);
    brush.line(rx, ry, rx + random(-1, 1), ry + random(6, 18));
  }
  brush.noStroke();

  // --- Atmospheric dark vignette at edges ---
  brush.fill("#050510", 80);
  brush.fillBleed(0.3, "in");
  brush.fillTexture(0.2, 0.05);
  brush.rect(0, 0, 600, 600);
  brush.noFill();

  noLoop();
}