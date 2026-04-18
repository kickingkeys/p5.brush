function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("curved");
  brush.wiggle(2);
  
  brush.set("marker", "#5c3a1e", 1.2);
  for (let i = 0; i < 40; i++) {
    const x = random(width);
    const y = random(height);
    const length = random(15, 35);
    brush.flowLine(x, y, length, 0);
  }
  
  brush.set("marker", "#8b5a2b", 0.8);
  for (let i = 0; i < 60; i++) {
    const x = random(width);
    const y = random(height);
    const length = random(10, 25);
    brush.flowLine(x, y, length, 0);
  }
  
  brush.noField();
  noLoop();
}