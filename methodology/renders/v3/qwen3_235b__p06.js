function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  brush.field("curved");
  brush.wiggle(2);
  brush.set("marker", "#2a3a6b", 1.2);
  for (let i = 0; i < 50; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const len = random(8, 18);
    const dir = random(360);
    brush.flowLine(x, y, len, dir);
  }
  brush.noField();
  noLoop();
}