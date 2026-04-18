function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(99);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Sky / background atmosphere — very light horizontal hatch
  brush.hatchStyle("2H", "#cccccc", 0.3);
  brush.hatch(18, 0, { rand: 0.08, continuous: false, gradient: 0.2 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 250);
  brush.vertex(0, 250);
  brush.endShape(true);
  brush.noHatch();

  // Forest floor — dense dark horizontal hatch at the bottom
  brush.hatchStyle("2B", "#111", 1.2);
  brush.hatch(3, 0, { rand: 0.12, continuous: true, gradient: 0.3 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 520);
  brush.vertex(600, 520);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Undergrowth layer — tangled diagonal hatch
  brush.hatchStyle("HB", "#333", 0.8);
  brush.hatch(5, 55, { rand: 0.18, continuous: true, gradient: 0.4 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 460);
  brush.vertex(600, 460);
  brush.vertex(600, 560);
  brush.vertex(0, 560);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#222", 0.5);
  brush.hatch(4, 125, { rand: 0.14, continuous: false, gradient: 0.2 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 460);
  brush.vertex(600, 460);
  brush.vertex(600, 560);
  brush.vertex(0, 560);
  brush.endShape(true);
  brush.noHatch();

  // Define tree trunks
  let trunks = [
    { x: 55,  topY: 60,  botY: 530, w: 18 },
    { x: 115, topY: 30,  botY: 540, w: 24 },
    { x: 175, topY: 80,  botY: 525, w: 14 },
    { x: 230, topY: 20,  botY: 535, w: 30 },
    { x: 290, topY: 55,  botY: 530, w: 16 },
    { x: 345, topY: 10,  botY: 540, w: 26 },
    { x: 400, topY: 70,  botY: 528, w: 20 },
    { x: 455, topY: 40,  botY: 535, w: 22 },
    { x: 510, topY: 25,  botY: 530, w: 28 },
    { x: 560, topY: 65,  botY: 525, w: 15 },
    { x: 85,  topY: 90,  botY: 520, w: 10 },
    { x: 150, topY: 110, botY: 515, w: 8  },
    { x: 265, topY: 100, botY: 518, w: 9  },
    { x: 375, topY: 95,  botY: 520, w: 11 },
    { x: 480, topY: 85,  botY: 522, w: 10 },
    { x: 530, topY: 105, botY: 516, w: 7  },
  ];

  // Draw each trunk with vertical hatch + cross-hatch for shadow
  for (let t of trunks) {
    let hw = t.w / 2;
    let pts = [
      [t.x - hw, t.topY],
      [t.x + hw, t.topY],
      [t.x + hw, t.botY],
      [t.x - hw, t.botY],
    ];

    // Vertical grain lines
    brush.hatchStyle("rotring", "#111", 0.4);
    brush.hatch(2, 90, { rand: 0.04, continuous: true, gradient: 0.0 });
    brush.noStroke();
    brush.noFill();
    brush.beginShape(0);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    // Shadow side — diagonal cross-hatch on right third of trunk
    let shadowPts = [
      [t.x + hw * 0.2, t.topY],
      [t.x + hw,       t.topY],
      [t.x + hw,       t.botY],
      [t.x + hw * 0.2, t.botY],
    ];
    brush.hatchStyle("2B", "#000", 0.7);
    brush.hatch(2.5, 45, { rand: 0.05, continuous: false });
    brush.noStroke();
    brush.noFill();
    brush.beginShape(0);
    for (let p of shadowPts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    // Trunk outline — pen
    brush.set("pen", "#111", 1.0);
    brush.noFill();
    brush.noHatch();
    brush.beginShape(0.05);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noStroke();
  }

  // Canopy zone — interlocked diagonal hatching to suggest foliage masses
  // Layer 1: 45 degrees, medium spacing
  brush.hatchStyle("HB", "#222", 0.7);
  brush.hatch(6, 45, { rand: 0.1, continuous: false, gradient: 0.3 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 280);
  brush.vertex(0, 280);
  brush.endShape(true);
  brush.noHatch();

  // Layer 2: 135 degrees, slightly denser — cross-hatches with layer 1
  brush.hatchStyle("rotring", "#333", 0.5);
  brush.hatch(8, 135, { rand: 0.12, continuous: false, gradient: 0.4 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 240);
  brush.vertex(0, 240);
  brush.endShape(true);
  brush.noHatch();

  // Layer 3: nearly horizontal, very light for top-of-canopy glow
  brush.hatchStyle("2H", "#555", 0.35);
  brush.hatch(12, 10, { rand: 0.06, continuous: false, gradient: 0.5 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 160);
  brush.vertex(0, 160);
  brush.endShape(true);
  brush.noHatch();

  // Mid-canopy dark pockets — dense 2B patches between trunks
  let darkPatches = [
    [[30, 120], [130, 120], [130, 300], [30, 300]],
    [[140, 80],  [240, 80],  [240, 280], [140, 280]],
    [[250, 100], [340, 100], [340, 290], [250, 290]],
    [[355, 60],  [440, 60],  [440, 270], [355, 270]],
    [[450, 90],  [540, 90],  [540, 285], [450, 285]],
    [[545, 70],  [600, 70],  [600, 275], [545, 275]],
    [[0,   80],  [60,  80],  [60,  260], [0,   260]],
  ];

  for (let patch of darkPatches) {
    brush.hatchStyle("2B", "#111", 1.0);
    brush.hatch(3, 60, { rand: 0.1, continuous: true, gradient: 0.2 });
    brush.noStroke();
    brush.noFill();
    brush.beginShape(0);
    for (let p of patch) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("HB", "#222", 0.6);
    brush.hatch(4, 150, { rand: 0.08, continuous: false });
    brush.noStroke();
    brush.noFill();
    brush.beginShape(0);
    for (let p of patch) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  // Undergrowth detail — small vertical strokes suggesting grass/roots
  brush.set("pen", "#222", 0.6);
  for (let i = 0; i < 80; i++) {
    let gx = random(0, 600);
    let gy = random(490, 545);
    let gh = random(10, 40);
    brush.line(gx, gy, gx + random(-4, 4), gy - gh);
  }
  brush.noStroke();

  // Thin branch lines radiating from upper trunks into canopy
  brush.set("rotring", "#111", 0.5);
  for (let t of trunks) {
    let numBranches = floor(random(2, 6));
    for (let b = 0; b < numBranches; b++) {
      let bx = t.x + random(-t.w, t.w);
      let by = t.topY + random(20, 80);
      let bAngle = random(100, 170);
      let bLen = random(30, 100);
      let ex = bx + cos(bAngle) * bLen;
      let ey = by - sin(bAngle) * bLen;
      brush.line(bx, by, ex, ey);

      // Sub-branch
      if (random() > 0.5) {
        let sAngle = bAngle + random(-30, 30);
        let sLen = bLen * random(0.3, 0.6);
        let sx = ex + cos(sAngle) * sLen;
        let sy = ey - sin(sAngle) * sLen;
        brush.line(ex, ey, sx, sy);
      }
    }
  }
  brush.noStroke();

  // Root flares at base of large trunks
  brush.set("2B", "#111", 1.0);
  for (let t of trunks) {
    if (t.w >= 14) {
      let numRoots = floor(random(2, 5));
      for (let r = 0; r < numRoots; r++) {
        let rx = t.x + random(-t.w * 1.5, t.w * 1.5);
        let ry = t.botY - random(5, 25);
        brush.line(t.x, t.botY - 10, rx, ry + random(10, 35));
      }
    }
  }
  brush.noStroke();

  // Final overlay: very sparse wide-spaced horizontal lines across full canvas
  // to unify the composition into a single woven fabric
  brush.hatchStyle("2H", "#888", 0.25);
  brush.hatch(30, 0, { rand: 0.05, continuous: false, gradient: 0.6 });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}