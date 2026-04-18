function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdf9f0");
  translate(-width/2, -height/2);

  // Fine outlines with HB pencil
  brush.set("HB", "#444", 0.8);
  brush.noFill();
  for (let i = 0; i < 8; i++) {
    const x = 80 + i * 65;
    brush.beginShape(0.4);
    for (let j = 0; j < 120; j++) {
      const y = 200 + j * 0.8;
      const noiseOffset = noise(i * 0.1, j * 0.05, frameCount * 0.001) * 8 - 4;
      const baseX = x + noiseOffset;
      brush.vertex(baseX + sin(j * 0.2 + i) * 3, y);
    }
    brush.endShape(false);

    // Seed head at top
    brush.set("2H", "#555", 0.7);
    const headY = 285;
    brush.arc(x, headY, 12, -PI, 0);
    brush.line(x - 12, headY, x + 12, headY);
    
    // Short hatch marks on seed head
    brush.set("2H", "#666", 0.5);
    for (let k = 0; k < 6; k++) {
      const offsetX = map(k, 0, 5, -10, 10);
      brush.line(x + offsetX, headY, x + offsetX, headY - 8 - random(4));
    }
  }

  // Mid-tone hatching on lower stems
  brush.hatchStyle("2H", "#555", 0.9);
  brush.hatch(6, 80, { rand: 0.1, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(80, 320);
  brush.vertex(520, 320);
  brush.vertex(520, 350);
  brush.vertex(80, 350);
  brush.endShape(true);
  brush.noHatch();

  // Darker shadow zones with cross-hatching
  brush.hatchStyle("2B", "#333", 1.1);
  brush.hatch(4, 75, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(100, 330);
  brush.vertex(300, 330);
  brush.vertex(300, 360);
  brush.vertex(100, 360);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#333", 1.0);
  brush.hatch(4, 15, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(100, 330);
  brush.vertex(300, 330);
  brush.vertex(300, 360);
  brush.vertex(100, 360);
  brush.endShape(true);
  brush.noHatch();

  // Unfinished sketch marks at edges
  brush.set("HB", "#777", 0.6);
  for (let i = 0; i < 12; i++) {
    const x1 = random(0, 80);
    const y1 = random(0, 600);
    const x2 = random(0, 40);
    const y2 = y1 + random(10, 40);
    brush.line(x1, y1, x1 + x2, y2);
  }

  for (let i = 0; i < 12; i++) {
    const x1 = random(520, 600);
    const y1 = random(0, 600);
    const x2 = random(-40, 0);
    const y2 = y1 + random(10, 40);
    brush.line(x1, y1, x1 + x2, y2);
  }

  // Random hatch fragments
  brush.hatchStyle("2H", "#888", 0.7);
  for (let i = 0; i < 8; i++) {
    brush.hatch(8, random(0, 180), { rand: 0.2 });
    const x = random(50, 550);
    const y = random(50, 550);
    brush.line(x, y, x + random(20, 60), y + random(20, 60));
    brush.noHatch();
  }

  noLoop();
}