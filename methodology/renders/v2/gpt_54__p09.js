function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(17);
  noiseSeed(17);

  // soft rainy sky washes
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.fillTexture(0.88, 0.48);
  brush.wash("#1b2748", 120);
  brush.fill("#22355d", 130);
  brush.fillBleed(0.55, "out");
  brush.beginShape(0.52);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 210);
  brush.vertex(500, 225);
  brush.vertex(390, 205);
  brush.vertex(285, 222);
  brush.vertex(170, 198);
  brush.vertex(70, 214);
  brush.vertex(0, 205);
  brush.endShape(true);
  brush.noWash();

  brush.fill("#12203d", 72);
  brush.fillBleed(0.45, "in");
  brush.beginShape(0.45);
  brush.vertex(20, 18);
  brush.vertex(580, 14);
  brush.vertex(592, 168);
  brush.vertex(505, 182);
  brush.vertex(430, 165);
  brush.vertex(345, 184);
  brush.vertex(250, 171);
  brush.vertex(152, 188);
  brush.vertex(68, 176);
  brush.vertex(18, 166);
  brush.endShape(true);

  // distant building masses as watery blocks
  const buildings = [
    { x: 28, w: 66, h: 208, c: "#1a2440", a: 98 },
    { x: 82, w: 92, h: 246, c: "#20294a", a: 105 },
    { x: 156, w: 78, h: 190, c: "#18233f", a: 96 },
    { x: 228, w: 112, h: 265, c: "#1b2745", a: 110 },
    { x: 324, w: 86, h: 214, c: "#17213d", a: 92 },
    { x: 394, w: 98, h: 244, c: "#1d2848", a: 106 },
    { x: 478, w: 58, h: 184, c: "#18243f", a: 92 },
    { x: 522, w: 70, h: 230, c: "#20284a", a: 100 }
  ];

  for (let b of buildings) {
    let yTop = 255 - b.h;
    brush.wash(b.c, 42);
    brush.fill(b.c, b.a);
    brush.fillBleed(0.32, "out");
    brush.beginShape(0.28);
    brush.vertex(b.x + random(-4, 4), 255);
    brush.vertex(b.x + random(-5, 5), yTop + random(-12, 10));
    brush.vertex(b.x + b.w * 0.33 + random(-6, 6), yTop + random(-18, 8));
    brush.vertex(b.x + b.w * 0.7 + random(-6, 6), yTop + random(-10, 10));
    brush.vertex(b.x + b.w + random(-5, 5), 255 + random(-2, 4));
    brush.endShape(true);
    brush.noWash();
  }

  // rainy vertical atmosphere
  brush.field("columns");
  brush.set("spray", "#7c8cab", 1.2);
  for (let i = 0; i < 150; i++) {
    let x = random(0, 600);
    let y = random(0, 290);
    brush.flowLine(x, y, random(14, 34), 270);
  }
  brush.set("spray", "#c8d3ea", 0.65);
  for (let i = 0; i < 85; i++) {
    let x = random(0, 600);
    let y = random(10, 320);
    brush.flowLine(x, y, random(8, 22), 270);
  }
  brush.noField();

  // road / pavement big watercolor shape
  brush.fillTexture(0.82, 0.56);
  brush.wash("#263248", 130);
  brush.fill("#34425c", 155);
  brush.fillBleed(0.42, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 292);
  brush.vertex(118, 274);
  brush.vertex(232, 286);
  brush.vertex(345, 272);
  brush.vertex(468, 284);
  brush.vertex(600, 266);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  brush.fill("#162030", 58);
  brush.fillBleed(0.38, "in");
  brush.beginShape(0.48);
  brush.vertex(0, 352);
  brush.vertex(118, 338);
  brush.vertex(248, 354);
  brush.vertex(378, 340);
  brush.vertex(490, 356);
  brush.vertex(600, 348);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // perspective street guides
  brush.noFill();
  brush.set("2H", "#5b6271", 0.55);
  brush.line(295, 285, 180, 600);
  brush.line(310, 285, 430, 600);

  // neon signs / windows
  let neonBoxes = [
    { x: 72, y: 150, w: 46, h: 20, c: "#ff5078" },
    { x: 94, y: 188, w: 34, h: 16, c: "#4ae1ff" },
    { x: 196, y: 120, w: 58, h: 18, c: "#ff8a2b" },
    { x: 214, y: 160, w: 44, h: 14, c: "#f255ff" },
    { x: 356, y: 132, w: 72, h: 22, c: "#40f0d0" },
    { x: 388, y: 168, w: 48, h: 16, c: "#ffd447" },
    { x: 492, y: 145, w: 56, h: 20, c: "#ff5a95" }
  ];

  for (let n of neonBoxes) {
    brush.noStroke();
    brush.wash(n.c, 225);
    brush.rect(n.x, n.y, n.w, n.h, "corner");
    brush.noWash();

    brush.fill(n.c, 82);
    brush.fillBleed(0.26, "out");
    brush.beginShape(0.25);
    brush.vertex(n.x - 6, n.y - 3);
    brush.vertex(n.x + n.w + 7, n.y - 1);
    brush.vertex(n.x + n.w + 4, n.y + n.h + 4);
    brush.vertex(n.x - 5, n.y + n.h + 5);
    brush.endShape(true);
  }

  // neon reflections as marker smears
  brush.wiggle(1);
  let smears = [
    { x: 90, y: 320, c: "#ff5078", len: 238, w: 2.2 },
    { x: 113, y: 334, c: "#4ae1ff", len: 195, w: 1.8 },
    { x: 225, y: 308, c: "#ff8a2b", len: 250, w: 2.0 },
    { x: 238, y: 330, c: "#f255ff", len: 200, w: 1.7 },
    { x: 395, y: 304, c: "#40f0d0", len: 260, w: 2.3 },
    { x: 408, y: 325, c: "#ffd447", len: 205, w: 1.6 },
    { x: 520, y: 314, c: "#ff5a95", len: 245, w: 2.1 }
  ];

  for (let s of smears) {
    brush.set("marker", s.c, s.w);
    brush.beginStroke("curve", s.x + random(-5, 5), s.y);
    brush.move(91 + random(-4, 4), s.len * 0.32, 1.1);
    brush.move(86 + random(-8, 8), s.len * 0.28, 0.95);
    brush.move(94 + random(-10, 10), s.len * 0.22, 0.8);
    brush.endStroke(88 + random(-10, 10), 0.55);

    brush.set("marker", s.c, s.w * 0.6);
    brush.line(s.x - 10, s.y + 8, s.x + random(-10, 10), s.y + s.len * 0.65);
  }
  brush.noField();

  // diffuse glow around reflections with watercolor
  for (let s of smears) {
    brush.noStroke();
    brush.fill(s.c, 34);
    brush.fillBleed(0.34, "out");
    brush.beginShape(0.45);
    brush.vertex(s.x - 20, s.y - 5);
    brush.vertex(s.x + 18, s.y + 6);
    brush.vertex(s.x + 15, s.y + s.len * 0.25);
    brush.vertex(s.x + 30, s.y + s.len * 0.56);
    brush.vertex(s.x + 16, s.y + s.len * 0.76);
    brush.vertex(s.x - 12, s.y + s.len * 0.62);
    brush.vertex(s.x - 24, s.y + s.len * 0.3);
    brush.endShape(true);
  }

  // curb and street accents
  brush.set("HB", "#2a2f38", 0.8);
  brush.line(0, 298, 600, 278);
  brush.set("2H", "#8d96a3", 0.45);
  brush.line(0, 305, 600, 287);

  // sparse passersby silhouettes
  function person(px, py, scaleBody, umbrella, lean) {
    push();
    translate(px, py);
    rotate(lean);

    brush.noHatch();
    brush.noMass();
    brush.noField();

    brush.noStroke();
    brush.fill("#11141a", 118);
    brush.fillBleed(0.18, "out");
    brush.beginShape(0.35);
    brush.vertex(-8 * scaleBody, -2 * scaleBody);
    brush.vertex(-11 * scaleBody, 24 * scaleBody);
    brush.vertex(-7 * scaleBody, 60 * scaleBody);
    brush.vertex(0, 72 * scaleBody);
    brush.vertex(8 * scaleBody, 60 * scaleBody);
    brush.vertex(11 * scaleBody, 24 * scaleBody);
    brush.vertex(8 * scaleBody, -4 * scaleBody);
    brush.vertex(2 * scaleBody, -10 * scaleBody);
    brush.vertex(-4 * scaleBody, -9 * scaleBody);
    brush.endShape(true);

    brush.fill("#161a22", 120);
    brush.circle(0, -18 * scaleBody, 7 * scaleBody, 0.18);

    brush.set("pen", "#0f1218", 0.95);
    brush.line(-3 * scaleBody, 70 * scaleBody, -8 * scaleBody, 110 * scaleBody);
    brush.line(3 * scaleBody, 70 * scaleBody, 8 * scaleBody, 110 * scaleBody);

    brush.set("rotring", "#0d1015", 0.35);
    brush.line(-7 * scaleBody, 110 * scaleBody, -12 * scaleBody, 114 * scaleBody);
    brush.line(8 * scaleBody, 110 * scaleBody, 13 * scaleBody, 114 * scaleBody);

    brush.set("2B", "#13161d", 0.7);
    brush.line(-8 * scaleBody, 22 * scaleBody, -18 * scaleBody, 52 * scaleBody);

    if (umbrella) {
      brush.set("pen", "#11151c", 1.0);
      brush.arc(-23 * scaleBody, 6 * scaleBody, 28 * scaleBody, 190, 350);
      brush.set("rotring", "#11151c", 0.35);
      brush.line(-23 * scaleBody, 6 * scaleBody, -23 * scaleBody, 48 * scaleBody);
    }

    pop();
  }

  person(170, 352, 0.95, true, -4);
  person(290, 338, 0.78, false, 1);
  person(420, 360, 1.08, true, 3);
  person(520, 346, 0.72, false, -2);

  // loose distant figures
  brush.set("charcoal", "#20232a", 0.7);
  brush.wiggle(3);
  brush.line(112, 336, 110, 394);
  brush.line(108, 392, 104, 425);
  brush.line(112, 392, 116, 424);
  brush.line(476, 334, 474, 386);
  brush.line(472, 384, 468, 418);
  brush.line(476, 384, 480, 418);
  brush.noField();

  // puddle pools
  let puddles = [
    [120, 462, 92, 28, "#6cc8ff"],
    [245, 505, 130, 34, "#ff669f"],
    [390, 455, 114, 30, "#58e0c9"],
    [500, 520, 86, 24, "#ffd447"]
  ];

  for (let p of puddles) {
    brush.noStroke();
    brush.fill(p[4], 42);
    brush.fillBleed(0.3, "out");
    brush.beginShape(0.5);
    brush.vertex(p[0] - p[2] * 0.5, p[1]);
    brush.vertex(p[0] - p[2] * 0.18, p[1] - p[3] * 0.5);
    brush.vertex(p[0] + p[2] * 0.42, p[1] - p[3] * 0.18);
    brush.vertex(p[0] + p[2] * 0.5, p[1] + p[3] * 0.16);
    brush.vertex(p[0] + p[2] * 0.12, p[1] + p[3] * 0.48);
    brush.vertex(p[0] - p[2] * 0.44, p[1] + p[3] * 0.24);
    brush.endShape(true);
  }

  // rain streaks in foreground
  brush.set("2H", "#b7c0d0", 0.35);
  for (let i = 0; i < 70; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(8, 24);
    brush.line(x, y, x - 5, y + len);
  }

  // light ink architecture hints
  brush.set("rotring", "#202631", 0.28);
  for (let b of buildings) {
    let top = 255 - b.h;
    brush.line(b.x + 4, top + 4, b.x + 4, 255);
    if (random() < 0.75) brush.line(b.x + b.w - 5, top + 8, b.x + b.w - 5, 255);
    if (random() < 0.6) brush.line(b.x + b.w * 0.5, top + 6, b.x + b.w * 0.5, 255);
  }

  // subtle colored pencil accents in reflections
  brush.hatchStyle("cpencil", "#5dd6ff", 0.55);
  brush.hatch(7, 82, { rand: 0.08, continuous: true, gradient: 0.3 });
  brush.beginShape(0.45);
  brush.vertex(72, 314);
  brush.vertex(136, 324);
  brush.vertex(127, 465);
  brush.vertex(82, 454);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#ff5b8d", 0.55);
  brush.hatch(8, 88, { rand: 0.08, continuous: true, gradient: 0.28 });
  brush.beginShape(0.45);
  brush.vertex(486, 305);
  brush.vertex(544, 314);
  brush.vertex(532, 492);
  brush.vertex(494, 482);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}