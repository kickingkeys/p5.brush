let W = 600, H = 600;

function setup() {
  createCanvas(W, H, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#f2ede4");
  noLoop();
}

function draw() {
  translate(-W / 2, -H / 2);
  background("#f2ede4");

  // --- Background atmosphere: large ghosted spray blobs ---
  let blobData = [
    { x: 120, y: 180, r: 110, col: "#c0392b", count: 200 },
    { x: 420, y: 130, r: 90,  col: "#1a5276", count: 160 },
    { x: 310, y: 380, r: 130, col: "#117a65", count: 220 },
    { x: 80,  y: 460, r: 80,  col: "#7d3c98", count: 140 },
    { x: 520, y: 420, r: 100, col: "#b7950b", count: 180 },
    { x: 240, y: 560, r: 70,  col: "#1a5276", count: 120 },
    { x: 490, y: 270, r: 85,  col: "#922b21", count: 150 },
  ];

  for (let b of blobData) {
    // outer halo pass
    brush.set("spray", b.col, 2.8);
    for (let i = 0; i < b.count; i++) {
      let a = random(360);
      let d = random(b.r * 0.3, b.r);
      let px = b.x + cos(a) * d;
      let py = b.y + sin(a) * d;
      brush.flowLine(px, py, random(6, 18), random(360));
    }
    // inner concentrated pass
    brush.set("spray", b.col, 1.5);
    for (let i = 0; i < b.count * 0.5; i++) {
      let a = random(360);
      let d = random(b.r * 0.15);
      let px = b.x + cos(a) * d;
      let py = b.y + sin(a) * d;
      brush.flowLine(px, py, random(4, 12), random(360));
    }
  }

  // --- Spray drips ---
  let dripColors = ["#c0392b", "#1a5276", "#117a65", "#7d3c98", "#b7950b"];
  let dripSources = [
    { x: 120, y: 180 }, { x: 420, y: 130 }, { x: 310, y: 380 },
    { x: 80,  y: 460 }, { x: 520, y: 420 }, { x: 490, y: 270 },
  ];
  for (let i = 0; i < dripSources.length; i++) {
    let ds = dripSources[i];
    let col = dripColors[i % dripColors.length];
    let numDrips = floor(random(2, 5));
    for (let d = 0; d < numDrips; d++) {
      let sx = ds.x + random(-18, 18);
      let sy = ds.y + random(0, 20);
      let dripLen = random(30, 100);
      let pts = [[sx, sy]];
      let cx = sx;
      let cy = sy;
      let steps = floor(dripLen / 8);
      for (let s = 0; s < steps; s++) {
        cx += random(-3, 3);
        cy += random(6, 12);
        pts.push([cx, cy]);
      }
      brush.set("marker", col, random(0.4, 0.9));
      brush.spline(pts, 0.35);
    }
  }

  // --- Bold overlapping spray circles (hard stencil rings) ---
  let ringData = [
    { x: 160, y: 220, r: 70,  col: "#c0392b" },
    { x: 390, y: 170, r: 55,  col: "#1a5276" },
    { x: 280, y: 340, r: 85,  col: "#117a65" },
    { x: 470, y: 390, r: 60,  col: "#7d3c98" },
    { x: 100, y: 400, r: 50,  col: "#b7950b" },
    { x: 330, y: 500, r: 65,  col: "#922b21" },
    { x: 530, y: 200, r: 45,  col: "#1e8449" },
  ];

  for (let rg of ringData) {
    brush.noFill();
    brush.set("marker", rg.col, random(1.2, 2.2));
    brush.circle(rg.x, rg.y, rg.r, 0.4);
    // second thinner pass offset slightly
    brush.set("marker", rg.col, random(0.5, 1.0));
    brush.circle(rg.x + random(-4, 4), rg.y + random(-4, 4), rg.r * random(0.88, 1.08), 0.3);
  }

  // --- Ghosted hand-drawn marks (charcoal, HB) ---
  brush.field("hand");
  brush.wiggle(3);

  // Loose gestural scribbles
  let scribbleData = [
    { x: 200, y: 100, col: "#333333", br: "charcoal", w: 0.6 },
    { x: 450, y: 300, col: "#222222", br: "charcoal", w: 0.5 },
    { x: 130, y: 320, col: "#555555", br: "HB",       w: 0.4 },
    { x: 370, y: 480, col: "#444444", br: "charcoal", w: 0.7 },
    { x: 540, y: 130, col: "#333333", br: "HB",       w: 0.3 },
    { x: 60,  y: 550, col: "#666666", br: "2B",       w: 0.5 },
    { x: 300, y: 60,  col: "#444444", br: "charcoal", w: 0.6 },
  ];

  for (let sc of scribbleData) {
    brush.set(sc.br, sc.col, sc.w);
    let numLines = floor(random(3, 7));
    for (let l = 0; l < numLines; l++) {
      let x1 = sc.x + random(-45, 45);
      let y1 = sc.y + random(-30, 30);
      let x2 = sc.x + random(-60, 60);
      let y2 = sc.y + random(-50, 50);
      brush.line(x1, y1, x2, y2);
    }
  }

  brush.noField();

  // --- Arrows (graffiti-style, pen/rotring) ---
  let arrowData = [
    { x: 180, y: 270, angle: -30,  len: 55, col: "#c0392b",  br: "pen" },
    { x: 350, y: 150, angle: 60,   len: 45, col: "#1a5276",  br: "rotring" },
    { x: 420, y: 450, angle: -120, len: 60, col: "#117a65",  br: "pen" },
    { x: 90,  y: 180, angle: 80,   len: 40, col: "#7d3c98",  br: "rotring" },
    { x: 500, y: 330, angle: 200,  len: 50, col: "#b7950b",  br: "pen" },
    { x: 260, y: 520, angle: 10,   len: 48, col: "#922b21",  br: "rotring" },
    { x: 560, y: 480, angle: -70,  len: 42, col: "#1e8449",  br: "pen" },
  ];

  for (let ar of arrowData) {
    brush.set(ar.br, ar.col, random(0.6, 1.1));
    let ex = ar.x + cos(ar.angle) * ar.len;
    let ey = ar.y + sin(ar.angle) * ar.len;
    brush.line(ar.x, ar.y, ex, ey);
    // arrowhead barbs
    let bLen = ar.len * 0.28;
    let b1x = ex + cos(ar.angle + 145) * bLen;
    let b1y = ey + sin(ar.angle + 145) * bLen;
    let b2x = ex + cos(ar.angle - 145) * bLen;
    let b2y = ey + sin(ar.angle - 145) * bLen;
    brush.line(ex, ey, b1x, b1y);
    brush.line(ex, ey, b2x, b2y);
  }

  // --- Stencil-style text fragments (block letters via pen) ---
  brush.set("pen", "#1a1a1a", 1.0);
  // "Z" shape
  let zx = 55, zy = 90, zw = 30, zh = 40;
  brush.line(zx, zy, zx + zw, zy);
  brush.line(zx + zw, zy, zx, zy + zh);
  brush.line(zx, zy + zh, zx + zw, zy + zh);

  // "X" shape
  let xx = 490, xy2 = 70;
  brush.line(xx, xy2, xx + 28, xy2 + 36);
  brush.line(xx + 28, xy2, xx, xy2 + 36);

  // "+" shape
  let px2 = 300, py2 = 220;
  brush.line(px2 - 18, py2, px2 + 18, py2);
  brush.line(px2, py2 - 18, px2, py2 + 18);

  // ">" chevron
  let chx = 200, chy = 460;
  brush.line(chx, chy - 20, chx + 22, chy);
  brush.line(chx + 22, chy, chx, chy + 20);

  // second ">" offset
  brush.set("pen", "#c0392b", 0.8);
  brush.line(chx + 10, chy - 20, chx + 32, chy);
  brush.line(chx + 32, chy, chx + 10, chy + 20);

  // --- Faint pencil cross-hatch patches (texture) ---
  brush.noFill();
  let hatchZones = [
    { x: 50,  y: 50,  w: 80, h: 60, a1: 40,  a2: 100, col: "#888888" },
    { x: 430, y: 50,  w: 70, h: 55, a1: 30,  a2: 90,  col: "#777777" },
    { x: 200, y: 440, w: 90, h: 65, a1: 55,  a2: 115, col: "#666666" },
    { x: 430, y: 510, w: 75, h: 55, a1: 20,  a2: 80,  col: "#888888" },
  ];

  for (let hz of hatchZones) {
    brush.hatchStyle("2H", hz.col, 0.4);
    brush.hatch(7, hz.a1, { rand: 0.08, continuous: true });
    brush.polygon([
      [hz.x, hz.y],
      [hz.x + hz.w, hz.y],
      [hz.x + hz.w, hz.y + hz.h],
      [hz.x, hz.y + hz.h],
    ]);
    brush.hatch(8, hz.a2, { rand: 0.06, continuous: true });
    brush.polygon([
      [hz.x, hz.y],
      [hz.x + hz.w, hz.y],
      [hz.x + hz.w, hz.y + hz.h],
      [hz.x, hz.y + hz.h],
    ]);
    brush.noHatch();
  }

  // --- Crayon/pastel smear marks ---
  let smearData = [
    { x: 140, y: 500, col: "#e74c3c", br: "crayon", w: 1.0 },
    { x: 380, y: 80,  col: "#2980b9", br: "pastel", w: 0.9 },
    { x: 510, y: 540, col: "#27ae60", br: "crayon", w: 1.1 },
    { x: 60,  y: 260, col: "#8e44ad", br: "pastel", w: 0.8 },
    { x: 340, y: 260, col: "#d35400", br: "crayon", w: 1.0 },
  ];

  brush.field("hand");
  brush.wiggle(2);

  for (let sm of smearData) {
    brush.set(sm.br, sm.col, sm.w);
    let numS = floor(random(4, 9));
    for (let k = 0; k < numS; k++) {
      let sx = sm.x + random(-35, 35);
      let sy = sm.y + random(-20, 20);
      let ex2 = sx + random(-50, 50);
      let ey2 = sy + random(-15, 15);
      brush.line(sx, sy, ex2, ey2);
    }
  }

  brush.noField();

  // --- Final bold marker tags (loose, overlapping) ---
  let tagData = [
    { x: 240, y: 200, col: "#c0392b", w: 1.8 },
    { x: 420, y: 360, col: "#1a5276", w: 1.6 },
    { x: 100, y: 350, col: "#117a65", w: 1.5 },
    { x: 350, y: 430, col: "#7d3c98", w: 1.7 },
  ];

  for (let tg of tagData) {
    brush.set("marker", tg.col, tg.w);
    // wavy tag stroke
    let pts = [];
    let tx = tg.x - 40;
    let ty = tg.y;
    for (let i = 0; i <= 8; i++) {
      let t = i / 8;
      pts.push([
        tx + t * 80 + random(-4, 4),
        ty + sin(t * 360 * 2) * 10 + random(-4, 4),
      ]);
    }
    brush.spline(pts, 0.5);
    // underline
    brush.line(tg.x - 40, tg.y + 14, tg.x + 40, tg.y + 14);
  }

  noLoop();
}