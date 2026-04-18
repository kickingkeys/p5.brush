function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Layered sand-colored washes
  brush.wash("#e6c288", 180);
  brush.beginShape(0.2);
  brush.vertex(0, 300);
  brush.vertex(600, 280);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.wash("#dab27e", 160);
  brush.beginShape(0.3);
  brush.vertex(0, 320);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.wash("#cda774", 140);
  brush.beginShape(0.4);
  brush.vertex(0, 340);
  brush.vertex(600, 330);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);
  brush.set("charcoal", "#5d4037", 1.8);
  brush.beginShape(0.1);
  brush.vertex(50, 280);
  brush.vertex(120, 240);
  brush.vertex(150, 260);
  brush.vertex(200, 230);
  brush.vertex(250, 250);
  brush.vertex(300, 220);
  brush.vertex(350, 240);
  brush.vertex(400, 210);
  brush.vertex(450, 235);
  brush.vertex(500, 225);
  brush.vertex(550, 245);
  brush.vertex(600, 240);
  brush.vertex(600, 300);
  brush.vertex(550, 300);
  brush.vertex(500, 290);
  brush.vertex(450, 310);
  brush.vertex(400, 290);
  brush.vertex(350, 300);
  brush.vertex(300, 280);
  brush.vertex(250, 300);
  brush.vertex(200, 280);
  brush.vertex(150, 290);
  brush.vertex(100, 270);
  brush.vertex(50, 290);
  brush.endShape(true);
  brush.noField();

  // Thin pen-drawn horizon line
  brush.set("pen", "#3e2723", 0.6);
  brush.line(0, 270, 600, 270);

  noLoop();
}