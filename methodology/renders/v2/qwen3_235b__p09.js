function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Wet watercolor bleeds for street and sky
  brush.fillTexture(0.7, 0.4);
  brush.wash("#1a1a35", 180);
  brush.fill("#2c2c54", 200);
  brush.fillBleed(0.6, "out");
  brush.noStroke();
  brush.rect(0, 0, 600, 600, "corner");
  brush.noWash();

  // Neon marker smears reflecting on wet pavement
  brush.wiggle(1);
  brush.set("marker", "#ff3366", 2.0);
  brush.line(50, 550, 550, 550);
  brush.set("marker", "#33ccff", 1.8);
  brush.line(30, 530, 570, 530);
  brush.set("marker", "#ccff33", 1.6);
  brush.line(70, 510, 530, 510);
  brush.noField();

  // Vertical neon glow reflections with subtle spray
  brush.set("spray", "#ff3366", 1.2);
  for (let i = 0; i < 40; i++) {
    const x = random(40, 560);
    brush.flowLine(x, 550, random(15, 30), 90);
  }
  brush.set("spray", "#33ccff", 1.0);
  for (let i = 0; i < 30; i++) {
    const x = random(20, 580);
    brush.flowLine(x, 550, random(10, 25), 90);
  }

  // Sparse ink silhouettes of passersby
  brush.set("2B", "#000", 1.8);
  for (let i = 0; i < 8; i++) {
    const x = random(80 + i * 60, 110 + i * 60);
    const h = random(60, 100);
    brush.beginShape(0.3);
    brush.vertex(x, 500);
    brush.vertex(x + 8, 500 - h * 0.6);
    brush.vertex(x, 500 - h);
    brush.vertex(x - 8, 500 - h * 0.6);
    brush.endShape(true);
  }

  // Distant silhouettes with lighter pencils
  brush.set("HB", "#1a1a1a", 1.2);
  for (let i = 0; i < 5; i++) {
    const x = random(100 + i * 80, 130 + i * 80);
    const h = random(40, 60);
    brush.beginShape(0.2);
    brush.vertex(x, 520);
    brush.vertex(x + 5, 520 - h * 0.5);
    brush.vertex(x, 520 - h);
    brush.vertex(x - 5, 520 - h * 0.5);
    brush.endShape(true);
  }

  noLoop();
}