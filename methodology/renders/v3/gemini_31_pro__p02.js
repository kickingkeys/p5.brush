function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#f2ece4");
  translate(-width / 2, -height / 2);
  randomSeed(89234);
  noiseSeed(89234);

  brush.noFill();
  brush.noField();

  brush.noStroke();
  brush.mass("pastel", "#7a7a7a", { strength: 0.25, precision: 0.1, gradient: 0.8 });
  brush.circle(200, 250, 90);
  brush.circle(400, 300, 110);
  brush.circle(300, 450, 150);
  brush.noMass();

  brush.hatchStyle("2H", "#888", 0.6);
  brush.hatch(12, 35, { rand: 0.2, continuous: true });
  brush.beginShape(0.5);
  brush.vertex(100, 100);
  brush.vertex(500, 150);
  brush.vertex(480, 550);
  brush.vertex(120, 500);
  brush.endShape(CLOSE);
  brush.noHatch();

  drawLeaves(220, 560);
  drawLeaves(380, 570);
  drawLeaves(300, 580);

  drawWheat(220, 580, 160, 120);
  drawThinGrass(300, 590, 310, 180);
  drawOats(380, 580, 440, 160);

  brush.set("HB", "#555", 0.6);
  for (let i = 0; i < 15; i++) {
    let sx = 300 + random(-150, 150);
    let sy = 560 + random(-20, 30);
    brush.beginStroke("curve", sx, sy);
    brush.move(random(40, 140), random(15, 40), random(0.2, 0.7));
    brush.endStroke(random(40, 140), 0);
  }
  
  brush.set("2H", "#777", 0.5);
  for (let i = 0; i < 20; i++) {
    let sx = 300 + random(-180, 180);
    let sy = 570 + random(-10, 25);
    brush.line(sx, sy, sx + random(-20, 20), sy + random(10, 30));
  }

  noLoop();
}

function drawWheat(bx, by, tx, ty) {
  let pts = [];
  let steps = 45;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let cx1 = bx - 10, cy1 = by - 180;
    let cx2 = tx + 60, cy2 = ty + 180;
    let x = bezierPoint(bx, cx1, cx2, tx, t);
    let y = bezierPoint(by, cy1, cy2, ty, t);
    x += (noise(i * 0.12) - 0.5) * 6;
    let p = map(t, 0, 1, 1.3, 0.3);
    pts.push([x, y, p]);
  }

  brush.set("HB", "#2a2a2a", 0.9);
  brush.spline(pts, 0.35);

  let startIdx = Math.floor(steps * 0.45);
  for (let i = startIdx; i < steps; i += 2) {
    let pt = pts[i];
    let nxt = pts[Math.min(i + 2, steps)];
    let angle = atan2(nxt[1] - pt[1], nxt[0] - pt[0]);
    let scaleFactor = map(i, startIdx, steps, 1.2, 0.3);

    drawHusk(pt[0], pt[1], angle - 28, scaleFactor);
    drawHusk(pt[0], pt[1], angle + 28, scaleFactor);
  }
}

function drawHusk(x, y, angle, scaleFactor) {
  let len = 22 * scaleFactor;
  let hx = x + cos(angle) * len;
  let hy = y + sin(angle) * len;

  let cp1x = x + cos(angle - 25) * len * 0.55;
  let cp1y = y + sin(angle - 25) * len * 0.55;
  let cp2x = x + cos(angle + 25) * len * 0.55;
  let cp2y = y + sin(angle + 25) * len * 0.55;

  brush.noStroke();
  brush.hatchStyle("2H", "#555", 0.5);
  brush.hatch(2.5, angle + 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(x, y);
  brush.vertex(cp1x, cp1y);
  brush.vertex(hx, hy);
  brush.vertex(cp2x, cp2y);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.hatchStyle("2B", "#222", 0.7);
  brush.hatch(3.5, angle - 30, { rand: 0.15, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(x, y);
  brush.vertex(cp1x, cp1y);
  brush.vertex(lerp(x, hx, 0.6), lerp(y, hy, 0.6));
  brush.vertex(x, y);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.set("HB", "#1a1a1a", 0.6);
  brush.beginShape(0.4);
  brush.vertex(x, y);
  brush.vertex(cp1x, cp1y);
  brush.vertex(hx, hy);
  brush.vertex(cp2x, cp2y);
  brush.endShape(CLOSE);

  brush.set("2H", "#444", 0.4);
  let awnLen = 70 * scaleFactor;
  let ax = hx + cos(angle) * awnLen + (noise(x * 0.05, y * 0.05) - 0.5) * 30;
  let ay = hy + sin(angle) * awnLen + (noise(y * 0.05, x * 0.05) - 0.5) * 30;
  brush.spline([[hx, hy, 0.7], [ax, ay, 0.1]], 0.2);
}

function drawOats(bx, by, tx, ty) {
  let pts = [];
  let steps = 40;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let cx1 = bx + 40, cy1 = by - 220;
    let cx2 = tx - 90, cy2 = ty + 120;
    let x = bezierPoint(bx, cx1, cx2, tx, t);
    let y = bezierPoint(by, cy1, cy2, ty, t);
    x += (noise(i * 0.15 + 100) - 0.5) * 7;
    pts.push([x, y, map(t, 0, 1, 1.2, 0.2)]);
  }

  brush.set("HB", "#333", 0.85);
  brush.spline(pts, 0.4);

  let startIdx = Math.floor(steps * 0.35);
  for (let i = startIdx; i < steps; i += 4) {
    let pt = pts[i];
    let nxt = pts[Math.min(i + 2, steps)];
    let angle = atan2(nxt[1] - pt[1], nxt[0] - pt[0]);

    let side = (i % 8 === 0) ? 1 : -1;
    let branchAngle = angle + random(50, 70) * side;
    let branchLen = random(25, 45);
    let ex = pt[0] + cos(branchAngle) * branchLen;
    let ey = pt[1] + sin(branchAngle) * branchLen + random(15, 30);

    brush.set("2H", "#444", 0.5);
    brush.spline([[pt[0], pt[1], 0.7], [ex, ey, 0.2]], 0.4);

    drawOatSpikelet(ex, ey, branchAngle + random(20, 40) * side);
  }
}

function drawOatSpikelet(x, y, angle) {
  let len = 20;
  let hx = x + cos(angle) * len;
  let hy = y + sin(angle) * len + 12;

  brush.noStroke();
  brush.hatchStyle("2H", "#555", 0.5);
  brush.hatch(2.5, angle + 60, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(x, y);
  brush.vertex(x - 6, y + 12);
  brush.vertex(hx, hy);
  brush.vertex(x + 6, y + 12);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.hatchStyle("2B", "#222", 0.8);
  brush.hatch(3, angle - 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(x, y);
  brush.vertex(x - 3, y + 8);
  brush.vertex(lerp(x, hx, 0.7), lerp(y, hy, 0.7));
  brush.vertex(x + 3, y + 8);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.set("HB", "#111", 0.7);
  brush.beginShape(0.4);
  brush.vertex(x, y);
  brush.vertex(x - 5, y + 12);
  brush.vertex(hx, hy);
  brush.vertex(x + 5, y + 12);
  brush.endShape(CLOSE);

  brush.set("2H", "#444", 0.35);
  brush.line(hx, hy, hx - 6, hy + 16);
  brush.line(hx, hy, hx + 4, hy + 20);
}

function drawThinGrass(bx, by, tx, ty) {
  let pts = [];
  let steps = 35;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = lerp(bx, tx, t) + sin(t * 220) * 25;
    let y = lerp(by, ty, t);
    pts.push([x, y, map(t, 0, 1, 0.9, 0.15)]);
  }
  
  brush.set("2H", "#3a3a3a", 0.8);
  brush.spline(pts, 0.3);

  for (let i = 12; i < steps; i++) {
    let pt = pts[i];
    let side = (i % 2 === 0) ? 1 : -1;
    brush.set("HB", "#222", 0.7);
    brush.line(pt[0], pt[1], pt[0] + 10 * side, pt[1] - 12);
    
    brush.set("2B", "#111", 0.6);
    brush.circle(pt[0] + 10 * side, pt[1] - 12, 1.5);
  }
}

function drawLeaves(bx, by) {
  let numLeaves = Math.floor(random(2, 5));
  for (let i = 0; i < numLeaves; i++) {
    let dir = random() > 0.5 ? 1 : -1;
    let len = random(120, 280);
    let tx = bx + dir * len * random(0.6, 1.2);
    let ty = by - random(60, 180);
    let droopX = tx + dir * random(30, 80);
    let droopY = ty + random(40, 120);

    let pts1 = [], pts2 = [];
    let steps = 25;
    let leafWidth = random(5, 10);
    
    for (let j = 0; j <= steps; j++) {
      let t = j / steps;
      let cx1 = bx + dir * 40, cy1 = by - 60;
      let cx2 = tx, cy2 = ty - 60;
      let x = bezierPoint(bx, cx1, cx2, droopX, t);
      let y = bezierPoint(by, cy1, cy2, droopY, t);

      let w = sin(t * 180) * leafWidth;
      pts1.push([x - w, y]);
      pts2.unshift([x + w, y]);
    }

    let polyPts = pts1.concat(pts2);

    brush.noStroke();
    brush.hatchStyle("2H", "#555", 0.6);
    brush.hatch(4, dir * 45, { rand: 0.1, continuous: true });
    brush.beginShape(0.4);
    for (let p of polyPts) brush.vertex(p[0], p[1]);
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.hatchStyle("2B", "#222", 0.8);
    brush.hatch(5, dir * -30, { rand: 0.15, continuous: true });
    brush.beginShape(0.4);
    for (let j = 0; j < polyPts.length; j++) {
      let p = polyPts[j];
      brush.vertex(lerp(bx, p[0], 0.45), lerp(by, p[1], 0.45));
    }
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.set("HB", "#1a1a1a", 0.7);
    brush.beginShape(0.4);
    for (let p of polyPts) brush.vertex(p[0], p[1]);
    brush.endShape(CLOSE);
  }
}