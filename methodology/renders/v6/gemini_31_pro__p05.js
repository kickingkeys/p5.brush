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

  brush.hatchStyle("rotring", "#222", 0.4);
  brush.hatch(4, 45, { rand: 0.05, continuous: true });
  brush.hatch(5, 135, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(-50, -50);
  brush.vertex(650, -50);
  brush.vertex(650, 650);
  brush.vertex(-50, 650);
  brush.endShape(CLOSE);
  brush.noHatch();

  let elements = [];

  for (let i = 0; i < 35; i++) {
    elements.push({
      type: 'trunk',
      x: random(-50, 650),
      w: random(15, 80),
      z: random(),
      seed: random(10000)
    });
  }

  for (let i = 0; i < 70; i++) {
    elements.push({
      type: 'foliage',
      cx: random(-50, 650),
      cy: random(-50, 650),
      r: random(40, 150),
      z: random(),
      seed: random(10000)
    });
  }

  for (let i = 0; i < 25; i++) {
    elements.push({
      type: 'shadow',
      cx: random(-50, 650),
      cy: random(-50, 650),
      r: random(50, 200),
      z: random(),
      seed: random(10000)
    });
  }

  for (let i = 0; i < 40; i++) {
    elements.push({
      type: 'vine',
      y: random(-100, 700),
      z: random(0.6, 1.0),
      seed: random(10000)
    });
  }

  elements.sort((a, b) => a.z - b.z);

  for (let el of elements) {
    randomSeed(el.seed);
    noiseSeed(el.seed);

    if (el.type === 'trunk') {
      let pts = [];
      for (let y = -50; y <= 650; y += 30) {
        let nx = el.x - el.w / 2 + (noise(y * 0.015, el.x * 0.01) - 0.5) * 40;
        pts.push([nx, y]);
      }
      for (let y = 650; y >= -50; y -= 30) {
        let nx = el.x + el.w / 2 + (noise(y * 0.015, (el.x + 100) * 0.01) - 0.5) * 40;
        pts.push([nx, y]);
      }

      brush.wash("#fffaf3", 255);
      let wgt = map(el.z, 0, 1, 0.3, 0.7);
      brush.hatchStyle("rotring", "#111", wgt);
      brush.hatch(random(2, 4), random(80, 100), { rand: 0.05, continuous: true });
      if (random() > 0.3) {
        brush.hatch(random(5, 10), random(-15, 15), { rand: 0.05, continuous: true });
      }

      brush.beginShape(0.2);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noHatch();
      brush.noWash();

      brush.set("pen", "#000", wgt * 1.3);
      brush.beginShape(0.2);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noStroke();

    } else if (el.type === 'foliage') {
      let pts = [];
      let nOff = random(1000);
      for (let a = 0; a < 360; a += 15) {
        let rad = el.r + (noise(cos(a) * 1.5 + nOff, sin(a) * 1.5 + nOff) - 0.5) * el.r * 1.2;
        pts.push([el.cx + cos(a) * rad, el.cy + sin(a) * rad]);
      }

      brush.wash("#fffaf3", 255);
      let wgt = map(el.z, 0, 1, 0.3, 0.6);
      brush.hatchStyle("rotring", "#1a1a1a", wgt);
      let ang1 = random(360);
      brush.hatch(random(2.5, 6), ang1, { rand: 0.08, continuous: true });
      if (random() > 0.4) {
        brush.hatch(random(3, 7), ang1 + random(45, 90), { rand: 0.08, continuous: true });
      }

      brush.beginShape(0.4);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noHatch();
      brush.noWash();

      brush.set("pen", "#000", wgt * 1.2);
      brush.beginShape(0.4);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noStroke();

    } else if (el.type === 'shadow') {
      let pts = [];
      let nOff = random(1000);
      for (let a = 0; a < 360; a += 20) {
        let rad = el.r + (noise(cos(a) * 1.5 + nOff, sin(a) * 1.5 + nOff) - 0.5) * el.r;
        pts.push([el.cx + cos(a) * rad, el.cy + sin(a) * rad]);
      }

      let wgt = map(el.z, 0, 1, 0.4, 0.8);
      brush.hatchStyle("rotring", "#050505", wgt);
      let ang = random(360);
      brush.hatch(random(1.5, 3), ang, { rand: 0.05, continuous: true });
      brush.hatch(random(2, 4), ang + 75, { rand: 0.05, continuous: true });
      if (random() > 0.5) {
        brush.hatch(random(3, 5), ang + 140, { rand: 0.05, continuous: true });
      }

      brush.beginShape(0.5);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noHatch();

    } else if (el.type === 'vine') {
      let pts = [];
      let amp = random(15, 60);
      let freq = random(0.005, 0.015);
      for (let x = -50; x <= 650; x += 20) {
        let ny = el.y + (noise(x * freq, el.y * freq) - 0.5) * amp * 2;
        pts.push([x, ny]);
      }
      
      let ptsRev = [];
      let thick = random(3, 10);
      for (let i = pts.length - 1; i >= 0; i--) {
        ptsRev.push([pts[i][0], pts[i][1] + thick]);
      }
      let polyPts = pts.concat(ptsRev);

      brush.wash("#fffaf3", 255);
      let wgt = map(el.z, 0, 1, 0.4, 0.7);
      brush.hatchStyle("rotring", "#111", wgt);
      brush.hatch(random(1.5, 3), random(360), { rand: 0.1, continuous: true });

      brush.beginShape(0.3);
      for (let p of polyPts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noHatch();
      brush.noWash();

      brush.set("pen", "#000", wgt * 1.5);
      brush.beginShape(0.3);
      for (let p of polyPts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noStroke();
    }
  }

  noLoop();
}