function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5ede0");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Define a Diebenkorn-inspired palette of muted earth tones
  let palette = [
    { fill: "#c9a87c", stroke: "#7a5c3a" },
    { fill: "#8faa8b", stroke: "#4a6b4a" },
    { fill: "#d4b896", stroke: "#8b6c4f" },
    { fill: "#b5c4b1", stroke: "#5a7a5a" },
    { fill: "#c8b8a2", stroke: "#6b5540" },
    { fill: "#a0b4a0", stroke: "#3d5c3d" },
    { fill: "#d9c4a8", stroke: "#9a7a55" },
    { fill: "#7a9e9f", stroke: "#3a5f60" },
    { fill: "#c4a882", stroke: "#7a5a35" },
    { fill: "#b8cdb8", stroke: "#4a6a4a" },
    { fill: "#e0cdb0", stroke: "#a08060" },
    { fill: "#9ab8a0", stroke: "#4a7050" },
  ];

  let hatchBrushes = ["HB", "2H", "rotring", "pen", "cpencil"];
  let strokeBrushes = ["2B", "HB", "cpencil", "charcoal", "pen"];

  // Rectangles that subdivide the canvas like an Ocean Park painting
  let rects = [
    // Large background bands
    { x: 0,   y: 0,   w: 600, h: 180, ci: 0,  ha: 15,  hd: 8,  hb: 1 },
    { x: 0,   y: 160, w: 600, h: 200, ci: 1,  ha: 92,  hd: 10, hb: 3 },
    { x: 0,   y: 340, w: 600, h: 260, ci: 2,  ha: 5,   hd: 12, hb: 5 },

    // Overlapping vertical panels
    { x: 30,  y: 40,  w: 160, h: 320, ci: 3,  ha: 75,  hd: 9,  hb: 2 },
    { x: 180, y: 20,  w: 130, h: 280, ci: 4,  ha: 105, hd: 7,  hb: 4 },
    { x: 290, y: 60,  w: 180, h: 260, ci: 5,  ha: 30,  hd: 11, hb: 0 },
    { x: 420, y: 30,  w: 150, h: 300, ci: 6,  ha: 60,  hd: 8,  hb: 2 },

    // Mid-section accents
    { x: 60,  y: 200, w: 200, h: 150, ci: 7,  ha: 120, hd: 6,  hb: 5 },
    { x: 240, y: 180, w: 160, h: 200, ci: 8,  ha: 45,  hd: 9,  hb: 1 },
    { x: 380, y: 210, w: 190, h: 160, ci: 9,  ha: 80,  hd: 7,  hb: 3 },

    // Lower horizontal strips
    { x: 0,   y: 380, w: 260, h: 120, ci: 10, ha: 10,  hd: 10, hb: 4 },
    { x: 230, y: 360, w: 200, h: 140, ci: 11, ha: 55,  hd: 8,  hb: 0 },
    { x: 400, y: 370, w: 200, h: 130, ci: 0,  ha: 135, hd: 9,  hb: 2 },

    // Small accent blocks
    { x: 50,  y: 440, w: 120, h: 100, ci: 1,  ha: 20,  hd: 6,  hb: 5 },
    { x: 310, y: 450, w: 140, h: 110, ci: 2,  ha: 70,  hd: 7,  hb: 3 },
    { x: 460, y: 460, w: 110, h: 100, ci: 3,  ha: 100, hd: 5,  hb: 1 },

    // Top accent strips
    { x: 100, y: 0,   w: 300, h: 60,  ci: 4,  ha: 0,   hd: 7,  hb: 4 },
    { x: 350, y: 10,  w: 200, h: 80,  ci: 5,  ha: 90,  hd: 6,  hb: 2 },

    // Cross-cutting diagonals as thin rects
    { x: 0,   y: 290, w: 600, h: 30,  ci: 6,  ha: 3,   hd: 5,  hb: 0 },
    { x: 200, y: 0,   w: 40,  h: 600, ci: 7,  ha: 88,  hd: 6,  hb: 3 },
    { x: 440, y: 0,   w: 30,  h: 600, ci: 8,  ha: 92,  hd: 5,  hb: 5 },
  ];

  // Draw fills first
  for (let i = 0; i < rects.length; i++) {
    let r = rects[i];
    let c = palette[r.ci % palette.length];
    let hb = palette[r.hb % palette.length];
    let hBrush = hatchBrushes[i % hatchBrushes.length];
    let sBrush = strokeBrushes[i % strokeBrushes.length];

    // Watercolor fill
    brush.fill(c.fill, 90 + (i % 5) * 12);
    brush.fillBleed(0.12 + (i % 4) * 0.04, "out");
    brush.fillTexture(0.45 + (i % 3) * 0.1, 0.35);

    // Hatch
    brush.hatch(r.hd, r.ha, {
      rand: 0.08 + (i % 5) * 0.03,
      continuous: (i % 3 === 0),
      gradient: (i % 4 === 0) ? 0.3 : false
    });
    brush.hatchStyle(hBrush, hb.stroke, 0.6 + (i % 3) * 0.2);

    // Stroke
    brush.set(sBrush, c.stroke, 0.5 + (i % 4) * 0.15);

    brush.rect(r.x, r.y, r.w, r.h, "corner");
  }

  // Draw some additional bare-stroke line accents
  brush.noFill();
  brush.noHatch();

  let lineAccents = [
    { x1: 0,   y1: 170, x2: 600, y2: 155, b: "2B",      c: "#5a4030", w: 0.8 },
    { x1: 0,   y1: 350, x2: 600, y2: 345, b: "charcoal", c: "#3a3a3a", w: 0.6 },
    { x1: 195, y1: 0,   x2: 205, y2: 600, b: "rotring",  c: "#2a3a5a", w: 0.5 },
    { x1: 435, y1: 0,   x2: 445, y2: 600, b: "pen",      c: "#3a2a1a", w: 0.5 },
    { x1: 0,   y1: 295, x2: 600, y2: 305, b: "HB",       c: "#4a4a4a", w: 0.7 },
    { x1: 0,   y1: 480, x2: 600, y2: 470, b: "cpencil",  c: "#6a5040", w: 0.6 },
    { x1: 80,  y1: 0,   x2: 90,  y2: 600, b: "2H",       c: "#7a8a7a", w: 0.4 },
    { x1: 380, y1: 0,   x2: 375, y2: 600, b: "pen",      c: "#4a5a6a", w: 0.4 },
  ];

  for (let la of lineAccents) {
    brush.set(la.b, la.c, la.w);
    brush.line(la.x1, la.y1, la.x2, la.y2);
  }

  noLoop();
}