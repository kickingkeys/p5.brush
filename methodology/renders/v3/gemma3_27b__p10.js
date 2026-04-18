function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Sand washes
  brush.fill("#d4a373", 180);
  brush.noStroke();
  brush.beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height * 0.6);
  vertex(0, height * 0.6);
  brush.endShape(CLOSE);

  brush.fill("#c69b6c", 120);
  brush.beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height * 0.4);
  vertex(0, height * 0.4);
  brush.endShape(CLOSE);

  // Rock formations (charcoal + crayon mass)
  brush.fill("#333");
  brush.noStroke();
  brush.beginShape();
  vertex(100, 0);
  vertex(200, 50);
  vertex(150, 150);
  vertex(50, 100);
  brush.endShape(CLOSE);

  brush.fill("#666");
  brush.beginShape();
  vertex(150, 0);
  vertex(250, 75);
  vertex(200, 175);
  vertex(100, 125);
  brush.endShape(CLOSE);

  brush.mass("crayon", "#444", { strength: 0.7, precision: 0.5 });
  brush.beginShape();
  vertex(100, 0);
  vertex(250, 75);
  vertex(200, 175);
  vertex(50, 100);
  brush.endShape(CLOSE);
  brush.noMass();

  // Horizon line (pen)
  brush.stroke("#000");
  brush.strokeWeight(1.5);
  brush.line(0, height * 0.6, width, height * 0.6);
  brush.noStroke();

  noLoop();
}