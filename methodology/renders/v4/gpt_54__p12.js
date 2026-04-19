let particles = [];
const NUM_PARTICLES = 180;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
  randomSeed(42);
  noiseSeed(42);

  brush.addField("swarmFlow", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let a =
          noise(col * 0.06, row * 0.06, t * 0.02) * 360 +
          28 * sin(col * 7 + t * 9) -
          18 * cos(row * 6 - t * 11);
        field[col][row] = a;
      }
    }
    return field;
  });

  for (let i = 0; i < NUM_PARTICLES; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    particles.push({
      x,
      y,
      life: int(random(24, 56)),
      len: random(8, 22),
      w: random(0.45, 1.4),
      col: random([
        "#2b3440",
        "#3a4654",
        "#596778",
        "#7b8896",
        "#a7b2bb"
      ])
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("swarmFlow");
  brush.refreshField(0.8);
  brush.wiggle(2);

  for (let pass = 0; pass < 3; pass++) {
    for (let p of particles) {
      let pos = new brush.Position(
        p.x + random(-8, 8),
        p.y + random(-8, 8)
      );

      for (let step = 0; step < p.life; step++) {
        let drift = map(noise(p.x * 0.01, p.y * 0.01, step * 0.03 + pass * 10), 0, 1, -18, 18);
        pos.moveTo(drift, p.len * random(0.8, 1.25), 4);

        let tone = lerpColor(color("#b8c3cb"), color(p.col), step / p.life);
        let alphaCol = color(red(tone), green(tone), blue(tone), 110);

        brush.set("spray", alphaCol, p.w * random(0.8, 1.15));
        brush.flowLine(
          pos.x + random(-5, 5),
          pos.y + random(-5, 5),
          random(6, 18),
          random(360)
        );

        if (random() < 0.18) {
          brush.set("spray", "#d8dfe4", random(0.25, 0.6));
          brush.flowLine(
            pos.x + random(-10, 10),
            pos.y + random(-10, 10),
            random(4, 10),
            random(360)
          );
        }
      }
    }
  }

  brush.noField();

  brush.set("charcoal", "#424950", 0.35);
  for (let i = 0; i < 24; i++) {
    let x1 = random(100, 500);
    let y1 = random(100, 500);
    let pts = [];
    for (let j = 0; j < 5; j++) {
      pts.push([
        x1 + j * random(10, 26),
        y1 + sin(j * 24 + i * 11) * random(6, 20),
        random(0.25, 0.7)
      ]);
    }
    brush.spline(pts, 0.45);
  }

  noLoop();
}