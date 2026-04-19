function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Tree trunks - charcoal and pen
  brush.set("charcoal", "#333", 1.2);
  for (let i = 0; i < 10; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    brush.beginShape();
    brush.vertex(x - 10, y);
    brush.vertex(x + 10, y);
    brush.vertex(x, y - 50);
    brush.endShape(CLOSE);
  }

  // Undergrowth - rotring hatching
  brush.hatchStyle("rotring", "#666", 0.5);
  brush.hatch(3, 45, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(100, 400);
  brush.vertex(500, 400);
  brush.vertex(500, 500);
  brush.vertex(100, 500);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Shadows - 2B hatching
  brush.hatchStyle("2B", "#222", 0.8);
  brush.hatch(2, 135, { rand: 0.1, continuous: true });
  brush.beginShape();
  brush.vertex(200, 200);
  brush.vertex(300, 200);
  brush.vertex(300, 300);
  brush.vertex(200, 300);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Leaves - spray
  brush.set("spray", "#228B22", 0.6);
  for (let i = 0; i < 50; i++) {
    let x = random(100, 500);
    let y = random(100, 400);
    brush.circle(x, y, random(5, 15));
  }

  noLoop();
}