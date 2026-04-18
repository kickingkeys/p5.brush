function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  noStroke();
  brush.noStroke();
  brush.noHatch();
  brush.noField();
  brush.noMass();
  brush.noWash();

  // subtle paper haze
  for (let i = 0; i < 140; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(18, 42);
    brush.fill(random(["#f4e6d8", "#efe1cf", "#f7eadc", "#ead8c1"]), random(8, 16));
    brush.fillBleed(random(0.08, 0.16), "out");
    brush.fillTexture(random(0.08, 0.18), random(0.06, 0.14), false);
    brush.circle(x, y, r, random(0.05, 0.2));
  }

  let palette = [
    "#d7a6a1", // dusty pink
    "#c88f91",
    "#e0b4a8",
    "#c97d76",
    "#d7b07c", // ochre
    "#c79a5e",
    "#b9874c",
    "#e1c39a",
    "#c6a07b"
  ];

  let blooms = [];
  let bloomCount = 26;

  for (let i = 0; i < bloomCount; i++) {
    let x = random(90, 510);
    let y = random(90, 510);
    let r = random(42, 108);
    blooms.push({
      x,
      y,
      r,
      c: random(palette)
    });
  }

  // main watercolor blooms built from overlapping circles
  for (let b of blooms) {
    let layers = int(random(4, 8));

    for (let j = 0; j < layers; j++) {
      let rr = b.r * random(0.72, 1.12);
      let ox = random(-b.r * 0.16, b.r * 0.16);
      let oy = random(-b.r * 0.16, b.r * 0.16);
      let alpha = random(20, 48);

      brush.fill(b.c, alpha);
      brush.fillBleed(random(0.22, 0.52), random() < 0.7 ? "out" : "in");
      brush.fillTexture(random(0.38, 0.72), random(0.18, 0.42), random() < 0.85);
      brush.circle(b.x + ox, b.y + oy, rr, random(0.15, 0.7));
    }

    // soft center wash for density
    if (random() < 0.75) {
      brush.wash(b.c, random(10, 20));
      brush.circle(
        b.x + random(-8, 8),
        b.y + random(-8, 8),
        b.r * random(0.45, 0.7),
        random(0.1, 0.35)
      );
      brush.noWash();
    }

    // halo edge stains
    let haloCount = int(random(3, 7));
    for (let k = 0; k < haloCount; k++) {
      let ang = random(360);
      let dist = random(b.r * 0.18, b.r * 0.48);
      let hx = b.x + cos(ang) * dist;
      let hy = b.y + sin(ang) * dist;
      let hr = b.r * random(0.18, 0.42);

      brush.fill(random(palette), random(12, 26));
      brush.fillBleed(random(0.35, 0.65), "out");
      brush.fillTexture(random(0.45, 0.82), random(0.2, 0.5), true);
      brush.circle(hx, hy, hr, random(0.2, 0.8));
    }
  }

  // larger translucent overlapping blooms to unify composition
  for (let i = 0; i < 9; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    let r = random(85, 145);

    brush.fill(random(palette), random(14, 24));
    brush.fillBleed(random(0.32, 0.58), "out");
    brush.fillTexture(random(0.42, 0.8), random(0.16, 0.34), true);
    brush.circle(x, y, r, random(0.2, 0.85));
  }

  // delicate graphite/charcoal ghost edges on a few blooms
  for (let i = 0; i < 10; i++) {
    let b = random(blooms);
    let edgeR = b.r * random(0.8, 1.08);
    let start = random(0, 300);
    let end = start + random(35, 120);

    brush.set(random(["2H", "HB", "charcoal", "cpencil"]), random(["#8f7f73", "#9a8776", "#7d6b60"]), random(0.35, 0.7));
    brush.arc(
      b.x + random(-10, 10),
      b.y + random(-10, 10),
      edgeR,
      start,
      end
    );
  }

  // airy pencil web to suggest absorbed edges and pooling
  for (let i = 0; i < 18; i++) {
    let b1 = random(blooms);
    let b2 = random(blooms);
    if (dist(b1.x, b1.y, b2.x, b2.y) < 180) {
      brush.set(random(["2B", "HB", "2H", "cpencil"]), random(["#c9a28d", "#b98f7f", "#ab8575"]), random(0.18, 0.35));
      brush.wiggle(random(1, 3));
      brush.line(
        b1.x + random(-10, 10),
        b1.y + random(-10, 10),
        b2.x + random(-10, 10),
        b2.y + random(-10, 10)
      );
      brush.noField();
    }
  }

  // tiny spray freckles for pigment granulation
  for (let i = 0; i < 90; i++) {
    let b = random(blooms);
    let a = random(360);
    let d = random(b.r * 0.1, b.r * 0.95);
    let x = b.x + cos(a) * d;
    let y = b.y + sin(a) * d;

    brush.set("spray", random(["#b98272", "#c79765", "#a86f68", "#b58a57"]), random(0.18, 0.32));
    brush.line(x, y, x + random(-2, 2), y + random(-2, 2));
  }

  noLoop();
}