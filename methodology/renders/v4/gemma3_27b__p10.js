function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width/2, -height/2);

  // Sand washes
  brush.fill("#d8c3a5", 120);
  brush.fillBleed(0.3, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.6);
  brush.vertex(0, height * 0.6);
  brush.endShape(CLOSE);

  brush.fill("#e0d5c0", 80);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.4);
  brush.vertex(0, height * 0.4);
  brush.endShape(CLOSE);

  brush.fill("#f0e6d2", 50);
  brush.fillBleed(0.1, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.3);
  brush.vertex(0, height * 0.3);
  brush.endShape(CLOSE);

  // Charcoal rocks
  brush.noStroke();
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape();
  brush.vertex(100, 150);
  brush.vertex(200, 250);
  brush.vertex(150, 300);
  brush.vertex(50, 200);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(350, 100);
  brush.vertex(450, 180);
  brush.vertex(400, 230);
  brush.vertex(300, 150);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(500, 300);
  brush.vertex(580, 350);
  brush.vertex(550, 400);
  brush.vertex(470, 330);
  brush.endShape(CLOSE);

  // Horizon line
  brush.set("pen", "#000", 0.5);
  brush.line(0, height/2, width, height/2);

  noLoop();
}