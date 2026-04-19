function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Seed head 1
  push();
  translate(150, 0);
  brush.set("2B", "#333", 0.8);
  beginShape();
  vertex(0, -50);
  vertex(50, 20);
  vertex(0, 50);
  vertex(-50, 20);
  endShape(CLOSE);

  brush.set("HB", "#555", 0.6);
  for (let i = 0; i < 10; i++) {
    let angle = i * 36;
    let x = cos(angle) * 30;
    let y = sin(angle) * 30;
    brush.line(x, y, x + 10, y + 10);
  }

  pop();

  // Grass blade 1
  push();
  translate(-100, 50);
  brush.set("2H", "#777", 0.4);
  beginShape();
  vertex(0, 0);
  vertex(5, 40);
  vertex(0, 80);
  vertex(-5, 40);
  endShape(CLOSE);

  brush.set("HB", "#555", 0.5);
  brush.line(0, 40, 0, 80);

  pop();

  // Grass blade 2
  push();
  translate(50, 80);
  brush.set("2H", "#777", 0.4);
  beginShape();
  vertex(0, 0);
  vertex(3, 30);
  vertex(0, 60);
  vertex(-3, 30);
  endShape(CLOSE);

  brush.set("HB", "#555", 0.5);
  brush.line(0, 30, 0, 60);

  pop();
  
  // Seed head 2
  push();
  translate(-150, -50);
  brush.set("2B", "#333", 0.8);
  beginShape();
  vertex(0, -40);
  vertex(40, 10);
  vertex(0, 40);
  vertex(-40, 10);
  endShape(CLOSE);

  brush.set("HB", "#555", 0.6);
  for (let i = 0; i < 8; i++) {
    let angle = i * 45;
    let x = cos(angle) * 25;
    let y = sin(angle) * 25;
    brush.line(x, y, x + 8, y + 8);
  }

  pop();
  
  noLoop();
}