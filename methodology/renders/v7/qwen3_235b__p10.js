function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Layered sand-colored washes
  brush.noStroke();
  brush.fill("#e6c9a8", 180);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.5, 0.3);
  brush.rect(0, 0, 600, 300, "corner");
  
  brush.fill("#d9b894", 160);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.6, 0.35);
  brush.rect(0, 100, 600, 200, "corner");
  
  brush.fill("#cda780", 140);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.7, 0.4);
  brush.rect(0, 200, 600, 100, "corner");

  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);
  brush.mass("pastel", "#5d4037", { strength: 0.8, precision: 0.4, gradient: 0.5, outline: true });
  brush.beginShape(0.3);
  brush.vertex(50, 280);
  brush.vertex(120, 230);
  brush.vertex(180, 260);
  brush.vertex(240, 220);
  brush.vertex(300, 250);
  brush.vertex(360, 210);
  brush.vertex(420, 240);
  brush.vertex(480, 200);
  brush.vertex(550, 230);
  brush.vertex(550, 300);
  brush.vertex(480, 300);
  brush.vertex(420, 280);
  brush.vertex(360, 290);
  brush.vertex(300, 270);
  brush.vertex(240, 280);
  brush.vertex(180, 270);
  brush.vertex(120, 290);
  brush.vertex(50, 290);
  brush.endShape(true);
  brush.noMass();
  brush.noField();

  // Secondary rock formation with hatch
  brush.hatchStyle("charcoal", "#6d4c41", 1.1);
  brush.hatch(3, 75, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(100, 320);
  brush.vertex(160, 300);
  brush.vertex(220, 310);
  brush.vertex(280, 290);
  brush.vertex(340, 300);
  brush.vertex(400, 280);
  brush.vertex(460, 290);
  brush.vertex(460, 360);
  brush.vertex(400, 360);
  brush.vertex(340, 350);
  brush.vertex(280, 360);
  brush.vertex(220, 350);
  brush.vertex(160, 360);
  brush.vertex(100, 350);
  brush.endShape(true);
  brush.noHatch();

  // Horizon line
  brush.set("pen", "#333", 0.4);
  brush.line(0, 300, 600, 300);

  noLoop();
}