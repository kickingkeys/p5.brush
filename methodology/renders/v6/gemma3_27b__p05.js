function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
  angleMode(DEGREES);
}

function draw() {
  translate(-width/2, -height/2);

  // Tree trunks
  brush.set("pen", "#222", 1.5);
  for (let i = 0; i < 15; i++) {
    let x = random(50, 550);
    let y = random(100, 500);
    let h = random(80, 200);
    push();
    translate(x, y);
    rotate(random(-5, 5));
    rect(0, 0, 8, h);
    pop();
  }

  // Undergrowth - dense hatching
  brush.set("rotring", "#111", 0.8);
  for (let i = 0; i < 50; i++) {
    let x = random(50, 550);
    let y = random(400, 550);
    let w = random(10, 40);
    let h = random(5, 20);
    push();
    translate(x, y);
    rotate(random(-15, 15));
    rect(0, 0, w, h);
    pop();
  }

  // Dark shadows - layered hatching
  brush.set("2B", "#000", 1.2);
  for (let i = 0; i < 30; i++) {
    let x = random(100, 400);
    let y = random(200, 450);
    let size = random(30, 80);
    push();
    translate(x, y);
    rotate(random(-10, 10));
    ellipse(0, 0, size, size);
    pop();
  }

  // Fine details - small lines
  brush.set("HB", "#333", 0.5);
  for (let i = 0; i < 100; i++) {
    let x1 = random(50, 550);
    let y1 = random(100, 550);
    let x2 = x1 + random(-10, 10);
    let y2 = y1 + random(-10, 10);
    line(x1, y1, x2, y2);
  }
  
  noLoop();
}