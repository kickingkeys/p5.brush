function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("wind", function(t, field) {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        field[col][row] = noise(col * 0.035, row * 0.035) * 720;
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

  const colors = ["#1a1c23", "#2c3e50", "#4a3228", "#1c2833", "#3b414c"];

  for (let i = 0; i < 90; i++) {
    let x = random(40, 560);
    let y = random(40, 560);

    let pos = new brush.Position(x, y);
    let angle = pos.angle();

    brush.set("marker", random(colors), random(0.8, 1.7));

    let span = random(10, 24);
    let sweep = random(8, 18);

    push();
    translate(x, y);
    rotate(angle);

    let pts = [
      [-sweep, -span, random(0.3, 0.7)],
      [sweep * 0.6, 0, random(1.2, 1.8)],
      [-sweep, span, random(0.3, 0.7)]
    ];

    brush.spline(pts, random(0.3, 0.5));
    pop();
  }

  brush.wiggle(0.5);
  for (let i = 0; i < 50; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    brush.set("marker", random(colors), random(0.3, 0.6));
    brush.flowLine(x, y, random(10, 35), 0);
  }

  brush.noField();
  noLoop();
}