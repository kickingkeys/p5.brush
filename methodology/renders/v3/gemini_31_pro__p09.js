function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.7, 0.4);

  let skyColors = ["#090b14", "#121420", "#0a0a14", "#181a28"];
  for (let i = 0; i < 15; i++) {
    brush.fill(random(skyColors), random(160, 230));
    brush.fillBleed(random(0.4, 0.7), "out");
    brush.beginShape(0.5);
    let cx = random(-100, 700);
    let cy = random(-100, 400);
    for (let j = 0; j < 12; j++) {
      let a = j * 30;
      let r = random(100, 280);
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(CLOSE);
  }

  let streetColors = ["#05060a", "#0d0f14", "#030406"];
  for (let i = 0; i < 12; i++) {
    brush.fill(random(streetColors), random(180, 255));
    brush.fillBleed(random(0.3, 0.6), "out");
    brush.beginShape(0.3);
    let cx = random(-100, 700);
    let cy = random(350, 700);
    for (let j = 0; j < 10; j++) {
      let a = j * 36;
      let rx = random(150, 350);
      let ry = random(40, 120);
      brush.vertex(cx + cos(a) * rx, cy + sin(a) * ry);
    }
    brush.endShape(CLOSE);
  }
  brush.noFill();

  let neons = [
    { x: 180, y: 180, c1: "#ff0055", c2: "#ff88bb", h: 140 },
    { x: 420, y: 200, c1: "#00eeff", c2: "#aaffff", h: 110 },
    { x: 290, y: 250, c1: "#ffaa00", c2: "#ffff88", h: 70 }
  ];

  for (let n of neons) {
    brush.noStroke();
    brush.fill(n.c1, 90);
    brush.fillBleed(0.8, "out");
    brush.circle(n.x, n.y, n.h * 1.8);

    brush.fill(n.c1, 70);
    brush.fillBleed(0.9, "out");
    brush.beginShape(0.4);
    brush.vertex(n.x - n.h * 0.6, 350);
    brush.vertex(n.x + n.h * 0.6, 350);
    brush.vertex(n.x + n.h * 1.2, 650);
    brush.vertex(n.x - n.h * 1.2, 650);
    brush.endShape(CLOSE);
    brush.noFill();

    brush.set("marker", n.c2, 2);
    brush.line(n.x, n.y - n.h / 2, n.x, n.y + n.h / 2);

    brush.field("zigzag");
    brush.wiggle(2);
    for (let i = 0; i < 12; i++) {
      brush.set("marker", n.c1, random(1, 2.5));
      let ry = random(360, 580);
      let rw = random(15, 60);
      let rx = n.x + random(-25, 25);
      brush.line(rx - rw, ry, rx + rw, ry);
    }
    brush.noField();
  }

  brush.noStroke();
  let figures = [
    { x: 220, y: 390, s: 1.1 },
    { x: 400, y: 430, s: 1.4 },
    { x: 310, y: 350, s: 0.8 }
  ];

  for (let fig of figures) {
    brush.fill("#000000", 110);
    brush.fillBleed(0.5, "out");
    brush.beginShape(0.3);
    brush.vertex(fig.x - 15 * fig.s, fig.y + 60 * fig.s);
    brush.vertex(fig.x + 15 * fig.s, fig.y + 60 * fig.s);
    brush.vertex(fig.x + 30 * fig.s, fig.y + 140 * fig.s);
    brush.vertex(fig.x - 30 * fig.s, fig.y + 140 * fig.s);
    brush.endShape(CLOSE);
    brush.noFill();

    brush.wash("#030303", 255);
    brush.beginShape(0.2);
    brush.vertex(fig.x - 10 * fig.s, fig.y);
    brush.vertex(fig.x + 10 * fig.s, fig.y);
    brush.vertex(fig.x + 12 * fig.s, fig.y + 60 * fig.s);
    brush.vertex(fig.x - 12 * fig.s, fig.y + 60 * fig.s);
    brush.endShape(CLOSE);

    brush.beginShape(0.4);
    brush.vertex(fig.x - 38 * fig.s, fig.y - 8 * fig.s);
    brush.vertex(fig.x, fig.y - 32 * fig.s);
    brush.vertex(fig.x + 38 * fig.s, fig.y - 8 * fig.s);
    brush.vertex(fig.x + 32 * fig.s, fig.y - 3 * fig.s);
    brush.vertex(fig.x - 32 * fig.s, fig.y - 3 * fig.s);
    brush.endShape(CLOSE);
    brush.noWash();

    brush.set("pen", "#050505", 1.5);
    brush.line(fig.x, fig.y - 8 * fig.s, fig.x, fig.y + 25 * fig.s);
    brush.line(fig.x - 6 * fig.s, fig.y + 60 * fig.s, fig.x - 8 * fig.s, fig.y + 85 * fig.s);
    brush.line(fig.x + 6 * fig.s, fig.y + 60 * fig.s, fig.x + 8 * fig.s, fig.y + 85 * fig.s);
  }

  brush.set("spray", "#ffffff", 1.8);
  for (let i = 0; i < 180; i++) {
    let rx = random(-100, 700);
    let ry = random(-100, 700);
    brush.line(rx, ry, rx + random(10, 25), ry + random(20, 50));
  }

  brush.set("2H", "#88aacc", 0.7);
  for (let i = 0; i < 250; i++) {
    let rx = random(-100, 700);
    let ry = random(-100, 700);
    let len = random(15, 45);
    brush.line(rx, ry, rx + len * 0.4, ry + len);
  }

  brush.fillTexture(0.8, 0.4);
  for (let i = 0; i < 8; i++) {
    brush.fill("#111522", 140);
    brush.fillBleed(0.5, "in");
    brush.beginShape(0.4);
    let px = random(50, 550);
    let py = random(400, 580);
    for (let j = 0; j < 8; j++) {
      let a = j * 45;
      let rx = random(40, 90);
      let ry = random(10, 25);
      brush.vertex(px + cos(a) * rx, py + sin(a) * ry);
    }
    brush.endShape(CLOSE);
  }
  brush.noFill();

  noLoop();
}