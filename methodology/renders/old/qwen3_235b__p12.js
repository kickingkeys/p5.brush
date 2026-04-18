function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.wiggle(5);
  brush.set("spray", "#a08c84", 1.2);
  
  for (let i = 0; i < 120; i++) {
    const angle = map(i, 0, 120, 0, TWO_PI * 3);
    const radius = random(100, 250);
    const x = width / 2 + cos(angle) * radius;
    const y = height / 2 + sin(angle) * radius;
    
    const trailLength = random(10, 30);
    for (let j = 0; j < trailLength; j++) {
      const offset = map(j, 0, trailLength, 0, 50);
      const offsetX = cos(angle + random(-0.2, 0.2)) * offset;
      const offsetY = sin(angle + random(-0.2, 0.2)) * offset;
      const px = x + offsetX;
      const py = y + offsetY;
      
      brush.set("spray", "#c4a9a1", random(0.8, 1.5));
      for (let k = 0; k < 3; k++) {
        point(px + random(-2, 2), py + random(-2, 2));
      }
    }
  }
  
  noLoop();
}