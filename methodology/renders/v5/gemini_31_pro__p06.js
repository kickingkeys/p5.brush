function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("wind", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.02, r * 0.02) * 720;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("wind");
  brush.wiggle(1);

  const colors = ["#1a1c23", "#2c3645", "#425166", "#612929", "#8a3b2e"];

  for (let i = 0; i < 90; i++) {
    let x = 300 + randomGaussian(0, 180);
    let y = 300 + randomGaussian(0, 180);
    
    if (x < 10 || x > 590 || y < 10 || y > 590) continue;

    brush.set("marker", random(colors), random(0.4, 0.9));
    brush.flowLine(x, y, random(10, 25), 0);
  }

  for (let i = 0; i < 70; i++) {
    let x = 300 + randomGaussian(0, 140);
    let y = 300 + randomGaussian(0, 140);
    
    if (x < 20 || x > 580 || y < 20 || y > 580) continue;

    let pos = new brush.Position(x, y);
    let angle = pos.angle();

    let wingLen = random(12, 28);
    let sweep = random(135, 160);

    let lx = x + cos(angle + sweep) * wingLen;
    let ly = y + sin(angle + sweep) * wingLen;

    let rx = x + cos(angle - sweep) * wingLen;
    let ry = y + sin(angle - sweep) * wingLen;

    brush.set("marker", random(colors), random(0.9, 1.8));

    brush.spline([
      [lx, ly, random(0.3, 0.6)],
      [x, y, random(1.2, 1.8)],
      [rx, ry, random(0.3, 0.6)]
    ], 0.4);
  }

  brush.noField();
  noLoop();
}