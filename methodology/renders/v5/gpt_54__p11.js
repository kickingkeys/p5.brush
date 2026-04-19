function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(27);
  noiseSeed(27);

  noStroke();

  const palette = [
    "#8a6f53", // umber
    "#6f7d63", // olive sage
    "#b28b67", // tan
    "#7a5d4f", // warm brown
    "#9b8f7a", // stone
    "#6f8a8c"  // muted blue-green
  ];

  const rects = [
    { x: 48,  y: 62,  w: 210, h: 118, fill: "#d5c3ab", hatch1: "#8a6f53", hatch2: "#6f7d63", a1: 18,  a2: 108, d1: 9,  d2: 14 },
    { x: 190, y: 38,  w: 238, h: 168, fill: "#c2b49f", hatch1: "#7a5d4f", hatch2: "#6f8a8c", a1: 92,  a2: 12,  d1: 10, d2: 16 },
    { x: 356, y: 92,  w: 182, h: 132, fill: "#d8ccb6", hatch1: "#6f7d63", hatch2: "#8a6f53", a1: 0,   a2: 90,  d1: 8,  d2: 18 },
    { x: 82,  y: 168, w: 164, h: 146, fill: "#cab69b", hatch1: "#9b8f7a", hatch2: "#7a5d4f", a1: 30,  a2: 120, d1: 7,  d2: 15 },
    { x: 228, y: 184, w: 244, h: 154, fill: "#b9a890", hatch1: "#6f8a8c", hatch2: "#7a5d4f", a1: 75,  a2: 165, d1: 9,  d2: 13 },
    { x: 392, y: 246, w: 122, h: 118, fill: "#c8b79e", hatch1: "#8a6f53", hatch2: "#6f7d63", a1: 45,  a2: 135, d1: 7,  d2: 12 },
    { x: 64,  y: 332, w: 214, h: 152, fill: "#d4c7b2", hatch1: "#6f7d63", hatch2: "#9b8f7a", a1: 12,  a2: 102, d1: 10, d2: 18 },
    { x: 252, y: 352, w: 196, h: 128, fill: "#c7b39b", hatch1: "#7a5d4f", hatch2: "#8a6f53", a1: 82,  a2: 172, d1: 8,  d2: 14 },
    { x: 430, y: 392, w: 110, h: 122, fill: "#bca58d", hatch1: "#6f8a8c", hatch2: "#7a5d4f", a1: 28,  a2: 118, d1: 7,  d2: 12 }
  ];

  // soft underpainting blocks
  brush.noStroke();
  brush.noHatch();
  brush.fillTexture(0.45, 0.18, false);
  for (let r of rects) {
    brush.fill(r.fill, 78);
    brush.fillBleed(0.12, "out");
    brush.rect(r.x, r.y, r.w, r.h, "corner");
  }
  brush.noFill();

  // a few larger atmospheric planes behind the main structure
  brush.fillTexture(0.35, 0.12, false);
  brush.fill("#d9ccb8", 55);
  brush.fillBleed(0.1, "out");
  brush.rect(24, 24, 300, 220, "corner");
  brush.fill("#c9b79f", 48);
  brush.rect(310, 210, 250, 160, "corner");
  brush.fill("#e2d7c5", 42);
  brush.rect(120, 428, 360, 110, "corner");
  brush.noFill();

  // colored pencil hatching layers
  for (let r of rects) {
    push();
    let jx = random(-3, 3);
    let jy = random(-3, 3);
    translate(jx, jy);

    brush.noFill();

    brush.hatchStyle("cpencil", r.hatch1, 0.8);
    brush.hatch(r.d1, r.a1, {
      rand: 0.08,
      continuous: true,
      gradient: 0.18
    });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();

    brush.hatchStyle("cpencil", r.hatch2, 0.55);
    brush.hatch(r.d2, r.a2, {
      rand: 0.1,
      continuous: true,
      gradient: 0.22
    });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();

    pop();
  }

  // selected denser pen/rotring zones for structure
  const accentRects = [
    { x: 190, y: 38,  w: 238, h: 168, c: "#5e5347", a: 96,  d: 13 },
    { x: 228, y: 184, w: 244, h: 154, c: "#4f695d", a: 168, d: 11 },
    { x: 64,  y: 332, w: 214, h: 152, c: "#6a5848", a: 8,   d: 12 }
  ];

  for (let r of accentRects) {
    brush.noFill();
    brush.hatchStyle("rotring", r.c, 0.45);
    brush.hatch(r.d, r.a, {
      rand: 0.05,
      continuous: true,
      gradient: 0.1
    });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();
  }

  // subtle graphite edge echoes
  brush.set("2H", "#8d8477", 0.45);
  for (let r of rects) {
    let o = random(-4, 4);
    brush.rect(r.x + o, r.y + o, r.w, r.h, "corner");
  }

  // main pen outlines
  brush.set("pen", "#3f3933", 0.75);
  for (let r of rects) {
    brush.rect(r.x, r.y, r.w, r.h, "corner");
  }

  // a few darker structural redraws
  brush.set("HB", "#2f2a26", 0.9);
  brush.rect(190, 38, 238, 168, "corner");
  brush.rect(228, 184, 244, 154, "corner");
  brush.rect(64, 332, 214, 152, "corner");

  // linear landscape-like divisions
  const lines = [
    [40, 212, 560, 212],
    [110, 338, 515, 338],
    [248, 40, 248, 548],
    [428, 92, 428, 514],
    [48, 482, 560, 482]
  ];

  brush.set("rotring", "#544a42", 0.35);
  for (let ln of lines) {
    brush.line(ln[0], ln[1], ln[2], ln[3]);
  }

  // sparse colored pencil slivers to break the grid
  for (let i = 0; i < 18; i++) {
    let x = random(70, 530);
    let y = random(70, 530);
    let len = random(28, 74);
    let ang = random([0, 18, 32, 75, 90, 118, 165]);
    let c = random(palette);
    let x2 = x + cos(ang) * len;
    let y2 = y + sin(ang) * len;
    brush.set("cpencil", c, random(0.45, 0.8));
    brush.line(x, y, x2, y2);
  }

  // quiet shadow bars for depth
  brush.noStroke();
  brush.fillTexture(0.28, 0.1, false);
  brush.fill("#8a6f53", 18);
  brush.fillBleed(0.08, "out");
  brush.rect(190, 38, 238, 168, "corner");
  brush.rect(228, 184, 244, 154, "corner");
  brush.noFill();

  noLoop();
}