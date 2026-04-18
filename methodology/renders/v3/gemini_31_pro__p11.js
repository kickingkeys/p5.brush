const palette = ["#c38d45", "#7a8b96", "#8d9876", "#c28777", "#d5cebd", "#a66857", "#5b707d", "#e0d5c1"];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("hand");
  brush.wiggle(2);

  let regions = [
    [40, 40, 160, 220],
    [200, 40, 260, 80],
    [460, 40, 100, 340],
    [200, 120, 60, 260],
    [260, 120, 200, 180],
    [40, 260, 160, 300],
    [260, 300, 200, 80],
    [200, 380, 360, 180]
  ];

  let bands = [
    [30, 240, 540, 35],
    [430, 30, 45, 540]
  ];

  let allRects = regions.concat(bands);

  brush.set("2H", "#888c8e", 0.8);
  for (let i = 0; i < 15; i++) {
    let x1 = random(20, 580);
    let y1 = random(20, 580);
    brush.line(x1, y1, x1 + random(-100, 100), y1 + random(-100, 100));
  }

  for (let r of allRects) {
    let c1 = random(palette);
    let c2 = random(palette);
    
    let j = 3;
    let rx = r[0] + random(-j, j);
    let ry = r[1] + random(-j, j);
    let rw = r[2] + random(-j, j);
    let rh = r[3] + random(-j, j);

    brush.noStroke();
    brush.hatchStyle("cpencil", c1, random(0.8, 1.2));
    brush.hatch(random(3.5, 5.5), random([30, 45, 60, 75]), {rand: 0.05, continuous: true});
    drawPoly(rx, ry, rw, rh);
    brush.noHatch();

    brush.hatchStyle("cpencil", c2, random(0.7, 1.1));
    brush.hatch(random(4, 6.5), random([105, 120, 135, 150]), {rand: 0.05, continuous: true});
    drawPoly(rx, ry, rw, rh);
    brush.noHatch();

    brush.set("pen", "#2f3338", random(0.7, 1.3));
    drawPoly(rx, ry, rw, rh);
  }

  brush.set("rotring", "#2f3338", 0.6);
  let vLines = [40, 200, 260, 460, 560];
  for (let lx of vLines) {
    let x = lx + random(-4, 4);
    brush.line(x, random(10, 30), x, random(570, 590));
  }

  let hLines = [40, 120, 260, 300, 380, 560];
  for (let ly of hLines) {
    let y = ly + random(-4, 4);
    brush.line(random(10, 30), y, random(570, 590), y);
  }

  brush.set("charcoal", "#1a1c1e", 0.8);
  for (let i = 0; i < 5; i++) {
    let idx = floor(random(vLines.length));
    let x = vLines[idx] + random(-5, 5);
    let y = random(50, 450);
    brush.line(x, y, x + random(-2, 2), y + random(30, 100));
  }

  let shadowIdx = floor(random(regions.length));
  let sr = regions[shadowIdx];
  brush.noStroke();
  brush.hatchStyle("HB", "#3f454a", 1.0);
  brush.hatch(4, 45, {rand: 0.05, continuous: true});
  drawPoly(sr[0], sr[1], sr[2], sr[3]);
  brush.noHatch();

  brush.noField();
  noLoop();
}

function drawPoly(x, y, w, h) {
  let j = 2;
  brush.beginShape(0.1);
  brush.vertex(x + random(-j, j), y + random(-j, j));
  brush.vertex(x + w + random(-j, j), y + random(-j, j));
  brush.vertex(x + w + random(-j, j), y + h + random(-j, j));
  brush.vertex(x + random(-j, j), y + h + random(-j, j));
  brush.endShape(true);
}