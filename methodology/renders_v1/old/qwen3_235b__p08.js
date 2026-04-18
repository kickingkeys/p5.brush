function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffceb");
  translate(-width/2, -height/2);

  // Soft watercolor washes for fog and dawn light
  brush.wash("#e8f4f0", 40);
  brush.fillBleed(0.4, "out");
  brush.circle(300, 200, 400);

  brush.wash("#f8e8f4", 30);
  brush.fillBleed(0.3, "out");
  brush.circle(200, 400, 350);

  brush.wash("#e8eaf6", 35);
  brush.fillBleed(0.35, "out");
  brush.rect(0, 300, 600, 300, "corner");

  // Faint graphite pencil lines for masts and ropes
  brush.set("2H", "#555", 0.8);
  for (let i = 0; i < 12; i++) {
    const x = 80 + i * 40;
    brush.line(x, 500, x, 150);
    
    // Rigging ropes
    brush.set("HB", "#666", 0.5);
    const sway = random(-20, 20);
    brush.line(x, 180 + sway, x + random(10, 30), 220);
    brush.line(x, 180 + sway, x - random(10, 30), 220);
  }

  // Distant boat silhouettes
  brush.set("2B", "#444", 1.2);
  brush.noFill();
  brush.hatch(8, 0, { rand: 0.2 });
  brush.hatchStyle("cpencil", "#555", 0.7);
  brush.rect(50, 480, 100, 20, "corner");
  brush.rect(420, 460, 120, 25, "corner");

  // Mooring lines and texture
  brush.set("cpencil", "#777", 0.6);
  for (let i = 0; i < 8; i++) {
    const y = 500 + i * 6;
    brush.line(20, y, 100, y + 10);
    brush.line(580, y, 500, y + 10);
  }

  noLoop();
}