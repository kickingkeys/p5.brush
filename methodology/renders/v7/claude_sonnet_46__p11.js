function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Define a Diebenkorn-inspired palette of muted earth tones
  const palette = [
    "#c8b89a", // warm sand
    "#8a7560", // medium brown
    "#6b8c7a", // muted sage green
    "#b5956e", // ochre
    "#7a8fa0", // dusty blue-grey
    "#a09070", // tan
    "#5a6e5a", // dark sage
    "#c4a882", // light ochre
    "#8a9e8a", // grey-green
    "#b08060", // sienna
  ];

  // Define a set of overlapping rectangles that tile the canvas
  // like Diebenkorn's Ocean Park series
  const rects = [
    { x: 0,   y: 0,   w: 220, h: 180 },
    { x: 180, y: 0,   w: 250, h: 140 },
    { x: 380, y: 0,   w: 220, h: 200 },
    { x: 0,   y: 150, w: 200, h: 220 },
    { x: 160, y: 120, w: 240, h: 200 },
    { x: 350, y: 170, w: 250, h: 180 },
    { x: 0,   y: 340, w: 230, h: 260 },
    { x: 190, y: 300, w: 210, h: 200 },
    { x: 370, y: 320, w: 230, h: 280 },
    { x: 80,  y: 460, w: 300, h: 140 },
    { x: 340, y: 480, w: 260, h: 120 },
    { x: 0,   y: 520, w: 180, h: 80  },
    { x: 440, y: 100, w: 160, h: 300 },
    { x: 120, y: 220, w: 360, h: 160 },
  ];

  // For each rectangle, apply cpencil hatching in 2 color passes
  // at different angles for optical color mixing
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const col1 = palette[i % palette.length];
    const col2 = palette[(i + 3) % palette.length];
    const col3 = palette[(i + 6) % palette.length];

    // Generate the four corners as polygon points
    const pts = [
      [r.x,       r.y      ],
      [r.x + r.w, r.y      ],
      [r.x + r.w, r.y + r.h],
      [r.x,       r.y + r.h],
    ];

    // First cpencil pass — base hue, angle varies per rect
    const angle1 = 20 + (i * 23) % 140;
    const spacing1 = 4 + (i % 4);
    brush.noStroke();
    brush.hatchStyle("cpencil", col1, 0.7);
    brush.hatch(spacing1, angle1, { rand: 0.04, continuous: true });
    brush.polygon(pts);
    brush.noHatch();

    // Second cpencil pass — second hue, offset angle for optical mixing
    const angle2 = angle1 + 45 + (i % 3) * 15;
    const spacing2 = spacing1 + 2;
    brush.hatchStyle("cpencil", col2, 0.55);
    brush.hatch(spacing2, angle2, { rand: 0.05, continuous: true });
    brush.polygon(pts);
    brush.noHatch();

    // Third pass — darker tone for select rects to add depth
    if (i % 3 === 0) {
      const angle3 = angle2 + 30;
      brush.hatchStyle("cpencil", col3, 0.45);
      brush.hatch(spacing1 + 4, angle3, { rand: 0.06, continuous: true });
      brush.polygon(pts);
      brush.noHatch();
    }
  }

  // Draw structural outlines with pen and rotring for Diebenkorn's
  // characteristic hard architectural edges
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const pts = [
      [r.x,       r.y      ],
      [r.x + r.w, r.y      ],
      [r.x + r.w, r.y + r.h],
      [r.x,       r.y + r.h],
    ];

    // Alternate between pen and rotring for variety
    if (i % 2 === 0) {
      brush.set("pen", "#3a2e22", 0.5 + (i % 3) * 0.15);
    } else {
      brush.set("rotring", "#2e3830", 0.4 + (i % 4) * 0.12);
    }
    brush.noFill();
    brush.noHatch();
    brush.polygon(pts);
  }

  // Add a few bold horizontal and vertical dividing lines
  // reminiscent of Diebenkorn's horizon lines
  const dividers = [
    { x1: 0,   y1: 145, x2: 600, y2: 148 },
    { x1: 0,   y1: 310, x2: 600, y2: 314 },
    { x1: 0,   y1: 475, x2: 600, y2: 478 },
    { x1: 178, y1: 0,   x2: 182, y2: 600 },
    { x1: 368, y1: 0,   x2: 372, y2: 600 },
  ];

  for (let d of dividers) {
    brush.set("pen", "#2a2018", 0.9);
    brush.line(d.x1, d.y1, d.x2, d.y2);
    // Second pass slightly offset for a hand-drawn double-line feel
    brush.set("rotring", "#1e1a14", 0.35);
    brush.line(d.x1 + 3, d.y1 + 2, d.x2 + 3, d.y2 + 2);
  }

  // Add sparse 2H hatching in a few zones for very light tonal variation
  const lightZones = [
    [[0, 0], [180, 0], [180, 145], [0, 145]],
    [[370, 170], [600, 170], [600, 310], [370, 310]],
    [[0, 475], [180, 475], [180, 600], [0, 600]],
  ];

  for (let i = 0; i < lightZones.length; i++) {
    brush.hatchStyle("2H", "#9a8c7a", 0.5);
    brush.hatch(9, 10 + i * 25, { rand: 0.03 });
    brush.noStroke();
    brush.polygon(lightZones[i]);
    brush.noHatch();
  }

  // Add a few dark 2B accent lines in the shadow zones
  brush.set("2B", "#1a1410", 1.1);
  brush.line(180, 310, 370, 310);
  brush.line(180, 145, 180, 475);
  brush.set("2B", "#1a1410", 0.7);
  brush.line(370, 0,   370, 145);
  brush.line(0,   475, 370, 475);

  noLoop();
}