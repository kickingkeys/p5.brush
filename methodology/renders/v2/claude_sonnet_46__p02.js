let seed = 42;

function setup() {
  createCanvas(600, 600, WEBGL);
  randomSeed(seed);
  noiseSeed(seed);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Draw multiple grass stems with seed heads
  drawGrassScene();

  noLoop();
}

function drawGrassScene() {
  // Background subtle texture - very light hatching across canvas
  brush.hatchStyle("2H", "#aaa", 0.3);
  brush.hatch(28, 15, { rand: 0.08 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // === TALL GRASS STEMS ===
  // Main central tall grass
  drawGrassStem(310, 580, 290, 60, 0.6, "HB", "#222");
  drawGrassStem(275, 590, 260, 50, 0.5, "HB", "#333");
  drawGrassStem(340, 585, 295, 75, 0.55, "2B", "#1a1a1a");

  // Left cluster
  drawGrassStem(120, 595, 250, 40, 0.45, "HB", "#2a2a2a");
  drawGrassStem(95, 598, 235, 30, 0.4, "2H", "#444");
  drawGrassStem(148, 592, 265, 55, 0.5, "HB", "#333");
  drawGrassStem(70, 600, 220, 20, 0.35, "2H", "#555");

  // Right cluster
  drawGrassStem(470, 590, 255, 65, 0.5, "HB", "#2a2a2a");
  drawGrassStem(500, 595, 240, 50, 0.45, "2H", "#444");
  drawGrassStem(445, 592, 270, 70, 0.55, "2B", "#222");
  drawGrassStem(530, 598, 225, 35, 0.38, "2H", "#555");

  // Far background wispy stems
  drawGrassStem(200, 598, 220, 35, 0.3, "2H", "#777");
  drawGrassStem(390, 596, 230, 45, 0.32, "2H", "#666");
  drawGrassStem(560, 598, 210, 25, 0.28, "2H", "#888");
  drawGrassStem(40, 598, 200, 18, 0.25, "2H", "#999");

  // === SEED HEADS ===
  // Central prominent seed heads
  drawWheatHead(310, 295, 55, 12, "HB", "#222");
  drawWheatHead(275, 270, 50, 10, "HB", "#333");
  drawWheatHead(340, 305, 60, 13, "2B", "#1a1a1a");

  // Left cluster seed heads
  drawRoundSeedHead(120, 355, 18, "HB", "#2a2a2a");
  drawRoundSeedHead(95, 375, 14, "2H", "#444");
  drawWheatHead(148, 340, 42, 9, "HB", "#333");
  drawRoundSeedHead(70, 390, 11, "2H", "#555");

  // Right cluster seed heads
  drawWheatHead(470, 350, 48, 10, "HB", "#2a2a2a");
  drawRoundSeedHead(500, 370, 16, "2H", "#444");
  drawWheatHead(445, 335, 52, 11, "2B", "#222");
  drawRoundSeedHead(530, 385, 12, "2H", "#555");

  // Background seed heads (smaller, fainter)
  drawRoundSeedHead(200, 390, 9, "2H", "#777");
  drawRoundSeedHead(390, 378, 10, "2H", "#666");
  drawRoundSeedHead(560, 400, 8, "2H", "#888");

  // === LEAF BLADES ===
  drawLeafBlade(300, 580, 130, 85, "HB", "#333");
  drawLeafBlade(280, 575, 120, 95, "2H", "#555");
  drawLeafBlade(330, 578, 110, 70, "HB", "#444");
  drawLeafBlade(140, 590, 90, 80, "2H", "#555");
  drawLeafBlade(460, 588, 100, 75, "HB", "#444");
  drawLeafBlade(490, 592, 85, 65, "2H", "#666");

  // === TONAL SHADING on ground area ===
  brush.hatchStyle("2B", "#333", 0.8);
  brush.hatch(6, 90, { rand: 0.12, gradient: 0.4 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(0, 560);
  brush.vertex(600, 560);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Medium ground shadow
  brush.hatchStyle("HB", "#555", 0.5);
  brush.hatch(10, 85, { rand: 0.1, gradient: 0.3 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(0, 540);
  brush.vertex(600, 540);
  brush.vertex(600, 570);
  brush.vertex(0, 570);
  brush.endShape(true);
  brush.noHatch();

  // === SCATTERED FINE DETAILS ===
  drawScatteredSeeds();
  drawFineDetails();
}

function drawGrassStem(baseX, baseY, tipY, tipOffsetX, weight, brushName, col) {
  // Organic curved grass stem using spline
  let tipX = baseX + tipOffsetX * (random() > 0.5 ? 1 : -1) * random(0.6, 1.0);
  let midX = baseX + (tipX - baseX) * 0.4 + random(-8, 8);
  let midY = lerp(baseY, tipY, 0.5);
  let mid2X = baseX + (tipX - baseX) * 0.7 + random(-5, 5);
  let mid2Y = lerp(baseY, tipY, 0.75);

  brush.set(brushName, col, weight);
  brush.spline(
    [
      [baseX + random(-3, 3), baseY],
      [baseX + random(-5, 5), lerp(baseY, tipY, 0.25)],
      [midX, midY],
      [mid2X, mid2Y],
      [tipX + random(-3, 3), tipY + random(-5, 5)],
    ],
    0.35
  );
}

function drawWheatHead(cx, tipY, length, numSpikelets, brushName, col) {
  // Elongated wheat/grass seed head with spikelets
  let baseY = tipY + length;

  // Central rachis
  brush.set(brushName, col, 0.6);
  brush.spline(
    [
      [cx, baseY],
      [cx + random(-2, 2), lerp(baseY, tipY, 0.4)],
      [cx + random(-2, 2), lerp(baseY, tipY, 0.7)],
      [cx, tipY],
    ],
    0.2
  );

  // Spikelets along the rachis
  let spacing = length / numSpikelets;
  for (let i = 0; i < numSpikelets; i++) {
    let t = i / (numSpikelets - 1);
    let y = baseY - t * length;
    let x = cx + sin(t * PI * 2) * 2;
    let spikeletLen = map(t, 0, 1, 10, 16) * (1 - t * 0.3);
    let side = i % 2 === 0 ? 1 : -1;

    brush.set(brushName, col, 0.4);
    // Spikelet branch
    brush.line(x, y, x + side * spikeletLen * 0.7, y - spikeletLen * 0.3);

    // Awn (long bristle from spikelet tip)
    let awnLen = spikeletLen * 1.2;
    brush.set("2H", col, 0.25);
    brush.line(
      x + side * spikeletLen * 0.7,
      y - spikeletLen * 0.3,
      x + side * spikeletLen * 0.7 + side * 3,
      y - spikeletLen * 0.3 - awnLen
    );
  }

  // Hatch shading on seed head body
  brush.hatchStyle("2H", col, 0.3);
  brush.hatch(4, 45, { rand: 0.1 });
  brush.noStroke();
  brush.beginShape(0.2);
  for (let i = 0; i <= 12; i++) {
    let t = i / 12;
    let y = baseY - t * length;
    let halfW = map(t, 0, 1, 3, 8) * (1 - pow(t - 0.5, 2) * 2);
    if (i === 0 || i === 12) {
      brush.vertex(cx, y);
    } else {
      brush.vertex(cx + halfW * sin(t * PI), y);
    }
  }
  brush.endShape(true);
  brush.noHatch();
}

function drawRoundSeedHead(cx, cy, radius, brushName, col) {
  // Round/oval seed head (like meadow grass or ryegrass)
  brush.set(brushName, col, 0.5);
  brush.noFill();

  // Outline
  brush.beginShape(0.5);
  for (let i = 0; i <= 20; i++) {
    let a = (i / 20) * TWO_PI;
    let rx = radius * (0.7 + noise(cos(a) * 0.3 + cx * 0.01, sin(a) * 0.3 + cy * 0.01) * 0.4);
    let ry = radius * 1.3 * (0.8 + noise(cos(a) * 0.2 + cy * 0.01, sin(a) * 0.2) * 0.3);
    brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
  }
  brush.endShape(true);

  // Internal hatching for tone
  brush.hatchStyle("2H", col, 0.3);
  brush.hatch(3, 30, { rand: 0.08 });
  brush.noStroke();
  brush.beginShape(0.4);
  for (let i = 0; i <= 20; i++) {
    let a = (i / 20) * TWO_PI;
    let rx = radius * 0.8;
    let ry = radius * 1.1;
    brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // Radiating fine lines (seeds/florets)
  brush.set("2H", col, 0.2);
  for (let i = 0; i < 12; i++) {
    let a = (i / 12) * TWO_PI + random(-0.1, 0.1);
    let r1 = radius * 0.6;
    let r2 = radius * 1.1 + random(2, 5);
    brush.line(
      cx + cos(a) * r1,
      cy + sin(a) * r1,
      cx + cos(a) * r2,
      cy + sin(a) * r2
    );
  }
}

function drawLeafBlade(baseX, baseY, length, curveX, brushName, col) {
  // Long curving leaf blade
  let tipX = baseX + curveX * (random() > 0.5 ? 1 : -1);
  let tipY = baseY - length;

  brush.set(brushName, col, 0.4);
  brush.spline(
    [
      [baseX, baseY],
      [baseX + (tipX - baseX) * 0.3 + random(-5, 5), baseY - length * 0.35],
      [baseX + (tipX - baseX) * 0.6 + random(-5, 5), baseY - length * 0.65],
      [tipX, tipY],
    ],
    0.4
  );

  // Midrib
  brush.set("2H", col, 0.2);
  brush.spline(
    [
      [baseX + 1, baseY],
      [baseX + (tipX - baseX) * 0.3 + 1, baseY - length * 0.35],
      [baseX + (tipX - baseX) * 0.6 + 1, baseY - length * 0.65],
      [tipX + 1, tipY],
    ],
    0.3
  );
}

function drawScatteredSeeds() {
  // Small individual seeds scattered near base
  brush.set("2H", "#555", 0.25);
  for (let i = 0; i < 30; i++) {
    let x = random(30, 570);
    let y = random(520, 598);
    let len = random(3, 8);
    let a = random(-30, 30);
    brush.line(x, y, x + cos(radians(a)) * len, y - sin(radians(a)) * len);
  }

  // Tiny dot seeds
  brush.set("HB", "#333", 0.3);
  for (let i = 0; i < 20; i++) {
    let x = random(50, 550);
    let y = random(530, 595);
    brush.line(x, y, x + random(-1, 1), y + random(-1, 1));
  }
}

function drawFineDetails() {
  // Fine cross-hatching in shadow areas around base of stems
  brush.hatchStyle("2B", "#222", 0.5);
  brush.hatch(5, 60, { rand: 0.1 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(220, 575);
  brush.vertex(390, 575);
  brush.vertex(380, 600);
  brush.vertex(230, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#444", 0.4);
  brush.hatch(7, 120, { rand: 0.09 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(60, 580);
  brush.vertex(180, 580);
  brush.vertex(170, 600);
  brush.vertex(50, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#444", 0.4);
  brush.hatch(7, 115, { rand: 0.09 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(420, 580);
  brush.vertex(560, 580);
  brush.vertex(555, 600);
  brush.vertex(415, 600);
  brush.endShape(true);
  brush.noHatch();

  // A few stray fine lines suggesting distant grass
  brush.set("2H", "#888", 0.2);
  for (let i = 0; i < 8; i++) {
    let x = random(0, 600);
    let y = random(480, 560);
    let len = random(20, 50);
    brush.spline(
      [
        [x, y],
        [x + random(-5, 5), y - len * 0.4],
        [x + random(-8, 8), y - len * 0.75],
        [x + random(-10, 10), y - len],
      ],
      0.3
    );
  }

  // Unfinished edge suggestion — fading lines at canvas edges
  brush.set("2H", "#bbb", 0.2);
  for (let i = 0; i < 12; i++) {
    let x = random(0, 80);
    let y = random(200, 580);
    brush.line(x, y, x + random(5, 25), y + random(-10, 10));
  }
  for (let i = 0; i < 12; i++) {
    let x = random(520, 600);
    let y = random(200, 580);
    brush.line(x, y, x - random(5, 25), y + random(-10, 10));
  }
  for (let i = 0; i < 8; i++) {
    let x = random(100, 500);
    let y = random(0, 60);
    brush.line(x, y, x + random(-10, 10), y + random(5, 20));
  }
}