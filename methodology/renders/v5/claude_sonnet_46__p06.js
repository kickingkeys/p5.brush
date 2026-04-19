function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);

  brush.addField("swirl", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let x = c / field.length;
        let y = r / field[0].length;
        let angle = noise(x * 2.5, y * 2.5) * 360 + sin(y * PI * 2) * 60;
        field[c][r] = angle;
      }
    }
    return field;
  });
}

function draw() {
  translate(-width / 2, -height / 2);

  brush.field("swirl");
  brush.wiggle(2);

  let birdColors = ["#1a1a2e", "#16213e", "#0f3460", "#2c2c54", "#333333", "#1b1b2f"];

  let flockData = [];
  for (let i = 0; i < 68; i++) {
    flockData.push({
      x: random(40, 560),
      y: random(40, 560),
      size: random(0.4, 1.3),
      color: random(birdColors),
      wingSpan: random(14, 38),
      dir: random(360)
    });
  }

  flockData.sort((a, b) => a.size - b.size);

  for (let bird of flockData) {
    let w = bird.wingSpan;
    let cx = bird.x;
    let cy = bird.y;
    let wt = bird.size;
    let col = bird.color;

    brush.set("marker", col, wt);

    let leftWingPts = [
      [cx, cy, 0.9],
      [cx - w * 0.45, cy - w * 0.18, 0.7],
      [cx - w * 0.85, cy + w * 0.08, 0.4]
    ];

    let rightWingPts = [
      [cx, cy, 0.9],
      [cx + w * 0.45, cy - w * 0.18, 0.7],
      [cx + w * 0.85, cy + w * 0.08, 0.4]
    ];

    brush.spline(leftWingPts, 0.5);
    brush.spline(rightWingPts, 0.5);
  }

  brush.noField();
  noLoop();
}