function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const palette = [
    "#c97b84",
    "#d4917a",
    "#b5606a",
    "#c8a87e",
    "#b8896e",
    "#d4b08c",
    "#a85c6a",
    "#cc9966",
    "#c07060",
    "#d4a070"
  ];

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  const blooms = [];
  for (let i = 0; i < 28; i++) {
    blooms.push({
      x: random(40, 560),
      y: random(40, 560),
      r: random(50, 130),
      color: random(palette),
      opacity: random(28, 62),
      bleed: random(0.38, 0.62)
    });
  }

  for (const b of blooms) {
    brush.fill(b.color, b.opacity);
    brush.fillBleed(b.bleed, "out");
    brush.circle(b.x, b.y, b.r);
  }

  brush.fillTexture(0.65, 0.4);

  const accents = [];
  for (let i = 0; i < 14; i++) {
    accents.push({
      x: random(60, 540),
      y: random(60, 540),
      r: random(25, 70),
      color: random(palette),
      opacity: random(18, 42),
      bleed: random(0.45, 0.68)
    });
  }

  for (const a of accents) {
    brush.fill(a.color, a.opacity);
    brush.fillBleed(a.bleed, "out");
    brush.circle(a.x, a.y, a.r);
  }

  brush.fillTexture(0.45, 0.2);

  const mists = [];
  for (let i = 0; i < 10; i++) {
    mists.push({
      x: random(80, 520),
      y: random(80, 520),
      r: random(70, 160),
      color: random(palette),
      opacity: random(10, 22),
      bleed: random(0.52, 0.72)
    });
  }

  for (const m of mists) {
    brush.fill(m.color, m.opacity);
    brush.fillBleed(m.bleed, "out");
    brush.circle(m.x, m.y, m.r);
  }

  brush.noFill();

  noLoop();
}