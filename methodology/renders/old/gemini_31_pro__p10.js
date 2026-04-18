function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fill("#f2e6d8", 150);
  brush.fillTexture(0.4, 0.2);
  brush.rect(300, 150, 600, 300, "center");

  let sandColors = ["#e8d3b4", "#dfc49e", "#d4b383", "#c49f6a"];
  for (let i = 0; i < 4; i++) {
    brush.fill(sandColors[i], 180);
    brush.fillTexture(0.6, 0.3);
    brush.fillBleed(0.2, "out");
    brush.beginShape(0.2);
    brush.vertex(-20, 300 + i * 60 + random(-10, 10));
    for (let x = 50; x <= 650; x += 150) {
      brush.vertex(x, 300 + i * 60 + random(-30, 40));
    }
    brush.vertex(620, 620);
    brush.vertex(-20, 620);
    brush.endShape(true);
  }

  function drawRock(startX, endX, peakY) {
    brush.set("charcoal", "#2a2522", 1.8);
    brush.fill("#3d352e", 230);
    brush.fillTexture(0.8, 0.5);
    brush.beginShape(0);
    brush.vertex(startX, 300);
    let w = endX - startX;
    let steps = floor(random(4, 9));
    for (let i = 1; i < steps; i++) {
      let px = startX + (w * i) / steps + random(-15, 15);
      let py = map(abs(i - steps / 2), 0, steps / 2, peakY, 300) + random(-20, 20);
      brush.vertex(px, py);
    }
    brush.vertex(endX, 300);
    brush.endShape(true);

    brush.noFill();
    brush.set("charcoal", "#1a1614", 1.0);
    for (let i = 0; i < floor(random(2, 6)); i++) {
      let rx = startX + w / 2 + random(-w / 3, w / 3);
      brush.line(rx, peakY + random(10, 40), rx + random(-15, 15), 300);
    }
  }

  drawRock(40, 190, 120);
  drawRock(150, 270, 210);
  drawRock(340, 560, 90);
  drawRock(490, 610, 220);
  drawRock(-30, 70, 230);

  brush.noFill();
  brush.set("pen", "#1a1816", 0.6);
  brush.line(0, 300, 600, 300);

  brush.set("cpencil", "#5c4f42", 0.7);

  function drawCrack(x, y, angle, depth) {
    if (depth > 5 || y < 305) return;
    let scaleFactor = map(y, 300, 600, 0.1, 1.5);
    let len = random(15, 45) * scaleFactor;
    let nx = x + cos(angle) * len;
    let ny = y + sin(angle) * len;

    brush.strokeWeight(scaleFactor * 0.9);
    brush.line(x, y, nx, ny);

    if (random() > 0.2) {
      drawCrack(nx, ny, angle + random(-30, 30), depth + 1);
    }
    if (random() > 0.7) {
      drawCrack(nx, ny, angle + random(35, 85) * (random() > 0.5 ? 1 : -1), depth + 1);
    }
  }

  for (let i = 0; i < 30; i++) {
    drawCrack(random(0, 600), random(350, 650), random(-60, -120), 0);
  }

  brush.set("spray", "#d4b383", 2);
  brush.noFill();
  for (let i = 0; i < 6; i++) {
    brush.line(random(50, 550), random(320, 580), random(50, 550), random(320, 580));
  }

  noLoop();
}