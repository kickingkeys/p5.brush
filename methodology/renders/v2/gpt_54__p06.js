function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(21);
  noiseSeed(21);

  // Swirling wind field
  brush.addField("swirlWind", function (t, field) {
    let cx = 300;
    let cy = 300;
    let pull = 0.035;

    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let x = map(col, 0, field.length - 1, 0, width);
        let y = map(row, 0, field[0].length - 1, 0, height);

        let dx = x - cx;
        let dy = y - cy;
        let ang = atan2(dy, dx) + 90;

        let n = map(noise(x * 0.006, y * 0.006), 0, 1, -35, 35);
        let radial = sin(dist(x, y, cx, cy) * pull * 360) * 18;

        field[col][row] = ang + n + radial;
      }
    }
    return field;
  });

  // Very subtle wind traces
  brush.field("swirlWind");
  brush.wiggle(2);

  for (let i = 0; i < 140; i++) {
    let a = random(360);
    let r = random(30, 290);
    let x = 300 + cos(a) * r + random(-40, 40);
    let y = 300 + sin(a) * r * 0.85 + random(-40, 40);

    let c = random() < 0.7 ? "#d7d0c5" : "#cfc6b8";
    brush.set("rotring", c, random(0.18, 0.35));
    brush.flowLine(x, y, random(14, 40), random(-15, 15));
  }

  brush.noField();

  // Flock of marker gestures
  brush.field("swirlWind");
  brush.wiggle(1);

  let birds = [];
  let flockCount = 70;

  for (let i = 0; i < flockCount; i++) {
    let ringA = random(360);
    let ringR = random(40, 270);
    let x = 300 + cos(ringA) * ringR + random(-55, 55);
    let y = 300 + sin(ringA) * ringR * 0.78 + random(-55, 55);

    let d = dist(x, y, 300, 300);
    let s = map(d, 0, 300, 1.15, 0.45) * random(0.8, 1.2);

    birds.push({
      x: constrain(x, 35, 565),
      y: constrain(y, 40, 560),
      s: s,
      tilt: random(-30, 30),
      ink: random(["#2e2a26", "#3a342f", "#433b35", "#26211d"]),
      type: random()
    });
  }

  birds.sort((a, b) => b.s - a.s);

  for (let b of birds) {
    push();
    translate(b.x, b.y);
    rotate(b.tilt);

    brush.set("marker", b.ink, b.s);

    let span = random(10, 24) * b.s;
    let lift = random(3, 8) * b.s;
    let gap = random(1, 4) * b.s;

    if (b.type < 0.34) {
      brush.spline(
        [
          [-span, lift, 0.45],
          [-gap, -lift * 0.45, 1.0],
          [0, -lift * 0.7, 0.95]
        ],
        0.52
      );
      brush.spline(
        [
          [0, -lift * 0.7, 0.95],
          [gap, -lift * 0.45, 1.0],
          [span, lift, 0.45]
        ],
        0.52
      );
    } else if (b.type < 0.68) {
      brush.spline(
        [
          [-span * 0.95, lift * 0.9, 0.4],
          [-span * 0.25, -lift * 0.35, 0.95],
          [0, -lift * 0.55, 0.85]
        ],
        0.42
      );
      brush.spline(
        [
          [0, -lift * 0.55, 0.85],
          [span * 0.25, -lift * 0.35, 0.95],
          [span * 0.95, lift * 0.9, 0.4]
        ],
        0.42
      );
    } else {
      brush.spline(
        [
          [-span * 0.7, lift * 0.65, 0.45],
          [0, -lift * 0.8, 1.1],
          [span * 0.7, lift * 0.65, 0.45]
        ],
        0.65
      );
    }

    pop();
  }

  // A few closer, darker gestures to anchor the flock
  brush.set("marker", "#201b18", 1.35);
  for (let i = 0; i < 9; i++) {
    let x = random(120, 500);
    let y = random(130, 470);
    let rot = random(-40, 40);
    let span = random(16, 28);

    push();
    translate(x, y);
    rotate(rot);

    brush.spline(
      [
        [-span, random(3, 7), 0.45],
        [-3, random(-6, -3), 1.0],
        [0, random(-8, -5), 0.95]
      ],
      0.5
    );
    brush.spline(
      [
        [0, random(-8, -5), 0.95],
        [3, random(-6, -3), 1.0],
        [span, random(3, 7), 0.45]
      ],
      0.5
    );

    pop();
  }

  brush.noField();

  noLoop();
}