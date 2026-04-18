function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Fog base layers
  brush.fill("#d0e7f5", 140);
  brush.fillBleed(0.3, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.6);
  brush.vertex(0, height * 0.6);
  brush.endShape(CLOSE);

  brush.fill("#b5d2ec", 120);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(width, 0);
  brush.vertex(width, height * 0.4);
  brush.vertex(0, height * 0.4);
  brush.endShape(CLOSE);

  // Masts and ropes (faint pencil)
  brush.set("2H", "#666", 0.5);
  brush.strokeWeight(0.2);
  brush.line(150, 100, 150, 250);
  brush.line(250, 120, 250, 200);
  brush.line(350, 80, 350, 230);
  brush.line(450, 110, 450, 260);

  brush.set("2H", "#666", 0.3);
  brush.strokeWeight(0.15);
  brush.line(130, 150, 170, 180);
  brush.line(230, 130, 270, 160);
  brush.line(330, 90, 370, 120);
  brush.line(430, 120, 470, 150);
  
  // Water reflections (pastel)
  brush.fill("#99b3cc", 80);
  brush.fillBleed(0.1, "out");
  brush.beginShape();
  brush.vertex(0, height * 0.6);
  brush.vertex(width, height * 0.6);
  brush.vertex(width, height);
  brush.vertex(0, height);
  brush.endShape(CLOSE);

  noLoop();
}