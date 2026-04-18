function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Tree trunks
  brush.set("charcoal", "#333", 1.2);
  brush.line(0, 0, 0, -200);
  brush.line(100, -50, 100, -250);
  brush.line(-50, -100, -50, -300);

  // Undergrowth and shadows
  brush.set("2B", "#555", 0.8);
  brush.noStroke();
  brush.fill("#444", 80);
  brush.circle(50, -150, 30);
  brush.circle(-20, -250, 20);
  brush.circle(150, -100, 40);

  // Hatching for texture
  brush.set("rotring", "#333", 0.6);
  brush.hatch(5, 45);
  brush.rect(-30, -50, 60, 50);
  brush.hatch(3, 135);
  brush.rect(70, -180, 50, 40);

  // Details with different brushes
  brush.set("cpencil", "#666", 0.5);
  brush.line(120, -80, 150, -60);

  brush.set("pastel", "#a67e59", 1.0);
  brush.noStroke();
  brush.fill("#a67e59", 120);
  brush.circle(-80, -200, 25);

  brush.set("crayon", "#996633", 1);
  brush.noStroke();
  brush.fill("#996633", 120);
  brush.rect(-100, -100, 40, 40);
  
  brush.set("marker", "#222", 0.9);
  brush.noStroke();
  brush.fill("#222", 120);
  brush.rect(50, -250, 20, 50);

  noLoop();
}