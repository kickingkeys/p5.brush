function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noLoop();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(27);
  noiseSeed(27);

  // subtle wall grain / rubbed paper
  for (let i = 0; i < 160; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(8, 28);
    brush.set("2H", random(["#e6ded1", "#ddd3c4", "#efe7da"]), random(0.25, 0.5));
    brush.line(x, y, x + random(-len, len), y + random(-len * 0.3, len * 0.3));
  }

  // ghosted circular spray fields
  let sprayPalette = [
    "#e85a47", "#d94a3a", "#f0b14a", "#d99a2b",
    "#4b8fcf", "#3f6db0", "#2e9a7f", "#7a2f87",
    "#1f1f1f", "#5a5a5a"
  ];

  for (let i = 0; i < 34; i++) {
    let cx = random(50, 550);
    let cy = random(50, 550);
    let radius = random(18, 82);
    let strokes = int(random(10, 22));
    let col = random(sprayPalette);

    for (let j = 0; j < strokes; j++) {
      let a = random(360);
      let rr = random(radius * 0.15, radius);
      let x = cx + cos(a) * rr;
      let y = cy + sin(a) * rr;
      brush.set("spray", col, random(0.7, 2.6));
      brush.flowLine(x, y, random(10, 34), random(360));
    }

    if (random() < 0.65) {
      brush.set("spray", col, random(1.2, 2.8));
      for (let k = 0; k < int(random(10, 22)); k++) {
        let a = map(k, 0, 21, 0, 360) + random(-12, 12);
        let x = cx + cos(a) * radius;
        let y = cy + sin(a) * radius;
        brush.flowLine(x, y, random(8, 18), a + 90 + random(-40, 40));
      }
    }
  }

  // larger ghosted marker loops / hand circles
  brush.wiggle(1);
  for (let i = 0; i < 11; i++) {
    let cx = random(80, 520);
    let cy = random(80, 520);
    let rx = random(30, 95);
    let ry = random(24, 82);
    let pts = [];
    let steps = 26;
    for (let j = 0; j < steps; j++) {
      let a = map(j, 0, steps, 0, 360);
      let nx = cos(a) * rx + random(-8, 8);
      let ny = sin(a) * ry + random(-8, 8);
      pts.push([cx + nx, cy + ny, random(0.55, 1.1)]);
    }
    brush.set("marker", random(["#d74f43", "#4b87c8", "#2d2d2d", "#967a53", "#7c3886"]), random(0.45, 0.9));
    brush.spline(pts, 0.45);
  }
  brush.noField();

  // graffiti drips
  for (let i = 0; i < 22; i++) {
    let x = random(50, 550);
    let y = random(80, 420);
    let len = random(40, 150);
    let col = random(["#d94a3a", "#e85a47", "#4b8fcf", "#1f1f1f", "#7a2f87", "#2e9a7f"]);

    brush.set("spray", col, random(0.45, 0.95));
    brush.line(x, y, x + random(-4, 4), y + len);

    if (random() < 0.8) {
      brush.set("spray", col, random(0.8, 1.5));
      for (let j = 0; j < int(random(4, 10)); j++) {
        brush.flowLine(x + random(-5, 5), y + len + random(-6, 8), random(6, 16), random(220, 320));
      }
    }
  }

  // arrows
  for (let i = 0; i < 15; i++) {
    let x = random(40, 460);
    let y = random(60, 540);
    let dx = random(70, 180);
    let dy = random(-60, 60);
    let x2 = x + dx;
    let y2 = y + dy;
    let head = random(12, 28);
    let ang = atan2(y2 - y, x2 - x);

    let shaft = [
      [x, y, 0.8],
      [lerp(x, x2, 0.35) + random(-10, 10), lerp(y, y2, 0.35) + random(-10, 10), 0.7],
      [lerp(x, x2, 0.7) + random(-8, 8), lerp(y, y2, 0.7) + random(-8, 8), 0.6],
      [x2, y2, 0.55]
    ];

    brush.set(random(["marker", "spray", "charcoal"]), random(["#1f1f1f", "#d94a3a", "#4b8fcf", "#7a2f87"]), random(0.7, 1.7));
    brush.spline(shaft, 0.4);

    brush.set(random(["marker", "spray", "pen"]), random(["#1f1f1f", "#d94a3a", "#4b8fcf", "#2e9a7f"]), random(0.6, 1.4));
    brush.line(x2, y2, x2 - cos(ang - 24) * head, y2 - sin(ang - 24) * head);
    brush.line(x2, y2, x2 - cos(ang + 24) * head, y2 - sin(ang + 24) * head);
  }

  // thin rotring / pen fragments and accidental notation
  for (let i = 0; i < 45; i++) {
    let x = random(30, 570);
    let y = random(30, 570);
    let pts = [];
    let n = int(random(3, 6));
    let px = x;
    let py = y;
    for (let j = 0; j < n; j++) {
      px += random(12, 36);
      py += random(-20, 20);
      pts.push([px, py, random(0.5, 0.95)]);
    }
    pts.unshift([x, y, random(0.6, 1.0)]);
    brush.set(random(["pen", "rotring", "HB"]), random(["#2b2b2b", "#444444", "#7b2f35", "#355d90"]), random(0.3, 0.75));
    brush.spline(pts, random(0.2, 0.45));
  }

  // charcoal smudgy gestures
  brush.wiggle(4);
  for (let i = 0; i < 18; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let pts = [[x, y, 0.9]];
    let m = int(random(3, 7));
    for (let j = 0; j < m; j++) {
      x += random(18, 60);
      y += random(-28, 28);
      pts.push([x, y, random(0.5, 1.2)]);
    }
    brush.set("charcoal", random(["#1d1d1d", "#333333", "#4a4a4a"]), random(0.5, 1.2));
    brush.spline(pts, 0.45);
  }
  brush.noField();

  // cpencil scribbles to create layered accidental composition
  for (let i = 0; i < 20; i++) {
    let x = random(30, 530);
    let y = random(30, 560);
    brush.set("cpencil", random(["#a53e37", "#456fa8", "#8e6a3b", "#5d3f7d", "#505050"]), random(0.45, 0.9));
    let pts = [];
    let px = x;
    let py = y;
    let steps = int(random(5, 10));
    for (let j = 0; j < steps; j++) {
      pts.push([px, py, random(0.5, 1.0)]);
      px += random(10, 34);
      py += random(-24, 24);
    }
    brush.spline(pts, 0.35);
  }

  // a few anchored dark circle outlines over the sprayed field
  for (let i = 0; i < 9; i++) {
    let cx = random(80, 520);
    let cy = random(80, 520);
    let r = random(18, 52);
    let pts = [];
    let steps = 22;
    for (let j = 0; j < steps; j++) {
      let a = map(j, 0, steps, 0, 360);
      let rr = r + random(-4, 4);
      pts.push([cx + cos(a) * rr, cy + sin(a) * rr, random(0.6, 1.0)]);
    }
    brush.set(random(["pen", "HB", "marker"]), random(["#202020", "#333333", "#5b5b5b"]), random(0.35, 0.85));
    brush.spline(pts, 0.5);
  }

  // final little dusting of spray to unify everything
  for (let i = 0; i < 120; i++) {
    brush.set("spray", random(["#1f1f1f", "#d94a3a", "#4b8fcf", "#d99a2b"]), random(0.25, 0.8));
    brush.flowLine(random(20, 580), random(20, 580), random(4, 12), random(360));
  }

  noLoop();
}