function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(17);
  noiseSeed(17);

  // Subtle paper ghosting / atmosphere
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  brush.fillTexture(0.35, 0.18);
  for (let i = 0; i < 8; i++) {
    brush.fill("#f1ebe0", 18);
    brush.fillBleed(0.12, "out");
    brush.circle(random(80, 520), random(80, 520), random(80, 180), 0.2);
  }
  brush.noFill();

  // Motion smudges trailing behind the leap
  brush.field("hand");
  brush.wiggle(5);

  for (let i = 0; i < 24; i++) {
    let y = 250 + random(-90, 120);
    let x1 = 70 + random(-15, 35);
    let x2 = 335 + random(-50, 20);
    let c = random(["#2a2724", "#3b3733", "#4b4742"]);
    brush.set("charcoal", c, random(2.4, 4.8));
    brush.line(x1, y, x2, y + random(-18, 18));
  }

  for (let i = 0; i < 12; i++) {
    let pts = [];
    let startX = random(90, 180);
    let startY = random(210, 380);
    pts.push([startX, startY, random(1.4, 2.0)]);
    pts.push([startX + random(45, 110), startY + random(-35, 35), random(0.9, 1.6)]);
    pts.push([startX + random(120, 190), startY + random(-50, 50), random(0.5, 1.1)]);
    brush.set("charcoal", "#3d3935", random(2.0, 3.8));
    brush.spline(pts, 0.65);
  }

  // Soft airborne dust around the moving body
  brush.noField();
  for (let i = 0; i < 80; i++) {
    let a = random(360);
    let r = random(20, 130);
    let x = 320 + cos(a) * r + random(-35, 20);
    let y = 255 + sin(a) * r * 0.75 + random(-20, 30);
    brush.set("spray", random(["#4a4540", "#5a544f", "#6a645f"]), random(0.45, 1.0));
    brush.flowLine(x, y, random(5, 18), random(360));
  }

  // Main gestural figure
  brush.field("hand");
  brush.wiggle(4);

  // Torso
  brush.set("charcoal", "#1f1c1a", 2.6);
  brush.spline([
    [320, 320, 0.9],
    [333, 284, 1.4],
    [356, 250, 1.2],
    [374, 220, 0.8]
  ], 0.55);

  brush.set("charcoal", "#2a2623", 2.2);
  brush.spline([
    [313, 333, 0.9],
    [327, 300, 1.2],
    [347, 266, 1.0],
    [367, 232, 0.7]
  ], 0.5);

  // Head
  brush.set("charcoal", "#221f1d", 1.8);
  brush.arc(387, 194, 18, 165, 495);
  brush.set("2B", "#2b2724", 0.9);
  brush.spline([
    [394, 184, 0.4],
    [403, 179, 0.6],
    [409, 187, 0.4]
  ], 0.5);

  // Front arm reaching upward
  brush.set("charcoal", "#201d1b", 1.7);
  brush.spline([
    [360, 248, 1.1],
    [400, 212, 0.9],
    [450, 162, 0.7],
    [499, 118, 0.4]
  ], 0.65);

  brush.set("2B", "#201d1b", 0.8);
  brush.spline([
    [496, 120, 0.4],
    [510, 108, 0.35],
    [523, 105, 0.25]
  ], 0.4);

  // Rear arm swept back
  brush.set("charcoal", "#322e2b", 1.5);
  brush.spline([
    [346, 256, 0.9],
    [296, 250, 0.8],
    [236, 268, 0.6],
    [180, 298, 0.35]
  ], 0.6);

  brush.set("HB", "#3c3834", 0.8);
  brush.spline([
    [182, 298, 0.35],
    [165, 302, 0.25],
    [150, 309, 0.2]
  ], 0.3);

  // Weight leg down/back
  brush.set("charcoal", "#171513", 2.2);
  brush.spline([
    [329, 333, 1.2],
    [314, 385, 1.25],
    [291, 452, 0.95],
    [274, 525, 0.55]
  ], 0.55);

  brush.set("2B", "#1b1816", 1.0);
  brush.spline([
    [274, 525, 0.45],
    [266, 545, 0.25],
    [279, 555, 0.2]
  ], 0.35);

  // Leap leg extended forward
  brush.set("charcoal", "#1b1816", 2.0);
  brush.spline([
    [338, 336, 1.1],
    [384, 315, 1.0],
    [455, 285, 0.85],
    [536, 248, 0.45]
  ], 0.6);

  brush.set("2B", "#1f1b19", 0.9);
  brush.spline([
    [536, 248, 0.42],
    [553, 243, 0.25],
    [568, 248, 0.18]
  ], 0.25);

  // Reinforcing contour marks
  for (let i = 0; i < 14; i++) {
    let ox = random(-10, 10);
    let oy = random(-10, 10);
    brush.set("HB", "#4a4540", random(0.6, 1.0));
    brush.spline([
      [322 + ox, 321 + oy, 0.6],
      [338 + ox, 285 + oy, 0.8],
      [358 + ox, 248 + oy, 0.6]
    ], 0.45);
  }

  // Smudged mass on torso and hips
  brush.mass("pastel", "#2a2623", {
    strength: 0.72,
    precision: 0.28,
    gradient: 0.45,
    outline: false
  });
  brush.beginShape(0.55);
  brush.vertex(308, 334);
  brush.vertex(320, 300);
  brush.vertex(348, 249);
  brush.vertex(378, 214);
  brush.vertex(390, 222);
  brush.vertex(376, 255);
  brush.vertex(357, 293);
  brush.vertex(347, 334);
  brush.vertex(333, 350);
  brush.endShape(true);
  brush.noMass();

  // Smudged trail attached to body
  brush.mass("crayon", "#4b4641", {
    strength: 0.55,
    precision: 0.18,
    gradient: 0.75,
    outline: false
  });
  brush.beginShape(0.45);
  brush.vertex(95, 295);
  brush.vertex(150, 252);
  brush.vertex(232, 226);
  brush.vertex(303, 236);
  brush.vertex(346, 261);
  brush.vertex(286, 286);
  brush.vertex(214, 312);
  brush.vertex(132, 333);
  brush.endShape(true);
  brush.noMass();

  // Charcoal hatching in shadow core
  brush.hatchStyle("charcoal", "#2a2623", 1.3);
  brush.hatch(7, 112, { rand: 0.18, continuous: true, gradient: 0.35 });
  brush.beginShape(0.4);
  brush.vertex(314, 332);
  brush.vertex(325, 302);
  brush.vertex(344, 269);
  brush.vertex(362, 255);
  brush.vertex(354, 306);
  brush.vertex(340, 350);
  brush.endShape(true);
  brush.noHatch();

  // Light paper-saving structural lines
  brush.set("2H", "#6e6861", 0.55);
  brush.spline([
    [350, 238, 0.3],
    [382, 222, 0.24],
    [413, 203, 0.18]
  ], 0.45);
  brush.spline([
    [351, 339, 0.3],
    [398, 320, 0.24],
    [452, 294, 0.18]
  ], 0.45);

  // Ground trace / landing suggestion
  brush.noField();
  for (let i = 0; i < 10; i++) {
    brush.set("charcoal", "#6a645d", random(0.8, 1.4));
    let x = 215 + i * 18 + random(-6, 6);
    let y = 565 + random(-5, 6);
    brush.line(x, y, x + random(18, 42), y + random(-2, 3));
  }

  // Final dark accents
  brush.field("hand");
  brush.wiggle(3);
  brush.set("2B", "#11100f", 1.2);
  brush.line(336, 335, 322, 385);
  brush.line(360, 248, 397, 216);
  brush.line(338, 336, 383, 315);
  brush.noField();

  noLoop();
}