function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(19);
  noiseSeed(19);

  brush.noField();
  brush.noWash();
  brush.noMass();
  brush.noHatch();
  brush.noFill();

  drawAura();
  drawNeckAndShoulders();
  drawHeadBase();
  drawHairMass();
  drawFeatures();
  drawContourThreads();
  drawVeils();

  noLoop();
}

function drawAura() {
  let cols = ["#d8b1a7", "#c89db2", "#9a9cc9", "#9db7a7", "#d6a36c"];
  brush.noFill();

  for (let i = 0; i < 180; i++) {
    let cx = 300 + randomGaussian(0, 95);
    let cy = 290 + randomGaussian(0, 125);
    let rx = random(30, 110);
    let ry = random(20, 80);
    let c = random(cols);

    brush.set("cpencil", c, random(0.45, 0.9));
    let pts = [];
    let count = int(random(6, 11));
    for (let j = 0; j < count; j++) {
      let a = map(j, 0, count - 1, 0, 360);
      let x = cx + cos(a) * rx + random(-12, 12);
      let y = cy + sin(a) * ry + random(-12, 12);
      pts.push([x, y, random(0.35, 0.9)]);
    }
    brush.spline(pts, 0.55);
  }
}

function drawNeckAndShoulders() {
  let neck = [
    [262, 410],
    [278, 405],
    [292, 405],
    [305, 409],
    [319, 421],
    [325, 454],
    [315, 520],
    [279, 525],
    [266, 465]
  ];

  let leftShoulder = [
    [134, 560],
    [176, 536],
    [214, 516],
    [256, 498],
    [283, 507],
    [284, 555]
  ];

  let rightShoulder = [
    [316, 507],
    [352, 495],
    [398, 510],
    [448, 534],
    [500, 566],
    [317, 557]
  ];

  hatchRegion(neck, [
    { color: "#7f8cc1", angle: 105, dist: 5, weight: 0.8 },
    { color: "#c27b6f", angle: 35, dist: 6, weight: 0.7 },
    { color: "#7f5c89", angle: 145, dist: 7, weight: 0.6 }
  ], 0.45);

  hatchRegion(leftShoulder, [
    { color: "#7a8da5", angle: 20, dist: 5, weight: 0.8 },
    { color: "#d08b68", angle: 70, dist: 6, weight: 0.7 },
    { color: "#7d6aa7", angle: 130, dist: 7, weight: 0.6 }
  ], 0.35);

  hatchRegion(rightShoulder, [
    { color: "#9f7894", angle: 160, dist: 5, weight: 0.85 },
    { color: "#5f8f8a", angle: 110, dist: 6, weight: 0.7 },
    { color: "#d19d61", angle: 45, dist: 7, weight: 0.6 }
  ], 0.35);
}

function drawHeadBase() {
  let head = organicOval(300, 255, 115, 146, 34, 18);
  let leftPlane = scaledPoints(head, 272, 255, 0.56);
  let rightPlane = scaledPoints(head, 334, 256, 0.52);
  let chinShadow = scaledPoints(head, 300, 322, 0.42);
  let foreheadGlow = scaledPoints(head, 300, 190, 0.35);

  hatchRegion(head, [
    { color: "#6a78b6", angle: 18, dist: 5, weight: 0.95 },
    { color: "#c77c73", angle: 78, dist: 6, weight: 0.85 },
    { color: "#718c7f", angle: 132, dist: 7, weight: 0.7 }
  ], 0.48);

  hatchRegion(leftPlane, [
    { color: "#8b6fb0", angle: 32, dist: 5, weight: 0.7 },
    { color: "#d18e63", angle: 115, dist: 7, weight: 0.6 }
  ], 0.42);

  hatchRegion(rightPlane, [
    { color: "#5c8ea6", angle: 150, dist: 5, weight: 0.72 },
    { color: "#c56b7d", angle: 72, dist: 6, weight: 0.62 }
  ], 0.42);

  hatchRegion(chinShadow, [
    { color: "#6f5f9b", angle: 160, dist: 5, weight: 0.65 },
    { color: "#4e6b92", angle: 40, dist: 6, weight: 0.55 }
  ], 0.34);

  hatchRegion(foreheadGlow, [
    { color: "#d6a565", angle: 95, dist: 8, weight: 0.5 },
    { color: "#b98ea9", angle: 20, dist: 10, weight: 0.45 }
  ], 0.28);
}

function drawHairMass() {
  brush.noFill();

  let hairCols = ["#4f5d8a", "#7f557d", "#275d66", "#9b674a", "#22222a"];
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < 95; i++) {
      let sx = side === 0 ? random(180, 285) : random(315, 420);
      let sy = random(100, 300);
      let mx = side === 0 ? sx - random(20, 70) : sx + random(20, 70);
      let my = sy + random(40, 110);
      let ex = side === 0 ? random(145, 270) : random(330, 455);
      let ey = random(250, 470);

      brush.set("cpencil", random(hairCols), random(0.5, 1.0));
      brush.spline([
        [sx, sy, random(0.35, 0.6)],
        [mx, my, random(0.55, 0.9)],
        [ex, ey, random(0.25, 0.6)]
      ], 0.55);
    }
  }

  for (let i = 0; i < 60; i++) {
    let sx = random(225, 375);
    let sy = random(85, 165);
    let ex = random(180, 420);
    let ey = random(150, 260);
    brush.set("cpencil", random(["#8f6ab2", "#536ca5", "#c17b63", "#2e5c57"]), random(0.35, 0.7));
    brush.spline([
      [sx, sy, 0.3],
      [(sx + ex) * 0.5 + random(-20, 20), sy - random(10, 35), 0.7],
      [ex, ey, 0.35]
    ], 0.65);
  }
}

function drawFeatures() {
  drawEye(258, 265, 48, 18, true);
  drawEye(342, 262, 46, 16, false);

  let noseBridge = [
    [301, 210, 0.3],
    [297, 240, 0.55],
    [295, 275, 0.7],
    [300, 307, 0.45]
  ];
  brush.set("cpencil", "#6f75b4", 0.6);
  brush.spline(noseBridge, 0.45);

  let noseSide = [
    [313, 232, 0.25],
    [316, 260, 0.4],
    [312, 292, 0.55],
    [302, 311, 0.35]
  ];
  brush.set("cpencil", "#c17b63", 0.55);
  brush.spline(noseSide, 0.42);

  let noseBase = [
    [286, 314],
    [295, 319],
    [305, 320],
    [316, 315],
    [309, 326],
    [296, 329]
  ];
  hatchRegion(noseBase, [
    { color: "#8a5f95", angle: 25, dist: 5, weight: 0.45 },
    { color: "#54789b", angle: 110, dist: 7, weight: 0.38 }
  ], 0.22);

  let mouth = [
    [257, 365],
    [277, 356],
    [301, 353],
    [323, 358],
    [342, 366],
    [323, 377],
    [300, 381],
    [277, 378]
  ];

  let upperLip = [
    [257, 365],
    [279, 356],
    [301, 357],
    [323, 359],
    [342, 366],
    [322, 367],
    [300, 369],
    [279, 367]
  ];

  let lowerLip = [
    [279, 367],
    [301, 369],
    [322, 367],
    [333, 374],
    [319, 381],
    [300, 383],
    [281, 379],
    [270, 372]
  ];

  hatchRegion(mouth, [
    { color: "#8d678f", angle: 10, dist: 5, weight: 0.55 },
    { color: "#d58d70", angle: 145, dist: 6, weight: 0.45 }
  ], 0.25);

  hatchRegion(upperLip, [
    { color: "#6f5a96", angle: 165, dist: 5, weight: 0.5 }
  ], 0.16);

  hatchRegion(lowerLip, [
    { color: "#c47b73", angle: 25, dist: 6, weight: 0.42 },
    { color: "#8092b9", angle: 100, dist: 9, weight: 0.34 }
  ], 0.14);

  let leftCheek = organicOval(243, 315, 42, 56, 18, 10);
  let rightCheek = organicOval(360, 318, 48, 58, 18, 10);

  hatchRegion(leftCheek, [
    { color: "#d5a160", angle: 22, dist: 8, weight: 0.5 },
    { color: "#8792c3", angle: 105, dist: 9, weight: 0.45 }
  ], 0.18);

  hatchRegion(rightCheek, [
    { color: "#c56e82", angle: 150, dist: 8, weight: 0.5 },
    { color: "#5c8593", angle: 78, dist: 9, weight: 0.42 }
  ], 0.18);
}

function drawEye(cx, cy, w, h, leftSide) {
  let eyeShape = [];
  for (let i = 0; i < 12; i++) {
    let a = map(i, 0, 11, 180, 360);
    let x = cx + cos(a) * (w * 0.5) + random(-2, 2);
    let y = cy + sin(a) * (h * 0.45) + random(-1.5, 1.5);
    eyeShape.push([x, y]);
  }
  for (let i = 0; i < 12; i++) {
    let a = map(i, 0, 11, 0, 180);
    let x = cx + cos(a) * (w * 0.5) + random(-2, 2);
    let y = cy + sin(a) * (h * 0.35) + random(-1.5, 1.5);
    eyeShape.push([x, y]);
  }

  hatchRegion(eyeShape, [
    { color: "#b5c0dd", angle: 18, dist: 6, weight: 0.38 },
    { color: "#d5a16a", angle: 105, dist: 9, weight: 0.3 }
  ], 0.12);

  let iris = organicOval(cx + (leftSide ? -2 : 1), cy + 1, 10, 12, 12, 4);
  hatchRegion(iris, [
    { color: leftSide ? "#6e5b9e" : "#4b7d8f", angle: 20, dist: 4, weight: 0.42 },
    { color: "#3a3151", angle: 120, dist: 5, weight: 0.3 }
  ], 0.1);

  brush.noFill();
  brush.set("cpencil", "#4b4f73", 0.5);
  brush.spline([
    [cx - w * 0.52, cy + random(-1, 1), 0.35],
    [cx - w * 0.15, cy - h * 0.48 + random(-1, 1), 0.65],
    [cx + w * 0.18, cy - h * 0.38 + random(-1, 1), 0.55],
    [cx + w * 0.52, cy + random(-1, 1), 0.35]
  ], 0.55);

  brush.set("cpencil", "#855f7f", 0.42);
  brush.spline([
    [cx - w * 0.48, cy + 2, 0.28],
    [cx, cy + h * 0.35, 0.45],
    [cx + w * 0.46, cy + 2, 0.28]
  ], 0.4);

  for (let i = 0; i < 18; i++) {
    let ex = cx + random(-w * 0.35, w * 0.35);
    let ey = cy - h * 0.55 + random(-2, 2);
    let len = random(8, 16);
    let ang = leftSide ? random(215, 300) : random(245, 330);
    brush.set("cpencil", random(["#60579a", "#a36b63", "#516f9a"]), random(0.22, 0.38));
    brush.beginStroke("curve", ex, ey);
    brush.move(ang, len * 0.6, 0.45);
    brush.endStroke(ang + random(-15, 15), 0.2);
  }

  let browY = cy - 28;
  brush.set("cpencil", leftSide ? "#7f5a89" : "#4f6f8d", 0.55);
  brush.spline([
    [cx - w * 0.65, browY + random(-2, 2), 0.25],
    [cx - w * 0.15, browY - random(6, 12), 0.65],
    [cx + w * 0.35, browY - random(2, 8), 0.45],
    [cx + w * 0.7, browY + random(-1, 3), 0.2]
  ], 0.5);
}

function drawContourThreads() {
  brush.noFill();

  let contourColors = ["#5f6db0", "#c6736f", "#6b8f81", "#8d6999"];
  for (let i = 0; i < 26; i++) {
    let side = i % 2 === 0 ? -1 : 1;
    let sx = 300 + side * random(70, 110);
    let sy = random(130, 180);
    let mx = 300 + side * random(95, 145);
    let my = random(230, 320);
    let ex = 300 + side * random(30, 85);
    let ey = random(330, 420);

    brush.set("cpencil", contourColors[i % contourColors.length], random(0.25, 0.55));
    brush.spline([
      [sx, sy, 0.2],
      [mx, my, 0.7],
      [ex, ey, 0.22]
    ], 0.6);
  }

  for (let i = 0; i < 40; i++) {
    let x1 = random(220, 380);
    let y1 = random(145, 390);
    let x2 = x1 + random(-35, 35);
    let y2 = y1 + random(10, 55);
    brush.set("cpencil", random(["#d39d65", "#7c90be", "#af7595", "#5f8c84"]), random(0.18, 0.42));
    brush.line(x1, y1, x2, y2);
  }
}

function drawVeils() {
  brush.noFill();
  let cols = ["#e0b17f", "#b989ad", "#89a1c6", "#88a497"];

  for (let k = 0; k < 4; k++) {
    let c = cols[k];
    for (let i = 0; i < 28; i++) {
      let y = 130 + k * 90 + random(-30, 30);
      brush.set("cpencil", c, random(0.22, 0.45));
      brush.spline([
        [random(120, 180), y + random(-12, 12), 0.15],
        [random(240, 290), y + random(-25, 25), 0.45],
        [random(330, 390), y + random(-25, 25), 0.45],
        [random(430, 500), y + random(-12, 12), 0.15]
      ], 0.65);
    }
  }
}

function hatchRegion(points, layers, shrink) {
  brush.noFill();
  for (let i = 0; i < layers.length; i++) {
    let pts = scaledPoints(points, centroid(points).x, centroid(points).y, 1 - shrink * i);
    brush.hatchStyle("cpencil", layers[i].color, layers[i].weight);
    brush.hatch(layers[i].dist, layers[i].angle, { rand: 0.06, continuous: false });
    brush.beginShape(0.45);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
    brush.noHatch();
  }
}

function centroid(points) {
  let sx = 0;
  let sy = 0;
  for (let p of points) {
    sx += p[0];
    sy += p[1];
  }
  return { x: sx / points.length, y: sy / points.length };
}

function scaledPoints(points, cx, cy, sc) {
  let out = [];
  for (let p of points) {
    out.push([lerp(cx, p[0], sc), lerp(cy, p[1], sc)]);
  }
  return out;
}

function organicOval(cx, cy, rx, ry, steps, nAmp) {
  let pts = [];
  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps, 0, 360);
    let nx = cos(a) * 0.8 + 10;
    let ny = sin(a) * 0.8 + 20;
    let nr = map(noise(nx, ny), 0, 1, -nAmp, nAmp);
    let x = cx + cos(a) * (rx + nr) + random(-2, 2);
    let y = cy + sin(a) * (ry + nr * 0.6) + random(-2, 2);
    pts.push([x, y]);
  }
  return pts;
}