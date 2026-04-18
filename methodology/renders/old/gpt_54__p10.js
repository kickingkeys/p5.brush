function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(12);
  noiseSeed(12);

  // soft sky / paper variation
  brush.noStroke();
  brush.noHatch();
  brush.fill("#f6efe3", 28);
  brush.fillBleed(0.12, "out");
  brush.fillTexture(0.35, 0.18, false);
  brush.rect(0, 0, 600, 600, "corner");

  // distant warm wash band near horizon
  brush.noStroke();
  brush.fill("#dcc6a1", 42);
  brush.fillBleed(0.18, "out");
  brush.fillTexture(0.5, 0.22, true);
  brush.beginShape(0.15);
  brush.vertex(0, 250);
  brush.vertex(120, 238);
  brush.vertex(250, 245);
  brush.vertex(380, 236);
  brush.vertex(510, 246);
  brush.vertex(600, 240);
  brush.vertex(600, 330);
  brush.vertex(0, 330);
  brush.endShape(true);

  // broad desert floor wash
  brush.noStroke();
  brush.fill("#d9bc8c", 68);
  brush.fillBleed(0.28, "out");
  brush.fillTexture(0.62, 0.3, true);
  brush.beginShape(0.12);
  brush.vertex(0, 285);
  brush.vertex(100, 278);
  brush.vertex(220, 295);
  brush.vertex(330, 286);
  brush.vertex(470, 300);
  brush.vertex(600, 290);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // second layered sand wash
  brush.noStroke();
  brush.fill("#cfa871", 48);
  brush.fillBleed(0.2, "in");
  brush.fillTexture(0.48, 0.24, true);
  brush.beginShape(0.18);
  brush.vertex(0, 360);
  brush.vertex(90, 345);
  brush.vertex(180, 372);
  brush.vertex(285, 350);
  brush.vertex(405, 368);
  brush.vertex(520, 350);
  brush.vertex(600, 370);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // lower foreground darker wash
  brush.noStroke();
  brush.fill("#b98f5f", 40);
  brush.fillBleed(0.16, "out");
  brush.fillTexture(0.42, 0.2, false);
  brush.beginShape(0.1);
  brush.vertex(0, 435);
  brush.vertex(115, 420);
  brush.vertex(220, 445);
  brush.vertex(350, 425);
  brush.vertex(470, 452);
  brush.vertex(600, 438);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // subtle sandy grain / drifting texture
  brush.set("spray", "#c7a574", 0.45);
  for (let i = 0; i < 180; i++) {
    let x = random(20, 580);
    let y = random(300, 590);
    let len = random(4, 18);
    brush.line(x, y, x + random(-10, 10), y + len);
  }

  // cracked desert network
  brush.set("2H", "#8b6b47", 0.45);
  for (let i = 0; i < 95; i++) {
    let x = random(15, 585);
    let y = random(360, 595);
    let segs = int(random(2, 5));
    brush.beginShape(0);
    brush.vertex(x, y);
    let px = x;
    let py = y;
    for (let j = 0; j < segs; j++) {
      px += random(-35, 35);
      py += random(8, 28);
      py = min(py, 598);
      px = constrain(px, 5, 595);
      brush.vertex(px, py);
    }
    brush.endShape(false);
  }

  // larger crack plates
  brush.set("HB", "#7a5c3c", 0.5);
  for (let i = 0; i < 22; i++) {
    let cx = random(40, 560);
    let cy = random(395, 585);
    let w = random(30, 80);
    let h = random(16, 42);
    brush.noFill();
    brush.noHatch();
    brush.beginShape(0.05);
    brush.vertex(cx - w * 0.5, cy + random(-4, 4));
    brush.vertex(cx - w * 0.15, cy - h * 0.45);
    brush.vertex(cx + w * 0.35, cy - h * 0.2);
    brush.vertex(cx + w * 0.5, cy + h * 0.2);
    brush.vertex(cx + w * 0.1, cy + h * 0.5);
    brush.vertex(cx - w * 0.35, cy + h * 0.35);
    brush.endShape(true);
  }

  // distant rock formation left
  brush.noHatch();
  brush.fill("#5d4b3f", 55);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.22, 0.18, false);
  brush.set("charcoal", "#2f2926", 0.95);
  brush.beginShape(0.04);
  brush.vertex(35, 290);
  brush.vertex(60, 252);
  brush.vertex(88, 230);
  brush.vertex(100, 188);
  brush.vertex(115, 208);
  brush.vertex(132, 178);
  brush.vertex(150, 220);
  brush.vertex(175, 205);
  brush.vertex(190, 245);
  brush.vertex(215, 286);
  brush.vertex(215, 330);
  brush.vertex(35, 330);
  brush.endShape(true);

  // central rock formation
  brush.fill("#4f4036", 62);
  brush.fillBleed(0.1, "out");
  brush.fillTexture(0.24, 0.2, false);
  brush.set("charcoal", "#221d1b", 1.15);
  brush.beginShape(0.03);
  brush.vertex(205, 300);
  brush.vertex(235, 255);
  brush.vertex(268, 225);
  brush.vertex(286, 168);
  brush.vertex(300, 204);
  brush.vertex(323, 146);
  brush.vertex(345, 214);
  brush.vertex(370, 186);
  brush.vertex(390, 248);
  brush.vertex(418, 290);
  brush.vertex(418, 350);
  brush.vertex(205, 350);
  brush.endShape(true);

  // right rock formation
  brush.fill("#58463a", 58);
  brush.fillBleed(0.08, "out");
  brush.fillTexture(0.22, 0.18, false);
  brush.set("charcoal", "#28211e", 1.0);
  brush.beginShape(0.03);
  brush.vertex(400, 300);
  brush.vertex(422, 272);
  brush.vertex(445, 212);
  brush.vertex(468, 242);
  brush.vertex(492, 192);
  brush.vertex(512, 234);
  brush.vertex(533, 222);
  brush.vertex(553, 282);
  brush.vertex(570, 298);
  brush.vertex(570, 340);
  brush.vertex(400, 340);
  brush.endShape(true);

  // charcoal accents and jagged edge reinforcement
  brush.set("charcoal", "#1d1816", 0.6);
  for (let i = 0; i < 24; i++) {
    let x = random(50, 560);
    let y = random(180, 315);
    let len = random(12, 35);
    brush.line(x, y, x + random(-10, 10), y + len);
  }

  // dry-media shadow masses under rocks
  brush.mass("crayon", "#6e533c", {
    precision: 0.58,
    strength: 0.7,
    gradient: 0.28,
    outline: false
  });
  brush.beginShape(0.1);
  brush.vertex(25, 318);
  brush.vertex(120, 312);
  brush.vertex(230, 324);
  brush.vertex(330, 318);
  brush.vertex(420, 330);
  brush.vertex(575, 322);
  brush.vertex(575, 370);
  brush.vertex(25, 370);
  brush.endShape(true);
  brush.noMass();

  // subtle hatch in foreground dune bands
  brush.hatch(10, 8, { rand: 0.2, continuous: false, gradient: 0.2 });
  brush.hatchStyle("cpencil", "#9f7d52", 0.45);
  brush.noFill();
  brush.beginShape(0.12);
  brush.vertex(0, 410);
  brush.vertex(95, 395);
  brush.vertex(210, 418);
  brush.vertex(325, 402);
  brush.vertex(455, 422);
  brush.vertex(600, 408);
  brush.vertex(600, 470);
  brush.vertex(0, 470);
  brush.endShape(true);
  brush.noHatch();

  // single thin horizon line
  brush.set("pen", "#4f4339", 0.38);
  brush.line(0, 260, 600, 260);

  noLoop();
}