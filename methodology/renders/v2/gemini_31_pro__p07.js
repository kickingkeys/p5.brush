function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  for (let i = 0; i < 6; i++) {
    let cx = random(100, 500);
    let cy = random(100, 500);
    brush.mass("crayon", random(["#f4efe8", "#eaddce", "#f9f6f0"]), {
      strength: random(0.5, 0.9),
      precision: 0.3,
      outline: false
    });
    brush.beginShape(0.4);
    for(let j = 0; j < 12; j++) {
      let a = j * 30;
      let r = random(50, 150);
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(CLOSE);
    brush.noMass();
  }

  brush.wiggle(2);
  for (let i = 0; i < 12; i++) {
    brush.set(random(["2H", "charcoal"]), "#a8a39b", random(0.4, 0.8));
    let cx = random(50, 550);
    let cy = random(50, 550);
    let pts = [];
    for (let j = 0; j < random(5, 12); j++) {
      pts.push([cx + random(-60, 60), cy + random(-60, 60)]);
    }
    brush.spline(pts, random(0.2, 0.6));
  }

  for (let i = 0; i < 4; i++) {
    brush.noStroke();
    brush.hatchStyle("rotring", random(["#111111", "#ff2a5f", "#00e5ff"]), random(0.3, 0.6));
    brush.hatch(random(3, 7), random([0, 45, 90, 135]), {rand: 0.1, continuous: true});
    let x = random(100, 450);
    let y = random(100, 450);
    let w = random(40, 120);
    let h = random(40, 120);
    brush.rect(x, y, w, h);
    brush.noHatch();
  }

  let sprayPalette = ["#ff0055", "#00f0ff", "#ffcc00", "#111111", "#ffffff"];
  for (let i = 0; i < 20; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let r = random(20, 100);
    let col = random(sprayPalette);

    if (random() > 0.7) {
      brush.noStroke();
      brush.wash(col, random(100, 200));
      brush.circle(x, y, r, true);
      brush.noWash();
    }

    brush.noFill();
    brush.set("spray", col, random(1.5, 3.5));
    brush.circle(x, y, r, true);

    if (random() > 0.4) {
      brush.set("spray", col, random(0.8, 2.0));
      brush.circle(x + random(-15, 15), y + random(-15, 15), r * random(0.4, 0.9), true);
    }

    if (random() > 0.3) {
      let numDrips = floor(random(2, 7));
      brush.set("spray", col, random(0.5, 1.5));
      for (let d = 0; d < numDrips; d++) {
        let dx = x + random(-r * 0.8, r * 0.8);
        let dy = y + sqrt(r * r - pow(dx - x, 2)) * random(0.8, 1.1);
        let dripLen = random(20, 120);
        brush.spline([
          [dx, dy, 1.0],
          [dx + random(-2, 2), dy + dripLen * 0.5, 0.8],
          [dx + random(-3, 3), dy + dripLen, 0.2]
        ], 0.3);
      }
    }
  }

  brush.wiggle(1);
  for (let i = 0; i < 10; i++) {
    let col = random() > 0.3 ? "#111111" : random(["#ff0055", "#ffffff"]);
    brush.set("marker", col, random(1.0, 3.0));

    let startX = random(100, 500);
    let startY = random(100, 500);
    let pts = [];
    let cx = startX, cy = startY;

    let numPts = floor(random(3, 7));
    for (let j = 0; j < numPts; j++) {
      pts.push([cx, cy, random(0.5, 1.5)]);
      cx += random(-40, 60);
      cy += random(-40, 60);
    }

    brush.spline(pts, random(0, 0.2));

    if (random() > 0.4 && pts.length >= 2) {
      let p1 = pts[pts.length - 2];
      let p2 = pts[pts.length - 1];
      let a = atan2(p2[1] - p1[1], p2[0] - p1[0]);
      let headSize = random(15, 30);
      brush.line(p2[0], p2[1], p2[0] - headSize * cos(a - 25), p2[1] - headSize * sin(a - 25));
      brush.line(p2[0], p2[1], p2[0] - headSize * cos(a + 25), p2[1] - headSize * sin(a + 25));
    }

    if (random() > 0.6) {
      brush.set("marker", random(sprayPalette), random(0.8, 1.5));
      brush.arc(startX, startY - 20, random(20, 40), 180, 360);
    }
  }

  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 6; i++) {
    brush.set(random(["charcoal", "2B"]), "#1a1a1a", random(1.5, 3.0));
    let x1 = random(50, 550);
    let y1 = random(50, 550);
    let x2 = x1 + random(-150, 150);
    let y2 = y1 + random(-150, 150);
    brush.line(x1, y1, x2, y2);
  }
  brush.noField();

  noLoop();
}