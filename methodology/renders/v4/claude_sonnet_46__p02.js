function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  randomSeed(42);
  noiseSeed(7);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Draw multiple grass stems with seed heads
  drawGrassStem1();
  drawGrassStem2();
  drawGrassStem3();
  drawGrassStem4();
  drawGrassStem5();
  drawGrassStem6();
  drawGrassStem7();

  // Ground zone hatching
  drawGroundZone();

  noLoop();
}

function drawGrassStem1() {
  // Tall central grass with drooping seed head
  let pts = [
    [290, 560],
    [285, 480],
    [278, 400],
    [270, 330],
    [260, 270],
    [255, 220]
  ];
  brush.set("HB", "#2a2a2a", 0.7);
  brush.spline(pts, 0.35);

  // Seed head — elongated oval cluster
  let hx = 255, hy = 220;
  brush.set("HB", "#222", 0.6);
  brush.spline([
    [hx, hy],
    [hx - 4, hy - 18],
    [hx - 2, hy - 36],
    [hx + 3, hy - 50],
    [hx + 8, hy - 62]
  ], 0.4);

  // Seed bristles radiating from head
  brush.set("2H", "#444", 0.4);
  for (let i = 0; i < 14; i++) {
    let t = i / 13;
    let bx = hx + random(-2, 4);
    let by = hy - t * 60;
    let blen = random(8, 22);
    let bang = random(-70, -110);
    let ex = bx + cos(bang) * blen;
    let ey = by + sin(bang) * blen;
    brush.set("2H", "#444", 0.3 + t * 0.2);
    brush.line(bx, by, ex, ey);
  }

  // Leaf blade arcing left
  brush.set("HB", "#333", 0.5);
  brush.spline([
    [285, 480],
    [270, 455],
    [245, 435],
    [220, 430]
  ], 0.45);
}

function drawGrassStem2() {
  // Slightly shorter stem leaning right
  let pts = [
    [340, 555],
    [348, 470],
    [355, 390],
    [362, 320],
    [368, 265],
    [372, 210],
    [375, 175]
  ];
  brush.set("HB", "#282828", 0.65);
  brush.spline(pts, 0.3);

  // Feathery seed head — wheat-like
  let hx = 375, hy = 175;
  brush.set("2B", "#1a1a1a", 0.5);
  for (let i = 0; i < 10; i++) {
    let t = i / 9;
    let sx = hx + random(-3, 3);
    let sy = hy + t * 55;
    let llen = 16 - t * 6;
    let lside = (i % 2 === 0) ? 1 : -1;
    brush.line(sx, sy, sx + lside * llen, sy - 8);
    brush.line(sx, sy, sx + lside * llen * 0.6, sy + 4);
  }

  // Leaf blade right
  brush.set("HB", "#333", 0.5);
  brush.spline([
    [350, 470],
    [370, 450],
    [400, 440],
    [420, 445]
  ], 0.4);

  // Second leaf
  brush.set("2H", "#444", 0.4);
  brush.spline([
    [355, 390],
    [375, 370],
    [395, 355],
    [408, 348]
  ], 0.35);
}

function drawGrassStem3() {
  // Fine delicate stem far left
  let pts = [
    [175, 565],
    [172, 500],
    [168, 430],
    [162, 360],
    [155, 295],
    [148, 240],
    [142, 195]
  ];
  brush.set("2H", "#3a3a3a", 0.45);
  brush.spline(pts, 0.28);

  // Loose airy seed head — scattered dots and dashes
  let hx = 142, hy = 195;
  brush.set("2H", "#555", 0.35);
  for (let i = 0; i < 18; i++) {
    let ang = random(200, 340);
    let r = random(8, 30);
    let ex = hx + cos(ang) * r;
    let ey = hy + sin(ang) * r;
    brush.line(hx + random(-3, 3), hy + random(-3, 3), ex, ey);
  }

  // Leaf arcing
  brush.set("2H", "#444", 0.4);
  brush.spline([
    [168, 430],
    [150, 415],
    [128, 412],
    [110, 418]
  ], 0.4);
}

function drawGrassStem4() {
  // Heavy bold stem with large seed head, slightly left of center
  let pts = [
    [310, 560],
    [308, 490],
    [305, 415],
    [300, 345],
    [294, 285],
    [288, 235],
    [282, 190],
    [275, 155]
  ];
  brush.set("2B", "#1c1c1c", 0.85);
  brush.spline(pts, 0.32);

  // Broad drooping seed cluster
  let hx = 275, hy = 155;
  brush.set("2B", "#1a1a1a", 0.7);
  // Main seed mass — dense hatching within oval
  brush.noStroke();
  brush.hatchStyle("2B", "#222", 0.6);
  brush.hatch(3.5, 50, { rand: 0.08, continuous: true });
  brush.beginShape(0.5);
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * 360;
    let rx = 18 + noise(cos(a) * 0.3) * 6;
    let ry = 28 + noise(sin(a) * 0.3) * 8;
    brush.vertex(hx + cos(a) * rx, hy + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // Outline seed head
  brush.set("HB", "#222", 0.6);
  brush.beginShape(0.5);
  for (let i = 0; i < 24; i++) {
    let a = (i / 24) * 360;
    let rx = 18 + noise(cos(a) * 0.3) * 6;
    let ry = 28 + noise(sin(a) * 0.3) * 8;
    brush.vertex(hx + cos(a) * rx, hy + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noStroke();

  // Bristles from seed head
  brush.set("2H", "#3a3a3a", 0.35);
  for (let i = 0; i < 20; i++) {
    let ang = random(170, 370);
    let blen = random(12, 35);
    let bx = hx + cos(ang) * 16;
    let by = hy + sin(ang) * 26;
    brush.line(bx, by, bx + cos(ang) * blen, by + sin(ang) * blen);
  }

  // Wide leaf
  brush.set("HB", "#2a2a2a", 0.55);
  brush.spline([
    [305, 415],
    [285, 395],
    [258, 382],
    [235, 378]
  ], 0.45);
}

function drawGrassStem5() {
  // Thin wispy stem far right
  let pts = [
    [445, 570],
    [448, 505],
    [450, 435],
    [452, 365],
    [453, 300],
    [452, 250],
    [448, 205]
  ];
  brush.set("2H", "#404040", 0.4);
  brush.spline(pts, 0.25);

  // Minimal seed head — just a few radiating lines
  let hx = 448, hy = 205;
  brush.set("2H", "#555", 0.3);
  for (let i = 0; i < 12; i++) {
    let ang = random(190, 350);
    let r = random(6, 22);
    brush.line(hx, hy, hx + cos(ang) * r, hy + sin(ang) * r);
  }

  // Leaf
  brush.set("2H", "#444", 0.38);
  brush.spline([
    [451, 365],
    [468, 348],
    [485, 340],
    [498, 342]
  ], 0.38);
}

function drawGrassStem6() {
  // Medium stem leaning left with nodding head
  let pts = [
    [215, 560],
    [210, 490],
    [204, 420],
    [197, 355],
    [188, 295],
    [178, 248],
    [165, 210],
    [148, 182]
  ];
  brush.set("HB", "#252525", 0.6);
  brush.spline(pts, 0.38);

  // Nodding seed head — drooping cluster
  let hx = 148, hy = 182;
  brush.set("HB", "#222", 0.5);
  brush.spline([
    [hx, hy],
    [hx - 6, hy + 15],
    [hx - 10, hy + 30],
    [hx - 8, hy + 48]
  ], 0.4);

  // Seed bristles
  brush.set("2H", "#555", 0.32);
  for (let i = 0; i < 16; i++) {
    let t = i / 15;
    let sx = hx - 2 - t * 8;
    let sy = hy + t * 48;
    let llen = random(10, 22);
    let lang = random(-30, -150);
    brush.line(sx, sy, sx + cos(lang) * llen, sy + sin(lang) * llen);
  }

  // Cross-hatch shading on lower seed zone
  brush.noStroke();
  brush.hatchStyle("2H", "#555", 0.3);
  brush.hatch(4, 65, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * 360;
    brush.vertex(hx - 6 + cos(a) * 10, hy + 30 + sin(a) * 14);
  }
  brush.endShape(true);
  brush.noHatch();

  // Leaf
  brush.set("HB", "#333", 0.5);
  brush.spline([
    [204, 420],
    [190, 400],
    [172, 390],
    [155, 392]
  ], 0.42);
}

function drawGrassStem7() {
  // Very short background stem
  let pts = [
    [390, 562],
    [393, 510],
    [396, 455],
    [400, 400],
    [403, 355],
    [406, 318]
  ];
  brush.set("2H", "#4a4a4a", 0.38);
  brush.spline(pts, 0.22);

  // Tiny seed head
  let hx = 406, hy = 318;
  brush.set("2H", "#555", 0.3);
  for (let i = 0; i < 9; i++) {
    let ang = random(200, 340);
    let r = random(5, 16);
    brush.line(hx, hy, hx + cos(ang) * r, hy + sin(ang) * r);
  }
}

function drawGroundZone() {
  // Dense hatching at the base — soil/ground texture
  brush.noStroke();
  brush.hatchStyle("2B", "#1a1a1a", 0.7);
  brush.hatch(3, 10, { rand: 0.12, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(100, 580);
  brush.vertex(500, 580);
  brush.vertex(510, 555);
  brush.vertex(480, 548);
  brush.vertex(440, 552);
  brush.vertex(400, 545);
  brush.vertex(360, 550);
  brush.vertex(320, 543);
  brush.vertex(280, 548);
  brush.vertex(240, 545);
  brush.vertex(200, 550);
  brush.vertex(160, 548);
  brush.vertex(120, 555);
  brush.vertex(95, 562);
  brush.endShape(true);
  brush.noHatch();

  // Second hatch layer at different angle
  brush.hatchStyle("HB", "#333", 0.5);
  brush.hatch(5, 50, { rand: 0.08, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(110, 580);
  brush.vertex(490, 580);
  brush.vertex(495, 560);
  brush.vertex(460, 553);
  brush.vertex(420, 558);
  brush.vertex(380, 551);
  brush.vertex(340, 556);
  brush.vertex(300, 549);
  brush.vertex(260, 554);
  brush.vertex(220, 551);
  brush.vertex(180, 556);
  brush.vertex(140, 553);
  brush.vertex(110, 562);
  brush.endShape(true);
  brush.noHatch();

  // Scattered short grass blades at base
  brush.set("2H", "#444", 0.35);
  for (let i = 0; i < 30; i++) {
    let bx = random(90, 510);
    let by = random(548, 572);
    let blen = random(8, 22);
    let bang = random(-70, -110);
    brush.line(bx, by, bx + cos(bang) * blen * 0.4, by + sin(bang) * blen);
  }

  // A few stray horizontal shadow lines
  brush.set("2B", "#222", 0.45);
  for (let i = 0; i < 6; i++) {
    let lx = random(100, 200);
    let ly = random(555, 575);
    brush.line(lx, ly, lx + random(40, 120), ly + random(-2, 2));
  }
}