function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(412);
  noiseSeed(412);

  brush.noFill();
  brush.noStroke();

  function drawHatchZone(cx, cy, rBase, nScale, dists, angles, w) {
    for (let i = 0; i < dists.length; i++) {
      brush.hatchStyle("rotring", "#111", w);
      brush.hatch(dists[i], angles[i], { rand: 0.05, continuous: true });
    }
    
    brush.beginShape(0.4);
    for (let a = 0; a < 360; a += 15) {
      let n = noise(cx * nScale + cos(a) * 0.5, cy * nScale + sin(a) * 0.5);
      let r = rBase + n * rBase * 1.2;
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  for (let i = 0; i < 6; i++) {
    let cx = random(100, 500);
    let cy = random(100, 500);
    drawHatchZone(cx, cy, 250, 0.02, [3.5, 4.0], [45, 135], 0.5);
  }

  for (let i = 0; i < 25; i++) {
    let cx = random(-50, 650);
    let cy = random(-50, 650);
    let dists = [random(4, 7)];
    let angles = [random([15, 75, 105, 165])];
    if (random() > 0.5) {
      dists.push(random(5, 8));
      angles.push(angles[0] + 90);
    }
    drawHatchZone(cx, cy, random(40, 120), 0.05, dists, angles, 0.4);
  }

  let numTrunks = 18;
  for (let i = 0; i < numTrunks; i++) {
    let tx = random(20, 580);
    let tw = random(10, 45);
    let isDark = random() > 0.4;
    
    let ptsLeft = [];
    for (let y = -50; y <= 650; y += 40) {
      let nx = tx + (noise(y * 0.005, i) - 0.5) * 40;
      ptsLeft.push([nx, y]);
    }
    
    let ptsRight = [];
    for (let y = 650; y >= -50; y -= 40) {
      let nx = tx + tw + (noise(y * 0.005, i + 100) - 0.5) * 40;
      ptsRight.push([nx, y]);
    }
    
    let trunkPts = ptsLeft.concat(ptsRight);

    brush.noStroke();
    if (isDark) {
      brush.hatchStyle("rotring", "#0a0a0a", 0.6);
      brush.hatch(2.5, 82, { rand: 0.08, continuous: true });
      brush.hatch(3.5, 172, { rand: 0.08, continuous: true });
    } else {
      brush.hatchStyle("rotring", "#1a1a1a", 0.3);
      brush.hatch(5.0, 5, { rand: 0.15, continuous: true });
    }
    
    brush.beginShape(0.2);
    for (let p of trunkPts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.set("pen", "#000", isDark ? 1.1 : 0.7);
    brush.spline(ptsLeft, 0.2);
    brush.spline(ptsRight.reverse(), 0.2);
  }

  for (let i = 0; i < 30; i++) {
    let cx = random(0, 600);
    let cy = random(0, 600);
    drawHatchZone(cx, cy, random(20, 60), 0.1, [2.0, 2.5], [random(360), random(360)], 0.6);
  }

  for (let i = 0; i < 15; i++) {
    brush.set("pen", "#000", random(0.5, 1.5));
    let bx = random(600);
    let by = random(600);
    let branchPts = [];
    let angle = random(360);
    for (let step = 0; step < 5; step++) {
      branchPts.push([bx, by]);
      bx += cos(angle) * random(20, 60);
      by += sin(angle) * random(20, 60);
      angle += random(-30, 30);
    }
    brush.spline(branchPts, 0.3);
  }

  noLoop();
}