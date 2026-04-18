function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#1a1a2e");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky / background wash ---
  brush.noStroke();
  brush.wash("#0d0d1a", 255);
  brush.rect(0, 0, 600, 600);
  brush.noWash();

  // Deep night sky gradient layers
  brush.fill("#1a1040", 180);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 280);
  brush.vertex(0, 280);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#0a0a20", 200);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 200);
  brush.vertex(0, 200);
  brush.endShape(true);
  brush.noFill();

  // --- Wet pavement base ---
  brush.wash("#0f1520", 255);
  brush.beginShape(0.3);
  brush.vertex(0, 340);
  brush.vertex(600, 340);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  brush.fill("#1c2030", 210);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.7, 0.4);
  brush.beginShape(0.4);
  brush.vertex(0, 340);
  brush.vertex(600, 340);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // --- Horizon / street line ---
  brush.fill("#141825", 200);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 320);
  brush.vertex(600, 320);
  brush.vertex(600, 380);
  brush.vertex(0, 380);
  brush.endShape(true);
  brush.noFill();

  // --- Neon sign bleeds in sky ---

  // Red neon bleed - left building sign
  brush.fill("#cc0033", 90);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.5, 0.6);
  brush.beginShape(0.6);
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 38 + noise(cos(a) * 0.1, sin(a) * 0.1) * 18;
    let ry = 22 + noise(cos(a) * 0.12, sin(a) * 0.12) * 10;
    brush.vertex(95 + cos(a) * rx, 110 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  // Red neon glow stronger core
  brush.fill("#ff2255", 130);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    brush.vertex(95 + cos(a) * 20, 110 + sin(a) * 11);
  }
  brush.endShape(true);
  brush.noFill();

  // Blue/cyan neon bleed - center
  brush.fill("#0044cc", 80);
  brush.fillBleed(0.75, "out");
  brush.fillTexture(0.5, 0.5);
  brush.beginShape(0.6);
  for (let i = 0; i < 22; i++) {
    let a = (i / 22) * 360;
    let rx = 45 + noise(cos(a) * 0.08, sin(a) * 0.08) * 20;
    let ry = 28 + noise(cos(a) * 0.1, sin(a) * 0.1) * 12;
    brush.vertex(310 + cos(a) * rx, 90 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  brush.fill("#00aaff", 140);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    brush.vertex(310 + cos(a) * 22, 90 + sin(a) * 13);
  }
  brush.endShape(true);
  brush.noFill();

  // Magenta neon - right
  brush.fill("#aa0077", 85);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.5, 0.55);
  brush.beginShape(0.6);
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 32 + noise(cos(a) * 0.09, sin(a) * 0.09) * 16;
    let ry = 20 + noise(cos(a) * 0.11, sin(a) * 0.11) * 9;
    brush.vertex(490 + cos(a) * rx, 130 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  brush.fill("#ff44cc", 140);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    brush.vertex(490 + cos(a) * 16, 130 + sin(a) * 10);
  }
  brush.endShape(true);
  brush.noFill();

  // Amber/yellow neon - small sign right side
  brush.fill("#aa5500", 90);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.4, 0.5);
  brush.beginShape(0.6);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    let rx = 25 + noise(cos(a) * 0.1, sin(a) * 0.1) * 12;
    let ry = 15 + noise(cos(a) * 0.12, sin(a) * 0.12) * 7;
    brush.vertex(420 + cos(a) * rx, 160 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  brush.fill("#ffcc00", 160);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.5);
  for (let i = 0; i < 12; i++) {
    let a = (i / 12) * 360;
    brush.vertex(420 + cos(a) * 12, 160 + sin(a) * 7);
  }
  brush.endShape(true);
  brush.noFill();

  // --- Building silhouettes (ink marker) ---

  // Left building block
  brush.noStroke();
  brush.wash("#080c14", 255);
  brush.beginShape(0.2);
  brush.vertex(0, 40);
  brush.vertex(70, 40);
  brush.vertex(70, 340);
  brush.vertex(0, 340);
  brush.endShape(true);
  brush.noWash();

  // Left building 2
  brush.wash("#070b12", 255);
  brush.beginShape(0.2);
  brush.vertex(60, 70);
  brush.vertex(140, 70);
  brush.vertex(140, 340);
  brush.vertex(60, 340);
  brush.endShape(true);
  brush.noWash();

  // Center-left building
  brush.wash("#090d16", 255);
  brush.beginShape(0.2);
  brush.vertex(200, 50);
  brush.vertex(270, 50);
  brush.vertex(270, 340);
  brush.vertex(200, 340);
  brush.endShape(true);
  brush.noWash();

  // Center building tall
  brush.wash("#060a10", 255);
  brush.beginShape(0.2);
  brush.vertex(270, 20);
  brush.vertex(360, 20);
  brush.vertex(360, 340);
  brush.vertex(270, 340);
  brush.endShape(true);
  brush.noWash();

  // Right buildings
  brush.wash("#080c14", 255);
  brush.beginShape(0.2);
  brush.vertex(370, 60);
  brush.vertex(450, 60);
  brush.vertex(450, 340);
  brush.vertex(370, 340);
  brush.endShape(true);
  brush.noWash();

  brush.wash("#070b12", 255);
  brush.beginShape(0.2);
  brush.vertex(450, 80);
  brush.vertex(540, 80);
  brush.vertex(540, 340);
  brush.vertex(450, 340);
  brush.endShape(true);
  brush.noWash();

  brush.wash("#060a10", 255);
  brush.beginShape(0.2);
  brush.vertex(530, 30);
  brush.vertex(600, 30);
  brush.vertex(600, 340);
  brush.vertex(530, 340);
  brush.endShape(true);
  brush.noWash();

  // --- Building window lights (small warm/cool dots) ---
  let windowColors = ["#ffcc88", "#88ccff", "#ff8866", "#aaddff", "#ffaa44"];
  randomSeed(42);
  for (let bx of [20, 80, 215, 290, 390, 470, 545]) {
    let bw = 50;
    let btop = 50;
    for (let wy = btop + 10; wy < 310; wy += 18) {
      for (let wx = bx + 5; wx < bx + bw - 5; wx += 14) {
        if (random() < 0.45) {
          let wc = windowColors[floor(random(windowColors.length))];
          brush.noStroke();
          brush.wash(wc, floor(random(120, 200)));
          brush.beginShape(0.3);
          brush.vertex(wx, wy);
          brush.vertex(wx + 7, wy);
          brush.vertex(wx + 7, wy + 9);
          brush.vertex(wx, wy + 9);
          brush.endShape(true);
          brush.noWash();
        }
      }
    }
  }

  // --- Neon reflections on wet pavement ---

  // Red reflection
  brush.fill("#cc0033", 60);
  brush.fillBleed(0.8, "out");
  brush.fillTexture(0.9, 0.3);
  brush.beginShape(0.7);
  for (let i = 0; i < 18; i++) {
    let a = (i / 18) * 360;
    let rx = 22 + noise(cos(a) * 0.15, sin(a) * 0.15) * 30;
    let ry = 55 + noise(cos(a) * 0.2, sin(a) * 0.2) * 35;
    brush.vertex(95 + cos(a) * rx, 420 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  // Blue/cyan reflection
  brush.fill("#0044cc", 55);
  brush.fillBleed(0.85, "out");
  brush.fillTexture(0.9, 0.3);
  brush.beginShape(0.7);
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 28 + noise(cos(a) * 0.12, sin(a) * 0.12) * 35;
    let ry = 65 + noise(cos(a) * 0.18, sin(a) * 0.18) * 40;
    brush.vertex(310 + cos(a) * rx, 450 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  // Magenta reflection
  brush.fill("#aa0077", 55);
  brush.fillBleed(0.8, "out");
  brush.fillTexture(0.85, 0.3);
  brush.beginShape(0.7);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    let rx = 20 + noise(cos(a) * 0.13, sin(a) * 0.13) * 25;
    let ry = 50 + noise(cos(a) * 0.18, sin(a) * 0.18) * 32;
    brush.vertex(490 + cos(a) * rx, 430 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  // Amber reflection
  brush.fill("#aa5500", 60);
  brush.fillBleed(0.75, "out");
  brush.fillTexture(0.85, 0.3);
  brush.beginShape(0.7);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    let rx = 16 + noise(cos(a) * 0.14, sin(a) * 0.14) * 22;
    let ry = 40 + noise(cos(a) * 0.2, sin(a) * 0.2) * 28;
    brush.vertex(420 + cos(a) * rx, 410 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noFill();

  // Streaky pavement reflections - marker smears
  brush.set("marker", "#cc2244", 0.4);
  brush.spline([[70, 355], [100, 360], [130, 355], [160, 362]], 0.5);
  brush.set("marker", "#cc2244", 0.3);
  brush.spline([[60, 370], [95, 375], [125, 368]], 0.4);

  brush.set("marker", "#0055cc", 0.4);
  brush.spline([[260, 358], [300, 363], [340, 357], [375, 364]], 0.5);
  brush.set("marker", "#0055cc", 0.3);
  brush.spline([[255, 372], [295, 378], [330, 370]], 0.4);

  brush.set("marker", "#bb0066", 0.35);
  brush.spline([[450, 360], [480, 365], [510, 358], [540, 366]], 0.5);

  brush.set("marker", "#cc8800", 0.35);
  brush.spline([[380, 355], [410, 361], [440, 354]], 0.4);

  // Puddle ripple streaks (pen)
  brush.set("pen", "#223344", 0.3);
  brush.spline([[80, 390], [140, 393], [200, 388]], 0.3);
  brush.spline([[300, 400], [370, 403], [430, 397]], 0.3);
  brush.spline([[150, 430], [220, 435], [280, 428]], 0.3);
  brush.spline([[380, 425], [450, 430], [520, 423]], 0.3);

  // --- Rain streaks ---
  brush.set("2H", "#aabbcc", 0.25);
  randomSeed(77);
  for (let i = 0; i < 60; i++) {
    let rx = random(10, 590);
    let ry = random(50, 560);
    let rlen = random(8, 22);
    brush.line(rx, ry, rx + random(-2, 2), ry + rlen);
  }

  brush.set("2H", "#8899bb", 0.2);
  for (let i = 0; i < 40; i++) {
    let rx = random(10, 590);
    let ry = random(50, 560);
    let rlen = random(5, 14);
    brush.line(rx, ry, rx + random(-1, 1), ry + rlen);
  }

  // --- Passerby silhouettes (ink) ---

  // Person 1 - left, walking away
  let p1x = 130, p1y = 340;
  brush.noFill();
  brush.set("2B", "#050810", 2.0);
  // Body
  brush.spline([[p1x, p1y], [p1x + 2, p1y - 28], [p1x + 1, p1y - 50]], 0.3);
  // Head
  brush.set("2B", "#050810", 1.8);
  brush.circle(p1x + 1, p1y - 58, 9);
  // Legs
  brush.set("2B", "#050810", 1.5);
  brush.spline([[p1x, p1y], [p1x - 7, p1y + 22], [p1x - 5, p1y + 42]], 0.3);
  brush.spline([[p1x, p1y], [p1x + 8, p1y + 18], [p1x + 6, p1y + 40]], 0.3);
  // Arms
  brush.spline([[p1x + 1, p1y - 38], [p1x - 10, p1y - 22], [p1x - 14, p1y - 10]], 0.3);
  brush.spline([[p1x + 1, p1y - 38], [p1x + 11, p1y - 25], [p1x + 15, p1y - 12]], 0.3);
  // Umbrella
  brush.set("2B", "#050810", 1.2);
  brush.spline([[p1x + 1, p1y - 58], [p1x + 1, p1y - 75]], 0.2);
  brush.spline([[p1x - 22, p1y - 75], [p1x + 1, p1y - 82], [p1x + 24, p1y - 75]], 0.4);
  brush.set("HB", "#050810", 0.6);
  brush.spline([[p1x - 22, p1y - 75], [p1x - 10, p1y - 70], [p1x + 1, p1y - 75], [p1x + 12, p1y - 70], [p1x + 24, p1y - 75]], 0.4);

  // Person 1 reflection on pavement
  brush.set("2B", "#223344", 0.8);
  brush.spline([[p1x, p1y], [p1x + 2, p1y + 18], [p1x + 1, p1y + 35]], 0.3);
  brush.spline([[p1x, p1y], [p1x - 5, p1y + 22]], 0.3);
  brush.spline([[p1x, p1y], [p1x + 6, p1y + 20]], 0.3);

  // Person 2 - center-right, facing us
  let p2x = 340, p2y = 340;
  brush.set("2B", "#040710", 2.2);
  brush.spline([[p2x, p2y], [p2x - 1, p2y - 32], [p2x + 2, p2y - 55]], 0.3);
  brush.set("2B", "#040710", 2.0);
  brush.circle(p2x + 1, p2y - 64, 11);
  brush.set("2B", "#040710", 1.6);
  brush.spline([[p2x, p2y], [p2x - 9, p2y + 20], [p2x - 7, p2y + 44]], 0.3);
  brush.spline([[p2x, p2y], [p2x + 10, p2y + 18], [p2x + 8, p2y + 42]], 0.3);
  brush.spline([[p2x - 1, p2y - 42], [p2x - 14, p2y - 28], [p2x - 18, p2y - 14]], 0.3);
  brush.spline([[p2x - 1, p2y - 42], [p2x + 13, p2y - 30], [p2x + 17, p2y - 16]], 0.3);

  // Person 2 reflection
  brush.set("2B", "#1a2233", 0.9);
  brush.spline([[p2x, p2y], [p2x - 1, p2y + 22], [p2x + 2, p2y + 40]], 0.3);
  brush.spline([[p2x, p2y], [p2x - 7, p2y + 25]], 0.3);
  brush.spline([[p2x, p2y], [p2x + 8, p2y + 22]], 0.3);

  // Person 3 - far right, small (distance)
  let p3x = 510, p3y = 338;
  brush.set("HB", "#060912", 1.4);
  brush.spline([[p3x, p3y], [p3x + 1, p3y - 20], [p3x, p3y - 36]], 0.3);
  brush.set("HB", "#060912", 1.3);
  brush.circle(p3x, p3y - 42, 6);
  brush.set("HB", "#060912", 1.0);
  brush.spline([[p3x, p3y], [p3x - 5, p3y + 14], [p3x - 4, p3y + 28]], 0.3);
  brush.spline([[p3x, p3y], [p3x + 6, p3y + 12], [p3x + 5, p3y + 27]], 0.3);

  // Person 3 reflection
  brush.set("HB", "#1a2233", 0.6);
  brush.spline([[p3x, p3y], [p3x + 1, p3y + 14], [p3x, p3y + 26]], 0.3);

  // Person 4 - far left, very small
  let p4x = 55, p4y = 336;
  brush.set("HB", "#060912", 1.2);
  brush.spline([[p4x, p4y], [p4x + 1, p4y - 18], [p4x, p4y - 32]], 0.3);
  brush.set("HB", "#060912", 1.1);
  brush.circle(p4x, p4y - 38, 5);
  brush.set("HB", "#060912", 0.9);
  brush.spline([[p4x, p4y], [p4x - 4, p4y + 12], [p4x - 3, p4y + 24]], 0.3);
  brush.spline([[p4x, p4y], [p4x + 5, p4y + 11], [p4x + 4, p4y + 23]], 0.3);

  // --- Street lamp posts ---
  brush.set("2B", "#0a0e18", 1.8);
  // Left lamp post
  brush.spline([[155, 340], [155, 200], [155, 140]], 0.1);
  brush.spline([[155, 140], [175, 125], [195, 120]], 0.4);
  // Lamp glow
  brush.noStroke();
  brush.fill("#ffeeaa", 130);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.6);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    brush.vertex(195 + cos(a) * 14, 118 + sin(a) * 8);
  }
  brush.endShape(true);
  brush.noFill();

  // Lamp glow reflection on pavement
  brush.fill("#ffeeaa", 50);
  brush.fillBleed(0.85, "out");
  brush.fillTexture(0.9, 0.2);
  brush.beginShape(0.7);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    brush.vertex(195 + cos(a) * 20, 430 + sin(a) * 55);
  }
  brush.endShape(true);
  brush.noFill();

  // Right lamp post
  brush.set("2B", "#0a0e18", 1.8);
  brush.spline([[445, 340], [445, 200], [445, 145]], 0.1);
  brush.spline([[445, 145], [462, 130], [480, 125]], 0.4);
  brush.noStroke();
  brush.fill("#ffeeaa", 130);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.6);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    brush.vertex(480 + cos(a) * 14, 123 + sin(a) * 8);
  }
  brush.endShape(true);
  brush.noFill();

  brush.fill("#ffeeaa", 50);
  brush.fillBleed(0.85, "out");
  brush.fillTexture(0.9, 0.2);
  brush.beginShape(0.7);
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    brush.vertex(480 + cos(a) * 20, 430 + sin(a) * 55);
  }
  brush.endShape(true);
  brush.noFill();

  // --- Pavement texture / wet sheen ---
  brush.set("2H", "#334455", 0.2);
  randomSeed(99);
  for (let i = 0; i < 30; i++) {
    let sx = random(0, 600);
    let sy = random(355, 590);
    brush.spline([[sx, sy], [sx + random(-20, 20), sy + random(2, 8)], [sx + random(-30, 30), sy + random(5, 14)]], 0.3);
  }

  // Curb line
  brush.set("pen", "#111827", 0.8);
  brush.spline([[0, 342], [100, 344], [250, 341], [400, 343], [550, 340], [600, 342]], 0.3);

  // --- Final neon marker smears on pavement (on top) ---
  brush.set("marker", "#ff3366", 0.25);
  brush.spline([[75, 395], [110, 400], [145, 393]], 0.4);
  brush.set("marker", "#0088ff", 0.25);
  brush.spline([[280, 410], [320, 415], [355, 408]], 0.4);
  brush.set("marker", "#ff44bb", 0.2);
  brush.spline([[460, 398], [495, 403], [525, 396]], 0.4);

  // --- More rain on top ---
  brush.set("2H", "#99aabb", 0.2);
  randomSeed(123);
  for (let i = 0; i < 35; i++) {
    let rx = random(10, 590);
    let ry = random(100, 590);
    let rlen = random(6, 18);
    brush.line(rx, ry, rx + random(-1, 1), ry + rlen);
  }

  noLoop();
}