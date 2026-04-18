function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Draw several grass stems with seed heads
  drawGrassStem1();
  drawGrassStem2();
  drawGrassStem3();
  drawGrassStem4();
  drawGrassStem5();
  drawSeedHead1();
  drawSeedHead2();
  drawSeedHead3();
  drawLooseStraws();
  drawGroundHatching();

  noLoop();
}

function drawGrassStem1() {
  // Tall arching grass stem, left-center
  brush.set("HB", "#2a2a2a", 0.7);
  brush.spline([
    [180, 580],
    [175, 480],
    [168, 380],
    [162, 280],
    [158, 190],
    [165, 130],
    [178, 80]
  ], 0.45);

  // Side blades
  brush.set("HB", "#333", 0.5);
  brush.spline([[175, 460], [155, 430], [130, 420]], 0.4);
  brush.spline([[170, 390], [190, 360], [210, 350]], 0.35);
  brush.spline([[165, 310], [145, 285], [120, 275]], 0.4);
  brush.spline([[162, 240], [182, 215], [205, 205]], 0.35);
}

function drawGrassStem2() {
  // Slender upright stem, right of center
  brush.set("2H", "#444", 0.5);
  brush.spline([
    [310, 590],
    [308, 500],
    [305, 400],
    [300, 300],
    [296, 210],
    [292, 140],
    [288, 90]
  ], 0.3);

  // Thin side leaves
  brush.set("2H", "#555", 0.4);
  brush.spline([[306, 520], [290, 500], [272, 492]], 0.35);
  brush.spline([[303, 440], [320, 420], [338, 412]], 0.3);
  brush.spline([[299, 360], [282, 340], [265, 332]], 0.35);
  brush.spline([[295, 280], [312, 260], [330, 252]], 0.3);
}

function drawGrassStem3() {
  // Drooping bent stem, far right
  brush.set("HB", "#2e2e2e", 0.65);
  brush.spline([
    [460, 570],
    [455, 470],
    [450, 380],
    [448, 290],
    [452, 210],
    [462, 155],
    [480, 110],
    [505, 80],
    [530, 65]
  ], 0.5);

  brush.set("2H", "#555", 0.4);
  brush.spline([[452, 450], [435, 430], [415, 422]], 0.35);
  brush.spline([[450, 370], [468, 350], [485, 342]], 0.3);
  brush.spline([[449, 290], [430, 272], [410, 265]], 0.35);
}

function drawGrassStem4() {
  // Short wispy stem, far left
  brush.set("2H", "#4a4a4a", 0.45);
  brush.spline([
    [80, 560],
    [78, 490],
    [75, 420],
    [72, 360],
    [70, 300],
    [68, 250],
    [72, 200]
  ], 0.35);

  brush.set("2H", "#666", 0.35);
  brush.spline([[76, 490], [60, 470], [44, 462]], 0.3);
  brush.spline([[73, 400], [90, 382], [105, 375]], 0.3);
  brush.spline([[70, 320], [55, 305], [38, 298]], 0.3);
}

function drawGrassStem5() {
  // Mid-ground secondary stem
  brush.set("HB", "#383838", 0.55);
  brush.spline([
    [240, 575],
    [238, 490],
    [235, 400],
    [232, 320],
    [228, 250],
    [225, 185],
    [222, 130]
  ], 0.38);

  brush.set("2H", "#555", 0.38);
  brush.spline([[237, 480], [220, 462], [202, 455]], 0.3);
  brush.spline([[234, 400], [250, 382], [265, 375]], 0.3);
  brush.spline([[230, 310], [215, 295], [198, 288]], 0.3);
}

function drawSeedHead1() {
  // Elongated wheat-like seed head at top of stem 1
  let cx = 178, cy = 80;

  brush.set("HB", "#222", 0.6);

  // Central rachis
  brush.spline([[cx, cy + 60], [cx, cy + 30], [cx, cy]], 0.2);

  // Individual florets / awns radiating out
  for (let i = 0; i < 12; i++) {
    let t = i / 11;
    let y = cy + 55 - t * 55;
    let spread = 18 * sin(t * PI);
    let side = (i % 2 === 0) ? 1 : -1;

    brush.set("2H", "#333", 0.4);
    brush.spline([
      [cx, y],
      [cx + side * spread * 0.5, y - 8],
      [cx + side * spread, y - 18]
    ], 0.4);

    // Awn tip
    brush.set("2H", "#555", 0.3);
    brush.spline([
      [cx + side * spread, y - 18],
      [cx + side * spread * 1.1, y - 32]
    ], 0.2);
  }

  // Hatch shading on seed body
  brush.noStroke();
  brush.hatchStyle("2H", "#444", 0.4);
  brush.hatch(4, 70, { rand: 0.08, continuous: false });
  brush.beginShape(0.2);
  brush.vertex(cx - 14, cy + 60);
  brush.vertex(cx + 14, cy + 60);
  brush.vertex(cx + 8, cy);
  brush.vertex(cx - 8, cy);
  brush.endShape(true);
  brush.noHatch();
}

function drawSeedHead2() {
  // Loose panicle seed head at top of stem 2
  let cx = 288, cy = 90;

  brush.set("2H", "#333", 0.4);

  // Main axis
  brush.spline([[cx, cy + 70], [cx, cy + 35], [cx, cy]], 0.2);

  // Branching panicle structure
  let branches = [
    { y: cy + 60, dx: -22, dy: -25 },
    { y: cy + 50, dx: 20, dy: -22 },
    { y: cy + 38, dx: -18, dy: -20 },
    { y: cy + 28, dx: 15, dy: -18 },
    { y: cy + 18, dx: -12, dy: -16 },
    { y: cy + 10, dx: 10, dy: -14 },
  ];

  for (let b of branches) {
    brush.set("2H", "#444", 0.35);
    brush.spline([
      [cx, b.y],
      [cx + b.dx * 0.5, b.y + b.dy * 0.5],
      [cx + b.dx, b.y + b.dy]
    ], 0.35);

    // Small seed at tip
    brush.set("HB", "#2a2a2a", 0.5);
    brush.spline([
      [cx + b.dx, b.y + b.dy],
      [cx + b.dx + b.dx * 0.15, b.y + b.dy - 10]
    ], 0.2);
  }
}

function drawSeedHead3() {
  // Round bristly seed head on stem 5
  let cx = 222, cy = 130;

  brush.set("HB", "#222", 0.55);

  // Compact oval seed cluster
  let numBristles = 28;
  for (let i = 0; i < numBristles; i++) {
    let angle = (i / numBristles) * TWO_PI;
    let r1 = 10 + noise(i * 0.3) * 5;
    let r2 = 22 + noise(i * 0.3 + 10) * 8;
    let x1 = cx + cos(angle) * r1;
    let y1 = cy + sin(angle) * r1 * 0.7;
    let x2 = cx + cos(angle) * r2;
    let y2 = cy + sin(angle) * r2 * 0.7;

    brush.set("2H", "#444", 0.3);
    brush.spline([[x1, y1], [x2, y2]], 0.1);
  }

  // Inner seed body shading
  brush.noStroke();
  brush.hatchStyle("2H", "#333", 0.45);
  brush.hatch(3.5, 45, { rand: 0.1 });
  brush.beginShape(0.5);
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * TWO_PI;
    let r = 10 + noise(i * 0.4) * 3;
    brush.vertex(cx + cos(a) * r, cy + sin(a) * r * 0.7);
  }
  brush.endShape(true);
  brush.noHatch();

  // Outline
  brush.set("HB", "#222", 0.5);
  brush.beginShape(0.5);
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * TWO_PI;
    let r = 10 + noise(i * 0.4) * 3;
    brush.vertex(cx + cos(a) * r, cy + sin(a) * r * 0.7);
  }
  brush.endShape(true);
}

function drawLooseStraws() {
  // Scattered loose grass blades and fallen straws

  brush.set("2H", "#555", 0.35);
  brush.spline([[50, 540], [120, 520], [200, 515], [280, 522], [350, 510]], 0.4);

  brush.set("2H", "#5a5a5a", 0.3);
  brush.spline([[100, 560], [160, 548], [230, 545], [300, 552]], 0.35);

  brush.set("2H", "#606060", 0.3);
  brush.spline([[350, 545], [410, 535], [470, 530], [530, 538]], 0.35);

  // A few crossing straw angles
  brush.set("2H", "#555", 0.3);
  brush.spline([[130, 575], [180, 555], [240, 548]], 0.3);
  brush.spline([[380, 568], [430, 552], [490, 548]], 0.3);

  // Tiny floret details near base
  brush.set("2H", "#666", 0.28);
  for (let i = 0; i < 8; i++) {
    let x = 60 + i * 60 + noise(i) * 20;
    let y = 570 + noise(i + 5) * 15;
    brush.spline([[x, y], [x + noise(i+1)*10 - 5, y - 12], [x + noise(i+2)*14 - 7, y - 22]], 0.3);
  }
}

function drawGroundHatching() {
  // Light ground tone hatching at bottom — fades out upward

  brush.noStroke();

  // Wide ground shadow band
  brush.hatchStyle("2H", "#555", 0.35);
  brush.hatch(9, 8, { rand: 0.12, continuous: false, gradient: 0.5 });
  brush.beginShape(0.1);
  brush.vertex(20, 600);
  brush.vertex(580, 600);
  brush.vertex(580, 540);
  brush.vertex(20, 540);
  brush.endShape(true);
  brush.noHatch();

  // Slightly denser at very bottom
  brush.hatchStyle("HB", "#444", 0.4);
  brush.hatch(6, 12, { rand: 0.1, continuous: false });
  brush.beginShape(0.1);
  brush.vertex(20, 600);
  brush.vertex(580, 600);
  brush.vertex(580, 570);
  brush.vertex(20, 570);
  brush.endShape(true);
  brush.noHatch();

  // Cross-hatch accent in shadow corners
  brush.hatchStyle("2H", "#666", 0.3);
  brush.hatch(12, 80, { rand: 0.08 });
  brush.beginShape(0.1);
  brush.vertex(20, 600);
  brush.vertex(150, 600);
  brush.vertex(150, 545);
  brush.vertex(20, 545);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#666", 0.3);
  brush.hatch(12, 80, { rand: 0.08 });
  brush.beginShape(0.1);
  brush.vertex(450, 600);
  brush.vertex(580, 600);
  brush.vertex(580, 545);
  brush.vertex(450, 545);
  brush.endShape(true);
  brush.noHatch();
}