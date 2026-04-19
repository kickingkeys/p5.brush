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

  // Rainy sky / atmosphere
  brush.noStroke();
  brush.fillTexture(0.72, 0.36);

  for (let i = 0; i < 22; i++) {
    let x = random(40, 560);
    let y = random(20, 270);
    let r = random(55, 150);
    let c = random([
      "#c8c2d8", "#b9bdd1", "#9aa5c4", "#8e97b8",
      "#7c86a6", "#b8a7ba", "#95a8b8"
    ]);
    brush.fill(c, random(22, 48));
    brush.fillBleed(random(0.35, 0.6), "out");
    brush.circle(x, y, r, 0.25);
  }
  brush.noFill();

  // Distant building washes
  for (let i = 0; i < 8; i++) {
    let x = 20 + i * 72 + random(-10, 10);
    let w = random(52, 84);
    let h = random(150, 280);
    let topY = random(120, 210);
    let col = random(["#5b6270", "#68606e", "#546173", "#6a6f7d"]);
    brush.fill(col, random(28, 54));
    brush.fillBleed(0.28, "out");
    brush.beginShape(0.38);
    brush.vertex(x, topY);
    brush.vertex(x + w * 0.18, topY - random(8, 22));
    brush.vertex(x + w * 0.82, topY + random(-10, 12));
    brush.vertex(x + w, topY + random(8, 24));
    brush.vertex(x + w, topY + h);
    brush.vertex(x + random(-10, 8), topY + h + random(8, 20));
    brush.endShape(true);

    brush.fill(lerpColor(color(col), color("#fffaf3"), 0.2), 20);
    brush.fillBleed(0.4, "in");
    brush.beginShape(0.32);
    brush.vertex(x + w * 0.1, topY + 14);
    brush.vertex(x + w * 0.85, topY + 8);
    brush.vertex(x + w * 0.88, topY + h * 0.88);
    brush.vertex(x + w * 0.15, topY + h * 0.92);
    brush.endShape(true);
  }
  brush.noFill();

  // Street perspective wash
  brush.fillTexture(0.85, 0.46);
  brush.fill("#8b7b7d", 52);
  brush.fillBleed(0.34, "out");
  brush.beginShape(0.4);
  brush.vertex(180, 320);
  brush.vertex(420, 320);
  brush.vertex(520, 600);
  brush.vertex(80, 600);
  brush.endShape(true);

  brush.fill("#5e6e86", 42);
  brush.fillBleed(0.42, "in");
  brush.beginShape(0.35);
  brush.vertex(215, 350);
  brush.vertex(390, 350);
  brush.vertex(455, 595);
  brush.vertex(150, 595);
  brush.endShape(true);
  brush.noFill();

  // Broad wet pavement blooms
  brush.noStroke();
  brush.fillTexture(0.6, 0.25);
  for (let i = 0; i < 16; i++) {
    let x = random(120, 485);
    let y = random(350, 590);
    let r = random(22, 70);
    brush.fill(random(["#7b8ca3", "#6a768a", "#8a6d7b", "#5d6575"]), random(20, 38));
    brush.fillBleed(random(0.3, 0.55), "out");
    brush.circle(x, y, r, 0.3);
  }
  brush.noFill();

  // Neon marker reflections on pavement
  brush.wiggle(1);

  let reflectionXs = [165, 230, 305, 388, 455];
  let neonCols = ["#00b7c8", "#ff4d78", "#ffd14a", "#7c63ff", "#1bd176"];

  for (let i = 0; i < reflectionXs.length; i++) {
    let x = reflectionXs[i];
    let c = neonCols[i];

    // Main vertical smear
    brush.set("marker", c, random(1.3, 2.1));
    brush.spline([
      [x + random(-8, 8), 305 + random(-8, 10), 0.8],
      [x + random(-18, 18), 375 + random(-8, 8), 1.15],
      [x + random(-28, 28), 455 + random(-10, 12), 0.95],
      [x + random(-22, 22), 545 + random(-6, 10), 0.55]
    ], 0.45);

    // Side smears
    brush.set("marker", c, random(0.7, 1.2));
    for (let k = 0; k < 3; k++) {
      let yy = random(360, 560);
      brush.line(
        x + random(-24, 8),
        yy,
        x + random(18, 55),
        yy + random(4, 20)
      );
    }

    // Opaque marker puddle blocks
    brush.noStroke();
    brush.wash(c, random(190, 225));
    brush.beginShape(0.22);
    brush.vertex(x - 10, random(420, 500));
    brush.vertex(x + 14, random(418, 492));
    brush.vertex(x + 26, random(448, 530));
    brush.vertex(x - 18, random(450, 535));
    brush.endShape(true);
    brush.noWash();
  }

  // Neon signs above
  for (let i = 0; i < reflectionXs.length; i++) {
    let x = reflectionXs[i] + random(-10, 10);
    let y = random(170, 270);
    let w = random(18, 34);
    let h = random(28, 56);
    let c = neonCols[i];

    brush.noStroke();
    brush.wash(c, 220);
    brush.rect(x, y, w, h, "center");
    brush.noWash();

    brush.set("marker", c, 0.9);
    brush.line(x - w * 0.5, y - h * 0.5, x + w * 0.5, y - h * 0.5);
    brush.line(x - w * 0.5, y + h * 0.5, x + w * 0.5, y + h * 0.5);

    brush.set("spray", c, 1.3);
    for (let s = 0; s < 18; s++) {
      brush.flowLine(
        x + random(-w, w),
        y + random(-h, h),
        random(8, 22),
        random(360)
      );
    }
  }

  brush.noField();

  // Rain streaks
  brush.set("2H", "#7d8796", 0.45);
  for (let i = 0; i < 180; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(8, 22);
    brush.line(x, y, x - random(1, 4), y + len);
  }

  brush.set("HB", "#93a0b0", 0.25);
  for (let i = 0; i < 120; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(6, 14);
    brush.line(x, y, x - random(1, 3), y + len);
  }

  // Sparse architectural ink lines
  brush.set("rotring", "#393c46", 0.45);
  for (let i = 0; i < 7; i++) {
    let x = 25 + i * 78 + random(-8, 8);
    brush.line(x, random(105, 165), x, random(285, 355));
  }

  brush.set("pen", "#353840", 0.8);
  brush.line(0, 322, 600, 322);

  // Passersby silhouettes
  function passerby(x, y, s, umbrella) {
    brush.noStroke();
    brush.fill("#26282f", 88);
    brush.fillBleed(0.12, "out");

    // body
    brush.beginShape(0.28);
    brush.vertex(x - 10 * s, y - 2 * s);
    brush.vertex(x - 13 * s, y + 10 * s);
    brush.vertex(x - 8 * s, y + 32 * s);
    brush.vertex(x - 5 * s, y + 58 * s);
    brush.vertex(x + 5 * s, y + 58 * s);
    brush.vertex(x + 8 * s, y + 30 * s);
    brush.vertex(x + 12 * s, y + 8 * s);
    brush.vertex(x + 8 * s, y - 3 * s);
    brush.vertex(x + 3 * s, y - 14 * s);
    brush.vertex(x - 4 * s, y - 14 * s);
    brush.endShape(true);

    // head
    brush.circle(x, y - 22 * s, 6 * s, 0.2);
    brush.noFill();

    // ink outline
    brush.set("pen", "#16181c", 0.9);
    brush.beginShape(0.25);
    brush.vertex(x - 10 * s, y - 2 * s);
    brush.vertex(x - 13 * s, y + 10 * s);
    brush.vertex(x - 8 * s, y + 32 * s);
    brush.vertex(x - 5 * s, y + 58 * s);
    brush.vertex(x + 5 * s, y + 58 * s);
    brush.vertex(x + 8 * s, y + 30 * s);
    brush.vertex(x + 12 * s, y + 8 * s);
    brush.vertex(x + 8 * s, y - 3 * s);
    brush.vertex(x + 3 * s, y - 14 * s);
    brush.vertex(x - 4 * s, y - 14 * s);
    brush.endShape(true);
    brush.circle(x, y - 22 * s, 6 * s, 0.15);

    // legs
    brush.set("rotring", "#111317", 0.5);
    brush.line(x - 3 * s, y + 56 * s, x - 7 * s, y + 82 * s);
    brush.line(x + 2 * s, y + 56 * s, x + 7 * s, y + 82 * s);

    // reflection
    brush.set("marker", "#2b2e38", 0.6);
    brush.spline([
      [x, y + 78 * s, 0.7],
      [x + random(-6, 6), y + 98 * s, 0.5],
      [x + random(-10, 10), y + 125 * s, 0.25]
    ], 0.4);

    if (umbrella) {
      brush.set("pen", "#17191d", 0.8);
      brush.arc(x - 2 * s, y - 30 * s, 18 * s, 190, 350);
      brush.line(x - 2 * s, y - 30 * s, x + 3 * s, y + 10 * s);
    }
  }

  passerby(208, 392, 1.0, true);
  passerby(290, 408, 0.82, false);
  passerby(376, 388, 1.12, true);
  passerby(455, 420, 0.72, false);

  // A closer dark silhouette mass on left
  brush.noStroke();
  brush.fill("#1b1d22", 105);
  brush.fillBleed(0.14, "out");
  brush.beginShape(0.25);
  brush.vertex(108, 382);
  brush.vertex(92, 408);
  brush.vertex(88, 455);
  brush.vertex(95, 520);
  brush.vertex(120, 592);
  brush.vertex(158, 592);
  brush.vertex(162, 520);
  brush.vertex(146, 430);
  brush.vertex(134, 388);
  brush.endShape(true);
  brush.noFill();

  brush.set("pen", "#121317", 1.0);
  brush.beginShape(0.25);
  brush.vertex(108, 382);
  brush.vertex(92, 408);
  brush.vertex(88, 455);
  brush.vertex(95, 520);
  brush.vertex(120, 592);
  brush.vertex(158, 592);
  brush.vertex(162, 520);
  brush.vertex(146, 430);
  brush.vertex(134, 388);
  brush.endShape(true);

  // Charcoal accents for wet curb/shadows
  brush.field("hand");
  brush.wiggle(3);
  brush.set("charcoal", "#3a3438", 0.8);
  for (let i = 0; i < 16; i++) {
    let x1 = random(90, 510);
    let y1 = random(500, 590);
    brush.line(x1, y1, x1 + random(20, 80), y1 + random(-8, 10));
  }
  brush.noField();

  // Dry-media muted shadow masses
  brush.mass("pastel", "#5a5258", {
    strength: 0.35,
    precision: 0.55,
    gradient: 0.45,
    outline: false
  });
  brush.beginShape(0.3);
  brush.vertex(86, 520);
  brush.vertex(220, 505);
  brush.vertex(260, 600);
  brush.vertex(110, 600);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#47434a", {
    strength: 0.42,
    precision: 0.45,
    gradient: 0.25,
    outline: false
  });
  brush.beginShape(0.3);
  brush.vertex(325, 485);
  brush.vertex(455, 470);
  brush.vertex(520, 600);
  brush.vertex(350, 600);
  brush.endShape(true);
  brush.noMass();

  // Small colored-pencil glints
  brush.set("cpencil", "#dcb14f", 0.45);
  brush.line(244, 452, 266, 456);
  brush.line(246, 462, 275, 468);

  brush.set("cpencil", "#48b8bf", 0.45);
  brush.line(154, 504, 182, 510);
  brush.line(398, 468, 425, 474);

  // Foreground puddle contours
  brush.set("2B", "#4b4c55", 0.6);
  brush.spline([
    [122, 518, 0.6],
    [186, 510, 0.9],
    [255, 522, 0.7],
    [326, 512, 0.85],
    [408, 526, 0.65],
    [492, 516, 0.55]
  ], 0.45);

  noLoop();
}