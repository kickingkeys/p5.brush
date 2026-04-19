function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Fog base layers
  brush.fill("#ccebff", 80);
  brush.fillBleed(0.3, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.6);
  brush.vertex(0, height * 0.6);
  brush.endShape(CLOSE);

  brush.fill("#bdd7ee", 60);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.4);
  brush.vertex(0, height * 0.4);
  brush.endShape(CLOSE);

  // Harbor water
  brush.fill("#a8c0d8", 40);
  brush.fillBleed(0.15, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height);
  brush.vertex(0, height);
  brush.endShape(CLOSE);

  // Distant masts & ropes (very faint)
  brush.set("2H", "#444", 0.3);
  brush.noFill();
  brush.beginShape();
  brush.vertex(150, 100);
  brush.vertex(150, 250);
  brush.endShape();

  brush.beginShape();
  brush.vertex(280, 130);
  brush.vertex(280, 280);
  brush.endShape();

  brush.beginShape();
  brush.vertex(410, 80);
  brush.vertex(410, 200);
  brush.endShape();

  // Closer boat outlines (charcoal)
  brush.set("charcoal", "#333", 0.8);
  brush.noFill();
  brush.beginShape();
  brush.vertex(50, 400);
  brush.vertex(150, 450);
  brush.vertex(250, 400);
  brush.vertex(50, 400);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(300, 300);
  brush.vertex(400, 350);
  brush.vertex(500, 300);
  brush.vertex(300, 300);
  brush.endShape(CLOSE);

  noLoop();
}