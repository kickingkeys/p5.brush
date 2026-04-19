let particles = [];
const NUM_PARTICLES = 220;
const STEPS = 26;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);

  randomSeed(11);
  noiseSeed(11);

  brush.addField("ghostFlow", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let nx = col * 0.085;
        let ny = row * 0.085;
        let a =
          noise(nx, ny) * 220 +
          sin(col * 7 + t * 18) * 18 +
          cos(row * 9 - t * 13) * 12;
        field[col][row] = a;
      }
    }
    return field;
  });

  for (let i = 0; i < NUM_PARTICLES; i++) {
    let ringA = random(360);
    let ringR = random(30, 210) * random(0.35, 1);
    let cx = 300 + cos(ringA) * ringR * 0.9;
    let cy = 300 + sin(ringA) * ringR * 0.65;

    particles.push({
      x: cx + random(-30, 30),
      y: cy + random(-30, 30),
      len: random(10, 28),
      steps: floor(random(18, STEPS)),
      weight: random(0.45, 1.9),
      col: random([
        "#b7c6d8",
        "#9eb1c8",
        "#c7d1df",
        "#d3c9d8",
        "#a3b8cf",
        "#8ea5bd",
        "#c1d6d0"
      ])
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostFlow");
  brush.refreshField(0.6);
  brush.wiggle(2);

  noStroke();
  fill(255, 10);
  rect(0, 0, width, height);

  // Soft atmospheric under-clouds
  for (let i = 0; i < 24; i++) {
    let x = random(120, 480);
    let y = random(120, 470);
    let r = random(30, 95);
    brush.noStroke();
    brush.fill(random(["#d7dde7", "#cfd7e2", "#d8d0db", "#c8d6d0"]), random(18, 34));
    brush.fillTexture(0.5, 0.22);
    brush.fillBleed(random(0.28, 0.45), "out");
    brush.circle(x, y, r, 0.3);
  }
  brush.noFill();

  // Main swarm trails
  for (let p of particles) {
    let x = p.x;
    let y = p.y;

    for (let s = 0; s < p.steps; s++) {
      let drift = map(s, 0, p.steps - 1, 1, 0.35);
      let localWeight = p.weight * drift;

      brush.set("spray", p.col, localWeight);
      brush.flowLine(
        x + random(-3, 3),
        y + random(-3, 3),
        p.len * drift,
        random(360)
      );

      let pos = new brush.Position(x, y);
      pos.moveTo(random(-15, 15), p.len * 0.95, 6);
      x = pos.x + random(-2, 2);
      y = pos.y + random(-2, 2);

      if (x < 30 || x > 570 || y < 30 || y > 570) break;
    }
  }

  // Denser mist knots
  for (let i = 0; i < 12; i++) {
    let cx = random(160, 440);
    let cy = random(150, 430);

    for (let j = 0; j < 22; j++) {
      brush.set("spray", random(["#a8bad0", "#d0d8e2", "#b8c8d8", "#cfc5d4"]), random(0.5, 1.4));
      brush.flowLine(
        cx + random(-24, 24),
        cy + random(-24, 24),
        random(8, 22),
        random(360)
      );
    }
  }

  // A few charcoal gesture traces to hint at motion
  brush.set("charcoal", "#8d98a6", 0.4);
  for (let i = 0; i < 10; i++) {
    let pts = [];
    let x = random(130, 470);
    let y = random(130, 470);
    for (let k = 0; k < 4; k++) {
      pts.push([x + random(-28, 28), y + random(-28, 28), random(0.3, 0.8)]);
      x += random(-35, 35);
      y += random(-35, 35);
    }
    brush.spline(pts, 0.45);
  }

  brush.noField();
  noLoop();
}