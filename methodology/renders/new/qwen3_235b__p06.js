function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("spiral");
  brush.wiggle(2);
  
  const numBirds = 12;
  for (let i = 0; i < numBirds; i++) {
    const angle = map(i, 0, numBirds, 0, TWO_PI);
    const radius = random(100, 200);
    const x = 300 + cos(angle) * radius;
    const y = 300 + sin(angle) * radius;
    
    brush.set("marker", "#333", random(0.8, 1.5));
    brush.spline([
      [x, y],
      [x + random(-40, 40), y + random(-40, 40), random(0.3, 0.7)],
      [x + random(-20, 20), y + random(-20, 20), random(0.1, 0.4)]
    ], 0.6);
  }
  
  brush.noField();
  noLoop();
}