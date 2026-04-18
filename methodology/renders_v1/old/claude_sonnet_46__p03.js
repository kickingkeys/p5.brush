function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5efe6");
  brush.scaleBrushes(3);

  translate(-width / 2, -height / 2);

  // --- Smudge trails (heavy charcoal behind the motion) ---
  brush.set("charcoal", "#2a2220", 2.5);
  brush.fill("#2a2220", 18);
  brush.fillBleed(0.55, "out");
  brush.fillTexture(0.85, 0.7);

  // Main smear trail behind torso — broad sweep left-to-right
  brush.beginShape(0.55);
  brush.vertex(100, 290, 0.3);
  brush.vertex(155, 278, 0.6);
  brush.vertex(210, 268, 1.0);
  brush.vertex(255, 260, 0.8);
  brush.vertex(295, 255, 0.5);
  brush.endShape(false);

  brush.fill("#1e1a18", 12);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.9, 0.5);

  // Secondary smear — lower torso / hip trail
  brush.beginShape(0.5);
  brush.vertex(115, 330, 0.2);
  brush.vertex(170, 318, 0.5);
  brush.vertex(225, 308, 0.9);
  brush.vertex(268, 302, 0.6);
  brush.vertex(300, 298, 0.3);
  brush.endShape(false);

  // Arm smear trailing left
  brush.fill("#2a2220", 10);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.8, 0.4);
  brush.beginShape(0.4);
  brush.vertex(108, 240, 0.2);
  brush.vertex(155, 232, 0.5);
  brush.vertex(200, 228, 0.8);
  brush.vertex(238, 230, 0.5);
  brush.endShape(false);

  // --- Ground smudge / shadow beneath leap ---
  brush.noFill();
  brush.set("charcoal", "#1c1816", 3.5);
  brush.spline(
    [
      [200, 430],
      [260, 440],
      [320, 445],
      [380, 440],
      [430, 432],
    ],
    0.6
  );
  brush.set("charcoal", "#2e2a27", 2.0);
  brush.spline(
    [
      [215, 438],
      [270, 448],
      [330, 452],
      [385, 447],
      [420, 438],
    ],
    0.5
  );

  // =====================================================
  // DANCER FIGURE — charcoal gestural lines
  // =====================================================

  // --- Head ---
  brush.set("charcoal", "#1e1a18", 1.2);
  brush.noFill();
  brush.circle(318, 148, 22, 0.7);

  // Neck
  brush.set("charcoal", "#1e1a18", 1.0);
  brush.spline([[318, 170], [315, 190]], 0.2);

  // --- Torso (main gestural sweep) ---
  brush.set("charcoal", "#1a1614", 2.2);
  brush.spline(
    [
      [315, 190],
      [308, 220],
      [300, 252],
      [298, 278],
      [302, 305],
    ],
    0.45
  );

  // Torso secondary line for mass
  brush.set("charcoal", "#2a2522", 1.4);
  brush.spline(
    [
      [322, 192],
      [316, 222],
      [310, 254],
      [308, 280],
      [312, 306],
    ],
    0.4
  );

  // --- Right arm — reaching forward/up ---
  brush.set("charcoal", "#1e1a18", 1.6);
  brush.spline(
    [
      [310, 205],
      [338, 188],
      [368, 172],
      [400, 158],
      [428, 148],
      [452, 140],
    ],
    0.5
  );
  // Forearm extension
  brush.set("charcoal", "#252220", 1.1);
  brush.spline(
    [
      [428, 148],
      [455, 135],
      [478, 122],
      [495, 112],
    ],
    0.4
  );
  // Hand gesture
  brush.set("2B", "#1e1a18", 0.8);
  brush.spline([[495, 112], [505, 105], [510, 100]], 0.3);
  brush.spline([[495, 112], [502, 108], [512, 108]], 0.3);
  brush.spline([[495, 112], [500, 116], [508, 118]], 0.3);

  // --- Left arm — sweeping back/trailing ---
  brush.set("charcoal", "#1e1a18", 1.5);
  brush.spline(
    [
      [308, 208],
      [278, 200],
      [248, 195],
      [218, 192],
      [192, 194],
      [168, 200],
    ],
    0.5
  );
  // Forearm trails back
  brush.set("charcoal", "#2a2522", 1.0);
  brush.spline(
    [
      [168, 200],
      [145, 210],
      [122, 222],
      [105, 235],
    ],
    0.45
  );
  // Hand
  brush.set("2B", "#1e1a18", 0.7);
  brush.spline([[105, 235], [95, 242], [88, 248]], 0.3);
  brush.spline([[105, 235], [98, 240], [90, 238]], 0.3);

  // --- Hips / pelvis ---
  brush.set("charcoal", "#1a1614", 1.8);
  brush.spline(
    [
      [302, 305],
      [285, 312],
      [272, 318],
    ],
    0.3
  );
  brush.spline(
    [
      [302, 305],
      [320, 312],
      [338, 316],
    ],
    0.3
  );

  // --- Right leg — extended forward in leap ---
  brush.set("charcoal", "#1e1a18", 1.7);
  // Upper leg
  brush.spline(
    [
      [338, 316],
      [362, 330],
      [385, 348],
      [405, 368],
      [418, 390],
    ],
    0.45
  );
  // Lower leg — knee bend, foot pointed
  brush.spline(
    [
      [418, 390],
      [432, 408],
      [440, 425],
      [442, 445],
      [438, 462],
    ],
    0.4
  );
  // Foot / pointed toe
  brush.set("2B", "#1e1a18", 0.9);
  brush.spline(
    [
      [438, 462],
      [445, 472],
      [452, 478],
      [460, 480],
    ],
    0.35
  );

  // --- Left leg — trailing behind / kicked back high ---
  brush.set("charcoal", "#1e1a18", 1.7);
  // Upper leg sweeps back and up
  brush.spline(
    [
      [272, 318],
      [248, 308],
      [222, 295],
      [198, 278],
      [178, 260],
    ],
    0.5
  );
  // Lower leg — bent at knee, foot kicking up
  brush.spline(
    [
      [178, 260],
      [162, 248],
      [150, 235],
      [145, 218],
      [148, 200],
      [155, 185],
    ],
    0.48
  );
  // Foot pointing up/back
  brush.set("2B", "#1e1a18", 0.9);
  brush.spline(
    [
      [155, 185],
      [160, 172],
      [162, 160],
      [158, 150],
    ],
    0.35
  );

  // =====================================================
  // ADDITIONAL GESTURAL SMUDGE ACCENTS
  // =====================================================

  // Spine accent — single dark spine line
  brush.set("charcoal", "#0e0c0b", 1.0);
  brush.spline(
    [
      [316, 192],
      [310, 225],
      [305, 258],
      [303, 282],
      [305, 308],
    ],
    0.3
  );

  // Shoulder-blade tension mark
  brush.set("charcoal", "#252220", 0.9);
  brush.spline(
    [
      [325, 198],
      [340, 205],
      [352, 215],
    ],
    0.35
  );

  // Rib-cage gestural smear
  brush.set("charcoal", "#1e1a18", 1.3);
  brush.fill("#1e1a18", 9);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.7, 0.35);
  brush.beginShape(0.4);
  brush.vertex(305, 210, 0.4);
  brush.vertex(315, 208, 0.8);
  brush.vertex(325, 212, 0.9);
  brush.vertex(330, 225, 0.7);
  brush.vertex(325, 238, 0.5);
  brush.vertex(312, 242, 0.4);
  brush.vertex(303, 235, 0.3);
  brush.vertex(300, 220, 0.3);
  brush.endShape(true);

  // Motion blur strokes — fast horizontal dashes
  brush.noFill();
  brush.set("charcoal", "#2a2522", 0.7);
  for (let i = 0; i < 8; i++) {
    let y = 260 + i * 8;
    let x1 = 90 + i * 6;
    let x2 = x1 + 55 - i * 4;
    brush.line(x1, y, x2, y);
  }

  // Loose flyaway hair lines
  brush.set("2B", "#1a1614", 0.6);
  brush.spline([[310, 130], [298, 118], [288, 108], [282, 98]], 0.4);
  brush.spline([[318, 128], [315, 114], [318, 102], [322, 93]], 0.3);
  brush.spline([[325, 132], [335, 120], [342, 110], [348, 102]], 0.4);
  brush.spline([[320, 130], [330, 116], [338, 105]], 0.3);

  // Subtle fabric folds on torso
  brush.set("HB", "#2a2522", 0.5);
  brush.spline([[306, 220], [310, 228], [308, 238]], 0.3);
  brush.spline([[314, 218], [318, 227], [316, 238]], 0.3);

  // Dark accent under raised knee
  brush.set("charcoal", "#151210", 1.2);
  brush.spline(
    [
      [178, 258],
      [168, 252],
      [160, 244],
    ],
    0.3
  );

  // Final loose smear across mid-canvas — energy line
  brush.set("charcoal", "#1e1a18", 0.8);
  brush.spline(
    [
      [88, 300],
      [140, 292],
      [195, 285],
      [250, 280],
      [295, 278],
    ],
    0.6
  );
}

function draw() {
  translate(-width / 2, -height / 2);
  noLoop();
}