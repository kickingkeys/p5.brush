function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(27);
  noiseSeed(27);

  drawBotanicalStudy();

  noLoop();
}

function drawBotanicalStudy() {
  let stems = [];

  for (let i = 0; i < 18; i++) {
    let baseX = random(60, 540);
    let baseY = random(500, 590);
    let heightStem = random(180, 360);
    let lean = random(-90, 90);
    let sway = random(20, 70);

    let pts = [];
    let steps = int(random(6, 10));
    for (let j = 0; j <= steps; j++) {
      let t = j / steps;
      let x =
        baseX +
        lean * t +
        sin(t * 180 + random(-20, 20)) * sway * (1 - t) * 0.55 +
        map(noise(i * 0.2, t * 2.7), 0, 1, -8, 8);
      let y =
        baseY -
        heightStem * t +
        map(noise(10 + i * 0.15, t * 3.1), 0, 1, -10, 10) * t;
      let p = map(t, 0, 1, 1.1, 0.35);
      pts.push([x, y, p]);
    }

    stems.push({
      pts: pts,
      baseX: baseX,
      baseY: baseY
    });
  }

  for (let s of stems) {
    drawGrassStem(s.pts);
    maybeDrawLeafBlades(s.pts);
    maybeDrawSeedHead(s.pts);
  }

  drawForegroundLooseBlades();
  drawPartialGroundNotes();
}

function drawGrassStem(pts) {
  brush.noFill();
  brush.noHatch();

  brush.set("2H", "#6a6a6a", 0.45);
  brush.spline(pts, 0.45);

  brush.set("HB", "#3f3f3f", 0.75);
  brush.spline(pts, 0.42);

  if (random() < 0.55) {
    let trimmed = [];
    let stop = int(random(3, pts.length));
    for (let i = 0; i < stop; i++) trimmed.push(pts[i]);
    brush.set("2H", "#7a7a7a", 0.3);
    brush.spline(trimmed, 0.35);
  }
}

function maybeDrawLeafBlades(stemPts) {
  let count = int(random(1, 4));
  for (let i = 0; i < count; i++) {
    let idx = int(random(1, stemPts.length - 2));
    let a = stemPts[idx];
    let b = stemPts[min(idx + 1, stemPts.length - 1)];
    let dir = atan2(b[1] - a[1], b[0] - a[0]);
    let side = random() < 0.5 ? -1 : 1;
    let lengthBlade = random(45, 120);
    let spread = random(18, 45) * side;

    let blade = [];
    let n = int(random(4, 7));
    for (let j = 0; j <= n; j++) {
      let t = j / n;
      let x =
        a[0] +
        cos(dir) * lengthBlade * 0.18 * t +
        sin(dir) * spread * sin(t * 90) +
        side * t * random(2, 8);
      let y =
        a[1] +
        sin(dir) * lengthBlade * 0.18 * t -
        lengthBlade * t * 0.85 +
        cos(dir) * spread * sin(t * 90) * 0.25;
      blade.push([x, y, map(t, 0, 1, 0.7, 0.15)]);
    }

    brush.noFill();
    brush.noHatch();

    brush.set("2H", "#757575", 0.32);
    brush.spline(blade, 0.55);

    if (random() < 0.8) {
      brush.set("HB", "#4a4a4a", 0.45);
      let partial = [];
      let cutoff = int(random(3, blade.length + 1));
      for (let k = 0; k < cutoff; k++) partial.push(blade[k]);
      brush.spline(partial, 0.45);
    }

    if (random() < 0.4) {
      let edge2 = [];
      for (let p of blade) edge2.push([p[0] + random(1, 4), p[1] + random(-2, 2), p[2] * 0.8]);
      brush.set("2H", "#888888", 0.18);
      brush.spline(edge2, 0.45);
    }
  }
}

function maybeDrawSeedHead(stemPts) {
  let tip = stemPts[stemPts.length - 1];
  let type = random();

  if (type < 0.38) {
    drawSpikeSeedHead(tip[0], tip[1], random(50, 110), random(-35, 35));
  } else if (type < 0.72) {
    drawPanicleSeedHead(tip[0], tip[1], random(55, 120), random(-35, 35));
  } else {
    drawRoundHead(tip[0], tip[1], random(18, 34));
  }
}

function drawSpikeSeedHead(x, y, len, tilt) {
  let ang = -90 + tilt;
  let x2 = x + cos(ang) * len;
  let y2 = y + sin(ang) * len;

  brush.noFill();
  brush.noHatch();

  brush.set("HB", "#434343", 0.65);
  brush.line(x, y, x2, y2);

  let awnCount = int(map(len, 50, 110, 10, 18));
  for (let i = 0; i < awnCount; i++) {
    let t = i / (awnCount - 1);
    let px = lerp(x, x2, t);
    let py = lerp(y, y2, t);

    let side1 = ang + random(115, 145);
    let side2 = ang - random(115, 145);
    let l1 = random(10, 26) * (1 - t * 0.25);
    let l2 = random(8, 22) * (1 - t * 0.25);

    brush.set("2H", "#6e6e6e", 0.28);
    brush.line(px, py, px + cos(side1) * l1, py + sin(side1) * l1);
    if (random() < 0.92) {
      brush.line(px, py, px + cos(side2) * l2, py + sin(side2) * l2);
    }

    if (random() < 0.7) {
      let g1 = side1 + random(-10, 10);
      brush.set("HB", "#555555", 0.2);
      brush.line(px + random(-1, 1), py + random(-1, 1), px + cos(g1) * l1 * 0.55, py + sin(g1) * l1 * 0.55);
    }
  }
}

function drawPanicleSeedHead(x, y, len, tilt) {
  let ang = -90 + tilt;
  let nodes = int(random(5, 8));
  let spine = [];

  for (let i = 0; i <= nodes; i++) {
    let t = i / nodes;
    let px = x + cos(ang) * len * t + sin(t * 180) * random(-8, 8);
    let py = y + sin(ang) * len * t;
    spine.push([px, py, map(t, 0, 1, 0.9, 0.35)]);
  }

  brush.noFill();
  brush.noHatch();
  brush.set("HB", "#4a4a4a", 0.55);
  brush.spline(spine, 0.35);

  for (let i = 1; i < spine.length; i++) {
    let p = spine[i];
    let branches = int(random(2, 5));
    for (let j = 0; j < branches; j++) {
      let side = random() < 0.5 ? -1 : 1;
      let a = ang + side * random(40, 95);
      let l = random(10, 30) * (1 - i / spine.length * 0.25);
      let bx = p[0] + cos(a) * l;
      let by = p[1] + sin(a) * l;

      brush.set("2H", "#707070", 0.24);
      brush.line(p[0], p[1], bx, by);

      let grains = int(random(2, 4));
      for (let k = 0; k < grains; k++) {
        let gt = (k + 1) / (grains + 1);
        let gx = lerp(p[0], bx, gt) + random(-2, 2);
        let gy = lerp(p[1], by, gt) + random(-2, 2);
        drawTinySeed(gx, gy, random(5, 9), a + random(-25, 25));
      }
    }
  }
}

function drawRoundHead(x, y, r) {
  let pts = [];
  let count = 20;
  for (let i = 0; i < count; i++) {
    let a = map(i, 0, count, 0, 360);
    let rr = r + map(noise(50 + cos(a) * 0.4, sin(a) * 0.4), 0, 1, -5, 5);
    pts.push([x + cos(a) * rr, y + sin(a) * rr]);
  }

  brush.noFill();
  brush.set("HB", "#424242", 0.6);
  brush.beginShape(0.35);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  brush.hatchStyle("2H", "#777777", 0.22);
  brush.hatch(5, 35, { rand: 0.08, continuous: true });
  brush.beginShape(0.3);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#5a5a5a", 0.22);
  brush.hatch(6, 120, { rand: 0.08, continuous: true });
  brush.beginShape(0.3);
  for (let p of pts) brush.vertex(lerp(x, p[0], 0.72), lerp(y, p[1], 0.72));
  brush.endShape(true);
  brush.noHatch();

  for (let i = 0; i < 18; i++) {
    let a = random(360);
    let l = random(r * 0.55, r * 1.15);
    brush.set("2H", "#757575", 0.18);
    brush.line(x, y, x + cos(a) * l, y + sin(a) * l);
  }
}

function drawTinySeed(x, y, s, ang) {
  let pts = [];
  for (let i = 0; i < 10; i++) {
    let a = map(i, 0, 10, 0, 360);
    let rx = cos(a) * s * 0.55;
    let ry = sin(a) * s * 0.32;
    let ca = cos(ang);
    let sa = sin(ang);
    let xx = x + rx * ca - ry * sa;
    let yy = y + rx * sa + ry * ca;
    pts.push([xx, yy]);
  }

  brush.noFill();
  brush.set("2H", "#777777", 0.2);
  brush.beginShape(0.3);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  if (random() < 0.55) {
    brush.set("HB", "#5a5a5a", 0.14);
    brush.line(x - cos(ang) * s * 0.2, y - sin(ang) * s * 0.2, x + cos(ang) * s * 0.3, y + sin(ang) * s * 0.3);
  }
}

function drawForegroundLooseBlades() {
  for (let i = 0; i < 9; i++) {
    let x = random(20, 580);
    let y = random(450, 595);
    let h = random(120, 240);
    let pts = [];
    let dir = random(-70, 70);
    let n = 6;

    for (let j = 0; j <= n; j++) {
      let t = j / n;
      pts.push([
        x + sin(t * 180) * dir * 0.55 + map(noise(i * 0.3, t * 2.4), 0, 1, -5, 5),
        y - h * t + map(noise(20 + i * 0.2, t * 1.8), 0, 1, -4, 4),
        map(t, 0, 1, 1, 0.12)
      ]);
    }

    brush.set("2H", "#808080", 0.24);
    brush.spline(pts, 0.5);

    if (random() < 0.5) {
      let pts2 = [];
      let cutoff = int(random(3, pts.length));
      for (let k = 0; k < cutoff; k++) pts2.push(pts[k]);
      brush.set("HB", "#555555", 0.26);
      brush.spline(pts2, 0.4);
    }
  }
}

function drawPartialGroundNotes() {
  for (let i = 0; i < 14; i++) {
    let x = random(40, 560);
    let y = random(505, 592);
    let w = random(20, 60);
    let h = random(6, 18);

    brush.noFill();

    if (random() < 0.7) {
      brush.set("2H", "#8a8a8a", 0.16);
      brush.line(x, y, x + w, y - random(0, h));
    }

    if (random() < 0.45) {
      brush.set("2H", "#8a8a8a", 0.14);
      brush.line(x + random(-4, 4), y + random(-2, 2), x + w * random(0.3, 1), y + random(-h, 0));
    }
  }

  let shadowShapes = 4;
  for (let i = 0; i < shadowShapes; i++) {
    let cx = random(120, 500);
    let cy = random(470, 565);
    let ww = random(40, 110);
    let hh = random(12, 28);
    let pts = [];

    for (let j = 0; j < 12; j++) {
      let a = map(j, 0, 12, 0, 360);
      let rx = ww * 0.5 + random(-6, 6);
      let ry = hh * 0.5 + random(-3, 3);
      pts.push([cx + cos(a) * rx, cy + sin(a) * ry]);
    }

    brush.hatchStyle("2H", "#8a8a8a", 0.18);
    brush.hatch(7, random(10, 35), { rand: 0.08, continuous: true });
    brush.beginShape(0.25);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }
}