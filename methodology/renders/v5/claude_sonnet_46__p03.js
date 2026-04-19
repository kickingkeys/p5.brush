function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Motion smear trails (heavy smudges behind the leap) ---
  brush.field("hand");
  brush.wiggle(5);

  // Deep shadow smear - leftward trail
  brush.mass("crayon", "#1a1a1a", { strength: 0.88, precision: 0.2, gradient: 0.5 });
  brush.hatchStyle("charcoal", "#111", 1.8);
  brush.hatch(3, 155, { rand: 0.25, continuous: true });
  brush.beginShape(0.5);
  brush.vertex(80, 340);
  brush.vertex(130, 310);
  brush.vertex(200, 295);
  brush.vertex(220, 330);
  brush.vertex(190, 370);
  brush.vertex(120, 385);
  brush.vertex(75, 370);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Mid smear
  brush.mass("pastel", "#2a2a2a", { strength: 0.65, precision: 0.3, gradient: 0.4 });
  brush.hatchStyle("charcoal", "#222", 1.2);
  brush.hatch(5, 140, { rand: 0.2, continuous: true });
  brush.beginShape(0.45);
  brush.vertex(120, 290);
  brush.vertex(185, 270);
  brush.vertex(245, 265);
  brush.vertex(255, 300);
  brush.vertex(225, 330);
  brush.vertex(160, 340);
  brush.vertex(115, 320);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Lighter trailing smudge
  brush.mass("pastel", "#3d3d3d", { strength: 0.4, precision: 0.4, gradient: 0.55 });
  brush.hatchStyle("charcoal", "#444", 0.9);
  brush.hatch(7, 130, { rand: 0.18, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(170, 250);
  brush.vertex(240, 235);
  brush.vertex(295, 240);
  brush.vertex(300, 275);
  brush.vertex(270, 305);
  brush.vertex(200, 310);
  brush.vertex(165, 280);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  brush.noField();

  // --- Dancer body - torso core ---
  brush.field("hand");
  brush.wiggle(3);

  brush.mass("crayon", "#1c1c1c", { strength: 0.82, precision: 0.45, gradient: 0.3, outline: true });
  brush.hatchStyle("charcoal", "#111", 1.4);
  brush.hatch(4, 70, { rand: 0.15, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(310, 210);
  brush.vertex(345, 195);
  brush.vertex(375, 200);
  brush.vertex(385, 230);
  brush.vertex(378, 265);
  brush.vertex(355, 285);
  brush.vertex(325, 280);
  brush.vertex(305, 255);
  brush.vertex(300, 230);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // Torso shadow side
  brush.mass("pastel", "#111", { strength: 0.6, precision: 0.5, gradient: 0.35 });
  brush.hatchStyle("charcoal", "#1a1a1a", 1.0);
  brush.hatch(5, 100, { rand: 0.12 });
  brush.beginShape(0.35);
  brush.vertex(300, 225);
  brush.vertex(310, 210);
  brush.vertex(325, 215);
  brush.vertex(320, 255);
  brush.vertex(305, 270);
  brush.vertex(298, 248);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Head ---
  brush.mass("crayon", "#1e1e1e", { strength: 0.75, precision: 0.55, gradient: 0.2, outline: true });
  brush.hatchStyle("charcoal", "#222", 1.1);
  brush.hatch(5, 55, { rand: 0.1 });
  brush.beginShape(0.45);
  brush.vertex(335, 170);
  brush.vertex(355, 158);
  brush.vertex(372, 162);
  brush.vertex(378, 178);
  brush.vertex(372, 196);
  brush.vertex(353, 202);
  brush.vertex(336, 194);
  brush.vertex(330, 182);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Extended leaping arm (reaching forward-up, right side) ---
  brush.mass("crayon", "#1a1a1a", { strength: 0.72, precision: 0.4, gradient: 0.4, outline: true });
  brush.hatchStyle("charcoal", "#111", 1.2);
  brush.hatch(4, 35, { rand: 0.14, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(375, 210);
  brush.vertex(410, 190);
  brush.vertex(450, 168);
  brush.vertex(490, 148);
  brush.vertex(510, 138);
  brush.vertex(515, 152);
  brush.vertex(495, 168);
  brush.vertex(455, 188);
  brush.vertex(415, 210);
  brush.vertex(385, 228);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Trailing arm (left, swept back) ---
  brush.mass("pastel", "#222", { strength: 0.6, precision: 0.35, gradient: 0.45 });
  brush.hatchStyle("charcoal", "#333", 1.0);
  brush.hatch(6, 160, { rand: 0.18, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(308, 230);
  brush.vertex(278, 220);
  brush.vertex(245, 215);
  brush.vertex(215, 218);
  brush.vertex(195, 232);
  brush.vertex(198, 248);
  brush.vertex(220, 245);
  brush.vertex(252, 238);
  brush.vertex(282, 238);
  brush.vertex(310, 248);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Leading leg (right, extended forward-down) ---
  brush.mass("crayon", "#181818", { strength: 0.85, precision: 0.42, gradient: 0.35, outline: true });
  brush.hatchStyle("charcoal", "#111", 1.5);
  brush.hatch(4, 80, { rand: 0.15, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(360, 280);
  brush.vertex(385, 295);
  brush.vertex(415, 320);
  brush.vertex(445, 352);
  brush.vertex(468, 378);
  brush.vertex(478, 400);
  brush.vertex(462, 412);
  brush.vertex(448, 400);
  brush.vertex(428, 372);
  brush.vertex(400, 342);
  brush.vertex(370, 312);
  brush.vertex(345, 292);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // --- Trailing leg (left, swept back and up) ---
  brush.mass("pastel", "#202020", { strength: 0.7, precision: 0.38, gradient: 0.42 });
  brush.hatchStyle("charcoal", "#2a2a2a", 1.1);
  brush.hatch(5, 120, { rand: 0.2, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(320, 278);
  brush.vertex(295, 295);
  brush.vertex(265, 318);
  brush.vertex(238, 348);
  brush.vertex(218, 375);
  brush.vertex(210, 400);
  brush.vertex(225, 412);
  brush.vertex(238, 402);
  brush.vertex(255, 375);
  brush.vertex(278, 348);
  brush.vertex(305, 318);
  brush.vertex(332, 294);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  brush.noField();

  // --- Gestural charcoal contour lines over the figure ---
  brush.field("hand");
  brush.wiggle(4);

  // Main body contour
  brush.set("charcoal", "#0d0d0d", 1.8);
  brush.noFill();
  brush.spline([
    [340, 158], [362, 152], [378, 165], [385, 200],
    [380, 245], [360, 282], [340, 290], [318, 278],
    [302, 252], [298, 220], [308, 200], [328, 185]
  ], 0.45);

  // Extended arm contour
  brush.set("charcoal", "#111", 1.5);
  brush.spline([
    [378, 208], [415, 185], [458, 162], [500, 140], [515, 135]
  ], 0.4);

  // Trailing arm contour
  brush.set("charcoal", "#1a1a1a", 1.2);
  brush.spline([
    [308, 228], [270, 218], [230, 218], [200, 232], [192, 248]
  ], 0.4);

  // Leading leg contour
  brush.set("charcoal", "#0d0d0d", 1.6);
  brush.spline([
    [358, 278], [390, 302], [425, 335], [458, 372], [475, 402], [468, 415]
  ], 0.42);

  // Trailing leg contour
  brush.set("charcoal", "#111", 1.4);
  brush.spline([
    [322, 280], [292, 302], [258, 332], [228, 365], [212, 398], [220, 415]
  ], 0.42);

  // --- Smear gesture lines trailing left ---
  brush.set("charcoal", "#1a1a1a", 2.0);
  brush.spline([
    [275, 310], [230, 318], [178, 332], [120, 350], [80, 360]
  ], 0.35);

  brush.set("charcoal", "#222", 1.5);
  brush.spline([
    [255, 290], [205, 298], [155, 308], [105, 318], [72, 325]
  ], 0.35);

  brush.set("charcoal", "#2a2a2a", 1.0);
  brush.spline([
    [240, 270], [195, 275], [148, 280], [100, 285], [65, 288]
  ], 0.3);

  brush.set("charcoal", "#333", 0.8);
  brush.spline([
    [220, 252], [178, 255], [135, 258], [92, 260], [60, 262]
  ], 0.3);

  // --- Loose gestural hatch marks for smear texture ---
  brush.noFill();
  brush.hatchStyle("charcoal", "#1c1c1c", 1.2);
  brush.hatch(6, 148, { rand: 0.3, continuous: false });
  brush.beginShape(0.5);
  brush.vertex(65, 290);
  brush.vertex(155, 270);
  brush.vertex(240, 260);
  brush.vertex(245, 310);
  brush.vertex(155, 330);
  brush.vertex(65, 350);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#222", 0.9);
  brush.hatch(8, 135, { rand: 0.25, continuous: false });
  brush.beginShape(0.4);
  brush.vertex(60, 330);
  brush.vertex(140, 315);
  brush.vertex(215, 308);
  brush.vertex(218, 345);
  brush.vertex(140, 358);
  brush.vertex(60, 372);
  brush.endShape(true);
  brush.noHatch();

  // --- Fine detail: foot of leading leg ---
  brush.set("charcoal", "#111", 1.3);
  brush.spline([
    [468, 402], [475, 415], [480, 428], [472, 438], [458, 435], [448, 420]
  ], 0.35);

  // --- Fine detail: foot of trailing leg ---
  brush.set("charcoal", "#1a1a1a", 1.1);
  brush.spline([
    [218, 410], [210, 422], [205, 435], [215, 442], [230, 438], [238, 425]
  ], 0.35);

  // --- Loose atmospheric marks around figure for energy ---
  brush.set("charcoal", "#2a2a2a", 0.8);
  brush.wiggle(6);

  brush.line(390, 180, 420, 155);
  brush.line(398, 192, 432, 172);
  brush.line(505, 132, 525, 118);
  brush.line(510, 145, 535, 135);

  brush.line(195, 240, 168, 255);
  brush.line(190, 252, 160, 265);

  brush.line(475, 408, 495, 422);
  brush.line(465, 418, 488, 435);

  brush.line(208, 418, 188, 432);
  brush.line(215, 428, 192, 440);

  // --- Very light paper texture hatching in background ---
  brush.noField();
  brush.wiggle(1);
  brush.hatchStyle("2H", "#ccc5b8", 0.4);
  brush.hatch(18, 22, { rand: 0.08 });
  brush.beginShape(0.2);
  brush.vertex(30, 30);
  brush.vertex(570, 30);
  brush.vertex(570, 570);
  brush.vertex(30, 570);
  brush.endShape(true);
  brush.noHatch();

  brush.noField();
  brush.noStroke();

  noLoop();
}