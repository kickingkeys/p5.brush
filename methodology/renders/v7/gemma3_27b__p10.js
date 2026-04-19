function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Sand dunes - watercolor washes
  brush.fill("#d9b38c", 80);
  brush.beginShape();
  brush.vertex(150, -100);
  brush.vertex(300, 50);
  brush.vertex(450, -50);
  brush.vertex(600, 100);
  brush.vertex(600, -200);
  brush.vertex(150, -200);
  brush.endShape(CLOSE);

  brush.fill("#c68e63", 60); // Slightly darker layer
  brush.beginShape();
  brush.vertex(200, -50);
  brush.vertex(350, 100);
  brush.vertex(400, 0);
  brush.vertex(550, 50);
  brush.vertex(550, -150);
  brush.vertex(200, -150);
  brush.endShape(CLOSE);

  // Charcoal rocks
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(150, 100);
  brush.vertex(200, 50);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(350, -100);
  brush.vertex(400, -50);
  brush.vertex(450, -100);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(500, 50);
  brush.vertex(550, 100);
  brush.vertex(600, 50);
  brush.endShape(CLOSE);

  // Distant horizon - pen
  brush.set("pen", "#222", 0.8);
  brush.line(-300, 20, 300, 20);
  
  noLoop();
}