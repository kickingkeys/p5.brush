function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const palette = ["#e63946", "#1d3557", "#f4a261", "#e9c46a", "#2b2d42", "#8d99ae", "#111111"];

  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 25; i++) {
    brush.set("charcoal", random(palette), random(0.4, 1.2));
    let cx = random(40, 560);
    let cy = random(40, 560);
    let pts = [];
    for (let j = 0; j < 5; j++) {
      pts.push([cx + random(-70, 70), cy + random(-70, 70), random(0.2, 1.0)]);
    }
    brush.spline(pts, 0.5);
  }
  brush.noField();

  for (let i = 0; i < 8; i++) {
    brush.wash(random(palette), random(200, 240));
    brush.noStroke();
    let w = random(60, 200);
    let h = random(30, 90);
    brush.rect(random(100, 500), random(100, 500), w, h, "center");
  }
  brush.noWash();

  for (let i = 0; i < 50; i++) {
    brush.set("spray", random(palette), random(1.0, 3.5));
    brush.flowLine(random(30, 570), random(30, 570), random(15, 50), random(360));
  }

  for (let i = 0; i < 30; i++) {
    brush.set("spray", random(palette), random(1.5, 4.0));
    brush.noFill();
    brush.circle(random(50, 550), random(50, 550), random(20, 85), true);
  }

  for (let i = 0; i < 35; i++) {
    let col = random(palette);
    let x = random(40, 560);
    let y = random(60, 450);
    let len = random(40, 180);

    brush.set("spray", col, random(0.5, 1.5));
    brush.line(x, y, x + random(-4, 4), y + len);

    if (random() > 0.3) {
      brush.set("marker", col, random(0.3, 0.9));
      brush.line(x, y, x + random(-1, 1), y + len * random(0.5, 1.2));
    }
  }

  brush.field("zigzag");
  for (let i = 0; i < 12; i++) {
    brush.set(random(["marker", "pen", "charcoal"]), random(palette), random(1.2, 2.8));
    let x0 = random(80, 520);
    let y0 = random(80, 520);
    let pts = [
      [x0, y0, random(0.6, 1.2)],
      [x0 + random(40, 100), y0 + random(-40, 40), random(0.8, 1.5)],
      [x0 + random(90, 180), y0 + random(-60, 60), random(0.3, 0.8)]
    ];
    brush.spline(pts, 0.3);

    let lx = pts[2][0];
    let ly = pts[2][1];
    brush.line(lx, ly, lx + random(-25, 5), ly + random(-25, -5));
    brush.line(lx, ly, lx + random(-25, 5), ly + random(5, 25));
  }
  brush.noField();

  noLoop();
}