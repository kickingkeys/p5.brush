function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Face oval ---
  let cx = 300, cy = 290;
  let faceW = 115, faceH = 150;
  let facePts = [];
  for (let i = 0; i < 48; i++) {
    let a = (i / 48) * 360;
    let rx = faceW + noise(cos(a) * 0.04, sin(a) * 0.04, 0.1) * 18 - 9;
    let ry = faceH + noise(cos(a) * 0.04, sin(a) * 0.04, 0.5) * 22 - 11;
    facePts.push([cx + cos(a) * rx, cy + sin(a) * ry]);
  }

  // Skin base — dusty rose
  brush.noStroke();
  brush.hatchStyle("cpencil", "#c49a84", 0.7);
  brush.hatch(5, 28, { rand: 0.06, continuous: true });
  brush.beginShape(0.45);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Second skin pass — warm ochre at different angle
  brush.hatchStyle("cpencil", "#d4a96a", 0.6);
  brush.hatch(6, 72, { rand: 0.05, continuous: true });
  brush.beginShape(0.45);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Shadow pass — muted violet on one side
  let shadowPts = [];
  for (let i = 0; i < 48; i++) {
    let a = (i / 48) * 360;
    let rx = (faceW - 30) + noise(cos(a) * 0.04, sin(a) * 0.04, 1.2) * 12;
    let ry = (faceH - 20) + noise(cos(a) * 0.04, sin(a) * 0.04, 1.7) * 14;
    shadowPts.push([cx - 28 + cos(a) * rx * 0.55, cy + 20 + sin(a) * ry * 0.7]);
  }
  brush.hatchStyle("cpencil", "#7a5c7e", 0.65);
  brush.hatch(4, 110, { rand: 0.07, continuous: true });
  brush.beginShape(0.4);
  for (let p of shadowPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Neck ---
  let neckPts = [
    [cx - 28, cy + faceH - 10],
    [cx - 22, cy + faceH + 60],
    [cx + 22, cy + faceH + 60],
    [cx + 28, cy + faceH - 10],
  ];
  brush.hatchStyle("cpencil", "#c49a84", 0.6);
  brush.hatch(5, 88, { rand: 0.05 });
  brush.beginShape(0.3);
  for (let p of neckPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Shoulders ---
  let shoulderPts = [
    [cx - 160, cy + faceH + 55],
    [cx - 90, cy + faceH + 40],
    [cx - 22, cy + faceH + 58],
    [cx + 22, cy + faceH + 58],
    [cx + 90, cy + faceH + 40],
    [cx + 160, cy + faceH + 55],
    [cx + 170, cy + faceH + 130],
    [cx - 170, cy + faceH + 130],
  ];
  brush.hatchStyle("cpencil", "#4a5a7a", 0.7);
  brush.hatch(5, 15, { rand: 0.06 });
  brush.beginShape(0.3);
  for (let p of shoulderPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2e3a5c", 0.6);
  brush.hatch(6, 60, { rand: 0.05 });
  brush.beginShape(0.3);
  for (let p of shoulderPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Hair mass ---
  let hairPts = [];
  for (let i = 0; i < 48; i++) {
    let a = (i / 48) * 360;
    let rx = faceW + 18 + noise(cos(a) * 0.06, sin(a) * 0.06, 2.0) * 28;
    let ry = faceH + 10 + noise(cos(a) * 0.06, sin(a) * 0.06, 2.5) * 22;
    hairPts.push([cx + cos(a) * rx, (cy - 30) + sin(a) * ry]);
  }
  // clip hair below chin
  let clippedHair = hairPts.filter(p => p[1] < cy + 90);

  brush.hatchStyle("cpencil", "#2a1a0e", 0.8);
  brush.hatch(3, 80, { rand: 0.09, continuous: true });
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5c3d1e", 0.6);
  brush.hatch(4, 50, { rand: 0.07, continuous: true });
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Left eye area ---
  let lex = cx - 42, ley = cy - 28;
  let leftEyePts = [];
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * 360;
    leftEyePts.push([lex + cos(a) * (22 + noise(a * 0.05, 0.1) * 6), ley + sin(a) * (9 + noise(a * 0.05, 0.4) * 3)]);
  }
  brush.hatchStyle("cpencil", "#3b2f5e", 0.65);
  brush.hatch(3, 40, { rand: 0.06 });
  brush.beginShape(0.4);
  for (let p of leftEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6b4f8a", 0.55);
  brush.hatch(4, 95, { rand: 0.05 });
  brush.beginShape(0.4);
  for (let p of leftEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Iris left
  let liris = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    liris.push([lex + cos(a) * (8 + noise(a * 0.1) * 2), ley + sin(a) * (7 + noise(a * 0.1, 1) * 2)]);
  }
  brush.hatchStyle("cpencil", "#1a3a2a", 0.7);
  brush.hatch(2.5, 30, { rand: 0.04 });
  brush.beginShape(0.3);
  for (let p of liris) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Right eye area ---
  let rex = cx + 42, rey = cy - 28;
  let rightEyePts = [];
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * 360;
    rightEyePts.push([rex + cos(a) * (22 + noise(a * 0.05, 0.7) * 6), rey + sin(a) * (9 + noise(a * 0.05, 1.1) * 3)]);
  }
  brush.hatchStyle("cpencil", "#3b2f5e", 0.65);
  brush.hatch(3, 40, { rand: 0.06 });
  brush.beginShape(0.4);
  for (let p of rightEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6b4f8a", 0.55);
  brush.hatch(4, 95, { rand: 0.05 });
  brush.beginShape(0.4);
  for (let p of rightEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Iris right
  let riris = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    riris.push([rex + cos(a) * (8 + noise(a * 0.1, 2) * 2), rey + sin(a) * (7 + noise(a * 0.1, 3) * 2)]);
  }
  brush.hatchStyle("cpencil", "#1a3a2a", 0.7);
  brush.hatch(2.5, 30, { rand: 0.04 });
  brush.beginShape(0.3);
  for (let p of riris) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Brow strokes ---
  brush.set("cpencil", "#2a1a0e", 0.9);
  brush.spline([[lex - 22, ley - 14], [lex, ley - 18], [lex + 18, ley - 13]], 0.4);
  brush.set("cpencil", "#3a2a1e", 0.7);
  brush.spline([[lex - 20, ley - 12], [lex, ley - 16], [lex + 16, ley - 11]], 0.4);

  brush.set("cpencil", "#2a1a0e", 0.9);
  brush.spline([[rex - 18, rey - 13], [rex, rey - 18], [rex + 22, rey - 14]], 0.4);
  brush.set("cpencil", "#3a2a1e", 0.7);
  brush.spline([[rex - 16, rey - 11], [rex, rey - 16], [rex + 20, rey - 12]], 0.4);

  // --- Nose suggestion ---
  let nx = cx, ny = cy + 22;
  brush.set("cpencil", "#a07060", 0.6);
  brush.spline([[nx - 8, ny - 18], [nx - 12, ny + 8], [nx - 6, ny + 18]], 0.5);
  brush.spline([[nx + 8, ny - 18], [nx + 12, ny + 8], [nx + 6, ny + 18]], 0.5);
  brush.set("cpencil", "#7a5c7e", 0.5);
  brush.spline([[nx - 14, ny + 16], [nx, ny + 22], [nx + 14, ny + 16]], 0.4);

  // --- Lips ---
  let lx = cx, ly = cy + 62;
  // Upper lip
  brush.hatchStyle("cpencil", "#b05060", 0.7);
  brush.hatch(3, 55, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(lx - 28, ly);
  brush.vertex(lx - 14, ly - 8);
  brush.vertex(lx, ly - 4);
  brush.vertex(lx + 14, ly - 8);
  brush.vertex(lx + 28, ly);
  brush.vertex(lx + 14, ly + 4);
  brush.vertex(lx, ly + 6);
  brush.vertex(lx - 14, ly + 4);
  brush.endShape(true);
  brush.noHatch();

  // Lower lip
  brush.hatchStyle("cpencil", "#c07080", 0.65);
  brush.hatch(3.5, 100, { rand: 0.04 });
  brush.beginShape(0.4);
  brush.vertex(lx - 26, ly + 2);
  brush.vertex(lx, ly + 6);
  brush.vertex(lx + 26, ly + 2);
  brush.vertex(lx + 20, ly + 20);
  brush.vertex(lx, ly + 24);
  brush.vertex(lx - 20, ly + 20);
  brush.endShape(true);
  brush.noHatch();

  // Lip accent
  brush.set("cpencil", "#7a3040", 0.6);
  brush.spline([[lx - 28, ly], [lx, ly + 6], [lx + 28, ly]], 0.35);

  // --- Cheek flush — unexpected teal blush ---
  let lchk = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    lchk.push([cx - 68 + cos(a) * (22 + noise(a * 0.07, 3) * 8), cy + 18 + sin(a) * (13 + noise(a * 0.07, 4) * 5)]);
  }
  brush.hatchStyle("cpencil", "#5a9a8a", 0.5);
  brush.hatch(5, 20, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let p of lchk) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  let rchk = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    rchk.push([cx + 68 + cos(a) * (22 + noise(a * 0.07, 5) * 8), cy + 18 + sin(a) * (13 + noise(a * 0.07, 6) * 5)]);
  }
  brush.hatchStyle("cpencil", "#5a9a8a", 0.5);
  brush.hatch(5, 20, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let p of rchk) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // --- Forehead memory marks — drifting horizontal lines ---
  brush.set("cpencil", "#8a7aaa", 0.5);
  for (let i = 0; i < 7; i++) {
    let fy = cy - faceH + 20 + i * 12;
    let fx0 = cx - faceW * 0.5 + noise(i, 0.1) * 20;
    let fx1 = cx + faceW * 0.5 - noise(i, 0.9) * 20;
    brush.spline([[fx0, fy + noise(i, 2) * 5], [cx, fy + noise(i, 3) * 7], [fx1, fy + noise(i, 4) * 5]], 0.3);
  }

  // --- Loose background texture — very faint strokes ---
  brush.hatchStyle("cpencil", "#c8bcd0", 0.4);
  brush.hatch(18, 135, { rand: 0.15 });
  brush.beginShape(0.0);
  brush.vertex(20, 20);
  brush.vertex(580, 20);
  brush.vertex(580, 580);
  brush.vertex(20, 580);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b8d0c8", 0.35);
  brush.hatch(22, 45, { rand: 0.12 });
  brush.beginShape(0.0);
  brush.vertex(20, 20);
  brush.vertex(580, 20);
  brush.vertex(580, 580);
  brush.vertex(20, 580);
  brush.endShape(true);
  brush.noHatch();

  // --- Final contour — ghostly outline ---
  brush.set("cpencil", "#7a6a8a", 0.55);
  brush.beginShape(0.45);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  noLoop();
}