let particles = [];
const NUM_PARTICLES = 260;
const STEPS = 70;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);

  brush.addField("ghostFlow", (t, field) => {
    const cols = field.length;
    const rows = field[0].length;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = map(c, 0, cols - 1, 0, width);
        const y = map(r, 0, rows - 1, 0, height);

        const dx = x - width * 0.5;
        const dy = y - height * 0.5;
        const distToCenter = sqrt(dx * dx + dy * dy);
        const swirl = atan2(dy, dx) + 90;

        const n1 = noise(x * 0.005, y * 0.005) * 180;
        const n2 = noise(x * 0.012 + 100, y * 0.012 + 100) * 120 - 60;
        const pull = map(distToCenter, 0, 420, 0, -35);

        field[c][r] = swirl * 0.55 + n1 * 0.35 + n2 * 0.4 + pull;
      }
    }
    return field;
  }, { angleMode: "degrees" });

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(makeParticle(i));
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostFlow");
  brush.refreshField(0);

  dustWash();
  drawSwarm();
  veilContours();

  noLoop();
}

function makeParticle(i) {
  const a = random(360);
  const rad = random(35, 235) * sqrt(random());
  return {
    x: width * 0.5 + cos(a) * rad,
    y: height * 0.5 + sin(a) * rad,
    step: random(0.8, 1.6),
    life: floor(random(STEPS * 0.55, STEPS)),
    drift: random(-18, 18),
    alpha: random(10, 26),
    weight: random(0.45, 1.2)
  };
}

function dustWash() {
  noStroke();
  brush.noStroke();
  brush.noHatch();
  brush.fill("#d9d2c3", 12);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.45, 0.22, true);

  for (let i = 0; i < 7; i++) {
    const x = random(120, 480);
    const y = random(120, 480);
    const r = random(80, 150);
    brush.circle(x, y, r, 0.25);
  }
}

function drawSwarm() {
  for (let p of particles) {
    let x = p.x;
    let y = p.y;

    for (let s = 0; s < p.life; s++) {
      const nx = noise(x * 0.006, y * 0.006, 20);
      const ny = noise(x * 0.006 + 200, y * 0.006 + 200, 40);
      const ang = brushAngleAt(x, y) + map(nx, 0, 1, -16, 16) + p.drift * 0.05;
      const len = p.step + map(ny, 0, 1, -0.15, 0.55);

      const x2 = x + cos(ang) * len;
      const y2 = y + sin(ang) * len;

      const fade = map(s, 0, p.life - 1, 1, 0.2);
      const localAlpha = p.alpha * fade;

      brush.set("spray", color(70, 78, 88, localAlpha), p.weight);
      brush.line(x, y, x2, y2);

      if (random() < 0.22) {
        brush.set("spray", color(115, 125, 138, localAlpha * 0.75), p.weight * 0.8);
        brush.line(x + random(-2, 2), y + random(-2, 2), x2 + random(-2, 2), y2 + random(-2, 2));
      }

      if (random() < 0.08) {
        brush.set("charcoal", color(55, 60, 70, localAlpha * 0.35), 0.35);
        brush.line(x, y, x2, y2);
      }

      x = x2;
      y = y2;

      if (x < 20 || x > width - 20 || y < 20 || y > height - 20) break;
    }
  }
}

function veilContours() {
  brush.noField();

  for (let i = 0; i < 18; i++) {
    const pts = [];
    const cx = random(140, 460);
    const cy = random(140, 460);
    const rr = random(28, 82);
    const count = floor(random(6, 10));

    for (let j = 0; j < count; j++) {
      const a = map(j, 0, count, 0, 360) + random(-18, 18);
      const r = rr * random(0.65, 1.25);
      pts.push([cx + cos(a) * r, cy + sin(a) * r]);
    }

    brush.noStroke();
    brush.fill("#c9d3dc", random(8, 15));
    brush.fillBleed(0.12, "out");
    brush.fillTexture(0.35, 0.18, true);
    brush.polygon(pts);

    brush.set("2H", color(120, 132, 145, 18), 0.35);
    brush.noFill();
    brush.noHatch();
    brush.polygon(pts);
  }

  brush.field("ghostFlow");
  brush.set("HB", color(82, 86, 92, 14), 0.3);

  for (let i = 0; i < 45; i++) {
    const x = random(110, 490);
    const y = random(110, 490);
    brush.flowLine(x, y, random(18, 46), random(360));
  }
}

function brushAngleAt(x, y) {
  const dx = x - width * 0.5;
  const dy = y - height * 0.5;
  const distToCenter = sqrt(dx * dx + dy * dy);
  const swirl = atan2(dy, dx) + 90;
  const n1 = noise(x * 0.005, y * 0.005) * 180;
  const n2 = noise(x * 0.012 + 100, y * 0.012 + 100) * 120 - 60;
  const pull = map(distToCenter, 0, 420, 0, -35);
  return swirl * 0.55 + n1 * 0.35 + n2 * 0.4 + pull;
}