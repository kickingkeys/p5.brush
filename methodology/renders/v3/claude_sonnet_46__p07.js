function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5ede0");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- SPRAY CIRCLE LAYER: large overlapping spray circles ---
  let sprayCircles = [
    { x: 120, y: 140, r: 90, col: "#c0392b", passes: 6 },
    { x: 310, y: 200, r: 110, col: "#1a237e", passes: 7 },
    { x: 480, y: 130, r: 80, col: "#1b5e20", passes: 5 },
    { x: 200, y: 370, r: 100, col: "#e65100", passes: 6 },
    { x: 420, y: 390, r: 95, col: "#880e4f", passes: 6 },
    { x: 560, y: 310, r: 70, col: "#006064", passes: 5 },
    { x: 80,  y: 480, r: 85, col: "#4a148c", passes: 5 },
    { x: 300, y: 530, r: 75, col: "#bf360c", passes: 4 },
    { x: 500, y: 520, r: 65, col: "#1a237e", passes: 4 },
    { x: 160, y: 260, r: 60, col: "#33691e", passes: 4 },
    { x: 370, y: 280, r: 50, col: "#880e4f", passes: 3 },
  ];

  for (let sc of sprayCircles) {
    brush.field("curved");
    for (let pass = 0; pass < sc.passes; pass++) {
      let wt = map(pass, 0, sc.passes - 1, 2.8, 0.4);
      let alpha = map(pass, 0, sc.passes - 1, 0.9, 0.15);
      brush.set("spray", sc.col, wt);
      let count = floor(map(pass, 0, sc.passes - 1, 120, 30));
      for (let i = 0; i < count; i++) {
        let angle = random(360);
        let dist = random(0, sc.r * (1 - pass / sc.passes));
        let px = sc.x + cos(angle) * dist;
        let py = sc.y + sin(angle) * dist;
        brush.flowLine(px, py, random(6, 18), random(360));
      }
    }
    brush.noField();
  }

  // --- DRIPS: vertical spray drips below some circles ---
  let dripData = [
    { x: 105, y: 210, col: "#c0392b" },
    { x: 320, y: 290, col: "#1a237e" },
    { x: 475, y: 195, col: "#1b5e20" },
    { x: 210, y: 445, col: "#e65100" },
    { x: 430, y: 465, col: "#880e4f" },
    { x: 85,  y: 545, col: "#4a148c" },
  ];

  for (let d of dripData) {
    let dripLen = random(30, 90);
    let numDrips = floor(random(2, 5));
    for (let k = 0; k < numDrips; k++) {
      let dx = d.x + random(-14, 14);
      brush.set("spray", d.col, random(0.6, 1.5));
      let steps = floor(dripLen / 6);
      for (let s = 0; s < steps; s++) {
        brush.flowLine(
          dx + random(-2, 2),
          d.y + s * 6,
          random(5, 10),
          90 + random(-8, 8)
        );
      }
    }
  }

  // --- GHOSTED HAND-DRAWN MARKS: charcoal gestural strokes ---
  brush.field("hand");
  brush.wiggle(4);

  let ghostMarks = [
    { pts: [[30, 80], [120, 60], [200, 90], [270, 70]], col: "#555", wt: 0.7 },
    { pts: [[400, 50], [480, 80], [560, 55]], col: "#444", wt: 0.5 },
    { pts: [[20, 200], [90, 220], [160, 195], [230, 215]], col: "#666", wt: 0.6 },
    { pts: [[350, 150], [430, 170], [510, 145], [580, 165]], col: "#555", wt: 0.5 },
    { pts: [[10, 340], [80, 360], [150, 330], [220, 355]], col: "#777", wt: 0.6 },
    { pts: [[300, 430], [390, 450], [470, 425], [550, 445]], col: "#666", wt: 0.5 },
    { pts: [[40, 490], [110, 510], [180, 485]], col: "#555", wt: 0.7 },
    { pts: [[260, 560], [340, 545], [420, 565], [500, 550]], col: "#666", wt: 0.5 },
    { pts: [[50, 580], [130, 570], [210, 585]], col: "#777", wt: 0.4 },
  ];

  for (let gm of ghostMarks) {
    brush.set("charcoal", gm.col, gm.wt);
    brush.spline(gm.pts, 0.4);
  }

  // Large sweeping ghost arcs
  brush.set("charcoal", "#888", 0.4);
  brush.spline([[0, 300], [150, 250], [300, 280], [450, 240], [600, 270]], 0.5);
  brush.spline([[0, 420], [100, 400], [250, 430], [400, 410], [600, 440]], 0.5);

  brush.noField();

  // --- ARROWS: marker arrows scattered across the wall ---
  let arrows = [
    { x: 55,  y: 155, dir: 0,   col: "#c0392b", wt: 1.5 },
    { x: 240, y: 100, dir: 180, col: "#1a237e", wt: 1.3 },
    { x: 520, y: 230, dir: 270, col: "#1b5e20", wt: 1.4 },
    { x: 140, y: 450, dir: 45,  col: "#e65100", wt: 1.2 },
    { x: 490, y: 470, dir: 135, col: "#880e4f", wt: 1.3 },
    { x: 350, y: 340, dir: 315, col: "#006064", wt: 1.2 },
    { x: 30,  y: 390, dir: 90,  col: "#4a148c", wt: 1.4 },
    { x: 560, y: 80,  dir: 225, col: "#bf360c", wt: 1.2 },
    { x: 280, y: 490, dir: 0,   col: "#33691e", wt: 1.3 },
    { x: 450, y: 580, dir: 180, col: "#1a237e", wt: 1.1 },
  ];

  for (let ar of arrows) {
    push();
    translate(ar.x, ar.y);
    rotate(ar.dir);

    let len = random(28, 48);
    // Shaft
    brush.set("marker", ar.col, ar.wt);
    brush.line(0, 0, len, 0);

    // Arrowhead
    brush.set("marker", ar.col, ar.wt * 0.9);
    brush.line(len, 0, len - 12, -8);
    brush.line(len, 0, len - 12, 8);

    pop();
  }

  // --- STENCIL-STYLE LETTER FRAGMENTS: pen marks suggesting letters ---
  brush.set("pen", "#222", 1.0);

  // Rough "A" fragment
  push();
  translate(340, 100);
  brush.line(0, 40, 12, 0);
  brush.line(12, 0, 24, 40);
  brush.line(5, 22, 19, 22);
  pop();

  // Rough "X" fragment
  push();
  translate(60, 310);
  brush.line(0, 0, 28, 32);
  brush.line(28, 0, 0, 32);
  pop();

  // Rough "Z" fragment
  push();
  translate(510, 350);
  brush.line(0, 0, 28, 0);
  brush.line(28, 0, 0, 36);
  brush.line(0, 36, 28, 36);
  pop();

  // Rough "O" fragment (arc pair)
  push();
  translate(230, 530);
  brush.arc(14, 16, 16, 200, 360);
  brush.arc(14, 16, 16, 0, 160);
  pop();

  // --- HATCHED RECTANGULAR PATCHES: rotring cross-hatch fragments ---
  let patches = [
    { x: 25,  y: 30,  w: 60, h: 40, ang: 30,  col: "#333" },
    { x: 530, y: 420, w: 55, h: 35, ang: 150, col: "#222" },
    { x: 260, y: 20,  w: 65, h: 38, ang: 60,  col: "#444" },
    { x: 10,  y: 530, w: 50, h: 40, ang: 120, col: "#333" },
    { x: 500, y: 560, w: 55, h: 30, ang: 45,  col: "#444" },
  ];

  for (let p of patches) {
    brush.hatchStyle("rotring", p.col, 0.4);
    brush.hatch(5, p.ang, { rand: 0.05, continuous: true });
    brush.noStroke();
    brush.noFill();
    brush.rect(p.x, p.y, p.w, p.h);
    brush.noHatch();
    brush.noStroke();
  }

  // --- PENCIL SCRAWL LINES: 2B loose scrawl ---
  brush.field("hand");
  brush.wiggle(3);

  let scrawls = [
    { pts: [[170, 30], [200, 45], [230, 28], [260, 42]], col: "#444" },
    { pts: [[380, 480], [410, 495], [440, 478], [470, 493]], col: "#555" },
    { pts: [[520, 165], [545, 180], [570, 162], [595, 178]], col: "#444" },
    { pts: [[10, 460], [40, 475], [70, 458], [100, 473]], col: "#555" },
    { pts: [[130, 590], [170, 578], [210, 592], [250, 580]], col: "#666" },
  ];

  for (let sc of scrawls) {
    brush.set("2B", sc.col, 0.5);
    brush.spline(sc.pts, 0.3);
  }

  brush.noField();

  // --- MARKER BOLD OUTLINES: a few bold marker circle outlines ---
  let boldCircles = [
    { x: 120, y: 140, r: 88, col: "#c0392b" },
    { x: 310, y: 200, r: 108, col: "#1a237e" },
    { x: 200, y: 370, r: 98, col: "#e65100" },
  ];

  brush.wiggle(2);
  for (let bc of boldCircles) {
    brush.set("marker", bc.col, 1.8);
    brush.noFill();
    brush.circle(bc.x, bc.y, bc.r);
  }
  brush.wiggle(0);

  // --- FINAL TEXTURE: light 2H pencil noise across whole canvas ---
  brush.noField();
  brush.set("2H", "#aaa", 0.3);
  for (let i = 0; i < 60; i++) {
    let tx = random(600);
    let ty = random(600);
    brush.line(tx, ty, tx + random(-20, 20), ty + random(-20, 20));
  }

  noLoop();
}