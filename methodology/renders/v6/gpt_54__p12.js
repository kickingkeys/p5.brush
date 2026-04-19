let particles = [];
let fieldName = "swarmFlow";
let palette = ["#2c3e73", "#465a96", "#6f88b8", "#9aa8c7"];
let cloudPalette = ["#c9d3e8", "#aebfdf", "#879dc6"];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
  randomSeed(42);
  noiseSeed(42);

  brush.addField(fieldName, (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let nx = col * 0.07;
        let ny = row * 0.07;
        let a =
          noise(nx, ny) * 220 +
          noise(nx * 0.5 + 40, ny * 0.5 + 90) * 140 -
          80 +
          18 * sin((col / max(1, field.length - 1)) * 360) +
          14 * cos((row / max(1, field[0].length - 1)) * 360);
        field[col][row] = a;
      }
    }
    return field;
  });

  for (let i = 0; i < 260; i++) {
    let side = floor(random(4));
    let x, y;

    if (side === 0) {
      x = random(width);
      y = random(-30, 40);
    } else if (side === 1) {
      x = random(width);
      y = random(height - 40, height + 30);
    } else if (side === 2) {
      x = random(-30, 40);
      y = random(height);
    } else {
      x = random(width - 40, width + 30);
      y = random(height);
    }

    particles.push({
      x: x,
      y: y,
      steps: floor(random(18, 42)),
      lenMin: random(5, 10),
      lenMax: random(12, 28),
      weight: random(0.35, 1.25),
      color: random(palette)
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field(fieldName);
  brush.wiggle(2);

  // soft atmospheric under-clouds
  brush.noStroke();
  brush.noHatch();
  brush.fillTexture(0.55, 0.28);

  for (let i = 0; i < 24; i++) {
    let cx = width * 0.5 + random(-150, 150);
    let cy = height * 0.5 + random(-120, 120);
    let r = random(45, 110);
    brush.fill(random(cloudPalette), random(20, 42));
    brush.fillBleed(random(0.28, 0.46), "out");
    brush.circle(cx, cy, r, random(0.15, 0.5));
  }
  brush.noFill();

  // ghostly spray trails
  for (let p of particles) {
    let pos = new brush.Position(p.x, p.y);
    let c = color(p.color);
    c.setAlpha(random(110, 170));

    brush.set("spray", c, p.weight);

    for (let s = 0; s < p.steps; s++) {
      let jitterX = random(-4, 4);
      let jitterY = random(-4, 4);
      let len = map(s, 0, p.steps - 1, p.lenMax, p.lenMin) * random(0.8, 1.2);

      brush.flowLine(pos.x + jitterX, pos.y + jitterY, len, random(-18, 18));

      let drift = map(noise(pos.x * 0.01, pos.y * 0.01), 0, 1, -22, 22);
      pos.moveTo(drift, len * 0.9, 5);

      if (pos.x < -40 || pos.x > width + 40 || pos.y < -40 || pos.y > height + 40) {
        break;
      }
    }
  }

  // denser cloud cores
  for (let i = 0; i < 70; i++) {
    let cx = width * 0.5 + randomGaussian() * 75;
    let cy = height * 0.5 + randomGaussian() * 65;
    let w = random(0.5, 1.7);
    let col = random(["#51699b", "#6f86b5", "#7b90bb", "#3a507e"]);
    brush.set("spray", col, w);
    brush.flowLine(cx, cy, random(16, 36), random(360));
  }

  // a few faint structural traces
  brush.noField();
  brush.set("2H", "#8e96a6", 0.45);
  for (let i = 0; i < 18; i++) {
    let x = width * 0.5 + randomGaussian() * 85;
    let y = height * 0.5 + randomGaussian() * 70;
    brush.spline(
      [
        [x, y, 0.4],
        [x + random(-30, 30), y + random(-18, 18), 0.35],
        [x + random(-55, 55), y + random(-22, 22), 0.25]
      ],
      0.35
    );
  }

  noLoop();
}