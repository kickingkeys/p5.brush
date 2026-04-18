let particles = [];
const NUM_PARTICLES = 180;
const STEPS = 28;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noiseSeed(12);
  randomSeed(12);
  brush.scaleBrushes(3);

  brush.addField("ghostFlow", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let nx = col * 0.085;
        let ny = row * 0.085;
        let a =
          noise(nx, ny) * 220 +
          sin(col * 7 + t * 18) * 22 +
          cos(row * 9 - t * 14) * 18;
        field[col][row] = a;
      }
    }
    return field;
  });

  for (let i = 0; i < NUM_PARTICLES; i++) {
    let cluster = random();
    let x, y;

    if (cluster < 0.45) {
      x = randomGaussian(300, 70);
      y = randomGaussian(300, 70);
    } else if (cluster < 0.72) {
      x = randomGaussian(210, 55);
      y = randomGaussian(360, 60);
    } else {
      x = randomGaussian(410, 60);
      y = randomGaussian(230, 55);
    }

    particles.push({
      x: constrain(x, 40, 560),
      y: constrain(y, 40, 560),
      life: random(0.8, 1.2),
      len: random(16, 36)
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostFlow");
  brush.refreshField(0.35);
  brush.wiggle(2);

  for (let pass = 0; pass < 4; pass++) {
    let col, w, count, alphaBias;

    if (pass === 0) {
      col = "#d8d1c2";
      w = 3.2;
      count = NUM_PARTICLES;
      alphaBias = 0.55;
    } else if (pass === 1) {
      col = "#bfc7cf";
      w = 2.3;
      count = floor(NUM_PARTICLES * 0.9);
      alphaBias = 0.8;
    } else if (pass === 2) {
      col = "#8e9aa8";
      w = 1.4;
      count = floor(NUM_PARTICLES * 0.75);
      alphaBias = 1.0;
    } else {
      col = "#596575";
      w = 0.8;
      count = floor(NUM_PARTICLES * 0.45);
      alphaBias = 1.15;
    }

    brush.set("spray", col, w);

    for (let i = 0; i < count; i++) {
      let p = particles[i];
      let x = p.x + randomGaussian(0, 10 * (1.1 - pass * 0.18));
      let y = p.y + randomGaussian(0, 10 * (1.1 - pass * 0.18));

      for (let s = 0; s < STEPS; s++) {
        let pos = new brush.Position(x, y);
        let a = pos.angle();
        let stepLen = map(pass, 0, 3, 10, 5) * p.life;
        let drift = random(-16, 16) * alphaBias;

        brush.flowLine(
          x + randomGaussian(0, 3.5 - pass * 0.6),
          y + randomGaussian(0, 3.5 - pass * 0.6),
          p.len * alphaBias + random(-6, 8),
          a + drift
        );

        x += cos(a) * stepLen + randomGaussian(0, 1.2);
        y += sin(a) * stepLen + randomGaussian(0, 1.2);

        if (x < 20 || x > 580 || y < 20 || y > 580) break;
      }
    }
  }

  brush.noField();

  brush.set("charcoal", "#6f7780", 0.45);
  for (let i = 0; i < 34; i++) {
    let x = random(120, 480);
    let y = random(120, 480);
    let pts = [];
    let px = x;
    let py = y;
    for (let j = 0; j < 4; j++) {
      let pos = new brush.Position(px, py);
      let a = pos.angle();
      px += cos(a) * random(8, 18);
      py += sin(a) * random(8, 18);
      pts.push([px, py, random(0.35, 0.8)]);
    }
    brush.spline(pts, 0.45);
  }

  noLoop();
}