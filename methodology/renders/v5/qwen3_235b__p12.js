function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("hand");
  brush.wiggle(2);

  brush.set("spray", "#5e3c6e", 2.0);
  for (let i = 0; i < 120; i++) {
    const x = random(80, 520);
    const y = random(80, 520);
    brush.flowLine(x, y, random(20, 50), random(360));
  }

  brush.set("spray", "#a6638b", 1.3);
  for (let i = 0; i < 80; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    brush.flowLine(x, y, random(15, 35), random(360));
  }

  brush.set("spray", "#d8b0c8", 0.7);
  for (let i = 0; i < 60; i++) {
    const x = random(120, 480);
    const y = random(120, 480);
    brush.flowLine(x, y, random(10, 25), random(360));
  }

  brush.noField();

  noLoop();
}