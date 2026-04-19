function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const cx = 300;
  const cy = 300;

  // --- skull / head shape ---
  // Build a slightly irregular egg-shaped head
  const headPts = [];
  const headCX = cx;
  const headCY = cy - 20;
  const headRX = 105;
  const headRY = 130;
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * TWO_PI;
    const nx = noise(cos(a) * 0.4 + 1.5, sin(a) * 0.4 + 2.1) * 14 - 7;
    const ny = noise(cos(a) * 0.4 + 4.0, sin(a) * 0.4 + 5.3) * 14 - 7;
    headPts.push([
      headCX + cos(a) * headRX + nx,
      headCY + sin(a) * headRY + ny
    ]);
  }

  // --- neck / shoulder suggestion ---
  const neckPts = [
    [cx - 28, cy + 108],
    [cx - 38, cy + 155],
    [cx - 80, cy + 200],
    [cx - 120, cy + 240],
    [cx - 150, cy + 290],
    [cx + 150, cy + 290],
    [cx + 120, cy + 240],
    [cx + 80, cy + 200],
    [cx + 38, cy + 155],
    [cx + 28, cy + 108]
  ];

  // =============================================
  // LAYER 1 — base skin tone: warm ochre/amber
  // =============================================
  brush.noStroke();
  brush.hatchStyle("cpencil", "#c8843a", 0.7);
  brush.hatch(5, 25, { rand: 0.06, continuous: true });
  brush.beginShape(0.45);
  for (const p of headPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Neck/shoulders base
  brush.hatchStyle("cpencil", "#c8843a", 0.7);
  brush.hatch(5, 25, { rand: 0.06, continuous: true });
  brush.beginShape(0.35);
  for (const p of neckPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // =============================================
  // LAYER 2 — second color at different angle (rose/sienna)
  // =============================================
  brush.hatchStyle("cpencil", "#b05a5a", 0.65);
  brush.hatch(6, 72, { rand: 0.05, continuous: true });
  brush.beginShape(0.45);
  for (const p of headPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // =============================================
  // LAYER 3 — cool shadow: slate blue-violet on one side
  // =============================================
  // Shadow zone: left side of face
  const shadowPts = [];
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * TWO_PI;
    const nx = noise(cos(a) * 0.4 + 7.1, sin(a) * 0.4 + 8.3) * 10 - 5;
    const ny = noise(cos(a) * 0.4 + 9.0, sin(a) * 0.4 + 6.7) * 10 - 5;
    shadowPts.push([
      headCX - 18 + cos(a) * (headRX * 0.62) + nx,
      headCY + 12 + sin(a) * (headRY * 0.72) + ny
    ]);
  }

  brush.hatchStyle("cpencil", "#5a5a8c", 0.6);
  brush.hatch(7, 118, { rand: 0.07, continuous: true });
  brush.beginShape(0.4);
  for (const p of shadowPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // =============================================
  // LAYER 4 — muted green undertone (temperature shift)
  // =============================================
  brush.hatchStyle("cpencil", "#7a8c5a", 0.55);
  brush.hatch(8, 155, { rand: 0.06, continuous: true });
  // Forehead region
  const foreheadPts = [];
  for (let i = 0; i < 30; i++) {
    const a = (i / 30) * TWO_PI;
    const nx = noise(cos(a) * 0.3 + 11.1, sin(a) * 0.3 + 12.4) * 8 - 4;
    const ny = noise(cos(a) * 0.3 + 13.0, sin(a) * 0.3 + 14.2) * 8 - 4;
    foreheadPts.push([
      headCX + 10 + cos(a) * (headRX * 0.55) + nx,
      headCY - 35 + sin(a) * (headRY * 0.45) + ny
    ]);
  }
  brush.beginShape(0.4);
  for (const p of foreheadPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // =============================================
  // LAYER 5 — deeper shadow: dark plum (jaw/chin side)
  // =============================================
  const jawPts = [];
  for (let i = 0; i < 24; i++) {
    const a = PI * 0.15 + (i / 24) * PI * 0.85;
    const nx = noise(cos(a) * 0.5 + 20.1, sin(a) * 0.5 + 21.3) * 9 - 4.5;
    const ny = noise(cos(a) * 0.5 + 22.0, sin(a) * 0.5 + 23.5) * 9 - 4.5;
    jawPts.push([
      headCX + cos(a) * (headRX * 0.88) + nx,
      headCY + 30 + sin(a) * (headRY * 0.6) + ny
    ]);
  }
  jawPts.push([headCX, headCY + 108]);

  brush.hatchStyle("cpencil", "#6b3a5a", 0.7);
  brush.hatch(4, 40, { rand: 0.08, continuous: true });
  brush.beginShape(0.35);
  for (const p of jawPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // =============================================
  // FACIAL FEATURES — suggested, not realistic
  // =============================================

  // Eyes — two loose elliptical smears
  // Left eye zone
  const leftEyePts = [];
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * TWO_PI;
    leftEyePts.push([
      headCX - 38 + cos(a) * 22 + noise(i * 0.4 + 30) * 6 - 3,
      headCY - 28 + sin(a) * 11 + noise(i * 0.4 + 40) * 5 - 2.5
    ]);
  }
  brush.hatchStyle("cpencil", "#2a2060", 0.65);
  brush.hatch(4, 85, { rand: 0.06, continuous: true });
  brush.beginShape(0.4);
  for (const p of leftEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Right eye zone
  const rightEyePts = [];
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * TWO_PI;
    rightEyePts.push([
      headCX + 38 + cos(a) * 22 + noise(i * 0.4 + 50) * 6 - 3,
      headCY - 28 + sin(a) * 11 + noise(i * 0.4 + 60) * 5 - 2.5
    ]);
  }
  brush.hatchStyle("cpencil", "#1a3a5a", 0.65);
  brush.hatch(4, 95, { rand: 0.06, continuous: true });
  brush.beginShape(0.4);
  for (const p of rightEyePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Eye dark centers — small dense zones
  brush.hatchStyle("cpencil", "#0d0d1a", 0.8);
  brush.hatch(3, 60, { rand: 0.04, continuous: true });
  const leftPupilPts = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TWO_PI;
    leftPupilPts.push([
      headCX - 38 + cos(a) * 10 + noise(i * 0.5 + 70) * 4 - 2,
      headCY - 28 + sin(a) * 8 + noise(i * 0.5 + 80) * 3 - 1.5
    ]);
  }
  brush.beginShape(0.35);
  for (const p of leftPupilPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#0d0d1a", 0.8);
  brush.hatch(3, 60, { rand: 0.04, continuous: true });
  const rightPupilPts = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TWO_PI;
    rightPupilPts.push([
      headCX + 38 + cos(a) * 10 + noise(i * 0.5 + 90) * 4 - 2,
      headCY - 28 + sin(a) * 8 + noise(i * 0.5 + 100) * 3 - 1.5
    ]);
  }
  brush.beginShape(0.35);
  for (const p of rightPupilPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Nose — a few gestural strokes
  brush.stroke();
  brush.set("cpencil", "#8c4a3a", 0.7);
  brush.spline([
    [headCX - 10, headCY - 5, 0.5],
    [headCX - 14, headCY + 18, 0.8],
    [headCX - 8, headCY + 28, 0.9],
    [headCX + 5, headCY + 30, 0.7],
    [headCX + 14, headCY + 18, 0.6]
  ], 0.5);

  brush.set("cpencil", "#6b3a5a", 0.55);
  brush.spline([
    [headCX - 18, headCY + 28, 0.4],
    [headCX - 8, headCY + 32, 0.7],
    [headCX + 8, headCY + 32, 0.7],
    [headCX + 18, headCY + 28, 0.4]
  ], 0.4);

  // Mouth — loose, asymmetric
  brush.set("cpencil", "#7a2a3a", 0.75);
  brush.spline([
    [headCX - 30, headCY + 60, 0.5],
    [headCX - 12, headCY + 65, 0.9],
    [headCX, headCY + 63, 0.8],
    [headCX + 12, headCY + 65, 0.9],
    [headCX + 30, headCY + 58, 0.5]
  ], 0.45);

  // Lower lip hint
  brush.set("cpencil", "#b05a6a", 0.6);
  brush.spline([
    [headCX - 18, headCY + 68, 0.4],
    [headCX, headCY + 75, 0.8],
    [headCX + 18, headCY + 68, 0.4]
  ], 0.4);

  // =============================================
  // HAIR — loose gestural strokes, unexpected teal/indigo
  // =============================================
  // Hair mass top
  const hairTopPts = [];
  for (let i = 0; i < 32; i++) {
    const a = PI + (i / 32) * PI;
    const nr = noise(cos(a) * 0.6 + 31, sin(a) * 0.6 + 32) * 22 - 11;
    hairTopPts.push([
      headCX + cos(a) * (headRX + 14) + nr,
      headCY - 20 + sin(a) * (headRY + 18) + nr * 0.5
    ]);
  }
  hairTopPts.unshift([headCX - headRX - 5, headCY - 20]);
  hairTopPts.push([headCX + headRX + 5, headCY - 20]);

  brush.hatchStyle("cpencil", "#1a3a5c", 0.8);
  brush.hatch(5, 10, { rand: 0.08, continuous: true });
  brush.beginShape(0.4);
  for (const p of hairTopPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Hair second layer — teal
  brush.hatchStyle("cpencil", "#2a5c5a", 0.7);
  brush.hatch(6, 165, { rand: 0.09, continuous: true });
  brush.beginShape(0.4);
  for (const p of hairTopPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Loose hair strands falling
  brush.set("cpencil", "#1a3a5c", 0.75);
  for (let i = 0; i < 8; i++) {
    const startX = headCX - headRX + i * 15 + noise(i * 1.3 + 50) * 20;
    const startY = headCY - headRY + noise(i * 1.7 + 60) * 30;
    brush.spline([
      [startX, startY, 0.3],
      [startX - 8 + noise(i * 2.1) * 20, startY + 50, 0.6],
      [startX - 15 + noise(i * 2.5) * 20, startY + 110, 0.8],
      [startX - 20 + noise(i * 2.9) * 25, startY + 170, 0.5]
    ], 0.45);
  }

  brush.set("cpencil", "#2a5c5a", 0.65);
  for (let i = 0; i < 6; i++) {
    const startX = headCX + 20 + i * 14 + noise(i * 1.1 + 70) * 18;
    const startY = headCY - headRY + noise(i * 1.9 + 80) * 28;
    brush.spline([
      [startX, startY, 0.3],
      [startX + 6 + noise(i * 2.3) * 18, startY + 45, 0.6],
      [startX + 12 + noise(i * 2.7) * 18, startY + 100, 0.7],
      [startX + 18 + noise(i * 3.1) * 22, startY + 160, 0.4]
    ], 0.45);
  }

  // =============================================
  // CONTOUR LINES — loose, broken, cpencil
  // =============================================
  brush.set("cpencil", "#3a2a1a", 0.6);
  // Partial head outline — not complete, just suggestions
  const outlineSegA = headPts.slice(0, 14);
  brush.spline(outlineSegA.map(p => [p[0], p[1], 0.5 + noise(p[0] * 0.01) * 0.5]), 0.35);

  brush.set("cpencil", "#4a3a2a", 0.55);
  const outlineSegB = headPts.slice(18, 32);
  brush.spline(outlineSegB.map(p => [p[0], p[1], 0.4 + noise(p[1] * 0.01) * 0.6]), 0.35);

  // Jaw contour hint
  brush.set("cpencil", "#5a2a3a", 0.5);
  brush.spline([
    [headCX - headRX + 10, headCY + 40, 0.4],
    [headCX - headRX + 5, headCY + 70, 0.7],
    [headCX - 20, headCY + 108, 0.8],
    [headCX + 20, headCY + 108, 0.8],
    [headCX + headRX - 5, headCY + 70, 0.7],
    [headCX + headRX - 10, headCY + 40, 0.4]
  ], 0.4);

  // Cheekbone hint — warm rose
  brush.set("cpencil", "#c06070", 0.6);
  brush.spline([
    [headCX - 55, headCY + 10, 0.3],
    [headCX - 45, headCY + 18, 0.7],
    [headCX - 30, headCY + 22, 0.9],
    [headCX - 15, headCY + 20, 0.6]
  ], 0.45);

  brush.set("cpencil", "#c06070", 0.55);
  brush.spline([
    [headCX + 55, headCY + 10, 0.3],
    [headCX + 45, headCY + 18, 0.7],
    [headCX + 30, headCY + 22, 0.9],
    [headCX + 15, headCY + 20, 0.6]
  ], 0.45);

  // =============================================
  // ATMOSPHERE — very sparse loose marks around face
  // =============================================
  brush.set("cpencil", "#8a7a9a", 0.45);
  // A few stray lines suggesting space/air
  for (let i = 0; i < 6; i++) {
    const x = random(30, 120);
    const y = random(80, 480);
    brush.spline([
      [x, y, 0.2],
      [x + random(-15, 15), y + random(20, 50), 0.4],
      [x + random(-20, 20), y + random(55, 90), 0.2]
    ], 0.35);
  }

  brush.set("cpencil", "#9a8a6a", 0.4);
  for (let i = 0; i < 5; i++) {
    const x = random(460, 560);
    const y = random(100, 450);
    brush.spline([
      [x, y, 0.2],
      [x + random(-12, 12), y + random(18, 45), 0.35],
      [x + random(-18, 18), y + random(50, 80), 0.2]
    ], 0.35);
  }

  noLoop();
}