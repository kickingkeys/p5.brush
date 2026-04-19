function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Watercolor base — atmospheric fog
  brush.fill("#cbe2f2", 50);
  brush.fillBleed(0.3, "out");
  brush.noStroke();
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height);
  brush.vertex(0, height);
  brush.endShape(CLOSE);

  brush.fill("#d4e2f7", 75);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  brush.vertex(width * 0.2, height * 0.2);
  brush.vertex(width * 0.8, height * 0.2);
  brush.vertex(width * 0.8, height * 0.8);
  brush.vertex(width * 0.2, height * 0.8);
  brush.endShape(CLOSE);

  brush.fill("#e7f2ff", 100);
  brush.fillBleed(0.1, "out");
  brush.beginShape();
  brush.vertex(width * 0.3, height * 0.3);
  brush.vertex(width * 0.7, height * 0.3);
  brush.vertex(width * 0.7, height * 0.7);
  brush.vertex(width * 0.3, height * 0.7);
  brush.endShape(CLOSE);

  // Graphite masts and ropes
  brush.set("2B", "#333", 0.7);
  brush.noFill();
  brush.beginShape();
  brush.vertex(width * 0.35, height * 0.1);
  brush.vertex(width * 0.35, height * 0.3);
  brush.endShape();

  brush.beginShape();
  brush.vertex(width * 0.65, height * 0.1);
  brush.vertex(width * 0.65, height * 0.3);
  brush.endShape();

  brush.set("HB", "#333", 0.5);
  brush.beginShape();
  brush.vertex(width * 0.4, height * 0.25);
  brush.vertex(width * 0.45, height * 0.35);
  brush.endShape();

   brush.beginShape();
  brush.vertex(width * 0.6, height * 0.25);
  brush.vertex(width * 0.55, height * 0.35);
  brush.endShape();

  noLoop();
}