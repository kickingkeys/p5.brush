function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("curved");
  brush.wiggle(2);

  const numBirds = 50;
  for (let i = 0; i < numBirds; i++) {
    const x = random(0, 600);
    const y = random(0, 600);
    const dir = random(0, 360);
    const length = random(20, 60);

    brush.set("marker", "#333333", 0.8);
    brush.flowLine(x, y, length, dir);

    // Add a smaller charcoal trail following the marker
    brush.set("charcoal", "#666666", 0.3);
    brush.flowLine(x, y, length * 0.7, dir);
  }

  brush.noField();
  brush.noWiggle();
  noLoop();
}