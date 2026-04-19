function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("curved");
  brush.wiggle(2);

  for (let i = 0; i < 45; i++) {
    const x = random(80, 520);
    const y = random(80, 520);
    const weight = random(0.8, 1.6);
    brush.set("marker", "#5a4a42", weight);
    
    const points = [
      [x, y],
      [x + random(-40, 40), y + random(-25, 25)],
      [x + random(-70, 70), y + random(-40, 40)]
    ];
    brush.spline(points, 0.4);
  }

  brush.noField();
  noLoop();
}