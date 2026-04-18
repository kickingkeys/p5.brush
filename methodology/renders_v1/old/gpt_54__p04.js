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

  noStroke();
  fillPaperGrain();
  paintAura();
  paintTorso();
  paintNeck();
  paintHairBack();
  paintFaceMass();
  paintFeatures();
  paintHairFront();
  paintContourThreads();
  paintGhostLines();

  noLoop();
}

function fillPaperGrain() {
  brush.set("2H", "#d8cfbf", 0.45);
  for (let i = 0; i < 700; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(3, 10);
    let a = random(-20, 20);
    brush.beginStroke("segments", x, y);
    brush.move(a, len, random(0.2, 0.5));
    brush.endStroke(a, random(0.2, 0.5));
  }
}

function paintAura() {
  let cx = 300;
  let cy = 280;

  let palette = [
    ["cpencil", "#d6b2ff", 0.8],
    ["2H", "#8db7ff", 0.7],
    ["HB", "#f0a36b", 0.8],
    ["2B", "#b596ff", 0.7],
    ["cpencil", "#7ea98a", 0.7]
  ];

  for (let k = 0; k < palette.length; k++) {
    let p = palette[k];
    brush.set(p[0], p[1], p[2]);
    for (let i = 0; i < 75; i++) {
      let ang = random(360);
      let r = random(125, 220);
      let x1 = cx + cos(ang) * r * random(0.65, 1.0);
      let y1 = cy + sin(ang) * r * random(0.45, 0.95);
      let x2 = cx + cos(ang + random(-20, 20)) * random(55, 110);
      let y2 = cy + sin(ang + random(-20, 20)) * random(55, 120);
      brush.line(x1, y1, x2, y2);
    }
  }
}

function paintTorso() {
  let cols = ["#7187c9", "#d3947e", "#9a7fbf", "#769a80", "#c6a45c"];

  for (let j = 0; j < 5; j++) {
    brush.set(j % 2 === 0 ? "cpencil" : "2B", cols[j], 0.9 + j * 0.05);
    for (let i = 0; i < 42; i++) {
      let x = random(165, 435);
      let y = random(390, 570);
      let len = random(55, 130);
      let ang = random(10, 170);
      brush.beginStroke("curve", x, y);
      brush.move(ang, len * 0.35, random(0.35, 0.8));
      brush.move(ang + random(-40, 40), len * 0.35, random(0.35, 0.9));
      brush.endStroke(ang + random(-25, 25), random(0.3, 0.75));
    }
  }

  brush.set("HB", "#534b4a", 0.7);
  for (let i = 0; i < 24; i++) {
    let y = random(430, 575);
    brush.line(random(170, 245), y, random(355, 430), y + random(-20, 20));
  }
}

function paintNeck() {
  let colors = ["#d79d82", "#b68ed8", "#7fa2c8", "#dcb16a"];

  for (let c of colors) {
    brush.set("cpencil", c, 0.75);
    for (let i = 0; i < 18; i++) {
      let x = random(255, 345);
      let y = random(320, 405);
      brush.beginStroke("curve", x, y);
      brush.move(random(78, 102), random(22, 42), random(0.45, 0.8));
      brush.endStroke(random(80, 100), random(0.35, 0.7));
    }
  }

  brush.set("2B", "#5f5150", 0.65);
  brush.line(262, 332, 245, 405);
  brush.line(336, 330, 357, 405);
}

function paintHairBack() {
  let hairCols = ["#44345a", "#245d77", "#7b5c97", "#3f6a55"];

  for (let h = 0; h < hairCols.length; h++) {
    brush.set(h % 2 === 0 ? "charcoal" : "2B", hairCols[h], 1.0);
    for (let i = 0; i < 55; i++) {
      let x = random(180, 420);
      let y = random(95, 360);
      let len1 = random(40, 95);
      let len2 = random(30, 75);
      brush.beginStroke("curve", x, y);
      brush.move(random(75, 120), len1, random(0.55, 1.15));
      brush.move(random(85, 135), len2, random(0.45, 1.05));
      brush.endStroke(random(80, 140), random(0.3, 0.85));
    }
  }

  brush.set("spray", "#8a6ca8", 0.55);
  for (let i = 0; i < 70; i++) {
    let x = random(185, 415);
    let y = random(105, 345);
    brush.line(x, y, x + random(-18, 18), y + random(-18, 18));
  }
}

function paintFaceMass() {
  let faceLayers = [
    ["2H", "#98b9e8", 0.85, 130],
    ["HB", "#efad8f", 0.95, 150],
    ["cpencil", "#c7a0df", 0.8, 125],
    ["2B", "#e1b86c", 0.7, 95],
    ["HB", "#7da08f", 0.65, 75]
  ];

  for (let l = 0; l < faceLayers.length; l++) {
    let layer = faceLayers[l];
    brush.set(layer[0], layer[1], layer[2]);

    for (let i = 0; i < layer[3]; i++) {
      let px = randomFacePoint();
      let a = random(-25, 25) + map(px.y, 120, 390, -8, 10);
      let len = random(16, 46);
      brush.beginStroke("segments", px.x, px.y);
      brush.move(a, len, random(0.35, 0.95));
      brush.endStroke(a + random(-8, 8), random(0.25, 0.85));
    }
  }

  brush.set("2H", "#fff2df", 0.55);
  for (let i = 0; i < 55; i++) {
    let x = random(250, 340);
    let y = random(170, 305);
    brush.line(x, y, x + random(10, 35), y + random(-8, 8));
  }
}

function paintFeatures() {
  paintEyes();
  paintNose();
  paintMouth();
  paintBrowAndCheeks();
}

function paintEyes() {
  brush.set("rotring", "#51474f", 0.6);
  brush.spline([[240, 248], [257, 242, 0.7], [274, 247]], 0.6);
  brush.spline([[323, 248], [340, 242, 0.7], [357, 248]], 0.6);

  brush.set("pen", "#3e3441", 0.45);
  brush.line(236, 249, 275, 249);
  brush.line(320, 249, 360, 249);

  brush.set("2B", "#5f4d73", 0.5);
  for (let i = 0; i < 20; i++) {
    brush.line(242 + random(-5, 5), 248 + random(-3, 3), 252 + random(2, 10), 250 + random(-2, 2));
    brush.line(330 + random(-5, 5), 248 + random(-3, 3), 340 + random(2, 10), 250 + random(-2, 2));
  }

  brush.set("HB", "#6f8fb7", 0.4);
  for (let i = 0; i < 18; i++) {
    brush.line(250 + random(-8, 8), 252 + random(-4, 4), 258 + random(-5, 5), 252 + random(-4, 4));
    brush.line(336 + random(-8, 8), 252 + random(-4, 4), 344 + random(-5, 5), 252 + random(-4, 4));
  }

  brush.set("cpencil", "#a06f62", 0.45);
  for (let i = 0; i < 15; i++) {
    brush.line(236 + random(-3, 3), 236 + random(-3, 3), 275 + random(-3, 3), 243 + random(-2, 2));
    brush.line(320 + random(-3, 3), 236 + random(-3, 3), 360 + random(-3, 3), 243 + random(-2, 2));
  }
}

function paintNose() {
  brush.set("HB", "#6e5d77", 0.55);
  brush.beginStroke("curve", 298, 220);
  brush.move(92, 40, 0.45);
  brush.move(108, 30, 0.55);
  brush.endStroke(20, 0.35);

  brush.set("2B", "#d28f74", 0.5);
  for (let i = 0; i < 22; i++) {
    brush.line(292 + random(-5, 5), 262 + random(-6, 6), 306 + random(-4, 4), 288 + random(-4, 4));
  }

  brush.set("rotring", "#56454b", 0.33);
  brush.arc(289, 293, 8, 10, 165);
  brush.arc(310, 294, 8, 15, 170);
}

function paintMouth() {
  brush.set("cpencil", "#a45673", 0.65);
  brush.spline([[255, 330], [280, 338, 0.7], [302, 337], [328, 333]], 0.65);

  brush.set("2B", "#d4865e", 0.45);
  for (let i = 0; i < 20; i++) {
    brush.line(258 + random(-6, 6), 334 + random(-4, 4), 324 + random(-5, 5), 336 + random(-4, 4));
  }

  brush.set("HB", "#6e5470", 0.36);
  brush.spline([[264, 346], [288, 351], [316, 346]], 0.55);
}

function paintBrowAndCheeks() {
  brush.set("2B", "#5d4a69", 0.55);
  for (let i = 0; i < 18; i++) {
    brush.line(233 + random(-4, 4), 232 + random(-4, 4), 276 + random(-4, 4), 228 + random(-3, 3));
    brush.line(320 + random(-4, 4), 228 + random(-4, 4), 362 + random(-4, 4), 233 + random(-3, 3));
  }

  brush.set("2H", "#9bb4d5", 0.45);
  for (let i = 0; i < 24; i++) {
    brush.line(220 + random(-5, 10), 297 + random(-10, 10), 255 + random(-8, 10), 310 + random(-8, 8));
    brush.line(340 + random(-10, 5), 300 + random(-10, 10), 376 + random(-10, 8), 311 + random(-8, 8));
  }

  brush.set("HB", "#e4a36e", 0.45);
  for (let i = 0; i < 20; i++) {
    brush.line(226 + random(-5, 10), 308 + random(-10, 10), 262 + random(-8, 10), 322 + random(-8, 8));
    brush.line(338 + random(-10, 5), 309 + random(-10, 10), 374 + random(-10, 8), 322 + random(-8, 8));
  }
}

function paintHairFront() {
  let frontCols = ["#2e485d", "#59416f", "#7b6444", "#325846"];

  for (let n = 0; n < frontCols.length; n++) {
    brush.set(n === 0 ? "charcoal" : "2B", frontCols[n], 0.95);

    for (let i = 0; i < 38; i++) {
      let side = random() < 0.5 ? -1 : 1;
      let sx = side < 0 ? random(175, 260) : random(340, 425);
      let sy = random(95, 250);
      let ex = side < 0 ? random(205, 285) : random(315, 395);
      let ey = random(180, 375);

      brush.beginStroke("curve", sx, sy);
      brush.move(side < 0 ? random(50, 95) : random(85, 130), random(35, 75), random(0.8, 1.15));
      brush.move(side < 0 ? random(60, 105) : random(75, 120), random(35, 85), random(0.45, 1.0));
      brush.endStroke(side < 0 ? random(65, 105) : random(75, 115), random(0.25, 0.85));

      if (random() < 0.25) {
        brush.line(sx, sy, ex, ey);
      }
    }
  }

  brush.set("spray", "#8e79b7", 0.45);
  for (let i = 0; i < 45; i++) {
    let x = random(190, 410);
    let y = random(100, 330);
    brush.line(x, y, x + random(-12, 12), y + random(8, 20));
  }
}

function paintContourThreads() {
  brush.set("HB", "#4d4345", 0.55);

  let contourA = [
    [292, 118], [248, 132], [220, 165], [205, 212], [202, 265],
    [214, 314], [238, 350], [275, 375]
  ];
  brush.spline(contourA, 0.55);

  let contourB = [
    [307, 118], [345, 132], [378, 165], [395, 218], [392, 275],
    [375, 324], [347, 356], [314, 376]
  ];
  brush.spline(contourB, 0.55);

  brush.set("2H", "#7fa4d2", 0.45);
  for (let i = 0; i < 24; i++) {
    let y = 140 + i * 9 + random(-2, 2);
    brush.line(220 + random(-8, 8), y, 380 + random(-8, 8), y + random(-6, 6));
  }

  brush.set("cpencil", "#d79783", 0.4);
  for (let i = 0; i < 20; i++) {
    let x1 = 215 + random(-8, 8);
    let y1 = 170 + i * 8 + random(-3, 3);
    let x2 = 382 + random(-8, 8);
    let y2 = y1 + random(-8, 8);
    brush.line(x1, y1, x2, y2);
  }
}

function paintGhostLines() {
  let ghostCols = ["#9f87ca", "#7697c8", "#d89c73", "#7a9d83"];

  for (let g = 0; g < ghostCols.length; g++) {
    brush.set(g % 2 === 0 ? "2H" : "cpencil", ghostCols[g], 0.45);
    for (let i = 0; i < 26; i++) {
      let x = random(120, 470);
      let y = random(90, 510);
      let len = random(25, 90);
      let a = random(-60, 60);
      brush.beginStroke("segments", x, y);
      brush.move(a, len, random(0.2, 0.6));
      brush.endStroke(a + random(-18, 18), random(0.15, 0.5));
    }
  }
}

function randomFacePoint() {
  let cx = 300;
  let cy = 245;
  let rx = 102;
  let ry = 132;

  let x, y, nx, ny;
  do {
    x = random(cx - rx, cx + rx);
    y = random(cy - ry, cy + ry + 12);
    nx = (x - cx) / rx;
    ny = (y - cy) / ry;
  } while (nx * nx + ny * ny > 1);

  if (y > 315 && abs(x - cx) > 48) {
    x = lerp(x, cx, 0.22);
  }

  return { x, y };
}