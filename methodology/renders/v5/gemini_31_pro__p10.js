function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(1024);
  noiseSeed(1024);

  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.fillTexture(0.5, 0.2);
  brush.fill("#f2e6d8", 70);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.5);
  brush.vertex(-20, -20);
  brush.vertex(620, -20);
  brush.vertex(620, 200);
  for (let x = 620; x >= -20; x -= 60) {
    brush.vertex(x, 150 + noise(x * 0.01) * 50);
  }
  brush.endShape(CLOSE);
  brush.noFill();

  brush.fillTexture(0.7, 0.4);

  brush.wash("#eaddcf", 150);
  brush.fill("#dcb88e", 120);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.4);
  brush.vertex(-20, 295);
  for (let x = 0; x <= 620; x += 50) {
    brush.vertex(x, 300 + noise(x * 0.02) * 10);
  }
  brush.vertex(620, 620);
  brush.vertex(-20, 620);
  brush.endShape(CLOSE);
  brush.noWash();

  brush.fill("#c49a6c", 140);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.5);
  brush.vertex(-20, 380);
  for (let x = 0; x <= 620; x += 60) {
    brush.vertex(x, 380 + noise(x * 0.01 + 100) * 40);
  }
  brush.vertex(620, 620);
  brush.vertex(-20, 620);
  brush.endShape(CLOSE);

  brush.fill("#a67c52", 160);
  brush.fillBleed(0.3, "in");
  brush.beginShape(0.5);
  brush.vertex(-20, 480);
  for (let x = 0; x <= 620; x += 60) {
    brush.vertex(x, 480 + noise(x * 0.015 + 200) * 50);
  }
  brush.vertex(620, 620);
  brush.vertex(-20, 620);
  brush.endShape(CLOSE);
  brush.noFill();

  brush.set("pen", "#221a15", 0.7);
  brush.line(0, 300, 600, 300);

  brush.field("hand");
  brush.wiggle(4);

  let distRock = [
    [40, 300], [60, 270], [80, 285],
    [110, 240], [130, 260], [150, 300]
  ];
  brush.mass("pastel", "#3b3530", { strength: 0.5, precision: 0.4 });
  brush.beginShape(0.1);
  distRock.forEach(p => brush.vertex(p[0], p[1]));
  brush.endShape(CLOSE);
  brush.noMass();

  brush.set("charcoal", "#1a1a1a", 0.8);
  brush.spline(distRock, 0.1);

  let bigRock = [
    [350, 450], [380, 250], [420, 150],
    [460, 190], [490, 120], [540, 220],
    [580, 350], [620, 380], [620, 500],
    [450, 480]
  ];
  brush.mass("crayon", "#1f1b18", { strength: 0.85, precision: 0.2, outline: true });
  brush.hatchStyle("charcoal", "#111", 1.5);
  brush.hatch(3, 45, { rand: 0.15 });
  brush.hatch(4, -30, { rand: 0.15 });
  brush.beginShape(0.1);
  bigRock.forEach(p => brush.vertex(p[0], p[1]));
  brush.endShape(CLOSE);
  brush.noMass();
  brush.noHatch();

  brush.set("charcoal", "#0a0a0a", 1.8);
  brush.spline(bigRock, 0.1);
  
  brush.set("charcoal", "#111", 1.2);
  brush.spline([[380, 250], [420, 280], [440, 380]], 0.1);
  brush.spline([[460, 190], [480, 270], [530, 300]], 0.1);
  brush.spline([[490, 120], [500, 200], [480, 270]], 0.1);

  brush.noField();

  brush.set("rotring", "#3d2b1f", 0.5);
  for (let i = 0; i < 10; i++) {
    let sx = random(40, 560);
    let sy = random(350, 550);
    drawCrack(sx, sy, random(30, 80), 90 + random(-40, 40), 3);
  }

  noLoop();
}

function drawCrack(x, y, len, ang, depth) {
  if (depth === 0) return;
  
  let nx = x + cos(ang) * len;
  let ny = y + sin(ang) * len;
  
  let mx = x + (nx - x) * 0.5 + random(-5, 5);
  let my = y + (ny - y) * 0.5 + random(-5, 5);
  brush.spline([[x, y], [mx, my], [nx, ny]], 0.2);
  
  if (random() > 0.3) {
    drawCrack(nx, ny, len * random(0.4, 0.7), ang + random(20, 50), depth - 1);
  }
  if (random() > 0.3) {
    drawCrack(nx, ny, len * random(0.4, 0.7), ang - random(20, 50), depth - 1);
  }
}