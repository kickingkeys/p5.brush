function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const numBlooms = 40;
  for (let i = 0; i < numBlooms; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const radius = random(40, 100);

    // Watercolor base layers
    brush.fill("#f2d7d9", random(120, 180));
    brush.fillBleed(0.3, "out");
    brush.beginShape();
    for (let angle = 0; angle < 360; angle += 10) {
      const rad = radians(angle);
      const bloomX = x + radius * cos(rad);
      const bloomY = y + radius * sin(rad);
      brush.vertex(bloomX, bloomY);
    }
    brush.endShape(CLOSE);

    brush.fill("#e9c4c6", random(80, 150));
    brush.fillBleed(0.2, "out");
    brush.beginShape();
    for (let angle = 0; angle < 360; angle += 10) {
      const rad = radians(angle);
      const bloomX = x + (radius * 0.8) * cos(rad);
      const bloomY = y + (radius * 0.8) * sin(rad);
      brush.vertex(bloomX, bloomY);
    }
    brush.endShape(CLOSE);

    // Subtle pastel texture
    brush.fill("#d8a7a8", random(60, 100));
    brush.noStroke();
    brush.beginShape();
    for (let angle = 0; angle < 360; angle += 10) {
      const rad = radians(angle);
      const bloomX = x + (radius * 0.6) * cos(rad);
      const bloomY = y + (radius * 0.6) * sin(rad);
      brush.vertex(bloomX, bloomY);
    }
    brush.endShape(CLOSE);
  }

  noLoop();
}