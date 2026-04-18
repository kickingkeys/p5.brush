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
  brush.wiggle(3);

  let hatchRegion = (cx, cy, rx, ry, c, a, d, w, noiseScale) => {
    brush.hatchStyle("cpencil", c, w);
    brush.hatch(d, a, { rand: 0.12, continuous: true });
    brush.beginShape(0.4);
    let nSeed = random(1000);
    for (let i = 0; i < 360; i += 15) {
      let rMod = map(noise(nSeed + cos(i) * noiseScale, nSeed + sin(i) * noiseScale), 0, 1, 0.75, 1.25);
      brush.vertex(cx + cos(i) * rx * rMod, cy + sin(i) * ry * rMod);
    }
    brush.endShape(true);
    brush.noHatch();
  };

  hatchRegion(300, 310, 120, 160, "#c3aed6", 30, 6, 1.0, 0.8);
  hatchRegion(290, 300, 115, 155, "#e2f0cb", 75, 5, 0.8, 0.7);
  hatchRegion(315, 320, 125, 165, "#f4a896", 120, 7, 0.9, 0.9);

  hatchRegion(250, 270, 35, 25, "#28527a", 15, 3, 1.2, 1.2);
  hatchRegion(245, 275, 30, 20, "#f4d160", 105, 4, 1.0, 1.5);

  hatchRegion(350, 270, 35, 25, "#28527a", 165, 3, 1.2, 1.2);
  hatchRegion(355, 275, 30, 20, "#f4d160", 75, 4, 1.0, 1.5);
  hatchRegion(300, 310, 15, 40, "#8ac6d1", 45, 3, 0.8, 1.0);
  hatchRegion(300, 340, 25, 15, "#d92027", 135, 3, 1.0, 1.5);

  hatchRegion(300, 380, 45, 15, "#28527a", 10, 3, 1.2, 1.5);
  hatchRegion(305, 385, 40, 10, "#ff9a3c", 80, 2.5, 1.0, 1.5);

  hatchRegion(220, 330, 35, 45, "#ff9a3c", 45, 5, 0.7, 1.0);
  hatchRegion(380, 330, 35, 45, "#ff9a3c", 135, 5, 0.7, 1.0);
  hatchRegion(300, 430, 50, 30, "#c3aed6", 160, 4, 0.9, 1.2);

  brush.noHatch();
  let cols = ["#28527a", "#c3aed6", "#f4a896", "#8ac6d1", "#f4d160", "#e2f0cb", "#d92027"];
  
  for (let i = 0; i < 60; i++) {
    brush.set("cpencil", random(cols), random(0.6, 1.4));
    let pts = [];
    let startAngle = random(360);
    let distCenter = random(140, 260);
    let cx = 300 + cos(startAngle) * distCenter;
    let cy = 300 + sin(startAngle) * distCenter;
    
    pts.push([cx, cy, random(0.5, 1.0)]);
    for (let j = 1; j < 5; j++) {
      let flowAngle = startAngle + random(60, 120);
      cx += cos(flowAngle) * random(20, 50);
      cy += sin(flowAngle) * random(20, 50);
      pts.push([cx, cy, random(0.5, 1.5)]);
    }
    brush.spline(pts, 0.4);
  }

  brush.set("cpencil", "#28527a", 1.5);
  brush.spline([[265, 260, 0.5], [240, 268, 1.2], [255, 285, 0.6]], 0.4);
  brush.spline([[335, 260, 0.5], [360, 268, 1.2], [345, 285, 0.6]], 0.4);
  
  brush.set("cpencil", "#d92027", 1.2);
  brush.spline([[295, 275, 0.5], [290, 335, 1.0], [280, 345, 0.4]], 0.4);
  
  brush.set("cpencil", "#28527a", 1.4);
  brush.spline([[270, 380, 0.4], [300, 385, 1.2], [330, 375, 0.4]], 0.3);
  
  brush.set("cpencil", "#f4a896", 1.6);
  brush.spline([[210, 250, 0.3], [180, 320, 1.0], [220, 420, 1.2], [300, 460, 1.5], [380, 410, 1.2], [420, 320, 1.0], [390, 250, 0.3]], 0.5);

  noLoop();
}