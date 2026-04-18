function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Grass blade 1
  brush.set("2B", "#333", 0.8);
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(120, 150);
  brush.vertex(80, 180);
  brush.vertex(60, 100);
  brush.endShape(CLOSE);
  brush.noStroke();
  brush.hatchStyle("2H", "#666", 0.5);
  brush.hatch(3, 45);
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(120, 150);
  brush.vertex(80, 180);
  brush.vertex(60, 100);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Grass blade 2
  brush.set("2B", "#333", 0.7);
  brush.beginShape();
  brush.vertex(200, 80);
  brush.vertex(230, 170);
  brush.vertex(180, 200);
  brush.vertex(150, 130);
  brush.endShape(CLOSE);
  brush.noStroke();
  brush.hatchStyle("2H", "#666", 0.4);
  brush.hatch(2, 90);
  brush.beginShape();
  brush.vertex(200, 80);
  brush.vertex(230, 170);
  brush.vertex(180, 200);
  brush.vertex(150, 130);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Seed head 1
  brush.set("HB", "#333", 0.6);
  brush.circle(350, 100, 30);
  brush.noStroke();
  brush.hatchStyle("rotring", "#444", 0.3);
  brush.hatch(1.5, 0);
  brush.hatch(1.5, 45);
  brush.hatch(1.5, 90);
  brush.circle(350, 100, 30);
  brush.noHatch();

  // Seed head 2
  brush.set("HB", "#333", 0.5);
  brush.circle(450, 150, 20);
  brush.noStroke();
  brush.hatchStyle("rotring", "#555", 0.2);
  brush.hatch(1, 0);
  brush.hatch(1, 45);
  brush.circle(450, 150, 20);
  brush.noHatch();

  // Stem
  brush.set("2B", "#333", 0.3);
  brush.line(350, 130, 350, 250);

  noLoop();
}