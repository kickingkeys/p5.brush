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

  // Layered desert washes
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  let bands = [
    { y: 350, h: 220, color: "#d4b07a", wash: 105, fill: 145, bleed: 0.34, tex1: 0.8, tex2: 0.45, amp: 18, freq: 0.012, phase: 0 },
    { y: 390, h: 180, color: "#c79b63", wash: 95, fill: 125, bleed: 0.28, tex1: 0.7, tex2: 0.35, amp: 14, freq: 0.016, phase: 60 },
    { y: 435, h: 150, color: "#b9864e", wash: 90, fill: 115, bleed: 0.24, tex1: 0.62, tex2: 0.3, amp: 11, freq: 0.019, phase: 120 },
    { y: 485, h: 120, color: "#a96f3f", wash: 80, fill: 100, bleed: 0.2, tex1: 0.55, tex2: 0.26, amp: 9, freq: 0.024, phase: 200 }
  ];

  for (let b of bands) {
    brush.fillTexture(b.tex1, b.tex2);
    brush.wash(b.color, b.wash);
    brush.fill(b.color, b.fill);
    brush.fillBleed(b.bleed, "out");
    brush.beginShape(0.5);
    brush.vertex(0, 600);
    for (let x = 0; x <= 600; x += 20) {
      let yy = b.y + sin(x * b.freq * 360 + b.phase) * b.amp + noise(x * 0.01, b.y * 0.01) * 26;
      brush.vertex(x, yy);
    }
    brush.vertex(600, 600);
    brush.endShape(true);
    brush.noWash();
  }

  // Midground dune shadows
  for (let k = 0; k < 3; k++) {
    let cy = 410 + k * 42;
    let col = ["#c28d55", "#b77f49", "#ab733f"][k];
    brush.fillTexture(0.72 - k * 0.08, 0.34 - k * 0.05);
    brush.fill(col, 72 - k * 8);
    brush.fillBleed(0.36 - k * 0.05, "in");
    brush.beginShape(0.55);
    for (let x = 0; x <= 600; x += 18) {
      let ridge = cy + sin(x * 0.22 + k * 35) * (10 - k * 2) + noise(x * 0.012, 90 + k * 20) * 22;
      brush.vertex(x, ridge);
    }
    for (let x = 600; x >= 0; x -= 18) {
      let ridge2 = cy + 48 - k * 5 + sin(x * 0.2 + 180 + k * 20) * 8 + noise(x * 0.011, 180 + k * 30) * 16;
      brush.vertex(x, ridge2);
    }
    brush.endShape(true);
  }

  brush.noFill();
  brush.noWash();

  // Horizon line
  brush.set("pen", "#5c4636", 0.45);
  brush.line(25, 286, 575, 286);

  // Distant subtle strata above horizon
  brush.set("2H", "#8d775f", 0.35);
  for (let i = 0; i < 4; i++) {
    let y = 250 + i * 10;
    brush.spline([
      [30, y],
      [180, y + random(-4, 4)],
      [330, y + random(-5, 5)],
      [570, y + random(-3, 3)]
    ], 0.25);
  }

  // Rock formations
  brush.field("hand");
  brush.wiggle(3);

  let rockShapes = [
    [
      [60, 320], [78, 296], [95, 266], [118, 236], [140, 228], [154, 242],
      [160, 275], [168, 322], [160, 374], [136, 392], [105, 398], [80, 383], [66, 352]
    ],
    [
      [205, 332], [222, 305], [240, 278], [266, 252], [292, 244], [307, 262],
      [311, 294], [320, 338], [312, 382], [288, 406], [252, 414], [223, 401], [210, 370]
    ],
    [
      [372, 326], [391, 299], [412, 268], [436, 248], [458, 242], [473, 259],
      [478, 298], [486, 344], [479, 390], [458, 416], [426, 424], [396, 409], [380, 374]
    ],
    [
      [492, 334], [506, 312], [522, 284], [542, 262], [560, 256], [572, 269],
      [576, 300], [582, 336], [576, 372], [561, 395], [537, 404], [515, 393], [500, 367]
    ]
  ];

  for (let i = 0; i < rockShapes.length; i++) {
    let pts = rockShapes[i];

    // Charcoal mass base
    brush.mass("pastel", "#4a3a30", {
      strength: 0.68,
      precision: 0.35,
      gradient: 0.42,
      outline: false
    });
    brush.beginShape(0.18);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
    brush.noMass();

    // Darker inner mass
    let cx = 0;
    let cy = 0;
    for (let p of pts) {
      cx += p[0];
      cy += p[1];
    }
    cx /= pts.length;
    cy /= pts.length;

    brush.mass("crayon", "#2b211c", {
      strength: 0.86,
      precision: 0.26,
      gradient: 0.3,
      outline: false
    });
    brush.beginShape(0.14);
    for (let p of pts) {
      brush.vertex(lerp(cx, p[0], 0.78), lerp(cy, p[1], 0.78));
    }
    brush.endShape(true);
    brush.noMass();

    // Charcoal edge hatch
    brush.hatchStyle("charcoal", "#332721", 1.2);
    brush.hatch(6, 102, { rand: 0.18, continuous: false, gradient: 0.35 });
    brush.beginShape(0.15);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(true);
    brush.noHatch();

    // Outer contour
    brush.set("charcoal", "#221915", 1.1);
    brush.beginShape(0.12);
    for (let p of pts) {
      brush.vertex(p[0], p[1], random(0.85, 1.2));
    }
    brush.endShape(true);

    // Jagged interior cracks / ledges
    brush.set("HB", "#3b2e27", 0.45);
    let top = pts.slice(1, 6);
    brush.spline([
      [top[0][0] + 6, top[0][1] + 10],
      [top[1][0] + 2, top[1][1] + 18],
      [top[2][0] - 1, top[2][1] + 26],
      [top[3][0] - 2, top[3][1] + 45],
      [top[4][0] - 6, top[4][1] + 70]
    ], 0.22);

    brush.set("2B", "#261d18", 0.38);
    brush.line(cx - 10, cy - 20, cx + 8, cy + 62);
    brush.line(cx + 18, cy - 8, cx - 3, cy + 54);
  }

  brush.noField();

  // Cracked desert foreground
  brush.set("HB", "#71553e", 0.32);
  for (let y = 360; y < 595; y += 18) {
    let pts = [];
    for (let x = 0; x <= 600; x += 30) {
      let yy = y + noise(x * 0.02, y * 0.02) * 10 - 5;
      pts.push([x, yy, 0.8]);
    }
    brush.spline(pts, 0.18);
  }

  // Main crack network
  brush.set("2B", "#5f4632", 0.35);
  for (let i = 0; i < 26; i++) {
    let x0 = random(10, 590);
    let y0 = random(390, 590);
    brush.beginStroke("segments", x0, y0);
    let segs = floor(random(3, 6));
    let a = random(-20, 20);
    for (let j = 0; j < segs; j++) {
      a += random(-35, 35);
      brush.move(a, random(18, 42), random(0.55, 1.0));
    }
    brush.endStroke(a + random(-20, 20), random(0.35, 0.8));
  }

  // Polygonal dry-earth cells
  brush.set("2H", "#94755a", 0.22);
  for (let y = 400; y < 595; y += 45) {
    let offset = (floor(y / 45) % 2) * 18;
    for (let x = 20 + offset; x < 590; x += 58) {
      let w = random(34, 56);
      let h = random(18, 32);
      brush.beginShape(0.08);
      brush.vertex(x, y + random(-6, 6));
      brush.vertex(x + w * 0.35, y - h * 0.2 + random(-4, 4));
      brush.vertex(x + w, y + random(-5, 5));
      brush.vertex(x + w * 0.82, y + h + random(-3, 5));
      brush.vertex(x + w * 0.28, y + h * 1.05 + random(-3, 4));
      brush.vertex(x - random(2, 8), y + h * 0.55 + random(-3, 4));
      brush.endShape(true);
    }
  }

  // Subtle wind-blown pencil strokes on sand
  brush.set("cpencil", "#a87645", 0.28);
  for (let i = 0; i < 70; i++) {
    let x = random(20, 580);
    let y = random(355, 560);
    brush.spline([
      [x, y],
      [x + random(18, 34), y + random(-4, 3)],
      [x + random(34, 60), y + random(-2, 5)]
    ], 0.3);
  }

  // A few darker foreground fissures
  brush.set("charcoal", "#2f241e", 0.55);
  let fissures = [
    [[90, 520], [120, 505], [150, 515], [182, 500], [210, 510]],
    [[260, 560], [292, 545], [330, 552], [362, 540], [405, 548]],
    [[420, 486], [448, 474], [482, 481], [516, 470], [548, 479]]
  ];
  for (let f of fissures) {
    brush.spline(f, 0.15);
  }

  noLoop();
}