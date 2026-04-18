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

  // --- sky / paper atmosphere ---
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  brush.fillTexture(0.8, 0.35);
  brush.wash("#e8dcc5", 70);
  brush.fill("#efe3cc", 95);
  brush.fillBleed(0.18, "out");
  brush.beginShape(0.45);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 250);
  brush.vertex(0, 235);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // --- horizon line ---
  brush.set("pen", "#5c4d3c", 0.42);
  brush.line(0, 287, 600, 287);

  // --- distant dune wash ---
  let dune1 = [];
  for (let x = 0; x <= 600; x += 18) {
    let y = 305 + 14 * sin(x * 0.55) + map(noise(x * 0.01, 10), 0, 1, -8, 10);
    dune1.push([x, y]);
  }
  dune1.push([600, 420], [0, 420]);

  brush.noStroke();
  brush.fillTexture(0.82, 0.38);
  brush.wash("#dcc29a", 90);
  brush.fill("#cfae7d", 115);
  brush.fillBleed(0.28, "out");
  brush.beginShape(0.42);
  for (let p of dune1) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // inner layer for dune1
  brush.fillTexture(0.75, 0.32);
  brush.fill("#b9905f", 55);
  brush.fillBleed(0.35, "in");
  brush.beginShape(0.42);
  for (let p of dune1) {
    let tx = p[0];
    let ty = lerp(330, p[1], 0.82);
    if (ty < 420) brush.vertex(tx, ty);
  }
  brush.endShape(true);
  brush.noFill();

  // --- midground dune wash ---
  let dune2 = [];
  for (let x = 0; x <= 600; x += 16) {
    let y = 360 + 10 * sin(x * 0.8 + 50) + map(noise(x * 0.012, 30), 0, 1, -10, 18);
    dune2.push([x, y]);
  }
  dune2.push([600, 520], [0, 520]);

  brush.noStroke();
  brush.fillTexture(0.86, 0.44);
  brush.wash("#d3af7f", 110);
  brush.fill("#c59a62", 130);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.46);
  for (let p of dune2) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  // warm shadow inside dune2
  brush.fillTexture(0.68, 0.28, false);
  brush.fill("#9e6f42", 58);
  brush.fillBleed(0.42, "in");
  brush.beginShape(0.46);
  for (let p of dune2) {
    let tx = p[0];
    let ty = lerp(392, p[1], 0.78);
    if (ty < 520) brush.vertex(tx, ty);
  }
  brush.endShape(true);
  brush.noFill();

  // --- foreground ground plane wash ---
  let dune3 = [];
  for (let x = 0; x <= 600; x += 14) {
    let y = 455 + 8 * sin(x * 1.1 + 10) + map(noise(x * 0.015, 80), 0, 1, -8, 14);
    dune3.push([x, y]);
  }
  dune3.push([600, 600], [0, 600]);

  brush.noStroke();
  brush.fillTexture(0.9, 0.48);
  brush.wash("#c89b66", 120);
  brush.fill("#b9854f", 135);
  brush.fillBleed(0.26, "out");
  brush.beginShape(0.43);
  for (let p of dune3) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noWash();
  brush.noFill();

  brush.fill("#8f6037", 48);
  brush.fillBleed(0.36, "in");
  brush.beginShape(0.4);
  for (let p of dune3) {
    let tx = p[0];
    let ty = lerp(490, p[1], 0.76);
    brush.vertex(tx, ty);
  }
  brush.endShape(true);
  brush.noFill();

  // --- cracked ground network ---
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#8f7b67", 0.28);
  for (let i = 0; i < 85; i++) {
    let x = random(0, 600);
    let y = random(430, 598);
    let len = random(16, 52);
    let a = random(-35, 35) + (i % 2 === 0 ? 0 : 180);
    let x2 = x + cos(a) * len;
    let y2 = y + sin(a) * random(4, 14);
    brush.line(x, y, x2, y2);

    if (random() < 0.55) {
      let a2 = a + random(-70, 70);
      let l2 = len * random(0.25, 0.55);
      brush.line(
        x + cos(a) * len * random(0.2, 0.8),
        y + sin(a) * random(2, 10),
        x + cos(a) * len * random(0.2, 0.8) + cos(a2) * l2,
        y + sin(a) * random(2, 10) + sin(a2) * random(3, 10)
      );
    }
  }

  brush.set("HB", "#7b6854", 0.22);
  for (let y = 470; y < 595; y += 18) {
    let pts = [];
    for (let x = -10; x <= 610; x += 40) {
      pts.push([x, y + map(noise(x * 0.02, y * 0.015), 0, 1, -5, 5), random(0.7, 1.1)]);
    }
    brush.spline(pts, 0.22);
  }

  // --- charcoal rock formations ---
  function rockShape(cx, baseY, w, h, seedOffset) {
    let pts = [];
    let left = cx - w / 2;
    let right = cx + w / 2;

    pts.push([left, baseY]);

    let peaks = int(random(5, 8));
    for (let i = 0; i <= peaks; i++) {
      let t = i / peaks;
      let x = lerp(left, right, t) + map(noise(seedOffset + i * 0.4), 0, 1, -10, 10);
      let ridge = baseY - h * (0.55 + 0.45 * sin(t * 180));
      let y = ridge - map(noise(seedOffset + 20 + i * 0.3), 0, 1, 0, h * 0.5);
      if (i === 0 || i === peaks) y = baseY - random(h * 0.1, h * 0.22);
      pts.push([x, y]);
    }

    pts.push([right, baseY]);

    return pts;
  }

  let rocks = [
    rockShape(108, 322, 90, 78, 1.2),
    rockShape(208, 336, 110, 95, 4.7),
    rockShape(336, 318, 125, 88, 9.2),
    rockShape(470, 330, 150, 118, 14.4)
  ];

  brush.field("hand");
  brush.wiggle(4);

  for (let i = 0; i < rocks.length; i++) {
    let pts = rocks[i];

    brush.mass("crayon", "#2f2925", {
      strength: 0.78,
      precision: 0.34,
      gradient: 0.45,
      outline: true
    });
    brush.beginShape(0.18);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noMass();

    brush.hatchStyle("charcoal", "#443b35", 0.9);
    brush.hatch(7, 78, { rand: 0.14, continuous: false, gradient: 0.25 });
    brush.beginShape(0.18);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("charcoal", "#1f1b18", 1.4);
    brush.hatch(4, 112, { rand: 0.18, continuous: false, gradient: 0.2 });
    brush.beginShape(0.18);
    let cx = 0;
    for (let p of pts) cx += p[0];
    cx /= pts.length;
    for (let p of pts) {
      let x = lerp(cx, p[0], 0.68);
      let y = lerp(pts[0][1] - 8, p[1], 0.72);
      brush.vertex(x, y);
    }
    brush.endShape(true);
    brush.noHatch();

    brush.set("charcoal", "#221d19", 1.1);
    brush.beginShape(0.12);
    for (let p of pts) brush.vertex(p[0], p[1], random(0.8, 1.2));
    brush.endShape(true);
  }

  brush.noField();

  // rock cast shadows
  brush.noStroke();
  brush.fillTexture(0.55, 0.2, false);
  brush.fill("#6f5338", 30);
  brush.fillBleed(0.25, "out");

  let shadows = [
    [[72, 322], [128, 322], [172, 340], [123, 342]],
    [[165, 336], [236, 336], [296, 356], [220, 362]],
    [[286, 318], [360, 318], [418, 338], [350, 345]],
    [[407, 330], [507, 330], [580, 356], [485, 362]]
  ];

  for (let s of shadows) {
    brush.beginShape(0.25);
    for (let p of s) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }
  brush.noFill();

  // sand texture strokes
  brush.set("cpencil", "#9b744a", 0.35);
  for (let y = 330; y < 560; y += 20) {
    let pts = [];
    for (let x = 10; x <= 590; x += 32) {
      pts.push([x, y + map(noise(x * 0.025, y * 0.02), 0, 1, -4, 4), random(0.5, 0.9)]);
    }
    brush.spline(pts, 0.18);
  }

  brush.set("2B", "#7a5739", 0.32);
  for (let i = 0; i < 50; i++) {
    let x1 = random(20, 580);
    let y1 = random(350, 560);
    let x2 = x1 + random(18, 60);
    let y2 = y1 + random(-4, 6);
    brush.line(x1, y1, x2, y2);
  }

  noLoop();
}