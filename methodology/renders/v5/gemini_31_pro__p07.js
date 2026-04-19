function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const palette = ["#e63946", "#1d3557", "#f4a261", "#2a9d8f", "#2b2b2b", "#d62828"];

  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 20; i++) {
    brush.set("2H", "#c2b8aa", random(0.5, 1.5));
    let x = random(50, 550);
    let y = random(50, 550);
    brush.spline([
      [x, y, random(0.3, 1.0)],
      [x + random(-80, 80), y + random(-80, 80), random(0.5, 1.2)],
      [x + random(-150, 150), y + random(-150, 150), random(0.2, 0.8)]
    ], 0.4);
  }
  brush.noField();

  for (let i = 0; i < 45; i++) {
    let col = random(palette);
    
    if (random() > 0.4) {
      brush.set("spray", col, random(1.0, 2.5));
      brush.noFill();
      brush.circle(random(50, 550), random(50, 550), random(20, 120));
    } else {
      brush.set("spray", col, random(2.0, 4.0));
      brush.flowLine(random(50, 550), random(50, 550), random(10, 40), random(360));
    }
  }

  for (let i = 0; i < 30; i++) {
    brush.set("spray", random(palette), random(0.3, 0.9));
    let x = random(50, 550);
    let y = random(100, 400);
    brush.line(x, y, x + random(-2, 2), y + random(40, 150));
  }

  brush.field("hand");
  brush.wiggle(2);
  for (let i = 0; i < 15; i++) {
    let col = random(palette);
    let isMarker = random() > 0.5;
    brush.set(isMarker ? "marker" : "spray", col, random(1.2, 2.5));
    
    let x0 = random(80, 500);
    let y0 = random(100, 500);
    let x1 = x0 + random(40, 100);
    let y1 = y0 + random(-40, 40);
    let x2 = x1 + random(40, 120);
    let y2 = y1 + random(-30, 50);

    brush.spline([
      [x0, y0, random(0.8, 1.5)],
      [x1, y1, random(1.0, 1.8)],
      [x2, y2, random(0.5, 1.2)]
    ], 0.3);

    if (random() > 0.3) {
      brush.line(x2, y2, x2 - random(15, 30), y2 - random(10, 25));
      brush.line(x2, y2, x2 - random(5, 20), y2 + random(15, 30));
    }
  }
  brush.noField();

  brush.field("zigzag");
  for (let i = 0; i < 12; i++) {
    brush.set("charcoal", "#1a1a1a", random(0.8, 1.5));
    let cx = random(100, 500);
    let cy = random(100, 500);
    brush.flowLine(cx, cy, random(20, 70), random(360));
  }
  brush.noField();

  noLoop();
}