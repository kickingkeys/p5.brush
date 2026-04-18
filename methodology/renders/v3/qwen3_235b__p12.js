function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("seabed");
  brush.wiggle(2);
  
  brush.set("spray", "#6b5c7a", 2.8);
  for (let i = 0; i < 120; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const length = random(40, 70);
    brush.flowLine(x, y, length, 0);
  }
  
  brush.noField();
  noLoop();
}