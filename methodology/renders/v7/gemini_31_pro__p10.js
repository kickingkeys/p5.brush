function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);
  brush.fill("#f4ebd9", 100);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.5);
  brush.vertex(-20, -20);
  brush.vertex(620, -20);
  brush.vertex(620, 300);
  for (let x = 620; x >= -20; x -= 40) {
    brush.vertex(x, 290 + noise(x * 0.02) * 15);
  }
  brush.endShape(CLOSE);

  const sandLayers = [
    { c: "#e8cba6", o: 130, y: 300, amp: 20 },
    { c: "#dca77b", o: 150, y: 380, amp: 35 },
    { c: "#c48c5a", o: 170, y: 480, amp: 50 }
  ];

  for (let i = 0; i < sandLayers.length; i++) {
    let l = sandLayers[i];
    brush.fill(l.c, l.o);
    brush.fillBleed(0.35, "out");
    brush.beginShape(0.4);
    brush.vertex(-20, l.y);
    for (let x = 0; x <= 620; x += 50) {
      brush.vertex(x, l.y + noise(x * 0.015, i * 10) * l.amp);
    }
    brush.vertex(620, 620);
    brush.vertex(-20, 620);
    brush.endShape(CLOSE);
  }
  brush.noFill();

  brush.set("pen", "#2a2622", 0.5);
  brush.line(20, 300, 580, 300);

  brush.field("hand");
  brush.wiggle(3);

  const rocks = [
    { x: 120, y: 305, w: 90, h: -110 },
    { x: 420, y: 310, w: 160, h: -190 },
    { x: 490, y: 315, w: 80, h: -80 },
    { x: 280, y: 302, w: 50, h: -45 }
  ];

  for (let r of rocks) {
    brush.mass("crayon", "#1c1a18", { strength: 0.85, precision: 0.25, outline: true });
    brush.beginShape(0.05);
    brush.vertex(r.x - r.w / 2, r.y + 10);
    brush.vertex(r.x - r.w * 0.3, r.y + r.h * 0.35 + random(-15, 15));
    brush.vertex(r.x - r.w * 0.15, r.y + r.h * 0.75 + random(-15, 15));
    brush.vertex(r.x + random(-5, 5), r.y + r.h);
    brush.vertex(r.x + r.w * 0.2, r.y + r.h * 0.6 + random(-15, 15));
    brush.vertex(r.x + r.w * 0.35, r.y + r.h * 0.25 + random(-15, 15));
    brush.vertex(r.x + r.w / 2, r.y + 10);
    brush.endShape(CLOSE);
    brush.noMass();

    brush.set("charcoal", "#111111", 1.1);
    brush.line(r.x, r.y + r.h, r.x - r.w * 0.15, r.y + random(5, 15));
    brush.line(r.x, r.y + r.h, r.x + r.w * 0.2, r.y + random(0, 10));
    brush.line(r.x - r.w * 0.3, r.y + r.h * 0.35, r.x - r.w * 0.1, r.y + 5);
  }
  brush.noField();

  brush.set("pen", "#4a4238", 0.4);
  let cracks = [];
  
  function buildCrack(x, y, len, ang, depth) {
    if (depth === 0 || len < 5) return;
    let nx = x + cos(ang) * len;
    let ny = y + sin(ang) * len;
    if (ny < 310) ny = 310 + random(5, 15);
    cracks.push({ x1: x, y1: y, x2: nx, y2: ny });
    
    let branches = floor(random(1, 4));
    for (let i = 0; i < branches; i++) {
      buildCrack(nx, ny, len * random(0.4, 0.75), ang + random(-50, 50), depth - 1);
    }
  }

  for (let i = 0; i < 20; i++) {
    buildCrack(
      random(40, 560),
      random(400, 600),
      random(30, 80),
      random(0, 360),
      4
    );
  }

  for (let c of cracks) {
    brush.line(c.x1, c.y1, c.x2, c.y2);
  }

  noLoop();
}