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

  noFill();

  drawAura();
  drawNeckAndShoulders();
  drawHeadMass();
  drawHairMass();
  drawFeatures();
  drawContourFragments();
  drawMemoryStrokes();

  noLoop();
}

function drawAura() {
  for (let i = 0; i < 180; i++) {
    let x = random(90, 510);
    let y = random(70, 530);
    let len = random(10, 28);
    let a = random(-40, 140);

    brush.set("cpencil", random([
      "#6c6fa8", "#b65c7a", "#4c7a6d", "#c48a52", "#8f5aa8", "#5e7fa6"
    ]), random(0.35, 0.7));
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }

  for (let i = 0; i < 120; i++) {
    let x = random(120, 480);
    let y = random(100, 520);
    let len = random(8, 18);
    let a = random(0, 360);

    brush.set("2H", random(["#c8b8d8", "#b9c7de", "#d7b8b0", "#b7d0c1"]), random(0.25, 0.5));
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }
}

function drawNeckAndShoulders() {
  let neck = [
    [270, 405], [290, 400], [308, 402], [327, 410],
    [330, 500], [265, 500]
  ];

  layeredRegion(neck, [
    { color: "#c48770", angle: 92, dist: 7, weight: 0.75 },
    { color: "#8a6aa6", angle: 118, dist: 8, weight: 0.6 },
    { color: "#5f7c88", angle: 70, dist: 9, weight: 0.55 }
  ], 0.35);

  let leftShoulder = [
    [125, 505], [180, 470], [250, 452], [292, 470],
    [300, 555], [120, 555]
  ];

  let rightShoulder = [
    [308, 470], [365, 450], [450, 470], [505, 520],
    [490, 555], [300, 555]
  ];

  layeredRegion(leftShoulder, [
    { color: "#7d5ca8", angle: 28, dist: 8, weight: 0.9 },
    { color: "#516e74", angle: 70, dist: 10, weight: 0.75 },
    { color: "#c27863", angle: 118, dist: 11, weight: 0.7 }
  ], 0.25);

  layeredRegion(rightShoulder, [
    { color: "#9d4f6a", angle: 155, dist: 8, weight: 0.9 },
    { color: "#5b7296", angle: 112, dist: 10, weight: 0.75 },
    { color: "#a28149", angle: 60, dist: 11, weight: 0.7 }
  ], 0.25);
}

function drawHeadMass() {
  let head = organicOval(300, 255, 104, 142, 34, 0.8, 0.22);

  layeredRegion(head, [
    { color: "#d28d73", angle: 95, dist: 6, weight: 0.85 },
    { color: "#b56a7d", angle: 35, dist: 7, weight: 0.7 },
    { color: "#6f83b3", angle: 145, dist: 8, weight: 0.65 },
    { color: "#8b9a6d", angle: 72, dist: 9, weight: 0.55 }
  ], 0.42);

  let leftCheekShadow = scalePolygon(head, 280, 275, 0.55);
  offsetPolygon(leftCheekShadow, -26, 10);
  layeredRegion(leftCheekShadow, [
    { color: "#7a5aa6", angle: 118, dist: 5, weight: 0.6 },
    { color: "#566d97", angle: 78, dist: 6, weight: 0.5 }
  ], 0.25);

  let rightTempleLight = scalePolygon(head, 330, 225, 0.32);
  offsetPolygon(rightTempleLight, 18, -18);
  layeredRegion(rightTempleLight, [
    { color: "#d8a05e", angle: 25, dist: 7, weight: 0.42 },
    { color: "#c57a85", angle: 140, dist: 8, weight: 0.35 }
  ], 0.18);
}

function drawHairMass() {
  let hair = [
    [190, 150], [215, 104], [262, 76], [320, 70], [377, 88], [416, 125],
    [434, 185], [430, 255], [420, 332], [395, 395], [360, 430], [335, 418],
    [342, 362], [365, 300], [373, 232], [362, 166], [330, 118], [285, 104],
    [245, 118], [217, 154], [202, 214], [203, 290], [214, 358], [235, 412],
    [212, 430], [181, 376], [168, 295], [170, 214]
  ];

  layeredRegion(hair, [
    { color: "#4f4b69", angle: 108, dist: 5, weight: 1.0 },
    { color: "#7d4f76", angle: 62, dist: 7, weight: 0.8 },
    { color: "#4e6a60", angle: 142, dist: 8, weight: 0.65 }
  ], 0.22);

  for (let i = 0; i < 170; i++) {
    let x = random(180, 420);
    let y = random(85, 430);
    if (insideEllipse(x, y, 300, 245, 135, 185)) {
      let len = random(16, 46);
      let a = random(70, 125);
      brush.set("cpencil", random(["#332f48", "#714a72", "#4a6256", "#5b537c"]), random(0.35, 0.8));
      brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
    }
  }
}

function drawFeatures() {
  let leftEye = [
    [242, 245], [256, 238], [272, 238], [286, 246],
    [274, 252], [256, 252]
  ];
  let rightEye = [
    [317, 245], [333, 238], [350, 239], [364, 248],
    [349, 253], [330, 252]
  ];
  let nose = [
    [300, 258], [292, 286], [289, 314], [301, 332], [316, 325], [309, 308]
  ];
  let mouth = [
    [252, 355], [272, 346], [297, 343], [323, 347], [348, 357],
    [325, 366], [298, 370], [270, 367]
  ];
  let leftUnderEye = [
    [236, 254], [254, 257], [274, 257], [286, 265], [250, 272]
  ];
  let rightUnderEye = [
    [316, 257], [336, 257], [358, 261], [367, 270], [328, 272]
  ];

  layeredRegion(leftEye, [
    { color: "#4e5f97", angle: 10, dist: 3.8, weight: 0.45 },
    { color: "#8f546d", angle: 145, dist: 4.4, weight: 0.35 }
  ], 0.12);

  layeredRegion(rightEye, [
    { color: "#4e5f97", angle: 170, dist: 3.8, weight: 0.45 },
    { color: "#8f546d", angle: 30, dist: 4.4, weight: 0.35 }
  ], 0.12);

  layeredRegion(leftUnderEye, [
    { color: "#8b77aa", angle: 18, dist: 5.5, weight: 0.3 }
  ], 0.08);

  layeredRegion(rightUnderEye, [
    { color: "#8b77aa", angle: 162, dist: 5.5, weight: 0.3 }
  ], 0.08);

  layeredRegion(nose, [
    { color: "#7b679d", angle: 92, dist: 4.5, weight: 0.38 },
    { color: "#c07b62", angle: 138, dist: 5.5, weight: 0.3 }
  ], 0.1);

  layeredRegion(mouth, [
    { color: "#a34764", angle: 8, dist: 4.5, weight: 0.48 },
    { color: "#7a4f8a", angle: 150, dist: 5, weight: 0.35 },
    { color: "#c6845c", angle: 90, dist: 6, weight: 0.28 }
  ], 0.12);

  brush.set("2B", "#5f4a58", 0.7);
  brush.spline([
    [238, 248, 0.45], [252, 242, 0.55], [270, 242, 0.5], [286, 247, 0.4]
  ], 0.45);
  brush.spline([
    [318, 247, 0.45], [334, 242, 0.55], [349, 242, 0.5], [363, 249, 0.4]
  ], 0.45);

  brush.set("HB", "#6a5370", 0.45);
  brush.spline([
    [255, 221, 0.2], [269, 214, 0.35], [285, 216, 0.2]
  ], 0.4);
  brush.spline([
    [319, 218, 0.2], [335, 212, 0.35], [353, 217, 0.2]
  ], 0.4);

  brush.set("HB", "#745c67", 0.45);
  brush.spline([
    [301, 259, 0.2], [296, 285, 0.4], [294, 313, 0.25], [304, 331, 0.2]
  ], 0.35);

  brush.set("2B", "#7a4258", 0.55);
  brush.spline([
    [253, 356, 0.28], [273, 348, 0.45], [297, 346, 0.4], [323, 349, 0.45], [347, 357, 0.28]
  ], 0.35);
  brush.set("HB", "#815e84", 0.35);
  brush.spline([
    [269, 367, 0.2], [298, 370, 0.25], [325, 364, 0.2]
  ], 0.35);

  for (let i = 0; i < 32; i++) {
    let x = random(240, 360);
    let y = random(215, 378);
    let len = random(6, 15);
    let a = random(0, 180);
    brush.set("cpencil", random(["#b06b83", "#6a7cb0", "#7b9364", "#c18c5c"]), random(0.2, 0.38));
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }
}

function drawContourFragments() {
  brush.set("HB", "#7e6978", 0.42);
  brokenContour(organicOval(300, 255, 104, 142, 34, 0.8, 0.22), 0.55, 14);

  brush.set("2H", "#b49ea6", 0.25);
  brokenContour(organicOval(300, 255, 114, 152, 34, 0.8, 0.26), 0.35, 22);

  brush.set("HB", "#615368", 0.34);
  brush.spline([
    [270, 406, 0.2], [290, 399, 0.35], [311, 401, 0.35], [329, 411, 0.2]
  ], 0.35);

  brush.set("2H", "#a89586", 0.22);
  brush.spline([
    [180, 471, 0.15], [246, 453, 0.22], [293, 470, 0.15]
  ], 0.3);
  brush.spline([
    [308, 470, 0.15], [363, 451, 0.22], [448, 470, 0.15]
  ], 0.3);
}

function drawMemoryStrokes() {
  for (let i = 0; i < 220; i++) {
    let x = random(170, 430);
    let y = random(90, 470);
    let len = random(10, 24);
    let a = random(0, 180);

    if (random() < 0.7 && insideEllipse(x, y, 300, 255, 120, 170)) {
      brush.set("cpencil", random([
        "#6578a8", "#a85d79", "#708f63", "#c38d58", "#7c62a8", "#6a5a6b"
      ]), random(0.22, 0.5));
      brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
    }
  }

  for (let i = 0; i < 70; i++) {
    let x1 = random(210, 390);
    let y1 = random(140, 420);
    let x2 = x1 + random(-25, 25);
    let y2 = y1 + random(-18, 18);
    brush.set("2H", random(["#c5b4c7", "#b2bfd2", "#d4bbb0"]), random(0.18, 0.35));
    brush.line(x1, y1, x2, y2);
  }
}

function layeredRegion(points, layers, curvature) {
  for (let layer of layers) {
    brush.noFill();
    brush.hatchStyle("cpencil", layer.color, layer.weight);
    brush.hatch(layer.dist, layer.angle, { rand: 0.06 });
    brush.beginShape(curvature);
    for (let p of points) {
      let jx = p[0] + random(-0.8, 0.8);
      let jy = p[1] + random(-0.8, 0.8);
      brush.vertex(jx, jy);
    }
    brush.endShape(true);
    brush.noHatch();
  }
}

function organicOval(cx, cy, rx, ry, n, noiseScale, jitter) {
  let pts = [];
  for (let i = 0; i < n; i++) {
    let a = map(i, 0, n, 0, 360);
    let nx = cos(a) * noiseScale + 10;
    let ny = sin(a) * noiseScale + 20;
    let r1 = rx * (0.92 + noise(nx, ny) * 0.2);
    let r2 = ry * (0.92 + noise(nx + 40, ny + 40) * 0.2);
    pts.push([
      cx + cos(a) * r1 + random(-jitter * 10, jitter * 10),
      cy + sin(a) * r2 + random(-jitter * 10, jitter * 10)
    ]);
  }
  return pts;
}

function scalePolygon(points, cx, cy, s) {
  let out = [];
  for (let p of points) {
    out.push([
      lerp(cx, p[0], s),
      lerp(cy, p[1], s)
    ]);
  }
  return out;
}

function offsetPolygon(points, dx, dy) {
  for (let p of points) {
    p[0] += dx;
    p[1] += dy;
  }
}

function brokenContour(points, chance, segLen) {
  for (let i = 0; i < points.length; i++) {
    let a = points[i];
    let b = points[(i + 1) % points.length];
    if (random() < chance) {
      let mx = lerp(a[0], b[0], random(0.2, 0.45));
      let my = lerp(a[1], b[1], random(0.2, 0.45));
      let nx = lerp(a[0], b[0], random(0.55, 0.82));
      let ny = lerp(a[1], b[1], random(0.55, 0.82));
      brush.line(mx, my, nx, ny);
    }
  }
}

function insideEllipse(x, y, cx, cy, rx, ry) {
  let dx = (x - cx) / rx;
  let dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}