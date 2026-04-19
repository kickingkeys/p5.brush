function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Sand washes
  brush.fill("#d2b48c", 80);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, 300);
  brush.vertex(0, 300);
  brush.endShape(CLOSE);

  brush.fill("#b8860b", 120);
  brush.beginShape();
  brush.vertex(0, 300);
  brush.vertex(width, 300);
  brush.vertex(width, 600);
  brush.vertex(0, 600);
  brush.endShape(CLOSE);

  // Rock formations - charcoal and pastel
  brush.set("charcoal", "#333", 1);
  brush.noFill();
  brush.beginShape();
  brush.vertex(100, 300);
  brush.vertex(200, 250);
  brush.vertex(300, 320);
  brush.vertex(250, 400);
  brush.vertex(150, 350);
  brush.endShape(CLOSE);

  brush.set("crayon", "#cc3300", 1.2);
  brush.beginShape();
  brush.vertex(350, 350);
  brush.vertex(450, 300);
  brush.vertex(550, 400);
  brush.vertex(450, 450);
  brush.vertex(350, 400);
  brush.endShape(CLOSE);

  brush.noFill();
  brush.set("charcoal", "#333", 0.5);
  brush.beginShape();
  brush.vertex(50, 400);
  brush.vertex(150, 450);
  brush.vertex(300, 420);
  brush.endShape();

  // Horizon line - pen
  brush.set("pen", "#000", 1.5);
  brush.line(0, 300, width, 300);

  noLoop();
}