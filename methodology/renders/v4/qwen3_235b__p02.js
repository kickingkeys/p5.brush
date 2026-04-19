function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdf9f0");
  translate(-width/2, -height/2);

  brush.noFill();
  angleMode(DEGREES);

  // Background grass layer - very light 2H hatching
  brush.hatchStyle("2H", "#aaa", 0.5);
  brush.hatch(12, 15, { rand: 0.1, continuous: true });
  for (let y = 0; y < height; y += 30) {
    brush.beginShape(0.2);
    for (let x = 0; x < width; x += 20) {
      const py = y + noise(x * 0.01, y * 0.01) * 40;
      brush.vertex(x, py);
    }
    brush.endShape(false);
  }
  brush.noHatch();

  // Main grass stems - HB with pressure variation
  brush.set("HB", "#555", 1.0);
  for (let i = 0; i < 25; i++) {
    const x = random(20, 580);
    const baseY = 300 + random(-150, 100);
    const length = random(180, 280);
    
    brush.beginShape(0.3);
    let lastX = x;
    for (let j = 0; j < length; j += 15) {
      const sway = sin(j * 0.03 + frameCount * 0.001) * 25;
      const y = baseY - j;
      const x = lastX + noise(i, j * 0.1) * 8 - 4;
      lastX = x;
      const pressure = map(j, 0, length, 0.6, 1.3);
      brush.vertex(x, y, pressure);
    }
    brush.endShape(false);
  }

  // Seed heads - 2B for dark accents
  for (let i = 0; i < 18; i++) {
    const x = random(40, 560);
    const y = 100 + random(-60, 160);
    
    // Seed head outline
    brush.set("2B", "#333", 0.8);
    brush.circle(x, y, random(8, 14), 0.3);
    
    // Internal detail with fine lines
    const numLines = int(random(5, 9));
    for (let j = 0; j < numLines; j++) {
      const angle = j * (360 / numLines);
      const x1 = x + cos(radians(angle)) * 4;
      const y1 = y + sin(radians(angle)) * 4;
      const x2 = x + cos(radians(angle)) * 12;
      const y2 = y + sin(radians(angle)) * 12;
      brush.line(x1, y1, x2, y2);
    }
  }

  // Foreground detail - 2B cross-hatching for depth
  brush.hatchStyle("2B", "#444", 1.1);
  const fgShapes = [
    { x: 80, y: 400, w: 120, h: 140 },
    { x: 400, y: 380, w: 140, h: 160 }
  ];
  
  for (const shape of fgShapes) {
    // First hatch direction
    brush.hatch(4, 50, { rand: 0.08, continuous: true });
    brush.rect(shape.x, shape.y, shape.w, shape.h, "corner");
    
    // Cross hatch
    brush.hatch(5, 130, { rand: 0.07, continuous: true });
    brush.rect(shape.x + 10, shape.y + 10, shape.w - 20, shape.h - 20, "corner");
  }
  brush.noHatch();

  // Final outlines with pen for definition
  brush.set("pen", "#222", 1.2);
  for (let i = 0; i < 8; i++) {
    const x1 = random(20, 580);
    const y1 = random(200, 500);
    const x2 = x1 + random(-40, 40);
    const y2 = y1 - random(60, 120);
    brush.spline([[x1, y1], [x2, y2]], 0.7);
  }

  // Unfinished edges - partial strokes at canvas boundaries
  brush.set("HB", "#666", 0.7);
  for (let i = 0; i < 12; i++) {
    const side = int(random(4));
    let x1, y1, x2, y2;
    if (side === 0) { // left
      x1 = random(-20, 0); y1 = random(0, height);
      x2 = random(0, 40); y2 = y1 + random(-30, 30);
    } else if (side === 1) { // right
      x1 = random(width, width + 20); y1 = random(0, height);
      x2 = random(width - 40, width); y2 = y1 + random(-30, 30);
    } else if (side === 2) { // top
      x1 = random(0, width); y1 = random(-20, 0);
      x2 = x1 + random(-30, 30); y2 = random(0, 40);
    } else { // bottom
      x1 = random(0, width); y1 = random(height, height + 20);
      x2 = x1 + random(-30, 30); y2 = random(height - 40, height);
    }
    brush.line(x1, y1, x2, y2);
  }

  noLoop();
}