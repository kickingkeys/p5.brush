function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  const blooms = [
    { cx: 160, cy: 180, r: 110, col1: "#c97b8a", col2: "#d4a0a8", col3: "#e8c4c4", shadow: "#a85060" },
    { cx: 340, cy: 140, r: 90,  col1: "#c8843a", col2: "#d9a060", col3: "#e8c090", shadow: "#a06020" },
    { cx: 480, cy: 260, r: 100, col1: "#c47080", col2: "#d49090", col3: "#e8b8b8", shadow: "#9a4055" },
    { cx: 120, cy: 380, r: 85,  col1: "#c09040", col2: "#d4aa60", col3: "#e8c888", shadow: "#906820" },
    { cx: 300, cy: 340, r: 120, col1: "#b86878", col2: "#cc8888", col3: "#ddb0a8", shadow: "#8a3848" },
    { cx: 460, cy: 440, r: 95,  col1: "#c47840", col2: "#d49858", col3: "#e8bc80", shadow: "#9a5520" },
    { cx: 200, cy: 500, r: 80,  col1: "#c08090", col2: "#d0a0a0", col3: "#e4c0c0", shadow: "#904858" },
    { cx: 400, cy: 520, r: 75,  col1: "#c8903a", col2: "#d8ac60", col3: "#eacc90", shadow: "#a06820" },
    { cx: 70,  cy: 240, r: 70,  col1: "#b87080", col2: "#cc9090", col3: "#ddb0b0", shadow: "#884050" },
    { cx: 540, cy: 140, r: 65,  col1: "#c87840", col2: "#d89860", col3: "#e8b880", shadow: "#985020" },
  ];

  function makeBloomPts(cx, cy, baseR, seed1, seed2) {
    const pts = [];
    const steps = 36;
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * 360;
      const n = noise(
        cos(a) * 0.06 + seed1,
        sin(a) * 0.06 + seed2
      );
      const r = baseR * (0.82 + n * 0.36);
      pts.push([cx + cos(a) * r, cy + sin(a) * r]);
    }
    return pts;
  }

  noiseSeed(42);
  randomSeed(42);

  for (let bi = 0; bi < blooms.length; bi++) {
    const b = blooms[bi];
    const seed1 = bi * 1.3 + 0.5;
    const seed2 = bi * 0.9 + 0.2;

    const outerPts = makeBloomPts(b.cx, b.cy, b.r, seed1, seed2);
    const midPts   = makeBloomPts(b.cx, b.cy, b.r * 0.72, seed1 + 5, seed2 + 5);
    const innerPts = makeBloomPts(b.cx, b.cy, b.r * 0.42, seed1 + 10, seed2 + 10);

    // Base wash layer
    brush.wash(b.col2, 190);
    brush.noStroke();
    brush.beginShape(0.5);
    for (const p of outerPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noWash();

    // Main watercolor fill — outer shape, outward bleed
    brush.fillTexture(0.8, 0.5);
    brush.fill(b.col1, 160);
    brush.fillBleed(0.38, "out");
    brush.noStroke();
    brush.beginShape(0.5);
    for (const p of outerPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    // Second layer — mid shape, softer
    brush.fill(b.col2, 140);
    brush.fillBleed(0.28, "out");
    brush.fillTexture(0.7, 0.4);
    brush.beginShape(0.5);
    for (const p of midPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    // Inner shadow — inward bleed (dried puddle)
    brush.fill(b.shadow, 55);
    brush.fillBleed(0.45, "in");
    brush.fillTexture(0.6, 0.35);
    brush.beginShape(0.5);
    for (const p of midPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    // Warm highlight core
    brush.fill(b.col3, 100);
    brush.fillBleed(0.22, "out");
    brush.fillTexture(0.55, 0.25);
    brush.beginShape(0.5);
    for (const p of innerPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    brush.noFill();
  }

  // Subtle cpencil edge strokes on a few blooms
  const edgeBloomIndices = [0, 2, 4, 6];
  for (const bi of edgeBloomIndices) {
    const b = blooms[bi];
    const seed1 = bi * 1.3 + 0.5;
    const seed2 = bi * 0.9 + 0.2;
    const outerPts = makeBloomPts(b.cx, b.cy, b.r * 0.95, seed1 + 20, seed2 + 20);
    brush.set("cpencil", b.shadow, 0.3);
    brush.noFill();
    brush.spline(outerPts.concat([outerPts[0]]), 0.4);
  }

  brush.noStroke();
  brush.noFill();
  noLoop();
}