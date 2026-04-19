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

  const palette = [
    "#6f5e49", // umber
    "#8b7355", // olive-brown
    "#a28766", // tan
    "#7f6a58", // warm gray-brown
    "#8e6f5a", // clay
    "#6a7460", // muted olive
    "#9a8167"  // sand
  ];

  const frameX = 38;
  const frameY = 42;
  const frameW = 524;
  const frameH = 516;

  brush.noField();
  brush.noWash();
  brush.noMass();
  brush.noFill();
  brush.noHatch();

  drawPaperTone();
  drawBlocks(frameX, frameY, frameW, frameH, palette);
  drawConstructionLines(frameX, frameY, frameW, frameH);
  drawPerimeter(frameX, frameY, frameW, frameH);

  noLoop();
}

function drawPaperTone() {
  brush.noStroke();
  brush.fillTexture(0.45, 0.2, false);

  for (let i = 0; i < 10; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const r = random(55, 120);
    brush.fill("#efe6d6", random(16, 28));
    brush.fillBleed(random(0.12, 0.22), "out");
    brush.circle(x, y, r, 0.25);
  }

  brush.noFill();
}

function drawBlocks(fx, fy, fw, fh, palette) {
  const rects = [
    { x: 72,  y: 72,  w: 182, h: 124, c: palette[2], a1: 18,  a2: 108, fillRot: 16 },
    { x: 210, y: 64,  w: 198, h: 154, c: palette[5], a1: -8,  a2: 82,  fillRot: -10 },
    { x: 392, y: 88,  w: 118, h: 112, c: palette[4], a1: 30,  a2: 118, fillRot: 24 },

    { x: 86,  y: 188, w: 152, h: 146, c: palette[0], a1: -26, a2: 62,  fillRot: -18 },
    { x: 226, y: 198, w: 144, h: 126, c: palette[3], a1: 10,  a2: 98,  fillRot: 8 },
    { x: 336, y: 186, w: 184, h: 170, c: palette[1], a1: -18, a2: 72,  fillRot: -12 },

    { x: 64,  y: 338, w: 186, h: 128, c: palette[6], a1: 22,  a2: 110, fillRot: 20 },
    { x: 208, y: 332, w: 168, h: 156, c: palette[2], a1: -12, a2: 76,  fillRot: -8 },
    { x: 358, y: 356, w: 144, h: 116, c: palette[0], a1: 36,  a2: 126, fillRot: 30 },

    { x: 104, y: 470, w: 134, h: 54,  c: palette[5], a1: 8,   a2: 96,  fillRot: 6 },
    { x: 252, y: 486, w: 192, h: 40,  c: palette[4], a1: -22, a2: 66,  fillRot: -16 }
  ];

  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const x = fx + r.x;
    const y = fy + r.y;

    if (i % 3 === 0) {
      drawColoredPencilBlock(x, y, r.w, r.h, r.c, r.a1, r.a2);
    } else if (i % 3 === 1) {
      drawPenBlock(x, y, r.w, r.h, r.c, r.a1, r.a2);
    } else {
      drawMixedBlock(x, y, r.w, r.h, r.c, r.a1, r.a2);
    }

    addSoftInterior(x, y, r.w, r.h, r.c, r.fillRot);
  }
}

function drawColoredPencilBlock(x, y, w, h, c, angle1, angle2) {
  brush.noFill();

  brush.hatchStyle("cpencil", c, 0.78);
  brush.hatch(6, angle1, { rand: 0.08, continuous: true });
  brush.rect(x, y, w, h, "corner");
  brush.noHatch();

  brush.hatchStyle("cpencil", darken(c, 0.82), 0.62);
  brush.hatch(8, angle2, { rand: 0.06, continuous: true });
  brush.rect(x, y, w, h, "corner");
  brush.noHatch();

  brush.set("pen", "#3f382f", 0.45);
  brush.rect(x, y, w, h, "corner");
}

function drawPenBlock(x, y, w, h, c, angle1, angle2) {
  brush.noFill();

  brush.hatchStyle("rotring", darken(c, 0.7), 0.34);
  brush.hatch(7, angle1, { rand: 0.04, continuous: true });
  brush.rect(x, y, w, h, "corner");
  brush.noHatch();

  brush.hatchStyle("cpencil", c, 0.52);
  brush.hatch(11, angle2, { rand: 0.07, continuous: false });
  brush.rect(x, y, w, h, "corner");
  brush.noHatch();

  brush.set("pen", "#3d352d", 0.52);
  brush.rect(x, y, w, h, "corner");
}

function drawMixedBlock(x, y, w, h, c, angle1, angle2) {
  brush.noFill();

  brush.hatchStyle("HB", darken(c, 0.68), 0.55);
  brush.hatch(9, angle1, { rand: 0.07, continuous: true });
  brush.rect(x, y, w, h, "corner");
  brush.noHatch();

  brush.hatchStyle("cpencil", c, 0.7);
  brush.hatch(7, angle2, { rand: 0.09, continuous: true });
  brush.rect(x, y, w, h, "corner");
  brush.noHatch();

  brush.set("rotring", "#463d34", 0.34);
  brush.rect(x, y, w, h, "corner");
}

function addSoftInterior(x, y, w, h, c, rot) {
  push();
  translate(x + w / 2, y + h / 2);
  rotate(rot);

  brush.noStroke();
  brush.fillTexture(0.5, 0.22, false);
  brush.fill(lighten(c, 1.08), 30);
  brush.fillBleed(0.12, "out");

  const iw = w * random(0.45, 0.72);
  const ih = h * random(0.35, 0.65);
  brush.rect(-iw / 2, -ih / 2, iw, ih, "corner");

  brush.noFill();
  pop();
}

function drawConstructionLines(fx, fy, fw, fh) {
  const lines = [
    [fx + 24, fy + 148, fx + fw - 18, fy + 132],
    [fx + 46, fy + 286, fx + fw - 22, fy + 302],
    [fx + 34, fy + 430, fx + fw - 34, fy + 418],
    [fx + 178, fy + 24, fx + 194, fy + fh - 22],
    [fx + 334, fy + 18, fx + 320, fy + fh - 28],
    [fx + 456, fy + 30, fx + 470, fy + fh - 36]
  ];

  brush.set("2H", "#8b8175", 0.38);
  for (let ln of lines) {
    brush.line(ln[0], ln[1], ln[2], ln[3]);
  }

  brush.set("HB", "#6a6157", 0.32);
  brush.line(fx + 84, fy + 82, fx + 512, fy + 514);
  brush.line(fx + 98, fy + 516, fx + 514, fy + 96);
}

function drawPerimeter(fx, fy, fw, fh) {
  brush.noFill();

  brush.set("pen", "#3a332c", 0.65);
  brush.rect(fx, fy, fw, fh, "corner");

  brush.set("rotring", "#50473d", 0.22);
  brush.rect(fx + 8, fy + 10, fw - 16, fh - 18, "corner");

  brush.set("2B", "#332d27", 0.26);
  brush.line(fx + 2, fy + fh + 8, fx + fw - 2, fy + fh + 6);
}

function darken(hex, factor) {
  const c = color(hex);
  const r = red(c) * factor;
  const g = green(c) * factor;
  const b = blue(c) * factor;
  return color(constrain(r, 0, 255), constrain(g, 0, 255), constrain(b, 0, 255));
}

function lighten(hex, factor) {
  const c = color(hex);
  const r = red(c) * factor;
  const g = green(c) * factor;
  const b = blue(c) * factor;
  return color(constrain(r, 0, 255), constrain(g, 0, 255), constrain(b, 0, 255));
}