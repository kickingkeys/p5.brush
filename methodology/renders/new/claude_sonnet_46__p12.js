let particles = [];
let numParticles = 120;
let fieldName = "waves";

function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);

  randomSeed(42);
  noiseSeed(99);

  brush.field(fieldName);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(600),
      y: random(600),
      speed: random(2, 6),
      life: random(60, 160),
      age: 0,
      hue: random(1),
      size: random(0.3, 1.2),
    });
  }

  translate(-width / 2, -height / 2);

  for (let step = 0; step < 200; step++) {
    brush.refreshField(step * 0.04);

    for (let p of particles) {
      if (p.age >= p.life) continue;

      let t = p.age / p.life;
      let opacity = sin(PI * t) * 180 * (1 - t * 0.4);
      opacity = constrain(opacity, 0, 255);

      let palette = getPaletteColor(p.hue, t);
      let w = p.size * (0.5 + sin(PI * t) * 0.8);

      brush.set("spray", palette, w);
      brush.noFill();
      brush.noHatch();

      let dir = noise(p.x * 0.004, p.y * 0.004, step * 0.015) * TWO_PI * 2;
      let len = p.speed * (0.6 + noise(p.x * 0.01, p.y * 0.01) * 1.2);

      brush.flowLine(p.x, p.y, len, dir);

      let dx = cos(dir) * p.speed;
      let dy = sin(dir) * p.speed;
      p.x += dx;
      p.y += dy;
      p.age++;

      if (p.x < -20 || p.x > 620 || p.y < -20 || p.y > 620) {
        p.age = p.life;
      }
    }
  }

  drawGhostLayers();

  brush.noField();
  noLoop();
}

function drawGhostLayers() {
  let clusters = [
    { cx: 150, cy: 180, r: 90, col: "#3a2f6e", brush: "spray" },
    { cx: 420, cy: 140, r: 70, col: "#1a4a6e", brush: "spray" },
    { cx: 300, cy: 320, r: 110, col: "#5e2a4a", brush: "spray" },
    { cx: 480, cy: 430, r: 80, col: "#2a5e3e", brush: "spray" },
    { cx: 100, cy: 460, r: 75, col: "#6e3a1a", brush: "spray" },
  ];

  for (let c of clusters) {
    for (let pass = 0; pass < 4; pass++) {
      let scaleFactor = 1 - pass * 0.18;
      let op = 30 + pass * 15;
      let w = 1.8 - pass * 0.3;
      brush.set(c.brush, c.col, w);
      for (let i = 0; i < 60; i++) {
        let angle = random(TWO_PI);
        let rad = random(c.r * scaleFactor * 0.3, c.r * scaleFactor);
        let px = c.cx + cos(angle) * rad;
        let py = c.cy + sin(angle) * rad;
        let len = random(4, 14);
        let dir = angle + random(-0.5, 0.5);
        brush.flowLine(px, py, len, dir);
      }
    }
  }
}

function getPaletteColor(hue, t) {
  let palettes = [
    ["#3a2f6e", "#6a4f9e", "#9a7fce"],
    ["#1a4a6e", "#2a7aae", "#5aaaee"],
    ["#5e2a4a", "#9e5a7a", "#ce8aaa"],
    ["#2a5e3e", "#4a9e6e", "#7acece"],
    ["#6e3a1a", "#ae6a3a", "#de9a6a"],
    ["#4a4a1a", "#8a8a3a", "#baba6a"],
    ["#1a3a5e", "#3a6a9e", "#6aaade"],
  ];
  let idx = floor(hue * palettes.length);
  let pal = palettes[idx % palettes.length];
  if (t < 0.33) return pal[0];
  if (t < 0.66) return pal[1];
  return pal[2];
}

function draw() {
  translate(-width / 2, -height / 2);
  noLoop();
}