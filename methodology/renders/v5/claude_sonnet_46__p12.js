let W = 600, H = 600;
let particles = [];
let NUM_PARTICLES = 80;

function setup() {
  createCanvas(W, H, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");

  brush.addField("ghostFlow", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let nx = c * 0.08;
        let ny = r * 0.08;
        field[c][r] = noise(nx, ny, t * 0.3) * 360;
      }
    }
    return field;
  });

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      x: random(40, W - 40),
      y: random(40, H - 40),
      speed: random(18, 45),
      weight: random(0.6, 2.8),
      trailLen: random(25, 65),
      hue: random(100)
    });
  }
}

function draw() {
  translate(-width / 2, -height / 2);

  let palettes = [
    ["#1a2744", "#2a3860", "#3a4f80"],
    ["#2c1a44", "#4a2a6a", "#6a3a8a"],
    ["#1a3a44", "#2a5a60", "#3a7a80"],
    ["#3a2a14", "#5a4a24", "#7a6a3a"]
  ];

  brush.field("ghostFlow");
  brush.wiggle(2);

  let cloudGroups = [
    { cx: random(120, 200), cy: random(100, 200), count: 18, palette: palettes[0] },
    { cx: random(350, 480), cy: random(80, 180), count: 15, palette: palettes[1] },
    { cx: random(80, 180), cy: random(350, 480), count: 16, palette: palettes[2] },
    { cx: random(380, 500), cy: random(350, 500), count: 14, palette: palettes[3] },
    { cx: random(240, 360), cy: random(220, 380), count: 20, palette: palettes[0] }
  ];

  for (let g = 0; g < cloudGroups.length; g++) {
    let grp = cloudGroups[g];

    for (let pass = 0; pass < 3; pass++) {
      let col = grp.palette[pass];
      let w, opacity;
      if (pass === 0) {
        w = random(2.5, 3.5);
        opacity = random(30, 55);
      } else if (pass === 1) {
        w = random(1.4, 2.2);
        opacity = random(55, 80);
      } else {
        w = random(0.5, 1.0);
        opacity = random(80, 110);
      }

      let count = grp.count + floor(random(-3, 4));
      let spread = 80 - pass * 18;

      for (let i = 0; i < count; i++) {
        let px = grp.cx + random(-spread, spread);
        let py = grp.cy + random(-spread, spread);
        let len = random(20, 55) - pass * 6;

        brush.set("spray", col, w);
        brush.flowLine(px, py, len, 0);
      }
    }
  }

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let pIdx = floor(i / (NUM_PARTICLES / cloudGroups.length));
    pIdx = constrain(pIdx, 0, cloudGroups.length - 1);
    let grp = cloudGroups[pIdx];

    let col, w;
    let t = i / NUM_PARTICLES;
    if (t < 0.33) {
      col = grp.palette[0];
      w = p.weight * 1.2;
    } else if (t < 0.66) {
      col = grp.palette[1];
      w = p.weight;
    } else {
      col = grp.palette[2];
      w = p.weight * 0.7;
    }

    brush.set("spray", col, w);
    brush.flowLine(p.x, p.y, p.trailLen, random(360));
  }

  brush.set("spray", "#c8d8e8", 0.4);
  for (let i = 0; i < 30; i++) {
    brush.flowLine(random(W), random(H), random(8, 20), random(360));
  }

  brush.noField();

  brush.set("charcoal", "#1a1a2a", 0.5);
  brush.wiggle(3);
  for (let g = 0; g < cloudGroups.length; g++) {
    let grp = cloudGroups[g];
    let numEdge = floor(random(3, 7));
    for (let i = 0; i < numEdge; i++) {
      let ex = grp.cx + random(-60, 60);
      let ey = grp.cy + random(-60, 60);
      let ex2 = ex + random(-30, 30);
      let ey2 = ey + random(-30, 30);
      brush.line(ex, ey, ex2, ey2);
    }
  }

  noLoop();
}