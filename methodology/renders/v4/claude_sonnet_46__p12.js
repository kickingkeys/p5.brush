let W = 600, H = 600;
let particles = [];
let NUM_PARTICLES = 120;

function setup() {
  createCanvas(W, H, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);

  background("#fffaf3");

  brush.addField("ghostFlow", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let nx = c * 0.07;
        let ny = r * 0.07;
        field[c][r] = noise(nx, ny) * 360;
      }
    }
    return field;
  });

  brush.field("ghostFlow");
  brush.wiggle(2);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      x: random(40, 560),
      y: random(40, 560),
      col: random([
        "#2a3860",
        "#3b2a60",
        "#1a4a5a",
        "#4a2a40",
        "#1e3a2a",
        "#5a3a1a",
        "#2e2e4a"
      ]),
      weight: random(1.2, 3.2),
      trailLen: random(30, 75),
      alpha: random(0.3, 0.85)
    });
  }

  translate(-width / 2, -height / 2);

  // Draw ghostly cloud formations from particle trails
  for (let p of particles) {
    let w = p.weight;
    let baseColor = p.col;

    // Primary trail - main spray cloud
    brush.set("spray", baseColor, w);
    brush.flowLine(p.x, p.y, p.trailLen, 0);

    // Secondary wisp - offset slightly, lighter weight
    brush.set("spray", baseColor, w * 0.55);
    brush.flowLine(
      p.x + random(-8, 8),
      p.y + random(-8, 8),
      p.trailLen * 0.65,
      random(20, 60)
    );

    // Tertiary ghost - very faint outer halo
    if (random() > 0.45) {
      brush.set("spray", baseColor, w * 0.28);
      brush.flowLine(
        p.x + random(-14, 14),
        p.y + random(-14, 14),
        p.trailLen * 0.4,
        random(-40, 40)
      );
    }
  }

  // Add a second pass of finer particles for depth
  for (let i = 0; i < 60; i++) {
    let x = random(30, 570);
    let y = random(30, 570);
    let col = random([
      "#6a5a80",
      "#507090",
      "#708050",
      "#805060",
      "#506080"
    ]);
    brush.set("spray", col, random(0.4, 1.1));
    brush.flowLine(x, y, random(15, 40), random(360));
  }

  // Scattered fine dust particles - very small, many, atmospheric
  for (let i = 0; i < 200; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let col = random([
      "#1a2a3a",
      "#3a2a4a",
      "#2a3a2a",
      "#4a3a2a"
    ]);
    brush.set("spray", col, random(0.18, 0.55));
    brush.flowLine(x, y, random(5, 18), random(360));
  }

  brush.noField();

  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2);
}