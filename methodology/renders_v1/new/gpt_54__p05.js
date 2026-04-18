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

  brush.noField();
  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noHatch();
  brush.noClip();

  drawForest();

  noLoop();
}

function drawForest() {
  let trunks = [];

  for (let i = 0; i < 28; i++) {
    let x = map(i, 0, 27, 20, 580) + random(-10, 10);
    let y = random(170, 240);
    let w = random(18, 60);
    let h = random(320, 470);
    trunks.push({ x, y, w, h, depth: random() });
  }

  trunks.sort((a, b) => a.w - b.w);

  drawSkyWeave();
  drawFarVerticals();
  drawGroundBands();

  for (let t of trunks) {
    drawTrunkShadowMass(t);
  }

  for (let t of trunks) {
    drawTrunkHatching(t);
  }

  drawUndergrowth();
  drawForegroundCross();
  drawDarkAccents();
  drawOuterContours(trunks);
}

function drawSkyWeave() {
  brush.noFill();

  for (let y = 10; y < 250; y += 11) {
    let ang = 78 + random(-4, 4);
    let dist = map(y, 10, 250, 12, 7);
    brush.hatchStyle("rotring", "#111111", 0.27);
    brush.hatch(dist, ang, { rand: 0.08, continuous: true });

    brush.beginShape(0.25);
    brush.vertex(0, y + random(-3, 3));
    brush.vertex(600, y + random(-3, 3));
    brush.vertex(600, min(260, y + 18 + random(0, 8)));
    brush.vertex(0, min(260, y + 22 + random(0, 8)));
    brush.endShape(true);
    brush.noHatch();
  }

  for (let x = 0; x < 600; x += 34) {
    brush.hatchStyle("rotring", "#111111", 0.24);
    brush.hatch(10, 102 + random(-5, 5), { rand: 0.06, continuous: true });

    brush.beginShape(0.2);
    brush.vertex(x + random(-4, 4), 0);
    brush.vertex(min(600, x + 18 + random(-3, 5)), 0);
    brush.vertex(min(600, x + 12 + random(-4, 4)), 260);
    brush.vertex(x + random(-4, 4), 260);
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawFarVerticals() {
  for (let i = 0; i < 55; i++) {
    let x = random(0, 600);
    let y1 = random(120, 230);
    let y2 = random(360, 590);

    brush.set("pen", "#0d0d0d", 0.45);
    brush.line(x + random(-2, 2), y1, x + random(-8, 8), y2);

    if (random() < 0.65) {
      brush.set("rotring", "#111111", 0.22);
      brush.line(x + random(-4, 4), y1 + random(10, 40), x + random(-10, 10), y2);
    }
  }
}

function drawGroundBands() {
  for (let y = 300; y < 600; y += 16) {
    let top = y + random(-3, 3);
    let bot = min(600, y + 12 + random(2, 8));

    brush.hatchStyle("rotring", "#0f0f0f", map(y, 300, 600, 0.25, 0.5));
    brush.hatch(map(y, 300, 600, 9, 4), 10 + random(-7, 7), {
      rand: 0.14,
      continuous: true,
      gradient: 0.25
    });

    brush.beginShape(0.2);
    brush.vertex(0, top);
    brush.vertex(600, top + random(-2, 2));
    brush.vertex(600, bot);
    brush.vertex(0, bot + random(-2, 2));
    brush.endShape(true);
    brush.noHatch();
  }

  for (let y = 330; y < 600; y += 28) {
    brush.hatchStyle("rotring", "#151515", 0.22);
    brush.hatch(8, 165 + random(-8, 8), { rand: 0.12, continuous: true });

    brush.beginShape(0.2);
    brush.vertex(0, y);
    brush.vertex(600, y + random(-4, 4));
    brush.vertex(600, min(600, y + 10));
    brush.vertex(0, min(600, y + 16));
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawTrunkShadowMass(t) {
  let x = t.x;
  let y = t.y;
  let w = t.w;
  let h = t.h;

  let left = x - w * 0.45 + random(-3, 3);
  let right = x + w * 0.45 + random(-3, 3);

  brush.hatchStyle("rotring", "#080808", map(w, 18, 60, 0.35, 0.6));
  brush.hatch(map(w, 18, 60, 5.5, 2.5), 88 + random(-7, 7), {
    rand: 0.08,
    continuous: true,
    gradient: 0.2
  });

  brush.beginShape(0.28);
  brush.vertex(left, y);
  brush.vertex(right, y + random(-4, 6));
  brush.vertex(right - random(4, 14), y + h);
  brush.vertex(left + random(4, 14), y + h);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#111111", map(w, 18, 60, 0.22, 0.35));
  brush.hatch(map(w, 18, 60, 8, 4), 118 + random(-5, 5), {
    rand: 0.05,
    continuous: true
  });

  brush.beginShape(0.2);
  brush.vertex(left + w * 0.1, y + h * 0.05);
  brush.vertex(right - w * 0.25, y + h * 0.03);
  brush.vertex(right - w * 0.15, y + h * 0.92);
  brush.vertex(left + w * 0.18, y + h * 0.95);
  brush.endShape(true);
  brush.noHatch();

  let shadowLen = map(h, 320, 470, 70, 150);
  brush.hatchStyle("rotring", "#0b0b0b", 0.35);
  brush.hatch(4, 12 + random(-4, 4), { rand: 0.12, continuous: true, gradient: 0.3 });

  brush.beginShape(0.18);
  brush.vertex(left + w * 0.15, y + h - 6);
  brush.vertex(right - w * 0.1, y + h + 2);
  brush.vertex(right + shadowLen, y + h + random(18, 42));
  brush.vertex(left + shadowLen * 0.55, y + h + random(22, 50));
  brush.endShape(true);
  brush.noHatch();
}

function drawTrunkHatching(t) {
  let x = t.x;
  let y = t.y;
  let w = t.w;
  let h = t.h;
  let left = x - w * 0.42;
  let right = x + w * 0.42;

  let strips = int(map(w, 18, 60, 3, 8));

  for (let i = 0; i < strips; i++) {
    let sx = map(i, 0, strips - 1, left, right);
    brush.set("pen", "#101010", map(w, 18, 60, 0.45, 0.85));
    brush.spline([
      [sx + random(-3, 3), y],
      [sx + random(-6, 6), y + h * 0.25, random(0.8, 1.1)],
      [sx + random(-8, 8), y + h * 0.55, random(0.7, 1.05)],
      [sx + random(-6, 6), y + h]
    ], 0.25);
  }

  for (let yy = y + 16; yy < y + h - 8; yy += random(18, 36)) {
    brush.set("rotring", "#141414", 0.22);
    brush.line(left + random(-3, 6), yy, right + random(-6, 3), yy + random(-6, 6));
  }

  if (w > 36) {
    brush.hatchStyle("rotring", "#080808", 0.25);
    brush.hatch(3.2, 92 + random(-4, 4), { rand: 0.05, continuous: true });

    brush.beginShape(0.18);
    brush.vertex(left + w * 0.15, y + h * 0.08);
    brush.vertex(left + w * 0.34, y + h * 0.05);
    brush.vertex(left + w * 0.28, y + h * 0.95);
    brush.vertex(left + w * 0.08, y + h * 0.98);
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawUndergrowth() {
  for (let band = 0; band < 8; band++) {
    let yBase = map(band, 0, 7, 305, 585);
    let count = int(map(band, 0, 7, 22, 55));

    for (let i = 0; i < count; i++) {
      let x = random(0, 600);
      let h = random(18, map(band, 0, 7, 45, 95));
      let lean = random(-22, 22);
      let y = yBase + random(-18, 18);

      brush.set("pen", "#0f0f0f", map(band, 0, 7, 0.28, 0.65));
      brush.spline([
        [x, y],
        [x + lean * 0.2, y - h * 0.35, random(0.8, 1.2)],
        [x + lean, y - h]
      ], 0.35);

      if (random() < 0.55) {
        brush.set("rotring", "#111111", map(band, 0, 7, 0.15, 0.32));
        brush.line(x + random(-2, 2), y - h * 0.45, x + random(-12, 12), y - h * 0.45 + random(-6, 6));
      }
    }
  }

  for (let y = 310; y < 600; y += 22) {
    brush.hatchStyle("rotring", "#0d0d0d", map(y, 310, 600, 0.2, 0.42));
    brush.hatch(map(y, 310, 600, 8, 3.2), 140 + random(-12, 12), {
      rand: 0.18,
      continuous: true,
      gradient: 0.35
    });

    brush.beginShape(0.2);
    let pts = [];
    let step = 40;
    for (let x = 0; x <= 600; x += step) {
      pts.push([x, y + random(-12, 12)]);
    }
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.vertex(600, min(600, y + 18));
    brush.vertex(0, min(600, y + 18));
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawForegroundCross() {
  for (let i = 0; i < 18; i++) {
    let x1 = random(-40, 620);
    let y1 = random(360, 610);
    let len = random(120, 260);
    let ang = random(8, 28);

    brush.set("pen", "#0a0a0a", random(0.4, 0.8));
    brush.beginStroke("curve", x1, y1);
    brush.move(ang, len * 0.45, random(0.9, 1.2));
    brush.move(ang + random(-10, 10), len * 0.35, random(0.7, 1.1));
    brush.endStroke(ang + random(-8, 8), random(0.55, 0.95));
  }

  for (let i = 0; i < 22; i++) {
    let x1 = random(-20, 620);
    let y1 = random(350, 610);
    let x2 = x1 + random(-140, 140);
    let y2 = y1 - random(18, 80);

    brush.set("rotring", "#121212", 0.18);
    brush.line(x1, y1, x2, y2);
  }
}

function drawDarkAccents() {
  for (let i = 0; i < 24; i++) {
    let x = random(10, 590);
    let y = random(320, 590);
    let w = random(25, 80);
    let h = random(10, 28);

    brush.hatchStyle("rotring", "#050505", 0.35);
    brush.hatch(random(2.4, 4.2), random([18, 26, 154, 166, 92]), {
      rand: 0.16,
      continuous: true
    });

    brush.beginShape(0.2);
    brush.vertex(x, y);
    brush.vertex(x + w, y + random(-5, 5));
    brush.vertex(x + w * random(0.7, 1.05), y + h);
    brush.vertex(x + random(-8, 8), y + h + random(-4, 4));
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawOuterContours(trunks) {
  brush.noFill();

  for (let t of trunks) {
    let x = t.x;
    let y = t.y;
    let w = t.w;
    let h = t.h;
    let left = x - w * 0.45;
    let right = x + w * 0.45;

    brush.set("pen", "#050505", map(w, 18, 60, 0.42, 0.9));
    brush.spline([
      [left + random(-3, 3), y],
      [left + random(-7, 4), y + h * 0.35, 1.05],
      [left + random(-5, 5), y + h]
    ], 0.22);

    if (random() < 0.85) {
      brush.set("pen", "#070707", map(w, 18, 60, 0.3, 0.72));
      brush.spline([
        [right + random(-3, 3), y + random(-2, 5)],
        [right + random(-5, 7), y + h * 0.38, 0.95],
        [right + random(-4, 5), y + h]
      ], 0.22);
    }
  }

  for (let i = 0; i < 36; i++) {
    let x = random(0, 600);
    let y = random(250, 590);
    let len = random(20, 85);

    brush.set("rotring", "#0b0b0b", 0.22);
    brush.line(x, y, x + random(-18, 18), y + len);
  }
}