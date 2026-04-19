function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  randomSeed(12);
  noiseSeed(12);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noField();
  brush.noFill();
  brush.noWash();
  brush.noHatch();
  brush.noMass();

  drawPaperGrain();
  drawPortrait();
  drawShouldersAndClothing();
  drawFeatures();
  drawHairVeils();
  drawGhostContours();

  noLoop();
}

function drawPaperGrain() {
  for (let i = 0; i < 140; i++) {
    let y = random(20, 580);
    brush.set("2H", random(["#cfc6bc", "#d8d0c7", "#e2d9cf"]), random(0.18, 0.3));
    brush.line(random(10, 120), y, random(470, 590), y + random(-2, 2));
  }

  for (let i = 0; i < 120; i++) {
    let x = random(20, 580);
    brush.set("2H", "#ddd5cb", random(0.12, 0.22));
    brush.line(x, random(20, 580), x + random(-3, 3), random(20, 580));
  }
}

function drawPortrait() {
  let cx = 300;
  let cy = 270;

  let face = organicOval(cx, cy, 105, 138, 34, 0.11, 0);
  let jaw = organicChin(cx, cy + 10, 74, 146, 18);
  let neckL = [[262, 368], [252, 395], [244, 430], [247, 465]];
  let neckR = [[338, 368], [348, 398], [355, 432], [350, 466]];

  layeredCpencil(face, [
    { color: "#7c8db8", angle: 22, dist: 5.2, weight: 0.82 },
    { color: "#c27c8e", angle: 74, dist: 5.8, weight: 0.78 },
    { color: "#8d6f9e", angle: 128, dist: 6.0, weight: 0.7 }
  ], 0.45);

  layeredCpencil(jaw, [
    { color: "#6f7ea8", angle: 15, dist: 4.8, weight: 0.76 },
    { color: "#b36f62", angle: 105, dist: 5.2, weight: 0.72 },
    { color: "#78618c", angle: 145, dist: 5.8, weight: 0.64 }
  ], 0.42);

  let leftCheek = shrinkPolygon(face, cx - 28, cy + 6, 0.48);
  let rightCheek = shrinkPolygon(face, cx + 30, cy + 4, 0.46);
  let forehead = shrinkPolygon(face, cx, cy - 42, 0.55);
  let chinShadow = shrinkPolygon(jaw, cx, cy + 95, 0.42);

  layeredCpencil(leftCheek, [
    { color: "#556aa0", angle: 40, dist: 4.3, weight: 0.64 },
    { color: "#b0647f", angle: 118, dist: 4.6, weight: 0.6 }
  ], 0.38);

  layeredCpencil(rightCheek, [
    { color: "#8f5e91", angle: 58, dist: 4.6, weight: 0.68 },
    { color: "#6578a2", angle: 130, dist: 5.0, weight: 0.58 }
  ], 0.38);

  layeredCpencil(forehead, [
    { color: "#708bb6", angle: 8, dist: 5.2, weight: 0.56 },
    { color: "#c58a63", angle: 92, dist: 6.2, weight: 0.48 }
  ], 0.34);

  layeredCpencil(chinShadow, [
    { color: "#5a4973", angle: 78, dist: 3.8, weight: 0.64 },
    { color: "#7c5e5d", angle: 138, dist: 4.0, weight: 0.52 }
  ], 0.35);

  drawScribblePath(neckL, "#7a86ae", 0.7, 2, 4);
  drawScribblePath(neckL, "#b07a86", 0.55, -3, 3);
  drawScribblePath(neckR, "#6b5b84", 0.7, 2, 4);
  drawScribblePath(neckR, "#bf8367", 0.5, -2, 3);

  brush.set("HB", "#8f8378", 0.42);
  brush.spline(face.map(p => [p[0] + random(-3, 3), p[1] + random(-3, 3), random(0.4, 0.85)]), 0.45);
  brush.spline(jaw.map(p => [p[0] + random(-2, 2), p[1] + random(-2, 2), random(0.4, 0.9)]), 0.35);
}

function drawShouldersAndClothing() {
  let leftShoulder = [
    [240, 430], [210, 445], [174, 476], [148, 520], [165, 554], [242, 540], [283, 500]
  ];
  let rightShoulder = [
    [360, 430], [392, 448], [432, 485], [452, 530], [430, 554], [354, 544], [316, 500]
  ];
  let torso = [
    [248, 448], [353, 448], [388, 585], [214, 585]
  ];

  layeredCpencil(leftShoulder, [
    { color: "#607878", angle: 24, dist: 5.5, weight: 0.84 },
    { color: "#865b73", angle: 82, dist: 6.0, weight: 0.68 },
    { color: "#55618a", angle: 132, dist: 6.5, weight: 0.58 }
  ], 0.38);

  layeredCpencil(rightShoulder, [
    { color: "#6f658e", angle: 18, dist: 5.4, weight: 0.78 },
    { color: "#4f7887", angle: 95, dist: 6.0, weight: 0.64 },
    { color: "#8a5a62", angle: 146, dist: 6.8, weight: 0.58 }
  ], 0.38);

  layeredCpencil(torso, [
    { color: "#5c6f8e", angle: 12, dist: 7.0, weight: 0.8 },
    { color: "#7d566b", angle: 72, dist: 8.0, weight: 0.68 },
    { color: "#688172", angle: 126, dist: 8.5, weight: 0.56 }
  ], 0.28);

  brush.set("cpencil", "#6f6170", 0.8);
  brush.spline([
    [247, 447, 0.7],
    [231, 483, 0.8],
    [225, 545, 0.6]
  ], 0.35);

  brush.spline([
    [353, 447, 0.7],
    [368, 484, 0.8],
    [377, 547, 0.6]
  ], 0.35);
}

function drawFeatures() {
  let leftEye = [
    [255, 254], [270, 246], [287, 248], [298, 257], [286, 264], [269, 265]
  ];
  let rightEye = [
    [302, 257], [317, 248], [336, 247], [350, 254], [340, 264], [320, 266]
  ];
  let noseBridge = [[301, 214], [296, 244], [293, 272], [296, 304]];
  let noseBase = [[283, 312], [296, 319], [312, 317], [320, 310]];
  let mouthTop = [[262, 344], [281, 337], [300, 339], [317, 336], [336, 345]];
  let mouthBottom = [[266, 348], [285, 359], [302, 362], [319, 357], [334, 347]];
  let leftBrow = [[246, 232], [264, 223], [284, 223], [299, 229]];
  let rightBrow = [[302, 229], [318, 222], [338, 221], [355, 229]];

  drawScribblePath(leftBrow, "#51485f", 0.72, 2, 5);
  drawScribblePath(leftBrow, "#6d4f6f", 0.54, -2, 3);
  drawScribblePath(rightBrow, "#51485f", 0.72, 2, 5);
  drawScribblePath(rightBrow, "#5d708f", 0.52, -2, 3);

  layeredCpencil(leftEye, [
    { color: "#647ca5", angle: 18, dist: 3.8, weight: 0.44 },
    { color: "#94617b", angle: 122, dist: 4.2, weight: 0.42 }
  ], 0.25);

  layeredCpencil(rightEye, [
    { color: "#8c667f", angle: 28, dist: 3.8, weight: 0.44 },
    { color: "#6077a0", angle: 118, dist: 4.3, weight: 0.42 }
  ], 0.25);

  brush.set("2B", "#4f4a53", 0.55);
  brush.spline([
    [255, 255, 0.35],
    [270, 251, 0.7],
    [286, 252, 0.78],
    [297, 257, 0.35]
  ], 0.48);

  brush.spline([
    [303, 257, 0.35],
    [317, 251, 0.68],
    [335, 251, 0.76],
    [348, 255, 0.35]
  ], 0.48);

  brush.set("cpencil", "#4f5f8e", 0.36);
  brush.circle(276, 256, 4.2, 0.3);
  brush.set("cpencil", "#8c566d", 0.36);
  brush.circle(326, 256, 4.2, 0.3);

  drawScribblePath(noseBridge, "#6b7094", 0.55, 2, 4);
  drawScribblePath(noseBridge, "#ac7466", 0.45, -2, 3);
  drawScribblePath(noseBase, "#6d536f", 0.5, 2, 3);

  layeredCpencil(noseBase, [
    { color: "#7f5871", angle: 52, dist: 4.4, weight: 0.38 },
    { color: "#6178a1", angle: 133, dist: 4.8, weight: 0.34 }
  ], 0.22);

  drawScribblePath(mouthTop, "#905a74", 0.64, 1, 4);
  drawScribblePath(mouthBottom, "#6a5d8a", 0.58, 1, 4);
  drawScribblePath(mouthBottom, "#b3705e", 0.42, -2, 3);

  let lipMass = mouthTop.concat(mouthBottom.slice().reverse());
  layeredCpencil(lipMass, [
    { color: "#a55a74", angle: 16, dist: 3.6, weight: 0.38 },
    { color: "#7d5e96", angle: 103, dist: 4.2, weight: 0.33 }
  ], 0.18);

  brush.set("2H", "#c9b8aa", 0.26);
  brush.line(246, 280, 270, 274);
  brush.line(332, 276, 356, 282);

  for (let i = 0; i < 18; i++) {
    let y = 230 + i * 9;
    brush.set("cpencil", random(["#7d6ea8", "#7f8eb8", "#bd7c7f"]), random(0.12, 0.22));
    brush.line(228 + random(-8, 8), y, 366 + random(-8, 8), y + random(-10, 10));
  }
}

function drawHairVeils() {
  let hairOuter = [
    [204, 122], [166, 172], [150, 238], [157, 316], [182, 385], [226, 434],
    [247, 404], [227, 340], [220, 276], [229, 208], [254, 154], [300, 128],
    [352, 146], [384, 194], [395, 255], [390, 332], [369, 402], [352, 433],
    [394, 392], [430, 328], [444, 242], [426, 160], [386, 106], [319, 80], [251, 92]
  ];

  layeredCpencil(hairOuter, [
    { color: "#495c87", angle: 66, dist: 6.0, weight: 0.92 },
    { color: "#7d536d", angle: 118, dist: 6.3, weight: 0.86 },
    { color: "#4f766b", angle: 28, dist: 7.1, weight: 0.72 }
  ], 0.48);

  for (let i = 0; i < 80; i++) {
    let sx = random(196, 405);
    let sy = random(108, 420);
    let ex = sx + random(-42, 42);
    let ey = sy + random(26, 90);
    brush.set("cpencil", random(["#51638e", "#7d5776", "#658272", "#8b6b58"]), random(0.32, 0.7));
    brush.spline([
      [sx, sy, random(0.35, 0.7)],
      [sx + random(-20, 20), sy + random(18, 46), random(0.6, 1)],
      [ex, ey, random(0.25, 0.6)]
    ], 0.55);
  }

  for (let i = 0; i < 20; i++) {
    let x = random(210, 392);
    brush.set("2B", "#4a4450", random(0.24, 0.42));
    brush.line(x, random(120, 210), x + random(-16, 16), random(320, 430));
  }
}

function drawGhostContours() {
  let contour1 = organicOval(298, 272, 115, 148, 32, 0.08, 17);
  let contour2 = organicOval(304, 265, 98, 132, 30, 0.09, -14);

  brush.set("cpencil", "#b88c72", 0.34);
  brush.spline(contour1.map(p => [p[0], p[1], random(0.3, 0.6)]), 0.35);

  brush.set("cpencil", "#7a8cb4", 0.3);
  brush.spline(contour2.map(p => [p[0], p[1], random(0.3, 0.6)]), 0.35);

  brush.set("2H", "#d3c2b4", 0.22);
  brush.spline([
    [228, 170, 0.3],
    [196, 226, 0.45],
    [190, 310, 0.35],
    [214, 382, 0.25]
  ], 0.45);

  brush.spline([
    [368, 164, 0.3],
    [407, 224, 0.45],
    [409, 308, 0.35],
    [382, 388, 0.25]
  ], 0.45);

  for (let i = 0; i < 26; i++) {
    let a = map(i, 0, 25, 200, 336);
    let x1 = 300 + cos(a) * random(84, 120);
    let y1 = 268 + sin(a) * random(124, 168);
    let x2 = x1 + random(-28, 28);
    let y2 = y1 + random(-18, 18);
    brush.set("cpencil", random(["#7988af", "#b97b73", "#8a6d9a"]), random(0.14, 0.26));
    brush.line(x1, y1, x2, y2);
  }
}

function layeredCpencil(points, layers, jitterAmt) {
  for (let layer of layers) {
    let pts = jitterPolygon(points, jitterAmt);
    brush.hatchStyle("cpencil", layer.color, layer.weight);
    brush.hatch(layer.dist, layer.angle, { rand: 0.06, continuous: false });
    brush.polygon(pts);
    brush.noHatch();
  }
}

function drawScribblePath(pts, color, weight, jitterAmt, repeats) {
  for (let i = 0; i < repeats; i++) {
    let shifted = pts.map(p => [
      p[0] + random(-jitterAmt, jitterAmt),
      p[1] + random(-jitterAmt, jitterAmt),
      random(0.35, 0.95)
    ]);
    brush.set("cpencil", color, weight * random(0.9, 1.1));
    brush.spline(shifted, 0.45);
  }
}

function jitterPolygon(points, amt) {
  let out = [];
  for (let p of points) {
    out.push([p[0] + random(-amt, amt), p[1] + random(-amt, amt)]);
  }
  return out;
}

function shrinkPolygon(points, cx, cy, scaleAmt) {
  let out = [];
  for (let p of points) {
    out.push([
      lerp(cx, p[0], scaleAmt),
      lerp(cy, p[1], scaleAmt)
    ]);
  }
  return out;
}

function organicOval(cx, cy, rx, ry, count, nScale, rot) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360) + rot;
    let nx = cos(a) * nScale + 10;
    let ny = sin(a) * nScale + 20;
    let r1 = rx * (0.92 + noise(nx, ny) * 0.18);
    let r2 = ry * (0.92 + noise(nx + 31, ny + 17) * 0.18);
    pts.push([cx + cos(a) * r1, cy + sin(a) * r2]);
  }
  return pts;
}

function organicChin(cx, cy, rx, ry, count) {
  let pts = [];
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 205, 335);
    let bulge = map(abs(a - 270), 0, 65, 1.18, 0.86);
    let r1 = rx * bulge * (0.94 + noise(i * 0.11, 3) * 0.14);
    let r2 = ry * (0.9 + noise(i * 0.09, 7) * 0.12);
    pts.push([cx + cos(a) * r1, cy + sin(a) * r2]);
  }
  return pts;
}