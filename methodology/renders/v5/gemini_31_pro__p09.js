function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(12345);
  noiseSeed(12345);

  brush.noStroke();
  brush.fillTexture(0.65, 0.4);

  const skyPalette = ["#0f1423", "#1b2238", "#242b45", "#181f33"];
  for (let i = 0; i < 35; i++) {
    brush.fill(random(skyPalette), random(40, 90));
    brush.fillBleed(random(0.4, 0.7), "out");
    let x = random(-50, 650);
    let y = random(-50, 400);
    let r = random(100, 250);
    brush.circle(x, y, r);
  }
  brush.noFill();

  brush.fillTexture(0.8, 0.5);
  brush.fill("#080a12", 180);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.2);
  brush.vertex(0, 320);
  brush.vertex(120, 280);
  brush.vertex(120, 150);
  brush.vertex(180, 150);
  brush.vertex(180, 290);
  brush.vertex(250, 300);
  brush.vertex(300, 120);
  brush.vertex(380, 120);
  brush.vertex(380, 310);
  brush.vertex(450, 290);
  brush.vertex(450, 180);
  brush.vertex(520, 180);
  brush.vertex(520, 330);
  brush.vertex(600, 340);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noFill();

  brush.fillTexture(0.7, 0.4);
  for (let i = 0; i < 15; i++) {
    brush.fill(random(["#0a0c14", "#111522", "#05060a"]), random(60, 120));
    brush.fillBleed(random(0.3, 0.6), "out");
    let x = random(-50, 650);
    let y = random(350, 650);
    let r = random(80, 300);
    brush.circle(x, y, r);
  }
  brush.noFill();

  const neons = [
    { x: 150, y: 220, col: "#ff0055", size: 1.5 },
    { x: 340, y: 160, col: "#00e5ff", size: 2.0 },
    { x: 480, y: 240, col: "#ffea00", size: 1.2 },
    { x: 80,  y: 280, col: "#b000ff", size: 1.0 },
    { x: 550, y: 190, col: "#ff0055", size: 1.6 }
  ];

  for (let n of neons) {
    brush.set("spray", n.col, 3.5 * n.size);
    for (let i = 0; i < 40; i++) {
      brush.flowLine(
        n.x + random(-25, 25) * n.size, 
        n.y + random(-25, 25) * n.size, 
        random(10, 30), 
        random(360)
      );
    }
    
    brush.set("spray", n.col, 1.5 * n.size);
    for (let i = 0; i < 20; i++) {
      brush.flowLine(
        n.x + random(-10, 10) * n.size, 
        n.y + random(-10, 10) * n.size, 
        random(5, 15), 
        random(360)
      );
    }

    brush.wash("#ffffff", 200);
    brush.circle(n.x, n.y, 8 * n.size);
    brush.noWash();

    brush.field("hand");
    brush.wiggle(2);
    brush.set("marker", n.col, 1.8 * n.size);
    
    let numSmears = floor(random(5, 12));
    for (let i = 0; i < numSmears; i++) {
      let rx = n.x + random(-20, 20) * n.size;
      let startY = random(350, 420);
      let endY = startY + random(40, 180) * n.size;
      if (random() > 0.5) {
        brush.line(rx, startY, rx + random(-5, 5), endY);
      }
    }
    
    brush.set("marker", n.col, 3.0 * n.size);
    for (let i = 0; i < 3; i++) {
      let rx = n.x + random(-10, 10) * n.size;
      let startY = random(360, 390);
      let endY = startY + random(20, 60) * n.size;
      brush.line(rx, startY, rx, endY);
    }
    
    brush.noField();
  }

  const figures = [
    { x: 220, y: 380, s: 1.0 },
    { x: 420, y: 440, s: 1.4 },
    { x: 120, y: 480, s: 1.8 }
  ];

  for (let fig of figures) {
    brush.wash("#050608", 240);
    brush.beginShape(0.4);
    brush.vertex(fig.x - 35 * fig.s, fig.y);
    brush.vertex(fig.x - 15 * fig.s, fig.y - 25 * fig.s);
    brush.vertex(fig.x + 15 * fig.s, fig.y - 25 * fig.s);
    brush.vertex(fig.x + 35 * fig.s, fig.y);
    brush.vertex(fig.x, fig.y - 5 * fig.s);
    brush.endShape(true);
    brush.noWash();

    brush.set("pen", "#050608", 2.0);
    brush.spline([
      [fig.x, fig.y, 1.2],
      [fig.x + 2 * fig.s, fig.y + 40 * fig.s, 1.5],
      [fig.x, fig.y + 70 * fig.s, 1.0]
    ], 0.2);

    brush.spline([
      [fig.x, fig.y + 70 * fig.s, 1.0],
      [fig.x - 10 * fig.s, fig.y + 110 * fig.s, 0.8]
    ], 0.1);
    
    brush.spline([
      [fig.x, fig.y + 70 * fig.s, 1.0],
      [fig.x + 12 * fig.s, fig.y + 105 * fig.s, 0.8]
    ], 0.1);

    brush.set("pen", "#111115", 1.0);
    brush.line(fig.x, fig.y - 25 * fig.s, fig.x, fig.y - 32 * fig.s);
    brush.line(fig.x, fig.y, fig.x, fig.y + 30 * fig.s); 
  }

  brush.set("rotring", "#a2b1c2", 0.3);
  for (let i = 0; i < 400; i++) {
    let rx = random(-100, 700);
    let ry = random(-100, 700);
    let len = random(10, 35);
    brush.line(rx, ry, rx + len * 0.3, ry + len);
  }

  brush.set("rotring", "#ffffff", 0.5);
  for (let i = 0; i < 100; i++) {
    let rx = random(-100, 700);
    let ry = random(-100, 700);
    let len = random(15, 45);
    brush.line(rx, ry, rx + len * 0.3, ry + len);
  }

  noLoop();
}