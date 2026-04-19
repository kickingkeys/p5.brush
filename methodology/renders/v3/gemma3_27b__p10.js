function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Sand washes - layered
  brush.fill("#d2b48c", 80);
  brush.beginShape();
  vertex(-300, 0);
  vertex(300, 0);
  vertex(300, 200);
  vertex(-300, 200);
  brush.endShape(CLOSE);

  brush.fill("#c2a576", 60);
  brush.beginShape();
  vertex(-250, 50);
  vertex(250, 50);
  vertex(250, 150);
  vertex(-250, 150);
  brush.endShape(CLOSE);

  brush.fill("#b09669", 40);
  brush.beginShape();
  vertex(-200, 100);
  vertex(200, 100);
  vertex(200, 100);
  vertex(-200, 100);
  brush.endShape(CLOSE);

  // Charcoal rock formations
  brush.set("charcoal", "#333", 1.5);
  brush.beginShape();
  vertex(-150, 100);
  vertex(-100, 150);
  vertex(-50, 100);
  vertex(-100, 50);
  brush.endShape(CLOSE);

  brush.beginShape();
  vertex(50, 150);
  vertex(100, 200);
  vertex(150, 150);
  vertex(100, 100);
  brush.endShape(CLOSE);

  brush.beginShape();
  vertex(200, 50);
  vertex(250, 75);
  vertex(300, 50);
  brush.endShape(CLOSE);

  // Horizon line
  brush.set("pen", "#000", 0.3);
  brush.line(-300, 0, 300, 0);

  noLoop();
}