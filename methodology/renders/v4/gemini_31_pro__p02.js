function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#f4f0e6");
  translate(-width / 2, -height / 2);
  
  randomSeed(102);
  noiseSeed(102);

  brush.noFill();
  brush.noWash();

  brush.set("2H", "#999", 0.4);
  for (let i = 0; i < 7; i++) {
    let x = random(100, 500);
    brush.line(x, 650, x + random(-50, 50), random(50, 200));
  }

  brush.set("2H", "#888", 0.5);
  brush.line(50, 550, 550, 550);
  brush.line(80, 50, 80, 550);
  
  for (let i = 0; i < 4; i++) {
    let tx = random(400, 500);
    let ty = random(450, 520);
    brush.line(tx, ty, tx + random(20, 50), ty);
    brush.set("2H", "#aaa", 0.3);
    brush.spline([[tx, ty + 5], [tx + 10, ty + random(2, 6)], [tx + 30, ty + 5]], 0.2);
  }

  drawGrass(180, 620, 260, 120, 1.0);
  drawGrass(320, 630, 400, 160, 1.2);
  drawGrass(440, 610, 490, 240, 0.8);
  drawGrass(230, 640, 150, 280, 0.9);

  brush.set("2B", "#222", 0.8);
  for (let i = 0; i < 15; i++) {
    let bx = random(150, 480);
    let by = random(580, 620);
    brush.spline([[bx, by, 1.0], [bx + random(-10, 10), by - random(10, 30), 0.1]], 0.2);
  }

  noLoop();
}

function drawGrass(sx, sy, ex, ey, scaleFac) {
  let pts = [];
  let steps = 18;
  let curveOffset = random(20, 60) * (random() > 0.5 ? 1 : -1);
  
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = lerp(sx, ex, t) + sin(t * 180) * curveOffset * scaleFac;
    let y = lerp(sy, ey, t);
    let pressure = map(t, 0, 1, 1.2, 0.3);
    pts.push([x, y, pressure]);
  }

  brush.set("HB", "#333", 0.9);
  brush.spline(pts, 0.4);

  brush.set("2B", "#222", 0.5);
  brush.spline(pts.slice(0, floor(steps / 2)), 0.3);

  let numLeaves = floor(random(3, 6));
  for (let i = 0; i < numLeaves; i++) {
    let t = random(0.1, 0.5);
    let baseIdx = floor(t * steps);
    let bx = pts[baseIdx][0];
    let by = pts[baseIdx][1];

    let dir = random() > 0.5 ? 1 : -1;
    let lx = bx + dir * random(70, 160) * scaleFac;
    let ly = by - random(30, 120) * scaleFac;
    let cx = bx + dir * random(30, 70) * scaleFac;
    let cy = by + random(-10, 40) * scaleFac;

    brush.set("HB", "#444", 0.7);
    brush.spline([[bx, by, 0.8], [cx, cy, 1.0], [lx, ly, 0.2]], 0.4);

    brush.hatchStyle("2H", "#666", 0.6);
    brush.hatch(4, random(30, 70), { rand: 0.1, continuous: true });
    brush.beginShape(0.4);
    brush.vertex(bx, by);
    brush.vertex(cx, cy + 4 * scaleFac);
    brush.vertex(lx, ly);
    brush.vertex(cx, cy - 4 * scaleFac);
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.hatchStyle("2B", "#333", 0.8);
    brush.hatch(2.5, random(100, 140), { rand: 0.15 });
    brush.beginShape(0.4);
    brush.vertex(bx, by);
    brush.vertex(lerp(bx, cx, 0.5), lerp(by, cy + 4 * scaleFac, 0.5));
    brush.vertex(lerp(bx, lx, 0.3), lerp(by, ly, 0.3));
    brush.vertex(lerp(bx, cx, 0.5), lerp(by, cy - 4 * scaleFac, 0.5));
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  let headStartIdx = floor(steps * 0.6);
  for (let i = headStartIdx; i < steps; i++) {
    let hx = pts[i][0];
    let hy = pts[i][1];
    
    let nextX = pts[i+1] ? pts[i+1][0] : hx;
    let nextY = pts[i+1] ? pts[i+1][1] : hy - 10;
    let angleBase = atan2(nextY - hy, nextX - hx);

    for (let side of [-1, 1]) {
      let seedAngle = angleBase + side * random(15, 35);
      let slen = random(12, 25) * scaleFac;
      let tipX = hx + cos(seedAngle) * slen;
      let tipY = hy + sin(seedAngle) * slen;

      brush.set("HB", "#333", 0.6);
      let midX = hx + cos(seedAngle) * slen * 0.5;
      let midY = hy + sin(seedAngle) * slen * 0.5;
      
      brush.spline([
        [hx, hy, 0.6], 
        [midX - sin(seedAngle)*4, midY + cos(seedAngle)*4, 1.2], 
        [tipX, tipY, 0.2]
      ], 0.4);

      brush.hatchStyle("2B", "#222", 0.9);
      brush.hatch(2, seedAngle + 60, { rand: 0.1, continuous: true });
      brush.beginShape(0.3);
      brush.vertex(hx, hy);
      brush.vertex(midX - sin(seedAngle)*3, midY + cos(seedAngle)*3);
      brush.vertex(tipX, tipY);
      brush.vertex(midX + sin(seedAngle)*2, midY - cos(seedAngle)*2);
      brush.endShape(CLOSE);
      brush.noHatch();

      brush.set("2H", "#777", 0.4);
      let awnLen = random(30, 90) * scaleFac;
      let awnAngle = seedAngle + random(-5, 5);
      let awnTipX = tipX + cos(awnAngle) * awnLen;
      let awnTipY = tipY + sin(awnAngle) * awnLen;
      
      brush.spline([
        [tipX, tipY, 0.5],
        [lerp(tipX, awnTipX, 0.5) + random(-5, 5), lerp(tipY, awnTipY, 0.5) + random(-5, 5), 0.3],
        [awnTipX, awnTipY, 0.1]
      ], 0.2);
    }
  }
}