function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(8842);
  noiseSeed(8842);

  brush.noStroke();
  brush.noFill();

  brush.hatchStyle("rotring", "#666", 0.3);
  brush.hatch(6, 45, { rand: 0.05, continuous: true });
  brush.hatch(12, -45, { rand: 0.05, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(-50, -50);
  brush.vertex(650, -50);
  brush.vertex(650, 650);
  brush.vertex(-50, 650);
  brush.endShape(CLOSE);
  brush.noHatch();

  for (let i = 0; i < 45; i++) {
    let x = random(-50, 650);
    let y = random(-50, 400);
    let w = random(10, 35);
    let h = random(300, 700);
    let angle = random() > 0.2 ? random(-8, 8) : random(20, 50) * (random() > 0.5 ? 1 : -1);

    brush.hatchStyle("rotring", "#333", random(0.3, 0.6));
    brush.hatch(random(3, 6), random([0, 85, 95, 175]), { rand: 0.05, continuous: true });
    if (random() > 0.5) {
      brush.hatch(random(4, 8), random([45, 135]), { rand: 0.05, continuous: true });
    }

    push();
    translate(x, y);
    rotate(angle);
    brush.beginShape(0.1);
    brush.vertex(0, 0);
    brush.vertex(w, 0);
    brush.vertex(w + random(-15, 15), h);
    brush.vertex(random(-15, 15), h);
    brush.endShape(CLOSE);
    pop();
    brush.noHatch();
  }

  let trunks = [50, 180, 320, 470, 580];
  for (let tx of trunks) {
    let tw = random(35, 80);
    let ptsLeft = [];
    let ptsRight = [];

    for (let y = -50; y <= 650; y += 40) {
      let nx = noise(y * 0.005, tx) * 50 - 25;
      ptsLeft.push([tx + nx, y]);
      ptsRight.push([tx + tw + nx + noise(y * 0.01) * 25, y]);
    }

    brush.noStroke();
    brush.hatchStyle("rotring", "#111", 0.6);
    brush.hatch(2.2, 85 + random(-5, 5), { rand: 0.1, continuous: true });
    brush.hatch(3.5, 175 + random(-5, 5), { rand: 0.1, continuous: true });
    if (random() > 0.5) {
      brush.hatch(4.0, 45, { rand: 0.1, continuous: true });
    }

    brush.beginShape(0.3);
    for (let p of ptsLeft) brush.vertex(p[0], p[1]);
    for (let i = ptsRight.length - 1; i >= 0; i--) brush.vertex(ptsRight[i][0], ptsRight[i][1]);
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.set("pen", "#000", random(1.0, 1.5));
    brush.spline(ptsLeft, 0.3);
    brush.spline(ptsRight, 0.3);
    brush.noStroke();
  }

  for (let i = 0; i < 50; i++) {
    let cx = random(-50, 650);
    let cy = random(300, 700);
    let r = random(40, 180);

    brush.hatchStyle("rotring", "#0a0a0a", random(0.5, 0.9));
    brush.hatch(random(1.5, 3.5), random(360), { rand: 0.1, continuous: true });
    brush.hatch(random(2.0, 4.0), random(360), { rand: 0.1, continuous: true });
    if (cy > 450 && random() > 0.3) {
      brush.hatch(random(1.5, 2.5), random(360), { rand: 0.1, continuous: true });
    }

    brush.beginShape(0.4);
    let startAngle = random(360);
    for (let a = startAngle; a < startAngle + 360; a += random(40, 80)) {
      let rad = r * random(0.3, 1.4);
      brush.vertex(cx + cos(a) * rad, cy + sin(a) * rad);
    }
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  brush.set("pen", "#000", 1.6);
  for (let i = 0; i < 35; i++) {
    let bx = random(-50, 650);
    let by = random(250, 650);
    let len = random(60, 200);
    let ang = random([20, 35, 145, 160]) + random(-15, 15);
    let bPts = [];
    for (let step = 0; step <= len; step += 25) {
      bPts.push([
        bx + cos(ang) * step + noise(step * 0.04, i) * 25,
        by + sin(ang) * step + noise(step * 0.04, i + 100) * 25
      ]);
    }
    brush.spline(bPts, 0.4);
  }

  noLoop();
}