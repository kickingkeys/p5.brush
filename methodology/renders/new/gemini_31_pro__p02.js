function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.hatchStyle("2H", "#ccc", 0.8);
  brush.hatch(12, 45, { rand: 0.2, continuous: true });
  brush.rect(300, 300, 600, 600, "center");
  brush.noHatch();

  brush.mass("pastel", "#d9d4cd", { strength: 0.15, precision: 0.2 });
  brush.beginShape(0.5);
  brush.vertex(50, 50);
  brush.vertex(550, 100);
  brush.vertex(500, 550);
  brush.vertex(100, 500);
  brush.endShape(true);
  brush.noMass();

  let stem1 = [];
  for (let i = 0; i <= 24; i++) {
    let t = i / 24;
    let x = bezierPoint(250, 270, 330, 360, t);
    let y = bezierPoint(650, 450, 250, 70, t);
    stem1.push([x, y, 1.2 - t * 0.9]);
  }

  brush.set("2H", "#999", 0.4);
  brush.spline(stem1.map(p => [p[0] + random(-3, 3), p[1] + random(-3, 3)]), 0.3);

  brush.set("HB", "#333", 0.9);
  brush.spline(stem1, 0.4);

  for (let i = 10; i <= 24; i++) {
    let p1 = stem1[i];
    let p0 = stem1[i - 1];
    let angle = atan2(p1[1] - p0[1], p1[0] - p0[0]) + 90;
    let side = (i % 2 === 0) ? 1 : -1;
    drawSpikelet(p1[0], p1[1], angle + side * 35 + random(-5, 5), 1.3, i % 3 === 0);
  }

  let stem2 = [];
  for (let i = 0; i <= 20; i++) {
    let t = i / 20;
    let x = bezierPoint(220, 180, 100, 80, t);
    let y = bezierPoint(650, 400, 250, 320, t);
    stem2.push([x, y, 1.0 - t * 0.8]);
  }

  brush.set("2H", "#aaa", 0.4);
  brush.spline(stem2.map(p => [p[0] + random(-2, 2), p[1] + random(-2, 2)]), 0.3);

  brush.set("HB", "#444", 0.8);
  brush.spline(stem2, 0.4);

  for (let i = 9; i <= 20; i++) {
    let p1 = stem2[i];
    let p0 = stem2[i - 1];
    let angle = atan2(p1[1] - p0[1], p1[0] - p0[0]) + 90;
    let side = (i % 2 === 0) ? 1 : -1;
    drawSpikelet(p1[0], p1[1], angle + side * 45 + 180 + random(-10, 10), 1.0, i % 4 === 0);
  }

  let stem3 = [];
  for (let i = 0; i <= 15; i++) {
    let t = i / 15;
    let x = bezierPoint(280, 400, 480, 520, t);
    let y = bezierPoint(650, 400, 200, 120, t);
    stem3.push([x, y, 0.8 - t * 0.6]);
  }

  brush.set("2H", "#777", 0.6);
  brush.spline(stem3, 0.4);

  for (let i = 7; i <= 15; i++) {
    let p1 = stem3[i];
    let p0 = stem3[i - 1];
    let angle = atan2(p1[1] - p0[1], p1[0] - p0[0]) + 90;
    let side = (i % 2 === 0) ? 1 : -1;
    
    push();
    translate(p1[0], p1[1]);
    rotate(angle + side * 40);
    brush.noStroke();
    brush.hatchStyle("2H", "#888", 0.5);
    brush.hatch(4, 45, { rand: 0.1 });
    brush.beginShape(0.4);
    brush.vertex(0, 0);
    brush.vertex(-3, -8);
    brush.vertex(-1, -20);
    brush.vertex(2, -12);
    brush.endShape(true);
    brush.noHatch();
    
    brush.set("2H", "#777", 0.5);
    brush.spline([[0, 0, 0.6], [-1, -20, 0.4], [-3, -40 + random(-5, 5), 0.1]], 0.3);
    pop();
  }

  drawGrassBlade(260, 650, 350, 500, 500, 450, 550, 300, 8);
  drawGrassBlade(230, 650, 150, 550, 80, 600, 40, 450, 10);
  drawGrassBlade(245, 650, 220, 500, 180, 400, 160, 350, 6);
  drawGrassBlade(270, 650, 290, 550, 380, 580, 450, 500, 7);

  brush.set("HB", "#555", 0.5);
  brush.line(70, 180, 110, 90);
  drawSpikelet(90, 135, 25, 2.5, true);
  drawSpikelet(95, 115, -15, 2.5, false);
  drawSpikelet(105, 95, 30, 2.2, true);

  brush.set("2H", "#777", 0.4);
  brush.spline([[60, 200], [70, 195], [75, 202], [85, 198], [90, 205], [105, 198]], 0.2);
  brush.spline([[60, 212], [65, 208], [75, 214], [85, 208], [95, 212]], 0.2);
  brush.spline([[60, 224], [70, 220], [80, 222]], 0.2);

  drawSpikelet(450, 250, 110, 1.4, true);
  drawSpikelet(480, 280, 145, 1.2, false);
  drawSpikelet(420, 320, 85, 1.0, false);

  noLoop();
}

function drawSpikelet(cx, cy, angle, scaleFactor, isDark) {
  push();
  translate(cx, cy);
  rotate(angle);

  brush.noStroke();
  if (isDark) {
    brush.hatchStyle("2B", "#222", 0.8);
    brush.hatch(2.5, 30, { rand: 0.1, continuous: true });
    brush.hatch(3.0, 120, { rand: 0.1, continuous: true });
  } else {
    brush.hatchStyle("2H", "#555", 0.6);
    brush.hatch(3.5, 45, { rand: 0.05, continuous: true });
  }

  brush.beginShape(0.4);
  brush.vertex(0, 0);
  brush.vertex(-4 * scaleFactor, -10 * scaleFactor);
  brush.vertex(-2 * scaleFactor, -25 * scaleFactor);
  brush.vertex(3 * scaleFactor, -15 * scaleFactor);
  brush.endShape(true);
  brush.noHatch();

  brush.set(isDark ? "2B" : "HB", isDark ? "#222" : "#444", 0.7);
  brush.spline([
    [2 * scaleFactor, -5 * scaleFactor, 0.8],
    [0, 0, 1.0],
    [-4 * scaleFactor, -10 * scaleFactor, 0.9],
    [-2 * scaleFactor, -25 * scaleFactor, 0.5],
    [3 * scaleFactor, -15 * scaleFactor, 0.7]
  ], 0.3);

  brush.set("2H", "#666", 0.5);
  brush.spline([
    [-2 * scaleFactor, -25 * scaleFactor, 0.8],
    [-4 * scaleFactor, -45 * scaleFactor, 0.5],
    [-6 * scaleFactor + random(-8, 8), -75 * scaleFactor + random(-8, 8), 0.1]
  ], 0.4);

  pop();
}

function drawGrassBlade(startX, startY, ctrlX1, ctrlY1, ctrlX2, ctrlY2, endX, endY, width) {
  let pts1 = [];
  let pts2 = [];
  
  for (let i = 0; i <= 15; i++) {
    let t = i / 15;
    let bx = bezierPoint(startX, ctrlX1, ctrlX2, endX, t);
    let by = bezierPoint(startY, ctrlY1, ctrlY2, endY, t);
    let w = sin(t * 180) * width;
    let tx = bezierTangent(startX, ctrlX1, ctrlX2, endX, t);
    let ty = bezierTangent(startY, ctrlY1, ctrlY2, endY, t);
    let a = atan2(ty, tx);
    let nx = cos(a + 90) * w;
    let ny = sin(a + 90) * w;
    
    pts1.push([bx + nx, by + ny]);
    pts2.unshift([bx - nx, by - ny]);
  }

  brush.noStroke();
  brush.hatchStyle("2H", "#666", 0.7);
  brush.hatch(3.5, 30, { rand: 0.1, continuous: true });
  brush.hatchStyle("HB", "#444", 0.8);
  brush.hatch(5.0, -15, { rand: 0.1, continuous: true });

  brush.beginShape(0.3);
  for (let p of pts1) brush.vertex(p[0], p[1]);
  for (let p of pts2) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.set("HB", "#333", 0.8);
  let edge1 = pts1.map((p, i) => [p[0], p[1], 1.0 - (i / 15) * 0.9]);
  brush.spline(edge1, 0.4);
  
  let edge2 = pts2.slice().reverse().map((p, i) => [p[0], p[1], 1.0 - (i / 15) * 0.9]);
  brush.spline(edge2, 0.4);

  brush.set("2B", "#222", 0.7);
  let vein = [];
  for (let i = 0; i <= 18; i++) {
    let t = i / 15;
    let bx = bezierPoint(startX, ctrlX1, ctrlX2, endX, t);
    let by = bezierPoint(startY, ctrlY1, ctrlY2, endY, t);
    vein.push([bx, by, 1.2 - t]);
  }
  brush.spline(vein, 0.3);
}