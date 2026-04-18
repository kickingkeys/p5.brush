function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noSmooth();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(42);
  noiseSeed(42);

  drawWallTexture();
  drawGhostTags();
  drawSprayBursts();
  drawMarkerCircles();
  drawArrowsAndScribbles();
  drawDrips();
  drawDustAndScuffs();

  noLoop();
}

function drawWallTexture() {
  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noFill();
  brush.noWash();

  for (let i = 0; i < 180; i++) {
    let y = random(height);
    let x1 = random(-20, width * 0.3);
    let x2 = random(width * 0.7, width + 20);
    brush.set("2H", color(80, 75, 70, 20), random(0.18, 0.35));
    brush.line(x1, y + random(-6, 6), x2, y + random(-6, 6));
  }

  for (let i = 0; i < 80; i++) {
    brush.set("HB", color(110, 100, 90, 12), random(0.2, 0.5));
    let x = random(width);
    let y1 = random(height);
    let y2 = y1 + random(40, 140);
    brush.line(x + random(-3, 3), y1, x + random(-3, 3), y2);
  }

  for (let i = 0; i < 25; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let w = random(40, 120);
    let h = random(20, 70);
    brush.set("charcoal", color(90, 80, 70, 10), random(0.25, 0.5));
    brush.noFill();
    brush.rect(x, y, w, h, "corner");
  }
}

function drawGhostTags() {
  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noFill();
  brush.noWash();

  let ghostColors = [
    color(90, 80, 75, 26),
    color(130, 110, 95, 18),
    color(120, 130, 150, 18),
    color(140, 90, 100, 18)
  ];

  for (let i = 0; i < 16; i++) {
    push();
    translate(random(40, 560), random(40, 560));
    rotate(random(-30, 30));

    let b = random(["2B", "HB", "cpencil", "charcoal"]);
    brush.set(b, random(ghostColors), random(0.45, 0.95));

    if (random() < 0.5) {
      brush.beginStroke("curve", random(-30, 10), random(-15, 15));
      for (let k = 0; k < int(random(3, 6)); k++) {
        brush.move(random(-60, 60), random(18, 55), random(0.5, 1.3));
      }
      brush.endStroke(random(-90, 90), random(0.4, 1.0));
    } else {
      let pts = [];
      let count = int(random(4, 8));
      for (let k = 0; k < count; k++) {
        pts.push([random(-40, 40), random(-25, 25), random(0.4, 1.2)]);
      }
      brush.spline(pts, 0.55);
    }

    if (random() < 0.75) {
      brush.set(random(["pen", "rotring"]), random(ghostColors), random(0.35, 0.8));
      brush.line(random(-35, -10), random(-10, 10), random(15, 50), random(-8, 8));
    }
    pop();
  }
}

function drawSprayBursts() {
  brush.field("curved");

  let sprayPalette = [
    "#e4572e",
    "#ff7a00",
    "#ef476f",
    "#118ab2",
    "#06d6a0",
    "#ffd166",
    "#7b2cbf",
    "#222222"
  ];

  for (let n = 0; n < 22; n++) {
    let cx = random(40, 560);
    let cy = random(40, 560);
    let baseCol = random(sprayPalette);

    let passes = int(random(2, 5));
    for (let p = 0; p < passes; p++) {
      let count = int(map(p, 0, passes - 1, 65, 25));
      let spread = map(p, 0, passes - 1, 38, 10);
      let len1 = map(p, 0, passes - 1, 22, 7);
      let len2 = map(p, 0, passes - 1, 8, 3);
      let w = map(p, 0, passes - 1, 1.8, 0.45);

      brush.set("spray", color(baseCol), w);
      for (let i = 0; i < count; i++) {
        let a = random(360);
        let r = abs(randomGaussian()) * spread;
        let x = cx + cos(a) * r;
        let y = cy + sin(a) * r;
        brush.flowLine(x, y, random(len2, len1), random(360));
      }
    }
  }

  brush.noField();
}

function drawMarkerCircles() {
  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noFill();
  brush.noWash();

  let circleCols = [
    "#ff5d8f",
    "#ff7b54",
    "#00a6fb",
    "#00c49a",
    "#ffb703",
    "#8338ec",
    "#1d3557",
    "#111111"
  ];

  for (let i = 0; i < 15; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let r = random(18, 90);

    push();
    translate(x, y);
    rotate(random(-35, 35));
    brush.wiggle(random(1, 3));
    brush.set("marker", color(random(circleCols)), random(0.85, 1.7));
    brush.circle(0, 0, r, random(0.15, 0.8));

    if (random() < 0.7) {
      brush.set("marker", color(20, 20, 20, 160), random(0.35, 0.8));
      brush.arc(0, 0, r * random(0.82, 1.08), random(0, 180), random(180, 360));
    }
    pop();
    brush.noField();
  }

  for (let i = 0; i < 10; i++) {
    let x = random(70, 530);
    let y = random(70, 530);
    let r = random(16, 50);
    brush.set("pen", color(40, 35, 32, 65), random(0.3, 0.7));
    brush.circle(x, y, r, random(0.1, 0.5));
  }
}

function drawArrowsAndScribbles() {
  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noFill();
  brush.noWash();

  for (let i = 0; i < 12; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let len = random(40, 140);
    let ang = random(-40, 40);

    push();
    translate(x, y);
    rotate(ang);

    let col = random([
      "#111111",
      "#d62828",
      "#3a86ff",
      "#ff006e",
      "#ff8500"
    ]);

    brush.set(random(["marker", "charcoal", "pen"]), color(col), random(0.8, 1.8));
    brush.line(-len * 0.45, 0, len * 0.35, 0);
    brush.line(len * 0.35, 0, len * 0.18, -len * 0.15);
    brush.line(len * 0.35, 0, len * 0.18, len * 0.15);

    if (random() < 0.7) {
      brush.set(random(["rotring", "HB"]), color(20, 20, 20, 130), random(0.35, 0.75));
      brush.beginStroke("curve", -len * 0.5, random(-18, 18));
      brush.move(random(-15, 15), len * 0.22, random(0.5, 1.0));
      brush.move(random(-15, 15), len * 0.22, random(0.5, 1.1));
      brush.endStroke(random(-20, 20), random(0.5, 0.9));
    }
    pop();
  }

  for (let i = 0; i < 18; i++) {
    push();
    translate(random(40, 560), random(40, 560));
    rotate(random(-180, 180));
    brush.wiggle(random(1, 4));
    brush.set(random(["cpencil", "2B", "charcoal", "pen"]), color(random([
      "#222222", "#5f0f40", "#9a031e", "#0f4c5c", "#3a86ff", "#ff5400"
    ])), random(0.45, 1.2));

    let pts = [];
    let ct = int(random(5, 9));
    for (let k = 0; k < ct; k++) {
      pts.push([random(-35, 35), random(-20, 20), random(0.35, 1.2)]);
    }
    brush.spline(pts, random(0.35, 0.75));
    pop();
    brush.noField();
  }
}

function drawDrips() {
  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noFill();
  brush.noWash();

  let dripCols = [
    "#e63946",
    "#ff7b00",
    "#3a86ff",
    "#111111",
    "#ff006e",
    "#00a896"
  ];

  for (let i = 0; i < 28; i++) {
    let x = random(40, 560);
    let y = random(40, 320);
    let len = random(35, 190);
    let sway = random(-10, 10);

    let b = random(["marker", "charcoal", "HB", "pen"]);
    brush.set(b, color(random(dripCols)), random(0.35, 1.4));

    let pts = [
      [x, y, random(1.2, 1.8)],
      [x + sway * 0.2, y + len * 0.25, random(0.8, 1.3)],
      [x + sway * 0.6, y + len * 0.6, random(0.6, 1.0)],
      [x + sway, y + len, random(0.3, 0.8)]
    ];
    brush.spline(pts, 0.35);

    if (random() < 0.65) {
      brush.set("spray", color(random(dripCols)), random(0.3, 0.7));
      for (let k = 0; k < int(random(8, 22)); k++) {
        let a = random(180, 360);
        let r = random(2, 10);
        brush.line(
          x + sway + cos(a) * r,
          y + len + sin(a) * r,
          x + sway + cos(a) * (r + random(2, 6)),
          y + len + sin(a) * (r + random(2, 6))
        );
      }
    }

    if (random() < 0.35) {
      brush.set("marker", color(random(dripCols)), random(0.8, 1.4));
      brush.circle(x + sway, y + len + random(2, 8), random(2, 8), random(0.1, 0.4));
    }
  }
}

function drawDustAndScuffs() {
  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noFill();
  brush.noWash();

  for (let i = 0; i < 120; i++) {
    let x = random(width);
    let y = random(height);
    brush.set("spray", color(50, 45, 40, random(20, 40)), random(0.15, 0.4));
    brush.line(x, y, x + random(-3, 3), y + random(-3, 3));
  }

  for (let i = 0; i < 35; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let w = random(8, 26);
    let h = random(3, 10);
    push();
    translate(x, y);
    rotate(random(-40, 40));
    brush.set(random(["2H", "HB", "rotring"]), color(80, 70, 65, random(15, 35)), random(0.2, 0.55));
    brush.rect(-w / 2, -h / 2, w, h, "corner");
    pop();
  }

  for (let i = 0; i < 12; i++) {
    let x1 = random(0, width);
    let y1 = random(0, height);
    let x2 = x1 + random(-60, 60);
    let y2 = y1 + random(-20, 20);
    brush.set("crayon", color(120, 110, 100, 18), random(0.4, 0.8));
    brush.line(x1, y1, x2, y2);
  }

  for (let i = 0; i < 10; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    brush.set("pastel", color(255, 255, 255, 25), random(0.5, 1.0));
    brush.spline([
      [x - random(12, 30), y + random(-6, 6), 0.8],
      [x, y, 1.0],
      [x + random(12, 30), y + random(-6, 6), 0.7]
    ], 0.5);
  }
}