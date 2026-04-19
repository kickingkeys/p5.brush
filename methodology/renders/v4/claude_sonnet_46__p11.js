function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Define a Diebenkorn-inspired set of muted earth-tone rectangles
  // that tile and overlap like landscape zones

  const rects = [
    // [x, y, w, h, fillColor, hatchColor, hatchAngle, hatchDist]
    { x: 0,   y: 0,   w: 260, h: 180, fill: "#c9b99a", hatchColor: "#7a6248", hatchAngle: 30,  hatchDist: 6  },
    { x: 240, y: 0,   w: 200, h: 220, fill: "#b5c4b1", hatchColor: "#4a6650", hatchAngle: 75,  hatchDist: 5  },
    { x: 420, y: 0,   w: 180, h: 160, fill: "#d4c5a9", hatchColor: "#8a7055", hatchAngle: 120, hatchDist: 7  },
    { x: 0,   y: 160, w: 160, h: 220, fill: "#b8a98e", hatchColor: "#6b5840", hatchAngle: 50,  hatchDist: 5  },
    { x: 140, y: 200, w: 240, h: 180, fill: "#c2b49e", hatchColor: "#7a6550", hatchAngle: 100, hatchDist: 6  },
    { x: 360, y: 150, w: 240, h: 200, fill: "#a8bba5", hatchColor: "#3d5e44", hatchAngle: 20,  hatchDist: 5  },
    { x: 0,   y: 360, w: 200, h: 240, fill: "#d6c9b2", hatchColor: "#9a8060", hatchAngle: 140, hatchDist: 8  },
    { x: 180, y: 370, w: 220, h: 230, fill: "#bfb09a", hatchColor: "#6a5840", hatchAngle: 65,  hatchDist: 5  },
    { x: 380, y: 340, w: 220, h: 260, fill: "#b0c0ad", hatchColor: "#4a6648", hatchAngle: 110, hatchDist: 6  },
    { x: 60,  y: 80,  w: 200, h: 120, fill: "#cdc0a8", hatchColor: "#857060", hatchAngle: 15,  hatchDist: 9  },
    { x: 300, y: 60,  w: 160, h: 160, fill: "#aab8a6", hatchColor: "#3e6045", hatchAngle: 88,  hatchDist: 6  },
    { x: 440, y: 200, w: 160, h: 150, fill: "#c8b89e", hatchColor: "#7a6248", hatchAngle: 55,  hatchDist: 7  },
    { x: 20,  y: 260, w: 180, h: 130, fill: "#b9c8b4", hatchColor: "#456048", hatchAngle: 130, hatchDist: 5  },
    { x: 200, y: 280, w: 200, h: 100, fill: "#cec0a5", hatchColor: "#887060", hatchAngle: 42,  hatchDist: 6  },
    { x: 380, y: 250, w: 100, h: 100, fill: "#b4c4b0", hatchColor: "#3e5e42", hatchAngle: 95,  hatchDist: 8  },
  ];

  // Draw each rectangle with cpencil hatch layers
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];

    // Light wash base using cpencil hatch at primary angle
    brush.noStroke();
    brush.hatchStyle("cpencil", r.fill, 0.7);
    brush.hatch(r.hatchDist + 2, r.hatchAngle, { rand: 0.04, continuous: true });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();

    // Second cpencil layer at offset angle for optical mixing
    brush.hatchStyle("cpencil", r.hatchColor, 0.6);
    brush.hatch(r.hatchDist, r.hatchAngle + 45, { rand: 0.05, continuous: true });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();

    // Darker accent layer in shadow areas (smaller inset rect)
    const inset = 12;
    const darkColor = lerpColor(color(r.hatchColor), color("#1a1008"), 0.3).toString('#rrggbb');
    brush.hatchStyle("cpencil", darkColor, 0.5);
    brush.hatch(r.hatchDist - 1.5, r.hatchAngle + 90, { rand: 0.06, continuous: true });
    brush.rect(r.x + inset, r.y + inset, r.w - inset * 2, r.h - inset * 2, "corner");
    brush.noHatch();
  }

  // Draw rotring outlines over all rectangles for clean pen structure
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const outlineAlpha = random(0.6, 1.0);
    brush.set("rotring", "#2a1f14", 0.35 + random(0.0, 0.25));
    brush.noFill();
    brush.noHatch();
    brush.rect(r.x, r.y, r.w, r.h, "corner");
  }

  // Add a few pen cross-hatch accent zones for tonal interest
  const accentZones = [
    { x: 60,  y: 30,  w: 140, h: 80,  angle: 160, dist: 4 },
    { x: 300, y: 180, w: 120, h: 90,  angle: 35,  dist: 3.5 },
    { x: 160, y: 400, w: 160, h: 100, angle: 75,  dist: 4 },
    { x: 420, y: 360, w: 140, h: 120, angle: 120, dist: 3 },
    { x: 10,  y: 170, w: 100, h: 100, angle: 50,  dist: 3.5 },
  ];

  for (const z of accentZones) {
    brush.noStroke();
    brush.hatchStyle("pen", "#3a2c1a", 0.4);
    brush.hatch(z.dist, z.angle, { rand: 0.04, continuous: true });
    brush.rect(z.x, z.y, z.w, z.h, "corner");
    brush.noHatch();

    brush.hatchStyle("pen", "#3a2c1a", 0.35);
    brush.hatch(z.dist + 0.5, z.angle + 55, { rand: 0.04, continuous: true });
    brush.rect(z.x, z.y, z.w, z.h, "corner");
    brush.noHatch();
  }

  // Sparse 2H pencil lines across the full composition for delicate texture
  brush.set("2H", "#8a7a68", 0.5);
  for (let i = 0; i < 18; i++) {
    const x1 = random(0, 600);
    const y1 = random(0, 600);
    const len = random(60, 200);
    const ang = random(0, 180);
    const x2 = x1 + cos(ang) * len;
    const y2 = y1 + sin(ang) * len;
    brush.line(x1, y1, x2, y2);
  }

  // A few bold 2B accent lines for Diebenkorn-style horizon emphasis
  brush.set("2B", "#2a1f14", 0.9);
  brush.line(0, 195, 600, 195);
  brush.line(0, 370, 600, 370);
  brush.line(240, 0, 240, 600);
  brush.line(430, 0, 430, 600);

  brush.set("2B", "#2a1f14", 0.6);
  brush.line(140, 0, 140, 370);
  brush.line(380, 195, 380, 600);

  noLoop();
}