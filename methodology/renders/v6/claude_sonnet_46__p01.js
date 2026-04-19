function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  const palette = [
    "#c9847a",
    "#d4956a",
    "#b87a6e",
    "#c8a87a",
    "#d4b08a",
    "#b86a5a",
    "#c89060",
    "#d4a07a",
    "#a87060",
    "#cc9070"
  ];

  brush.noStroke();
  brush.fillTexture(0.65, 0.35);

  // Layer 1 — large background blooms, very low opacity, wide bleed
  for (let i = 0; i < 18; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const r = random(60, 130);
    const col = random(palette);
    brush.fill(col, random(28, 48));
    brush.fillBleed(random(0.45, 0.65), "out");
    const pts = [];
    const numPts = floor(random(28, 40));
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r + noise(cos(a) * 0.08 + i, sin(a) * 0.08 + i) * r * 0.35;
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }
    brush.beginShape(0.5);
    for (const p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  brush.noFill();

  // Layer 2 — mid-sized blooms, slightly more opaque
  brush.fillTexture(0.75, 0.45);
  for (let i = 0; i < 22; i++) {
    const x = random(30, 570);
    const y = random(30, 570);
    const r = random(35, 90);
    const col = random(palette);
    brush.fill(col, random(38, 62));
    brush.fillBleed(random(0.38, 0.58), "out");
    const pts = [];
    const numPts = floor(random(24, 36));
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r + noise(cos(a) * 0.1 + i * 1.3, sin(a) * 0.1 + i * 1.3) * r * 0.4;
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }
    brush.beginShape(0.5);
    for (const p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  brush.noFill();

  // Layer 3 — small accent blooms, richer color, tighter bleed
  brush.fillTexture(0.8, 0.5);
  for (let i = 0; i < 26; i++) {
    const x = random(20, 580);
    const y = random(20, 580);
    const r = random(18, 55);
    const col = random(palette);
    brush.fill(col, random(45, 72));
    brush.fillBleed(random(0.28, 0.45), "out");
    const pts = [];
    const numPts = floor(random(20, 32));
    for (let j = 0; j < numPts; j++) {
      const a = (j / numPts) * TWO_PI;
      const nr = r + noise(cos(a) * 0.12 + i * 2.1, sin(a) * 0.12 + i * 2.1) * r * 0.38;
      pts.push([x + cos(a) * nr, y + sin(a) * nr]);
    }
    brush.beginShape(0.52);
    for (const p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  brush.noFill();

  // Layer 4 — tiny concentrated blooms for focal density clusters
  brush.fillTexture(0.85, 0.55);
  for (let i = 0; i < 14; i++) {
    const cx = random(80, 520);
    const cy = random(80, 520);
    for (let k = 0; k < 3; k++) {
      const x = cx + random(-30, 30);
      const y = cy + random(-30, 30);
      const r = random(10, 30);
      const col = random(palette);
      brush.fill(col, random(55, 85));
      brush.fillBleed(random(0.22, 0.38), "out");
      const pts = [];
      const numPts = floor(random(18, 28));
      for (let j = 0; j < numPts; j++) {
        const a = (j / numPts) * TWO_PI;
        const nr = r + noise(cos(a) * 0.15 + i * 3.7 + k, sin(a) * 0.15 + i * 3.7 + k) * r * 0.42;
        pts.push([x + cos(a) * nr, y + sin(a) * nr]);
      }
      brush.beginShape(0.48);
      for (const p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(true);
    }
  }

  brush.noFill();

  noLoop();
}