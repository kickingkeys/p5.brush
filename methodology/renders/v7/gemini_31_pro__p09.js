function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.65, 0.4);

  const nightColors = ["#111522", "#1b2438", "#2c3b59", "#161624", "#241a30"];
  
  for (let i = 0; i < 45; i++) {
    brush.fill(random(nightColors), random(60, 110));
    brush.fillBleed(random(0.4, 0.7), "out");
    brush.circle(random(-50, 650), random(-50, 350), random(100, 250));
  }

  for (let i = 0; i < 35; i++) {
    brush.fill(random(nightColors), random(70, 130));
    brush.fillBleed(random(0.3, 0.6), "out");
    brush.circle(random(-50, 650), random(300, 650), random(120, 300));
  }
  brush.noFill();

  const neonColors = ["#ff2a6d", "#05d9e8", "#ffc800"];
  
  for (let i = 0; i < 7; i++) {
    let cx = random(50, 550);
    let cy = random(80, 260);
    let col = random(neonColors);

    brush.noStroke();
    brush.fillTexture(0.4, 0.2);
    brush.fill(col, random(40, 70));
    brush.fillBleed(0.7, "out");
    brush.circle(cx, cy, random(80, 150));
    brush.noFill();

    brush.set("marker", col, random(1.5, 3.5));
    brush.line(cx, cy - random(15, 40), cx, cy + random(15, 40));

    brush.noStroke();
    brush.fill(col, random(30, 55));
    brush.fillBleed(0.6, "out");
    brush.rect(cx, cy + 200, random(30, 60), random(150, 300), "center");
    brush.noFill();

    brush.set("marker", col, random(0.5, 1.8));
    for (let j = 0; j < 4; j++) {
      let rx = cx + random(-20, 20);
      let ry = cy + 150 + random(0, 100);
      brush.line(rx, ry, rx, ry + random(40, 100));
    }
  }

  brush.addField("rain", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = 72 + noise(c * 0.05, r * 0.05) * 15;
      }
    }
    return field;
  });
  
  brush.field("rain");
  
  brush.set("spray", "#e0e8f5", 2.5);
  for (let i = 0; i < 40; i++) {
    brush.flowLine(random(600), random(600), random(40, 90), 0);
  }

  brush.set("rotring", "#ffffff", 0.3);
  for (let i = 0; i < 150; i++) {
    brush.flowLine(random(600), random(-100, 600), random(15, 35), 0);
  }
  
  brush.noField();

  function drawSilhouette(x, y, scaleFactor) {
    brush.noStroke();
    brush.fillTexture(0.5, 0.2);
    brush.fill("#0a0a12", 50);
    brush.fillBleed(0.5, "out");
    brush.rect(x, y + 80 * scaleFactor, 30 * scaleFactor, 60 * scaleFactor, "center");
    brush.noFill();

    brush.wiggle(1);
    brush.wash("#08080f", 240);
    brush.set("pen", "#050508", 1.2 * scaleFactor);

    brush.beginShape(0.4);
    let uW = 45 * scaleFactor;
    let uH = 18 * scaleFactor;
    brush.vertex(x - uW, y);
    brush.vertex(x, y - uH);
    brush.vertex(x + uW, y);
    brush.vertex(x, y - 3 * scaleFactor);
    brush.endShape(true);

    brush.beginShape(0.3);
    brush.vertex(x - 8 * scaleFactor, y + 2 * scaleFactor);
    brush.vertex(x + 8 * scaleFactor, y + 2 * scaleFactor);
    brush.vertex(x + 12 * scaleFactor, y + 40 * scaleFactor);
    brush.vertex(x + 5 * scaleFactor, y + 60 * scaleFactor);
    brush.vertex(x - 5 * scaleFactor, y + 60 * scaleFactor);
    brush.vertex(x - 12 * scaleFactor, y + 40 * scaleFactor);
    brush.endShape(true);

    brush.line(x - 5 * scaleFactor, y + 60 * scaleFactor, x - 8 * scaleFactor, y + 85 * scaleFactor);
    brush.line(x + 5 * scaleFactor, y + 60 * scaleFactor, x + 9 * scaleFactor, y + 80 * scaleFactor);

    brush.noWash();
    brush.noField();
  }

  drawSilhouette(420, 310, 0.7);
  drawSilhouette(150, 350, 1.1);
  drawSilhouette(280, 400, 1.5);

  noLoop();
}