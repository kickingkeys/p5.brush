function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("hand");

  brush.noStroke();
  for (let i = 0; i < 6; i++) {
    brush.fill(random(["#e6dfd5", "#f0e6d8", "#d9d0c5"]), random(60, 120));
    brush.fillBleed(0.3, "out");
    brush.rect(random(100, 500), random(100, 500), random(150, 350), random(150, 350), "center");
  }

  brush.noFill();
  for (let i = 0; i < 10; i++) {
    brush.set(random(["charcoal", "2H", "2B"]), "#a39b93", random(0.4, 1.2));
    let cx = random(50, 550);
    let cy = random(50, 550);
    brush.beginShape(0.2);
    for (let j = 0; j < random(5, 12); j++) {
      brush.vertex(cx + random(-90, 90), cy + random(-90, 90), random(0.5, 1.2));
    }
    brush.endShape(false);
  }

  let palette = ["#ff0055", "#00eeff", "#ffaa00", "#111111", "#ffffff"];
  for (let i = 0; i < 15; i++) {
    let col = random(palette);
    let x = random(50, 550);
    let y = random(50, 550);
    let r = random(20, 100);

    if (random() > 0.5) {
      brush.set("spray", col, random(1, 3));
      brush.noFill();
      brush.circle(x, y, r, true);
    } else {
      brush.noStroke();
      brush.fill(col, random(150, 230));
      brush.circle(x, y, r, true);
    }

    if (random() > 0.4) {
      brush.set("spray", col, random(0.5, 1.2));
      let numDrips = floor(random(3, 8));
      for (let d = 0; d < numDrips; d++) {
        let dx = x + random(-r * 0.7, r * 0.7);
        let dy = y + random(0, r * 0.8);
        let dLen = random(30, 180);
        brush.line(dx, dy, dx, dy + dLen);
      }
    }
  }

  for (let i = 0; i < 8; i++) {
    let col = random(["#111111", "#ff0055", "#ffffff"]);
    brush.set(random(["marker", "rotring"]), col, random(1.2, 2.5));
    brush.noFill();

    let ax = random(100, 500);
    let ay = random(100, 500);
    let dirX = random([-1, 1]);
    let dirY = random([-1, 1]);
    let len = random(40, 120);

    brush.line(ax, ay, ax + len * dirX, ay + len * dirY);
    brush.line(ax + len * dirX, ay + len * dirY, ax + len * dirX - 25 * dirX, ay + len * dirY);
    brush.line(ax + len * dirX, ay + len * dirY, ax + len * dirX, ay + len * dirY - 25 * dirY);
  }

  for (let i = 0; i < 5; i++) {
    brush.set("pen", random(["#111111", "#00eeff"]), 0.7);
    brush.noFill();
    brush.hatch(random(4, 10), random(0, 180), { rand: 0.3, continuous: false });
    brush.rect(random(100, 500), random(100, 500), random(60, 180), random(60, 180), "center");
    brush.noHatch();
  }

  brush.set("cpencil", "#111111", 1.5);
  brush.noFill();
  for (let i = 0; i < 4; i++) {
    let pts = [];
    let sx = random(100, 500);
    let sy = random(100, 500);
    for (let j = 0; j < 20; j++) {
      pts.push([sx + random(-60, 60), sy + random(-60, 60), random(0.5, 1.8)]);
    }
    brush.spline(pts, 0.5);
  }

  noLoop();
}