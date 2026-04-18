function setup() {
  createCanvas(600, 600, WEBGL);
  background("#f5efe6");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Ground shadow base ---
  brush.noStroke();
  brush.fill("#1a1008", 18);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.7, 0.5);
  brush.rect(0, 380, 600, 220);

  // --- Deep background hatch: horizontal wash of darkness ---
  brush.hatchStyle("2H", "#1a1008", 0.6);
  brush.hatch(3, 0, { rand: 0.12, continuous: false, gradient: 0.4 });
  brush.noStroke();
  brush.noFill();
  brush.rect(0, 200, 600, 400);

  // --- Mid background diagonal hatch ---
  brush.hatchStyle("HB", "#110d06", 0.7);
  brush.hatch(5, 55, { rand: 0.2, continuous: false, gradient: 0.3 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 260, 600, 340);

  // --- Cross-hatch shadow mass in lower third ---
  brush.hatchStyle("rotring", "#0d0a04", 0.5);
  brush.hatch(4, 125, { rand: 0.1, continuous: false, gradient: 0.2 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 370, 600, 230);

  brush.hatchStyle("rotring", "#0d0a04", 0.5);
  brush.hatch(4, 145, { rand: 0.1, continuous: false, gradient: 0.2 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 370, 600, 230);

  // --- Canopy top hatch ---
  brush.hatchStyle("2H", "#1a1008", 0.5);
  brush.hatch(4, 10, { rand: 0.3, continuous: false, gradient: 0.5 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 0, 600, 240);

  brush.hatchStyle("HB", "#110d06", 0.6);
  brush.hatch(6, 80, { rand: 0.25, continuous: false, gradient: 0.4 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 0, 600, 260);

  // --- Tree trunks ---
  let trunks = [
    { x: 42, w: 18, h: 520, lean: 1 },
    { x: 95, w: 14, h: 490, lean: -0.5 },
    { x: 155, w: 22, h: 560, lean: 0.8 },
    { x: 210, w: 12, h: 470, lean: -1.2 },
    { x: 265, w: 26, h: 580, lean: 0.3 },
    { x: 318, w: 16, h: 510, lean: -0.7 },
    { x: 370, w: 20, h: 550, lean: 1.1 },
    { x: 425, w: 13, h: 480, lean: -0.4 },
    { x: 478, w: 24, h: 570, lean: 0.6 },
    { x: 535, w: 15, h: 500, lean: -0.9 },
    { x: 580, w: 19, h: 540, lean: 0.2 },
  ];

  for (let t of trunks) {
    let top = 600 - t.h;
    let leanOffset = t.lean * (t.h / 80);

    // Trunk fill
    brush.noHatch();
    brush.noStroke();
    brush.fill("#0d0a04", 200);
    brush.fillBleed(0.04, "in");
    brush.fillTexture(0.5, 0.3);
    brush.beginShape(0);
    brush.vertex(t.x - t.w / 2 + leanOffset, top);
    brush.vertex(t.x + t.w / 2 + leanOffset, top);
    brush.vertex(t.x + t.w / 2 + t.w * 0.15, 600);
    brush.vertex(t.x - t.w / 2 - t.w * 0.15, 600);
    brush.endShape(true);

    // Trunk vertical hatch
    brush.hatchStyle("rotring", "#0a0704", 0.6);
    brush.hatch(2.5, 90, { rand: 0.05, continuous: true, gradient: 0.1 });
    brush.noFill();
    brush.noStroke();
    brush.beginShape(0);
    brush.vertex(t.x - t.w / 2 + leanOffset, top);
    brush.vertex(t.x + t.w / 2 + leanOffset, top);
    brush.vertex(t.x + t.w / 2 + t.w * 0.15, 600);
    brush.vertex(t.x - t.w / 2 - t.w * 0.15, 600);
    brush.endShape(true);

    // Trunk shadow side hatch
    brush.hatchStyle("pen", "#0a0704", 0.5);
    brush.hatch(2, 70, { rand: 0.08, continuous: false, gradient: 0.15 });
    brush.noFill();
    brush.noStroke();
    brush.beginShape(0);
    brush.vertex(t.x - t.w / 2 + leanOffset, top);
    brush.vertex(t.x + leanOffset * 0.3, top + t.h * 0.5);
    brush.vertex(t.x - t.w * 0.2, 600);
    brush.vertex(t.x - t.w / 2 - t.w * 0.15, 600);
    brush.endShape(true);
  }

  // --- Undergrowth: dense short vertical strokes ---
  brush.hatchStyle("2B", "#110d06", 0.8);
  brush.hatch(2, 88, { rand: 0.3, continuous: false, gradient: 0.0 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 420, 600, 80);

  brush.hatchStyle("charcoal", "#0d0a04", 0.9);
  brush.hatch(3, 92, { rand: 0.4, continuous: false, gradient: 0.1 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 450, 600, 150);

  // --- Undergrowth diagonal chaos ---
  brush.hatchStyle("HB", "#110d06", 0.7);
  brush.hatch(4, 70, { rand: 0.35, continuous: false, gradient: 0.2 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 430, 600, 170);

  brush.hatchStyle("2B", "#0d0a04", 0.8);
  brush.hatch(3.5, 110, { rand: 0.3, continuous: false, gradient: 0.15 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 440, 600, 160);

  // --- Branches: small diagonal strokes at various heights ---
  let branches = [
    { x: 42, y: 180, len: 60, angle: 145 },
    { x: 42, y: 280, len: 50, angle: 38 },
    { x: 155, y: 150, len: 70, angle: 140 },
    { x: 155, y: 260, len: 55, angle: 42 },
    { x: 265, y: 120, len: 80, angle: 148 },
    { x: 265, y: 240, len: 60, angle: 35 },
    { x: 370, y: 160, len: 65, angle: 142 },
    { x: 370, y: 290, len: 50, angle: 40 },
    { x: 478, y: 140, len: 75, angle: 147 },
    { x: 478, y: 270, len: 55, angle: 37 },
    { x: 95, y: 220, len: 45, angle: 152 },
    { x: 318, y: 200, len: 50, angle: 36 },
    { x: 535, y: 190, len: 60, angle: 143 },
    { x: 210, y: 170, len: 55, angle: 39 },
    { x: 425, y: 250, len: 48, angle: 150 },
  ];

  for (let b of branches) {
    let ex = b.x + cos(b.angle) * b.len;
    let ey = b.y + sin(b.angle) * b.len;
    brush.set("rotring", "#0a0704", 0.7);
    brush.noFill();
    brush.noHatch();
    brush.line(b.x, b.y, ex, ey);

    // Sub-branch
    let bx2 = ex + cos(b.angle + 25) * b.len * 0.5;
    let by2 = ey + sin(b.angle + 25) * b.len * 0.5;
    brush.set("2H", "#0d0a04", 0.5);
    brush.line(ex, ey, bx2, by2);
  }

  // --- Canopy cluster hatches (dark foliage masses) ---
  let canopies = [
    { x: 30, y: 30, w: 130, h: 160 },
    { x: 120, y: 10, w: 110, h: 140 },
    { x: 200, y: 20, w: 140, h: 170 },
    { x: 300, y: 0, w: 120, h: 150 },
    { x: 390, y: 15, w: 135, h: 165 },
    { x: 490, y: 5, w: 120, h: 155 },
    { x: 60, y: 100, w: 100, h: 120 },
    { x: 240, y: 80, w: 115, h: 130 },
    { x: 440, y: 90, w: 105, h: 125 },
  ];

  for (let c of canopies) {
    brush.noStroke();
    brush.fill("#0d0a04", 120);
    brush.fillBleed(0.12, "out");
    brush.fillTexture(0.8, 0.6);
    brush.noHatch();
    brush.circle(c.x + c.w / 2, c.y + c.h / 2, c.w / 2, 0.8);

    brush.hatchStyle("2H", "#0a0704", 0.5);
    brush.hatch(3, 30, { rand: 0.2, continuous: false, gradient: 0.3 });
    brush.noFill();
    brush.noStroke();
    brush.circle(c.x + c.w / 2, c.y + c.h / 2, c.w / 2, 0);

    brush.hatchStyle("HB", "#0d0a04", 0.6);
    brush.hatch(4, 120, { rand: 0.25, continuous: false, gradient: 0.2 });
    brush.noFill();
    brush.noStroke();
    brush.circle(c.x + c.w / 2, c.y + c.h / 2, c.w / 2 - 4, 0);
  }

  // --- Foreground grass / root detail ---
  brush.hatchStyle("2B", "#0d0a04", 1.0);
  brush.hatch(2, 85, { rand: 0.5, continuous: false, gradient: 0.0 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 500, 600, 100);

  brush.hatchStyle("charcoal", "#110d06", 1.1);
  brush.hatch(1.8, 95, { rand: 0.6, continuous: false, gradient: 0.0 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 530, 600, 70);

  // --- Final deepening cross-hatch overlay across whole image ---
  brush.hatchStyle("2H", "#0d0a04", 0.4);
  brush.hatch(7, 45, { rand: 0.15, continuous: false, gradient: 0.6 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 0, 600, 600);

  brush.hatchStyle("2H", "#0d0a04", 0.4);
  brush.hatch(7, 135, { rand: 0.15, continuous: false, gradient: 0.6 });
  brush.noFill();
  brush.noStroke();
  brush.rect(0, 0, 600, 600);

  noLoop();
}