function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Spray paint base layer
  brush.set("spray", "#e8574c", 1.5);
  for (let i = 0; i < 30; i++) {
    brush.circle(random(-200, 200), random(-200, 200), random(30, 80));
  }

  // Charcoal drips
  brush.set("charcoal", "#333", 0.8);
  for (let i = 0; i < 15; i++) {
    brush.line(random(-200, 200), random(-200, 200), random(-200, 200), random(-200, -50));
  }

  // Pen tags
  brush.set("pen", "#222", 1.2);
  brush.beginShape();
  brush.vertex(random(-150, 150), random(-100, 100));
  brush.vertex(random(-150, 150), random(-100, 100) + 30);
  brush.vertex(random(-150, 150) + 50, random(-100, 100) + 15);
  brush.endShape(CLOSE);

  // Crayon fill
  brush.set("crayon", "#f2b84c", 1.0);
  brush.beginShape();
  brush.vertex(random(-100, 100), random(-100, 100));
  brush.vertex(random(-100, 100) + 60, random(-100, 100));
  brush.vertex(random(-100, 100) + 30, random(-100, 100) + 60);
  brush.endShape(CLOSE);

  // Additional spray paint layers
  brush.set("spray", "#4f8dc7", 1.0);
  for (let i = 0; i < 20; i++) {
    brush.circle(random(-200, 200), random(-200, 200), random(20, 50));
  }

  noLoop();
}