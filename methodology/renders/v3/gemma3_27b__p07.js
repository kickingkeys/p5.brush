function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Base layer: spray paint drips
  brush.set("spray", "#e07a5f", 0.8);
  for (let i = 0; i < 20; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(50, 150);
    let angle = random(0, 360);
    push();
    translate(x, y);
    rotate(angle);
    line(0, 0, 0, -len);
    pop();
  }

  // Charcoal fragments
  brush.set("charcoal", "#333", 1.2);
  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 15; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(30, 80);
    let angle = random(0, 360);
    push();
    translate(x, y);
    rotate(angle);
    line(0, 0, 0, -len);
    pop();
  }
  brush.noField();

  // Marker arrows
  brush.set("marker", "#007bff", 1.5);
  for (let i = 0; i < 10; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(40, 100);
    let angle = random(0, 360);
    push();
    translate(x, y);
    rotate(angle);
    beginShape();
    vertex(0, 0);
    vertex(len, 0);
    vertex(len/2, -len/3);
    vertex(0, 0);
    endShape(CLOSE);
    pop();
  }

  // Pastel washes
  brush.fill("#ffcdd2", 80);
  brush.beginShape();
  vertex(100, 100);
  vertex(400, 100);
  vertex(400, 300);
  vertex(100, 300);
  endShape(CLOSE);

  brush.fill("#b2dfdb", 70);
  brush.beginShape();
  vertex(200, 200);
  vertex(500, 200);
  vertex(500, 400);
  vertex(200, 400);
  endShape(CLOSE);

  // HB pencil lines
  brush.set("HB", "#555", 0.7);
  line(50, 50, 550, 550);
  line(550, 50, 50, 550);

  noLoop();
}