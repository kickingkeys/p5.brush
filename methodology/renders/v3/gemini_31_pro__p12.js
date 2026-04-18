let W = 600;
let H = 600;

function setup() {
  createCanvas(W, H, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("ghostFlow", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let n = noise(c * 0.03, r * 0.03);
        field[c][r] = n * 720;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostFlow");
  brush.wiggle(2);

  brush.set("spray", "#4a5568", 3.0);
  for (let i = 0; i < 200; i++) {
    let x = width / 2 + randomGaussian() * 120;
    let y = height / 2 + randomGaussian() * 120;
    brush.flowLine(x, y, random(40, 90), 0);
  }

  brush.set("spray", "#718096", 2.2);
  for (let i = 0; i < 250; i++) {
    let x = width / 2 + randomGaussian() * 110;
    let y = height / 2 + randomGaussian() * 110;
    brush.flowLine(x, y, random(30, 70), 0);
  }

  brush.set("spray", "#a0aec0", 1.4);
  for (let i = 0; i < 200; i++) {
    let x = width / 2 + randomGaussian() * 100;
    let y = height / 2 + randomGaussian() * 100;
    brush.flowLine(x, y, random(20, 50), 0);
  }

  brush.set("spray", "#e2e8f0", 0.7);
  for (let i = 0; i < 150; i++) {
    let x = width / 2 + randomGaussian() * 90;
    let y = height / 2 + randomGaussian() * 90;
    brush.flowLine(x, y, random(10, 30), 0);
  }

  brush.set("pen", "#2d3748", 0.4);
  for (let i = 0; i < 40; i++) {
    let x = width / 2 + randomGaussian() * 130;
    let y = height / 2 + randomGaussian() * 130;
    brush.flowLine(x, y, random(50, 120), 0);
  }

  brush.noField();
  noLoop();
}