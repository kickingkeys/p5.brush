function getWindAngle(x, y) {
  return noise(x * 0.003, y * 0.003) * 720;
}

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.addField("wind", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let x = (c / field.length) * width;
        let y = (r / field[0].length) * height;
        field[c][r] = getWindAngle(x, y);
      }
    }
    return field;
  });

  brush.field("wind");

  brush.set("2H", "#e8dfd1", 0.8);
  for (let i = 0; i < 70; i++) {
    let x = random(width);
    let y = random(height);
    brush.flowLine(x, y, random(40, 150), getWindAngle(x, y));
  }

  let birds = [];
  for (let i = 0; i < 250; i++) {
    let x = random(width);
    let y = random(height);
    
    if (random() > 0.3) {
      x = randomGaussian(width / 2, 140);
      y = randomGaussian(height / 2, 140);
    }
    
    x = constrain(x, 20, width - 20);
    y = constrain(y, 20, height - 20);

    let size = random(0.3, 1.5);
    if (random() > 0.3) size = random(0.2, 0.5);

    birds.push({ x, y, size });
  }

  birds.sort((a, b) => a.size - b.size);

  let palette = ["#1d2b38", "#2c4053", "#d94a38", "#e08d3c", "#121b24"];

  for (let b of birds) {
    let angle = getWindAngle(b.x, b.y);
    let span = b.size * 22;
    
    let lx = b.x + cos(angle + 140) * span;
    let ly = b.y + sin(angle + 140) * span;
    let rx = b.x + cos(angle - 140) * span;
    let ry = b.y + sin(angle - 140) * span;

    if (b.size < 0.5) {
      brush.set("marker", "#9ba6b0", b.size * 1.5);
    } else {
      let col = random(palette);
      brush.set("marker", col, b.size * 1.8);
    }

    brush.spline([
      [lx, ly, 0.1],
      [b.x, b.y, 1.6],
      [rx, ry, 0.1]
    ], 0.65);
    
    if (b.size > 0.7) {
      let hx = b.x + cos(angle) * (b.size * 6);
      let hy = b.y + sin(angle) * (b.size * 6);
      brush.line(b.x, b.y, hx, hy);
    }
  }

  brush.noField();
  noLoop();
}