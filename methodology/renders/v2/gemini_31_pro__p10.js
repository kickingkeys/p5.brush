function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(8294);
  noiseSeed(8294);

  brush.set("pen", "#332d29", 0.5);
  brush.line(10, 300, 590, 300);

  brush.noStroke();
  brush.fillTexture(0.75, 0.4);

  brush.wash("#e8d6b8", 120);
  brush.fill("#dcb98a", 150);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 300);
  for (let x = 0; x <= 600; x += 30) {
    let y = 320 + noise(x * 0.01) * 40;
    brush.vertex(x, y);
  }
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(CLOSE);
  brush.noWash();

  brush.wash("#dcb98a", 150);
  brush.fill("#c29b68", 180);
  brush.fillBleed(0.35, "in");
  brush.beginShape(0.4);
  brush.vertex(0, 360);
  for (let x = 0; x <= 600; x += 30) {
    let y = 380 + noise(x * 0.015, 100) * 60;
    brush.vertex(x, y);
  }
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(CLOSE);
  brush.noWash();

  brush.wash("#c29b68", 160);
  brush.fill("#a77b46", 200);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 450);
  for (let x = 0; x <= 600; x += 30) {
    let y = 470 + noise(x * 0.02, 200) * 50;
    brush.vertex(x, y);
  }
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(CLOSE);
  brush.noWash();
  brush.noFill();

  brush.field("hand");
  brush.wiggle(3);

  drawRock(120, 340, 140, 200);
  drawRock(480, 320, 180, 240);
  drawRock(310, 315, 60, 80);
  drawRock(400, 360, 90, 110);
  drawRock(50, 380, 100, 130);

  brush.noField();

  brush.set("pen", "#5c4033", 0.6);
  for (let i = 0; i < 12; i++) {
    let startX = random(20, 580);
    let startY = random(400, 580);
    drawCrack(startX, startY, random(30, 60), random(60, 120), 4);
  }

  brush.hatchStyle("cpencil", "#7a5c43", 0.6);
  brush.hatch(5, 15, { rand: 0.1 });
  brush.beginShape(0.4);
  brush.vertex(0, 500);
  brush.vertex(600, 450);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(CLOSE);
  brush.noHatch();

  noLoop();
}

function drawRock(cx, baseY, w, h) {
  let pts = [];
  pts.push([cx - w / 2, baseY]);
  pts.push([cx - w * 0.35, baseY - h * 0.3 + random(-15, 15)]);
  pts.push([cx - w * 0.15, baseY - h * 0.7 + random(-20, 20)]);
  pts.push([cx, baseY - h]);
  pts.push([cx + w * 0.2, baseY - h * 0.6 + random(-20, 20)]);
  pts.push([cx + w * 0.4, baseY - h * 0.2 + random(-15, 15)]);
  pts.push([cx + w / 2, baseY]);

  brush.mass("pastel", "#3a3835", { strength: 0.7, precision: 0.4, outline: false });
  brush.beginShape(0.1);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.clip([cx, baseY - h - 20, cx + w / 2 + 20, baseY + 20]);
  brush.hatchStyle("charcoal", "#1a1816", 1.8);
  brush.hatch(4, 105, { rand: 0.2, continuous: true });
  brush.beginShape(0.1);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noHatch();
  brush.noClip();

  brush.set("charcoal", "#111", 1.4);
  brush.noFill();
  brush.beginShape(0.1);
  for (let p of pts) brush.vertex(p[0], p[1], random(0.8, 1.5));
  brush.endShape(CLOSE);
}

function drawCrack(x, y, len, angle, depth) {
  if (depth <= 0) return;
  
  let ex = x + cos(angle) * len;
  let ey = y + sin(angle) * len;
  
  let pts = [
    [x, y, 1.0],
    [x + (ex - x) * 0.3 + random(-5, 5), y + (ey - y) * 0.3 + random(-5, 5), 0.8],
    [x + (ex - x) * 0.7 + random(-5, 5), y + (ey - y) * 0.7 + random(-5, 5), 0.6],
    [ex, ey, 0.3]
  ];
  
  brush.spline(pts, 0.2);

  if (random() > 0.3) {
    drawCrack(ex, ey, len * random(0.4, 0.8), angle + random(20, 50), depth - 1);
  }
  if (random() > 0.3) {
    drawCrack(ex, ey, len * random(0.4, 0.8), angle - random(20, 50), depth - 1);
  }
}