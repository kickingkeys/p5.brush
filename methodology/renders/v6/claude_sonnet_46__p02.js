function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Utility: draw a grass blade as a spline ---
  // Each blade: base point, control points curving upward
  function grassBlade(bx, by, height, lean, weight, col) {
    brush.set("HB", col, weight);
    let pts = [];
    let steps = 6;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = bx + lean * t * t * height * 0.5;
      let y = by - t * height;
      let wobble = sin(t * PI) * lean * 4;
      pts.push([x + wobble, y]);
    }
    brush.spline(pts, 0.35);
  }

  // --- Utility: draw a seed head (oval cluster of tiny strokes) ---
  function seedHead(cx, cy, r, angle, density, col) {
    brush.set("2H", col, 0.5);
    for (let i = 0; i < density; i++) {
      let a = random(TWO_PI);
      let rx = random(r * 0.3, r);
      let ry = random(r * 0.15, r * 0.5);
      let sx = cx + cos(a) * rx * cos(angle) - sin(a) * ry * sin(angle);
      let sy = cy + cos(a) * rx * sin(angle) + sin(a) * ry * cos(angle);
      let ex = cx + cos(a + 0.3) * (rx + random(3, 8)) * cos(angle) - sin(a + 0.3) * ry * sin(angle);
      let ey = cy + cos(a + 0.3) * (rx + random(3, 8)) * sin(angle) + sin(a + 0.3) * ry * cos(angle);
      brush.line(sx, sy, ex, ey);
    }
  }

  // --- Utility: draw a drooping seed head (wheat-like) ---
  function wheatHead(bx, by, len, lean, col) {
    brush.set("HB", col, 0.6);
    let pts = [];
    let steps = 8;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      pts.push([bx + lean * t * 20, by - len * (1 - t * 0.3)]);
    }
    brush.spline(pts, 0.4);

    // Side florets
    brush.set("2H", col, 0.4);
    for (let i = 1; i < steps; i++) {
      let t = i / steps;
      let fx = bx + lean * t * 20;
      let fy = by - len * (1 - t * 0.3);
      let side = (i % 2 === 0) ? 1 : -1;
      let flen = random(6, 14) * (1 - t * 0.4);
      brush.line(fx, fy, fx + side * flen, fy - flen * 0.4);
    }
  }

  // --- Utility: hatch a zone polygon ---
  function hatchZone(pts, dist, angle, col, w) {
    brush.noStroke();
    brush.hatchStyle("2H", col, w);
    brush.hatch(dist, angle, { rand: 0.06, continuous: true });
    brush.beginShape(0.3);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  // === BACKGROUND TONAL ZONES ===
  // Very light hatching to suggest ground/shadow areas
  hatchZone(
    [[0, 490], [600, 490], [600, 600], [0, 600]],
    11, 10, "#aaaaaa", 0.35
  );
  hatchZone(
    [[80, 500], [320, 500], [340, 600], [60, 600]],
    7, 25, "#999999", 0.3
  );
  hatchZone(
    [[300, 510], [560, 510], [580, 600], [280, 600]],
    8, 160, "#aaaaaa", 0.3
  );

  // === GROUND LINE — loose scratchy strokes ===
  brush.set("HB", "#555555", 0.7);
  brush.spline([[30, 520], [120, 515], [230, 522], [360, 518], [480, 524], [570, 519]], 0.2);
  brush.set("2H", "#888888", 0.4);
  brush.spline([[60, 525], [180, 521], [310, 527], [430, 522], [560, 526]], 0.15);

  // === CLUSTER 1 — left side, tall grasses with seed heads ===
  randomSeed(42);
  noiseSeed(42);

  let darkGray = "#333333";
  let midGray = "#555555";
  let lightGray = "#888888";
  let veryLight = "#bbbbbb";

  // Tall background grasses (faint, 2H)
  for (let i = 0; i < 7; i++) {
    let bx = random(30, 160);
    let by = random(500, 520);
    let h = random(200, 320);
    let lean = random(-0.3, 0.5);
    grassBlade(bx, by, h, lean, 0.3, lightGray);
  }

  // Mid grasses (HB)
  for (let i = 0; i < 5; i++) {
    let bx = random(50, 180);
    let by = random(505, 518);
    let h = random(150, 260);
    let lean = random(-0.2, 0.4);
    grassBlade(bx, by, h, lean, 0.5, midGray);
  }

  // Foreground grasses (2B, darker)
  for (let i = 0; i < 3; i++) {
    let bx = random(60, 150);
    let by = random(508, 520);
    let h = random(120, 200);
    let lean = random(-0.1, 0.3);
    grassBlade(bx, by, h, lean, 0.7, darkGray);
  }

  // Seed heads on left cluster
  seedHead(75, 215, 18, -0.2, 22, midGray);
  seedHead(110, 260, 14, 0.1, 18, midGray);
  seedHead(55, 240, 12, -0.3, 15, lightGray);
  seedHead(140, 290, 10, 0.2, 12, lightGray);

  // Wheat heads left
  wheatHead(90, 510, 180, 0.4, darkGray);
  wheatHead(125, 515, 150, -0.2, midGray);
  wheatHead(60, 512, 200, 0.6, midGray);

  // === CLUSTER 2 — center, mixed grasses ===
  // Background faint
  for (let i = 0; i < 8; i++) {
    let bx = random(200, 400);
    let by = random(498, 518);
    let h = random(180, 340);
    let lean = random(-0.4, 0.4);
    grassBlade(bx, by, h, lean, 0.3, veryLight);
  }

  // Mid
  for (let i = 0; i < 6; i++) {
    let bx = random(220, 390);
    let by = random(502, 516);
    let h = random(130, 270);
    let lean = random(-0.3, 0.3);
    grassBlade(bx, by, h, lean, 0.5, lightGray);
  }

  // Foreground center
  for (let i = 0; i < 4; i++) {
    let bx = random(240, 370);
    let by = random(505, 518);
    let h = random(100, 190);
    let lean = random(-0.2, 0.2);
    grassBlade(bx, by, h, lean, 0.65, midGray);
  }

  // Seed heads center
  seedHead(260, 230, 20, 0.1, 24, midGray);
  seedHead(300, 200, 16, -0.15, 20, midGray);
  seedHead(340, 250, 13, 0.2, 16, lightGray);
  seedHead(285, 280, 11, -0.1, 14, lightGray);
  seedHead(315, 310, 9, 0.05, 10, veryLight);

  // Wheat center
  wheatHead(270, 508, 170, 0.3, midGray);
  wheatHead(310, 512, 190, -0.4, darkGray);
  wheatHead(350, 506, 145, 0.2, midGray);

  // Drooping heavy seed head (2B, prominent)
  brush.set("2B", darkGray, 0.8);
  brush.spline([[295, 510], [298, 430], [305, 360], [318, 310], [330, 280], [325, 250]], 0.4);
  seedHead(325, 245, 22, 0.0, 28, darkGray);

  // === CLUSTER 3 — right side ===
  // Background
  for (let i = 0; i < 7; i++) {
    let bx = random(400, 570);
    let by = random(500, 520);
    let h = random(170, 310);
    let lean = random(-0.5, 0.2);
    grassBlade(bx, by, h, lean, 0.3, veryLight);
  }

  // Mid
  for (let i = 0; i < 5; i++) {
    let bx = random(420, 560);
    let by = random(504, 516);
    let h = random(120, 250);
    let lean = random(-0.4, 0.15);
    grassBlade(bx, by, h, lean, 0.5, lightGray);
  }

  // Foreground right
  for (let i = 0; i < 3; i++) {
    let bx = random(430, 550);
    let by = random(506, 518);
    let h = random(100, 180);
    let lean = random(-0.3, 0.1);
    grassBlade(bx, by, h, lean, 0.65, midGray);
  }

  // Seed heads right
  seedHead(460, 250, 16, -0.2, 20, midGray);
  seedHead(500, 220, 13, 0.1, 16, lightGray);
  seedHead(530, 270, 11, -0.1, 13, lightGray);
  seedHead(480, 300, 10, 0.15, 12, veryLight);

  // Wheat right
  wheatHead(450, 510, 160, -0.3, midGray);
  wheatHead(490, 508, 185, -0.5, darkGray);
  wheatHead(525, 512, 140, -0.2, midGray);

  // === SCATTERED FINE DETAIL — tiny florets and stray strokes ===
  brush.set("2H", lightGray, 0.35);
  for (let i = 0; i < 30; i++) {
    let x = random(30, 570);
    let y = random(300, 510);
    let len = random(4, 14);
    let a = random(-0.5, 0.5);
    brush.line(x, y, x + a * len, y - len);
  }

  // === TONAL SHADING ON KEY SEED HEADS ===
  // Hatch shadow on main center seed head
  brush.noStroke();
  brush.hatchStyle("2H", midGray, 0.4);
  brush.hatch(3, 50, { rand: 0.08, continuous: false });
  brush.beginShape(0.5);
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * TWO_PI;
    brush.vertex(325 + cos(a) * 20, 245 + sin(a) * 10);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", lightGray, 0.35);
  brush.hatch(5, 130, { rand: 0.06, continuous: false });
  brush.beginShape(0.5);
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * TWO_PI;
    brush.vertex(260 + cos(a) * 18, 230 + sin(a) * 9);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", lightGray, 0.3);
  brush.hatch(5, 80, { rand: 0.07 });
  brush.beginShape(0.5);
  for (let i = 0; i < 18; i++) {
    let a = (i / 18) * TWO_PI;
    brush.vertex(75 + cos(a) * 16, 215 + sin(a) * 8);
  }
  brush.endShape(true);
  brush.noHatch();

  // === SHADOW HATCHING AT BASE OF CLUSTERS ===
  brush.noStroke();
  brush.hatchStyle("2H", "#999999", 0.3);
  brush.hatch(6, 35, { rand: 0.05 });
  brush.beginShape(0.2);
  brush.vertex(40, 520);
  brush.vertex(200, 516);
  brush.vertex(210, 540);
  brush.vertex(30, 545);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#aaaaaa", 0.3);
  brush.hatch(7, 145, { rand: 0.05 });
  brush.beginShape(0.2);
  brush.vertex(230, 518);
  brush.vertex(390, 514);
  brush.vertex(400, 538);
  brush.vertex(220, 542);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#999999", 0.3);
  brush.hatch(6, 55, { rand: 0.05 });
  brush.beginShape(0.2);
  brush.vertex(410, 516);
  brush.vertex(570, 512);
  brush.vertex(575, 536);
  brush.vertex(405, 540);
  brush.endShape(true);
  brush.noHatch();

  // === STRAY UNFINISHED EDGES — a few loose lines that trail off ===
  brush.set("2H", veryLight, 0.3);
  brush.spline([[10, 480], [40, 460], [80, 440]], 0.3);
  brush.spline([[560, 430], [580, 410], [595, 380]], 0.3);
  brush.set("2H", lightGray, 0.35);
  brush.line(580, 350, 598, 310);
  brush.line(12, 390, 5, 355);

  // === FINE CONTOUR DETAILS — a few prominent blades in 2B ===
  brush.set("2B", darkGray, 0.75);
  brush.spline([[155, 516], [158, 450], [162, 380], [170, 320], [165, 260], [158, 210]], 0.35);
  brush.set("2B", "#222222", 0.8);
  brush.spline([[388, 514], [392, 440], [398, 360], [405, 300], [400, 240]], 0.38);

  // Seed on that last blade
  seedHead(400, 235, 17, 0.05, 20, darkGray);
  brush.hatchStyle("2H", darkGray, 0.4);
  brush.hatch(3, 60, { rand: 0.09 });
  brush.beginShape(0.5);
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * TWO_PI;
    brush.vertex(400 + cos(a) * 15, 235 + sin(a) * 8);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.noStroke();
  brush.noFill();

  noLoop();
}