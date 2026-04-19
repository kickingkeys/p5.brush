function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5efe6");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- BACKGROUND WASH: large overlapping spray circles ---
  const bgColors = ["#c0392b", "#2980b9", "#f39c12", "#27ae60", "#8e44ad", "#e67e22"];
  brush.noStroke();
  for (let i = 0; i < 55; i++) {
    const x = random(20, 580);
    const y = random(20, 580);
    const r = random(30, 130);
    const col = random(bgColors);
    brush.set("spray", col, random(1.5, 3.5));
    for (let j = 0; j < 80; j++) {
      brush.flowLine(
        x + random(-r * 0.4, r * 0.4),
        y + random(-r * 0.4, r * 0.4),
        random(r * 0.3, r * 0.9),
        random(360)
      );
    }
  }

  // --- DRIPS: short downward spray lines ---
  for (let i = 0; i < 22; i++) {
    const x = random(40, 560);
    const y = random(60, 420);
    const col = random(bgColors);
    brush.set("spray", col, random(0.4, 1.0));
    const dripLen = random(40, 130);
    brush.line(x, y, x + random(-5, 5), y + dripLen);
    // secondary thin drip
    if (random() > 0.5) {
      brush.set("spray", col, random(0.3, 0.6));
      brush.line(x + random(-8, 8), y + random(10, 40),
                 x + random(-10, 10), y + dripLen + random(20, 60));
    }
  }

  // --- ARROWS: spline arrows in marker/pen ---
  const arrowColors = ["#1a1a2e", "#c0392b", "#f39c12", "#2471a3", "#1e8449"];
  for (let i = 0; i < 10; i++) {
    const x0 = random(60, 460);
    const y0 = random(60, 500);
    const dx = random(60, 160);
    const dy = random(-60, 60);
    const col = random(arrowColors);
    brush.set("marker", col, random(0.8, 2.0));
    brush.spline([
      [x0, y0, 0.7],
      [x0 + dx * 0.5, y0 + dy * 0.5 + random(-20, 20), 0.8],
      [x0 + dx, y0 + dy, 0.6]
    ], 0.4);
    // arrowhead: two short lines
    const endX = x0 + dx;
    const endY = y0 + dy;
    const ang = atan2(dy, dx);
    brush.set("marker", col, random(0.7, 1.5));
    brush.line(endX, endY,
               endX - 18 * cos(ang - 25), endY - 18 * sin(ang - 25));
    brush.line(endX, endY,
               endX - 18 * cos(ang + 25), endY - 18 * sin(ang + 25));
  }

  // --- GHOSTED HAND-DRAWN MARKS: charcoal gestural strokes ---
  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 18; i++) {
    const x = random(30, 560);
    const y = random(30, 560);
    brush.set("charcoal", "#222222", random(0.4, 1.2));
    brush.spline([
      [x, y, random(0.4, 0.9)],
      [x + random(-60, 60), y + random(-50, 50), random(0.6, 1.2)],
      [x + random(-100, 100), y + random(-80, 80), random(0.3, 0.8)]
    ], random(0.3, 0.6));
  }
  brush.noField();

  // --- GHOSTED CIRCLES: faint pen outlines ---
  for (let i = 0; i < 12; i++) {
    const x = random(60, 540);
    const y = random(60, 540);
    const r = random(20, 90);
    brush.set("pen", "#1a1a1a", random(0.3, 0.8));
    brush.circle(x, y, r, random(0.2, 0.7));
  }

  // --- STENCIL TEXT-LIKE BLOCKS: thick marker rectangles ---
  const stencilColors = ["#c0392b", "#2471a3", "#1e8449", "#f39c12", "#6c3483"];
  for (let i = 0; i < 6; i++) {
    const x = random(40, 500);
    const y = random(40, 500);
    const w = random(40, 120);
    const h = random(15, 45);
    brush.set("marker", random(stencilColors), random(1.0, 2.0));
    brush.noFill();
    brush.rect(x, y, w, h, "corner");
  }

  // --- CROSSHATCH ZONES: pen/rotring hatching for worn texture ---
  brush.noStroke();
  for (let i = 0; i < 5; i++) {
    const x = random(40, 460);
    const y = random(40, 460);
    const sz = random(50, 130);
    const ang = random(360);
    brush.hatchStyle("rotring", "#111111", random(0.3, 0.7));
    brush.hatch(random(4, 9), ang, { rand: 0.08, continuous: false });
    brush.beginShape(0.2);
    brush.vertex(x, y);
    brush.vertex(x + sz, y + random(-20, 20));
    brush.vertex(x + sz + random(-20, 20), y + sz);
    brush.vertex(x + random(-20, 20), y + sz);
    brush.endShape(true);
    brush.noHatch();

    // second angle cross-hatch on same zone
    if (random() > 0.5) {
      brush.hatchStyle("rotring", "#111111", random(0.2, 0.5));
      brush.hatch(random(5, 11), ang + random(40, 70), { rand: 0.06 });
      brush.beginShape(0.2);
      brush.vertex(x, y);
      brush.vertex(x + sz, y + random(-20, 20));
      brush.vertex(x + sz + random(-20, 20), y + sz);
      brush.vertex(x + random(-20, 20), y + sz);
      brush.endShape(true);
      brush.noHatch();
    }
  }

  // --- SCRAWLED LINES: 2B pencil loose scribbles ---
  brush.wiggle(2);
  for (let i = 0; i < 14; i++) {
    const x = random(30, 560);
    const y = random(30, 560);
    brush.set("2B", "#333333", random(0.5, 1.3));
    brush.line(x, y,
               x + random(-120, 120),
               y + random(-80, 80));
  }
  brush.wiggle(0);

  // --- BOLD SPRAY OUTLINES: heavy spray ring passes ---
  for (let i = 0; i < 8; i++) {
    const x = random(80, 520);
    const y = random(80, 520);
    const r = random(40, 110);
    const col = random(bgColors);
    brush.set("spray", col, random(2.5, 4.0));
    for (let j = 0; j < 40; j++) {
      const a = random(360);
      brush.flowLine(
        x + cos(a) * r * random(0.85, 1.0),
        y + sin(a) * r * random(0.85, 1.0),
        random(8, 22),
        a + random(-30, 30)
      );
    }
  }

  // --- FINE PEN TAGS: looping splines like tag signatures ---
  for (let i = 0; i < 7; i++) {
    const x0 = random(50, 440);
    const y0 = random(80, 500);
    brush.set("pen", "#111111", random(0.5, 1.1));
    const pts = [];
    let cx = x0, cy = y0;
    for (let k = 0; k < 5; k++) {
      cx += random(15, 45);
      cy += random(-25, 25);
      pts.push([cx, cy, random(0.5, 1.2)]);
    }
    brush.spline(pts, random(0.3, 0.6));
  }

  // --- FINAL DARK DRIPS: black marker drips on top ---
  for (let i = 0; i < 10; i++) {
    const x = random(50, 550);
    const y = random(30, 350);
    brush.set("marker", "#111111", random(0.4, 1.0));
    brush.line(x, y, x + random(-4, 4), y + random(50, 180));
  }

  noLoop();
}