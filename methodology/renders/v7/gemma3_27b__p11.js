function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Rectangle 1
  brush.set("2B", "#333", 0.8);
  brush.hatch(4, 45, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(100, 100);
  brush.vertex(250, 100);
  brush.vertex(250, 200);
  brush.vertex(100, 200);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Rectangle 2
  brush.set("HB", "#555", 1.2);
  brush.hatch(3, 135, {rand: 0.1, continuous: true});
  brush.beginShape();
  brush.vertex(300, 150);
  brush.vertex(450, 150);
  brush.vertex(450, 250);
  brush.vertex(300, 250);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Rectangle 3
  brush.set("2H", "#777", 0.6);
  brush.hatch(5, 0, {rand: 0.08, continuous: true});
  brush.beginShape();
  brush.vertex(50, 300);
  brush.vertex(200, 300);
  brush.vertex(200, 400);
  brush.vertex(50, 400);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Rectangle 4
  brush.set("cpencil", "#a3664a", 0.9);
  brush.hatch(2, 90, {rand: 0.15, continuous: true});
  brush.beginShape();
  brush.vertex(250, 350);
  brush.vertex(400, 350);
  brush.vertex(400, 450);
  brush.vertex(250, 450);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Rectangle 5
  brush.set("crayon", "#bc8f8f", 1.1);
  brush.mass("crayon", "#995d6e", {strength: 0.7, precision: 0.4, gradient: 0.2});
  brush.beginShape();
  brush.vertex(450, 100);
  brush.vertex(550, 100);
  brush.vertex(550, 200);
  brush.vertex(450, 200);
  brush.endShape(CLOSE);
  brush.noMass();

  noLoop();
}