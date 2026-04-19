function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Sand washes
  brush.fill("#d3bfa3", 120);
  brush.beginShape();
  vertex(-200, -100);
  vertex(200, -100);
  vertex(200, 50);
  vertex(-200, 50);
  endShape(CLOSE);

  brush.fill("#c9a891", 80);
  brush.beginShape();
  vertex(-150, -50);
  vertex(150, -50);
  vertex(150, 0);
  vertex(-150, 0);
  endShape(CLOSE);

  // Charcoal rocks
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape();
  vertex(-100, -100);
  vertex(-50, -150);
  vertex(0, -100);
  vertex(50, -150);
  endShape(CLOSE);

  brush.beginShape();
  vertex(50, 0);
  vertex(100, -50);
  vertex(150, 0);
  vertex(100, 50);
  endShape(CLOSE);

  // Pen horizon
  brush.set("pen", "#222", 0.8);
  brush.line(-300, 0, 300, 0);

  noLoop();
}