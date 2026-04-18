function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width/2, -height/2);

  // Tree trunks
  brush.set("pen", "#222", 1.6);
  brush.line(0, 0, 0, -200);
  brush.line(50, -50, 50, -250);
  brush.line(-50, -100, -50, -300);
  brush.line(100, -150, 100, -350);
  brush.line(-100, -200, -100, -400);

  // Branches
  brush.set("rotring", "#333", 0.4);
  brush.hatch(10, 45, {rand: 0.05});
  brush.beginShape();
  vertex(0, -200);
  vertex(20, -180);
  vertex(40, -200);
  vertex(20, -220);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.beginShape();
  vertex(50, -250);
  vertex(70, -230);
  vertex(90, -250);
  vertex(70, -270);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.beginShape();
  vertex(-50, -300);
  vertex(-70, -280);
  vertex(-90, -300);
  vertex(-70, -320);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Undergrowth
  brush.set("2B", "#333", 0.3);
  brush.hatch(5, 0, {rand: 0.1});
  brush.rect(-100, -400, 50, 50);
  brush.rect(50, -450, 50, 50);
  brush.noHatch();

  // Shadows
  brush.set("charcoal", "#000", 0.8);
  brush.hatch(3, 135, {rand: 0.15});
  brush.beginShape();
  vertex(0, 0);
  vertex(100, 0);
  vertex(100, -100);
  vertex(0, -100);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.set("charcoal", "#000", 0.5);
  brush.hatch(4, 45, {rand: 0.08});
  brush.beginShape();
  vertex(50, 50);
  vertex(150, 50);
  vertex(150, -50);
  vertex(50, -50);
  brush.endShape(CLOSE);
  brush.noHatch();

  noLoop();
}