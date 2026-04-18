function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(17);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Forest floor / ground shadow base
  brush.hatchStyle("rotring", "#111", 0.25);
  brush.hatch(1.8, 0, { rand: 0.08, continuous: false, gradient: 0.0 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(0, 480);
  brush.vertex(600, 480);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 0.4);
  brush.hatch(2.5, 90, { rand: 0.1, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 500);
  brush.vertex(600, 500);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Deep background shadow columns
  let bgAngles = [12, 78, 45, 102, 60];
  for (let a = 0; a < bgAngles.length; a++) {
    brush.hatchStyle("rotring", "#1a1a1a", 0.2);
    brush.hatch(3.5, bgAngles[a], { rand: 0.04, continuous: true, gradient: 0.2 });
    brush.noStroke();
    brush.beginShape(0);
    brush.vertex(0, 0);
    brush.vertex(600, 0);
    brush.vertex(600, 600);
    brush.vertex(0, 600);
    brush.endShape(true);
    brush.noHatch();
  }

  // Mid-ground dark undergrowth hatching — horizontal dense bands
  let shadowZones = [
    { y1: 380, y2: 480, spacing: 2.2, angle: 5, w: 0.35 },
    { y1: 420, y2: 560, spacing: 1.5, angle: 175, w: 0.3 },
    { y1: 460, y2: 600, spacing: 1.0, angle: 88, w: 0.4 },
  ];
  for (let sz of shadowZones) {
    brush.hatchStyle("2B", "#0a0a0a", sz.w);
    brush.hatch(sz.spacing, sz.angle, { rand: 0.12, continuous: false, gradient: 0.15 });
    brush.noStroke();
    brush.beginShape(0);
    brush.vertex(0, sz.y1);
    brush.vertex(600, sz.y1);
    brush.vertex(600, sz.y2);
    brush.vertex(0, sz.y2);
    brush.endShape(true);
    brush.noHatch();
  }

  // Tree trunk definitions
  let trunks = [
    { x: 55,  w: 18, h1: 20,  h2: 560 },
    { x: 110, w: 12, h1: 60,  h2: 540 },
    { x: 175, w: 22, h1: 0,   h2: 580 },
    { x: 240, w: 10, h1: 100, h2: 520 },
    { x: 295, w: 28, h1: 10,  h2: 590 },
    { x: 355, w: 14, h1: 40,  h2: 560 },
    { x: 405, w: 9,  h1: 120, h2: 500 },
    { x: 445, w: 25, h1: 5,   h2: 575 },
    { x: 510, w: 16, h1: 50,  h2: 550 },
    { x: 560, w: 11, h1: 80,  h2: 530 },
    { x: 80,  w: 7,  h1: 200, h2: 490 },
    { x: 145, w: 8,  h1: 150, h2: 510 },
    { x: 320, w: 6,  h1: 220, h2: 480 },
    { x: 475, w: 7,  h1: 180, h2: 495 },
    { x: 535, w: 6,  h1: 240, h2: 470 },
  ];

  // Draw trunk fills — dense vertical hatching per trunk
  for (let t of trunks) {
    let lx = t.x - t.w / 2;
    let rx = t.x + t.w / 2;

    // Core trunk — dense vertical
    brush.hatchStyle("rotring", "#050505", 0.3);
    brush.hatch(1.2, 90, { rand: 0.03, continuous: true, gradient: 0.0 });
    brush.noStroke();
    brush.beginShape(0);
    brush.vertex(lx, t.h1);
    brush.vertex(rx, t.h1);
    brush.vertex(rx, t.h2);
    brush.vertex(lx, t.h2);
    brush.endShape(true);
    brush.noHatch();

    // Shadow side — cross hatch at slight angle
    brush.hatchStyle("2B", "#000", 0.4);
    brush.hatch(0.9, 78, { rand: 0.05, continuous: false });
    brush.beginShape(0);
    brush.vertex(lx, t.h1);
    brush.vertex(lx + t.w * 0.45, t.h1);
    brush.vertex(lx + t.w * 0.45, t.h2);
    brush.vertex(lx, t.h2);
    brush.endShape(true);
    brush.noHatch();

    // Outline strokes for trunk edges
    brush.set("pen", "#111", 0.7);
    brush.line(lx, t.h1, lx, t.h2);
    brush.line(rx, t.h1, rx, t.h2);
  }

  // Canopy / upper forest — dense diagonal hatching layers
  let canopyLayers = [
    { y1: 0,   y2: 200, angle: 30,  spacing: 4.0, col: "#222", w: 0.25 },
    { y1: 0,   y2: 280, angle: 150, spacing: 5.5, col: "#1a1a1a", w: 0.2 },
    { y1: 50,  y2: 320, angle: 60,  spacing: 3.5, col: "#111", w: 0.3 },
    { y1: 0,   y2: 180, angle: 120, spacing: 6.0, col: "#333", w: 0.2 },
    { y1: 100, y2: 350, angle: 20,  spacing: 4.5, col: "#1a1a1a", w: 0.22 },
    { y1: 0,   y2: 140, angle: 90,  spacing: 3.0, col: "#0d0d0d", w: 0.28 },
  ];

  for (let cl of canopyLayers) {
    brush.hatchStyle("rotring", cl.col, cl.w);
    brush.hatch(cl.spacing, cl.angle, { rand: 0.06, continuous: false, gradient: 0.25 });
    brush.noStroke();
    brush.beginShape(0);
    brush.vertex(0, cl.y1);
    brush.vertex(600, cl.y1);
    brush.vertex(600, cl.y2);
    brush.vertex(0, cl.y2);
    brush.endShape(true);
    brush.noHatch();
  }

  // Branch networks — fine pen lines radiating from upper trunks
  let branchSets = [
    { ox: 55,  oy: 120, branches: [[320, 30, 90], [340, 50, 60], [300, 40, 110], [280, 35, 130]] },
    { ox: 175, oy: 80,  branches: [[350, 55, 70], [330, 45, 50], [360, 60, 95], [310, 40, 115]] },
    { ox: 295, oy: 50,  branches: [[380, 65, 75], [360, 50, 55], [390, 70, 100], [340, 45, 120]] },
    { ox: 445, oy: 70,  branches: [[370, 55, 65], [350, 45, 85], [385, 60, 45], [330, 40, 105]] },
    { ox: 510, oy: 100, branches: [[340, 40, 80], [320, 35, 60], [355, 50, 100], [300, 30, 120]] },
  ];

  brush.set("rotring", "#1a1a1a", 0.3);
  for (let bs of branchSets) {
    for (let br of bs.branches) {
      let bx = bs.ox + cos(br[2]) * br[0] * 0.3;
      let by = bs.oy - sin(br[2]) * br[1] * 0.6;
      brush.line(bs.ox, bs.oy, bx, by);
      // Sub-branches
      brush.set("rotring", "#222", 0.2);
      let bx2a = bx + cos(br[2] + 25) * br[0] * 0.15;
      let by2a = by - sin(br[2] + 25) * br[1] * 0.3;
      brush.line(bx, by, bx2a, by2a);
      let bx2b = bx + cos(br[2] - 20) * br[0] * 0.12;
      let by2b = by - sin(br[2] - 20) * br[1] * 0.25;
      brush.line(bx, by, bx2b, by2b);
      brush.set("rotring", "#1a1a1a", 0.3);
    }
  }

  // Undergrowth — short vertical and diagonal strokes at base
  brush.set("2B", "#111", 0.5);
  for (let i = 0; i < 120; i++) {
    let gx = random(0, 600);
    let gy = random(440, 590);
    let gh = random(8, 35);
    let ga = random(-15, 15);
    let gx2 = gx + sin(ga) * gh * 0.3;
    let gy2 = gy - cos(ga) * gh;
    brush.line(gx, gy, gx2, gy2);
  }

  // Fine root/grass hatching at very bottom
  brush.hatchStyle("HB", "#222", 0.35);
  brush.hatch(1.3, 82, { rand: 0.2, continuous: false });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(0, 540);
  brush.vertex(600, 540);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Light shafts — very sparse diagonal hatching in mid-upper zone
  brush.hatchStyle("2H", "#555", 0.15);
  brush.hatch(22, 72, { rand: 0.3, continuous: false, gradient: 0.6 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(80, 50);
  brush.vertex(280, 50);
  brush.vertex(240, 380);
  brush.vertex(60, 380);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#4a4a4a", 0.15);
  brush.hatch(28, 68, { rand: 0.35, continuous: false, gradient: 0.5 });
  brush.beginShape(0);
  brush.vertex(340, 30);
  brush.vertex(520, 30);
  brush.vertex(490, 360);
  brush.vertex(310, 360);
  brush.endShape(true);
  brush.noHatch();

  // Texture weave — overall fine cross-hatch to unify the composition
  brush.hatchStyle("rotring", "#2a2a2a", 0.18);
  brush.hatch(8.5, 43, { rand: 0.05, continuous: false, gradient: 0.0 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#1e1e1e", 0.16);
  brush.hatch(11, 133, { rand: 0.05, continuous: false, gradient: 0.0 });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}