function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("swirl", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.06, r * 0.06) * 720;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("swirl");
  brush.wiggle(1);
  brush.noFill();

  const colors = ["#1c1917", "#292524", "#44403c", "#78716c", "#991b1b", "#1e3a8a"];

  for (let i = 0; i < 600; i++) {
    let x = random(-50, width + 50);
    let y = random(-50, height + 50);

    if (noise(x * 0.004, y * 0.004) > 0.42) {
      let col = random(colors);
      let weight = random(0.5, 1.5);
      brush.set("marker", col, weight);

      let birdType = random();
      let baseAngle = noise(x * 0.01, y * 0.01) * 360;

      if (birdType < 0.6) {
        let len = random(8, 18);
        let spread = random(15, 35);
        brush.flowLine(x, y, len, baseAngle - spread);
        brush.flowLine(x, y, len, baseAngle + spread);
      } else if (birdType < 0.85) {
        brush.flowLine(x, y, random(12, 25), baseAngle - 10);
        brush.flowLine(x, y, random(5, 12), baseAngle + 25);
      } else {
        brush.flowLine(x, y, random(15, 30), baseAngle);
      }
    }
  }

  brush.noField();
  noLoop();
}