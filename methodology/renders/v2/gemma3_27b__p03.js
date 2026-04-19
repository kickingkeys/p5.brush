function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Dancer outline (pen)
  brush.set("pen", "#222", 1.2);
  brush.beginShape();
  brush.vertex(100, -50);
  brush.vertex(150, 50);
  brush.vertex(250, 50);
  brush.vertex(300, -50);
  brush.vertex(250, -150);
  brush.vertex(150, -150);
  brush.endShape(CLOSE);

  // Charcoal smudges for motion
  brush.set("charcoal", "#333", 1.0);
  brush.beginShape();
  brush.vertex(150, 50);
  brush.vertex(250, 50);
  brush.vertex(300, -50);
  brush.endShape();

  brush.beginShape();
  brush.vertex(250, -150);
  brush.vertex(150, -150);
  brush.vertex(100, -50);
  brush.endShape();

  // Pastel shading
  brush.fill("#d8b3a3", 150);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(100, -50);
  brush.vertex(150, 50);
  brush.vertex(250, 50);
  brush.vertex(300, -50);
  brush.vertex(250, -150);
  brush.vertex(150, -150);
  brush.endShape(CLOSE);

  // Highlight with 2B
  brush.set("2B", "#eee", 0.5);
  brush.beginShape();
  brush.vertex(150, 50);
  brush.vertex(250, 50);
  brush.vertex(300, -50);
  brush.endShape();

  noLoop();
}