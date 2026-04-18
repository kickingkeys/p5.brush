function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  
  // Background texture with fine 2H hatching
  brush.hatchStyle("2H", "#ddd", 0.4);
  brush.hatch(6, 15, { rand: 0.1 });
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const x = 30 + i * 60;
      const y = 30 + j * 60;
      const w = 50 + random(-10, 10);
      const h = 50 + random(-10, 10);
      brush.rect(x, y, w, h);
    }
  }
  brush.noHatch();
  
  // Mid-layer undergrowth with 2B and HB cross-hatching
  brush.hatchStyle("2B", "#555", 0.9);
  brush.hatch(4, 45, { rand: 0.15 });
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const x = 50 + i * 75;
      const y = 50 + j * 75;
      const w = 60 + random(-15, 15);
      const h = 60 + random(-15, 15);
      brush.rect(x, y, w, h);
    }
  }
  brush.noHatch();
  
  brush.hatchStyle("HB", "#777", 0.7);
  brush.hatch(5, 135, { rand: 0.1 });
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const x = 50 + i * 75;
      const y = 50 + j * 75;
      const w = 60 + random(-15, 15);
      const h = 60 + random(-15, 15);
      brush.rect(x, y, w, h);
    }
  }
  brush.noHatch();
  
  // Tree trunks with dense rotring and pen hatching
  brush.set("rotring", "#222", 1.5);
  for (let i = 0; i < 15; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const trunkWidth = random(6, 14);
    const trunkHeight = random(80, 160);
    
    // Vertical structure
    brush.spline([
      [x - trunkWidth/2, y],
      [x - trunkWidth/2 + random(-2, 2), y + trunkHeight/2],
      [x - trunkWidth/2 + random(-3, 3), y + trunkHeight]
    ], 0.2);
    
    brush.spline([
      [x + trunkWidth/2, y],
      [x + trunkWidth/2 + random(-2, 2), y + trunkHeight/2],
      [x + trunkWidth/2 + random(-3, 3), y + trunkHeight]
    ], 0.2);
    
    // Bark texture with short horizontal strokes
    brush.hatchStyle("pen", "#333", 0.6);
    brush.hatch(trunkWidth * 1.5, 0, { rand: 0.2, continuous: false });
    for (let h = 0; h < trunkHeight; h += 8) {
      const px = x + random(-2, 2);
      const py = y + h;
      brush.line(px - trunkWidth/2, py, px + trunkWidth/2, py);
    }
    brush.noHatch();
  }
  
  // Foreground shadow patches with dense 2B cross-hatching
  brush.hatchStyle("2B", "#111", 1.2);
  brush.hatch(2, 60, { rand: 0.05, continuous: true });
  for (let i = 0; i < 5; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const size = random(80, 140);
    brush.beginShape(0.3);
    for (let a = 0; a < 360; a += 15) {
      const r = size/2 * noise(a * 0.02, frameCount * 0.001);
      const px = x + cos(radians(a)) * r;
      const py = y + sin(radians(a)) * r;
      brush.vertex(px, py);
    }
    brush.endShape(true);
  }
  brush.noHatch();
  
  brush.hatchStyle("2B", "#111", 1.0);
  brush.hatch(2.5, 150, { rand: 0.07, continuous: true });
  for (let i = 0; i < 5; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const size = random(80, 140);
    brush.beginShape(0.3);
    for (let a = 0; a < 360; a += 15) {
      const r = size/2 * noise(a * 0.02, frameCount * 0.001);
      const px = x + cos(radians(a)) * r;
      const py = y + sin(radians(a)) * r;
      brush.vertex(px, py);
    }
    brush.endShape(true);
  }
  brush.noHatch();
  
  // Final abstract layer of cpencil hatching to unify
  brush.hatchStyle("cpencil", "#aaa", 0.5);
  brush.hatch(8, 90, { rand: 0.1 });
  brush.rect(20, 20, 560, 560);
  brush.noHatch();
  
  noLoop();
}