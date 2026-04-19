function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#f5f0e0");
  translate(-width/2, -height/2);

  // Watercolor bleeds for wet pavement
  brush.noStroke();
  brush.fillTexture(0.7, 0.5);
  brush.fillBleed(0.5, "out");
  brush.fill("#1a3d6d", 45);
  brush.rect(0, 300, 600, 300);
  brush.fill("#8b1c4d", 35);
  brush.rect(100, 350, 200, 250);
  brush.fill("#e65100", 40);
  brush.rect(400, 380, 180, 220);
  brush.noFill();

  // Neon marker smears
  brush.wiggle(1);
  brush.wash("#ff2d6f", 220);
  brush.rect(120, 360, 160, 230);
  brush.wash("#00c9b1", 230);
  brush.rect(420, 390, 140, 200);
  brush.noWash();

  // Sparse ink silhouettes of passersby
  brush.set("2B", "#000", 1.8);
  for (let i = 0; i < 8; i++) {
    const x = 80 + i * 65;
    const y = 500 + random(-20, 20);
    brush.line(x, y, x, y - 60);
    brush.line(x - 8, y - 60, x + 8, y - 60);
  }

  // Distant street details with hatching
  brush.hatchStyle("2H", "#333", 0.5);
  brush.hatch(6, 90, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(0, 280);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 280);
  brush.endShape(true);
  brush.noHatch();

  // Reflections on wet pavement
  brush.field("curved");
  brush.refreshField(0.1);
  brush.set("spray", "#ff2d6f", 1.5);
  for (let i = 0; i < 12; i++) {
    brush.flowLine(140 + random(-5, 5), 420 + i * 8, random(10, 25), 0);
  }
  brush.set("spray", "#00c9b1", 1.3);
  for (let i = 0; i < 12; i++) {
    brush.flowLine(450 + random(-5, 5), 440 + i * 8, random(10, 25), 0);
  }
  brush.noField();

  noLoop();
}