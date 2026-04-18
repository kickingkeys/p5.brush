function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Define a set of overlapping rectangles inspired by Diebenkorn's Ocean Park series
  // Each rectangle: [x, y, w, h, hatchAngle, hatchDist, hatchColor, strokeColor]
  const rects = [
    // Sky-like upper bands
    { x: 0,   y: 0,   w: 600, h: 160, angle: 88,  dist: 6,  hColor: "#7a8c6e", sColor: "#5a6e4a", brush: "rotring" },
    { x: 0,   y: 0,   w: 380, h: 120, angle: 92,  dist: 9,  hColor: "#6b7f8c", sColor: "#4a6070", brush: "rotring" },
    { x: 300, y: 30,  w: 300, h: 100, angle: 5,   dist: 7,  hColor: "#8c9e7a", sColor: "#5a6e4a", brush: "pen" },

    // Horizon band
    { x: 0,   y: 145, w: 600, h: 55,  angle: 0,   dist: 5,  hColor: "#a08060", sColor: "#7a5e3a", brush: "rotring" },
    { x: 80,  y: 130, w: 440, h: 40,  angle: 180, dist: 8,  hColor: "#b09070", sColor: "#8a6a4a", brush: "pen" },

    // Mid ground rectangles
    { x: 0,   y: 190, w: 200, h: 250, angle: 75,  dist: 5,  hColor: "#8c7060", sColor: "#6a4e3a", brush: "rotring" },
    { x: 170, y: 180, w: 260, h: 200, angle: 100, dist: 7,  hColor: "#7a8c6e", sColor: "#4a6050", brush: "rotring" },
    { x: 390, y: 170, w: 210, h: 230, angle: 65,  dist: 6,  hColor: "#9e8a6a", sColor: "#7a6248", brush: "pen" },

    // Foreground ground planes
    { x: 0,   y: 420, w: 600, h: 180, angle: 5,   dist: 5,  hColor: "#b0956a", sColor: "#8a7050", brush: "rotring" },
    { x: 0,   y: 390, w: 280, h: 120, angle: 170, dist: 8,  hColor: "#9e8060", sColor: "#7a5e40", brush: "pen" },
    { x: 250, y: 410, w: 350, h: 100, angle: 15,  dist: 6,  hColor: "#c0a07a", sColor: "#9a7a55", brush: "rotring" },

    // Accent vertical slices
    { x: 140, y: 0,   w: 60,  h: 600, angle: 85,  dist: 9,  hColor: "#7a6e8c", sColor: "#5a4e7a", brush: "pen" },
    { x: 350, y: 0,   w: 50,  h: 600, angle: 95,  dist: 10, hColor: "#8c7a6a", sColor: "#6a5848", brush: "rotring" },
    { x: 480, y: 60,  w: 40,  h: 420, angle: 80,  dist: 8,  hColor: "#6e8c7a", sColor: "#4a6a58", brush: "pen" },

    // Small accent blocks
    { x: 60,  y: 200, w: 100, h: 80,  angle: 45,  dist: 4,  hColor: "#b08870", sColor: "#8a6650", brush: "rotring" },
    { x: 420, y: 300, w: 120, h: 90,  angle: 130, dist: 5,  hColor: "#7a9080", sColor: "#4a6860", brush: "pen" },
    { x: 200, y: 350, w: 150, h: 70,  angle: 55,  dist: 6,  hColor: "#a09070", sColor: "#7a6850", brush: "rotring" },
  ];

  // Draw each rectangle with hatching and a light stroke outline
  for (const r of rects) {
    // Hatch fill
    brush.hatchStyle(r.brush, r.hColor, 0.5);
    brush.hatch(r.dist, r.angle, { rand: 0.04, continuous: true });

    // Stroke outline
    brush.set(r.brush, r.sColor, 0.6);

    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();
  }

  // Add a second cross-hatch pass on some rectangles for darker shadow zones
  const shadowRects = [
    { x: 0,   y: 190, w: 200, h: 250, angle: 160, dist: 8,  hColor: "#5a4030", brush: "rotring" },
    { x: 390, y: 170, w: 210, h: 230, angle: 155, dist: 9,  hColor: "#6a5040", brush: "pen" },
    { x: 0,   y: 420, w: 600, h: 180, angle: 170, dist: 9,  hColor: "#9a7850", brush: "rotring" },
    { x: 170, y: 180, w: 260, h: 200, angle: 10,  dist: 10, hColor: "#5a6e50", brush: "rotring" },
  ];

  for (const r of shadowRects) {
    brush.hatchStyle(r.brush, r.hColor, 0.4);
    brush.hatch(r.dist, r.angle, { rand: 0.05, continuous: true });
    brush.noStroke();
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();
  }

  // Add cpencil accent lines along key structural divisions
  const divLines = [
    { x1: 0,   y1: 190, x2: 600, y2: 190, color: "#6a5a4a" },
    { x1: 0,   y1: 420, x2: 600, y2: 415, color: "#7a6a5a" },
    { x1: 140, y1: 0,   x2: 138, y2: 600, color: "#6a5a7a" },
    { x1: 350, y1: 0,   x2: 352, y2: 600, color: "#5a6a5a" },
    { x1: 0,   y1: 145, x2: 600, y2: 148, color: "#8a7060" },
    { x1: 480, y1: 0,   x2: 479, y2: 600, color: "#6a7a68" },
  ];

  for (const l of divLines) {
    brush.set("cpencil", l.color, 0.9);
    brush.line(l.x1, l.y1, l.x2, l.y2);
  }

  // A few bold pen strokes for emphasis
  brush.set("pen", "#4a3828", 1.0);
  brush.line(0, 190, 600, 190);
  brush.line(0, 420, 600, 420);
  brush.set("pen", "#3a4838", 0.8);
  brush.line(140, 0, 140, 600);
  brush.line(350, 0, 350, 600);

  noLoop();
}