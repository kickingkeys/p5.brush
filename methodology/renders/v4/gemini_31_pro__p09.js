function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.75, 0.4);
  
  let skyColors = ["#080a14", "#121526", "#0f1626", "#05070a"];
  for (let i = 0; i < 20; i++) {
    brush.fill(random(skyColors), random(120, 180));
    brush.fillBleed(random(0.3, 0.6), "out");
    drawBlob(random(600), random(250), random(100, 250));
  }

  let streetColors = ["#0a0b12", "#111421", "#1a1c29", "#080910"];
  for (let i = 0; i < 15; i++) {
    brush.fill(random(streetColors), random(140, 200));
    brush.fillBleed(random(0.3, 0.5), "out");
    drawBlob(random(600), random(350, 600), random(120, 280));
  }

  let neons = [
    { x: 180, y: 220, c: "#e6195e", rx: 180, ry: 450 },
    { x: 420, y: 160, c: "#19d1e6", rx: 420, ry: 420 },
    { x: 300, y: 280, c: "#e6b419", rx: 300, ry: 500 } 
  ];

  for (let n of neons) {
    brush.fill(n.c, 70);
    brush.fillBleed(0.6, "out");
    drawBlob(n.x, n.y, 80);
    drawBlob(n.x, n.y, 40);

    brush.fill(n.c, 50);
    brush.fillBleed(0.7, "out");
    brush.beginShape(0.4);
    brush.vertex(n.rx - 30, n.ry - 80);
    brush.vertex(n.rx + 30, n.ry - 80);
    brush.vertex(n.rx + 50, n.ry + 150);
    brush.vertex(n.rx - 50, n.ry + 150);
    brush.endShape(CLOSE);
  }
  
  brush.noFill();

  for (let n of neons) {
    brush.wash(n.c, 240);
    brush.rect(n.x, n.y, 15, 45, "center");
    brush.noWash();

    brush.set("marker", n.c, 1.5);
    for(let i = 0; i < 10; i++) {
      let sx = n.rx + random(-25, 25);
      let sy1 = n.ry - random(20, 60);
      let sy2 = n.ry + random(40, 120);
      brush.line(sx, sy1, sx, sy2);
    }
  }

  drawSilhouette(220, 420, 1.2);
  drawSilhouette(380, 380, 0.85);
  drawSilhouette(310, 480, 1.6);

  brush.noFill();
  brush.noWash();
  brush.noStroke();
  
  brush.set("rotring", "#aab5c8", 0.4);
  for(let i = 0; i < 350; i++) {
    let rx = random(-100, 700);
    let ry = random(-100, 700);
    let len = random(10, 40);
    brush.line(rx, ry, rx - len * 0.25, ry + len);
  }

  brush.set("spray", "#ffffff", 1.5);
  for(let i = 0; i < 40; i++) {
    brush.flowLine(random(600), random(450, 600), random(10, 30), 0);
  }

  noLoop();
}

function drawBlob(cx, cy, r) {
  brush.beginShape(0.5);
  for (let i = 0; i < 12; i++) {
    let a = i * 30;
    let rad = r + noise(cx * 0.01, cy * 0.01, i) * (r * 0.6);
    brush.vertex(cx + cos(a) * rad, cy + sin(a) * rad);
  }
  brush.endShape(CLOSE);
}

function drawSilhouette(x, y, scaleFac) {
  brush.noStroke();
  
  brush.wash("#050608", 250);
  
  brush.beginShape(0.3);
  brush.vertex(x - 35 * scaleFac, y - 20 * scaleFac);
  brush.vertex(x, y - 45 * scaleFac);
  brush.vertex(x + 35 * scaleFac, y - 20 * scaleFac);
  brush.vertex(x + 30 * scaleFac, y - 15 * scaleFac);
  brush.vertex(x - 30 * scaleFac, y - 15 * scaleFac);
  brush.endShape(CLOSE);

  brush.beginShape(0.3);
  brush.vertex(x - 12 * scaleFac, y - 15 * scaleFac);
  brush.vertex(x + 10 * scaleFac, y - 15 * scaleFac);
  brush.vertex(x + 15 * scaleFac, y + 40 * scaleFac);
  brush.vertex(x + 5 * scaleFac, y + 75 * scaleFac);
  brush.vertex(x - 5 * scaleFac, y + 75 * scaleFac);
  brush.vertex(x - 10 * scaleFac, y + 40 * scaleFac);
  brush.endShape(CLOSE);
  
  brush.noWash();

  brush.set("pen", "#050608", 1.2 * scaleFac);
  brush.line(x, y - 45 * scaleFac, x, y - 52 * scaleFac);
  brush.line(x - 10 * scaleFac, y + 20 * scaleFac, x - 18 * scaleFac, y + 60 * scaleFac);
  
  brush.set("marker", "#050608", 1.0 * scaleFac);
  brush.line(x - 25 * scaleFac, y + 75 * scaleFac, x + 25 * scaleFac, y + 75 * scaleFac);
}