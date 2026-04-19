function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.noFill();
  brush.noWash();

  const ink = "#111111";

  // Layer 1: Background canopy - loose, wide hatching
  for (let i = 0; i < 40; i++) {
    let cx = random(-50, 650);
    let cy = random(-50, 650);
    let r = random(60, 200);
    let angle = random([15, 30, 45, 135, 150, 165]);
    let dist = random(6, 12);
    let wt = random(0.3, 0.5);
    drawHatchedBlob(cx, cy, r, angle, dist, wt, ink);
  }

  // Layer 2: Distant vertical trunks
  for (let i = 0; i < 35; i++) {
    let tx = random(-50, 650);
    let tw = random(5, 20);
    let angle = random(87, 93);
    let dist = random(3, 6);
    let wt = random(0.3, 0.6);
    drawTrunk(tx, tw, angle, dist, wt, ink);
  }

  // Layer 3: Midground woven undergrowth - denser, intersecting angles
  for (let i = 0; i < 60; i++) {
    let cx = random(-50, 650);
    let cy = random(100, 700);
    let r = random(40, 150);
    let angle = random([10, 50, 70, 110, 130, 170]);
    let dist = random(4, 8);
    let wt = random(0.4, 0.7);
    drawHatchedBlob(cx, cy, r, angle, dist, wt, ink);
  }

  // Layer 4: Foreground prominent trunks - dense vertical hatching
  for (let i = 0; i < 15; i++) {
    let tx = random(-20, 620);
    let tw = random(20, 60);
    let angle = random(85, 95);
    let dist = random(2, 4);
    let wt = random(0.6, 1.0);
    drawTrunk(tx, tw, angle, dist, wt, ink);
  }

  // Layer 5: Deep shadow cross-hatching (abstract foreground patterns)
  for (let i = 0; i < 30; i++) {
    let cx = random(-50, 650);
    let cy = random(200, 700);
    let r = random(30, 100);
    let angle1 = random(0, 180);
    let angle2 = angle1 + random(45, 90);
    let dist = random(2, 4);
    let wt = random(0.6, 0.9);

    let pts = getBlobPoints(cx, cy, r, Math.floor(random(6, 12)));

    brush.hatchStyle("rotring", ink, wt);
    brush.hatch(dist, angle1, { rand: 0.05, continuous: true });
    drawPts(pts);
    brush.noHatch();

    brush.hatchStyle("rotring", ink, wt);
    brush.hatch(dist, angle2, { rand: 0.05, continuous: true });
    drawPts(pts);
    brush.noHatch();
  }

  // Layer 6: Sweeping diagonal shafts (light/shadow interplay)
  for (let i = 0; i < 5; i++) {
    let sx = random(-100, 500);
    let sy = -100;
    let sw = random(40, 120);
    let offset = random(200, 500);
    
    brush.hatchStyle("rotring", ink, random(0.4, 0.8));
    brush.hatch(random(3, 5), random(35, 55), { rand: 0.02, continuous: true });
    brush.beginShape(0);
    brush.vertex(sx, sy);
    brush.vertex(sx + sw, sy);
    brush.vertex(sx + sw + offset, height + 100);
    brush.vertex(sx + offset, height + 100);
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  noLoop();
}

function getBlobPoints(cx, cy, r, num) {
  let pts = [];
  for (let i = 0; i < num; i++) {
    let a = (i / num) * 360;
    let rad = r + random(-r * 0.4, r * 0.4);
    pts.push([cx + cos(a) * rad, cy + sin(a) * rad]);
  }
  return pts;
}

function drawPts(pts) {
  brush.beginShape(0.4);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
}

function drawHatchedBlob(cx, cy, r, angle, dist, wt, color) {
  let pts = getBlobPoints(cx, cy, r, Math.floor(random(6, 12)));
  brush.hatchStyle("rotring", color, wt);
  brush.hatch(dist, angle, { rand: 0.05, continuous: true });
  drawPts(pts);
  brush.noHatch();
}

function drawTrunk(tx, tw, angle, dist, wt, color) {
  let pts = [];
  let segments = 8;
  
  // Left side going down
  for (let i = 0; i <= segments; i++) {
    let y = map(i, 0, segments, -50, height + 50);
    let xOffset = noise(tx * 0.01, y * 0.01) * 20 - 10;
    pts.push([tx + xOffset, y]);
  }
  // Right side going up
  for (let i = segments; i >= 0; i--) {
    let y = map(i, 0, segments, -50, height + 50);
    let xOffset = noise((tx + tw) * 0.01, y * 0.01) * 20 - 10;
    pts.push([tx + tw + xOffset, y]);
  }

  brush.hatchStyle("rotring", color, wt);
  brush.hatch(dist, angle, { rand: 0.03, continuous: true });
  brush.beginShape(0.2);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noHatch();
}