function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Fog base
  brush.fill("#c7d0e3", 60);
  brush.fillBleed(0.3, "out");
  brush.noStroke();
  brush.beginShape();
  brush.vertex(-250, -250);
  brush.vertex(250, -250);
  brush.vertex(250, 250);
  brush.vertex(-250, 250);
  brush.endShape(CLOSE);
  brush.noFill();

  // Middle layer fog
  brush.fill("#bdd7ee", 40);
  brush.fillBleed(0.2, "out");
  brush.beginShape();
  brush.vertex(-150, -150);
  brush.vertex(150, -150);
  brush.vertex(150, 150);
  brush.vertex(-150, 150);
  brush.endShape(CLOSE);
  brush.noFill();

  // Distant fog
  brush.fill("#e2f0ff", 20);
  brush.fillBleed(0.1, "out");
  brush.beginShape();
  brush.vertex(-50, -50);
  brush.vertex(50, -50);
  brush.vertex(50, 50);
  brush.vertex(-50, 50);
  brush.endShape(CLOSE);
  brush.noFill();
  
  // Masts and ropes (graphite pencil)
  brush.set("2B", "#333", 0.8);
  brush.stroke(0);
  brush.strokeWeight(0.5);
  brush.line(-200, -100, -200, 100);
  brush.line(-100, -50, -100, 50);
  brush.line(0, -20, 0, 20);
  brush.line(100, -80, 100, 80);
  brush.line(200, -150, 200, 150);

  // Harbor buildings (pastel)
  brush.fill("#8b4513", 100);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(-250, 150);
  brush.vertex(-200, 200);
  brush.vertex(-150, 150);
  brush.vertex(-200, 100);
  brush.endShape(CLOSE);
  brush.noFill();

  brush.fill("#a0522d", 80);
  brush.beginShape();
  brush.vertex(150, 150);
  brush.vertex(200, 200);
  brush.vertex(250, 150);
  brush.vertex(200, 100);
  brush.endShape(CLOSE);
  brush.noFill();
  
  noLoop();
}