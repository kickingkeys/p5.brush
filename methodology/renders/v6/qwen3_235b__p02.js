function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  // Set up for graphite study
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  // Define light, mid, dark zones for grass blades
  const blades = [
    { x1: 100, y1: 400, x2: 130, y2: 180, shadow: true },
    { x1: 140, y1: 410, x2: 160, y2: 190, shadow: false },
    { x1: 180, y1: 405, x2: 200, y2: 185, shadow: true },
    { x1: 220, y1: 415, x2: 240, y2: 195, shadow: false },
    { x1: 260, y1: 410, x2: 290, y2: 180, shadow: true },
    { x1: 300, y1: 420, x2: 330, y2: 190, shadow: false },
    { x1: 340, y1: 415, x2: 370, y2: 185, shadow: true },
    { x1: 380, y1: 425, x2: 410, y2: 195, shadow: false },
    { x1: 420, y1: 420, x2: 450, y2: 190, shadow: true },
    { x1: 460, y1: 430, x2: 490, y2: 200, shadow: false }
  ];

  // Draw grass blades with pressure variation
  for (let i = 0; i < blades.length; i++) {
    const b = blades[i];
    const weight = b.shadow ? 0.8 : 0.5;
    
    brush.set("HB", "#333", weight);
    const pts = [];
    const count = 8;
    for (let j = 0; j < count; j++) {
      const t = j / (count - 1);
      const x = lerp(b.x1, b.x2, t);
      const y = lerp(b.y1, b.y2, t) + random(-5, 5) * (1 - abs(0.5 - t) * 2);
      pts.push([x, y, weight * (0.5 + t * 0.8)]);
    }
    brush.spline(pts, 0.4);
  }

  // Seed heads - sparse and delicate
  for (let i = 0; i < 5; i++) {
    const cx = 120 + i * 80;
    const cy = 160;
    
    // Light structural lines
    brush.set("2H", "#555", 0.6);
    for (let j = 0; j < 3; j++) {
      const angle = random(30, 150);
      const length = random(15, 30);
      const x1 = cx + random(-5, 5);
      const y1 = cy + random(-5, 5);
      const x2 = x1 + cos(radians(angle)) * length;
      const y2 = y1 + sin(radians(angle)) * length;
      brush.line(x1, y1, x2, y2);
    }
  }

  // Mid-tone areas with 2B hatching
  brush.hatchStyle("2B", "#222", 1.0);
  brush.hatch(4, 75, { rand: 0.08, continuous: true });
  brush.beginShape(0.3);
  for (let x = 80; x <= 520; x += 40) {
    const y = 400 + noise(x * 0.01) * 20;
    brush.vertex(x, y);
  }
  brush.vertex(520, 500);
  brush.vertex(80, 500);
  brush.endShape(true);
  brush.noHatch();

  // Light hatching for upper grass plane
  brush.hatchStyle("2H", "#666", 0.7);
  brush.hatch(10, 30, { rand: 0.05, continuous: true });
  brush.beginShape(0.3);
  for (let x = 100; x <= 500; x += 30) {
    const y = 350 + noise(x * 0.01 + 100) * 15;
    brush.vertex(x, y);
  }
  brush.vertex(500, 400);
  brush.vertex(100, 400);
  brush.endShape(true);
  brush.noHatch();

  // Unfinished edges - sparse lines fading out
  brush.set("2H", "#666", 0.5);
  for (let x = 50; x < 600; x += 60) {
    brush.line(x, 550, x + random(20, 40), 580);
  }
  for (let y = 50; y < 600; y += 60) {
    brush.line(550, y, 580, y + random(20, 40));
  }

  noLoop();
}