function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Watercolor blooms
  for (let i = 0; i < 25; i++) {
    let x = random(100, 500);
    let y = random(100, 500);
    let size = random(50, 150);

    brush.fill("#f2d7d5", random(80, 150));
    brush.fillBleed(0.3, "out");
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 10) {
      let r = size * (0.8 + random(0.2));
      let px = x + cos(a) * r;
      let py = y + sin(a) * r;
      brush.vertex(px, py);
    }
    brush.endShape(CLOSE);
  }

  // Charcoal outlines for definition
  brush.set("charcoal", "#333", 0.5);
  for (let i = 0; i < 25; i++) {
    let x = random(100, 500);
    let y = random(100, 500);
    let size = random(50, 150);

    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 10) {
      let r = size * (0.8 + random(0.2));
      let px = x + cos(a) * r;
      let py = y + sin(a) * r;
      brush.vertex(px, py);
    }
    brush.endShape(CLOSE);
  }
  noLoop();
}