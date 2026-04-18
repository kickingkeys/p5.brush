function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(27);
  noiseSeed(27);

  // subtle wall grain
  brush.noStroke();
  brush.fill("#efe7da", 28);
  brush.fillTexture(0.7, 0.18, false);
  for (let i = 0; i < 10; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let w = random(120, 260);
    let h = random(50, 140);
    brush.beginShape(0.35);
    brush.vertex(x - w * 0.45, y - h * 0.35);
    brush.vertex(x + w * 0.48, y - h * 0.22);
    brush.vertex(x + w * 0.42, y + h * 0.38);
    brush.vertex(x - w * 0.5, y + h * 0.3);
    brush.endShape(true);
  }
  brush.noFill();

  // faded sprayed circles
  brush.field("curved");
  for (let i = 0; i < 8; i++) {
    let cx = random(80, 520);
    let cy = random(80, 520);
    let rad = random(45, 110);

    let c1 = random([
      "#db4f3f", "#1d6fd1", "#e1a420", "#202020",
      "#2e9a6b", "#c13b8a", "#7f59c7", "#ef7f45"
    ]);

    brush.set("spray", c1, random(1.2, 2.6));
    for (let j = 0; j < 220; j++) {
      let a = random(360);
      let rr = rad + randomGaussian(0, rad * 0.18);
      let x = cx + cos(a) * rr;
      let y = cy + sin(a) * rr;
      brush.flowLine(x, y, random(6, 18), a + random(-50, 50));
    }

    brush.set("spray", c1, random(0.5, 1.2));
    for (let j = 0; j < 120; j++) {
      let a = random(360);
      let rr = random(rad * 0.2, rad * 0.8);
      let x = cx + cos(a) * rr;
      let y = cy + sin(a) * rr;
      brush.flowLine(x, y, random(4, 12), random(360));
    }
  }
  brush.noField();

  // drips
  for (let i = 0; i < 26; i++) {
    let x = random(50, 550);
    let y = random(40, 340);
    let len = random(35, 180);
    let col = random([
      "#db4f3f", "#1d6fd1", "#e1a420", "#232323",
      "#2e9a6b", "#c13b8a"
    ]);

    brush.set("marker", col, random(0.6, 1.4));
    brush.spline([
      [x, y, 1.2],
      [x + random(-4, 4), y + len * 0.35, 1.0],
      [x + random(-8, 8), y + len * 0.72, 0.8],
      [x + random(-12, 12), y + len, 0.5]
    ], 0.55);

    if (random() < 0.7) {
      brush.noStroke();
      brush.wash(col, 180);
      brush.circle(x + random(-6, 6), y + len + random(-3, 6), random(4, 10));
      brush.noWash();
    }
  }

  // bold arrows
  for (let i = 0; i < 9; i++) {
    let x1 = random(40, 470);
    let y1 = random(70, 530);
    let ang = random([-20, 10, 30, 45, 70, 110, 160, 210, 330]);
    let len = random(70, 170);
    let x2 = x1 + cos(ang) * len;
    let y2 = y1 + sin(ang) * len;
    let col = random(["#202020", "#db4f3f", "#1d6fd1", "#2e9a6b"]);

    brush.set("marker", col, random(1.5, 2.8));
    brush.line(x1, y1, x2, y2);

    let head = random(16, 28);
    brush.line(x2, y2, x2 + cos(ang + 150) * head, y2 + sin(ang + 150) * head);
    brush.line(x2, y2, x2 + cos(ang - 150) * head, y2 + sin(ang - 150) * head);

    if (random() < 0.4) {
      brush.set("spray", col, 0.8);
      for (let j = 0; j < 40; j++) {
        brush.line(
          x2 + random(-14, 14),
          y2 + random(-14, 14),
          x2 + random(-24, 24),
          y2 + random(-24, 24)
        );
      }
    }
  }

  // ghosted hand-drawn loops and construction marks
  brush.wiggle(3);
  for (let i = 0; i < 22; i++) {
    let cx = random(50, 550);
    let cy = random(50, 550);
    let rx = random(20, 90);
    let ry = random(14, 70);
    let pts = [];
    let n = 18;
    for (let k = 0; k < n; k++) {
      let a = map(k, 0, n, 0, 360);
      let rj = random(0.88, 1.12);
      pts.push([
        cx + cos(a) * rx * rj,
        cy + sin(a) * ry * random(0.88, 1.12),
        random(0.4, 0.9)
      ]);
    }

    let b = random(["HB", "2H", "cpencil", "charcoal"]);
    let col = random(["#6b6258", "#8a8075", "#9a5d5d", "#6d738d", "#7c6f63"]);
    brush.set(b, col, random(0.35, 0.9));
    brush.spline(pts, 0.45);

    if (random() < 0.55) {
      brush.set(b, col, random(0.2, 0.6));
      brush.spline(pts.map(p => [p[0] + random(-8, 8), p[1] + random(-8, 8), p[2]]), 0.4);
    }
  }
  brush.noField();

  // scratchy tags / fragments
  for (let i = 0; i < 15; i++) {
    let x = random(50, 500);
    let y = random(60, 560);
    let scale = random(0.7, 1.5);
    let col = random(["#232323", "#4f4740", "#8d2f2f", "#1f4b85"]);
    let b = random(["pen", "rotring", "HB", "2B"]);
    brush.set(b, col, random(0.5, 1.2));

    let pts1 = [
      [x, y, 0.8],
      [x + 14 * scale, y - 10 * scale, 1.0],
      [x + 28 * scale, y + 8 * scale, 0.9],
      [x + 44 * scale, y - 18 * scale, 0.7]
    ];
    let pts2 = [
      [x + 18 * scale, y + 18 * scale, 0.7],
      [x + 30 * scale, y - 4 * scale, 0.9],
      [x + 54 * scale, y + 10 * scale, 0.8]
    ];
    brush.spline(pts1, 0.35);
    brush.spline(pts2, 0.3);

    if (random() < 0.45) {
      brush.line(x - 6 * scale, y + 8 * scale, x + 56 * scale, y + 4 * scale);
    }
  }

  // circular outlines layered on top
  for (let i = 0; i < 7; i++) {
    let cx = random(70, 530);
    let cy = random(70, 530);
    let r = random(35, 95);
    let b = random(["charcoal", "HB", "pen", "cpencil"]);
    let col = random(["#2b2b2b", "#b83d30", "#235fbf", "#7b6f62"]);
    brush.set(b, col, random(0.6, 1.4));
    brush.circle(cx, cy, r, random(0.15, 0.7));

    if (random() < 0.5) {
      brush.set("2H", "#9e9488", 0.45);
      brush.circle(cx + random(-6, 6), cy + random(-6, 6), r * random(0.86, 1.1), 0.4);
    }
  }

  // rubbed dry-media accents
  for (let i = 0; i < 10; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let w = random(40, 120);
    let h = random(20, 70);
    let col = random(["#d86a54", "#d2b16c", "#6f8dbd", "#6f655a"]);
    brush.mass(random(["pastel", "crayon"]), col, {
      strength: random(0.25, 0.75),
      precision: random(0.25, 0.6),
      gradient: random(0.1, 0.45),
      outline: false
    });
    brush.beginShape(0.3);
    brush.vertex(x - w * 0.5, y - h * 0.35);
    brush.vertex(x + w * 0.45, y - h * 0.28);
    brush.vertex(x + w * 0.52, y + h * 0.2);
    brush.vertex(x - w * 0.4, y + h * 0.42);
    brush.endShape(true);
    brush.noMass();
  }

  // small energetic corrections / crossouts
  for (let i = 0; i < 18; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let s = random(8, 28);
    let col = random(["#262626", "#bb4338", "#2362be"]);
    brush.set(random(["pen", "rotring", "2B"]), col, random(0.3, 0.8));
    brush.line(x - s, y - s * 0.5, x + s, y + s * 0.5);
    brush.line(x - s * 0.8, y + s * 0.6, x + s * 0.9, y - s * 0.7);
  }

  noLoop();
}