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

  // Sky wash
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.fillTexture(0.75, 0.35);
  brush.fillBleed(0.45, "out");

  let skyCols = ["#d9d8df", "#cdd7df", "#e6d8cc", "#c8d0d4"];
  for (let i = 0; i < 10; i++) {
    let y = map(i, 0, 9, 10, 260);
    let h = random(55, 95);
    let pts = harborBand(300, y, 360 + random(-40, 60), h, 0.55, 26, 0.012 + i * 0.001);
    brush.fill(skyCols[i % skyCols.length], random(28, 55));
    drawClosedShape(pts, 0.55);
  }

  // Distant fog banks
  for (let i = 0; i < 7; i++) {
    let x = random(80, 520);
    let y = random(110, 240);
    let pts = harborBlob(x, y, random(70, 150), random(22, 45), 28, 0.018);
    brush.fill("#d8d7d1", random(20, 42));
    brush.fillBleed(random(0.4, 0.6), "out");
    drawClosedShape(pts, 0.6);
  }

  // Water base
  brush.fillTexture(0.7, 0.28);
  for (let i = 0; i < 9; i++) {
    let y = map(i, 0, 8, 285, 575);
    let pts = harborBand(300, y, 390 + random(-30, 50), 48 + random(10, 35), 0.45, 24, 0.02 + i * 0.002);
    brush.fill(i < 4 ? "#c3cdd0" : "#b4c1c5", random(26, 46));
    brush.fillBleed(0.38, "out");
    drawClosedShape(pts, 0.45);
  }

  // Soft harbor silhouettes
  let hulls = [];
  hulls.push(hullShape(125, 325, 120, 18));
  hulls.push(hullShape(250, 350, 165, 24));
  hulls.push(hullShape(410, 338, 145, 22));
  hulls.push(hullShape(505, 372, 95, 16));

  brush.fillTexture(0.82, 0.42);
  for (let i = 0; i < hulls.length; i++) {
    brush.fill("#8f9897", 62);
    brush.fillBleed(0.26, "out");
    drawClosedShape(hulls[i], 0.35);

    let cx = centroid(hulls[i]).x;
    let cy = centroid(hulls[i]).y;
    brush.fill("#a9b3b0", 30);
    brush.fillBleed(0.35, "in");
    let inner = scalePoints(hulls[i], cx, cy, 0.82, 0.8);
    drawClosedShape(inner, 0.35);
  }

  // Piers / posts as softened wash blocks
  let pierCols = ["#b9b0a3", "#a99f93", "#c0b6a9"];
  for (let i = 0; i < 8; i++) {
    let x = 70 + i * 62 + random(-10, 10);
    let topY = random(300, 360);
    let pts = [
      [x - random(4, 7), topY],
      [x + random(4, 7), topY + random(1, 4)],
      [x + random(7, 11), 510 + random(-10, 18)],
      [x - random(8, 11), 510 + random(-10, 18)]
    ];
    brush.fill(pierCols[i % pierCols.length], 32);
    brush.fillBleed(0.18, "out");
    drawClosedShape(pts, 0.15);
  }

  // Reflections
  brush.noFill();
  brush.noHatch();
  brush.wiggle(1.5);
  brush.set("spray", "#a7b3b7", 1.0);
  for (let i = 0; i < 70; i++) {
    let x = random(60, 540);
    let y = random(340, 585);
    brush.flowLine(x, y, random(10, 26), 0);
  }
  brush.noField();

  // Faint graphite structure
  brush.noFill();
  brush.noHatch();

  // Horizon and distant dock suggestion
  brush.set("2H", "#8f8b84", 0.45);
  brush.line(35, 292, 565, 298);
  brush.set("HB", "#7f7a73", 0.4);
  brush.spline([
    [20, 305, 0.5],
    [130, 297, 0.4],
    [250, 301, 0.45],
    [395, 296, 0.42],
    [580, 304, 0.5]
  ], 0.15);

  // Masts
  let masts = [
    { x: 110, y0: 323, y1: 168, w: 0.42 },
    { x: 150, y0: 320, y1: 188, w: 0.34 },
    { x: 235, y0: 348, y1: 122, w: 0.52 },
    { x: 275, y0: 349, y1: 150, w: 0.38 },
    { x: 330, y0: 349, y1: 138, w: 0.36 },
    { x: 405, y0: 338, y1: 130, w: 0.5 },
    { x: 445, y0: 340, y1: 164, w: 0.33 },
    { x: 500, y0: 372, y1: 182, w: 0.34 }
  ];

  for (let m of masts) {
    brush.set("HB", "#756f68", m.w);
    brush.line(m.x, m.y0, m.x + random(-3, 3), m.y1);
    brush.set("2H", "#9a948d", m.w * 0.9);
    brush.line(m.x + random(-2, 2), m.y0 + 6, m.x + random(-5, 5), m.y1 + random(-6, 7));
  }

  // Cross spars and rigging
  brush.set("2H", "#918c86", 0.28);
  for (let i = 0; i < 16; i++) {
    let mx = random([110, 150, 235, 275, 330, 405, 445, 500]);
    let my = random(165, 305);
    brush.line(mx - random(12, 34), my, mx + random(10, 32), my + random(-2, 2));
  }

  // Rope curves
  brush.set("2H", "#908a83", 0.24);
  let riggings = [
    [[109, 325, 0.3], [136, 280, 0.22], [152, 224, 0.18], [150, 190, 0.2]],
    [[236, 348, 0.32], [220, 288, 0.2], [216, 225, 0.18], [235, 124, 0.15]],
    [[236, 348, 0.3], [272, 286, 0.18], [300, 214, 0.15], [330, 140, 0.12]],
    [[406, 338, 0.28], [379, 282, 0.18], [352, 224, 0.14], [332, 139, 0.12]],
    [[405, 338, 0.3], [432, 275, 0.2], [447, 212, 0.16], [445, 166, 0.12]],
    [[500, 372, 0.22], [476, 315, 0.14], [456, 250, 0.12], [446, 190, 0.1]]
  ];
  for (let pts of riggings) {
    brush.spline(pts, 0.35);
  }

  // Hull pencil edges
  brush.set("HB", "#6f6962", 0.38);
  for (let h of hulls) {
    brush.beginShape(0.25);
    for (let p of h) brush.vertex(p[0], p[1], random(0.25, 0.45));
    brush.endShape(true);
  }

  // Reflected graphite hints
  brush.set("2H", "#a19c95", 0.18);
  for (let m of masts) {
    brush.spline([
      [m.x + random(-2, 2), m.y0 + 4, 0.12],
      [m.x + random(-7, 7), m.y0 + 36, 0.1],
      [m.x + random(-12, 12), m.y0 + 78, 0.08],
      [m.x + random(-18, 18), m.y0 + 122, 0.06]
    ], 0.2);
  }

  // Foreground fog veil
  brush.noStroke();
  brush.fillTexture(0.6, 0.2);
  for (let i = 0; i < 6; i++) {
    let pts = harborBand(300, 410 + i * 28, 420, 38 + random(12, 28), 0.5, 26, 0.03 + i * 0.002);
    brush.fill("#f0ece4", random(18, 30));
    brush.fillBleed(0.55, "out");
    drawClosedShape(pts, 0.55);
  }

  noLoop();
}

function drawClosedShape(pts, curvature) {
  brush.beginShape(curvature);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
}

function harborBlob(cx, cy, rx, ry, count, nScale) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let nx = cos(a) * nScale + 100;
    let ny = sin(a) * nScale + 200;
    let rr = 0.8 + noise(nx, ny) * 0.45;
    let x = cx + cos(a) * rx * rr;
    let y = cy + sin(a) * ry * (0.85 + noise(nx + 20, ny + 20) * 0.3);
    pts.push([x, y]);
  }
  return pts;
}

function harborBand(cx, cy, rx, ry, wobble, count, nScale) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let mod = 1 + (noise(cos(a) * nScale + cx * 0.002, sin(a) * nScale + cy * 0.002) - 0.5) * wobble;
    let x = cx + cos(a) * rx * mod;
    let y = cy + sin(a) * ry * (0.8 + noise(50 + cos(a) * nScale, 60 + sin(a) * nScale) * 0.35);
    pts.push([x, y]);
  }
  return pts;
}

function hullShape(x, y, w, h) {
  return [
    [x - w * 0.52, y - h * 0.15],
    [x - w * 0.34, y - h * 0.45],
    [x + w * 0.18, y - h * 0.5],
    [x + w * 0.5, y - h * 0.2],
    [x + w * 0.42, y + h * 0.18],
    [x - w * 0.45, y + h * 0.2]
  ];
}

function centroid(pts) {
  let sx = 0;
  let sy = 0;
  for (let p of pts) {
    sx += p[0];
    sy += p[1];
  }
  return { x: sx / pts.length, y: sy / pts.length };
}

function scalePoints(pts, cx, cy, sx, sy) {
  let out = [];
  for (let p of pts) {
    out.push([lerp(cx, p[0], sx), lerp(cy, p[1], sy)]);
  }
  return out;
}