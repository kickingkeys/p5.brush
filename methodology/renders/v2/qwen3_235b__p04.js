function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  brush.noStroke();
  
  // Memory-like texture with faint, scattered strokes
  brush.set("2H", "#d4c0a8", 0.6);
  for (let i = 0; i < 120; i++) {
    const x = random(180, 420);
    const y = random(150, 320);
    const len = random(20, 60);
    const angle = random(360);
    const start = cos(angle) * len / 2;
    const end = sin(angle) * len / 2;
    brush.line(x - start, y - end, x + start, y + end);
  }
  
  // Base facial contour with soft color layering
  const cx = 300;
  const cy = 280;
  const w = 140;
  const h = 180;
  
  // Organic shape with noise-driven vertices
  let pts = [];
  for (let a = 0; a < 360; a += 15) {
    const rad = radians(a);
    let radiusX = w/2 + noise(cos(rad)*0.1, sin(rad)*0.1) * 15;
    let radiusY = h/2 + noise(cos(rad)*0.1 + 10, sin(rad)*0.1 + 10) * 18;
    let x = cx + cos(rad) * radiusX;
    let y = cy + sin(rad) * radiusY;
    pts.push([x, y]);
  }
  
  // Layered colored pencil strokes at different angles
  const colors = ["#b58c9d", "#a6b37c", "#7a99b5", "#d4ab72"];
  const angles = [20, 65, 110, 155];
  
  for (let layer = 0; layer < 3; layer++) {
    const col = colors[(layer + floor(random(4)))] % colors.length;
    const angle = angles[(layer + floor(random(4)))] % angles.length;
    const weight = random(0.5, 0.9);
    const spacing = random(3.5, 5.5);
    
    brush.hatchStyle("cpencil", col, weight);
    brush.hatch(spacing, angle, { rand: 0.08, continuous: true });
    brush.beginShape(0.4);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
    brush.noHatch();
  }
  
  // Subtle inner structure — eyes as faint marks
  brush.set("2H", "#888", 0.5);
  brush.line(cx - 30, cy - 20, cx - 25, cy - 18);
  brush.line(cx + 25, cy - 20, cx + 30, cy - 18);
  
  // Mouth — short colored strokes
  brush.set("cpencil", "#c47a7a", 0.6);
  brush.line(cx - 15, cy + 30, cx - 5, cy + 32);
  brush.line(cx + 5, cy + 32, cx + 15, cy + 30);
  
  // Hair — directional strokes in unexpected color
  brush.set("cpencil", "#6b8ca4", 1.0);
  for (let i = 0; i < 20; i++) {
    const x = cx - 40 + random(-10, 10);
    const y = cy - 60 + random(-5, 5);
    const len = random(30, 70);
    brush.line(x, y, x - len * 0.3, y - len);
  }
  
  // Final faint contour with variation
  brush.hatchStyle("cpencil", "#9e7d8c", 0.7);
  brush.hatch(6, 10, { rand: 0.1 });
  brush.beginShape(0.5);
  for (let p of pts) {
    brush.vertex(p[0], p[1]);
  }
  brush.endShape(true);
  brush.noHatch();
  
  // Memory fade — sparse spray in background tone
  brush.set("spray", "#fffaf3", 1.8);
  for (let i = 0; i < 40; i++) {
    brush.flowLine(random(100, 500), random(100, 500), random(15, 35), random(360));
  }
  
  noLoop();
}