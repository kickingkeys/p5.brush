function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("spiral");
  brush.wiggle(2);
  
  brush.set("marker", "#1a3d1a", 1.2);
  for (let i = 0; i < 45; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const len = random(20, 60);
    brush.flowLine(x, y, len, random(360));
  }
  
  brush.noField();
  noLoop();
}