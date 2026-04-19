function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("curved");
  brush.wiggle(2);

  brush.set("marker", "#2a4d44", 1.2);
  for (let i = 0; i < 45; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const len = random(15, 35);
    brush.spline([
      [x, y],
      [x + random(-20, 20), y + random(-20, 20), 0.8],
      [x + random(-40, 40), y + random(-40, 40), 0.6]
    ], 0.4);
  }

  brush.noField();
  noLoop();
}