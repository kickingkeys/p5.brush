function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Sand dunes - watercolor layers
  brush.fill("#d4a017", 80);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  brush.vertex(0, 100);
  brush.vertex(150, 50);
  brush.vertex(300, 120);
  brush.vertex(450, 80);
  brush.vertex(600, 150);
  brush.vertex(600, -150);
  brush.vertex(0, -150);
  brush.endShape(CLOSE);

  brush.fill("#e0c8a0", 60);
  brush.fillBleed(0.1, "out");
  brush.beginShape();
  brush.vertex(0, 50);
  brush.vertex(150, -20);
  brush.vertex(300, 70);
  brush.vertex(450, 30);
  brush.vertex(600, 80);
  brush.vertex(600, -200);
  brush.vertex(0, -200);
  brush.endShape(CLOSE);
  
  // Rock formations - charcoal and crayon
  brush.set("charcoal", "#333", 1.5);
  brush.beginShape();
  brush.vertex(100, -100);
  brush.vertex(250, -150);
  brush.vertex(350, -80);
  brush.vertex(400, -120);
  brush.vertex(500, -60);
  brush.endShape(CLOSE);
  
  brush.mass("crayon", "#444", {strength: 0.7, precision: 0.4});
  brush.beginShape();
  brush.vertex(100, -100);
  brush.vertex(250, -150);
  brush.vertex(350, -80);
  brush.vertex(400, -120);
  brush.vertex(500, -60);
  brush.endShape(CLOSE);
  brush.noMass();

  // Horizon line - pen
  brush.set("pen", "#000", 0.7);
  brush.line(0, 0, 600, 0);

  noLoop();
}