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

  // subtle wind field
  brush.addField("swirlWind", (t, field) => {
    let cx = 300;
    let cy = 300;
    let pull = 0.65;

    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let x = map(col, 0, field.length - 1, 0, width);
        let y = map(row, 0, field[0].length - 1, 0, height);

        let dx = x - cx;
        let dy = y - cy;
        let ang = atan2(dy, dx) + 90;

        let d = dist(x, y, cx, cy);
        ang += map(d, 0, 360, 25, -10);

        ang += map(noise(x * 0.006, y * 0.006), 0, 1, -22, 22) * pull;

        field[col][row] = ang;
      }
    }
    return field;
  });

  // faint atmospheric wind traces
  brush.field("swirlWind");
  brush.set("spray", "#d8cec0", 0.55);
  for (let i = 0; i < 120; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let len = random(10, 26);
    let dir = random(360);
    brush.flowLine(x, y, len, dir);
  }

  // a few slightly stronger wind arcs
  brush.set("spray", "#cfc3b5", 0.85);
  for (let i = 0; i < 36; i++) {
    let a = random(360);
    let r = random(80, 250);
    let x = 300 + cos(a) * r;
    let y = 300 + sin(a) * r;
    brush.flowLine(x, y, random(20, 42), a + 10);
  }

  brush.noField();

  // scattered flock of marker birds
  for (let i = 0; i < 42; i++) {
    let x = random(50, 550);
    let y = random(55, 545);

    let dx = x - 300;
    let dy = y - 300;
    let swirl = atan2(dy, dx) + 90;
    let drift = map(noise(x * 0.008, y * 0.008), 0, 1, -35, 35);
    let heading = swirl + drift;

    let size = random(10, 28);
    let flap = random(18, 42);
    let bodyLen = size * random(0.45, 0.75);

    push();
    translate(x, y);
    rotate(heading + random(-10, 10));

    brush.wiggle(1);

    // occasional pale understroke to suggest motion
    if (random() < 0.35) {
      brush.set("marker", "#b9d2d9", 0.45);
      brush.line(-size * 0.9, size * 0.18, size * 0.9, -size * 0.18);
    }

    // main bird gesture
    let tone = random();
    if (tone < 0.6) {
      brush.set("marker", "#2b2b2b", random(0.8, 1.15));
    } else if (tone < 0.82) {
      brush.set("marker", "#49433d", random(0.75, 1.05));
    } else {
      brush.set("marker", "#6f7e8a", random(0.7, 0.95));
    }

    // left wing
    brush.beginStroke("curve", 0, 0);
    brush.move(180 + flap, size * random(0.45, 0.7), random(0.85, 1.25));
    brush.endStroke(180 + flap + random(-18, 18), random(0.45, 0.8));

    // right wing
    brush.beginStroke("curve", 0, 0);
    brush.move(360 - flap, size * random(0.45, 0.7), random(0.85, 1.25));
    brush.endStroke(360 - flap + random(-18, 18), random(0.45, 0.8));

    // body / head hint
    if (random() < 0.7) {
      brush.set("marker", "#26211d", random(0.45, 0.7));
      brush.line(-bodyLen * 0.18, 0, bodyLen * 0.18, 0);
    }

    brush.noField();
    pop();
  }

  // a few denser birds near the center flow
  for (let i = 0; i < 10; i++) {
    let a = random(360);
    let r = random(55, 150);
    let x = 300 + cos(a) * r;
    let y = 300 + sin(a) * r;
    let heading = a + 95 + random(-20, 20);
    let size = random(18, 34);
    let flap = random(22, 38);

    push();
    translate(x, y);
    rotate(heading);

    brush.set("marker", "#222222", 1.2);

    brush.beginStroke("curve", 0, 0);
    brush.move(180 + flap, size * 0.65, 1.2);
    brush.endStroke(180 + flap + 10, 0.55);

    brush.beginStroke("curve", 0, 0);
    brush.move(360 - flap, size * 0.65, 1.2);
    brush.endStroke(360 - flap - 10, 0.55);

    brush.set("marker", "#1e1e1e", 0.55);
    brush.line(-size * 0.12, 0, size * 0.16, 0);

    pop();
  }

  noLoop();
}