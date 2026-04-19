function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(18);
  noiseSeed(18);

  brush.noField();
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noWash();

  // Motion smear behind the leap
  brush.field("hand");
  brush.wiggle(5);

  for (let i = 0; i < 22; i++) {
    let t = i / 21;
    let x1 = lerp(85, 255, t) + random(-18, 10);
    let y1 = lerp(365, 255, t) + random(-22, 18);
    let x2 = lerp(155, 330, t) + random(-30, 20);
    let y2 = lerp(335, 235, t) + random(-26, 26);

    brush.set("spray", "#8f877c", map(i, 0, 21, 3.1, 1.0));
    brush.flowLine(x1, y1, random(20, 48), random(-20, 25));
    brush.flowLine(x2, y2, random(18, 42), random(-10, 30));
  }

  for (let i = 0; i < 18; i++) {
    let x = random(110, 310);
    let y = random(220, 390);
    brush.set("charcoal", "#a39a8e", random(1.2, 2.8));
    brush.spline(
      [
        [x, y, 0.4],
        [x + random(30, 85), y + random(-18, 18), 1.0],
        [x + random(80, 140), y + random(-24, 24), 0.5]
      ],
      0.55
    );
  }

  // Main charcoal mass for torso / pelvis
  brush.mass("pastel", "#3a342f", {
    strength: 0.62,
    precision: 0.38,
    gradient: 0.45,
    outline: false
  });
  brush.beginShape(0.48);
  brush.vertex(286, 255);
  brush.vertex(306, 226);
  brush.vertex(332, 218);
  brush.vertex(353, 232);
  brush.vertex(362, 260);
  brush.vertex(350, 291);
  brush.vertex(322, 309);
  brush.vertex(294, 303);
  brush.vertex(274, 281);
  brush.endShape(true);
  brush.noMass();

  // Ribcage / upper torso contour
  brush.mass("crayon", "#2a2521", {
    strength: 0.74,
    precision: 0.3,
    gradient: 0.35,
    outline: false
  });
  brush.beginShape(0.45);
  brush.vertex(302, 214);
  brush.vertex(321, 184);
  brush.vertex(347, 176);
  brush.vertex(368, 188);
  brush.vertex(375, 216);
  brush.vertex(363, 241);
  brush.vertex(337, 251);
  brush.vertex(313, 245);
  brush.endShape(true);
  brush.noMass();

  // Head
  brush.mass("pastel", "#312c27", {
    strength: 0.56,
    precision: 0.46,
    gradient: 0.2,
    outline: false
  });
  brush.beginShape(0.5);
  brush.vertex(334, 140);
  brush.vertex(347, 123);
  brush.vertex(366, 119);
  brush.vertex(382, 131);
  brush.vertex(384, 151);
  brush.vertex(371, 167);
  brush.vertex(351, 169);
  brush.vertex(337, 157);
  brush.endShape(true);
  brush.noMass();

  // Heavy smudges around the body
  brush.set("charcoal", "#514842", 2.6);
  for (let i = 0; i < 10; i++) {
    let ox = random(-12, 12);
    let oy = random(-12, 12);
    brush.spline(
      [
        [292 + ox, 254 + oy, 0.6],
        [325 + ox, 235 + oy, 1.2],
        [353 + ox, 252 + oy, 0.8],
        [332 + ox, 292 + oy, 0.5]
      ],
      0.62
    );
  }

  // Spine / center gesture
  brush.set("charcoal", "#1f1b18", 1.8);
  brush.spline(
    [
      [353, 164, 0.5],
      [345, 196, 0.9],
      [336, 232, 1.1],
      [323, 271, 0.95],
      [314, 304, 0.7]
    ],
    0.6
  );

  // Supporting shoulder sweep
  brush.set("2B", "#221e1a", 1.35);
  brush.spline(
    [
      [305, 205, 0.45],
      [329, 193, 1.0],
      [360, 194, 0.8]
    ],
    0.45
  );

  // Left arm reaching upward-back
  brush.set("charcoal", "#1f1b18", 1.55);
  brush.beginStroke("curve", 323, 198);
  brush.move(212, 42, 1.0);
  brush.move(190, 36, 0.78);
  brush.endStroke(174, 0.34);

  // Right arm forward-up
  brush.set("charcoal", "#241f1b", 1.35);
  brush.beginStroke("curve", 360, 202);
  brush.move(340, 48, 1.0);
  brush.move(16, 34, 0.72);
  brush.endStroke(25, 0.28);

  // Leg trailing back
  brush.set("charcoal", "#171412", 1.9);
  brush.beginStroke("curve", 314, 304);
  brush.move(145, 66, 1.15);
  brush.move(160, 74, 0.96);
  brush.endStroke(168, 0.24);

  // Front leg extended
  brush.set("charcoal", "#171412", 2.05);
  brush.beginStroke("curve", 332, 300);
  brush.move(24, 74, 1.2);
  brush.move(6, 82, 0.92);
  brush.endStroke(-2, 0.22);

  // Feet flicks
  brush.set("2B", "#120f0d", 1.0);
  brush.spline(
    [
      [170, 425, 0.35],
      [150, 433, 0.75],
      [136, 428, 0.18]
    ],
    0.3
  );
  brush.spline(
    [
      [485, 447, 0.32],
      [507, 452, 0.72],
      [520, 446, 0.16]
    ],
    0.3
  );

  // Gesture outlines over masses
  brush.set("2B", "#181512", 1.15);
  brush.spline(
    [
      [336, 121, 0.2],
      [378, 132, 0.72],
      [373, 165, 0.5],
      [345, 167, 0.25]
    ],
    0.5
  );
  brush.spline(
    [
      [300, 215, 0.3],
      [280, 246, 0.7],
      [286, 281, 0.55],
      [309, 304, 0.25]
    ],
    0.45
  );
  brush.spline(
    [
      [367, 189, 0.24],
      [377, 217, 0.6],
      [355, 292, 0.44]
    ],
    0.4
  );

  // Light graphite searching lines around the figure
  brush.set("HB", "#6c655d", 0.82);
  for (let i = 0; i < 12; i++) {
    brush.spline(
      [
        [random(250, 340), random(150, 230), 0.2],
        [random(285, 385), random(210, 315), 0.6],
        [random(300, 410), random(250, 360), 0.2]
      ],
      0.4
    );
  }

  // Faint construction / balance arc
  brush.set("2H", "#9d958a", 0.72);
  brush.arc(316, 305, 185, 195, 352);
  brush.arc(316, 305, 210, 205, 340);

  // Smudged hatch zones trailing the movement
  brush.hatchStyle("charcoal", "#5f554c", 1.35);
  brush.hatch(9, 18, { rand: 0.18, continuous: true, gradient: 0.35 });
  brush.beginShape(0.42);
  brush.vertex(110, 338);
  brush.vertex(166, 281);
  brush.vertex(252, 243);
  brush.vertex(304, 250);
  brush.vertex(257, 311);
  brush.vertex(176, 362);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("charcoal", "#7c7268", 1.0);
  brush.hatch(12, 28, { rand: 0.2, continuous: true, gradient: 0.25 });
  brush.beginShape(0.38);
  brush.vertex(96, 386);
  brush.vertex(165, 331);
  brush.vertex(243, 314);
  brush.vertex(203, 372);
  brush.vertex(128, 414);
  brush.endShape(true);
  brush.noHatch();

  // Dust and charcoal fallout near the limbs
  brush.set("spray", "#74695f", 1.45);
  for (let i = 0; i < 75; i++) {
    let px = random(135, 520);
    let py = random(120, 465);
    if (random() < 0.65) {
      brush.flowLine(px, py, random(3, 11), random(150, 230));
    }
  }

  // Accent darkest lines
  brush.set("charcoal", "#0f0d0c", 1.05);
  brush.line(321, 184, 331, 163);
  brush.line(371, 193, 391, 185);
  brush.line(209, 390, 178, 414);
  brush.line(446, 409, 486, 446);

  brush.noField();
  noLoop();
}