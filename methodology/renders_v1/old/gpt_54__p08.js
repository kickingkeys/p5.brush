function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(18);
  noiseSeed(18);

  // Soft sky wash
  brush.noStroke();
  brush.noHatch();
  brush.fillBleed(0.22, "out");
  brush.fillTexture(0.55, 0.3, true);

  brush.fill("#d8e3e8", 42);
  brush.rect(0, 0, 600, 245, "corner");

  brush.fill("#ece6da", 24);
  brush.rect(0, 0, 600, 140, "corner");

  // Low fog bank
  for (let i = 0; i < 7; i++) {
    let x = random(50, 550);
    let y = random(125, 235);
    let r = random(70, 130);
    brush.fill("#dfe6e2", random(12, 22));
    brush.circle(x, y, r, 0.35);
  }

  // Distant shoreline / haze
  brush.fill("#b7c2bf", 22);
  brush.beginShape(0.25);
  brush.vertex(0, 245);
  brush.vertex(90, 228);
  brush.vertex(190, 236);
  brush.vertex(295, 220);
  brush.vertex(390, 232);
  brush.vertex(500, 222);
  brush.vertex(600, 238);
  brush.vertex(600, 286);
  brush.vertex(0, 286);
  brush.endShape(true);

  // Harbor water wash
  brush.fill("#aebfc5", 48);
  brush.fillBleed(0.16, "out");
  brush.fillTexture(0.42, 0.22, true);
  brush.rect(0, 230, 600, 370, "corner");

  // Horizontal mist and water layers
  for (let i = 0; i < 11; i++) {
    let yy = 240 + i * 24 + random(-4, 4);
    let hh = random(18, 34);
    let ww = random(450, 620);
    let xx = random(-20, 30);
    brush.fill(i < 4 ? "#dde4e0" : "#b9c8cd", i < 4 ? 10 : 9);
    brush.rect(xx, yy, ww, hh, "corner");
  }

  // Reflected muted forms
  for (let i = 0; i < 8; i++) {
    let x = 70 + i * 62 + random(-12, 12);
    let y = 310 + random(-8, 18);
    let w = random(16, 34);
    let h = random(90, 170);
    brush.fill("#7d9098", 9);
    brush.rect(x, y, w, h, "corner");
  }

  // Main boat silhouettes in watercolor
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.6, 0.35, true);

  brush.fill("#8b9aa0", 34);
  brush.beginShape(0.15);
  brush.vertex(120, 332);
  brush.vertex(180, 326);
  brush.vertex(250, 332);
  brush.vertex(235, 352);
  brush.vertex(145, 356);
  brush.endShape(true);

  brush.fill("#96a6ab", 30);
  brush.beginShape(0.15);
  brush.vertex(290, 346);
  brush.vertex(354, 341);
  brush.vertex(430, 347);
  brush.vertex(415, 365);
  brush.vertex(304, 369);
  brush.endShape(true);

  brush.fill("#a3b0b2", 24);
  brush.beginShape(0.15);
  brush.vertex(398, 320);
  brush.vertex(445, 316);
  brush.vertex(492, 322);
  brush.vertex(482, 337);
  brush.vertex(410, 340);
  brush.endShape(true);

  // Pier / dock suggestion
  brush.fill("#c9b39c", 20);
  brush.rect(0, 378, 600, 12, "corner");

  // Fog softening layer over middle distance
  for (let i = 0; i < 6; i++) {
    brush.fill("#f1efe8", 12);
    brush.rect(-10, 250 + i * 18 + random(-3, 3), 620, random(22, 40), "corner");
  }

  // Watercolor blooms around boats
  for (let i = 0; i < 10; i++) {
    let x = random(90, 500);
    let y = random(280, 390);
    let r = random(28, 62);
    brush.fill("#d6dfde", random(8, 16));
    brush.circle(x, y, r, 0.4);
  }

  // Fine graphite structure
  brush.noFill();
  brush.noHatch();
  brush.noField();

  // Hull lines
  brush.set("HB", "#5d5a57", 0.55);
  brush.line(120, 332, 250, 332);
  brush.line(146, 356, 235, 352);
  brush.line(290, 346, 430, 347);
  brush.line(304, 369, 415, 365);
  brush.line(398, 320, 492, 322);
  brush.line(410, 340, 482, 337);

  // Masts
  brush.set("2H", "#6d6a66", 0.42);
  let masts = [
    [155, 332, 155, 175],
    [196, 330, 196, 152],
    [223, 332, 223, 196],
    [323, 345, 323, 165],
    [365, 345, 365, 140],
    [408, 347, 408, 182],
    [438, 320, 438, 168],
    [467, 321, 467, 148]
  ];
  for (let m of masts) {
    brush.line(m[0], m[1], m[2], m[3]);
  }

  // Rigging and ropes
  brush.set("cpencil", "#75706c", 0.38);
  brush.line(155, 175, 122, 331);
  brush.line(155, 175, 188, 330);
  brush.line(196, 152, 166, 331);
  brush.line(196, 152, 231, 333);
  brush.line(223, 196, 202, 331);
  brush.line(223, 196, 244, 333);

  brush.line(323, 165, 296, 346);
  brush.line(323, 165, 348, 345);
  brush.line(365, 140, 337, 345);
  brush.line(365, 140, 393, 347);
  brush.line(408, 182, 384, 347);
  brush.line(408, 182, 422, 347);

  brush.line(438, 168, 417, 321);
  brush.line(438, 168, 457, 321);
  brush.line(467, 148, 448, 321);
  brush.line(467, 148, 487, 322);

  // Hanging rope gestures
  brush.set("2B", "#6a6561", 0.46);
  brush.spline([
    [182, 252, 0.9],
    [176, 282, 0.7],
    [184, 308, 0.6],
    [193, 329, 0.4]
  ], 0.7);
  brush.spline([
    [350, 238, 0.9],
    [345, 275, 0.7],
    [352, 309, 0.55],
    [360, 344, 0.4]
  ], 0.7);
  brush.spline([
    [454, 225, 0.85],
    [449, 258, 0.7],
    [454, 289, 0.5],
    [463, 320, 0.35]
  ], 0.7);

  // Reflections as faint pencil descents
  brush.set("2H", "#8c9498", 0.28);
  for (let i = 0; i < masts.length; i++) {
    let mx = masts[i][0] + random(-2, 2);
    let my = masts[i][1];
    let len = random(70, 135);
    brush.line(mx, my, mx + random(-5, 5), my + len);
  }

  // Harbor posts and mooring details
  brush.set("HB", "#66615c", 0.5);
  for (let x of [92, 118, 272, 286, 518, 540]) {
    brush.line(x, 377, x, 417 + random(-4, 6));
  }

  brush.set("cpencil", "#7b7671", 0.34);
  brush.line(92, 388, 145, 356);
  brush.line(286, 386, 324, 370);
  brush.line(518, 386, 480, 338);

  // Small birds / distant marks
  brush.set("2H", "#8a847f", 0.22);
  brush.arc(118, 92, 7, 200, 340);
  brush.arc(125, 92, 7, 200, 340);
  brush.arc(458, 112, 6, 200, 340);
  brush.arc(464, 112, 6, 200, 340);

  // Dry charcoal accents on nearest hull edges
  brush.set("charcoal", "#56514d", 0.22);
  brush.line(150, 355, 212, 351);
  brush.line(314, 368, 392, 365);

  // Soft atmospheric horizontal graphite strokes
  brush.set("2H", "#9b9791", 0.18);
  for (let i = 0; i < 16; i++) {
    let y = random(250, 520);
    let x1 = random(20, 120);
    let x2 = random(420, 585);
    brush.line(x1, y, x2, y + random(-3, 3));
  }

  noLoop();
}