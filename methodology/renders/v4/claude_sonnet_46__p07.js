function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#f2ece0");
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Wall texture base: faint charcoal smudges ---
  brush.set("charcoal", "#c8bfb0", 0.4);
  for (let i = 0; i < 18; i++) {
    brush.line(
      random(0, 600), random(0, 600),
      random(0, 600), random(0, 600)
    );
  }

  // --- Layer 1: Large background spray circles (oldest, most faded) ---
  const bgColors = ["#b0c4de", "#c5a3c5", "#a3c5b0", "#d4b896", "#9fb8d4"];
  for (let i = 0; i < 12; i++) {
    const cx = random(30, 570);
    const cy = random(30, 570);
    const r = random(60, 140);
    brush.set("spray", random(bgColors), random(1.2, 2.8));
    for (let j = 0; j < 80; j++) {
      const angle = random(360);
      const dist = random(0, r);
      const sx = cx + cos(angle) * dist;
      const sy = cy + sin(angle) * dist;
      brush.flowLine(sx, sy, random(8, 22), random(360));
    }
  }

  // --- Layer 2: Mid-layer bold spray circles in vivid colors ---
  const vividColors = [
    "#e8574c", "#4f8dc7", "#f2b84c", "#3ab87a",
    "#c94fa0", "#e86b2a", "#5a4fc7", "#e8c84c"
  ];
  for (let i = 0; i < 9; i++) {
    const cx = random(40, 560);
    const cy = random(40, 560);
    const r = random(45, 110);
    const col = random(vividColors);
    brush.set("spray", col, random(1.8, 3.5));
    for (let j = 0; j < 120; j++) {
      const angle = random(360);
      const dist = random(0, r);
      const sx = cx + cos(angle) * dist;
      const sy = cy + sin(angle) * dist;
      brush.flowLine(sx, sy, random(10, 30), random(360));
    }
    // Inner bright core
    const lighterCol = col;
    brush.set("spray", lighterCol, random(0.6, 1.2));
    for (let j = 0; j < 40; j++) {
      const angle = random(360);
      const dist = random(0, r * 0.45);
      const sx = cx + cos(angle) * dist;
      const sy = cy + sin(angle) * dist;
      brush.flowLine(sx, sy, random(4, 12), random(360));
    }
  }

  // --- Layer 3: Drips ---
  const dripColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#3ab87a", "#2a2a2a", "#c94fa0"];
  for (let i = 0; i < 20; i++) {
    const x = random(30, 570);
    const y = random(60, 400);
    const dripLen = random(35, 130);
    brush.set("spray", random(dripColors), random(0.4, 0.9));
    brush.line(x, y, x + random(-5, 5), y + dripLen);
    // Drip bead at bottom
    brush.set("spray", random(dripColors), random(0.8, 1.4));
    for (let j = 0; j < 10; j++) {
      brush.flowLine(
        x + random(-4, 4),
        y + dripLen + random(-3, 3),
        random(3, 8),
        random(360)
      );
    }
  }

  // --- Layer 4: Arrow tags (splines) ---
  const tagColors = ["#2a2a2a", "#e8574c", "#4f8dc7", "#f2b84c", "#ffffff", "#3ab87a"];
  for (let i = 0; i < 7; i++) {
    const x0 = random(60, 460);
    const y0 = random(80, 500);
    const dx = random(80, 160) * (random() > 0.5 ? 1 : -1);
    const dy = random(-40, 40);
    const col = random(tagColors);
    brush.set("marker", col, random(1.0, 2.2));
    brush.spline([
      [x0, y0, 0.7],
      [x0 + dx * 0.4, y0 + dy * 0.5 + random(-15, 15), 0.85],
      [x0 + dx * 0.75, y0 + dy * 0.8 + random(-10, 10), 0.75],
      [x0 + dx, y0 + dy, 0.5]
    ], 0.4);
    // Arrowhead
    const tipX = x0 + dx;
    const tipY = y0 + dy;
    brush.set("marker", col, random(0.8, 1.6));
    brush.line(tipX, tipY, tipX - random(10, 20), tipY - random(8, 18));
    brush.line(tipX, tipY, tipX - random(10, 20), tipY + random(8, 18));
  }

  // --- Layer 5: Ghosted hand-drawn marks (charcoal/2B fragments) ---
  brush.wiggle(4);
  brush.set("charcoal", "#3a3530", 0.5);
  for (let i = 0; i < 14; i++) {
    const x0 = random(30, 540);
    const y0 = random(30, 560);
    brush.spline([
      [x0, y0, 0.5],
      [x0 + random(-60, 60), y0 + random(-40, 40), 0.8],
      [x0 + random(-80, 80), y0 + random(-60, 60), 0.6],
      [x0 + random(-100, 100), y0 + random(-80, 80), 0.4]
    ], 0.5);
  }

  // Faint ghost circles (charcoal outlines, half-erased feel)
  brush.set("charcoal", "#5a5248", 0.3);
  for (let i = 0; i < 6; i++) {
    const cx = random(80, 520);
    const cy = random(80, 520);
    const r = random(40, 100);
    const pts = [];
    const steps = 28;
    for (let j = 0; j < steps; j++) {
      const a = (j / steps) * 360;
      const nr = r + random(-6, 6);
      pts.push([cx + cos(a) * nr, cy + sin(a) * nr]);
    }
    brush.spline(pts, 0.5);
  }

  // --- Layer 6: Stencil-style letter fragments (pen/rotring marks) ---
  brush.set("pen", "#1a1a1a", 0.7);
  for (let i = 0; i < 10; i++) {
    const x = random(40, 540);
    const y = random(40, 540);
    const len = random(20, 55);
    const angle = random(360);
    brush.line(x, y, x + cos(angle) * len, y + sin(angle) * len);
  }

  // Rotring cross-hatch fragments
  brush.set("rotring", "#222", 0.4);
  for (let i = 0; i < 8; i++) {
    const bx = random(40, 500);
    const by = random(40, 500);
    const bw = random(25, 60);
    const bh = random(25, 60);
    brush.hatchStyle("rotring", "#333", 0.35);
    brush.hatch(4, random(30, 150), { rand: 0.06, continuous: false });
    brush.polygon([
      [bx, by],
      [bx + bw, by],
      [bx + bw, by + bh],
      [bx, by + bh]
    ]);
    brush.noHatch();
  }

  // --- Layer 7: Top spray bursts (freshest, brightest) ---
  const freshColors = ["#ff3c2a", "#2255ee", "#ffcc00", "#00cc66", "#ff44aa"];
  for (let i = 0; i < 5; i++) {
    const cx = random(80, 520);
    const cy = random(80, 520);
    const r = random(25, 65);
    const col = random(freshColors);
    brush.set("spray", col, random(2.2, 4.0));
    for (let j = 0; j < 90; j++) {
      const angle = random(360);
      const dist = random(0, r);
      const sx = cx + cos(angle) * dist;
      const sy = cy + sin(angle) * dist;
      brush.flowLine(sx, sy, random(6, 18), random(360));
    }
  }

  // --- Layer 8: Final stray marks and pen scratches ---
  brush.noField();
  brush.set("2B", "#2a2520", 0.5);
  for (let i = 0; i < 12; i++) {
    const x0 = random(20, 580);
    const y0 = random(20, 580);
    brush.line(x0, y0, x0 + random(-40, 40), y0 + random(-40, 40));
  }

  // White spray highlights (overspray)
  brush.set("spray", "#f8f4ec", 1.8);
  for (let i = 0; i < 6; i++) {
    const cx = random(80, 520);
    const cy = random(80, 520);
    for (let j = 0; j < 35; j++) {
      const angle = random(360);
      const dist = random(0, 40);
      brush.flowLine(
        cx + cos(angle) * dist,
        cy + sin(angle) * dist,
        random(5, 14),
        random(360)
      );
    }
  }

  noLoop();
}