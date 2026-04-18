function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("ghost_field", function(t, field) {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let n = noise(col * 0.04, row * 0.04);
        field[col][row] = n * 720;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghost_field");

  let colors = [
    color(80, 110, 140, 25),
    color(120, 140, 170, 20),
    color(160, 170, 190, 15),
    color(210, 190, 200, 20),
    color(230, 160, 140, 15)
  ];

  let emitters = [];
  for (let e = 0; e < 7; e++) {
    emitters.push({
      x: random(100, 500),
      y: random(100, 500)
    });
  }

  for (let i = 0; i < 2500; i++) {
    let e = random(emitters);
    let x = e.x + randomGaussian(0, 90);
    let y = e.y + randomGaussian(0, 90);
    let len = random(40, 250);
    let c = random(colors);
    let w = random(1.5, 5);

    brush.set("spray", c, w);
    brush.flowLine(x, y, len, random(360));
  }

  for (let i = 0; i < 600; i++) {
    let e = random(emitters);
    let x = e.x + randomGaussian(0, 70);
    let y = e.y + randomGaussian(0, 70);
    let len = random(20, 100);
    let w = random(0.5, 1.5);

    brush.set("charcoal", color(40, 45, 50, 30), w);
    brush.flowLine(x, y, len, random(360));
  }

  noLoop();
}