function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noSmooth();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(17);
  noiseSeed(17);

  // soft paper grain with colored-pencil-like directional strokes
  paperGrain();

  let cx = 300;
  let cy = 315;

  // aura / memory cloud behind the head
  brush.noFill();
  for (let i = 0; i < 180; i++) {
    let a = random(360);
    let rr = random(95, 180);
    let x = cx + cos(a) * rr * random(0.8, 1.15);
    let y = cy - 25 + sin(a) * rr * random(0.7, 1.25);
    let len = random(10, 28);
    let ang = a + random(70, 120);
    brush.set("cpencil", random(["#cab6d9", "#c8a1a9", "#a6b7d8", "#d8b28e", "#b8c59a"]), random(0.35, 0.8));
    brush.line(x, y, x + cos(ang) * len, y + sin(ang) * len);
  }

  // neck
  layeredZone(neckShape(cx, cy), [
    { color: "#9e7ca8", angle: 105, dist: 8, weight: 0.7, rand: 0.06 },
    { color: "#6f8fb0", angle: 65, dist: 9, weight: 0.6, rand: 0.05 },
    { color: "#8b5a67", angle: 140, dist: 10, weight: 0.55, rand: 0.07 }
  ], 0.42);

  // shoulders / torso suggestion
  layeredZone(shoulderShape(cx, cy), [
    { color: "#6f7698", angle: 18, dist: 9, weight: 0.75, rand: 0.08 },
    { color: "#c08a6f", angle: 155, dist: 11, weight: 0.55, rand: 0.07 },
    { color: "#8fa36e", angle: 78, dist: 12, weight: 0.5, rand: 0.08 }
  ], 0.35);

  // hair mass
  layeredZone(hairShape(cx, cy), [
    { color: "#5d547f", angle: 125, dist: 7, weight: 0.9, rand: 0.09 },
    { color: "#355f86", angle: 82, dist: 8, weight: 0.75, rand: 0.08 },
    { color: "#8a5569", angle: 28, dist: 10, weight: 0.65, rand: 0.1 }
  ], 0.45);

  // face main mass
  layeredZone(faceShape(cx, cy), [
    { color: "#b47a83", angle: 112, dist: 7, weight: 0.8, rand: 0.06 },
    { color: "#7894b6", angle: 58, dist: 8, weight: 0.65, rand: 0.05 },
    { color: "#d29b68", angle: 152, dist: 10, weight: 0.55, rand: 0.06 }
  ], 0.5);

  // cheek warmth
  layeredZone(cheekShape(cx - 48, cy + 10, 1), [
    { color: "#be6e77", angle: 28, dist: 8, weight: 0.55, rand: 0.06 },
    { color: "#8a678f", angle: 92, dist: 10, weight: 0.45, rand: 0.05 }
  ], 0.4);

  layeredZone(cheekShape(cx + 48, cy + 14, -1), [
    { color: "#c47a61", angle: 150, dist: 8, weight: 0.55, rand: 0.06 },
    { color: "#6d8fb5", angle: 80, dist: 10, weight: 0.45, rand: 0.05 }
  ], 0.4);

  // shadow side under cheek / jaw
  layeredZone(jawShadowShape(cx, cy), [
    { color: "#6b5f86", angle: 168, dist: 6, weight: 0.7, rand: 0.05 },
    { color: "#506f90", angle: 120, dist: 8, weight: 0.55, rand: 0.06 }
  ], 0.35);

  // eye sockets / brow mood
  layeredZone(eyeShadowShape(cx, cy), [
    { color: "#6a5a78", angle: 12, dist: 6, weight: 0.55, rand: 0.05 },
    { color: "#7f8ca8", angle: 165, dist: 8, weight: 0.45, rand: 0.05 }
  ], 0.3);

  // nose plane
  layeredZone(noseShape(cx, cy), [
    { color: "#6d85ab", angle: 100, dist: 7, weight: 0.45, rand: 0.04 },
    { color: "#bf7f6d", angle: 32, dist: 9, weight: 0.4, rand: 0.05 }
  ], 0.25);

  // lips
  layeredZone(mouthShape(cx, cy), [
    { color: "#8f5266", angle: 15, dist: 5, weight: 0.5, rand: 0.04 },
    { color: "#6d4f83", angle: 160, dist: 7, weight: 0.38, rand: 0.05 }
  ], 0.2);

  // colored-pencil contour fragments
  brokenContour(faceOutlinePoints(cx, cy), "#6d6180", 0.55, 22, 13);
  brokenContour(hairOutlinePoints(cx, cy), "#4e5f8f", 0.7, 16, 16);
  brokenContour(neckOutlinePoints(cx, cy), "#875f6f", 0.5, 12, 10);
  brokenContour(shoulderOutlinePoints(cx, cy), "#6f7d95", 0.55, 14, 12);

  // features: minimal, incomplete, mood-first
  sketchEye(cx - 52, cy - 22, 34, 10, "#52486e", "#8f6b77");
  sketchEye(cx + 43, cy - 18, 28, 8, "#5b6f98", "#8b6f5b");
  sketchNose(cx + 2, cy + 2);
  sketchMouth(cx - 3, cy + 70);

  // vertical and diagonal memory strokes crossing the face
  for (let i = 0; i < 90; i++) {
    let x = random(cx - 120, cx + 120);
    let y = random(cy - 150, cy + 130);
    let len = random(14, 42);
    let ang = random([78, 86, 96, 108, 132, 148]);
    brush.set("cpencil", random(["#8f6e77", "#6a84b0", "#9b7a56", "#7d8f64", "#735c93"]), random(0.28, 0.52));
    brush.line(x, y, x + cos(ang) * len, y + sin(ang) * len);
  }

  // soft cross-layered scribbles to dissolve identity
  for (let i = 0; i < 18; i++) {
    let px = cx + random(-110, 110);
    let py = cy + random(-140, 120);
    let pts = [];
    let count = int(random(4, 7));
    for (let j = 0; j < count; j++) {
      pts.push([
        px + random(-35, 35) + j * random(6, 18),
        py + random(-18, 18),
        random(0.4, 0.9)
      ]);
    }
    brush.set("cpencil", random(["#6b5a7b", "#6988a8", "#a56d6d", "#af845a"]), random(0.22, 0.45));
    brush.spline(pts, 0.45);
  }

  noLoop();
}

function paperGrain() {
  for (let i = 0; i < 450; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(6, 16);
    let ang = random([-12, 8, 22, 35]);
    brush.set("cpencil", random(["#eee5d9", "#f1e7da", "#ece1d3", "#eadfd2"]), random(0.15, 0.3));
    brush.line(x, y, x + cos(ang) * len, y + sin(ang) * len);
  }
}

function layeredZone(points, layers, curvature) {
  brush.noFill();
  for (let layer of layers) {
    brush.hatchStyle("cpencil", layer.color, layer.weight);
    brush.hatch(layer.dist, layer.angle, {
      rand: layer.rand,
      continuous: false,
      gradient: false
    });
    brush.beginShape(curvature);
    for (let p of points) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
    brush.noHatch();
  }
}

function brokenContour(points, color, weight, stepLenMin, stepLenMax) {
  brush.set("cpencil", color, weight);
  for (let i = 0; i < points.length - 1; i++) {
    if (random() < 0.2) continue;
    let p1 = points[i];
    let p2 = points[i + 1];
    let segs = max(1, int(dist(p1[0], p1[1], p2[0], p2[1]) / random(stepLenMin, stepLenMax)));
    for (let j = 0; j < segs; j++) {
      if (random() < 0.35) continue;
      let t1 = j / segs;
      let t2 = min(1, t1 + random(0.22, 0.85) / segs);
      let x1 = lerp(p1[0], p2[0], t1) + random(-1.5, 1.5);
      let y1 = lerp(p1[1], p2[1], t1) + random(-1.5, 1.5);
      let x2 = lerp(p1[0], p2[0], t2) + random(-1.5, 1.5);
      let y2 = lerp(p1[1], p2[1], t2) + random(-1.5, 1.5);
      brush.line(x1, y1, x2, y2);
    }
  }
}

function sketchEye(x, y, w, h, c1, c2) {
  brush.set("cpencil", c1, 0.42);
  brush.spline([
    [x - w * 0.5, y, 0.4],
    [x - w * 0.18, y - h * 0.55, 0.75],
    [x + w * 0.2, y - h * 0.42, 0.7],
    [x + w * 0.5, y, 0.35]
  ], 0.5);

  brush.set("cpencil", c2, 0.32);
  brush.spline([
    [x - w * 0.42, y + h * 0.1, 0.25],
    [x - w * 0.1, y + h * 0.35, 0.45],
    [x + w * 0.18, y + h * 0.25, 0.35],
    [x + w * 0.42, y + h * 0.08, 0.2]
  ], 0.45);

  for (let i = 0; i < 6; i++) {
    brush.set("cpencil", random([c1, c2, "#7c6b95", "#6b87a5"]), random(0.15, 0.28));
    let xx = x + random(-w * 0.16, w * 0.12);
    let yy = y + random(-h * 0.05, h * 0.1);
    brush.line(xx, yy, xx + random(-2, 2), yy + random(3, 8));
  }
}

function sketchNose(x, y) {
  brush.set("cpencil", "#6c86ae", 0.34);
  brush.spline([
    [x - 2, y - 26, 0.25],
    [x + 2, y - 4, 0.45],
    [x + 6, y + 18, 0.6],
    [x - 6, y + 31, 0.32]
  ], 0.38);

  brush.set("cpencil", "#b06e67", 0.24);
  brush.spline([
    [x - 11, y + 28, 0.2],
    [x - 2, y + 24, 0.35],
    [x + 9, y + 28, 0.2]
  ], 0.4);
}

function sketchMouth(x, y) {
  brush.set("cpencil", "#87546b", 0.38);
  brush.spline([
    [x - 28, y, 0.25],
    [x - 12, y - 6, 0.5],
    [x + 6, y - 3, 0.48],
    [x + 24, y, 0.2]
  ], 0.45);

  brush.set("cpencil", "#6e5e8f", 0.28);
  brush.spline([
    [x - 20, y + 6, 0.15],
    [x - 2, y + 13, 0.35],
    [x + 19, y + 6, 0.14]
  ], 0.35);

  for (let i = 0; i < 7; i++) {
    brush.set("cpencil", random(["#9e6b74", "#6f6295", "#6f87ae"]), random(0.12, 0.22));
    let xx = x + random(-20, 20);
    let yy = y + random(-2, 8);
    brush.line(xx, yy, xx + random(-6, 6), yy + random(-2, 2));
  }
}

function faceShape(cx, cy) {
  let pts = [];
  for (let i = 0; i < 34; i++) {
    let a = map(i, 0, 33, -95, 265);
    let rBase = radialFace(a);
    let nx = noise(i * 0.13 + 3.1) * 26 - 13;
    let ny = noise(i * 0.13 + 8.4) * 24 - 12;
    let x = cx + cos(a) * rBase * 0.82 + nx * 0.45;
    let y = cy - 15 + sin(a) * rBase * 1.02 + ny * 0.35;
    if (a > 55 && a < 125) y += map(abs(a - 90), 0, 35, 18, 0);
    pts.push([x, y]);
  }
  return pts;
}

function hairShape(cx, cy) {
  let pts = [];
  for (let i = 0; i < 38; i++) {
    let a = map(i, 0, 37, -120, 280);
    let r = 145 + 24 * sin(a * 1.5) + map(noise(i * 0.17 + 20), 0, 1, -26, 28);
    let x = cx + cos(a) * r * 0.95;
    let y = cy - 55 + sin(a) * r * 0.88;
    if (a > 150 && a < 240) y += 45;
    if (a > -120 && a < -20) x -= 18;
    pts.push([x, y]);
  }
  return pts;
}

function neckShape(cx, cy) {
  return [
    [cx - 52, cy + 118],
    [cx - 34, cy + 100],
    [cx - 16, cy + 98],
    [cx + 8, cy + 102],
    [cx + 34, cy + 110],
    [cx + 56, cy + 126],
    [cx + 44, cy + 176],
    [cx - 42, cy + 182]
  ];
}

function shoulderShape(cx, cy) {
  return [
    [cx - 180, cy + 235],
    [cx - 110, cy + 174],
    [cx - 48, cy + 144],
    [cx + 40, cy + 154],
    [cx + 115, cy + 182],
    [cx + 186, cy + 244],
    [cx + 156, cy + 292],
    [cx - 156, cy + 292]
  ];
}

function cheekShape(x, y, dir) {
  let pts = [];
  for (let i = 0; i < 16; i++) {
    let a = map(i, 0, 15, 200, 540);
    let rx = 38;
    let ry = 26;
    let px = x + cos(a) * rx * 0.9 + dir * 4;
    let py = y + sin(a) * ry * 0.8;
    pts.push([px, py]);
  }
  return pts;
}

function jawShadowShape(cx, cy) {
  return [
    [cx - 78, cy + 34],
    [cx - 30, cy + 70],
    [cx + 18, cy + 94],
    [cx + 62, cy + 85],
    [cx + 84, cy + 60],
    [cx + 34, cy + 106],
    [cx - 18, cy + 115],
    [cx - 72, cy + 84]
  ];
}

function eyeShadowShape(cx, cy) {
  return [
    [cx - 96, cy - 48],
    [cx - 34, cy - 72],
    [cx + 42, cy - 66],
    [cx + 92, cy - 38],
    [cx + 62, cy - 4],
    [cx - 22, cy + 4],
    [cx - 86, cy - 8]
  ];
}

function noseShape(cx, cy) {
  return [
    [cx - 12, cy - 28],
    [cx + 12, cy - 24],
    [cx + 21, cy + 12],
    [cx + 8, cy + 42],
    [cx - 10, cy + 28],
    [cx - 18, cy - 2]
  ];
}

function mouthShape(cx, cy) {
  return [
    [cx - 38, cy + 58],
    [cx - 18, cy + 48],
    [cx + 8, cy + 50],
    [cx + 36, cy + 60],
    [cx + 28, cy + 79],
    [cx - 2, cy + 88],
    [cx - 28, cy + 78]
  ];
}

function faceOutlinePoints(cx, cy) {
  let pts = [];
  for (let i = 0; i < 26; i++) {
    let a = map(i, 0, 25, -84, 252);
    let r = radialFace(a) * 0.84;
    let x = cx + cos(a) * r * 0.83;
    let y = cy - 14 + sin(a) * r * 1.03;
    if (a > 60 && a < 120) y += map(abs(a - 90), 0, 30, 14, 0);
    pts.push([x, y]);
  }
  return pts;
}

function hairOutlinePoints(cx, cy) {
  let pts = [];
  for (let i = 0; i < 30; i++) {
    let a = map(i, 0, 29, -118, 268);
    let r = 148 + 16 * sin(a * 1.35);
    let x = cx + cos(a) * r * 0.96;
    let y = cy - 58 + sin(a) * r * 0.9;
    if (a > 160 && a < 240) y += 42;
    pts.push([x, y]);
  }
  return pts;
}

function neckOutlinePoints(cx, cy) {
  return [
    [cx - 44, cy + 104],
    [cx - 30, cy + 115],
    [cx - 22, cy + 144],
    [cx - 18, cy + 180],
    [cx + 16, cy + 180],
    [cx + 24, cy + 140],
    [cx + 38, cy + 116],
    [cx + 50, cy + 122]
  ];
}

function shoulderOutlinePoints(cx, cy) {
  return [
    [cx - 164, cy + 246],
    [cx - 108, cy + 188],
    [cx - 48, cy + 150],
    [cx + 40, cy + 156],
    [cx + 110, cy + 184],
    [cx + 170, cy + 246]
  ];
}

function radialFace(a) {
  return 112
    + 10 * sin(a * 2.2)
    + 18 * pow(abs(sin((a + 90) * 0.5)), 1.4);
}