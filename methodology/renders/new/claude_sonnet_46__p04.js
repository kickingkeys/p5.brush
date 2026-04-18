let faceX, faceY, faceR;
let jawPts, browPts, eyeLPts, eyeRPts, nosePts, lipPts, neckPts, hairPts;

function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fdf6ee");
  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2);
  angleMode(DEGREES);

  faceX = 300;
  faceY = 280;
  faceR = 130;

  buildShapes();

  drawBackground();
  drawNeck();
  drawFaceBase();
  drawShadowZones();
  drawFeatures();
  drawHair();
  drawAccentStrokes();
}

function buildShapes() {
  jawPts = [];
  for (let i = 0; i <= 40; i++) {
    let t = i / 40;
    let a = map(t, 0, 1, 200, 340);
    let rx = faceR * 0.78 + noise(t * 3.1, 0.0) * 12 - 6;
    let ry = faceR * 1.05 + noise(t * 3.1, 1.0) * 10 - 5;
    jawPts.push([faceX + cos(a) * rx, faceY + sin(a) * ry]);
  }
  let topArc = [];
  for (let i = 0; i <= 30; i++) {
    let t = i / 30;
    let a = map(t, 0, 1, 340, 560);
    let rx = faceR * 0.82 + noise(t * 2.7, 2.0) * 10 - 5;
    let ry = faceR * 0.88 + noise(t * 2.7, 3.0) * 9 - 4;
    topArc.push([faceX + cos(a) * rx, faceY + sin(a) * ry]);
  }
  jawPts = jawPts.concat(topArc);

  browPts = [];
  for (let i = 0; i <= 20; i++) {
    let t = i / 20;
    let a = map(t, 0, 1, 200, 340);
    let rx = faceR * 0.55 + noise(t * 4, 5.0) * 8 - 4;
    let ry = faceR * 0.75 + noise(t * 4, 6.0) * 7 - 3;
    browPts.push([faceX + cos(a) * rx, faceY - 20 + sin(a) * ry]);
  }

  eyeLPts = buildEllipsePts(faceX - 48, faceY - 18, 28, 13, 20);
  eyeRPts = buildEllipsePts(faceX + 48, faceY - 18, 28, 13, 20);

  nosePts = [];
  for (let i = 0; i <= 24; i++) {
    let t = i / 24;
    let a = t * 360;
    let rx = 18 + noise(t * 3, 9.0) * 5 - 2;
    let ry = 22 + noise(t * 3, 10.0) * 5 - 2;
    nosePts.push([faceX + cos(a) * rx, faceY + 38 + sin(a) * ry]);
  }

  lipPts = [];
  for (let i = 0; i <= 30; i++) {
    let t = i / 30;
    let a = t * 360;
    let rx = 34 + noise(t * 3, 11.0) * 6 - 3;
    let ry = 14 + noise(t * 3, 12.0) * 5 - 2;
    lipPts.push([faceX + cos(a) * rx, faceY + 72 + sin(a) * ry]);
  }

  neckPts = [
    [faceX - 38, faceY + 108],
    [faceX - 42, faceY + 160],
    [faceX - 28, faceY + 195],
    [faceX + 28, faceY + 195],
    [faceX + 42, faceY + 160],
    [faceX + 38, faceY + 108],
  ];

  hairPts = [];
  for (let i = 0; i <= 50; i++) {
    let t = i / 50;
    let a = map(t, 0, 1, 160, 380);
    let rx = faceR * 0.92 + noise(t * 4, 14.0) * 18 - 9;
    let ry = faceR * 0.95 + noise(t * 4, 15.0) * 18 - 9;
    hairPts.push([faceX + cos(a) * rx, faceY - 30 + sin(a) * ry]);
  }
}

function buildEllipsePts(cx, cy, rx, ry, n) {
  let pts = [];
  for (let i = 0; i <= n; i++) {
    let t = i / n;
    let a = t * 360;
    pts.push([
      cx + cos(a) * (rx + noise(t * 5, cx * 0.01) * 4 - 2),
      cy + sin(a) * (ry + noise(t * 5, cy * 0.01) * 3 - 1),
    ]);
  }
  return pts;
}

function drawBackground() {
  brush.noStroke();
  brush.hatchStyle("2H", "#c8bfb0", 0.5);
  brush.hatch(18, 15, { rand: 0.08 });
  brush.beginShape(0.4);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#d4cfc8", 0.4);
  brush.hatch(22, 80, { rand: 0.1 });
  brush.beginShape(0.4);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();
}

function drawNeck() {
  brush.noStroke();
  brush.hatchStyle("cpencil", "#c49a72", 0.7);
  brush.hatch(6, 88, { rand: 0.07, continuous: true });
  brush.beginShape(0.35);
  for (let p of neckPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#a87c5a", 0.6);
  brush.hatch(8, 30, { rand: 0.06 });
  brush.beginShape(0.35);
  for (let p of neckPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawFaceBase() {
  brush.noStroke();

  brush.hatchStyle("cpencil", "#e8c9a8", 0.8);
  brush.hatch(5, 70, { rand: 0.06, continuous: true });
  brush.beginShape(0.45);
  for (let p of jawPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#d4a882", 0.7);
  brush.hatch(7, 120, { rand: 0.07 });
  brush.beginShape(0.45);
  for (let p of jawPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#c8907a", 0.55);
  brush.hatch(9, 40, { rand: 0.08 });
  brush.beginShape(0.45);
  for (let p of jawPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b87a8a", 0.45);
  brush.hatch(14, 155, { rand: 0.09 });
  brush.beginShape(0.45);
  for (let p of jawPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawShadowZones() {
  brush.noStroke();

  let leftShadow = buildEllipsePts(faceX - 85, faceY + 10, 52, 70, 28);
  brush.hatchStyle("cpencil", "#8a5c7a", 0.6);
  brush.hatch(5, 60, { rand: 0.1 });
  brush.beginShape(0.4);
  for (let p of leftShadow) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6a4460", 0.5);
  brush.hatch(7, 110, { rand: 0.1 });
  brush.beginShape(0.4);
  for (let p of leftShadow) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  let chinShadow = buildEllipsePts(faceX + 10, faceY + 100, 48, 22, 22);
  brush.hatchStyle("cpencil", "#a06868", 0.6);
  brush.hatch(6, 85, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let p of chinShadow) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  let browShadow = buildEllipsePts(faceX, faceY - 55, 80, 28, 24);
  brush.hatchStyle("cpencil", "#7a6a9a", 0.5);
  brush.hatch(8, 25, { rand: 0.09 });
  brush.beginShape(0.4);
  for (let p of browShadow) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5a4a7a", 0.45);
  brush.hatch(11, 70, { rand: 0.1 });
  brush.beginShape(0.4);
  for (let p of browShadow) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawFeatures() {
  brush.noStroke();

  brush.hatchStyle("cpencil", "#3a3060", 0.8);
  brush.hatch(3, 50, { rand: 0.06, continuous: true });
  brush.beginShape(0.35);
  for (let p of eyeLPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#4a2050", 0.7);
  brush.hatch(4, 100, { rand: 0.07 });
  brush.beginShape(0.35);
  for (let p of eyeLPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#3a3060", 0.8);
  brush.hatch(3, 50, { rand: 0.06, continuous: true });
  brush.beginShape(0.35);
  for (let p of eyeRPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#4a2050", 0.7);
  brush.hatch(4, 100, { rand: 0.07 });
  brush.beginShape(0.35);
  for (let p of eyeRPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  let browL = [];
  for (let i = 0; i <= 16; i++) {
    let t = i / 16;
    browL.push([
      faceX - 75 + t * 55 + noise(t * 4, 20) * 6 - 3,
      faceY - 52 + sin(t * 180) * (-8) + noise(t * 4, 21) * 5 - 2,
    ]);
  }
  let browR = [];
  for (let i = 0; i <= 16; i++) {
    let t = i / 16;
    browR.push([
      faceX + 20 + t * 55 + noise(t * 4, 22) * 6 - 3,
      faceY - 52 + sin(t * 180) * (-8) + noise(t * 4, 23) * 5 - 2,
    ]);
  }

  brush.set("cpencil", "#2a1a40", 0.9);
  brush.spline(browL, 0.45);
  brush.spline(browR, 0.45);

  brush.hatchStyle("cpencil", "#9a5060", 0.7);
  brush.hatch(4, 65, { rand: 0.07, continuous: true });
  brush.beginShape(0.4);
  for (let p of nosePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#7a3848", 0.6);
  brush.hatch(6, 120, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let p of nosePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#9a3848", 0.75);
  brush.hatch(4, 30, { rand: 0.07, continuous: true });
  brush.beginShape(0.4);
  for (let p of lipPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#7a2838", 0.65);
  brush.hatch(5, 80, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let p of lipPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5a1828", 0.55);
  brush.hatch(7, 130, { rand: 0.09 });
  brush.beginShape(0.4);
  for (let p of lipPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawHair() {
  brush.noStroke();

  brush.hatchStyle("cpencil", "#2a1a10", 0.9);
  brush.hatch(4, 75, { rand: 0.08, continuous: true });
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#3a2820", 0.8);
  brush.hatch(5, 30, { rand: 0.09 });
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#4a3060", 0.65);
  brush.hatch(7, 120, { rand: 0.1 });
  brush.beginShape(0.4);
  for (let p of hairPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  for (let i = 0; i < 18; i++) {
    let startIdx = floor(random(hairPts.length - 4));
    let strand = [];
    let sx = hairPts[startIdx][0] + random(-10, 10);
    let sy = hairPts[startIdx][1] + random(-10, 10);
    let steps = floor(random(4, 8));
    for (let j = 0; j < steps; j++) {
      strand.push([
        sx + j * random(8, 18) * (random() > 0.5 ? 1 : -1) + noise(j * 0.4, i) * 20 - 10,
        sy + j * random(6, 14) + noise(j * 0.4, i + 50) * 12 - 6,
      ]);
    }
    brush.set("cpencil", random(["#1a0a08", "#2a1a18", "#3a2040", "#251510"]), random(0.5, 1.1));
    brush.spline(strand, 0.4);
  }
}

function drawAccentStrokes() {
  brush.set("cpencil", "#7a9aaa", 0.6);
  for (let i = 0; i < 8; i++) {
    let sx = faceX + random(-60, 60);
    let sy = faceY + random(-80, 80);
    let ex = sx + random(-40, 40);
    let ey = sy + random(-30, 30);
    brush.line(sx, sy, ex, ey);
  }

  brush.set("cpencil", "#8a6a9a", 0.55);
  for (let i = 0; i < 6; i++) {
    let pts = [];
    let sx = faceX + random(-90, 90);
    let sy = faceY + random(-100, 100);
    for (let j = 0; j < 4; j++) {
      pts.push([sx + j * random(12, 22) + noise(j, i + 70) * 16 - 8,
                sy + noise(j + 0.5, i + 70) * 20 - 10]);
    }
    brush.spline(pts, 0.35);
  }

  brush.set("cpencil", "#c8a060", 0.5);
  for (let i = 0; i < 5; i++) {
    let pts = [];
    let sx = faceX + random(-100, 100);
    let sy = faceY + random(-110, 110);
    for (let j = 0; j < 3; j++) {
      pts.push([sx + j * random(10, 20) + noise(j, i + 90) * 14 - 7,
                sy + noise(j + 0.5, i + 90) * 18 - 9]);
    }
    brush.spline(pts, 0.3);
  }

  brush.set("2H", "#b0c0c8", 0.6);
  for (let i = 0; i < 12; i++) {
    let sx = random(30, 570);
    let sy = random(30, 570);
    brush.line(sx, sy, sx + random(-35, 35), sy + random(-25, 25));
  }
}