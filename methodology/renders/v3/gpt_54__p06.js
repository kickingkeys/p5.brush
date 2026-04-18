function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(12);
  noiseSeed(12);

  // Invisible swirling wind field
  brush.addField("swirlWind", (t, field) => {
    const cx = 300;
    const cy = 300;
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        const x = map(col, 0, field.length - 1, 0, 600);
        const y = map(row, 0, field[0].length - 1, 0, 600);
        const dx = x - cx;
        const dy = y - cy;
        const a = atan2(dy, dx);
        const d = dist(x, y, cx, cy);
        const twist = map(d, 0, 420, 135, 8);
        const wobble = map(noise(x * 0.01, y * 0.01), 0, 1, -28, 28);
        field[col][row] = a + twist + wobble;
      }
    }
    return field;
  });

  brush.field("swirlWind");
  brush.wiggle(2);

  // Faint wind traces
  brush.set("2H", "#d8d0c4", 0.35);
  for (let i = 0; i < 55; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    brush.flowLine(x, y, random(18, 42), 0);
  }

  // Main flock: quick marker gestures
  const flockCount = 85;
  for (let i = 0; i < flockCount; i++) {
    const ring = random();
    let x, y;

    if (ring < 0.5) {
      const a = random(360);
      const r = random(40, 140);
      x = 300 + cos(a) * r;
      y = 300 + sin(a) * r;
    } else {
      const a = random(360);
      const r = random(120, 280);
      x = 300 + cos(a) * r;
      y = 300 + sin(a) * r;
    }

    x = constrain(x, 25, 575);
    y = constrain(y, 25, 575);

    const wing = random(5, 14);
    const bodyTone = random([
      "#2b2622",
      "#3a342f",
      "#4b443e",
      "#5a5149"
    ]);

    push();
    translate(x, y);

    const dir = fieldAngleAt(x, y);
    rotate(dir + random(-18, 18));

    brush.set("marker", bodyTone, random(0.55, 1.2));

    if (random() < 0.7) {
      const pts = [
        [-wing, 0],
        [-wing * 0.38, -random(2, 7)],
        [0, random(-1, 1)],
        [wing * 0.38, -random(2, 7)],
        [wing, 0]
      ];
      brush.spline(pts, 0.45);
    } else {
      brush.line(-wing, 0, -wing * 0.15, -random(2, 6));
      brush.line(wing * 0.15, -random(2, 6), wing, 0);
    }

    if (random() < 0.35) {
      brush.set("pen", "#1d1a17", 0.25);
      brush.line(-1, 0, 1, 0);
    }

    pop();

    // Occasional trailing gesture, like a path caught in wind
    if (random() < 0.28) {
      brush.set("marker", colorWithAlpha(bodyTone, 160), random(0.35, 0.7));
      brush.flowLine(x, y, random(10, 22), 180);
    }
  }

  // A few denser clusters to create natural flocking
  for (let c = 0; c < 4; c++) {
    const cx = random(130, 470);
    const cy = random(130, 470);
    const n = int(random(6, 11));

    for (let i = 0; i < n; i++) {
      const x = cx + random(-35, 35);
      const y = cy + random(-22, 22);
      const wing = random(4, 10);

      push();
      translate(x, y);
      rotate(fieldAngleAt(x, y) + random(-14, 14));

      brush.set("marker", random(["#2c2723", "#433b35", "#5b5148"]), random(0.45, 0.95));
      brush.spline(
        [
          [-wing, 0],
          [-wing * 0.3, -random(1, 4)],
          [0, 0],
          [wing * 0.3, -random(1, 4)],
          [wing, 0]
        ],
        0.4
      );
      pop();
    }
  }

  brush.noField();
  noLoop();
}

function fieldAngleAt(x, y) {
  const dx = x - 300;
  const dy = y - 300;
  const a = atan2(dy, dx);
  const d = dist(x, y, 300, 300);
  const twist = map(d, 0, 420, 135, 8);
  const wobble = map(noise(x * 0.01, y * 0.01), 0, 1, -28, 28);
  return a + twist + wobble;
}

function colorWithAlpha(hex, a) {
  const c = color(hex);
  return color(red(c), green(c), blue(c), a);
}