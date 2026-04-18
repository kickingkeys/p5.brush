function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const palette = ["#f2d7d9", "#e6b8af", "#d08770", "#c46250", "#a94433"];
  const numBlooms = 50;

  for (let i = 0; i < numBlooms; i++) {
    const x = random(-200, 200);
    const y = random(-150, 150);
    const radius = random(30, 80);

    brush.fill(random(palette), random(30, 65));
    brush.fillBleed(random(0.3, 0.6), "out");
    brush.noStroke();
    brush.circle(x, y, radius);
  }

  noLoop();
}