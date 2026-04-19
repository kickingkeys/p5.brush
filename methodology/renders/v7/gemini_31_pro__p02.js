function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(812);
  noiseSeed(812);

  brush.noFill();
  brush.noStroke();

  brush.set("2H", "#999", 0.4);
  brush.line(40, 40, 560, 40);
  brush.line(40, 40, 40, 560);
  brush.line(560, 40, 560, 560);
  brush.line(40, 560, 560, 560);

  brush.hatchStyle("2H", "#aaa", 0.4);
  brush.hatch(18, 45, { rand: 0.15, continuous: true });
  brush.rect(50, 50, 180, 240);
  brush.noHatch();

  brush.set("2H", "#888", 0.5);
  brush.line(60, 60, 210, 60);
  brush.line(60, 65, 180, 65);

  drawStalk(220, 650, 380, 80, 1.1, 0, false);
  drawStalk(420, 650, 500, 180, 0.75, 100, false);
  drawStalk(140, 650, 160, 280, 0.85, 200, true);

  drawDetachedSeed(460, 460, 1.4);
  drawDetachedSeed(510, 500, 1.1);
  drawDetachedSeed(430, 520, 0.9);

  brush.set("HB", "#555", 0.6);
  brush.line(420, 540, 540, 540);
  brush.hatchStyle("2H", "#999", 0.4);
  brush.hatch(8, 30, { rand: 0.2 });
  brush.rect(420, 540, 120, 15);
  brush.noHatch();

  noLoop();
}

function drawStalk(sx, sy, ex, ey, scl, seed, bent) {
  let pts = [];
  let steps = 45;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = lerp(sx, ex, t);
    let y = lerp(sy, ey, t);
    let n = (noise(t * 3.5, seed) - 0.5) * 60 * scl;
    let curve = bent ? sin(t * 180) * 140 : sin(t * 180) * 50;
    pts.push([x + curve + n, y]);
  }

  brush.set("HB", "#333", 0.9);
  brush.spline(pts, 0.35);
  
  let pts2 = pts.map(p => [p[0] + 2.5 * scl, p[1]]);
  brush.set("2H", "#666", 0.6);
  brush.spline(pts2, 0.35);

  let numLeaves = bent ? 2 : 4;
  for (let i = 1; i <= numLeaves; i++) {
    let tVal = (i / (numLeaves + 1)) * 0.75;
    let idx = Math.floor(tVal * steps);
    let pt = pts[idx];
    drawLeaf(pt[0], pt[1], scl, i % 2 === 0);
  }

  let headStart = Math.floor(steps * (bent ? 0.75 : 0.6));
  drawSeedHead(pts.slice(headStart), scl);
}

function drawLeaf(x, y, scl, isRight) {
  let dir = isRight ? 1 : -1;
  let len = random(90, 180) * scl;
  let drop = random(50, 120) * scl;
  
  let tipX = x + len * dir;
  let tipY = y + drop;
  let midX = x + len * 0.45 * dir;
  let midY = y - drop * 0.25;

  let topPts = [];
  let botPts = [];
  for (let t = 0; t <= 1; t += 0.08) {
    let tx = bezierPoint(x, midX, midX, tipX, t);
    let ty = bezierPoint(y, midY, tipY - 15, tipY, t);
    topPts.push([tx, ty]);

    let bx = bezierPoint(x, midX, midX, tipX, t);
    let by = bezierPoint(y + 10 * scl * (1 - t), midY + 18 * scl * (1 - t), tipY - 8, tipY, t);
    botPts.unshift([bx, by]);
  }
  let leafPts = topPts.concat(botPts);

  brush.set("HB", "#444", 0.7);
  brush.beginShape(0.4);
  for (let p of leafPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);

  brush.hatchStyle("2H", "#777", 0.5);
  brush.hatch(7, isRight ? 35 : 145, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  for (let p of leafPts) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#222", 0.8);
  brush.hatch(3.5, isRight ? 80 : 100, { rand: 0.08 });
  brush.beginShape(0.4);
  let sliceEnd = Math.floor(leafPts.length / 3.5);
  for (let i = 0; i < sliceEnd; i++) brush.vertex(leafPts[i][0], leafPts[i][1]);
  for (let i = leafPts.length - sliceEnd; i < leafPts.length; i++) brush.vertex(leafPts[i][0], leafPts[i][1]);
  brush.endShape(true);
  brush.noHatch();
}

function drawSeedHead(pts, scl) {
  for (let i = 0; i < pts.length - 1; i++) {
    let p1 = pts[i];
    let p2 = pts[i + 1];
    let ang = atan2(p2[1] - p1[1], p2[0] - p1[0]);

    let clusters = Math.floor(random(2, 5));
    for (let j = 0; j < clusters; j++) {
      let hx = p1[0] + random(-8, 8) * scl;
      let hy = p1[1] + random(-8, 8) * scl;
      let hAng = ang + random(-40, 40);
      let hLen = random(14, 26) * scl;

      let sx1 = hx + cos(hAng) * hLen;
      let sy1 = hy + sin(hAng) * hLen;
      let mx1 = hx + cos(hAng - 22) * hLen * 0.5;
      let my1 = hy + sin(hAng - 22) * hLen * 0.5;
      let mx2 = hx + cos(hAng + 22) * hLen * 0.5;
      let my2 = hy + sin(hAng + 22) * hLen * 0.5;

      let shapePts = [
        [hx, hy], [mx1, my1], [sx1, sy1], [mx2, my2]
      ];

      brush.set("HB", "#333", 0.6);
      brush.beginShape(0.3);
      for (let pt of shapePts) brush.vertex(pt[0], pt[1]);
      brush.endShape(true);

      brush.hatchStyle("2B", "#1a1a1a", 0.7);
      brush.hatch(2.5, hAng, { rand: 0.1 });
      brush.beginShape(0.3);
      for (let pt of shapePts) brush.vertex(pt[0], pt[1]);
      brush.endShape(true);
      brush.noHatch();

      brush.set("2H", "#666", 0.4);
      let awnL = random(35, 95) * scl;
      let ax = sx1 + cos(hAng) * awnL;
      let ay = sy1 + sin(hAng) * awnL;
      let cax = sx1 + cos(hAng + random(-20, 20)) * awnL * 0.5;
      let cay = sy1 + sin(hAng + random(-20, 20)) * awnL * 0.5;
      brush.spline([[sx1, sy1], [cax, cay], [ax, ay]], 0.4);
    }
  }
}

function drawDetachedSeed(x, y, scl) {
  let ang = random(-60, -20);
  let hLen = 28 * scl;
  let sx1 = x + cos(ang) * hLen;
  let sy1 = y + sin(ang) * hLen;
  let mx1 = x + cos(ang - 20) * hLen * 0.5;
  let my1 = y + sin(ang - 20) * hLen * 0.5;
  let mx2 = x + cos(ang + 20) * hLen * 0.5;
  let my2 = y + sin(ang + 20) * hLen * 0.5;

  let shapePts = [[x, y], [mx1, my1], [sx1, sy1], [mx2, my2]];

  brush.set("HB", "#222", 0.8);
  brush.beginShape(0.3);
  for (let pt of shapePts) brush.vertex(pt[0], pt[1]);
  brush.endShape(true);

  brush.hatchStyle("2B", "#111", 0.9);
  brush.hatch(2.5, ang + 18, { rand: 0.05 });
  brush.beginShape(0.3);
  for (let pt of shapePts) brush.vertex(pt[0], pt[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#444", 0.5);
  brush.hatch(4.5, ang - 40, { rand: 0.1 });
  brush.beginShape(0.3);
  for (let pt of shapePts) brush.vertex(pt[0], pt[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.set("2H", "#555", 0.5);
  let awnL = 110 * scl;
  let ax = sx1 + cos(ang) * awnL;
  let ay = sy1 + sin(ang) * awnL;
  let cax = sx1 + cos(ang + 12) * awnL * 0.5;
  let cay = sy1 + sin(ang + 12) * awnL * 0.5;
  brush.spline([[sx1, sy1], [cax, cay], [ax, ay]], 0.45);

  brush.hatchStyle("2H", "#999", 0.5);
  brush.hatch(6, 0, { rand: 0.2 });
  brush.rect(x - 15, y + 8, 70 * scl, 12 * scl);
  brush.noHatch();
}