function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  
  // Distant trees - sparse and light
  brush.hatchStyle("2H", "#000", 0.6);
  brush.hatch(12, -15, { rand: 0.08, continuous: true });
  for (let x = 20; x < width; x += 80) {
    brush.line(x, 100, x, 250);
  }
  brush.noHatch();
  
  // Midground trunks - medium density
  brush.hatchStyle("HB", "#000", 0.8);
  brush.hatch(7, -30, { rand: 0.12, continuous: true });
  for (let x = 40; x < width; x += 60) {
    brush.line(x, 80, x, 320);
  }
  brush.noHatch();
  
  // Foreground trunks and thick branches - dense
  brush.hatchStyle("2B", "#000", 1.2);
  brush.hatch(4, -45, { rand: 0.15, continuous: true });
  for (let x = 60; x < width; x += 40) {
    brush.line(x, 60, x, 400);
  }
  brush.noHatch();
  
  // Undergrowth layer - cross hatching at different angles
  brush.hatchStyle("2B", "#000", 1.0);
  brush.hatch(5, 15, { rand: 0.18, continuous: true });
  for (let y = 350; y < height; y += 10) {
    for (let x = 0; x < width; x += 30) {
      if (random() > 0.3) {
        brush.line(x, y, x + random(15, 40), y + random(5, 15));
      }
    }
  }
  brush.noHatch();
  
  // Secondary cross hatch for depth
  brush.hatchStyle("HB", "#000", 0.9);
  brush.hatch(6, 75, { rand: 0.14, continuous: true });
  for (let y = 370; y < height; y += 12) {
    for (let x = 15; x < width; x += 35) {
      if (random() > 0.4) {
        brush.line(x, y, x + random(10, 30), y + random(8, 20));
      }
    }
  }
  brush.noHatch();
  
  // Dark shadow zones - very dense 2B
  brush.hatchStyle("2B", "#000", 1.4);
  brush.hatch(3, -60, { rand: 0.2, continuous: true });
  for (let x = 100; x < width - 100; x += 5) {
    if (random() > 0.7) {
      const y = 300 + random(50, 120);
      brush.line(x, y, x + random(2, 8), y + random(2, 10));
    }
  }
  brush.noHatch();
  
  // Final structural elements with pen
  brush.set("pen", "#000", 1.1);
  for (let i = 0; i < 8; i++) {
    const x = random(50, width - 50);
    brush.spline([
      [x, 50],
      [x + random(-20, 20), 150],
      [x + random(-30, 30), 250],
      [x + random(-25, 25), 350],
      [x + random(-15, 15), 450]
    ], 0.2);
  }
  
  noLoop();
}