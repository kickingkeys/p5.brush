function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(42);
  noiseSeed(42);

  const palette = [
    "#e4574f",
    "#2f6db2",
    "#f1b23a",
    "#222222",
    "#3f8f6a",
    "#8f4fb3"
  ];

  // soft wall haze / old overspray
  brush.noStroke();
  brush.fillTexture(0.5, 0.25);
  for (let i = 0; i < 18; i++) {
    brush.fill(random(palette), random(18, 40));
    brush.fillBleed(random(0.28, 0.45), "out");
    brush.circle(random(40, 560), random(40, 560), random(40, 120), random(0.1, 0.5));
  }
  brush.noFill();

  // overlapping spray-painted circles
  for (let i = 0; i < 48; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let r = random(18, 55);

    brush.set("spray", random(palette), random(0.9, 2.6));
    for (let k = 0; k < int(random(2, 5)); k++) {
      brush.flowLine(
        x + random(-r * 0.4, r * 0.4),
        y + random(-r * 0.4, r * 0.4),
        random(r * 0.7, r * 1.8),
        random(360)
      );
    }

    if (random() < 0.6) {
      brush.set("spray", random(palette), random(0.5, 1.1));
      for (let a = 0; a < 360; a += random(18, 34)) {
        let px = x + cos(a) * r * random(0.8, 1.1);
        let py = y + sin(a) * r * random(0.8, 1.1);
        brush.line(px, py, px + random(-8, 8), py + random(-8, 8));
      }
    }
  }

  // drips
  for (let i = 0; i < 26; i++) {
    let x = random(40, 560);
    let y = random(50, 420);
    let len = random(30, 140);
    let c = random(palette);

    brush.set("spray", c, random(0.4, 0.9));
    brush.line(x, y, x + random(-5, 5), y + len);

    if (random() < 0.7) {
      brush.set("marker", c, random(0.35, 0.8));
      brush.line(x + random(-2, 2), y + len * 0.15, x + random(-6, 6), y + len);
    }

    if (random() < 0.45) {
      brush.set("spray", c, random(0.8, 1.4));
      for (let s = 0; s < 5; s++) {
        brush.flowLine(x + random(-6, 6), y + len + random(-4, 8), random(6, 16), random(200, 340));
      }
    }
  }

  // arrows and tag-like splines
  for (let i = 0; i < 14; i++) {
    let x0 = random(50, 420);
    let y0 = random(60, 540);
    let x1 = x0 + random(70, 180);
    let y1 = y0 + random(-40, 40);
    let x2 = x1 + random(40, 110);
    let y2 = y1 + random(-30, 30);
    let c = random(palette);

    brush.set("spray", c, random(1.3, 2.4));
    brush.spline(
      [
        [x0, y0, 0.9],
        [x1, y1, 0.7],
        [x2, y2, 0.5]
      ],
      0.42
    );

    let ang = atan2(y2 - y1, x2 - x1);
    let ah = random(12, 22);
    brush.line(x2, y2, x2 - cos(ang - 25) * ah, y2 - sin(ang - 25) * ah);
    brush.line(x2, y2, x2 - cos(ang + 25) * ah, y2 - sin(ang + 25) * ah);
  }

  // ghosted hand-drawn marks
  brush.wiggle(2);
  for (let i = 0; i < 22; i++) {
    let c = random(["#2b2b2b", "#444444", "#7a7a7a", "#5a4638"]);
    let pick = random(["charcoal", "HB", "2B", "pen", "rotring"]);
    brush.set(pick, c, random(0.35, 1.2));

    let x = random(40, 560);
    let y = random(40, 560);

    if (random() < 0.5) {
      brush.beginStroke("curve", x, y);
      let segments = int(random(2, 5));
      let a = random(360);
      for (let s = 0; s < segments; s++) {
        a += random(-70, 70);
        brush.move(a, random(20, 70), random(0.4, 1.1));
      }
      brush.endStroke(a + random(-40, 40), random(0.3, 0.9));
    } else {
      brush.spline(
        [
          [x, y, random(0.3, 0.8)],
          [x + random(-50, 50), y + random(-40, 40), random(0.4, 1.0)],
          [x + random(-80, 80), y + random(-60, 60), random(0.3, 0.9)],
          [x + random(-100, 100), y + random(-80, 80), random(0.2, 0.8)]
        ],
        0.5
      );
    }
  }
  brush.noField();

  // dusty colored-pencil and rotring traces
  for (let i = 0; i < 12; i++) {
    let x = random(70, 530);
    let y = random(70, 530);
    let w = random(50, 140);
    let h = random(20, 70);

    push();
    translate(x, y);
    rotate(random(-35, 35));

    brush.noFill();
    brush.set("cpencil", random(["#9a3d47", "#456ca8", "#9b7d2f", "#5f8a67"]), random(0.4, 0.8));
    brush.rect(0, 0, w, h, "center");

    brush.hatchStyle("2H", "#8a867f", 0.35);
    brush.hatch(random(7, 12), random(20, 160), { rand: 0.12, continuous: true, gradient: 0.25 });
    brush.rect(0, 0, w * random(0.7, 1.1), h * random(0.7, 1.2), "center");
    brush.noHatch();

    if (random() < 0.7) {
      brush.set("rotring", "#2a2a2a", random(0.25, 0.5));
      brush.line(-w * 0.4, 0, w * 0.4, 0);
    }
    pop();
  }

  // heavier lower-layer masses, like old scrubbed graffiti residue
  for (let i = 0; i < 7; i++) {
    let cx = random(80, 520);
    let cy = random(80, 520);
    let pts = [];
    let n = 18;
    let baseR = random(26, 60);

    for (let j = 0; j < n; j++) {
      let a = map(j, 0, n, 0, 360);
      let rr = baseR + random(-18, 18);
      pts.push([cx + cos(a) * rr, cy + sin(a) * rr]);
    }

    brush.mass(random(["pastel", "crayon"]), random(["#40322d", "#56463c", "#2d3640"]), {
      strength: random(0.25, 0.55),
      precision: random(0.35, 0.65),
      gradient: random(0.1, 0.35),
      outline: false
    });
    brush.polygon(pts);
    brush.noMass();
  }

  // final scattered notation-like scratches
  for (let i = 0; i < 35; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let len = random(8, 28);
    let a = random(360);
    let bname = random(["HB", "2H", "pen", "charcoal"]);
    brush.set(bname, random(["#252525", "#4a4a4a", "#6a625d"]), random(0.2, 0.7));
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }

  noLoop();
}