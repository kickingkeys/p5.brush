function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#f5f0e8");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Sky — layered soft watercolor washes, cool foggy dawn
  brush.noStroke();
  brush.fillTexture(0.7, 0.35);

  // Pale sky base
  brush.fill("#c8d8e8", 140);
  brush.fillBleed(0.45, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);

  // Warm horizon glow
  brush.fill("#e8d5b8", 110);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 360);
  brush.vertex(0, 360);
  brush.endShape(true);

  // Soft pink-orange dawn tint near horizon
  brush.fill("#d9b8a0", 80);
  brush.fillBleed(0.55, "out");
  brush.beginShape(0.5);
  brush.vertex(80, 240);
  brush.vertex(520, 240);
  brush.vertex(540, 340);
  brush.vertex(60, 340);
  brush.endShape(true);

  // Fog layer over horizon
  brush.fill("#dde8ee", 90);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 280);
  brush.vertex(600, 280);
  brush.vertex(600, 370);
  brush.vertex(0, 370);
  brush.endShape(true);

  // Water — dark cool washes
  brush.fillTexture(0.6, 0.3);

  brush.fill("#8aa8bc", 130);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 340);
  brush.vertex(600, 340);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Deeper water mid-zone
  brush.fill("#6a8fa8", 100);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 360);
  brush.vertex(600, 360);
  brush.vertex(600, 520);
  brush.vertex(0, 520);
  brush.endShape(true);

  // Foreground dark water
  brush.fill("#4a6e88", 90);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 460);
  brush.vertex(600, 460);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Water shimmer / reflection streaks
  brush.fill("#b8cdd8", 60);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(100, 370);
  brush.vertex(300, 365);
  brush.vertex(310, 390);
  brush.vertex(110, 395);
  brush.endShape(true);

  brush.fill("#c8d8e0", 50);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(280, 380);
  brush.vertex(500, 375);
  brush.vertex(510, 405);
  brush.vertex(285, 410);
  brush.endShape(true);

  // Distant foggy shoreline / dock shapes
  brush.fill("#9ab0b8", 100);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(30, 310);
  brush.vertex(180, 305);
  brush.vertex(190, 345);
  brush.vertex(35, 348);
  brush.endShape(true);

  brush.fill("#8aa0aa", 90);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.5);
  brush.vertex(150, 308);
  brush.vertex(320, 300);
  brush.vertex(330, 348);
  brush.vertex(155, 350);
  brush.endShape(true);

  brush.fill("#7890a0", 80);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(300, 305);
  brush.vertex(480, 298);
  brush.vertex(490, 345);
  brush.vertex(308, 350);
  brush.endShape(true);

  // Boat hull shapes — dark watercolor
  brush.fill("#4a5560", 160);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(80, 350);
  brush.vertex(200, 345);
  brush.vertex(210, 375);
  brush.vertex(70, 378);
  brush.endShape(true);

  brush.fill("#3a4850", 150);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(250, 348);
  brush.vertex(390, 342);
  brush.vertex(400, 372);
  brush.vertex(242, 378);
  brush.endShape(true);

  brush.fill("#3d4a55", 140);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(420, 350);
  brush.vertex(560, 345);
  brush.vertex(568, 370);
  brush.vertex(415, 376);
  brush.endShape(true);

  // Cabin / wheelhouse shapes
  brush.fill("#58686e", 140);
  brush.fillBleed(0.18, "out");
  brush.beginShape(0.3);
  brush.vertex(100, 325);
  brush.vertex(155, 320);
  brush.vertex(158, 352);
  brush.vertex(102, 352);
  brush.endShape(true);

  brush.fill("#506068", 130);
  brush.fillBleed(0.18, "out");
  brush.beginShape(0.3);
  brush.vertex(290, 318);
  brush.vertex(345, 313);
  brush.vertex(348, 348);
  brush.vertex(292, 350);
  brush.endShape(true);

  brush.fill("#4e5e66", 125);
  brush.fillBleed(0.18, "out");
  brush.beginShape(0.3);
  brush.vertex(455, 322);
  brush.vertex(510, 318);
  brush.vertex(513, 350);
  brush.vertex(457, 352);
  brush.endShape(true);

  brush.noFill();
  brush.noWash();

  // ─── Graphite pencil lines over dry washes ───

  // Masts — tall vertical HB lines
  brush.set("HB", "#2a2a2a", 0.5);
  brush.line(135, 322, 130, 160);
  brush.line(140, 320, 148, 155);

  brush.set("HB", "#2d2d2d", 0.45);
  brush.line(318, 315, 313, 148);
  brush.line(325, 313, 332, 142);

  brush.set("HB", "#303030", 0.5);
  brush.line(488, 318, 483, 158);
  brush.line(494, 316, 500, 152);

  // Boom / crossbeam lines
  brush.set("2H", "#444444", 0.4);
  brush.line(130, 200, 180, 215);
  brush.line(148, 195, 100, 210);

  brush.set("2H", "#444444", 0.35);
  brush.line(313, 195, 360, 208);
  brush.line(332, 188, 285, 202);

  brush.set("2H", "#444444", 0.4);
  brush.line(483, 200, 530, 214);
  brush.line(500, 196, 455, 210);

  // Rigging / rope lines — faint 2H
  brush.set("2H", "#555555", 0.3);
  // Boat 1 rigging
  brush.line(130, 162, 80, 350);
  brush.line(148, 158, 200, 348);
  brush.line(130, 162, 200, 215);
  brush.line(130, 180, 100, 210);

  brush.set("2H", "#585858", 0.28);
  // Boat 2 rigging
  brush.line(313, 150, 255, 348);
  brush.line(332, 144, 395, 345);
  brush.line(313, 150, 360, 208);
  brush.line(332, 168, 285, 202);

  brush.set("2H", "#555555", 0.3);
  // Boat 3 rigging
  brush.line(483, 160, 425, 350);
  brush.line(500, 155, 560, 348);
  brush.line(483, 160, 530, 214);
  brush.line(500, 178, 455, 210);

  // Additional fine ropes and stays
  brush.set("2H", "#606060", 0.25);
  brush.line(130, 175, 155, 322);
  brush.line(148, 172, 140, 320);
  brush.line(313, 165, 318, 315);
  brush.line(332, 160, 325, 313);
  brush.line(483, 172, 488, 318);
  brush.line(500, 168, 494, 316);

  // Dock / pier lines in foreground
  brush.set("HB", "#333333", 0.55);
  brush.line(0, 355, 90, 352);
  brush.line(0, 365, 75, 362);

  brush.set("HB", "#333333", 0.5);
  brush.line(560, 350, 600, 348);
  brush.line(555, 362, 600, 360);

  // Horizontal water reflection lines — very faint
  brush.set("2H", "#7a8a90", 0.3);
  brush.line(70, 385, 210, 382);
  brush.line(80, 395, 195, 393);
  brush.line(240, 388, 405, 384);
  brush.line(250, 400, 395, 397);
  brush.line(415, 383, 570, 380);
  brush.line(420, 395, 560, 392);

  // Faint distant horizon shoreline in 2B
  brush.set("2B", "#4a5560", 0.35);
  brush.line(0, 308, 80, 302);
  brush.line(460, 295, 600, 305);

  // Foreground dock piling marks
  brush.set("HB", "#2a3035", 0.6);
  brush.line(40, 355, 38, 420);
  brush.line(55, 353, 53, 415);
  brush.line(530, 352, 528, 418);
  brush.line(545, 350, 543, 412);

  // Fog wisps — very faint spray
  brush.set("spray", "#d8e4ec", 0.5);
  for (let i = 0; i < 30; i++) {
    brush.line(
      random(0, 600),
      random(290, 360),
      random(0, 600),
      random(295, 365)
    );
  }

  noLoop();
}