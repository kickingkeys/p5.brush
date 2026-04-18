function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- motion smear trails behind the leap ---
  brush.field("hand");
  brush.wiggle(5);

  // broad smudge sweeps — charcoal massed fills
  brush.mass("crayon", "#2a2a2a", { strength: 0.55, precision: 0.2, gradient: 0.7 });
  brush.noStroke();
  // left trailing smear
  brush.beginShape(0.55);
  brush.vertex(60, 340);
  brush.vertex(100, 310);
  brush.vertex(160, 295);
  brush.vertex(210, 300);
  brush.vertex(220, 330);
  brush.vertex(180, 355);
  brush.vertex(120, 365);
  brush.vertex(70, 360);
  brush.endShape(true);
  brush.noMass();

  // second smear, slightly lighter
  brush.mass("pastel", "#3c3c3c", { strength: 0.35, precision: 0.25, gradient: 0.6 });
  brush.beginShape(0.5);
  brush.vertex(80, 380);
  brush.vertex(140, 360);
  brush.vertex(200, 355);
  brush.vertex(230, 370);
  brush.vertex(210, 400);
  brush.vertex(150, 415);
  brush.vertex(85, 408);
  brush.endShape(true);
  brush.noMass();

  // faint dusty smear far left
  brush.mass("pastel", "#555", { strength: 0.22, precision: 0.15, gradient: 0.8 });
  brush.beginShape(0.5);
  brush.vertex(30, 360);
  brush.vertex(90, 345);
  brush.vertex(130, 350);
  brush.vertex(125, 375);
  brush.vertex(80, 390);
  brush.vertex(28, 385);
  brush.endShape(true);
  brush.noMass();

  brush.noField();

  // --- ground shadow beneath the dancer ---
  brush.field("hand");
  brush.wiggle(3);
  brush.mass("crayon", "#1a1a1a", { strength: 0.3, precision: 0.4, gradient: 0.5 });
  brush.noStroke();
  brush.beginShape(0.6);
  brush.vertex(220, 490);
  brush.vertex(270, 480);
  brush.vertex(340, 478);
  brush.vertex(390, 485);
  brush.vertex(400, 500);
  brush.vertex(350, 510);
  brush.vertex(260, 512);
  brush.vertex(215, 505);
  brush.endShape(true);
  brush.noMass();
  brush.noField();

  // --- body mass: torso ---
  brush.field("hand");
  brush.wiggle(4);
  brush.mass("crayon", "#1e1e1e", { strength: 0.82, precision: 0.35, gradient: 0.3, outline: true });
  brush.hatchStyle("charcoal", "#111", 1.1);
  brush.hatch(5, 55, { rand: 0.18, continuous: true });
  brush.noStroke();
  brush.beginShape(0.45);
  brush.vertex(270, 230);
  brush.vertex(295, 215);
  brush.vertex(330, 218);
  brush.vertex(355, 235);
  brush.vertex(360, 265);
  brush.vertex(350, 295);
  brush.vertex(330, 310);
  brush.vertex(300, 315);
  brush.vertex(275, 300);
  brush.vertex(262, 270);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();
  brush.noField();

  // --- raised lead arm (left arm thrust upward-right) ---
  brush.field("hand");
  brush.wiggle(5);
  brush.set("charcoal", "#181818", 1.4);
  brush.noFill();
  // upper arm
  brush.beginStroke("curve", 350, 240);
  brush.move(310, 55, 1.0);
  brush.move(295, 45, 0.85);
  brush.endStroke(280, 0.5);
  // forearm continuing upward
  brush.beginStroke("curve", 393, 198);
  brush.move(285, 50, 0.85);
  brush.move(270, 40, 0.7);
  brush.endStroke(260, 0.4);
  brush.noField();

  // --- trailing back arm sweeping down-left (motion) ---
  brush.field("hand");
  brush.wiggle(6);
  brush.set("charcoal", "#202020", 1.2);
  brush.beginStroke("curve", 270, 255);
  brush.move(200, 60, 1.0);
  brush.move(185, 55, 0.9);
  brush.endStroke(175, 0.5);
  // hand area
  brush.beginStroke("curve", 218, 310);
  brush.move(195, 30, 0.7);
  brush.move(185, 25, 0.5);
  brush.endStroke(180, 0.3);
  brush.noField();

  // --- leaping leg: lead leg extended forward-down ---
  brush.field("hand");
  brush.wiggle(4);
  brush.mass("crayon", "#222", { strength: 0.7, precision: 0.4, gradient: 0.35 });
  brush.hatchStyle("charcoal", "#111", 0.9);
  brush.hatch(6, 100, { rand: 0.15, continuous: true });
  brush.noStroke();
  // thigh
  brush.beginShape(0.4);
  brush.vertex(310, 310);
  brush.vertex(335, 308);
  brush.vertex(370, 330);
  brush.vertex(400, 365);
  brush.vertex(405, 385);
  brush.vertex(385, 392);
  brush.vertex(355, 375);
  brush.vertex(325, 345);
  brush.vertex(300, 325);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();
  // shin and pointed foot
  brush.set("charcoal", "#1a1a1a", 1.3);
  brush.beginStroke("curve", 395, 388);
  brush.move(120, 70, 1.0);
  brush.move(115, 55, 0.8);
  brush.endStroke(110, 0.4);
  brush.noField();

  // --- trailing leg: back leg kicked up behind ---
  brush.field("hand");
  brush.wiggle(5);
  brush.mass("crayon", "#282828", { strength: 0.65, precision: 0.38, gradient: 0.4 });
  brush.hatchStyle("charcoal", "#151515", 0.85);
  brush.hatch(7, 135, { rand: 0.18, continuous: true });
  brush.noStroke();
  brush.beginShape(0.45);
  brush.vertex(278, 305);
  brush.vertex(260, 290);
  brush.vertex(240, 270);
  brush.vertex(220, 250);
  brush.vertex(210, 230);
  brush.vertex(225, 218);
  brush.vertex(245, 225);
  brush.vertex(265, 248);
  brush.vertex(282, 272);
  brush.vertex(292, 298);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();
  brush.noField();

  // --- head ---
  brush.field("hand");
  brush.wiggle(3);
  brush.mass("pastel", "#252525", { strength: 0.6, precision: 0.5, gradient: 0.2 });
  brush.noStroke();
  brush.beginShape(0.5);
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * 360;
    let rx = 22 + noise(cos(a) * 0.3, sin(a) * 0.3 + 1.1) * 6;
    let ry = 26 + noise(cos(a) * 0.3 + 2.2, sin(a) * 0.3) * 5;
    brush.vertex(310 + cos(a) * rx, 200 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noMass();
  brush.noField();

  // --- neck ---
  brush.field("hand");
  brush.wiggle(3);
  brush.set("charcoal", "#1e1e1e", 1.1);
  brush.noFill();
  brush.beginStroke("curve", 305, 222);
  brush.move(88, 18, 0.9);
  brush.endStroke(90, 0.7);
  brush.beginStroke("curve", 318, 222);
  brush.move(90, 16, 0.9);
  brush.endStroke(92, 0.7);
  brush.noField();

  // --- gestural charcoal strokes over the whole figure for looseness ---
  brush.field("hand");
  brush.wiggle(6);
  brush.set("charcoal", "#111", 1.6);
  brush.noFill();
  // spine gesture
  brush.spline([
    [308, 215],
    [312, 240],
    [315, 270],
    [312, 300],
    [305, 315]
  ], 0.45);
  // shoulder line
  brush.spline([
    [268, 238],
    [310, 228],
    [355, 235]
  ], 0.35);
  // hip line
  brush.spline([
    [275, 300],
    [310, 310],
    [350, 305]
  ], 0.3);
  brush.noField();

  // --- loose smudge hatching over torso for charcoal texture ---
  brush.field("hand");
  brush.wiggle(4);
  brush.hatchStyle("charcoal", "#1a1a1a", 0.75);
  brush.hatch(8, 70, { rand: 0.2, continuous: false });
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(272, 232);
  brush.vertex(358, 237);
  brush.vertex(362, 298);
  brush.vertex(270, 302);
  brush.endShape(true);
  brush.noHatch();
  brush.noField();

  // --- highlight strokes: lighter marks suggesting light from upper left ---
  brush.wiggle(2);
  brush.set("2H", "#888", 0.5);
  brush.noFill();
  brush.spline([
    [278, 235],
    [285, 255],
    [280, 280]
  ], 0.4);
  brush.spline([
    [315, 220],
    [320, 240],
    [318, 260]
  ], 0.35);
  brush.noField();

  // --- flying hair / loose strands ---
  brush.field("hand");
  brush.wiggle(7);
  brush.set("charcoal", "#111", 0.8);
  brush.noFill();
  brush.spline([
    [308, 180],
    [320, 168],
    [340, 160],
    [360, 155]
  ], 0.5);
  brush.spline([
    [312, 178],
    [330, 162],
    [352, 152],
    [372, 148]
  ], 0.45);
  brush.spline([
    [300, 182],
    [285, 168],
    [270, 158]
  ], 0.4);
  brush.noField();

  // --- final gestural accent lines across the whole composition ---
  brush.field("hand");
  brush.wiggle(8);
  brush.set("2B", "#0d0d0d", 0.9);
  brush.noFill();
  // big sweeping arc suggesting leap energy
  brush.spline([
    [100, 420],
    [180, 370],
    [260, 330],
    [320, 310],
    [390, 320],
    [450, 360]
  ], 0.5);
  brush.set("charcoal", "#333", 0.6);
  brush.spline([
    [90, 440],
    [170, 395],
    [250, 355],
    [320, 335],
    [400, 345],
    [460, 380]
  ], 0.45);
  brush.noField();

  noLoop();
}