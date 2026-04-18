function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noFill();
  brush.noStroke();

  brush.hatchStyle("cpencil", "#4a8a9f", 0.7);
  brush.hatch(4.5, 35, { rand: 0.1, continuous: true });
  drawOrganic(300, 300, 140, 190, 0.02, 20);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5e3c58", 0.8);
  brush.hatch(3.5, 110, { rand: 0.12, continuous: true });
  drawOrganic(320, 350, 120, 130, 0.02, 25);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#e07a5f", 0.7);
  brush.hatch(3, 75, { rand: 0.08, continuous: true });
  drawOrganic(245, 260, 35, 25, 0.05, 10);
  drawOrganic(355, 260, 35, 25, 0.05, 10);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#e29578", 0.8);
  brush.hatch(4, 160, { rand: 0.1, continuous: true });
  drawOrganic(300, 310, 25, 60, 0.04, 12);
  drawOrganic(240, 310, 45, 35, 0.04, 15);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#e9c46a", 0.6);
  brush.hatch(5, 15, { rand: 0.15, continuous: true });
  drawOrganic(330, 200, 70, 80, 0.03, 20);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2b2d42", 0.9);
  brush.hatch(4, 55, { rand: 0.2, continuous: true });
  drawOrganic(290, 180, 160, 60, 0.02, 30);
  drawOrganic(160, 320, 50, 140, 0.02, 25);
  brush.noHatch();

  brush.field("hand");
  brush.wiggle(3);
  brush.noFill();
  brush.noHatch();

  let contourColors = ["#2b2d42", "#5e3c58", "#4a8a9f"];
  for (let i = 0; i < 7; i++) {
    brush.set("cpencil", random(contourColors), random(0.5, 1.2));
    let pts = [];
    let cx = 300 + random(-15, 15);
    let cy = 300 + random(-15, 15);
    let rx = 140 + random(-10, 10);
    let ry = 190 + random(-10, 10);
    for (let a = 0; a < 360; a += 15) {
      let rScale = 1 + (noise(a * 0.05, i * 10) - 0.3) * 0.25;
      pts.push([
        cx + cos(a) * rx * rScale,
        cy + sin(a) * ry * rScale
      ]);
    }
    brush.spline(pts, 0.4);
  }

  brush.set("cpencil", "#2b2d42", 1.1);
  brush.spline([[215, 265], [245, 252], [275, 268]], 0.4);
  brush.spline([[325, 268], [355, 252], [385, 265]], 0.4);
  
  brush.set("cpencil", "#5e3c58", 0.9);
  brush.spline([[290, 260], [295, 330], [320, 345]], 0.3);
  
  brush.set("cpencil", "#e07a5f", 1.0);
  brush.spline([[265, 390], [300, 395], [335, 385]], 0.5);
  brush.spline([[275, 395], [300, 405], [325, 390]], 0.5);

  for (let i = 0; i < 12; i++) {
    brush.set("cpencil", random(["#4a8a9f", "#e9c46a", "#e07a5f"]), random(0.4, 0.8));
    let x = random(150, 450);
    let y = random(100, 500);
    brush.spline([
      [x, y],
      [x + random(-30, 30), y + random(-30, 30)],
      [x + random(-60, 60), y + random(-60, 60)]
    ], 0.5);
  }

  brush.noField();
  noLoop();
}

function drawOrganic(cx, cy, rx, ry, nScale, nAmount) {
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 12) {
    let xoff = cos(a) * rx;
    let yoff = sin(a) * ry;
    let n = (noise((cx + xoff) * nScale, (cy + yoff) * nScale) - 0.5) * nAmount;
    brush.vertex(cx + xoff + n, cy + yoff + n);
  }
  brush.endShape(true);
}