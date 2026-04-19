function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Base layer - spray paint circles
  for (let i = 0; i < 30; i++) {
    let x = random(-200, 200);
    let y = random(-200, 200);
    let size = random(20, 80);
    brush.set("spray", "#e63946", random(0.5, 1)); // Red
    brush.circle(x, y, size, true);
  }

  for (let i = 0; i < 20; i++) {
    let x = random(-200, 200);
    let y = random(-200, 200);
    let size = random(20, 80);
    brush.set("spray", "#a8dadc", random(0.5, 1)); // Teal
    brush.circle(x, y, size, true);
  }

  // Charcoal drips
  brush.set("charcoal", "#222", 1.5);
  for (let i = 0; i < 15; i++) {
    let x = random(-200, 200);
    let y = random(100, 200);
    brush.beginShape();
    brush.vertex(x, y);
    brush.vertex(x + random(-10, 10), y + random(20, 50));
    brush.vertex(x + random(-20, 20), y + random(40, 80));
    brush.endShape();
  }

  // Marker arrows
  brush.set("marker", "#3498db", 1.2);
  for (let i = 0; i < 10; i++) {
    let x = random(-200, 200);
    let y = random(-100, 100);
    let angle = random(0, 360);
    let len = random(30, 60);
    push();
    translate(x, y);
    rotate(angle);
    line(0, 0, len, 0);
    triangle(len, 0, len - 10, -5, len - 10, 5);
    pop();
  }

  // HB pencil ghosted shapes
  brush.set("HB", "#95a5a6", 0.4);
  for (let i = 0; i < 10; i++) {
    let x = random(-150, 150);
    let y = random(-150, 150);
    let size = random(30, 70);
    brush.circle(x, y, size, true);
  }

  // Pastel fill in some areas
  brush.fill("#f1c40f", 100);
  brush.beginShape();
  brush.vertex(-100, -100);
  brush.vertex(100, -100);
  brush.vertex(100, 100);
  brush.vertex(-100, 100);
  brush.endShape(CLOSE);

  noLoop();
}