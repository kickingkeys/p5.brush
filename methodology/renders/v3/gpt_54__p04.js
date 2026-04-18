function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noLoop();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(11);
  noiseSeed(11);

  drawPaperGrain();
  drawPortrait();
  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  for (let i = 0; i < 260; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(4, 12);
    let a = random(-20, 20);
    let c = random(["#d9cfbe", "#e8decc", "#cfc3b1"]);
    brush.set("2H", c, random(0.25, 0.45));
    brush.beginStroke("segments", x, y);
    brush.move(a, len, random(0.4, 0.9));
    brush.endStroke(a + random(-10, 10), random(0.3, 0.8));
  }
}

function drawPortrait() {
  let cx = 300;
  let cy = 320;

  let head = organicOval(cx, cy, 115, 145, 34, 0.11, 10);
  let neck = [
    [255, 445],
    [275, 432],
    [325, 432],
    [346, 446],
    [337, 535],
    [266, 535]
  ];

  let leftCheek = scaledPoly(head, cx, cy + 15, 0.82);
  let rightCheek = offsetPoly(scaledPoly(head, cx, cy + 18, 0.72), 10, 0);
  let forehead = moveToward(head, cx, cy - 40, 0.72);
  let nosePlane = [
    [298, 265],
    [314, 274],
    [322, 315],
    [314, 372],
    [299, 381],
    [286, 368],
    [288, 319]
  ];
  let leftEyeZone = organicOval(250, 303, 44, 22, 16, 0.16, 30);
  let rightEyeZone = organicOval(349, 304, 41, 21, 16, 0.16, 50);
  let mouthZone = organicOval(302, 400, 52, 20, 18, 0.18, 70);
  let jawShadow = [
    [225, 382],
    [247, 440],
    [301, 467],
    [356, 440],
    [379, 380],
    [348, 430],
    [299, 455],
    [250, 430]
  ];
  let hairMass = hairShape(cx, cy - 72);

  layerCpencil(head, [
    { color: "#d49a6a", angle: 18, dist: 5.0, weight: 0.78, rand: 0.08 },
    { color: "#a86f95", angle: 72, dist: 5.4, weight: 0.7, rand: 0.08 },
    { color: "#6f8c78", angle: 128, dist: 6.0, weight: 0.62, rand: 0.07 }
  ]);

  layerCpencil(forehead, [
    { color: "#8d6aa8", angle: 20, dist: 6.5, weight: 0.55, rand: 0.06 },
    { color: "#d6a25d", angle: 105, dist: 7.0, weight: 0.45, rand: 0.05 }
  ]);

  layerCpencil(leftCheek, [
    { color: "#ce6e7f", angle: 30, dist: 4.2, weight: 0.68, rand: 0.08 },
    { color: "#5f86a6", angle: 88, dist: 5.4, weight: 0.52, rand: 0.07 },
    { color: "#d39b5c", angle: 142, dist: 6.2, weight: 0.48, rand: 0.06 }
  ]);

  layerCpencil(rightCheek, [
    { color: "#6a8c7c", angle: 22, dist: 4.3, weight: 0.66, rand: 0.08 },
    { color: "#af6d86", angle: 78, dist: 5.1, weight: 0.56, rand: 0.07 },
    { color: "#7d78b0", angle: 132, dist: 6.0, weight: 0.46, rand: 0.06 }
  ]);

  layerCpencil(nosePlane, [
    { color: "#6e86b0", angle: 88, dist: 4.0, weight: 0.58, rand: 0.06 },
    { color: "#cf875c", angle: 22, dist: 4.5, weight: 0.52, rand: 0.05 }
  ]);

  layerCpencil(jawShadow, [
    { color: "#5e748f", angle: 38, dist: 4.6, weight: 0.7, rand: 0.08 },
    { color: "#786294", angle: 110, dist: 5.0, weight: 0.62, rand: 0.07 },
    { color: "#99624c", angle: 155, dist: 6.0, weight: 0.44, rand: 0.06 }
  ]);

  layerCpencil(neck, [
    { color: "#cf8a64", angle: 12, dist: 5.0, weight: 0.72, rand: 0.08 },
    { color: "#7d89ac", angle: 74, dist: 6.0, weight: 0.54, rand: 0.06 },
    { color: "#7b9a79", angle: 128, dist: 6.8, weight: 0.46, rand: 0.05 }
  ]);

  layerCpencil(hairMass, [
    { color: "#4c3b52", angle: 55, dist: 3.6, weight: 1.0, rand: 0.1 },
    { color: "#274e5c", angle: 102, dist: 4.4, weight: 0.85, rand: 0.1 },
    { color: "#8e5f42", angle: 146, dist: 5.0, weight: 0.72, rand: 0.08 }
  ]);

  scribbleContour(head, [
    ["#7b5f99", 0.7],
    ["#3f6d7d", 0.55],
    ["#9b6a50", 0.45]
  ], 0.32);

  scribbleContour(hairMass, [
    ["#2e2b35", 0.95],
    ["#355566", 0.7],
    ["#6f4c3f", 0.52]
  ], 0.38);

  eyeNest(250, 303, 1.0, true);
  eyeNest(349, 304, 0.95, false);
  noseMarks();
  mouthMarks();
  shoulderHints();

  auraMarks(cx, cy);
}

function layerCpencil(poly, layers) {
  brush.noFill();
  brush.noMass();
  brush.noField();

  for (let cfg of layers) {
    brush.hatchStyle("cpencil", cfg.color, cfg.weight);
    brush.hatch(cfg.dist, cfg.angle, {
      rand: cfg.rand,
      continuous: false,
      gradient: 0.12
    });
    drawPolyShape(poly, 0.42);
    brush.noHatch();
  }
}

function scribbleContour(poly, colors, curvature) {
  for (let i = 0; i < colors.length; i++) {
    let col = colors[i][0];
    let wt = colors[i][1];
    let pts = jitteredPoly(poly, 2.5 + i * 1.8);
    brush.set("cpencil", col, wt);
    brush.beginShape(curvature);
    for (let p of pts) {
      brush.vertex(p[0], p[1], random(0.7, 1.15));
    }
    brush.endShape(true);
  }
}

function eyeNest(x, y, s, leftSide) {
  let upper = [
    [x - 28 * s, y + 2 * s],
    [x - 14 * s, y - 10 * s],
    [x + 3 * s, y - 12 * s],
    [x + 18 * s, y - 8 * s],
    [x + 30 * s, y + 0 * s]
  ];
  let lower = [
    [x - 29 * s, y + 2 * s],
    [x - 10 * s, y + 9 * s],
    [x + 8 * s, y + 10 * s],
    [x + 28 * s, y + 2 * s]
  ];

  brush.set("cpencil", "#5f678e", 0.6);
  brush.spline(addPressure(upper, 0.55, 0.95), 0.45);
  brush.set("cpencil", "#a5606d", 0.45);
  brush.spline(addPressure(lower, 0.4, 0.8), 0.4);

  let irisCols = leftSide
    ? ["#567a86", "#7c5da4", "#3f4857"]
    : ["#8f6b55", "#58708c", "#4e4258"];

  for (let i = 0; i < 3; i++) {
    let r = 7 - i * 1.7;
    let col = irisCols[i];
    let ring = organicOval(x + random(-1, 1), y + random(0, 2), 10 * s - i * 1.6, 10 * s - i * 1.4, 16, 0.09, i * 20);
    brush.hatchStyle("cpencil", col, 0.45 - i * 0.05);
    brush.hatch(2.8 + i * 0.8, 35 + i * 50, { rand: 0.08, continuous: false, gradient: 0.1 });
    drawPolyShape(ring, 0.3);
    brush.noHatch();
  }

  brush.set("cpencil", "#2a2a33", 0.42);
  for (let i = 0; i < 7; i++) {
    let px = x + random(-4, 4);
    let py = y + random(-3, 4);
    brush.line(px, py, px + random(-2, 2), py + random(-2, 2));
  }

  let brow = leftSide
    ? [[x - 34, y - 24], [x - 14, y - 34], [x + 9, y - 31], [x + 31, y - 21]]
    : [[x - 33, y - 19], [x - 11, y - 30], [x + 12, y - 31], [x + 35, y - 23]];
  brush.set("cpencil", leftSide ? "#6e5467" : "#4f6571", 0.55);
  brush.spline(addPressure(brow, 0.45, 0.9), 0.35);

  for (let i = 0; i < 20; i++) {
    let ex = x + random(-24, 24);
    let ey = y + random(-16, 16);
    brush.set("cpencil", random(["#c07d66", "#7986a8", "#8e6b9e", "#718b78"]), random(0.22, 0.38));
    brush.line(ex, ey, ex + random(-7, 7), ey + random(-4, 4));
  }
}

function noseMarks() {
  brush.noHatch();
  let bridge = [
    [300, 246],
    [297, 272],
    [295, 298],
    [296, 326],
    [299, 353]
  ];
  brush.set("cpencil", "#7584b2", 0.42);
  brush.spline(addPressure(bridge, 0.35, 0.75), 0.32);

  let tip = [
    [286, 369],
    [294, 378],
    [309, 381],
    [320, 373]
  ];
  brush.set("cpencil", "#bf765e", 0.5);
  brush.spline(addPressure(tip, 0.45, 0.85), 0.5);

  brush.set("cpencil", "#7b5f93", 0.35);
  brush.line(291, 366, 286, 374);
  brush.set("cpencil", "#5b687f", 0.35);
  brush.line(312, 369, 318, 375);

  for (let i = 0; i < 26; i++) {
    let x = random(279, 323);
    let y = random(260, 385);
    brush.set("cpencil", random(["#c58d64", "#7986ab", "#8c6a99", "#6c907f"]), random(0.18, 0.3));
    brush.line(x, y, x + random(-5, 5), y + random(-7, 7));
  }
}

function mouthMarks() {
  let upper = [
    [258, 398],
    [277, 390],
    [300, 389],
    [324, 391],
    [344, 399]
  ];
  let lower = [
    [257, 400],
    [279, 413],
    [299, 417],
    [322, 414],
    [344, 400]
  ];

  brush.set("cpencil", "#a24f6d", 0.62);
  brush.spline(addPressure(upper, 0.4, 0.95), 0.45);
  brush.set("cpencil", "#7e6aa6", 0.44);
  brush.spline(addPressure(lower, 0.35, 0.8), 0.45);

  let mouthArea = organicOval(301, 402, 48, 18, 18, 0.15, 19);
  layerCpencil(mouthArea, [
    { color: "#c86d6c", angle: 14, dist: 4.0, weight: 0.4, rand: 0.08 },
    { color: "#7a6b9f", angle: 164, dist: 5.0, weight: 0.32, rand: 0.06 }
  ]);

  brush.set("cpencil", "#5f7493", 0.28);
  brush.line(251, 401, 242, 404);
  brush.line(349, 401, 357, 404);
}

function shoulderHints() {
  let leftShoulder = [
    [146, 570],
    [182, 541],
    [224, 520],
    [267, 519],
    [236, 557],
    [208, 589]
  ];
  let rightShoulder = [
    [332, 518],
    [376, 518],
    [419, 538],
    [455, 571],
    [392, 590],
    [360, 554]
  ];

  layerCpencil(leftShoulder, [
    { color: "#7587aa", angle: 26, dist: 6.0, weight: 0.56, rand: 0.08 },
    { color: "#9a6a55", angle: 118, dist: 7.0, weight: 0.42, rand: 0.06 }
  ]);

  layerCpencil(rightShoulder, [
    { color: "#6b8a7a", angle: 152, dist: 6.0, weight: 0.56, rand: 0.08 },
    { color: "#8c679c", angle: 70, dist: 7.2, weight: 0.42, rand: 0.06 }
  ]);

  brush.set("cpencil", "#6c6a76", 0.5);
  brush.spline(addPressure([[184, 545], [135, 571], [96, 599]], 0.4, 0.9), 0.35);
  brush.spline(addPressure([[378, 540], [434, 573], [500, 600]], 0.4, 0.9), 0.35);
}

function auraMarks(cx, cy) {
  for (let i = 0; i < 120; i++) {
    let a = random(360);
    let r = random(140, 240);
    let x = cx + cos(a) * r + random(-20, 20);
    let y = cy + sin(a) * r + random(-20, 20);
    let len = random(10, 28);
    let dir = a + random(70, 110);
    brush.set("cpencil", random(["#8e6aa8", "#6f8faa", "#c28267", "#7f9a79", "#b56c83"]), random(0.2, 0.42));
    brush.beginStroke("segments", x, y);
    brush.move(dir, len, random(0.3, 0.8));
    brush.endStroke(dir + random(-20, 20), random(0.2, 0.7));
  }

  for (let i = 0; i < 18; i++) {
    let sx = random(120, 480);
    let sy = random(90, 520);
    let pts = [];
    let count = int(random(3, 6));
    for (let j = 0; j < count; j++) {
      pts.push([sx + j * random(10, 22), sy + random(-12, 12), random(0.3, 0.9)]);
    }
    brush.set("cpencil", random(["#8a6cb2", "#6987a5", "#b76a61"]), random(0.22, 0.34));
    brush.spline(pts, 0.5);
  }
}

function drawPolyShape(poly, curvature) {
  brush.beginShape(curvature);
  for (let p of poly) {
    brush.vertex(p[0], p[1], 1);
  }
  brush.endShape(true);
}

function organicOval(cx, cy, rx, ry, steps, jitterAmt, nOff) {
  let pts = [];
  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps, 0, 360);
    let nx = cos(a) * 0.8 + nOff;
    let ny = sin(a) * 0.8 + nOff * 0.37;
    let jr = map(noise(nx * 0.03, ny * 0.03), 0, 1, -1, 1);
    let rrX = rx * (1 + jr * jitterAmt);
    let rrY = ry * (1 + jr * jitterAmt * 0.9);
    pts.push([cx + cos(a) * rrX, cy + sin(a) * rrY]);
  }
  return pts;
}

function hairShape(cx, cy) {
  let top = organicOval(cx, cy, 135, 150, 26, 0.16, 80);
  let pts = [];
  for (let p of top) {
    if (p[1] < cy + 80) pts.push(p);
  }
  pts.push([410, 395]);
  pts.push([388, 470]);
  pts.push([336, 518]);
  pts.push([269, 519]);
  pts.push([212, 470]);
  pts.push([190, 393]);
  return pts;
}

function scaledPoly(poly, cx, cy, s) {
  let out = [];
  for (let p of poly) {
    out.push([lerp(cx, p[0], s), lerp(cy, p[1], s)]);
  }
  return out;
}

function moveToward(poly, tx, ty, amt) {
  let out = [];
  for (let p of poly) {
    out.push([lerp(tx, p[0], amt), lerp(ty, p[1], amt)]);
  }
  return out;
}

function offsetPoly(poly, dx, dy) {
  let out = [];
  for (let p of poly) out.push([p[0] + dx, p[1] + dy]);
  return out;
}

function jitteredPoly(poly, amt) {
  let out = [];
  for (let p of poly) {
    out.push([p[0] + random(-amt, amt), p[1] + random(-amt, amt)]);
  }
  return out;
}

function addPressure(pts, minP, maxP) {
  let out = [];
  for (let i = 0; i < pts.length; i++) {
    let t = pts.length <= 1 ? 0 : i / (pts.length - 1);
    let p = lerp(minP, maxP, sin(t * 180));
    out.push([pts[i][0], pts[i][1], p]);
  }
  return out;
}