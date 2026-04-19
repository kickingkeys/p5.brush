function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Layered sand-colored washes
  brush.noStroke();
  brush.wash("#e8c4a7", 180);
  brush.fill("#d8b491", 200);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.5, 0.3);
  for (let i = 0; i < 3; i++) {
    const scale = 0.9 - i * 0.1;
    brush.beginShape(0.4);
    for (let a = 0; a < 36; a++) {
      const angle = (a / 36) * TWO_PI;
      const x = 300 + cos(angle) * 250 * scale;
      const y = 300 + sin(angle) * 250 * scale;
      brush.vertex(x, y);
    }
    brush.endShape(true);
  }
  brush.noWash();

  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);
  brush.hatchStyle("charcoal", "#3a3a3a", 1.8);
  brush.hatch(5, 60, { rand: 0.2, continuous: true });
  brush.beginShape(0.3);
  for (const pt of [
    [150, 400], [210, 310], [270, 380], [330, 290], [390, 410], [450, 320],
    [430, 450], [370, 420], [330, 480], [270, 440], [210, 490], [150, 400]
  ]) {
    brush.vertex(pt[0], pt[1]);
  }
  brush.endShape(true);
  brush.noHatch();
  brush.noField();

  // Thin horizon line with pen
  brush.set("pen", "#000", 0.4);
  brush.line(50, 300, 550, 300);

  noLoop();
}