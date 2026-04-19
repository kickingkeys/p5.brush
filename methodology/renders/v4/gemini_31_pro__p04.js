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

  let hairBack = getShape(300, 270, 150, 170, 10, 40);
  drawCPencil(hairBack, ["#2d424a", "#5e3e4a", "#8c5e58"], 45, 1.2);

  let neck = [
    [240, 380], [210, 620], [390, 620], [360, 380]
  ];
  drawCPencil(neck, ["#a1b5c2", "#d4c3b6"], 15, 0.9);

  let face = getShape(300, 330, 100, 130, 20, 15);
  drawCPencil(face, ["#f0e3ce", "#e8c3c3", "#bfe0de"], 75, 0.8);

  let leftCheek = [
    [210, 330], [230, 420], [300, 450], [270, 390], [220, 330]
  ];
  drawCPencil(leftCheek, ["#e39691", "#7fa3a0"], 120, 0.8);

  let rightJaw = [
    [360, 310], [390, 360], [360, 430], [330, 390], [360, 310]
  ];
  drawCPencil(rightJaw, ["#d4c3b6", "#a1b5c2"], 30, 0.8);

  let noseShadow = [
    [290, 290], [280, 360], [315, 375], [305, 290]
  ];
  drawCPencil(noseShadow, ["#e39691", "#bfe0de"], 160, 0.7);

  let leftEye = getShape(260, 295, 22, 15, 50, 5);
  drawCPencil(leftEye, ["#735f5f", "#9e7777", "#2d424a"], 10, 1.0);

  let rightEye = getShape(340, 295, 22, 15, 60, 5);
  drawCPencil(rightEye, ["#735f5f", "#9e7777", "#2d424a"], 100, 1.0);

  brush.noHatch();
  brush.noFill();

  let contourColors = ["#f05d43", "#29a399", "#f2d04e", "#5e3e4a", "#8c5e58"];
  
  for (let i = 0; i < 12; i++) {
    brush.set("cpencil", random(contourColors), random(0.5, 1.2));
    let xOff = random(-20, 20);
    brush.spline([
      [200 + xOff, 200 + random(-30, 30)],
      [160 + xOff, 350 + random(-30, 30)],
      [190 + xOff, 480 + random(-30, 30)],
      [140 + xOff, 620 + random(-30, 30)]
    ], 0.4);
    
    brush.set("cpencil", random(contourColors), random(0.5, 1.2));
    let xOff2 = random(-20, 20);
    brush.spline([
      [400 + xOff2, 200 + random(-30, 30)],
      [440 + xOff2, 350 + random(-30, 30)],
      [410 + xOff2, 480 + random(-30, 30)],
      [460 + xOff2, 620 + random(-30, 30)]
    ], 0.4);
  }

  for (let i = 0; i < 5; i++) {
    brush.set("cpencil", random(contourColors), random(0.6, 1.3));
    brush.circle(260 + random(-8, 8), 295 + random(-8, 8), random(12, 25), true);
    brush.circle(340 + random(-8, 8), 295 + random(-8, 8), random(12, 25), true);
  }

  brush.set("cpencil", "#f05d43", 0.9);
  brush.spline([[220, 250], [205, 330], [240, 430], [300, 460], [360, 420], [385, 320]], 0.4);

  brush.set("cpencil", "#29a399", 0.8);
  brush.spline([[240, 280], [270, 275], [300, 285], [330, 275], [360, 280]], 0.3);

  brush.set("cpencil", "#f2d04e", 1.0);
  brush.spline([[285, 350], [300, 380], [320, 355]], 0.5);
  
  brush.set("cpencil", "#5e3e4a", 1.1);
  brush.spline([[270, 400], [300, 410], [330, 395]], 0.3);

  noLoop();
}

function getShape(cx, cy, rx, ry, seed, noiseAmt) {
  let pts = [];
  for (let a = 0; a < 360; a += 12) {
    let n = noise(cx + cos(a) * 0.02, cy + sin(a) * 0.02, seed) * noiseAmt - (noiseAmt / 2);
    pts.push([cx + cos(a) * rx + n, cy + sin(a) * ry + n]);
  }
  return pts;
}

function drawCPencil(pts, colors, baseAngle, weightMultiplier) {
  brush.noStroke();
  brush.noFill();
  for (let i = 0; i < colors.length; i++) {
    brush.hatchStyle("cpencil", colors[i], random(0.7, 1.1) * weightMultiplier);
    let dist = random(3.5, 5.5);
    let angle = baseAngle + i * random(35, 55);
    brush.hatch(dist, angle, { rand: 0.08, continuous: true });
    brush.beginShape(0.4);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(CLOSE);
    brush.noHatch();
  }
}