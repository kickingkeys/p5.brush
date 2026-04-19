function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(18);
  noiseSeed(18);

  // Sky wash
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  brush.fillTexture(0.78, 0.36);
  brush.wash("#d9d6cf", 150);
  brush.fill("#cfd8dd", 92);
  brush.fillBleed(0.42, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 250);
  brush.vertex(0, 230);
  brush.endShape(true);
  brush.noWash();

  // Dawn glow near horizon
  brush.fillTexture(0.72, 0.28);
  brush.fill("#d6b79f", 58);
  brush.fillBleed(0.36, "out");
  let cx = 310;
  let cy = 235;
  brush.beginShape(0.55);
  for (let i = 0; i < 28; i++) {
    let a = map(i, 0, 28, 0, 360);
    let r = 125 + noise(i * 0.12, 3.1) * 28;
    brush.vertex(cx + cos(a) * r * 1.5, cy + sin(a) * r * 0.42);
  }
  brush.endShape(true);

  // Distant fog bank
  brush.fill("#c8d3d6", 52);
  brush.fillBleed(0.48, "out");
  brush.beginShape(0.5);
  for (let x = 0; x <= 600; x += 22) {
    let y = 210 + noise(x * 0.01, 10) * 34;
    brush.vertex(x, y);
  }
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);

  // Water base
  brush.wash("#b9c7cc", 120);
  brush.fill("#aebfc5", 70);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.45);
  brush.vertex(0, 225);
  brush.vertex(600, 240);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Water reflective watercolor bands
  for (let j = 0; j < 7; j++) {
    let y0 = 255 + j * 38;
    let col = j % 2 === 0 ? "#c4c9c8" : "#a9bcc2";
    brush.fill(col, 26 + j * 3);
    brush.fillBleed(0.24, "out");
    brush.beginShape(0.35);
    brush.vertex(0, y0 + noise(j, 1) * 8);
    for (let x = 0; x <= 600; x += 26) {
      let yy = y0 + sin(x * 0.5 + j * 18) * 2 + noise(x * 0.02, j * 0.4) * 14;
      brush.vertex(x, yy);
    }
    brush.vertex(600, y0 + 30);
    brush.vertex(0, y0 + 26);
    brush.endShape(true);
  }

  // Soft harbor silhouettes
  brush.fillTexture(0.65, 0.25);
  brush.fill("#7d8e95", 42);
  brush.fillBleed(0.22, "out");

  // Left warehouse mass
  brush.beginShape(0.28);
  brush.vertex(32, 228);
  brush.vertex(90, 214);
  brush.vertex(142, 216);
  brush.vertex(175, 226);
  brush.vertex(174, 274);
  brush.vertex(28, 275);
  brush.endShape(true);

  // Center boats / dock shadow
  brush.beginShape(0.35);
  brush.vertex(208, 244);
  brush.vertex(250, 230);
  brush.vertex(308, 229);
  brush.vertex(356, 238);
  brush.vertex(382, 250);
  brush.vertex(377, 281);
  brush.vertex(211, 282);
  brush.endShape(true);

  // Right harbor buildings
  brush.beginShape(0.3);
  brush.vertex(402, 224);
  brush.vertex(448, 212);
  brush.vertex(515, 215);
  brush.vertex(570, 228);
  brush.vertex(573, 278);
  brush.vertex(404, 280);
  brush.endShape(true);

  // Boat hulls as pale wet shapes
  let boats = [
    { x: 125, y: 316, w: 96, h: 18, c: "#908f88" },
    { x: 288, y: 334, w: 132, h: 20, c: "#8d979c" },
    { x: 472, y: 322, w: 110, h: 18, c: "#96958d" }
  ];

  for (let b of boats) {
    brush.fill(b.c, 44);
    brush.fillBleed(0.2, "out");
    brush.beginShape(0.22);
    brush.vertex(b.x - b.w / 2, b.y);
    brush.vertex(b.x - b.w * 0.28, b.y - b.h * 0.45);
    brush.vertex(b.x + b.w * 0.26, b.y - b.h * 0.45);
    brush.vertex(b.x + b.w / 2, b.y);
    brush.vertex(b.x + b.w * 0.34, b.y + b.h * 0.42);
    brush.vertex(b.x - b.w * 0.38, b.y + b.h * 0.42);
    brush.endShape(true);
  }

  // Fog overlays to soften edges
  brush.fillTexture(0.6, 0.2);
  for (let i = 0; i < 8; i++) {
    let fx = random(80, 540);
    let fy = random(170, 360);
    let rw = random(120, 240);
    let rh = random(40, 90);
    brush.fill("#f4f0e8", random(22, 38));
    brush.fillBleed(random(0.42, 0.58), "out");
    brush.beginShape(0.55);
    for (let k = 0; k < 24; k++) {
      let a = map(k, 0, 24, 0, 360);
      let rr = 0.72 + noise(i * 0.7, k * 0.15) * 0.5;
      brush.vertex(fx + cos(a) * rw * 0.5 * rr, fy + sin(a) * rh * 0.5 * rr);
    }
    brush.endShape(true);
  }

  brush.noFill();
  brush.noWash();
  brush.noHatch();

  // Very soft atmospheric spray in the sky/water seam
  brush.field("curved");
  brush.set("spray", "#c9d2d5", 1.6);
  for (let i = 0; i < 90; i++) {
    brush.flowLine(random(20, 580), random(185, 320), random(10, 24), random(360));
  }
  brush.set("spray", "#ece6dc", 1.0);
  for (let i = 0; i < 60; i++) {
    brush.flowLine(random(40, 560), random(150, 290), random(8, 20), random(360));
  }
  brush.noField();

  // Graphite structure: distant shoreline and dock edges
  brush.noFill();
  brush.set("2H", "#707070", 0.42);
  brush.wiggle(1);
  brush.line(20, 248, 186, 246);
  brush.line(210, 255, 385, 252);
  brush.line(402, 249, 579, 251);
  brush.noField();

  // Boat hull graphite contours
  brush.set("HB", "#5a5a5a", 0.52);
  for (let b of boats) {
    brush.spline([
      [b.x - b.w / 2 + 4, b.y + 1, 0.55],
      [b.x - b.w * 0.18, b.y - b.h * 0.2, 0.45],
      [b.x + b.w * 0.2, b.y - b.h * 0.16, 0.4],
      [b.x + b.w / 2 - 3, b.y + 1, 0.5]
    ], 0.35);
    brush.line(b.x - b.w * 0.34, b.y + b.h * 0.36, b.x + b.w * 0.28, b.y + b.h * 0.34);
  }

  // Masts
  let masts = [
    { x: 120, y1: 206, y2: 316, w: 0.34 },
    { x: 146, y1: 194, y2: 314, w: 0.28 },
    { x: 271, y1: 182, y2: 333, w: 0.38 },
    { x: 304, y1: 172, y2: 334, w: 0.45 },
    { x: 334, y1: 188, y2: 333, w: 0.3 },
    { x: 450, y1: 194, y2: 321, w: 0.32 },
    { x: 486, y1: 178, y2: 322, w: 0.4 },
    { x: 520, y1: 196, y2: 321, w: 0.28 }
  ];

  brush.set("2H", "#696969", 0.38);
  brush.wiggle(1.2);
  for (let m of masts) {
    brush.line(m.x, m.y1, m.x, m.y2);
  }

  // Fainter reflected masts
  brush.set("2H", "#8b8b8b", 0.22);
  for (let m of masts) {
    let len = random(55, 120);
    brush.line(m.x + random(-3, 3), m.y2 + 4, m.x + random(-10, 10), m.y2 + len);
  }

  // Ropes and rigging
  brush.set("HB", "#5d5d5d", 0.34);
  brush.wiggle(1.4);
  let riggings = [
    [[120, 214], [145, 234], [146, 314]],
    [[146, 212], [125, 240], [120, 315]],
    [[271, 200], [303, 224], [304, 334]],
    [[304, 190], [274, 230], [271, 333]],
    [[304, 202], [334, 228], [334, 333]],
    [[486, 193], [519, 232], [520, 321]],
    [[520, 203], [487, 238], [486, 322]],
    [[450, 206], [486, 242], [486, 322]]
  ];

  for (let r of riggings) {
    brush.spline([
      [r[0][0], r[0][1], 0.3],
      [r[1][0], r[1][1], 0.22],
      [r[2][0], r[2][1], 0.18]
    ], 0.22);
  }

  // Horizontal rope hints and dock details
  brush.set("2H", "#777777", 0.24);
  brush.line(100, 287, 182, 292);
  brush.line(232, 303, 359, 306);
  brush.line(426, 296, 534, 300);

  // Sparse graphite hatching in select shadow zones
  brush.hatchStyle("2H", "#7a7a7a", 0.22);
  brush.hatch(11, 10, { rand: 0.08, continuous: true, gradient: 0.25 });
  brush.beginShape(0.2);
  brush.vertex(80, 334);
  brush.vertex(188, 334);
  brush.vertex(183, 365);
  brush.vertex(84, 364);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#666666", 0.24);
  brush.hatch(10, 8, { rand: 0.08, continuous: true, gradient: 0.2 });
  brush.beginShape(0.2);
  brush.vertex(230, 352);
  brush.vertex(368, 350);
  brush.vertex(364, 391);
  brush.vertex(235, 390);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#7f7f7f", 0.2);
  brush.hatch(12, 12, { rand: 0.08, continuous: true, gradient: 0.2 });
  brush.beginShape(0.2);
  brush.vertex(420, 338);
  brush.vertex(536, 340);
  brush.vertex(530, 378);
  brush.vertex(424, 376);
  brush.endShape(true);
  brush.noHatch();

  // Faint shoreline architecture hints
  brush.set("2H", "#737373", 0.22);
  brush.line(64, 230, 64, 274);
  brush.line(92, 222, 92, 272);
  brush.line(438, 220, 438, 278);
  brush.line(472, 217, 472, 278);
  brush.line(548, 225, 548, 279);

  // Darkest, very selective accents
  brush.set("2B", "#505050", 0.36);
  brush.line(303, 172, 304, 188);
  brush.line(486, 178, 486, 193);
  brush.line(120, 206, 120, 220);
  brush.spline([[256, 333, 0.35], [288, 336, 0.22], [320, 334, 0.3]], 0.2);

  // Final veil of mist over lower middle
  brush.noStroke();
  brush.fillTexture(0.45, 0.18);
  brush.fill("#f7f3eb", 24);
  brush.fillBleed(0.5, "out");
  brush.beginShape(0.52);
  for (let i = 0; i < 30; i++) {
    let a = map(i, 0, 30, 0, 360);
    let rx = 185 + noise(i * 0.09, 40) * 60;
    let ry = 46 + noise(i * 0.12, 60) * 18;
    brush.vertex(302 + cos(a) * rx, 356 + sin(a) * ry);
  }
  brush.endShape(true);

  brush.noFill();
  brush.noWash();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  noLoop();
}