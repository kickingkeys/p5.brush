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

  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noField();
  brush.noHatch();

  const margins = { l: 28, r: 572, t: 22, b: 585 };

  // subtle frame-like edge darkness with sparse vertical hatch
  brush.hatchStyle("rotring", "#111111", 0.28);
  brush.hatch(11, 88, { rand: 0.08, continuous: true, gradient: 0.12 });
  brush.beginShape(0.2);
  brush.vertex(margins.l, margins.t);
  brush.vertex(margins.r, margins.t);
  brush.vertex(margins.r, margins.b);
  brush.vertex(margins.l, margins.b);
  brush.endShape(true);
  brush.noHatch();

  // distant forest veil
  for (let band = 0; band < 3; band++) {
    let y0 = 130 + band * 42;
    let y1 = y0 + 70;
    brush.hatchStyle("rotring", "#000000", 0.18 + band * 0.03);
    brush.hatch(8 - band, 96 + band * 3, {
      rand: 0.12,
      continuous: true,
      gradient: 0.18
    });
    brush.beginShape(0.35);
    brush.vertex(18, y0 + random(-8, 8));
    for (let x = 30; x <= 585; x += 18) {
      let yy = y0 + noise(x * 0.01, band * 20) * 30 - 10;
      brush.vertex(x, yy);
    }
    brush.vertex(585, y1);
    brush.vertex(18, y1 + 12);
    brush.endShape(true);
    brush.noHatch();
  }

  // many thin distant trunks
  for (let i = 0; i < 36; i++) {
    let x = map(i, 0, 35, 25, 575) + random(-10, 10);
    let topY = random(70, 180);
    let botY = random(420, 590);
    let lean = random(-10, 10);
    let w = random(4, 10);

    brush.set("pen", "#050505", 0.42);
    brush.beginShape(0.08);
    brush.vertex(x - w * 0.45, botY);
    brush.vertex(x - w * 0.35 + lean * 0.2, topY + 60);
    brush.vertex(x - w * 0.18 + lean, topY);
    brush.vertex(x + w * 0.18 + lean, topY + 2);
    brush.vertex(x + w * 0.38 + lean * 0.2, topY + 65);
    brush.vertex(x + w * 0.46, botY);
    brush.endShape(true);

    brush.hatchStyle("rotring", "#000000", 0.22);
    brush.hatch(random(5.5, 8.5), 92 + random(-5, 5), {
      rand: 0.07,
      continuous: true,
      gradient: 0.15
    });
    brush.beginShape(0.08);
    brush.vertex(x - w * 0.45, botY);
    brush.vertex(x - w * 0.35 + lean * 0.2, topY + 60);
    brush.vertex(x - w * 0.18 + lean, topY);
    brush.vertex(x + w * 0.18 + lean, topY + 2);
    brush.vertex(x + w * 0.38 + lean * 0.2, topY + 65);
    brush.vertex(x + w * 0.46, botY);
    brush.endShape(true);
    brush.noHatch();
  }

  // midground trunk group
  let trunks = [];
  for (let i = 0; i < 13; i++) {
    let x = map(i, 0, 12, 55, 545) + random(-18, 18);
    let baseY = random(520, 598);
    let topY = random(25, 170);
    let lean = random(-22, 22);
    let widthBase = random(18, 42);
    let widthTop = widthBase * random(0.28, 0.5);
    trunks.push({ x, baseY, topY, lean, widthBase, widthTop });
  }

  trunks.sort((a, b) => a.widthBase - b.widthBase);

  for (let t of trunks) {
    let x = t.x;
    let by = t.baseY;
    let ty = t.topY;
    let lean = t.lean;
    let wb = t.widthBase;
    let wt = t.widthTop;

    let leftPts = [];
    let rightPts = [];
    for (let j = 0; j <= 12; j++) {
      let u = j / 12;
      let y = lerp(by, ty, u);
      let cx = lerp(x, x + lean, 1 - u);
      let wob = map(noise(x * 0.02, j * 0.3), 0, 1, -6, 6) * (1 - u * 0.5);
      let halfW = lerp(wb * 0.5, wt * 0.5, u) + map(noise(200 + x * 0.01, j * 0.4), 0, 1, -2.5, 2.5);
      leftPts.push([cx - halfW + wob, y]);
      rightPts.push([cx + halfW + wob, y]);
    }

    // outline
    brush.set("pen", "#000000", 0.55);
    brush.beginShape(0.14);
    for (let p of leftPts) brush.vertex(p[0], p[1]);
    for (let k = rightPts.length - 1; k >= 0; k--) brush.vertex(rightPts[k][0], rightPts[k][1]);
    brush.endShape(true);

    // first hatch direction
    brush.hatchStyle("rotring", "#050505", 0.25);
    brush.hatch(random(4.2, 7.0), 96 + random(-4, 4), {
      rand: 0.05,
      continuous: true,
      gradient: 0.08
    });
    brush.beginShape(0.14);
    for (let p of leftPts) brush.vertex(p[0], p[1]);
    for (let k = rightPts.length - 1; k >= 0; k--) brush.vertex(rightPts[k][0], rightPts[k][1]);
    brush.endShape(true);
    brush.noHatch();

    // second hatch direction for bark density
    brush.hatchStyle("rotring", "#000000", 0.18);
    brush.hatch(random(7, 10), 18 + random(-8, 8), {
      rand: 0.09,
      continuous: true,
      gradient: 0.12
    });
    brush.beginShape(0.14);
    for (let p of leftPts) brush.vertex(p[0], p[1]);
    for (let k = rightPts.length - 1; k >= 0; k--) brush.vertex(rightPts[k][0], rightPts[k][1]);
    brush.endShape(true);
    brush.noHatch();

    // inner shadow wedge on one side
    let darkSide = random() < 0.5 ? -1 : 1;
    brush.hatchStyle("rotring", "#000000", 0.34);
    brush.hatch(random(2.2, 3.6), darkSide < 0 ? 78 : 108, {
      rand: 0.04,
      continuous: true,
      gradient: 0.15
    });
    brush.beginShape(0.12);
    if (darkSide < 0) {
      for (let j = 0; j < leftPts.length; j++) {
        let lp = leftPts[j];
        let rp = rightPts[j];
        let ix = lerp(lp[0], rp[0], random(0.22, 0.36));
        brush.vertex(lp[0], lp[1]);
        if (j === leftPts.length - 1) {
          for (let m = rightPts.length - 1; m >= 0; m--) {
            let l2 = leftPts[m];
            let r2 = rightPts[m];
            let ix2 = lerp(l2[0], r2[0], 0.3);
            brush.vertex(ix2, l2[1]);
          }
        }
      }
    } else {
      for (let j = 0; j < rightPts.length; j++) {
        let rp = rightPts[j];
        let lp = leftPts[j];
        let ix = lerp(rp[0], lp[0], random(0.22, 0.36));
        brush.vertex(rp[0], rp[1]);
        if (j === rightPts.length - 1) {
          for (let m = leftPts.length - 1; m >= 0; m--) {
            let r2 = rightPts[m];
            let l2 = leftPts[m];
            let ix2 = lerp(r2[0], l2[0], 0.3);
            brush.vertex(ix2, r2[1]);
          }
        }
      }
    }
    brush.endShape(true);
    brush.noHatch();

    // bark striations
    let barkLines = int(map(wb, 18, 42, 4, 9));
    for (let j = 0; j < barkLines; j++) {
      let u = map(j, 0, barkLines - 1, 0.15, 0.85);
      let pts = [];
      for (let s = 0; s <= 7; s++) {
        let v = s / 7;
        let idx = floor(v * (leftPts.length - 1));
        let lp = leftPts[idx];
        let rp = rightPts[idx];
        let xx = lerp(lp[0], rp[0], u) + map(noise(j * 10, s * 0.3, x * 0.01), 0, 1, -2.2, 2.2);
        let yy = lerp(by, ty, v) + random(-1.5, 1.5);
        pts.push([xx, yy, random(0.4, 0.8)]);
      }
      brush.set("rotring", "#080808", 0.16);
      brush.spline(pts, 0.18);
    }
  }

  // canopies and dark masses as hatched zones
  for (let g = 0; g < 11; g++) {
    let cx = random(40, 560);
    let cy = random(130, 430);
    let rw = random(55, 120);
    let rh = random(30, 80);
    let pts = [];
    let count = int(random(10, 18));
    for (let i = 0; i < count; i++) {
      let a = map(i, 0, count, 0, 360);
      let rx = rw * (0.65 + noise(g * 2, i * 0.3) * 0.6);
      let ry = rh * (0.6 + noise(100 + g * 2, i * 0.3) * 0.7);
      pts.push([cx + cos(a) * rx, cy + sin(a) * ry]);
    }

    brush.hatchStyle("rotring", "#000000", 0.22);
    brush.hatch(random(4.5, 7), random([32, 58, 120, 146]), {
      rand: 0.11,
      continuous: true,
      gradient: 0.2
    });
    brush.beginShape(0.42);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    if (random() < 0.75) {
      brush.hatchStyle("rotring", "#000000", 0.16);
      brush.hatch(random(7, 11), random([85, 95, 105]), {
        rand: 0.08,
        continuous: true,
        gradient: 0.14
      });
      brush.beginShape(0.42);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(true);
      brush.noHatch();
    }
  }

  // undergrowth bands
  for (let band = 0; band < 7; band++) {
    let yBase = map(band, 0, 6, 355, 585);
    let depth = map(band, 0, 6, 0.3, 1);
    let topPts = [];
    topPts.push([18, yBase + random(-18, 8)]);
    for (let x = 20; x <= 585; x += 14) {
      let y = yBase
        - noise(band * 7, x * 0.018) * map(depth, 0.3, 1, 30, 65)
        + random(-7, 7);
      topPts.push([x, y]);
    }
    topPts.push([585, 600]);
    topPts.push([18, 600]);

    brush.hatchStyle("rotring", "#000000", 0.2 + depth * 0.15);
    brush.hatch(max(1.7, 8 - band), 62 + band * 9, {
      rand: 0.12,
      continuous: true,
      gradient: 0.24
    });
    brush.beginShape(0.24);
    for (let p of topPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    if (band > 1) {
      brush.hatchStyle("rotring", "#000000", 0.18 + depth * 0.1);
      brush.hatch(max(1.3, 6 - band * 0.6), 118 - band * 4, {
        rand: 0.1,
        continuous: true,
        gradient: 0.16
      });
      brush.beginShape(0.24);
      for (let p of topPts) brush.vertex(p[0], p[1]);
      brush.endShape(true);
      brush.noHatch();
    }
  }

  // foreground grass / twigs / woven marks
  for (let i = 0; i < 520; i++) {
    let x = random(10, 590);
    let y = random(360, 598);
    let len = random(12, 58);
    let ang = random([-1, 1]) * random(55, 84);
    let x2 = x + cos(ang) * len * random(0.2, 0.45);
    let y2 = y - sin(abs(ang)) * len;
    brush.set("rotring", "#000000", random(0.08, 0.24));
    brush.spline([
      [x, y, 0.9],
      [lerp(x, x2, 0.5) + random(-5, 5), lerp(y, y2, 0.5) + random(-5, 5), 0.6],
      [x2, y2, 0.2]
    ], 0.32);
  }

  // extra black pockets to push abstraction
  for (let p = 0; p < 14; p++) {
    let cx = random(30, 570);
    let cy = random(390, 590);
    let pts = [];
    let rBase = random(18, 46);
    let count = int(random(7, 13));
    for (let i = 0; i < count; i++) {
      let a = map(i, 0, count, 0, 360);
      let r = rBase * (0.55 + noise(p * 3, i * 0.5) * 0.8);
      pts.push([cx + cos(a) * r, cy + sin(a) * r * random(0.6, 1.3)]);
    }

    brush.hatchStyle("rotring", "#000000", 0.32);
    brush.hatch(random(1.4, 2.4), random([40, 70, 110, 140]), {
      rand: 0.08,
      continuous: true,
      gradient: 0.18
    });
    brush.beginShape(0.36);
    for (let q of pts) brush.vertex(q[0], q[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  // top branches crossing the scene
  for (let i = 0; i < 36; i++) {
    let x = random(0, 600);
    let y = random(20, 250);
    let dir = random() < 0.5 ? 1 : -1;
    let pts = [];
    let segs = int(random(3, 6));
    let px = x;
    let py = y;
    pts.push([px, py, 1]);
    for (let s = 0; s < segs; s++) {
      px += dir * random(35, 90);
      py += random(-18, 26);
      pts.push([px, py, random(0.45, 0.8)]);
    }
    brush.set("pen", "#000000", random(0.12, 0.35));
    brush.spline(pts, 0.28);
  }

  // dark vertical rhythm lines to bind the forest into a woven surface
  for (let i = 0; i < 120; i++) {
    let x = random(20, 580);
    let y1 = random(40, 240);
    let y2 = random(420, 600);
    brush.set("rotring", "#000000", random(0.05, 0.11));
    brush.line(x + random(-2, 2), y1, x + random(-2, 2), y2);
  }

  noLoop();
}