function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Pavement
  fill("#444444");
  noStroke();
  rect(0, -150, 600, 150);

  // Neon signs (marker)
  brush.set("marker", "#ff0000", 2);
  brush.noFill();
  strokeWeight(2);
  beginShape();
  vertex(100, 50);
  vertex(200, 50);
  vertex(200, 80);
  vertex(100, 80);
  endShape(CLOSE);

  brush.set("marker", "#00ff00", 2);
  beginShape();
  vertex(350, 50);
  vertex(450, 50);
  vertex(450, 80);
  vertex(350, 80);
  endShape(CLOSE);

  // Rain (spray)
  brush.set("spray", "#ffffff", 0.5);
  for (let i = 0; i < 200; i++) {
    let x = random(-300, 300);
    let y = random(-100, 100);
    let len = random(20, 50);
    line(x, y, x, y - len);
  }

  // Silhouettes (charcoal)
  brush.set("charcoal", "#000000", 0.8);
  noFill();
  strokeWeight(1);
  beginShape();
  vertex(-150, -50);
  vertex(-100, -10);
  vertex(-50, -50);
  vertex(-100, -90);
  endShape(CLOSE);

  beginShape();
  vertex(100, -50);
  vertex(150, -10);
  vertex(200, -50);
  vertex(150, -90);
  endShape(CLOSE);

  // Streetlights (pastel)
  brush.fill("#ffffcc", 150);
  brush.noStroke();
  brush.circle(250, 100, 30);
  brush.circle(-250, 100, 30);

  noLoop();
}