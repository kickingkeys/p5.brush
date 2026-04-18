function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const blooms = [
    { cx: 160, cy: 180, r: 110, color: "#c4785a", shadow: "#a0522d", warm: "#d4956e" },
    { cx: 340, cy: 150, r: 95,  color: "#c8a06a", shadow: "#a07840", warm: "#dbb87a" },
    { cx: 480, cy: 260, r: 105, color: "#b86a6a", shadow: "#904040", warm: "#cc8888" },
    { cx: 220, cy: 360, r: 120, color: "#c49060", shadow: "#9a6a38", warm: "#d4a878" },
    { cx: 420, cy: 400, r: 100, color: "#b87878", shadow: "#8a4848", warm: "#cc9090" },
    { cx: 130, cy: 490, r: 85,  color: "#c8a070", shadow: "#a07840", warm: "#ddb888" },
    { cx: 500, cy: 130, r: 80,  color: "#b06868", shadow: "#884040", warm: "#c88080" },
    { cx: 310, cy: 520, r: 90,  color: "#c07858", shadow: "#985040", warm: "#d09070" },
    { cx: 60,  cy: 300, r: 75,  color: "#cc9060", shadow: "#a07038", warm: "#dca870" },
    { cx: 550, cy: 480, r: 70,  color: "#b87060", shadow: "#905040", warm: "#cc8878" },
  ];

  for (const bloom of blooms) {
    const { cx, cy, r, color, shadow, warm } = bloom;

    // Generate organic shape vertices
    function makeShape(cx, cy, r, seed) {
      const pts = [];
      const count = 36;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * TWO_PI;
        const n = noise(
          cos(a) * 0.3 + seed,
          sin(a) * 0.3 + seed + 10
        );
        const rad = r * (0.82 + n * 0.36);
        pts.push([cx + cos(a) * rad, cy + sin(a) * rad]);
      }
      return pts;
    }

    const seed = (cx * 0.013 + cy * 0.007) % 1000;

    // Outer wash base
    brush.noStroke();
    brush.wash(color, 170);
    brush.fillTexture(0.8, 0.45);
    brush.fillBleed(0.45, "out");
    brush.fill(color, 160);
    const outerPts = makeShape(cx, cy, r, seed);
    brush.beginShape(0.5);
    for (const p of outerPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noWash();

    // Mid fill — slightly smaller, bleeds in
    brush.fill(warm, 130);
    brush.fillBleed(0.35, "out");
    brush.fillTexture(0.75, 0.5);
    const midPts = makeShape(cx, cy, r * 0.78, seed + 1.3);
    brush.beginShape(0.5);
    for (const p of midPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    // Inner shadow layer — bleeds inward, dried-puddle effect
    brush.fill(shadow, 80);
    brush.fillBleed(0.42, "in");
    brush.fillTexture(0.7, 0.6);
    const innerPts = makeShape(cx, cy, r * 0.52, seed + 2.7);
    brush.beginShape(0.5);
    for (const p of innerPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    // Warm center bloom
    brush.fill(warm, 55);
    brush.fillBleed(0.3, "in");
    brush.fillTexture(0.6, 0.4);
    const centerPts = makeShape(cx, cy, r * 0.3, seed + 4.1);
    brush.beginShape(0.55);
    for (const p of centerPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    brush.noFill();
  }

  noLoop();
}