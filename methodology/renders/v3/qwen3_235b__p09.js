function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdf0e0");
  translate(-width/2, -height/2);

  // Wet watercolor bleeds for rainy pavement
  brush.fill("#1a2b5c", 40);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.7, 0.4);
  brush.noStroke();
  brush.beginShape(0.3);
  brush.vertex(100, 200);
  brush.vertex(500, 180);
  brush.vertex(520, 480);
  brush.vertex(80, 500);
  brush.endShape(true);
  brush.noFill();

  // Neon marker smears reflecting
  brush.wash("#ff2e63", 180);
  brush.beginShape(0.2);
  brush.vertex(120, 460);
  brush.vertex(135, 400);
  brush.vertex(480, 420);
  brush.vertex(460, 480);
  brush.endShape(true);
  brush.wash("#33ccff", 160);
  brush.beginShape(0.2);
  brush.vertex(200, 520);
  brush.vertex(220, 380);
  brush.vertex(260, 390);
  brush.vertex(240, 530);
  brush.endShape(true);
  brush.noWash();

  // Distant sparse ink silhouettes
  brush.set("pen", "#111", 1.0);
  for (let i = 0; i < 8; i++) {
    const x = 100 + i * 60 + random(-20, 20);
    const y = 400 + random(-10, 10);
    brush.line(x, y, x, y + 40);
  }

  noLoop();
}