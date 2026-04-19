function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Head outline
  brush.set("pen", "#333", 1.2);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(150, -100);
  brush.vertex(200, 0);
  brush.vertex(150, 100);
  brush.vertex(0, 150);
  brush.vertex(-150, 100);
  brush.vertex(-200, 0);
  brush.vertex(-150, -100);
  brush.endShape(true);

  // Base skin tone
  brush.set("cpencil", "#f0d7c5", 0.8);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(150, -100);
  brush.vertex(200, 0);
  brush.vertex(150, 100);
  brush.vertex(0, 150);
  brush.vertex(-150, 100);
  brush.vertex(-200, 0);
  brush.vertex(-150, -100);
  brush.endShape(true);

  // Shadow areas
  brush.set("cpencil", "#e0b79a", 0.6);
  brush.beginShape();
  brush.vertex(50, -100);
  brush.vertex(100, -50);
  brush.vertex(150, 0);
  brush.vertex(100, 50);
  brush.vertex(50, 100);
  brush.endShape(true);

  // Highlight areas
  brush.set("cpencil", "#f8e7d4", 0.7);
  brush.beginShape();
  brush.vertex(-50, -100);
  brush.vertex(-100, -50);
  brush.vertex(-150, 0);
  brush.vertex(-100, 50);
  brush.vertex(-50, 100);
  brush.endShape(true);

  // Eyes
  brush.set("charcoal", "#333", 0.8);
  brush.circle(50, 50, 10);
  brush.circle(-50, 50, 10);

  // Nose
  brush.set("pen", "#333", 0.5);
  brush.line(-20, 0, 20, 0);

  // Mouth
  brush.set("pen", "#333", 0.4);
  brush.arc(0, -50, 50, 180, 360);

  // Hair
  brush.set("crayon", "#664d39", 1.0);
  brush.beginShape();
  brush.vertex(-200, -100);
  brush.vertex(-200, -150);
  brush.vertex(-150, -130);
  brush.vertex(-100, -100);
  brush.endShape(true);

  noLoop();
}