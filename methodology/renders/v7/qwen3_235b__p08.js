function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Fog layer with soft watercolor washes
  brush.field("curved");
  brush.noStroke();
  brush.wash("#e8f4f0", 180);
  brush.fill("#d4e8e4", 60);
  brush.fillBleed(0.5, "out");
  for (let i = 0; i < 15; i++) {
    const x = random(40, 560);
    const y = random(40, 280);
    const r = random(80, 180);
    brush.circle(x, y, r);
  }
  brush.noWash();
  brush.noField();

  // Distant boat silhouettes with soft edges
  brush.noStroke();
  brush.fill("#a0c8d8", 70);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.4, 0.3);
  brush.beginShape(0.4);
  brush.vertex(100, 300);
  brush.vertex(180, 280);
  brush.vertex(200, 320);
  brush.vertex(120, 340);
  brush.endShape(true);

  brush.beginShape(0.3);
  brush.vertex(350, 310);
  brush.vertex(420, 290);
  brush.vertex(440, 330);
  brush.vertex(360, 350);
  brush.endShape(true);
  brush.noFill();

  // Water ripples with soft horizontal hatching
  brush.hatchStyle("2H", "#b0d0e0", 0.6);
  brush.hatch(6, 0, { rand: 0.1, gradient: 0.2 });
  brush.beginShape(0.2);
  brush.vertex(0, 300);
  brush.vertex(width, 280);
  brush.vertex(width, 320);
  brush.vertex(0, 340);
  brush.endShape(true);
  brush.noHatch();

  // Faint masts and rigging with graphite pencil
  brush.set("2H", "#555", 0.5);
  brush.line(150, 180, 150, 300);
  brush.line(180, 200, 180, 310);
  brush.line(220, 190, 220, 305);

  // Rope diagonals
  brush.set("2H", "#666", 0.4);
  brush.line(150, 250, 180, 310);
  brush.line(180, 270, 220, 300);
  brush.line(220, 260, 150, 290);

  // Subtle cross-hatch for dock texture
  brush.hatchStyle("2H", "#777", 0.5);
  brush.hatch(5, 45, { rand: 0.08 });
  brush.hatch(5, 135, { rand: 0.08 });
  brush.beginShape(0.2);
  brush.vertex(0, 340);
  brush.vertex(width, 330);
  brush.vertex(width, 360);
  brush.vertex(0, 370);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}