function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(412);
  noiseSeed(412);

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  // 1. Sky and Atmospheric Fog (Field Watercolor)
  const skyColors = ["#e8ded1", "#d9e2e8", "#f0dcd8", "#cfd8df", "#dce2e6"];
  for (let i = 0; i < 25; i++) {
    let cx = random(20, 580);
    let cy = random(20, 350);
    let r = random(80, 220);
    brush.fill(random(skyColors), random(30, 65));
    brush.fillBleed(random(0.4, 0.7), "out");
    brush.circle(cx, cy, r, true);
  }

  // Sun / Light bloom in the fog
  brush.fill("#fceade", 50);
  brush.fillBleed(0.6, "out");
  brush.circle(420, 180, 140, true);
  brush.fill("#f9dcc4", 70);
  brush.circle(420, 180, 90, true);

  // 2. Water (Field Watercolor - horizontal stretches)
  const waterColors = ["#b5c4d1", "#c8d3db", "#e2d5ce", "#9ba9b8", "#aab8c4"];
  for (let i = 0; i < 18; i++) {
    let cx = random(50, 550);
    let cy = random(320, 580);
    let w = random(150, 350);
    let h = random(20, 60);
    brush.fill(random(waterColors), random(40, 75));
    brush.fillBleed(0.5, "out");
    
    brush.beginShape(0.4);
    for (let a = 0; a < 360; a += 30) {
      let radW = w / 2 + noise(i, a) * 30;
      let radH = h / 2 + noise(i + 10, a) * 10;
      brush.vertex(cx + cos(a) * radW, cy + sin(a) * radH);
    }
    brush.endShape(true);
  }

  // 3. Distant faint boats in the fog
  const distantColors = ["#8a9ba8", "#9ca8b5"];
  for (let i = 0; i < 3; i++) {
    let dx = random(100, 500);
    let dy = random(320, 350);
    brush.fill(random(distantColors), 80);
    brush.fillBleed(0.4, "out");
    brush.beginShape(0.3);
    brush.vertex(dx - 30, dy - 5);
    brush.vertex(dx + 40, dy - 10);
    brush.vertex(dx + 20, dy + 10);
    brush.vertex(dx - 20, dy + 8);
    brush.endShape(true);
  }

  // 4. Foreground Boats (Form Watercolor)
  const boats = [
    {
      // Left midground boat
      pts: [[120, 410], [110, 450], [180, 470], [280, 450], [320, 390], [220, 415]],
      cx: 215, cy: 430,
      base: "#5c6b7a", shadow: "#3a4b5c", inner: "#1a2b3c",
      mastX: 200, mastY: 415, mastH: 260,
      mast2X: 260, mast2Y: 405, mast2H: 180
    },
    {
      // Right background boat
      pts: [[360, 380], [370, 410], [430, 420], [500, 400], [520, 360], [450, 385]],
      cx: 440, cy: 390,
      base: "#706862", shadow: "#4a423d", inner: "#2d2623",
      mastX: 420, mastY: 385, mastH: 200,
      mast2X: null
    }
  ];

  for (let b of boats) {
    // Base wash and texture layer
    brush.wash(b.base, 140);
    brush.fill(b.shadow, 180);
    brush.fillBleed(0.3, "out");
    brush.beginShape(0.4);
    for (let p of b.pts) {
      brush.vertex(p[0] + random(-3, 3), p[1] + random(-3, 3));
    }
    brush.endShape(true);
    brush.noWash();

    // Inner shadow for dried puddle effect
    brush.fill(b.inner, 140);
    brush.fillBleed(0.4, "in");
    brush.beginShape(0.4);
    for (let p of b.pts) {
      brush.vertex(lerp(b.cx, p[0], 0.8), lerp(b.cy, p[1], 0.8));
    }
    brush.endShape(true);
    
    // Water reflection under hull
    brush.fill(b.shadow, 90);
    brush.fillBleed(0.5, "out");
    brush.rect(b.cx, b.cy + 30, 140, 15, "center");
  }

  brush.noFill();

  // 5. Graphite Details (Masts, Ropes, Water lines)
  // Water ripples
  brush.set("2H", "#7a8a9a", 0.4);
  for (let i = 0; i < 40; i++) {
    let wx = random(40, 560);
    let wy = random(350, 580);
    let wl = random(15, 60);
    brush.line(wx, wy, wx + wl, wy);
  }

  // Boat 1 Masts and Ropes
  let b1 = boats[0];
  brush.set("HB", "#333b45", 0.9);
  brush.line(b1.mastX, b1.mastY, b1.mastX, b1.mastY - b1.mastH);
  
  brush.set("2H", "#45505c", 0.6);
  brush.line(b1.mast2X, b1.mast2Y, b1.mast2X, b1.mast2Y - b1.mast2H);
  
  // Boat 1 Rigging
  brush.set("2H", "#55606a", 0.4);
  brush.line(b1.mastX, b1.mastY - b1.mastH + 10, b1.pts[4][0], b1.pts[4][1]); // Forestay
  brush.line(b1.mastX, b1.mastY - b1.mastH + 20, b1.pts[0][0], b1.pts[0][1]); // Backstay
  brush.line(b1.mastX, b1.mastY - 140, b1.mast2X, b1.mast2Y - b1.mast2H + 10); // Inter-mast
  brush.line(b1.mast2X, b1.mast2Y - b1.mast2H + 10, b1.pts[0][0] + 20, b1.pts[0][1]);
  brush.line(b1.mastX, b1.mastY - 80, b1.pts[4][0] - 30, b1.pts[4][1] + 5);

  // Boat 2 Masts and Ropes
  let b2 = boats[1];
  brush.set("HB", "#3a3532", 0.8);
  brush.line(b2.mastX, b2.mastY, b2.mastX, b2.mastY - b2.mastH);
  
  brush.set("2H", "#504a46", 0.4);
  brush.line(b2.mastX, b2.mastY - b2.mastH + 15, b2.pts[4][0], b2.pts[4][1]);
  brush.line(b2.mastX, b2.mastY - b2.mastH + 25, b2.pts[0][0], b2.pts[0][1]);
  brush.line(b2.mastX, b2.mastY - 100, b2.pts[4][0] - 20, b2.pts[4][1] + 5);

  // Distant faint masts
  brush.set("2H", "#8a9ba8", 0.3);
  brush.line(160, 330, 160, 240);
  brush.line(160, 250, 130, 335);
  brush.line(480, 340, 480, 260);
  brush.line(480, 270, 510, 345);

  // Gentle hull contour accents
  brush.set("HB", "#2a323a", 0.6);
  brush.spline([[b1.pts[1][0], b1.pts[1][1]], [b1.pts[2][0], b1.pts[2][1]], [b1.pts[3][0], b1.pts[3][1]]], 0.3);
  brush.spline([[b2.pts[1][0], b2.pts[1][1]], [b2.pts[2][0], b2.pts[2][1]], [b2.pts[3][0], b2.pts[3][1]]], 0.3);

  noLoop();
}