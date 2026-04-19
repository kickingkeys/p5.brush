function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5f0e8");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(42);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky washes ---
  brush.noStroke();
  brush.fillTexture(0.7, 0.4);

  // Pale dawn sky — upper half
  brush.fill("#c9d8e8", 130);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 300);
  brush.vertex(0, 300);
  brush.endShape(true);

  // Warm horizon glow
  brush.fill("#e8c89a", 110);
  brush.fillBleed(0.45, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 340);
  brush.vertex(0, 340);
  brush.endShape(true);

  // Misty pink tinge near horizon
  brush.fill("#d4a8b0", 60);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.5);
  brush.vertex(80, 220);
  brush.vertex(520, 220);
  brush.vertex(500, 310);
  brush.vertex(100, 310);
  brush.endShape(true);

  // --- Water washes ---
  brush.fillTexture(0.6, 0.3);

  // Main water body
  brush.fill("#8aafc4", 140);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 310);
  brush.vertex(600, 310);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Darker deep water
  brush.fill("#5a7f9a", 100);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 370);
  brush.vertex(600, 370);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Reflective shimmer on water surface
  brush.fill("#c8dde8", 70);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(100, 310);
  brush.vertex(500, 310);
  brush.vertex(480, 360);
  brush.vertex(120, 360);
  brush.endShape(true);

  // Fog layer over water
  brush.fill("#dce8ef", 90);
  brush.fillBleed(0.55, "out");
  brush.beginShape(0.6);
  brush.vertex(0, 295);
  brush.vertex(600, 295);
  brush.vertex(600, 380);
  brush.vertex(0, 380);
  brush.endShape(true);

  // --- Distant shore / fog bank ---
  brush.fill("#b8c8d4", 80);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.6);
  brush.vertex(0, 270);
  brush.vertex(600, 270);
  brush.vertex(580, 320);
  brush.vertex(20, 320);
  brush.endShape(true);

  // Faint distant landmass left
  brush.fill("#9aafbe", 70);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 255);
  brush.vertex(180, 255);
  brush.vertex(160, 300);
  brush.vertex(0, 300);
  brush.endShape(true);

  // Faint distant landmass right
  brush.fill("#9aafbe", 65);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(400, 260);
  brush.vertex(600, 260);
  brush.vertex(600, 305);
  brush.vertex(380, 305);
  brush.endShape(true);

  // --- Boat hulls (watercolor) ---
  brush.fillTexture(0.8, 0.5);

  // Boat 1 — left, larger
  brush.fill("#6b5040", 160);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(80, 330);
  brush.vertex(200, 330);
  brush.vertex(210, 355);
  brush.vertex(70, 355);
  brush.endShape(true);

  // Boat 1 cabin
  brush.fill("#8a6a55", 140);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.3);
  brush.vertex(110, 318);
  brush.vertex(170, 318);
  brush.vertex(175, 332);
  brush.vertex(105, 332);
  brush.endShape(true);

  // Boat 2 — center
  brush.fill("#5a4535", 150);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(260, 325);
  brush.vertex(370, 325);
  brush.vertex(378, 348);
  brush.vertex(252, 348);
  brush.endShape(true);

  // Boat 2 cabin
  brush.fill("#7a5f4a", 130);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.3);
  brush.vertex(285, 313);
  brush.vertex(345, 313);
  brush.vertex(350, 326);
  brush.vertex(280, 326);
  brush.endShape(true);

  // Boat 3 — right, smaller, more distant
  brush.fill("#7a6555", 120);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.3);
  brush.vertex(440, 318);
  brush.vertex(530, 318);
  brush.vertex(536, 336);
  brush.vertex(434, 336);
  brush.endShape(true);

  // --- Dock / pier ---
  brush.fill("#8a7060", 130);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 340);
  brush.vertex(90, 340);
  brush.vertex(90, 360);
  brush.vertex(0, 360);
  brush.endShape(true);

  brush.fill("#7a6050", 110);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 355);
  brush.vertex(95, 355);
  brush.vertex(95, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Dock planks wash
  brush.fill("#9a8070", 60);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 350);
  brush.vertex(90, 350);
  brush.vertex(90, 420);
  brush.vertex(0, 420);
  brush.endShape(true);

  // --- Water reflections of boats ---
  brush.fillTexture(0.5, 0.2);

  brush.fill("#6b5040", 50);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.7);
  brush.vertex(75, 355);
  brush.vertex(215, 355);
  brush.vertex(210, 400);
  brush.vertex(80, 400);
  brush.endShape(true);

  brush.fill("#5a4535", 45);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.7);
  brush.vertex(255, 348);
  brush.vertex(382, 348);
  brush.vertex(375, 390);
  brush.vertex(260, 390);
  brush.endShape(true);

  brush.fill("#7a6555", 40);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.7);
  brush.vertex(436, 336);
  brush.vertex(538, 336);
  brush.vertex(532, 370);
  brush.vertex(440, 370);
  brush.endShape(true);

  brush.noFill();

  // --- Pencil masts and rigging ---
  brush.wiggle(1.5);

  // Boat 1 masts
  brush.set("HB", "#2a2520", 0.5);
  brush.line(140, 318, 138, 210);
  brush.line(160, 318, 158, 230);

  // Boat 1 boom / crosspiece
  brush.set("2H", "#3a3530", 0.4);
  brush.line(125, 250, 170, 245);
  brush.line(130, 265, 165, 260);

  // Boat 1 ropes/rigging
  brush.set("2H", "#4a4540", 0.35);
  brush.line(138, 210, 185, 320);
  brush.line(138, 210, 95, 325);
  brush.line(158, 230, 200, 322);
  brush.line(158, 230, 120, 322);
  brush.line(138, 210, 158, 230);

  // Boat 2 masts
  brush.set("HB", "#2a2520", 0.5);
  brush.line(300, 313, 298, 195);
  brush.line(325, 313, 323, 215);

  // Boat 2 boom
  brush.set("2H", "#3a3530", 0.4);
  brush.line(285, 240, 335, 235);
  brush.line(290, 260, 330, 255);

  // Boat 2 rigging
  brush.set("2H", "#4a4540", 0.35);
  brush.line(298, 195, 360, 318);
  brush.line(298, 195, 265, 318);
  brush.line(323, 215, 370, 318);
  brush.line(323, 215, 290, 318);
  brush.line(298, 195, 323, 215);

  // Boat 3 masts (more distant, fainter)
  brush.set("2H", "#5a5550", 0.4);
  brush.line(475, 318, 473, 225);
  brush.line(495, 318, 493, 235);

  // Boat 3 rigging
  brush.set("2H", "#6a6560", 0.3);
  brush.line(473, 225, 525, 312);
  brush.line(473, 225, 448, 312);
  brush.line(493, 235, 528, 315);
  brush.line(493, 235, 465, 315);
  brush.line(473, 225, 493, 235);

  // Boat 3 boom
  brush.set("2H", "#5a5550", 0.3);
  brush.line(465, 258, 500, 254);

  // --- Dock posts ---
  brush.set("HB", "#3a3020", 0.6);
  brush.line(30, 340, 30, 420);
  brush.line(55, 340, 55, 430);
  brush.line(78, 340, 78, 415);

  // Dock horizontal planks
  brush.set("2H", "#5a5040", 0.35);
  brush.line(0, 345, 90, 345);
  brush.line(0, 352, 90, 352);
  brush.line(0, 358, 90, 358);
  brush.line(0, 365, 90, 365);
  brush.line(0, 372, 90, 372);
  brush.line(0, 380, 90, 380);

  // --- Rope on dock ---
  brush.set("2H", "#4a4035", 0.35);
  brush.spline([[88, 340], [92, 345], [88, 350], [92, 355], [88, 360]], 0.5);
  brush.spline([[55, 340], [58, 344], [55, 348], [58, 352], [55, 356]], 0.5);

  // --- Horizon line faint pencil ---
  brush.set("2H", "#8a8880", 0.3);
  brush.line(0, 300, 600, 300);

  // --- Water ripples in pencil ---
  brush.set("2H", "#6a8090", 0.3);
  for (let y = 365; y < 500; y += 18) {
    let xStart = random(20, 80);
    let xEnd = xStart + random(60, 140);
    brush.line(xStart, y + random(-2, 2), xEnd, y + random(-2, 2));
  }
  for (let y = 360; y < 480; y += 15) {
    let xStart = random(150, 280);
    let xEnd = xStart + random(50, 120);
    brush.line(xStart, y + random(-2, 2), xEnd, y + random(-2, 2));
  }
  for (let y = 355; y < 460; y += 14) {
    let xStart = random(380, 480);
    let xEnd = xStart + random(40, 100);
    brush.line(xStart, y + random(-2, 2), xEnd, y + random(-2, 2));
  }

  // --- Fog overlay washes to unify ---
  brush.noStroke();
  brush.fillTexture(0.3, 0.1);

  brush.fill("#dce8f0", 55);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.8);
  brush.vertex(0, 280);
  brush.vertex(600, 280);
  brush.vertex(600, 360);
  brush.vertex(0, 360);
  brush.endShape(true);

  // Upper sky fog
  brush.fill("#eef3f7", 45);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.8);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 180);
  brush.vertex(0, 180);
  brush.endShape(true);

  noLoop();
}