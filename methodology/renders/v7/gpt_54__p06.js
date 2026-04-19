function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(42);
  noiseSeed(42);

  // Soft swirling wind field
  brush.addField("swirlWind", (t, field) => {
    const cx = 300;
    const cy = 300;

    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        const x = map(col, 0, field.length - 1, 0, width);
        const y = map(row, 0, field[0].length - 1, 0, height);

        const dx = x - cx;
        const dy = y - cy;
        const d = sqrt(dx * dx + dy * dy) + 1;

        let a = atan2(dy, dx) + 90;
        a += map(noise(x * 0.01, y * 0.01), 0, 1, -28, 28);
        a += 18 * sin(d * 0.03);

        field[col][row] = a;
      }
    }
    return field;
  });

  // Subtle wind traces
  brush.field("swirlWind");
  brush.wiggle(2);

  brush.set("2H", "#d8cec0", 0.45);
  for (let i = 0; i < 90; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    brush.flowLine(x, y, random(18, 42), random(-8, 8));
  }

  brush.set("rotring", "#e6ddd0", 0.25);
  for (let i = 0; i < 55; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    brush.flowLine(x, y, random(10, 28), random(-10, 10));
  }

  // Flock of quick marker gestures
  const flockCount = 46;
  const birdColors = ["#2a2a2a", "#463a34", "#5a4a42", "#3a4852"];

  for (let i = 0; i < flockCount; i++) {
    let px = random(55, 545);
    let py = random(55, 545);

    let f = noise(px * 0.006, py * 0.006);
    let birdScale = map(f, 0, 1, 0.7, 1.5);

    let bodyLen = random(10, 22) * birdScale;
    let wingSpread = random(12, 28) * birdScale;
    let lift = random(4, 11) * birdScale;

    let c = random(birdColors);

    brush.set("marker", c, random(0.55, 1.2));
    brush.beginStroke("curve", px, py);

    let a1 = random(-18, 8);
    brush.move(a1, wingSpread * 0.45, 0.75);
    brush.move(a1 - random(12, 26), wingSpread * 0.55, 0.35);
    brush.endStroke(a1 - random(15, 30), 0.18);

    brush.set("marker", c, random(0.55, 1.2));
    brush.beginStroke("curve", px, py);

    let a2 = random(172, 198);
    brush.move(a2, wingSpread * 0.45, 0.75);
    brush.move(a2 + random(12, 26), wingSpread * 0.55, 0.35);
    brush.endStroke(a2 + random(15, 30), 0.18);

    if (random() < 0.45) {
      brush.set("marker", c, random(0.35, 0.7));
      brush.spline(
        [
          [px - bodyLen * 0.15, py + random(-1, 1), 0.3],
          [px, py + lift * 0.15, 0.45],
          [px + bodyLen * 0.18, py + random(-1, 1), 0.2]
        ],
        0.45
      );
    }

    // Occasional slightly larger foreground birds
    if (random() < 0.12) {
      let ox = px + random(-10, 10);
      let oy = py + random(-6, 6);
      brush.set("marker", "#1f1f1f", random(1.0, 1.5));
      brush.spline(
        [
          [ox - wingSpread * 0.75, oy + lift * 0.25, 0.2],
          [ox - wingSpread * 0.25, oy - lift, 0.9],
          [ox, oy, 0.45],
          [ox + wingSpread * 0.25, oy - lift * 0.85, 0.9],
          [ox + wingSpread * 0.75, oy + lift * 0.2, 0.2]
        ],
        0.55
      );
    }
  }

  brush.noField();
  noLoop();
}