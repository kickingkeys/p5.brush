function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const palette = [
    "#d7a6a1", 
    "#c88f91", 
    "#e3b5b4", 
    "#d7b07c", 
    "#c79a5e", 
    "#b9874c", 
    "#e2c08d"
  ];

  brush.noStroke();
  brush.fillTexture(0.6, 0.3);

  for (let i = 0; i < 35; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const r = random(45, 130);
    
    brush.fill(random(palette), random(30, 65));
    brush.fillBleed(random(0.3, 0.6), "out");
    
    brush.circle(x, y, r, true);
  }

  brush.noFill();
  noLoop();
}