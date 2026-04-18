function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Define a Diebenkorn-inspired palette of muted earth tones
  const palette = [
    "#b5a48a", "#8c7b6b", "#6e5e4e",
    "#a3956e", "#c4b89a", "#7a8c7e",
    "#5c6b5a", "#9aab8e", "#d4c9a8",
    "#8a7060", "#c2a882", "#4a5a48"
  ];

  // Define a set of overlapping rectangles with varied orientations
  const rects = [
    { x: 20,  y: 10,  w: 280, h: 180, angle: 0 },
    { x: 260, y: 0,   w: 320, h: 200, angle: 0 },
    { x: 0,   y: 160, w: 200, h: 220, angle: 0 },
    { x: 180, y: 140, w: 260, h: 180, angle: 0 },
    { x: 400, y: 170, w: 190, h: 240, angle: 0 },
    { x: 30,  y: 350, w: 240, h: 200, angle: 0 },
    { x: 240, y: 300, w: 200, h: 260, angle: 0 },
    { x: 410, y: 380, w: 180, h: 210, angle: 0 },
    { x: 60,  y: 530, w: 300, h: 70,  angle: 0 },
    { x: 330, y: 520, w: 260, h: 80,  angle: 0 },
    { x: 10,  y: 190, w: 160, h: 160, angle: 0 },
    { x: 440, y: 30,  w: 150, h: 160, angle: 0 },
    { x: 120, y: 420, w: 180, h: 160, angle: 0 },
    { x: 350, y: 440, w: 220, h: 150, angle: 0 },
  ];

  // Hatch angles to cycle through — varied for Diebenkorn-like layering
  const hatchAngles = [0, 45, 90, 135, 22, 67, 112, 157];

  // --- Pass 1: cpencil base color hatching ---
  brush.noStroke();

  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const col = palette[i % palette.length];
    const ang = hatchAngles[i % hatchAngles.length];
    const spacing = random(5, 12);

    brush.hatchStyle("cpencil", col, random(0.6, 1.1));
    brush.hatch(spacing, ang, { rand: 0.04, continuous: false });
    brush.beginShape(0.15);
    brush.vertex(r.x,       r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x,       r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Pass 2: second cpencil layer at cross angle for optical mixing ---
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const col = palette[(i + 4) % palette.length];
    const ang = (hatchAngles[i % hatchAngles.length] + 90) % 180;
    const spacing = random(7, 16);

    brush.hatchStyle("cpencil", col, random(0.5, 0.9));
    brush.hatch(spacing, ang, { rand: 0.05, continuous: false });
    brush.beginShape(0.15);
    brush.vertex(r.x,       r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x,       r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Pass 3: rotring fine hatching for shadow/dark zones ---
  const darkRects = [rects[2], rects[5], rects[8], rects[10], rects[12]];
  for (let i = 0; i < darkRects.length; i++) {
    const r = darkRects[i];
    const ang = hatchAngles[(i * 3) % hatchAngles.length];
    const spacing = random(3, 6);

    brush.hatchStyle("rotring", palette[(i * 2 + 1) % palette.length], random(0.3, 0.55));
    brush.hatch(spacing, ang, { rand: 0.04, continuous: true });
    brush.beginShape(0.15);
    brush.vertex(r.x,       r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x,       r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Pass 4: 2H light hatching for highlight zones ---
  const lightRects = [rects[0], rects[3], rects[6], rects[9], rects[11]];
  for (let i = 0; i < lightRects.length; i++) {
    const r = lightRects[i];
    const ang = (hatchAngles[(i * 2) % hatchAngles.length] + 45) % 180;

    brush.hatchStyle("2H", "#9a8f7a", random(0.5, 0.8));
    brush.hatch(random(9, 14), ang, { rand: 0.03, continuous: false });
    brush.beginShape(0.15);
    brush.vertex(r.x,       r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x,       r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Pass 5: pen outlines on all rectangles ---
  brush.noHatch();
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    // Vary outline darkness: some dark, some very faint
    const darkness = (i % 3 === 0) ? "#2a2018" : (i % 3 === 1) ? "#5a4e3e" : "#8a7a6a";
    const w = (i % 3 === 0) ? random(0.8, 1.3) : random(0.4, 0.8);

    brush.set("pen", darkness, w);
    brush.beginShape(0.2);
    brush.vertex(r.x,       r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x,       r.y + r.h);
    brush.endShape(true);
  }

  // --- Pass 6: a few rotring accent lines across the composition ---
  brush.set("rotring", "#3a2e20", 0.4);
  // Horizontal dividers
  brush.line(0,   200, 600, 200);
  brush.line(0,   380, 600, 380);
  brush.line(0,   520, 600, 520);
  // Vertical dividers
  brush.line(200, 0,   200, 600);
  brush.line(420, 0,   420, 600);

  // --- Pass 7: HB gestural diagonal strokes in a few zones ---
  brush.wiggle(1);
  const diagonalZones = [
    { x1: 20,  y1: 20,  x2: 200, y2: 180 },
    { x1: 260, y1: 300, x2: 430, y2: 450 },
    { x1: 440, y1: 30,  x2: 580, y2: 170 },
    { x1: 30,  y1: 430, x2: 200, y2: 590 },
  ];
  for (const z of diagonalZones) {
    brush.set("HB", "#4a3e2e", random(0.5, 0.9));
    const steps = floor(random(3, 7));
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const x1 = lerp(z.x1, z.x2, t) + random(-8, 8);
      const y1 = lerp(z.y1, z.y2, t) + random(-8, 8);
      const x2 = lerp(z.x1, z.x2, t + 1 / steps) + random(-8, 8);
      const y2 = lerp(z.y1, z.y2, t + 1 / steps) + random(-8, 8);
      brush.line(x1, y1, x2, y2);
    }
  }
  brush.noField();

  // --- Pass 8: 2B dark accent hatching in deepest shadow corners ---
  const deepShadow = [
    { x: 0,   y: 0,   w: 80,  h: 80  },
    { x: 520, y: 520, w: 80,  h: 80  },
    { x: 0,   y: 520, w: 80,  h: 80  },
    { x: 520, y: 0,   w: 80,  h: 80  },
  ];
  for (let i = 0; i < deepShadow.length; i++) {
    const r = deepShadow[i];
    brush.hatchStyle("2B", "#2a2018", 1.1);
    brush.hatch(3, 45, { rand: 0.06, continuous: true });
    brush.beginShape(0.15);
    brush.vertex(r.x,       r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x,       r.y + r.h);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("2B", "#1a1410", 1.3);
    brush.hatch(4, 120, { rand: 0.08, continuous: true });
    brush.beginShape(0.15);
    brush.vertex(r.x,       r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x,       r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  brush.noStroke();
  noLoop();
}