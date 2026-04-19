function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(12);
  noiseSeed(12);

  brush.noField();
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noWash();

  // Motion haze and trailing smudges
  brush.field("hand");
  brush.wiggle(5);

  for (let k = 0; k < 4; k++) {
    let ox = -90 + k * 28;
    let oy = 24 - k * 10;

    brush.mass("pastel", "#706a63", {
      strength: 0.62 - k * 0.08,
      precision: 0.24,
      gradient: 0.6,
      outline: false
    });
    brush.beginShape(0.55);
    brush.vertex(120 + ox, 315 + oy);
    brush.vertex(155 + ox, 275 + oy);
    brush.vertex(225 + ox, 235 + oy);
    brush.vertex(300 + ox, 215 + oy);
    brush.vertex(365 + ox, 225 + oy);
    brush.vertex(415 + ox, 255 + oy);
    brush.vertex(390 + ox, 285 + oy);
    brush.vertex(315 + ox, 285 + oy);
    brush.vertex(235 + ox, 305 + oy);
    brush.vertex(160 + ox, 338 + oy);
    brush.endShape(true);
    brush.noMass();
  }

  // Broad charcoal trails
  brush.set("charcoal", "#5e5851", 2.8);
  for (let i = 0; i < 12; i++) {
    let sx = 115 + random(-12, 12);
    let sy = 320 + random(-25, 25);
    let ex = 320 + random(-30, 20);
    let ey = 250 + random(-28, 22);
    brush.spline([
      [sx, sy, 1.2],
      [sx + 70 + random(-12, 12), sy - 35 + random(-18, 18), 1.0],
      [sx + 145 + random(-10, 10), sy - 75 + random(-16, 16), 0.8],
      [ex, ey, 0.45]
    ], 0.55);
  }

  brush.set("charcoal", "#6c655d", 1.7);
  for (let i = 0; i < 18; i++) {
    let x = 140 + random(-25, 20);
    let y = 315 + random(-35, 35);
    brush.flowLine(x, y, random(35, 95), random(-20, 25));
  }

  brush.noField();

  // Main body smudged mass
  brush.mass("crayon", "#2a2825", {
    strength: 0.86,
    precision: 0.26,
    gradient: 0.45,
    outline: false
  });
  brush.beginShape(0.48);
  brush.vertex(282, 255);
  brush.vertex(298, 218);
  brush.vertex(325, 190);
  brush.vertex(356, 180);
  brush.vertex(385, 188);
  brush.vertex(400, 212);
  brush.vertex(397, 246);
  brush.vertex(383, 278);
  brush.vertex(357, 303);
  brush.vertex(326, 313);
  brush.vertex(300, 305);
  brush.vertex(286, 285);
  brush.endShape(true);
  brush.noMass();

  // Torso contour
  brush.field("hand");
  brush.wiggle(4);
  brush.set("charcoal", "#181716", 1.8);
  brush.beginShape(0.52);
  brush.vertex(294, 280, 0.85);
  brush.vertex(302, 240, 1.0);
  brush.vertex(324, 204, 1.05);
  brush.vertex(354, 188, 1.0);
  brush.vertex(382, 194, 0.95);
  brush.vertex(392, 214, 0.9);
  brush.vertex(388, 246, 0.85);
  brush.vertex(374, 276, 0.9);
  brush.vertex(349, 297, 0.95);
  brush.vertex(320, 305, 0.9);
  brush.vertex(301, 298, 0.8);
  brush.endShape(true);

  // Head
  brush.mass("pastel", "#35312d", {
    strength: 0.58,
    precision: 0.35,
    gradient: 0.2,
    outline: false
  });
  brush.circle(355, 150, 24, 0.25);
  brush.noMass();

  brush.set("charcoal", "#171614", 1.2);
  brush.arc(355, 150, 25, 180, 520);

  // Spine / gesture line
  brush.set("2B", "#161514", 1.0);
  brush.spline([
    [349, 173, 0.5],
    [341, 194, 0.7],
    [335, 219, 0.85],
    [331, 246, 0.95],
    [325, 274, 0.75]
  ], 0.6);

  // Left arm reaching up
  brush.set("charcoal", "#141312", 1.3);
  brush.beginStroke("curve", 332, 208);
  brush.move(238, 32, 0.95);
  brush.move(232, 38, 0.82);
  brush.move(222, 34, 0.62);
  brush.endStroke(210, 0.35);

  // Right arm sweeping back
  brush.beginStroke("curve", 376, 210);
  brush.move(8, 34, 0.95);
  brush.move(-8, 42, 0.8);
  brush.move(-18, 36, 0.6);
  brush.endStroke(-28, 0.3);

  // Arm echoes
  brush.set("2H", "#8a847c", 0.65);
  for (let i = 0; i < 3; i++) {
    let dx = -22 - i * 18;
    let dy = 6 + i * 8;
    brush.beginStroke("curve", 332 + dx, 208 + dy);
    brush.move(238, 30, 0.75);
    brush.move(232, 35, 0.58);
    brush.move(222, 30, 0.38);
    brush.endStroke(210, 0.2);
  }

  // Supporting leg
  brush.set("charcoal", "#121110", 1.55);
  brush.beginStroke("curve", 320, 304);
  brush.move(120, 44, 1.05);
  brush.move(106, 48, 0.96);
  brush.move(95, 52, 0.82);
  brush.endStroke(82, 0.46);

  // Bent front leg
  brush.beginStroke("curve", 342, 303);
  brush.move(32, 52, 1.02);
  brush.move(-8, 58, 0.9);
  brush.move(-36, 48, 0.74);
  brush.endStroke(-55, 0.38);

  // Foot accents
  brush.set("2B", "#121110", 0.9);
  brush.line(346, 448, 368, 458);
  brush.line(458, 384, 486, 374);

  // Leg motion echoes
  brush.set("HB", "#7a736c", 0.75);
  for (let i = 0; i < 3; i++) {
    let dx = -26 - i * 18;
    let dy = 12 + i * 6;
    brush.beginStroke("curve", 320 + dx, 304 + dy);
    brush.move(122, 38, 0.72);
    brush.move(108, 42, 0.6);
    brush.move(96, 48, 0.42);
    brush.endStroke(84, 0.2);
  }

  for (let i = 0; i < 2; i++) {
    let dx = -20 - i * 16;
    let dy = 10 + i * 8;
    brush.beginStroke("curve", 342 + dx, 303 + dy);
    brush.move(34, 46, 0.7);
    brush.move(-10, 52, 0.56);
    brush.move(-38, 40, 0.35);
    brush.endStroke(-58, 0.18);
  }

  // Core shadow hatching
  brush.hatchStyle("2B", "#252320", 0.95);
  brush.hatch(5, 112, { rand: 0.14, continuous: true, gradient: 0.25 });
  brush.beginShape(0.45);
  brush.vertex(305, 230);
  brush.vertex(328, 200);
  brush.vertex(360, 192);
  brush.vertex(382, 208);
  brush.vertex(380, 240);
  brush.vertex(364, 274);
  brush.vertex(336, 292);
  brush.vertex(312, 286);
  brush.endShape(true);
  brush.noHatch();

  // Smudged grounding marks under the leap
  brush.field("hand");
  brush.wiggle(3);
  brush.set("charcoal", "#5d5750", 1.1);
  for (let i = 0; i < 10; i++) {
    let gx = 250 + i * 18 + random(-8, 8);
    let gy = 510 + random(-4, 6);
    brush.flowLine(gx, gy, random(18, 42), random(-10, 18));
  }
  brush.noField();

  // Final sharp accents
  brush.set("pen", "#0f0f0e", 0.45);
  brush.line(353, 128, 360, 116);
  brush.line(321, 304, 316, 322);
  brush.line(341, 303, 353, 316);

  noLoop();
}