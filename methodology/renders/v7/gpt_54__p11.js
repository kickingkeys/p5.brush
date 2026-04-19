let palette = ["#8a7a63", "#6f8a72", "#b28a63", "#8c6b5a", "#7f7466", "#9a8b6a"];
let rects = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  rects = [
    { x: 55,  y: 70,  w: 210, h: 140, c: palette[1], a1: 18,  a2: 108, d1: 10, d2: 16 },
    { x: 210, y: 55,  w: 250, h: 170, c: palette[0], a1: 92,  a2: 18,  d1: 9,  d2: 15 },
    { x: 360, y: 95,  w: 165, h: 210, c: palette[2], a1: 28,  a2: 118, d1: 11, d2: 18 },
    { x: 90,  y: 215, w: 185, h: 210, c: palette[3], a1: 72,  a2: 150, d1: 10, d2: 17 },
    { x: 255, y: 210, w: 235, h: 155, c: palette[5], a1: 8,   a2: 98,  d1: 8,  d2: 13 },
    { x: 425, y: 250, w: 115, h: 205, c: palette[4], a1: 88,  a2: 30,  d1: 9,  d2: 16 },
    { x: 125, y: 405, w: 205, h: 120, c: palette[5], a1: 20,  a2: 110, d1: 10, d2: 18 },
    { x: 310, y: 385, w: 215, h: 145, c: palette[1], a1: 100, a2: 38,  d1: 8,  d2: 14 },
    { x: 70,  y: 485, w: 130, h: 70,  c: palette[0], a1: 0,   a2: 90,  d1: 7,  d2: 12 }
  ];
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(27);
  noiseSeed(27);

  drawPaperGrain();
  drawUnderpainting();
  drawMainRects();
  drawIntersections();
  drawContours();
  drawLinearAccents();

  noLoop();
}

function drawPaperGrain() {
  brush.noFill();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  for (let i = 0; i < 120; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = x1 + random(-18, 18);
    let y2 = y1 + random(-18, 18);
    brush.set("2H", "#d8d0c2", 0.35);
    brush.line(x1, y1, x2, y2);
  }

  for (let i = 0; i < 40; i++) {
    brush.set("spray", "#e8dfd0", 0.5);
    brush.flowLine(random(width), random(height), random(5, 18), random(360));
  }
}

function drawUnderpainting() {
  brush.noStroke();

  for (let r of rects) {
    brush.wash(r.c, 42);
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noWash();
  }
}

function drawMainRects() {
  for (let i = 0; i < rects.length; i++) {
    let r = rects[i];

    // colored pencil hatch layer
    brush.noStroke();
    brush.noFill();
    brush.hatchStyle("cpencil", r.c, 0.95);
    brush.hatch(r.d1, r.a1, {
      rand: 0.08,
      continuous: true,
      gradient: 0.18
    });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();

    // second tone with graphite or pen variation
    let darker = lerpColor(color(r.c), color("#2f2a24"), 0.35);
    if (i % 3 === 0) {
      brush.hatchStyle("rotring", darker, 0.45);
    } else if (i % 3 === 1) {
      brush.hatchStyle("HB", darker, 0.7);
    } else {
      brush.hatchStyle("pen", darker, 0.55);
    }

    brush.hatch(r.d2, r.a2, {
      rand: 0.06,
      continuous: true,
      gradient: 0.1
    });
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noHatch();

    // selective denser interior sub-rectangle
    let ix = r.x + r.w * random(0.12, 0.35);
    let iy = r.y + r.h * random(0.12, 0.35);
    let iw = r.w * random(0.28, 0.52);
    let ih = r.h * random(0.24, 0.5);

    brush.hatchStyle("cpencil", darker, 0.7);
    brush.hatch(max(5, r.d1 * 0.7), r.a1 + random(-12, 12), {
      rand: 0.09,
      continuous: true,
      gradient: 0.25
    });
    brush.rect(ix, iy, iw, ih, "corner");
    brush.noHatch();
  }
}

function drawIntersections() {
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      let a = rects[i];
      let b = rects[j];

      let x1 = max(a.x, b.x);
      let y1 = max(a.y, b.y);
      let x2 = min(a.x + a.w, b.x + b.w);
      let y2 = min(a.y + a.h, b.y + b.h);

      if (x2 - x1 > 18 && y2 - y1 > 18) {
        let mixCol = lerpColor(color(a.c), color(b.c), 0.5);
        let darkMix = lerpColor(mixCol, color("#2c2722"), 0.45);

        brush.noStroke();
        brush.wash(mixCol, 36);
        brush.rect(x1, y1, x2 - x1, y2 - y1, "corner");
        brush.noWash();

        brush.noFill();
        brush.hatchStyle("cpencil", darkMix, 0.8);
        brush.hatch(random([4, 5, 6, 7]), random([35, 55, 125, 145]), {
          rand: 0.08,
          continuous: true,
          gradient: 0.2
        });
        brush.rect(x1, y1, x2 - x1, y2 - y1, "corner");
        brush.noHatch();

        brush.hatchStyle("rotring", "#3b342d", 0.38);
        brush.hatch(random([8, 9, 10]), random([0, 90]), {
          rand: 0.05,
          continuous: true,
          gradient: 0.05
        });
        brush.rect(x1, y1, x2 - x1, y2 - y1, "corner");
        brush.noHatch();
      }
    }
  }
}

function drawContours() {
  for (let i = 0; i < rects.length; i++) {
    let r = rects[i];
    let edgeCol = i % 2 === 0 ? "#4c443b" : "#5b5045";

    brush.noFill();
    brush.set("pen", edgeCol, 0.8);
    brush.rect(r.x, r.y, r.w, r.h, "corner");

    brush.set("2H", "#7d7265", 0.45);
    brush.line(r.x, r.y, r.x + r.w, r.y);
    brush.line(r.x, r.y, r.x, r.y + r.h);

    brush.set("HB", "#4a433a", 0.55);
    brush.line(r.x + r.w, r.y, r.x + r.w, r.y + r.h);
    brush.line(r.x, r.y + r.h, r.x + r.w, r.y + r.h);
  }
}

function drawLinearAccents() {
  for (let i = 0; i < 11; i++) {
    let x = random(40, 540);
    let y = random(50, 550);
    let len = random(80, 220);
    let ang = random([0, 90, 20, 110]);

    let pts = [];
    let x2 = x + cos(ang) * len;
    let y2 = y + sin(ang) * len;
    let mx = lerp(x, x2, 0.5) + random(-20, 20);
    let my = lerp(y, y2, 0.5) + random(-20, 20);
    pts.push([x, y, 0.55]);
    pts.push([mx, my, 0.8]);
    pts.push([x2, y2, 0.5]);

    brush.set(i % 2 === 0 ? "cpencil" : "2B", i % 2 === 0 ? "#6a5c4c" : "#403830", i % 2 === 0 ? 0.65 : 0.75);
    brush.spline(pts, 0.18);
  }
}