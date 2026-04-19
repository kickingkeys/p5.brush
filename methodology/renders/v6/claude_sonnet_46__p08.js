function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5f0e8");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky washes ---
  brush.noStroke();
  brush.fillTexture(0.7, 0.4);

  // Pale grey-blue sky, upper region
  brush.fill("#b8c8d8", 90);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 260);
  brush.vertex(0, 260);
  brush.endShape(true);

  // Warmer horizon glow
  brush.fill("#d4c8b0", 80);
  brush.fillBleed(0.45, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 330);
  brush.vertex(0, 330);
  brush.endShape(true);

  // Soft fog layer over sky
  brush.fill("#dde4ea", 70);
  brush.fillBleed(0.55, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 120);
  brush.vertex(600, 120);
  brush.vertex(600, 310);
  brush.vertex(0, 310);
  brush.endShape(true);

  // --- Water washes ---
  brush.fillTexture(0.6, 0.35);

  // Deep water base
  brush.fill("#8fa8b8", 100);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Foggy water reflection
  brush.fill("#b8c8cc", 75);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 430);
  brush.vertex(0, 430);
  brush.endShape(true);

  // Near water darker
  brush.fill("#6a8898", 85);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 440);
  brush.vertex(600, 440);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // --- Distant foggy landmass / pier silhouette ---
  brush.fillTexture(0.5, 0.3);
  brush.fill("#8899a8", 65);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.4);
  brush.vertex(30, 290);
  brush.vertex(80, 275);
  brush.vertex(140, 268);
  brush.vertex(200, 272);
  brush.vertex(240, 265);
  brush.vertex(280, 270);
  brush.vertex(300, 268);
  brush.vertex(320, 272);
  brush.vertex(360, 266);
  brush.vertex(400, 270);
  brush.vertex(440, 275);
  brush.vertex(500, 280);
  brush.vertex(560, 285);
  brush.vertex(600, 288);
  brush.vertex(600, 310);
  brush.vertex(0, 310);
  brush.endShape(true);

  // Darker distant shore
  brush.fill("#6a7888", 70);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 295);
  brush.vertex(60, 282);
  brush.vertex(120, 276);
  brush.vertex(180, 278);
  brush.vertex(230, 272);
  brush.vertex(280, 275);
  brush.vertex(340, 270);
  brush.vertex(400, 274);
  brush.vertex(460, 278);
  brush.vertex(530, 283);
  brush.vertex(600, 290);
  brush.vertex(600, 312);
  brush.vertex(0, 312);
  brush.endShape(true);

  // --- Dock / pier structure ---
  brush.fillTexture(0.45, 0.25);
  brush.fill("#5a6670", 110);
  brush.fillBleed(0.2, "out");
  // Left dock
  brush.beginShape(0.3);
  brush.vertex(60, 310);
  brush.vertex(160, 308);
  brush.vertex(165, 340);
  brush.vertex(55, 342);
  brush.endShape(true);

  // Right dock
  brush.beginShape(0.3);
  brush.vertex(380, 305);
  brush.vertex(500, 303);
  brush.vertex(505, 335);
  brush.vertex(375, 337);
  brush.endShape(true);

  brush.noFill();

  // --- Boat hull left ---
  brush.fillTexture(0.5, 0.3);
  brush.fill("#4a5560", 120);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(80, 330);
  brush.vertex(155, 326);
  brush.vertex(162, 345);
  brush.vertex(155, 358);
  brush.vertex(85, 360);
  brush.vertex(74, 348);
  brush.endShape(true);
  brush.noFill();

  // Boat hull right
  brush.fillTexture(0.5, 0.3);
  brush.fill("#556070", 115);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.35);
  brush.vertex(390, 322);
  brush.vertex(480, 318);
  brush.vertex(488, 338);
  brush.vertex(480, 352);
  brush.vertex(392, 354);
  brush.vertex(383, 338);
  brush.endShape(true);
  brush.noFill();

  // Small boat center
  brush.fillTexture(0.5, 0.3);
  brush.fill("#5a6878", 100);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.35);
  brush.vertex(248, 335);
  brush.vertex(310, 332);
  brush.vertex(315, 348);
  brush.vertex(308, 358);
  brush.vertex(250, 360);
  brush.vertex(243, 348);
  brush.endShape(true);
  brush.noFill();

  // --- Fog overlay on water ---
  brush.fillTexture(0.4, 0.2);
  brush.fill("#dce8ec", 55);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 380);
  brush.vertex(0, 380);
  brush.endShape(true);

  brush.fill("#e0eaee", 40);
  brush.fillBleed(0.65, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 290);
  brush.vertex(600, 290);
  brush.vertex(600, 360);
  brush.vertex(0, 360);
  brush.endShape(true);

  // --- Water ripple lines (HB pencil, very faint) ---
  brush.noFill();
  brush.set("HB", "#7a8e9a", 0.3);
  for (let y = 320; y < 580; y += 18 + random(-3, 3)) {
    let pts = [];
    for (let x = 10; x < 595; x += 30 + random(-5, 5)) {
      pts.push([x, y + random(-2, 2)]);
    }
    if (pts.length > 2) {
      brush.spline(pts, 0.3);
    }
  }

  // --- Graphite pencil: masts ---
  brush.set("HB", "#3a3a3a", 0.5);

  // Left boat mast
  brush.line(118, 330, 115, 195);
  // Left mast slight lean
  brush.line(115, 195, 113, 140);

  // Right boat mast
  brush.line(435, 322, 432, 175);
  brush.line(432, 175, 430, 120);

  // Center small boat mast
  brush.line(278, 335, 276, 215);

  // Second mast left boat
  brush.line(140, 328, 138, 210);

  // Second mast right boat
  brush.line(460, 320, 458, 190);

  // --- Cross spars on masts ---
  brush.set("HB", "#3a3a3a", 0.4);
  // Left main mast spar
  brush.line(90, 230, 148, 224);
  brush.line(95, 260, 142, 256);

  // Right main mast spar
  brush.line(408, 220, 462, 215);
  brush.line(412, 248, 458, 244);

  // Center mast spar
  brush.line(258, 258, 298, 254);

  // --- Ropes / rigging (2H pencil, very fine) ---
  brush.set("2H", "#555555", 0.3);

  // Left boat rigging
  brush.line(115, 195, 80, 330);
  brush.line(115, 195, 155, 326);
  brush.line(113, 140, 75, 330);
  brush.line(113, 140, 160, 326);
  brush.line(90, 230, 80, 330);
  brush.line(148, 224, 155, 326);

  // Right boat rigging
  brush.line(432, 175, 395, 322);
  brush.line(432, 175, 478, 318);
  brush.line(430, 120, 388, 322);
  brush.line(430, 120, 482, 318);
  brush.line(408, 220, 395, 322);
  brush.line(462, 215, 478, 318);

  // Center boat rigging
  brush.line(276, 215, 250, 335);
  brush.line(276, 215, 308, 332);

  // Dock mooring lines
  brush.line(80, 358, 65, 340);
  brush.line(155, 358, 158, 340);
  brush.line(392, 352, 382, 335);
  brush.line(480, 352, 498, 335);

  // --- Additional faint rigging details ---
  brush.set("2H", "#666666", 0.25);
  brush.line(138, 210, 82, 328);
  brush.line(138, 210, 152, 326);
  brush.line(458, 190, 393, 322);
  brush.line(458, 190, 476, 318);

  // Hanging rope curves
  brush.spline([[115, 195], [130, 220], [148, 224]], 0.4);
  brush.spline([[432, 175], [447, 200], [462, 215]], 0.4);

  // --- Soft fog wisps (spray) ---
  brush.set("spray", "#dce8ec", 2.5);
  for (let i = 0; i < 60; i++) {
    let x = random(0, 600);
    let y = random(270, 380);
    brush.flowLine(x, y, random(20, 55), random(360));
  }

  brush.set("spray", "#e8eeee", 2.0);
  for (let i = 0; i < 40; i++) {
    let x = random(0, 600);
    let y = random(260, 320);
    brush.flowLine(x, y, random(15, 40), random(360));
  }

  // Upper sky fog
  brush.set("spray", "#d8e4ea", 1.8);
  for (let i = 0; i < 35; i++) {
    let x = random(0, 600);
    let y = random(100, 230);
    brush.flowLine(x, y, random(20, 50), random(360));
  }

  // --- Dock pilings ---
  brush.set("HB", "#4a5560", 0.6);
  let pilingXL = [65, 80, 100, 120, 140, 158];
  for (let px of pilingXL) {
    brush.line(px, 342, px + random(-2, 2), 400 + random(-5, 5));
  }
  let pilingXR = [382, 400, 420, 440, 460, 500];
  for (let px of pilingXR) {
    brush.line(px, 337, px + random(-2, 2), 395 + random(-5, 5));
  }

  // --- Soft pencil shading on hulls ---
  brush.set("2H", "#5a6878", 0.3);
  brush.hatchStyle("2H", "#5a6878", 0.3);
  brush.hatch(5, 15, { rand: 0.05, continuous: false });
  // Left hull shading
  brush.beginShape(0.3);
  brush.vertex(80, 330);
  brush.vertex(155, 326);
  brush.vertex(162, 345);
  brush.vertex(155, 358);
  brush.vertex(85, 360);
  brush.vertex(74, 348);
  brush.endShape(true);
  brush.noHatch();

  brush.hatch(5, 15, { rand: 0.05, continuous: false });
  // Right hull shading
  brush.beginShape(0.3);
  brush.vertex(390, 322);
  brush.vertex(480, 318);
  brush.vertex(488, 338);
  brush.vertex(480, 352);
  brush.vertex(392, 354);
  brush.vertex(383, 338);
  brush.endShape(true);
  brush.noHatch();

  // Center hull shading
  brush.hatch(5, 15, { rand: 0.05, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(248, 335);
  brush.vertex(310, 332);
  brush.vertex(315, 348);
  brush.vertex(308, 358);
  brush.vertex(250, 360);
  brush.vertex(243, 348);
  brush.endShape(true);
  brush.noHatch();

  // --- Dock shading ---
  brush.hatchStyle("2H", "#556070", 0.3);
  brush.hatch(6, 10, { rand: 0.04 });
  brush.beginShape(0.3);
  brush.vertex(60, 310);
  brush.vertex(160, 308);
  brush.vertex(165, 340);
  brush.vertex(55, 342);
  brush.endShape(true);
  brush.noHatch();

  brush.hatch(6, 10, { rand: 0.04 });
  brush.beginShape(0.3);
  brush.vertex(380, 305);
  brush.vertex(500, 303);
  brush.vertex(505, 335);
  brush.vertex(375, 337);
  brush.endShape(true);
  brush.noHatch();

  // --- Final mist veil ---
  brush.noStroke();
  brush.fillTexture(0.3, 0.15);
  brush.fill("#eef4f6", 35);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  noLoop();
}