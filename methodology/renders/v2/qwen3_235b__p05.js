function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noField();
  brush.noHatch();

  // Tree trunks - vertical rotring and pen lines with slight variation
  brush.set("rotring", "#000", 1.2);
  for (let x = 50; x < width; x += random(25, 45)) {
    let trunkWidth = random(8, 18);
    if (random() < 0.7) {
      brush.strokeWeight(random(0.8, 1.5));
      brush.line(x, 20, x, height - 20);
      if (random() < 0.4) {
        brush.line(x + trunkWidth, 20, x + trunkWidth, height - 20);
      }
    }
  }

  // Undergrowth - dense cross-hatching with 2B and HB
  brush.hatchStyle("2B", "#000", 1.0);
  brush.hatch(4, 60, { rand: 0.1, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(0, height - 80);
  brush.vertex(width, height - 100);
  brush.vertex(width, height);
  brush.vertex(0, height);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#000", 0.8);
  brush.hatch(5, 135, { rand: 0.12, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(20, height - 70);
  brush.vertex(width - 20, height - 90);
  brush.vertex(width - 20, height - 20);
  brush.vertex(20, height - 30);
  brush.endShape(true);
  brush.noHatch();

  // Mid-layer undergrowth with 2H for lighter texture
  brush.hatchStyle("2H", "#000", 0.6);
  brush.hatch(7, 85, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(60, height - 150);
  brush.vertex(width - 60, height - 180);
  brush.vertex(width - 60, height - 80);
  brush.vertex(60, height - 90);
  brush.endShape(true);
  brush.noHatch();

  // Deep shadows behind trunks - very dense 2B cross-hatching
  brush.hatchStyle("2B", "#000", 1.3);
  brush.hatch(3, 45, { rand: 0.08, continuous: true });
  brush.hatch(3, 135, { rand: 0.08, continuous: true });
  for (let x = 40; x < width; x += random(60, 100)) {
    brush.beginShape(0.3);
    brush.vertex(x - 20, 100);
    brush.vertex(x + 20, 100);
    brush.vertex(x + 30, height - 120);
    brush.vertex(x - 10, height - 100);
    brush.endShape(true);
  }
  brush.noHatch();

  // Canopy layer - fine rotring hatching at multiple angles
  brush.hatchStyle("rotring", "#000", 0.4);
  brush.hatch(6, 30, { rand: 0.05, continuous: true });
  brush.hatch(7, 105, { rand: 0.05, continuous: true });
  brush.hatch(8, 160, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(0, 0);
  brush.vertex(width, 20);
  brush.vertex(width, 180);
  brush.vertex(0, 160);
  brush.endShape(true);
  brush.noHatch();

  // Foreground texture - randomized cpencil dots and short lines
  brush.set("cpencil", "#000", 0.7);
  for (let i = 0; i < 800; i++) {
    let x = random(width);
    let y = random(height - 30, height);
    if (random() < 0.6) {
      brush.line(x, y, x + random(-8, 8), y + random(-6, 6));
    }
  }

  // Final pen outlines on some trunks for emphasis
  brush.set("pen", "#000", 1.8);
  for (let x = 100; x < width; x += 120) {
    if (random() < 0.6) {
      brush.line(x, 40, x, height - 100);
    }
  }

  // Add some broken horizontal lines to suggest leaf litter
  brush.set("rotring", "#000", 0.5);
  for (let y = height - 15; y < height; y += 2) {
    for (let x = 0; x < width; x += random(5, 15)) {
      if (random() < 0.3) {
        brush.line(x, y, x + random(3, 10), y);
      }
    }
  }

  noLoop();
}