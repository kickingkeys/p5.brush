function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(42);
  noiseSeed(42);

  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noField();

  // subtle paper-wide hatch atmosphere
  brush.hatchStyle("rotring", "#111111", 0.22);
  brush.hatch(18, 83, { rand: 0.08, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // distant vertical weave
  for (let i = 0; i < 22; i++) {
    let x = map(i, 0, 21, 20, 580) + random(-8, 8);
    brush.set("pen", "#111111", random(0.45, 0.8));
    brush.spline([
      [x, 0, 0.5],
      [x + random(-10, 10), 170, 0.7],
      [x + random(-14, 14), 360, 0.8],
      [x + random(-10, 10), 600, 0.5]
    ], 0.45);
  }

  // background forest bands made from hatched zones
  for (let band = 0; band < 7; band++) {
    let yTop = 40 + band * 65 + random(-10, 10);
    let yBot = yTop + random(70, 120);

    brush.hatchStyle("rotring", "#111111", random(0.2, 0.35));
    brush.hatch(random(10, 16), random(68, 98), { rand: 0.12, continuous: true });
    brush.beginShape(0.35);
    brush.vertex(0, yTop + random(-10, 10));
    brush.vertex(120, yTop + random(-14, 14));
    brush.vertex(240, yTop + random(-18, 18));
    brush.vertex(360, yTop + random(-18, 18));
    brush.vertex(480, yTop + random(-14, 14));
    brush.vertex(600, yTop + random(-10, 10));
    brush.vertex(600, yBot + random(-10, 10));
    brush.vertex(500, yBot + random(-16, 16));
    brush.vertex(390, yBot + random(-20, 20));
    brush.vertex(280, yBot + random(-18, 18));
    brush.vertex(150, yBot + random(-16, 16));
    brush.vertex(0, yBot + random(-10, 10));
    brush.endShape(true);
    brush.noHatch();
  }

  // layered shadow masses in the lower half
  for (let i = 0; i < 16; i++) {
    let cx = random(20, 580);
    let cy = random(290, 595);
    let w = random(80, 220);
    let h = random(35, 120);

    brush.hatchStyle("rotring", "#111111", random(0.25, 0.45));
    brush.hatch(random(4, 9), random(45, 75), { rand: 0.12, continuous: true });
    brush.beginShape(0.45);
    for (let a = 0; a < 360; a += 30) {
      let rx = w * 0.5 * (0.7 + noise(i * 11 + a * 0.03) * 0.6);
      let ry = h * 0.5 * (0.7 + noise(i * 7 + a * 0.03 + 200) * 0.6);
      brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
    }
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("rotring", "#111111", random(0.18, 0.32));
    brush.hatch(random(6, 12), random(108, 138), { rand: 0.14, continuous: true });
    brush.beginShape(0.45);
    for (let a = 0; a < 360; a += 30) {
      let rx = w * 0.38 * (0.7 + noise(i * 13 + a * 0.03 + 400) * 0.6);
      let ry = h * 0.38 * (0.7 + noise(i * 17 + a * 0.03 + 600) * 0.6);
      brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
    }
    brush.endShape(true);
    brush.noHatch();
  }

  // undergrowth thicket
  for (let i = 0; i < 320; i++) {
    let x = random(0, 600);
    let y = random(320, 600);
    let len = random(8, 34);
    let a = random(55, 125);
    brush.set("rotring", "#111111", random(0.16, 0.4));
    brush.beginStroke("curve", x, y);
    brush.move(a + random(-18, 18), len * 0.55, random(0.4, 0.8));
    brush.endStroke(a + random(-22, 22), random(0.3, 0.7));
  }

  // dark near-ground woven strokes
  for (let i = 0; i < 260; i++) {
    let x = random(0, 600);
    let y = random(410, 600);
    let dx = random(14, 55) * (random() < 0.5 ? -1 : 1);
    let dy = random(-10, 14);
    brush.set("pen", "#111111", random(0.18, 0.5));
    brush.line(x, y, x + dx, y + dy);
  }

  // main trunks
  let trunks = [];
  let trunkXs = [48, 92, 135, 182, 236, 278, 326, 372, 418, 466, 520, 566];
  for (let i = 0; i < trunkXs.length; i++) {
    let x = trunkXs[i] + random(-10, 10);
    let yBase = 610;
    let yTop = random(55, 185);
    let lean = random(-28, 28);
    let wBase = random(18, 38);
    let wTop = wBase * random(0.35, 0.62);
    trunks.push({ x, yBase, yTop, lean, wBase, wTop });
  }

  // trunk hatch zones
  for (let t of trunks) {
    let x1 = t.x - t.wBase * 0.5;
    let x2 = t.x + t.wBase * 0.5;
    let xt1 = t.x + t.lean - t.wTop * 0.5;
    let xt2 = t.x + t.lean + t.wTop * 0.5;

    // contour
    brush.set("pen", "#111111", 0.95);
    brush.beginShape(0.28);
    brush.vertex(x1, t.yBase);
    brush.vertex(x1 + random(-4, 4), 470);
    brush.vertex((x1 + xt1) * 0.5 + random(-3, 3), 320);
    brush.vertex(xt1, t.yTop);
    brush.vertex(xt2, t.yTop);
    brush.vertex((x2 + xt2) * 0.5 + random(-3, 3), 320);
    brush.vertex(x2 + random(-4, 4), 470);
    brush.vertex(x2, t.yBase);
    brush.endShape(true);

    // light side hatch
    brush.hatchStyle("rotring", "#111111", 0.22);
    brush.hatch(random(7, 11), random(78, 100), { rand: 0.08, continuous: true });
    brush.beginShape(0.25);
    brush.vertex(x1, t.yBase);
    brush.vertex(x1 + random(-2, 2), 470);
    brush.vertex((x1 + xt1) * 0.5, 320);
    brush.vertex(xt1, t.yTop);
    brush.vertex(lerp(xt1, xt2, 0.58), t.yTop);
    brush.vertex(lerp(x1, x2, 0.56), t.yBase);
    brush.endShape(true);
    brush.noHatch();

    // dark core hatch
    brush.hatchStyle("rotring", "#111111", 0.32);
    brush.hatch(random(3, 6), random(102, 124), { rand: 0.07, continuous: true });
    brush.beginShape(0.25);
    brush.vertex(lerp(x1, x2, 0.25), t.yBase);
    brush.vertex(lerp(x1, x2, 0.35), 455);
    brush.vertex(lerp(xt1, xt2, 0.34), t.yTop + random(-4, 4));
    brush.vertex(lerp(xt1, xt2, 0.72), t.yTop + random(-4, 4));
    brush.vertex(lerp(x1, x2, 0.74), 455);
    brush.vertex(lerp(x1, x2, 0.62), t.yBase);
    brush.endShape(true);
    brush.noHatch();

    // bark striations
    for (let k = 0; k < int(random(10, 18)); k++) {
      let px = lerp(x1, x2, random(0.15, 0.85));
      let py1 = random(t.yTop + 10, 560);
      let py2 = py1 + random(16, 70);
      brush.set("rotring", "#111111", random(0.12, 0.26));
      brush.spline([
        [px + random(-2, 2), py1, 0.4],
        [px + random(-5, 5), lerp(py1, py2, 0.5), 0.7],
        [px + random(-3, 3), py2, 0.4]
      ], 0.35);
    }
  }

  // branch network
  for (let t of trunks) {
    let branchCount = int(random(5, 10));
    for (let b = 0; b < branchCount; b++) {
      let side = random() < 0.5 ? -1 : 1;
      let sy = random(t.yTop + 18, min(470, t.yBase - 60));
      let sx = t.x + map(sy, t.yBase, t.yTop, 0, t.lean) + side * random(2, t.wBase * 0.35);
      let len1 = random(24, 65);
      let len2 = random(18, 55);
      let a1 = side < 0 ? random(155, 210) : random(-30, 25);
      let a2 = a1 + random(-20, 20);
      let ex = sx + cos(a1) * len1 + cos(a2) * len2;
      let ey = sy + sin(a1) * len1 + sin(a2) * len2;

      brush.set("pen", "#111111", random(0.22, 0.52));
      brush.spline([
        [sx, sy, 1.0],
        [sx + cos(a1) * len1, sy + sin(a1) * len1, 0.7],
        [ex, ey, 0.35]
      ], 0.42);

      // tiny twig hatches clustered around branches
      for (let tw = 0; tw < int(random(3, 8)); tw++) {
        let tx = lerp(sx, ex, random(0.3, 1));
        let ty = lerp(sy, ey, random(0.3, 1));
        let ta = a2 + random(-60, 60);
        let tl = random(6, 18);
        brush.set("rotring", "#111111", random(0.12, 0.28));
        brush.line(tx, ty, tx + cos(ta) * tl, ty + sin(ta) * tl);
      }
    }
  }

  // canopy / interstitial shadow webs
  for (let i = 0; i < 18; i++) {
    let cx = random(10, 590);
    let cy = random(40, 290);
    let rw = random(60, 180);
    let rh = random(40, 120);

    brush.hatchStyle("rotring", "#111111", random(0.2, 0.38));
    brush.hatch(random(4, 9), random(52, 78), { rand: 0.12, continuous: true });
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 24) {
      let rx = rw * 0.5 * (0.65 + noise(i * 10 + a * 0.04 + 900) * 0.7);
      let ry = rh * 0.5 * (0.65 + noise(i * 10 + a * 0.04 + 1300) * 0.7);
      brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
    }
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("rotring", "#111111", random(0.16, 0.3));
    brush.hatch(random(5, 11), random(118, 146), { rand: 0.13, continuous: true });
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 24) {
      let rx = rw * 0.34 * (0.65 + noise(i * 10 + a * 0.04 + 1600) * 0.7);
      let ry = rh * 0.34 * (0.65 + noise(i * 10 + a * 0.04 + 2000) * 0.7);
      brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
    }
    brush.endShape(true);
    brush.noHatch();
  }

  // long woven diagonals to collapse representation into texture
  for (let i = 0; i < 180; i++) {
    let x = random(-30, 630);
    let y = random(120, 600);
    let len = random(25, 110);
    let a = random(58, 72);
    if (random() < 0.5) a = random(108, 122);
    brush.set("rotring", "#111111", random(0.12, 0.3));
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }

  // emphasized dark pockets
  for (let i = 0; i < 8; i++) {
    let cx = random(60, 540);
    let cy = random(330, 590);
    let r = random(28, 70);

    brush.hatchStyle("pen", "#111111", 0.42);
    brush.hatch(random(2.8, 4.5), random(65, 85), { rand: 0.08, continuous: true });
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 30) {
      let rr = r * (0.72 + noise(i * 100 + a * 0.05) * 0.55);
      brush.vertex(cx + cos(a) * rr, cy + sin(a) * rr);
    }
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("rotring", "#111111", 0.24);
    brush.hatch(random(3.5, 6), random(120, 140), { rand: 0.08, continuous: true });
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 30) {
      let rr = r * 0.72 * (0.72 + noise(i * 100 + a * 0.05 + 300) * 0.55);
      brush.vertex(cx + cos(a) * rr, cy + sin(a) * rr);
    }
    brush.endShape(true);
    brush.noHatch();
  }

  // a few stronger foreground trunks to hold the forest together
  for (let i = 0; i < 4; i++) {
    let x = [78, 214, 402, 548][i] + random(-8, 8);
    let topY = random(95, 170);
    let lean = random(-18, 18);
    let wb = random(28, 44);
    let wt = wb * random(0.45, 0.6);

    let pts = [
      [x - wb * 0.5, 600],
      [x - wb * 0.48 + random(-3, 3), 470],
      [x + lean - wt * 0.55 + random(-2, 2), topY],
      [x + lean + wt * 0.55 + random(-2, 2), topY],
      [x + wb * 0.48 + random(-3, 3), 470],
      [x + wb * 0.5, 600]
    ];

    brush.set("pen", "#111111", 1.15);
    brush.beginShape(0.2);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    brush.hatchStyle("rotring", "#111111", 0.34);
    brush.hatch(4, 96, { rand: 0.05, continuous: true });
    brush.beginShape(0.2);
    brush.vertex(pts[0][0], pts[0][1]);
    brush.vertex(pts[1][0], pts[1][1]);
    brush.vertex(lerp(pts[2][0], pts[3][0], 0.7), pts[2][1]);
    brush.vertex(lerp(pts[4][0], pts[1][0], 0.55), pts[1][1]);
    brush.vertex(lerp(pts[5][0], pts[0][0], 0.58), pts[0][1]);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("rotring", "#111111", 0.22);
    brush.hatch(8, 76, { rand: 0.06, continuous: true });
    brush.beginShape(0.2);
    brush.vertex(pts[0][0], pts[0][1]);
    brush.vertex(pts[1][0], pts[1][1]);
    brush.vertex(lerp(pts[2][0], pts[3][0], 0.42), pts[2][1]);
    brush.vertex(lerp(pts[4][0], pts[1][0], 0.3), pts[1][1]);
    brush.endShape(true);
    brush.noHatch();
  }

  brush.noHatch();
  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noField();

  noLoop();
}