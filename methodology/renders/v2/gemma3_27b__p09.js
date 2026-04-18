function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Street & Pavement
  brush.fill("#444444", 180);
  brush.rect(0, -150, 600, 150);
  brush.noFill();

  // Neon Signs (marker)
  brush.set("marker", "#ff0000", 2);
  brush.rect(100, 50, 100, 20);

  brush.set("marker", "#00ff00", 2);
  brush.rect(300, 50, 100, 20);

  brush.set("marker", "#0000ff", 2);
  brush.rect(500, 50, 100, 20);

  // Rain (spray)
  brush.set("spray", "#c0c0c0", 150);
  for (let i = 0; i < 200; i++) {
    let x = random(-300, 300);
    let y = random(-150, 150);
    brush.line(x, y, x, y + random(10, 30));
  }

  // Silhouettes (charcoal)
  brush.set("charcoal", "#000000", 1);
  brush.beginShape();
  brush.vertex(-200, -100);
  brush.vertex(-150, -50);
  brush.vertex(-100, -100);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(200, -100);
  brush.vertex(250, -50);
  brush.vertex(300, -100);
  brush.endShape(CLOSE);

  // Reflections (watercolor wash)
  brush.fill("#ff4500", 80);
  brush.rect(100, -100, 100, 20);
  brush.fill("#00fa9a", 80);
  brush.rect(300, -100, 100, 20);
  brush.fill("#4169e1", 80);
  brush.rect(500, -100, 100, 20);

  noLoop();
}