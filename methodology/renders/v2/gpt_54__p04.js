function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  drawPaperGrain();
  drawAura();
  drawNeckAndShoulders();
  drawFaceMass();
  drawFeatures();
  drawHair();
  drawEchoContours();

  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  for (let i = 0; i < 220; i++) {
    let y = random(height);
    let x1 = random(width);
    let x2 = x1 + random(8, 28);
    brush.set("2H", random(["#d9d0c2", "#e3d9ca", "#cfc4b3"]), random(0.22, 0.38));
    brush.line(x1, y, x2, y + random(-2, 2));
  }

  for (let i = 0; i < 120; i++) {
    let x = random(width);
    let y1 = random(height);
    let y2 = y1 + random(6, 24);
    brush.set("2H", "#e6ddd0", random(0.18, 0.28));
    brush.line(x, y1, x + random(-1, 1), y2);
  }
}

function drawAura() {
  let cx = 304;
  let cy = 255;

  let rings = [
    { rx: 180, ry: 210, color: "#8a6db1", angle: 25, weight: 0.8, dist: 8 },
    { rx: 165, ry: 195, color: "#568a8f", angle: 115, weight: 0.75, dist: 9 },
    { rx: 150, ry: 175, color: "#b56576", angle: 60, weight: 0.7, dist: 8 }
  ];

  for (let layer of rings) {
    let pts = organicOval(cx, cy, layer.rx, layer.ry, 44, 18, random(1000));
    brush.noFill();
    brush.hatchStyle("cpencil", layer.color, layer.weight);
    brush.hatch(layer.dist, layer.angle, { rand: 0.08, continuous: false, gradient: 0.2 });
    brush.beginShape(0.45);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawNeckAndShoulders() {
  let leftShoulder = [
    [155, 505], [130, 535], [120, 575], [200, 590], [270, 575], [255, 530], [220, 500]
  ];
  let rightShoulder = [
    [345, 505], [390, 525], [455, 575], [530, 585], [505, 535], [445, 490], [380, 475]
  ];
  let neck = [
    [248, 405], [232, 500], [272, 540], [332, 540], [365, 500], [345, 402]
  ];

  layeredCpencilShape(leftShoulder, "#6370a8", "#ab5e6c", 30, 105, 4.5, 5.5, 0.9, 0.7);
  layeredCpencilShape(rightShoulder, "#6d8f74", "#7b63a8", 145, 55, 5, 6, 0.9, 0.72);
  layeredCpencilShape(neck, "#8d7ab8", "#5f8a72", 92, 18, 4, 5, 0.8, 0.7);

  brush.set("HB", "#5a4d46", 0.6);
  sketchContour(leftShoulder, 0.35);
  sketchContour(rightShoulder, 0.35);
  sketchContour(neck, 0.4);
}

function drawFaceMass() {
  let cx = 300;
  let cy = 250;

  let face = organicOval(cx, cy, 92, 130, 40, 14, 200);
  let cheekWarm = scaledShape(face, cx, cy + 8, 0.86, 0.8);
  let innerCool = scaledShape(face, cx - 2, cy - 4, 0.72, 0.74);
  let shadowSide = sideShape(face, cx, 0.7, 1.0);

  layeredCpencilShape(face, "#7b63a8", "#d06a73", 22, 112, 5, 6, 0.95, 0.72);
  layeredCpencilShape(cheekWarm, "#cf7b54", "#b65c73", 150, 58, 5, 6, 0.78, 0.68);
  layeredCpencilShape(innerCool, "#5e8ea0", "#6a6bb0", 82, 130, 4, 5, 0.7, 0.62);

  brush.noFill();
  brush.hatchStyle("cpencil", "#4f5e91", 0.65);
  brush.hatch(4.2, 100, { rand: 0.07, continuous: false, gradient: 0.25 });
  brush.beginShape(0.42);
  for (let p of shadowSide) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.set("HB", "#5d4a47", 0.52);
  sketchContour(face, 0.45);
}

function drawFeatures() {
  drawEyes();
  drawNose();
  drawMouth();
  drawBrowAndPlanes();
}

function drawEyes() {
  let leftEye = [
    [228, 236], [242, 230], [262, 232], [276, 240], [262, 246], [243, 246]
  ];
  let rightEye = [
    [324, 238], [340, 231], [360, 233], [375, 242], [360, 247], [341, 247]
  ];

  layeredCpencilShape(leftEye, "#7180b9", "#c36b76", 18, 145, 4, 4.8, 0.55, 0.7);
  layeredCpencilShape(rightEye, "#6d8e7a", "#8f6ab0", 165, 28, 4, 4.8, 0.55, 0.7);

  brush.set("HB", "#534544", 0.55);
  brush.spline([[226, 239, 0.5], [244, 232, 0.8], [262, 233, 0.7], [277, 241, 0.45]], 0.45);
  brush.spline([[323, 241, 0.45], [341, 233, 0.8], [360, 234, 0.72], [376, 243, 0.45]], 0.45);

  brush.set("2B", "#433635", 0.42);
  brush.spline([[239, 240, 0.35], [249, 242, 0.8], [258, 241, 0.5]], 0.2);
  brush.spline([[339, 241, 0.35], [349, 243, 0.82], [358, 242, 0.5]], 0.2);

  brush.set("cpencil", "#8c5ea1", 0.42);
  brush.line(243, 248, 258, 252);
  brush.set("cpencil", "#5d8b8b", 0.42);
  brush.line(343, 249, 359, 253);

  brush.set("2H", "#9f9387", 0.32);
  brush.spline([[221, 257], [245, 260], [270, 257]], 0.4);
  brush.spline([[321, 258], [347, 261], [373, 257]], 0.4);
}

function drawNose() {
  brush.set("HB", "#66514e", 0.45);
  brush.spline([[295, 244, 0.4], [292, 271, 0.7], [291, 302, 0.5], [299, 323, 0.4]], 0.5);

  brush.set("cpencil", "#5a87a0", 0.48);
  brush.spline([[301, 246, 0.25], [306, 276, 0.55], [308, 304, 0.3]], 0.45);

  brush.set("cpencil", "#cc6c5f", 0.45);
  brush.spline([[281, 316, 0.25], [294, 323, 0.55], [306, 321, 0.4]], 0.35);

  brush.set("2B", "#4b3f3a", 0.34);
  brush.line(287, 323, 292, 326);
  brush.line(306, 323, 313, 327);
}

function drawMouth() {
  let upperLip = [
    [254, 368], [272, 358], [296, 362], [318, 356], [340, 366], [318, 372], [297, 374], [277, 372]
  ];
  let lowerLip = [
    [266, 376], [287, 386], [314, 386], [332, 376], [314, 395], [286, 394]
  ];

  layeredCpencilShape(upperLip, "#a4587e", "#7d65ab", 20, 145, 4, 4.8, 0.6, 0.72);
  layeredCpencilShape(lowerLip, "#cd7a66", "#9b5f8d", 165, 48, 4.5, 5, 0.62, 0.72);

  brush.set("HB", "#594744", 0.5);
  brush.spline([[253, 368, 0.4], [274, 359, 0.7], [296, 363, 0.55], [318, 357, 0.7], [340, 367, 0.4]], 0.45);
  brush.spline([[266, 377, 0.35], [287, 386, 0.7], [314, 386, 0.68], [332, 377, 0.35]], 0.42);

  brush.set("2H", "#ad9c8f", 0.28);
  brush.line(250, 353, 345, 351);
}

function drawBrowAndPlanes() {
  brush.set("cpencil", "#7f5ca8", 0.55);
  brush.spline([[217, 217, 0.35], [245, 205, 0.8], [277, 214, 0.45]], 0.4);
  brush.set("cpencil", "#5f8a70", 0.55);
  brush.spline([[321, 216, 0.35], [350, 206, 0.8], [384, 217, 0.45]], 0.4);

  brush.set("2H", "#aa9f92", 0.32);
  brush.spline([[218, 335], [244, 318], [266, 312]], 0.35);
  brush.spline([[337, 314], [358, 320], [382, 338]], 0.35);

  brush.set("cpencil", "#c06a57", 0.35);
  for (let i = 0; i < 16; i++) {
    let y = 260 + i * 7;
    brush.line(228 + random(-3, 3), y, 373 + random(-3, 3), y + random(-2, 2));
  }
}

function drawHair() {
  brush.noFill();
  brush.noHatch();

  let strands = 170;
  for (let i = 0; i < strands; i++) {
    let side = random() < 0.5 ? -1 : 1;
    let sx = 300 + random(-70, 70) + side * random(30, 95);
    let sy = 110 + random(-20, 45);
    let midx = 300 + side * random(85, 150) + random(-20, 20);
    let midy = 220 + random(-10, 80);
    let ex = 300 + side * random(95, 190) + random(-18, 18);
    let ey = 390 + random(30, 160);

    let c = random([
      "#6f62a8", "#587c8f", "#b95b6f", "#cf7b58", "#6a8b72", "#8b5a9a"
    ]);

    brush.set("cpencil", c, random(0.35, 0.8));
    brush.spline([
      [sx, sy, random(0.2, 0.5)],
      [midx, midy, random(0.6, 1.0)],
      [ex, ey, random(0.15, 0.45)]
    ], 0.55);
  }

  brush.set("HB", "#5a4d48", 0.45);
  brush.spline([[224, 128], [206, 184], [198, 245], [205, 330], [227, 412]], 0.5);
  brush.spline([[378, 125], [401, 183], [410, 253], [404, 339], [383, 420]], 0.5);

  brush.set("2B", "#433937", 0.38);
  for (let i = 0; i < 24; i++) {
    let x = 230 + i * 6;
    brush.line(x, 132 + random(-4, 4), x + random(-10, 10), 150 + random(-2, 8));
  }
}

function drawEchoContours() {
  let face = organicOval(300, 250, 92, 130, 40, 14, 200);

  brush.set("cpencil", "#7593a0", 0.42);
  sketchContour(offsetPoints(face, -10, 7), 0.45);

  brush.set("cpencil", "#b06b7f", 0.42);
  sketchContour(offsetPoints(face, 8, -6), 0.45);

  brush.set("2H", "#b3a89b", 0.26);
  brush.spline([[190, 300], [164, 332], [152, 380], [165, 430]], 0.45);
  brush.spline([[411, 301], [438, 334], [448, 382], [435, 430]], 0.45);
}

function layeredCpencilShape(points, c1, c2, a1, a2, d1, d2, w1, w2) {
  brush.noFill();

  brush.hatchStyle("cpencil", c1, w1);
  brush.hatch(d1, a1, { rand: 0.07, continuous: false, gradient: 0.22 });
  brush.beginShape(0.45);
  for (let p of points) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", c2, w2);
  brush.hatch(d2, a2, { rand: 0.08, continuous: false, gradient: 0.18 });
  brush.beginShape(0.45);
  for (let p of points) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function sketchContour(points, weight) {
  let pts = [];
  for (let i = 0; i < points.length; i += 3) {
    let p = points[i];
    pts.push([p[0] + random(-1.5, 1.5), p[1] + random(-1.5, 1.5), random(0.35, 0.8)]);
  }
  if (dist(pts[0][0], pts[0][1], pts[pts.length - 1][0], pts[pts.length - 1][1]) > 10) {
    pts.push([pts[0][0], pts[0][1], random(0.35, 0.7)]);
  }
  brush.strokeWeight(weight);
  brush.spline(pts, 0.5);
}

function organicOval(cx, cy, rx, ry, count, jitter, seedOffset) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let nx = cos(a) * 0.8 + seedOffset * 0.01;
    let ny = sin(a) * 0.8 + seedOffset * 0.02;
    let jr = map(noise(nx, ny), 0, 1, -jitter, jitter);
    let x = cx + cos(a) * (rx + jr);
    let y = cy + sin(a) * (ry + jr * 0.8);
    pts.push([x, y]);
  }
  return pts;
}

function scaledShape(points, cx, cy, sx, sy) {
  let out = [];
  for (let p of points) {
    out.push([
      lerp(cx, p[0], sx),
      lerp(cy, p[1], sy)
    ]);
  }
  return out;
}

function sideShape(points, cx, leftScale, verticalScale) {
  let out = [];
  for (let p of points) {
    let amt = p[0] < cx ? leftScale : 0.98;
    out.push([
      lerp(cx, p[0], amt),
      lerp(250, p[1], verticalScale)
    ]);
  }
  return out;
}

function offsetPoints(points, dx, dy) {
  let out = [];
  for (let p of points) out.push([p[0] + dx, p[1] + dy]);
  return out;
}