function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(17);
  noiseSeed(17);

  // --- soft rainy sky / atmosphere ---
  brush.noStroke();
  brush.fillTexture(0.65, 0.35);
  for (let i = 0; i < 14; i++) {
    let x = random(40, 560);
    let y = random(20, 260);
    let r = random(70, 150);
    let c = random(["#a9b7d6", "#8c97b8", "#7a86a8", "#b7a8c6"]);
    brush.fill(c, random(22, 45));
    brush.fillBleed(random(0.38, 0.58), "out");
    brush.circle(x, y, r, 0.35);
  }
  brush.noFill();

  // --- distant building haze as watercolor blocks ---
  brush.noStroke();
  brush.fillTexture(0.55, 0.28);
  let buildings = [
    { x: 20,  w: 78, h: 220, c: "#c1c7d6" },
    { x: 90,  w: 72, h: 260, c: "#bcc2d0" },
    { x: 150, w: 95, h: 235, c: "#c8c7d1" },
    { x: 230, w: 68, h: 280, c: "#b7bfce" },
    { x: 290, w: 86, h: 245, c: "#c6c2cb" },
    { x: 360, w: 74, h: 270, c: "#bec4d1" },
    { x: 425, w: 82, h: 230, c: "#c8c7d3" },
    { x: 500, w: 76, h: 255, c: "#bcc2cf" }
  ];

  for (let b of buildings) {
    brush.fill(b.c, 34);
    brush.fillBleed(0.28, "out");
    brush.rect(b.x, 140 + random(-10, 15), b.w, b.h);
  }
  brush.noFill();

  // --- wet street base wash ---
  brush.wash("#9aa3b6", 78);
  brush.noStroke();
  beginOrganicQuad(
    [0, 340],
    [600, 300],
    [600, 600],
    [0, 600],
    0.18
  );
  brush.noWash();

  // --- darker roadway watercolor layers ---
  brush.noStroke();
  brush.fillTexture(0.75, 0.45);
  let roadLayers = [
    { c: "#6d7386", a: 58, inset: 1.00 },
    { c: "#596173", a: 62, inset: 0.86 },
    { c: "#444c5e", a: 68, inset: 0.72 }
  ];
  for (let layer of roadLayers) {
    brush.fill(layer.c, layer.a);
    brush.fillBleed(0.34, "out");
    let s = layer.inset;
    brush.beginShape(0.45);
    brush.vertex(lerp(300, 0, s), lerp(600, 345, s));
    brush.vertex(lerp(300, 600, s), lerp(600, 305, s));
    brush.vertex(lerp(300, 600, s), 600);
    brush.vertex(lerp(300, 0, s), 600);
    brush.endShape(true);
  }
  brush.noFill();

  // --- watercolor puddle blooms on pavement ---
  brush.noStroke();
  brush.fillTexture(0.7, 0.38);
  for (let i = 0; i < 18; i++) {
    let x = random(40, 560);
    let y = random(360, 580);
    let r = random(22, 70);
    let c = random(["#7f88a1", "#6f768b", "#93a0b3", "#5f677b"]);
    brush.fill(c, random(18, 40));
    brush.fillBleed(random(0.3, 0.48), "out");
    brush.circle(x, y, r, 0.45);
  }
  brush.noFill();

  // --- neon marker reflections on wet pavement ---
  brush.wiggle(1);

  neonReflection(120, 355, 26, 210, "#16d1ff");
  neonReflection(190, 330, 34, 250, "#ff4fd8");
  neonReflection(265, 345, 24, 190, "#ffd34d");
  neonReflection(355, 325, 30, 235, "#ff6b5b");
  neonReflection(435, 340, 28, 210, "#63ff9c");
  neonReflection(510, 360, 22, 185, "#7a6dff");

  // --- vertical sign smears above horizon ---
  markerSmear(105, 165, 18, 110, "#16d1ff");
  markerSmear(180, 120, 22, 135, "#ff4fd8");
  markerSmear(258, 150, 16, 90, "#ffd34d");
  markerSmear(345, 110, 20, 145, "#ff6b5b");
  markerSmear(428, 142, 18, 115, "#63ff9c");
  markerSmear(500, 132, 15, 95, "#7a6dff");

  brush.noField();

  // --- subtle rain streaks ---
  brush.set("2H", "#8d95a8", 0.45);
  for (let i = 0; i < 170; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(8, 24);
    brush.line(x, y, x - random(2, 6), y + len);
  }

  brush.set("HB", "#70798b", 0.3);
  for (let i = 0; i < 110; i++) {
    let x = random(0, 600);
    let y = random(260, 600);
    let len = random(6, 18);
    brush.line(x, y, x - random(1, 4), y + len);
  }

  // --- curb / street structure in sparse ink ---
  brush.noFill();
  brush.set("rotring", "#2f3340", 0.55);
  brush.line(0, 345, 600, 305);
  brush.line(240, 600, 282, 345);
  brush.line(360, 600, 322, 325);

  brush.set("pen", "#3b3f4a", 0.7);
  for (let x = 35; x < 580; x += 62) {
    brush.line(x, 290 + random(-4, 6), x + random(-8, 8), 355 + random(-6, 6));
  }

  // --- window / sign hints ---
  brush.set("2H", "#666d7e", 0.35);
  for (let i = 0; i < 42; i++) {
    let x = random(10, 580);
    let y = random(70, 250);
    let w = random(10, 28);
    brush.line(x, y, x + w, y);
  }

  // --- silhouettes of passersby ---
  drawFigure(125, 388, 0.88, "#272a31");
  drawFigure(208, 410, 1.03, "#23262d");
  drawFigure(292, 394, 0.78, "#30333b");
  drawFigure(384, 422, 1.14, "#262931");
  drawFigure(475, 402, 0.95, "#2d3038");

  // --- sparse umbrella arcs ---
  brush.set("pen", "#2d3038", 0.85);
  brush.arc(122, 385, 22, 190, 350);
  brush.arc(207, 406, 28, 190, 350);
  brush.arc(382, 415, 31, 190, 350);

  // --- reflected silhouettes / shadows ---
  brush.set("charcoal", "#3d4350", 0.75);
  brush.wiggle(3);
  reflectedFigure(125, 428, 0.85);
  reflectedFigure(208, 455, 1.0);
  reflectedFigure(292, 435, 0.72);
  reflectedFigure(384, 472, 1.08);
  reflectedFigure(475, 446, 0.9);

  // --- final deep accents ---
  brush.set("2B", "#1f2228", 0.9);
  brush.line(0, 350, 600, 312);
  for (let i = 0; i < 18; i++) {
    let x = random(40, 560);
    let y = random(365, 580);
    brush.line(x, y, x + random(-18, 18), y + random(8, 20));
  }

  noLoop();
}

function neonReflection(x, yTop, w, h, c) {
  brush.noStroke();
  brush.wash(c, 210);
  brush.beginShape(0.28);
  brush.vertex(x - w * 0.45, yTop);
  brush.vertex(x + w * 0.45, yTop - random(4, 10));
  brush.vertex(x + w * 0.22, yTop + h * 0.45);
  brush.vertex(x + random(-8, 8), yTop + h);
  brush.vertex(x - w * 0.2, yTop + h * 0.48);
  brush.endShape(true);
  brush.noWash();

  brush.set("marker", c, 0.9);
  for (let i = 0; i < 5; i++) {
    let yy = yTop + random(0, h * 0.85);
    brush.line(
      x + random(-w * 0.35, w * 0.35),
      yy,
      x + random(-w * 0.15, w * 0.15),
      yy + random(24, 70)
    );
  }

  brush.noStroke();
  brush.fill(c, 32);
  brush.fillBleed(0.18, "out");
  brush.fillTexture(0.35, 0.15);
  brush.circle(x, yTop + h * 0.45, w * 0.7, 0.5);
  brush.noFill();
}

function markerSmear(x, y, w, h, c) {
  brush.noStroke();
  brush.wash(c, 220);
  brush.rect(x, y, w, h);
  brush.noWash();

  brush.set("marker", c, 0.7);
  for (let i = 0; i < 4; i++) {
    brush.line(
      x + random(1, w - 1),
      y + random(0, h * 0.15),
      x + random(1, w - 1),
      y + h + random(6, 22)
    );
  }
}

function drawFigure(x, groundY, s, c) {
  brush.set("pen", c, 0.9 * s);

  // body
  brush.beginShape(0.35);
  brush.vertex(x - 4 * s, groundY - 42 * s);
  brush.vertex(x - 9 * s, groundY - 26 * s);
  brush.vertex(x - 7 * s, groundY - 10 * s);
  brush.vertex(x - 4 * s, groundY);
  brush.vertex(x + 2 * s, groundY);
  brush.vertex(x + 6 * s, groundY - 12 * s);
  brush.vertex(x + 9 * s, groundY - 26 * s);
  brush.vertex(x + 4 * s, groundY - 42 * s);
  brush.endShape(true);

  // head
  brush.noStroke();
  brush.fill(c, 110);
  brush.fillBleed(0.12, "out");
  brush.circle(x, groundY - 50 * s, 4.4 * s, 0.3);
  brush.noFill();

  brush.set("rotring", c, 0.45 * s);
  brush.line(x - 1 * s, groundY - 2 * s, x - 5 * s, groundY + 14 * s);
  brush.line(x + 1 * s, groundY - 1 * s, x + 4 * s, groundY + 14 * s);

  // tiny shoulder/umbrella stem hints
  brush.line(x, groundY - 40 * s, x, groundY - 63 * s);
}

function reflectedFigure(x, y, s) {
  brush.line(x, y, x + random(-10, 10), y + 36 * s);
  brush.line(x - 4 * s, y + 8 * s, x + random(-8, 8), y + 42 * s);
  brush.line(x + 4 * s, y + 6 * s, x + random(-8, 8), y + 40 * s);
}

function beginOrganicQuad(a, b, c, d, jitter) {
  brush.beginShape(0.42);
  brush.vertex(a[0] + random(-12, 12) * jitter, a[1] + random(-12, 12) * jitter);
  brush.vertex(b[0] + random(-12, 12) * jitter, b[1] + random(-12, 12) * jitter);
  brush.vertex(c[0] + random(-12, 12) * jitter, c[1] + random(-12, 12) * jitter);
  brush.vertex(d[0] + random(-12, 12) * jitter, d[1] + random(-12, 12) * jitter);
  brush.endShape(true);
}