function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);

  randomSeed(42);
  noiseSeed(42);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // subtle atmospheric wind traces
  brush.field("spiral");
  brush.wiggle(2);

  for (let i = 0; i < 120; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let len = random(8, 24);

    brush.set("2H", "#d9d0c3", 0.35);
    brush.flowLine(x, y, len, random(360));
  }

  brush.noField();

  // flock of birds as quick marker gestures
  brush.field("spiral");
  brush.wiggle(1);

  let birdColors = ["#2c2c2c", "#3a3a3a", "#4a433f", "#5a514b"];
  let flockCount = 95;

  for (let i = 0; i < flockCount; i++) {
    let x = random(45, 555);
    let y = random(55, 545);

    // loosely bias density toward middle while keeping birds scattered
    if (random() < 0.55) {
      x = constrain(randomGaussian(300, 130), 35, 565);
      y = constrain(randomGaussian(300, 120), 35, 565);
    }

    let s = random(8, 22);
    let tilt = random(-35, 35);
    let spread = random(0.65, 1.35);
    let wingLift = random(0.18, 0.65) * s;
    let bodyDrop = random(-1.5, 2.5);
    let col = random(birdColors);

    push();
    translate(x, y);
    rotate(tilt);

    brush.set("marker", col, random(0.55, 1.35));

    // left wing
    brush.spline(
      [
        [-s * 0.95 * spread, bodyDrop + random(-1, 1), 0.75],
        [-s * 0.42, -wingLift, 1.0],
        [0, bodyDrop, 0.45]
      ],
      0.5
    );

    // right wing
    brush.spline(
      [
        [0, bodyDrop, 0.45],
        [s * 0.42, -wingLift * random(0.9, 1.15), 1.0],
        [s * 0.95 * spread, bodyDrop + random(-1, 1), 0.75]
      ],
      0.5
    );

    // occasional tiny body stroke
    if (random() < 0.45) {
      brush.set("marker", col, random(0.35, 0.7));
      brush.line(-s * 0.08, bodyDrop, s * 0.08, bodyDrop + random(-0.4, 0.4));
    }

    pop();

    // occasional wind-following gesture trailing near a bird
    if (random() < 0.4) {
      brush.set("pen", "#cfc4b5", random(0.2, 0.4));
      brush.flowLine(
        x + random(-12, 12),
        y + random(-12, 12),
        random(10, 26),
        random(360)
      );
    }
  }

  brush.noField();

  noLoop();
}