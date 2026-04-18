function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Sand washes
  brush.fill("#d4a373", 100);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.6);
  brush.vertex(0, height * 0.6);
  brush.endShape(CLOSE);

  brush.fill("#c69b6b", 80);
  brush.fillBleed(0.15, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.45);
  brush.vertex(0, height * 0.45);
  brush.endShape(CLOSE);

  brush.fill("#b8860b", 60);
  brush.fillBleed(0.1, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.3);
  brush.vertex(0, height * 0.3);
  brush.endShape(CLOSE);

  // Rock formations - charcoal
  brush.noStroke();
  brush.set("charcoal", "#333", 1);
  brush.beginShape();
  brush.vertex(150, 100);
  brush.vertex(200, 180);
  brush.vertex(280, 150);
  brush.vertex(220, 80);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(400, 200);
  brush.vertex(450, 280);
  brush.vertex(520, 250);
  brush.vertex(470, 180);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(50, 300);
  brush.vertex(100, 380);
  brush.vertex(180, 350);
  brush.vertex(120, 280);
  brush.endShape(CLOSE);

  // Horizon line - pen
  brush.set("pen", "#000", 0.5);
  brush.line(0, height / 2, width, height / 2);

  noLoop();
}