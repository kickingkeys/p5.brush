function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Fog base - layered watercolor
  brush.fill("#d0e1ee", 120);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(-250, -250);
  brush.vertex(250, -250);
  brush.vertex(250, 250);
  brush.vertex(-250, 250);
  brush.endShape(CLOSE);

  brush.fill("#b2d6e8", 80);
  brush.beginShape();
  brush.vertex(-200, -200);
  brush.vertex(200, -200);
  brush.vertex(200, 200);
  brush.vertex(-200, 200);
  brush.endShape(CLOSE);

  brush.fill("#95b8d1", 60);
  brush.beginShape();
  brush.vertex(-150, -150);
  brush.vertex(150, -150);
  brush.vertex(150, 150);
  brush.vertex(-150, 150);
  brush.endShape(CLOSE);

  // Masts and ropes - faint 2B pencil
  brush.stroke("#333");
  brush.noFill();
  brush.set("2B", "#333", 0.5);

  // Mast 1
  brush.line(-100, -220, -100, -80);
  brush.line(-100, -80, -80, -60);
  brush.line(-100, -80, -120, -60);

  // Mast 2
  brush.line(50, -200, 50, -50);
  brush.line(50, -50, 30, -30);

  // Mast 3
  brush.line(180, -180, 180, -70);

  // Ropes - thin 2H
  brush.set("2H", "#666", 0.3);
  brush.line(-100, -80, -150, -100);
  brush.line(50, -50, 70, -70);
  brush.line(180, -70, 200, -90);

  // Suggestion of buildings - pastel
  brush.noStroke();
  brush.fill("#d8b4a0", 100);
  brush.beginShape();
  brush.vertex(-250, 150);
  brush.vertex(-200, 200);
  brush.vertex(-150, 150);
  brush.endShape(CLOSE);

  brush.fill("#e0cda8", 80);
  brush.beginShape();
  brush.vertex(150, 150);
  brush.vertex(200, 200);
  brush.vertex(250, 150);
  brush.endShape(CLOSE);

  noLoop();
}