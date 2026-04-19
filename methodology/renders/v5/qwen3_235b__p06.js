function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("curved");
  brush.wiggle(2);
  
  brush.set("marker", "#2e5a88", 1.2);
  for (let i = 0; i < 45; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const length = random(15, 35);
    const dir = random(360);
    brush.flowLine(x, y, length, dir);
  }
  
  brush.noField();
  noLoop();
}