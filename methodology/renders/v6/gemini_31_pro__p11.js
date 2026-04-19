function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(404);
  noiseSeed(404);

  brush.noFill();
  brush.noWash();

  const palette = [
    ["#b38a36", "#997326", "#cc9e3d"], 
    ["#4a6b80", "#365466", "#5e87a3"], 
    ["#994d3d", "#803a2b", "#b35947"], 
    ["#6b804a", "#546636", "#859c5c"], 
    ["#80776b", "#665e52", "#998e80"], 
    ["#a3988c", "#8c8278", "#bfae9f"]  
  ];

  const boxes = [
    [40, 40, 140, 520],
    [180, 40, 380, 110],
    [180, 150, 260, 250],
    [440, 150, 120, 410],
    [180, 400, 260, 160],
    [90, 190, 150, 170],
    [340, 80, 130, 190],
    [220, 220, 140, 140]
  ];

  function getNoisyRect(x, y, w, h) {
    return [
      [x + random(-3, 3), y + random(-3, 3)],
      [x + w + random(-3, 3), y + random(-3, 3)],
      [x + w + random(-3, 3), y + h + random(-3, 3)],
      [x + random(-3, 3), y + h + random(-3, 3)]
    ];
  }

  function drawShape(pts, curvature) {
    brush.beginShape(curvature);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(CLOSE);
  }

  brush.set("2H", "#99938c", 0.7);
  for (let i = 0; i < 6; i++) {
    brush.line(
      random(20, 580), random(20, 580), 
      random(20, 580), random(20, 580)
    );
  }

  for (let b of boxes) {
    let pts = getNoisyRect(b[0], b[1], b[2], b[3]);
    let colGroup = random(palette);
    
    let a1 = random([15, 30, 45, 75, 105]);
    let a2 = a1 + random([45, 60, 90]);
    let a3 = a1 - random([30, 45]);

    brush.hatchStyle("cpencil", colGroup[0], random(0.7, 1.0));
    brush.hatch(random(3.5, 5), a1, { rand: 0.06, continuous: false });
    drawShape(pts, 0.1);
    brush.noHatch();

    brush.hatchStyle("cpencil", colGroup[1], random(0.6, 0.9));
    brush.hatch(random(4, 6), a2, { rand: 0.05, continuous: false });
    drawShape(pts, 0.1);
    brush.noHatch();

    if (random() > 0.3) {
      brush.hatchStyle("cpencil", colGroup[2], random(0.5, 0.8));
      brush.hatch(random(4.5, 7), a3, { rand: 0.07, continuous: false });
      drawShape(pts, 0.1);
      brush.noHatch();
    }

    brush.set("pen", "#2a2724", random(0.8, 1.3));
    drawShape(pts, 0.1);
  }

  const structureLines = [
    [180, 20, 180, 580],
    [20, 150, 580, 150],
    [440, 120, 440, 580],
    [150, 400, 580, 400],
    [180, 150, 440, 400],
    [40, 40, 560, 40],
    [40, 560, 560, 560],
    [40, 40, 40, 560],
    [560, 40, 560, 560]
  ];

  brush.noHatch();
  for (let l of structureLines) {
    if (random() > 0.5) {
      brush.set("rotring", "#262320", random(0.6, 1.0));
    } else {
      brush.set("pen", "#1a1816", random(1.0, 1.5));
    }
    
    let x1 = l[0] + random(-5, 5);
    let y1 = l[1] + random(-5, 5);
    let x2 = l[2] + random(-5, 5);
    let y2 = l[3] + random(-5, 5);
    
    brush.line(x1, y1, x2, y2);
  }

  noLoop();
}