let W = 600, H = 600;
let particles = [];
let NUM_PARTICLES = 120;

function setup() {
  createCanvas(W, H, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);

  brush.addField("swarmFlow", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.06, r * 0.06, t * 0.3) * 360;
      }
    }
    return field;
  });

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      x: random(W),
      y: random(H),
      col: random([
        "#1a2a4a", "#2a3860", "#3b4f7a", "#5c6fa0",
        "#7a8fbb", "#a0b0d0", "#c0cce0", "#e8eef8",
        "#2a1a3a", "#4a3060", "#8a70a0"
      ]),
      weight: random(1.5, 3.5),
      len: random(25, 65),
      passes: floor(random(2, 6))
    });
  }

  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("swarmFlow");
  brush.wiggle(2);

  for (let p of particles) {
    for (let pass = 0; pass < p.passes; pass++) {
      let w = p.weight * (1 - pass * 0.18);
      let ox = random(-6, 6);
      let oy = random(-6, 6);
      brush.set("spray", p.col, w);
      brush.flowLine(p.x + ox, p.y + oy, p.len * (1 - pass * 0.12), 0);
    }
  }

  let ghostColors = [
    "#0a0f2a", "#1a2040", "#2a3058",
    "#3a4070", "#8090b8", "#b0bcd8"
  ];

  for (let g = 0; g < 60; g++) {
    let gx = random(W);
    let gy = random(H);
    let gc = random(ghostColors);
    let gw = random(2.5, 4.0);
    let gl = random(40, 90);
    brush.set("spray", gc, gw);
    brush.flowLine(gx, gy, gl, random(360));
    brush.set("spray", gc, gw * 0.5);
    brush.flowLine(gx + random(-8, 8), gy + random(-8, 8), gl * 0.6, random(360));
  }

  for (let s = 0; s < 40; s++) {
    let sx = random(W);
    let sy = random(H);
    brush.set("spray", "#e8eef8", random(0.5, 1.2));
    brush.flowLine(sx, sy, random(15, 35), random(360));
  }

  brush.noField();

  for (let a = 0; a < 25; a++) {
    let ax = random(W);
    let ay = random(H);
    let ac = random(["#0d1530", "#1a2545", "#2b3a60"]);
    brush.set("charcoal", ac, random(0.4, 0.9));
    brush.flowLine(ax, ay, random(20, 50), random(360));
  }

  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2);
}