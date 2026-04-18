function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  // Layered sand-colored washes
  brush.wash("#e6c28a", 180);
  brush.fillBleed(0.3, "out");
  brush.noStroke();
  brush.beginShape(0.4);
  brush.vertex(0, 300);
  brush.vertex(600, 280);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();
  
  brush.wash("#d9b37e", 160);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.3);
  brush.vertex(100, 310);
  brush.vertex(550, 290);
  brush.vertex(550, 600);
  brush.vertex(100, 600);
  brush.endShape(true);
  brush.noWash();
  
  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);
  brush.mass("pastel", "#5c4a45", { strength: 0.8, precision: 0.4, outline: true });
  brush.beginShape(0.2);
  brush.vertex(50, 300);
  brush.vertex(120, 260);
  brush.vertex(150, 290);
  brush.vertex(200, 240);
  brush.vertex(250, 280);
  brush.vertex(300, 230);
  brush.vertex(350, 270);
  brush.vertex(400, 220);
  brush.vertex(450, 260);
  brush.vertex(500, 210);
  brush.vertex(550, 250);
  brush.vertex(550, 400);
  brush.vertex(500, 410);
  brush.vertex(450, 380);
  brush.vertex(400, 400);
  brush.vertex(350, 370);
  brush.vertex(300, 390);
  brush.vertex(250, 360);
  brush.vertex(200, 380);
  brush.vertex(150, 350);
  brush.vertex(100, 370);
  brush.vertex(50, 340);
  brush.endShape(true);
  brush.noMass();
  brush.noField();
  
  // Thin pen-drawn horizon line
  brush.set("pen", "#333", 0.4);
  brush.line(0, 300, 600, 300);
  
  noLoop();
}