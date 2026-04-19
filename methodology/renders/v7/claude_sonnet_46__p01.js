function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const palette = [
    "#c97a7a",
    "#d4856e",
    "#c8a07a",
    "#b87a6a",
    "#d4a07a",
    "#c89070",
    "#b86a5a",
    "#d4906a",
    "#c8b090",
    "#b89070"
  ];

  brush.noStroke();
  brush.fillTexture(0.65, 0.35);

  for (let i = 0; i < 28; i++) {
    const x = random(30, 570);
    const y = random(30, 570);
    const r = random(40, 130);
    const col = random(palette);
    const opacity = random(28, 62);
    const bleed = random(0.35, 0.62);

    brush.fill(col, opacity);
    brush.fillBleed(bleed, "out");

    const numPts = floor(random(22, 38));
    const pts = [];
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r * (0.82 + noise(cos(a) * 0.4 + x * 0.01, sin(a) * 0.4 + y * 0.01) * 0.36);
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }

    brush.beginShape(0.5);
    for (const p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  brush.fillTexture(0.55, 0.28);

  for (let i = 0; i < 18; i++) {
    const x = random(60, 540);
    const y = random(60, 540);
    const r = random(20, 65);
    const col = random(palette);
    const opacity = random(18, 45);
    const bleed = random(0.42, 0.68);

    brush.fill(col, opacity);
    brush.fillBleed(bleed, "out");

    const numPts = floor(random(18, 30));
    const pts = [];
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r * (0.78 + noise(cos(a) * 0.5 + x * 0.012, sin(a) * 0.5 + y * 0.012) * 0.44);
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }

    brush.beginShape(0.52);
    for (const p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  brush.fillTexture(0.75, 0.45);

  for (let i = 0; i < 10; i++) {
    const x = random(80, 520);
    const y = random(80, 520);
    const r = random(15, 40);
    const col = random(["#b86060", "#c87050", "#d4905a", "#b87848", "#c86848"]);
    const opacity = random(38, 72);
    const bleed = random(0.25, 0.45);

    brush.fill(col, opacity);
    brush.fillBleed(bleed, "in");

    const numPts = floor(random(16, 26));
    const pts = [];
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r * (0.85 + noise(cos(a) * 0.6 + x * 0.015, sin(a) * 0.6 + y * 0.015) * 0.3);
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }

    brush.beginShape(0.48);
    for (const p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  brush.noFill();

  noLoop();
}