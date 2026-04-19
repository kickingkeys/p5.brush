function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5ede0");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Wall base: faint wash of aged concrete ---
  brush.noStroke();
  brush.noHatch();

  // Layer 1: large overlapping spray circles — chaos recipe
  const sprayColors = [
    "#c0392b", "#2980b9", "#f39c12", "#27ae60",
    "#8e44ad", "#e67e22", "#1abc9c", "#2c3e50",
    "#e74c3c", "#3498db", "#d35400"
  ];

  // Big background blobs
  brush.noStroke();
  for (let i = 0; i < 55; i++) {
    const x = random(20, 580);
    const y = random(20, 580);
    const r = random(30, 110);
    const col = random(sprayColors);
    brush.set("spray", col, random(1.8, 3.5));
    for (let j = 0; j < int(random(60, 160)); j++) {
      const angle = random(360);
      const dist = random(0, r);
      const px = x + cos(angle) * dist;
      const py = y + sin(angle) * dist;
      brush.flowLine(px, py, random(8, 30), random(360));
    }
  }

  // Medium circles layered on top
  for (let i = 0; i < 30; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const r = random(15, 60);
    const col = random(sprayColors);
    brush.set("spray", col, random(0.8, 2.2));
    for (let j = 0; j < int(random(30, 80)); j++) {
      const angle = random(360);
      const dist = random(0, r);
      const px = x + cos(angle) * dist;
      const py = y + sin(angle) * dist;
      brush.flowLine(px, py, random(5, 18), random(360));
    }
  }

  // Drips — short downward streaks
  for (let i = 0; i < 28; i++) {
    const x = random(30, 570);
    const y = random(60, 420);
    const col = random(sprayColors);
    const dripLen = random(30, 130);
    brush.set("spray", col, random(0.3, 0.9));
    brush.line(x, y, x + random(-5, 5), y + dripLen);
    // Secondary thin drip
    if (random() > 0.5) {
      brush.set("spray", col, random(0.2, 0.5));
      brush.line(x + random(-8, 8), y + random(10, 40),
                 x + random(-10, 10), y + dripLen + random(20, 60));
    }
  }

  // Arrows — spline gestures with marker
  const arrowColors = ["#c0392b", "#2c3e50", "#f39c12", "#1a1a1a", "#2980b9", "#27ae60"];
  for (let i = 0; i < 14; i++) {
    const x0 = random(60, 480);
    const y0 = random(60, 520);
    const dx = random(50, 140) * (random() > 0.5 ? 1 : -1);
    const dy = random(-40, 40);
    const col = random(arrowColors);
    brush.set("marker", col, random(1.0, 2.2));
    brush.spline([
      [x0, y0, random(0.5, 1.0)],
      [x0 + dx * 0.4, y0 + dy * 0.5 + random(-15, 15), random(0.6, 1.0)],
      [x0 + dx * 0.75, y0 + dy * 0.8 + random(-10, 10), random(0.5, 0.9)],
      [x0 + dx, y0 + dy, random(0.3, 0.6)]
    ], 0.45);
    // Arrowhead: two short lines
    const endX = x0 + dx;
    const endY = y0 + dy;
    const headAngle = atan2(dy, dx);
    brush.set("marker", col, random(0.8, 1.5));
    brush.line(endX, endY,
               endX - 14 * cos(headAngle - 25), endY - 14 * sin(headAngle - 25));
    brush.line(endX, endY,
               endX - 14 * cos(headAngle + 25), endY - 14 * sin(headAngle + 25));
  }

  // Tag-style looping splines
  for (let i = 0; i < 10; i++) {
    const x0 = random(50, 460);
    const y0 = random(50, 520);
    const col = random(arrowColors);
    brush.set("marker", col, random(1.4, 2.6));
    const pts = [];
    let cx = x0, cy = y0;
    const steps = int(random(4, 8));
    for (let s = 0; s < steps; s++) {
      pts.push([cx + random(-10, 10), cy + random(-10, 10), random(0.4, 1.1)]);
      cx += random(-30, 60);
      cy += random(-30, 30);
    }
    brush.spline(pts, 0.5);
  }

  // Ghosted hand-drawn marks: charcoal smears
  brush.wiggle(4);
  brush.field("hand");
  for (let i = 0; i < 22; i++) {
    const x = random(30, 570);
    const y = random(30, 570);
    const col = random(["#1a1a1a", "#2c2c2c", "#444", "#333"]);
    brush.set("charcoal", col, random(0.5, 1.4));
    const pts = [];
    let cx2 = x, cy2 = y;
    const steps = int(random(3, 7));
    for (let s = 0; s < steps; s++) {
      pts.push([cx2, cy2, random(0.3, 1.2)]);
      cx2 += random(-40, 80);
      cy2 += random(-30, 30);
    }
    brush.spline(pts, 0.4);
  }

  // Ghosted circular outlines — faint charcoal rings
  for (let i = 0; i < 16; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const r = random(20, 90);
    brush.set("charcoal", random(["#1a1a1a", "#333", "#555"]), random(0.3, 0.9));
    const pts = [];
    const numPts = int(random(18, 32));
    for (let k = 0; k <= numPts; k++) {
      const a = (k / numPts) * 360;
      const jitter = random(-4, 4);
      pts.push([x + cos(a) * (r + jitter), y + sin(a) * (r + jitter)]);
    }
    brush.spline(pts, 0.5);
  }

  brush.noField();

  // Faint pencil scrawl lines — HB
  brush.wiggle(2);
  brush.field("hand");
  for (let i = 0; i < 18; i++) {
    const x = random(30, 570);
    const y = random(30, 570);
    brush.set("HB", "#2a2a2a", random(0.3, 0.7));
    brush.line(x, y, x + random(-120, 120), y + random(-80, 80));
  }
  brush.noField();

  // Rotring hatch fragments — technical pen cross-hatch patches
  brush.noStroke();
  for (let i = 0; i < 8; i++) {
    const x = random(40, 500);
    const y = random(40, 500);
    const w = random(40, 100);
    const h = random(30, 80);
    brush.hatchStyle("rotring", random(["#1a1a1a", "#c0392b", "#2980b9"]), 0.4);
    brush.hatch(random(4, 9), random(360), { rand: 0.06, continuous: true });
    brush.polygon([
      [x, y], [x + w, y], [x + w, y + h], [x, y + h]
    ]);
    brush.noHatch();
  }

  // Pen cross-hatch overlapping patches
  for (let i = 0; i < 6; i++) {
    const x = random(40, 500);
    const y = random(40, 500);
    const w = random(30, 80);
    const h = random(25, 70);
    brush.hatchStyle("pen", random(arrowColors), 0.5);
    brush.hatch(random(5, 11), random(360), { rand: 0.04, continuous: false });
    brush.polygon([
      [x, y], [x + w, y], [x + w, y + h], [x, y + h]
    ]);
    brush.noHatch();
  }

  // Final: small tight spray dots — aerosol overspray
  for (let i = 0; i < 40; i++) {
    const x = random(10, 590);
    const y = random(10, 590);
    brush.set("spray", random(sprayColors), random(0.2, 0.6));
    for (let j = 0; j < int(random(8, 25)); j++) {
      brush.flowLine(
        x + random(-12, 12),
        y + random(-12, 12),
        random(2, 8),
        random(360)
      );
    }
  }

  brush.noStroke();
  brush.noHatch();
  brush.noField();

  noLoop();
}