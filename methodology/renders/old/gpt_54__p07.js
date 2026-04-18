function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(37);
  noiseSeed(37);

  // subtle wall tint blocks
  brush.noStroke();
  brush.noHatch();
  brush.fill("#efe5d6", 55);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.25, 0.18, false);
  brush.rect(40, 35, 220, 160, "corner");

  brush.fill("#e8dcc9", 45);
  brush.fillBleed(0.06, "out");
  brush.fillTexture(0.22, 0.14, false);
  brush.rect(330, 60, 200, 120, "corner");

  brush.fill("#f1e7da", 35);
  brush.fillBleed(0.05, "out");
  brush.fillTexture(0.18, 0.12, false);
  brush.rect(120, 390, 310, 150, "corner");

  // ghost circles behind everything
  brush.noStroke();
  brush.noHatch();
  brush.fill("#d94d3f", 22);
  brush.fillBleed(0.14, "out");
  brush.fillTexture(0.45, 0.22);
  brush.circle(165, 165, 92, 0.25);

  brush.fill("#1a6f87", 18);
  brush.fillBleed(0.12, "out");
  brush.fillTexture(0.42, 0.2);
  brush.circle(265, 150, 84, 0.2);

  brush.fill("#111111", 12);
  brush.fillBleed(0.1, "out");
  brush.fillTexture(0.35, 0.18);
  brush.circle(400, 200, 105, 0.18);

  brush.fill("#e0a427", 20);
  brush.fillBleed(0.15, "out");
  brush.fillTexture(0.5, 0.25);
  brush.circle(470, 370, 100, 0.3);

  brush.fill("#4f8f61", 18);
  brush.fillBleed(0.12, "out");
  brush.fillTexture(0.38, 0.22);
  brush.circle(215, 430, 88, 0.25);

  brush.fill("#b03b7a", 14);
  brush.fillBleed(0.12, "out");
  brush.fillTexture(0.36, 0.16);
  brush.circle(345, 330, 120, 0.22);

  // spray-painted overlapping circles
  const sprayCircles = [
    { x: 140, y: 150, r: 78, c: "#ea5b4d", a: 42 },
    { x: 205, y: 138, r: 70, c: "#1f7d96", a: 36 },
    { x: 278, y: 172, r: 74, c: "#efb23d", a: 32 },
    { x: 375, y: 210, r: 92, c: "#222222", a: 30 },
    { x: 455, y: 172, r: 68, c: "#58a05c", a: 34 },
    { x: 118, y: 298, r: 63, c: "#2f2f35", a: 22 },
    { x: 185, y: 365, r: 88, c: "#d84676", a: 28 },
    { x: 282, y: 318, r: 95, c: "#f06b45", a: 34 },
    { x: 392, y: 350, r: 83, c: "#22738b", a: 28 },
    { x: 490, y: 378, r: 96, c: "#e2a12a", a: 30 },
    { x: 285, y: 485, r: 84, c: "#131313", a: 18 },
    { x: 435, y: 490, r: 74, c: "#7e9157", a: 24 }
  ];

  for (let sc of sprayCircles) {
    brush.noStroke();
    brush.noHatch();
    brush.fill(sc.c, sc.a);
    brush.fillBleed(0.18, "out");
    brush.fillTexture(0.62, 0.3, true);
    brush.circle(sc.x, sc.y, sc.r, 0.35);
  }

  // halos / ring outlines
  brush.noFill();
  brush.noHatch();
  brush.set("spray", "#cf4e40", 1.8);
  brush.circle(148, 156, 82, 0.4);
  brush.set("spray", "#156b82", 1.6);
  brush.circle(278, 318, 100, 0.35);
  brush.set("spray", "#d9981f", 1.7);
  brush.circle(490, 378, 100, 0.4);
  brush.set("spray", "#202020", 1.4);
  brush.circle(375, 210, 98, 0.3);

  // drips
  function drip(x, y, len, col, brushName, wt, wobble) {
    brush.set(brushName, col, wt);
    brush.noFill();
    brush.noHatch();
    brush.wiggle(wobble);
    brush.beginStroke("curve", x, y);
    let cy = y;
    for (let i = 0; i < 5; i++) {
      let ang = 92 + random(-10, 10);
      let seg = len / 5 + random(-6, 8);
      let p = map(i, 0, 4, 1.15, 0.6);
      brush.move(ang, seg, p);
      cy += seg;
    }
    brush.endStroke(90 + random(-8, 8), 0.35);
    brush.noField();

    brush.noStroke();
    brush.noHatch();
    brush.fill(col, 80);
    brush.fillBleed(0.08, "out");
    brush.fillTexture(0.22, 0.1, false);
    brush.circle(x + random(-3, 3), y + len + random(-4, 5), random(4, 8), 0.2);
  }

  drip(133, 214, 70, "#ea5b4d", "marker", 1.1, 1.4);
  drip(160, 220, 96, "#ea5b4d", "spray", 1.0, 2);
  drip(205, 193, 78, "#1f7d96", "marker", 0.95, 1.4);
  drip(273, 244, 88, "#efb23d", "marker", 0.9, 1.2);
  drip(359, 292, 126, "#222222", "charcoal", 1.1, 2.2);
  drip(390, 286, 98, "#222222", "marker", 0.85, 1.6);
  drip(466, 239, 112, "#58a05c", "marker", 0.95, 1.5);
  drip(282, 404, 96, "#f06b45", "spray", 1.2, 2.5);
  drip(493, 470, 62, "#e2a12a", "marker", 0.85, 1.2);

  // broad arrows
  function arrow(x1, y1, x2, y2, col, bodyBrush, headBrush, wt) {
    brush.noField();
    brush.set(bodyBrush, col, wt);
    brush.line(x1, y1, x2, y2);

    let a = atan2(y2 - y1, x2 - x1);
    let head = 20 + wt * 6;
    let side = 12 + wt * 3;

    let p1x = x2 - cos(a - 25) * head;
    let p1y = y2 - sin(a - 25) * head;
    let p2x = x2 - cos(a + 25) * head;
    let p2y = y2 - sin(a + 25) * head;

    brush.set(headBrush, col, wt * 1.05);
    brush.line(x2, y2, p1x, p1y);
    brush.line(x2, y2, p2x, p2y);

    brush.noStroke();
    brush.noHatch();
    brush.fill(col, 36);
    brush.fillBleed(0.1, "out");
    brush.fillTexture(0.28, 0.12, false);
    brush.polygon([
      [x2, y2],
      [x2 - cos(a - 18) * side, y2 - sin(a - 18) * side],
      [x2 - cos(a + 18) * side, y2 - sin(a + 18) * side]
    ]);
  }

  arrow(78, 505, 218, 438, "#242424", "marker", "pen", 1.35);
  arrow(500, 108, 402, 158, "#d44a42", "marker", "rotring", 1.1);
  arrow(328, 550, 414, 472, "#1c7288", "spray", "pen", 1.0);
  arrow(98, 98, 182, 120, "#db9b1a", "marker", "pen", 0.95);

  // scribble loops and ghost marks
  function scribble(points, br, col, wt, alphaLikeWiggle) {
    brush.set(br, col, wt);
    brush.noFill();
    brush.noHatch();
    brush.wiggle(alphaLikeWiggle);
    brush.spline(points, 0.72);
    brush.noField();
  }

  scribble(
    [[70, 105, 0.6], [115, 92, 1.0], [158, 126, 0.7], [122, 148, 0.8], [82, 133, 0.5]],
    "2H", "#6e6a63", 0.6, 2.2
  );
  scribble(
    [[345, 96, 0.6], [408, 82, 1.1], [452, 112, 0.9], [432, 146, 0.6], [374, 136, 0.5]],
    "cpencil", "#8f8677", 0.65, 1.8
  );
  scribble(
    [[72, 285, 0.4], [122, 262, 0.8], [168, 286, 0.7], [140, 322, 0.6], [88, 316, 0.4]],
    "HB", "#999081", 0.55, 1.7
  );
  scribble(
    [[380, 420, 0.5], [425, 392, 0.9], [476, 406, 0.7], [462, 448, 0.6], [401, 455, 0.5]],
    "2B", "#726a61", 0.75, 2.1
  );

  // repeated tags / fragments
  function tag(x, y, s, col, br) {
    push();
    translate(x, y);
    rotate(random(-14, 14));
    brush.set(br, col, s);

    brush.beginStroke("curve", 0, 0);
    brush.move(-18, 26, 1.0);
    brush.move(45, 18, 0.8);
    brush.move(-62, 20, 0.7);
    brush.endStroke(-20, 0.45);

    brush.beginStroke("curve", 18, -10);
    brush.move(82, 24, 0.8);
    brush.move(-8, 20, 0.7);
    brush.endStroke(-78, 0.35);

    brush.beginStroke("curve", 36, 4);
    brush.move(28, 22, 0.8);
    brush.move(-70, 18, 0.6);
    brush.endStroke(-24, 0.3);
    pop();
  }

  tag(108, 82, 0.72, "#2e2c2b", "rotring");
  tag(246, 116, 0.8, "#4d4a45", "pen");
  tag(438, 92, 0.7, "#8d2c55", "rotring");
  tag(95, 405, 0.9, "#574f47", "2B");
  tag(315, 266, 1.0, "#3a3937", "pen");
  tag(430, 520, 0.84, "#2f6170", "rotring");

  // charcoal vertical and diagonal scuffs
  brush.set("charcoal", "#2a2826", 1.0);
  brush.wiggle(3);
  for (let i = 0; i < 12; i++) {
    let x = 40 + i * 45 + random(-8, 8);
    brush.line(x, random(40, 120), x + random(-18, 20), random(420, 585));
  }
  brush.noField();

  brush.set("charcoal", "#3a312d", 0.75);
  for (let i = 0; i < 11; i++) {
    let x1 = random(20, 520);
    let y1 = random(140, 590);
    let x2 = x1 + random(50, 140);
    let y2 = y1 + random(-35, 30);
    brush.line(x1, y1, x2, y2);
  }

  // marker bars / accidental blocks
  brush.noStroke();
  brush.noHatch();

  brush.fill("#1d1d1d", 24);
  brush.fillBleed(0.06, "out");
  brush.fillTexture(0.18, 0.08, false);
  brush.rect(356, 452, 112, 26, "corner");

  brush.fill("#d74e43", 20);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.2, 0.1, false);
  brush.rect(84, 246, 138, 20, "corner");

  brush.fill("#1a738a", 16);
  brush.fillBleed(0.07, "out");
  brush.fillTexture(0.18, 0.08, false);
  brush.rect(402, 120, 108, 18, "corner");

  // quick circles and crossed notes
  brush.noFill();
  brush.noHatch();
  brush.set("rotring", "#282624", 0.75);
  brush.circle(515, 128, 24, 0.15);
  brush.circle(530, 142, 19, 0.15);
  brush.line(502, 113, 545, 154);

  brush.set("pen", "#ab3e36", 0.8);
  brush.circle(87, 82, 18, 0.1);
  brush.line(72, 82, 102, 82);
  brush.line(87, 67, 87, 97);

  brush.set("HB", "#4d4740", 0.6);
  brush.spline([[498, 505], [520, 490], [544, 498], [532, 520], [508, 522]], 0.6);

  // crayon and pastel dusty accents
  brush.set("crayon", "#d38d1d", 0.8);
  brush.wiggle(2.5);
  brush.line(240, 510, 352, 528);
  brush.line(252, 522, 340, 545);
  brush.noField();

  brush.set("pastel", "#6f8f54", 1.0);
  brush.wiggle(2.8);
  brush.line(430, 315, 540, 288);
  brush.line(438, 332, 552, 308);
  brush.noField();

  // faint architectural scratches
  brush.set("2H", "#a29a8f", 0.5);
  for (let i = 0; i < 18; i++) {
    let y = 40 + i * 28 + random(-3, 3);
    brush.line(random(10, 70), y, random(520, 590), y + random(-6, 6));
  }

  // final dark anchoring strokes
  brush.set("marker", "#111111", 1.1);
  brush.wiggle(1.3);
  brush.line(122, 566, 220, 554);
  brush.line(220, 554, 265, 570);
  brush.noField();

  brush.set("pen", "#191919", 0.9);
  brush.arc(350, 84, 28, 200, 360);
  brush.arc(362, 86, 40, 180, 330);

  noLoop();
}