function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noiseSeed(12);
  randomSeed(12);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // soft dawn sky wash
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.fillTexture(0.85, 0.45);
  brush.wash("#efe6da", 120);
  brush.fill("#d8d7e6", 90);
  brush.fillBleed(0.45, "out");
  brush.rect(0, 0, 600, 250, "corner");
  brush.noWash();

  // warm horizon glow
  let glow = harborBlob(300, 225, 235, 0.12, 34, 0.55);
  brush.wash("#efd7b9", 95);
  brush.fill("#e9c7a2", 105);
  brush.fillBleed(0.42, "out");
  brush.fillTexture(0.8, 0.35);
  drawPoly(glow, 0.52);
  brush.noWash();

  // cool distant fog band
  let fogBand = [
    [0, 185], [80, 178], [160, 183], [245, 175], [335, 182], [430, 176],
    [520, 184], [600, 179], [600, 285], [0, 285]
  ];
  brush.wash("#dfe4ea", 55);
  brush.fill("#d8dde4", 85);
  brush.fillBleed(0.55, "out");
  brush.fillTexture(0.9, 0.3, false);
  brush.polygon(fogBand);
  brush.noWash();

  // harbor water base
  let waterBase = [
    [0, 250], [120, 245], [255, 252], [360, 246], [480, 255], [600, 248],
    [600, 600], [0, 600]
  ];
  brush.wash("#cad6dd", 110);
  brush.fill("#bfcdd6", 95);
  brush.fillBleed(0.35, "out");
  brush.fillTexture(0.75, 0.35);
  brush.polygon(waterBase);
  brush.noWash();

  // muted blue-gray lower water
  let lowerWater = [
    [0, 330], [90, 322], [180, 338], [290, 325], [410, 342], [520, 330],
    [600, 338], [600, 600], [0, 600]
  ];
  brush.fill("#a9bac7", 70);
  brush.fillBleed(0.28, "out");
  brush.fillTexture(0.7, 0.22);
  brush.polygon(lowerWater);

  // left pier fog mass
  let leftPier = harborBlob(120, 330, 95, 0.23, 22, 0.42);
  brush.fill("#b8b4ad", 60);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.7, 0.25);
  drawPoly(leftPier, 0.45);

  // right distant buildings / hull haze
  let rightMass = harborBlob(470, 315, 130, 0.19, 24, 0.45);
  brush.fill("#b1b7bf", 55);
  brush.fillBleed(0.28, "out");
  brush.fillTexture(0.72, 0.24);
  drawPoly(rightMass, 0.42);

  // central boat hull silhouette in soft wash
  let hull = [
    [210, 334], [248, 326], [314, 323], [374, 330], [420, 344],
    [399, 360], [336, 367], [254, 363], [214, 351]
  ];
  brush.wash("#9fa9b0", 70);
  brush.fill("#9ea7af", 80);
  brush.fillBleed(0.18, "out");
  brush.fillTexture(0.65, 0.2);
  brush.polygon(hull);
  brush.noWash();

  // mast reflections / water reflections as soft vertical washes
  for (let i = 0; i < 9; i++) {
    let x = 90 + i * 52 + random(-8, 8);
    let y1 = 340 + random(-12, 10);
    let y2 = 470 + random(30, 90);
    brush.set("marker", "#c4cdd3", 0.35);
    brush.strokeWeight(random(0.22, 0.42));
    brush.line(x, y1, x + random(-10, 10), y2);
  }

  // misty horizontal water sweeps
  brush.set("spray", "#d7dde2", 1.05);
  brush.field("waves");
  for (let y = 300; y < 560; y += 14) {
    for (let i = 0; i < 4; i++) {
      brush.flowLine(
        random(20, 580),
        y + random(-3, 3),
        random(45, 95),
        random(-8, 8)
      );
    }
  }
  brush.noField();

  // haze over horizon
  brush.set("spray", "#ece9e2", 1.2);
  brush.field("curved");
  for (let i = 0; i < 170; i++) {
    brush.flowLine(
      random(0, 600),
      random(175, 290),
      random(14, 34),
      random(160, 200)
    );
  }
  brush.noField();

  // faint graphite shoreline and structures
  brush.noFill();
  brush.set("2H", "#757575", 0.48);
  brush.wiggle(1.2);
  brush.spline([
    [0, 256, 0.5],
    [60, 252, 0.42],
    [118, 255, 0.5],
    [185, 251, 0.42],
    [260, 257, 0.5],
    [332, 252, 0.42],
    [430, 259, 0.5],
    [515, 254, 0.4],
    [600, 258, 0.48]
  ], 0.35);
  brush.noField();

  // boat hull graphite edge
  brush.set("HB", "#55514d", 0.52);
  brush.beginShape(0.26);
  for (let p of hull) brush.vertex(p[0], p[1], 0.5);
  brush.endShape(true);

  // masts
  drawMast(265, 332, 208, 0.42, "#66615d", "HB");
  drawMast(302, 327, 160, 0.38, "#716d69", "2H");
  drawMast(336, 325, 228, 0.46, "#5f5a56", "HB");
  drawMast(390, 338, 145, 0.34, "#77726d", "2H");
  drawMast(108, 294, 110, 0.28, "#7d7974", "2H");
  drawMast(484, 300, 126, 0.3, "#7a7671", "2H");

  // rigging and ropes
  brush.set("2H", "#7d7874", 0.34);
  brush.spline([[265, 235, 0.35], [290, 250, 0.28], [312, 281, 0.22], [335, 324, 0.18]], 0.25);
  brush.spline([[336, 160, 0.35], [320, 214, 0.26], [302, 266, 0.2], [274, 332, 0.16]], 0.25);
  brush.spline([[336, 190, 0.28], [362, 222, 0.22], [381, 265, 0.18], [392, 338, 0.14]], 0.25);
  brush.spline([[302, 210, 0.24], [280, 240, 0.18], [255, 280, 0.16], [233, 334, 0.12]], 0.2);
  brush.spline([[108, 239, 0.22], [136, 255, 0.18], [179, 286, 0.14], [220, 339, 0.12]], 0.2);
  brush.spline([[484, 235, 0.22], [452, 260, 0.18], [428, 292, 0.13], [392, 338, 0.1]], 0.2);

  // distant harbor verticals
  brush.set("2H", "#8b8782", 0.26);
  for (let i = 0; i < 11; i++) {
    let x = 36 + i * 49 + random(-7, 7);
    brush.line(x, 220 + random(-8, 10), x + random(-2, 2), 280 + random(5, 30));
  }

  // faint dock horizontals and rope suggestions
  brush.set("HB", "#6a6561", 0.28);
  brush.spline([[52, 307], [120, 304], [178, 310], [236, 306]], 0.18);
  brush.spline([[376, 308], [430, 303], [502, 309], [565, 305]], 0.18);

  // subtle darker accents on hull and pier
  brush.set("2B", "#4b4744", 0.4);
  brush.line(232, 349, 392, 353);
  brush.line(248, 360, 362, 362);
  brush.line(83, 338, 150, 342);

  // soft pencil hatching for damp shadow under hull
  brush.hatchStyle("2H", "#7b7772", 0.28);
  brush.hatch(7, 8, { rand: 0.08, continuous: true, gradient: 0.15 });
  let shadow = [
    [214, 352], [264, 363], [332, 370], [397, 364], [435, 355],
    [421, 374], [355, 388], [280, 388], [226, 376]
  ];
  brush.polygon(shadow);
  brush.noHatch();

  // very soft graphite contour touches
  brush.set("rotring", "#817c77", 0.18);
  brush.line(265, 209, 265, 331);
  brush.line(336, 160, 336, 325);
  brush.line(390, 193, 390, 338);

  noLoop();
}

function drawMast(x, yBottom, h, w, col, bname) {
  brush.set(bname, col, w);
  brush.line(x, yBottom, x + random(-2, 2), yBottom - h);
}

function harborBlob(cx, cy, r, ns, count, squash) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let rr = r * (0.72 + noise(cos(a) * ns + 30, sin(a) * ns + 70) * 0.55);
    let x = cx + cos(a) * rr;
    let y = cy + sin(a) * rr * squash;
    pts.push([x, y]);
  }
  return pts;
}

function drawPoly(pts, curvature) {
  brush.beginShape(curvature);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
}