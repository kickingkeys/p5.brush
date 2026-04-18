function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  
  // Define forest density parameters
  const numLayers = 40;
  const baseSpacing = 6.0;
  const minSpacing = 1.8;
  const trunkWidth = 15;
  const treeCount = 80;
  
  // Draw multiple layers of hatching to build density
  for (let layer = 0; layer < numLayers; layer++) {
    const spacing = map(layer, 0, numLayers - 1, baseSpacing, minSpacing);
    const angle = 30 + layer * 7.5;
    
    // Set hatch style with rotring for precision
    brush.hatchStyle("rotring", "#000", 0.4);
    brush.hatch(spacing, angle, { rand: 0.08, continuous: true });
    
    // Draw tree trunks and undergrowth with varying shapes
    for (let i = 0; i < treeCount; i++) {
      const x = random(50, width - 50);
      const y = random(50, height - 50);
      const w = random(trunkWidth - 5, trunkWidth + 10);
      const h = random(30, 120);
      
      // Draw vertical trunks and organic undergrowth
      brush.beginShape(0.3);
      brush.vertex(x, y);
      brush.vertex(x + random(-3, 3), y + h * 0.3);
      brush.vertex(x + random(-5, 5), y + h * 0.6);
      brush.vertex(x + random(-7, 7), y + h);
      brush.endShape(false);
    }
    
    brush.noHatch();
  }
  
  // Add fine detail with 2H for highlights
  brush.hatchStyle("2H", "#000", 0.3);
  brush.hatch(12, 45, { rand: 0.1, continuous: true });
  for (let i = 0; i < 30; i++) {
    const x = random(80, width - 80);
    const y = random(80, height - 80);
    brush.beginShape(0.2);
    for (let j = 0; j < 5; j++) {
      brush.vertex(x + random(-20, 20), y + j * 15);
    }
    brush.endShape(false);
  }
  brush.noHatch();
  
  // Add contour emphasis with pen
  brush.set("pen", "#000", 1.0);
  for (let i = 0; i < 15; i++) {
    const x = random(100, width - 100);
    const y = random(100, height - 100);
    const r = random(40, 100);
    const pts = [];
    for (let a = 0; a < 360; a += 15) {
      const angle = radians(a);
      const radius = r + noise(a * 0.05, i * 0.1) * 25;
      const px = x + cos(angle) * radius;
      const py = y + sin(angle) * radius;
      pts.push([px, py]);
    }
    brush.spline(pts, 0.4);
  }
  
  noLoop();
}