function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Ground shadow base ---
  brush.hatchStyle("2B", "#111", 1.4);
  brush.hatch(2, 80, { rand: 0.12, continuous: true });
  brush.noStroke();
  brush.beginShape(0.1);
  brush.vertex(0, 480);
  brush.vertex(600, 480);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Deep shadow pools on ground ---
  brush.hatchStyle("2B", "#000", 1.6);
  brush.hatch(1.5, 10, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(0, 520);
  brush.vertex(180, 520);
  brush.vertex(180, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.6);
  brush.hatch(1.5, 10, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(260, 540);
  brush.vertex(420, 540);
  brush.vertex(420, 600);
  brush.vertex(260, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.6);
  brush.hatch(1.5, 10, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(470, 510);
  brush.vertex(600, 510);
  brush.vertex(600, 600);
  brush.vertex(470, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Mid-ground cross-hatch texture ---
  brush.hatchStyle("HB", "#333", 0.9);
  brush.hatch(5, 55, { rand: 0.07, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(0, 380);
  brush.vertex(600, 380);
  brush.vertex(600, 490);
  brush.vertex(0, 490);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#222", 1.0);
  brush.hatch(3.5, 125, { rand: 0.09, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(0, 400);
  brush.vertex(600, 400);
  brush.vertex(600, 490);
  brush.vertex(0, 490);
  brush.endShape(true);
  brush.noHatch();

  // --- Background foliage mass (upper canopy) ---
  brush.hatchStyle("2H", "#555", 0.5);
  brush.hatch(9, 15, { rand: 0.1, continuous: false });
  brush.beginShape(0.2);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 260);
  brush.vertex(0, 260);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#333", 0.7);
  brush.hatch(6, 165, { rand: 0.08, continuous: false });
  brush.beginShape(0.2);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 220);
  brush.vertex(0, 220);
  brush.endShape(true);
  brush.noHatch();

  // --- Dense canopy shadow zones ---
  brush.hatchStyle("2B", "#111", 1.1);
  brush.hatch(3, 40, { rand: 0.11, continuous: true });
  brush.beginShape(0.15);
  brush.vertex(0, 60);
  brush.vertex(220, 60);
  brush.vertex(220, 200);
  brush.vertex(0, 200);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#111", 1.1);
  brush.hatch(3, 140, { rand: 0.11, continuous: true });
  brush.beginShape(0.15);
  brush.vertex(0, 60);
  brush.vertex(220, 60);
  brush.vertex(220, 200);
  brush.vertex(0, 200);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#111", 1.1);
  brush.hatch(3, 40, { rand: 0.11, continuous: true });
  brush.beginShape(0.15);
  brush.vertex(350, 30);
  brush.vertex(600, 30);
  brush.vertex(600, 190);
  brush.vertex(350, 190);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#111", 1.1);
  brush.hatch(3, 140, { rand: 0.11, continuous: true });
  brush.beginShape(0.15);
  brush.vertex(350, 30);
  brush.vertex(600, 30);
  brush.vertex(600, 190);
  brush.vertex(350, 190);
  brush.endShape(true);
  brush.noHatch();

  // --- Mid canopy layer ---
  brush.hatchStyle("HB", "#222", 0.8);
  brush.hatch(4.5, 70, { rand: 0.09, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(80, 180);
  brush.vertex(340, 180);
  brush.vertex(340, 310);
  brush.vertex(80, 310);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#222", 0.8);
  brush.hatch(4.5, 155, { rand: 0.09, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(80, 180);
  brush.vertex(340, 180);
  brush.vertex(340, 310);
  brush.vertex(80, 310);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#222", 0.8);
  brush.hatch(4.5, 70, { rand: 0.09, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(300, 150);
  brush.vertex(600, 150);
  brush.vertex(600, 300);
  brush.vertex(300, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#222", 0.8);
  brush.hatch(4.5, 155, { rand: 0.09, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(300, 150);
  brush.vertex(600, 150);
  brush.vertex(600, 300);
  brush.vertex(300, 300);
  brush.endShape(true);
  brush.noHatch();

  // ============================================================
  // TREE TRUNKS
  // ============================================================

  // Helper: draw a trunk as a narrow hatched rectangle
  // Each trunk: vertical hatch (dense) + cross hatch for shadow side

  // Trunk 1 — far left, tall
  brush.hatchStyle("2B", "#000", 1.5);
  brush.hatch(1.8, 90, { rand: 0.04, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(38, 80);
  brush.vertex(58, 80);
  brush.vertex(58, 600);
  brush.vertex(38, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.2);
  brush.hatch(2.5, 10, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(38, 80);
  brush.vertex(48, 80);
  brush.vertex(48, 600);
  brush.vertex(38, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 1 shadow cast right
  brush.hatchStyle("HB", "#333", 0.8);
  brush.hatch(4, 80, { rand: 0.07, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(58, 400);
  brush.vertex(90, 400);
  brush.vertex(90, 600);
  brush.vertex(58, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 2
  brush.hatchStyle("2B", "#000", 1.5);
  brush.hatch(1.8, 90, { rand: 0.04, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(115, 50);
  brush.vertex(138, 50);
  brush.vertex(138, 600);
  brush.vertex(115, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.2);
  brush.hatch(2.5, 10, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(115, 50);
  brush.vertex(126, 50);
  brush.vertex(126, 600);
  brush.vertex(115, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 2 shadow
  brush.hatchStyle("HB", "#333", 0.8);
  brush.hatch(4, 80, { rand: 0.07, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(138, 380);
  brush.vertex(168, 380);
  brush.vertex(168, 600);
  brush.vertex(138, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 3 — center-left
  brush.hatchStyle("2B", "#000", 1.5);
  brush.hatch(1.8, 90, { rand: 0.04, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(210, 100);
  brush.vertex(230, 100);
  brush.vertex(230, 600);
  brush.vertex(210, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.2);
  brush.hatch(2.5, 10, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(210, 100);
  brush.vertex(220, 100);
  brush.vertex(220, 600);
  brush.vertex(210, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 3 shadow
  brush.hatchStyle("HB", "#333", 0.8);
  brush.hatch(4, 80, { rand: 0.07, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(230, 350);
  brush.vertex(258, 350);
  brush.vertex(258, 600);
  brush.vertex(230, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 4 — center, thicker
  brush.hatchStyle("2B", "#000", 1.6);
  brush.hatch(1.5, 90, { rand: 0.03, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(305, 30);
  brush.vertex(335, 30);
  brush.vertex(335, 600);
  brush.vertex(305, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.3);
  brush.hatch(2, 10, { rand: 0.04, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(305, 30);
  brush.vertex(320, 30);
  brush.vertex(320, 600);
  brush.vertex(305, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 4 shadow
  brush.hatchStyle("HB", "#222", 1.0);
  brush.hatch(3, 80, { rand: 0.06, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(335, 300);
  brush.vertex(375, 300);
  brush.vertex(375, 600);
  brush.vertex(335, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 5
  brush.hatchStyle("2B", "#000", 1.5);
  brush.hatch(1.8, 90, { rand: 0.04, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(408, 70);
  brush.vertex(428, 70);
  brush.vertex(428, 600);
  brush.vertex(408, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.2);
  brush.hatch(2.5, 10, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(408, 70);
  brush.vertex(418, 70);
  brush.vertex(418, 600);
  brush.vertex(408, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 5 shadow
  brush.hatchStyle("HB", "#333", 0.8);
  brush.hatch(4, 80, { rand: 0.07, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(428, 360);
  brush.vertex(460, 360);
  brush.vertex(460, 600);
  brush.vertex(428, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 6 — right
  brush.hatchStyle("2B", "#000", 1.5);
  brush.hatch(1.8, 90, { rand: 0.04, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(510, 55);
  brush.vertex(530, 55);
  brush.vertex(530, 600);
  brush.vertex(510, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.2);
  brush.hatch(2.5, 10, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(510, 55);
  brush.vertex(520, 55);
  brush.vertex(520, 600);
  brush.vertex(510, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 6 shadow
  brush.hatchStyle("HB", "#333", 0.8);
  brush.hatch(4, 80, { rand: 0.07, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(530, 390);
  brush.vertex(562, 390);
  brush.vertex(562, 600);
  brush.vertex(530, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk 7 — far right
  brush.hatchStyle("2B", "#000", 1.4);
  brush.hatch(2, 90, { rand: 0.04, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(572, 90);
  brush.vertex(590, 90);
  brush.vertex(590, 600);
  brush.vertex(572, 600);
  brush.endShape(true);
  brush.noHatch();

  // ============================================================
  // UNDERGROWTH — thin vertical strokes, dense hatching
  // ============================================================

  // Undergrowth zone left
  brush.hatchStyle("rotring", "#000", 0.4);
  brush.hatch(2.5, 88, { rand: 0.15, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(0, 430);
  brush.vertex(200, 430);
  brush.vertex(200, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#111", 0.35);
  brush.hatch(3, 92, { rand: 0.2, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(0, 450);
  brush.vertex(150, 450);
  brush.vertex(150, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Undergrowth zone center
  brush.hatchStyle("rotring", "#000", 0.4);
  brush.hatch(2.5, 88, { rand: 0.15, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(230, 420);
  brush.vertex(480, 420);
  brush.vertex(480, 600);
  brush.vertex(230, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#111", 0.35);
  brush.hatch(3, 92, { rand: 0.2, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(260, 450);
  brush.vertex(430, 450);
  brush.vertex(430, 600);
  brush.vertex(260, 600);
  brush.endShape(true);
  brush.noHatch();

  // Undergrowth zone right
  brush.hatchStyle("rotring", "#000", 0.4);
  brush.hatch(2.5, 88, { rand: 0.15, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(460, 440);
  brush.vertex(600, 440);
  brush.vertex(600, 600);
  brush.vertex(460, 600);
  brush.endShape(true);
  brush.noHatch();

  // ============================================================
  // BARK TEXTURE on trunks — short horizontal hatches
  // ============================================================

  // Bark on trunk 1
  brush.hatchStyle("pen", "#000", 0.5);
  brush.hatch(6, 0, { rand: 0.25, continuous: false });
  brush.beginShape(0.05);
  brush.vertex(36, 200);
  brush.vertex(60, 200);
  brush.vertex(60, 500);
  brush.vertex(36, 500);
  brush.endShape(true);
  brush.noHatch();

  // Bark on trunk 2
  brush.hatchStyle("pen", "#000", 0.5);
  brush.hatch(6, 0, { rand: 0.25, continuous: false });
  brush.beginShape(0.05);
  brush.vertex(113, 180);
  brush.vertex(140, 180);
  brush.vertex(140, 500);
  brush.vertex(113, 500);
  brush.endShape(true);
  brush.noHatch();

  // Bark on trunk 3
  brush.hatchStyle("pen", "#000", 0.5);
  brush.hatch(6, 0, { rand: 0.25, continuous: false });
  brush.beginShape(0.05);
  brush.vertex(208, 220);
  brush.vertex(232, 220);
  brush.vertex(232, 500);
  brush.vertex(208, 500);
  brush.endShape(true);
  brush.noHatch();

  // Bark on trunk 4
  brush.hatchStyle("pen", "#000", 0.5);
  brush.hatch(5, 0, { rand: 0.25, continuous: false });
  brush.beginShape(0.05);
  brush.vertex(303, 180);
  brush.vertex(337, 180);
  brush.vertex(337, 500);
  brush.vertex(303, 500);
  brush.endShape(true);
  brush.noHatch();

  // Bark on trunk 5
  brush.hatchStyle("pen", "#000", 0.5);
  brush.hatch(6, 0, { rand: 0.25, continuous: false });
  brush.beginShape(0.05);
  brush.vertex(406, 200);
  brush.vertex(430, 200);
  brush.vertex(430, 500);
  brush.vertex(406, 500);
  brush.endShape(true);
  brush.noHatch();

  // Bark on trunk 6
  brush.hatchStyle("pen", "#000", 0.5);
  brush.hatch(6, 0, { rand: 0.25, continuous: false });
  brush.beginShape(0.05);
  brush.vertex(508, 190);
  brush.vertex(532, 190);
  brush.vertex(532, 500);
  brush.vertex(508, 500);
  brush.endShape(true);
  brush.noHatch();

  // ============================================================
  // BRANCHES — pen strokes radiating from trunks
  // ============================================================

  brush.set("pen", "#000", 0.9);
  // Trunk 1 branches
  brush.spline([[48, 180], [20, 130], [5, 90]], 0.4);
  brush.spline([[48, 240], [80, 190], [110, 160]], 0.4);
  brush.spline([[48, 300], [18, 260], [0, 230]], 0.4);

  // Trunk 2 branches
  brush.spline([[126, 160], [95, 110], [70, 75]], 0.4);
  brush.spline([[126, 200], [160, 155], [195, 130]], 0.4);
  brush.spline([[126, 270], [100, 230], [75, 210]], 0.4);
  brush.spline([[126, 320], [155, 280], [185, 255]], 0.4);

  // Trunk 3 branches
  brush.spline([[220, 200], [190, 155], [170, 120]], 0.4);
  brush.spline([[220, 250], [255, 205], [285, 180]], 0.4);
  brush.spline([[220, 330], [195, 290], [175, 265]], 0.4);

  // Trunk 4 branches
  brush.spline([[320, 130], [285, 85], [260, 50]], 0.4);
  brush.spline([[320, 170], [360, 120], [395, 90]], 0.4);
  brush.spline([[320, 240], [290, 195], [265, 165]], 0.4);
  brush.spline([[320, 300], [355, 255], [390, 225]], 0.4);

  // Trunk 5 branches
  brush.spline([[418, 170], [385, 125], [360, 95]], 0.4);
  brush.spline([[418, 220], [455, 175], [490, 148]], 0.4);
  brush.spline([[418, 300], [390, 255], [368, 225]], 0.4);

  // Trunk 6 branches
  brush.spline([[520, 160], [490, 110], [465, 80]], 0.4);
  brush.spline([[520, 210], [555, 165], [585, 140]], 0.4);
  brush.spline([[520, 280], [495, 240], [475, 210]], 0.4);

  // ============================================================
  // FINE DETAIL — pen hatching on shadow pockets between trunks
  // ============================================================

  // Between trunk 1 and 2
  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 80, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(58, 300);
  brush.vertex(115, 300);
  brush.vertex(115, 500);
  brush.vertex(58, 500);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 170, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(58, 300);
  brush.vertex(115, 300);
  brush.vertex(115, 500);
  brush.vertex(58, 500);
  brush.endShape(true);
  brush.noHatch();

  // Between trunk 2 and 3
  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 80, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(138, 280);
  brush.vertex(210, 280);
  brush.vertex(210, 480);
  brush.vertex(138, 480);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 170, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(138, 280);
  brush.vertex(210, 280);
  brush.vertex(210, 480);
  brush.vertex(138, 480);
  brush.endShape(true);
  brush.noHatch();

  // Between trunk 3 and 4
  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 80, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(230, 260);
  brush.vertex(305, 260);
  brush.vertex(305, 460);
  brush.vertex(230, 460);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 170, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(230, 260);
  brush.vertex(305, 260);
  brush.vertex(305, 460);
  brush.vertex(230, 460);
  brush.endShape(true);
  brush.noHatch();

  // Between trunk 4 and 5
  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 80, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(335, 260);
  brush.vertex(408, 260);
  brush.vertex(408, 460);
  brush.vertex(335, 460);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 170, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(335, 260);
  brush.vertex(408, 260);
  brush.vertex(408, 460);
  brush.vertex(335, 460);
  brush.endShape(true);
  brush.noHatch();

  // Between trunk 5 and 6
  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 80, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(428, 270);
  brush.vertex(510, 270);
  brush.vertex(510, 470);
  brush.vertex(428, 470);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("pen", "#111", 0.3);
  brush.hatch(3.5, 170, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(428, 270);
  brush.vertex(510, 270);
  brush.vertex(510, 470);
  brush.vertex(428, 470);
  brush.endShape(true);
  brush.noHatch();

  // ============================================================
  // FOREGROUND GRASS / WEEDS — rotring vertical marks
  // ============================================================

  brush.set("rotring", "#000", 0.5);
  for (let x = 5; x < 600; x += 8) {
    let h = random(15, 55);
    let baseY = random(490, 540);
    brush.line(x, baseY, x + random(-4, 4), baseY - h);
  }

  // Foreground dense grass band
  brush.hatchStyle("rotring", "#000", 0.5);
  brush.hatch(2, 86, { rand: 0.3, continuous: false });
  brush.beginShape(0.05);
  brush.vertex(0, 555);
  brush.vertex(600, 555);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // ============================================================
  // FINAL DARKENING — very dense 2B over deepest shadow areas
  // ============================================================

  // Deep forest floor darkness
  brush.hatchStyle("2B", "#000", 1.8);
  brush.hatch(1.2, 90, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(0, 570);
  brush.vertex(70, 570);
  brush.vertex(70, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.8);
  brush.hatch(1.2, 90, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(150, 565);
  brush.vertex(270, 565);
  brush.vertex(270, 600);
  brush.vertex(150, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.8);
  brush.hatch(1.2, 90, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(380, 570);
  brush.vertex(480, 570);
  brush.vertex(480, 600);
  brush.vertex(380, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.8);
  brush.hatch(1.2, 90, { rand: 0.05, continuous: true });
  brush.beginShape(0.05);
  brush.vertex(540, 560);
  brush.vertex(600, 560);
  brush.vertex(600, 600);
  brush.vertex(540, 600);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}