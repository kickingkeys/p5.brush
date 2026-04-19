const palette = ["#1a1c20", "#2d3748", "#4a5568", "#2b6cb0", "#c53030", "#8c2a2a", "#111111"];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("swirl", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.04, r * 0.04) * 720;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("swirl");
  brush.wiggle(1);

  for (let i = 0; i < 40; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    brush.set("marker", random(palette), random(0.2, 0.4));
    brush.flowLine(x, y, random(4, 12), 0);
  }

  let numBirds = 75;
  for (let i = 0; i < numBirds; i++) {
    let x = random(40, 560);
    let y = random(40, 560);

    let windAngle = noise(x * 0.004, y * 0.004) * 720;

    push();
    translate(x, y);
    rotate(windAngle);

    let col = random(palette);
    let wt = random(0.8, 1.5);
    brush.set("marker", col, wt);

    let span = random(12, 28);
    let sweep = random(8, 20);

    brush.spline([
      [-span, -sweep, random(0.2, 0.5)],
      [0, 0, random(1.2, 1.8)],
      [span, -sweep, random(0.2, 0.5)]
    ], random(0.2, 0.5));

    if (random() > 0.4) {
      brush.set("marker", col, wt * 0.6);
      brush.spline([
        [-span * random(0.7, 0.9), -sweep * random(0.8, 1.1), random(0.1, 0.3)],
        [random(-2, 2), random(1, 4), random(0.8, 1.2)],
        [span * random(0.7, 0.9), -sweep * random(0.8, 1.1), random(0.1, 0.3)]
      ], random(0.3, 0.6));
    }

    pop();
  }

  brush.noField();
  noLoop();
}