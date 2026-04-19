function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Body outline
  brush.set("2B", "#333", 1.2);
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(150, -50);
  brush.vertex(250, -100);
  brush.vertex(300, -50);
  brush.vertex(200, 100);
  brush.vertex(50, 150);
  brush.endShape(true);

  // Legs
  brush.set("2B", "#333", 0.8);
  brush.line(150, -50, 150, -150);
  brush.line(250, -100, 250, -180);

  // Arms
  brush.set("2B", "#333", 0.6);
  brush.line(100, 50, 50, 100);
  brush.line(200, 100, 250, 50);

  // Smudges - Charcoal
  brush.set("charcoal", "#222", 1.5);
  brush.field("hand");
  brush.wiggle(5);
  for (let i = 0; i < 50; i++) {
    let x = random(50, 300);
    let y = random(-100, 150);
    let len = random(20, 60);
    let angle = random(180, 270);
    brush.flowLine(x, y, len, angle);
  }
  brush.noField();

  // Shadow - Pastel
  brush.set("pastel", "#333", 0.5);
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(150, -50);
  brush.vertex(250, -100);
  brush.vertex(300, -50);
  brush.vertex(200, 100);
  brush.vertex(50, 150);
  brush.endShape(true);

  brush.noStroke();
  noLoop();
}