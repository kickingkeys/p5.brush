function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.noStroke();
  brush.fillTexture(0.65, 0.3);

  let skyColors = ["#f4ede4", "#eaddce"];
  for (let i = 0; i < 2; i++) {
    brush.fill(skyColors[i], 120);
    brush.fillBleed(0.4, "out");
    brush.beginShape(0.4);
    brush.vertex(-20, -20);
    brush.vertex(620, -20);
    brush.vertex(620, 305 + i * 10);
    brush.vertex(-20, 305 + i * 10);
    brush.endShape(CLOSE);
  }

  let sandColors = ["#e6d3a8", "#dcb98a", "#d2a06c", "#c88b50"];
  for (let i = 0; i < 4; i++) {
    brush.fill(sandColors[i], 150 - i * 15);
    brush.fillBleed(0.35, "out");
    brush.beginShape(0.4);
    brush.vertex(-20, 620);
    for (let x = -20; x <= 620; x += 30) {
      let y = 300 + i * 65 + noise(x * 0.015, i * 10) * 45;
      brush.vertex(x, y);
    }
    brush.vertex(620, 620);
    brush.endShape(CLOSE);
  }
  brush.noFill();

  brush.set("pen", "#3a332d", 0.6);
  brush.line(10, 300, 590, 300);

  brush.field("hand");
  brush.wiggle(2);

  brush.mass("pastel", "#6b5e53", { strength: 0.6, precision: 0.6, outline: true });
  brush.set("charcoal", "#2c2622", 1.2);
  brush.beginShape(0);
  brush.vertex(40, 305);
  brush.vertex(65, 240);
  brush.vertex(85, 260);
  brush.vertex(110, 170);
  brush.vertex(145, 280);
  brush.vertex(160, 255);
  brush.vertex(190, 310);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.mass("crayon", "#2a2522", { strength: 0.85, precision: 0.4, outline: true });
  brush.set("charcoal", "#111111", 1.6);
  brush.beginShape(0);
  brush.vertex(410, 315);
  brush.vertex(440, 230);
  brush.vertex(475, 265);
  brush.vertex(505, 180);
  brush.vertex(545, 275);
  brush.vertex(585, 325);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.mass("pastel", "#4a413a", { strength: 0.7, precision: 0.5, outline: true });
  brush.set("charcoal", "#1a1614", 1.0);
  brush.beginShape(0);
  brush.vertex(260, 302);
  brush.vertex(275, 275);
  brush.vertex(290, 285);
  brush.vertex(310, 260);
  brush.vertex(335, 305);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.noField();

  brush.set("rotring", "#5c4a3d", 0.4);
  for (let i = 0; i < 12; i++) {
    drawCrack(random(40, 560), random(400, 620), random(-PI / 2 - 1.2, -PI / 2 + 1.2), random(20, 50), 5);
  }

  noLoop();
}

function drawCrack(startX, startY, angle, length, depth) {
  if (depth === 0) return;
  
  let endX = startX + cos(angle) * length;
  let endY = startY + sin(angle) * length;
  
  if (endY < 305 || endY > 620 || endX < -20 || endX > 620) return;

  brush.line(startX, startY, endX, endY);
  
  let numBranches = floor(random(1, 3.5));
  for (let i = 0; i < numBranches; i++) {
    let newAngle = angle + random(-PI / 4, PI / 4);
    let newLength = length * random(0.4, 0.85);
    drawCrack(endX, endY, newAngle, newLength, depth - 1);
  }
}