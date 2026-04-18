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

  // soft sky washes
  brush.noStroke();
  brush.noHatch();
  brush.noField();

  brush.fill("#1c2240", 34);
  brush.fillBleed(0.42, "out");
  brush.fillTexture(0.78, 0.48);
  brush.rect(0, 0, 600, 250, "corner");

  brush.fill("#35204a", 22);
  brush.fillBleed(0.35, "out");
  brush.fillTexture(0.72, 0.38);
  brush.rect(0, 70, 600, 210, "corner");

  brush.fill("#0f1630", 26);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.66, 0.45);
  brush.rect(0, 160, 600, 180, "corner");

  // distant building masses
  let buildings = [
    { x: 0, w: 68, h: 175, c: "#1e2234" },
    { x: 55, w: 78, h: 210, c: "#20263d" },
    { x: 126, w: 62, h: 160, c: "#191d30" },
    { x: 182, w: 96, h: 238, c: "#24273f" },
    { x: 266, w: 75, h: 188, c: "#1a2036" },
    { x: 334, w: 82, h: 225, c: "#22263b" },
    { x: 405, w: 74, h: 175, c: "#1b1f32" },
    { x: 470, w: 65, h: 205, c: "#24243a" },
    { x: 524, w: 76, h: 168, c: "#1c2133" }
  ];

  for (let b of buildings) {
    brush.fill(b.c, 42);
    brush.fillBleed(0.16, "out");
    brush.fillTexture(0.42, 0.25, false);
    brush.rect(b.x, 160 - random(25, 55), b.w, b.h, "corner");
  }

  // window glows
  brush.wash("#ffd27a", 42);
  for (let b of buildings) {
    for (let yy = 0; yy < 9; yy++) {
      for (let xx = 0; xx < 3; xx++) {
        if (random() < 0.28) {
          let wx = b.x + 10 + xx * random(14, 20);
          let wy = 185 + yy * random(14, 18);
          let ww = random(5, 10);
          let wh = random(7, 14);
          brush.rect(wx, wy, ww, wh, "corner");
        }
      }
    }
  }
  brush.noWash();

  // rain haze
  brush.set("spray", "#c7d7ff", 0.9);
  for (let i = 0; i < 140; i++) {
    let x = random(0, 600);
    let y = random(20, 470);
    brush.line(x, y, x + random(-8, 8), y + random(18, 34));
  }

  brush.set("2H", "#e5eefc", 0.45);
  for (let i = 0; i < 120; i++) {
    let x = random(0, 600);
    let y = random(0, 520);
    brush.line(x, y, x + random(-5, 5), y + random(12, 24));
  }

  // street base washes
  brush.noStroke();
  brush.fill("#313747", 34);
  brush.fillBleed(0.24, "out");
  brush.fillTexture(0.6, 0.36);
  brush.beginShape(0.18);
  brush.vertex(0, 355);
  brush.vertex(600, 330);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  brush.fill("#4a5566", 18);
  brush.fillBleed(0.22, "in");
  brush.fillTexture(0.55, 0.32);
  brush.beginShape(0.2);
  brush.vertex(0, 390);
  brush.vertex(600, 360);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // central road perspective
  brush.fill("#22252f", 28);
  brush.fillBleed(0.15, "out");
  brush.fillTexture(0.45, 0.28, false);
  brush.beginShape(0.08);
  brush.vertex(215, 355);
  brush.vertex(390, 350);
  brush.vertex(520, 600);
  brush.vertex(95, 600);
  brush.endShape(true);

  // broad reflected light pools
  let pools = [
    { x: 135, y: 470, w: 110, h: 135, c: "#ff4fd8", a: 28 },
    { x: 260, y: 455, w: 85, h: 120, c: "#2ce6ff", a: 26 },
    { x: 360, y: 462, w: 125, h: 145, c: "#ff8f38", a: 24 },
    { x: 465, y: 500, w: 90, h: 110, c: "#ffd84f", a: 20 }
  ];

  for (let p of pools) {
    brush.fill(p.c, p.a);
    brush.fillBleed(0.33, "out");
    brush.fillTexture(0.75, 0.38);
    brush.beginShape(0.32);
    brush.vertex(p.x - p.w * 0.25, p.y - p.h * 0.35);
    brush.vertex(p.x + p.w * 0.15, p.y - p.h * 0.48);
    brush.vertex(p.x + p.w * 0.42, p.y - p.h * 0.06);
    brush.vertex(p.x + p.w * 0.3, p.y + p.h * 0.42);
    brush.vertex(p.x - p.w * 0.18, p.y + p.h * 0.48);
    brush.vertex(p.x - p.w * 0.36, p.y + p.h * 0.08);
    brush.endShape(true);
  }

  // neon signs in the distance
  function neonSign(x, y, w, h, col, strokeCol) {
    brush.noFill();
    brush.noHatch();
    brush.set("marker", col, 1.2);
    for (let i = 0; i < 4; i++) {
      brush.line(x, y + i * 2, x + w, y + i * 2);
    }
    brush.line(x, y, x, y + h);
    brush.line(x + w, y, x + w, y + h);
    brush.line(x, y + h, x + w, y + h);

    brush.set("marker", col, 2.2);
    brush.line(x + 3, y + h * 0.5, x + w - 3, y + h * 0.5);

    brush.set("rotring", strokeCol, 0.35);
    brush.rect(x, y, w, h, "corner");
  }

  neonSign(58, 230, 55, 18, "#ff43c7", "#482243");
  neonSign(205, 214, 72, 24, "#2de4ff", "#18334b");
  neonSign(356, 238, 64, 20, "#ff8c38", "#5b341f");
  neonSign(477, 222, 46, 16, "#ffd44f", "#5a4a21");

  // vertical neon drips/reflections on facades
  brush.set("marker", "#ff43c7", 1.1);
  for (let i = 0; i < 8; i++) {
    let x = random(62, 114);
    brush.line(x, 250, x + random(-2, 2), 315 + random(-5, 20));
  }
  brush.set("marker", "#2de4ff", 1.0);
  for (let i = 0; i < 9; i++) {
    let x = random(213, 274);
    brush.line(x, 240, x + random(-2, 2), 324 + random(-8, 18));
  }
  brush.set("marker", "#ff8c38", 1.0);
  for (let i = 0; i < 7; i++) {
    let x = random(364, 414);
    brush.line(x, 258, x + random(-3, 3), 330 + random(-10, 16));
  }

  // pavement marker smears
  function smear(x, y, len, col, weight, dx) {
    brush.set("marker", col, weight);
    for (let i = 0; i < 8; i++) {
      let yy = y + i * random(3, 8);
      brush.line(
        x + random(-6, 6),
        yy,
        x + dx + random(-10, 10),
        yy + len + random(-12, 12)
      );
    }
  }

  smear(95, 380, 145, "#ff4fd8", 1.0, 12);
  smear(116, 400, 120, "#ff4fd8", 0.75, -8);
  smear(250, 372, 150, "#2ce6ff", 1.0, 8);
  smear(275, 420, 110, "#2ce6ff", 0.72, -5);
  smear(360, 382, 165, "#ff8f38", 1.0, 16);
  smear(470, 410, 120, "#ffd84f", 0.82, -10);

  // road gleam and puddle edges
  brush.set("cpencil", "#cfd8ea", 0.4);
  for (let i = 0; i < 22; i++) {
    let x1 = random(70, 530);
    let y1 = random(410, 590);
    let x2 = x1 + random(25, 90);
    let y2 = y1 + random(-10, 14);
    brush.line(x1, y1, x2, y2);
  }

  brush.set("2B", "#8e97ab", 0.55);
  for (let i = 0; i < 18; i++) {
    let x = random(90, 500);
    let y = random(430, 590);
    brush.arc(x, y, random(14, 36), 200, 340);
  }

  // curb / street guides
  brush.set("HB", "#5a6070", 0.6);
  brush.line(0, 357, 600, 332);
  brush.line(85, 600, 220, 355);
  brush.line(520, 600, 388, 350);

  // sparse figures
  function passerby(x, y, s, umbrella, tilt) {
    push();
    translate(x, y);
    rotate(tilt);

    brush.noFill();

    brush.set("rotring", "#17181d", 0.75 * s);
    brush.line(0, -34 * s, 0, 0);
    brush.line(0, 0, -7 * s, 24 * s);
    brush.line(0, 0, 8 * s, 25 * s);
    brush.line(0, -18 * s, -10 * s, -2 * s);
    brush.line(0, -16 * s, 9 * s, -1 * s);

    brush.set("pen", "#111217", 0.95 * s);
    brush.circle(0, -43 * s, 5.5 * s, 0.15);

    brush.set("charcoal", "#131419", 1.0 * s);
    brush.beginShape(0.18);
    brush.vertex(-8 * s, -30 * s);
    brush.vertex(8 * s, -31 * s);
    brush.vertex(11 * s, -5 * s);
    brush.vertex(-10 * s, -3 * s);
    brush.endShape(true);

    if (umbrella) {
      brush.set("pen", "#1d1a22", 0.7 * s);
      brush.arc(0, -52 * s, 18 * s, 180, 360);
      brush.line(0, -52 * s, 0, -20 * s);
      brush.arc(2 * s, -19 * s, 3.5 * s, 0, 140);
    }

    pop();

    // reflection
    brush.set("marker", "rgba(20,20,28,0.22)", 0.5 * s);
    for (let i = 0; i < 4; i++) {
      let yy = y + 6 + i * 5;
      brush.line(x - 5 * s + random(-2, 2), yy, x + 5 * s + random(-2, 2), yy + random(18, 36));
    }
  }

  passerby(170, 410, 1.0, true, -4);
  passerby(308, 432, 0.88, false, 2);
  passerby(430, 400, 1.08, true, 3);
  passerby(510, 448, 0.78, false, -2);

  // distant pedestrians
  for (let i = 0; i < 5; i++) {
    let x = 90 + i * 92 + random(-15, 15);
    let y = 332 + random(-4, 18);
    let s = random(0.42, 0.58);
    brush.set("pen", "#17181b", 0.32 * s);
    brush.line(x, y - 14 * s, x, y);
    brush.line(x, y, x - 4 * s, y + 9 * s);
    brush.line(x, y, x + 3 * s, y + 10 * s);
    brush.circle(x, y - 18 * s, 2.6 * s, 0.1);
    if (random() < 0.45) {
      brush.arc(x, y - 22 * s, 8 * s, 180, 360);
    }
  }

  // foreground texture and sketch edges
  brush.set("crayon", "#6e7480", 0.45);
  for (let i = 0; i < 55; i++) {
    let x = random(0, 600);
    let y = random(360, 600);
    brush.line(x, y, x + random(-18, 18), y + random(-6, 10));
  }

  brush.set("2H", "#b7b0a4", 0.28);
  for (let i = 0; i < 40; i++) {
    let x = random(0, 600);
    brush.line(x, 0, x + random(-10, 10), 600);
  }

  noLoop();
}