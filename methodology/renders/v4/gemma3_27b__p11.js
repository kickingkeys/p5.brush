function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Rectangle 1
  brush.set("HB", "#443322", 1.2);
  brush.rect(50, 50, 150, 100);

  brush.set("cpencil", "#a67b5b", 0.8);
  brush.hatch(5, 30, {rand: 0.05});
  brush.beginShape();
  brush.vertex(50, 50);
  brush.vertex(200, 50);
  brush.vertex(200, 150);
  brush.vertex(50, 150);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Rectangle 2 (overlapping)
  brush.set("2B", "#332211", 1.5);
  brush.rect(100, 100, 120, 80);

  brush.set("charcoal", "#222", 0.7);
  brush.beginShape();
  brush.vertex(100, 100);
  brush.vertex(220, 100);
  brush.vertex(220, 180);
  brush.vertex(100, 180);
  brush.endShape(CLOSE);

  // Rectangle 3
  brush.set("pen", "#222", 0.8);
  brush.rect(300, 150, 100, 150);
  brush.noStroke();

  // Pastel fill for Rectangle 3
  brush.set("pastel", "#f0e68c", 0.6);
  brush.beginShape();
  brush.vertex(300, 150);
  brush.vertex(400, 150);
  brush.vertex(400, 300);
  brush.vertex(300, 300);
  brush.endShape(CLOSE);
  brush.noFill();

  // Rectangle 4 (smaller, darker)
  brush.set("rotring", "#1a1a1a", 0.5);
  brush.rect(450, 50, 80, 60);

  noLoop();
}