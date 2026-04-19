function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(808);
  noiseSeed(808);

  brush.noFill();
  brush.noField();

  // Background sketchy hatching to anchor the composition
  brush.hatchStyle("2H", "#a39f98", 0.6);
  brush.hatch(9, 35, { rand: 0.15, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(80, 180);
  brush.vertex(480, 80);
  brush.vertex(520, 520);
  brush.vertex(120, 550);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.hatchStyle("2H", "#b5b0a8", 0.5);
  brush.hatch(14, -20, { rand: 0.2, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(100, 200);
  brush.vertex(450, 120);
  brush.vertex(480, 480);
  brush.vertex(150, 500);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Background Leaves
  drawGrassBlade(200, 650, 150, 450, 80, 300, 30, 400, 12);
  drawGrassBlade(250, 650, 350, 500, 450, 450, 520, 550, 16);

  // Stem 1: Right arch
  let stem1Pts = [];
  for (let i = 0; i <= 30; i++) {
    let t = i / 30;
    stem1Pts.push([
      bezierPoint(230, 250, 380, 480, t),
      bezierPoint(650, 400, 200, 120, t)
    ]);
  }
  brush.set("HB", "#3b3a38", 0.8);
  brush.spline(stem1Pts, 0.4);
  for (let i = 12; i <= 29; i++) {
    let t = i / 30;
    let x = bezierPoint(230, 250, 380, 480, t);
    let y = bezierPoint(650, 400, 200, 120, t);
    let tx = bezierTangent(230, 250, 380, 480, t);
    let ty = bezierTangent(650, 400, 200, 120, t);
    let a = atan2(ty, tx) + 90;
    drawSpikelet(x, y, a - 35 - random(10), 1.1);
    drawSpikelet(x, y, a + 35 + random(10), 1.1);
  }

  // Stem 2: Left arch
  let stem2Pts = [];
  for (let i = 0; i <= 25; i++) {
    let t = i / 25;
    stem2Pts.push([
      bezierPoint(210, 180, 120, 80, t),
      bezierPoint(650, 450, 300, 180, t)
    ]);
  }
  brush.set("HB", "#4a4845", 0.7);
  brush.spline(stem2Pts, 0.4);
  for (let i = 10; i <= 24; i++) {
    let t = i / 25;
    let x = bezierPoint(210, 180, 120, 80, t);
    let y = bezierPoint(650, 450, 300, 180, t);
    let tx = bezierTangent(210, 180, 120, 80, t);
    let ty = bezierTangent(650, 450, 300, 180, t);
    let a = atan2(ty, tx) + 90;
    drawSpikelet(x, y, a - 30 - random(10), 0.9);
    drawSpikelet(x, y, a + 30 + random(10), 0.9);
  }

  // Stem 3: Center tall
  let stem3Pts = [];
  for (let i = 0; i <= 35; i++) {
    let t = i / 35;
    stem3Pts.push([
      bezierPoint(220, 240, 270, 300, t),
      bezierPoint(650, 400, 200, 80, t)
    ]);
  }
  brush.set("HB", "#2e2d2b", 0.9);
  brush.spline(stem3Pts, 0.3);
  for (let i = 15; i <= 34; i++) {
    let t = i / 35;
    let x = bezierPoint(220, 240, 270, 300, t);
    let y = bezierPoint(650, 400, 200, 80, t);
    let tx = bezierTangent(220, 240, 270, 300, t);
    let ty = bezierTangent(650, 400, 200, 80, t);
    let a = atan2(ty, tx) + 90;
    drawSpikelet(x, y, a - 40 - random(15), 1.0);
    drawSpikelet(x, y, a + 40 + random(15), 1.0);
  }

  // Foreground Leaves
  drawGrassBlade(210, 650, 180, 450, 120, 350, 90, 250, 14);
  drawGrassBlade(230, 650, 300, 500, 400, 350, 480, 280, 15);
  drawGrassBlade(220, 650, 240, 500, 180, 400, 140, 450, 18);

  // Stray marks / unfinished edges
  brush.set("2H", "#8c8984", 0.5);
  brush.spline([[400, 500], [450, 480], [520, 510]], 0.2);
  brush.spline([[420, 520], [470, 490]], 0.2);
  brush.spline([[80, 400], [120, 380], [150, 420]], 0.2);
  brush.spline([[100, 430], [130, 410]], 0.2);

  noLoop();
}

function drawSpikelet(x, y, angle, scale) {
  push();
  translate(x, y);
  rotate(angle);

  for (let i = 0; i < 3; i++) {
    let sy = -i * 4 * scale;
    let body = [
      [0, sy],
      [4 * scale, sy - 8 * scale],
      [1 * scale, sy - 15 * scale],
      [-2 * scale, sy - 8 * scale]
    ];

    // Light hatch
    brush.hatchStyle("2H", "#6b6965", 0.4);
    brush.hatch(2.5 * scale, 45 + i * 10, { rand: 0.1 });
    brush.beginShape(0.3);
    for (let p of body) brush.vertex(p[0], p[1]);
    brush.endShape(CLOSE);
    brush.noHatch();

    // Darker core shadow hatch
    brush.hatchStyle("2B", "#2b2a28", 0.6);
    brush.hatch(1.5 * scale, 60, { rand: 0.1 });
    brush.beginShape(0.3);
    brush.vertex(body[0][0], body[0][1]);
    brush.vertex(body[1][0], body[1][1]);
    brush.vertex(body[2][0], body[2][1]);
    brush.endShape(CLOSE);
    brush.noHatch();

    // Fine outline
    brush.set("HB", "#242321", 0.5);
    brush.spline(body, 0.3);

    // Awns (bristles)
    if (i === 2) {
      brush.set("2H", "#454340", 0.4);
      brush.spline([
        [1 * scale, sy - 15 * scale],
        [3 * scale + random(-2, 2), sy - 30 * scale],
        [8 * scale + random(-6, 6), sy - 65 * scale]
      ], 0.2);
    }
  }
  pop();
}

function drawGrassBlade(x1, y1, cx1, cy1, cx2, cy2, x2, y2, widthFactor) {
  let pts1 = [], pts2 = [];
  for (let i = 0; i <= 20; i++) {
    let t = i / 20;
    let x = bezierPoint(x1, cx1, cx2, x2, t);
    let y = bezierPoint(y1, cy1, cy2, y2, t);
    let w = sin(t * 180) * widthFactor * (1 - t * 0.4);
    pts1.push([x, y]);
    pts2.unshift([x + w, y + w * 0.5]);
  }
  let poly = pts1.concat(pts2);

  // Base light hatch
  brush.hatchStyle("2H", "#7a7772", 0.6);
  brush.hatch(4, 30, { rand: 0.1, continuous: true });
  brush.beginShape(0.3);
  for (let p of poly) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Dense core shadow hatch
  brush.hatchStyle("2B", "#1f1e1d", 0.8);
  brush.hatch(2.5, 45, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  for (let p of pts1) brush.vertex(p[0], p[1]);
  for (let i = pts2.length - 1; i >= 0; i--) {
    let p1 = pts1[pts2.length - 1 - i];
    let p2 = pts2[i];
    brush.vertex(lerp(p1[0], p2[0], 0.35), lerp(p1[1], p2[1], 0.35));
  }
  brush.endShape(CLOSE);
  brush.noHatch();

  // Overlapping sketchy outlines
  brush.set("HB", "#2e2d2b", 0.8);
  brush.spline(pts1, 0.4);
  brush.set("HB", "#403e3b", 0.6);
  brush.spline(pts2.reverse(), 0.3);

  // Internal structural line
  brush.set("2H", "#5c5a57", 0.5);
  let centerLine = [];
  for (let i = 0; i <= 20; i++) {
    let t = i / 20;
    let x = bezierPoint(x1, cx1, cx2, x2, t) + widthFactor * 0.3 * sin(t * 180);
    let y = bezierPoint(y1, cy1, cy2, y2, t) + widthFactor * 0.15 * sin(t * 180);
    centerLine.push([x, y]);
  }
  brush.spline(centerLine, 0.3);
}