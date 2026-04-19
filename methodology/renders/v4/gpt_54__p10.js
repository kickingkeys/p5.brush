function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(27);
  noiseSeed(27);

  // --- layered sand washes ---
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  brush.fillTexture(0.72, 0.34);

  let skyBottom = 255;

  // distant pale wash
  brush.wash("#ead9b8", 150);
  brush.fill("#e2cda7", 92);
  brush.fillBleed(0.22, "out");
  brush.beginShape(0.45);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, skyBottom);
  brush.vertex(520, 248);
  brush.vertex(410, 262);
  brush.vertex(300, 250);
  brush.vertex(180, 266);
  brush.vertex(70, 252);
  brush.vertex(0, skyBottom);
  brush.endShape(true);
  brush.noWash();

  // broad middle sand band
  brush.wash("#d8bb86", 138);
  brush.fill("#cda56c", 118);
  brush.fillBleed(0.34, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 220);
  brush.vertex(88, 232);
  brush.vertex(176, 214);
  brush.vertex(264, 238);
  brush.vertex(360, 222);
  brush.vertex(448, 244);
  brush.vertex(534, 228);
  brush.vertex(600, 240);
  brush.vertex(600, 420);
  brush.vertex(0, 430);
  brush.endShape(true);
  brush.noWash();

  // lower warmer wash
  brush.wash("#c89a60", 120);
  brush.fill("#b7864f", 108);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.48);
  brush.vertex(0, 328);
  brush.vertex(92, 312);
  brush.vertex(168, 338);
  brush.vertex(252, 320);
  brush.vertex(342, 346);
  brush.vertex(438, 324);
  brush.vertex(520, 354);
  brush.vertex(600, 340);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // foreground wash with deeper sand
  brush.wash("#ad7440", 104);
  brush.fill("#986334", 92);
  brush.fillBleed(0.28, "in");
  brush.beginShape(0.5);
  brush.vertex(0, 440);
  brush.vertex(74, 420);
  brush.vertex(132, 452);
  brush.vertex(208, 436);
  brush.vertex(286, 472);
  brush.vertex(374, 446);
  brush.vertex(454, 486);
  brush.vertex(532, 462);
  brush.vertex(600, 490);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // subtle cracked polygons in the foreground
  brush.fillTexture(0.58, 0.22);
  for (let i = 0; i < 15; i++) {
    let cx = random(30, 570);
    let cy = random(430, 590);
    let rw = random(24, 70);
    let rh = random(14, 34);
    let pts = [];
    let sides = floor(random(4, 7));
    for (let a = 0; a < 360; a += 360 / sides) {
      let rr = rw * random(0.72, 1.08);
      let ry = rh * random(0.75, 1.15);
      pts.push([
        cx + cos(a + random(-14, 14)) * rr,
        cy + sin(a + random(-14, 14)) * ry
      ]);
    }
    brush.fill(random(["#c79a63", "#b98952", "#aa7848", "#d5b27d"]), random(32, 58));
    brush.fillBleed(random(0.14, 0.24), "out");
    brush.polygon(pts);
  }

  brush.noFill();
  brush.noWash();

  // --- single thin pen horizon line ---
  brush.set("pen", "#46352a", 0.48);
  brush.line(0, 256, 600, 256);

  // --- jagged charcoal rock formations ---
  brush.field("hand");
  brush.wiggle(4);

  // left rock mass
  brush.mass("crayon", "#2b2622", {
    strength: 0.86,
    precision: 0.32,
    gradient: 0.42,
    outline: false
  });
  brush.hatchStyle("charcoal", "#1f1b18", 1.6);
  brush.hatch(5, 102, { rand: 0.22, gradient: 0.22 });
  brush.set("charcoal", "#181513", 1.95);
  brush.beginShape(0.18);
  brush.vertex(52, 360, 0.95);
  brush.vertex(68, 326, 1.0);
  brush.vertex(84, 274, 1.2);
  brush.vertex(103, 236, 1.25);
  brush.vertex(118, 198, 1.15);
  brush.vertex(140, 168, 1.1);
  brush.vertex(162, 206, 1.0);
  brush.vertex(174, 246, 1.0);
  brush.vertex(184, 302, 0.95);
  brush.vertex(194, 364, 0.9);
  brush.vertex(170, 402, 0.84);
  brush.vertex(132, 426, 0.82);
  brush.vertex(94, 420, 0.78);
  brush.vertex(70, 394, 0.8);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // central butte
  brush.mass("pastel", "#38302b", {
    strength: 0.74,
    precision: 0.44,
    gradient: 0.38,
    outline: false
  });
  brush.hatchStyle("charcoal", "#27211d", 1.15);
  brush.hatch(6, 85, { rand: 0.16, gradient: 0.18 });
  brush.set("charcoal", "#1b1816", 1.5);
  brush.beginShape(0.16);
  brush.vertex(216, 374, 0.9);
  brush.vertex(228, 330, 0.95);
  brush.vertex(244, 292, 1.0);
  brush.vertex(260, 248, 1.12);
  brush.vertex(276, 206, 1.2);
  brush.vertex(296, 178, 1.18);
  brush.vertex(316, 202, 1.06);
  brush.vertex(330, 250, 1.0);
  brush.vertex(340, 302, 0.96);
  brush.vertex(344, 360, 0.88);
  brush.vertex(326, 392, 0.84);
  brush.vertex(292, 410, 0.82);
  brush.vertex(252, 408, 0.8);
  brush.vertex(226, 392, 0.82);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // right tall cliffs
  brush.mass("crayon", "#231f1c", {
    strength: 0.9,
    precision: 0.28,
    gradient: 0.5,
    outline: false
  });
  brush.hatchStyle("charcoal", "#191614", 1.9);
  brush.hatch(4, 110, { rand: 0.24, gradient: 0.26 });
  brush.set("charcoal", "#12100f", 2.1);
  brush.beginShape(0.12);
  brush.vertex(408, 386, 0.88);
  brush.vertex(420, 344, 0.94);
  brush.vertex(432, 296, 1.06);
  brush.vertex(446, 246, 1.14);
  brush.vertex(458, 196, 1.2);
  brush.vertex(472, 150, 1.22);
  brush.vertex(486, 132, 1.26);
  brush.vertex(504, 162, 1.12);
  brush.vertex(516, 214, 1.02);
  brush.vertex(528, 276, 0.98);
  brush.vertex(540, 344, 0.92);
  brush.vertex(548, 404, 0.86);
  brush.vertex(528, 432, 0.82);
  brush.vertex(496, 446, 0.8);
  brush.vertex(454, 440, 0.78);
  brush.vertex(424, 418, 0.8);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // smaller dark spur
  brush.mass("pastel", "#302926", {
    strength: 0.62,
    precision: 0.4,
    gradient: 0.3,
    outline: false
  });
  brush.hatchStyle("charcoal", "#211c19", 0.95);
  brush.hatch(6, 95, { rand: 0.14 });
  brush.set("charcoal", "#171412", 1.18);
  brush.beginShape(0.14);
  brush.vertex(356, 404, 0.82);
  brush.vertex(366, 374, 0.9);
  brush.vertex(376, 334, 1.02);
  brush.vertex(390, 316, 1.04);
  brush.vertex(402, 346, 0.92);
  brush.vertex(408, 386, 0.86);
  brush.vertex(404, 422, 0.8);
  brush.vertex(384, 438, 0.76);
  brush.vertex(364, 430, 0.75);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  // charcoal fracture lines and rock edges
  brush.set("charcoal", "#1a1715", 0.72);
  brush.line(96, 250, 142, 176);
  brush.line(120, 228, 160, 206);
  brush.line(146, 260, 172, 340);

  brush.line(250, 270, 296, 182);
  brush.line(274, 228, 318, 238);
  brush.line(290, 292, 326, 372);

  brush.line(448, 248, 486, 134);
  brush.line(470, 188, 506, 168);
  brush.line(490, 242, 534, 388);

  // thin dry cracks in foreground
  brush.noField();
  brush.set("2H", "#8a6b4f", 0.34);
  for (let i = 0; i < 22; i++) {
    let x = random(10, 590);
    let y = random(430, 595);
    brush.beginStroke("segments", x, y);
    let steps = floor(random(3, 6));
    for (let s = 0; s < steps; s++) {
      brush.move(random(-30, 30), random(12, 36), random(0.45, 0.8));
    }
    brush.endStroke(random(-35, 35), random(0.4, 0.7));
  }

  // a few darker crack accents
  brush.set("HB", "#6e5238", 0.32);
  for (let i = 0; i < 9; i++) {
    let x = random(30, 570);
    let y = random(450, 590);
    let pts = [
      [x, y, 0.45],
      [x + random(-18, 18), y + random(10, 26), 0.42],
      [x + random(-32, 32), y + random(22, 42), 0.36]
    ];
    brush.spline(pts, 0.22);
  }

  noLoop();
}