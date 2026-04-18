function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  let elements = [];
  let numElements = 90;

  for (let i = 0; i < numElements; i++) {
    let z = random();
    let type = random() > 0.45 ? "trunk" : "canopy";
    let isShadow = random() > 0.75;
    let pts = [];

    if (type === "trunk") {
      let xBase = random(-150, 750);
      let wTemp = random(15, 70);
      let ySteps = 30;
      
      for (let j = 0; j <= ySteps; j++) {
        let y = map(j, 0, ySteps, 750, -150);
        let n = (noise(xBase * 0.01, y * 0.006, i) - 0.5) * 90;
        pts.push([xBase + n, y]);
      }
      for (let j = ySteps; j >= 0; j--) {
        let y = map(j, 0, ySteps, 750, -150);
        let n = (noise(xBase * 0.01, y * 0.006, i) - 0.5) * 90;
        let w = wTemp + noise(i, y * 0.015) * 40;
        pts.push([xBase + n + w, y]);
      }
    } else {
      let cx = random(-100, 700);
      let cy = random(-100, 700);
      let rBase = random(40, 160);
      
      for (let a = 0; a < 360; a += 12) {
        let r = rBase + (noise(cx * 0.01, cy * 0.01, a * 0.04) - 0.5) * 70;
        pts.push([cx + cos(a) * r, cy + sin(a) * r]);
      }
    }

    elements.push({ z, isShadow, pts, type });
  }

  elements.sort((a, b) => a.z - b.z);

  for (let el of elements) {
    if (!el.isShadow) {
      brush.noStroke();
      brush.noHatch();
      brush.wash("#fffaf3", 255);
      brush.beginShape(0.35);
      for (let p of el.pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noWash();
    }

    let baseAngle = random(180);
    let passes = [];

    if (el.isShadow) {
      passes.push({ dist: random(1.8, 3.0), angle: baseAngle, weight: random(0.4, 0.6) });
      passes.push({ dist: random(1.8, 3.0), angle: baseAngle + random([45, 75, 90]), weight: random(0.4, 0.6) });
      if (random() > 0.4) {
        passes.push({ dist: random(1.8, 3.0), angle: baseAngle + random([120, 135, 150]), weight: random(0.4, 0.6) });
      }
    } else {
      let numPasses = random() > 0.5 ? 2 : (random() > 0.85 ? 3 : 1);
      let distBase = random(3.5, 9.0);
      
      passes.push({ dist: distBase, angle: baseAngle, weight: random(0.3, 0.5) });
      if (numPasses > 1) {
        passes.push({ dist: distBase * random(0.8, 1.2), angle: baseAngle + random([45, 60, 90]), weight: random(0.3, 0.5) });
      }
      if (numPasses > 2) {
        passes.push({ dist: distBase * random(0.6, 0.9), angle: baseAngle + random([120, 135]), weight: random(0.3, 0.5) });
      }
    }

    for (let pass of passes) {
      brush.hatchStyle("rotring", "#141414", pass.weight);
      brush.hatch(pass.dist, pass.angle, { rand: 0.06, continuous: true });
      brush.beginShape(0.35);
      for (let p of el.pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noHatch();
    }

    if (!el.isShadow) {
      brush.set("pen", "#141414", random(0.9, 1.6));
      brush.beginShape(0.35);
      for (let p of el.pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noStroke();
    }
  }

  noLoop();
}