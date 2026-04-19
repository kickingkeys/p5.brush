function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#1a1a2e");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Dark night sky background wash
  brush.noStroke();
  brush.wash("#1a1a2e", 255);
  brush.rect(0, 0, 600, 600);
  brush.noWash();

  // Deep purple-blue sky gradient layers
  brush.fill("#16213e", 220);
  brush.fillBleed(0.2, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);
  brush.noFill();

  // Wet pavement — dark reflective surface
  brush.wash("#0d1b2a", 240);
  brush.beginShape(0.2);
  brush.vertex(0, 340);
  brush.vertex(600, 340);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Pavement wet sheen — subtle blue-grey watercolor
  brush.fill("#1e3a5f", 80);
  brush.fillBleed(0.45, "out");
  brush.fillTexture(0.6, 0.3);
  brush.beginShape(0.4);
  brush.vertex(0, 350);
  brush.vertex(600, 350);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  // Rain streaks — thin rotring lines
  brush.set("rotring", "#a0b4c8", 0.3);
  for (let i = 0; i < 120; i++) {
    let rx = random(0, 600);
    let ry = random(0, 600);
    let len = random(8, 22);
    brush.line(rx, ry, rx + random(-3, 3), ry + len);
  }

  // More rain on pavement — slightly more visible
  brush.set("rotring", "#7090a8", 0.25);
  for (let i = 0; i < 80; i++) {
    let rx = random(0, 600);
    let ry = random(340, 600);
    let len = random(5, 14);
    brush.line(rx, ry, rx + random(-2, 2), ry + len);
  }

  // Neon sign bleed — hot pink / magenta (upper left building zone)
  brush.noStroke();
  brush.fill("#ff2d78", 55);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.5, 0.4);
  brush.beginShape(0.5);
  let px1 = [[60, 80], [180, 75], [195, 160], [55, 168]];
  for (let p of px1) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#ff2d78", 35);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  let px1b = [[50, 100], [200, 90], [210, 200], [40, 210]];
  for (let p of px1b) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  // Neon pink reflection on pavement
  brush.fill("#ff2d78", 40);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.4, 0.3);
  brush.beginShape(0.5);
  let pr1 = [[55, 355], [195, 350], [210, 430], [40, 440]];
  for (let p of pr1) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#cc1155", 25);
  brush.fillBleed(0.75, "out");
  brush.beginShape(0.5);
  let pr1b = [[60, 420], [200, 415], [220, 520], [45, 530]];
  for (let p of pr1b) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  // Neon sign bleed — cyan / teal (upper right zone)
  brush.fill("#00e5ff", 50);
  brush.fillBleed(0.6, "out");
  brush.fillTexture(0.5, 0.35);
  brush.beginShape(0.5);
  let px2 = [[390, 60], [530, 55], [545, 150], [380, 158]];
  for (let p of px2) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#00b8d4", 35);
  brush.fillBleed(0.7, "out");
  brush.beginShape(0.5);
  let px2b = [[375, 80], [555, 72], [570, 200], [365, 210]];
  for (let p of px2b) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  // Cyan reflection on pavement
  brush.fill("#00e5ff", 38);
  brush.fillBleed(0.62, "out");
  brush.fillTexture(0.4, 0.3);
  brush.beginShape(0.5);
  let pr2 = [[385, 348], [545, 342], [560, 430], [370, 438]];
  for (let p of pr2) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#007a8a", 22);
  brush.fillBleed(0.72, "out");
  brush.beginShape(0.5);
  let pr2b = [[380, 420], [555, 412], [575, 530], [360, 540]];
  for (let p of pr2b) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  // Amber / orange neon — center top
  brush.fill("#ff8c00", 48);
  brush.fillBleed(0.55, "out");
  brush.fillTexture(0.5, 0.3);
  brush.beginShape(0.5);
  let px3 = [[240, 90], [360, 85], [372, 170], [228, 178]];
  for (let p of px3) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#ff6600", 30);
  brush.fillBleed(0.65, "out");
  brush.beginShape(0.5);
  let px3b = [[230, 110], [375, 100], [390, 210], [218, 220]];
  for (let p of px3b) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  // Amber reflection on pavement
  brush.fill("#ff8c00", 35);
  brush.fillBleed(0.58, "out");
  brush.fillTexture(0.4, 0.25);
  brush.beginShape(0.5);
  let pr3 = [[235, 352], [368, 346], [382, 430], [220, 438]];
  for (let p of pr3) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#cc5500", 20);
  brush.fillBleed(0.68, "out");
  brush.beginShape(0.5);
  let pr3b = [[228, 425], [385, 418], [400, 530], [210, 540]];
  for (let p of pr3b) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  // Neon marker smears — hot pink horizontal streaks on buildings
  brush.set("marker", "#ff2d78", 2.5);
  brush.spline([[55, 112], [100, 108], [145, 110], [185, 107]], 0.3);
  brush.set("marker", "#cc1155", 1.8);
  brush.spline([[60, 125], [130, 122], [180, 124]], 0.3);

  // Cyan marker smears
  brush.set("marker", "#00e5ff", 2.2);
  brush.spline([[392, 88], [450, 84], [510, 86], [542, 83]], 0.3);
  brush.set("marker", "#00b8d4", 1.6);
  brush.spline([[395, 102], [460, 99], [538, 101]], 0.3);

  // Amber marker smears
  brush.set("marker", "#ff8c00", 2.0);
  brush.spline([[242, 118], [295, 114], [355, 116]], 0.3);
  brush.set("marker", "#dd6600", 1.5);
  brush.spline([[245, 132], [300, 129], [358, 131]], 0.3);

  // Neon reflections on pavement — marker horizontal smears
  brush.set("marker", "#ff2d78", 1.8);
  brush.wiggle(2);
  brush.spline([[50, 372], [110, 368], [175, 370]], 0.4);
  brush.set("marker", "#cc1155", 1.2);
  brush.spline([[55, 385], [140, 382], [188, 384]], 0.4);

  brush.set("marker", "#00e5ff", 1.6);
  brush.spline([[388, 365], [450, 361], [548, 363]], 0.4);
  brush.set("marker", "#007a8a", 1.1);
  brush.spline([[390, 378], [455, 375], [545, 377]], 0.4);

  brush.set("marker", "#ff8c00", 1.5);
  brush.spline([[230, 368], [290, 364], [372, 366]], 0.4);
  brush.noField();

  // Building silhouettes — dark ink blocks
  brush.noStroke();
  brush.wash("#0a0f1a", 255);

  // Left building mass
  brush.beginShape(0.1);
  brush.vertex(0, 0);
  brush.vertex(90, 0);
  brush.vertex(90, 50);
  brush.vertex(110, 50);
  brush.vertex(110, 30);
  brush.vertex(145, 30);
  brush.vertex(145, 280);
  brush.vertex(0, 280);
  brush.endShape(true);

  // Right building mass
  brush.beginShape(0.1);
  brush.vertex(430, 0);
  brush.vertex(490, 0);
  brush.vertex(490, 40);
  brush.vertex(530, 40);
  brush.vertex(530, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 300);
  brush.vertex(430, 300);
  brush.endShape(true);

  // Center-left building
  brush.beginShape(0.1);
  brush.vertex(155, 180);
  brush.vertex(230, 180);
  brush.vertex(230, 320);
  brush.vertex(155, 320);
  brush.endShape(true);

  // Center-right building
  brush.beginShape(0.1);
  brush.vertex(370, 190);
  brush.vertex(430, 190);
  brush.vertex(430, 320);
  brush.vertex(370, 320);
  brush.endShape(true);

  brush.noWash();

  // Building windows — small glowing spots
  // Left building windows — warm yellow
  let winColors = ["#ffe066", "#ffd700", "#ffb347", "#ffe5a0"];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 3; col++) {
      let wx = 18 + col * 28;
      let wy = 60 + row * 32;
      if (random() > 0.35) {
        brush.noStroke();
        brush.wash(random(winColors), 200);
        brush.rect(wx, wy, 14, 10);
        brush.noWash();
        // Window glow bleed
        brush.fill(random(winColors), 40);
        brush.fillBleed(0.5, "out");
        brush.rect(wx - 4, wy - 4, 22, 18);
        brush.noFill();
      }
    }
  }

  // Right building windows
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 4; col++) {
      let wx = 445 + col * 32;
      let wy = 30 + row * 36;
      if (random() > 0.3) {
        brush.noStroke();
        brush.wash(random(winColors), 200);
        brush.rect(wx, wy, 14, 10);
        brush.noWash();
        brush.fill(random(winColors), 35);
        brush.fillBleed(0.5, "out");
        brush.rect(wx - 4, wy - 4, 22, 18);
        brush.noFill();
      }
    }
  }

  // Window reflections on pavement
  for (let i = 0; i < 18; i++) {
    let wrx = random(10, 145);
    let wry = random(355, 520);
    brush.noStroke();
    brush.fill(random(winColors), random(18, 35));
    brush.fillBleed(0.55, "out");
    brush.rect(wrx, wry, random(8, 18), random(4, 10));
    brush.noFill();
  }
  for (let i = 0; i < 18; i++) {
    let wrx = random(435, 590);
    let wry = random(355, 520);
    brush.noStroke();
    brush.fill(random(winColors), random(18, 35));
    brush.fillBleed(0.55, "out");
    brush.rect(wrx, wry, random(8, 18), random(4, 10));
    brush.noFill();
  }

  // Street horizon line — wet pavement edge
  brush.set("2B", "#0d1b2a", 1.2);
  brush.wiggle(1);
  brush.line(0, 340, 600, 340);
  brush.noField();

  // Puddle reflections — elliptical watercolor bleeds on pavement
  brush.noStroke();
  brush.fill("#ff2d78", 28);
  brush.fillBleed(0.7, "out");
  brush.fillTexture(0.3, 0.2);
  brush.beginShape(0.6);
  let puddlePts1 = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 90 + cos(a) * 55;
    let ry = 480 + sin(a) * 18;
    puddlePts1.push([rx, ry]);
  }
  for (let p of puddlePts1) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#00e5ff", 25);
  brush.fillBleed(0.68, "out");
  brush.fillTexture(0.3, 0.2);
  brush.beginShape(0.6);
  let puddlePts2 = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 460 + cos(a) * 60;
    let ry = 470 + sin(a) * 16;
    puddlePts2.push([rx, ry]);
  }
  for (let p of puddlePts2) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  brush.fill("#ff8c00", 22);
  brush.fillBleed(0.65, "out");
  brush.fillTexture(0.3, 0.2);
  brush.beginShape(0.6);
  let puddlePts3 = [];
  for (let i = 0; i < 20; i++) {
    let a = (i / 20) * 360;
    let rx = 295 + cos(a) * 45;
    let ry = 490 + sin(a) * 14;
    puddlePts3.push([rx, ry]);
  }
  for (let p of puddlePts3) brush.vertex(p[0], p[1]);
  brush.endShape(true);
  brush.noFill();

  // Passerby silhouettes — sparse ink figures
  // Figure 1 — left side, walking
  brush.set("2B", "#050a10", 1.8);
  brush.wiggle(1);
  // Head
  brush.circle(115, 315, 7);
  // Body
  brush.spline([[115, 322], [113, 338], [114, 355]], 0.3);
  // Left arm
  brush.spline([[114, 330], [106, 338], [100, 348]], 0.3);
  // Right arm
  brush.spline([[114, 330], [122, 340], [127, 350]], 0.3);
  // Left leg
  brush.spline([[113, 355], [110, 370], [107, 385]], 0.3);
  // Right leg
  brush.spline([[115, 355], [118, 370], [122, 385]], 0.3);
  brush.noField();

  // Figure 1 fill silhouette
  brush.noStroke();
  brush.wash("#050a10", 220);
  brush.beginShape(0.2);
  brush.vertex(108, 315);
  brush.vertex(122, 315);
  brush.vertex(125, 355);
  brush.vertex(122, 385);
  brush.vertex(116, 385);
  brush.vertex(114, 360);
  brush.vertex(112, 385);
  brush.vertex(106, 385);
  brush.vertex(103, 355);
  brush.endShape(true);
  brush.noWash();

  // Figure 2 — right of center, umbrella
  brush.set("2B", "#050a10", 1.6);
  brush.wiggle(1);
  brush.circle(310, 308, 6);
  brush.spline([[310, 314], [309, 328], [310, 344]], 0.3);
  brush.spline([[309, 325], [302, 333], [296, 341]], 0.3);
  brush.spline([[310, 325], [317, 334], [323, 343]], 0.3);
  brush.spline([[309, 344], [306, 358], [304, 372]], 0.3);
  brush.spline([[311, 344], [313, 358], [316, 372]], 0.3);
  brush.noField();

  // Umbrella canopy
  brush.noStroke();
  brush.wash("#050a10", 210);
  brush.beginShape(0.3);
  let umbPts = [];
  for (let i = 0; i < 16; i++) {
    let a = 180 + (i / 15) * 180;
    umbPts.push([310 + cos(a) * 26, 308 + sin(a) * 10]);
  }
  for (let p of umbPts) brush.vertex(p[0], p[1]);
  brush.vertex(310, 308);
  brush.endShape(true);
  brush.noWash();

  // Figure 2 body fill
  brush.wash("#050a10", 215);
  brush.beginShape(0.2);
  brush.vertex(304, 308);
  brush.vertex(317, 308);
  brush.vertex(320, 344);
  brush.vertex(316, 372);
  brush.vertex(311, 372);
  brush.vertex(310, 350);
  brush.vertex(308, 372);
  brush.vertex(303, 372);
  brush.vertex(300, 344);
  brush.endShape(true);
  brush.noWash();

  // Figure 3 — far right, receding
  brush.set("2B", "#050a10", 1.2);
  brush.wiggle(1);
  brush.circle(520, 320, 5);
  brush.spline([[520, 325], [519, 336], [520, 348]], 0.25);
  brush.spline([[519, 332], [514, 339], [510, 346]], 0.25);
  brush.spline([[520, 332], [525, 339], [529, 346]], 0.25);
  brush.spline([[519, 348], [517, 360], [515, 372]], 0.25);
  brush.spline([[521, 348], [522, 360], [524, 372]], 0.25);
  brush.noField();

  brush.noStroke();
  brush.wash("#050a10", 200);
  brush.beginShape(0.2);
  brush.vertex(515, 320);
  brush.vertex(526, 320);
  brush.vertex(528, 348);
  brush.vertex(524, 372);
  brush.vertex(520, 372);
  brush.vertex(519, 352);
  brush.vertex(517, 372);
  brush.vertex(513, 372);
  brush.vertex(512, 348);
  brush.endShape(true);
  brush.noWash();

  // Figure 4 — far left, small/distant
  brush.set("2B", "#050a10", 1.0);
  brush.wiggle(1);
  brush.circle(38, 326, 4);
  brush.spline([[38, 330], [37, 340], [38, 350]], 0.25);
  brush.spline([[37, 335], [32, 342], [28, 348]], 0.25);
  brush.spline([[38, 335], [43, 342], [46, 348]], 0.25);
  brush.spline([[37, 350], [35, 360], [33, 370]], 0.25);
  brush.spline([[39, 350], [40, 360], [42, 370]], 0.25);
  brush.noField();

  brush.noStroke();
  brush.wash("#050a10", 195);
  brush.beginShape(0.2);
  brush.vertex(33, 326);
  brush.vertex(43, 326);
  brush.vertex(45, 350);
  brush.vertex(42, 370);
  brush.vertex(38, 370);
  brush.vertex(37, 353);
  brush.vertex(35, 370);
  brush.vertex(31, 370);
  brush.vertex(30, 350);
  brush.endShape(true);
  brush.noWash();

  // Silhouette reflections on wet pavement — distorted
  brush.set("2B", "#050a10", 0.8);
  brush.wiggle(3);
  // Figure 1 reflection
  brush.spline([[115, 392], [113, 408], [116, 424], [112, 440]], 0.4);
  // Figure 2 reflection
  brush.spline([[310, 378], [308, 394], [312, 410], [309, 426]], 0.4);
  // Figure 3 reflection
  brush.spline([[520, 378], [518, 392], [521, 408]], 0.4);
  brush.noField();

  // Charcoal smudge for atmospheric depth — mid-ground haze
  brush.set("charcoal", "#1a2a3a", 0.6);
  brush.wiggle(2);
  for (let i = 0; i < 12; i++) {
    let hx = random(0, 600);
    let hy = random(290, 345);
    brush.line(hx, hy, hx + random(-40, 40), hy + random(-3, 3));
  }
  brush.noField();

  // Final rain overlay — very fine top layer
  brush.set("rotring", "#8ab0c8", 0.2);
  for (let i = 0; i < 60; i++) {
    let rx = random(0, 600);
    let ry = random(0, 340);
    brush.line(rx, ry, rx + random(-2, 2), ry + random(6, 16));
  }

  // Pavement rain ripples — tiny ellipses
  brush.set("pen", "#3a6080", 0.3);
  brush.wiggle(1);
  for (let i = 0; i < 20; i++) {
    let ripx = random(20, 580);
    let ripy = random(360, 580);
    brush.arc(ripx, ripy, random(4, 12), 0, 360);
  }
  brush.noField();

  noLoop();
}