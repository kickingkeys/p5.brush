function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Pavement - watercolor bleeds
  brush.fill("#22223b", 80);
  brush.fillBleed(0.4, "out");
  brush.rect(0, 0, 600, 200);

  // Neon reflections - marker smears
  brush.set("marker", "#ff4081", 1.2);
  brush.noStroke();
  let smear1X = 100;
  let smear1Y = 50;
  brush.beginShape();
  brush.vertex(smear1X - 20, smear1Y);
  brush.vertex(smear1X + 30, smear1Y - 10);
  brush.vertex(smear1X + 50, smear1Y + 20);
  brush.vertex(smear1X + 10, smear1Y + 30);
  brush.endShape(CLOSE);

  brush.set("marker", "#64b5f6", 1.0);
  let smear2X = 300;
  let smear2Y = 80;
  brush.beginShape();
  brush.vertex(smear2X - 10, smear2Y);
  brush.vertex(smear2X + 20, smear2Y - 15);
  brush.vertex(smear2X + 40, smear2Y + 10);
  brush.vertex(smear2X, smear2Y + 25);
  brush.endShape(CLOSE);

  // Sparse silhouettes - 2B pencil
  brush.set("2B", "#333", 0.5);
  brush.noFill();
  brush.strokeWeight(0.8);
  brush.beginShape();
  brush.vertex(50, 200);
  brush.vertex(70, 250);
  brush.vertex(90, 200);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(200, 220);
  brush.vertex(220, 270);
  brush.vertex(240, 220);
  brush.endShape(CLOSE);

  // Rain - spray
  brush.set("spray", "#ffffff", 0.3);
  for (let i = 0; i < 50; i++) {
    let x = random(0, 600);
    let y = random(-50, 200);
    brush.line(x, y, x, y + 50);
  }

  noLoop();
}