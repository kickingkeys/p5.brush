function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Layered sand-colored washes
  brush.noStroke();
  brush.fill("#e6c288", 180);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.5, 0.3);
  brush.beginShape(0.3);
  brush.vertex(0, 300);
  brush.vertex(600, 280);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  brush.fill("#dab27a", 160);
  brush.fillBleed(0.15, "out");
  brush.beginShape(0.2);
  brush.vertex(0, 320);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);
  brush.mass("crayon", "#5d4a3c", { strength: 0.8, precision: 0.4, gradient: 0.5, outline: true });
  brush.hatchStyle("charcoal", "#4a3a2f", 1.8);
  brush.hatch(5, 60, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(50, 200);
  brush.vertex(120, 180);
  brush.vertex(180, 220);
  brush.vertex(240, 190);
  brush.vertex(300, 230);
  brush.vertex(360, 180);
  brush.vertex(420, 210);
  brush.vertex(480, 190);
  brush.vertex(540, 220);
  brush.vertex(550, 250);
  brush.vertex(540, 300);
  brush.vertex(480, 320);
  brush.vertex(420, 310);
  brush.vertex(360, 340);
  brush.vertex(300, 330);
  brush.vertex(240, 350);
  brush.vertex(180, 340);
  brush.vertex(120, 330);
  brush.vertex(60, 310);
  brush.vertex(50, 280);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();

  brush.mass("pastel", "#3a3028", { strength: 0.6, precision: 0.5, gradient: 0.4 });
  brush.hatchStyle("charcoal", "#2f251f", 2.0);
  brush.hatch(4, 75, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(100, 220);
  brush.vertex(160, 200);
  brush.vertex(220, 230);
  brush.vertex(280, 210);
  brush.vertex(340, 240);
  brush.vertex(400, 220);
  brush.vertex(460, 240);
  brush.vertex(480, 270);
  brush.vertex(460, 300);
  brush.vertex(400, 290);
  brush.vertex(340, 310);
  brush.vertex(280, 300);
  brush.vertex(220, 320);
  brush.vertex(160, 310);
  brush.vertex(120, 290);
  brush.vertex(100, 260);
  brush.endShape(true);
  brush.noMass();
  brush.noHatch();
  brush.noField();

  // Thin pen-drawn horizon line
  brush.set("pen", "#000", 0.6);
  brush.line(0, 250, 600, 250);

  noLoop();
}