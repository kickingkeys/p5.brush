function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(23);
  noiseSeed(23);

  // Base paper wash
  brush.noStroke();
  brush.fillTexture(0.75, 0.35);
  brush.fillBleed(0.22, "out");

  // Sky tint
  let skyPts = [
    [0, 0],
    [600, 0],
    [600, 250],
    [0, 235]
  ];
  brush.fill("#eadfce", 42);
  brush.polygon(skyPts);

  // Far desert wash band
  let farBand = [];
  farBand.push([0, 220]);
  for (let x = 0; x <= 600; x += 20) {
    let y = 235 + noise(x * 0.01, 10) * 28;
    farBand.push([x, y]);
  }
  farBand.push([600, 420]);
  farBand.push([0, 420]);
  brush.fill("#d9be93", 62);
  brush.fillBleed(0.3, "out");
  brush.polygon(farBand);

  // Mid desert wash
  let midBand = [];
  midBand.push([0, 300]);
  for (let x = 0; x <= 600; x += 18) {
    let y = 320 + noise(x * 0.012, 40) * 36;
    midBand.push([x, y]);
  }
  midBand.push([600, 520]);
  midBand.push([0, 520]);
  brush.fill("#cda66f", 70);
  brush.fillBleed(0.34, "out");
  brush.polygon(midBand);

  // Foreground wash
  let foreBand = [];
  foreBand.push([0, 390]);
  for (let x = 0; x <= 600; x += 16) {
    let y = 415 + noise(x * 0.015, 80) * 40;
    foreBand.push([x, y]);
  }
  foreBand.push([600, 600]);
  foreBand.push([0, 600]);
  brush.fill("#b98a57", 82);
  brush.fillBleed(0.4, "out");
  brush.polygon(foreBand);

  // Additional layered sand pools
  for (let i = 0; i < 7; i++) {
    let cx = random(70, 530);
    let cy = random(285, 560);
    let rr = random(45, 120);
    let pts = [];
    let count = 24;
    for (let j = 0; j < count; j++) {
      let a = map(j, 0, count, 0, 360);
      let r = rr * (0.7 + noise(i * 20 + cos(a) * 0.7, sin(a) * 0.7) * 0.55);
      pts.push([cx + cos(a) * r, cy + sin(a) * r * 0.55]);
    }
    let cols = ["#d8b27a", "#c89c62", "#e0c08d", "#c08a50"];
    brush.fill(random(cols), random(28, 50));
    brush.fillBleed(random(0.28, 0.45), "out");
    brush.polygon(pts);
  }

  brush.noFill();
  brush.noWash();

  // Thin pen horizon line bisecting the page
  brush.set("pen", "#4d4137", 0.55);
  brush.line(35, 300, 565, 300);

  // Distant low dunes with faint graphite
  brush.set("2H", "#8f7f69", 0.5);
  for (let i = 0; i < 3; i++) {
    let pts = [];
    let yBase = 286 + i * 14;
    for (let x = 30; x <= 570; x += 26) {
      let y = yBase + noise(i * 30 + x * 0.012) * 10;
      pts.push([x, y, random(0.35, 0.65)]);
    }
    brush.spline(pts, 0.45);
  }

  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);

  let rockBases = [
    { x: 90,  y: 318, w: 80,  h: 92 },
    { x: 175, y: 310, w: 110, h: 120 },
    { x: 305, y: 306, w: 95,  h: 135 },
    { x: 420, y: 314, w: 125, h: 112 },
    { x: 530, y: 320, w: 90,  h: 88 }
  ];

  for (let k = 0; k < rockBases.length; k++) {
    let rb = rockBases[k];
    let pts = [];
    let left = rb.x - rb.w / 2;
    let right = rb.x + rb.w / 2;
    let baseY = rb.y + rb.h * 0.55;

    pts.push([left, baseY]);

    let topSteps = int(random(6, 10));
    for (let i = 0; i <= topSteps; i++) {
      let x = map(i, 0, topSteps, left, right);
      let peak = rb.y - rb.h * random(0.15, 0.55);
      let jag = noise(k * 100 + i * 0.7) * rb.h * 0.8;
      let y = peak + jag * 0.35;
      pts.push([x + random(-10, 10), y]);
    }

    pts.push([right, baseY]);
    pts.push([rb.x + rb.w * 0.2, baseY + random(18, 35)]);
    pts.push([rb.x - rb.w * 0.18, baseY + random(15, 28)]);

    // Rock mass fill
    brush.mass("crayon", "#3b342f", {
      strength: 0.8,
      precision: 0.35,
      gradient: 0.45,
      outline: false
    });
    brush.polygon(pts);
    brush.noMass();

    // Charcoal hatching in shadow side
    let shadowPts = [];
    for (let p of pts) {
      shadowPts.push([lerp(rb.x, p[0], 0.72), lerp(baseY, p[1], 0.95)]);
    }
    brush.hatchStyle("charcoal", "#2b2724", 1.2);
    brush.hatch(5, 105, { rand: 0.18, continuous: false, gradient: 0.35 });
    brush.polygon(shadowPts);
    brush.noHatch();

    // Outer charcoal contour
    brush.set("charcoal", "#26211d", 1.15);
    brush.polygon(pts);

    // Interior jagged cracks on rock
    brush.set("2B", "#1f1b18", 0.7);
    let crackCount = int(random(3, 6));
    for (let c = 0; c < crackCount; c++) {
      let sx = random(rb.x - rb.w * 0.25, rb.x + rb.w * 0.2);
      let sy = random(rb.y - rb.h * 0.15, rb.y + rb.h * 0.18);
      brush.beginStroke("segments", sx, sy);
      let segs = int(random(3, 5));
      for (let m = 0; m < segs; m++) {
        brush.move(random(70, 120), random(8, 18), random(0.35, 0.7));
      }
      brush.endStroke(random(85, 115), 0.3);
    }
  }

  brush.noField();

  // Cracked desert floor
  brush.set("HB", "#6f5c49", 0.42);

  for (let i = 0; i < 90; i++) {
    let sx = random(20, 580);
    let sy = random(365, 595);
    let len = random(18, 70);
    let angle = random(-20, 20);
    brush.beginStroke("segments", sx, sy);
    let segs = int(random(2, 5));
    for (let j = 0; j < segs; j++) {
      brush.move(angle + random(-35, 35), len / segs * random(0.75, 1.15), random(0.25, 0.55));
      angle += random(-28, 28);
    }
    brush.endStroke(angle + random(-20, 20), 0.2);
  }

  // Secondary finer crack network
  brush.set("2H", "#9e896f", 0.32);
  for (let i = 0; i < 140; i++) {
    let x1 = random(10, 590);
    let y1 = random(395, 598);
    let x2 = x1 + random(-28, 28);
    let y2 = y1 + random(8, 30);
    brush.line(x1, y1, x2, y2);
  }

  // Subtle sand ridges
  brush.set("cpencil", "#b68c58", 0.42);
  for (let y = 340; y < 590; y += 18) {
    let pts = [];
    for (let x = 10; x <= 590; x += 24) {
      pts.push([x, y + noise(y * 0.02, x * 0.01) * 7, random(0.25, 0.55)]);
    }
    brush.spline(pts, 0.25);
  }

  // Dark accents at rock bases
  brush.set("charcoal", "#1f1a17", 0.9);
  for (let rb of rockBases) {
    let pts = [];
    let steps = 12;
    for (let i = 0; i <= steps; i++) {
      let x = map(i, 0, steps, rb.x - rb.w * 0.55, rb.x + rb.w * 0.55);
      let y = rb.y + rb.h * 0.52 + noise(rb.x * 0.02, i * 0.2) * 10;
      pts.push([x, y, random(0.3, 0.7)]);
    }
    brush.spline(pts, 0.4);
  }

  noLoop();
}