let seedHeads = [];
let grassBlades = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");

  randomSeed(42);
  noiseSeed(42);

  // Define grass blade clusters
  grassBlades = [
    { x: 80,  baseY: 580, count: 7,  heightRange: [180, 280], lean: -0.15 },
    { x: 160, baseY: 590, count: 5,  heightRange: [150, 240], lean: 0.08  },
    { x: 260, baseY: 585, count: 8,  heightRange: [200, 320], lean: -0.05 },
    { x: 370, baseY: 592, count: 6,  heightRange: [160, 260], lean: 0.12  },
    { x: 460, baseY: 588, count: 7,  heightRange: [180, 300], lean: -0.1  },
    { x: 540, baseY, count: 5,  heightRange: [140, 220], lean: 0.18  },
  ];

  // Define seed head positions
  seedHeads = [
    { x: 110, y: 190, type: "round",    size: 18, angle: -8  },
    { x: 195, y: 260, type: "elongated",size: 22, angle: 5   },
    { x: 280, y: 155, type: "spike",    size: 28, angle: -3  },
    { x: 345, y: 230, type: "round",    size: 14, angle: 12  },
    { x: 420, y: 175, type: "elongated",size: 20, angle: -6  },
    { x: 490, y: 245, type: "spike",    size: 26, angle: 4   },
    { x: 155, y: 330, type: "spike",    size: 16, angle: -10 },
    { x: 510, y: 320, type: "round",    size: 12, angle: 8   },
    { x: 60,  y: 310, type: "elongated",size: 18, angle: 3   },
    { x: 570, baseY: 590, count: 5, heightRange: [140, 220], lean: 0.18 },
  ];
}

function draw() {
  translate(-width / 2, -height / 2);

  drawGroundShadow();
  drawGrassBlades();
  drawSeedHeads();
  drawDetailAccents();
  drawScatteredSeeds();

  noLoop();
}

function drawGroundShadow() {
  // Light hatching at the base to suggest ground
  brush.hatchStyle("2H", "#aaa", 0.4);
  brush.hatch(14, 10, { rand: 0.08, continuous: false });
  brush.noStroke();
  brush.noFill();
  brush.beginShape(0);
  brush.vertex(30,  570);
  brush.vertex(570, 570);
  brush.vertex(570, 600);
  brush.vertex(30,  600);
  brush.endShape(true);
  brush.noHatch();
}

function drawGrassBlades() {
  let clusters = [
    { x: 80,  baseY: 582, count: 7, heightRange: [180, 280], lean: -0.15 },
    { x: 160, baseY: 590, count: 5, heightRange: [150, 240], lean: 0.08  },
    { x: 260, baseY: 585, count: 8, heightRange: [200, 320], lean: -0.05 },
    { x: 370, baseY: 592, count: 6, heightRange: [160, 260], lean: 0.12  },
    { x: 460, baseY: 588, count: 7, heightRange: [180, 300], lean: -0.1  },
    { x: 540, baseY: 590, count: 5, heightRange: [140, 220], lean: 0.18  },
  ];

  for (let cluster of clusters) {
    for (let i = 0; i < cluster.count; i++) {
      let bx    = cluster.x + random(-28, 28);
      let by    = cluster.baseY + random(-6, 6);
      let h     = random(cluster.heightRange[0], cluster.heightRange[1]);
      let lean  = cluster.lean + random(-0.12, 0.12);
      let tipX  = bx + lean * h + random(-12, 12);
      let tipY  = by - h;

      // Control points for gentle S-curve
      let cp1x = bx + lean * h * 0.3 + random(-8, 8);
      let cp1y = by - h * 0.35;
      let cp2x = bx + lean * h * 0.65 + random(-10, 10);
      let cp2y = by - h * 0.7;

      // Choose brush by blade width / importance
      let brushChoice, wt;
      let r = random();
      if (r < 0.3) {
        brushChoice = "HB"; wt = random(0.5, 0.9);
      } else if (r < 0.65) {
        brushChoice = "2H"; wt = random(0.35, 0.65);
      } else {
        brushChoice = "2B"; wt = random(0.6, 1.0);
      }

      let darkness = floor(random(2, 5)) * 30;
      let col = "#" + hex(darkness, 2) + hex(darkness, 2) + hex(darkness, 2);

      brush.set(brushChoice, col, wt);
      brush.spline(
        [
          [bx,   by,   0.9],
          [cp1x, cp1y, 0.75],
          [cp2x, cp2y, 0.5],
          [tipX, tipY, 0.1],
        ],
        0.45
      );

      // Occasional second parallel blade for density
      if (random() < 0.35) {
        let ox = random(-3, 3);
        brush.set("2H", "#666", random(0.3, 0.55));
        brush.spline(
          [
            [bx + ox,   by,   0.7],
            [cp1x + ox, cp1y, 0.55],
            [cp2x + ox, cp2y, 0.35],
            [tipX + ox, tipY, 0.05],
          ],
          0.4
        );
      }
    }
  }
}

function drawSeedHeads() {
  let heads = [
    { x: 108, y: 192, type: "round",    size: 18, stemAngle: -8  },
    { x: 198, y: 255, type: "elongated",size: 22, stemAngle: 5   },
    { x: 278, y: 158, type: "spike",    size: 28, stemAngle: -3  },
    { x: 348, y: 228, type: "round",    size: 14, stemAngle: 12  },
    { x: 422, y: 178, type: "elongated",size: 20, stemAngle: -6  },
    { x: 488, y: 248, type: "spike",    size: 26, stemAngle: 4   },
    { x: 158, y: 332, type: "spike",    size: 16, stemAngle: -10 },
    { x: 512, y: 318, type: "round",    size: 12, stemAngle: 8   },
    { x: 62,  y: 312, type: "elongated",size: 18, stemAngle: 3   },
    { x: 330, y: 310, type: "round",    size: 10, stemAngle: -5  },
    { x: 240, y: 290, type: "elongated",size: 14, stemAngle: 7   },
  ];

  for (let h of heads) {
    if (h.type === "round")     drawRoundSeedHead(h.x, h.y, h.size, h.stemAngle);
    if (h.type === "elongated") drawElongatedSeedHead(h.x, h.y, h.size, h.stemAngle);
    if (h.type === "spike")     drawSpikeSeedHead(h.x, h.y, h.size, h.stemAngle);
  }
}

function drawRoundSeedHead(x, y, sz, ang) {
  push();
  translate(x, y);
  rotate(radians(ang));
  translate(-x, -y);

  // Outline
  brush.set("HB", "#222", 0.7);
  let pts = [];
  for (let i = 0; i < 28; i++) {
    let a = (i / 28) * TWO_PI;
    let r = sz * (0.85 + noise(cos(a) * 0.4 + x * 0.01, sin(a) * 0.4 + y * 0.01) * 0.3);
    pts.push([x + cos(a) * r, y + sin(a) * r]);
  }
  brush.beginShape(0.5);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  // Interior hatching — light tone
  brush.noStroke();
  brush.hatchStyle("2H", "#555", 0.4);
  brush.hatch(sz * 0.45, 40 + ang, { rand: 0.06 });
  brush.beginShape(0.4);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Shadow hatching
  brush.hatchStyle("HB", "#333", 0.55);
  brush.hatch(sz * 0.3, 125 + ang, { rand: 0.05 });
  let shadowPts = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * TWO_PI;
    let r = sz * 0.55 * (0.9 + noise(cos(a) * 0.3 + x * 0.01 + 5, sin(a) * 0.3) * 0.2);
    shadowPts.push([x + cos(a) * r + sz * 0.18, y + sin(a) * r + sz * 0.12]);
  }
  brush.beginShape(0.4);
  for (let p of shadowPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Small radiating lines (seeds)
  brush.set("2H", "#444", 0.4);
  for (let i = 0; i < 12; i++) {
    let a = (i / 12) * TWO_PI + random(-0.15, 0.15);
    let r0 = sz * 0.82;
    let r1 = sz * (1.0 + random(0.1, 0.35));
    brush.line(x + cos(a) * r0, y + sin(a) * r0, x + cos(a) * r1, y + sin(a) * r1);
  }

  pop();
}

function drawElongatedSeedHead(x, y, sz, ang) {
  push();
  translate(x, y);
  rotate(radians(ang));
  translate(-x, -y);

  let halfH = sz * 1.6;
  let halfW = sz * 0.38;

  // Build elongated outline with noise
  let pts = [];
  let steps = 30;
  // Right side top to bottom
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let ey = y - halfH + t * halfH * 2;
    let ex = x + halfW * sin(t * PI) * (0.9 + noise(t * 3 + x * 0.01) * 0.2);
    pts.push([ex, ey]);
  }
  // Left side bottom to top
  for (let i = steps; i >= 0; i--) {
    let t = i / steps;
    let ey = y - halfH + t * halfH * 2;
    let ex = x - halfW * sin(t * PI) * (0.9 + noise(t * 3 + x * 0.01 + 10) * 0.2);
    pts.push([ex, ey]);
  }

  brush.set("HB", "#222", 0.65);
  brush.beginShape(0.4);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  // Parallel interior lines
  brush.hatchStyle("2H", "#555", 0.35);
  brush.hatch(sz * 0.38, 0, { rand: 0.04, continuous: true });
  brush.beginShape(0.35);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Shadow side
  brush.hatchStyle("HB", "#333", 0.5);
  brush.hatch(sz * 0.28, 90, { rand: 0.05 });
  let shadowPts = [];
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let ey = y - halfH * 0.85 + t * halfH * 1.7;
    let ex = x + halfW * 0.45 * sin(t * PI) * (0.85 + noise(t * 3 + x * 0.01 + 20) * 0.15);
    shadowPts.push([ex, ey]);
  }
  for (let i = steps; i >= 0; i--) {
    let t = i / steps;
    let ey = y - halfH * 0.85 + t * halfH * 1.7;
    let ex = x + halfW * 0.05 * sin(t * PI);
    shadowPts.push([ex, ey]);
  }
  brush.beginShape(0.3);
  for (let p of shadowPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  // Scale-like texture lines across the head
  brush.set("2H", "#555", 0.3);
  let scaleCount = floor(halfH * 0.4);
  for (let i = 0; i < scaleCount; i++) {
    let t  = (i + 0.5) / scaleCount;
    let ey = y - halfH + t * halfH * 2;
    let ew = halfW * sin(t * PI) * 0.9;
    brush.line(x - ew, ey, x + ew, ey);
  }

  pop();
}

function drawSpikeSeedHead(x, y, sz, ang) {
  push();
  translate(x, y);
  rotate(radians(ang));
  translate(-x, -y);

  let spikeCount = floor(random(6, 10));
  let headH      = sz * 2.2;

  // Central stem of spike head
  brush.set("HB", "#222", 0.7);
  brush.spline(
    [
      [x, y + sz * 0.3,  0.8],
      [x, y - headH * 0.4, 0.6],
      [x, y - headH,     0.3],
    ],
    0.2
  );

  // Individual spikelets radiating from central axis
  for (let i = 0; i < spikeCount; i++) {
    let t  = i / (spikeCount - 1);
    let sy = y - headH * t;
    let side   = (i % 2 === 0) ? 1 : -1;
    let sLen   = sz * (0.5 + sin(t * PI) * 0.7) * random(0.8, 1.2);
    let sAngle = side * random(28, 48);
    let ex     = x + cos(radians(sAngle - 90)) * sLen;
    let ey     = sy + sin(radians(sAngle - 90)) * sLen;

    brush.set("HB", "#333", 0.5);
    brush.spline([[x, sy, 0.6], [ex, ey, 0.1]], 0.15);

    // Tiny awns at tip
    if (random() < 0.6) {
      brush.set("2H", "#555", 0.3);
      let awnLen = sz * random(0.3, 0.6);
      let awnAng = sAngle + random(-15, 15);
      brush.line(ex, ey,
        ex + cos(radians(awnAng - 90)) * awnLen,
        ey + sin(radians(awnAng - 90)) * awnLen);
    }

    // Small spikelet body hatching
    if (sLen > sz * 0.6) {
      let midX = (x + ex) * 0.5;
      let midY = (sy + ey) * 0.5;
      brush.set("2H", "#666", 0.3);
      let bw = sz * 0.12;
      for (let j = 0; j < 3; j++) {
        let jt  = (j + 1) / 4;
        let jx  = lerp(x, ex, jt);
        let jy  = lerp(sy, ey, jt);
        let perp = radians(sAngle);
        brush.line(jx - cos(perp) * bw, jy - sin(perp) * bw,
                   jx + cos(perp) * bw, jy + sin(perp) * bw);
      }
    }
  }

  // Hatch the base of the spike head
  brush.hatchStyle("2H", "#444", 0.4);
  brush.hatch(sz * 0.35, 80 + ang, { rand: 0.06 });
  let basePts = [];
  let bSteps  = 16;
  for (let i = 0; i <= bSteps; i++) {
    let t  = i / bSteps;
    let a  = t * TWO_PI;
    let r  = sz * 0.4 * (0.8 + noise(cos(a) * 0.3 + x * 0.01, sin(a) * 0.3) * 0.25);
    basePts.push([x + cos(a) * r, (y + sz * 0.1) + sin(a) * r * 0.5]);
  }
  brush.beginShape(0.4);
  for (let p of basePts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  pop();
}

function drawDetailAccents() {
  // Fine node marks on some stems
  brush.set("HB", "#333", 0.55);
  let nodePositions = [
    [95,  430], [270, 380], [140, 460], [390, 400],
    [470, 420], [210, 500], [330, 470], [530, 450],
  ];
  for (let [nx, ny] of nodePositions) {
    brush.line(nx - 4, ny, nx + 4, ny);
  }

  // Leaf blades — narrow elongated shapes
  let leaves = [
    { x: 130, y: 480, w: 5,  h: 60,  ang: -25 },
    { x: 290, y: 460, w: 4,  h: 50,  ang: 18  },
    { x: 200, y: 520, w: 6,  h: 45,  ang: -10 },
    { x: 400, y: 490, w: 5,  h: 55,  ang: 22  },
    { x: 480, y: 510, w: 4,  h: 40,  ang: -18 },
    { x: 60,  y: 500, w: 5,  h: 48,  ang: 8   },
    { x: 550, y: 495, w: 4,  h: 42,  ang: -12 },
  ];

  for (let lf of leaves) {
    push();
    translate(lf.x, lf.y);
    rotate(radians(lf.ang));
    translate(-lf.x, -lf.y);

    brush.set("2H", "#444", 0.4);
    let lpts = [
      [lf.x,          lf.y],
      [lf.x + lf.w,   lf.y - lf.h * 0.3],
      [lf.x + lf.w * 0.5, lf.y - lf.h],
      [lf.x - lf.w * 0.5, lf.y - lf.h * 0.3],
    ];
    brush.beginShape(0.45);
    for (let p of lpts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    // Central vein
    brush.set("2H", "#555", 0.3);
    brush.line(lf.x, lf.y, lf.x, lf.y - lf.h);
    pop();
  }

  // A few faint background hatching patches for tonal depth
  let patches = [
    { x: 50,  y: 350, w: 80,  h: 120, ang: 35  },
    { x: 480, y: 380, w: 70,  h: 100, ang: 150 },
    { x: 240, y: 420, w: 90,  h: 80,  ang: 60  },
  ];

  for (let p of patches) {
    brush.hatchStyle("2H", "#bbb", 0.3);
    brush.hatch(12, p.ang, { rand: 0.1 });
    brush.noStroke();
    brush.noFill();
    brush.beginShape(0);
    brush.vertex(p.x,         p.y);
    brush.vertex(p.x + p.w,   p.y);
    brush.vertex(p.x + p.w,   p.y + p.h);
    brush.vertex(p.x,         p.y + p.h);
    brush.endShape(true);
    brush.noHatch();
  }
}

function drawScatteredSeeds() {
  // Tiny floating seeds / fragments for unfinished botanical feel
  brush.set("2H", "#555", 0.35);
  let seeds = [];
  for (let i = 0; i < 30; i++) {
    seeds.push({
      x: random(40, 560),
      y: random(80, 540),
      len: random(4, 14),
      ang: random(360),
    });
  }
  for (let s of seeds) {
    if (random() < 0.5) {
      // Simple dash
      let ex = s.x + cos(radians(s.ang)) * s.len;
      let ey = s.y + sin(radians(s.ang)) * s.len;
      brush.line(s.x, s.y, ex, ey);
    } else {
      // Tiny oval seed
      brush.set("HB", "#444", 0.4);
      let spts = [];
      for (let j = 0; j < 10; j++) {
        let a = (j / 10) * TWO_PI;
        spts.push([s.x + cos(a) * s.len * 0.35, s.y + sin(a) * s.len * 0.18]);
      }
      brush.beginShape(0.5);
      for (let p of spts) brush.vertex(p[0], p[1]);
      brush.endShape(true);
    }
  }

  // Faint partial outlines — unfinished edges
  brush.set("2H", "#aaa", 0.3);
  brush.spline(
    [[10, 200], [40, 240], [25, 280], [50, 320]],
    0.4
  );
  brush.spline(
    [[560, 150], [575, 200], [555, 250]],
    0.35
  );
}