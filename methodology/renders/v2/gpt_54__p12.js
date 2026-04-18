let particles = [];
const W = 600;
const H = 600;
const COUNT = 180;
const STEPS = 22;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noiseSeed(17);
  randomSeed(17);
  brush.scaleBrushes(3);

  brush.addField("ghostFlow", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        const x = map(col, 0, field.length - 1, 0, W);
        const y = map(row, 0, field[0].length - 1, 0, H);

        const dx = x - W * 0.5;
        const dy = y - H * 0.5;
        const d = sqrt(dx * dx + dy * dy);

        const swirl = atan2(dy, dx) + 90;
        const wave = sin(x * 0.018 + t * 8) * 22 + cos(y * 0.016 - t * 6) * 18;
        const n = map(noise(x * 0.005, y * 0.005, t * 0.08), 0, 1, -65, 65);
        const pull = map(d, 0, 320, 18, -28);

        field[col][row] = swirl + wave + n + pull;
      }
    }
    return field;
  });

  for (let i = 0; i < COUNT; i++) {
    const a = random(360);
    const r = random() < 0.65 ? random(40, 180) : random(180, 280);
    const cx = W * 0.5 + cos(a) * r * random(0.55, 1.0);
    const cy = H * 0.52 + sin(a) * r * random(0.45, 0.95);

    particles.push({
      x: cx + random(-30, 30),
      y: cy + random(-30, 30),
      len: random(14, 42),
      dir: random(360),
      passes: floor(random(2, 5)),
      tone: random()
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostFlow");
  brush.refreshField(0.7);
  brush.wiggle(2);

  for (let layer = 0; layer < STEPS; layer++) {
    const layerT = layer / (STEPS - 1);

    for (let p of particles) {
      let c;
      let w;
      let reps;
      let spread = 26 * (1 - layerT) + 8;

      if (p.tone < 0.2) {
        c = "#d9cfc4";
        w = 0.7;
        reps = 1;
      } else if (p.tone < 0.45) {
        c = "#b9b0a7";
        w = 1.0;
        reps = 1;
      } else if (p.tone < 0.75) {
        c = "#8c8580";
        w = 1.35;
        reps = 2;
      } else {
        c = "#57514d";
        w = 1.8;
        reps = 2;
      }

      brush.set("spray", c, w);

      for (let k = 0; k < reps; k++) {
        const px = p.x + random(-spread, spread);
        const py = p.y + random(-spread, spread);
        const l = p.len * random(0.75, 1.2) * (1 - layerT * 0.35);
        const d = p.dir + random(-35, 35);
        brush.flowLine(px, py, l, d);
      }
    }
  }

  brush.noField();

  brush.set("charcoal", "#3f3a36", 0.8);
  brush.wiggle(3);
  for (let i = 0; i < 26; i++) {
    const cx = W * 0.5 + random(-90, 90);
    const cy = H * 0.5 + random(-70, 70);
    const pts = [];
    let a0 = random(360);
    let rr = random(18, 42);
    for (let j = 0; j < 5; j++) {
      const a = a0 + j * random(20, 55);
      pts.push([
        cx + cos(a) * rr + random(-12, 12),
        cy + sin(a) * rr + random(-12, 12),
        random(0.4, 1.0)
      ]);
      rr += random(-8, 16);
    }
    brush.spline(pts, 0.45);
  }

  brush.set("2H", "#c7beb5", 0.45);
  for (let i = 0; i < 120; i++) {
    const x = random(70, 530);
    const y = random(90, 520);
    const l = random(4, 14);
    const a = random(-20, 35);
    brush.line(x, y, x + cos(a) * l, y + sin(a) * l);
  }

  noLoop();
}