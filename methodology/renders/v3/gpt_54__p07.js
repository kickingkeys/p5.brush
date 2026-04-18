function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noLoop();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(17);
  noiseSeed(17);

  drawWallTexture();
  drawGhostTags();
  drawSprayClouds();
  drawCircles();
  drawArrows();
  drawDrips();
  drawScratchMarks();
  drawDust();
  drawEdgeScuffs();

  noLoop();
}

function drawWallTexture() {
  brush.noField();
  brush.noHatch();
  brush.noMass();
  brush.noWash();
  brush.noFill();

  for (let y = 24; y < height; y += 16) {
    let shade = random(230, 245);
    brush.set("2H", color(shade, shade - 2, shade - 6), 0.35);
    brush.line(18 + random(-6, 6), y, width - 18 + random(-6, 6), y + random(-2, 2));
  }

  for (let i = 0; i < 120; i++) {
    let x = random(width);
    let y = random(height);
    brush.set("HB", color(210, 206, 198, 50), 0.22);
    brush.line(x, y, x + random(-18, 18), y + random(-8, 8));
  }
}

function drawGhostTags() {
  brush.wiggle(2);

  for (let i = 0; i < 9; i++) {
    push();
    translate(random(50, 560), random(60, 560));
    rotate(random(-18, 18));

    let col = random([
      color(120, 135, 150, 42),
      color(150, 90, 110, 36),
      color(90, 120, 105, 34),
      color(70, 70, 80, 32)
    ]);

    brush.set(random(["pen", "rotring", "HB"]), col, random(0.45, 0.8));

    let x = 0;
    let y = 0;
    let pts = [];
    pts.push([x, y, random(0.5, 0.9)]);
    let n = int(random(6, 11));
    for (let j = 0; j < n; j++) {
      x += random(18, 44);
      y += random(-20, 20);
      pts.push([x, y, random(0.35, 1.1)]);
    }
    brush.spline(pts, 0.55);

    if (random() < 0.75) {
      brush.set("rotring", col, 0.35);
      brush.line(-8, random(-4, 4), x + 14, random(-4, 4));
    }

    pop();
  }

  brush.noField();
}

function drawSprayClouds() {
  let palette = [
    "#d8483a",
    "#1f5ea8",
    "#f0b428",
    "#111111",
    "#3e9b6d",
    "#a23cb8",
    "#e56a23"
  ];

  for (let g = 0; g < 13; g++) {
    let cx = random(70, 530);
    let cy = random(70, 530);
    let base = color(random(palette));
    let passes = int(random(3, 6));

    brush.field("curved");

    for (let p = 0; p < passes; p++) {
      let rr = random(28, 90) * (1.05 - p * 0.12);
      let count = int(map(rr, 20, 90, 35, 110));
      brush.set("spray", color(red(base), green(base), blue(base), 120), random(0.7, 2.4));

      for (let i = 0; i < count; i++) {
        let a = random(360);
        let r = random(rr);
        let x = cx + cos(a) * r * random(0.55, 1.1);
        let y = cy + sin(a) * r * random(0.55, 1.1);
        brush.flowLine(x, y, random(5, 18), random(360));
      }
    }

    brush.noField();
  }
}

function drawCircles() {
  let palette = [
    "#d64034",
    "#245fa8",
    "#f2b322",
    "#202020",
    "#9c2f89",
    "#2f8d67",
    "#e86f26"
  ];

  for (let i = 0; i < 16; i++) {
    let x = random(55, 545);
    let y = random(55, 545);
    let r = random(18, 72);
    let c = random(palette);

    brush.set("spray", color(c), random(0.8, 1.7));
    brush.circle(x, y, r, random(0.15, 0.6));

    if (random() < 0.7) {
      brush.set(random(["marker", "pen"]), color(c), random(0.45, 1.1));
      brush.arc(x + random(-4, 4), y + random(-4, 4), r * random(0.8, 1.15), random(0, 140), random(180, 340));
    }

    if (random() < 0.45) {
      brush.set("charcoal", color(20, 20, 20, 120), 0.65);
      brush.arc(x, y, r * random(0.45, 0.8), random(170, 240), random(260, 350));
    }
  }
}

function drawArrows() {
  brush.wiggle(2);

  for (let i = 0; i < 11; i++) {
    let x1 = random(40, 500);
    let y1 = random(50, 550);
    let len = random(45, 150);
    let ang = random(-35, 35);
    let x2 = x1 + len * cos(ang);
    let y2 = y1 + len * sin(ang);

    let c = random([
      "#111111",
      "#d64034",
      "#245fa8",
      "#f2b322",
      "#2f8d67"
    ]);

    brush.set(random(["marker", "pen", "charcoal"]), c, random(0.7, 1.8));
    brush.line(x1, y1, x2, y2);

    let head = random(10, 22);
    let a1 = ang + random(150, 165);
    let a2 = ang - random(150, 165);
    brush.line(x2, y2, x2 + head * cos(a1), y2 + head * sin(a1));
    brush.line(x2, y2, x2 + head * cos(a2), y2 + head * sin(a2));

    if (random() < 0.55) {
      brush.set("spray", color(c), random(0.5, 1.2));
      brush.circle(x2, y2, random(8, 18), 0.4);
    }
  }

  brush.noField();
}

function drawDrips() {
  let palette = [
    "#d64034",
    "#245fa8",
    "#202020",
    "#2f8d67",
    "#a23cb8",
    "#e86f26"
  ];

  for (let i = 0; i < 28; i++) {
    let x = random(40, 560);
    let y = random(40, 360);
    let len = random(30, 180);
    let sway = random(-14, 14);
    let c = random(palette);

    brush.set(random(["marker", "charcoal", "pen"]), color(c), random(0.45, 1.25));

    let pts = [];
    let steps = int(random(3, 7));
    for (let j = 0; j <= steps; j++) {
      let t = j / steps;
      pts.push([
        x + sin(t * 180) * sway + random(-2, 2),
        y + t * len + random(-2, 3),
        map(t, 0, 1, 0.8, 0.4)
      ]);
    }
    brush.spline(pts, 0.45);

    brush.set("spray", color(c), random(0.45, 1.1));
    brush.circle(pts[pts.length - 1][0], pts[pts.length - 1][1] + random(2, 8), random(3, 10), 0.35);
  }
}

function drawScratchMarks() {
  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(8, 42);
    let ang = random(360);

    brush.set(random(["2B", "HB", "crayon", "pastel"]), color(random([
      "#2a2a2a",
      "#6b6b6b",
      "#c93f33",
      "#315ea1",
      "#9a378a"
    ])), random(0.2, 0.7));

    brush.line(x, y, x + cos(ang) * len, y + sin(ang) * len);
  }

  for (let i = 0; i < 24; i++) {
    let x = random(40, 560);
    let y = random(40, 560);

    brush.set("crayon", color(30, 30, 30, 120), 0.45);
    brush.beginStroke("curve", x, y);
    brush.move(random(-40, 40), random(16, 34), random(0.5, 1.0));
    brush.move(random(-50, 50), random(12, 28), random(0.5, 1.0));
    brush.endStroke(random(-60, 60), random(0.4, 0.8));
  }
}

function drawDust() {
  for (let i = 0; i < 140; i++) {
    let x = random(width);
    let y = random(height);

    brush.set("spray", color(random([
      "#000000",
      "#d64034",
      "#245fa8",
      "#f2b322"
    ])), random(0.18, 0.5));

    brush.circle(x, y, random(1.5, 5), 0.2);
  }
}

function drawEdgeScuffs() {
  for (let i = 0; i < 18; i++) {
    let side = int(random(4));
    let x1, y1, x2, y2;

    if (side === 0) {
      x1 = random(width);
      y1 = random(0, 30);
      x2 = x1 + random(-50, 50);
      y2 = y1 + random(10, 40);
    } else if (side === 1) {
      x1 = random(width);
      y1 = random(height - 30, height);
      x2 = x1 + random(-50, 50);
      y2 = y1 - random(10, 40);
    } else if (side === 2) {
      x1 = random(0, 30);
      y1 = random(height);
      x2 = x1 + random(10, 40);
      y2 = y1 + random(-50, 50);
    } else {
      x1 = random(width - 30, width);
      y1 = random(height);
      x2 = x1 - random(10, 40);
      y2 = y1 + random(-50, 50);
    }

    brush.set("charcoal", color(90, 86, 80, 70), random(0.6, 1.1));
    brush.line(x1, y1, x2, y2);
  }
}