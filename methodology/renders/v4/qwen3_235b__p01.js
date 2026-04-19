function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdf6ec");
  translate(-width/2, -height/2);
  
  const palette = ["#d7a6a1", "#c88f91", "#d7b07c", "#c79a5e", "#b9874c"];
  brush.noStroke();
  brush.fillTexture(0.6, 0.4);
  
  for (let i = 0; i < 18; i++) {
    const x = random(60, 540);
    const y = random(60, 540);
    const r = random(50, 130);
    brush.fill(random(palette), random(35, 60));
    brush.fillBleed(random(0.4, 0.6), "out");
    brush.circle(x, y, r);
  }
  
  brush.noFill();
  noLoop();
}