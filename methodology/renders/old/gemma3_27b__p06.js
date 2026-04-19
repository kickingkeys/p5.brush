function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Birds flocking
  for (let i = 0; i < 50; i++) {
    let x = random(-250, 250);
    let y = random(-200, 200);
    let angle = random(0, 360);
    let speed = random(0.5, 2);

    brush.set("spray", "#333", random(0.5, 1.5));
    brush.line(x, y, x + speed * cos(angle), y + speed * sin(angle));

    // Add a few charcoal sketches for variation
    if (random(1) < 0.2) {
      brush.set("charcoal", "#555", random(0.8, 1.2));
      brush.circle(x, y, random(5, 10));
    }
  }

  // Wind swirl effect
  for (let i = 0; i < 100; i++) {
    let x = random(-300, 300);
    let y = random(-300, 300);
    let angle = map(noise(x * 0.01, y * 0.01), 0, 1, 0, 360);
    let dist = random(5, 20);
    brush.set("2B", "#888", 0.3);
    brush.line(x, y, x + dist * cos(angle), y + dist * sin(angle));
  }

  noLoop();
}