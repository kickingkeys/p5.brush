function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(17);
  noiseSeed(17);

  brush.noField();
  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noHatch();

  drawPaperSpecks();
  drawBotanicalStudy();

  noLoop();
}

function drawBotanicalStudy() {
  let stems = [];

  stems.push(makeStem(110, 560, 9, 23, -6, 18));
  stems.push(makeStem(155, 560, 10, 26, -3, 17));
  stems.push(makeStem(205, 560, 11, 28, 1, 16));
  stems.push(makeStem(255, 560, 10, 29, 4, 15));
  stems.push(makeStem(315, 560, 11, 31, -2, 16));
  stems.push(makeStem(372, 560, 10, 26, 5, 18));
  stems.push(makeStem(432, 560, 9, 24, 2, 17));
  stems.push(makeStem(492, 560, 10, 22, -4, 19));

  for (let s of stems) {
    addLeaves(s, int(random(2, 5)));
  }

  for (let i = 0; i < stems.length; i++) {
    let mode = i % 4;
    if (mode === 0) addPanicle(stems[i], 0.22, 18, 34);
    if (mode === 1) addSpike(stems[i], 0.18, 16, 11);
    if (mode === 2) addTuft(stems[i], 0.2, 15, 42);
    if (mode === 3) addPanicle(stems[i], 0.17, 13, 26);
  }

  brush.set("2H", "#6a6a6a", 0.55);
  for (let s of stems) {
    for (let side = -1; side <= 1; side += 2) {
      let offset = random(-10, 10);
      brush.spline(offsetStem(s.points, side * 4, offset), 0.62);
    }
  }

  for (let s of stems) {
    drawStemShading(s);
  }

  for (let s of stems) {
    drawLeaves(s);
  }

  for (let s of stems) {
    if (s.head.type === "panicle") drawPanicleHead(s);
    if (s.head.type === "spike") drawSpikeHead(s);
    if (s.head.type === "tuft") drawTuftHead(s);
  }

  brush.noHatch();

  for (let s of stems) {
    drawStemContour(s);
  }

  for (let s of stems) {
    if (s.head.type === "panicle") drawPanicleDetail(s);
    if (s.head.type === "spike") drawSpikeDetail(s);
    if (s.head.type === "tuft") drawTuftDetail(s);
  }

  drawLooseConstructionMarks(stems);
}

function makeStem(x, y, segments, stepLen, bendBias, waviness) {
  let pts = [];
  let px = x;
  let py = y;
  pts.push([px, py]);

  let heading = -86 + random(-4, 4) + bendBias * 0.2;

  for (let i = 0; i < segments; i++) {
    let lift = map(i, 0, segments - 1, 0.6, 1.2);
    heading += random(-12, 12) + bendBias + sin(i * 35 + x) * 0.8;
    px += cos(heading) * stepLen * random(0.9, 1.08) * lift;
    py += sin(heading) * stepLen * random(0.92, 1.08);
    px += sin(i * 30 + x * 0.05) * 0.45 * waviness;
    pts.push([px, py]);
  }

  return {
    points: pts,
    leaves: [],
    head: null
  };
}

function addLeaves(stem, count) {
  for (let i = 0; i < count; i++) {
    let t = random(0.18, 0.78);
    let base = pointOnPolyline(stem.points, t);
    let tangent = tangentOnPolyline(stem.points, t);
    let side = random() < 0.5 ? -1 : 1;
    let len = random(55, 120) * map(t, 0, 1, 1.1, 0.55);
    let sweep = random(22, 52) * side;
    let pts = [];
    let steps = int(random(5, 7));
    let a = tangent + sweep * 0.35;

    pts.push([base.x, base.y]);
    let x = base.x;
    let y = base.y;

    for (let j = 1; j <= steps; j++) {
      let tt = j / steps;
      a += sweep * 0.22 + side * map(tt, 0, 1, 3, 12);
      let seg = len / steps * map(tt, 0, 1, 1.2, 0.5);
      x += cos(a) * seg;
      y += sin(a) * seg + tt * 1.2;
      pts.push([x, y]);
    }

    stem.leaves.push({
      t: t,
      side: side,
      points: pts,
      width: random(6, 12)
    });
  }
}

function addPanicle(stem, attachT, branches, spread) {
  let base = pointOnPolyline(stem.points, attachT);
  let tangent = tangentOnPolyline(stem.points, 0.92);
  let branchList = [];

  for (let i = 0; i < branches; i++) {
    let side = random() < 0.5 ? -1 : 1;
    let len = random(16, 42) * map(i, 0, branches - 1, 1, 0.45);
    let rise = map(i, 0, branches - 1, 0, 42);
    let bx = base.x + random(-8, 8);
    let by = base.y - rise + random(-3, 3);
    let ang = tangent + side * random(18, spread) + random(-7, 7);
    let ex = bx + cos(ang) * len;
    let ey = by + sin(ang) * len;
    branchList.push({
      x1: bx, y1: by, x2: ex, y2: ey,
      awn: random(6, 14),
      seedR: random(2, 4.5)
    });
  }

  stem.head = {
    type: "panicle",
    base: base,
    branches: branchList
  };
}

function addSpike(stem, attachT, length, grains) {
  let base = pointOnPolyline(stem.points, attachT);
  let tangent = tangentOnPolyline(stem.points, 0.94);
  let tip = {
    x: base.x + cos(tangent - 90 + random(-8, 8)) * random(10, 18),
    y: base.y - length * 7.2
  };

  stem.head = {
    type: "spike",
    base: base,
    tip: tip,
    tangent: tangent - 90,
    grains: grains
  };
}

function addTuft(stem, attachT, core, rays) {
  let base = pointOnPolyline(stem.points, attachT);
  let tangent = tangentOnPolyline(stem.points, 0.94);
  let rayList = [];

  for (let i = 0; i < rays; i++) {
    let a = tangent - 90 + random(-50, 50);
    let len = random(core * 1.5, core * 4.7);
    rayList.push({
      a: a,
      len: len,
      curl: random(-8, 8)
    });
  }

  stem.head = {
    type: "tuft",
    base: base,
    rays: rayList,
    core: core
  };
}

function drawStemContour(stem) {
  brush.set("HB", "#323232", 0.82);
  let pts = addPressure(stem.points, 0.48, 0.82);
  brush.spline(pts, 0.68);

  brush.set("2B", "#232323", 0.48);
  let accents = [];
  for (let i = 0; i < stem.points.length; i++) {
    if (i === 0 || i > stem.points.length - 3 || i % 2 === 0) {
      accents.push([stem.points[i][0] + random(-0.8, 0.8), stem.points[i][1] + random(-0.8, 0.8), random(0.45, 0.85)]);
    }
  }
  brush.spline(accents, 0.5);
}

function drawStemShading(stem) {
  brush.hatchStyle("2H", "#666666", 0.38);

  for (let i = 0; i < stem.points.length - 1; i++) {
    let p1 = stem.points[i];
    let p2 = stem.points[i + 1];
    let ang = atan2(p2[1] - p1[1], p2[0] - p1[0]) + 92;
    let mx = (p1[0] + p2[0]) * 0.5;
    let my = (p1[1] + p2[1]) * 0.5;
    let w = map(i, 0, stem.points.length - 2, 8, 3.5);
    let h = dist(p1[0], p1[1], p2[0], p2[1]) * 0.95;

    push();
    translate(mx, my);
    rotate(atan2(p2[1] - p1[1], p2[0] - p1[0]));
    brush.hatch(5.5, 95, { rand: 0.08, continuous: true });
    brush.rect(-w * 0.55, -h * 0.5, w, h, "corner");
    pop();
    brush.noHatch();

    if (i % 2 === 0) {
      push();
      translate(mx, my);
      rotate(atan2(p2[1] - p1[1], p2[0] - p1[0]));
      brush.hatchStyle("HB", "#555555", 0.32);
      brush.hatch(8, 95, { rand: 0.04, continuous: true });
      brush.rect(-w * 0.22, -h * 0.5, w * 0.28, h, "corner");
      pop();
      brush.noHatch();
      brush.hatchStyle("2H", "#666666", 0.38);
    }
  }
}

function drawLeaves(stem) {
  for (let leaf of stem.leaves) {
    let pts = leaf.points;
    let widthAmt = leaf.width;

    let left = [];
    let right = [];
    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let a = segmentAngle(pts, i);
      let w = sin(map(i, 0, pts.length - 1, 0, 180)) * widthAmt;
      left.push([p[0] + cos(a - 90) * w * 0.5, p[1] + sin(a - 90) * w * 0.5]);
      right.push([p[0] + cos(a + 90) * w * 0.35, p[1] + sin(a + 90) * w * 0.35]);
    }

    brush.hatchStyle("2H", "#6b6b6b", 0.34);
    brush.hatch(6.5, tangentOnPolyline(pts, 0.45) + 96, { rand: 0.08, continuous: true });

    brush.beginShape(0.48);
    for (let p of left) brush.vertex(p[0], p[1]);
    for (let i = right.length - 1; i >= 0; i--) brush.vertex(right[i][0], right[i][1]);
    brush.endShape(true);
    brush.noHatch();

    brush.set("HB", "#3a3a3a", 0.6);
    brush.spline(addPressure(pts, 0.35, 0.72), 0.7);

    brush.set("2H", "#666666", 0.34);
    for (let i = 1; i < pts.length - 1; i++) {
      let p = pts[i];
      let a = segmentAngle(pts, i);
      let sideLen = sin(map(i, 0, pts.length - 1, 0, 180)) * widthAmt * 0.42;
      brush.line(
        p[0],
        p[1],
        p[0] + cos(a + leaf.side * 78) * sideLen,
        p[1] + sin(a + leaf.side * 78) * sideLen
      );
    }

    if (random() < 0.65) {
      brush.set("2B", "#2e2e2e", 0.28);
      let cut = int(random(2, pts.length - 1));
      let frag = [];
      for (let i = 0; i < cut; i++) frag.push([pts[i][0], pts[i][1], map(i, 0, cut - 1, 0.45, 0.75)]);
      brush.spline(frag, 0.6);
    }
  }
}

function drawPanicleHead(stem) {
  let brs = stem.head.branches;

  brush.set("2H", "#5f5f5f", 0.34);
  for (let b of brs) {
    brush.line(b.x1, b.y1, b.x2, b.y2);
  }

  brush.set("HB", "#3a3a3a", 0.42);
  for (let b of brs) {
    let ax = b.x2 + cos(atan2(b.y2 - b.y1, b.x2 - b.x1) - 18) * b.awn;
    let ay = b.y2 + sin(atan2(b.y2 - b.y1, b.x2 - b.x1) - 18) * b.awn;
    brush.line(b.x2, b.y2, ax, ay);
  }

  brush.hatchStyle("2H", "#6a6a6a", 0.26);
  for (let b of brs) {
    push();
    translate(b.x2, b.y2);
    rotate(atan2(b.y2 - b.y1, b.x2 - b.x1) + 15);
    brush.hatch(3.5, 105, { rand: 0.08, continuous: true });
    brush.beginShape(0.2);
    brush.vertex(-b.seedR * 0.8, -b.seedR * 0.45);
    brush.vertex(b.seedR * 0.85, -b.seedR * 0.15);
    brush.vertex(b.seedR * 0.65, b.seedR * 0.55);
    brush.vertex(-b.seedR * 0.55, b.seedR * 0.42);
    brush.endShape(true);
    pop();
    brush.noHatch();
  }
}

function drawPanicleDetail(stem) {
  let brs = stem.head.branches;

  brush.set("HB", "#363636", 0.34);
  for (let b of brs) {
    push();
    translate(b.x2, b.y2);
    rotate(atan2(b.y2 - b.y1, b.x2 - b.x1) + random(-4, 4));
    brush.beginShape(0.2);
    brush.vertex(-b.seedR * 0.8, -b.seedR * 0.45);
    brush.vertex(b.seedR * 0.85, -b.seedR * 0.15);
    brush.vertex(b.seedR * 0.65, b.seedR * 0.55);
    if (random() < 0.65) brush.vertex(-b.seedR * 0.15, b.seedR * 0.35);
    brush.endShape(random() < 0.8);
    pop();
  }

  brush.set("2B", "#252525", 0.22);
  for (let i = 0; i < brs.length; i += 2) {
    let b = brs[i];
    brush.line(b.x2 - 1, b.y2 - 1, b.x2 + 1.5, b.y2 + 1.5);
  }
}

function drawSpikeHead(stem) {
  let h = stem.head;
  let dx = h.tip.x - h.base.x;
  let dy = h.tip.y - h.base.y;
  let ang = atan2(dy, dx);
  let len = dist(h.base.x, h.base.y, h.tip.x, h.tip.y);

  brush.set("HB", "#333333", 0.6);
  brush.line(h.base.x, h.base.y, h.tip.x, h.tip.y);

  brush.hatchStyle("2H", "#676767", 0.24);

  for (let i = 0; i < h.grains; i++) {
    let t = i / max(1, h.grains - 1);
    let px = lerp(h.base.x, h.tip.x, t);
    let py = lerp(h.base.y, h.tip.y, t);
    let side = i % 2 === 0 ? -1 : 1;
    let g = map(t, 0, 1, 8, 4.2);

    push();
    translate(px, py);
    rotate(ang + side * 28);
    brush.hatch(3.5, 100, { rand: 0.06, continuous: true });
    brush.beginShape(0.22);
    brush.vertex(-g * 0.6, -g * 0.3);
    brush.vertex(g * 0.8, 0);
    brush.vertex(g * 0.15, g * 0.32);
    brush.vertex(-g * 0.7, g * 0.2);
    brush.endShape(true);
    pop();
    brush.noHatch();
  }

  brush.set("2H", "#616161", 0.3);
  for (let i = 0; i < h.grains; i++) {
    let t = i / max(1, h.grains - 1);
    let px = lerp(h.base.x, h.tip.x, t);
    let py = lerp(h.base.y, h.tip.y, t);
    let side = i % 2 === 0 ? -1 : 1;
    let awnA = ang + side * random(28, 44) - 8;
    let awnL = map(t, 0, 1, 18, 8);
    brush.line(px, py, px + cos(awnA) * awnL, py + sin(awnA) * awnL);
  }
}

function drawSpikeDetail(stem) {
  let h = stem.head;
  let ang = atan2(h.tip.y - h.base.y, h.tip.x - h.base.x);

  brush.set("HB", "#383838", 0.28);
  for (let i = 0; i < h.grains; i++) {
    let t = i / max(1, h.grains - 1);
    let px = lerp(h.base.x, h.tip.x, t);
    let py = lerp(h.base.y, h.tip.y, t);
    let side = i % 2 === 0 ? -1 : 1;
    let g = map(t, 0, 1, 8, 4.2);

    push();
    translate(px, py);
    rotate(ang + side * 28);
    brush.beginShape(0.18);
    brush.vertex(-g * 0.6, -g * 0.3);
    brush.vertex(g * 0.8, 0);
    brush.vertex(g * 0.15, g * 0.32);
    if (random() < 0.7) brush.vertex(-g * 0.4, g * 0.15);
    brush.endShape(random() < 0.82);
    pop();
  }

  brush.set("2B", "#262626", 0.22);
  brush.line(h.base.x, h.base.y, h.base.x + cos(ang) * 18, h.base.y + sin(ang) * 18);
}

function drawTuftHead(stem) {
  let h = stem.head;

  brush.set("HB", "#404040", 0.36);
  for (let r of h.rays) {
    let pts = [];
    let steps = 3;
    let x = h.base.x;
    let y = h.base.y;
    let a = r.a;
    pts.push([x, y, 0.5]);
    for (let i = 1; i <= steps; i++) {
      let tt = i / steps;
      a += r.curl * 0.25;
      x += cos(a) * r.len / steps * map(tt, 0, 1, 1.05, 0.75);
      y += sin(a) * r.len / steps * map(tt, 0, 1, 1.0, 0.8);
      pts.push([x, y, map(tt, 0, 1, 0.55, 0.25)]);
    }
    brush.spline(pts, 0.55);
  }

  brush.hatchStyle("2H", "#686868", 0.24);
  brush.hatch(4, 55, { rand: 0.12, continuous: true });
  brush.circle(h.base.x, h.base.y, h.core * 0.34, 0.25);
  brush.noHatch();
}

function drawTuftDetail(stem) {
  let h = stem.head;

  brush.set("2B", "#282828", 0.22);
  for (let i = 0; i < h.rays.length; i += 4) {
    let r = h.rays[i];
    let ex = h.base.x + cos(r.a) * r.len * 0.95;
    let ey = h.base.y + sin(r.a) * r.len * 0.95;
    brush.line(ex - 1.2, ey - 0.8, ex + 0.8, ey + 0.6);
  }

  brush.set("HB", "#383838", 0.28);
  brush.arc(h.base.x, h.base.y, h.core * 0.55, 10, 190);
}

function drawLooseConstructionMarks(stems) {
  brush.set("2H", "#8a8a8a", 0.18);

  for (let s of stems) {
    let p = s.points[int(random(1, s.points.length - 2))];
    if (random() < 0.7) {
      brush.line(p[0] - random(8, 18), p[1] - random(6, 14), p[0] + random(3, 10), p[1] + random(1, 6));
    }
  }

  brush.set("2H", "#909090", 0.14);
  for (let i = 0; i < 18; i++) {
    let x = random(70, 530);
    let y = random(70, 540);
    brush.line(x, y, x + random(4, 16), y + random(-3, 3));
  }
}

function drawPaperSpecks() {
  brush.set("2H", "#a6a29b", 0.1);
  for (let i = 0; i < 120; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    brush.line(x, y, x + random(-1.5, 1.5), y + random(-1.5, 1.5));
  }
}

function addPressure(pts, p1, p2) {
  let arr = [];
  for (let i = 0; i < pts.length; i++) {
    arr.push([pts[i][0], pts[i][1], map(i, 0, pts.length - 1, p1, p2)]);
  }
  return arr;
}

function offsetStem(pts, off, jitter) {
  let arr = [];
  for (let i = 0; i < pts.length; i++) {
    let a = segmentAngle(pts, i);
    arr.push([
      pts[i][0] + cos(a + 90) * off + random(-0.4, 0.4),
      pts[i][1] + sin(a + 90) * off + jitter * 0.03 + random(-0.4, 0.4),
      map(i, 0, pts.length - 1, 0.25, 0.42)
    ]);
  }
  return arr;
}

function segmentAngle(pts, i) {
  let i0 = max(0, i - 1);
  let i1 = min(pts.length - 1, i + 1);
  return atan2(pts[i1][1] - pts[i0][1], pts[i1][0] - pts[i0][0]);
}

function pointOnPolyline(pts, t) {
  let lens = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    let d = dist(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
    lens.push(d);
    total += d;
  }

  let target = total * constrain(t, 0, 1);
  let run = 0;

  for (let i = 0; i < lens.length; i++) {
    if (run + lens[i] >= target) {
      let tt = (target - run) / lens[i];
      return {
        x: lerp(pts[i][0], pts[i + 1][0], tt),
        y: lerp(pts[i][1], pts[i + 1][1], tt)
      };
    }
    run += lens[i];
  }

  return { x: pts[pts.length - 1][0], y: pts[pts.length - 1][1] };
}

function tangentOnPolyline(pts, t) {
  let lens = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    let d = dist(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
    lens.push(d);
    total += d;
  }

  let target = total * constrain(t, 0, 1);
  let run = 0;

  for (let i = 0; i < lens.length; i++) {
    if (run + lens[i] >= target) {
      return atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0]);
    }
    run += lens[i];
  }

  return atan2(
    pts[pts.length - 1][1] - pts[pts.length - 2][1],
    pts[pts.length - 1][0] - pts[pts.length - 2][0]
  );
}