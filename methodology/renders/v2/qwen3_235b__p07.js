function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Layer 1: Distant ghosted spray circles
  brush.wiggle(2);
  brush.set("spray", "#b8b8b8", 1.8);
  for (let i = 0; i < 15; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const r = random(40, 100);
    brush.circle(x, y, r, 0.3);
  }
  brush.noStroke();

  // Layer 2: Overlapping translucent markers
  const markerColors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3"];
  for (let i = 0; i < 20; i++) {
    const x = random(20, 580);
    const y = random(20, 580);
    const w = random(60, 120);
    const h = random(60, 120);
    const color = random(markerColors);
    brush.wash(color, 180);
    brush.rect(x, y, w, h, "corner");
  }
  brush.noWash();

  // Layer 3: Faint pencil circles and arcs
  brush.set("2H", "#777", 0.5);
  for (let i = 0; i < 12; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const r = random(30, 80);
    brush.circle(x, y, r, 0.2);
    brush.arc(x + random(-20, 20), y + random(-20, 20), r * 0.7, random(0, TWO_PI), random(0, TWO_PI));
  }

  // Layer 4: Drips from top
  brush.set("spray", "#333", 2.2);
  for (let i = 0; i < 25; i++) {
    const x = random(30, 570);
    const len = random(20, 100);
    brush.line(x, 10, x, 10 + len);
  }

  // Layer 5: Arrows and hand-drawn marks
  brush.field("hand");
  brush.set("pen", "#111", 1.0);
  for (let i = 0; i < 30; i++) {
    const x1 = random(30, 570);
    const y1 = random(30, 570);
    const angle = random(360);
    const length = random(20, 60);
    const x2 = x1 + cos(radians(angle)) * length;
    const y2 = y1 + sin(radians(angle)) * length;
    brush.line(x1, y1, x2, y2);

    // Arrowhead
    const a = radians(angle);
    const x3 = x2 - 10 * cos(a - PI / 6);
    const y3 = y2 - 10 * sin(a - PI / 6);
    const x4 = x2 - 10 * cos(a + PI / 6);
    const y4 = y2 - 10 * sin(a + PI / 6);
    brush.line(x2, y2, x3, y3);
    brush.line(x2, y2, x4, y4);
  }
  brush.noField();

  // Layer 6: Charcoal smudges and texture
  brush.set("charcoal", "#555", 1.8);
  for (let i = 0; i < 10; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const points = [];
    for (let j = 0; j < 8; j++) {
      points.push([x + random(-40, 40), y + random(-40, 40)]);
    }
    brush.spline(points, 0.3);
  }

  // Layer 7: Faint crosshatching with 2B
  brush.hatchStyle("2B", "#444", 0.8);
  brush.hatch(6, 45, { rand: 0.1, continuous: true });
  brush.hatch(7, 135, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(100, 100);
  brush.vertex(500, 80);
  brush.vertex(520, 400);
  brush.vertex(90, 420);
  brush.endShape(true);
  brush.noHatch();

  // Layer 8: Pastel and crayon fragments
  brush.mass("pastel", "#ff9aa2", { strength: 0.5, precision: 0.6, outline: false });
  brush.circle(150, 150, 60, 0.4);
  brush.noMass();

  brush.mass("crayon", "#a29bfe", { strength: 0.6, precision: 0.4, outline: true });
  brush.rect(350, 300, 100, 80, "corner");
  brush.noMass();

  // Final stray marks
  brush.set("cpencil", "#800020", 0.7);
  for (let i = 0; i < 15; i++) {
    const x = random(20, 580);
    const y = random(20, 580);
    brush.line(x, y, x + random(-30, 30), y + random(-30, 30));
  }

  noLoop();
}