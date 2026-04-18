function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("curved");
  brush.wiggle(3);

  brush.set("spray", "#2a3860", 2.2);
  for (let i = 0; i < 150; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    brush.flowLine(x, y, random(40, 80), 0);
  }

  brush.noField();
  noLoop();
}