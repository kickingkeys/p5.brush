function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(112);
  noiseSeed(112);

  brush.noStroke();
  brush.fillTexture(0.85, 0.45);

  brush.field("curved");
  
  brush.fillBleed(0.6, "out");
  brush.wash("#fce2c4", 150);
  brush.fill("#ffcfa3", 170);
  drawOrganic(300, 250, 160, 2.0, 0.8, 50);

  brush.fillBleed(0.5, "out");
  brush.wash("#e6dbe8", 140);
  brush.fill("#d8cadd", 160);
  drawOrganic(200, 150, 220, 2.5, 0.6, 60);
  drawOrganic(450, 180, 200, 2.2, 0.7, 50);

  brush.wash("#c4cfd6", 150);
  brush.fill("#b6c3cc", 170);
  drawOrganic(300, 320, 280, 2.5, 0.5, 70);
  
  brush.noField();

  brush.field("waves");
  brush.fillBleed(0.35, "out");
  
  brush.wash("#9baeb8", 170);
  brush.fill("#8ba0ab", 190);
  drawOrganic(300, 420, 350, 2.0, 0.3, 40);

  brush.wash("#7d929e", 180);
  brush.fill("#6d8491", 200);
  drawOrganic(300, 480, 380, 2.0, 0.25, 40);

  brush.wash("#5e7482", 200);
  brush.fill("#4c6373", 220);
  drawOrganic(300, 560, 420, 2.0, 0.25, 30);
  
  brush.noField();

  brush.fillBleed(0.2, "out");

  brush.wash("#75787d", 120);
  brush.fill("#65686e", 140);
  drawHull(180, 400, 60, 15);

  brush.wash("#4a4d54", 180);
  brush.fill("#3a3c42", 200);
  drawHull(380, 460, 110, 28);

  brush.wash("#333130", 220);
  brush.fill("#242221", 240);
  drawPiling(60, 580, 18, 160);
  drawPiling(95, 600, 22, 190);

  brush.noWash();
  brush.noFill();

  brush.set("2H", "#6c7075", 0.5);
  brush.line(190, 395, 190, 260);
  brush.set("2H", "#6c7075", 0.3);
  brush.line(190, 260, 140, 395);
  brush.line(190, 280, 230, 395);

  brush.set("HB", "#3c3f45", 0.7);
  brush.spline([[360, 450], [362, 300], [360, 150]], 0.1);
  brush.spline([[420, 455], [421, 330], [420, 220]], 0.1);
  
  brush.set("2H", "#4a4d54", 0.4);
  brush.spline([[360, 150], [330, 300], [290, 440]], 0.2);
  brush.line(360, 160, 420, 230);
  brush.spline([[420, 220], [445, 340], [470, 450]], 0.2);
  
  brush.set("2H", "#55585e", 0.3);
  brush.line(360, 220, 310, 445);
  brush.line(360, 280, 420, 450);
  brush.line(360, 350, 420, 450);
  
  brush.set("HB", "#3c3f45", 0.6);
  brush.line(360, 400, 440, 380);
  brush.line(360, 340, 410, 320);

  brush.set("2B", "#2b2a29", 0.9);
  brush.spline([[50, 500], [77, 515], [106, 495]], 0.4);
  brush.spline([[48, 510], [77, 525], [108, 505]], 0.4);
  brush.spline([[48, 520], [77, 535], [108, 515]], 0.4);
  
  brush.hatchStyle("2B", "#2a2c30", 0.6);
  brush.hatch(4, 45, { rand: 0.1, continuous: true });
  drawHull(380, 460, 110, 28);
  brush.noHatch();

  noLoop();
}

function drawOrganic(cx, cy, rBase, scaleX, scaleY, noiseAmp) {
  brush.beginShape(0.5);
  for (let a = 0; a < 360; a += 8) {
    let n = noise(cos(a) * 0.5 + cx, sin(a) * 0.5 + cy);
    let r = rBase + n * noiseAmp;
    brush.vertex(cx + cos(a) * r * scaleX, cy + sin(a) * r * scaleY);
  }
  brush.endShape(CLOSE);
}

function drawHull(cx, cy, w, h) {
  brush.beginShape(0.4);
  brush.vertex(cx - w, cy - h / 2);
  brush.vertex(cx + w, cy - h / 2);
  brush.vertex(cx + w * 0.8, cy + h / 2);
  brush.vertex(cx - w * 0.6, cy + h / 2);
  brush.endShape(CLOSE);
}

function drawPiling(cx, cy, w, h) {
  brush.beginShape(0.2);
  brush.vertex(cx - w / 2 + noise(cx) * 5, cy - h);
  brush.vertex(cx + w / 2 + noise(cx, 1) * 5, cy - h);
  brush.vertex(cx + w / 2, cy);
  brush.vertex(cx - w / 2, cy);
  brush.endShape(CLOSE);
}