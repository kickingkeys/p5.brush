function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  const cx = 300;
  const cy = 290;

  // --- Background atmosphere ---
  brush.hatchStyle("2H", "#c8b8d8", 0.4);
  brush.hatch(18, 110, { rand: 0.08, continuous: false });
  brush.noStroke();
  brush.beginShape(0.5);
  for (let i = 0; i < 36; i++) {
    let a = i * 10;
    let r = 280 + noise(cos(a) * 0.1, sin(a) * 0.1, 0) * 30;
    brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#d4c8e8", 0.3);
  brush.hatch(22, 65, { rand: 0.06 });
  brush.beginShape(0.5);
  for (let i = 0; i < 36; i++) {
    let a = i * 10;
    let r = 260 + noise(cos(a) * 0.12, sin(a) * 0.12, 1) * 25;
    brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
  }
  brush.endShape(true);
  brush.noHatch();

  // --- Neck ---
  let neckPts = [];
  for (let i = 0; i < 20; i++) {
    let t = i / 19;
    let x = cx - 28 + noise(t * 3, 10) * 12 + t * 2;
    let y = 390 + t * 80 + noise(t * 2, 20) * 6;
    neckPts.push([x, y]);
  }
  brush.hatchStyle("cpencil", "#c49a72", 0.7);
  brush.hatch(5, 80, { rand: 0.05, continuous: true });
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(cx - 32, 390);
  brush.vertex(cx + 32, 390);
  brush.vertex(cx + 28, 470);
  brush.vertex(cx - 28, 470);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#a87850", 0.6);
  brush.hatch(7, 40, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(cx - 32, 390);
  brush.vertex(cx + 32, 390);
  brush.vertex(cx + 28, 470);
  brush.vertex(cx - 28, 470);
  brush.endShape(true);
  brush.noHatch();

  // --- Face base shape ---
  let facePts = [];
  for (let i = 0; i < 48; i++) {
    let a = i * (360 / 48) - 90;
    let rx = 105 + noise(cos(a) * 0.08, sin(a) * 0.08, 2) * 18;
    let ry = 130 + noise(cos(a) * 0.09, sin(a) * 0.09, 3) * 16;
    facePts.push([cx + cos(a) * rx, cy + sin(a) * ry]);
  }

  // Face layer 1 — warm peach base
  brush.hatchStyle("cpencil", "#e8b48a", 0.8);
  brush.hatch(5, 15, { rand: 0.05, continuous: true });
  brush.noStroke();
  brush.beginShape(0.5);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Face layer 2 — golden tone cross-hatch
  brush.hatchStyle("cpencil", "#d4956a", 0.7);
  brush.hatch(6, 70, { rand: 0.06 });
  brush.beginShape(0.5);
  for (let p of facePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Face layer 3 — lavender shadow overlay
  brush.hatchStyle("cpencil", "#9b8ab8", 0.5);
  brush.hatch(9, 130, { rand: 0.07 });
  brush.beginShape(0.5);
  for (let p of facePts) brush.vertex(lerp(cx, p[0], 0.85), lerp(cy, p[1], 0.85));
  brush.endShape(true);
  brush.noHatch();

  // Face layer 4 — warm highlight center
  brush.hatchStyle("2H", "#f5d8b8", 0.4);
  brush.hatch(11, 45, { rand: 0.04 });
  brush.beginShape(0.5);
  for (let p of facePts) brush.vertex(lerp(cx, p[0], 0.5), lerp(cy, p[1], 0.5));
  brush.endShape(true);
  brush.noHatch();

  // --- Shadow zones ---
  // Left cheek shadow
  brush.hatchStyle("cpencil", "#7a5a8a", 0.6);
  brush.hatch(5, 100, { rand: 0.08 });
  brush.beginShape(0.4);
  brush.vertex(cx - 105, cy - 30);
  brush.vertex(cx - 60, cy - 60);
  brush.vertex(cx - 50, cy + 40);
  brush.vertex(cx - 95, cy + 50);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5a3a6a", 0.5);
  brush.hatch(7, 55, { rand: 0.07 });
  brush.beginShape(0.4);
  brush.vertex(cx - 105, cy - 30);
  brush.vertex(cx - 60, cy - 60);
  brush.vertex(cx - 50, cy + 40);
  brush.vertex(cx - 95, cy + 50);
  brush.endShape(true);
  brush.noHatch();

  // Right cheek warm flush
  brush.hatchStyle("cpencil", "#d46a7a", 0.6);
  brush.hatch(6, 30, { rand: 0.07 });
  brush.beginShape(0.4);
  brush.vertex(cx + 55, cy + 10);
  brush.vertex(cx + 100, cy - 20);
  brush.vertex(cx + 98, cy + 60);
  brush.vertex(cx + 50, cy + 70);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#c44a5a", 0.5);
  brush.hatch(8, 80, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(cx + 55, cy + 10);
  brush.vertex(cx + 100, cy - 20);
  brush.vertex(cx + 98, cy + 60);
  brush.vertex(cx + 50, cy + 70);
  brush.endShape(true);
  brush.noHatch();

  // Forehead cool teal tone
  brush.hatchStyle("cpencil", "#6a9aaa", 0.5);
  brush.hatch(8, 20, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(cx - 60, cy - 100);
  brush.vertex(cx + 60, cy - 100);
  brush.vertex(cx + 50, cy - 40);
  brush.vertex(cx - 50, cy - 40);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#4a7a8a", 0.4);
  brush.hatch(11, 70, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(cx - 60, cy - 100);
  brush.vertex(cx + 60, cy - 100);
  brush.vertex(cx + 50, cy - 40);
  brush.vertex(cx - 50, cy - 40);
  brush.endShape(true);
  brush.noHatch();

  // --- Hair mass ---
  // Main hair silhouette — dark indigo
  let hairPts = [];
  for (let i = 0; i < 40; i++) {
    let a = i * 9 - 90;
    let rx, ry;
    if (a < 90) {
      rx = 120 + noise(cos(a) * 0.1, sin(a) * 0.1, 5) * 30;
      ry = 150 + noise(cos(a) * 0.1, sin(a) * 0.1, 6) * 20;
    } else {
      rx = 108 + noise(cos(a) * 0.08, sin(a) * 0.08, 7) * 15;
      ry = 135 + noise(cos(a) * 0.08, sin(a) * 0.08, 8) * 12;
    }
    hairPts.push([cx + cos(a) * rx, cy - 20 + sin(a) * ry]);
  }

  brush.hatchStyle("cpencil", "#1a1a3a", 0.9);
  brush.hatch(4, 95, { rand: 0.06, continuous: true });
  brush.noStroke();
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a2a5a", 0.7);
  brush.hatch(5, 40, { rand: 0.07 });
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Hair shimmer — unexpected teal highlight
  brush.hatchStyle("cpencil", "#3a6a8a", 0.5);
  brush.hatch(7, 120, { rand: 0.05 });
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(lerp(cx, p[0], 0.7), lerp(cy - 20, p[1], 0.7));
  brush.endShape(true);
  brush.noHatch();

  // Hair strands — fine lines
  brush.set("2H", "#0a0a2a", 0.5);
  for (let i = 0; i < 18; i++) {
    let startA = -120 + i * 15 + noise(i, 30) * 10;
    let startR = 100 + noise(i, 40) * 15;
    let sx = cx + cos(startA) * startR;
    let sy = (cy - 20) + sin(startA) * startR * 1.1;
    let ex = sx + noise(i, 50) * 30 - 15;
    let ey = sy - 20 - noise(i, 60) * 25;
    brush.line(sx, sy, ex, ey);
  }

  // --- Eyes ---
  // Left eye
  let leyX = cx - 38;
  let leyY = cy - 18;

  brush.hatchStyle("cpencil", "#2a1a4a", 0.8);
  brush.hatch(3, 75, { rand: 0.04, continuous: true });
  brush.noStroke();
  brush.beginShape(0.3);
  for (let i = 0; i < 20; i++) {
    let t = i / 19;
    let a = t * 180;
    brush.vertex(leyX + cos(a) * 22, leyY - sin(a) * 9);
  }
  for (let i = 20; i >= 0; i--) {
    let t = i / 20;
    let a = t * 180;
    brush.vertex(leyX + cos(a) * 22, leyY + sin(a) * 5);
  }
  brush.endShape(true);
  brush.noHatch();

  // Left iris — unexpected amber
  brush.hatchStyle("cpencil", "#c87820", 0.7);
  brush.hatch(3, 30, { rand: 0.05 });
  brush.beginShape(0.3);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    brush.vertex(leyX + cos(a) * 10, leyY + sin(a) * 9);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#8a4a10", 0.6);
  brush.hatch(4, 90, { rand: 0.04 });
  brush.beginShape(0.3);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    brush.vertex(leyX + cos(a) * 10, leyY + sin(a) * 9);
  }
  brush.endShape(true);
  brush.noHatch();

  // Left pupil
  brush.hatchStyle("2B", "#050510", 1.0);
  brush.hatch(2, 45, { rand: 0.03 });
  brush.beginShape(0.3);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    brush.vertex(leyX + cos(a) * 5, leyY + sin(a) * 5);
  }
  brush.endShape(true);
  brush.noHatch();

  // Left eyelid line
  brush.set("cpencil", "#1a0a3a", 0.8);
  let lEyeLidPts = [];
  for (let i = 0; i <= 10; i++) {
    let t = i / 10;
    let a = t * 180;
    lEyeLidPts.push([leyX + cos(a) * 22 + noise(t * 4, 70) * 3 - 1.5,
                      leyY - sin(a) * 9 + noise(t * 4, 80) * 2 - 1]);
  }
  brush.spline(lEyeLidPts, 0.4);

  // Right eye
  let reyX = cx + 38;
  let reyY = cy - 20;

  brush.hatchStyle("cpencil", "#2a1a4a", 0.8);
  brush.hatch(3, 75, { rand: 0.04, continuous: true });
  brush.noStroke();
  brush.beginShape(0.3);
  for (let i = 0; i < 20; i++) {
    let t = i / 19;
    let a = t * 180;
    brush.vertex(reyX + cos(a) * 22, reyY - sin(a) * 9);
  }
  for (let i = 20; i >= 0; i--) {
    let t = i / 20;
    let a = t * 180;
    brush.vertex(reyX + cos(a) * 22, reyY + sin(a) * 5);
  }
  brush.endShape(true);
  brush.noHatch();

  // Right iris — unexpected teal-green
  brush.hatchStyle("cpencil", "#208a60", 0.7);
  brush.hatch(3, 30, { rand: 0.05 });
  brush.beginShape(0.3);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    brush.vertex(reyX + cos(a) * 10, reyY + sin(a) * 9);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#105a38", 0.6);
  brush.hatch(4, 90, { rand: 0.04 });
  brush.beginShape(0.3);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    brush.vertex(reyX + cos(a) * 10, reyY + sin(a) * 9);
  }
  brush.endShape(true);
  brush.noHatch();

  // Right pupil
  brush.hatchStyle("2B", "#050510", 1.0);
  brush.hatch(2, 45, { rand: 0.03 });
  brush.beginShape(0.3);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    brush.vertex(reyX + cos(a) * 5, reyY + sin(a) * 5);
  }
  brush.endShape(true);
  brush.noHatch();

  // Right eyelid line
  brush.set("cpencil", "#1a0a3a", 0.8);
  let rEyeLidPts = [];
  for (let i = 0; i <= 10; i++) {
    let t = i / 10;
    let a = t * 180;
    rEyeLidPts.push([reyX + cos(a) * 22 + noise(t * 4, 90) * 3 - 1.5,
                      reyY - sin(a) * 9 + noise(t * 4, 100) * 2 - 1]);
  }
  brush.spline(rEyeLidPts, 0.4);

  // --- Eyebrows ---
  // Left brow — unexpected rust color
  brush.set("cpencil", "#8a3020", 0.7);
  let lBrowPts = [];
  for (let i = 0; i <= 12; i++) {
    let t = i / 12;
    lBrowPts.push([
      leyX - 24 + t * 48 + noise(t * 5, 110) * 5 - 2.5,
      leyY - 22 - sin(t * 180) * 6 + noise(t * 5, 120) * 4 - 2
    ]);
  }
  brush.spline(lBrowPts, 0.35);
  brush.set("cpencil", "#6a1a10", 0.5);
  let lBrowPts2 = [];
  for (let i = 0; i <= 12; i++) {
    let t = i / 12;
    lBrowPts2.push([
      leyX - 22 + t * 44 + noise(t * 5, 130) * 4 - 2,
      leyY - 25 - sin(t * 180) * 5 + noise(t * 5, 140) * 3 - 1.5
    ]);
  }
  brush.spline(lBrowPts2, 0.35);

  // Right brow
  brush.set("cpencil", "#8a3020", 0.7);
  let rBrowPts = [];
  for (let i = 0; i <= 12; i++) {
    let t = i / 12;
    rBrowPts.push([
      reyX - 24 + t * 48 + noise(t * 5, 150) * 5 - 2.5,
      reyY - 22 - sin(t * 180) * 6 + noise(t * 5, 160) * 4 - 2
    ]);
  }
  brush.spline(rBrowPts, 0.35);
  brush.set("cpencil", "#6a1a10", 0.5);
  let rBrowPts2 = [];
  for (let i = 0; i <= 12; i++) {
    let t = i / 12;
    rBrowPts2.push([
      reyX - 22 + t * 44 + noise(t * 5, 170) * 4 - 2,
      reyY - 25 - sin(t * 180) * 5 + noise(t * 5, 180) * 3 - 1.5
    ]);
  }
  brush.spline(rBrowPts2, 0.35);

  // --- Nose ---
  // Nose bridge
  brush.set("cpencil", "#9a7a5a", 0.6);
  let noseBridgePts = [];
  for (let i = 0; i <= 10; i++) {
    let t = i / 10;
    noseBridgePts.push([
      cx - 8 + sin(t * 180) * 6 + noise(t * 3, 200) * 4 - 2,
      cy - 10 + t * 55 + noise(t * 3, 210) * 3 - 1.5
    ]);
  }
  brush.spline(noseBridgePts, 0.3);

  brush.set("cpencil", "#7a5a3a", 0.5);
  let noseBridgePts2 = [];
  for (let i = 0; i <= 10; i++) {
    let t = i / 10;
    noseBridgePts2.push([
      cx - 5 + sin(t * 180) * 5 + noise(t * 3, 220) * 3 - 1.5,
      cy - 8 + t * 53 + noise(t * 3, 230) * 3 - 1.5
    ]);
  }
  brush.spline(noseBridgePts2, 0.3);

  // Nose tip shadow — lavender
  brush.hatchStyle("cpencil", "#7a6a9a", 0.6);
  brush.hatch(5, 60, { rand: 0.06 });
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(cx - 20, cy + 42);
  brush.vertex(cx + 20, cy + 42);
  brush.vertex(cx + 18, cy + 58);
  brush.vertex(cx, cy + 62);
  brush.vertex(cx - 18, cy + 58);
  brush.endShape(true);
  brush.noHatch();

  // Nostril hints
  brush.set("cpencil", "#5a3a2a", 0.6);
  brush.arc(cx - 14, cy + 54, 7, 0, 180);
  brush.arc(cx + 14, cy + 54, 7, 0, 180);

  // --- Lips ---
  let lipY = cy + 90;

  // Upper lip — deep rose
  brush.hatchStyle("cpencil", "#8a2a3a", 0.8);
  brush.hatch(4, 20, { rand: 0.05, continuous: true });
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(cx - 28, lipY);
  brush.vertex(cx - 12, lipY - 10);
  brush.vertex(cx, lipY - 6);
  brush.vertex(cx + 12, lipY - 10);
  brush.vertex(cx + 28, lipY);
  brush.vertex(cx + 14, lipY + 4);
  brush.vertex(cx, lipY + 2);
  brush.vertex(cx - 14, lipY + 4);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6a1a28", 0.6);
  brush.hatch(5, 75, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(cx - 28, lipY);
  brush.vertex(cx - 12, lipY - 10);
  brush.vertex(cx, lipY - 6);
  brush.vertex(cx + 12, lipY - 10);
  brush.vertex(cx + 28, lipY);
  brush.vertex(cx + 14, lipY + 4);
  brush.vertex(cx, lipY + 2);
  brush.vertex(cx - 14, lipY + 4);
  brush.endShape(true);
  brush.noHatch();

  // Lower lip — unexpected coral
  brush.hatchStyle("cpencil", "#c85a40", 0.8);
  brush.hatch(4, 40, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx - 28, lipY + 1);
  brush.vertex(cx + 28, lipY + 1);
  brush.vertex(cx + 22, lipY + 20);
  brush.vertex(cx, lipY + 24);
  brush.vertex(cx - 22, lipY + 20);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#a83a20", 0.6);
  brush.hatch(5, 100, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(cx - 28, lipY + 1);
  brush.vertex(cx + 28, lipY + 1);
  brush.vertex(cx + 22, lipY + 20);
  brush.vertex(cx, lipY + 24);
  brush.vertex(cx - 22, lipY + 20);
  brush.endShape(true);
  brush.noHatch();

  // Lip line
  brush.set("cpencil", "#4a1018", 0.6);
  brush.line(cx - 28, lipY, cx + 28, lipY);

  // --- Ear suggestion — left ---
  brush.hatchStyle("cpencil", "#c49060", 0.6);
  brush.hatch(6, 80, { rand: 0.07 });
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(cx - 100, cy - 20);
  brush.vertex(cx - 88, cy - 35);
  brush.vertex(cx - 80, cy - 20);
  brush.vertex(cx - 82, cy + 15);
  brush.vertex(cx - 96, cy + 20);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#8a5a3a", 0.5);
  brush.hatch(8, 35, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(cx - 100, cy - 20);
  brush.vertex(cx - 88, cy - 35);
  brush.vertex(cx - 80, cy - 20);
  brush.vertex(cx - 82, cy + 15);
  brush.vertex(cx - 96, cy + 20);
  brush.endShape(true);
  brush.noHatch();

  // --- Chin shadow ---
  brush.hatchStyle("cpencil", "#7a5a8a", 0.5);
  brush.hatch(8, 110, { rand: 0.06 });
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(cx - 40, cy + 115);
  brush.vertex(cx + 40, cy + 115);
  brush.vertex(cx + 30, cy + 140);
  brush.vertex(cx, cy + 145);
  brush.vertex(cx - 30, cy + 140);
  brush.endShape(true);
  brush.noHatch();

  // --- Scattered memory marks — unexpected colors drifting off-face ---
  brush.set("cpencil", "#4a8a9a", 0.4);
  for (let i = 0; i < 8; i++) {
    let mx = cx + noise(i, 300) * 200 - 100;
    let my = 80 + noise(i, 310) * 440;
    let ml = 15 + noise(i, 320) * 30;
    let ma = noise(i, 330) * 360;
    brush.line(mx, my, mx + cos(ma) * ml, my + sin(ma) * ml);
  }

  brush.set("cpencil", "#9a4a7a", 0.4);
  for (let i = 0; i < 7; i++) {
    let mx = cx + noise(i + 20, 300) * 220 - 110;
    let my = 60 + noise(i + 20, 310) * 460;
    let ml = 12 + noise(i + 20, 320) * 25;
    let ma = noise(i + 20, 330) * 360;
    brush.line(mx, my, mx + cos(ma) * ml, my + sin(ma) * ml);
  }

  brush.set("cpencil", "#6a9a4a", 0.3);
  for (let i = 0; i < 6; i++) {
    let mx = cx + noise(i + 40, 300) * 240 - 120;
    let my = 50 + noise(i + 40, 310) * 480;
    let ml = 10 + noise(i + 40, 320) * 20;
    let ma = noise(i + 40, 330) * 360;
    brush.line(mx, my, mx + cos(ma) * ml, my + sin(ma) * ml);
  }

  // --- Contour lines — ghost outline ---
  brush.set("cpencil", "#3a2a5a", 0.6);
  let contourPts = [];
  for (let i = 0; i <= 24; i++) {
    let t = i / 24;
    let a = t * 360 - 90;
    let rx = 105 + noise(cos(a) * 0.1, sin(a) * 0.1, 9) * 12;
    let ry = 130 + noise(cos(a) * 0.1, sin(a) * 0.1, 10) * 10;
    contourPts.push([cx + cos(a) * rx + noise(i, 400) * 6 - 3,
                     cy + sin(a) * ry + noise(i, 410) * 5 - 2.5]);
  }
  brush.spline(contourPts, 0.4);

  brush.set("cpencil", "#5a3a7a", 0.4);
  let contourPts2 = [];
  for (let i = 0; i <= 20; i++) {
    let t = i / 20;
    let a = t * 360 - 90;
    let rx = 107 + noise(cos(a) * 0.1, sin(a) * 0.1, 11) * 10;
    let ry = 132 + noise(cos(a) * 0.1, sin(a) * 0.1, 12) * 8;
    contourPts2.push([cx + cos(a) * rx + noise(i + 100, 400) * 5 - 2.5,
                      cy + sin(a) * ry + noise(i + 100, 410) * 4 - 2]);
  }
  brush.spline(contourPts2, 0.4);

  noLoop();
}