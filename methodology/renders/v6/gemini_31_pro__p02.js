function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(12345);
  noiseSeed(12345);

  brush.noStroke();
  brush.noFill();
  brush.noWash();
  brush.noMass();

  brush.hatchStyle("2H", "#8c8c8c", 0.4);
  brush.hatch(14, 45, { rand: 0.15, continuous: true });
  brush.hatch(16, -30, { rand: 0.15, continuous: true });
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 15) {
    let r = 160 + noise(a * 5) * 60;
    brush.vertex(300 + cos(a) * r, 350 + sin(a) * r * 1.2);
  }
  brush.endShape(CLOSE);
  brush.noHatch();

  drawStalkSystem(240, 610, 140, 180, 50, 'oat', 'bg');
  drawStalkSystem(340, 620, 480, 250, -70, 'fluff', 'bg');
  drawStalkSystem(280, 630, 320, 100, -35, 'wheat', 'fg');
  drawStalkSystem(260, 620, 200, 280, 25, 'wheat', 'fg');

  brush.noFill();
  brush.set("2H", "#666", 0.5);
  for (let i = 0; i < 45; i++) {
    let bx = random(180, 400);
    let by = random(560, 600);
    let len = random(15, 45);
    brush.line(bx, by, bx + random(-20, 20), by + len);
  }
  
  brush.set("HB", "#333", 0.8);
  for (let i = 0; i < 25; i++) {
    let bx = random(220, 360);
    let by = random(580, 620);
    let len = random(10, 35);
    brush.line(bx, by, bx + random(-15, 15), by + len);
  }

  brush.set("HB", "#444", 0.4);
  for (let i = 0; i < 20; i++) {
    let x = random(150, 450);
    let y = random(100, 450);
    brush.line(x, y, x + random(-4, 4), y + random(-4, 4));
  }

  noLoop();
}

function getPointOnStalk(sx, sy, ex, ey, curveM, t) {
  let x = lerp(sx, ex, t) + sin(t * 180) * curveM;
  let y = lerp(sy, ey, t);
  return { x, y };
}

function drawStalkSystem(sx, sy, ex, ey, curveM, type, depth) {
  let isBg = depth === 'bg';
  let baseColor = isBg ? "#5a5a5a" : "#222222";
  let brushType = isBg ? "2H" : "HB";
  let weightMult = isBg ? 0.6 : 0.9;

  let pts = [];
  let ptsHighlight = [];
  let steps = 40;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let p = getPointOnStalk(sx, sy, ex, ey, curveM, t);
    pts.push([p.x, p.y, 1.2 - t * 0.8]);
    ptsHighlight.push([p.x - 2, p.y, 0.8 - t * 0.5]);
  }

  brush.noFill();
  brush.set(brushType, baseColor, weightMult);
  brush.spline(pts, 0.3);

  brush.set("2H", "#888", weightMult * 0.5);
  brush.spline(ptsHighlight, 0.3);

  let numLeaves = isBg ? 2 : 4;
  for (let i = 0; i < numLeaves; i++) {
    let t = random(0.1, 0.5);
    let p = getPointOnStalk(sx, sy, ex, ey, curveM, t);
    let isLeft = random() > 0.5;
    let spread = random(50, 120);
    let lx = p.x + (isLeft ? -spread : spread);
    let ly = p.y - random(30, 90);
    let cx = p.x + (isLeft ? -25 : 25);
    let cy = p.y - 15;
    drawLeaf(p.x, p.y, lx, ly, cx, cy, random(3, 7), depth);
  }

  if (type === 'wheat') {
    let idx = 0;
    for (let t = 0.6; t <= 0.98; t += 0.025) {
      let p = getPointOnStalk(sx, sy, ex, ey, curveM, t);
      let dp = getPointOnStalk(sx, sy, ex, ey, curveM, t + 0.01);
      let baseAngle = atan2(dp.y - p.y, dp.x - p.x);
      let side = (idx % 2 === 0) ? 1 : -1;
      let angle = baseAngle + side * 35 + random(-8, 8);
      drawSpikelet(p.x, p.y, angle, random(12, 18), depth);
      idx++;
    }
  } else if (type === 'oat') {
    let idx = 0;
    for (let t = 0.5; t <= 0.95; t += 0.06) {
      let p = getPointOnStalk(sx, sy, ex, ey, curveM, t);
      let side = (idx % 2 === 0) ? 1 : -1;
      let droopX = p.x + side * random(30, 55);
      let droopY = p.y + random(15, 35);
      
      brush.noFill();
      brush.set("2H", baseColor, 0.4);
      brush.spline([[p.x, p.y], [p.x + side * 15, p.y - 10], [droopX, droopY]], 0.5);
      
      let angle = atan2(droopY - (p.y - 10), droopX - (p.x + side * 15));
      drawSpikelet(droopX, droopY, angle, random(16, 22), depth);
      idx++;
    }
  } else if (type === 'fluff') {
    for (let t = 0.7; t <= 0.98; t += 0.015) {
      let p = getPointOnStalk(sx, sy, ex, ey, curveM, t);
      let dp = getPointOnStalk(sx, sy, ex, ey, curveM, t + 0.01);
      let baseAngle = atan2(dp.y - p.y, dp.x - p.x);
      
      for (let j = 0; j < 4; j++) {
        let angle = baseAngle + random(-75, 75);
        let len = random(10, 28);
        push();
        translate(p.x, p.y);
        rotate(angle);
        brush.set("2H", baseColor, 0.3);
        brush.line(0, 0, len, 0);
        brush.set(brushType, baseColor, 0.6);
        brush.line(len, 0, len + 1, 0);
        pop();
      }
    }
  }
}

function drawLeaf(x1, y1, x2, y2, ctrlX, ctrlY, width, depth) {
  let pts = [];
  for (let t = 0; t <= 1; t += 0.05) {
    let x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * ctrlX + t * t * x2;
    let y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * ctrlY + t * t * y2;
    let env = sin(t * 180);
    let tx = 2 * (1 - t) * (ctrlX - x1) + 2 * t * (x2 - ctrlX);
    let ty = 2 * (1 - t) * (ctrlY - y1) + 2 * t * (y2 - ctrlY);
    let len = sqrt(tx * tx + ty * ty);
    let nx = -ty / len;
    let ny = tx / len;
    pts.push([x + nx * env * width, y + ny * env * width]);
  }
  
  let ptsDown = [];
  for (let t = 1; t >= 0; t -= 0.05) {
    let x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * ctrlX + t * t * x2;
    let y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * ctrlY + t * t * y2;
    let env = sin(t * 180);
    let tx = 2 * (1 - t) * (ctrlX - x1) + 2 * t * (x2 - ctrlX);
    let ty = 2 * (1 - t) * (ctrlY - y1) + 2 * t * (y2 - ctrlY);
    let len = sqrt(tx * tx + ty * ty);
    let nx = -ty / len;
    let ny = tx / len;
    ptsDown.push([x - nx * env * width, y - ny * env * width]);
  }
  
  let fullPoly = pts.concat(ptsDown);
  let isBg = depth === 'bg';
  
  brush.noStroke();
  brush.hatchStyle(isBg ? "2H" : "2B", isBg ? "#666" : "#2a2a2a", isBg ? 0.4 : 0.6);
  brush.hatch(isBg ? 7 : 4, random(30, 60), { rand: 0.05, continuous: true });
  if (!isBg) {
    brush.hatch(6, random(100, 140), { rand: 0.08, continuous: true });
  }
  
  brush.beginShape(0.4);
  for (let p of fullPoly) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.noFill();
  brush.set(isBg ? "2H" : "HB", isBg ? "#4a4a4a" : "#1a1a1a", isBg ? 0.5 : 0.7);
  brush.beginShape(0.4);
  for (let p of fullPoly) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
}

function drawSpikelet(x, y, angle, size, depth) {
  push();
  translate(x, y);
  rotate(angle);

  let isBg = depth === 'bg';
  let strokeC = isBg ? "#555" : "#1a1a1a";
  let hatchC = isBg ? "#6a6a6a" : "#333";
  let hatchB = isBg ? "2H" : "HB";

  brush.noFill();
  brush.set("2H", strokeC, 0.4);
  brush.beginShape(0.2);
  brush.vertex(0, 0);
  brush.vertex(size * 1.5, -size * 0.1);
  brush.vertex(size * 3 + random(-5, 5), size * 0.1 + random(-5, 5));
  brush.endShape();

  let pts = [
    [0, 0],
    [size * 0.5, -size * 0.25],
    [size, 0],
    [size * 0.5, size * 0.25]
  ];

  brush.noStroke();
  brush.hatchStyle(hatchB, hatchC, isBg ? 0.4 : 0.6);
  brush.hatch(isBg ? 4 : 2.5, 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.noFill();
  brush.set(isBg ? "2H" : "HB", strokeC, isBg ? 0.5 : 0.7);
  brush.beginShape(0.2);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);

  pop();
}