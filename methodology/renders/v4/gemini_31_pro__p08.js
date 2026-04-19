function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(8472);
  noiseSeed(8472);

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  let skyColors = ["#eaddd7", "#d3cbd0", "#c2c8d1", "#e6d5c3", "#dcd0d9", "#e2d1cd"];
  for (let i = 0; i < 45; i++) {
    let x = random(-100, 700);
    let y = random(-100, 450);
    let r = random(90, 220);
    brush.fill(random(skyColors), random(20, 45));
    brush.fillBleed(random(0.4, 0.7), "out");

    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 20) {
      let nx = map(cos(a), -1, 1, 0, 1.5);
      let ny = map(sin(a), -1, 1, 0, 1.5);
      let rad = r + map(noise(nx + i, ny + i), 0, 1, -30, 30);
      brush.vertex(x + cos(a) * rad, y + sin(a) * rad);
    }
    brush.endShape(CLOSE);
  }

  let waterColors = ["#9ba7b5", "#aeb8c4", "#8b94a0", "#7a828e", "#b0b6c2"];
  for (let i = 0; i < 35; i++) {
    let x = random(-100, 700);
    let y = random(380, 650);
    let w = random(150, 400);
    let h = random(30, 90);
    brush.fill(random(waterColors), random(35, 65));
    brush.fillBleed(random(0.3, 0.6), "out");

    brush.beginShape(0.4);
    for (let a = 0; a < 360; a += 20) {
      let nx = map(cos(a), -1, 1, 0, 1.5);
      let ny = map(sin(a), -1, 1, 0, 1.5);
      let radX = (w / 2) + map(noise(nx + i + 100, ny), 0, 1, -20, 20);
      let radY = (h / 2) + map(noise(nx, ny + i + 100), 0, 1, -10, 10);
      brush.vertex(x + cos(a) * radX, y + sin(a) * radY);
    }
    brush.endShape(CLOSE);
  }

  let boats = [
    { x: 220, y: 430, w: 130, h: 25, c: "#63636b" },
    { x: 450, y: 470, w: 170, h: 32, c: "#52525a" },
    { x: 140, y: 520, w: 200, h: 40, c: "#42424a" },
    { x: 380, y: 560, w: 150, h: 35, c: "#6b6562" }
  ];

  for (let b of boats) {
    brush.noStroke();
    brush.fillTexture(0.7, 0.4);

    let scales = [[1.05, 90, "out"], [0.85, 140, "out"], [0.65, 180, "in"]];
    for (let [s, op, bleedDir] of scales) {
      brush.fill(b.c, op);
      brush.fillBleed(0.35, bleedDir);
      brush.beginShape(0.6);
      
      let pts = [
        [b.x - b.w/2, b.y - b.h/2],
        [b.x + b.w/2, b.y - b.h/2],
        [b.x + b.w*0.3, b.y + b.h/2],
        [b.x - b.w*0.4, b.y + b.h/2]
      ];
      
      for (let p of pts) {
        let vx = lerp(b.x, p[0], s) + random(-3, 3);
        let vy = lerp(b.y, p[1], s) + random(-2, 2);
        brush.vertex(vx, vy);
      }
      brush.endShape(CLOSE);
    }

    brush.fill(b.c, 45);
    brush.fillBleed(0.6, "out");
    brush.beginShape(0.4);
    let refPts = [
      [b.x - b.w/2, b.y + b.h/2],
      [b.x + b.w*0.3, b.y + b.h/2],
      [b.x + b.w*0.2, b.y + b.h*2.5],
      [b.x - b.w*0.3, b.y + b.h*2.0]
    ];
    for (let p of refPts) {
      brush.vertex(p[0] + random(-5, 5), p[1] + random(-5, 5));
    }
    brush.endShape(CLOSE);
  }

  brush.noFill();
  brush.noWash();

  brush.set("2H", "#888888", 0.4);
  for (let i = 0; i < 8; i++) {
    let mx = random(50, 550);
    let my1 = random(180, 350);
    let my2 = random(380, 420);
    brush.line(mx, my1, mx, my2);
    if (random() > 0.4) {
      brush.line(mx, my1 + random(10, 30), mx + random(-50, 50), my2);
    }
    if (random() > 0.6) {
      brush.line(mx, my1 + random(40, 60), mx + random(-40, 40), my2);
    }
  }

  for (let b of boats) {
    let mastHeight = b.w * random(1.1, 1.6);
    let mastX = b.x + b.w * random(-0.15, 0.15);
    let mastTop = b.y - mastHeight;

    brush.set("HB", "#3a3a3a", 0.9);
    brush.spline([
      [mastX, b.y], 
      [mastX + random(-3, 3), b.y - mastHeight/2], 
      [mastX, mastTop]
    ], 0.1);

    brush.set("HB", "#555555", 0.7);
    let boomY = b.y - mastHeight * random(0.15, 0.25);
    let boomLen = b.w * random(0.6, 0.85);
    let boomDir = random() > 0.5 ? 1 : -1;
    brush.line(mastX - boomLen*0.15*boomDir, boomY, mastX + boomLen*boomDir, boomY - random(-8, 8));

    brush.set("2H", "#666666", 0.4);
    brush.spline([
      [mastX, mastTop],
      [mastX + boomLen*0.5*boomDir, boomY - mastHeight*0.3, 0.7],
      [mastX + boomLen*boomDir, boomY]
    ], 0.3);

    brush.spline([
      [mastX, mastTop],
      [b.x - b.w*0.4*boomDir, b.y - 10, 0.5],
      [b.x - b.w*0.45*boomDir, b.y]
    ], 0.2);

    brush.set("2H", "#7a7a7a", 0.5);
    for (let i = 0; i < 4; i++) {
      let ry = b.y + b.h/2 + random(2, 15);
      let rx = b.x + random(-b.w*0.8, b.w*0.2);
      let rw = random(20, 60);
      brush.line(rx, ry, rx + rw, ry);
    }
  }

  brush.set("2H", "#8a8a8a", 0.5);
  for (let i = 0; i < 25; i++) {
    let rx = random(20, 520);
    let ry = random(400, 580);
    let rw = random(15, 80);
    brush.line(rx, ry, rx + rw, ry);
  }

  noLoop();
}