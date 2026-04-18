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

  let paper = "#fffaf3";
  let ink = "#111111";
  let softInk = "#2a2a2a";

  let trunks = [];
  let trunkPolys = [];
  let lightGaps = [];

  function makeOrganicRect(x, y, w, h, wavex, wavey, lean) {
    let pts = [];
    let stepsY = 10;
    let stepsX = 8;

    for (let i = 0; i <= stepsY; i++) {
      let t = i / stepsY;
      let yy = y + h * t;
      let xx = x + sin(t * 180 + random(-20, 20)) * wavex + lean * t;
      pts.push([xx, yy + random(-wavey, wavey)]);
    }
    for (let i = stepsY; i >= 0; i--) {
      let t = i / stepsY;
      let yy = y + h * t;
      let xx = x + w + sin(t * 180 + 60 + random(-20, 20)) * wavex + lean * t;
      pts.push([xx, yy + random(-wavey, wavey)]);
    }
    return pts;
  }

  function drawPolygonShape(points, curvature, closeShape) {
    brush.beginShape(curvature);
    for (let p of points) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(closeShape);
  }

  function insetPolygon(points, cx, cy, s) {
    let out = [];
    for (let p of points) {
      out.push([lerp(cx, p[0], s), lerp(cy, p[1], s)]);
    }
    return out;
  }

  function blob(cx, cy, rx, ry, n, jitter) {
    let pts = [];
    for (let i = 0; i < n; i++) {
      let a = map(i, 0, n, 0, 360);
      let rr1 = rx * (0.82 + noise(i * 0.15, cx * 0.01) * jitter);
      let rr2 = ry * (0.82 + noise(i * 0.15, cy * 0.01, 10) * jitter);
      pts.push([
        cx + cos(a) * rr1,
        cy + sin(a) * rr2
      ]);
    }
    return pts;
  }

  function hatchZone(points, dist, ang, wt) {
    brush.hatchStyle("rotring", ink, wt);
    brush.hatch(dist, ang, { rand: 0.06, continuous: true });
    drawPolygonShape(points, 0.28, true);
    brush.noHatch();
  }

  function penOutline(points, wt) {
    brush.set("pen", ink, wt);
    drawPolygonShape(points, 0.28, true);
  }

  function lineCluster(x, y, w, h, count, angMin, angMax, lenMin, lenMax, wt) {
    brush.set("rotring", ink, wt);
    for (let i = 0; i < count; i++) {
      let x1 = x + random(w);
      let y1 = y + random(h);
      let a = random(angMin, angMax);
      let len = random(lenMin, lenMax);
      let x2 = x1 + cos(a) * len;
      let y2 = y1 + sin(a) * len;
      brush.line(x1, y1, x2, y2);
    }
  }

  function grassField(yBase, density, ySpread, wt, lenMin, lenMax) {
    brush.set("rotring", softInk, wt);
    for (let i = 0; i < density; i++) {
      let x = random(-20, width + 20);
      let y = random(yBase - ySpread, yBase + ySpread);
      let lean = random(-75, -105);
      let len = random(lenMin, lenMax);
      let x2 = x + cos(lean) * len;
      let y2 = y + sin(lean) * len;
      brush.line(x, y, x2, y2);
    }
  }

  function trunkTexture(tr) {
    brush.set("rotring", ink, 0.32);
    for (let i = 0; i < tr.textureLines; i++) {
      let yy = random(tr.y, tr.y + tr.h);
      let left = tr.x + map(yy, tr.y, tr.y + tr.h, 0, tr.lean) + random(-2, 2);
      let right = left + tr.w + random(-2, 2);
      let xx = random(left + 1, right - 1);
      let len = random(8, 28);
      let ang = random(82, 98);
      brush.line(xx, yy, xx + cos(ang) * len * 0.16, yy + sin(ang) * len);
    }

    brush.set("pen", ink, 0.42);
    for (let i = 0; i < tr.seams; i++) {
      let sx = tr.x + tr.w * random(0.2, 0.8) + random(-3, 3);
      let sy1 = tr.y + random(0, tr.h * 0.15);
      let sy2 = tr.y + tr.h - random(0, tr.h * 0.12);
      brush.line(sx, sy1, sx + tr.lean * 0.4 + random(-4, 4), sy2);
    }
  }

  for (let i = 0; i < 7; i++) {
    let x = map(i, 0, 6, 40, 520) + random(-20, 20);
    let y = random(100, 180);
    let w = random(18, 42);
    let h = random(360, 470);
    let lean = random(-18, 22);
    let pts = makeOrganicRect(x, y, w, h, random(2, 6), random(2, 5), lean);
    let cx = x + w * 0.5 + lean * 0.5;
    let cy = y + h * 0.5;
    trunks.push({
      x, y, w, h, lean,
      poly: pts,
      cx, cy,
      textureLines: floor(random(16, 30)),
      seams: floor(random(2, 5))
    });
  }

  for (let tr of trunks) {
    trunkPolys.push(tr.poly);
  }

  for (let i = 0; i < 9; i++) {
    lightGaps.push(blob(
      random(40, 560),
      random(70, 280),
      random(18, 48),
      random(20, 60),
      floor(random(12, 18)),
      0.35
    ));
  }

  lineCluster(0, 40, width, 260, 1800, 78, 102, 10, 30, 0.28);
  lineCluster(0, 0, width, 600, 750, 20, 40, 16, 54, 0.22);
  lineCluster(0, 0, width, 600, 750, 140, 160, 16, 54, 0.22);

  brush.noStroke();
  brush.wash(paper, 255);
  for (let g of lightGaps) {
    drawPolygonShape(g, 0.38, true);
  }
  brush.noWash();

  brush.noFill();

  brush.hatchStyle("rotring", ink, 0.3);
  brush.hatch(11, 88, { rand: 0.05, continuous: true });
  brush.rect(0, 0, 600, 600, "corner");
  brush.noHatch();

  brush.hatchStyle("rotring", ink, 0.28);
  brush.hatch(16, 30, { rand: 0.04, continuous: true });
  brush.rect(0, 0, 600, 600, "corner");
  brush.noHatch();

  brush.hatchStyle("rotring", ink, 0.28);
  brush.hatch(16, 150, { rand: 0.04, continuous: true });
  brush.rect(0, 0, 600, 600, "corner");
  brush.noHatch();

  let bottomShadow = [
    [0, 390], [80, 360], [140, 380], [220, 350], [300, 390],
    [380, 360], [460, 385], [540, 355], [600, 390], [600, 600], [0, 600]
  ];
  hatchZone(bottomShadow, 4.5, 102, 0.42);
  hatchZone(bottomShadow, 7.5, 25, 0.28);

  let midUndergrowth = [
    [0, 295], [70, 270], [130, 290], [210, 250], [300, 285],
    [375, 255], [450, 300], [520, 270], [600, 300], [600, 430], [0, 430]
  ];
  hatchZone(midUndergrowth, 6, 84, 0.35);
  hatchZone(midUndergrowth, 10, 145, 0.25);

  grassField(560, 950, 36, 0.35, 16, 52);
  grassField(520, 500, 42, 0.28, 14, 38);
  grassField(430, 320, 30, 0.25, 12, 28);

  for (let tr of trunks) {
    brush.noStroke();
    brush.wash(paper, 255);
    drawPolygonShape(tr.poly, 0.25, true);
    brush.noWash();

    hatchZone(tr.poly, 4.2, 91, 0.42);

    let inner1 = insetPolygon(tr.poly, tr.cx, tr.cy, 0.74);
    hatchZone(inner1, 7.5, 24, 0.26);

    let inner2 = insetPolygon(tr.poly, tr.cx + random(-3, 3), tr.cy, 0.48);
    hatchZone(inner2, 10, 154, 0.22);

    penOutline(tr.poly, 0.7);
    trunkTexture(tr);
  }

  for (let i = 0; i < 22; i++) {
    let x = random(0, 600);
    let y = random(180, 580);
    let w = random(18, 60);
    let h = random(26, 90);
    let shape = blob(x, y, w, h, floor(random(10, 16)), 0.28);
    hatchZone(shape, random(5, 9), random(70, 115), 0.25);
  }

  for (let i = 0; i < 14; i++) {
    let x = random(10, 590);
    let y = random(230, 560);
    brush.set("pen", ink, random(0.5, 0.9));
    let pts = [
      [x, y],
      [x + random(-10, -4), y + random(18, 40)],
      [x + random(5, 16), y + random(44, 72)],
      [x + random(-8, 8), y + random(72, 110)]
    ];
    brush.spline(pts, 0.45);
  }

  brush.set("pen", ink, 0.9);
  for (let i = 0; i < 11; i++) {
    let x = random(20, 580);
    let y = random(0, 170);
    let len = random(90, 180);
    brush.line(x, y, x + random(-8, 8), y + len);
  }

  brush.set("rotring", ink, 0.24);
  for (let i = 0; i < 1800; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    if (random() < map(y, 0, 600, 0.15, 0.7)) {
      let a = random([28, 32, 36, 144, 148, 152, 84, 88, 92]);
      let len = random(3, 9);
      brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
    }
  }

  noLoop();
}