function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(104);
  noiseSeed(104);

  brush.set("2H", "#a3a3a3", 0.4);
  brush.line(260, 580, 200, 60);
  brush.line(340, 590, 400, 80);
  brush.line(150, 500, 180, 180);
  brush.line(450, 550, 420, 200);

  brush.set("charcoal", "#7a7a7a", 1.5);
  brush.fill("#7a7a7a", 12);
  brush.noStroke();
  brush.rect(300, 320, 250, 450, "center");
  brush.rect(120, 180, 100, 150, "center");

  drawStalk(230, 550, 360, -30, 1.1);
  drawStalk(320, 580, 460, 35, 1.3);
  drawStalk(420, 520, 300, 25, 0.95);

  drawMagnifiedDetail(130, 150);

  drawNotes(70, 280, 5);
  drawNotes(440, 450, 4);
  drawNotes(90, 480, 3);

  noLoop();
}

function drawStalk(baseX, baseY, height, curveOffset, scaleFactor) {
  let points = [];
  let steps = 14;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = lerp(baseX, baseX + curveOffset, t) + sin(t * 180) * 12 * scaleFactor + (noise(t * 4, baseX) - 0.5) * 15;
    let y = lerp(baseY, baseY - height, t);
    points.push([x, y]);
  }

  brush.set("HB", "#333333", 0.9 * scaleFactor);
  brush.noFill();
  brush.noHatch();
  brush.spline(points, 0.4);

  brush.set("2H", "#8c8c8c", 0.5 * scaleFactor);
  for (let k = 0; k < 6; k++) {
    brush.line(
      baseX + random(-6, 6), 
      baseY + random(-5, 5), 
      baseX + random(-15, 15), 
      baseY + random(15, 40)
    );
  }

  for (let i = 2; i < steps - 4; i++) {
    let pt = points[i];
    
    brush.set("2B", "#1a1a1a", 1.2 * scaleFactor);
    brush.line(pt[0] - 3 * scaleFactor, pt[1], pt[0] + 3 * scaleFactor, pt[1]);

    let dir = (i % 2 === 0) ? 1 : -1;
    drawLeaf(pt[0], pt[1], dir, scaleFactor);
  }

  let headPoints = points.slice(steps - 5);
  drawSeedHead(headPoints, scaleFactor);
}

function drawLeaf(x, y, dir, scaleFactor) {
  brush.set("HB", "#404040", 0.5 * scaleFactor);
  brush.fill("#555555", 20);
  brush.hatch(2, 40 * dir, { rand: 0.15 });

  let drop = random(25, 70) * scaleFactor;
  let spread = random(40, 90) * scaleFactor;
  let tipX = x + dir * spread;
  let tipY = y + drop;

  brush.beginShape(0.3);
  brush.vertex(x, y);
  brush.vertex(x + dir * spread * 0.4, y - 8 * scaleFactor);
  brush.vertex(tipX, tipY);
  brush.vertex(x + dir * spread * 0.25, y + 6 * scaleFactor);
  brush.endShape(true);

  brush.set("2H", "#666666", 0.3 * scaleFactor);
  brush.noFill();
  brush.noHatch();
  brush.spline([[x, y], [x + dir * spread * 0.3, y - 2 * scaleFactor], [tipX, tipY]], 0.2);
}

function drawSeedHead(points, scaleFactor) {
  for (let i = 0; i < points.length - 1; i++) {
    let p1 = points[i];
    let p2 = points[i + 1];
    let numKernels = 6;

    for (let j = 0; j < numKernels; j++) {
      let t = j / numKernels;
      let kx = lerp(p1[0], p2[0], t);
      let ky = lerp(p1[1], p2[1], t);

      let side = (j % 2 === 0) ? 1 : -1;
      let kWidth = 6.5 * scaleFactor;
      let kHeight = 15 * scaleFactor;
      let offsetX = side * kWidth * random(0.8, 1.2);
      let offsetY = -kHeight * random(0.8, 1.2);

      brush.set("2B", "#262626", 0.6 * scaleFactor);
      brush.fill("#4a4a4a", 15);
      brush.hatch(1.2, 35 * side, { rand: 0.1 });

      brush.beginShape(0.2);
      brush.vertex(kx, ky);
      brush.vertex(kx + offsetX * 0.8, ky + offsetY * 0.3);
      brush.vertex(kx + offsetX, ky + offsetY);
      brush.vertex(kx + offsetX * 0.2, ky + offsetY * 0.85);
      brush.endShape(true);

      brush.set("2H", "#595959", 0.4 * scaleFactor);
      brush.noFill();
      brush.noHatch();
      let awnLength = random(50, 110) * scaleFactor;
      let awnEndX = kx + offsetX * 1.2 + side * awnLength * 0.2;
      let awnEndY = ky + offsetY - awnLength;

      brush.spline([
        [kx + offsetX, ky + offsetY],
        [kx + offsetX * 1.1 + side * 4, ky + offsetY - awnLength * 0.3],
        [awnEndX, awnEndY]
      ], 0.1);
    }
  }
}

function drawMagnifiedDetail(x, y) {
  brush.set("2H", "#999999", 0.4);
  brush.noFill();
  brush.noHatch();
  brush.circle(x, y, 45, true);
  
  brush.set("2H", "#b3b3b3", 0.3);
  brush.line(x + 32, y + 32, x + 90, y + 110);

  brush.set("HB", "#333333", 1.1);
  brush.fill("#404040", 12);
  brush.hatch(1.8, 50, { rand: 0.2 });

  brush.beginShape(0.2);
  brush.vertex(x - 12, y + 22);
  brush.vertex(x + 18, y + 12);
  brush.vertex(x + 28, y - 22);
  brush.vertex(x - 4, y - 12);
  brush.endShape(true);

  brush.set("2H", "#555555", 0.4);
  brush.noFill();
  brush.noHatch();
  brush.spline([[x - 12, y + 22], [x + 4, y], [x + 28, y - 22]], 0.1);

  brush.set("2B", "#1a1a1a", 0.7);
  brush.spline([
    [x + 28, y - 22],
    [x + 40, y - 45],
    [x + 35, y - 80]
  ], 0.2);

  brush.set("charcoal", "#4d4d4d", 0.4);
  brush.line(x - 8, y + 18, x + 8, y + 8);
  brush.line(x - 6, y + 20, x + 6, y + 12);
}

function drawNotes(x, y, lines) {
  brush.set("cpencil", "#666666", 0.35);
  brush.noFill();
  brush.noHatch();
  
  for (let i = 0; i < lines; i++) {
    let lx = x;
    let ly = y + i * 11;
    let len = random(35, 85);
    
    brush.beginShape(0.4);
    for (let j = 0; j <= len; j += random(3, 6)) {
      brush.vertex(lx + j, ly + random(-1.5, 1.5));
    }
    brush.endShape();
  }
}