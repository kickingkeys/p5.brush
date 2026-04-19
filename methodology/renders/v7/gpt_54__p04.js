function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(12);
  noiseSeed(12);

  drawPaperWhisper();
  drawPortrait();

  noLoop();
}

function drawPaperWhisper() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noWash();
  brush.noField();

  for (let i = 0; i < 120; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(8, 28);
    let ang = random(-20, 20);
    let c = random([
      "#efe4d2",
      "#eadfcb",
      "#f2e8d8",
      "#e6d7c1"
    ]);
    brush.set("2H", c, random(0.28, 0.5));
    brush.beginStroke("segments", x, y);
    brush.move(ang, len, random(0.35, 0.7));
    brush.endStroke(ang + random(-8, 8), random(0.25, 0.6));
  }
}

function drawPortrait() {
  let cx = 300;
  let cy = 310;

  let head = organicOval(cx, cy, 112, 145, 36, 18, 0.9);
  let neck = [
    [258, 430],
    [341, 430],
    [360, 560],
    [235, 560]
  ];
  let leftHair = organicBlob(228, 286, 95, 150, 28, 22, 33);
  let rightHair = organicBlob(370, 290, 82, 143, 26, 24, 79);
  let shoulderL = [
    [120, 600],
    [182, 506],
    [266, 458],
    [282, 600]
  ];
  let shoulderR = [
    [480, 600],
    [418, 505],
    [336, 454],
    [321, 600]
  ];

  let leftCheekShadow = scaledShape(head, cx - 16, cy + 8, 0.62, 0.78, -18, 8);
  let rightTempleShadow = scaledShape(head, cx + 14, cy - 18, 0.45, 0.54, 20, -8);
  let jawShadow = scaledShape(head, cx, cy + 42, 0.52, 0.34, 0, 12);
  let foreheadLight = scaledShape(head, cx, cy - 50, 0.42, 0.26, 0, -8);
  let nosePlane = [
    [299, 250],
    [286, 322],
    [300, 365],
    [316, 323]
  ];
  let mouthPlane = [
    [262, 380],
    [298, 371],
    [336, 378],
    [302, 405]
  ];

  hatchLayer(head, [
    { color: "#88a9c9", angle: 18, dist: 5, weight: 0.8 },
    { color: "#d86f8f", angle: 76, dist: 6, weight: 0.75 },
    { color: "#c59b49", angle: 128, dist: 7, weight: 0.65 }
  ]);

  hatchLayer(leftCheekShadow, [
    { color: "#7d5ca8", angle: 35, dist: 4, weight: 0.95 },
    { color: "#324d77", angle: 102, dist: 5, weight: 0.75 }
  ]);

  hatchLayer(rightTempleShadow, [
    { color: "#7b7aa8", angle: 145, dist: 5, weight: 0.8 },
    { color: "#c96a5d", angle: 75, dist: 6, weight: 0.65 }
  ]);

  hatchLayer(jawShadow, [
    { color: "#4f5c88", angle: 18, dist: 4, weight: 0.95 },
    { color: "#8f4b64", angle: 92, dist: 5, weight: 0.72 }
  ]);

  hatchLayer(foreheadLight, [
    { color: "#d8b65f", angle: 22, dist: 7, weight: 0.55 },
    { color: "#9eb9c7", angle: 96, dist: 8, weight: 0.45 }
  ]);

  hatchLayer(nosePlane, [
    { color: "#a65f8b", angle: 92, dist: 4, weight: 0.7 },
    { color: "#5f7e9d", angle: 25, dist: 6, weight: 0.55 }
  ]);

  hatchLayer(mouthPlane, [
    { color: "#b34d61", angle: 8, dist: 4, weight: 0.8 },
    { color: "#6a4e86", angle: 142, dist: 6, weight: 0.55 }
  ]);

  hatchLayer(leftHair, [
    { color: "#253250", angle: 84, dist: 4, weight: 1.1 },
    { color: "#5d3f72", angle: 112, dist: 5, weight: 0.9 },
    { color: "#9d6a43", angle: 68, dist: 7, weight: 0.6 }
  ]);

  hatchLayer(rightHair, [
    { color: "#213046", angle: 98, dist: 4, weight: 1.05 },
    { color: "#6e4d7b", angle: 126, dist: 5, weight: 0.82 },
    { color: "#ab744e", angle: 72, dist: 7, weight: 0.55 }
  ]);

  hatchLayer(neck, [
    { color: "#7890aa", angle: 20, dist: 6, weight: 0.75 },
    { color: "#bc6f7a", angle: 106, dist: 6, weight: 0.65 }
  ]);

  hatchLayer(shoulderL, [
    { color: "#54698f", angle: 28, dist: 6, weight: 0.85 },
    { color: "#a05a73", angle: 120, dist: 7, weight: 0.65 }
  ]);

  hatchLayer(shoulderR, [
    { color: "#4d6786", angle: 152, dist: 6, weight: 0.85 },
    { color: "#9f5d62", angle: 58, dist: 7, weight: 0.65 }
  ]);

  drawGhostFeatures(cx, cy);
  drawContours(head, neck, leftHair, rightHair);
  drawAura(cx, cy);
}

function hatchLayer(points, layers) {
  brush.noFill();
  for (let l of layers) {
    brush.hatchStyle("cpencil", l.color, l.weight);
    brush.hatch(l.dist, l.angle, { rand: 0.08, continuous: false, gradient: false });
    brush.beginShape(0.42);
    for (let p of points) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawGhostFeatures(cx, cy) {
  brush.noFill();
  brush.noHatch();

  brush.set("cpencil", "#3d4f80", 0.75);
  brush.spline([
    [250, 279, 0.35],
    [269, 267, 0.85],
    [291, 271, 0.55]
  ], 0.55);
  brush.spline([
    [311, 272, 0.35],
    [332, 266, 0.8],
    [351, 279, 0.5]
  ], 0.55);

  brush.set("cpencil", "#7b4a6e", 0.55);
  brush.spline([
    [246, 286, 0.35],
    [267, 284, 0.5],
    [292, 288, 0.3]
  ], 0.42);
  brush.spline([
    [309, 288, 0.3],
    [333, 283, 0.52],
    [355, 287, 0.34]
  ], 0.42);

  brush.set("cpencil", "#6d5f9e", 0.7);
  brush.spline([
    [302, 245, 0.35],
    [296, 278, 0.7],
    [292, 312, 0.75],
    [298, 348, 0.45]
  ], 0.38);

  brush.set("cpencil", "#c55b67", 0.7);
  brush.spline([
    [267, 383, 0.35],
    [284, 374, 0.55],
    [301, 378, 0.75],
    [319, 374, 0.55],
    [336, 382, 0.35]
  ], 0.62);

  brush.set("cpencil", "#8c5167", 0.45);
  brush.spline([
    [274, 394, 0.25],
    [300, 401, 0.5],
    [327, 394, 0.25]
  ], 0.5);

  brush.set("cpencil", "#4d6a8f", 0.5);
  brush.line(234, 326, 252, 355);
  brush.line(366, 324, 348, 356);

  for (let i = 0; i < 18; i++) {
    let ex = random(252, 348);
    let ey = random(250, 403);
    brush.set("cpencil", random(["#6b82a8", "#b85b76", "#9b7c43", "#6f5ca0"]), random(0.28, 0.52));
    brush.beginStroke("segments", ex, ey);
    brush.move(random(0, 180), random(6, 18), random(0.2, 0.7));
    brush.endStroke(random(0, 180), random(0.15, 0.5));
  }
}

function drawContours(head, neck, leftHair, rightHair) {
  brush.noHatch();
  brush.noFill();

  sketchContour(head, "#4f6183", 0.55, 0.18);
  sketchContour(head, "#b36b75", 0.45, 0.24);

  sketchContour(neck, "#6e6f8d", 0.5, 0.12);

  sketchContour(leftHair, "#2d3550", 0.8, 0.3);
  sketchContour(leftHair, "#7a587d", 0.55, 0.35);

  sketchContour(rightHair, "#2c344f", 0.8, 0.3);
  sketchContour(rightHair, "#7a5678", 0.55, 0.35);

  brush.set("cpencil", "#29344e", 0.8);
  for (let i = 0; i < 26; i++) {
    let x = random(214, 388);
    let y = random(160, 412);
    let len = random(18, 52);
    brush.beginStroke("segments", x, y);
    brush.move(random(74, 122), len, random(0.35, 0.9));
    brush.endStroke(random(74, 122), random(0.2, 0.6));
  }

  brush.set("cpencil", "#a86f45", 0.42);
  for (let i = 0; i < 18; i++) {
    let x = random(230, 377);
    let y = random(164, 398);
    brush.beginStroke("segments", x, y);
    brush.move(random(70, 112), random(14, 34), random(0.3, 0.7));
    brush.endStroke(random(70, 112), random(0.15, 0.45));
  }
}

function sketchContour(points, col, wt, jitterAmt) {
  brush.set("cpencil", col, wt);
  let pts = [];
  for (let p of points) {
    pts.push([
      p[0] + random(-jitterAmt * 20, jitterAmt * 20),
      p[1] + random(-jitterAmt * 20, jitterAmt * 20),
      random(0.3, 0.9)
    ]);
  }
  pts.push(pts[0]);
  brush.spline(pts, 0.48);
}

function drawAura(cx, cy) {
  brush.noFill();
  brush.noHatch();

  let rings = [
    { rx: 145, ry: 182, c: "#d9b766", w: 0.32 },
    { rx: 162, ry: 198, c: "#9a86bf", w: 0.28 },
    { rx: 183, ry: 220, c: "#89a8c0", w: 0.26 }
  ];

  for (let ring of rings) {
    for (let k = 0; k < 2; k++) {
      let pts = [];
      for (let i = 0; i < 34; i++) {
        let a = map(i, 0, 34, 0, 360);
        let r1 = ring.rx + random(-10, 10);
        let r2 = ring.ry + random(-12, 12);
        let x = cx + cos(a) * r1;
        let y = cy + sin(a) * r2;
        pts.push([x, y, random(0.2, 0.7)]);
      }
      brush.set("cpencil", ring.c, ring.w);
      brush.spline(pts, 0.58);
    }
  }
}

function organicOval(cx, cy, rx, ry, steps, jitterX, jitterY) {
  let pts = [];
  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps, 0, 360);
    let nx = cos(a) * 0.7 + 10;
    let ny = sin(a) * 0.7 + 20;
    let jx = map(noise(nx, ny), 0, 1, -jitterX, jitterX);
    let jy = map(noise(nx + 50, ny + 50), 0, 1, -jitterY, jitterY);
    let x = cx + cos(a) * (rx + jx);
    let y = cy + sin(a) * (ry + jy);
    pts.push([x, y]);
  }
  return pts;
}

function organicBlob(cx, cy, rx, ry, steps, rough, seedShift) {
  let pts = [];
  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps, 0, 360);
    let n = noise(seedShift + cos(a) * 0.8 + 20, seedShift + sin(a) * 0.8 + 40);
    let m = map(n, 0, 1, -rough, rough);
    let x = cx + cos(a) * (rx + m);
    let y = cy + sin(a) * (ry + m * 1.3);
    pts.push([x, y]);
  }
  return pts;
}

function scaledShape(points, cx, cy, sx, sy, dx, dy) {
  let out = [];
  for (let p of points) {
    out.push([
      cx + (p[0] - cx) * sx + dx,
      cy + (p[1] - cy) * sy + dy
    ]);
  }
  return out;
}