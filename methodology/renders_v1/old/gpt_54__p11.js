function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(18);
  noiseSeed(18);

  brush.noField();
  brush.noClip();
  brush.noMass();
  brush.noWash();

  let palette = [
    "#b78a63", // warm ochre
    "#8f6f5a", // taupe
    "#a36f5d", // clay
    "#72806b", // olive gray
    "#907f6c", // stone
    "#c3a27e", // sand
    "#6f7c86"  // blue gray
  ];

  let rects = [
    { x: 56,  y: 58,  w: 218, h: 154, fill: "#c9a27a", hatch: "#6b5648", ang: 18,  dist: 11, brushName: "cpencil", stroke: "#6d5a4e", sw: 0.75 },
    { x: 212, y: 80,  w: 250, h: 130, fill: "#8d7d67", hatch: "#4f463d", ang: 108, dist: 10, brushName: "2H",      stroke: "#5a5148", sw: 0.65 },
    { x: 104, y: 182, w: 176, h: 210, fill: "#d1b18b", hatch: "#7f6656", ang: 72,  dist: 12, brushName: "HB",      stroke: "#786455", sw: 0.7  },
    { x: 286, y: 168, w: 210, h: 162, fill: "#6f7c73", hatch: "#435148", ang: 24,  dist: 11, brushName: "rotring", stroke: "#526057", sw: 0.7  },
    { x: 66,  y: 370, w: 246, h: 150, fill: "#a87562", hatch: "#66483e", ang: 156, dist: 10, brushName: "2B",      stroke: "#7a594a", sw: 0.78 },
    { x: 262, y: 332, w: 214, h: 182, fill: "#b4a089", hatch: "#675a4f", ang: 88,  dist: 12, brushName: "cpencil", stroke: "#77685c", sw: 0.68 },
    { x: 414, y: 60,  w: 118, h: 240, fill: "#c6ab84", hatch: "#77614f", ang: 34,  dist: 9,  brushName: "HB",      stroke: "#826b59", sw: 0.6  },
    { x: 336, y: 428, w: 170, h: 104, fill: "#8a786d", hatch: "#4f4541", ang: 145, dist: 10, brushName: "2H",      stroke: "#5f5450", sw: 0.62 }
  ];

  // soft paper grain
  for (let i = 0; i < 120; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let w = random(6, 18);
    let h = random(3, 10);
    brush.noStroke();
    brush.noHatch();
    brush.fill(random(["#f3eadc", "#efe4d3", "#f7efe3"]), 24);
    brush.fillTexture(0.18, 0.1, false);
    brush.rect(x, y, w, h, "corner");
  }

  // main rectangles
  for (let r of rects) {
    push();
    let jx = random(-4, 4);
    let jy = random(-4, 4);
    translate(jx, jy);

    brush.fill(r.fill, 108);
    brush.fillBleed(0.16, "out");
    brush.fillTexture(0.5, 0.24, true);

    brush.hatch(r.dist, r.ang, {
      rand: 0.12,
      continuous: false,
      gradient: 0.22
    });
    brush.hatchStyle(r.brushName, r.hatch, 0.78);

    brush.set("pen", r.stroke, r.sw);
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    pop();
  }

  // selective second hatch passes to build colored-pencil density
  let cross = [
    { idx: 1, angle: 18,  color: "#7e6f5e", dist: 17, brushName: "cpencil" },
    { idx: 3, angle: 112, color: "#5d6b62", dist: 15, brushName: "HB" },
    { idx: 4, angle: 62,  color: "#875e4f", dist: 16, brushName: "2H" },
    { idx: 5, angle: 12,  color: "#8d7867", dist: 18, brushName: "rotring" }
  ];

  brush.noFill();
  for (let c of cross) {
    let r = rects[c.idx];
    brush.hatch(c.dist, c.angle, {
      rand: 0.08,
      continuous: false,
      gradient: 0.15
    });
    brush.hatchStyle(c.brushName, c.color, 0.52);
    brush.noStroke();
    brush.rect(r.x, r.y, r.w, r.h, "corner");
  }

  // linear accents like pen drawing / architectural divisions
  let lines = [
    [54, 214, 532, 214],
    [104, 182, 104, 520],
    [280, 56, 280, 392],
    [60, 366, 478, 366],
    [334, 168, 334, 530],
    [414, 56, 414, 300],
    [212, 140, 460, 140],
    [66, 444, 312, 444]
  ];

  brush.noHatch();
  brush.noFill();
  brush.set("rotring", "#4b433e", 0.52);
  for (let ln of lines) {
    brush.line(ln[0], ln[1], ln[2], ln[3]);
  }

  // a few softer charcoal boundaries
  brush.set("charcoal", "#7b6a5f", 0.38);
  brush.line(52, 58, 52, 522);
  brush.line(52, 522, 508, 522);
  brush.line(530, 58, 530, 300);

  // colored pencil scumbles
  brush.set("crayon", "#9f8468", 0.42);
  brush.spline([
    [72, 338, 0.8],
    [142, 322, 1.1],
    [218, 344, 0.9],
    [286, 326, 0.7]
  ], 0.45);

  brush.set("crayon", "#6f7b72", 0.38);
  brush.spline([
    [298, 286, 0.7],
    [354, 302, 1.0],
    [422, 290, 0.85],
    [484, 306, 0.7]
  ], 0.42);

  brush.set("cpencil", "#b08d6a", 0.34);
  brush.spline([
    [360, 430, 0.6],
    [394, 418, 1.0],
    [446, 438, 0.9],
    [494, 424, 0.6]
  ], 0.5);

  // sparse spray specks for paper/dust atmosphere
  brush.set("spray", "#8c7766", 0.18);
  for (let i = 0; i < 16; i++) {
    let x1 = random(80, 520);
    let y1 = random(70, 530);
    let x2 = x1 + random(-12, 12);
    let y2 = y1 + random(-12, 12);
    brush.line(x1, y1, x2, y2);
  }

  noLoop();
}