function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  randomSeed(17);
  noiseSeed(17);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // sky wash
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.fillTexture(0.85, 0.38);
  brush.wash("#d9d7d1", 85);
  brush.fill("#c9d7db", 95);
  brush.fillBleed(0.6, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 250);
  brush.vertex(0, 235);
  brush.endShape(true);
  brush.noWash();

  // distant fog bank
  let fog1 = organicBand(300, 210, 340, 55, 26, 0.013, 0);
  watercolorPolygon(fog1, "#d7d9d4", 70, 0.65, "out", 0.8, 0.35, 55);

  let fog2 = organicBand(330, 255, 410, 45, 28, 0.016, 90);
  watercolorPolygon(fog2, "#c8d2d5", 60, 0.55, "out", 0.75, 0.3, 40);

  // water base
  brush.fillTexture(0.75, 0.28);
  brush.wash("#b8c7cb", 70);
  brush.fill("#afc1c6", 88);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.45);
  brush.vertex(0, 245);
  brush.vertex(600, 255);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // soft dawn glow
  let glow = blob(310, 105, 85, 34, 0.022, 300);
  watercolorPolygon(glow, "#efd7bf", 58, 0.42, "out", 0.65, 0.22, 35);

  // distant shoreline silhouettes
  brush.fillTexture(0.55, 0.22, false);
  brush.fill("#8fa0a0", 48);
  brush.fillBleed(0.22, "out");
  brush.noStroke();
  brush.beginShape(0.25);
  brush.vertex(0, 262);
  brush.vertex(55, 254);
  brush.vertex(100, 257);
  brush.vertex(150, 250);
  brush.vertex(210, 258);
  brush.vertex(275, 246);
  brush.vertex(338, 255);
  brush.vertex(405, 247);
  brush.vertex(470, 252);
  brush.vertex(540, 246);
  brush.vertex(600, 251);
  brush.vertex(600, 286);
  brush.vertex(0, 290);
  brush.endShape(true);

  // hazy hull masses
  let hull1 = [
    [70, 308], [118, 300], [175, 302], [212, 311],
    [198, 326], [92, 330]
  ];
  let hull2 = [
    [245, 320], [302, 313], [387, 316], [428, 330],
    [412, 344], [266, 346]
  ];
  let hull3 = [
    [405, 300], [456, 293], [536, 296], [575, 307],
    [564, 319], [428, 322]
  ];

  watercolorLayers(hull1, "#7f8f92");
  watercolorLayers(hull2, "#7e8c90");
  watercolorLayers(hull3, "#88979a");

  // soft vertical reflections
  brush.field("curved");
  brush.set("spray", "#9db0b4", 1.1);
  for (let i = 0; i < 85; i++) {
    let x = random(55, 575);
    let y = random(305, 560);
    let len = random(12, 42);
    brush.flowLine(x, y, len, 90);
  }
  brush.set("spray", "#c6d2d3", 0.7);
  for (let i = 0; i < 70; i++) {
    let x = random(40, 590);
    let y = random(290, 540);
    let len = random(8, 24);
    brush.flowLine(x, y, len, 90);
  }
  brush.noField();

  // broad mist over water
  let mistA = organicBand(220, 360, 290, 42, 30, 0.016, 120);
  let mistB = organicBand(415, 390, 320, 48, 30, 0.015, 210);
  watercolorPolygon(mistA, "#eef0eb", 42, 0.5, "out", 0.72, 0.2, 20);
  watercolorPolygon(mistB, "#e3e7e2", 38, 0.5, "out", 0.72, 0.2, 18);

  // faint graphite harbor structure
  drawMastsAndRopes();

  // a few darker near accents
  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#707372", 0.45);
  brush.line(86, 329, 122, 331);
  brush.line(280, 346, 333, 347);
  brush.line(468, 321, 523, 320);

  noLoop();
}

function watercolorLayers(basePts, col) {
  let c = centroid(basePts);

  brush.noStroke();
  brush.noHatch();

  brush.fillTexture(0.72, 0.28);
  brush.wash(col, 38);
  brush.fill(col, 52);
  brush.fillBleed(0.26, "out");
  drawScaledShape(basePts, c.x, c.y, 1.0, 0.35);
  brush.noWash();

  brush.fill(col, 42);
  brush.fillBleed(0.3, "in");
  drawScaledShape(basePts, c.x, c.y, 0.82, 0.35);

  brush.fill(col, 28);
  brush.fillBleed(0.25, "out");
  drawScaledShape(basePts, c.x, c.y, 1.06, 0.25);
}

function watercolorPolygon(pts, col, fillAlpha, bleed, dir, tex, border, washAlpha) {
  brush.noStroke();
  brush.noHatch();
  brush.fillTexture(tex, border);
  brush.wash(col, washAlpha);
  brush.fill(col, fillAlpha);
  brush.fillBleed(bleed, dir);
  brush.beginShape(0.5);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noWash();
}

function drawScaledShape(pts, cx, cy, sc, curv) {
  brush.beginShape(curv);
  for (let p of pts) {
    brush.vertex(lerp(cx, p[0], sc), lerp(cy, p[1], sc));
  }
  brush.endShape(true);
}

function centroid(pts) {
  let sx = 0, sy = 0;
  for (let p of pts) {
    sx += p[0];
    sy += p[1];
  }
  return { x: sx / pts.length, y: sy / pts.length };
}

function blob(cx, cy, rx, ry, ns, seedOffset) {
  let pts = [];
  for (let i = 0; i < 34; i++) {
    let a = map(i, 0, 34, 0, 360);
    let n = noise(seedOffset + cos(a) * ns + 10, seedOffset + sin(a) * ns + 30);
    let r1 = rx * (0.78 + n * 0.42);
    let r2 = ry * (0.78 + n * 0.42);
    pts.push([cx + cos(a) * r1, cy + sin(a) * r2]);
  }
  return pts;
}

function organicBand(cx, cy, w, h, count, ns, seedOffset) {
  let top = [];
  let bot = [];
  for (let i = 0; i < count; i++) {
    let x = map(i, 0, count - 1, cx - w / 2, cx + w / 2);
    let nt = noise(seedOffset + i * ns, 10);
    let nb = noise(seedOffset + i * ns, 50);
    top.push([x, cy - h * 0.55 + map(nt, 0, 1, -h * 0.3, h * 0.2)]);
    bot.push([x, cy + h * 0.55 + map(nb, 0, 1, -h * 0.2, h * 0.35)]);
  }
  bot.reverse();
  return top.concat(bot);
}

function drawMastsAndRopes() {
  brush.noFill();
  brush.noHatch();
  brush.noField();

  let masts = [
    { x: 110, y0: 327, h: 135, lean: -5, rig: 1 },
    { x: 155, y0: 325, h: 108, lean: 2, rig: 0 },
    { x: 296, y0: 346, h: 158, lean: -3, rig: 1 },
    { x: 350, y0: 346, h: 118, lean: 4, rig: 0 },
    { x: 458, y0: 321, h: 140, lean: -2, rig: 1 },
    { x: 518, y0: 320, h: 112, lean: 3, rig: 0 }
  ];

  // primary faint mast lines
  brush.set("2H", "#6d6c68", 0.3);
  for (let m of masts) {
    brush.spline([
      [m.x, m.y0],
      [m.x + m.lean * 0.2, m.y0 - m.h * 0.35, 0.7],
      [m.x + m.lean * 0.6, m.y0 - m.h * 0.72, 0.55],
      [m.x + m.lean, m.y0 - m.h, 0.35]
    ], 0.18);
  }

  // subtle redraw for graphite presence
  brush.set("HB", "#5e5d59", 0.22);
  for (let m of masts) {
    brush.line(m.x + random(-1, 1), m.y0 + random(-1, 1), m.x + m.lean, m.y0 - m.h);
  }

  // cross spars
  brush.set("2H", "#777672", 0.22);
  for (let m of masts) {
    if (m.rig === 1) {
      let y1 = m.y0 - m.h * 0.42;
      let y2 = m.y0 - m.h * 0.68;
      brush.line(m.x - 18, y1, m.x + 23, y1 - 2);
      brush.line(m.x - 14, y2, m.x + 19, y2 - 1);
    }
  }

  // ropes and rigging
  brush.set("2H", "#8a8882", 0.16);
  let ropes = [
    [[110, 197], [85, 258], [71, 308]],
    [[110, 197], [132, 254], [157, 324]],
    [[296, 188], [270, 265], [252, 319]],
    [[296, 188], [322, 270], [352, 346]],
    [[458, 181], [438, 248], [424, 300]],
    [[458, 181], [481, 249], [510, 320]],
    [[155, 218], [184, 272], [213, 311]],
    [[518, 208], [543, 262], [571, 307]]
  ];
  for (let r of ropes) {
    brush.spline(r, 0.28);
  }

  // loose horizon pencil traces
  brush.set("2B", "#8a8883", 0.12);
  brush.spline([[20, 272], [130, 266], [245, 271], [360, 266], [480, 270], [585, 267]], 0.12);

  // small dock / hull pencil suggestions
  brush.set("HB", "#666662", 0.2);
  brush.line(64, 318, 211, 312);
  brush.line(238, 332, 431, 329);
  brush.line(400, 308, 576, 304);

  // delicate hanging lines
  brush.set("2H", "#8f8c86", 0.13);
  for (let m of [masts[0], masts[2], masts[4]]) {
    let topx = m.x + m.lean;
    let topy = m.y0 - m.h;
    brush.line(topx, topy + 18, topx + random(-4, 4), topy + 48 + random(-4, 6));
    brush.line(topx + 7, topy + 34, topx + random(-2, 6), topy + 76 + random(-2, 8));
  }
}