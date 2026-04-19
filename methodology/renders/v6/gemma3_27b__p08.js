function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Harbor water
  brush.fill("#a7c4d9", 80);
  brush.noStroke();
  beginShape();
  vertex(0, 200);
  vertex(600, 200);
  vertex(600, 0);
  vertex(0, 0);
  endShape(CLOSE);

  // Distant hills
  brush.fill("#e2e8f0", 150);
  beginShape();
  vertex(0, 200);
  vertex(100, 100);
  vertex(500, 100);
  vertex(600, 200);
  endShape(CLOSE);

  // Charcoal masts and ropes
  brush.set("charcoal", "#333", 0.8);
  brush.line(150, 200, 150, 100);
  brush.line(300, 200, 300, 80);
  brush.line(450, 200, 450, 120);

  // Pastel highlights on water
  brush.fill("#fddde5", 100);
  beginShape();
  vertex(100, 200);
  vertex(200, 180);
  vertex(300, 190);
  vertex(400, 170);
  vertex(500, 195);
  endShape(CLOSE);
  
  noLoop();
}