function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Sand washes
  brush.fill("#e0d8c0", 80);
  brush.noStroke();
  brush.circle(0, 100, 200);
  brush.fill("#d0c0a0", 60);
  brush.circle(0, -50, 180);

  // Rock formations
  brush.stroke("black");
  brush.strokeWeight(0.5);
  brush.set("charcoal", "black", 2);
  brush.beginShape();
  brush.vertex(100, -150);
  brush.vertex(150, -200);
  brush.vertex(200, -150);
  brush.vertex(250, -200);
  brush.vertex(300, -150);
  brush.endShape(false);

  brush.beginShape();
  brush.vertex(-100, 150);
  brush.vertex(-150, 200);
  brush.vertex(-200, 150);
  brush.vertex(-250, 200);
  brush.vertex(-300, 150);
  brush.endShape(false);

  // Horizon line
  brush.set("pen", "black", 0.2);
  brush.line(-300, 0, 300, 0);

  // Texture
  brush.set("spray", "black", 0.1);
  for (let i = 0; i < 50; i++) {
    let x = random(-300, 300);
    let y = random(-200, 200);
    brush.circle(x, y, 3);
  }

  brush.set("crayon", "#a0522d", 0.3);
    brush.hatch(3, 45);
    brush.rect(200, 100, 50, 30);

    brush.set("pastel", "#808080", 0.5);
    brush.hatch(5, 135);
    brush.rect(-200, -100, 50, 30);

  noLoop();
}