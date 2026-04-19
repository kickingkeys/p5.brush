function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Watercolor bleeds (rain)
  brush.fill("#4682b4", 40);
  brush.fillBleed(0.4, "out");
  for (let i = 0; i < 50; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    brush.circle(x, y, random(5, 15));
  }
  brush.noFill();

  // Neon marker smears (reflections)
  brush.set("marker", "#ff4500", 1.2);
  for (let i = 0; i < 20; i++) {
    let x1 = random(0, 600);
    let y1 = random(0, 200);
    let x2 = random(0, 600);
    let y2 = random(0, 200);
    brush.line(x1, y1, x2, y2);
  }

  brush.set("marker", "#00ffff", 0.8);
  for (let i = 0; i < 15; i++) {
    let x1 = random(0, 600);
    let y1 = random(200, 400);
    let x2 = random(0, 600);
    let y2 = random(200, 400);
    brush.line(x1, y1, x2, y2);
  }

  // Ink silhouettes (passersby)
  brush.set("2B", "#333", 0.5);
  brush.noFill();
  brush.beginShape();
  brush.vertex(100, 500);
  brush.vertex(120, 550);
  brush.vertex(150, 500);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(400, 520);
  brush.vertex(420, 570);
  brush.vertex(450, 520);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(550, 480);
  brush.vertex(570, 530);
  brush.vertex(600, 480);
  brush.endShape(CLOSE);

  noLoop();
}