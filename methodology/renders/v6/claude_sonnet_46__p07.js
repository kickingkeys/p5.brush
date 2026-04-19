function setup() {
  createCanvas(600, 600, WEBGL);
  background("#1a1612");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Wall base — warm dark concrete
  brush.noStroke();
  brush.wash("#2a2318", 220);
  brush.rect(0, 0, 600, 600);
  brush.noWash();

  // Layer 0 — ghosted old marks, faded and buried
  brush.set("charcoal", "#5c4a3a", 0.8);
  brush.wiggle(5);
  for (let i = 0; i < 12; i++) {
    let x = random(30, 570);
    let y = random(30, 570);
    let r = random(40, 120);
    brush.noStroke();
    brush.wash("#3a2e22", 60);
    brush.circle(x, y, r);
    brush.noWash();
  }

  // Layer 1 — large spray circles, base colors
  const baseColors = ["#c23b2a", "#1e4fa3", "#e8b820", "#2a7a3e", "#7a1e6e"];
  brush.noStroke();
  for (let i = 0; i < 18; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let r = random(35, 130);
    let col = random(baseColors);
    brush.wash(col, floor(random(80, 160)));
    brush.circle(x, y, r);
    brush.noWash();
    // Spray halo around each circle
    brush.set("spray", col, random(1.5, 3.0));
    for (let j = 0; j < 60; j++) {
      let angle = random(360);
      let dist = random(r * 0.4, r * 1.3);
      let sx = x + cos(angle) * dist;
      let sy = y + sin(angle) * dist;
      brush.flowLine(sx, sy, random(8, 25), random(360));
    }
  }

  // Layer 2 — overlapping spray blasts, denser clusters
  const sprayColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#3aaa5e", "#aa44cc", "#ffffff", "#ff2244"];
  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 45; i++) {
    let x = random(30, 570);
    let y = random(30, 570);
    brush.set("spray", random(sprayColors), random(0.8, 2.8));
    brush.flowLine(x, y, random(20, 55), random(360));
  }
  brush.noField();

  // Layer 3 — drips (short downward streaks)
  const dripColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#ffffff", "#ff2244", "#cc3311"];
  for (let i = 0; i < 20; i++) {
    let x = random(50, 550);
    let y = random(80, 420);
    let dripLen = random(40, 130);
    brush.set("spray", random(dripColors), random(0.4, 0.9));
    brush.line(x, y, x + random(-5, 5), y + dripLen);
    // Secondary thin drip
    if (random() > 0.5) {
      brush.set("spray", random(dripColors), random(0.2, 0.5));
      brush.line(x + random(-3, 3), y + dripLen * 0.3, x + random(-4, 4), y + dripLen * 1.2);
    }
  }

  // Layer 4 — arrows and tag splines in pen/marker
  const tagColors = ["#ffffff", "#ffe033", "#ff4488", "#44ffee", "#ff2244"];
  brush.field("hand");
  brush.wiggle(2);
  for (let i = 0; i < 10; i++) {
    let x0 = random(60, 460);
    let y0 = random(60, 500);
    let col = random(tagColors);
    brush.set("marker", col, random(1.2, 2.5));
    // Arrow shaft
    let x1 = x0 + random(50, 160);
    let y1 = y0 + random(-40, 40);
    let x2 = x1 + random(30, 80);
    let y2 = y1 + random(-30, 30);
    brush.spline([
      [x0, y0, 0.8],
      [x1, y1, 0.7],
      [x2, y2, 0.5]
    ], 0.45);
    // Arrowhead lines
    let headLen = random(15, 30);
    let headAngle = atan2(y2 - y1, x2 - x1);
    brush.set("marker", col, random(0.8, 1.5));
    brush.line(x2, y2, x2 + cos(headAngle + 150) * headLen, y2 + sin(headAngle + 150) * headLen);
    brush.line(x2, y2, x2 + cos(headAngle - 150) * headLen, y2 + sin(headAngle - 150) * headLen);
  }
  brush.noField();

  // Layer 5 — ghosted hand-drawn marks (charcoal scrawls)
  brush.field("hand");
  brush.wiggle(6);
  brush.set("charcoal", "#888880", 0.6);
  for (let i = 0; i < 8; i++) {
    let x0 = random(40, 520);
    let y0 = random(40, 520);
    let pts = [[x0, y0, 0.5]];
    for (let j = 0; j < floor(random(3, 7)); j++) {
      pts.push([
        pts[pts.length - 1][0] + random(-80, 80),
        pts[pts.length - 1][1] + random(-60, 60),
        random(0.3, 1.1)
      ]);
    }
    brush.spline(pts, 0.5);
  }

  // Faint white charcoal ghost circles
  brush.noField();
  brush.set("charcoal", "#c8c0b0", 0.5);
  for (let i = 0; i < 6; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let r = random(30, 90);
    brush.noFill();
    brush.circle(x, y, r, 0.4);
  }

  // Layer 6 — pen/rotring tag scrawls and letters-like marks
  brush.field("hand");
  brush.wiggle(3);
  const penColors = ["#ffffff", "#ffe033", "#ff88aa", "#aaffee"];
  for (let i = 0; i < 14; i++) {
    let x0 = random(30, 530);
    let y0 = random(30, 560);
    brush.set("pen", random(penColors), random(0.5, 1.2));
    let pts2 = [[x0, y0, 0.6]];
    let steps = floor(random(2, 5));
    for (let j = 0; j < steps; j++) {
      pts2.push([
        pts2[pts2.length - 1][0] + random(-60, 60),
        pts2[pts2.length - 1][1] + random(-40, 40),
        random(0.4, 1.2)
      ]);
    }
    brush.spline(pts2, random(0.2, 0.6));
  }
  brush.noField();

  // Layer 7 — stencil-style filled circles (opaque marker wash)
  const stencilColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#ffffff", "#ff2244", "#44ccaa"];
  brush.noStroke();
  for (let i = 0; i < 7; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let r = random(20, 70);
    let col = random(stencilColors);
    brush.wash(col, floor(random(160, 230)));
    brush.circle(x, y, r);
    brush.noWash();
  }

  // Layer 8 — final spray scatter over everything
  brush.field("curved");
  for (let i = 0; i < 30; i++) {
    brush.set("spray", random(sprayColors), random(0.5, 1.8));
    brush.flowLine(random(0, 600), random(0, 600), random(10, 35), random(360));
  }
  brush.noField();

  // Final — a few bright white drip lines for freshness
  for (let i = 0; i < 8; i++) {
    let x = random(80, 520);
    let y = random(60, 380);
    brush.set("spray", "#ffffff", random(0.3, 0.7));
    brush.line(x, y, x + random(-3, 3), y + random(30, 100));
  }

  noLoop();
}