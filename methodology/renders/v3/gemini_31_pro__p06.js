function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function getRiverAngle(x, y) {
  let eps = 1.0;
  let scale = 0.004;
  let dx = noise((x + eps) * scale, y * scale) - noise((x - eps) * scale, y * scale);
  let dy = noise(x * scale, (y + eps) * scale) - noise(x * scale, (y - eps) * scale);
  return atan2(dy, dx) + 90;
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.addField("wind", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = getRiverAngle(c * 15, r * 15);
      }
    }
    return field;
  });

  brush.field("wind");
  brush.wiggle(1);

  let birds = [];
  for (let i = 0; i < 450; i++) {
    let x = random(-50, width + 50);
    let y = random(-50, height + 50);
    let n = noise(x * 0.004, y * 0.004);

    if (abs(n - 0.5) < 0.18) {
      let angle = getRiverAngle(x, y);
      let size = random(5, 25);
      birds.push({ x, y, angle, size });
    }
  }

  birds.sort((a, b) => a.size - b.size);

  brush.set("pen", "#e2dfd8", 0.6);
  for (let i = 0; i < 150; i++) {
    let x = random(width);
    let y = random(height);
    let n = noise(x * 0.004, y * 0.004);
    if (abs(n - 0.5) < 0.25) {
      brush.flowLine(x, y, random(15, 50), getRiverAngle(x, y));
    }
  }

  let palettes = ["#94a3b8", "#64748b", "#334155", "#0f172a"];

  for (let b of birds) {
    let colorIdx = floor(map(b.size, 5, 25, 0, 3.99));
    let col = palettes[colorIdx];

    brush.set("marker", col, map(b.size, 5, 25, 0.5, 1.8));

    let wingA = random(30, 45);
    let lx = b.x - cos(b.angle + wingA) * b.size;
    let ly = b.y - sin(b.angle + wingA) * b.size;
    let rx = b.x - cos(b.angle - wingA) * b.size;
    let ry = b.y - sin(b.angle - wingA) * b.size;
    let nx = b.x + cos(b.angle) * (b.size * 0.4);
    let ny = b.y + sin(b.angle) * (b.size * 0.4);

    brush.spline([[lx, ly], [nx, ny], [rx, ry]], 0.4);

    if (random() > 0.8) {
      brush.strokeWeight(map(b.size, 5, 25, 0.3, 0.8));
      brush.flowLine(b.x, b.y, b.size * random(1, 2), b.angle + 180 + random(-15, 15));
    }
  }

  brush.noField();
  noLoop();
}