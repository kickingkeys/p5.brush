function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noSmooth();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(18);
  noiseSeed(18);

  // subtle wall grain / old scuffs
  for (let i = 0; i < 180; i++) {
    let x = random(width);
    let y = random(height);
    brush.set("2H", random(["#d8d0c6", "#d2c8bc", "#cfc4b7"]), random(0.18, 0.35));
    brush.line(x, y, x + random(-18, 18), y + random(-10, 10));
  }

  // faded underdrawing: ghosted charcoal arcs and marks
  brush.wiggle(2);
  for (let i = 0; i < 22; i++) {
    let cx = random(40, 560);
    let cy = random(40, 560);
    let r = random(30, 90);
    brush.set("charcoal", random(["#c8beb1", "#bfb3a4", "#cabfae"]), random(0.22, 0.45));
    brush.arc(cx, cy, r, random(0, 180), random(180, 360));
  }
  brush.noField();

  // overlapping spray circles / halos
  let sprayCols = [
    "#ea5b4b", "#ea7f3f", "#3c78c1", "#2f4f9c",
    "#f0b24b", "#e04a7a", "#2f2f2f", "#4e8d72"
  ];

  for (let i = 0; i < 55; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let len = random(14, 42);
    let w = random(0.8, 2.7);
    brush.set("spray", random(sprayCols), w);
    brush.flowLine(x, y, len, random(360));
  }

  // denser central cluster
  for (let i = 0; i < 80; i++) {
    let a = random(360);
    let rr = random(0, 170);
    let x = 300 + cos(a) * rr;
    let y = 310 + sin(a) * rr * 0.9;
    brush.set("spray", random(sprayCols), random(1.0, 3.0));
    brush.flowLine(x, y, random(18, 50), random(360));
  }

  // larger ghost rings made from segmented sprayed curves
  for (let i = 0; i < 9; i++) {
    let cx = random(90, 510);
    let cy = random(90, 510);
    let rad = random(45, 110);
    let col = random(["#d85c52", "#c64672", "#4b73b9", "#d49a3f", "#444444"]);
    brush.set("spray", col, random(1.2, 2.3));
    let pts = [];
    let start = random(360);
    let span = random(180, 320);
    for (let a = start; a < start + span; a += 20) {
      let r = rad + random(-8, 8);
      pts.push([cx + cos(a) * r, cy + sin(a) * r, random(0.5, 1.1)]);
    }
    brush.spline(pts, 0.45);
  }

  // drips
  for (let i = 0; i < 18; i++) {
    let x = random(70, 530);
    let y = random(110, 400);
    let h = random(35, 130);
    let c = random(["#ea5b4b", "#2f4f9c", "#2d2d2d", "#e04a7a", "#4e8d72"]);
    brush.set("spray", c, random(0.35, 0.85));
    brush.line(x, y, x + random(-5, 5), y + h);

    if (random() < 0.7) {
      brush.set("marker", c, random(0.35, 0.7));
      brush.line(x + random(-2, 2), y + h - random(0, 10), x + random(-6, 6), y + h + random(10, 22));
    }
  }

  // arrow forms
  for (let i = 0; i < 11; i++) {
    let x = random(70, 450);
    let y = random(80, 500);
    let dx = random(70, 150);
    let dy = random(-50, 50);
    let c = random(["#232323", "#e45444", "#396cb5", "#d89438"]);
    brush.set("marker", c, random(0.8, 1.5));
    brush.spline([
      [x, y, 0.8],
      [x + dx * 0.45, y + dy * 0.35, 0.9],
      [x + dx, y + dy, 0.7]
    ], 0.35);

    brush.set("marker", c, random(0.6, 1.2));
    brush.line(x + dx, y + dy, x + dx - random(14, 26), y + dy - random(8, 18));
    brush.line(x + dx, y + dy, x + dx - random(14, 26), y + dy + random(8, 18));
  }

  // hand-drawn ghost marks
  brush.wiggle(3);
  for (let i = 0; i < 26; i++) {
    let x = random(40, 520);
    let y = random(50, 560);
    let col = random(["#b8ada0", "#b0a596", "#c3b7a8", "#a79b8b"]);
    let b = random(["HB", "2B", "pen", "charcoal"]);
    brush.set(b, col, random(0.2, 0.55));

    let pts = [];
    let n = floor(random(3, 6));
    let px = x;
    let py = y;
    pts.push([px, py, random(0.5, 0.9)]);
    for (let k = 0; k < n; k++) {
      px += random(18, 55);
      py += random(-28, 28);
      pts.push([px, py, random(0.35, 0.8)]);
    }
    brush.spline(pts, random(0.3, 0.55));
  }
  brush.noField();

  // scratchy linear fragments
  for (let i = 0; i < 34; i++) {
    let x = random(width);
    let y = random(height);
    let ang = random(360);
    let len = random(18, 90);
    let x2 = x + cos(ang) * len;
    let y2 = y + sin(ang) * len;
    brush.set(random(["HB", "2B", "pen", "rotring"]), random(["#2b2b2b", "#5b5148", "#7d7265"]), random(0.25, 0.7));
    brush.line(x, y, x2, y2);
  }

  // cpencil wandering accents
  for (let i = 0; i < 14; i++) {
    let x = random(40, 500);
    let y = random(50, 560);
    let c = random(["#8d453f", "#8a6a34", "#4c6791", "#6f4b7d", "#546b57"]);
    brush.set("cpencil", c, random(0.45, 0.9));
    brush.spline([
      [x, y, 0.5],
      [x + random(20, 60), y + random(-25, 25), 0.8],
      [x + random(70, 120), y + random(-20, 20), 0.6]
    ], 0.45);
  }

  // a few crayon/pastel rubbed bars like partially covered tags
  for (let i = 0; i < 10; i++) {
    let x = random(60, 470);
    let y = random(60, 530);
    let w = random(50, 130);
    let h = random(10, 28);
    let brushName = random(["pastel", "crayon"]);
    let c = random(["#d8c7a6", "#cbb694", "#d7a8a0", "#b7c7d9"]);
    brush.set(brushName, c, random(0.35, 0.8));
    brush.line(x, y, x + w, y + random(-4, 4));
    brush.line(x + random(-3, 3), y + h * 0.35, x + w + random(-4, 4), y + h * 0.35 + random(-3, 3));
    brush.line(x + random(-2, 2), y + h * 0.7, x + w + random(-2, 2), y + h * 0.7 + random(-2, 2));
  }

  // darker anchoring marks near center
  for (let i = 0; i < 16; i++) {
    let x = random(180, 420);
    let y = random(180, 420);
    let c = random(["#1f1f1f", "#2e2e2e", "#5a2e2a", "#2d4370"]);
    brush.set(random(["marker", "pen", "charcoal"]), c, random(0.7, 1.7));

    if (random() < 0.5) {
      brush.line(x, y, x + random(-60, 60), y + random(-20, 20));
    } else {
      brush.spline([
        [x, y, 0.9],
        [x + random(18, 45), y + random(-20, 20), 0.7],
        [x + random(55, 95), y + random(-15, 15), 0.5]
      ], 0.4);
    }
  }

  // fine rotring stitching
  for (let i = 0; i < 24; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    brush.set("rotring", random(["#3a3a3a", "#6a5d52", "#8d7e72"]), random(0.18, 0.35));
    let steps = floor(random(3, 7));
    let px = x;
    let py = y;
    for (let k = 0; k < steps; k++) {
      let nx = px + random(10, 28);
      let ny = py + random(-12, 12);
      brush.line(px, py, nx, ny);
      px = nx + random(2, 8);
      py = ny + random(-4, 4);
    }
  }

  noLoop();
}