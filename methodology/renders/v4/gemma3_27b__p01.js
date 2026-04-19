function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const palette = ["#f2d7d9", "#e6b8af", "#d9a99a", "#c98d82", "#b26f68"];
  const numBlooms = 30;

  for (let i = 0; i < numBlooms; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const r = random(40, 120);

    brush.fill(random(palette), random(120, 180));
    brush.fillBleed(0.35, "out");
    brush.noStroke();
    brush.beginShape();
    for (let angle = 0; angle < 360; angle += 10) {
      const rad = radians(angle);
      const bloomX = x + cos(rad) * r;
      const bloomY = y + sin(rad) * r;
      brush.vertex(bloomX, bloomY);
    }
    brush.endShape(CLOSE);
  }

  noLoop();
}