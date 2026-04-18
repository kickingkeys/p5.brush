function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
  angleMode(DEGREES);
}

function draw() {
  translate(-width/2, -height/2);

  // Grass blade 1
  brush.set("2H", "#333", 0.6);
  brush.beginShape();
  brush.vertex(100, 150);
  brush.vertex(120, 200);
  brush.vertex(100, 250);
  brush.vertex(80, 200);
  brush.endShape(CLOSE);
  brush.noStroke();
  brush.fill("#999", 50);
  brush.beginShape();
  brush.vertex(100, 150);
  brush.vertex(120, 200);
  brush.vertex(100, 250);
  brush.vertex(80, 200);
  brush.endShape(CLOSE);

  // Grass blade 2
  brush.set("2H", "#333", 0.6);
  brush.beginShape();
  brush.vertex(150, 180);
  brush.vertex(170, 230);
  brush.vertex(150, 280);
  brush.vertex(130, 230);
  brush.endShape(CLOSE);
  brush.noStroke();
  brush.fill("#999", 50);
  brush.beginShape();
  brush.vertex(150, 180);
  brush.vertex(170, 230);
  brush.vertex(150, 280);
  brush.vertex(130, 230);
  brush.endShape(CLOSE);

  // Seed head 1
  brush.set("HB", "#333", 1.0);
  brush.circle(250, 200, 30);
  brush.set("2H", "#666", 0.8);
  brush.hatch(5, 0, {rand: 0.1});
  brush.circle(250, 200, 30);
  brush.noHatch();

  // Seed head 2
  brush.set("HB", "#333", 1.0);
  brush.circle(350, 250, 25);
  brush.set("2H", "#666", 0.8);
  brush.hatch(4, 45, {rand: 0.08});
  brush.circle(350, 250, 25);
  brush.noHatch();

  // Delicate stem
  brush.set("pen", "#333", 0.4);
  brush.line(250, 200, 250, 300);
  brush.set("pen", "#333", 0.4);
  brush.line(350, 250, 350, 350);

  // Additional hatching for shading
  brush.set("2B", "#333", 1.2);
  brush.hatch(3, 135, {rand: 0.1});
  brush.beginShape();
  brush.vertex(100, 150);
  brush.vertex(120, 200);
  brush.vertex(100, 250);
  brush.vertex(80, 200);
  brush.endShape(CLOSE);

  brush.noStroke();
  brush.noFill();
  brush.noHatch();

  noLoop();
}