function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(17);
  noiseSeed(17);

  // Subtle wind field that swirls around the page with some noise drift
  brush.addField("swirlWind", function (t, field) {
    let cols = field.length;
    let rows = field[0].length;
    let cx = width * 0.52;
    let cy = height * 0.48;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        let x = map(col, 0, cols - 1, 0, width);
        let y = map(row, 0, rows - 1, 0, height);

        let dx = x - cx;
        let dy = y - cy;
        let ang = atan2(dy, dx) + 90;

        let d = dist(x, y, cx, cy);
        let twist = map(d, 0, 420, 55, -10);
        let drift = map(noise(x * 0.006, y * 0.006, 50 + t), 0, 1, -28, 28);

        field[col][row] = ang + twist + drift;
      }
    }
    return field;
  });

  brush.field("swirlWind");
  brush.refreshField(0);
  brush.wiggle(2);

  // Very faint wind traces
  brush.set("2H", "#d8d0c2", 0.33);
  for (let i = 0; i < 55; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    brush.flowLine(x, y, random(18, 42), random(-10, 10));
  }

  let birds = [];
  let count = 46;

  for (let i = 0; i < count; i++) {
    let side = random();
    let x, y;

    if (side < 0.25) {
      x = random(30, 180);
      y = random(40, 560);
    } else if (side < 0.5) {
      x = random(420, 570);
      y = random(40, 560);
    } else if (side < 0.75) {
      x = random(40, 560);
      y = random(30, 180);
    } else {
      x = random(40, 560);
      y = random(420, 570);
    }

    let dx = x - 312;
    let dy = y - 288;
    let r = sqrt(dx * dx + dy * dy);
    let scale = map(r, 0, 430, 0.75, 1.25);

    birds.push({
      x: x,
      y: y,
      s: random(8, 18) * scale,
      tone: random(),
      tilt: random(-18, 18)
    });
  }

  birds.sort((a, b) => a.s - b.s);

  for (let b of birds) {
    drawBird(b.x, b.y, b.s, b.tone, b.tilt);
  }

  brush.noField();
  brush.noHatch();
  brush.noFill();
  brush.noMass();
  brush.noWash();
  brush.noStroke();

  noLoop();
}

function drawBird(x, y, s, tone, tilt) {
  let bodyColor;
  if (tone < 0.33) bodyColor = "#3f474d";
  else if (tone < 0.66) bodyColor = "#586168";
  else bodyColor = "#2e353a";

  let wingColor = lerpColor(color(bodyColor), color("#6f7a82"), 0.18);

  push();
  translate(x, y);
  rotate(fieldRotationAt(x, y) + tilt);

  // Main marker gestures: two wings as quick splines
  brush.set("marker", wingColor, map(s, 8, 20, 0.45, 0.95));

  let span = s * random(1.7, 2.3);
  let rise = s * random(0.45, 0.9);
  let tipDrop = s * random(0.05, 0.45);
  let centerLift = s * random(0.05, 0.22);

  brush.spline(
    [
      [-span * 0.95, rise * 0.15, 0.55],
      [-span * 0.45, -rise, 1.1],
      [0, -centerLift, 0.75]
    ],
    0.55
  );

  brush.spline(
    [
      [0, -centerLift, 0.78],
      [span * 0.45, -rise * random(0.9, 1.1), 1.1],
      [span * 0.95, tipDrop, 0.5]
    ],
    0.55
  );

  // Small body/head anchor so they still read as birds
  brush.set("pen", "#2b3136", map(s, 8, 20, 0.28, 0.5));
  brush.spline(
    [
      [-s * 0.12, -s * 0.02, 0.7],
      [0, s * 0.08, 0.95],
      [s * 0.16, s * 0.02, 0.55]
    ],
    0.4
  );

  // Occasional extra flick to suggest wingbeat variation
  if (random() < 0.38) {
    brush.set("marker", bodyColor, map(s, 8, 20, 0.22, 0.42));
    let dir = random() < 0.5 ? -1 : 1;
    brush.spline(
      [
        [dir * s * 0.12, -s * 0.08, 0.35],
        [dir * s * 0.5, -s * 0.45, 0.6],
        [dir * s * 0.82, -s * 0.18, 0.22]
      ],
      0.45
    );
  }

  pop();
}

function fieldRotationAt(x, y) {
  let cx = width * 0.52;
  let cy = height * 0.48;
  let dx = x - cx;
  let dy = y - cy;
  let ang = atan2(dy, dx) + 90;
  let d = dist(x, y, cx, cy);
  let twist = map(d, 0, 420, 55, -10);
  let drift = map(noise(x * 0.006, y * 0.006, 50), 0, 1, -28, 28);
  return ang + twist + drift;
}