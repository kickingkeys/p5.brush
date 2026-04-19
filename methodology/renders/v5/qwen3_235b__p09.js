function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width/2, -height/2);
  
  background("#fffaf3");
  
  // Wet watercolor bleeds for street and sky
  brush.noStroke();
  brush.fillTexture(0.7, 0.4);
  brush.fill("#1a1a2e", 120);
  brush.fillBleed(0.5, "out");
  brush.rect(0, 0, 600, 600);
  
  // Neon marker smears reflecting on wet pavement
  brush.noFill();
  brush.wash("#ff073a", 180);
  brush.rect(0, 300, 600, 300);
  brush.wash("#00f0ff", 160);
  brush.rect(100, 320, 120, 280);
  brush.wash("#ff00bf", 140);
  brush.rect(480, 340, 100, 260);
  
  // Add marker wobble to reflections
  brush.field("hand");
  brush.wiggle(2);
  
  // Sparse ink silhouettes of passersby
  brush.set("2B", "#000", 1.8);
  for (let i = 0; i < 8; i++) {
    const x = random(50, 550);
    const y = random(320, 500);
    const h = random(40, 80);
    brush.line(x, y, x, y - h);
    brush.spline([[x-5, y-h/3], [x, y-h], [x+5, y-h/3]], 0.3);
  }
  brush.noField();
  
  // Distant blurred figures with spray
  brush.set("spray", "#1a1a1a", 1.2);
  for (let i = 0; i < 5; i++) {
    const x = random(100, 500);
    brush.flowLine(x, 310, random(15, 30), 90);
  }
  
  // Subtle crosswalk with faint hatch
  brush.hatchStyle("2H", "#ccc", 0.5);
  brush.hatch(8, 90, { rand: 0.1 });
  for (let y = 520; y < 580; y += 30) {
    brush.line(180, y, 420, y);
  }
  brush.noHatch();
  
  noLoop();
}