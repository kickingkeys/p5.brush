function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("rain", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        field[col][row] = 75 + noise(col * 0.1, row * 0.1) * 10;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.85, 0.5);

  brush.fillBleed(0.6, "out");
  brush.fill("#111122", 220);
  brush.wash("#05050f", 180);
  drawOrganicShape(300, 150, 650, 400);

  brush.fillBleed(0.3, "in");
  brush.fill("#1a1a33", 180);
  brush.wash("#0f0f22", 150);
  drawOrganicShape(300, 280, 650, 200);

  brush.fillBleed(0.5, "out");
  brush.fill("#161824", 220);
  brush.wash("#0c0d14", 190);
  drawOrganicShape(300, 500, 650, 250);

  brush.noWash();
  brush.noFill();

  brush.field("curved");
  
  brush.set("spray", "#00e5ff", 3.0);
  for (let i = 0; i < 40; i++) brush.flowLine(random(60, 140), random(200, 320), random(15, 40), random(360));
  brush.set("spray", "#00cccc", 1.5);
  for (let i = 0; i < 60; i++) brush.flowLine(random(80, 120), random(220, 300), random(8, 20), random(360));

  brush.set("spray", "#ff007f", 3.0);
  for (let i = 0; i < 40; i++) brush.flowLine(random(460, 540), random(180, 300), random(15, 40), random(360));
  brush.set("spray", "#cc0066", 1.5);
  for (let i = 0; i < 60; i++) brush.flowLine(random(480, 520), random(200, 280), random(8, 20), random(360));

  brush.set("spray", "#ffdd00", 2.5);
  for (let i = 0; i < 30; i++) brush.flowLine(random(280, 320), random(250, 300), random(10, 25), random(360));
  
  brush.noField();

  brush.noStroke();
  brush.fillTexture(0.6, 0.2);
  brush.fillBleed(0.5, "out");
  
  brush.fill("#00e5ff", 120); brush.wash("#00cccc", 90);
  drawOrganicShape(100, 480, 70, 150);
  
  brush.fill("#ff007f", 120); brush.wash("#cc0066", 90);
  drawOrganicShape(500, 480, 70, 150);
  
  brush.fill("#ffdd00", 100); brush.wash("#ccaa00", 80);
  drawOrganicShape(300, 450, 40, 100);

  brush.noWash();
  brush.noFill();

  brush.wiggle(1);
  
  brush.set("marker", "#00e5ff", 1.8);
  for (let i = 0; i < 8; i++) {
    let x = 100 + random(-25, 25);
    brush.line(x, 400 + random(-20, 20), x + random(-10, 10), 580 + random(-20, 20));
  }
  
  brush.set("marker", "#ff007f", 1.8);
  for (let i = 0; i < 8; i++) {
    let x = 500 + random(-25, 25);
    brush.line(x, 380 + random(-20, 20), x + random(-10, 10), 570 + random(-20, 20));
  }

  brush.set("marker", "#ffdd00", 1.2);
  for (let i = 0; i < 5; i++) {
    let x = 300 + random(-15, 15);
    brush.line(x, 370 + random(-10, 10), x + random(-5, 5), 520 + random(-10, 10));
  }

  brush.wiggle(0);
  brush.set("pen", "#050505", 2.0);
  brush.fill("#050505", 255);
  brush.wash("#000000", 255);
  
  drawUmbrella(240, 360, 65);
  brush.rect(240, 395, 14, 45, "center");
  brush.rect(234, 430, 5, 35, "center");
  brush.rect(246, 430, 5, 35, "center");

  drawUmbrella(380, 340, 45);
  brush.rect(380, 365, 10, 35, "center");
  brush.rect(376, 390, 3, 25, "center");
  brush.rect(384, 390, 3, 25, "center");

  brush.noWash();
  brush.noFill();

  brush.field("rain");
  brush.set("2H", "#ffffff", 0.2);
  for (let i = 0; i < 350; i++) {
    brush.flowLine(random(-100, 700), random(-100, 700), random(15, 45), 75);
  }
  
  brush.set("HB", "#111122", 0.4);
  for (let i = 0; i < 150; i++) {
    brush.flowLine(random(-100, 700), random(-100, 700), random(10, 35), 75);
  }

  brush.noField();
  noLoop();
}

function drawOrganicShape(cx, cy, w, h) {
  brush.beginShape(0.5);
  for (let i = 0; i < 36; i++) {
    let a = i * 10;
    let rX = w / 2 + noise(cos(a) * 0.8, sin(a) * 0.8, cx) * 30;
    let rY = h / 2 + noise(cos(a) * 0.8, sin(a) * 0.8, cy) * 30;
    brush.vertex(cx + cos(a) * rX, cy + sin(a) * rY);
  }
  brush.endShape(CLOSE);
}

function drawUmbrella(cx, cy, w) {
  brush.beginShape(0.3);
  for (let a = 180; a <= 360; a += 15) {
    brush.vertex(cx + cos(a) * (w / 2), cy + sin(a) * (w / 2) * 0.6);
  }
  brush.vertex(cx + w / 2 - 4, cy + 4);
  brush.vertex(cx - w / 2 + 4, cy + 4);
  brush.endShape(CLOSE);
}