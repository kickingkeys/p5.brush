function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noFill();
  brush.noWash();
  brush.noStroke();

  for (let i = 0; i < 6; i++) {
    brush.hatchStyle("rotring", "#111111", 0.4);
    brush.hatch(random(2.5, 4.5), 45 + i * 25, { rand: 0.05, continuous: true });
    brush.beginShape(0.4);
    let cx = random(100, 500);
    let cy = random(100, 500);
    for (let a = 0; a < 360; a += 30) {
      let r = random(150, 350) + noise(a * 0.1, i) * 100;
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  for (let i = 0; i < 45; i++) {
    let x1 = random(-100, 700);
    let y1 = random(100, 700);
    let angle = random(360);
    let len = random(100, 500);
    let thickness = random(3, 15);

    let x2 = x1 + cos(angle) * len;
    let y2 = y1 + sin(angle) * len;

    let nx1 = x1 + cos(angle + 90) * thickness;
    let ny1 = y1 + sin(angle + 90) * thickness;
    let nx2 = x2 + cos(angle + 90) * thickness;
    let ny2 = y2 + sin(angle + 90) * thickness;

    brush.hatchStyle("rotring", "#1a1a1a", 0.3);
    brush.hatch(random(1.5, 3), angle + random(15, 45), { rand: 0.05, continuous: true });

    brush.beginShape(0.1);
    brush.vertex(x1, y1);
    brush.vertex(x2, y2);
    brush.vertex(nx2, ny2);
    brush.vertex(nx1, ny1);
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.set("pen", "#000000", random(0.6, 1.0));
    brush.line(x1, y1, x2, y2);
    brush.line(nx1, ny1, nx2, ny2);
    brush.noStroke();
  }

  for (let i = 0; i < 18; i++) {
    let tx = random(20, 580);
    let tw = random(12, 55);
    let ptsLeft = [];
    let ptsRight = [];
    
    let noiseOffset = random(1000);

    for (let y = -50; y <= 650; y += 40) {
      let nx = (noise(tx * 0.005, y * 0.01 + noiseOffset) - 0.5) * 80;
      ptsLeft.push([tx + nx, y]);
      ptsRight.push([tx + tw + nx, y]);
    }

    brush.hatchStyle("rotring", "#0a0a0a", 0.5);
    brush.hatch(random(1.5, 3.0), random(85, 95), { rand: 0.03, continuous: true });

    brush.beginShape(0.4);
    for (let p of ptsLeft) brush.vertex(p[0], p[1]);
    for (let j = ptsRight.length - 1; j >= 0; j--) brush.vertex(ptsRight[j][0], ptsRight[j][1]);
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.hatchStyle("rotring", "#000000", 0.4);
    brush.hatch(random(1.5, 2.5), random(10, 30), { rand: 0.05, continuous: true });
    brush.beginShape(0.4);
    for (let p of ptsLeft) brush.vertex(p[0], p[1]);
    for (let j = ptsRight.length - 1; j >= 0; j--) {
      let lx = ptsLeft[j][0];
      let rx = ptsRight[j][0];
      brush.vertex(lerp(lx, rx, random(0.3, 0.5)), ptsRight[j][1]);
    }
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.set("pen", "#000000", random(0.8, 1.4));
    brush.beginShape(0.4);
    for (let p of ptsLeft) brush.vertex(p[0], p[1]);
    brush.endShape();
    brush.beginShape(0.4);
    for (let p of ptsRight) brush.vertex(p[0], p[1]);
    brush.endShape();
    brush.noStroke();
    
    brush.set("pen", "#111111", 0.5);
    for (let j = 0; j < ptsLeft.length - 1; j++) {
      if (random() > 0.4) {
        let lx = ptsLeft[j][0];
        let ly = ptsLeft[j][1];
        let rx = ptsRight[j][0];
        let ry = ptsRight[j][1];
        let start = random(0.1, 0.3);
        let end = start + random(0.1, 0.3);
        brush.line(lerp(lx, rx, start), lerp(ly, ry, start), lerp(lx, rx, end), lerp(ly, ry, end));
      }
    }
    brush.noStroke();
  }

  for (let i = 0; i < 15; i++) {
    let cx = random(-50, 650);
    let cy = random(350, 650);

    brush.hatchStyle("rotring", "#000000", 0.5);
    brush.hatch(1.5, random(0, 180), { rand: 0.1, continuous: true });
    brush.hatch(2.0, random(0, 180), { rand: 0.1, continuous: true });

    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 40) {
      let r = random(40, 120);
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  noLoop();
}