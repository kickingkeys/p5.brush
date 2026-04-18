function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Background layer of ghosted spray circles
  brush.set("spray", "#b3b3b3", 0.7);
  brush.wiggle(2);
  for (let i = 0; i < 8; i++) {
    const x = random(60, 540);
    const y = random(60, 540);
    const r = random(30, 100);
    brush.circle(x, y, r, 0.3);
  }

  // Overlapping arrows with rotring and spray
  brush.set("rotring", "#555", 0.4);
  for (let i = 0; i < 5; i++) {
    const x1 = random(50, 450);
    const y1 = random(50, 450);
    const x2 = x1 + random(-150, 150);
    const y2 = y1 + random(-150, 150);
    brush.line(x1, y1, x2, y2);
    // Triangle arrowhead
    brush.stroke("#555");
    brush.noFill();
    const angle = atan2(y2 - y1, x2 - x1);
    const len = 15;
    brush.line(x2, y2, x2 - len * cos(angle + 0.3), y2 - len * sin(angle + 0.3));
    brush.line(x2, y2, x2 - len * cos(angle - 0.3), y2 - len * sin(angle - 0.3));
  }

  // Spray bursts
  brush.set("spray", "#888", 2.5);
  for (let i = 0; i < 6; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    for (let j = 0; j < 80; j++) {
      brush.flowLine(x + random(-20, 20), y + random(-20, 20), random(5, 25), random(360));
    }
  }

  // Hand-drawn circles with HB and charcoal, some filled with pastel mass
  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 4; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const r = random(40, 90);
    brush.set("HB", "#333", 1.2);
    brush.circle(x, y, r, 1);
    
    // Add pastel mass fill in some
    if (random() > 0.5) {
      brush.mass("pastel", "#cc8566", { strength: 0.6, precision: 0.4 });
      brush.circle(x, y, r * 0.7);
      brush.noMass();
    }
  }

  // Drips with 2B and crayon
  brush.set("2B", "#1a1a1a", 1.5);
  for (let i = 0; i < 10; i++) {
    const x = random(100, 500);
    const len = random(20, 80);
    brush.line(x, 100, x, 100 + len);
    // Add wobble to drip
    const plot = new brush.Plot("curve");
    plot.addSegment(-90, len * 0.6, 0.8);
    plot.addSegment(random(-110, -70), len * 0.4, 0.5);
    brush.stroke("crayon", "#8b4513", 1.3);
    plot.draw(x, 100);
  }

  // Layered hatching with cpencil and 2H
  brush.hatchStyle("cpencil", "#6b8c6b", 0.7);
  brush.hatch(6, 45, { rand: 0.1 });
  brush.beginShape(0.2);
  for (let a = 0; a < 360; a += 10) {
    const x = 300 + cos(a) * 80;
    const y = 300 + sin(a) * 80;
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#555", 0.5);
  brush.hatch(4, 120, { rand: 0.05, continuous: true });
  brush.beginShape(0.3);
  for (let a = 0; a < 360; a += 10) {
    const x = 200 + cos(a) * 60;
    const y = 400 + sin(a) * 60;
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noHatch();

  // Marker tags and outlines
  brush.noFill();
  brush.set("marker", "#d1495b", 2.0);
  brush.rect(50, 50, 120, 80, "corner");
  brush.rect(430, 100, 100, 100, "corner");

  // Ghosted hand-drawn marks with pen
  brush.set("pen", "#999", 0.8);
  const points = [];
  for (let i = 0; i < 12; i++) {
    points.push([random(20, 580), random(20, 580)]);
  }
  brush.spline(points, 0.4);

  brush.noField();
  noLoop();
}