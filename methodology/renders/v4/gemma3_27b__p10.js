function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Sand dunes - watercolor washes
  brush.fill("#d4a373", 80);
  brush.beginShape();
  vertex(0, 0);
  vertex(300, -100);
  vertex(600, 0);
  vertex(300, 100);
  brush.endShape(CLOSE);

  brush.fill("#c69b6a", 60);
  brush.beginShape();
  vertex(0, 0);
  vertex(300, -150);
  vertex(600, 0);
  vertex(300, 150);
  brush.endShape(CLOSE);

  // Rock formations - charcoal + pastel mass
  brush.mass("crayon", "#333", {strength: 0.8, precision: 0.3});
  brush.beginShape();
  vertex(100, -50);
  vertex(150, -150);
  vertex(250, -100);
  vertex(200, 0);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.mass("pastel", "#555", {strength: 0.6, precision: 0.4});
  brush.beginShape();
  vertex(350, -100);
  vertex(400, -200);
  vertex(500, -50);
  vertex(450, 50);
  brush.endShape(CLOSE);
  brush.noMass();

  // Horizon line - pen
  brush.set("pen", "#000", 1.2);
  brush.line(0, 250, 600, 250);
  brush.noStroke();
  
  noLoop();
}