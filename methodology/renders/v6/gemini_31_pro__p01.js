function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const palette = [
    "#d9a5a5",
    "#c28484",
    "#e8c1c1",
    "#d7b07c",
    "#c79a5e",
    "#e0c096",
    "#b88b5d"
  ];

  brush.noStroke();
  brush.fillTexture(0.6, 0.3);

  for (let i = 0; i < 40; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let r = random(45, 150);
    
    let col = random(palette);
    let op = random(30, 65);
    
    brush.fill(col, op);
    brush.fillBleed(random(0.4, 0.65), "out");
    
    brush.circle(x, y, r, random(0.2, 0.6));
  }

  noLoop();
}