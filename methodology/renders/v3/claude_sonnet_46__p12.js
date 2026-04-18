let W = 600, H = 600;
let particles = [];
let numParticles = 120;

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

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(40, W - 40),
      y: random(40, H - 40),
      trailLen: random(35, 90),
      dir: random(360),
      size: random(0.8, 3.2),
      colorIdx: floor(random(5)),
    });
  }

  background("#fffaf3");
  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2);

  brush.field("swarmFlow");
  brush.wiggle(2);

  let palettes = [
    ["#1a2a4a", "#2a3860", "#1c3255", "#0d1f3c"],
    ["#2a1a4a", "#3d2060", "#4a1a55", "#2d0d3c"],
    ["#1a3a2a", "#1c5032", "#0d3c1f", "#163328"],
    ["#3a2a1a", "#604020", "#553018", "#3c200d"],
    ["#3a1a2a", "#601c30", "#550d1f", "#3c0d18"],
  ];

  // Draw ghost cloud formations — atmospheric heavy passes first
  for (let pass = 0; pass < 3; pass++) {
    let passWeightMult = [3.2, 2.0, 1.0][pass];
    let passCount = [60, 90, 110][pass];
    let passOpacityShift = [0, 0, 0][pass];

    for (let i = 0; i < passCount; i++) {
      let p = particles[i % numParticles];
      let col = palettes[p.colorIdx][pass % palettes[p.colorIdx].length];

      brush.set("spray", col, p.size * passWeightMult);
      brush.flowLine(
        p.x + random(-20, 20) * (pass + 1) * 0.4,
        p.y + random(-20, 20) * (pass + 1) * 0.4,
        p.trailLen * (1.0 - pass * 0.2),
        p.dir
      );
    }
  }

  // Mid-density pass — tighter clusters
  for (let i = 0; i < numParticles; i++) {
    let p = particles[i];
    let col = palettes[p.colorIdx][1];
    brush.set("spray", col, p.size * 1.4);
    brush.flowLine(
      p.x + random(-8, 8),
      p.y + random(-8, 8),
      p.trailLen * 0.65,
      p.dir + random(-15, 15)
    );
  }

  // Fine detail pass — small tight spray cores
  for (let i = 0; i < numParticles; i++) {
    let p = particles[i];
    let col = palettes[p.colorIdx][0];
    brush.set("spray", col, p.size * 0.6);
    brush.flowLine(
      p.x + random(-4, 4),
      p.y + random(-4, 4),
      p.trailLen * 0.3,
      p.dir + random(-8, 8)
    );
  }

  // Highlight ghost wisps — very light, large spread
  let wispColors = ["#c8d8f0", "#d0c8f0", "#c8f0d8", "#f0d8c8", "#f0c8d8"];
  for (let i = 0; i < 50; i++) {
    let p = particles[i % numParticles];
    brush.set("spray", wispColors[p.colorIdx], p.size * 0.35);
    brush.flowLine(
      p.x + random(-30, 30),
      p.y + random(-30, 30),
      p.trailLen * 0.4,
      p.dir + random(-25, 25)
    );
  }

  // Structural charcoal skeleton anchors — faint gestural lines
  brush.noField();
  brush.wiggle(3);
  let anchorPoints = [];
  for (let i = 0; i < 8; i++) {
    anchorPoints.push([random(80, W - 80), random(80, H - 80)]);
  }
  for (let i = 0; i < anchorPoints.length - 1; i++) {
    let a = anchorPoints[i];
    let b = anchorPoints[i + 1];
    brush.set("charcoal", "#1a1a2a", 0.4);
    brush.spline(
      [
        [a[0], a[1], 0.3],
        [lerp(a[0], b[0], 0.33) + random(-20, 20), lerp(a[1], b[1], 0.33) + random(-20, 20), 0.6],
        [lerp(a[0], b[0], 0.66) + random(-20, 20), lerp(a[1], b[1], 0.66) + random(-20, 20), 0.8],
        [b[0], b[1], 0.3],
      ],
      0.4
    );
  }

  brush.noField();
}