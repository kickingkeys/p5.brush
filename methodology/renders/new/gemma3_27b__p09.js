function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Pavement
  brush.fill("#444444", 200);
  brush.rect(0, -200, 600, 400);

  // Streetlights (spray)
  brush.set("spray", "#ffdd00", 0.8);
  brush.circle(150, 100, 30);
  brush.circle(-100, 50, 20);
  brush.circle(300, -150, 40);

  // Neon sign (marker)
  brush.set("marker", "#ff0077", 2);
  brush.noFill();
  brush.beginShape();
  brush.vertex(0, 150);
  brush.vertex(100, 150);
  brush.vertex(100, 180);
  brush.vertex(0, 180);
  brush.endShape(CLOSE);

  // Rain (2H pencil)
  brush.set("2H", "#888888", 0.2);
  for (let i = 0; i < 200; i++) {
    brush.line(random(-300, 300), random(-200, 200), random(-300, 300), random(200, 300));
  }

  // Silhouettes (charcoal)
  brush.set("charcoal", "#000000", 1.5);
  brush.beginShape();
  brush.vertex(-150, -50);
  brush.vertex(-100, -100);
  brush.vertex(-50, -50);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(100, -70);
  brush.vertex(150, -120);
  brush.vertex(200, -70);
  brush.endShape(CLOSE);

  // Reflections (pastel)
  brush.set("pastel", "#ffdd00", 0.5);
  brush.fill(255, 100);
  brush.circle(150, 100, 20);

  brush.set("pastel", "#ff0077", 0.5);
  brush.fill(255, 100);
  brush.beginShape();
  brush.vertex(0, 150);
  brush.vertex(100, 150);
  brush.vertex(100, 180);
  brush.vertex(0, 180);
  brush.endShape(CLOSE);

  noLoop();
}