function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(101);
  noiseSeed(101);

  brush.noFill();
  brush.noWash();
  brush.noMass();

  // 1. Background gestural smudges (light 2H hatching)
  brush.noStroke();
  brush.hatchStyle("2H", "#8a8a8a", 0.6);
  brush.hatch(8, 55, { rand: 0.15, continuous: true });
  brush.beginShape(0.6);
  for (let i = 0; i < 14; i++) {
    let a = i * (360 / 14);
    let r = 160 + noise(i * 0.5) * 70;
    brush.vertex(320 + cos(a) * r, 280 + sin(a) * r);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#999999", 0.4);
  brush.hatch(12, -25, { rand: 0.2, continuous: true });
  brush.beginShape(0.6);
  for (let i = 0; i < 12; i++) {
    let a = i * (360 / 12);
    let r = 140 + noise(i * 0.5 + 10) * 80;
    brush.vertex(280 + cos(a) * r, 320 + sin(a) * r);
  }
  brush.endShape(true);
  brush.noHatch();

  // 2. Grass Leaves (sweeping from the base)
  drawBlade(260, 650, 320, -105, -35);
  drawBlade(340, 650, 280, -75, 45);
  drawBlade(300, 650, 380, -90, 25);
  drawBlade(220, 650, 240, -125, -40);
  drawBlade(390, 650, 200, -55, 50);

  // 3. Oat grasses (loose, branching panicles)
  drawOatStalk(230, 650, 420, -100);
  drawOatStalk(410, 650, 370, -65);

  // 4. Wheat grasses (dense heads)
  drawWheatStalk(290, 650, 480, -92);
  drawWheatStalk(350, 650, 450, -82);

  // 5. Unfinished stray marks
  brush.noHatch();
  brush.set("2H", "#777777", 0.4);
  for (let i = 0; i < 6; i++) {
    let sx = random(150, 450);
    let sy = random(150, 500);
    brush.line(sx, sy, sx + random(-20, 20), sy + random(-20, 20));
  }

  noLoop();
}

function drawBlade(startX, startY, length, angle, bendAngle) {
  let pts1 = [];
  let pts2 = [];
  let cx = startX;
  let cy = startY;
  let curAng = angle;
  let w = random(7, 12);

  for (let i = 0; i <= 20; i++) {
    let t = i / 20;
    let currentW = w * (1 - t * t);
    pts1.push([cx + cos(curAng + 90) * currentW, cy + sin(curAng + 90) * currentW]);
    pts2.push([cx + cos(curAng - 90) * currentW, cy + sin(curAng - 90) * currentW]);

    curAng += bendAngle * 0.05;
    cx += cos(curAng) * (length / 20);
    cy += sin(curAng) * (length / 20);
  }
  
  pts2.reverse();
  let allPts = pts1.concat(pts2);

  brush.noStroke();
  brush.hatchStyle("2H", "#6a6a6a", 0.6);
  brush.hatch(3.5, angle + 20, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  for (let p of allPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.set("HB", "#3a3a3a", 0.8);
  brush.beginShape(0.3);
  for (let p of pts1) brush.vertex(p[0], p[1]);
  brush.endShape(false);

  brush.set("2H", "#555555", 0.5);
  brush.beginShape(0.3);
  for (let p of pts2) brush.vertex(p[0], p[1]);
  brush.endShape(false);

  brush.set("2H", "#7a7a7a", 0.4);
  let veinPts = [];
  cx = startX;
  cy = startY;
  curAng = angle;
  for (let i = 0; i <= 20; i++) {
    veinPts.push([cx, cy]);
    curAng += bendAngle * 0.05;
    cx += cos(curAng) * (length / 20);
    cy += sin(curAng) * (length / 20);
  }
  brush.spline(veinPts, 0.3);
}

function drawWheatStalk(x, y, length, baseAngle) {
  let pts = [];
  let cx = x, cy = y, ang = baseAngle;
  let segs = 26;
  let segL = length / segs;

  for (let i = 0; i <= segs; i++) {
    pts.push([cx, cy]);
    ang += (noise(cx * 0.015, cy * 0.015) - 0.45) * 7;
    cx += cos(ang) * segL;
    cy += sin(ang) * segL;
  }

  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#2a2a2a", 1.1);
  brush.spline(pts, 0.4);

  let headStart = floor(segs * 0.55);
  for (let i = headStart; i < segs; i++) {
    let p1 = pts[i];
    let p2 = pts[i + 1];
    let localAng = atan2(p2[1] - p1[1], p2[0] - p1[0]);
    let size = map(i, headStart, segs, 19, 7);

    drawWheatSpikelet(p1[0], p1[1], localAng - 30, size);
    
    let midX = (p1[0] + p2[0]) / 2;
    let midY = (p1[1] + p2[1]) / 2;
    drawWheatSpikelet(midX, midY, localAng + 30, size * 0.95);
  }
  
  let lastP = pts[segs];
  let finalAng = atan2(lastP[1] - pts[segs-1][1], lastP[0] - pts[segs-1][0]);
  drawWheatSpikelet(lastP[0], lastP[1], finalAng, 9);
}

function drawWheatSpikelet(x, y, angle, size) {
  let tipX = x + cos(angle) * size;
  let tipY = y + sin(angle) * size;
  let m1X = x + cos(angle - 22) * (size * 0.45);
  let m1Y = y + sin(angle - 22) * (size * 0.45);
  let m2X = x + cos(angle + 22) * (size * 0.45);
  let m2Y = y + sin(angle + 22) * (size * 0.45);

  brush.noStroke();
  brush.hatchStyle("2B", "#222222", 0.7);
  brush.hatch(2.2, angle + 40, { rand: 0.1 });
  brush.beginShape(0.2);
  brush.vertex(x, y); brush.vertex(m1X, m1Y); brush.vertex(tipX, tipY); brush.vertex(m2X, m2Y);
  brush.endShape(true);
  brush.noHatch();

  brush.set("HB", "#1a1a1a", 0.6);
  brush.beginShape(0.2);
  brush.vertex(x, y); brush.vertex(m1X, m1Y); brush.vertex(tipX, tipY); brush.vertex(m2X, m2Y);
  brush.endShape(true);

  brush.set("2H", "#4a4a4a", 0.4);
  let awnL = size * random(3.5, 6.5);
  let awnA = angle + random(-12, 12);
  let cpX = tipX + cos(awnA) * (awnL * 0.4);
  let cpY = tipY + sin(awnA) * (awnL * 0.4);
  let endX = tipX + cos(awnA + random(-8, 8)) * awnL;
  let endY = tipY + sin(awnA + random(-8, 8)) * awnL;
  brush.spline([[tipX, tipY], [cpX, cpY], [endX, endY]], 0.3);
}

function drawOatStalk(x, y, length, baseAngle) {
  let pts = [];
  let cx = x, cy = y, ang = baseAngle;
  let segs = 22;
  let segL = length / segs;

  for (let i = 0; i <= segs; i++) {
    pts.push([cx, cy]);
    ang += (noise(cx * 0.02, cy * 0.02) - 0.55) * 9;
    cx += cos(ang) * segL;
    cy += sin(ang) * segL;
  }

  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#333333", 0.9);
  brush.spline(pts, 0.4);

  let headStart = floor(segs * 0.45);
  for (let i = headStart; i < segs; i += 2) {
    let p = pts[i];
    let nextP = pts[i + 1];
    let localAng = atan2(nextP[1] - p[1], nextP[0] - p[0]);

    let numBranches = floor(random(1, 3));
    for (let b = 0; b < numBranches; b++) {
      let side = random() > 0.5 ? 1 : -1;
      let branchAng = localAng + side * random(35, 65);
      let branchLen = random(20, 45);

      let bx1 = p[0] + cos(branchAng) * (branchLen * 0.4);
      let by1 = p[1] + sin(branchAng) * (branchLen * 0.4);
      let finalAng = branchAng + side * random(15, 40);
      let bx2 = bx1 + cos(finalAng) * (branchLen * 0.6);
      let by2 = by1 + sin(finalAng) * (branchLen * 0.6) + random(5, 15);

      brush.set("2H", "#5a5a5a", 0.5);
      brush.spline([[p[0], p[1]], [bx1, by1], [bx2, by2]], 0.3);

      drawOatSeed(bx2, by2, 90 + random(-25, 25));
    }
  }
}

function drawOatSeed(x, y, angle) {
  let size = random(11, 16);
  let tipX = x + cos(angle) * size;
  let tipY = y + sin(angle) * size;

  brush.noStroke();
  brush.hatchStyle("HB", "#3a3a3a", 0.6);
  brush.hatch(2, angle + 35, { rand: 0.1 });
  brush.beginShape(0.2);
  brush.vertex(x, y);
  brush.vertex(x + cos(angle - 16) * size * 0.55, y + sin(angle - 16) * size * 0.55);
  brush.vertex(tipX, tipY);
  brush.vertex(x + cos(angle + 16) * size * 0.55, y + sin(angle + 16) * size * 0.55);
  brush.endShape(true);
  brush.noHatch();

  brush.set("HB", "#222222", 0.6);
  brush.beginShape(0.2);
  brush.vertex(x, y);
  brush.vertex(x + cos(angle - 16) * size * 0.55, y + sin(angle - 16) * size * 0.55);
  brush.vertex(tipX, tipY);
  brush.vertex(x + cos(angle + 16) * size * 0.55, y + sin(angle + 16) * size * 0.55);
  brush.endShape(true);

  brush.set("2H", "#444444", 0.4);
  brush.spline([
    [x, y],
    [x + cos(angle + 6) * size * 1.3, y + sin(angle + 6) * size * 1.3],
    [x + cos(angle + 12) * size * 1.9, y + sin(angle + 12) * size * 1.9]
  ], 0.2);
  
  brush.spline([
    [x, y],
    [x + cos(angle - 6) * size * 1.15, y + sin(angle - 6) * size * 1.15],
    [x + cos(angle - 12) * size * 1.6, y + sin(angle - 12) * size * 1.6]
  ], 0.2);
}