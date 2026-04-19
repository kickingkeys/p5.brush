function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Tree trunks - charcoal and pen for varied texture
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape();
  brush.vertex(150, -100);
  brush.vertex(150, 100);
  brush.vertex(180, 100);
  brush.vertex(180, -100);
  brush.endShape(CLOSE);

  brush.set("pen", "#222", 0.8);
  brush.beginShape();
  brush.vertex(250, -120);
  brush.vertex(250, 120);
  brush.vertex(280, 120);
  brush.vertex(280, -120);
  brush.endShape(CLOSE);

  // Undergrowth - rotring hatching
  brush.hatchStyle("rotring", "#444", 0.4);
  brush.hatch(3, 45, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(200, 50);
  brush.vertex(200, 80);
  brush.vertex(100, 80);
  brush.endShape(CLOSE);
  brush.noHatch();

    // Shadow areas - layered hatching
  brush.set("2B", "#222", 0.8);
  brush.hatch(2, 60, { rand: 0.1, continuous: true });
  brush.beginShape();
    brush.vertex(150, -150);
    brush.vertex(300, -150);
    brush.vertex(300, -100);
    brush.vertex(150, -100);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Ground cover - pastel texture
  brush.fill("#664433", 150);
  brush.beginShape();
  brush.vertex(0, -200);
  brush.vertex(600, -200);
  brush.vertex(600, -150);
  brush.vertex(0, -150);
  brush.endShape(CLOSE);
  brush.noFill();

  // Details - fine lines with pen
  brush.set("pen", "#222", 0.3);
  brush.line(200, -100, 200, 100);
  brush.line(350, -50, 350, 50);

  noLoop();
}