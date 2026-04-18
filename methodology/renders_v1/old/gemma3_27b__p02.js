function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Grass blades
  brush.set("HB", "#333", 0.8);
  for (let i = 0; i < 20; i++) {
    let x = random(-200, 200);
    let y = random(-100, 100);
    let angle = random(0, 360);
    let length = random(50, 150);

    push();
    translate(x, y);
    rotate(angle);
    brush.line(0, 0, 0, length);
    pop();
  }

  // Seed heads - using spray brush
  brush.set("spray", "#666", 0.5);
  for (let i = 0; i < 10; i++) {
    let x = random(-150, 150);
    let y = random(-150, -50);
    brush.circle(x, y, random(10, 30));
  }

  // Charcoal shading
  brush.set("charcoal", "#222", 1);
  brush.noStroke();
  brush.fill("#999", 50);
  brush.circle(100, -100, 60);
  brush.circle(-100, -50, 40);

  // Pastel highlights
  brush.set("pastel", "#f0e68c", 0.7);
  brush.noStroke();
  brush.fill("#f0e68c", 80);
  brush.circle(50, 50, 30);

  // Crayon outline
  brush.set("crayon", "#a0522d", 1.2);
  brush.stroke("#a0522d");
  brush.strokeWeight(0.5);
  brush.noFill();
  brush.circle(-50, 50, 40);

  noLoop();
}