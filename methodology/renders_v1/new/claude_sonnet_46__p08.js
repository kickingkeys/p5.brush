function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky washes ---
  brush.noStroke();
  brush.fillTexture(0.7, 0.4);
  brush.fillBleed(0.55, "out");

  // Pale lavender-grey sky upper
  brush.wash("#c8cdd8", 120);
  brush.fill("#b8c0cf", 110);
  brush.beginShape(0.6);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 260);
  brush.vertex(0, 260);
  brush.endShape(true);
  brush.noWash();

  // Warm peachy horizon glow
  brush.fillBleed(0.45, "out");
  brush.fill("#e8d5bc", 130);
  brush.beginShape(0.5);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);

  // Soft fog layer over horizon
  brush.fillBleed(0.6, "out");
  brush.fill("#dde2e8", 90);
  brush.beginShape(0.5);
  brush.vertex(0, 230);
  brush.vertex(600, 230);
  brush.vertex(600, 310);
  brush.vertex(0, 310);
  brush.endShape(true);

  brush.noFill();

  // --- Water washes ---
  brush.fillTexture(0.75, 0.35);
  brush.fillBleed(0.3, "out");

  // Deep water base
  brush.wash("#8fa3b1", 140);
  brush.fill("#7a95a8", 150);
  brush.beginShape(0.5);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Lighter water reflection near horizon
  brush.fillBleed(0.4, "out");
  brush.fill("#b0c4ce", 100);
  brush.beginShape(0.4);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 370);
  brush.vertex(0, 370);
  brush.endShape(true);

  // Warm reflected glow on water
  brush.fillBleed(0.35, "in");
  brush.fill("#c9b89a", 70);
  brush.beginShape(0.4);
  brush.vertex(150, 310);
  brush.vertex(450, 310);
  brush.vertex(480, 400);
  brush.vertex(120, 400);
  brush.endShape(true);

  brush.noFill();

  // --- Distant foggy landmass / docks ---
  brush.fillTexture(0.6, 0.3);
  brush.fillBleed(0.5, "out");
  brush.fill("#9aabb5", 90);
  brush.beginShape(0.6);
  brush.vertex(0, 270);
  brush.vertex(80, 260);
  brush.vertex(150, 268);
  brush.vertex(220, 255);
  brush.vertex(310, 265);
  brush.vertex(400, 258);
  brush.vertex(480, 270);
  brush.vertex(600, 262);
  brush.vertex(600, 310);
  brush.vertex(0, 310);
  brush.endShape(true);

  // Slightly darker dock silhouette
  brush.fillBleed(0.35, "out");
  brush.fill("#6e828c", 100);
  brush.beginShape(0.4);
  brush.vertex(60, 285);
  brush.vertex(180, 278);
  brush.vertex(260, 290);
  brush.vertex(340, 282);
  brush.vertex(420, 288);
  brush.vertex(520, 280);
  brush.vertex(520, 315);
  brush.vertex(60, 315);
  brush.endShape(true);

  brush.noFill();

  // --- Boat hull silhouettes in fog ---
  brush.fillTexture(0.5, 0.25);
  brush.fillBleed(0.3, "out");

  // Boat 1 left
  brush.fill("#5a6e78", 130);
  brush.beginShape(0.4);
  brush.vertex(55, 300);
  brush.vertex(140, 295);
  brush.vertex(155, 308);
  brush.vertex(140, 318);
  brush.vertex(50, 318);
  brush.vertex(40, 308);
  brush.endShape(true);

  // Boat 2 center-left
  brush.fill("#4e6470", 120);
  brush.beginShape(0.4);
  brush.vertex(195, 298);
  brush.vertex(300, 292);
  brush.vertex(318, 307);
  brush.vertex(300, 320);
  brush.vertex(190, 320);
  brush.vertex(178, 307);
  brush.endShape(true);

  // Boat 3 right
  brush.fill("#556878", 115);
  brush.beginShape(0.4);
  brush.vertex(380, 302);
  brush.vertex(470, 296);
  brush.vertex(485, 310);
  brush.vertex(468, 322);
  brush.vertex(375, 322);
  brush.vertex(362, 310);
  brush.endShape(true);

  brush.noFill();

  // --- Water ripples with HB ---
  brush.set("HB", "#7a8f9a", 0.25);
  for (let y = 340; y < 580; y += 18 + random(-4, 4)) {
    let xStart = random(0, 60);
    let xEnd = random(540, 600);
    brush.line(xStart, y, xEnd, y + random(-3, 3));
  }

  // Lighter ripples near horizon
  brush.set("2H", "#a0b5be", 0.2);
  for (let y = 310; y < 370; y += 12 + random(-2, 2)) {
    brush.line(random(0, 40), y, random(560, 600), y + random(-2, 2));
  }

  // --- Mast lines with HB pencil ---
  brush.set("HB", "#3a4a52", 0.35);

  // Mast 1 - boat 1
  brush.line(90, 315, 85, 210);
  brush.line(90, 315, 93, 208);

  // Mast 2 - boat 1 secondary
  brush.line(118, 310, 115, 240);

  // Mast 3 - boat 2
  brush.line(240, 308, 236, 195);
  brush.line(240, 308, 244, 193);

  // Mast 4 - boat 2 secondary
  brush.line(270, 305, 268, 235);

  // Mast 5 - boat 3
  brush.line(420, 310, 416, 205);
  brush.line(420, 310, 424, 203);

  // Mast 6 - boat 3 secondary
  brush.line(450, 308, 448, 240);

  // Tall background mast far right
  brush.set("HB", "#4a5a62", 0.3);
  brush.line(540, 285, 537, 170);

  // Background mast left
  brush.line(75, 280, 72, 175);

  // --- Boom / crossbeam lines ---
  brush.set("2H", "#5a6a72", 0.25);

  // Boat 1 booms
  brush.line(85, 230, 55, 240);
  brush.line(85, 230, 125, 238);
  brush.line(115, 255, 90, 260);
  brush.line(115, 255, 140, 258);

  // Boat 2 booms
  brush.line(236, 218, 205, 228);
  brush.line(236, 218, 270, 225);
  brush.line(268, 248, 245, 252);
  brush.line(268, 248, 292, 250);

  // Boat 3 booms
  brush.line(416, 225, 388, 235);
  brush.line(416, 225, 450, 232);
  brush.line(448, 255, 425, 258);
  brush.line(448, 255, 468, 257);

  // --- Rope lines with 2H ---
  brush.set("2H", "#4a5a60", 0.2);

  // Boat 1 ropes
  brush.line(85, 210, 55, 300);
  brush.line(93, 208, 140, 298);
  brush.line(85, 215, 118, 242);

  // Boat 2 ropes
  brush.line(236, 195, 200, 300);
  brush.line(244, 193, 298, 300);
  brush.line(236, 200, 268, 237);

  // Boat 3 ropes
  brush.line(416, 205, 382, 308);
  brush.line(424, 203, 468, 308);
  brush.line(416, 210, 448, 242);

  // Background ropes
  brush.set("2H", "#6a7a80", 0.18);
  brush.line(537, 170, 510, 282);
  brush.line(537, 170, 565, 280);
  brush.line(72, 175, 48, 278);
  brush.line(72, 175, 100, 278);

  // --- Dock pilings ---
  brush.set("HB", "#4a5860", 0.3);
  let pilingXs = [62, 105, 148, 215, 258, 305, 348, 395, 438, 480, 525];
  for (let px of pilingXs) {
    brush.line(px, 290, px + random(-2, 2), 340 + random(10, 30));
  }

  // --- Fog veil over everything ---
  brush.noStroke();
  brush.fillBleed(0.7, "out");
  brush.fill("#e8edf0", 55);
  brush.beginShape(0.7);
  brush.vertex(0, 240);
  brush.vertex(600, 240);
  brush.vertex(600, 330);
  brush.vertex(0, 330);
  brush.endShape(true);

  // Second fog veil, slightly lower
  brush.fill("#dde3e8", 40);
  brush.fillBleed(0.65, "out");
  brush.beginShape(0.6);
  brush.vertex(0, 260);
  brush.vertex(600, 260);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);

  brush.noFill();

  // --- Final faint pencil texture on water ---
  brush.set("2H", "#8fa0aa", 0.15);
  for (let i = 0; i < 30; i++) {
    let ry = random(380, 580);
    brush.line(random(0, 100), ry, random(500, 600), ry + random(-5, 5));
  }

  noLoop();
}