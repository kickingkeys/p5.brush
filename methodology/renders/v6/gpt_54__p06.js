let birds = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noiseSeed(23);
  randomSeed(23);
  brush.scaleBrushes(3);

  for (let i = 0; i < 64; i++) {
    let ring = pow(random(), 0.7);
    let a = random(360);
    let cx = 300 + cos(a) * ring * random(40, 235);
    let cy = 300 + sin(a) * ring * random(40, 235);

    let size = random(8, 22);
    let wing = random(14, 34);
    let tilt = random(-35, 35);
    let shade = random(["#2f2a26", "#3a342f", "#4a433d", "#5a524a"]);

    birds.push({
      x: cx + random(-18, 18),
      y: cy + random(-18, 18),
      wing,
      size,
      tilt,
      shade,
      pres1: random(0.5, 0.9),
      pres2: random(0.8, 1.4),
      pres3: random(0.4, 0.8)
    });
  }
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("spiral");
  brush.wiggle(2);

  for (let i = 0; i < 180; i++) {
    let px = random(60, 540);
    let py = random(60, 540);
    let len = random(10, 32);

    brush.set("marker", random(["#d7d0c7", "#cfc6bb", "#c7beb3"]), random(0.25, 0.55));
    brush.flowLine(px, py, len, random(360));
  }

  brush.noField();

  for (let i = 0; i < 24; i++) {
    let px = random(40, 560);
    let py = random(40, 560);
    let ang = random(360);
    let len = random(18, 50);

    push();
    translate(px, py);
    rotate(ang);
    brush.set("2H", "#d8d0c6", random(0.3, 0.6));
    brush.line(-len * 0.5, 0, len * 0.5, 0);
    pop();
  }

  for (let b of birds) {
    push();
    translate(b.x, b.y);
    rotate(b.tilt);

    brush.field("spiral");
    brush.wiggle(1);

    brush.set("marker", b.shade, random(0.55, 1.15));

    brush.beginStroke("curve", 0, 0);
    brush.move(165, b.wing * 0.48, b.pres1);
    brush.endStroke(125, b.pres2);

    brush.beginStroke("curve", 0, 0);
    brush.move(15, b.wing * 0.48, b.pres1);
    brush.endStroke(55, b.pres2);

    brush.set("marker", b.shade, random(0.35, 0.75));
    brush.spline([
      [-b.size * 0.28, random(-1.2, 1.2), b.pres3],
      [0, random(-0.8, 0.8), random(0.5, 0.9)],
      [b.size * 0.3, random(-1.2, 1.2), b.pres3]
    ], 0.55);

    if (random() < 0.45) {
      brush.set("marker", "#6a625c", random(0.22, 0.5));
      brush.spline([
        [-b.wing * 0.18, -1],
        [0, -b.size * 0.12, 0.5],
        [b.wing * 0.18, -1]
      ], 0.45);
    }

    brush.noField();
    pop();
  }

  brush.set("pen", "#c9c0b5", 0.32);
  for (let i = 0; i < 20; i++) {
    let x = random(90, 510);
    let y = random(90, 510);
    let r = random(70, 170);
    brush.arc(x, y, r, random(0, 360), random(0, 360));
  }

  noLoop();
}