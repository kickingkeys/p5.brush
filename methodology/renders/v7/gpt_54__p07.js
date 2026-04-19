function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(42);
  noiseSeed(42);

  const palette = [
    "#e4572e", // red-orange
    "#276fbf", // blue
    "#f3a712", // mustard
    "#2a9d8f", // teal
    "#7b2cbf", // violet
    "#1f1f1f"  // near black
  ];

  // soft wall ghosts underneath
  brush.wiggle(2);
  brush.set("charcoal", "#cfc7bc", 0.7);
  for (let i = 0; i < 20; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let w = random(40, 140);
    let h = random(20, 70);
    brush.beginShape(0.45);
    for (let a = 0; a < 360; a += 24) {
      let rx = w * 0.5 + noise(i * 10 + cos(a) * 0.03, sin(a) * 0.03) * 18;
      let ry = h * 0.5 + noise(i * 20 + cos(a) * 0.03, 100 + sin(a) * 0.03) * 12;
      brush.vertex(x + cos(a) * rx, y + sin(a) * ry);
    }
    brush.endShape(true);
  }
  brush.noField();

  // main overlapping spray-painted circles / blobs
  for (let i = 0; i < 42; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let r = random(18, 90);
    let c = random(palette);
    let wt = random(0.9, 3.0);

    brush.set("spray", c, wt);
    for (let j = 0; j < int(random(2, 5)); j++) {
      brush.flowLine(
        x + random(-r * 0.25, r * 0.25),
        y + random(-r * 0.25, r * 0.25),
        random(r * 0.35, r * 0.9),
        random(360)
      );
    }

    // extra circular haze
    let steps = int(random(10, 18));
    for (let a = 0; a < 360; a += 360 / steps) {
      brush.flowLine(
        x + cos(a) * random(r * 0.2, r * 0.7),
        y + sin(a) * random(r * 0.2, r * 0.7),
        random(6, 20),
        random(360)
      );
    }
  }

  // drips
  for (let i = 0; i < 34; i++) {
    let x = random(40, 560);
    let y = random(80, 420);
    let len = random(25, 140);
    let c = random(palette);

    brush.set("spray", c, random(0.45, 1.0));
    brush.line(x, y, x + random(-5, 5), y + len);

    brush.set("spray", c, random(0.8, 1.8));
    brush.flowLine(x + random(-3, 3), y + len - random(0, 10), random(8, 20), 90);
  }

  // sprayed arrows and tag-like gestures
  for (let i = 0; i < 12; i++) {
    let x = random(60, 460);
    let y = random(80, 520);
    let dx = random(60, 160);
    let dy = random(-70, 70);
    let c = random(palette);

    brush.set("spray", c, random(1.2, 2.5));
    let pts = [
      [x, y, 0.9],
      [x + dx * 0.35, y + dy * 0.5, 0.8],
      [x + dx * 0.75, y + dy * 0.85, 0.7],
      [x + dx, y + dy, 0.6]
    ];
    brush.spline(pts, 0.45);

    let ang = atan2(dy, dx);
    let tipx = x + dx;
    let tipy = y + dy;
    let ah = random(12, 26);

    brush.line(tipx, tipy, tipx - cos(ang - 28) * ah, tipy - sin(ang - 28) * ah);
    brush.line(tipx, tipy, tipx - cos(ang + 28) * ah, tipy - sin(ang + 28) * ah);
  }

  // ghosted hand-drawn marker / pen / cpencil marks over and under
  brush.wiggle(1);
  for (let i = 0; i < 18; i++) {
    let mode = i % 3;
    let x = random(40, 520);
    let y = random(60, 540);
    let c = random(["#2b2b2b", "#55463a", "#8e8172", "#b8ada1"]);

    if (mode === 0) brush.set("marker", c, random(0.5, 1.2));
    if (mode === 1) brush.set("pen", c, random(0.7, 1.2));
    if (mode === 2) brush.set("cpencil", c, random(0.7, 1.0));

    let pts = [];
    let count = int(random(3, 6));
    for (let j = 0; j < count; j++) {
      pts.push([
        x + j * random(20, 55),
        y + random(-35, 35),
        random(0.5, 1.0)
      ]);
    }
    brush.spline(pts, 0.55);
  }
  brush.noField();

  // a few darker structural scratches
  for (let i = 0; i < 14; i++) {
    let bname = random(["rotring", "HB", "2B"]);
    brush.set(bname, random(["#201a17", "#3a3029", "#4a3f36"]), random(0.5, 1.0));

    let x1 = random(30, 570);
    let y1 = random(30, 570);
    let x2 = x1 + random(-120, 120);
    let y2 = y1 + random(-80, 80);
    brush.line(x1, y1, x2, y2);
  }

  // scattered dusty mass accents for rubbed wall residue
  for (let i = 0; i < 10; i++) {
    let cx = random(80, 520);
    let cy = random(80, 520);
    let rr = random(20, 55);

    brush.mass(random(["pastel", "crayon"]), random(["#d8d0c4", "#c9c0b2", "#bfb4a5"]), {
      strength: random(0.2, 0.45),
      precision: random(0.3, 0.6),
      gradient: random(0.1, 0.4),
      outline: false
    });

    brush.beginShape(0.35);
    for (let a = 0; a < 360; a += 36) {
      let rad = rr + random(-8, 8);
      brush.vertex(cx + cos(a) * rad, cy + sin(a) * rad);
    }
    brush.endShape(true);
    brush.noMass();
  }

  noLoop();
}