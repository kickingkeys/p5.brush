function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.wiggle(2);
  
  const numBirds = 12;
  for (let i = 0; i < numBirds; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const size = random(1.5, 3);
    const angle = random(TWO_PI);
    
    push();
    translate(x, y);
    rotate(angle);
    
    brush.set("marker", "#554433", size);
    brush.strokeWeight(random(0.8, 1.2));
    
    // Quick gesture for bird shape
    brush.line(-15, 0, 0, -8);
    brush.line(0, -8, 15, 0);
    brush.line(0, -8, 0, 8);
    
    pop();
  }
  
  noLoop();
}