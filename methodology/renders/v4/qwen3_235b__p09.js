function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Wet watercolor bleeds for street and sky
  brush.noStroke();
  brush.fillTexture(0.7, 0.5);
  brush.fill("#1a1a2e", 180);
  brush.fillBleed(0.5, "out");
  brush.rect(0, 0, 600, 600);
  brush.noFill();

  // Neon marker smears reflecting on wet pavement
  brush.wash("#ff2a6d", 200);
  brush.fillBleed(0.6, "out");
  brush.rect(0, 300, 600, 300);
  brush.wash("#05d9e8", 180);
  brush.fillBleed(0.5, "out");
  brush.rect(100, 320, 120, 280);
  brush.wash("#f4ff4e", 160);
  brush.fillBleed(0.4, "out");
  brush.rect(400, 340, 100, 260);
  brush.noWash();

  // Sparse ink silhouettes of passersby
  brush.set("2B", "#000", 2.0);
  for (let i = 0; i < 8; i++) {
    const x = random(50, 550);
    const y = random(320, 480);
    const h = random(60, 100);
    brush.beginShape(0.3);
    brush.vertex(x, y);
    brush.vertex(x + 8, y);
    brush.vertex(x + 12, y + h * 0.3);
    brush.vertex(x + 10, y + h);
    brush.vertex(x + 6, y + h * 0.7);
    brush.vertex(x - 6, y + h * 0.7);
    brush.vertex(x - 10, y + h);
    brush.vertex(x - 12, y + h * 0.3);
    brush.vertex(x - 8, y);
    brush.endShape(true);
  }

  // Wet pavement texture with sparse hatching
  brush.hatchStyle("2H", "#0a0a1a", 0.6);
  brush.hatch(6, 0, { rand: 0.1, gradient: 0.2 });
  brush.beginShape(0.2);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Distant light glows with soft spray
  brush.field("curved");
  brush.set("spray", "#ffffff", 2.8);
  for (let i = 0; i < 12; i++) {
    const x = random(20, 580);
    brush.flowLine(x, 50, random(20, 40), 90);
  }
  brush.noField();

  noLoop();
}