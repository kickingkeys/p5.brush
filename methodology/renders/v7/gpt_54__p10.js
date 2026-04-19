function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(19);
  noiseSeed(19);

  // soft watercolor-paper desert sky/ground atmosphere
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  brush.fillTexture(0.78, 0.38);

  // broad desert washes
  let washColors = ["#dbc29a", "#d1b183", "#c49c68", "#b88d59"];
  for (let i = 0; i < 18; i++) {
    let x = random(40, 560);
    let y = random(170, 565);
    let r = random(70, 170);
    let c = random(washColors);
    brush.fill(c, random(28, 60));
    brush.fillBleed(random(0.28, 0.5), "out");
    brush.circle(x, y, r, random(0.15, 0.45));
  }

  // distant sky warmth near horizon
  for (let i = 0; i < 8; i++) {
    let x = random(60, 540);
    let y = random(215, 330);
    let r = random(70, 130);
    brush.fill("#ead3ae", random(18, 38));
    brush.fillBleed(random(0.22, 0.38), "out");
    brush.circle(x, y, r, 0.2);
  }

  // layered dune-like bands
  for (let band = 0; band < 4; band++) {
    let baseY = 345 + band * 45;
    let col = ["#d8bb8f", "#cfab79", "#c79b68", "#bb8956"][band];
    let cx = 300;
    let pts = [];
    for (let x = -20; x <= 620; x += 18) {
      let y =
        baseY +
        sin(x * 0.55 + band * 40) * (8 + band * 2) +
        noise(x * 0.012, band * 20) * (20 + band * 6) -
        10;
      pts.push([x, y]);
    }
    pts.push([620, 600]);
    pts.push([-20, 600]);

    brush.fill(col, 95 - band * 8);
    brush.fillBleed(0.32, "out");
    brush.beginShape(0.5);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    brush.fill(lerpColor(color(col), color("#8f6239"), 0.18), 38);
    brush.fillBleed(0.34, "in");
    brush.beginShape(0.5);
    for (let p of pts) {
      let xx = lerp(cx, p[0], 0.9);
      let yy = lerp(baseY + 35, p[1], 0.9);
      brush.vertex(xx, yy);
    }
    brush.endShape(true);
  }
  brush.noFill();
  brush.noWash();

  // cracked earth network
  brush.set("HB", "#8d6a46", 0.42);
  for (let i = 0; i < 140; i++) {
    let x = random(20, 580);
    let y = random(395, 590);
    let len = random(10, 36);
    let a = random(-85, 85);
    let x2 = x + cos(a) * len;
    let y2 = y + sin(a) * len;
    brush.line(x, y, x2, y2);

    if (random() < 0.55) {
      let a2 = a + random(-65, 65);
      let len2 = len * random(0.35, 0.8);
      brush.line(x2, y2, x2 + cos(a2) * len2, y2 + sin(a2) * len2);
    }
  }

  // some finer hairline cracks
  brush.set("2H", "#a38460", 0.34);
  for (let i = 0; i < 110; i++) {
    let x = random(20, 580);
    let y = random(420, 595);
    let len = random(6, 18);
    let a = random(-90, 90);
    brush.line(x, y, x + cos(a) * len, y + sin(a) * len);
  }

  // horizon line
  brush.set("pen", "#5b4a3d", 0.55);
  brush.line(0, 298, 600, 302);

  // distant dark outcrops
  brush.field("hand");
  brush.wiggle(3);

  function rockShape(cx, cy, w, h, peakiness, darkness) {
    let pts = [];
    let count = 11;
    for (let i = 0; i <= count; i++) {
      let t = i / count;
      let x = cx - w / 2 + t * w;
      let topY =
        cy -
        h * (0.2 + noise(cx * 0.01 + i * 0.2, cy * 0.01) * 0.95) -
        abs(sin(t * 180 * peakiness)) * h * 0.25;
      pts.push([x, topY]);
    }
    pts.push([cx + w / 2, cy + h * 0.22]);
    pts.push([cx - w / 2, cy + h * 0.25]);

    // charcoal masses
    brush.mass("pastel", darkness, {
      strength: 0.55,
      precision: 0.45,
      gradient: 0.45,
      outline: false
    });
    brush.hatchStyle("charcoal", darkness, 0.82);
    brush.hatch(7, 78, { rand: 0.16, continuous: false });

    brush.beginShape(0.24);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    brush.noMass();
    brush.noHatch();

    // darker core
    let inner = [];
    for (let p of pts) {
      inner.push([lerp(cx, p[0], 0.74), lerp(cy + h * 0.04, p[1], 0.74)]);
    }
    brush.mass("crayon", "#1b1713", {
      strength: 0.78,
      precision: 0.28,
      gradient: 0.58,
      outline: false
    });
    brush.hatchStyle("charcoal", "#24201b", 1.2);
    brush.hatch(5, 103, { rand: 0.2, continuous: false });

    brush.beginShape(0.18);
    for (let p of inner) brush.vertex(p[0], p[1]);
    brush.endShape(true);

    brush.noMass();
    brush.noHatch();

    // jagged contour
    brush.set("charcoal", "#2a241d", 1.0);
    brush.beginShape(0.12);
    for (let p of pts) brush.vertex(p[0], p[1], random(0.8, 1.15));
    brush.endShape(true);

    // fracture marks on rock
    brush.set("2B", "#3b3228", 0.42);
    for (let k = 0; k < 7; k++) {
      let rx = random(cx - w * 0.28, cx + w * 0.28);
      let ry = random(cy - h * 0.5, cy + h * 0.05);
      let rl = random(10, 24);
      let ra = random(55, 125);
      brush.line(rx, ry, rx + cos(ra) * rl, ry + sin(ra) * rl);
    }
  }

  rockShape(118, 308, 82, 48, 1.1, "#474038");
  rockShape(198, 300, 108, 64, 1.45, "#3f3933");
  rockShape(286, 305, 126, 78, 1.2, "#38322d");
  rockShape(392, 297, 98, 58, 1.35, "#433b34");
  rockShape(488, 304, 118, 66, 1.0, "#3a342f");

  // foreground broken rock formations
  rockShape(82, 430, 115, 92, 1.2, "#403932");
  rockShape(172, 462, 146, 126, 1.5, "#332d28");
  rockShape(290, 445, 152, 120, 1.15, "#2f2a25");
  rockShape(426, 470, 138, 138, 1.42, "#2c2722");
  rockShape(540, 438, 110, 102, 1.08, "#352f2a");

  // extra foreground charcoal ledges
  function ledge(x1, y1, x2, y2, bump, c1, c2) {
    let pts = [];
    pts.push([x1, 600]);
    pts.push([x1, y1]);
    let steps = 12;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = lerp(x1, x2, t);
      let y =
        lerp(y1, y2, t) +
        sin(t * 180 * 2) * bump +
        (noise(i * 0.18 + x1 * 0.01) - 0.5) * bump * 1.4;
      pts.push([x, y]);
    }
    pts.push([x2, 600]);

    brush.mass("pastel", c1, {
      strength: 0.62,
      precision: 0.42,
      gradient: 0.55,
      outline: false
    });
    brush.hatchStyle("charcoal", c1, 0.95);
    brush.hatch(7, 92, { rand: 0.16 });
    brush.beginShape(0.22);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noMass();
    brush.noHatch();

    let cx = (x1 + x2) * 0.5;
    brush.mass("crayon", c2, {
      strength: 0.84,
      precision: 0.25,
      gradient: 0.6,
      outline: false
    });
    brush.beginShape(0.18);
    for (let p of pts) {
      brush.vertex(lerp(cx, p[0], 0.82), lerp(600, p[1], 0.82));
    }
    brush.endShape(true);
    brush.noMass();

    brush.set("charcoal", "#221d19", 1.05);
    brush.beginShape(0.12);
    for (let i = 1; i < pts.length - 1; i++) brush.vertex(pts[i][0], pts[i][1]);
    brush.endShape(false);
  }

  ledge(0, 512, 172, 535, 13, "#3b342d", "#231f1b");
  ledge(120, 548, 345, 522, 15, "#342e28", "#1c1815");
  ledge(308, 535, 600, 555, 18, "#302a25", "#171412");

  brush.noField();

  // faint sediment lines across open sand
  brush.set("2H", "#b79b73", 0.36);
  for (let y = 338; y < 560; y += 16) {
    let pts = [];
    for (let x = 0; x <= 600; x += 30) {
      pts.push([
        x,
        y + sin(x * 0.45 + y * 0.2) * 2.5 + (noise(x * 0.015, y * 0.02) - 0.5) * 6
      ]);
    }
    brush.spline(pts, 0.35);
  }

  // sparse pen scratches for dryness
  brush.set("rotring", "#7b6650", 0.23);
  for (let i = 0; i < 75; i++) {
    let x = random(20, 580);
    let y = random(350, 596);
    let len = random(8, 24);
    let a = random(-15, 15);
    brush.line(x, y, x + len, y + sin(a) * 2);
  }

  noLoop();
}