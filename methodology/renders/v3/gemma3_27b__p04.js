function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
  angleMode(DEGREES);
}

function draw() {
  translate(-width/2, -height/2);

  // Face outline
  brush.set("pen", "#444", 1.2);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(150, -200);
  brush.vertex(250, -150);
  brush.vertex(200, -50);
  brush.vertex(100, -50);
  brush.endShape(true);

  // Nose
  brush.set("2B", "#a38261", 0.8);
  brush.beginShape();
  brush.vertex(150, -80);
  brush.vertex(180, -100);
  brush.vertex(210, -80);
  brush.endShape(true);

  // Eyes - layered cpencil
  brush.noStroke();
  brush.fill("#8a6aa1", 100);
  brush.beginShape();
  brush.vertex(80, -70);
  brush.vertex(120, -70);
  brush.vertex(120, -100);
  brush.vertex(80, -100);
  brush.endShape(true);

  brush.fill("#c8a2c8", 80);
  brush.beginShape();
  brush.vertex(90, -80);
  brush.vertex(110, -80);
  brush.vertex(110, -90);
  brush.vertex(90, -90);
  brush.endShape(true);

  brush.fill("#6b486b", 60);
  brush.beginShape();
  brush.vertex(100, -85);
  brush.vertex(110, -85);
  brush.vertex(110, -87);
  brush.vertex(100, -87);
  brush.endShape(true);

  // Mouth
  brush.set("pastel", "#e48265", 0.6);
  brush.beginShape();
  brush.vertex(120, -120);
  brush.vertex(180, -120);
  brush.endShape(true);

  // Hair - spray and charcoal
  brush.set("spray", "#333", 1.0);
  for (let i = 0; i < 50; i++) {
    brush.line(random(-200, 200), -250, random(-200, 200), random(-200, -150));
  }

  brush.set("charcoal", "#222", 0.7);
  for (let i = 0; i < 30; i++) {
    brush.line(random(-200, 200), -250, random(-200, 200), random(-200, -150));
  }

  noLoop();
}