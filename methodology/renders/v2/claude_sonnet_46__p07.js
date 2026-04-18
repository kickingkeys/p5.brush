function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#f5ede0");
  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Background atmosphere: large ghosted spray circles ---
  brush.field("curved");

  brush.set("spray", "#c0b0a0", 3.5);
  for (let i = 0; i < 80; i++) {
    brush.flowLine(120 + random(-30, 30), 180 + random(-30, 30), random(20, 50), random(360));
  }

  brush.set("spray", "#a89880", 3.0);
  for (let i = 0; i < 80; i++) {
    brush.flowLine(450 + random(-25, 25), 130 + random(-25, 25), random(15, 45), random(360));
  }

  brush.set("spray", "#b0c0b8", 3.5);
  for (let i = 0; i < 90; i++) {
    brush.flowLine(300 + random(-20, 20), 400 + random(-20, 20), random(20, 55), random(360));
  }

  brush.set("spray", "#c8b8d0", 3.0);
  for (let i = 0; i < 70; i++) {
    brush.flowLine(80 + random(-20, 20), 480 + random(-20, 20), random(15, 40), random(360));
  }

  brush.set("spray", "#d0c8a0", 3.0);
  for (let i = 0; i < 70; i++) {
    brush.flowLine(500 + random(-20, 20), 420 + random(-20, 20), random(15, 40), random(360));
  }

  brush.noField();

  // --- Large spray circles (graffiti tags) ---
  // Circle 1: big teal ring
  brush.noFill();
  brush.noHatch();
  brush.set("spray", "#2a7a6a", 2.5);
  for (let i = 0; i < 200; i++) {
    let a = random(360);
    let r = 95 + random(-8, 8);
    let cx = 180, cy = 220;
    brush.flowLine(cx + cos(radians(a)) * r, cy + sin(radians(a)) * r, random(8, 18), a + 90);
  }

  // Circle 2: large red-orange ring
  brush.set("spray", "#cc3322", 2.8);
  for (let i = 0; i < 220; i++) {
    let a = random(360);
    let r = 115 + random(-10, 10);
    let cx = 400, cy = 300;
    brush.flowLine(cx + cos(radians(a)) * r, cy + sin(radians(a)) * r, random(10, 22), a + 90);
  }

  // Circle 3: medium blue ring, offset
  brush.set("spray", "#1a3a8a", 2.2);
  for (let i = 0; i < 180; i++) {
    let a = random(360);
    let r = 75 + random(-7, 7);
    let cx = 300, cy = 150;
    brush.flowLine(cx + cos(radians(a)) * r, cy + sin(radians(a)) * r, random(7, 16), a + 90);
  }

  // Circle 4: yellow-green ring, lower left
  brush.set("spray", "#8aaa22", 2.4);
  for (let i = 0; i < 160; i++) {
    let a = random(360);
    let r = 85 + random(-8, 8);
    let cx = 130, cy = 430;
    brush.flowLine(cx + cos(radians(a)) * r, cy + sin(radians(a)) * r, random(8, 18), a + 90);
  }

  // Circle 5: purple, lower right
  brush.set("spray", "#662288", 2.3);
  for (let i = 0; i < 160; i++) {
    let a = random(360);
    let r = 80 + random(-7, 7);
    let cx = 490, cy = 460;
    brush.flowLine(cx + cos(radians(a)) * r, cy + sin(radians(a)) * r, random(8, 18), a + 90);
  }

  // --- Spray fill blobs (solid spray-painted areas) ---
  brush.field("hand");
  brush.wiggle(2);

  // Teal blob fill
  brush.set("spray", "#2a7a6a", 1.8);
  for (let i = 0; i < 120; i++) {
    brush.flowLine(180 + random(-60, 60), 220 + random(-60, 60), random(12, 30), random(360));
  }

  // Red blob fill
  brush.set("spray", "#cc3322", 2.0);
  for (let i = 0; i < 100; i++) {
    brush.flowLine(400 + random(-70, 70), 300 + random(-70, 70), random(10, 25), random(360));
  }

  // Blue blob fill
  brush.set("spray", "#1a3a8a", 1.6);
  for (let i = 0; i < 90; i++) {
    brush.flowLine(300 + random(-50, 50), 150 + random(-50, 50), random(8, 20), random(360));
  }

  brush.noField();

  // --- Drips: vertical spray trails ---
  let dripColors = ["#2a7a6a", "#cc3322", "#1a3a8a", "#8aaa22", "#662288", "#cc8800"];
  let dripX = [160, 195, 375, 415, 285, 310, 115, 500, 480];
  let dripY = [280, 300, 380, 350, 200, 215, 490, 510, 490];
  let dripLen = [60, 45, 80, 55, 50, 70, 40, 65, 50];

  for (let d = 0; d < dripX.length; d++) {
    let col = dripColors[d % dripColors.length];
    brush.set("spray", col, 1.2);
    let segments = floor(random(4, 9));
    let cx = dripX[d] + random(-5, 5);
    let cy = dripY[d];
    let len = dripLen[d];
    for (let s = 0; s < segments; s++) {
      let sy = cy + s * (len / segments);
      for (let i = 0; i < 8; i++) {
        brush.flowLine(cx + random(-3, 3), sy + random(-2, 2), random(6, 14), 90 + random(-10, 10));
      }
    }
  }

  // --- Ghosted hand-drawn marks: charcoal fragments ---
  brush.field("hand");
  brush.wiggle(4);

  brush.set("charcoal", "#555555", 0.7);
  // Sweeping arc gesture
  brush.beginStroke("curve", 60, 320);
  brush.move(15, 80, 0.5);
  brush.move(30, 70, 0.8);
  brush.move(50, 60, 0.6);
  brush.endStroke(70, 0.3);

  brush.set("charcoal", "#444444", 0.6);
  brush.beginStroke("curve", 350, 80);
  brush.move(200, 90, 0.6);
  brush.move(220, 70, 0.9);
  brush.move(240, 60, 0.5);
  brush.endStroke(260, 0.3);

  brush.set("charcoal", "#666666", 0.5);
  brush.beginStroke("curve", 430, 370);
  brush.move(250, 60, 0.4);
  brush.move(270, 50, 0.7);
  brush.move(290, 40, 0.5);
  brush.endStroke(310, 0.2);

  brush.set("charcoal", "#777777", 0.5);
  brush.beginStroke("curve", 50, 150);
  brush.move(340, 50, 0.5);
  brush.move(360, 40, 0.6);
  brush.move(380, 35, 0.4);
  brush.endStroke(400, 0.2);

  brush.noField();

  // --- Arrows: marker drawn arrows ---
  brush.wiggle(2);
  brush.field("hand");

  function drawArrow(x1, y1, x2, y2, col, w) {
    brush.set("marker", col, w);
    brush.line(x1, y1, x2, y2);
    let ang = atan2(y2 - y1, x2 - x1);
    let headLen = 18;
    brush.line(x2, y2, x2 - cos(ang - radians(25)) * headLen, y2 - sin(ang - radians(25)) * headLen);
    brush.line(x2, y2, x2 - cos(ang + radians(25)) * headLen, y2 - sin(ang + radians(25)) * headLen);
  }

  drawArrow(240, 120, 340, 160, "#cc3322", 1.2);
  drawArrow(80, 300, 160, 260, "#2a7a6a", 1.0);
  drawArrow(420, 200, 480, 260, "#cc8800", 1.1);
  drawArrow(330, 440, 260, 380, "#1a3a8a", 1.0);
  drawArrow(500, 150, 450, 220, "#662288", 0.9);
  drawArrow(150, 520, 220, 470, "#cc3322", 1.0);
  drawArrow(460, 380, 540, 330, "#8aaa22", 1.0);

  brush.noField();

  // --- Ghosted letter-like forms: pen strokes ---
  brush.set("pen", "#333333", 0.6);
  brush.wiggle(3);
  brush.field("hand");

  // Abstract letter-like marks (not actual letters, just geometric fragments)
  // Vertical bar + crossbar (like H fragment)
  brush.line(510, 80, 510, 160);
  brush.line(540, 80, 540, 160);
  brush.line(510, 120, 540, 120);

  // Diagonal cross (X fragment)
  brush.line(55, 60, 100, 110);
  brush.line(100, 60, 55, 110);

  // Arc fragment (C-like)
  brush.arc(370, 490, 35, radians(120), radians(300));

  // Z-like zigzag
  brush.line(200, 500, 260, 500);
  brush.line(260, 500, 200, 550);
  brush.line(200, 550, 260, 550);

  // Triangle fragment
  brush.line(440, 50, 480, 50);
  brush.line(480, 50, 460, 90);
  brush.line(460, 90, 440, 50);

  brush.noField();

  // --- Pencil texture overlay: fine HB hatching over some areas ---
  brush.noFill();
  brush.hatchStyle("HB", "#888888", 0.5);
  brush.hatch(6, 45, { rand: 0.08, continuous: false });

  // Hatch over lower-left zone
  brush.beginShape(0.2);
  brush.vertex(40, 380);
  brush.vertex(200, 360);
  brush.vertex(220, 520);
  brush.vertex(40, 540);
  brush.endShape(true);

  brush.noHatch();

  brush.hatchStyle("2H", "#aaaaaa", 0.4);
  brush.hatch(8, 130, { rand: 0.06, continuous: false });

  // Hatch over upper-right zone
  brush.beginShape(0.2);
  brush.vertex(400, 40);
  brush.vertex(580, 40);
  brush.vertex(580, 200);
  brush.vertex(400, 200);
  brush.endShape(true);

  brush.noHatch();

  // --- Marker bold outlines: partial circle outlines ---
  brush.noFill();
  brush.noHatch();

  brush.set("marker", "#cc3322", 1.8);
  brush.arc(400, 300, 115, radians(200), radians(350));

  brush.set("marker", "#2a7a6a", 1.6);
  brush.arc(180, 220, 95, radians(20), radians(180));

  brush.set("marker", "#662288", 1.4);
  brush.arc(490, 460, 80, radians(150), radians(320));

  brush.set("marker", "#cc8800", 1.5);
  brush.arc(300, 150, 75, radians(30), radians(200));

  // --- Crayon scrawl texture in corners ---
  brush.set("crayon", "#cc8844", 0.8);
  brush.wiggle(5);
  brush.field("hand");
  brush.spline([[20, 20], [60, 35], [40, 60], [80, 50], [70, 20]], 0.5);
  brush.spline([[530, 20], [570, 40], [550, 70], [580, 55], [560, 25]], 0.5);
  brush.spline([[20, 560], [55, 540], [35, 580], [70, 570], [50, 595]], 0.5);
  brush.spline([[540, 560], [570, 545], [555, 580], [580, 570], [560, 595]], 0.5);

  brush.set("crayon", "#4488cc", 0.7);
  brush.spline([[25, 30], [55, 50], [30, 75]], 0.4);
  brush.spline([[545, 30], [565, 55], [540, 75]], 0.4);

  brush.noField();

  // --- Final: scattered spray dots for grit ---
  brush.set("spray", "#000000", 0.8);
  for (let i = 0; i < 60; i++) {
    brush.flowLine(random(600), random(600), random(3, 8), random(360));
  }

  brush.set("spray", "#ffffff", 1.0);
  for (let i = 0; i < 40; i++) {
    brush.flowLine(random(600), random(600), random(3, 10), random(360));
  }

  noLoop();
}