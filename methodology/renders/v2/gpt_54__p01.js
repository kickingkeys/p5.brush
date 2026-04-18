function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  const palette = [
    "#c98f98", // dusty pink
    "#b87986",
    "#d7a27f", // ochre rose
    "#c7915e", // ochre
    "#b87a4b",
    "#d8b39f"  // pale clay
  ];

  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  brush.fillTexture(0.88, 0.52);

  // soft background blooms
  for (let i = 0; i < 14; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let r = random(70, 135);
    let c = random(palette);

    brush.wash(c, random(70, 105));
    brush.fill(c, random(95, 135));
    brush.fillBleed(random(0.45, 0.7), "out");
    organicBloom(x, y, r, random(28, 40), random(0.4, 0.7));
    brush.noWash();
  }

  // overlapping main blooms
  for (let i = 0; i < 11; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    let r = random(85, 150);
    let c = random(palette);

    // base saturation
    brush.wash(c, random(90, 125));
    brush.fill(c, random(120, 165));
    brush.fillBleed(random(0.32, 0.5), "out");
    organicBloom(x, y, r, random(30, 42), random(0.35, 0.65));
    brush.noWash();

    // inner dried-puddle layer
    brush.fill(lerpColor(color(c), color("#9a5c4e"), 0.25), random(55, 95));
    brush.fillBleed(random(0.3, 0.45), "in");
    organicBloom(x, y, r * random(0.68, 0.83), random(26, 36), random(0.25, 0.55));

    // soft offset stain
    brush.fill(lerpColor(color(c), color("#f0d8c8"), 0.18), random(35, 70));
    brush.fillBleed(random(0.2, 0.38), "out");
    organicBloom(
      x + random(-18, 18),
      y + random(-18, 18),
      r * random(0.45, 0.62),
      random(22, 30),
      random(0.2, 0.45)
    );
  }

  // a few contour strokes to suggest pooled pigment
  brush.noFill();
  brush.noWash();
  brush.set("cpencil", "#8e5e63", 0.38);

  for (let i = 0; i < 18; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    let rr = random(28, 72);
    let pts = [];
    let n = 12;
    for (let j = 0; j < n; j++) {
      let a = map(j, 0, n, 0, 360);
      let rad = rr + random(-10, 10);
      pts.push([x + cos(a) * rad, y + sin(a) * rad]);
    }
    brush.spline(pts, 0.35);
  }

  noLoop();
}

function organicBloom(cx, cy, radius, steps, jitter) {
  brush.beginShape(0.5);
  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps, 0, 360);
    let n = noise(
      cx * 0.006 + cos(a) * 0.9,
      cy * 0.006 + sin(a) * 0.9,
      i * 0.08
    );
    let rr = radius * (0.82 + n * jitter) + random(-radius * 0.06, radius * 0.06);
    let x = cx + cos(a) * rr;
    let y = cy + sin(a) * rr;
    brush.vertex(x, y);
  }
  brush.endShape(true);
}