function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Harbor water
  brush.fill("#87ceeb", 80);
  brush.noStroke();
  brush.circle(0, 0, 300);

  // Distant hills
  brush.fill("#a9a9a9", 150);
  brush.noStroke();
  brush.circle(-200, -100, 80);
  brush.circle(200, -100, 60);

  // Masts and ropes (charcoal)
  brush.set("charcoal", "#000000", 1);
  brush.strokeWeight(0.8);
  brush.line(-150, 50, -150, 150);
  brush.line(-100, 70, -100, 180);
  brush.line(-50, 90, -50, 200);

  // Buildings (pen)
  brush.set("pen", "#4682b4", 1);
  brush.noFill();
  brush.strokeWeight(1.2);
  brush.rect(-180, 150, 80, 60);
  brush.rect(-80, 180, 60, 40);
  brush.rect(50, 160, 50, 50);

  // Foreground dock (HB pencil)
  brush.set("HB", "#333", 1);
  brush.strokeWeight(0.6);
  brush.line(-300, 250, 300, 250);

  // Roof lines and details(crayon)
  brush.set("crayon", "#8b4513", 1);
  brush.noStroke();
  brush.fill("#8b4513");
  brush.rect(-190, 160, 30, 10);
  brush.rect(-90, 190, 20, 5);
  brush.rect(60, 170, 10, 10);

  noLoop();
}