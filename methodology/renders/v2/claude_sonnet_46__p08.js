function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#f7f2e8");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- SKY WASHES ---
  // Pale lavender-grey fog at top
  brush.fill("#c8cfe0", 130);
  brush.fillBleed(0.55, "out");
  brush.fillTexture(0.7, 0.4);
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);

  // Warm amber glow near horizon
  brush.fill("#e8d5a0", 160);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.8, 0.35);
  brush.beginShape(0.55);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 360);
  brush.vertex(0, 360);
  brush.endShape(true);

  // Soft pink-orange sunrise bloom
  brush.fill("#e8b87a", 90);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.75, 0.3);
  brush.beginShape(0.7);
  brush.vertex(180, 220);
  brush.vertex(420, 220);
  brush.vertex(480, 310);
  brush.vertex(120, 310);
  brush.endShape(true);

  // Second pass sunrise
  brush.fill("#f0c890", 70);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.7);
  brush.vertex(220, 240);
  brush.vertex(380, 240);
  brush.vertex(420, 300);
  brush.vertex(180, 300);
  brush.endShape(true);

  brush.noFill();

  // --- WATER / HARBOR SURFACE ---
  // Deep grey-blue water base
  brush.fill("#8a9bb5", 150);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.9, 0.5);
  brush.beginShape(0.4);
  brush.vertex(0, 340);
  brush.vertex(600, 340);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Water reflection of warm light
  brush.fill("#b8a87a", 80);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.85, 0.4);
  brush.beginShape(0.5);
  brush.vertex(150, 345);
  brush.vertex(450, 345);
  brush.vertex(480, 440);
  brush.vertex(120, 440);
  brush.endShape(true);

  // Deeper water shadow at bottom
  brush.fill("#5a6878", 120);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.9, 0.3);
  brush.beginShape(0.4);
  brush.vertex(0, 480);
  brush.vertex(600, 480);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  brush.noFill();

  // --- FOG LAYERS ---
  brush.fill("#dde4ee", 100);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.6, 0.2);
  brush.beginShape(0.8);
  brush.vertex(-20, 280);
  brush.vertex(620, 280);
  brush.vertex(620, 390);
  brush.vertex(-20, 390);
  brush.endShape(true);

  brush.fill("#e8ecf2", 80);
  brush.fillBleed(0.75, "out");
  brush.fillTexture(0.5, 0.15);
  brush.beginShape(0.8);
  brush.vertex(-20, 300);
  brush.vertex(620, 300);
  brush.vertex(620, 370);
  brush.vertex(-20, 370);
  brush.endShape(true);

  brush.noFill();

  // --- DISTANT SHORELINE / BUILDINGS (faint washes) ---
  brush.fill("#9aabba", 90);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.8, 0.4);
  brush.beginShape(0.4);
  brush.vertex(0, 295);
  brush.vertex(80, 295);
  brush.vertex(80, 340);
  brush.vertex(0, 340);
  brush.endShape(true);

  brush.fill("#8a9dae", 80);
  brush.fillBleed(0.35, "out");
  brush.fillTexture(0.75, 0.35);
  brush.beginShape(0.4);
  brush.vertex(60, 290);
  brush.vertex(150, 290);
  brush.vertex(150, 342);
  brush.vertex(60, 342);
  brush.endShape(true);

  brush.fill("#7a8fa0", 85);
  brush.fillBleed(0.38, "out");
  brush.fillTexture(0.8, 0.4);
  brush.beginShape(0.4);
  brush.vertex(420, 288);
  brush.vertex(520, 288);
  brush.vertex(520, 342);
  brush.vertex(420, 342);
  brush.endShape(true);

  brush.fill("#8a9dae", 70);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.7, 0.3);
  brush.beginShape(0.4);
  brush.vertex(490, 292);
  brush.vertex(600, 292);
  brush.vertex(600, 342);
  brush.vertex(490, 342);
  brush.endShape(true);

  brush.noFill();

  // --- BOAT HULLS (watercolor silhouettes) ---
  // Main boat left
  brush.fill("#5a5040", 160);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.9, 0.5);
  brush.beginShape(0.35);
  brush.vertex(80, 355);
  brush.vertex(220, 350);
  brush.vertex(230, 375);
  brush.vertex(70, 378);
  brush.endShape(true);

  // Cabin on main boat
  brush.fill("#4a4238", 150);
  brush.fillBleed(0.15, "out");
  brush.fillTexture(0.9, 0.4);
  brush.beginShape(0.3);
  brush.vertex(110, 340);
  brush.vertex(180, 340);
  brush.vertex(185, 357);
  brush.vertex(105, 357);
  brush.endShape(true);

  // Second boat right
  brush.fill("#504838", 145);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.9, 0.5);
  brush.beginShape(0.35);
  brush.vertex(350, 358);
  brush.vertex(500, 353);
  brush.vertex(510, 378);
  brush.vertex(340, 382);
  brush.endShape(true);

  // Cabin on second boat
  brush.fill("#403830", 140);
  brush.fillBleed(0.15, "out");
  brush.fillTexture(0.9, 0.4);
  brush.beginShape(0.3);
  brush.vertex(380, 344);
  brush.vertex(450, 344);
  brush.vertex(455, 360);
  brush.vertex(375, 360);
  brush.endShape(true);

  // Small distant boat center
  brush.fill("#6a6050", 110);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.85, 0.45);
  brush.beginShape(0.4);
  brush.vertex(255, 348);
  brush.vertex(330, 346);
  brush.vertex(335, 362);
  brush.vertex(250, 364);
  brush.endShape(true);

  brush.noFill();

  // --- WATER RIPPLES / REFLECTIONS (watercolor) ---
  brush.fill("#7a8fa8", 55);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.9, 0.2);
  // Several thin horizontal ripple bands
  for (let ry = 390; ry < 560; ry += 22) {
    let spread = map(ry, 390, 560, 60, 120);
    brush.beginShape(0.5);
    brush.vertex(300 - spread, ry);
    brush.vertex(300 + spread, ry);
    brush.vertex(300 + spread + 10, ry + 8);
    brush.vertex(300 - spread - 10, ry + 8);
    brush.endShape(true);
  }

  // Boat reflections in water
  brush.fill("#3a3028", 60);
  brush.fillBleed(0.45, "out");
  brush.fillTexture(0.85, 0.3);
  brush.beginShape(0.6);
  brush.vertex(100, 378);
  brush.vertex(210, 378);
  brush.vertex(220, 430);
  brush.vertex(90, 430);
  brush.endShape(true);

  brush.fill("#3a3028", 50);
  brush.fillBleed(0.45, "out");
  brush.fillTexture(0.85, 0.3);
  brush.beginShape(0.6);
  brush.vertex(360, 380);
  brush.vertex(490, 380);
  brush.vertex(500, 430);
  brush.vertex(350, 430);
  brush.endShape(true);

  brush.noFill();

  // --- GRAPHITE PENCIL LINES ---
  // Masts - main left boat
  brush.set("HB", "#2a2520", 0.5);
  brush.line(145, 340, 138, 210);
  brush.line(160, 340, 168, 230);

  // Mast right boat
  brush.line(415, 344, 408, 195);
  brush.line(430, 344, 440, 215);

  // Mast center small boat
  brush.set("2H", "#3a3530", 0.4);
  brush.line(290, 346, 285, 260);

  // Boom lines / crossbars
  brush.set("HB", "#2a2520", 0.4);
  brush.line(138, 245, 168, 240);
  brush.line(138, 268, 155, 265);
  brush.line(408, 228, 440, 222);
  brush.line(408, 255, 432, 250);

  // Rigging ropes - left boat
  brush.set("2H", "#3a3530", 0.35);
  brush.line(145, 340, 90, 295);
  brush.line(145, 340, 200, 300);
  brush.line(138, 245, 90, 295);
  brush.line(168, 240, 200, 300);
  brush.line(138, 210, 80, 355);
  brush.line(138, 210, 215, 352);

  // Rigging ropes - right boat
  brush.line(415, 344, 355, 300);
  brush.line(415, 344, 490, 305);
  brush.line(408, 228, 355, 300);
  brush.line(440, 222, 490, 305);
  brush.line(408, 195, 350, 360);
  brush.line(408, 195, 500, 355);

  // Rigging center boat
  brush.line(285, 260, 255, 350);
  brush.line(285, 260, 330, 348);

  // Horizontal yard arm ropes
  brush.set("2H", "#3a3530", 0.3);
  brush.line(138, 268, 90, 280);
  brush.line(155, 265, 200, 278);
  brush.line(408, 255, 355, 268);
  brush.line(432, 250, 490, 262);

  // Additional diagonal ropes
  brush.set("2H", "#4a4540", 0.28);
  brush.line(160, 230, 210, 355);
  brush.line(145, 215, 105, 340);
  brush.line(430, 215, 500, 360);
  brush.line(415, 200, 378, 344);

  // Distant shoreline pencil details
  brush.set("2H", "#5a5550", 0.35);
  brush.line(0, 295, 80, 295);
  brush.line(80, 295, 80, 340);
  brush.line(30, 295, 30, 310);
  brush.line(55, 295, 55, 305);
  brush.line(420, 288, 520, 288);
  brush.line(460, 288, 460, 342);
  brush.line(500, 288, 500, 310);

  // Faint far masts on horizon
  brush.set("2H", "#7a7570", 0.28);
  brush.line(40, 295, 36, 230);
  brush.line(540, 292, 537, 235);
  brush.line(570, 292, 574, 248);

  // Dock / pier lines
  brush.set("HB", "#3a3530", 0.4);
  brush.line(0, 370, 80, 360);
  brush.line(520, 362, 600, 370);

  // Dock posts
  brush.set("2B", "#2a2520", 0.45);
  brush.line(20, 360, 20, 400);
  brush.line(45, 358, 45, 398);
  brush.line(540, 362, 540, 402);
  brush.line(565, 364, 565, 404);

  // Water surface horizon line
  brush.set("2H", "#8a8580", 0.3);
  brush.line(0, 342, 600, 342);

  // Faint fog wisps as very light pencil
  brush.set("2H", "#c0bdb8", 0.25);
  brush.spline([[0, 315], [120, 318], [240, 312], [360, 316], [480, 313], [600, 317]], 0.5);
  brush.spline([[0, 330], [100, 328], [220, 333], [340, 329], [460, 332], [600, 328]], 0.5);

  noLoop();
}