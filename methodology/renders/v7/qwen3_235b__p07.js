function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("hand");
  brush.wiggle(3);

  // Overlapping spray-painted circles
  const sprayColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#2a2a2a", "#d43f8d"];
  for (let i = 0; i < 35; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const r = random(30, 90);
    brush.set("spray", random(sprayColors), random(1.5, 3.0));
    brush.circle(x, y, r);
  }

  // Drips
  for (let i = 0; i < 12; i++) {
    const x = random(80, 520);
    const y = random(100, 400);
    brush.set("spray", random(sprayColors), random(0.6, 1.2));
    brush.line(x, y, x + random(-6, 6), y + random(50, 120));
  }

  // Arrows and tags
  for (let i = 0; i < 8; i++) {
    const x = random(80, 500);
    const y = random(100, 500);
    brush.set("spray", random(sprayColors), random(1.8, 2.8));
    const pts = [
      [x, y, 0.5],
      [x + random(60, 140), y + random(-20, 20), 0.4],
      [x + random(140, 200), y + random(-10, 10), 0.6]
    ];
    brush.spline(pts, 0.3);
  }

  // Ghosted hand-drawn marks with charcoal
  brush.set("charcoal", "#777", 0.8);
  for (let i = 0; i < 15; i++) {
    const x1 = random(100, 500);
    const y1 = random(100, 500);
    const x2 = x1 + random(-80, 80);
    const y2 = y1 + random(-80, 80);
    brush.line(x1, y1, x2, y2);
  }

  // Light hatching with 2H and cpencil
  brush.hatchStyle("2H", "#555", 0.5);
  brush.hatch(12, random(0, 90), { rand: 0.1 });
  brush.rect(100, 100, 400, 300, "corner");
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b85632", 0.6);
  brush.hatch(8, random(30, 120), { rand: 0.12 });
  brush.rect(150, 150, 300, 200, "corner");
  brush.noHatch();

  brush.noField();
  noLoop();
}