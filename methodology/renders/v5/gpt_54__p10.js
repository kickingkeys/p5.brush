function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  // Sky / paper left mostly open with a single horizon line later.

  // Layered watercolor-like desert washes
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.fillTexture(0.7, 0.35);

  let washColors = ["#d9b98a", "#cfa875", "#c4965f", "#b9854f"];
  let centers = [
    { x: 160, y: 440, w: 430, h: 170, c: washColors[0] },
    { x: 360, y: 470, w: 360, h: 150, c: washColors[1] },
    { x: 250, y: 535, w: 500, h: 110, c: washColors[2] }
  ];

  for (let layer of centers) {
    for (let k = 0; k < 3; k++) {
      let cx = layer.x + random(-20, 20);
      let cy = layer.y + random(-12, 12);
      let rx = layer.w * random(0.42, 0.54);
      let ry = layer.h * random(0.42, 0.56);

      brush.fill(layer.c, random(45, 78));
      brush.fillBleed(random(0.28, 0.45), "out");

      brush.beginShape(0.5);
      for (let a = 0; a < 360; a += 12) {
        let n = noise(cx * 0.003 + cos(a) * 0.8, cy * 0.003 + sin(a) * 0.8, k * 0.2);
        let r1 = rx * (0.82 + 0.35 * n);
        let r2 = ry * (0.82 + 0.35 * n);
        let x = cx + cos(a) * r1;
        let y = cy + sin(a) * r2 + sin(a * 2) * random(1, 6);
        brush.vertex(x, y);
      }
      brush.endShape(true);
    }
  }

  // Mid-ground sand shelves
  for (let i = 0; i < 4; i++) {
    let yBase = 395 + i * 38;
    let col = lerpColor(color("#d8b27d"), color("#b8824d"), i / 4);
    brush.fill(col, 52);
    brush.fillBleed(0.22, "out");

    brush.beginShape(0.45);
    brush.vertex(0, yBase + random(-8, 8));
    for (let x = 0; x <= 600; x += 30) {
      let y = yBase + noise(x * 0.01, i * 20) * 26 - 13;
      brush.vertex(x, y);
    }
    brush.vertex(600, 600);
    brush.vertex(0, 600);
    brush.endShape(true);
  }

  brush.noFill();

  // Cracked ground network using technical pen / rotring
  brush.set("rotring", "#8f6d49", 0.35);
  for (let i = 0; i < 95; i++) {
    let x = random(20, 580);
    let y = random(455, 592);
    let len = random(14, 42);
    let ang = random(160, 380);
    brush.line(x, y, x + cos(ang) * len, y + sin(ang) * len);

    if (random() < 0.45) {
      let bx = x + cos(ang) * len * random(0.35, 0.75);
      let by = y + sin(ang) * len * random(0.35, 0.75);
      let bang = ang + random(-70, 70);
      let blen = len * random(0.25, 0.55);
      brush.line(bx, by, bx + cos(bang) * blen, by + sin(bang) * blen);
    }
  }

  brush.set("pen", "#7a5a3a", 0.28);
  for (let i = 0; i < 70; i++) {
    let pts = [];
    let x = random(10, 590);
    let y = random(470, 595);
    pts.push([x, y, 0.7]);
    let segs = int(random(2, 5));
    for (let j = 0; j < segs; j++) {
      x += random(-26, 26);
      y += random(6, 18);
      pts.push([constrain(x, 0, 600), constrain(y, 440, 598), random(0.35, 0.8)]);
    }
    brush.spline(pts, 0.2);
  }

  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);

  let rocks = [
    { x: 78,  y: 362, w: 138, h: 176 },
    { x: 205, y: 338, w: 108, h: 138 },
    { x: 436, y: 330, w: 122, h: 150 },
    { x: 330, y: 352, w: 86,  h: 112 }
  ];

  for (let i = 0; i < rocks.length; i++) {
    let r = rocks[i];
    let pts = rockPoints(r.x, r.y, r.w, r.h);

    // Charcoal mass
    brush.mass("crayon", "#2a2520", {
      strength: 0.86,
      precision: 0.32,
      gradient: 0.4,
      outline: false
    });
    brush.beginShape(0.22);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noMass();

    // Mid-tone hatch texture
    brush.hatchStyle("charcoal", "#3d352d", 0.9);
    brush.hatch(7, 78, { rand: 0.16, continuous: false, gradient: 0.35 });
    brush.beginShape(0.2);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    // Dark denser hatch toward one side
    let cx = r.x + r.w * 0.48;
    let cy = r.y + r.h * 0.58;
    brush.hatchStyle("charcoal", "#171411", 1.3);
    brush.hatch(4, 108, { rand: 0.22, continuous: false, gradient: 0.2 });
    brush.beginShape(0.2);
    for (let p of pts) {
      let x = lerp(cx, p[0], 0.72);
      let y = lerp(cy, p[1], 0.82);
      brush.vertex(x, y);
    }
    brush.endShape(true);
    brush.noHatch();

    // Outer contour
    brush.set("charcoal", "#1a1714", 1.25);
    brush.beginShape(0.18);
    for (let p of pts) brush.vertex(p[0], p[1], random(0.85, 1.1));
    brush.endShape(true);

    // Interior fracture marks
    brush.set("2B", "#120f0d", 0.55);
    for (let j = 0; j < 6; j++) {
      let px = random(r.x + 15, r.x + r.w - 15);
      let py = random(r.y + 18, r.y + r.h - 18);
      brush.beginStroke("segments", px, py);
      brush.move(random(70, 120), random(12, 26), 0.7);
      brush.move(random(100, 155), random(8, 18), 0.55);
      brush.endStroke(random(110, 170), 0.35);
    }
  }

  brush.noField();

  // Subtle graphite shelf lines and surface bands in the desert
  brush.set("2H", "#9a7c57", 0.45);
  for (let i = 0; i < 10; i++) {
    let y = 410 + i * 16 + random(-4, 4);
    let pts = [];
    for (let x = 0; x <= 600; x += 50) {
      pts.push([x, y + noise(i * 10, x * 0.01) * 12 - 6, random(0.35, 0.7)]);
    }
    brush.spline(pts, 0.22);
  }

  // Single thin pen-drawn horizon line bisecting the page
  brush.set("pen", "#3f352c", 0.35);
  brush.line(28, 300, 572, 300);

  noLoop();
}

function rockPoints(x, y, w, h) {
  let pts = [];
  let nTop = int(random(4, 6));
  let nSide = int(random(2, 4));

  pts.push([x, y + h]);

  for (let i = 0; i < nSide; i++) {
    let yy = y + h - (i + 1) * (h / (nSide + 1)) + random(-8, 8);
    let xx = x + random(-6, 10);
    pts.push([xx, yy]);
  }

  for (let i = 0; i <= nTop; i++) {
    let xx = x + (i / nTop) * w + random(-10, 10);
    let yy = y + random(-8, 18) + abs(i - nTop / 2) * random(2, 8);
    pts.push([xx, yy]);
  }

  for (let i = nSide - 1; i >= 0; i--) {
    let yy = y + h - (i + 1) * (h / (nSide + 1)) + random(-8, 8);
    let xx = x + w + random(-10, 8);
    pts.push([xx, yy]);
  }

  pts.push([x + w, y + h]);
  return pts;
}