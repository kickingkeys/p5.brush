function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(17);
  noiseSeed(17);

  // --- Sky / upper paper remains mostly untouched ---
  // Thin pen horizon line
  brush.noFill();
  brush.noHatch();
  brush.noWash();
  brush.noMass();
  brush.noField();
  brush.set("pen", "#3f3429", 0.45);
  brush.line(35, 248, 565, 248);

  // --- Layered desert washes ---
  brush.noStroke();
  brush.noHatch();
  brush.fillTexture(0.72, 0.34);

  let washShapes = [
    {
      color: "#d2b186",
      opacity: 85,
      bleed: 0.34,
      pts: [
        [0, 600], [0, 320], [45, 302], [92, 318], [138, 296], [182, 312],
        [236, 286], [295, 308], [352, 292], [402, 314], [460, 294],
        [515, 320], [600, 338], [600, 600]
      ]
    },
    {
      color: "#c59a67",
      opacity: 78,
      bleed: 0.3,
      pts: [
        [0, 600], [0, 380], [58, 368], [112, 386], [154, 360], [211, 378],
        [270, 354], [328, 372], [390, 348], [454, 370], [514, 360],
        [600, 392], [600, 600]
      ]
    },
    {
      color: "#b98752",
      opacity: 72,
      bleed: 0.28,
      pts: [
        [0, 600], [0, 448], [66, 430], [121, 446], [184, 424], [252, 438],
        [315, 418], [378, 440], [448, 424], [521, 446], [600, 462], [600, 600]
      ]
    }
  ];

  for (let s of washShapes) {
    brush.fill(s.color, s.opacity);
    brush.fillBleed(s.bleed, "out");
    brush.beginShape(0.45);
    for (let p of s.pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  // Subtle inner warm strata
  let cx = 300;
  let innerBands = [
    {
      color: "#e0c49d",
      opacity: 42,
      scaleY: 0.9,
      offsetY: -10,
      pts: [
        [20, 355], [78, 342], [132, 354], [190, 336], [248, 350],
        [304, 334], [372, 352], [430, 338], [492, 356], [560, 370]
      ]
    },
    {
      color: "#d8ad76",
      opacity: 38,
      scaleY: 0.88,
      offsetY: 8,
      pts: [
        [34, 430], [92, 418], [146, 432], [210, 414], [274, 428],
        [336, 410], [398, 430], [470, 418], [536, 438], [586, 448]
      ]
    }
  ];

  for (let b of innerBands) {
    brush.fill(b.color, b.opacity);
    brush.fillBleed(0.22, "in");
    brush.beginShape(0.42);
    brush.vertex(0, 600);
    for (let p of b.pts) {
      let x = lerp(cx, p[0], 1.0);
      let y = lerp(600, p[1], b.scaleY) + b.offsetY;
      brush.vertex(x, y);
    }
    brush.vertex(600, 600);
    brush.endShape(true);
  }

  brush.noFill();

  // --- Cracked earth network ---
  brush.noField();
  brush.set("2H", "#7d664d", 0.26);
  for (let y = 372; y < 590; y += random(20, 34)) {
    let pts = [];
    let x = -10;
    while (x < 620) {
      let yy = y + map(noise(x * 0.012, y * 0.02), 0, 1, -10, 10) + random(-3, 3);
      pts.push([x, yy, random(0.35, 0.7)]);
      x += random(28, 58);
    }
    brush.spline(pts, 0.2);
  }

  brush.set("HB", "#6a543f", 0.23);
  for (let i = 0; i < 46; i++) {
    let x = random(20, 580);
    let y1 = random(392, 575);
    let y2 = y1 + random(10, 45);
    brush.line(x, y1, x + random(-18, 18), y2);
  }

  brush.set("2B", "#5a4634", 0.2);
  for (let i = 0; i < 28; i++) {
    let x = random(30, 570);
    let y = random(405, 585);
    brush.beginStroke("segments", x, y);
    brush.move(random(70, 115), random(7, 18), 0.55);
    brush.move(random(245, 300), random(5, 14), 0.42);
    brush.endStroke(random(70, 120), 0.2);
  }

  // --- Jagged charcoal rock formations ---
  brush.field("hand");
  brush.wiggle(4);

  let rockPolys = [
    [
      [62, 252], [88, 221], [114, 198], [141, 212], [153, 186], [176, 205],
      [198, 180], [215, 214], [231, 205], [242, 237], [226, 268], [188, 282],
      [145, 276], [102, 286], [74, 270]
    ],
    [
      [232, 248], [256, 226], [278, 191], [302, 208], [324, 178], [340, 214],
      [356, 198], [376, 229], [385, 257], [366, 289], [320, 302], [282, 292],
      [246, 281]
    ],
    [
      [392, 251], [416, 221], [438, 201], [455, 214], [474, 187], [493, 217],
      [514, 198], [532, 228], [541, 262], [518, 292], [478, 302], [432, 292],
      [404, 278]
    ]
  ];

  for (let poly of rockPolys) {
    // dark mass body
    brush.noStroke();
    brush.noHatch();
    brush.mass("crayon", "#2d2723", {
      strength: 0.9,
      precision: 0.32,
      gradient: 0.45,
      outline: false
    });
    brush.beginShape(0.28);
    for (let p of poly) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noMass();

    // mid charcoal grain
    brush.mass("pastel", "#48403a", {
      strength: 0.52,
      precision: 0.48,
      gradient: 0.38,
      outline: false
    });
    brush.beginShape(0.24);
    let rcx = 0;
    let rcy = 0;
    for (let p of poly) {
      rcx += p[0];
      rcy += p[1];
    }
    rcx /= poly.length;
    rcy /= poly.length;
    for (let p of poly) {
      brush.vertex(lerp(rcx, p[0], 0.82), lerp(rcy + 12, p[1], 0.78));
    }
    brush.endShape(true);
    brush.noMass();

    // charcoal outline
    brush.set("charcoal", "#171513", 0.9);
    brush.beginShape(0.18);
    for (let p of poly) brush.vertex(p[0], p[1], random(0.7, 1.15));
    brush.endShape(true);

    // hatch shadow texture
    brush.hatchStyle("charcoal", "#221d19", 0.65);
    brush.hatch(8, 108, { rand: 0.18, continuous: true, gradient: 0.45 });
    brush.beginShape(0.22);
    for (let p of poly) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    // sparse lighter hatch on sun-facing side
    brush.hatchStyle("HB", "#5f5448", 0.35);
    brush.hatch(12, 28, { rand: 0.1, continuous: true, gradient: 0.25 });
    brush.beginShape(0.22);
    for (let p of poly) {
      brush.vertex(lerp(rcx - 25, p[0], 0.62), lerp(rcy, p[1], 0.62));
    }
    brush.endShape(true);
    brush.noHatch();
  }

  brush.noField();

  // --- Foreground shadow wedges / rock fragments ---
  brush.noStroke();
  brush.mass("pastel", "#6e5841", {
    strength: 0.42,
    precision: 0.55,
    gradient: 0.4,
    outline: false
  });
  let fragments = [
    [[70, 470], [120, 452], [164, 472], [140, 496], [86, 492]],
    [[410, 500], [458, 478], [520, 492], [488, 520], [428, 522]],
    [[255, 520], [286, 504], [330, 518], [312, 540], [266, 544]]
  ];
  for (let f of fragments) {
    brush.beginShape(0.22);
    for (let p of f) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }
  brush.noMass();

  brush.set("charcoal", "#2b241f", 0.55);
  for (let f of fragments) {
    brush.beginShape(0.18);
    for (let p of f) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  // --- Fine geological scratches in foreground ---
  brush.set("rotring", "#8b7155", 0.18);
  for (let i = 0; i < 34; i++) {
    let x = random(30, 570);
    let y = random(430, 590);
    brush.line(x, y, x + random(18, 52), y + random(-6, 6));
  }

  // --- Very subtle colored-pencil warmth in sand bands ---
  brush.hatchStyle("cpencil", "#b99062", 0.25);
  brush.hatch(16, 6, { rand: 0.08, continuous: true, gradient: 0.2 });
  brush.beginShape(0.35);
  brush.vertex(0, 600);
  brush.vertex(0, 410);
  brush.vertex(92, 398);
  brush.vertex(182, 406);
  brush.vertex(280, 392);
  brush.vertex(380, 406);
  brush.vertex(470, 398);
  brush.vertex(600, 420);
  brush.vertex(600, 600);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}