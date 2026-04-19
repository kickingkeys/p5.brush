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

  function generateBlob(cx, cy, rx, ry, noiseScale, noiseAmp) {
    let pts = [];
    let nOff = random(1000);
    for (let a = 0; a < 360; a += 12) {
      let n = noise(nOff + cos(a) * noiseScale, nOff + sin(a) * noiseScale);
      let rModX = rx + (n - 0.5) * noiseAmp;
      let rModY = ry + (n - 0.5) * noiseAmp;
      pts.push([cx + cos(a) * rModX, cy + sin(a) * rModY]);
    }
    return pts;
  }

  function drawLayeredHatch(pts, colors, baseAngle, dists) {
    for (let i = 0; i < colors.length; i++) {
      brush.hatchStyle("cpencil", colors[i], random(0.6, 1.1));
      brush.hatch(dists[i], baseAngle + i * 65, { rand: 0.08, continuous: true });
      brush.beginShape(0.4);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noHatch();
    }
  }

  let auraPts = generateBlob(300, 260, 160, 190, 0.4, 80);
  drawLayeredHatch(auraPts, ["#e9c46a", "#f4a261"], 15, [7, 9]);

  let shoulderPts = generateBlob(300, 520, 170, 140, 0.5, 60);
  drawLayeredHatch(shoulderPts, ["#2b2d42", "#2a9d8f", "#8d99ae"], 45, [4.5, 5.5, 7]);

  let headPts = generateBlob(300, 290, 100, 135, 0.3, 40);
  drawLayeredHatch(headPts, ["#2a9d8f", "#ef233c", "#f4a261"], 10, [4, 5, 4.5]);

  let cheekPts = generateBlob(340, 320, 50, 65, 0.6, 30);
  drawLayeredHatch(cheekPts, ["#e9c46a", "#d90429"], -30, [3.5, 5]);

  let eyePts = generateBlob(260, 260, 40, 30, 0.5, 20);
  drawLayeredHatch(eyePts, ["#2b2d42", "#d90429"], 85, [3, 4]);

  let templePts = generateBlob(350, 250, 25, 35, 0.5, 15);
  drawLayeredHatch(templePts, ["#2b2d42", "#2a9d8f"], 110, [3.5, 4.5]);

  brush.noHatch();

  brush.set("cpencil", "#2b2d42", 1.2);
  brush.spline([[210, 270], [225, 360], [290, 415], [370, 350]], 0.4);

  brush.set("cpencil", "#d90429", 1.0);
  brush.spline([[240, 400], [250, 460], [200, 520]], 0.3);

  brush.set("cpencil", "#2a9d8f", 1.1);
  brush.spline([[350, 400], [370, 450], [450, 490], [520, 530]], 0.5);

  brush.set("cpencil", "#ef233c", 0.8);
  brush.spline([[150, 150], [250, 220], [320, 200], [450, 280]], 0.6);

  brush.set("cpencil", "#e9c46a", 0.9);
  brush.spline([[280, 100], [290, 200], [260, 300], [300, 450]], 0.4);

  noLoop();
}