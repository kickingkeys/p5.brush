function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Tree trunks
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape();
  brush.vertex(100, -100);
  brush.vertex(100, 100);
  brush.vertex(120, 100);
  brush.vertex(120, -100);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(-100, -100);
  brush.vertex(-100, 100);
  brush.vertex(-120, 100);
  brush.vertex(-120, -100);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(0, -200);
  brush.vertex(0, 200);
   brush.vertex(20, 200);
  brush.vertex(20, -200);
  brush.endShape(CLOSE);

  // Undergrowth & Shadows (using hatching)
  brush.hatchStyle("pen", "#111", 0.6);
  brush.hatch(2, 45, { rand: 0.05 });
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(100, 150);
  brush.vertex(110, 150);
  brush.vertex(110, 50);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(-90, 50);
  brush.vertex(-90, 150);
  brush.vertex(-100, 150);
  brush.vertex(-100, 50);
  brush.endShape(CLOSE);

  brush.hatchStyle("2B", "#333", 0.8);
  brush.hatch(3, 120, { rand: 0.1 });
  brush.beginShape();
  brush.vertex(-150, -50);
  brush.vertex(-150, 50);
  brush.vertex(-120, 50);
  brush.vertex(-120, -50);
  brush.endShape(CLOSE);

  brush.beginShape();
    brush.vertex(150, -50);
    brush.vertex(150, 50);
    brush.vertex(120, 50);
    brush.vertex(120, -50);
    brush.endShape(CLOSE);



  //Detail hatching
  brush.hatchStyle("HB", "#222", 0.9);
  brush.hatch(1.5, 80, { rand: 0.15 });
  brush.beginShape();
    brush.vertex(0, -130);
    brush.vertex(0, 130);
    brush.vertex(10, 130);
    brush.vertex(10, -130);
  brush.endShape(CLOSE);

  noLoop();
}