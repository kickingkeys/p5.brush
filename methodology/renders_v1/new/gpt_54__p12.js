let particles = [];
const NUM_PARTICLES = 240;
const STEPS = 48;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  noiseSeed(24);
  randomSeed(24);
  brush.scaleBrushes(3);

  brush.addField("ghostFlow", function (t, field) {
    const cols = field.length;
    const rows = field[0].length;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = map(col, 0, cols - 1, 0, width);
        const y = map(row, 0, rows - 1, 0, height);

        const cx = width * 0.5;
        const cy = height * 0.5;
        const dx = x - cx;
        const dy = y - cy;
        const r = sqrt(dx * dx + dy * dy) + 1;

        const swirl = atan2(dy, dx) + 90;
        const wave = map(noise(x * 0.006, y * 0.006, t * 0.03), 0, 1, -65, 65);
        const inward = map(r, 0, width * 0.6, 14, -18);

        field[col][row] = swirl + wave + inward;
      }
    }
    return field;
  });

  for (let i = 0; i < NUM_PARTICLES; i++) {
    let ring = random();
    let a = random(360);
    let r;

    if (ring < 0.55) {
      r = random(40, 130);
    } else if (ring < 0.88) {
      r = random(130, 220);
    } else {
      r = random(220, 290);
    }

    const x = width * 0.5 + cos(a) * r + random(-20, 20);
    const y = height * 0.5 + sin(a) * r + random(-20, 20);

    particles.push({
      x: x,
      y: y,
      size: random(0.35, 1.2),
      alpha: random(20, 65),
      len: random(4, 14),
      drift: random(-18, 18)
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostFlow");
  brush.refreshField(0);

  for (let haze = 0; haze < 3; haze++) {
    const hazeColor = haze === 0 ? "#d8d2c8" : haze === 1 ? "#c8d7d8" : "#cfc8dc";
    brush.set("spray", hazeColor, haze === 0 ? 2.8 : haze === 1 ? 2.1 : 1.5);

    for (let i = 0; i < 140; i++) {
      const px = random(width);
      const py = random(height);
      const distToCenter = dist(px, py, width * 0.5, height * 0.5);
      if (distToCenter < random(80, 260)) {
        brush.flowLine(px, py, random(8, 28), random(360));
      }
    }
  }

  for (let step = 0; step < STEPS; step++) {
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      const n = noise(p.x * 0.007, p.y * 0.007, step * 0.03);
      let c;

      if (n < 0.33) c = "#c9d4d8";
      else if (n < 0.66) c = "#d8d2c6";
      else c = "#d6cfe0";

      brush.set("spray", c, p.size * map(step, 0, STEPS - 1, 1.25, 0.5));
      brush.flowLine(
        p.x + random(-1.5, 1.5),
        p.y + random(-1.5, 1.5),
        p.len + random(-2, 2),
        p.drift + random(-25, 25)
      );

      let pos = new brush.Position(p.x, p.y);
      pos.moveTo(p.drift, p.len * 1.7, 6);

      p.x = pos.x + random(-2.5, 2.5);
      p.y = pos.y + random(-2.5, 2.5);

      if (p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
        let a = random(360);
        let r = random(70, 250);
        p.x = width * 0.5 + cos(a) * r;
        p.y = height * 0.5 + sin(a) * r;
      }
    }
  }

  brush.noField();

  brush.set("charcoal", "#8f8a84", 0.55);
  brush.wiggle(2);
  for (let i = 0; i < 22; i++) {
    const a = random(360);
    const r = random(70, 210);
    const x = width * 0.5 + cos(a) * r;
    const y = height * 0.5 + sin(a) * r;
    const pts = [];
    const count = 5;
    for (let j = 0; j < count; j++) {
      const aa = a + map(j, 0, count - 1, -30, 30) + random(-10, 10);
      const rr = random(10, 36);
      pts.push([x + cos(aa) * rr, y + sin(aa) * rr, random(0.4, 1.0)]);
    }
    brush.spline(pts, 0.45);
  }
  brush.noField();

  noLoop();
}