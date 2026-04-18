function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  brush.addField("swirl", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let x = c / field.length;
        let y = r / field[0].length;
        let angle = noise(x * 2.5, y * 2.5) * 360 + sin(x * 180) * 40 + cos(y * 180) * 40;
        field[c][r] = angle;
      }
    }
    return field;
  });

  brush.field("swirl");
  brush.wiggle(2);

  let birdCount = 68;

  for (let i = 0; i < birdCount; i++) {
    let x = random(40, 560);
    let y = random(40, 560);

    let nx = x / 600;
    let ny = y / 600;
    let fieldAngle = noise(nx * 2.5, ny * 2.5) * 360 + sin(nx * 180) * 40 + cos(ny * 180) * 40;

    let size = random(0.3, 1.0);
    let distFromCenter = dist(x, y, 300, 300);
    let densityFactor = map(distFromCenter, 0, 300, 0.6, 1.2);
    let w = size * densityFactor;

    let darkness = random(0, 1);
    let col;
    if (darkness < 0.3) {
      col = "#2a2a35";
    } else if (darkness < 0.6) {
      col = "#3a3848";
    } else if (darkness < 0.8) {
      col = "#4a4a5a";
    } else {
      col = "#6a6878";
    }

    brush.set("marker", col, w);

    let wingSpan = random(8, 22) * size;
    let bodyLen = wingSpan * random(0.35, 0.55);

    let rad = radians(fieldAngle);
    let dx = cos(rad);
    let dy = sin(rad);

    let perpX = -dy;
    let perpY = dx;

    let bodyX1 = x - dx * bodyLen * 0.5;
    let bodyY1 = y - dy * bodyLen * 0.5;
    let bodyX2 = x + dx * bodyLen * 0.5;
    let bodyY2 = y + dy * bodyLen * 0.5;

    let wingSweep = random(0.3, 0.7);
    let wingDip = random(0.1, 0.4);

    let wL_x = x - perpX * wingSpan * 0.5 - dx * wingSpan * wingSweep * 0.3;
    let wL_y = y - perpY * wingSpan * 0.5 - dy * wingSpan * wingSweep * 0.3;
    let wR_x = x + perpX * wingSpan * 0.5 + dx * wingSpan * wingSweep * 0.3;
    let wR_y = y + perpY * wingSpan * 0.5 + dy * wingSpan * wingSweep * 0.3;

    let midL_x = x - perpX * wingSpan * 0.25 + dy * wingSpan * wingDip * 0.25;
    let midL_y = y - perpY * wingSpan * 0.25 - dx * wingSpan * wingDip * 0.25;
    let midR_x = x + perpX * wingSpan * 0.25 + dy * wingSpan * wingDip * 0.25;
    let midR_y = y + perpY * wingSpan * 0.25 - dx * wingSpan * wingDip * 0.25;

    brush.spline([
      [wL_x, wL_y, 0.4],
      [midL_x, midL_y, 0.9],
      [x, y, 1.0],
      [midR_x, midR_y, 0.9],
      [wR_x, wR_y, 0.4]
    ], 0.45);

    if (size > 0.55) {
      brush.set("marker", col, w * 0.6);
      brush.line(bodyX1, bodyY1, bodyX2, bodyY2);
    }
  }

  let accentCount = 12;
  for (let i = 0; i < accentCount; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let nx = x / 600;
    let ny = y / 600;
    let fieldAngle = noise(nx * 2.5, ny * 2.5) * 360 + sin(nx * 180) * 40 + cos(ny * 180) * 40;
    let rad = radians(fieldAngle);
    let dx = cos(rad);
    let dy = sin(rad);
    let perpX = -dy;
    let perpY = dx;
    let wingSpan = random(22, 38);
    let wingSweep = random(0.3, 0.6);
    let wingDip = random(0.15, 0.35);

    brush.set("marker", "#1a1a28", random(0.9, 1.4));

    let wL_x = x - perpX * wingSpan * 0.5 - dx * wingSpan * wingSweep * 0.3;
    let wL_y = y - perpY * wingSpan * 0.5 - dy * wingSpan * wingSweep * 0.3;
    let wR_x = x + perpX * wingSpan * 0.5 + dx * wingSpan * wingSweep * 0.3;
    let wR_y = y + perpY * wingSpan * 0.5 + dy * wingSpan * wingSweep * 0.3;
    let midL_x = x - perpX * wingSpan * 0.25 + dy * wingSpan * wingDip * 0.25;
    let midL_y = y - perpY * wingSpan * 0.25 - dx * wingSpan * wingDip * 0.25;
    let midR_x = x + perpX * wingSpan * 0.25 + dy * wingSpan * wingDip * 0.25;
    let midR_y = y + perpY * wingSpan * 0.25 - dx * wingSpan * wingDip * 0.25;

    brush.spline([
      [wL_x, wL_y, 0.3],
      [midL_x, midL_y, 0.85],
      [x, y, 1.0],
      [midR_x, midR_y, 0.85],
      [wR_x, wR_y, 0.3]
    ], 0.5);

    brush.set("marker", "#1a1a28", 0.5);
    let bodyLen = wingSpan * 0.45;
    brush.line(
      x - dx * bodyLen * 0.5,
      y - dy * bodyLen * 0.5,
      x + dx * bodyLen * 0.5,
      y + dy * bodyLen * 0.5
    );
  }

  brush.noField();

  noLoop();
}