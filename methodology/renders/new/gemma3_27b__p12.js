function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let numParticles = 100;
  let particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(-200, 200),
      y: random(-200, 200),
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }

  brush.field("waves");
  brush.set("spray", "#a8d0e6", 0.5);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    brush.flowLine(p.x, p.y, 10, atan2(p.vy, p.vx));
    p.x += p.vx;
    p.y += p.vy;

    if (p.x > 300) p.x = -300;
    if (p.x < -300) p.x = 300;
    if (p.y > 300) p.y = -300;
    if (p.y < -300) p.y = 300;
  }

  brush.noField();

  noLoop();
}