function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#1a1a2e");
  translate(-width / 2, -height / 2);

  // --- Night sky gradient wash ---
  brush.noStroke();
  brush.noHatch();

  // Deep night sky top
  brush.fill("#0d0d1a", 230);
  brush.fillBleed(0.05, "out");
  brush.fillTexture(0.1, 0.05);
  brush.rect(0, 0, 600, 300, "corner");

  // Lower sky, slightly lighter
  brush.fill("#1a1a3a", 200);
  brush.fillBleed(0.08, "out");
  brush.rect(0, 250, 600, 100, "corner");

  // --- Wet pavement base ---
  brush.fill("#0f0f1e", 255);
  brush.fillBleed(0.03, "out");
  brush.fillTexture(0.2, 0.1);
  brush.rect(0, 340, 600, 260, "corner");

  // --- Neon sign bleeds in sky / upper walls ---
  // Pink/magenta neon smear (left side sign)
  brush.noStroke();
  brush.fill("#ff2d78", 55);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.5, 0.7);
  brush.circle(110, 180, 55);

  brush.fill("#ff2d78", 35);
  brush.fillBleed(0.8, "out");
  brush.fillTexture(0.3, 0.5);
  brush.circle(110, 180, 90);

  // Cyan neon smear (right side)
  brush.fill("#00ffe7", 50);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.5, 0.7);
  brush.circle(480, 155, 50);

  brush.fill("#00ffe7", 30);
  brush.fillBleed(0.85, "out");
  brush.fillTexture(0.3, 0.5);
  brush.circle(480, 155, 85);

  // Yellow/amber neon (center-ish)
  brush.fill("#ffcc00", 45);
  brush.fillBleed(0.55, "out");
  brush.fillTexture(0.4, 0.6);
  brush.circle(310, 200, 40);

  brush.fill("#ffcc00", 25);
  brush.fillBleed(0.75, "out");
  brush.circle(310, 200, 70);

  // --- Neon marker strokes for signs ---
  // Pink neon horizontal bar
  brush.set("marker", "#ff2d78", 1.8);
  brush.stroke("#ff2d78");
  brush.line(70, 175, 155, 175);
  brush.line(72, 183, 153, 183);

  // Cyan neon horizontal bar
  brush.set("marker", "#00ffe7", 1.6);
  brush.line(445, 150, 515, 150);
  brush.line(447, 158, 513, 158);

  // Yellow neon mark
  brush.set("marker", "#ffcc00", 1.4);
  brush.line(285, 197, 340, 197);

  // --- Building silhouettes ---
  brush.noStroke();
  brush.noHatch();

  // Far left building
  brush.fill("#0a0a18", 255);
  brush.fillBleed(0.0);
  brush.fillTexture(0.0, 0.0);
  brush.rect(0, 80, 90, 280, "corner");

  // Second building left
  brush.fill("#080814", 255);
  brush.rect(80, 120, 70, 240, "corner");

  // Center-left building
  brush.fill("#0c0c1c", 255);
  brush.rect(140, 60, 100, 300, "corner");

  // Center building tall
  brush.fill("#0a0a16", 255);
  brush.rect(230, 40, 80, 320, "corner");

  // Center-right building
  brush.fill("#090914", 255);
  brush.rect(300, 90, 90, 270, "corner");

  // Right building
  brush.fill("#0b0b1a", 255);
  brush.rect(380, 70, 100, 300, "corner");

  // Far right building
  brush.fill("#080812", 255);
  brush.rect(470, 110, 130, 260, "corner");

  // --- Building windows (tiny warm/neon glows) ---
  // Warm yellow windows
  let windowPositions = [
    [20, 110], [20, 140], [20, 170], [45, 110], [45, 170],
    [95, 145], [95, 175], [95, 205], [110, 145],
    [155, 85], [155, 115], [155, 145], [175, 85], [175, 145],
    [245, 65], [245, 95], [245, 125], [260, 65], [260, 125],
    [315, 105], [315, 135], [315, 165], [340, 105], [340, 165],
    [395, 90], [395, 120], [395, 150], [420, 90], [420, 150],
    [490, 130], [490, 160], [515, 130], [515, 160], [540, 130]
  ];

  for (let i = 0; i < windowPositions.length; i++) {
    let wx = windowPositions[i][0];
    let wy = windowPositions[i][1];
    let rng = (wx * 7 + wy * 13) % 100;

    if (rng < 40) {
      brush.fill("#ffeeaa", 180);
      brush.fillBleed(0.4, "out");
      brush.fillTexture(0.1, 0.2);
      brush.circle(wx + 8, wy + 6, 5);
    } else if (rng < 60) {
      brush.fill("#ff6688", 150);
      brush.fillBleed(0.5, "out");
      brush.fillTexture(0.1, 0.2);
      brush.circle(wx + 8, wy + 6, 5);
    } else if (rng < 75) {
      brush.fill("#88eeff", 140);
      brush.fillBleed(0.45, "out");
      brush.fillTexture(0.1, 0.2);
      brush.circle(wx + 8, wy + 6, 5);
    }
  }

  // --- Wet street: neon reflections on pavement ---
  // Pink reflection pool
  brush.noStroke();
  brush.fill("#ff2d78", 40);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.6, 0.8);
  brush.rect(55, 370, 120, 35, "corner");

  brush.fill("#ff2d78", 25);
  brush.fillBleed(0.9, "out");
  brush.rect(65, 395, 100, 50, "corner");

  // Cyan reflection pool
  brush.fill("#00ffe7", 38);
  brush.fillBleed(0.72, "out");
  brush.fillTexture(0.6, 0.8);
  brush.rect(400, 360, 130, 40, "corner");

  brush.fill("#00ffe7", 22);
  brush.fillBleed(0.88, "out");
  brush.rect(415, 390, 110, 55, "corner");

  // Yellow reflection
  brush.fill("#ffcc00", 35);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.5, 0.7);
  brush.rect(240, 375, 100, 30, "corner");

  brush.fill("#ffcc00", 20);
  brush.fillBleed(0.8, "out");
  brush.rect(250, 398, 80, 45, "corner");

  // Ambient street glow reflections (warm)
  brush.fill("#ffeeaa", 18);
  brush.fillBleed(0.9, "out");
  brush.fillTexture(0.4, 0.6);
  brush.rect(0, 350, 600, 20, "corner");

  // Dark wet street puddle texture
  brush.fill("#050510", 120);
  brush.fillBleed(0.1, "out");
  brush.fillTexture(0.4, 0.2);
  brush.rect(0, 340, 600, 260, "corner");

  // --- Neon marker smears on pavement (reflections) ---
  brush.set("marker", "#ff2d78", 2.2);
  brush.stroke("#ff2d78");
  brush.line(80, 388, 160, 392);
  brush.line(85, 398, 155, 403);

  brush.set("marker", "#00ffe7", 2.0);
  brush.line(415, 378, 510, 382);
  brush.line(420, 390, 505, 395);

  brush.set("marker", "#ffcc00", 1.8);
  brush.line(250, 385, 330, 388);

  // Faint horizontal street lines (wet road)
  brush.set("2H", "#1a1a3a", 0.4);
  for (let ly = 355; ly < 600; ly += 18) {
    brush.stroke("#1a1a3a");
    brush.line(0, ly, 600, ly + int(sin(ly * 7) * 2));
  }

  // --- Sidewalk edge / curb line ---
  brush.set("pen", "#2a2a4a", 0.7);
  brush.line(0, 345, 600, 348);
  brush.set("pen", "#1a1a3a", 0.5);
  brush.line(0, 350, 600, 353);

  // --- Rain streaks ---
  brush.set("2H", "#aaccee", 0.25);
  for (let i = 0; i < 80; i++) {
    let rx = (i * 137 + 23) % 600;
    let ry = (i * 97 + 41) % 600;
    let rl = 12 + (i * 31) % 20;
    brush.stroke(color(170, 200, 220, 40 + (i * 17) % 60));
    brush.line(rx, ry, rx + 2, ry + rl);
  }

  // Heavier rain streaks
  brush.set("2H", "#88aacc", 0.3);
  for (let i = 0; i < 40; i++) {
    let rx = (i * 211 + 77) % 600;
    let ry = (i * 173 + 13) % 600;
    let rl = 18 + (i * 43) % 28;
    brush.stroke(color(136, 170, 204, 55 + (i * 23) % 50));
    brush.line(rx, ry, rx + 3, ry + rl);
  }

  // --- Passerby silhouettes ---
  // Person 1 (left, walking)
  brush.noHatch();
  brush.noFill();
  brush.set("charcoal", "#060610", 1.1);

  // Body
  brush.line(130, 430, 128, 510);
  // Head
  brush.fill("#060610", 240);
  brush.fillBleed(0.05);
  brush.fillTexture(0.1, 0.1);
  brush.circle(130, 422, 10);
  brush.noFill();
  // Coat/shoulders
  brush.set("charcoal", "#060610", 1.3);
  brush.line(115, 445, 145, 443);
  // Legs
  brush.set("charcoal", "#060610", 1.0);
  brush.line(128, 510, 118, 545);
  brush.line(128, 510, 140, 543);
  // Arm
  brush.line(115, 455, 105, 480);

  // Person 2 (center-left, umbrella)
  brush.set("charcoal", "#050510", 1.2);
  brush.line(240, 435, 238, 515);
  brush.fill("#050510", 235);
  brush.fillBleed(0.05);
  brush.fillTexture(0.1, 0.1);
  brush.circle(240, 427, 11);
  brush.noFill();
  brush.set("charcoal", "#050510", 1.0);
  brush.line(238, 515, 228, 548);
  brush.line(238, 515, 250, 546);
  // Umbrella handle
  brush.set("pen", "#050510", 0.8);
  brush.line(240, 427, 240, 408);
  // Umbrella canopy
  brush.set("charcoal", "#050510", 1.4);
  brush.line(210, 408, 270, 408);
  brush.set("2B", "#050510", 0.9);
  brush.line(210, 408, 240, 395);
  brush.line(240, 395, 270, 408);
  brush.line(225, 408, 235, 397);
  brush.line(255, 408, 245, 397);

  // Person 3 (right, distant smaller)
  brush.set("charcoal", "#0a0a1a", 0.9);
  brush.line(430, 450, 429, 520);
  brush.fill("#0a0a1a", 220);
  brush.fillBleed(0.05);
  brush.fillTexture(0.1, 0.1);
  brush.circle(430, 443, 9);
  brush.noFill();
  brush.set("charcoal", "#0a0a1a", 0.85);
  brush.line(420, 462, 442, 460);
  brush.line(429, 520, 421, 548);
  brush.line(429, 520, 439, 546);

  // Person 4 (far right, very distant)
  brush.set("charcoal", "#0d0d1e", 0.7);
  brush.line(545, 460, 544, 515);
  brush.fill("#0d0d1e", 200);
  brush.fillBleed(0.05);
  brush.fillTexture(0.1, 0.1);
  brush.circle(545, 454, 7);
  brush.noFill();
  brush.set("charcoal", "#0d0d1e", 0.65);
  brush.line(537, 470, 554, 469);
  brush.line(544, 515, 538, 538);
  brush.line(544, 515, 551, 537);

  // Person 5 (left edge, partial)
  brush.set("charcoal", "#040410", 1.0);
  brush.line(30, 440, 29, 510);
  brush.fill("#040410", 230);
  brush.fillBleed(0.05);
  brush.fillTexture(0.1, 0.1);
  brush.circle(30, 432, 9);
  brush.noFill();
  brush.set("charcoal", "#040410", 0.9);
  brush.line(20, 452, 42, 450);
  brush.line(29, 510, 20, 542);
  brush.line(29, 510, 39, 540);

  // --- Fog / mist overlay at horizon ---
  brush.noStroke();
  brush.fill("#1a1a3a", 80);
  brush.fillBleed(0.95, "out");
  brush.fillTexture(0.2, 0.4);
  brush.rect(0, 300, 600, 60, "corner");

  brush.fill("#0d0d28", 60);
  brush.fillBleed(0.9, "out");
  brush.rect(0, 320, 600, 40, "corner");

  // --- Final neon glow overlay on pavement ---
  brush.fill("#ff2d78", 12);
  brush.fillBleed(0.98, "out");
  brush.rect(0, 340, 200, 260, "corner");

  brush.fill("#00ffe7", 10);
  brush.fillBleed(0.98, "out");
  brush.rect(380, 340, 220, 260, "corner");

  brush.fill("#ffcc00", 8);
  brush.fillBleed(0.98, "out");
  brush.rect(200, 340, 200, 260, "corner");

  noLoop();
}