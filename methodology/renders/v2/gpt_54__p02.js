function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(21);
  noiseSeed(21);

  drawPaperSpecks();
  drawMainGrassCluster();
  drawLooseStudies();
  drawGroundNotes();

  noLoop();
}

function drawPaperSpecks() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  for (let i = 0; i < 180; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(2, 6);
    let a = random(180);
    let g = random(225, 245);
    brush.set("2H", color(g), random(0.18, 0.32));
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }
}

function drawMainGrassCluster() {
  let stems = [
    { x: 120, y: 560, h: 340, lean: -18, seed: "panicle", s: 1.0 },
    { x: 160, y: 560, h: 300, lean: -8, seed: "spike", s: 0.95 },
    { x: 210, y: 560, h: 355, lean: 10, seed: "panicle", s: 1.1 },
    { x: 255, y: 560, h: 280, lean: 18, seed: "tuft", s: 0.9 },
    { x: 305, y: 560, h: 360, lean: -6, seed: "spike", s: 1.05 },
    { x: 350, y: 560, h: 315, lean: 14, seed: "panicle", s: 1.0 },
    { x: 405, y: 560, h: 270, lean: 24, seed: "tuft", s: 0.88 },
    { x: 455, y: 560, h: 335, lean: 6, seed: "spike", s: 0.98 }
  ];

  for (let st of stems) {
    drawGrassStem(st.x, st.y, st.h, st.lean, st.seed, st.s);
  }

  let lightZones = [
    organicBladePolygon(155, 430, 26, 120, -26),
    organicBladePolygon(238, 390, 24, 110, 18),
    organicBladePolygon(316, 410, 28, 130, -8),
    organicBladePolygon(390, 445, 24, 105, 30)
  ];

  for (let p of lightZones) {
    graphiteHatchShape(p, "2H", "#757575", 10, 62, 0.48);
  }

  let midZones = [
    organicBladePolygon(140, 470, 34, 150, -18),
    organicBladePolygon(280, 455, 36, 165, 10),
    organicBladePolygon(362, 470, 30, 145, 22)
  ];

  for (let p of midZones) {
    graphiteCrossShade(p, "HB", "#4f4f4f", 7, 58, 122, 0.42);
  }

  let darkZones = [
    organicBladePolygon(220, 505, 42, 120, 6),
    organicBladePolygon(330, 515, 46, 115, -12)
  ];

  for (let p of darkZones) {
    graphiteCrossShade(p, "2B", "#303030", 4, 65, 128, 0.34);
  }

  brush.noHatch();
  brush.noFill();

  for (let i = 0; i < 11; i++) {
    let x = 90 + i * 38 + random(-6, 6);
    let y = 560;
    let h = random(90, 175);
    let lean = random(-36, 36);
    drawLooseBlade(x, y, h, lean);
  }
}

function drawGrassStem(baseX, baseY, h, lean, seedType, sc) {
  let topX = baseX + lean + sin(baseX * 3) * 8;
  let topY = baseY - h;

  let p1x = lerp(baseX, topX, 0.28) + random(-10, 10);
  let p1y = baseY - h * 0.33 + random(-10, 10);

  let p2x = lerp(baseX, topX, 0.68) + random(-10, 10);
  let p2y = baseY - h * 0.7 + random(-12, 12);

  brush.noFill();
  brush.noHatch();

  brush.set("HB", "#383838", 0.52 * sc);
  brush.spline(
    [
      [baseX, baseY, 0.9],
      [p1x, p1y, 0.78],
      [p2x, p2y, 0.58],
      [topX, topY, 0.28]
    ],
    0.52
  );

  brush.set("2H", "#777777", 0.22 * sc);
  brush.spline(
    [
      [baseX + 1.5, baseY - 4, 0.5],
      [p1x + 1, p1y, 0.42],
      [p2x + 1, p2y, 0.3],
      [topX + 1, topY + 1, 0.15]
    ],
    0.5
  );

  addStemLeaves(baseX, baseY, topX, topY, sc);

  if (seedType === "panicle") {
    drawPanicle(topX, topY, lean, sc);
  } else if (seedType === "spike") {
    drawSpikeSeed(topX, topY, lean, sc);
  } else {
    drawTuftSeed(topX, topY, lean, sc);
  }
}

function addStemLeaves(x0, y0, x1, y1, sc) {
  let count = floor(random(3, 6));
  for (let i = 0; i < count; i++) {
    let t = map(i, 0, count - 1, 0.18, 0.78) + random(-0.04, 0.04);
    let sx = lerp(x0, x1, t);
    let sy = lerp(y0, y1, t);
    let dir = random() < 0.5 ? -1 : 1;
    let len = random(70, 150) * sc * (1 - t * 0.35);
    let bend = random(18, 38) * dir;
    drawBlade(sx, sy, len, bend, dir, sc * random(0.8, 1.08));
  }
}

function drawBlade(x, y, len, bend, dir, sc) {
  let p0 = [x, y, 0.85];
  let p1 = [x + dir * len * 0.18, y - len * 0.22, 0.7];
  let p2 = [x + dir * len * 0.34 + bend * 0.5, y - len * 0.56, 0.45];
  let p3 = [x + dir * len * 0.42 + bend, y - len, 0.14];

  brush.noFill();
  brush.noHatch();

  brush.set("HB", "#454545", 0.34 * sc);
  brush.spline([p0, p1, p2, p3], 0.5);

  brush.set("2H", "#808080", 0.18 * sc);
  brush.spline(
    [
      [p0[0] + dir * 1.2, p0[1] - 1, 0.4],
      [p1[0] + dir * 1.2, p1[1], 0.32],
      [p2[0] + dir * 1.0, p2[1], 0.2],
      [p3[0] + dir * 0.8, p3[1], 0.08]
    ],
    0.45
  );

  if (random() < 0.7) {
    let fragX = lerp(p1[0], p2[0], random(0.35, 0.75));
    let fragY = lerp(p1[1], p2[1], random(0.35, 0.75));
    brush.set("2H", "#8a8a8a", 0.14 * sc);
    brush.line(fragX, fragY, fragX + dir * random(8, 18), fragY - random(14, 24));
  }
}

function drawLooseBlade(x, y, len, lean) {
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#6f6f6f", 0.25);

  let pts = [
    [x, y, 0.7],
    [x + lean * 0.25, y - len * 0.33, 0.45],
    [x + lean * 0.8, y - len * 0.72, 0.2],
    [x + lean, y - len, 0.06]
  ];
  brush.spline(pts, 0.5);
}

function drawPanicle(x, y, lean, sc) {
  let axisLen = random(65, 95) * sc;
  let tipX = x + lean * 0.15;
  let tipY = y - axisLen;

  brush.set("HB", "#3e3e3e", 0.34 * sc);
  brush.spline(
    [
      [x, y, 0.55],
      [x + lean * 0.06, y - axisLen * 0.35, 0.42],
      [x + lean * 0.1, y - axisLen * 0.72, 0.24],
      [tipX, tipY, 0.1]
    ],
    0.45
  );

  let branches = floor(random(10, 15));
  for (let i = 0; i < branches; i++) {
    let t = map(i, 0, branches - 1, 0.12, 0.95);
    let bx = lerp(x, tipX, t);
    let by = lerp(y, tipY, t);
    let dir = i % 2 === 0 ? -1 : 1;
    let blen = random(18, 42) * (1 - t * 0.45) * sc;
    let ang = dir * random(30, 68) - 90;

    brush.set("2H", "#616161", 0.22 * sc);
    brush.beginStroke("curve", bx, by);
    brush.move(ang, blen * 0.7, 0.45);
    brush.endStroke(ang + dir * random(8, 18), 0.12);

    let sx = bx + cos(ang) * blen;
    let sy = by + sin(ang) * blen;
    drawSeedCluster(sx, sy, dir, sc * (1 - t * 0.25));
  }
}

function drawSpikeSeed(x, y, lean, sc) {
  let len = random(70, 100) * sc;
  let tipX = x + lean * 0.08;
  let tipY = y - len;

  brush.set("HB", "#3d3d3d", 0.34 * sc);
  brush.spline(
    [
      [x, y, 0.6],
      [x + lean * 0.04, y - len * 0.34, 0.45],
      [x + lean * 0.07, y - len * 0.7, 0.22],
      [tipX, tipY, 0.08]
    ],
    0.42
  );

  let n = floor(random(14, 22));
  for (let i = 0; i < n; i++) {
    let t = map(i, 0, n - 1, 0.1, 0.96);
    let sx = lerp(x, tipX, t);
    let sy = lerp(y, tipY, t);
    let dir = i % 2 === 0 ? -1 : 1;
    let awn = random(14, 34) * sc;
    let offset = map(i, 0, n - 1, 10, 2) * sc;

    brush.set("2H", "#676767", 0.2 * sc);
    brush.line(sx, sy, sx + dir * offset, sy - 2);
    brush.line(sx + dir * offset, sy - 2, sx + dir * offset + dir * awn, sy - awn * 0.9);

    if (random() < 0.85) {
      brush.set("HB", "#4d4d4d", 0.16 * sc);
      brush.line(sx, sy, sx + dir * offset * 0.7, sy + random(1, 3));
    }
  }

  brush.set("2B", "#2c2c2c", 0.18 * sc);
  brush.line(x - 1, y + 2, tipX + 1, tipY - 2);
}

function drawTuftSeed(x, y, lean, sc) {
  let centerX = x + lean * 0.08;
  let centerY = y - random(10, 22) * sc;
  let rays = floor(random(16, 24));

  brush.set("HB", "#424242", 0.22 * sc);
  brush.line(x, y, centerX, centerY);

  for (let i = 0; i < rays; i++) {
    let a = -90 + map(i, 0, rays - 1, -85, 85) + random(-6, 6);
    let len = random(24, 52) * sc;
    brush.set("2H", "#6c6c6c", 0.14 * sc);
    brush.line(centerX, centerY, centerX + cos(a) * len, centerY + sin(a) * len);

    if (random() < 0.7) {
      let tx = centerX + cos(a) * len;
      let ty = centerY + sin(a) * len;
      brush.set("2H", "#8a8a8a", 0.1 * sc);
      brush.line(tx, ty, tx + cos(a + random(-18, 18)) * random(4, 9), ty + sin(a + random(-18, 18)) * random(4, 9));
    }
  }

  brush.set("HB", "#4e4e4e", 0.16 * sc);
  brush.circle(centerX, centerY, 3.5 * sc, 0.4);
}

function drawSeedCluster(x, y, dir, sc) {
  let n = floor(random(3, 6));
  for (let i = 0; i < n; i++) {
    let ox = x + dir * random(3, 10);
    let oy = y + random(-5, 6);
    let l = random(8, 16) * sc;
    let a = dir > 0 ? random(-75, -35) : random(-145, -105);
    brush.set("2H", "#717171", 0.12 * sc);
    brush.line(ox, oy, ox + cos(a) * l, oy + sin(a) * l);

    brush.set("HB", "#515151", 0.12 * sc);
    brush.line(ox - dir * 2, oy + 1, ox + dir * random(2, 5), oy + random(2, 4));
  }
}

function drawLooseStudies() {
  drawStudySprig(470, 170, 150, -18, "spike");
  drawStudySprig(500, 305, 135, 10, "panicle");
  drawStudySprig(95, 155, 125, 22, "tuft");

  brush.noFill();
  brush.noHatch();

  for (let i = 0; i < 18; i++) {
    let x = random(35, 560);
    let y = random(60, 520);
    let a = random(-40, 40);
    let l = random(8, 24);
    brush.set("2H", "#9a9a9a", 0.1);
    brush.line(x, y, x + cos(a) * l, y + sin(a) * l);
  }
}

function drawStudySprig(x, y, h, lean, seedType) {
  brush.set("2H", "#8a8a8a", 0.16);
  brush.line(x - 16, y + 16, x + 26, y + 16);

  brush.noFill();
  brush.noHatch();

  let topX = x + lean;
  let topY = y - h;

  brush.set("HB", "#505050", 0.32);
  brush.spline(
    [
      [x, y, 0.7],
      [x + lean * 0.18, y - h * 0.32, 0.52],
      [x + lean * 0.7, y - h * 0.7, 0.28],
      [topX, topY, 0.08]
    ],
    0.48
  );

  if (seedType === "spike") drawSpikeSeed(topX, topY, lean * 0.8, 0.7);
  if (seedType === "panicle") drawPanicle(topX, topY, lean * 0.7, 0.68);
  if (seedType === "tuft") drawTuftSeed(topX, topY, lean * 0.8, 0.72);

  for (let i = 0; i < 3; i++) {
    let t = map(i, 0, 2, 0.28, 0.7);
    let sx = lerp(x, topX, t);
    let sy = lerp(y, topY, t);
    let dir = i % 2 === 0 ? -1 : 1;
    drawBlade(sx, sy, random(42, 78), random(10, 26) * dir, dir, 0.5);
  }
}

function drawGroundNotes() {
  brush.noFill();
  brush.noHatch();

  for (let i = 0; i < 26; i++) {
    let x = random(70, 520);
    let y = random(535, 585);
    let l = random(10, 28);
    let a = random(-25, 25) - 90;
    brush.set("2H", "#9b9b9b", 0.09);
    brush.line(x, y, x + cos(a) * l, y + sin(a) * l);
  }

  brush.set("HB", "#5c5c5c", 0.14);
  brush.line(82, 552, 112, 550);
  brush.line(430, 555, 465, 553);
}

function graphiteHatchShape(points, brushName, col, dist, ang, wt) {
  brush.noFill();
  brush.hatchStyle(brushName, col, wt);
  brush.hatch(dist, ang, { rand: 0.06, continuous: true, gradient: 0.2 });
  brush.beginShape(0.35);
  for (let p of points) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function graphiteCrossShade(points, brushName, col, d1, a1, a2, wt) {
  brush.noFill();
  brush.hatchStyle(brushName, col, wt);
  brush.hatch(d1, a1, { rand: 0.05, continuous: true, gradient: 0.25 });
  brush.beginShape(0.35);
  for (let p of points) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle(brushName, col, wt * 0.9);
  brush.hatch(d1 + 1.5, a2, { rand: 0.07, continuous: true, gradient: 0.18 });
  brush.beginShape(0.35);
  for (let p of points) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();
}

function organicBladePolygon(cx, cy, w, h, tilt) {
  let pts = [];
  let n = 18;
  for (let i = 0; i < n; i++) {
    let t = map(i, 0, n - 1, 0, 1);
    let side = i < n / 2 ? 1 : -1;
    let u = i < n / 2 ? map(i, 0, n / 2 - 1, 0, 1) : map(i, n / 2, n - 1, 1, 0);
    let yy = cy - u * h;
    let widthHere = sin(u * 180) * w * 0.5 + noise(u * 3.2, cx * 0.01) * 3;
    let xx = cx + side * widthHere;
    let dx = xx - cx;
    let dy = yy - cy;
    let rx = dx * cos(tilt) - dy * sin(tilt);
    let ry = dx * sin(tilt) + dy * cos(tilt);
    pts.push([cx + rx, cy + ry]);
  }
  return pts;
}