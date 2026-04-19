function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Sky / upper atmosphere: very sparse horizontal hatching ---
  brush.hatchStyle("2H", "#aaaaaa", 0.3);
  brush.hatch(18, 0, { rand: 0.08, continuous: false, gradient: 0.4 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 180);
  brush.vertex(0, 180);
  brush.endShape(true);
  brush.noHatch();

  // --- Forest floor / ground shadow: dense cross-hatch at base ---
  brush.hatchStyle("2B", "#111111", 1.2);
  brush.hatch(3, 15, { rand: 0.12, continuous: true, gradient: 0.2 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 520);
  brush.vertex(600, 520);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#333333", 0.8);
  brush.hatch(5, 80, { rand: 0.1, continuous: false, gradient: 0.0 });
  brush.beginShape(0);
  brush.vertex(0, 490);
  brush.vertex(600, 490);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Define tree trunk positions ---
  let trunks = [
    { x: 55,  w: 18, top: 30,  bot: 580 },
    { x: 120, w: 14, top: 60,  bot: 570 },
    { x: 190, w: 22, top: 10,  bot: 590 },
    { x: 260, w: 12, top: 80,  bot: 565 },
    { x: 320, w: 26, top: 0,   bot: 600 },
    { x: 390, w: 16, top: 45,  bot: 575 },
    { x: 455, w: 20, top: 20,  bot: 585 },
    { x: 515, w: 13, top: 70,  bot: 560 },
    { x: 570, w: 18, top: 35,  bot: 580 },
    { x: 90,  w: 9,  top: 120, bot: 540 },
    { x: 160, w: 8,  top: 140, bot: 530 },
    { x: 230, w: 10, top: 100, bot: 550 },
    { x: 350, w: 9,  top: 110, bot: 545 },
    { x: 420, w: 8,  top: 130, bot: 535 },
    { x: 490, w: 11, top: 90,  bot: 555 },
    { x: 540, w: 7,  top: 150, bot: 525 },
  ];

  // --- Draw each trunk: dense vertical hatching ---
  for (let t of trunks) {
    let hw = t.w / 2;

    // Core dark fill: dense vertical rotring lines
    brush.hatchStyle("rotring", "#111111", 0.5);
    brush.hatch(1.2, 90, { rand: 0.03, continuous: true, gradient: 0.0 });
    brush.noStroke();
    brush.noFill();
    brush.beginShape(0);
    brush.vertex(t.x - hw, t.top);
    brush.vertex(t.x + hw, t.top);
    brush.vertex(t.x + hw, t.bot);
    brush.vertex(t.x - hw, t.bot);
    brush.endShape(true);
    brush.noHatch();

    // Left shadow edge: dense diagonal 2B
    brush.hatchStyle("2B", "#000000", 0.9);
    brush.hatch(2, 110, { rand: 0.05, continuous: false });
    brush.beginShape(0);
    brush.vertex(t.x - hw, t.top);
    brush.vertex(t.x - hw + 4, t.top);
    brush.vertex(t.x - hw + 4, t.bot);
    brush.vertex(t.x - hw, t.bot);
    brush.endShape(true);
    brush.noHatch();

    // Right highlight edge: sparse 2H
    brush.hatchStyle("2H", "#888888", 0.3);
    brush.hatch(4, 90, { rand: 0.04, continuous: false });
    brush.beginShape(0);
    brush.vertex(t.x + hw - 4, t.top);
    brush.vertex(t.x + hw, t.top);
    brush.vertex(t.x + hw, t.bot);
    brush.vertex(t.x + hw - 4, t.bot);
    brush.endShape(true);
    brush.noHatch();

    // Bark texture: short diagonal HB cross-hatches on trunk body
    brush.hatchStyle("HB", "#222222", 0.6);
    brush.hatch(6, 130, { rand: 0.15, continuous: false, gradient: 0.1 });
    brush.beginShape(0);
    brush.vertex(t.x - hw + 2, t.top);
    brush.vertex(t.x + hw - 2, t.top);
    brush.vertex(t.x + hw - 2, t.bot);
    brush.vertex(t.x - hw + 2, t.bot);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Canopy zone: layered diagonal hatching across upper canvas ---
  // Layer 1: broad 45-degree HB sweep
  brush.hatchStyle("HB", "#333333", 0.7);
  brush.hatch(7, 45, { rand: 0.1, continuous: false, gradient: 0.3 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 280);
  brush.vertex(0, 280);
  brush.endShape(true);
  brush.noHatch();

  // Layer 2: counter-diagonal 2B, denser toward top
  brush.hatchStyle("2B", "#111111", 1.0);
  brush.hatch(5, 135, { rand: 0.12, continuous: false, gradient: 0.5 });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 200);
  brush.vertex(0, 200);
  brush.endShape(true);
  brush.noHatch();

  // Layer 3: very dense rotring near top for deep canopy shadow
  brush.hatchStyle("rotring", "#000000", 0.4);
  brush.hatch(2.5, 60, { rand: 0.06, continuous: true });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 120);
  brush.vertex(0, 120);
  brush.endShape(true);
  brush.noHatch();

  // Layer 4: horizontal 2H for sky-light bleed into canopy
  brush.hatchStyle("2H", "#777777", 0.3);
  brush.hatch(14, 0, { rand: 0.05, continuous: false, gradient: 0.6 });
  brush.beginShape(0);
  brush.vertex(0, 100);
  brush.vertex(600, 100);
  brush.vertex(600, 300);
  brush.vertex(0, 300);
  brush.endShape(true);
  brush.noHatch();

  // --- Mid-zone undergrowth: tangled diagonal hatching ---
  // Diagonal left
  brush.hatchStyle("HB", "#222222", 0.8);
  brush.hatch(4, 55, { rand: 0.18, continuous: false, gradient: 0.2 });
  brush.beginShape(0);
  brush.vertex(0, 390);
  brush.vertex(600, 390);
  brush.vertex(600, 510);
  brush.vertex(0, 510);
  brush.endShape(true);
  brush.noHatch();

  // Diagonal right, overlapping
  brush.hatchStyle("2B", "#111111", 1.0);
  brush.hatch(5, 125, { rand: 0.2, continuous: false, gradient: 0.15 });
  brush.beginShape(0);
  brush.vertex(0, 420);
  brush.vertex(600, 420);
  brush.vertex(600, 530);
  brush.vertex(0, 530);
  brush.endShape(true);
  brush.noHatch();

  // Fine rotring cross-hatch for deep undergrowth shadow pockets
  brush.hatchStyle("rotring", "#000000", 0.35);
  brush.hatch(2, 90, { rand: 0.08, continuous: true });
  brush.beginShape(0);
  brush.vertex(0, 460);
  brush.vertex(600, 460);
  brush.vertex(600, 520);
  brush.vertex(0, 520);
  brush.endShape(true);
  brush.noHatch();

  // --- Inter-trunk shadow columns: dark wedges between trunks ---
  let shadowZones = [
    { x1: 64,  x2: 111, top: 60,  bot: 500 },
    { x1: 127, x2: 179, top: 30,  bot: 490 },
    { x1: 201, x2: 248, top: 50,  bot: 510 },
    { x1: 272, x2: 307, top: 70,  bot: 480 },
    { x1: 333, x2: 382, top: 20,  bot: 520 },
    { x1: 399, x2: 445, top: 40,  bot: 500 },
    { x1: 465, x2: 505, top: 55,  bot: 495 },
    { x1: 522, x2: 561, top: 30,  bot: 510 },
  ];

  for (let z of shadowZones) {
    // Primary vertical shadow
    brush.hatchStyle("2B", "#000000", 1.1);
    brush.hatch(2.5, 88, { rand: 0.07, continuous: true, gradient: 0.1 });
    brush.noStroke();
    brush.noFill();
    brush.beginShape(0);
    brush.vertex(z.x1, z.top);
    brush.vertex(z.x2, z.top);
    brush.vertex(z.x2, z.bot);
    brush.vertex(z.x1, z.bot);
    brush.endShape(true);
    brush.noHatch();

    // Secondary diagonal overlay
    brush.hatchStyle("HB", "#333333", 0.6);
    brush.hatch(4, 70, { rand: 0.1, continuous: false });
    brush.beginShape(0);
    brush.vertex(z.x1, z.top);
    brush.vertex(z.x2, z.top);
    brush.vertex(z.x2, z.bot);
    brush.vertex(z.x1, z.bot);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Foreground roots / ground texture: short dense pen strokes ---
  brush.hatchStyle("pen", "#111111", 0.8);
  brush.hatch(3, 20, { rand: 0.25, continuous: false, gradient: 0.0 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 540);
  brush.vertex(600, 540);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#000000", 0.4);
  brush.hatch(1.5, 160, { rand: 0.15, continuous: true });
  brush.beginShape(0);
  brush.vertex(0, 555);
  brush.vertex(600, 555);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Thin branch lines across canopy: pen strokes ---
  brush.set("pen", "#111111", 0.5);
  let branches = [
    [[20, 140], [80, 110], [150, 130], [200, 90], [260, 115]],
    [[300, 95], [370, 120], [440, 85], [510, 110], [590, 80]],
    [[10, 200], [90, 175], [170, 195], [250, 160], [330, 185], [420, 155], [500, 180], [590, 150]],
    [[30, 250], [120, 235], [210, 255], [310, 225], [400, 248], [490, 220], [580, 240]],
    [[0, 310], [100, 295], [200, 315], [300, 285], [400, 308], [500, 280], [600, 300]],
  ];
  for (let b of branches) {
    brush.spline(b, 0.35);
  }

  // Thinner 2H branches for depth
  brush.set("2H", "#666666", 0.4);
  let thinBranches = [
    [[40, 165], [130, 148], [220, 168], [320, 140], [410, 162], [505, 135], [595, 158]],
    [[15, 220], [110, 205], [205, 222], [305, 198], [405, 218], [510, 192], [600, 212]],
    [[0, 270], [95, 258], [195, 272], [295, 248], [395, 268], [495, 242], [595, 262]],
    [[25, 330], [125, 318], [225, 335], [325, 308], [425, 328], [525, 302], [600, 322]],
  ];
  for (let b of thinBranches) {
    brush.spline(b, 0.3);
  }

  // --- Abstract woven texture: full-canvas very sparse 2H overlay ---
  brush.hatchStyle("2H", "#bbbbbb", 0.25);
  brush.hatch(30, 45, { rand: 0.05, continuous: false, gradient: 0.0 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Final: dark pen contour lines on major trunks for crispness
  brush.set("pen", "#000000", 1.0);
  for (let t of trunks) {
    if (t.w >= 14) {
      let hw = t.w / 2;
      brush.line(t.x - hw, t.top, t.x - hw, t.bot);
      brush.line(t.x + hw, t.top, t.x + hw, t.bot);
    }
  }

  noLoop();
}