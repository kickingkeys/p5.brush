function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f7f2e8");
  brush.scaleBrushes(3);
  noLoop();
}

function draw() {
  background("#f7f2e8");
  translate(-width / 2, -height / 2);

  // === SKY WASHES ===
  brush.noStroke();
  brush.fillTexture(0.7, 0.4);

  // Pale dawn sky — upper zone
  brush.fill("#c8d8e8", 90);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 280);
  brush.vertex(0, 280);
  brush.endShape(true);

  // Warm horizon glow
  brush.fill("#e8c8a0", 80);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.55);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 340);
  brush.vertex(0, 340);
  brush.endShape(true);

  // Soft peach sunrise
  brush.fill("#e8b080", 55);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.55);
  brush.vertex(100, 210);
  brush.vertex(500, 210);
  brush.vertex(520, 320);
  brush.vertex(80, 320);
  brush.endShape(true);

  // Misty blue-grey fog layer
  brush.fill("#b8c8d8", 70);
  brush.fillBleed(0.55, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 260);
  brush.vertex(600, 260);
  brush.vertex(600, 360);
  brush.vertex(0, 360);
  brush.endShape(true);

  // === WATER WASHES ===
  // Base water — grey-blue
  brush.fill("#8aa8c0", 100);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 330);
  brush.vertex(600, 330);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Water mid tone
  brush.fill("#7090a8", 80);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 350);
  brush.vertex(600, 350);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Water dark reflection near bottom
  brush.fill("#506070", 90);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(0, 440);
  brush.vertex(600, 440);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Water shimmer — warm reflection
  brush.fill("#c09858", 40);
  brush.fillBleed(0.45, "out");
  brush.beginShape(0.5);
  brush.vertex(180, 340);
  brush.vertex(420, 340);
  brush.vertex(440, 430);
  brush.vertex(160, 430);
  brush.endShape(true);

  // === DISTANT FOGGY SHORE / DOCKS ===
  brush.fill("#a0b0b8", 75);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 295);
  brush.vertex(600, 295);
  brush.vertex(600, 345);
  brush.vertex(0, 345);
  brush.endShape(true);

  // Dock mass left
  brush.fill("#7a8a90", 90);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.4);
  brush.vertex(20, 315);
  brush.vertex(160, 315);
  brush.vertex(170, 360);
  brush.vertex(10, 360);
  brush.endShape(true);

  // Dock mass right
  brush.fill("#7a8a90", 85);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.4);
  brush.vertex(400, 310);
  brush.vertex(590, 310);
  brush.vertex(600, 355);
  brush.vertex(390, 355);
  brush.endShape(true);

  // Hull of boat left
  brush.fill("#5a5048", 110);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(60, 330);
  brush.vertex(200, 328);
  brush.vertex(210, 365);
  brush.vertex(50, 368);
  brush.endShape(true);

  // Hull of boat center
  brush.fill("#4a4840", 105);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(220, 325);
  brush.vertex(380, 323);
  brush.vertex(385, 362);
  brush.vertex(215, 364);
  brush.endShape(true);

  // Hull of boat right
  brush.fill("#5a5048", 100);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(390, 328);
  brush.vertex(540, 326);
  brush.vertex(548, 360);
  brush.vertex(385, 362);
  brush.endShape(true);

  // Cabin / superstructure center boat
  brush.fill("#6a6058", 95);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(255, 295);
  brush.vertex(340, 295);
  brush.vertex(345, 328);
  brush.vertex(250, 328);
  brush.endShape(true);

  // Cabin left boat
  brush.fill("#6a6058", 90);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(90, 302);
  brush.vertex(160, 302);
  brush.vertex(165, 330);
  brush.vertex(85, 330);
  brush.endShape(true);

  // Cabin right boat
  brush.fill("#6a6058", 88);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(430, 300);
  brush.vertex(500, 300);
  brush.vertex(505, 328);
  brush.vertex(425, 328);
  brush.endShape(true);

  // === WATER REFLECTIONS — spray ===
  brush.noFill();
  brush.set("spray", "#607888", 0.8);
  for (let i = 0; i < 18; i++) {
    let rx = random(30, 570);
    let ry = random(370, 480);
    let rw = random(20, 80);
    brush.line(rx, ry, rx + rw, ry + random(-3, 3));
  }

  brush.set("spray", "#c8a870", 0.6);
  for (let i = 0; i < 10; i++) {
    let rx = random(150, 450);
    let ry = random(355, 430);
    let rw = random(15, 55);
    brush.line(rx, ry, rx + rw, ry + random(-2, 2));
  }

  // === MIST / FOG OVERLAYS ===
  brush.noStroke();
  brush.fill("#e8eef2", 55);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.6);
  brush.vertex(0, 270);
  brush.vertex(600, 270);
  brush.vertex(600, 340);
  brush.vertex(0, 340);
  brush.endShape(true);

  brush.fill("#f0f4f6", 45);
  brush.fillBleed(0.8, "out");
  brush.beginShape(0.6);
  brush.vertex(0, 280);
  brush.vertex(600, 280);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);

  // === GRAPHITE PENCIL LINES — MASTS ===
  brush.noFill();

  // Main mast center boat — tall
  brush.set("HB", "#3a3830", 0.5);
  brush.line(300, 100, 302, 325);

  // Slight lean mast center boat secondary
  brush.set("2H", "#4a4840", 0.4);
  brush.line(285, 155, 287, 325);

  // Left boat mast
  brush.set("HB", "#3a3830", 0.5);
  brush.line(128, 130, 130, 302);

  // Left boat secondary mast
  brush.set("2H", "#4a4840", 0.35);
  brush.line(115, 180, 117, 302);

  // Right boat mast
  brush.set("HB", "#3a3830", 0.5);
  brush.line(468, 135, 470, 300);

  // Right boat secondary mast
  brush.set("2H", "#4a4840", 0.35);
  brush.line(455, 185, 457, 300);

  // Far background ghost mast left
  brush.set("2H", "#8a8880", 0.3);
  brush.line(50, 210, 52, 315);

  // Far background ghost mast right
  brush.set("2H", "#8a8880", 0.3);
  brush.line(555, 215, 557, 310);

  // === GRAPHITE PENCIL LINES — BOOMS / YARDS ===
  // Center boat boom
  brush.set("2H", "#3a3830", 0.35);
  brush.line(255, 200, 345, 195);

  // Center boat lower yard
  brush.set("2H", "#4a4840", 0.3);
  brush.line(265, 240, 335, 238);

  // Left boat boom
  brush.set("2H", "#3a3830", 0.35);
  brush.line(90, 210, 165, 207);

  // Left boat lower yard
  brush.set("2H", "#4a4840", 0.3);
  brush.line(98, 248, 158, 246);

  // Right boat boom
  brush.set("2H", "#3a3830", 0.35);
  brush.line(430, 208, 505, 205);

  // Right boat lower yard
  brush.set("2H", "#4a4840", 0.3);
  brush.line(438, 246, 498, 244);

  // === GRAPHITE PENCIL LINES — RIGGING ROPES ===
  brush.set("2H", "#5a5850", 0.3);

  // Center boat rigging
  brush.spline([[300, 100], [280, 180], [262, 295]], 0.3);
  brush.spline([[300, 100], [320, 175], [345, 295]], 0.3);
  brush.spline([[285, 155], [270, 210], [258, 295]], 0.25);
  brush.spline([[285, 155], [300, 200], [335, 295]], 0.25);

  // Left boat rigging
  brush.spline([[128, 130], [108, 200], [90, 300]], 0.3);
  brush.spline([[128, 130], [145, 195], [165, 300]], 0.3);
  brush.spline([[115, 180], [105, 230], [92, 300]], 0.25);

  // Right boat rigging
  brush.spline([[468, 135], [448, 202], [432, 298]], 0.3);
  brush.spline([[468, 135], [485, 198], [506, 298]], 0.3);
  brush.spline([[455, 185], [445, 232], [433, 298]], 0.25);

  // Loose hanging rope suggestions
  brush.set("2H", "#6a6860", 0.25);
  brush.spline([[130, 302], [145, 310], [160, 302]], 0.5);
  brush.spline([[298, 325], [310, 333], [322, 325]], 0.5);
  brush.spline([[466, 300], [478, 308], [490, 300]], 0.5);

  // === GRAPHITE — DOCK LINES AND DETAILS ===
  brush.set("2B", "#3a3830", 0.6);
  // Waterline center boat
  brush.line(215, 363, 388, 362);
  // Waterline left boat
  brush.line(48, 367, 212, 365);
  // Waterline right boat
  brush.line(384, 361, 550, 359);

  // Dock edge lines
  brush.set("HB", "#5a5850", 0.4);
  brush.line(10, 358, 175, 357);
  brush.line(388, 354, 600, 352);

  // Dock post left
  brush.set("HB", "#4a4840", 0.45);
  brush.line(40, 315, 40, 370);
  brush.line(80, 312, 80, 368);
  brush.line(140, 314, 140, 368);

  // Dock post right
  brush.line(420, 310, 420, 360);
  brush.line(480, 308, 480, 358);
  brush.line(540, 310, 540, 358);

  // === FINAL MISTY VEIL ===
  brush.noStroke();
  brush.fill("#f0f4f0", 30);
  brush.fillBleed(0.9, "out");
  brush.beginShape(0.7);
  brush.vertex(0, 250);
  brush.vertex(600, 250);
  brush.vertex(600, 380);
  brush.vertex(0, 380);
  brush.endShape(true);

  // Light sky veil top
  brush.fill("#f8f4ee", 25);
  brush.fillBleed(0.8, "out");
  brush.beginShape(0.6);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 200);
  brush.vertex(0, 200);
  brush.endShape(true);

  noLoop();
}