function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(19);
  noiseSeed(19);

  const W = 600;
  const H = 600;

  // subtle paper frame left mostly untouched
  const margin = 28;

  // helper for vertical trunk polygons
  function trunkPolygon(x, yTop, yBottom, wTop, wBottom, lean, wobble, steps) {
    let left = [];
    let right = [];
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let y = lerp(yTop, yBottom, t);
      let cx = x + lean * t + map(noise(x * 0.01, y * 0.01), 0, 1, -wobble, wobble);
      let w = lerp(wTop, wBottom, t) + map(noise(300 + x * 0.01, y * 0.02), 0, 1, -2, 3);
      left.push([cx - w * 0.5, y]);
      right.push([cx + w * 0.5, y]);
    }
    right.reverse();
    return left.concat(right);
  }

  function organicBlob(cx, cy, rx, ry, n, jitter) {
    let pts = [];
    for (let i = 0; i < n; i++) {
      let a = map(i, 0, n, 0, 360);
      let r1 = rx * (0.8 + noise(cx * 0.01 + cos(a), cy * 0.01 + sin(a)) * 0.45);
      let r2 = ry * (0.8 + noise(100 + cx * 0.01 + cos(a), 100 + cy * 0.01 + sin(a)) * 0.45);
      let x = cx + cos(a) * r1 + random(-jitter, jitter);
      let y = cy + sin(a) * r2 + random(-jitter, jitter);
      pts.push([x, y]);
    }
    return pts;
  }

  function drawPolygonOutline(points, weightMul) {
    brush.noFill();
    brush.noHatch();
    brush.set("pen", "#111111", weightMul);
    brush.beginShape(0.18);
    for (let p of points) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  function hatchZone(points, dist, ang, wt) {
    brush.noFill();
    brush.hatchStyle("rotring", "#111111", wt);
    brush.hatch(dist, ang, { rand: 0.06, continuous: true });
    brush.beginShape(0.22);
    for (let p of points) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  function crossHatchZone(points, configs) {
    brush.noFill();
    for (let c of configs) {
      brush.hatchStyle(c.brush || "rotring", "#111111", c.wt);
      brush.hatch(c.dist, c.ang, { rand: c.rand || 0.05, continuous: true });
      brush.beginShape(0.22);
      for (let p of points) brush.vertex(p[0], p[1]);
      brush.endShape(true);
      brush.noHatch();
    }
  }

  // background veil of distant verticals
  for (let i = 0; i < 55; i++) {
    let x = map(i, 0, 54, margin + 10, W - margin - 10) + random(-8, 8);
    let y1 = random(30, 120);
    let y2 = H - random(90, 170);
    brush.set("rotring", "#1c1c1c", random(0.22, 0.42));
    brush.line(x, y1, x + random(-12, 12), y2);
  }

  // distant canopy / thicket masses
  let backMasses = [];
  for (let i = 0; i < 9; i++) {
    let cx = random(60, 540);
    let cy = random(110, 270);
    let pts = organicBlob(cx, cy, random(55, 95), random(30, 65), 22, 3);
    backMasses.push(pts);
  }

  for (let pts of backMasses) {
    crossHatchZone(pts, [
      { dist: random(6.5, 9), ang: random(70, 95), wt: 0.28, brush: "rotring", rand: 0.06 },
      { dist: random(8, 11), ang: random(115, 145), wt: 0.22, brush: "rotring", rand: 0.07 }
    ]);
  }

  // mid forest trunks
  let trunks = [];
  for (let i = 0; i < 16; i++) {
    let x = map(i, 0, 15, 55, 545) + random(-20, 20);
    let yTop = random(10, 160);
    let yBottom = H - random(95, 160);
    let wTop = random(7, 18);
    let wBottom = wTop + random(8, 24);
    let lean = random(-28, 28);
    let pts = trunkPolygon(x, yTop, yBottom, wTop, wBottom, lean, random(2, 8), 12);
    trunks.push({
      pts: pts,
      centerX: x,
      depth: map(yBottom, H - 160, H - 95, 0, 1)
    });
  }

  trunks.sort((a, b) => a.depth - b.depth);

  for (let t of trunks) {
    let d1 = lerp(5.5, 3.1, t.depth);
    let d2 = lerp(9.5, 5.2, t.depth);
    let w1 = lerp(0.32, 0.58, t.depth);
    let w2 = lerp(0.18, 0.34, t.depth);

    crossHatchZone(t.pts, [
      { dist: d1, ang: random(82, 98), wt: w1, brush: "rotring", rand: 0.04 },
      { dist: d2, ang: random(10, 24), wt: w2, brush: "rotring", rand: 0.05 }
    ]);

    if (random() < 0.55) {
      hatchZone(t.pts, random(11, 15), random(130, 155), random(0.12, 0.2));
    }

    drawPolygonOutline(t.pts, lerp(0.42, 0.85, t.depth));

    // bark accents
    let verts = t.pts.slice(0, floor(t.pts.length / 2));
    for (let k = 1; k < verts.length - 1; k++) {
      if (random() < 0.55) {
        let p = verts[k];
        brush.set("pen", "#151515", random(0.18, 0.32));
        brush.line(
          p[0] + random(1, 4),
          p[1] + random(-4, 3),
          p[0] + random(2, 8),
          p[1] + random(18, 35)
        );
      }
    }
  }

  // foreground dark trunk band to intensify woven structure
  let heroTrunks = [];
  for (let i = 0; i < 6; i++) {
    let x = map(i, 0, 5, 90, 520) + random(-18, 18);
    let yTop = random(0, 80);
    let yBottom = H - random(40, 85);
    let wTop = random(14, 24);
    let wBottom = wTop + random(18, 34);
    let pts = trunkPolygon(x, yTop, yBottom, wTop, wBottom, random(-18, 18), random(3, 8), 14);
    heroTrunks.push(pts);
  }

  for (let pts of heroTrunks) {
    crossHatchZone(pts, [
      { dist: 2.4, ang: random(86, 94), wt: 0.72, brush: "rotring", rand: 0.03 },
      { dist: 4.5, ang: random(14, 22), wt: 0.34, brush: "rotring", rand: 0.04 },
      { dist: 5.7, ang: random(132, 150), wt: 0.2, brush: "pen", rand: 0.05 }
    ]);
    drawPolygonOutline(pts, 1.05);
  }

  // undergrowth: many overlapping hatch zones
  let groundZones = [];
  for (let i = 0; i < 28; i++) {
    let cx = random(35, 565);
    let cy = random(390, 585);
    let rx = random(22, 70);
    let ry = random(10, 34);
    let pts = organicBlob(cx, cy, rx, ry, 18, 2.5);
    groundZones.push({ pts, cy });
  }
  groundZones.sort((a, b) => a.cy - b.cy);

  for (let gz of groundZones) {
    let darkness = map(gz.cy, 390, 585, 0, 1);
    let configs = [
      { dist: lerp(6, 2.5, darkness), ang: random(22, 42), wt: lerp(0.22, 0.55, darkness), brush: "rotring", rand: 0.07 },
      { dist: lerp(7.5, 3.2, darkness), ang: random(138, 162), wt: lerp(0.15, 0.34, darkness), brush: "rotring", rand: 0.08 }
    ];
    if (darkness > 0.42) {
      configs.push({ dist: lerp(9, 4.5, darkness), ang: random(82, 98), wt: lerp(0.12, 0.26, darkness), brush: "pen", rand: 0.06 });
    }
    crossHatchZone(gz.pts, configs);
  }

  // woven shadow corridors between trunks
  for (let i = 0; i < 12; i++) {
    let x1 = random(40, 560);
    let x2 = x1 + random(-80, 80);
    let yTop = random(250, 380);
    let yBot = random(470, 595);

    let pts = [
      [x1 - random(18, 36), yTop],
      [x1 + random(12, 26), yTop + random(6, 18)],
      [x2 + random(40, 80), yBot - random(12, 32)],
      [x2 - random(35, 60), yBot]
    ];

    crossHatchZone(pts, [
      { dist: random(2.8, 4.8), ang: random(118, 145), wt: random(0.3, 0.48), brush: "rotring", rand: 0.05 },
      { dist: random(4.5, 7), ang: random(62, 88), wt: random(0.14, 0.24), brush: "pen", rand: 0.05 }
    ]);
  }

  // scattered twig and grass lines to tighten the pattern
  for (let i = 0; i < 260; i++) {
    let x = random(margin, W - margin);
    let y = random(320, H - margin);
    let len = random(8, 34);
    let ang = random(55, 125);
    let x2 = x + cos(ang) * len;
    let y2 = y - sin(ang) * len * random(0.4, 1.1);
    brush.set(random() < 0.82 ? "rotring" : "pen", "#111111", random(0.12, 0.28));
    brush.line(x, y, x2, y2);
  }

  // denser low shrub texture
  for (let band = 0; band < 5; band++) {
    let y = lerp(410, 590, band / 4);
    for (let i = 0; i < 70; i++) {
      let x = random(margin, W - margin);
      let dx = random(-18, 18);
      let dy = random(4, 18);
      brush.set("rotring", "#111111", map(band, 0, 4, 0.15, 0.3));
      brush.line(x, y + random(-16, 16), x + dx, y + dy + random(-5, 5));
    }
  }

  // a few pale open shafts to preserve rhythm in the density
  for (let i = 0; i < 3; i++) {
    let x = random(90, 510);
    let w = random(22, 42);
    noStroke();
    fill("#fffaf3");
    beginShape();
    vertex(x - w * 0.45, random(40, 120));
    vertex(x + w * 0.25, random(55, 140));
    vertex(x + w * 0.5, random(360, 520));
    vertex(x - w * 0.35, random(430, 590));
    endShape(CLOSE);
  }

  // redraw some linear structure over the paper shafts
  for (let i = 0; i < 90; i++) {
    let x = random(margin, W - margin);
    brush.set("rotring", "#111111", random(0.12, 0.24));
    brush.line(x, random(60, 240), x + random(-10, 10), random(360, 590));
  }

  // top canopy fringe
  for (let i = 0; i < 24; i++) {
    let pts = organicBlob(random(20, 580), random(10, 70), random(25, 65), random(18, 40), 16, 2);
    crossHatchZone(pts, [
      { dist: random(4.5, 7.5), ang: random(78, 103), wt: 0.22, brush: "rotring", rand: 0.06 },
      { dist: random(7, 10), ang: random(125, 150), wt: 0.12, brush: "pen", rand: 0.08 }
    ]);
  }

  // state cleanup
  brush.noHatch();
  brush.noFill();
  brush.noStroke();
  brush.noField();
  brush.noWash();
  brush.noMass();

  noLoop();
}