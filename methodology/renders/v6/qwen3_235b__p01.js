function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noStroke();
  brush.fillTexture(0.5, 0.3);
  
  const palette = ["#d7a6a1", "#c88f91", "#d7b07c", "#c79a5e", "#b9874c"];
  
  for (let i = 0; i < 20; i++) {
    const x = random(60, 540);
    const y = random(60, 540);
    const r = random(40, 110);
    const color = random(palette);
    const opacity = random(30, 60);
    const bleed = random(0.4, 0.6);
    
    brush.fill(color, opacity);
    brush.fillBleed(bleed, "out");
    brush.circle(x, y, r);
  }
  
  noLoop();
}