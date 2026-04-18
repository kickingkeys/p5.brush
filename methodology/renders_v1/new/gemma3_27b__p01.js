function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const numBlooms = 20;
  for (let i = 0; i < numBlooms; i++) {
    const x = random(-200, 200);
    const y = random(-100, 100);
    const size = random(50, 150);

    brush.fill("#fddde5", 160);
    brush.noStroke();
    brush.beginShape();
    for (let angle = 0; angle < 360; angle += 10) {
      const radius = size * (0.8 + random(0.2));
      const petalX = x + cos(angle) * radius;
      const petalY = y + sin(angle) * radius;
      brush.vertex(petalX, petalY);
    }
    brush.endShape(CLOSE);

    brush.fill("#f8b8b8", 80);
    brush.beginShape();
    for (let angle = 0; angle < 360; angle += 10) {
      const radius = size * (0.6 + random(0.4));
      const petalX = x + cos(angle) * radius;
      const petalY = y + sin(angle) * radius;
      brush.vertex(petalX, petalY);
    }
    brush.endShape(CLOSE);

  }
  
    brush.set("charcoal", "#333", 0.5);
    for(let i = 0; i < 10; i++){
        brush.line(random(-200, 200), random(-100, 100), random(-200, 200), random(-100, 100));
    }
  noLoop();
}