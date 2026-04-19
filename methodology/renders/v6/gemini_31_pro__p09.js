function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(104);
  noiseSeed(104);

  brush.noStroke();
  brush.fillTexture(0.7, 0.4);

  const nightColors = ["#141624", "#1b1d30", "#24273d", "#11131c"];
  for (let i = 0; i < 25; i++) {
    brush.fill(random(nightColors), random(120, 190));
    brush.fillBleed(random(0.3, 0.6), "out");
    brush.beginShape(0.5);
    let cx = random(-50, 650);
    let cy = random(-50, 450);
    for (let j = 0; j < 12; j++) {
      let a = j * 30;
      let r = random(60, 220);
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(CLOSE);
  }
  brush.noFill();

  brush.fillTexture(0.8, 0.3);
  brush.fill("#0a0b12", 180);
  brush.fillBleed(0.5, "out");
  brush.rect(300, 500, 700, 300, "center");
  brush.noFill();

  brush.hatchStyle("rotring", "#050608", 0.4);
  brush.hatch(3, 90, { rand: 0.2, continuous: true });
  brush.rect(300, 500, 700, 300, "center");
  brush.noHatch();

  const neons = ["#ff0055", "#00ffff", "#ffaa00", "#cc00ff", "#00ff88"];
  brush.noStroke();
  brush.fillTexture(0.5, 0.2);

  for (let i = 0; i < 12; i++) {
    let nx = random(50, 550);
    let ny = random(320, 420);
    let col = random(neons);

    brush.fill(col, 40);
    brush.fillBleed(0.6, "out");
    brush.circle(nx, ny, random(30, 90));

    brush.fill(col, 80);
    brush.fillBleed(0.4, "out");
    brush.beginShape(0.2);
    brush.vertex(nx - random(10, 20), ny);
    brush.vertex(nx + random(10, 20), ny);
    brush.vertex(nx + random(5, 30), 650);
    brush.vertex(nx - random(5, 30), 650);
    brush.endShape(CLOSE);

    brush.set("marker", col, random(0.8, 1.8));
    brush.wiggle(1);
    let streakX = nx;
    for (let sy = ny; sy < 600; sy += 30) {
      if (random() > 0.2) {
        brush.line(streakX, sy, streakX + random(-5, 5), sy + random(15, 40));
      }
      streakX += random(-4, 4);
    }
    brush.noField();
  }
  brush.noFill();
  brush.noStroke();

  brush.addField("rain", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = 80 + noise(c * 0.05, r * 0.05) * 15;
      }
    }
    return field;
  });

  brush.field("rain");
  brush.set("pen", "#ffffff", 0.2);
  for (let i = 0; i < 150; i++) {
    brush.flowLine(random(600), random(600), random(15, 40), 0);
  }
  brush.noField();

  brush.set("spray", "#ffffff", 1.5);
  for (let i = 0; i < 40; i++) {
    let sx = random(600);
    let sy = random(300, 600);
    brush.flowLine(sx, sy, random(5, 15), random(360));
  }

  const figures = [
    { x: 180, y: 440, s: 1.1 },
    { x: 420, y: 460, s: 1.4 },
    { x: 310, y: 410, s: 0.8 },
    { x: 520, y: 430, s: 0.95 }
  ];

  brush.fillTexture(0.9, 0.1, false);
  brush.fill("#050505", 240);
  brush.fillBleed(0.15, "out");
  brush.set("pen", "#000000", 1.5);

  for (let f of figures) {
    let h = 45 * f.s;
    let w = 18 * f.s;
    let ux = f.x + random(-5, 5);
    let uy = f.y - h - 12 * f.s;
    let ur = 30 * f.s;

    brush.beginShape(0.4);
    for (let a = 170; a <= 370; a += 15) {
      brush.vertex(ux + cos(a) * ur, uy + sin(a) * ur);
    }
    brush.vertex(ux - ur, uy);
    brush.endShape(CLOSE);

    brush.beginShape(0.5);
    brush.vertex(f.x - w / 2, f.y - h);
    brush.vertex(f.x + w / 2, f.y - h);
    brush.vertex(f.x + w / 2.5, f.y);
    brush.vertex(f.x - w / 2.5, f.y);
    brush.endShape(CLOSE);

    brush.line(f.x - w / 4, f.y, f.x - w / 3, f.y + 18 * f.s);
    brush.line(f.x + w / 4, f.y, f.x + w / 3, f.y + 18 * f.s);

    brush.set("pen", "#111111", 1.0);
    brush.line(ux, uy, ux, f.y - h + 8 * f.s);
    brush.set("pen", "#000000", 1.5);

    brush.fill("#000000", 100);
    brush.fillBleed(0.4, "out");
    brush.noStroke();
    brush.beginShape(0.3);
    brush.vertex(f.x - w, f.y + 18 * f.s);
    brush.vertex(f.x + w, f.y + 18 * f.s);
    brush.vertex(f.x + w * 2, f.y + 18 * f.s + 40 * f.s);
    brush.vertex(f.x - w * 2, f.y + 18 * f.s + 40 * f.s);
    brush.endShape(CLOSE);
    
    brush.fill("#050505", 240);
    brush.fillBleed(0.15, "out");
    brush.set("pen", "#000000", 1.5);
  }

  brush.noFill();
  brush.noStroke();

  noLoop();
}