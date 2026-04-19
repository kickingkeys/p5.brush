function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- face shape outline region ---
  let cx = 300, cy = 290;

  // skin undertone wash - layered cpencil hatching
  // base warm tone - broad strokes across face area
  brush.hatchStyle("cpencil", "#d4956a", 0.7);
  brush.hatch(6, 15, { rand: 0.08, continuous: true });
  brush.noStroke();
  brush.beginShape(0.5);
  for (let i = 0; i < 36; i++) {
    let a = i * 10;
    let rx = 95 + noise(cos(a) * 0.04, sin(a) * 0.04, 0.1) * 18;
    let ry = 120 + noise(cos(a) * 0.04, sin(a) * 0.04, 0.5) * 15;
    brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // second skin layer - cooler undertone, different angle
  brush.hatchStyle("cpencil", "#c47b8a", 0.6);
  brush.hatch(7, 55, { rand: 0.06, continuous: true });
  brush.beginShape(0.5);
  for (let i = 0; i < 36; i++) {
    let a = i * 10;
    let rx = 88 + noise(cos(a) * 0.04, sin(a) * 0.04, 1.2) * 14;
    let ry = 112 + noise(cos(a) * 0.04, sin(a) * 0.04, 2.1) * 12;
    brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // third layer - warm ochre
  brush.hatchStyle("cpencil", "#b8954a", 0.5);
  brush.hatch(8, 100, { rand: 0.07, continuous: false });
  brush.beginShape(0.5);
  for (let i = 0; i < 36; i++) {
    let a = i * 10;
    let rx = 80 + noise(cos(a) * 0.05, sin(a) * 0.05, 3.3) * 12;
    let ry = 100 + noise(cos(a) * 0.05, sin(a) * 0.05, 4.0) * 10;
    brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // --- forehead / upper face shadow ---
  brush.hatchStyle("cpencil", "#7a6b9a", 0.6);
  brush.hatch(5, 130, { rand: 0.09, continuous: true });
  brush.beginShape(0.4);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    let rx = 70 + noise(cos(a) * 0.05, sin(a) * 0.05, 5.1) * 10;
    let ry = 55 + noise(cos(a) * 0.05, sin(a) * 0.05, 5.7) * 8;
    brush.vertex(cx + cos(a) * rx, cy - 55 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // second forehead layer
  brush.hatchStyle("cpencil", "#5a4a7a", 0.5);
  brush.hatch(6, 75, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    let rx = 60 + noise(cos(a) * 0.05, sin(a) * 0.05, 6.5) * 9;
    let ry = 45 + noise(cos(a) * 0.05, sin(a) * 0.05, 7.0) * 7;
    brush.vertex(cx + cos(a) * rx, cy - 62 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // --- cheek blush - unexpected dusty rose/lavender ---
  // left cheek
  brush.hatchStyle("cpencil", "#d48aaa", 0.55);
  brush.hatch(5, 40, { rand: 0.1, continuous: true });
  brush.beginShape(0.45);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    let rx = 42 + noise(cos(a) * 0.06, sin(a) * 0.06, 8.1) * 8;
    let ry = 32 + noise(cos(a) * 0.06, sin(a) * 0.06, 8.7) * 6;
    brush.vertex(cx - 52 + cos(a) * rx, cy + 25 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b87aaa", 0.5);
  brush.hatch(6, 85, { rand: 0.08 });
  brush.beginShape(0.45);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    let rx = 35 + noise(cos(a) * 0.06, sin(a) * 0.06, 9.2) * 7;
    let ry = 26 + noise(cos(a) * 0.06, sin(a) * 0.06, 9.8) * 5;
    brush.vertex(cx - 55 + cos(a) * rx, cy + 22 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // right cheek
  brush.hatchStyle("cpencil", "#d48aaa", 0.55);
  brush.hatch(5, 140, { rand: 0.1, continuous: true });
  brush.beginShape(0.45);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    let rx = 42 + noise(cos(a) * 0.06, sin(a) * 0.06, 10.1) * 8;
    let ry = 32 + noise(cos(a) * 0.06, sin(a) * 0.06, 10.7) * 6;
    brush.vertex(cx + 52 + cos(a) * rx, cy + 25 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b87aaa", 0.5);
  brush.hatch(6, 95, { rand: 0.08 });
  brush.beginShape(0.45);
  for (let i = 0; i < 24; i++) {
    let a = i * 15;
    let rx = 35 + noise(cos(a) * 0.06, sin(a) * 0.06, 11.2) * 7;
    let ry = 26 + noise(cos(a) * 0.06, sin(a) * 0.06, 11.8) * 5;
    brush.vertex(cx + 55 + cos(a) * rx, cy + 22 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // --- jaw / chin shadow - cool blue-grey ---
  brush.hatchStyle("cpencil", "#7a8aaa", 0.6);
  brush.hatch(5, 160, { rand: 0.09, continuous: true });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    let a = i * 18;
    let rx = 55 + noise(cos(a) * 0.05, sin(a) * 0.05, 12.1) * 8;
    let ry = 35 + noise(cos(a) * 0.05, sin(a) * 0.05, 12.7) * 6;
    brush.vertex(cx + cos(a) * rx, cy + 95 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5a6a8a", 0.5);
  brush.hatch(6, 110, { rand: 0.08 });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    let a = i * 18;
    let rx = 44 + noise(cos(a) * 0.05, sin(a) * 0.05, 13.2) * 7;
    let ry = 26 + noise(cos(a) * 0.05, sin(a) * 0.05, 13.8) * 5;
    brush.vertex(cx + cos(a) * rx, cy + 98 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // --- eyes ---
  // left eye socket - deep teal/indigo
  brush.hatchStyle("cpencil", "#3a5a7a", 0.65);
  brush.hatch(4, 20, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    let a = i * 18;
    let rx = 28 + noise(cos(a) * 0.07, sin(a) * 0.07, 14.1) * 5;
    let ry = 16 + noise(cos(a) * 0.07, sin(a) * 0.07, 14.7) * 4;
    brush.vertex(cx - 38 + cos(a) * rx, cy - 20 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a3a5a", 0.55);
  brush.hatch(4, 70, { rand: 0.09 });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    let a = i * 18;
    let rx = 22 + noise(cos(a) * 0.07, sin(a) * 0.07, 15.1) * 4;
    let ry = 12 + noise(cos(a) * 0.07, sin(a) * 0.07, 15.7) * 3;
    brush.vertex(cx - 38 + cos(a) * rx, cy - 20 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // right eye socket
  brush.hatchStyle("cpencil", "#3a5a7a", 0.65);
  brush.hatch(4, 160, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    let a = i * 18;
    let rx = 28 + noise(cos(a) * 0.07, sin(a) * 0.07, 16.1) * 5;
    let ry = 16 + noise(cos(a) * 0.07, sin(a) * 0.07, 16.7) * 4;
    brush.vertex(cx + 38 + cos(a) * rx, cy - 20 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a3a5a", 0.55);
  brush.hatch(4, 110, { rand: 0.09 });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    let a = i * 18;
    let rx = 22 + noise(cos(a) * 0.07, sin(a) * 0.07, 17.1) * 4;
    let ry = 12 + noise(cos(a) * 0.07, sin(a) * 0.07, 17.7) * 3;
    brush.vertex(cx + 38 + cos(a) * rx, cy - 20 + sin(a) * ry);
  }
  brush.endShape(true);
  brush.noHatch();

  // eye iris - unexpected amber/green
  // left
  brush.hatchStyle("cpencil", "#8a7a2a", 0.7);
  brush.hatch(3, 45, { rand: 0.12, continuous: true });
  brush.beginShape(0.35);
  for (let i = 0; i < 16; i++) {
    let a = i * 22.5;
    let r = 10 + noise(cos(a) * 0.1, sin(a) * 0.1, 18.1) * 3;
    brush.vertex(cx - 38 + cos(a) * r, cy - 20 + sin(a) * r);
  }
  brush.endShape(true);
  brush.noHatch();

  // right
  brush.hatchStyle("cpencil", "#8a7a2a", 0.7);
  brush.hatch(3, 135, { rand: 0.12, continuous: true });
  brush.beginShape(0.35);
  for (let i = 0; i < 16; i++) {
    let a = i * 22.5;
    let r = 10 + noise(cos(a) * 0.1, sin(a) * 0.1, 19.1) * 3;
    brush.vertex(cx + 38 + cos(a) * r, cy - 20 + sin(a) * r);
  }
  brush.endShape(true);
  brush.noHatch();

  // --- nose bridge - dusty mauve ---
  brush.hatchStyle("cpencil", "#9a7a8a", 0.55);
  brush.hatch(5, 80, { rand: 0.08, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx - 12, cy - 35);
  brush.vertex(cx + 12, cy - 35);
  brush.vertex(cx + 16, cy + 18);
  brush.vertex(cx + 8, cy + 22);
  brush.vertex(cx - 8, cy + 22);
  brush.vertex(cx - 16, cy + 18);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#7a5a6a", 0.5);
  brush.hatch(5, 130, { rand: 0.07 });
  brush.beginShape(0.4);
  brush.vertex(cx - 10, cy - 30);
  brush.vertex(cx + 10, cy - 30);
  brush.vertex(cx + 13, cy + 15);
  brush.vertex(cx + 6, cy + 19);
  brush.vertex(cx - 6, cy + 19);
  brush.vertex(cx - 13, cy + 15);
  brush.endShape(true);
  brush.noHatch();

  // --- nostrils - deep rust ---
  brush.hatchStyle("cpencil", "#7a3a2a", 0.6);
  brush.hatch(3, 60, { rand: 0.1 });
  brush.beginShape(0.35);
  for (let i = 0; i < 12; i++) {
    let a = i * 30;
    brush.vertex(cx - 22 + cos(a) * 10, cy + 22 + sin(a) * 6);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#7a3a2a", 0.6);
  brush.hatch(3, 120, { rand: 0.1 });
  brush.beginShape(0.35);
  for (let i = 0; i < 12; i++) {
    let a = i * 30;
    brush.vertex(cx + 22 + cos(a) * 10, cy + 22 + sin(a) * 6);
  }
  brush.endShape(true);
  brush.noHatch();

  // --- lips - unexpected teal/slate ---
  // upper lip
  brush.hatchStyle("cpencil", "#4a7a7a", 0.65);
  brush.hatch(4, 30, { rand: 0.09, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx - 38, cy + 55);
  brush.vertex(cx - 18, cy + 48);
  brush.vertex(cx - 6, cy + 52);
  brush.vertex(cx, cy + 49);
  brush.vertex(cx + 6, cy + 52);
  brush.vertex(cx + 18, cy + 48);
  brush.vertex(cx + 38, cy + 55);
  brush.vertex(cx + 22, cy + 62);
  brush.vertex(cx, cy + 60);
  brush.vertex(cx - 22, cy + 62);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a5a5a", 0.55);
  brush.hatch(4, 80, { rand: 0.08 });
  brush.beginShape(0.4);
  brush.vertex(cx - 35, cy + 56);
  brush.vertex(cx - 16, cy + 50);
  brush.vertex(cx - 5, cy + 53);
  brush.vertex(cx, cy + 51);
  brush.vertex(cx + 5, cy + 53);
  brush.vertex(cx + 16, cy + 50);
  brush.vertex(cx + 35, cy + 56);
  brush.vertex(cx + 20, cy + 61);
  brush.vertex(cx, cy + 59);
  brush.vertex(cx - 20, cy + 61);
  brush.endShape(true);
  brush.noHatch();

  // lower lip
  brush.hatchStyle("cpencil", "#5a8a8a", 0.6);
  brush.hatch(4, 150, { rand: 0.09, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx - 35, cy + 63);
  brush.vertex(cx, cy + 60);
  brush.vertex(cx + 35, cy + 63);
  brush.vertex(cx + 28, cy + 80);
  brush.vertex(cx, cy + 84);
  brush.vertex(cx - 28, cy + 80);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#3a6a6a", 0.5);
  brush.hatch(5, 100, { rand: 0.08 });
  brush.beginShape(0.4);
  brush.vertex(cx - 30, cy + 64);
  brush.vertex(cx, cy + 61);
  brush.vertex(cx + 30, cy + 64);
  brush.vertex(cx + 24, cy + 78);
  brush.vertex(cx, cy + 82);
  brush.vertex(cx - 24, cy + 78);
  brush.endShape(true);
  brush.noHatch();

  // --- hair - layered deep violet/indigo ---
  // main hair mass top
  brush.hatchStyle("cpencil", "#2a1a4a", 0.8);
  brush.hatch(4, 25, { rand: 0.07, continuous: true });
  brush.beginShape(0.45);
  for (let i = 0; i < 30; i++) {
    let a = i * 12;
    let rx = 105 + noise(cos(a) * 0.04, sin(a) * 0.04, 20.1) * 20;
    let ry = 80 + noise(cos(a) * 0.04, sin(a) * 0.04, 20.7) * 15;
    let px = cx + cos(a) * rx;
    let py = cy - 100 + sin(a) * ry;
    if (py < cy - 60 || abs(px - cx) > 90) brush.vertex(px, py);
    else brush.vertex(px, cy - 60 + noise(i * 0.3, 21.0) * 10);
  }
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#1a0a3a", 0.7);
  brush.hatch(5, 70, { rand: 0.09 });
  brush.beginShape(0.45);
  for (let i = 0; i < 30; i++) {
    let a = i * 12;
    let rx = 95 + noise(cos(a) * 0.04, sin(a) * 0.04, 22.1) * 18;
    let ry = 70 + noise(cos(a) * 0.04, sin(a) * 0.04, 22.7) * 12;
    let px = cx + cos(a) * rx;
    let py = cy - 105 + sin(a) * ry;
    if (py < cy - 65 || abs(px - cx) > 85) brush.vertex(px, py);
    else brush.vertex(px, cy - 65 + noise(i * 0.3, 23.0) * 8);
  }
  brush.endShape(true);
  brush.noHatch();

  // hair sides - flowing down
  // left side hair
  brush.hatchStyle("cpencil", "#3a1a5a", 0.75);
  brush.hatch(4, 175, { rand: 0.08, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx - 95, cy - 80);
  brush.vertex(cx - 110, cy - 40);
  brush.vertex(cx - 115, cy + 20);
  brush.vertex(cx - 105, cy + 80);
  brush.vertex(cx - 90, cy + 130);
  brush.vertex(cx - 70, cy + 150);
  brush.vertex(cx - 60, cy + 145);
  brush.vertex(cx - 75, cy + 100);
  brush.vertex(cx - 88, cy + 50);
  brush.vertex(cx - 92, cy - 20);
  brush.vertex(cx - 88, cy - 70);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a0a4a", 0.65);
  brush.hatch(5, 140, { rand: 0.07 });
  brush.beginShape(0.4);
  brush.vertex(cx - 90, cy - 75);
  brush.vertex(cx - 105, cy - 35);
  brush.vertex(cx - 108, cy + 25);
  brush.vertex(cx - 98, cy + 85);
  brush.vertex(cx - 82, cy + 135);
  brush.vertex(cx - 65, cy + 148);
  brush.vertex(cx - 62, cy + 143);
  brush.vertex(cx - 72, cy + 98);
  brush.vertex(cx - 84, cy + 45);
  brush.vertex(cx - 87, cy - 18);
  brush.vertex(cx - 84, cy - 68);
  brush.endShape(true);
  brush.noHatch();

  // right side hair
  brush.hatchStyle("cpencil", "#3a1a5a", 0.75);
  brush.hatch(4, 5, { rand: 0.08, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx + 95, cy - 80);
  brush.vertex(cx + 110, cy - 40);
  brush.vertex(cx + 115, cy + 20);
  brush.vertex(cx + 105, cy + 80);
  brush.vertex(cx + 90, cy + 130);
  brush.vertex(cx + 70, cy + 150);
  brush.vertex(cx + 60, cy + 145);
  brush.vertex(cx + 75, cy + 100);
  brush.vertex(cx + 88, cy + 50);
  brush.vertex(cx + 92, cy - 20);
  brush.vertex(cx + 88, cy - 70);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a0a4a", 0.65);
  brush.hatch(5, 40, { rand: 0.07 });
  brush.beginShape(0.4);
  brush.vertex(cx + 90, cy - 75);
  brush.vertex(cx + 105, cy - 35);
  brush.vertex(cx + 108, cy + 25);
  brush.vertex(cx + 98, cy + 85);
  brush.vertex(cx + 82, cy + 135);
  brush.vertex(cx + 65, cy + 148);
  brush.vertex(cx + 62, cy + 143);
  brush.vertex(cx + 72, cy + 98);
  brush.vertex(cx + 84, cy + 45);
  brush.vertex(cx + 87, cy - 18);
  brush.vertex(cx + 84, cy - 68);
  brush.endShape(true);
  brush.noHatch();

  // --- neck ---
  brush.hatchStyle("cpencil", "#c4856a", 0.6);
  brush.hatch(6, 85, { rand: 0.07, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx - 30, cy + 120);
  brush.vertex(cx + 30, cy + 120);
  brush.vertex(cx + 26, cy + 190);
  brush.vertex(cx - 26, cy + 190);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#a46a5a", 0.5);
  brush.hatch(7, 135, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(cx - 26, cy + 122);
  brush.vertex(cx + 26, cy + 122);
  brush.vertex(cx + 22, cy + 188);
  brush.vertex(cx - 22, cy + 188);
  brush.endShape(true);
  brush.noHatch();

  // --- shoulder suggestion ---
  brush.hatchStyle("cpencil", "#6a5a8a", 0.55);
  brush.hatch(7, 15, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx - 26, cy + 188);
  brush.vertex(cx - 130, cy + 210);
  brush.vertex(cx - 150, cy + 280);
  brush.vertex(cx - 100, cy + 320);
  brush.vertex(cx - 40, cy + 310);
  brush.vertex(cx - 26, cy + 260);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5a4a7a", 0.5);
  brush.hatch(8, 65, { rand: 0.08 });
  brush.beginShape(0.4);
  brush.vertex(cx - 24, cy + 190);
  brush.vertex(cx - 125, cy + 212);
  brush.vertex(cx - 145, cy + 278);
  brush.vertex(cx - 96, cy + 318);
  brush.vertex(cx - 38, cy + 308);
  brush.vertex(cx - 24, cy + 258);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6a5a8a", 0.55);
  brush.hatch(7, 165, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(cx + 26, cy + 188);
  brush.vertex(cx + 130, cy + 210);
  brush.vertex(cx + 150, cy + 280);
  brush.vertex(cx + 100, cy + 320);
  brush.vertex(cx + 40, cy + 310);
  brush.vertex(cx + 26, cy + 260);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#5a4a7a", 0.5);
  brush.hatch(8, 115, { rand: 0.08 });
  brush.beginShape(0.4);
  brush.vertex(cx + 24, cy + 190);
  brush.vertex(cx + 125, cy + 212);
  brush.vertex(cx + 145, cy + 278);
  brush.vertex(cx + 96, cy + 318);
  brush.vertex(cx + 38, cy + 308);
  brush.vertex(cx + 24, cy + 258);
  brush.endShape(true);
  brush.noHatch();

  // --- eyebrows - deep blue-brown ---
  brush.set("cpencil", "#2a2a4a", 0.9);
  brush.spline([
    [cx - 65, cy - 42, 0.4],
    [cx - 45, cy - 48, 0.9],
    [cx - 25, cy - 45, 1.0],
    [cx - 15, cy - 40, 0.5]
  ], 0.5);

  brush.set("cpencil", "#2a2a4a", 0.9);
  brush.spline([
    [cx + 65, cy - 42, 0.4],
    [cx + 45, cy - 48, 0.9],
    [cx + 25, cy - 45, 1.0],
    [cx + 15, cy - 40, 0.5]
  ], 0.5);

  // second eyebrow pass - slightly different color
  brush.set("cpencil", "#4a3a6a", 0.7);
  brush.spline([
    [cx - 63, cy - 40, 0.3],
    [cx - 44, cy - 46, 0.8],
    [cx - 24, cy - 43, 0.9],
    [cx - 14, cy - 38, 0.4]
  ], 0.5);

  brush.set("cpencil", "#4a3a6a", 0.7);
  brush.spline([
    [cx + 63, cy - 40, 0.3],
    [cx + 44, cy - 46, 0.8],
    [cx + 24, cy - 43, 0.9],
    [cx + 14, cy - 38, 0.4]
  ], 0.5);

  // --- contour lines - loose, gestural ---
  brush.set("cpencil", "#4a3a5a", 0.8);
  // face outline - left
  brush.spline([
    [cx - 90, cy - 70, 0.5],
    [cx - 95, cy - 20, 0.8],
    [cx - 90, cy + 40, 0.9],
    [cx - 75, cy + 90, 0.8],
    [cx - 50, cy + 115, 0.6],
    [cx - 28, cy + 122, 0.4]
  ], 0.4);

  // face outline - right
  brush.spline([
    [cx + 90, cy - 70, 0.5],
    [cx + 95, cy - 20, 0.8],
    [cx + 90, cy + 40, 0.9],
    [cx + 75, cy + 90, 0.8],
    [cx + 50, cy + 115, 0.6],
    [cx + 28, cy + 122, 0.4]
  ], 0.4);

  // second contour pass - different color
  brush.set("cpencil", "#6a4a3a", 0.65);
  brush.spline([
    [cx - 88, cy - 68, 0.4],
    [cx - 93, cy - 18, 0.7],
    [cx - 88, cy + 42, 0.8],
    [cx - 73, cy + 92, 0.7],
    [cx - 48, cy + 117, 0.5],
    [cx - 26, cy + 124, 0.3]
  ], 0.4);

  brush.set("cpencil", "#6a4a3a", 0.65);
  brush.spline([
    [cx + 88, cy - 68, 0.4],
    [cx + 93, cy - 18, 0.7],
    [cx + 88, cy + 42, 0.8],
    [cx + 73, cy + 92, 0.7],
    [cx + 48, cy + 117, 0.5],
    [cx + 26, cy + 124, 0.3]
  ], 0.4);

  // --- scattered mood marks across the canvas ---
  // loose horizontal strokes - memory/atmosphere
  brush.set("cpencil", "#8a9aaa", 0.5);
  for (let i = 0; i < 8; i++) {
    let y = 30 + i * 70;
    let x1 = random(10, 80);
    let x2 = x1 + random(30, 80);
    brush.spline([
      [x1, y + random(-5, 5), 0.3],
      [(x1 + x2) / 2, y + random(-8, 8), 0.6],
      [x2, y + random(-5, 5), 0.3]
    ], 0.3);
  }

  brush.set("cpencil", "#8a9aaa", 0.5);
  for (let i = 0; i < 8; i++) {
    let y = 30 + i * 70;
    let x2 = random(520, 590);
    let x1 = x2 - random(30, 80);
    brush.spline([
      [x1, y + random(-5, 5), 0.3],
      [(x1 + x2) / 2, y + random(-8, 8), 0.6],
      [x2, y + random(-5, 5), 0.3]
    ], 0.3);
  }

  // vertical memory marks
  brush.set("cpencil", "#aa8a9a", 0.45);
  for (let i = 0; i < 5; i++) {
    let x = 15 + i * 20;
    brush.spline([
      [x + random(-3, 3), random(20, 100), 0.2],
      [x + random(-5, 5), random(150, 350), 0.5],
      [x + random(-3, 3), random(400, 570), 0.2]
    ], 0.4);
  }

  brush.set("cpencil", "#aa8a9a", 0.45);
  for (let i = 0; i < 5; i++) {
    let x = 585 - i * 20;
    brush.spline([
      [x + random(-3, 3), random(20, 100), 0.2],
      [x + random(-5, 5), random(150, 350), 0.5],
      [x + random(-3, 3), random(400, 570), 0.2]
    ], 0.4);
  }

  // subtle diagonal mood strokes across background
  brush.hatchStyle("cpencil", "#c8bada", 0.4);
  brush.hatch(22, 155, { rand: 0.15 });
  brush.beginShape(0.3);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#bad8c8", 0.35);
  brush.hatch(28, 35, { rand: 0.18 });
  brush.beginShape(0.3);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}