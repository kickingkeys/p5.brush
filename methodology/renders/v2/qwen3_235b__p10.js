function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Layered sand-colored washes
  brush.wash("#e6c9a8", 180);
  brush.fill("#d4b88c", 200);
  brush.fillBleed(0.3, "out");
  brush.noStroke();
  beginShape();
  vertex(0, 300);
  vertex(0, 400);
  vertex(100, 380);
  vertex(200, 420);
  vertex(300, 400);
  vertex(400, 430);
  vertex(500, 410);
  vertex(600, 440);
  vertex(600, 300);
  endShape(CLOSE);
  brush.noWash();

  brush.wash("#d9bc92", 160);
  brush.fill("#c9aa82", 190);
  brush.fillBleed(0.25, "out");
  beginShape();
  vertex(0, 400);
  vertex(100, 380);
  vertex(200, 420);
  vertex(300, 400);
  vertex(400, 430);
  vertex(500, 410);
  vertex(600, 440);
  vertex(600, 600);
  vertex(0, 600);
  endShape(CLOSE);
  brush.noWash();

  // Jagged charcoal rock formations
  brush.set("charcoal", "#555", 1.8);
  brush.field("zigzag");
  strokeWeight(2.5);
  beginShape();
  vertex(50, 300);
  vertex(80, 250);
  vertex(110, 280);
  vertex(140, 220);
  vertex(170, 260);
  vertex(200, 190);
  vertex(230, 240);
  vertex(260, 200);
  vertex(290, 250);
  vertex(320, 180);
  vertex(350, 230);
  vertex(380, 190);
  vertex(410, 240);
  vertex(440, 180);
  vertex(470, 220);
  vertex(500, 170);
  endShape();
  brush.noField();

  brush.set("charcoal", "#333", 2.0);
  strokeWeight(3.0);
  beginShape();
  vertex(100, 280);
  vertex(130, 240);
  vertex(160, 270);
  vertex(190, 210);
  vertex(220, 250);
  vertex(250, 180);
  vertex(280, 230);
  vertex(310, 170);
  vertex(340, 220);
  vertex(370, 160);
  vertex(400, 210);
  vertex(430, 150);
  vertex(460, 190);
  endShape();
  brush.noField();

  // Thin pen-drawn horizon line
  brush.set("pen", "#333", 0.8);
  strokeWeight(1.0);
  line(0, 300, width, 300);

  noLoop();
}