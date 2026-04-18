function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.fillTexture(0.7, 0.3);
  brush.noStroke();
  let baseColors = ["#e8e4db", "#dcd6cb", "#f2efe9"];
  for (let i = 0; i < 6; i++) {
    brush.fill(random(baseColors), random(100, 180));
    brush.fillBleed(0.6, "out");
    brush.beginShape(0.6);
    let cx = random(width);
    let cy = random(height);
    for (let a = 0; a < 360; a += 45) {
      let r = random(100, 300);
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(true);
  }
  brush.noFill();

  brush.noFill();
  for (let i = 0; i < 10; i++) {
    brush.set(random(["2H", "HB"]), "#888888", random(0.4, 0.9));
    let pts = [];
    let cx = random(50, 550);
    let cy = random(50, 550);
    for (let j = 0; j < 12; j++) {
      pts.push([cx + random(-70, 70), cy + random(-70, 70), random(0.5, 1.2)]);
    }
    brush.spline(pts, random(0.3, 0.7));
  }

  let palette = ["#ff0055", "#00f0ff", "#ffcc00", "#222222", "#ffffff"];
  for (let i = 0; i < 15; i++) {
    let cx = random(50, 550);
    let cy = random(50, 550);
    let r = random(20, 90);
    let col = random(palette);

    brush.set("spray", col, random(2.0, 4.0));
    brush.circle(cx, cy, r, true);

    if (random() > 0.6) {
      brush.set("spray", col, random(1.5, 2.5));
      for (let j = 0; j < 15; j++) {
        let a = random(360);
        let dist = random(r * 0.8);
        brush.line(cx, cy, cx + cos(a) * dist, cy + sin(a) * dist);
      }
    }

    let numDrips = floor(random(2, 8));
    for (let d = 0; d < numDrips; d++) {
      let angle = random(70, 110);
      let startX = cx + cos(angle) * r;
      let startY = cy + sin(angle) * r;
      let dropLen = random(30, 180);
      
      brush.set("spray", col, random(0.5, 1.5));
      brush.spline([
        [startX, startY, 1.0],
        [startX + random(-2, 2), startY + dropLen * 0.5, 0.6],
        [startX + random(-3, 3), startY + dropLen, 0.2]
      ], 0.2);
      
      if (random() > 0.4) {
        brush.set("spray", col, random(1.0, 2.0));
        brush.circle(startX + random(-3, 3), startY + dropLen, random(2, 5));
      }
    }
  }

  brush.noStroke();
  for (let i = 0; i < 4; i++) {
    brush.mass("crayon", random(palette), { strength: 0.85, precision: 0.2, outline: true });
    brush.beginShape(0.1);
    let bx = random(100, 500);
    let by = random(100, 500);
    let bw = random(60, 140);
    let bh = random(60, 140);
    brush.vertex(bx, by);
    brush.vertex(bx + bw + random(-15, 15), by + random(-15, 15));
    brush.vertex(bx + bw + random(-15, 15), by + bh + random(-15, 15));
    brush.vertex(bx + random(-15, 15), by + bh + random(-15, 15));
    brush.endShape(true);
    brush.noMass();
  }

  brush.noFill();
  brush.noMass();
  brush.wiggle(3);
  for (let i = 0; i < 7; i++) {
    brush.set(random(["marker", "charcoal"]), random(["#111111", "#ff0055", "#ffffff"]), random(1.5, 3.5));
    let ax = random(50, 550);
    let ay = random(50, 550);
    let size = random(50, 120);
    let dir = random([-1, 1]);
    
    brush.beginShape(0);
    brush.vertex(ax, ay);
    brush.vertex(ax + size * dir, ay - size * 0.3);
    brush.vertex(ax + size * 1.4 * dir, ay + size * 0.6);
    brush.endShape();
    
    let headX = ax + size * 1.4 * dir;
    let headY = ay + size * 0.6;
    brush.line(headX, headY, headX - size * 0.3 * dir, headY - size * 0.05);
    brush.line(headX, headY, headX - size * 0.05 * dir, headY - size * 0.3);
  }
  brush.noField();

  brush.set("pen", "#222222", 1.2);
  for (let i = 0; i < 5; i++) {
    let pts = [];
    let cx = random(width);
    let cy = random(height);
    for (let j = 0; j < 20; j++) {
      pts.push([cx + random(-100, 100), cy + random(-100, 100), random(0.4, 1.5)]);
    }
    brush.spline(pts, 0.4);
  }

  noLoop();
}