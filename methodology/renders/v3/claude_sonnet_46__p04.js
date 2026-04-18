function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  const cx = 300;
  const cy = 300;

  // --- Neck ---
  brush.noFill();
  brush.hatchStyle("cpencil", "#c9a98b", 0.7);
  brush.hatch(6, 80, { rand: 0.06, continuous: true });
  brush.beginShape(0.35);
  let neckPts = [
    [268, 420], [260, 480], [258, 520],
    [342, 520], [340, 480], [332, 420]
  ];
  for (let p of neckPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b08060", 0.5);
  brush.hatch(8, 20, { rand: 0.05 });
  brush.beginShape(0.35);
  for (let p of neckPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Shoulders ---
  brush.hatchStyle("cpencil", "#7a5c8a", 0.8);
  brush.hatch(7, 110, { rand: 0.08, continuous: true });
  brush.beginShape(0.3);
  let shoulderPts = [
    [120, 580], [160, 510], [220, 490], [260, 500],
    [300, 510], [340, 500], [380, 490], [440, 510],
    [480, 580]
  ];
  for (let p of shoulderPts) brush.vertex(p[0], p[1]);
  brush.endShape(false);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5a3a6a", 0.6);
  brush.hatch(9, 60, { rand: 0.07 });
  brush.beginShape(0.3);
  for (let p of shoulderPts) brush.vertex(p[0], p[1]);
  brush.endShape(false);
  brush.noHatch();

  // --- Face base layer: warm ochre ---
  brush.hatchStyle("cpencil", "#d4a87a", 0.75);
  brush.hatch(5, 15, { rand: 0.07, continuous: true });
  let facePts = [];
  for (let i = 0; i < 48; i++) {
    let a = (i / 48) * 360;
    let rx = 115 + noise(cos(a) * 0.06 + 1, sin(a) * 0.06 + 1) * 18;
    let ry = 140 + noise(cos(a) * 0.05 + 5, sin(a) * 0.05 + 5) * 14;
    facePts.push([cx + cos(a) * rx, cy - 30 + sin(a) * ry]);
  }
  brush.beginShape(0.45);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Face layer 2: unexpected teal-green shadows ---
  brush.hatchStyle("cpencil", "#6aaa88", 0.6);
  brush.hatch(6, 65, { rand: 0.06 });
  let shadowPts = [];
  for (let i = 0; i < 36; i++) {
    let a = (i / 36) * 360;
    let rx = 70 + noise(cos(a) * 0.07 + 10, sin(a) * 0.07 + 10) * 14;
    let ry = 90 + noise(cos(a) * 0.06 + 15, sin(a) * 0.06 + 15) * 10;
    shadowPts.push([cx + 12 + cos(a) * rx, cy - 10 + sin(a) * ry]);
  }
  brush.beginShape(0.4);
  for (let p of shadowPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Face layer 3: dusty rose blush ---
  brush.hatchStyle("cpencil", "#d07a8a", 0.55);
  brush.hatch(7, 130, { rand: 0.08 });
  let blushPts = [];
  for (let i = 0; i < 28; i++) {
    let a = (i / 28) * 360;
    let rx = 48 + noise(cos(a) * 0.09 + 20, sin(a) * 0.09 + 20) * 12;
    let ry = 30 + noise(cos(a) * 0.08 + 25, sin(a) * 0.08 + 25) * 8;
    blushPts.push([cx - 48 + cos(a) * rx, cy + 30 + sin(a) * ry]);
  }
  brush.beginShape(0.4);
  for (let p of blushPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Right blush
  brush.hatchStyle("cpencil", "#c96a7a", 0.5);
  brush.hatch(8, 40, { rand: 0.07 });
  let blushPts2 = [];
  for (let i = 0; i < 28; i++) {
    let a = (i / 28) * 360;
    let rx = 44 + noise(cos(a) * 0.09 + 30, sin(a) * 0.09 + 30) * 11;
    let ry = 28 + noise(cos(a) * 0.08 + 35, sin(a) * 0.08 + 35) * 7;
    blushPts2.push([cx + 52 + cos(a) * rx, cy + 30 + sin(a) * ry]);
  }
  brush.beginShape(0.4);
  for (let p of blushPts2) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Face layer 4: violet forehead ---
  brush.hatchStyle("cpencil", "#8860a8", 0.55);
  brush.hatch(8, 95, { rand: 0.06 });
  let foreheadPts = [];
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * 360;
    let rx = 80 + noise(cos(a) * 0.07 + 40, sin(a) * 0.07 + 40) * 12;
    let ry = 52 + noise(cos(a) * 0.06 + 45, sin(a) * 0.06 + 45) * 8;
    foreheadPts.push([cx + cos(a) * rx, cy - 110 + sin(a) * ry]);
  }
  brush.beginShape(0.4);
  for (let p of foreheadPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Face contour lines ---
  brush.noFill();
  brush.set("cpencil", "#7a4a2a", 0.9);
  brush.beginShape(0.45);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  // --- Eyes ---
  // Left eye socket: indigo hatch
  brush.hatchStyle("cpencil", "#4a4a9a", 0.6);
  brush.hatch(5, 30, { rand: 0.07, continuous: true });
  let leftEyePts = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    leftEyePts.push([cx - 48 + cos(a) * (22 + noise(i * 0.3) * 5), cy - 38 + sin(a) * (11 + noise(i * 0.3 + 10) * 3)]);
  }
  brush.beginShape(0.4);
  for (let p of leftEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Left eye iris: teal
  brush.hatchStyle("cpencil", "#2a8a7a", 0.7);
  brush.hatch(4, 70, { rand: 0.05 });
  let leftIrisPts = [];
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    leftIrisPts.push([cx - 48 + cos(a) * (11 + noise(i * 0.4) * 2), cy - 38 + sin(a) * (9 + noise(i * 0.4 + 5) * 2)]);
  }
  brush.beginShape(0.4);
  for (let p of leftIrisPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Right eye socket
  brush.hatchStyle("cpencil", "#3a3a8a", 0.6);
  brush.hatch(5, 150, { rand: 0.07, continuous: true });
  let rightEyePts = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    rightEyePts.push([cx + 48 + cos(a) * (22 + noise(i * 0.3 + 50) * 5), cy - 38 + sin(a) * (11 + noise(i * 0.3 + 60) * 3)]);
  }
  brush.beginShape(0.4);
  for (let p of rightEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Right eye iris
  brush.hatchStyle("cpencil", "#1a7a6a", 0.7);
  brush.hatch(4, 100, { rand: 0.05 });
  let rightIrisPts = [];
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    rightIrisPts.push([cx + 48 + cos(a) * (11 + noise(i * 0.4 + 20) * 2), cy - 38 + sin(a) * (9 + noise(i * 0.4 + 25) * 2)]);
  }
  brush.beginShape(0.4);
  for (let p of rightIrisPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Eye lines
  brush.set("cpencil", "#1a1a3a", 0.8);
  brush.spline(leftEyePts.slice(0, 10), 0.4);
  brush.spline(rightEyePts.slice(0, 10), 0.4);

  // --- Nose: warm sienna strokes ---
  brush.set("cpencil", "#a05a3a", 0.7);
  brush.spline([
    [cx - 8, cy - 55],
    [cx - 18, cy - 10],
    [cx - 24, cy + 10],
    [cx - 14, cy + 22],
    [cx, cy + 28],
    [cx + 14, cy + 22],
    [cx + 24, cy + 10]
  ], 0.45);

  brush.set("cpencil", "#884a28", 0.6);
  brush.spline([
    [cx - 20, cy + 15],
    [cx - 10, cy + 30],
    [cx, cy + 32],
    [cx + 10, cy + 30],
    [cx + 20, cy + 15]
  ], 0.4);

  // Nostril shadows
  brush.hatchStyle("cpencil", "#6a3820", 0.55);
  brush.hatch(4, 50, { rand: 0.06 });
  let leftNostrilPts = [];
  for (let i = 0; i < 12; i++) {
    let a = (i / 12) * 360;
    leftNostrilPts.push([cx - 18 + cos(a) * 8, cy + 22 + sin(a) * 5]);
  }
  brush.beginShape(0.35);
  for (let p of leftNostrilPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6a3820", 0.55);
  brush.hatch(4, 130, { rand: 0.06 });
  let rightNostrilPts = [];
  for (let i = 0; i < 12; i++) {
    let a = (i / 12) * 360;
    rightNostrilPts.push([cx + 18 + cos(a) * 8, cy + 22 + sin(a) * 5]);
  }
  brush.beginShape(0.35);
  for (let p of rightNostrilPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Lips: unexpected dusty plum + coral ---
  brush.hatchStyle("cpencil", "#884466", 0.7);
  brush.hatch(4, 0, { rand: 0.06, continuous: true });
  let upperLipPts = [];
  for (let i = 0; i < 20; i++) {
    let t = i / 19;
    let x = cx - 44 + t * 88;
    let bow = (t < 0.5) ? -sin(t * 360) * 10 : -sin((1 - t) * 360) * 10;
    let y = cy + 68 + bow + noise(t * 3 + 60) * 5;
    upperLipPts.push([x, y]);
  }
  brush.beginShape(0.4);
  for (let p of upperLipPts) brush.vertex(p[0], p[1]);
  brush.endShape(false);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#aa5577", 0.65);
  brush.hatch(5, 90, { rand: 0.07 });
  let lowerLipPts = [];
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * 360;
    lowerLipPts.push([cx + cos(a) * (44 + noise(i * 0.3 + 70) * 5), cy + 82 + sin(a) * (13 + noise(i * 0.3 + 75) * 3)]);
  }
  brush.beginShape(0.4);
  for (let p of lowerLipPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.set("cpencil", "#662244", 0.8);
  brush.spline(upperLipPts, 0.4);

  // --- Eyebrows: dark irregular strokes ---
  brush.set("cpencil", "#2a1a3a", 0.85);
  brush.spline([
    [cx - 72, cy - 68 + noise(1) * 6],
    [cx - 55, cy - 76 + noise(2) * 6],
    [cx - 38, cy - 80 + noise(3) * 5],
    [cx - 22, cy - 74 + noise(4) * 6]
  ], 0.4);

  brush.set("cpencil", "#3a2a4a", 0.7);
  brush.spline([
    [cx - 70, cy - 65 + noise(5) * 5],
    [cx - 52, cy - 73 + noise(6) * 5],
    [cx - 35, cy - 77 + noise(7) * 4],
    [cx - 20, cy - 71 + noise(8) * 5]
  ], 0.35);

  brush.set("cpencil", "#2a1a3a", 0.85);
  brush.spline([
    [cx + 22, cy - 74 + noise(9) * 6],
    [cx + 38, cy - 80 + noise(10) * 5],
    [cx + 55, cy - 76 + noise(11) * 6],
    [cx + 72, cy - 68 + noise(12) * 6]
  ], 0.4);

  brush.set("cpencil", "#3a2a4a", 0.7);
  brush.spline([
    [cx + 20, cy - 71 + noise(13) * 5],
    [cx + 35, cy - 77 + noise(14) * 4],
    [cx + 52, cy - 73 + noise(15) * 5],
    [cx + 70, cy - 65 + noise(16) * 5]
  ], 0.35);

  // --- Hair: layered strokes in deep indigo + teal ---
  // Hair mass hatch
  brush.hatchStyle("cpencil", "#1a1a4a", 0.8);
  brush.hatch(5, 80, { rand: 0.09, continuous: true });
  let hairPts = [];
  for (let i = 0; i < 56; i++) {
    let a = (i / 56) * 360;
    let rx = 128 + noise(cos(a) * 0.05 + 80, sin(a) * 0.05 + 80) * 22;
    let ry = 155 + noise(cos(a) * 0.04 + 85, sin(a) * 0.04 + 85) * 16;
    hairPts.push([cx + cos(a) * rx, cy - 30 + sin(a) * ry]);
  }
  // Only top half of hair
  let topHairPts = hairPts.filter(p => p[1] < cy + 20);
  brush.beginShape(0.4);
  for (let p of topHairPts) brush.vertex(p[0], p[1]);
  brush.endShape(false);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a2a6a", 0.65);
  brush.hatch(7, 30, { rand: 0.1 });
  brush.beginShape(0.4);
  for (let p of topHairPts) brush.vertex(p[0], p[1]);
  brush.endShape(false);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#1a4a5a", 0.6);
  brush.hatch(9, 120, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let p of topHairPts) brush.vertex(p[0], p[1]);
  brush.endShape(false);
  brush.noHatch();

  // Hair strands
  brush.set("cpencil", "#0a0a2a", 0.9);
  for (let i = 0; i < 14; i++) {
    let startX = cx - 90 + i * 14 + noise(i * 0.5) * 10;
    let startY = cy - 170 + noise(i * 0.5 + 100) * 20;
    brush.spline([
      [startX, startY],
      [startX + noise(i + 200) * 30 - 15, startY + 60 + noise(i + 210) * 20],
      [startX + noise(i + 300) * 40 - 20, startY + 130 + noise(i + 310) * 25]
    ], 0.4);
  }

  brush.set("cpencil", "#2a4a6a", 0.7);
  for (let i = 0; i < 8; i++) {
    let startX = cx - 80 + i * 22 + noise(i * 0.6 + 50) * 12;
    let startY = cy - 160 + noise(i * 0.6 + 150) * 15;
    brush.spline([
      [startX, startY],
      [startX + noise(i + 400) * 25 - 12, startY + 50 + noise(i + 410) * 18],
      [startX + noise(i + 500) * 35 - 17, startY + 110 + noise(i + 510) * 20]
    ], 0.45);
  }

  // --- Ear hints ---
  brush.set("cpencil", "#b07858", 0.65);
  // Left ear
  brush.spline([
    [cx - 112, cy - 28],
    [cx - 118, cy - 10],
    [cx - 116, cy + 12],
    [cx - 108, cy + 28]
  ], 0.4);
  brush.hatchStyle("cpencil", "#8a5a38", 0.5);
  brush.hatch(6, 60, { rand: 0.07 });
  let leftEarPts = [];
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    leftEarPts.push([cx - 114 + cos(a) * 10, cy + 2 + sin(a) * 18]);
  }
  brush.beginShape(0.35);
  for (let p of leftEarPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Right ear
  brush.set("cpencil", "#b07858", 0.65);
  brush.spline([
    [cx + 108, cy - 28],
    [cx + 118, cy - 10],
    [cx + 116, cy + 12],
    [cx + 108, cy + 28]
  ], 0.4);
  brush.hatchStyle("cpencil", "#8a5a38", 0.5);
  brush.hatch(6, 120, { rand: 0.07 });
  let rightEarPts = [];
  for (let i = 0; i < 14; i++) {
    let a = (i / 14) * 360;
    rightEarPts.push([cx + 114 + cos(a) * 10, cy + 2 + sin(a) * 18]);
  }
  brush.beginShape(0.35);
  for (let p of rightEarPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Ambient texture: scattered cpencil marks ---
  brush.set("cpencil", "#b0a090", 0.4);
  for (let i = 0; i < 30; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let len = random(8, 30);
    let ang = random(360);
    brush.line(x, y, x + cos(ang) * len, y + sin(ang) * len);
  }

  // --- Final face contour overlay ---
  brush.set("cpencil", "#5a3020", 0.75);
  brush.beginShape(0.48);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  brush.noStroke();

  noLoop();
}