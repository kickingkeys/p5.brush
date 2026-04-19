function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Charcoal skeleton
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape(0.3);
  brush.vertex(100, -50);
  brush.vertex(200, 100);
  brush.vertex(300, 50);
  brush.vertex(400, 150);
  brush.vertex(500, 0);
  brush.endShape(true);

  // Smudge trails
  brush.set("charcoal", "#444", 0.8);
  brush.beginShape(0.3);
  brush.vertex(100, -50);
  brush.vertex(80, -70);
  brush.vertex(60, -90);
  brush.endShape(true);

  brush.beginShape(0.3);
  brush.vertex(200, 100);
  brush.vertex(180, 80);
  brush.vertex(160, 60);
  brush.endShape(true);

  brush.beginShape(0.3);
  brush.vertex(300, 50);
  brush.vertex(280, 30);
  brush.vertex(260, 10);
  brush.endShape(true);

  brush.beginShape(0.3);
  brush.vertex(400, 150);
  brush.vertex(380, 130);
  brush.vertex(360, 110);
  brush.endShape(true);

  brush.beginShape(0.3);
  brush.vertex(500, 0);
  brush.vertex(480, -20);
  brush.vertex(460, -40);
  brush.endShape(true);

  // Crayon fill
  brush.fill("#d9b3a3", 150);
  brush.beginShape(0.4);
  brush.vertex(100, -50);
  brush.vertex(200, 100);
  brush.vertex(300, 50);
  brush.vertex(400, 150);
  brush.vertex(500, 0);
  brush.endShape(true);
  brush.noFill();

  noLoop();
}