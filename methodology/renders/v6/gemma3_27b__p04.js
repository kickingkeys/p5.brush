function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Face outline
  brush.set("pen", "#333", 0.8);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(100, -100);
  brush.vertex(150, 0);
  brush.vertex(100, 100);
  brush.vertex(0, 150);
  brush.vertex(-100, 100);
  brush.vertex(-150, 0);
  brush.vertex(-100, -100);
  brush.endShape(true);

  // Nose
  brush.set("2B", "#663300", 0.6);
  brush.beginShape();
  brush.vertex(20, 20);
  brush.vertex(50, 50);
  brush.vertex(80, 20);
  brush.endShape(true);

  // Eyes
  brush.set("cpencil", "#4488bb", 0.7);
  brush.beginShape();
  brush.vertex(-50, -50);
  brush.vertex(-30, -50);
  brush.vertex(-30, -70);
  brush.vertex(-50, -70);
  brush.endShape(true);

  brush.beginShape();
  brush.vertex(50, -50);
  brush.vertex(70, -50);
  brush.vertex(70, -70);
  brush.vertex(50, -70);
  brush.endShape(true);

  // Lips
  brush.set("pastel", "#cc3366", 0.5);
  brush.beginShape();
  brush.vertex(-40, 80);
  brush.vertex(40, 80);
  brush.vertex(40, 90);
  brush.vertex(-40, 90);
  brush.endShape(true);

  // Hair
  brush.set("charcoal", "#333", 0.4);
  brush.beginShape();
  brush.vertex(-150, 0);
  brush.vertex(-180, 50);
  brush.vertex(-120, 100);
  brush.vertex(-150, 150);
  brush.endShape(true);

  brush.beginShape();
  brush.vertex(-150, 0);
  brush.vertex(-180, -50);
  brush.vertex(-120, -100);
  brush.vertex(-150, -150);
  brush.endShape(true);

  noLoop();
}