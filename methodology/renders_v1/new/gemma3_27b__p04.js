function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Face outline
  brush.set("pen", "#333", 1.2);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(100, -100);
  brush.vertex(150, -50);
  brush.vertex(100, 0);
  brush.vertex(0, 50);
  brush.vertex(-100, 0);
  brush.vertex(-150, -50);
  brush.vertex(-100, -100);
  brush.endShape(true);

  // Nose
  brush.set("2B", "#663333", 0.8);
  brush.beginShape();
  brush.vertex(20, -20);
  brush.vertex(50, 0);
  brush.vertex(20, 20);
  brush.endShape(true);

  // Eyes
  brush.set("cpencil", "#4488aa", 0.6);
  brush.circle(70, -80, 20);
  brush.circle(-70, -80, 20);

  // Cheeks
  brush.set("pastel", "#ffb3c6", 0.4);
  brush.fill();
  brush.beginShape();
  brush.vertex(50, -50);
  brush.vertex(100, -20);
  brush.vertex(60, 20);
  brush.vertex(20, 0);
  brush.endShape(true);

  brush.set("pastel", "#ffb3c6", 0.4);
  brush.fill();
  brush.beginShape();
  brush.vertex(-50, -50);
  brush.vertex(-100, -20);
  brush.vertex(-60, 20);
  brush.vertex(-20, 0);
  brush.endShape(true);

  // Hair
  brush.set("charcoal", "#222", 1.0);
  brush.beginShape();
  brush.vertex(-150, -50);
  brush.vertex(-180, -100);
  brush.vertex(-120, -150);
  brush.vertex(-60, -100);
  brush.endShape(true);

  // Mouth
  brush.set("rotring", "#cc0000", 0.5);
  brush.arc(0, 50, 50, 0, PI);

  noLoop();
}