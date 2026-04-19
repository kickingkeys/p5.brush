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
  brush.noFill();
  brush.noStroke();

  function drawLayeredZone(cx, cy, rx, ry, colors, baseAngle, distRange, weightRange) {
    let pts = [];
    let numPts = 35;
    let noiseOffset = random(1000);
    for (let i = 0; i < numPts; i++) {
      let a = (i / numPts) * 360;
      let n = noise(cos(a) * 0.8 + noiseOffset, sin(a) * 0.8 + noiseOffset);
      let rModX = rx * (0.8 + 0.4 * n);
      let rModY = ry * (0.8 + 0.4 * n);
      pts.push([cx + cos(a) * rModX, cy + sin(a) * rModY]);
    }

    for (let i = 0; i < colors.length; i++) {
      let c = colors[i];
      let angle = baseAngle + i * 65; 
      let weight = random(weightRange[0], weightRange[1]);
      let dist = random(distRange[0], distRange[1]);

      brush.hatchStyle("cpencil", c, weight);
      brush.hatch(dist, angle, { rand: 0.08, continuous: true });
      brush.beginShape(0.4);
      for (let p of pts) {
        brush.vertex(p[0] + random(-2, 2), p[1] + random(-2, 2));
      }
      brush.endShape(CLOSE);
      brush.noHatch();
    }
    
    return pts;
  }

  function drawLooseContours(pts, color) {
    brush.set("cpencil", color, random(0.6, 1.2));
    let subset = [];
    let start = floor(random(pts.length / 2));
    for (let i = 0; i < 12; i++) {
      subset.push(pts[(start + i) % pts.length]);
    }
    brush.spline(subset, 0.4);
    brush.noStroke();
  }

  let hairBack = drawLayeredZone(280, 270, 160, 190, ["#4B0082", "#DC143C", "#2d3142"], 15, [4, 6], [0.8, 1.2]);
  let neck = drawLayeredZone(310, 480, 85, 130, ["#40E0D0", "#DDA0DD", "#FFD700"], 45, [5, 7], [0.6, 1.0]);
  let faceBase = drawLayeredZone(300, 310, 110, 145, ["#FFD700", "#FF7F50", "#DDA0DD"], 10, [4.5, 6.5], [0.6, 1.1]);
  let leftEye = drawLayeredZone(255, 285, 35, 45, ["#4B0082", "#40E0D0"], 120, [3.5, 5], [0.7, 1.2]);
  let rightEye = drawLayeredZone(345, 290, 32, 42, ["#DC143C", "#4B0082"], 80, [3.5, 5], [0.7, 1.2]);
  let nose = drawLayeredZone(300, 335, 25, 55, ["#FF7F50", "#FFD700"], 30, [4, 6], [0.6, 1.0]);
  let hairSweep = drawLayeredZone(330, 210, 130, 85, ["#DC143C", "#FF7F50", "#4B0082"], 105, [4, 6], [0.8, 1.2]);

  drawLooseContours(hairBack, "#191923");
  drawLooseContours(faceBase, "#DC143C");
  drawLooseContours(faceBase, "#4B0082");
  drawLooseContours(leftEye, "#4B0082");
  drawLooseContours(rightEye, "#4B0082");
  drawLooseContours(hairSweep, "#FF7F50");
  drawLooseContours(neck, "#40E0D0");

  brush.noField();
  noLoop();
}