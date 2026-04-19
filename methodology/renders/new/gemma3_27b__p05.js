function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Tree trunks
  brush.set("charcoal", "#333", 1.5);
  brush.line(0, 0, 0, -200);
  brush.line(100, -50, 100, -250);
  brush.line(-50, -100, -50, -300);

  // Branches
  brush.set("2B", "#555", 0.8);
  brush.line(0, -100, 50, -150);
  brush.line(0, -150, -50, -180);
  brush.line(100, -150, 150, -200);
  brush.line(100, -200, 50, -230);

  // Leaves - using pastel mass fill
  brush.mass("pastel", "#4CAF50", { strength: 0.6, precision: 0.4 });
  brush.beginShape();
  brush.vertex(25, -140);
  brush.vertex(75, -160);
  brush.vertex(50, -180);
  brush.vertex(0, -160);
  brush.endShape(true);

  brush.mass("pastel", "#4CAF50", { strength: 0.6, precision: 0.4 });
  brush.beginShape();
  brush.vertex(-25, -200);
  brush.vertex(-75, -220);
  brush.vertex(-50, -240);
  brush.vertex(0, -220);
  brush.endShape(true);

  brush.mass("pastel", "#4CAF50", { strength: 0.6, precision: 0.4 });
  brush.beginShape();
  brush.vertex(75, -230);
  brush.vertex(125, -250);
  brush.vertex(100, -270);
  brush.vertex(50, -250);
  brush.endShape(true);

  // Undergrowth - using rotring hatching
  brush.hatchStyle("rotring", "#666", 0.6);
  brush.hatch(3, 45);
  brush.beginShape();
  brush.vertex(-150, 100);
  brush.vertex(150, 100);
  brush.vertex(150, 50);
  brush.vertex(-150, 50);
  brush.endShape(true);
  brush.noHatch();

  // Shadows - using charcoal and 2B hatching
  brush.set("charcoal", "#222", 1);
  brush.hatch(2, 135);
  brush.beginShape();
  brush.vertex(-100, 50);
  brush.vertex(100, 50);
  brush.vertex(100, 0);
  brush.vertex(-100, 0);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}