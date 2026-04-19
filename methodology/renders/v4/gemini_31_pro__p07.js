function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const sprayColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#2a2a2a", "#8cdb5e", "#d84599", "#f4f1eb"];
  const darkColors = ["#1a1a1a", "#333333", "#555555", "#777777"];

  brush.field("curved");
  brush.wiggle(4);
  for (let i = 0; i < 25; i++) {
    brush.set("2H", random(darkColors), random(0.4, 0.9));
    let sx = random(40, 560);
    let sy = random(40, 560);
    brush.spline([
      [sx, sy, random(0.4, 0.8)],
      [sx + random(-50, 50), sy + random(-50, 50), random(0.4, 0.8)],
      [sx + random(-90, 90), sy + random(-90, 90), random(0.4, 0.8)],
      [sx + random(-130, 130), sy + random(-130, 130), random(0.4, 0.8)]
    ], 0.35);
  }
  brush.noField();

  brush.field("hand");
  brush.wiggle(2);
  for (let i = 0; i < 50; i++) {
    brush.set("spray", random(sprayColors), random(1.5, 3.8));
    brush.flowLine(random(40, 560), random(40, 560), random(20, 100), random(360));
  }

  for (let i = 0; i < 30; i++) {
    brush.set("spray", random(sprayColors), random(1.0, 2.8));
    brush.circle(random(60, 540), random(60, 540), random(15, 70), true);
  }
  brush.noField();

  for (let i = 0; i < 45; i++) {
    brush.set("spray", random(sprayColors), random(0.3, 0.8));
    let dx = random(40, 560);
    let dy = random(40, 480);
    brush.line(dx, dy, dx + random(-4, 4), dy + random(30, 180));
  }

  for (let i = 0; i < 15; i++) {
    brush.set("marker", random(sprayColors), random(0.2, 0.5));
    let dx = random(40, 560);
    let dy = random(40, 480);
    brush.line(dx, dy, dx + random(-1, 1), dy + random(20, 90));
  }

  brush.field("hand");
  brush.wiggle(1);
  for (let i = 0; i < 14; i++) {
    let col = random(sprayColors);
    brush.set("marker", col, random(1.0, 2.4));
    let tx = random(60, 480);
    let ty = random(60, 500);

    let endX = tx + random(80, 160);
    let endY = ty + random(-40, 40);

    brush.spline([
      [tx, ty, random(0.6, 1.0)],
      [tx + random(20, 60), ty + random(-40, 40), random(1.0, 1.5)],
      [tx + random(50, 100), ty + random(-20, 20), random(0.5, 0.9)],
      [endX, endY, random(0.8, 1.2)]
    ], 0.4);

    if (random() > 0.3) {
      brush.set("pen", col, random(1.2, 2.2));
      brush.line(endX, endY, endX - random(10, 25), endY - random(5, 20));
      brush.line(endX, endY, endX - random(5, 20), endY + random(10, 25));
    }
  }
  brush.noField();

  brush.wiggle(3);
  for (let i = 0; i < 18; i++) {
    brush.set("charcoal", random(sprayColors), random(0.6, 1.5));
    brush.circle(random(50, 550), random(50, 550), random(20, 90), true);
  }

  for (let i = 0; i < 10; i++) {
    brush.set("cpencil", random(darkColors), random(0.8, 1.4));
    brush.circle(random(50, 550), random(50, 550), random(15, 50), true);
  }

  noLoop();
}