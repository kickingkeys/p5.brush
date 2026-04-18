function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Dancer pose parameters
  let legAngle = 45;
  let armAngle = -30;
  let bodyLean = 10;
  let scaleFactor = 0.8;

  // Head
  brush.set("HB", "#333", 1.2);
  brush.noFill();
  brush.circle(0, -100 * scaleFactor, 40 * scaleFactor);

  // Torso
  brush.set("2B", "#333", 1.5);
  brush.beginShape();
  brush.vertex(0, -100 * scaleFactor);
  brush.vertex(30 * scaleFactor, -50 * scaleFactor);
  brush.vertex(50 * scaleFactor, 50 * scaleFactor);
  brush.vertex(-50 * scaleFactor, 50 * scaleFactor);
  brush.vertex(-30 * scaleFactor, -50 * scaleFactor);
  brush.endShape(CLOSE);

  // Arms
  brush.set("charcoal", "#333", 0.8);
  brush.line(50 * scaleFactor, 50 * scaleFactor, 120 * scaleFactor, 20 * scaleFactor);
  brush.line(-50 * scaleFactor, 50 * scaleFactor, -120 * scaleFactor, 20 * scaleFactor);

  // Legs
  brush.set("charcoal", "#333", 1.2);
  brush.line(0, -50 * scaleFactor, 40 * scaleFactor, -150 * scaleFactor);
  brush.line(0, -50 * scaleFactor, -40 * scaleFactor, -150 * scaleFactor);

  // Smudges - create multiple layers for depth
  brush.set("charcoal", "#333", 2);
  for (let i = 0; i < 20; i++) {
    let x = random(-100, 100) * scaleFactor;
    let y = random(-50, 150) * scaleFactor;
    brush.line(x, y, x + random(-20, 20) * scaleFactor, y + random(-20, 20) * scaleFactor);
  }

  brush.set("charcoal", "#333", 1.5);
  for (let i = 0; i < 10; i++) {
    let x = random(-150, 150) * scaleFactor;
    let y = random(-100, 200) * scaleFactor;
    brush.line(x, y, x + random(-30, 30) * scaleFactor, y + random(-30, 30) * scaleFactor);
  }

  brush.set("2B", "#333", 0.8);
  for (let i = 0; i < 5; i++) {
    let x = random(-200, 200) * scaleFactor;
    let y = random(-150, 250) * scaleFactor;
    brush.line(x, y, x + random(-40, 40) * scaleFactor, y + random(-40, 40) * scaleFactor);
  }

  noLoop();
}