function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Spray base layer
  brush.set("spray", "#e8574c", 0.8);
  for (let i = 0; i < 50; i++) {
    brush.fill("#e8574c", 60);
    brush.circle(random(-250, 250), random(-250, 250), random(20, 50));
  }

  // Charcoal graffiti tags
  brush.set("charcoal", "#333", 1.5);
  brush.beginShape();
  brush.vertex(random(-200, 200), random(-150, 150));
  brush.vertex(random(-200, 200), random(-150, 150) - 30);
  brush.vertex(random(-200, 200) + 50, random(-150, 150) - 15);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(random(-200, 200), random(-150, 150));
  brush.vertex(random(-200, 200) + 30, random(-150, 150) + 30);
  brush.vertex(random(-200, 200) + 60, random(-150, 150));
  brush.endShape(CLOSE);

  // Marker drips
  brush.set("marker", "#2a2a2a", 0.5);
  for (let i = 0; i < 20; i++) {
    brush.line(random(-250, 250), random(150, 250), random(-250, 250), random(200, 300));
  }
  // Pastel layering
  brush.set("pastel", "#993344", 0.7);
  brush.beginShape();
  brush.vertex(random(-150, 150), random(-100, 100));
  brush.vertex(random(-100, 100), random(-150, 150));
   brush.vertex(random(-100, 100), random(-100, 100));
  brush.endShape(CLOSE);

  brush.set("crayon", "#cc5544", 1.0);
  brush.beginShape();
  brush.vertex(random(-100, 100), random(-50, 50));
  brush.vertex(random(-50, 50), random(-100, 100));
  brush.vertex(random(-50, 50), random(-50,50));
  brush.endShape(CLOSE);

  noLoop();
}