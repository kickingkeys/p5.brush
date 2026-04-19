function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noStroke();
  brush.fillTexture(0.6, 0.4);
  
  const palette = ["#d7a6a1", "#c88f91", "#d7b07c", "#c79a5e", "#b9874c"];
  
  for (let i = 0; i < 25; i++) {
    const x = random(80, 520);
    const y = random(80, 520);
    const r = random(50, 110);
    brush.fill(random(palette), random(35, 65));
    brush.fillBleed(random(0.4, 0.6), "out");
    brush.circle(x, y, r);
  }
  
  noLoop();
}