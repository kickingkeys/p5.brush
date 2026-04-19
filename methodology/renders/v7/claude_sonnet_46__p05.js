function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky gap at top ---
  brush.hatchStyle("2H", "#aaaaaa", 0.3);
  brush.hatch(18, 90, { rand: 0.04, continuous: false });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 80);
  brush.vertex(0, 80);
  brush.endShape(true);
  brush.noHatch();

  // --- Background tree mass (distant, faint) ---
  brush.hatchStyle("2H", "#999999", 0.4);
  brush.hatch(14, 80, { rand: 0.05, continuous: true });
  brush.beginShape(0);
  brush.vertex(0, 60);
  brush.vertex(600, 60);
  brush.vertex(600, 280);
  brush.vertex(0, 280);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#888888", 0.35);
  brush.hatch(16, 95, { rand: 0.06, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 60);
  brush.vertex(600, 60);
  brush.vertex(600, 240);
  brush.vertex(0, 240);
  brush.endShape(true);
  brush.noHatch();

  // --- Mid-ground horizontal shadow bands ---
  brush.hatchStyle("HB", "#555555", 0.6);
  brush.hatch(9, 5, { rand: 0.07, continuous: true, gradient: 0.2 });
  brush.beginShape(0);
  brush.vertex(0, 200);
  brush.vertex(600, 200);
  brush.vertex(600, 380);
  brush.vertex(0, 380);
  brush.endShape(true);
  brush.noHatch();

  // --- Dense shadow zone lower half ---
  brush.hatchStyle("2B", "#222222", 1.0);
  brush.hatch(5, 88, { rand: 0.08, continuous: true, gradient: 0.15 });
  brush.beginShape(0);
  brush.vertex(0, 320);
  brush.vertex(600, 320);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#111111", 1.1);
  brush.hatch(4, 75, { rand: 0.1, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 380);
  brush.vertex(600, 380);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Cross-hatch deep shadow
  brush.hatchStyle("2B", "#000000", 1.3);
  brush.hatch(3, 160, { rand: 0.09, continuous: true });
  brush.beginShape(0);
  brush.vertex(0, 440);
  brush.vertex(600, 440);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Tree trunks: vertical pen strokes ---
  const trunks = [
    { x: 38,  yTop: 55,  yBot: 600, w: 14 },
    { x: 82,  yTop: 45,  yBot: 600, w: 10 },
    { x: 135, yTop: 50,  yBot: 600, w: 18 },
    { x: 190, yTop: 60,  yBot: 600, w: 8  },
    { x: 230, yTop: 40,  yBot: 600, w: 22 },
    { x: 285, yTop: 55,  yBot: 600, w: 12 },
    { x: 335, yTop: 48,  yBot: 600, w: 16 },
    { x: 385, yTop: 62,  yBot: 600, w: 9  },
    { x: 430, yTop: 44,  yBot: 600, w: 20 },
    { x: 480, yTop: 52,  yBot: 600, w: 11 },
    { x: 525, yTop: 58,  yBot: 600, w: 15 },
    { x: 570, yTop: 46,  yBot: 600, w: 13 },
    { x: 58,  yTop: 70,  yBot: 600, w: 7  },
    { x: 108, yTop: 66,  yBot: 600, w: 9  },
    { x: 162, yTop: 72,  yBot: 600, w: 6  },
    { x: 210, yTop: 68,  yBot: 600, w: 8  },
    { x: 258, yTop: 64,  yBot: 600, w: 10 },
    { x: 308, yTop: 70,  yBot: 600, w: 7  },
    { x: 358, yTop: 66,  yBot: 600, w: 8  },
    { x: 408, yTop: 72,  yBot: 600, w: 6  },
    { x: 455, yTop: 68,  yBot: 600, w: 9  },
    { x: 502, yTop: 64,  yBot: 600, w: 7  },
    { x: 548, yTop: 70,  yBot: 600, w: 8  },
  ];

  for (const t of trunks) {
    const hw = t.w / 2;

    // Trunk fill: vertical dense hatch
    brush.hatchStyle("rotring", "#000000", 0.5);
    brush.hatch(t.w < 10 ? 2.5 : 2.0, 90, { rand: 0.03, continuous: true });
    brush.noFill();
    brush.beginShape(0);
    brush.vertex(t.x - hw, t.yTop);
    brush.vertex(t.x + hw, t.yTop);
    brush.vertex(t.x + hw, t.yBot);
    brush.vertex(t.x - hw, t.yBot);
    brush.endShape(true);
    brush.noHatch();

    // Trunk edge shading: side shadow
    brush.hatchStyle("pen", "#111111", 0.7);
    brush.hatch(t.w < 10 ? 3 : 2.5, 85, { rand: 0.04, continuous: false });
    brush.beginShape(0);
    brush.vertex(t.x + hw * 0.3, t.yTop);
    brush.vertex(t.x + hw, t.yTop);
    brush.vertex(t.x + hw, t.yBot);
    brush.vertex(t.x + hw * 0.3, t.yBot);
    brush.endShape(true);
    brush.noHatch();

    // Trunk outline
    brush.set("pen", "#000000", 0.8);
    brush.line(t.x - hw, t.yTop, t.x - hw, t.yBot);
    brush.line(t.x + hw, t.yTop, t.x + hw, t.yBot);
  }

  // --- Canopy mass: interlocking hatched elliptical crowns ---
  const crowns = [
    { cx: 38,  cy: 70,  rx: 38, ry: 55 },
    { cx: 135, cy: 60,  rx: 55, ry: 70 },
    { cx: 230, cy: 55,  rx: 65, ry: 80 },
    { cx: 335, cy: 62,  rx: 50, ry: 65 },
    { cx: 430, cy: 55,  rx: 60, ry: 75 },
    { cx: 525, cy: 65,  rx: 52, ry: 68 },
    { cx: 82,  cy: 80,  rx: 30, ry: 45 },
    { cx: 190, cy: 85,  rx: 28, ry: 40 },
    { cx: 285, cy: 78,  rx: 35, ry: 50 },
    { cx: 385, cy: 82,  rx: 30, ry: 44 },
    { cx: 480, cy: 80,  rx: 32, ry: 46 },
    { cx: 570, cy: 78,  rx: 28, ry: 42 },
  ];

  for (const c of crowns) {
    const pts = [];
    const steps = 28;
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * 360;
      pts.push([
        c.cx + cos(a) * c.rx,
        c.cy + sin(a) * c.ry
      ]);
    }

    // Light canopy hatch
    brush.hatchStyle("HB", "#555555", 0.55);
    brush.hatch(7, 55, { rand: 0.08, continuous: false });
    brush.noFill();
    brush.beginShape(0.35);
    for (const p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    // Dark underside of canopy
    const shadowPts = [];
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * 360;
      shadowPts.push([
        c.cx + cos(a) * c.rx * 0.75,
        c.cy + c.ry * 0.3 + sin(a) * c.ry * 0.55
      ]);
    }
    brush.hatchStyle("2B", "#222222", 0.8);
    brush.hatch(4, 120, { rand: 0.07, continuous: true });
    brush.beginShape(0.35);
    for (const p of shadowPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Undergrowth: dense low horizontal hatching ---
  brush.hatchStyle("HB", "#333333", 0.7);
  brush.hatch(6, 10, { rand: 0.12, continuous: true, gradient: 0.1 });
  brush.beginShape(0);
  brush.vertex(0, 490);
  brush.vertex(600, 490);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#111111", 0.9);
  brush.hatch(4, 170, { rand: 0.1, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 520);
  brush.vertex(600, 520);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Diagonal cross-hatching mid-zone for woven texture ---
  brush.hatchStyle("rotring", "#333333", 0.4);
  brush.hatch(8, 35, { rand: 0.06, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 260);
  brush.vertex(600, 260);
  brush.vertex(600, 430);
  brush.vertex(0, 430);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#444444", 0.4);
  brush.hatch(9, 145, { rand: 0.06, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 260);
  brush.vertex(600, 260);
  brush.vertex(600, 430);
  brush.vertex(0, 430);
  brush.endShape(true);
  brush.noHatch();

  // --- Fine branch lines across canopy zone ---
  brush.set("rotring", "#000000", 0.5);
  const branches = [
    [[38, 100], [90, 75], [150, 90], [200, 65]],
    [[135, 90], [185, 68], [240, 82], [300, 60]],
    [[230, 80], [280, 55], [340, 70], [400, 52]],
    [[335, 88], [390, 65], [445, 80], [500, 58]],
    [[430, 82], [480, 58], [535, 72], [590, 50]],
    [[60, 110], [120, 85], [180, 100], [240, 78]],
    [[280, 105], [340, 82], [400, 95], [460, 70]],
    [[460, 108], [510, 85], [560, 98], [600, 75]],
  ];
  for (const b of branches) {
    brush.spline(b, 0.4);
  }

  // --- Thin contour lines on major trunks ---
  brush.set("pen", "#000000", 1.0);
  for (const t of trunks) {
    if (t.w >= 14) {
      brush.line(t.x, t.yTop, t.x, t.yTop + 180);
    }
  }

  // --- Foreground root / ground strokes ---
  brush.set("2B", "#000000", 1.2);
  const roots = [
    [[20, 580], [60, 570], [100, 585], [140, 575]],
    [[100, 590], [150, 578], [200, 592], [250, 582]],
    [[220, 575], [270, 565], [320, 578], [370, 568]],
    [[350, 588], [400, 576], [450, 590], [510, 580]],
    [[470, 572], [520, 562], [570, 575], [600, 568]],
  ];
  for (const r of roots) {
    brush.spline(r, 0.3);
  }

  // --- Final deep shadow cross-hatch over everything at bottom ---
  brush.hatchStyle("2B", "#000000", 1.4);
  brush.hatch(2.5, 90, { rand: 0.05, continuous: true });
  brush.beginShape(0);
  brush.vertex(0, 560);
  brush.vertex(600, 560);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}