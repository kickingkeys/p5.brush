let trunks = [];
let trunkMask = [];
let shadowBands = [];
let shrubPatches = [];
let branchLines = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  randomSeed(42);
  noiseSeed(42);
  brush.scaleBrushes(3);

  generateForest();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  drawPaperGrain();
  drawShadowWeave();
  drawShrubMass();
  drawTrunks();
  drawBranches();
  drawForegroundScratches();

  noLoop();
}

function generateForest() {
  trunks = [];
  trunkMask = [];
  shadowBands = [];
  shrubPatches = [];
  branchLines = [];

  let x = 20;
  while (x < width - 20) {
    let w = random(14, 34);
    let gap = random(8, 26);
    let lean = random(-10, 10);
    let topY = random(40, 180);
    let bottomY = height + random(20, 100);

    trunks.push({
      x: x + random(-8, 8),
      w: w,
      topY: topY,
      bottomY: bottomY,
      lean: lean,
      darkness: random(0.4, 1),
      split: random() < 0.25,
      knots: int(random(1, 4))
    });

    x += w + gap;
  }

  for (let t of trunks) {
    let left = [];
    let right = [];
    let steps = int(random(8, 15));
    for (let i = 0; i <= steps; i++) {
      let yy = lerp(t.topY, min(height, t.bottomY), i / steps);
      let drift = map(noise(t.x * 0.01, yy * 0.01), 0, 1, -10, 10) + map(i, 0, steps, 0, t.lean);
      let taper = map(i, 0, steps, 0.7, 1.2);
      let halfW = t.w * 0.5 * taper + map(noise(yy * 0.03, t.x * 0.02), 0, 1, -3, 3);
      left.push([t.x + drift - halfW, yy]);
      right.push([t.x + drift + halfW, yy]);
    }
    let pts = left.concat(right.reverse());
    trunkMask.push(new brush.Polygon(pts));
  }

  for (let i = 0; i < 18; i++) {
    let y = map(i, 0, 17, 220, 590) + random(-10, 10);
    shadowBands.push({
      y: y,
      angle: random(-18, 18),
      density: random(0.4, 1),
      h: random(16, 48)
    });
  }

  for (let i = 0; i < 80; i++) {
    shrubPatches.push({
      x: random(10, width - 10),
      y: random(250, height - 10),
      w: random(30, 120),
      h: random(18, 70),
      angle: random(-35, 35),
      dark: random(0.3, 1)
    });
  }

  for (let t of trunks) {
    let count = int(random(2, 6));
    for (let i = 0; i < count; i++) {
      let yy = random(t.topY + 20, min(320, t.bottomY - 120));
      let dir = random() < 0.5 ? -1 : 1;
      let len = random(40, 120);
      branchLines.push({
        x: t.x + random(-4, 4),
        y: yy,
        a1: dir < 0 ? random(165, 210) : random(-30, 15),
        a2: dir < 0 ? random(180, 235) : random(-55, 5),
        len1: len,
        len2: len * random(0.35, 0.7)
      });
    }
  }
}

function drawPaperGrain() {
  brush.set("2H", "#201d1b", 0.28);
  for (let i = 0; i < 350; i++) {
    let x = random(width);
    let y = random(height);
    let l = random(2, 7);
    let a = random(-20, 20);
    let x2 = x + cos(a) * l;
    let y2 = y + sin(a) * l;
    brush.line(x, y, x2, y2);
  }
}

function drawShadowWeave() {
  brush.set("rotring", "#111111", 0.42);

  for (let band of shadowBands) {
    let y0 = band.y;
    let h = band.h;
    let lines = int(map(band.density, 0.4, 1, 14, 42));

    for (let j = 0; j < lines; j++) {
      let yy = y0 + map(j, 0, lines - 1, -h / 2, h / 2) + random(-2, 2);
      let pts = [];
      let step = random(18, 34);

      for (let x = -20; x <= width + 20; x += step) {
        let wobble = map(noise(x * 0.01, yy * 0.02), 0, 1, -8, 8);
        let sag = map(y0, 220, 590, 0, 16);
        pts.push([x, yy + wobble + sin(x * 0.18 + y0) * 2 + sag]);
      }

      brush.spline(pts, 0.18);
    }
  }

  brush.set("pen", "#111111", 0.34);
  for (let i = 0; i < 170; i++) {
    let y = random(260, height);
    let x1 = random(-10, width * 0.55);
    let x2 = x1 + random(width * 0.2, width * 0.7);
    let pts = [];
    let n = int(random(4, 8));
    for (let k = 0; k < n; k++) {
      let t = k / (n - 1);
      let xx = lerp(x1, x2, t);
      let yy = y + sin(t * 180 + random(-20, 20)) * random(4, 12) + noise(xx * 0.01, y * 0.02) * 10;
      pts.push([xx, yy]);
    }
    brush.spline(pts, 0.35);
  }
}

function drawShrubMass() {
  brush.set("rotring", "#111111", 0.34);

  for (let s of shrubPatches) {
    let layers = int(map(s.dark, 0.3, 1, 3, 8));

    for (let n = 0; n < layers; n++) {
      let cx = s.x + random(-s.w * 0.18, s.w * 0.18);
      let cy = s.y + random(-s.h * 0.2, s.h * 0.2);
      let ww = s.w * random(0.45, 1);
      let hh = s.h * random(0.4, 1);

      push();
      translate(cx, cy);
      rotate(s.angle + random(-12, 12));
      brush.noFill();
      brush.hatch(5, random(65, 120), {
        rand: 0.22,
        continuous: true,
        gradient: 0.35
      });
      brush.hatchStyle(random() < 0.5 ? "pen" : "rotring", "#111111", random(0.22, 0.42));
      brush.rect(0, 0, ww, hh, "center");
      pop();
    }
  }

  brush.noHatch();

  brush.set("pen", "#111111", 0.3);
  for (let i = 0; i < 420; i++) {
    let x = random(width);
    let y = random(280, height);
    let len = random(6, 18);
    let ang = random(70, 115);
    brush.line(x, y, x + cos(ang) * len, y + sin(ang) * len);
  }
}

function drawTrunks() {
  for (let i = 0; i < trunks.length; i++) {
    let t = trunks[i];
    let p = trunkMask[i];

    let fillDensity = map(t.darkness, 0.4, 1, 7, 3.2);
    let w1 = map(t.darkness, 0.4, 1, 0.28, 0.42);
    let w2 = map(t.darkness, 0.4, 1, 0.18, 0.28);

    p.hatch(fillDensity, 90 + random(-3, 3), {
      rand: 0.1,
      continuous: false,
      gradient: 0.15
    });

    brush.hatchStyle("rotring", "#111111", w1);
    p.hatch(fillDensity, 90 + random(-3, 3), {
      rand: 0.1,
      continuous: false,
      gradient: 0.15
    });

    brush.hatchStyle("pen", "#111111", w2);
    p.hatch(fillDensity * 1.8, random(-8, 8), {
      rand: 0.12,
      continuous: true,
      gradient: 0.25
    });

    if (t.darkness > 0.72) {
      brush.hatchStyle("HB", "#111111", 0.24);
      p.hatch(fillDensity * 1.4, 165 + random(-8, 8), {
        rand: 0.18,
        continuous: true,
        gradient: 0.2
      });
    }

    brush.noHatch();

    let steps = int(random(7, 12));
    brush.set("rotring", "#111111", 0.44);
    for (let k = 0; k < steps; k++) {
      let yy1 = lerp(t.topY, min(height, t.bottomY), k / steps);
      let yy2 = lerp(t.topY, min(height, t.bottomY), (k + 1) / steps);
      let drift1 = map(noise(t.x * 0.01, yy1 * 0.01), 0, 1, -8, 8) + map(k, 0, steps, 0, t.lean);
      let drift2 = map(noise(t.x * 0.01, yy2 * 0.01), 0, 1, -8, 8) + map(k + 1, 0, steps, 0, t.lean);
      let taper1 = map(k, 0, steps, 0.7, 1.2);
      let taper2 = map(k + 1, 0, steps, 0.7, 1.2);
      let hw1 = t.w * 0.5 * taper1;
      let hw2 = t.w * 0.5 * taper2;

      brush.line(t.x + drift1 - hw1, yy1, t.x + drift2 - hw2, yy2);
      brush.line(t.x + drift1 + hw1, yy1, t.x + drift2 + hw2, yy2);
    }

    for (let m = 0; m < t.knots; m++) {
      let ky = random(t.topY + 35, min(height - 40, t.bottomY - 80));
      let kx = t.x + random(-t.w * 0.18, t.w * 0.18);
      brush.set("pen", "#111111", 0.24);
      brush.arc(kx, ky, random(6, 13), 0, 360);
      brush.line(kx - 6, ky, kx + 5, ky + random(-2, 2));
    }

    if (t.split) {
      let sy = random(t.topY + 30, min(220, t.bottomY - 180));
      brush.set("rotring", "#111111", 0.28);
      brush.line(t.x, sy, t.x - random(12, 20), sy - random(30, 70));
      brush.line(t.x, sy, t.x + random(12, 20), sy - random(20, 60));
    }
  }
}

function drawBranches() {
  brush.set("pen", "#111111", 0.24);

  for (let b of branchLines) {
    brush.beginStroke("curve", b.x, b.y);
    brush.move(b.a1, b.len1, 1);
    brush.move(b.a2, b.len2, 0.7);
    brush.endStroke(b.a2 + random(-18, 18), 0.2);

    let twigCount = int(random(2, 5));
    for (let i = 0; i < twigCount; i++) {
      let tx = b.x + cos(b.a1) * random(10, b.len1 * 0.9);
      let ty = b.y + sin(b.a1) * random(10, b.len1 * 0.9);
      let ang = b.a1 + random(-75, 75);
      let len = random(12, 35);
      brush.line(tx, ty, tx + cos(ang) * len, ty + sin(ang) * len);
    }
  }
}

function drawForegroundScratches() {
  brush.set("2H", "#111111", 0.18);
  for (let i = 0; i < 260; i++) {
    let x = random(width);
    let y = random(height * 0.58, height);
    let l = random(3, 10);
    let a = random(80, 110);
    brush.line(x, y, x + cos(a) * l, y + sin(a) * l);
  }

  brush.set("HB", "#111111", 0.22);
  for (let i = 0; i < 120; i++) {
    let x = random(width);
    let y = random(height * 0.65, height);
    let pts = [
      [x, y],
      [x + random(-8, 8), y - random(6, 16)],
      [x + random(-5, 5), y - random(16, 28)]
    ];
    brush.spline(pts, 0.45);
  }
}