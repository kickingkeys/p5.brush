function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set up vector field for organic flow
  brush.field("hand");
  brush.wiggle(2);

  // Spray-painted circles in layers
  const sprayColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#2a2a2a", "#d46ea6"];
  for (let i = 0; i < 35; i++) {
    const x = random(60, 540);
    const y = random(60, 540);
    const r = random(30, 120);
    brush.set("spray", random(sprayColors), random(0.8, 2.4));
    brush.flowLine(x, y, random(15, 50), 0);
  }

  // Drips - downward spray lines
  for (let i = 0; i < 20; i++) {
    const x = random(50, 550);
    const y = random(100, 400);
    brush.set("spray", random(sprayColors), random(0.4, 0.9));
    brush.line(x, y, x + random(-5, 5), y + random(60, 180));
  }

  // Arrows - gestural splines
  brush.set("marker", "#1a1a1a", 1.8);
  for (let i = 0; i < 12; i++) {
    const x0 = random(80, 500);
    const y0 = random(80, 500);
    const points = [
      [x0, y0, 0.6],
      [x0 + random(30, 100), y0 + random(-20, 20), 0.5],
      [x0 + random(100, 180), y0 + random(-10, 10), 0.4]
    ];
    brush.spline(points, 0.3);
  }

  // Ghosted hand-drawn marks with pencil
  brush.set("2H", "#888", 0.5);
  for (let i = 0; i < 18; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const len = random(20, 70);
    const angle = random(360);
    const px = x + cos(radians(angle)) * len;
    const py = y + sin(radians(angle)) * len;
    brush.line(x, y, px, py);
  }

  // Layered hatching with colored pencil for texture
  brush.hatchStyle("cpencil", "#b3534b", 0.7);
  brush.hatch(6, 45, { rand: 0.1 });
  brush.beginShape(0.3);
  for (let i = 0; i < 6; i++) {
    const a = map(i, 0, 6, 0, TWO_PI);
    const x = 300 + cos(a) * 100;
    const y = 300 + sin(a) * 100;
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noHatch();

  // Faint charcoal smudges for depth
  brush.set("charcoal", "#333", 1.2);
  for (let i = 0; i < 8; i++) {
    const x = random(200, 400);
    const y = random(200, 400);
    brush.spline([[x, y], [x + random(-40, 40), y + random(-40, 40)]], 0.2);
  }

  // Final dry media marks with pastel
  brush.mass("pastel", "#e07a5f", { strength: 0.5, precision: 0.4 });
  brush.circle(420, 150, 40);
  brush.noMass();

  brush.noField();
  noLoop();
}