function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.fillTexture(0.85, 0.5);
  brush.noStroke();

  const skyLayers = [
    { c: "#1a1c29", op: 160, scale: 1.0 },
    { c: "#0d111a", op: 180, scale: 0.8 },
    { c: "#05070a", op: 220, scale: 0.5 }
  ];

  for (let layer of skyLayers) {
    brush.fill(layer.c, layer.op);
    brush.wash(layer.c, 100);
    brush.fillBleed(0.4, "out");
    brush.beginShape(0.4);
    brush.vertex(-20, -20);
    brush.vertex(620, -20);
    for (let x = 620; x >= -20; x -= 30) {
      let y = 300 + noise(x * 0.015, layer.scale) * 150 * layer.scale;
      brush.vertex(x, y);
    }
    brush.endShape(CLOSE);
  }
  brush.noWash();

  const streetLayers = [
    { c: "#1b1a20", op: 180 },
    { c: "#111115", op: 200 },
    { c: "#08080a", op: 240 }
  ];

  for (let i = 0; i < streetLayers.length; i++) {
    brush.fill(streetLayers[i].c, streetLayers[i].op);
    brush.wash(streetLayers[i].c, 120);
    brush.fillBleed(0.3, "in");
    brush.beginShape(0.3);
    brush.vertex(-20, 350 + i * 40);
    brush.vertex(620, 350 + i * 40);
    brush.vertex(620, 620);
    brush.vertex(-20, 620);
    brush.endShape(CLOSE);
  }
  brush.noWash();
  brush.noFill();

  const neons = ["#ff0055", "#00e5ff", "#ffea00", "#bf00ff", "#00ff88"];
  brush.field("hand");
  brush.wiggle(2);

  for (let i = 0; i < 25; i++) {
    let nx = random(50, 550);
    let ny = random(380, 500);
    let col = random(neons);

    brush.set("spray", col, random(1.5, 3.0));
    for (let j = 0; j < 6; j++) {
      brush.line(nx + random(-15, 15), ny + j * 15, nx + random(-15, 15), ny + j * 15 + 20);
    }

    brush.set("marker", col, random(0.8, 2.0));
    let pts = [];
    let currY = ny;
    let currX = nx;
    for (let j = 0; j < 4; j++) {
      pts.push([currX, currY]);
      currX += random(-15, 15);
      currY += random(20, 40);
    }
    brush.spline(pts, 0.4);
  }
  brush.noField();
  brush.noStroke();

  function drawSilhouette(x, y, s) {
    brush.noStroke();
    brush.fill("#080808", 255);
    brush.wash("#050505", 255);
    brush.fillBleed(0.15, "out");

    brush.beginShape(0.4);
    for (let a = 180; a <= 360; a += 20) {
      brush.vertex(x + cos(a) * 30 * s, y - 40 * s + sin(a) * 15 * s);
    }
    brush.vertex(x + 30 * s, y - 40 * s);
    brush.vertex(x, y - 45 * s);
    brush.vertex(x - 30 * s, y - 40 * s);
    brush.endShape(CLOSE);

    brush.beginShape(0.3);
    brush.vertex(x - 8 * s, y - 40 * s);
    brush.vertex(x + 10 * s, y - 40 * s);
    brush.vertex(x + 8 * s, y + 10 * s);
    brush.vertex(x - 6 * s, y + 10 * s);
    brush.endShape(CLOSE);
    brush.noWash();
    brush.noFill();

    brush.set("pen", "#050505", 1.5 * s);
    brush.line(x - 4 * s, y + 10 * s, x - 8 * s, y + 35 * s);
    brush.line(x + 4 * s, y + 10 * s, x + 6 * s, y + 35 * s);
    brush.set("pen", "#050505", 0.8 * s);
    brush.line(x, y - 40 * s, x, y - 15 * s);
  }

  drawSilhouette(150, 420, 1.3);
  drawSilhouette(420, 460, 1.6);
  drawSilhouette(280, 390, 0.9);
  drawSilhouette(520, 410, 1.1);
  drawSilhouette(80, 480, 1.8);

  brush.set("pen", "#aaccff", 0.3);
  for (let i = 0; i < 400; i++) {
    let rx = random(-100, 700);
    let ry = random(-50, 650);
    let len = random(15, 40);
    brush.line(rx, ry, rx + len * 0.4, ry + len);
  }

  brush.set("spray", "#ffffff", 2.5);
  for (let i = 0; i < 80; i++) {
    let mx = random(0, 600);
    let my = random(250, 450);
    brush.line(mx, my, mx + 10, my + 10);
  }

  noLoop();
}