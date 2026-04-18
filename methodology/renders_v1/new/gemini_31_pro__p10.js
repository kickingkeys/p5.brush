function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("curved");
  brush.set("spray", "#e0c5a8", 3.0);
  for (let i = 0; i < 150; i++) {
    brush.flowLine(random(600), random(300), random(15, 40), random(360));
  }
  brush.set("spray", "#d1af8c", 2.0);
  for (let i = 0; i < 100; i++) {
    brush.flowLine(random(600), random(300), random(10, 25), random(360));
  }
  brush.noField();

  brush.noFill();
  brush.noWash();
  brush.set("pen", "#2b2825", 0.6);
  brush.line(10, 300, 590, 300);

  const sandColors = ["#c29a6b", "#b38247", "#9c682c", "#87551f", "#6b4114"];
  for (let i = 0; i < 5; i++) {
    brush.fillTexture(0.85, 0.4);
    brush.wash(sandColors[i], 160);
    brush.fill(sandColors[i], 190);
    brush.fillBleed(0.35, "out");
    brush.noStroke();

    brush.beginShape(0.5);
    brush.vertex(-20, 620);
    let baseY = 310 + i * 55;
    brush.vertex(-20, baseY);
    for (let x = 0; x <= 600; x += 40) {
      let y = baseY + noise(x * 0.015, i * 10) * 45 - 15;
      brush.vertex(x, y);
    }
    brush.vertex(620, baseY);
    brush.vertex(620, 620);
    brush.endShape(CLOSE);
  }
  brush.noWash();
  brush.noFill();

  brush.field("hand");
  brush.wiggle(3);

  brush.mass("pastel", "#2a2724", { strength: 0.85, precision: 0.2, outline: true });
  brush.set("charcoal", "#1a1816", 1.4);
  brush.beginShape(0.05);
  brush.vertex(-10, 620);
  brush.vertex(20, 480);
  brush.vertex(50, 390);
  brush.vertex(80, 260);
  brush.vertex(110, 290);
  brush.vertex(140, 230);
  brush.vertex(180, 350);
  brush.vertex(220, 490);
  brush.vertex(280, 620);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.mass("crayon", "#141311", { strength: 0.9, precision: 0.15, outline: true });
  brush.set("charcoal", "#0a0908", 1.6);
  brush.beginShape(0.05);
  brush.vertex(620, 620);
  brush.vertex(570, 510);
  brush.vertex(540, 430);
  brush.vertex(490, 310);
  brush.vertex(460, 340);
  brush.vertex(430, 280);
  brush.vertex(390, 450);
  brush.vertex(330, 620);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.hatchStyle("charcoal", "#3b3631", 1.0);
  brush.hatch(5, 45, { rand: 0.15 });
  brush.beginShape(0.1);
  brush.vertex(140, 230);
  brush.vertex(180, 350);
  brush.vertex(130, 450);
  brush.vertex(90, 300);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.hatch(4, 120, { rand: 0.2 });
  brush.beginShape(0.1);
  brush.vertex(490, 310);
  brush.vertex(430, 280);
  brush.vertex(410, 380);
  brush.vertex(460, 420);
  brush.endShape(CLOSE);
  brush.noHatch();
  brush.noField();

  brush.noFill();
  brush.set("HB", "#382a1e", 0.7);
  for (let i = 0; i < 25; i++) {
    let startX = random(100, 500);
    let startY = random(520, 600);
    let pts = [[startX, startY]];
    let curX = startX;
    let curY = startY;
    let segments = floor(random(3, 7));
    
    for (let j = 0; j < segments; j++) {
      curX += random(-25, 25);
      curY -= random(10, 35);
      if (curY < 400) break;
      pts.push([curX, curY]);
    }
    brush.spline(pts, 0.05);
  }

  brush.set("2H", "#4a392b", 0.5);
  for (let i = 0; i < 30; i++) {
    let startX = random(50, 550);
    let startY = random(480, 600);
    let pts = [[startX, startY]];
    let curX = startX;
    let curY = startY;
    
    for (let j = 0; j < 3; j++) {
      curX += random(-15, 15);
      curY -= random(5, 20);
      pts.push([curX, curY]);
    }
    brush.spline(pts, 0.1);
  }

  noLoop();
}