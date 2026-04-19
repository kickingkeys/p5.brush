function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#f5f0e8");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- SKY WASHES ---
  brush.noStroke();
  brush.fillTexture(0.7, 0.4);

  // Pale dawn sky — top portion
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
  brush.fillBleed(0.45, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 340);
  brush.vertex(0, 340);
  brush.endShape(true);

  // Soft peach near waterline
  brush.fill("#e0b890", 55);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 260);
  brush.vertex(600, 260);
  brush.vertex(600, 360);
  brush.vertex(0, 360);
  brush.endShape(true);

  // --- WATER WASHES ---
  brush.fillTexture(0.6, 0.35);

  // Base water — cool blue-grey
  brush.fill("#9ab0c0", 110);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 330);
  brush.vertex(600, 330);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Lighter water reflection near horizon
  brush.fill("#c0d4e0", 85);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 330);
  brush.vertex(600, 330);
  brush.vertex(600, 420);
  brush.vertex(0, 420);
  brush.endShape(true);

  // Warm reflection stripe
  brush.fill("#d4b898", 50);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.4);
  brush.vertex(180, 340);
  brush.vertex(420, 340);
  brush.vertex(440, 390);
  brush.vertex(160, 390);
  brush.endShape(true);

  // Deeper water foreground
  brush.fill("#7a9aaa", 100);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 460);
  brush.vertex(600, 460);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // --- FOG LAYER over water/horizon ---
  brush.fillTexture(0.55, 0.2);
  brush.fill("#e8eef2", 70);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.5);
  brush.vertex(-20, 290);
  brush.vertex(620, 290);
  brush.vertex(620, 380);
  brush.vertex(-20, 380);
  brush.endShape(true);

  brush.fill("#f0f4f5", 55);
  brush.fillBleed(0.65, "out");
  brush.beginShape(0.5);
  brush.vertex(-20, 310);
  brush.vertex(620, 310);
  brush.vertex(620, 355);
  brush.vertex(-20, 355);
  brush.endShape(true);

  // --- DISTANT SHORE / DOCK SILHOUETTE ---
  brush.fillTexture(0.5, 0.25);
  brush.fill("#8898a0", 90);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 320);
  brush.vertex(120, 318);
  brush.vertex(160, 322);
  brush.vertex(200, 316);
  brush.vertex(260, 320);
  brush.vertex(280, 324);
  brush.vertex(350, 318);
  brush.vertex(600, 322);
  brush.vertex(600, 345);
  brush.vertex(0, 345);
  brush.endShape(true);

  // Dock structure left
  brush.fill("#6a7880", 110);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.3);
  brush.vertex(60, 322);
  brush.vertex(130, 320);
  brush.vertex(130, 338);
  brush.vertex(60, 340);
  brush.endShape(true);

  // Dock structure right
  brush.fill("#7a8890", 100);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.3);
  brush.vertex(380, 318);
  brush.vertex(500, 316);
  brush.vertex(500, 336);
  brush.vertex(380, 338);
  brush.endShape(true);

  // --- BOAT HULLS (watercolor) ---
  brush.fillTexture(0.65, 0.3);

  // Boat 1 — left, larger
  brush.fill("#5a6870", 130);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(80, 355);
  brush.vertex(200, 350);
  brush.vertex(210, 365);
  brush.vertex(180, 375);
  brush.vertex(90, 378);
  brush.vertex(65, 368);
  brush.endShape(true);

  // Boat 1 cabin
  brush.fill("#7a8890", 110);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.3);
  brush.vertex(110, 345);
  brush.vertex(165, 342);
  brush.vertex(168, 358);
  brush.vertex(108, 360);
  brush.endShape(true);

  // Boat 2 — center-right
  brush.fill("#4e6068", 120);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(310, 352);
  brush.vertex(420, 348);
  brush.vertex(428, 362);
  brush.vertex(400, 372);
  brush.vertex(315, 374);
  brush.vertex(298, 363);
  brush.endShape(true);

  // Boat 2 cabin
  brush.fill("#6a7e88", 105);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.3);
  brush.vertex(335, 342);
  brush.vertex(390, 340);
  brush.vertex(392, 354);
  brush.vertex(333, 356);
  brush.endShape(true);

  // Boat 3 — far right, smaller/distant
  brush.fill("#7a8c94", 100);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(490, 336);
  brush.vertex(570, 333);
  brush.vertex(575, 344);
  brush.vertex(555, 350);
  brush.vertex(492, 352);
  brush.vertex(480, 344);
  brush.endShape(true);

  // --- WATER RIPPLE WASHES ---
  brush.fillTexture(0.4, 0.15);

  for (let i = 0; i < 6; i++) {
    let ry = 400 + i * 28;
    let rx = random(20, 80);
    let rw = random(120, 260);
    brush.fill("#8aacbc", random(25, 50));
    brush.fillBleed(0.35, "out");
    brush.beginShape(0.5);
    brush.vertex(rx, ry - 4);
    brush.vertex(rx + rw, ry - 3);
    brush.vertex(rx + rw + random(10, 30), ry + 6);
    brush.vertex(rx - random(5, 20), ry + 7);
    brush.endShape(true);
  }

  brush.noFill();

  // --- GRAPHITE PENCIL LINES: MASTS ---
  // Mast 1 — boat 1
  brush.set("HB", "#3a3a3a", 0.5);
  brush.line(138, 342, 130, 210);
  brush.set("2H", "#555555", 0.4);
  brush.line(130, 210, 125, 180);

  // Mast 1 crossbar
  brush.set("HB", "#3a3a3a", 0.4);
  brush.line(110, 228, 155, 224);
  brush.line(115, 245, 148, 242);

  // Mast 2 — boat 1, rear
  brush.set("2H", "#4a4a4a", 0.4);
  brush.line(175, 348, 170, 248);
  brush.line(160, 265, 185, 262);

  // Mast 3 — boat 2
  brush.set("HB", "#383838", 0.5);
  brush.line(358, 340, 350, 215);
  brush.set("2H", "#505050", 0.35);
  brush.line(350, 215, 346, 188);

  // Mast 3 crossbar
  brush.set("HB", "#404040", 0.4);
  brush.line(332, 232, 372, 228);
  brush.line(336, 250, 368, 247);

  // Mast 4 — boat 2, rear
  brush.set("2H", "#4a4a4a", 0.38);
  brush.line(400, 344, 396, 258);
  brush.line(386, 272, 408, 270);

  // Mast 5 — boat 3, distant/faint
  brush.set("2H", "#666666", 0.3);
  brush.line(528, 333, 524, 270);
  brush.line(516, 282, 535, 280);

  // --- GRAPHITE PENCIL LINES: ROPES & RIGGING ---
  brush.set("2H", "#555555", 0.3);

  // Rigging from mast 1 to bow
  brush.line(130, 210, 82, 358);
  brush.line(130, 210, 198, 353);

  // Rigging mast 1 to stern
  brush.line(125, 180, 68, 368);

  // Rigging from mast 2
  brush.line(170, 248, 148, 350);
  brush.line(170, 248, 208, 348);

  // Rigging from mast 3
  brush.set("2H", "#4e4e4e", 0.28);
  brush.line(350, 215, 312, 356);
  brush.line(350, 215, 418, 352);
  brush.line(346, 188, 308, 358);

  // Rigging from mast 4
  brush.line(396, 258, 375, 348);
  brush.line(396, 258, 424, 346);

  // Rigging boat 3
  brush.set("2H", "#686868", 0.25);
  brush.line(524, 270, 492, 345);
  brush.line(524, 270, 568, 342);

  // Dock ropes — loose hanging lines
  brush.set("2H", "#606060", 0.28);
  brush.spline([[90, 378], [88, 390], [85, 402], [82, 408]], 0.4);
  brush.spline([[185, 375], [184, 388], [182, 400]], 0.4);
  brush.spline([[320, 374], [318, 386], [316, 398]], 0.4);
  brush.spline([[408, 370], [406, 382], [404, 394]], 0.4);

  // Horizontal dock rope suggestion
  brush.set("2H", "#5a5a5a", 0.25);
  brush.line(65, 340, 200, 336);
  brush.line(300, 335, 500, 332);

  // --- FAINT GRAPHITE REFLECTIONS IN WATER ---
  brush.set("2H", "#7a8a90", 0.25);
  // Mast reflections — broken, wobbly
  brush.spline([[135, 378], [133, 395], [136, 412], [132, 428]], 0.3);
  brush.spline([[172, 376], [170, 392], [173, 408]], 0.3);
  brush.spline([[355, 376], [353, 393], [356, 410], [352, 426]], 0.3);
  brush.spline([[398, 374], [396, 390], [399, 406]], 0.3);
  brush.spline([[526, 352], [524, 366], [527, 380]], 0.3);

  // --- ADDITIONAL FOG OVERLAY ---
  brush.noStroke();
  brush.fillTexture(0.4, 0.1);
  brush.fill("#f0f2f4", 40);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.6);
  brush.vertex(-20, 305);
  brush.vertex(620, 305);
  brush.vertex(620, 345);
  brush.vertex(-20, 345);
  brush.endShape(true);

  // Soft fog wisps
  brush.fill("#edf0f2", 30);
  brush.fillBleed(0.75, "out");
  brush.beginShape(0.6);
  brush.vertex(100, 315);
  brush.vertex(350, 310);
  brush.vertex(400, 325);
  brush.vertex(120, 330);
  brush.endShape(true);

  brush.fill("#eceff1", 28);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.6);
  brush.vertex(250, 318);
  brush.vertex(580, 312);
  brush.vertex(590, 335);
  brush.vertex(240, 340);
  brush.endShape(true);

  noLoop();
}