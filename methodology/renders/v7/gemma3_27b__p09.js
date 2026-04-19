function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Watercolor bleeds for rain and wet pavement
  brush.fill("#4682b4", 50);
  brush.fillBleed(0.5, "out");
  for (let i = 0; i < 50; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let size = random(10, 40);
    brush.circle(x, y, size);
  }
  brush.noFill();

  // Neon marker smears
  brush.set("marker", "#ff007f", 1.5);
  brush.strokeWeight(2);
  for (let i = 0; i < 10; i++) {
    let x1 = random(0, 600);
    let y1 = random(0, 600);
    let x2 = random(0, 600);
    let y2 = random(0, 600);
    brush.line(x1, y1, x2, y2);
  }

  brush.set("marker", "#ffff00", 1.2);
  for (let i = 0; i < 8; i++) {
    let x1 = random(0, 600);
    let y1 = random(0, 600);
    let x2 = random(0, 600);
    let y2 = random(0, 600);
    brush.line(x1, y1, x2, y2);
  }

  // Sparse ink silhouettes
  brush.set("pen", "#222", 0.8);
  brush.strokeWeight(1.5);
  brush.noFill();
  brush.beginShape();
  brush.vertex(100, 200);
  brush.vertex(120, 250);
  brush.vertex(150, 220);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(300, 400);
  brush.vertex(320, 450);
  brush.vertex(350, 420);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(500, 150);
  brush.vertex(520, 200);
  brush.vertex(550, 180);
  brush.endShape(CLOSE);

  noLoop();
}