function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Dancer's form - charcoal for strong lines and shading
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape();
  brush.vertex(50, 100);
  brush.vertex(150, 50);
  brush.vertex(250, 150);
  brush.vertex(200, 250);
  brush.vertex(100, 200);
  brush.endShape(CLOSE);

  // Smudges and trails - spray for soft edges
  brush.set("spray", "#333", 0.8);
  for (let i = 0; i < 50; i++) {
    let x = random(50, 250);
    let y = random(50, 250);
    brush.line(x, y, x + random(-20, 20), y + random(-20, 20));
  }

  // Pastel for highlights and soft shading
  brush.set("pastel", "#f2d7d5", 0.6);
  brush.beginShape();
  brush.vertex(150, 50);
  brush.vertex(200, 70);
  brush.vertex(250, 100);
  brush.endShape(CLOSE);

  // Details with pen
  brush.set("pen", "#222", 0.5);
  brush.line(150, 50, 250, 150);

  noLoop();
}