function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillBleed(0.8, "out");
  brush.fillTexture(0.7, 0.5);

  brush.fill("#080a12", 240);
  brush.rect(300, 150, 600, 300, "center");

  brush.fillBleed(0.6, "out");
  brush.fill("#12141f", 200);
  brush.rect(300, 250, 600, 200, "center");
  brush.fill("#1a1b26", 240);
  brush.rect(300, 450, 600, 300, "center");

  brush.fillBleed(0.9, "out");
  brush.fill("#2a1b38", 180);
  brush.circle(150, 280, 250);
  brush.fill("#142b3b", 180);
  brush.circle(450, 290, 280);

  brush.fillBleed(0.8, "out");
  brush.fill("#ff0055", 110);
  brush.circle(180, 380, 140);
  brush.fill("#00e5ff", 110);
  brush.circle(420, 400, 180);
  brush.fill("#ffea00", 90);
  brush.circle(310, 370, 100);

  brush.noFill();
  
  brush.set("marker", "#ff0055", 1.8);
  for (let i = 0; i < 8; i++) {
    brush.spline([
      [180 + random(-25, 25), 380],
      [180 + random(-15, 15), 460],
      [180 + random(-30, 30), 580]
    ], 0.3);
  }

  brush.set("marker", "#00e5ff", 1.8);
  for (let i = 0; i < 10; i++) {
    brush.spline([
      [420 + random(-35, 35), 400],
      [420 + random(-20, 20), 480],
      [420 + random(-40, 40), 590]
    ], 0.3);
  }

  brush.set("marker", "#ffea00", 1.4);
  for (let i = 0; i < 5; i++) {
    brush.spline([
      [310 + random(-15, 15), 370],
      [310 + random(-10, 10), 430],
      [310 + random(-20, 20), 520]
    ], 0.3);
  }

  brush.set("2B", "#080a12", 0.8);
  for (let i = 0; i < 6; i++) {
    let y = 350 + i * 40;
    brush.line(0, y, 600, y + random(-10, 10));
  }

  brush.set("2H", "#8a95a5", 0.4);
  for (let i = 0; i < 150; i++) {
    let rx = random(600);
    let ry = random(600);
    brush.line(rx, ry, rx - 15, ry + 40);
  }

  brush.set("pen", "#050505", 1.5);
  brush.fill("#050505", 255);
  brush.fillBleed(0.0);
  brush.fillTexture(0.1, 0.1);

  brush.arc(180, 320, 45, 180, 360);
  brush.noFill();
  brush.spline([[180, 320], [183, 355], [175, 390]], 0.2);
  brush.line(175, 390, 168, 425);
  brush.line(175, 390, 185, 420);
  brush.line(180, 320, 180, 305);

  brush.fill("#080808", 240);
  brush.arc(430, 345, 30, 180, 360);
  brush.noFill();
  brush.spline([[430, 345], [427, 370], [432, 395]], 0.2);
  brush.line(432, 395, 425, 420);
  brush.line(432, 395, 438, 418);
  brush.line(430, 345, 430, 335);

  brush.fill("#0a0a0a", 200);
  brush.arc(310, 335, 18, 180, 360);
  brush.noFill();
  brush.line(310, 335, 310, 355);
  brush.line(310, 355, 306, 375);
  brush.line(310, 355, 314, 373);

  brush.set("spray", "#ffffff", 1.5);
  brush.line(180, 320, 195, 320);
  brush.line(430, 345, 440, 345);

  brush.set("spray", "#ff0055", 2);
  brush.line(160, 425, 195, 425);
  
  brush.set("spray", "#00e5ff", 1.5);
  brush.line(415, 420, 445, 420);

  noLoop();
}