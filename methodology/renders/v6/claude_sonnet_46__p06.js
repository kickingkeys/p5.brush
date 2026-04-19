function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);

  brush.addField("swirl", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let x = c / field.length;
        let y = r / field[0].length;
        let angle = noise(x * 1.8, y * 1.8, 0.5) * 360;
        angle += sin(y * 3.14 * 2) * 40;
        angle += cos(x * 3.14 * 2) * 30;
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

  let birdColors = ["#1a1a2e", "#2c2c4a", "#3d3d5c", "#22223b", "#4a4e69"];
  let accentColors = ["#6b6b8a", "#4f4f7a", "#383860"];

  let birds = [];

  for (let i = 0; i < 55; i++) {
    birds.push({
      x: random(40, 560),
      y: random(40, 560),
      size: random(0.4, 1.4),
      color: random(birdColors),
      type: random(["v", "arc", "swoop"]),
      weight: random(0.6, 1.8)
    });
  }

  for (let i = 0; i < 12; i++) {
    birds.push({
      x: random(60, 540),
      y: random(60, 540),
      size: random(1.4, 2.2),
      color: random(accentColors),
      type: random(["v", "swoop"]),
      weight: random(1.8, 2.8)
    });
  }

  birds.sort((a, b) => a.size - b.size);

  for (let bird of birds) {
    let x = bird.x;
    let y = bird.y;
    let s = bird.size;
    let col = bird.color;
    let w = bird.weight;

    brush.set("marker", col, w * s);

    if (bird.type === "v") {
      let spread = random(8, 18) * s;
      let lift = random(3, 8) * s;
      let pts = [
        [x - spread, y + lift * 0.5, 0.5],
        [x - spread * 0.4, y, 0.9],
        [x, y + lift * 0.3, 0.7],
        [x + spread * 0.4, y, 0.9],
        [x + spread, y + lift * 0.5, 0.5]
      ];
      brush.spline(pts, 0.45);

    } else if (bird.type === "arc") {
      let spread = random(10, 20) * s;
      let dip = random(2, 6) * s;
      let pts = [
        [x - spread, y, 0.4],
        [x - spread * 0.5, y - dip, 0.8],
        [x, y, 0.6],
        [x + spread * 0.5, y - dip, 0.8],
        [x + spread, y, 0.4]
      ];
      brush.spline(pts, 0.5);

    } else {
      let len = random(14, 28) * s;
      let curve = random(-8, 8) * s;
      let pts = [
        [x - len, y + curve * 0.5, 0.4],
        [x - len * 0.4, y + curve * 0.2, 0.9],
        [x, y, 0.7],
        [x + len * 0.4, y - curve * 0.2, 0.9],
        [x + len, y - curve * 0.5, 0.4]
      ];
      brush.spline(pts, 0.4);
    }
  }

  for (let i = 0; i < 18; i++) {
    let x = random(30, 570);
    let y = random(30, 570);
    let len = random(6, 18);
    brush.set("marker", random(birdColors), random(0.3, 0.7));
    brush.flowLine(x, y, len, random(360));
  }

  brush.noField();

  noLoop();
}