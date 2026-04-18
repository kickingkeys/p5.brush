function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Grass stalk 1
  brush.set("2H", "#333", 0.6);
  brush.line(100, 200, 100, 400);

  // Grass stalk 2
  brush.set("2H", "#333", 0.6);
  brush.line(150, 250, 150, 450);

  // Grass stalk 3
  brush.set("2H", "#333", 0.6);
  brush.line(200, 180, 200, 380);

  // Seed head 1
  brush.set("HB", "#333", 1.0);
  brush.circle(100, 400, 20);
  brush.noFill();
  brush.strokeWeight(0.4);
  brush.hatch(3, 0, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(100, 400 - 20);
  brush.vertex(100 + 10, 400 - 10);
  brush.vertex(100 - 10, 400 - 10);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Seed head 2
  brush.set("HB", "#333", 1.0);
  brush.circle(150, 450, 15);
  brush.noFill();
  brush.strokeWeight(0.4);
  brush.hatch(3, 45, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(150, 450 - 15);
  brush.vertex(150 + 7, 450 - 8);
  brush.vertex(150 - 7, 450 - 8);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Seed head 3
  brush.set("HB", "#333", 1.0);
  brush.circle(200, 380, 18);
  brush.noFill();
  brush.strokeWeight(0.4);
  brush.hatch(3, 90, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(200, 380 - 18);
  brush.vertex(200 + 9, 380 - 9);
  brush.vertex(200 - 9, 380 - 9);
  brush.endShape(CLOSE);
  brush.noHatch();

    // Leaf 1
  brush.set("2H", "#333", 0.8);
  brush.beginShape();
  brush.vertex(100, 200);
  brush.vertex(120, 150);
  brush.vertex(140, 200);
  brush.endShape(CLOSE);
  brush.noFill();
  brush.strokeWeight(0.5);
  brush.hatch(5, 0, { rand: 0.1, continuous: true });
  brush.noHatch();

  // Leaf 2
  brush.set("2H", "#333", 0.8);
  brush.beginShape();
  brush.vertex(150, 250);
  brush.vertex(170, 200);
  brush.vertex(190, 250);
  brush.endShape(CLOSE);
  brush.noFill();
  brush.strokeWeight(0.5);
  brush.hatch(5, 0, { rand: 0.1, continuous: true });
  brush.noHatch();

  // Leaf 3
  brush.set("2H", "#333", 0.8);
  brush.beginShape();
  brush.vertex(200, 180);
  brush.vertex(220, 130);
  brush.vertex(240, 180);
  brush.endShape(CLOSE);
  brush.noFill();
  brush.strokeWeight(0.5);
  brush.hatch(5, 0, { rand: 0.1, continuous: true });
  brush.noHatch();
  
  noLoop();
}