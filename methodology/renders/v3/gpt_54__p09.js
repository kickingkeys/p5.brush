function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(17);
  noiseSeed(17);

  // soft rainy sky wash
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.fillTexture(0.7, 0.35);
  brush.fillBleed(0.45, "out");

  let skyCols = ["#1a2340", "#20304f", "#2b2b56", "#17314f"];
  for (let i = 0; i < 9; i++) {
    let cx = random(80, 520);
    let cy = random(40, 250);
    let rx = random(120, 220);
    let ry = random(70, 150);
    brush.fill(random(skyCols), random(28, 52));
    watercolorBlob(cx, cy, rx, ry, 28, 0.42);
  }

  // distant architecture blocks, soft and wet
  let bcols = ["#20263b", "#2a2942", "#24324a", "#342843"];
  for (let i = 0; i < 8; i++) {
    let x = i * 78 + random(-10, 10);
    let w = random(55, 95);
    let h = random(150, 290);
    brush.fill(random(bcols), random(26, 44));
    brush.fillBleed(0.28, "out");
    brush.beginShape(0.25);
    brush.vertex(x, 300 + random(-8, 8));
    brush.vertex(x + w * 0.15, 300 - h * 0.45);
    brush.vertex(x + w * 0.35, 300 - h);
    brush.vertex(x + w * 0.7, 300 - h * 0.9);
    brush.vertex(x + w, 300 + random(-8, 8));
    brush.endShape(true);
  }

  // wet vertical rain veils in the air
  brush.noFill();
  brush.wiggle(1.5);
  brush.set("2H", "#6e7f95", 0.32);
  for (let i = 0; i < 140; i++) {
    let x = random(0, 600);
    let y1 = random(20, 370);
    let len = random(20, 70);
    brush.line(x, y1, x + random(-6, 6), y1 + len);
  }
  brush.noField();

  // deep street/pavement watercolor base
  brush.noStroke();
  brush.fillTexture(0.82, 0.45);
  brush.fill("#2a2e45", 92);
  brush.fillBleed(0.34, "out");
  brush.beginShape(0.38);
  brush.vertex(0, 360);
  brush.vertex(600, 360);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // perspective street canyon
  brush.fill("#1e2236", 70);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.22);
  brush.vertex(125, 360);
  brush.vertex(475, 360);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // central roadway sheen
  brush.fill("#3a3e58", 54);
  brush.fillBleed(0.42, "out");
  brush.beginShape(0.28);
  brush.vertex(255, 360);
  brush.vertex(345, 360);
  brush.vertex(405, 600);
  brush.vertex(195, 600);
  brush.endShape(true);

  // neon watercolor under-blooms
  let neonWater = ["#7e234d", "#124d78", "#7a4a0c", "#1d6a63"];
  for (let i = 0; i < 14; i++) {
    let x = random(50, 550);
    let y = random(250, 430);
    let rx = random(20, 55);
    let ry = random(30, 90);
    brush.fill(random(neonWater), random(22, 44));
    brush.fillBleed(random(0.35, 0.55), "out");
    watercolorBlob(x, y, rx, ry, 18, 0.35);
  }

  // marker neon signs on buildings
  brush.noStroke();
  let signData = [
    { x: 78, y: 170, w: 42, h: 95, c1: "#10b6d9", c2: "#37d6ff" },
    { x: 465, y: 150, w: 52, h: 115, c1: "#ff3e84", c2: "#ff78b1" },
    { x: 365, y: 190, w: 28, h: 82, c1: "#f09a22", c2: "#ffd05f" },
    { x: 145, y: 210, w: 34, h: 72, c1: "#18a87c", c2: "#54e0be" }
  ];

  for (let s of signData) {
    brush.wash(s.c1, 230);
    brush.rect(s.x, s.y, s.w, s.h, "corner");
    brush.wash(s.c2, 235);
    brush.rect(s.x + 4, s.y + 4, s.w * 0.35, s.h * 0.92, "corner");
    brush.noWash();

    brush.set("marker", s.c2, 0.85);
    brush.line(s.x + s.w * 0.2, s.y, s.x + s.w * 0.2, s.y + s.h);
    brush.line(s.x + s.w * 0.6, s.y + 8, s.x + s.w * 0.6, s.y + s.h - 10);
  }

  // reflected marker smears on wet pavement
  brush.field("hand");
  brush.wiggle(1.2);
  for (let s of signData) {
    for (let i = 0; i < 18; i++) {
      let rx = s.x + s.w * 0.5 + random(-14, 14);
      let ry = map(s.y + s.h, 120, 320, 390, 460) + random(-8, 10);
      let len = random(38, 130);
      brush.set("marker", i % 2 === 0 ? s.c1 : s.c2, random(0.55, 1.2));
      brush.line(rx, ry, rx + random(-18, 18), ry + len);
    }
  }
  brush.noField();

  // broader watercolor reflection pools
  brush.noStroke();
  brush.fillTexture(0.65, 0.3);
  let reflCols = ["#ff4a8a", "#29c7ea", "#ffb33f", "#38c7a1"];
  for (let i = 0; i < 16; i++) {
    let x = random(120, 480);
    let y = random(405, 585);
    let rx = random(16, 44);
    let ry = random(24, 70);
    brush.fill(random(reflCols), random(18, 38));
    brush.fillBleed(0.5, "out");
    watercolorBlob(x, y, rx, ry, 16, 0.32);
  }

  // subtle pavement hatching / structure
  brush.noFill();
  brush.set("HB", "#2a2a33", 0.42);
  for (let i = 0; i < 36; i++) {
    let y = 410 + i * 5.2 + random(-1.5, 1.5);
    brush.line(120 + random(-10, 10), y, 480 + random(-16, 16), y + random(-6, 6));
  }

  // sparse ink silhouettes of passersby
  let figures = [
    { x: 170, y: 438, s: 0.85, a: -6 },
    { x: 255, y: 470, s: 1.05, a: 4 },
    { x: 335, y: 448, s: 0.92, a: 7 },
    { x: 430, y: 490, s: 1.12, a: -5 },
    { x: 505, y: 430, s: 0.78, a: 3 }
  ];

  for (let f of figures) {
    drawFigure(f.x, f.y, f.s, f.a);
  }

  // umbrella suggestions
  brush.set("pen", "#151515", 0.55);
  for (let f of figures.slice(1, 4)) {
    let ux = f.x;
    let uy = f.y - 42 * f.s;
    brush.arc(ux, uy, 18 * f.s, 200, 340);
    brush.line(ux, uy - 1, ux - 2 * f.s, uy + 20 * f.s);
  }

  // a few fine ink windows / poles
  brush.set("rotring", "#1b1b22", 0.28);
  for (let i = 0; i < 20; i++) {
    let x = random([58, 92, 138, 365, 402, 468, 520]);
    brush.line(x, random(95, 260), x + random(-2, 2), random(250, 355));
  }

  // final charcoal accents in darkest foreground
  brush.field("hand");
  brush.wiggle(2);
  brush.set("charcoal", "#111111", 0.5);
  for (let i = 0; i < 18; i++) {
    let x = random(140, 470);
    let y = random(485, 600);
    brush.line(x, y, x + random(-18, 18), y + random(-8, 8));
  }
  brush.noField();

  noLoop();
}

function watercolorBlob(cx, cy, rx, ry, n, jitter) {
  brush.beginShape(0.5);
  for (let i = 0; i < n; i++) {
    let a = map(i, 0, n, 0, 360);
    let nx = cos(a) * 0.015 + 100;
    let ny = sin(a) * 0.015 + 200;
    let r1 = rx * (1 - jitter + noise(nx, ny, i * 0.03) * jitter * 2);
    let r2 = ry * (1 - jitter + noise(nx + 30, ny + 40, i * 0.03) * jitter * 2);
    let x = cx + cos(a) * r1;
    let y = cy + sin(a) * r2;
    brush.vertex(x, y);
  }
  brush.endShape(true);
}

function drawFigure(x, y, s, lean) {
  push();
  translate(x, y);
  rotate(lean);

  brush.set("pen", "#161616", 0.62 * s);
  brush.line(0, -30 * s, 0, -10 * s);
  brush.line(0, -10 * s, -6 * s, 12 * s);
  brush.line(0, -10 * s, 7 * s, 14 * s);
  brush.line(0, -24 * s, -8 * s, -6 * s);
  brush.line(0, -22 * s, 8 * s, -4 * s);

  brush.noStroke();
  brush.wash("#1a1a1c", 240);
  brush.circle(0, -37 * s, 4.8 * s);
  brush.rect(-5.2 * s, -29 * s, 10.4 * s, 18 * s, "corner");
  brush.noWash();

  brush.set("2B", "#0f0f10", 0.4 * s);
  brush.line(-2 * s, 15 * s, -8 * s, 28 * s);
  brush.line(3 * s, 15 * s, 8 * s, 28 * s);

  pop();

  // reflection
  brush.field("hand");
  brush.wiggle(1);
  brush.set("marker", "#232634", 0.35 * s);
  for (let i = 0; i < 5; i++) {
    let rx = x + random(-4, 4);
    let ry = y + 18 * s + random(-2, 4);
    brush.line(rx, ry, rx + random(-10, 10), ry + random(20, 48) * s);
  }
  brush.noField();
}