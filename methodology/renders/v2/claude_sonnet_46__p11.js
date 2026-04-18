function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const rects = [
    { x: 20,  y: 30,  w: 280, h: 200, hue: "#7a6248", angle: 28,  dist: 7,  brush: "rotring", weight: 0.4 },
    { x: 60,  y: 180, w: 320, h: 160, hue: "#5c7a6e", angle: 112, dist: 6,  brush: "rotring", weight: 0.35 },
    { x: 240, y: 50,  w: 200, h: 260, hue: "#8a7355", angle: 68,  dist: 8,  brush: "rotring", weight: 0.4 },
    { x: 10,  y: 310, w: 350, h: 180, hue: "#9e8b6a", angle: 145, dist: 9,  brush: "rotring", weight: 0.3 },
    { x: 300, y: 260, w: 280, h: 220, hue: "#6b7c5e", angle: 35,  dist: 7,  brush: "rotring", weight: 0.35 },
    { x: 150, y: 400, w: 260, h: 170, hue: "#a07060", angle: 88,  dist: 6,  brush: "rotring", weight: 0.4 },
    { x: 380, y: 80,  w: 200, h: 300, hue: "#7b8c7a", angle: 158, dist: 10, brush: "rotring", weight: 0.3 },
    { x: 30,  y: 460, w: 300, h: 130, hue: "#b09070", angle: 52,  dist: 8,  brush: "rotring", weight: 0.35 },
    { x: 330, y: 420, w: 250, h: 160, hue: "#8a6e5a", angle: 120, dist: 7,  brush: "rotring", weight: 0.4 },
    { x: 450, y: 310, w: 140, h: 260, hue: "#6e7a68", angle: 75,  dist: 9,  brush: "rotring", weight: 0.3 },
  ];

  const cpencilRects = [
    { x: 20,  y: 30,  w: 280, h: 200, hue: "#8a6040", angle: 28  },
    { x: 60,  y: 180, w: 320, h: 160, hue: "#4a7060", angle: 112 },
    { x: 240, y: 50,  w: 200, h: 260, hue: "#9a7040", angle: 68  },
    { x: 10,  y: 310, w: 350, h: 180, hue: "#b08050", angle: 145 },
    { x: 300, y: 260, w: 280, h: 220, hue: "#5a7050", angle: 35  },
    { x: 150, y: 400, w: 260, h: 170, hue: "#b06050", angle: 88  },
    { x: 380, y: 80,  w: 200, h: 300, hue: "#607060", angle: 158 },
    { x: 30,  y: 460, w: 300, h: 130, hue: "#c08060", angle: 52  },
    { x: 330, y: 420, w: 250, h: 160, hue: "#905040", angle: 120 },
    { x: 450, y: 310, w: 140, h: 260, hue: "#506050", angle: 75  },
  ];

  // Draw base pen hatching for all rectangles
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    brush.noStroke();
    brush.noFill();
    brush.hatchStyle(r.brush, r.hue, r.weight);
    brush.hatch(r.dist, r.angle, { rand: 0.04, continuous: true });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();
  }

  // Cross-hatch shadow layer on every other rect
  for (let i = 0; i < rects.length; i += 2) {
    const r = rects[i];
    const crossAngle = r.angle + 55;
    brush.noStroke();
    brush.noFill();
    brush.hatchStyle("rotring", r.hue, r.weight * 0.8);
    brush.hatch(r.dist * 1.6, crossAngle, { rand: 0.05, continuous: true });
    brush.rect(r.x + r.w * 0.35, r.y + r.h * 0.35, r.w * 0.6, r.h * 0.6, "corner");
    brush.noHatch();
  }

  // cpencil color wash over each rect
  for (let i = 0; i < cpencilRects.length; i++) {
    const r = cpencilRects[i];
    brush.noStroke();
    brush.noFill();
    brush.hatchStyle("cpencil", r.hue, 0.7);
    brush.hatch(5, r.angle, { rand: 0.05 });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();
  }

  // Second cpencil layer at offset angle for optical mixing
  for (let i = 0; i < cpencilRects.length; i++) {
    const r = cpencilRects[i];
    const secondAngle = r.angle + 40;
    const darkerHue = lerpColor(color(r.hue), color("#3a2a1a"), 0.25);
    brush.noStroke();
    brush.noFill();
    brush.hatchStyle("cpencil", darkerHue, 0.55);
    brush.hatch(6.5, secondAngle, { rand: 0.06 });
    brush.rect(r.x + r.w * 0.15, r.y + r.h * 0.15, r.w * 0.7, r.h * 0.7, "corner");
    brush.noHatch();
  }

  // Pen outlines for structural definition
  const outlineColors = [
    "#5c4030", "#3a5a50", "#6a5030", "#7a6040",
    "#405040", "#8a4030", "#405040", "#9a6040",
    "#6a3830", "#3a5040"
  ];

  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    brush.set("pen", outlineColors[i], 0.8);
    brush.noFill();
    brush.noHatch();
    brush.rect(r.x, r.y, r.w, r.h, "corner");
  }

  // HB pencil accent lines — horizontal bands suggesting horizon
  brush.set("HB", "#5a4a38", 0.6);
  brush.noFill();
  brush.noHatch();

  const horizons = [130, 220, 310, 390, 480];
  for (let i = 0; i < horizons.length; i++) {
    const y = horizons[i];
    const jitter = random(-4, 4);
    brush.spline([
      [10,  y + jitter,       0.3],
      [120, y + random(-3,3), 0.7],
      [250, y + random(-3,3), 1.0],
      [380, y + random(-3,3), 0.8],
      [500, y + random(-3,3), 0.6],
      [590, y + jitter,       0.3]
    ], 0.35);
  }

  // 2H fine detail hatch on a few accent zones
  const accentZones = [
    { x: 60,  y: 180, w: 160, h: 80,  angle: 22  },
    { x: 300, y: 260, w: 140, h: 100, angle: 155 },
    { x: 150, y: 400, w: 130, h: 85,  angle: 60  },
  ];

  for (let i = 0; i < accentZones.length; i++) {
    const z = accentZones[i];
    brush.noStroke();
    brush.noFill();
    brush.hatchStyle("2H", "#888070", 0.4);
    brush.hatch(3.5, z.angle, { rand: 0.03, continuous: true });
    brush.rect(z.x, z.y, z.w, z.h, "corner");
    brush.noHatch();
  }

  // 2B dark accent lines for depth in shadow corners
  brush.set("2B", "#2a1e14", 1.0);
  brush.noFill();
  brush.noHatch();

  const darkAccents = [
    [[240, 50],  [440, 50]],
    [[10,  310], [360, 310]],
    [[380, 80],  [580, 80]],
    [[30,  460], [330, 460]],
  ];

  for (let i = 0; i < darkAccents.length; i++) {
    const a = darkAccents[i];
    brush.line(a[0][0], a[0][1], a[1][0], a[1][1]);
  }

  noLoop();
}