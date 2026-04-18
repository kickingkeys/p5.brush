let particles = [];
let numParticles = 120;
let steps = 80;

function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
  angleMode(DEGREES);

  brush.field("waves");

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      hue: random([
        color(180, 160, 210, 60),
        color(120, 170, 200, 55),
        color(210, 140, 160, 50),
        color(160, 200, 180, 55),
        color(230, 200, 140, 50)
      ]),
      size: random(0.3, 1.2),
      speed: random(2.5, 6)
    });
  }

  translate(-width / 2, -height / 2);

  for (let p of particles) {
    let x = p.x;
    let y = p.y;
    let c = p.hue;

    brush.set("spray", c, p.size);

    for (let s = 0; s < steps; s++) {
      let col = floor(map(x, 0, width, 0, 20));
      let row = floor(map(y, 0, height, 0, 20));
      col = constrain(col, 0, 19);
      row = constrain(row, 0, 19);

      let fieldAngle = noise(x * 0.005, y * 0.005, s * 0.01) * 360;
      let dx = cos(fieldAngle) * p.speed;
      let dy = sin(fieldAngle) * p.speed;

      let nx = x + dx;
      let ny = y + dy;

      brush.line(x, y, nx, ny);

      x = nx;
      y = ny;

      if (x < 0 || x > width || y < 0 || y > height) break;
    }
  }

  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2);
}