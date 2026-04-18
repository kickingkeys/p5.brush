function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Grass blade helper: a spline from base to tip with pressure variation ---
  function grassBlade(x, y, len, lean, curvature, weight, color) {
    let pts = [];
    let steps = 6;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let px = x + lean * t * t * len * 0.6 + sin(t * PI * 0.5) * lean * 8;
      let py = y - t * len;
      let pressure = map(t, 0, 1, 1.0, 0.15);
      pts.push([px, py, pressure]);
    }
    brush.set("HB", color, weight);
    brush.spline(pts, curvature);
  }

  // --- Seed head helper: small oval cluster at tip of stem ---
  function seedHead(x, y, size, color) {
    brush.set("2B", color, 0.7);
    // A few short strokes radiating from center
    let count = int(random(5, 9));
    for (let i = 0; i < count; i++) {
      let a = random(-PI * 0.45, PI * 0.45) - HALF_PI;
      let len = random(size * 0.5, size * 1.3);
      let ex = x + cos(a) * len;
      let ey = y + sin(a) * len;
      brush.line(x, y, ex, ey);
    }
    // Small oval body
    brush.set("HB", color, 0.5);
    brush.beginShape(0.5);
    let sc = size * 0.55;
    for (let i = 0; i <= 16; i++) {
      let a2 = (i / 16) * TWO_PI;
      brush.vertex(x + cos(a2) * sc * 0.45, y + sin(a2) * sc * 1.1);
    }
    brush.endShape(true);
  }

  // --- Drooping seed head: elongated pendant cluster ---
  function droopingSeedHead(x, y, color) {
    brush.set("2B", color, 0.6);
    let count = int(random(6, 11));
    for (let i = 0; i < count; i++) {
      let baseA = random(-0.35, 0.35);
      let stemLen = random(10, 22);
      let sx = x + sin(baseA) * 5;
      let sy = y;
      let ex = sx + sin(baseA + random(-0.3, 0.3)) * stemLen;
      let ey = sy + cos(baseA + random(-0.2, 0.2)) * stemLen;
      brush.line(sx, sy, ex, ey);
      // tiny grain at tip
      brush.set("2B", color, 0.5);
      brush.line(ex, ey, ex + random(-3, 3), ey + random(2, 6));
    }
  }

  // --- Awned seed: spiky wheat-like form ---
  function awnedSeed(x, y, color) {
    let grainH = random(18, 30);
    let grainW = random(4, 7);
    brush.set("HB", color, 0.55);
    // body outline
    brush.beginShape(0.35);
    brush.vertex(x, y);
    brush.vertex(x - grainW * 0.5, y + grainH * 0.35);
    brush.vertex(x - grainW * 0.4, y + grainH * 0.7);
    brush.vertex(x, y + grainH);
    brush.vertex(x + grainW * 0.4, y + grainH * 0.7);
    brush.vertex(x + grainW * 0.5, y + grainH * 0.35);
    brush.endShape(true);
    // internal hatching for tone
    brush.noStroke();
    brush.hatchStyle("2H", color, 0.4);
    brush.hatch(3.5, 80, { rand: 0.04, continuous: false });
    brush.beginShape(0.3);
    brush.vertex(x, y + 2);
    brush.vertex(x - grainW * 0.45, y + grainH * 0.4);
    brush.vertex(x, y + grainH - 2);
    brush.vertex(x + grainW * 0.45, y + grainH * 0.4);
    brush.endShape(true);
    brush.noHatch();
    brush.stroke("#333");
    // awns
    brush.set("2H", color, 0.35);
    let awnCount = int(random(3, 6));
    for (let i = 0; i < awnCount; i++) {
      let t = (i + 0.5) / awnCount;
      let ax = x + sin(t * PI - HALF_PI) * grainW * 0.45;
      let ay = y + t * grainH;
      let side = (i % 2 === 0) ? -1 : 1;
      brush.line(ax, ay, ax + side * random(8, 15), ay - random(3, 8));
    }
  }

  // --- Leaf blade: long narrow tapered leaf ---
  function leafBlade(x, y, len, lean, color) {
    brush.set("HB", color, 0.6);
    let pts = [];
    let steps = 8;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let px = x + lean * t * t;
      let py = y - t * len;
      let p = map(t, 0, 1, 0.9, 0.1);
      pts.push([px, py, p]);
    }
    brush.spline(pts, 0.4);
    // midrib
    brush.set("2H", color, 0.3);
    let mpts = [];
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let px = x + lean * t * t * 0.5;
      let py = y - t * len;
      mpts.push([px, py]);
    }
    brush.spline(mpts, 0.3);
  }

  // ============================================================
  // COMPOSITION: multiple grass clumps across canvas
  // ============================================================

  randomSeed(42);
  noiseSeed(99);

  let darkInk = "#222";
  let midInk = "#444";
  let lightInk = "#666";
  let veryLight = "#888";

  // ---- CLUMP 1: left side, tall grasses with drooping seed heads ----
  {
    let bx = 110, by = 560;
    // background hatch shadow at base
    brush.noStroke();
    brush.hatchStyle("2H", lightInk, 0.4);
    brush.hatch(6, 100, { rand: 0.08, continuous: false });
    brush.beginShape(0.4);
    brush.vertex(bx - 30, by);
    brush.vertex(bx + 40, by);
    brush.vertex(bx + 35, by - 55);
    brush.vertex(bx - 25, by - 50);
    brush.endShape(true);
    brush.noHatch();
    brush.stroke(darkInk);

    // tall stems
    grassBlade(bx - 18, by, 210, -18, 0.38, 0.7, darkInk);
    grassBlade(bx - 5, by, 240, -8, 0.3, 0.65, midInk);
    grassBlade(bx + 10, by, 225, 12, 0.35, 0.7, darkInk);
    grassBlade(bx + 25, by, 195, 22, 0.4, 0.6, midInk);
    grassBlade(bx + 38, by, 180, 30, 0.42, 0.55, lightInk);
    grassBlade(bx - 30, by, 160, -28, 0.45, 0.5, lightInk);

    // drooping seed heads at tops
    droopingSeedHead(bx - 18 + (-18) * 0.6, by - 210, darkInk);
    droopingSeedHead(bx - 5 + (-8) * 0.6, by - 240, midInk);
    droopingSeedHead(bx + 10 + 12 * 0.6, by - 225, darkInk);
    droopingSeedHead(bx + 25 + 22 * 0.6, by - 195, midInk);
    droopingSeedHead(bx + 38 + 30 * 0.6, by - 180, lightInk);

    // leaf blades
    leafBlade(bx - 8, by - 60, 70, -20, midInk);
    leafBlade(bx + 12, by - 80, 65, 18, lightInk);
    leafBlade(bx + 28, by - 50, 55, 25, veryLight);
  }

  // ---- CLUMP 2: center-left, awned wheat-like grasses ----
  {
    let bx = 245, by = 570;

    // base shadow hatching
    brush.noStroke();
    brush.hatchStyle("2H", lightInk, 0.35);
    brush.hatch(7, 95, { rand: 0.06 });
    brush.beginShape(0.3);
    brush.vertex(bx - 25, by);
    brush.vertex(bx + 35, by);
    brush.vertex(bx + 30, by - 45);
    brush.vertex(bx - 20, by - 40);
    brush.endShape(true);
    brush.noHatch();
    brush.stroke(darkInk);

    // stems
    grassBlade(bx - 15, by, 190, -10, 0.3, 0.7, darkInk);
    grassBlade(bx, by, 210, 5, 0.28, 0.65, midInk);
    grassBlade(bx + 15, by, 200, 18, 0.32, 0.7, darkInk);
    grassBlade(bx + 28, by, 175, 28, 0.38, 0.55, lightInk);
    grassBlade(bx - 28, by, 160, -22, 0.4, 0.5, lightInk);

    // awned seed heads at tips
    awnedSeed(bx - 15 + (-10) * 0.5, by - 190, darkInk);
    awnedSeed(bx + 5 * 0.5, by - 210, midInk);
    awnedSeed(bx + 15 + 18 * 0.5, by - 200, darkInk);
    awnedSeed(bx + 28 + 28 * 0.5, by - 175, lightInk);

    // leaf blades
    leafBlade(bx - 5, by - 70, 60, -15, midInk);
    leafBlade(bx + 18, by - 90, 58, 20, lightInk);
  }

  // ---- CLUMP 3: center-right, mixed seed heads ----
  {
    let bx = 390, by = 555;

    brush.noStroke();
    brush.hatchStyle("2H", veryLight, 0.35);
    brush.hatch(8, 88, { rand: 0.07 });
    brush.beginShape(0.3);
    brush.vertex(bx - 22, by);
    brush.vertex(bx + 38, by);
    brush.vertex(bx + 32, by - 40);
    brush.vertex(bx - 18, by - 38);
    brush.endShape(true);
    brush.noHatch();
    brush.stroke(darkInk);

    grassBlade(bx - 12, by, 185, -14, 0.35, 0.65, midInk);
    grassBlade(bx + 2, by, 205, 4, 0.3, 0.7, darkInk);
    grassBlade(bx + 18, by, 195, 20, 0.33, 0.65, midInk);
    grassBlade(bx + 32, by, 170, 32, 0.4, 0.55, lightInk);
    grassBlade(bx - 25, by, 155, -25, 0.42, 0.5, lightInk);

    // mix drooping and awned
    droopingSeedHead(bx - 12 + (-14) * 0.55, by - 185, midInk);
    awnedSeed(bx + 2 + 4 * 0.5, by - 205, darkInk);
    droopingSeedHead(bx + 18 + 20 * 0.55, by - 195, midInk);
    awnedSeed(bx + 32 + 32 * 0.5, by - 170, lightInk);

    leafBlade(bx + 5, by - 65, 62, -18, midInk);
    leafBlade(bx + 22, by - 85, 55, 22, lightInk);
    leafBlade(bx - 10, by - 50, 50, -20, veryLight);
  }

  // ---- CLUMP 4: right side, shorter fine grasses ----
  {
    let bx = 510, by = 565;

    brush.noStroke();
    brush.hatchStyle("2H", veryLight, 0.3);
    brush.hatch(9, 92, { rand: 0.06 });
    brush.beginShape(0.3);
    brush.vertex(bx - 20, by);
    brush.vertex(bx + 30, by);
    brush.vertex(bx + 25, by - 35);
    brush.vertex(bx - 15, by - 32);
    brush.endShape(true);
    brush.noHatch();
    brush.stroke(darkInk);

    grassBlade(bx - 10, by, 165, -12, 0.38, 0.6, midInk);
    grassBlade(bx + 3, by, 180, 6, 0.32, 0.65, darkInk);
    grassBlade(bx + 16, by, 170, 18, 0.35, 0.6, midInk);
    grassBlade(bx + 28, by, 148, 26, 0.4, 0.5, lightInk);
    grassBlade(bx - 22, by, 140, -20, 0.42, 0.45, lightInk);

    seedHead(bx - 10 + (-12) * 0.5, by - 165, 10, midInk);
    seedHead(bx + 3 + 6 * 0.5, by - 180, 11, darkInk);
    droopingSeedHead(bx + 16 + 18 * 0.55, by - 170, midInk);
    seedHead(bx + 28 + 26 * 0.5, by - 148, 9, lightInk);

    leafBlade(bx + 5, by - 55, 52, -14, lightInk);
    leafBlade(bx + 20, by - 70, 48, 18, veryLight);
  }

  // ---- SCATTERED INDIVIDUAL STEMS across mid-ground ----
  {
    let scatterStems = [
      { x: 60, y: 540, len: 130, lean: -10, color: lightInk },
      { x: 165, y: 548, len: 145, lean: 8, color: veryLight },
      { x: 310, y: 545, len: 120, lean: -6, color: veryLight },
      { x: 460, y: 550, len: 135, lean: 14, color: lightInk },
      { x: 555, y: 540, len: 110, lean: -8, color: veryLight },
    ];
    for (let s of scatterStems) {
      grassBlade(s.x, s.y, s.len, s.lean, 0.3, 0.45, s.color);
      droopingSeedHead(s.x + s.lean * 0.55, s.y - s.len, s.color);
    }
  }

  // ---- FOREGROUND GROUND LINE: dense base hatching ----
  {
    brush.noStroke();
    brush.hatchStyle("2B", darkInk, 0.9);
    brush.hatch(3.5, 5, { rand: 0.1, continuous: true });
    brush.beginShape(0.3);
    brush.vertex(0, 600);
    brush.vertex(600, 600);
    brush.vertex(600, 570);
    brush.vertex(0, 570);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("HB", midInk, 0.6);
    brush.hatch(5, 175, { rand: 0.08, continuous: false });
    brush.beginShape(0.3);
    brush.vertex(0, 570);
    brush.vertex(600, 570);
    brush.vertex(600, 548);
    brush.vertex(0, 548);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("2H", lightInk, 0.4);
    brush.hatch(8, 10, { rand: 0.07 });
    brush.beginShape(0.3);
    brush.vertex(0, 548);
    brush.vertex(600, 548);
    brush.vertex(600, 530);
    brush.vertex(0, 530);
    brush.endShape(true);
    brush.noHatch();
    brush.stroke(darkInk);
  }

  // ---- BACKGROUND ATMOSPHERE: very faint distant grass suggestions ----
  {
    brush.set("2H", veryLight, 0.35);
    let bgStems = [
      [30, 500, 80, -5], [80, 510, 70, 6], [150, 495, 90, -8],
      [200, 505, 75, 10], [270, 498, 85, -4], [330, 508, 72, 7],
      [400, 500, 88, -9], [450, 510, 68, 12], [520, 495, 82, -6],
      [575, 505, 74, 8],
    ];
    for (let [x, y, len, lean] of bgStems) {
      let pts = [];
      for (let i = 0; i <= 5; i++) {
        let t = i / 5;
        pts.push([x + lean * t * t, y - t * len, map(t, 0, 1, 0.6, 0.05)]);
      }
      brush.spline(pts, 0.3);
    }
  }

  // ---- DETAIL: a few fine cross-hatch shadow zones mid-clump ----
  {
    // shadow under clump 2 body
    brush.noStroke();
    brush.hatchStyle("HB", midInk, 0.5);
    brush.hatch(5, 45, { rand: 0.05, continuous: false });
    brush.beginShape(0.35);
    brush.vertex(215, 560);
    brush.vertex(275, 560);
    brush.vertex(270, 510);
    brush.vertex(220, 512);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("2H", lightInk, 0.35);
    brush.hatch(7, 130, { rand: 0.06 });
    brush.beginShape(0.3);
    brush.vertex(215, 560);
    brush.vertex(275, 560);
    brush.vertex(270, 510);
    brush.vertex(220, 512);
    brush.endShape(true);
    brush.noHatch();
    brush.stroke(darkInk);
  }

  // ---- DETAIL: fine contour lines along some stems for roundness ----
  {
    brush.set("2H", veryLight, 0.3);
    // parallel line beside main stem of clump 1 center
    let pts1 = [];
    for (let i = 0; i <= 6; i++) {
      let t = i / 6;
      pts1.push([110 - 5 + (-8) * t * t + 3, 560 - t * 240, map(t, 0, 1, 0.5, 0.05)]);
    }
    brush.spline(pts1, 0.3);

    let pts2 = [];
    for (let i = 0; i <= 6; i++) {
      let t = i / 6;
      pts2.push([390 + 2 + 4 * t * t + 3, 555 - t * 205, map(t, 0, 1, 0.5, 0.05)]);
    }
    brush.spline(pts2, 0.3);
  }

  noLoop();
}