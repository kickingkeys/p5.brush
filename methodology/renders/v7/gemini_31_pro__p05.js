function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  brush.noFill();
  brush.noStroke();

  for (let i = 0; i < 15; i++) {
    let pts = [];
    let cx = random(600);
    let cy = random(600);
    for (let j = 0; j < 8; j++) {
      let a = j * 45;
      let r = random(100, 300);
      pts.push([cx + cos(a) * r, cy + sin(a) * r]);
    }
    
    brush.hatchStyle("rotring", "#1a1a1a", 0.4);
    brush.hatch(random(2.5, 4.0), random(0, 180), { rand: 0.05, continuous: true });
    brush.beginShape(0.2);
    pts.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.hatchStyle("rotring", "#111", 0.3);
    brush.hatch(random(2.5, 4.0), random(0, 180), { rand: 0.05, continuous: true });
    brush.beginShape(0.2);
    pts.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  for (let i = 0; i < 20; i++) {
    let x1 = random(-200, 800);
    let y1 = random(-200, 800);
    let angle = random([35, 45, 55, -35, -45, -55]);
    let w = random(15, 60);
    let len = 1000;
    
    let dx = cos(angle) * len;
    let dy = sin(angle) * len;
    let nx = cos(angle + 90) * w;
    let ny = sin(angle + 90) * w;
    
    let pts = [
      [x1, y1],
      [x1 + dx, y1 + dy],
      [x1 + dx + nx, y1 + dy + ny],
      [x1 + nx, y1 + ny]
    ];
    
    brush.hatchStyle("rotring", "#0a0a0a", 0.4);
    brush.hatch(2.0, angle, { rand: 0.02, continuous: true });
    brush.beginShape(0);
    pts.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  for (let i = 0; i < 9; i++) {
    let x = random(20, 580);
    let w = random(20, 90);
    let ptsLeft = [];
    let ptsRight = [];
    
    for (let y = -50; y <= 650; y += 80) {
      let offsetLeft = noise(y * 0.005, i) * 80 - 40;
      let offsetRight = noise(y * 0.005, i + 100) * 80 - 40;
      ptsLeft.push([x + offsetLeft, y]);
      ptsRight.unshift([x + w + offsetRight, y]);
    }
    
    let trunkPts = ptsLeft.concat(ptsRight);
    
    brush.hatchStyle("rotring", "#000", 0.5);
    brush.hatch(1.5, 90 + random(-8, 8), { rand: 0.08, continuous: true });
    brush.beginShape(0.2);
    trunkPts.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.hatchStyle("rotring", "#000", 0.6);
    brush.hatch(2.8, random(-15, 15), { rand: 0.05, continuous: true });
    brush.beginShape(0.2);
    trunkPts.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape(CLOSE);
    brush.noHatch();
    
    brush.set("pen", "#000", random(1.0, 1.5));
    brush.noFill();
    brush.beginShape(0.2);
    ptsLeft.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape();
    brush.beginShape(0.2);
    ptsRight.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape();
    brush.noStroke();
  }

  for (let i = 0; i < 35; i++) {
    let cx = random(-50, 650);
    let cy = random(200, 700);
    let r = random(20, 100);
    let pts = [];
    for (let a = 0; a < 360; a += 45) {
      let rad = r + noise(cx * 0.02, cy * 0.02, a) * 50;
      pts.push([cx + cos(a) * rad, cy + sin(a) * rad]);
    }
    
    let hAngle = random(0, 180);
    
    brush.hatchStyle("rotring", "#050505", 0.4);
    brush.hatch(1.8, hAngle, { rand: 0.1, continuous: true });
    brush.beginShape(0.1);
    pts.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.hatchStyle("rotring", "#000", 0.5);
    brush.hatch(2.2, hAngle + random(60, 120), { rand: 0.1, continuous: true });
    brush.beginShape(0.1);
    pts.forEach(p => brush.vertex(p[0], p[1]));
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  for (let i = 0; i < 25; i++) {
    brush.set("pen", "#000", random(0.8, 1.6));
    let pts = [];
    let cx = random(600);
    let cy = random(600);
    let steps = floor(random(4, 8));
    for (let j = 0; j < steps; j++) {
      pts.push([
        cx + noise(j * 0.5, i) * 200 - 100,
        cy + noise(j * 0.5, i + 50) * 200 - 100
      ]);
    }
    brush.spline(pts, 0.3);
  }
  
  brush.noStroke();
  noLoop();
}