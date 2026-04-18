function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const palette = ["#111111", "#ff0055", "#00ffff", "#ffcc00", "#4422ff", "#ff5500"];

  brush.field("hand");
  brush.wiggle(4);
  for (let i = 0; i < 25; i++) {
    brush.set(random(["2H", "HB", "2B"]), "#e8e0d5", random(0.5, 1.5));
    brush.noFill();
    brush.beginShape(0.6);
    let cx = random(width);
    let cy = random(height);
    let pts = floor(random(5, 15));
    for (let j = 0; j < pts; j++) {
      brush.vertex(cx + random(-60, 60), cy + random(-60, 60));
    }
    brush.endShape();
  }
  brush.noField();

  brush.field("curved");
  for (let i = 0; i < 8; i++) {
    let cx = random(width);
    let cy = random(height);
    let col = random(palette);
    brush.set("spray", col, random(2.0, 3.5));
    for (let j = 0; j < 30; j++) {
      brush.flowLine(cx + random(-30, 30), cy + random(-30, 30), random(10, 40), random(360));
    }
  }
  brush.noField();

  for (let i = 0; i < 6; i++) {
    let col = random(palette);
    brush.mass("crayon", col, { strength: random(0.5, 0.8), precision: 0.3, outline: false });
    let cx = random(50, 550);
    let cy = random(50, 550);
    brush.beginShape(0.2);
    for (let j = 0; j < floor(random(4, 7)); j++) {
      brush.vertex(cx + random(-50, 50), cy + random(-50, 50));
    }
    brush.endShape(true);
    brush.noMass();
  }

  for (let i = 0; i < 15; i++) {
    let cx = random(50, 550);
    let cy = random(50, 550);
    let r = random(20, 90);
    let col = random(palette);

    brush.noFill();
    brush.set("spray", col, random(2.0, 3.5));
    brush.circle(cx, cy, r, true);
    
    brush.set("spray", col, random(0.8, 1.8));
    brush.circle(cx, cy, r + random(-8, 8), true);

    if (random() > 0.3) {
      let dripCount = floor(random(2, 7));
      for (let d = 0; d < dripCount; d++) {
        let angle = random(60, 120);
        let dx = cx + cos(angle) * r;
        let dy = cy + sin(angle) * r;
        let len = random(20, 120);

        brush.set("marker", col, random(0.4, 1.0));
        brush.line(dx, dy, dx, dy + len);

        brush.wash(col, 220);
        brush.noStroke();
        brush.circle(dx, dy + len + random(2, 10), random(1.5, 4));
        brush.noWash();
      }
    }
  }

  brush.field("hand");
  brush.wiggle(2);
  for (let i = 0; i < 10; i++) {
    let cx = random(50, 550);
    let cy = random(50, 550);
    let col = random(["#111111", "#ff0055", "#4422ff"]);
    
    brush.set("charcoal", col, random(1.2, 2.5));
    
    push();
    translate(cx, cy);
    rotate(random(360));
    let size = random(40, 100);
    brush.line(0, 0, size, 0);
    brush.line(size, 0, size - size * 0.3, -size * 0.3);
    brush.line(size, 0, size - size * 0.3, size * 0.3);
    pop();
  }

  for (let i = 0; i < 12; i++) {
    brush.set(random(["pen", "rotring"]), random(["#111111", "#ffffff"]), random(0.8, 1.6));
    let cx = random(50, 550);
    let cy = random(50, 550);
    brush.beginShape(0.4);
    let pts = floor(random(8, 20));
    for (let j = 0; j < pts; j++) {
      brush.vertex(cx + random(-40, 40), cy + random(-30, 30));
    }
    brush.endShape();
  }
  brush.noField();

  noLoop();
}