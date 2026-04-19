function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const palette = [
    "#d9a5b3",
    "#c6878f",
    "#e8b4b8",
    "#cc8b86",
    "#d69e49",
    "#c78b42",
    "#e5c158",
    "#b87333" 
  ];

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  for (let i = 0; i < 45; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let r = random(45, 130);
    
    let col = random(palette);
    let opacity = random(30, 65);

    brush.fill(col, opacity);
    brush.fillBleed(random(0.35, 0.65), "out");
    
    brush.circle(x, y, r, true);
  }

  brush.noFill();
  noLoop();
}