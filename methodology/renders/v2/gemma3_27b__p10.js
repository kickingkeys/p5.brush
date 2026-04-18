function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Sand washes
  brush.fill("#d4a373", 120);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  vertex(0, 0);
  vertex(600, 0);
  vertex(600, 200);
  vertex(0, 200);
  endShape(CLOSE);

  brush.fill("#c2916b", 80);
  brush.fillBleed(0.1, "out");
  brush.beginShape();
  vertex(0, 200);
  vertex(600, 200);
  vertex(600, 400);
  vertex(0, 400);
  endShape(CLOSE);

  brush.fill("#b0825b", 60);
  brush.fillBleed(0.05, "out");
  brush.beginShape();
  vertex(0, 400);
  vertex(600, 400);
  vertex(600, 600);
  vertex(0, 600);
  endShape(CLOSE);

  // Charcoal rock formations
  brush.set("charcoal", "#333", 1.5);
  brush.beginShape();
  vertex(100, 200);
  vertex(200, 250);
  vertex(300, 220);
  vertex(250, 180);
  endShape(CLOSE);

  brush.beginShape();
  vertex(400, 300);
  vertex(500, 350);
  vertex(550, 320);
  vertex(480, 280);
  endShape(CLOSE);

  // Pen horizon line
  brush.set("pen", "#000", 0.8);
  brush.line(0, 300, 600, 300);

  noLoop();
}