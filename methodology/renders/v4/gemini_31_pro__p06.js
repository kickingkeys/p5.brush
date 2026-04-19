function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("swirl", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let x = map(c, 0, field.length, 0, width);
        let y = map(r, 0, field[0].length, 0, height);
        let mainFlow = noise(x * 0.002, y * 0.002) * 720;
        let microWobble = (noise(x * 0.05, y * 0.05) - 0.5) * 20;
        field[c][r] = mainFlow + microWobble;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("swirl");
  brush.noFill();

  brush.set("marker", "#e8e1d5", 0.3);
  for (let i = 0; i < 150; i++) {
    let x = random(width);
    let y = random(height);
    let a = noise(x * 0.002, y * 0.002) * 720;
    brush.flowLine(x, y, random(20, 90), a);
  }

  const palette = ["#1e293b", "#0f172a", "#334155", "#ea580c", "#9a3412"];
  
  for (let i = 0; i < 120; i++) {
    let x = random(-20, width + 20);
    let y = random(-20, height + 20);
    
    let angle = noise(x * 0.002, y * 0.002) * 720 + (noise(x * 0.05, y * 0.05) - 0.5) * 20;

    push();
    translate(x, y);
    rotate(angle);

    let w = random(8, 24);
    let h = random(4, 14);
    let weight = random(0.6, 1.5);
    let col = random(palette);

    brush.set("marker", col, weight);

    brush.spline([
      [-h, -w, 0.1],
      [0, 0, random(1.0, 1.6)],
      [-h, w, 0.1]
    ], 0.35);

    if (random() > 0.85) {
      brush.set("marker", col, weight * 0.5);
      brush.line(-h - random(2, 6), -w - random(2, 6), -h, -w);
    }
    
    pop();
  }

  brush.noField();
  noLoop();
}