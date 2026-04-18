function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Harbor water
  brush.fill("#87ceeb", 80);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(0, 200);
  brush.vertex(300, 100);
  brush.vertex(600, 200);
  brush.vertex(600, -200);
  brush.vertex(0, -200);
  brush.endShape(CLOSE);

  // Distant hills
  brush.fill("#d3d3d3", 100);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(0, 200);
  brush.vertex(100, 100);
  brush.vertex(200, 150);
  brush.vertex(0, 150);
  brush.endShape(CLOSE);

  brush.fill("#a9a9a9", 100);
  brush.beginShape();
  brush.vertex(200, 150);
  brush.vertex(300, 100);
  brush.vertex(400, 150);
  brush.vertex(200, 150);
  brush.endShape(CLOSE);

  // Boats - simple outlines
  brush.set("pen", "#333", 1);
  brush.beginShape();
  brush.vertex(150, 50);
  brush.vertex(200, 0);
  brush.vertex(250, 50);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(400, 50);
  brush.vertex(450, 0);
  brush.vertex(500, 50);
  brush.endShape(CLOSE);

  // Masts - using charcoal for texture
  brush.set("charcoal", "#333", 0.8);
  brush.line(175, 0, 175, -80);
  brush.line(225, 0, 225, -60);
  brush.line(425, 0, 425, -70);
  brush.line(475, 0, 475, -50);

  // Ropes - using rotring for precision
  brush.set("rotring", "#333", 0.5);
  brush.line(175, -20, 175, -80);
  brush.line(225, -20, 225, -60);
  brush.line(425, -20, 425, -70);
  brush.line(475, -20, 475, -50);

  noLoop();
}