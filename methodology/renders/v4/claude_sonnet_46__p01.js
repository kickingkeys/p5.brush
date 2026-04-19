function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const palette = [
    "#c97b84",
    "#d4937a",
    "#b8636e",
    "#c9a87a",
    "#d4b896",
    "#b87a6e",
    "#d4a882",
    "#c98870",
    "#b8907a",
    "#d4c4a0"
  ];

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  const bloomCount = 28;

  for (let i = 0; i < bloomCount; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const r = random(45, 130);
    const col = random(palette);
    const op = random(28, 62);
    const bleed = random(0.35, 0.62);

    brush.fill(col, op);
    brush.fillBleed(bleed, "out");

    const pts = [];
    const numPts = floor(random(22, 38));
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r + noise(cos(a) * 0.08 + i * 10, sin(a) * 0.08 + i * 10) * r * 0.32;
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }

    brush.beginShape(0.5);
    for (const p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
  }

  const accentCount = 14;

  for (let i = 0; i < accentCount; i++) {
    const x = random(60, 540);
    const y = random(60, 540);
    const r = random(20, 60);
    const col = random(palette);
    const op = random(18, 40);
    const bleed = random(0.45, 0.70);

    brush.fill(col, op);
    brush.fillBleed(bleed, "out");
    brush.fillTexture(0.45, 0.25);

    const pts = [];
    const numPts = floor(random(18, 30));
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r + noise(cos(a) * 0.12 + i * 7 + 99, sin(a) * 0.12 + i * 7 + 99) * r * 0.38;
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }

    brush.beginShape(0.5);
    for (const p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
  }

  brush.noFill();

  noLoop();
}