function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Head
  brush.set("HB", "#333", 1.2);
  brush.noFill();
  brush.circle(0, -50, 80);

  // Body
  brush.set("2B", "#222", 1.5);
  brush.beginShape();
  brush.vertex(0, -50);
  brush.vertex(50, 50);
  brush.vertex(-50, 50);
  brush.endShape(CLOSE);

  // Legs
  brush.set("charcoal", "#000", 0.8);
  brush.line(50, 50, 100, 150);
  brush.line(-50, 50, -100, 150);

  // Arms
  brush.set("cpencil", "#555", 0.7);
  brush.line(50, 50, 150, 0);
  brush.line(-50, 50, -150, 0);

  // Hair
  brush.set("spray", "#888", 0.3);
  brush.beginShape();
  brush.vertex(0, -50);
  brush.vertex(20, -80);
  brush.vertex(-20, -80);
  brush.endShape(CLOSE);
  brush.set("spray", "#888", 0.3);
  brush.beginShape();
  brush.vertex(0, -100);
  brush.vertex(40, -120);
  brush.vertex(-40, -120);
  brush.endShape(CLOSE);

  // Smudges (using pastel for a softer effect)
  brush.set("pastel", "#aaa", 0.5);
  brush.beginShape();
  brush.vertex(50, 50);
  brush.vertex(80, 80);
  brush.vertex(100, 50);
  brush.endShape(CLOSE);

  brush.set("pastel", "#aaa", 0.5);
  brush.beginShape();
  brush.vertex(-50, 50);
  brush.vertex(-80, 80);
  brush.vertex(-100, 50);
  brush.endShape(CLOSE);

  noLoop();
}