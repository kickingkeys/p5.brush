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

  // Sky wash
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.fillTexture(0.75, 0.42);
  brush.wash("#d9c7a8", 55);
  brush.fill("#bfcfe0", 70);
  brush.fillBleed(0.42, "out");
  organicBand(-40, 0, 640, 330, 18, 30, 0.010, 0.0, 0.45);
  brush.noWash();

  // Dawn glow
  brush.fill("#d8b29b", 52);
  brush.fillBleed(0.38, "out");
  organicEllipse(305, 138, 210, 120, 30, 18, 0.020, 50.0, 0.55);

  brush.fill("#caa19d", 34);
  brush.fillBleed(0.35, "out");
  organicEllipse(320, 160, 280, 150, 30, 20, 0.020, 120.0, 0.55);

  // Upper fog layers
  for (let i = 0; i < 8; i++) {
    let y = random(70, 250);
    let h = random(35, 80);
    let c = random(["#c8d5de", "#d5c7bb", "#bfcad5", "#ddd5c8"]);
    brush.fill(c, random(16, 30));
    brush.fillBleed(random(0.42, 0.60), "out");
    organicBand(
      -30,
      y,
      660,
      h,
      16,
      random(14, 34),
      0.014,
      i * 40,
      0.5
    );
  }

  // Distant shore / harbor mass
  brush.fill("#98a4af", 28);
  brush.fillBleed(0.28, "out");
  brush.beginShape(0.4);
  brush.vertex(0, 265);
  brush.vertex(55, 255);
  brush.vertex(120, 262);
  brush.vertex(185, 248);
  brush.vertex(240, 256);
  brush.vertex(300, 245);
  brush.vertex(360, 252);
  brush.vertex(425, 246);
  brush.vertex(490, 257);
  brush.vertex(550, 248);
  brush.vertex(600, 255);
  brush.vertex(600, 300);
  brush.vertex(0, 300);
  brush.endShape(true);

  // Faint building blocks in mist
  brush.fill("#a3a7ac", 16);
  brush.fillBleed(0.24, "out");
  let blocks = [
    [70, 225, 35, 24],
    [110, 218, 28, 31],
    [170, 220, 40, 22],
    [238, 210, 24, 34],
    [275, 214, 36, 26],
    [338, 216, 30, 30],
    [402, 220, 42, 23],
    [468, 214, 32, 29],
    [525, 222, 38, 22]
  ];
  for (let b of blocks) {
    brush.rect(b[0], b[1], b[2], b[3], "corner");
  }

  // Water base
  brush.fillTexture(0.68, 0.30);
  brush.wash("#c4d0d8", 36);
  brush.fill("#9fb7c4", 52);
  brush.fillBleed(0.26, "out");
  brush.beginShape(0.35);
  brush.vertex(0, 280);
  brush.vertex(600, 280);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Watercolor water layers
  for (let i = 0; i < 11; i++) {
    let yy = map(i, 0, 10, 290, 590);
    let hh = random(20, 48);
    let col = random(["#9eb5c1", "#a7bac2", "#b5b6bf", "#8fa6b5"]);
    brush.fill(col, random(16, 28));
    brush.fillBleed(random(0.18, 0.30), "out");
    organicBand(
      -20,
      yy,
      640,
      hh,
      14,
      random(7, 18),
      0.018,
      200 + i * 30,
      0.32
    );
  }

  // Reflections / soft vertical stains
  for (let i = 0; i < 8; i++) {
    let rx = random(60, 560);
    let ry = random(305, 420);
    let rw = random(16, 36);
    let rh = random(90, 180);
    brush.fill(random(["#8da3b1", "#a7a6ad", "#9aaeb8"]), random(10, 20));
    brush.fillBleed(0.22, "out");
    organicEllipse(rx, ry + rh * 0.22, rw, rh, 24, 9, 0.03, i * 17, 0.22);
  }

  // Foreground dock / hull silhouettes as soft masses
  brush.fill("#74808b", 34);
  brush.fillBleed(0.20, "out");
  brush.beginShape(0.28);
  brush.vertex(55, 338);
  brush.vertex(118, 332);
  brush.vertex(168, 336);
  brush.vertex(210, 348);
  brush.vertex(196, 362);
  brush.vertex(126, 366);
  brush.vertex(76, 360);
  brush.vertex(48, 350);
  brush.endShape(true);

  brush.fill("#7a858e", 30);
  brush.fillBleed(0.22, "out");
  brush.beginShape(0.28);
  brush.vertex(332, 354);
  brush.vertex(398, 346);
  brush.vertex(470, 351);
  brush.vertex(514, 368);
  brush.vertex(500, 382);
  brush.vertex(438, 388);
  brush.vertex(360, 382);
  brush.vertex(324, 370);
  brush.endShape(true);

  // Low fog crossing harbor
  for (let i = 0; i < 7; i++) {
    brush.fill(random(["#ece6dc", "#d8d8d2", "#d7d2ca", "#d8dde0"]), random(18, 34));
    brush.fillBleed(random(0.45, 0.62), "out");
    organicBand(
      -30,
      random(250, 410),
      660,
      random(24, 58),
      18,
      random(10, 26),
      0.020,
      400 + i * 31,
      0.42
    );
  }

  brush.noFill();

  // Very soft atmospheric spray
  brush.field("curved");
  for (let i = 0; i < 180; i++) {
    let x = random(0, 600);
    let y = random(40, 430);
    brush.set("spray", random(["#d9d2c7", "#cdd7df", "#bfc7cf"]), random(0.35, 0.9));
    brush.flowLine(x, y, random(5, 16), random(360));
  }
  brush.noField();

  // Harbor pencil scaffolding: horizon and faint docks
  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#7f7d79", 0.42);
  brush.line(0, 279, 600, 281);
  brush.set("HB", "#6c6965", 0.50);
  brush.line(42, 348, 214, 350);
  brush.line(325, 368, 516, 370);

  // Masts
  let masts = [
    { x: 92, by: 348, top: 148, w: 0.54 },
    { x: 122, by: 347, top: 118, w: 0.42 },
    { x: 157, by: 345, top: 170, w: 0.48 },
    { x: 190, by: 349, top: 136, w: 0.40 },
    { x: 372, by: 367, top: 160, w: 0.48 },
    { x: 412, by: 366, top: 124, w: 0.56 },
    { x: 448, by: 368, top: 148, w: 0.44 },
    { x: 486, by: 370, top: 178, w: 0.40 }
  ];

  for (let m of masts) {
    brush.set(random() < 0.5 ? "HB" : "2H", "#676460", m.w);
    brush.line(m.x, m.by, m.x + random(-2, 2), m.top);
  }

  // Cross spars and booms
  brush.set("2H", "#7b7873", 0.34);
  brush.line(72, 210, 114, 205);
  brush.line(102, 232, 144, 226);
  brush.line(140, 246, 176, 242);
  brush.line(350, 248, 395, 242);
  brush.line(392, 210, 438, 206);
  brush.line(426, 264, 466, 260);

  // Ropes and rigging
  brush.set("2H", "#817d78", 0.28);
  rig(92, 148, 67, 249, 5);
  rig(92, 148, 119, 272, 3);
  rig(122, 118, 92, 250, 6);
  rig(157, 170, 137, 286, 4);
  rig(157, 170, 183, 268, 7);
  rig(190, 136, 164, 255, 2);

  rig(372, 160, 346, 274, 9);
  rig(372, 160, 402, 286, 4);
  rig(412, 124, 384, 256, 12);
  rig(412, 124, 442, 274, 6);
  rig(448, 148, 424, 285, 3);
  rig(486, 178, 465, 297, 10);

  // Faint hull contours
  brush.set("HB", "#615d58", 0.45);
  hullLine(55, 338, 210, 348, 0.30);
  hullLine(332, 354, 514, 368, 0.28);

  // Water reflections of masts
  for (let m of masts) {
    let len = map(m.top, 118, 178, 120, 78);
    brush.set("2H", "#8f918f", 0.22);
    brokenReflection(m.x + random(-2, 2), m.by, len);
  }

  // Gentle graphite hatching in a few shadow areas
  brush.hatchStyle("2H", "#8b8882", 0.22);
  brush.hatch(10, 8, { rand: 0.08, continuous: true, gradient: 0.15 });
  brush.beginShape(0.25);
  brush.vertex(54, 347);
  brush.vertex(115, 344);
  brush.vertex(171, 347);
  brush.vertex(198, 355);
  brush.vertex(128, 358);
  brush.vertex(76, 355);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#8b8882", 0.20);
  brush.hatch(11, 6, { rand: 0.07, continuous: true, gradient: 0.12 });
  brush.beginShape(0.25);
  brush.vertex(334, 364);
  brush.vertex(404, 358);
  brush.vertex(486, 366);
  brush.vertex(495, 376);
  brush.vertex(430, 381);
  brush.vertex(356, 378);
  brush.endShape(true);
  brush.noHatch();

  // Tiny harbor accents
  brush.set("rotring", "#6a6763", 0.22);
  brush.line(238, 246, 238, 230);
  brush.line(275, 245, 275, 228);
  brush.line(523, 248, 523, 233);

  // Final veil of mist
  brush.noStroke();
  brush.fillTexture(0.52, 0.20);
  for (let i = 0; i < 6; i++) {
    brush.fill("#f3eee5", random(10, 18));
    brush.fillBleed(0.58, "out");
    organicBand(
      -40,
      random(160, 420),
      680,
      random(32, 65),
      18,
      random(10, 24),
      0.022,
      700 + i * 23,
      0.5
    );
  }
  brush.noFill();
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noWash();
  brush.noField();

  noLoop();
}

function organicBand(x, y, w, h, steps, amp, ns, zoff, curvature) {
  brush.beginShape(curvature);
  for (let i = 0; i <= steps; i++) {
    let xx = x + (w * i) / steps;
    let yy = y + noise(xx * ns, y * ns, zoff) * amp - amp * 0.5;
    brush.vertex(xx, yy);
  }
  for (let i = steps; i >= 0; i--) {
    let xx = x + (w * i) / steps;
    let yy =
      y +
      h +
      noise(xx * ns, (y + h) * ns, zoff + 50) * amp -
      amp * 0.5;
    brush.vertex(xx, yy);
  }
  brush.endShape(true);
}

function organicEllipse(cx, cy, w, h, steps, amp, ns, zoff, curvature) {
  brush.beginShape(curvature);
  for (let i = 0; i < steps; i++) {
    let a = (360 * i) / steps;
    let rx = w * 0.5;
    let ry = h * 0.5;
    let n = noise(cos(a) * ns + zoff, sin(a) * ns + zoff, zoff * 0.01);
    let rmod = 1 + map(n, 0, 1, -amp / max(w, h), amp / max(w, h));
    let x = cx + cos(a) * rx * rmod;
    let y = cy + sin(a) * ry * rmod;
    brush.vertex(x, y);
  }
  brush.endShape(true);
}

function rig(x1, y1, x2, y2, z) {
  let mx = lerp(x1, x2, 0.5) + map(noise(z * 0.1), 0, 1, -8, 8);
  let my = lerp(y1, y2, 0.5) + map(noise(z * 0.1 + 20), 0, 1, -6, 6);
  brush.spline(
    [
      [x1, y1, 0.25],
      [mx, my, 0.18],
      [x2, y2, 0.12]
    ],
    0.35
  );
}

function hullLine(x1, y1, x2, y2, curvature) {
  let mx = (x1 + x2) * 0.5;
  let my = max(y1, y2) + 12;
  brush.spline(
    [
      [x1, y1, 0.35],
      [mx, my, 0.28],
      [x2, y2, 0.20]
    ],
    curvature
  );
}

function brokenReflection(x, y, len) {
  let segments = int(random(5, 9));
  let yy = y + 3;
  for (let i = 0; i < segments; i++) {
    let seg = len / segments * random(0.45, 0.9);
    let xx = x + random(-4, 4);
    brush.line(xx, yy, xx + random(-2, 2), yy + seg);
    yy += seg + random(6, 13);
  }
}