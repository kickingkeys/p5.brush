function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("hand");
  brush.wiggle(3);

  // Layer 1: Overlapping spray-painted circles in warm tones
  const sprayColors = ["#e8574c", "#f2b84c", "#d7a6a1", "#c79a5e"];
  for (let i = 0; i < 35; i++) {
    const x = random(80, 520);
    const y = random(80, 520);
    const r = random(30, 100);
    brush.set("spray", random(sprayColors), random(1.2, 2.8));
    brush.circle(x, y, r);
  }

  // Layer 2: Drips - downward lines with spray and marker
  brush.noField();
  for (let i = 0; i < 20; i++) {
    const x = random(60, 540);
    const y = random(100, 480);
    const len = random(40, 120);
    brush.set("spray", random(sprayColors), random(0.5, 1.0));
    brush.line(x, y, x + random(-5, 5), y + len);
  }

  // Layer 3: Arrows and ghosted marks with pen and charcoal
  brush.field("curved");
  brush.wiggle(2);
  
  for (let i = 0; i < 12; i++) {
    const x0 = random(60, 500);
    const y0 = random(60, 500);
    const x1 = x0 + random(60, 120);
    const y1 = y0 + random(-30, 30);
    const x2 = x1 - random(10, 20);
    const y2 = y1 + random(-10, 10);
    
    // Faint ghosted arrow
    brush.set("cpencil", "#a0a0a0", 0.6);
    brush.spline([[x0, y0], [x1, y1], [x2, y2]], 0.6);
    
    // Solid arrow tip
    brush.set("rotring", "#222", 1.4);
    brush.line(x1, y1, x2, y2);
  }

  // Layer 4: Hand-drawn fragments with charcoal and 2B
  brush.field("hand");
  for (let i = 0; i < 15; i++) {
    const x = random(60, 500);
    const y = random(60, 500);
    brush.set(random(["charcoal", "2B"]), "#333", random(0.8, 1.6));
    brush.spline([
      [x, y],
      [x + random(-40, 60), y + random(-40, 60)],
      [x + random(-60, 80), y + random(-60, 80)]
    ], 0.5);
  }

  // Layer 5: Light cross-hatching with 2H and HB for texture
  brush.noField();
  brush.hatchStyle("2H", "#777", 0.5);
  brush.hatch(8, 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(80, 80);
  brush.vertex(520, 80);
  brush.vertex(520, 520);
  brush.vertex(80, 520);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#666", 0.8);
  brush.hatch(7, 120, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(100, 100);
  brush.vertex(500, 100);
  brush.vertex(500, 500);
  brush.vertex(100, 500);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}