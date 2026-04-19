let particles = [];
const PALETTE = ["#21304a", "#324f7a", "#5f7ea8", "#8aa0bf", "#d7dde6"];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noiseSeed(42);
  randomSeed(42);
  brush.scaleBrushes(3);

  brush.addField("ghostFlow", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let nx = col * 0.075;
        let ny = row * 0.075;
        let a =
          noise(nx, ny) * 220 +
          sin((col / field.length) * 180 + t * 20) * 35 +
          cos((row / field[0].length) * 180 - t * 15) * 25;
        field[col][row] = a;
      }
    }
    return field;
  });

  for (let i = 0; i < 170; i++) {
    particles.push({
      x: random(70, 530),
      y: random(70, 530),
      len: random(18, 42),
      steps: int(random(8, 16)),
      spread: random(0.35, 1.4),
      color: random(PALETTE)
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostFlow");
  brush.refreshField(0);
  brush.wiggle(2);

  for (let pass = 0; pass < 4; pass++) {
    for (let p of particles) {
      let px = p.x + random(-10, 10);
      let py = p.y + random(-10, 10);
      let count = p.steps + pass * 2;
      let weight = map(pass, 0, 3, 1.9, 0.55);
      let segLen = p.len * map(pass, 0, 3, 1.0, 0.45);

      brush.set("spray", p.color, weight);

      for (let i = 0; i < count; i++) {
        let ox = randomGaussian() * (10 + pass * 8) * p.spread;
        let oy = randomGaussian() * (10 + pass * 8) * p.spread;
        let l = segLen * random(0.6, 1.15);
        let dir = random(360);
        brush.flowLine(px + ox, py + oy, l, dir);
      }
    }
  }

  brush.noField();

  brush.set("charcoal", "#1e2430", 0.55);
  for (let i = 0; i < 24; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    let pts = [];
    let steps = int(random(4, 7));
    for (let j = 0; j < steps; j++) {
      pts.push([
        x + j * random(12, 24),
        y + random(-18, 18),
        random(0.35, 0.9)
      ]);
    }
    brush.spline(pts, 0.45);
  }

  brush.set("2H", "#9ea7b3", 0.35);
  for (let i = 0; i < 160; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let d = random(2, 8);
    brush.line(x, y, x + d, y + random(-d, d));
  }

  noLoop();
}