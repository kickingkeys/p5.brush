function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.85, 0.4);
  brush.fillBleed(0.6, "out");

  brush.fill("#e8e0d8", 140);
  brush.beginShape(0.4);
  for (let x = -50; x <= 650; x += 30) {
    brush.vertex(x, 220 + noise(x * 0.005) * 150);
  }
  brush.vertex(650, -50);
  brush.vertex(-50, -50);
  brush.endShape(CLOSE);

  brush.fill("#d8d0d4", 130);
  brush.beginShape(0.4);
  for (let x = -50; x <= 650; x += 30) {
    brush.vertex(x, 300 + noise(x * 0.008 + 100) * 100);
  }
  brush.vertex(650, -50);
  brush.vertex(-50, -50);
  brush.endShape(CLOSE);

  brush.fillTexture(0.7, 0.5);
  brush.fillBleed(0.4, "out");
  let wColors = ["#c0c5cc", "#aab0b8", "#959ca8"];
  for (let i = 0; i < 3; i++) {
    brush.fill(wColors[i], 160);
    brush.beginShape(0.4);
    for (let x = -50; x <= 650; x += 40) {
      brush.vertex(x, 360 + i * 60 + noise(x * 0.01, i * 20) * 40);
    }
    brush.vertex(650, 650);
    brush.vertex(-50, 650);
    brush.endShape(CLOSE);
  }

  brush.fill("#707580", 180);
  brush.fillBleed(0.3, "in");
  brush.beginShape(0.2);
  brush.vertex(100, 420);
  brush.vertex(300, 440);
  brush.vertex(260, 470);
  brush.vertex(120, 460);
  brush.endShape(CLOSE);

  brush.fill("#858a95", 160);
  brush.beginShape(0.2);
  brush.vertex(380, 390);
  brush.vertex(520, 400);
  brush.vertex(490, 420);
  brush.vertex(390, 415);
  brush.endShape(CLOSE);

  brush.noFill();
  brush.noWash();
  brush.wiggle(1);

  brush.set("HB", "#33353a", 0.9);
  brush.line(160, 435, 160, 120);
  brush.line(220, 445, 220, 180);

  brush.set("2H", "#44474d", 0.6);
  brush.spline([[100, 420], [200, 435], [300, 440]], 0.2);
  brush.spline([[300, 440], [280, 455], [260, 470]], 0.2);

  brush.set("2H", "#555860", 0.4);
  brush.spline([[100, 420], [130, 280], [160, 150]], 0.3);
  brush.spline([[160, 150], [190, 165], [220, 200]], 0.3);
  brush.spline([[220, 200], [260, 320], [300, 440]], 0.3);
  brush.spline([[160, 250], [190, 255], [220, 280]], 0.2);

  brush.set("HB", "#33353a", 0.7);
  brush.line(130, 300, 190, 290);
  brush.line(190, 320, 250, 310);

  brush.set("HB", "#40434a", 0.8);
  brush.line(430, 400, 430, 200);
  
  brush.set("2H", "#50545c", 0.5);
  brush.spline([[380, 390], [480, 400]], 0.2);
  
  brush.set("2H", "#555860", 0.4);
  brush.spline([[380, 390], [405, 300], [430, 220]], 0.3);
  brush.spline([[430, 220], [475, 310], [520, 400]], 0.3);
  
  brush.set("HB", "#40434a", 0.6);
  brush.line(400, 310, 460, 305);

  brush.set("2H", "#8a8f99", 0.3);
  brush.line(80, 370, 80, 280);
  brush.spline([[50, 365], [65, 320], [80, 290]], 0.2);
  brush.spline([[80, 290], [100, 330], [120, 375]], 0.2);
  brush.line(60, 370, 110, 375);

  brush.set("2H", "#5a5e66", 0.5);
  for (let i = 0; i < 12; i++) {
    let y = 470 + i * 8;
    let x = 140 + noise(i * 0.5) * 30;
    let len = 120 - i * 8;
    if (len > 10) brush.line(x, y, x + len, y);
  }
  
  for (let i = 0; i < 8; i++) {
    let y = 430 + i * 7;
    let x = 400 + noise(i * 0.5 + 10) * 20;
    let len = 80 - i * 7;
    if (len > 10) brush.line(x, y, x + len, y);
  }

  noLoop();
}