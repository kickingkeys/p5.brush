function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Grass Blade 1
  brush.set("2H", "#333", 0.8);
  brush.beginShape();
  brush.vertex(100, 150);
  brush.vertex(120, 250);
  brush.vertex(100, 350);
  brush.vertex(80, 250);
  brush.endShape(CLOSE);
  brush.noStroke();
  brush.set("HB", "#333", 1);
  brush.hatch(4, 45, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(100, 150);
  brush.vertex(120, 250);
  brush.vertex(100, 350);
  brush.vertex(80, 250);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Grass Blade 2
  brush.set("2H", "#333", 0.8);
  brush.beginShape();
  brush.vertex(200, 200);
  brush.vertex(220, 300);
  brush.vertex(200, 400);
  brush.vertex(180, 300);
  brush.endShape(CLOSE);
  brush.noStroke();
  brush.set("HB", "#333", 1);
  brush.hatch(4, 135, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(200, 200);
  brush.vertex(220, 300);
  brush.vertex(200, 400);
  brush.vertex(180, 300);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Seed Head 1
  brush.set("pen", "#333", 0.6);
  brush.circle(350, 250, 30);
  brush.noStroke();
  brush.set("2B", "#333", 0.7);
  brush.hatch(2, 0, {rand: 0.1, continuous: false});
  brush.circle(350, 250, 30);
  brush.noHatch();

  // Seed Head 2
  brush.set("pen", "#333", 0.6);
  brush.circle(450, 300, 25);
  brush.noStroke();
  brush.set("2B", "#333", 0.7);
  brush.hatch(3, 90, {rand: 0.1, continuous: false});
  brush.circle(450, 300, 25);
  brush.noHatch();

    // Seed Head 3
  brush.set("pen", "#333", 0.6);
  brush.circle(500, 150, 20);
  brush.noStroke();
  brush.set("2B", "#333", 0.7);
  brush.hatch(2, 45, {rand: 0.1, continuous: false});
  brush.circle(500, 150, 20);
  brush.noHatch();

  noLoop();
}