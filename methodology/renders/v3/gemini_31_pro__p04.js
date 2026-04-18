function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function getDeformedShape(cx, cy, rx, ry, noiseOffset, steps = 40) {
  let pts = [];
  for (let i = 0; i < steps; i++) {
    let a = (i / steps) * 360;
    let n = noise(cos(a) * 0.5 + noiseOffset, sin(a) * 0.5 + noiseOffset) * 2 - 1;
    let x = cx + cos(a) * (rx + n * rx * 0.25);
    let y = cy + sin(a) * (ry + n * ry * 0.25);
    pts.push([x, y]);
  }
  return pts;
}

function drawShape(pts) {
  brush.beginShape(0.6);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noFill();
  brush.noStroke();

  let aura = getDeformedShape(300, 280, 160, 180, 10);
  brush.hatchStyle("cpencil", "#e0a458", 1.0);
  brush.hatch(6, 45, { rand: 0.1, continuous: true });
  drawShape(aura);

  brush.hatchStyle("cpencil", "#c1d3de", 0.8);
  brush.hatch(8, -30, { rand: 0.1, continuous: true });
  drawShape(aura);
  brush.noHatch();

  let face = getDeformedShape(300, 330, 100, 140, 20);
  brush.hatchStyle("cpencil", "#b5dfd1", 0.9);
  brush.hatch(4, 15, { rand: 0.05 });
  drawShape(face);

  brush.hatchStyle("cpencil", "#e3c0d3", 0.8);
  brush.hatch(5, 105, { rand: 0.05 });
  drawShape(face);
  brush.noHatch();

  let neck = getDeformedShape(300, 480, 45, 90, 30);
  brush.hatchStyle("cpencil", "#b5dfd1", 0.9);
  brush.hatch(5, 15, { rand: 0.05 });
  drawShape(neck);
  
  brush.hatchStyle("cpencil", "#c14953", 0.7);
  brush.hatch(4, -60, { rand: 0.05 });
  drawShape(neck);
  brush.noHatch();

  let cheek = getDeformedShape(350, 380, 35, 55, 40);
  brush.hatchStyle("cpencil", "#f08080", 0.7);
  brush.hatch(3, 60, { rand: 0.1 });
  drawShape(cheek);
  brush.noHatch();

  let eyeL = getDeformedShape(260, 300, 30, 20, 50);
  brush.hatchStyle("cpencil", "#225560", 0.8);
  brush.hatch(2.5, 45, { rand: 0.05 });
  drawShape(eyeL);
  
  brush.hatchStyle("cpencil", "#3a2e5d", 0.7);
  brush.hatch(2.5, 135, { rand: 0.05 });
  drawShape(eyeL);
  brush.noHatch();

  let eyeR = getDeformedShape(340, 300, 30, 20, 60);
  brush.hatchStyle("cpencil", "#225560", 0.8);
  brush.hatch(2.5, 45, { rand: 0.05 });
  drawShape(eyeR);
  
  brush.hatchStyle("cpencil", "#3a2e5d", 0.7);
  brush.hatch(2.5, 135, { rand: 0.05 });
  drawShape(eyeR);
  brush.noHatch();

  let nose = getDeformedShape(300, 340, 18, 45, 70);
  brush.hatchStyle("cpencil", "#c14953", 0.6);
  brush.hatch(3, -20, { rand: 0.05 });
  drawShape(nose);
  brush.noHatch();

  let mouth = getDeformedShape(300, 410, 35, 12, 80);
  brush.hatchStyle("cpencil", "#c14953", 0.8);
  brush.hatch(2.5, 80, { rand: 0.05 });
  drawShape(mouth);
  brush.noHatch();

  brush.noHatch();
  
  for (let i = 0; i < 3; i++) {
    let contour = getDeformedShape(300, 330, 100, 140, 20 + i * 5).map(p => [p[0], p[1], random(0.3, 1.2)]);
    brush.set("cpencil", i % 2 === 0 ? "#3a2e5d" : "#225560", random(0.6, 1.1));
    brush.spline(contour, 0.4);
  }

  for (let i = 0; i < 4; i++) {
    let contour = getDeformedShape(300, 280, 160, 180, 10 + i * 5).map(p => [p[0], p[1], random(0.4, 1.5)]);
    brush.set("cpencil", i % 2 === 0 ? "#e0a458" : "#c14953", random(0.7, 1.3));
    brush.spline(contour, 0.5);
  }

  for (let i = 0; i < 25; i++) {
    let sx = 300 + random(-150, 150);
    let sy = 330 + random(-180, 180);
    let ex = sx + random(-40, 40);
    let ey = sy + random(-40, 40);
    brush.set("cpencil", random(["#f08080", "#225560", "#e0a458", "#3a2e5d", "#c1d3de"]), random(0.4, 1.0));
    brush.spline([[sx, sy, random(0.2, 0.8)], [ex, ey, random(0.5, 1.5)]], 0.2);
  }

  noLoop();
}