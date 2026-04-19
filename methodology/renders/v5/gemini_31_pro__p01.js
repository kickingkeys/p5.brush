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
    "#e8b4b8", 
    "#d7b07c", 
    "#c79a5e", 
    "#b9874c", 
    "#a47764"  
  ];

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  for (let i = 0; i < 55; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let r = random(40, 130);
    
    let col = random(palette);
    let opacity = random(30, 65);

    brush.fill(col, opacity);
    brush.fillBleed(random(0.4, 0.7), "out");
    
    brush.circle(x, y, r, true);
  }

  brush.noFill();
  noLoop();
}