function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  // Layered sand-colored washes
  brush.wash("#e6c9a8", 40);
  brush.fillTexture(0.3, 0.2, false);
  brush.noStroke();
  brush.rect(0, 200, 600, 200);
  
  brush.wash("#dab894", 30);
  brush.fillTexture(0.4, 0.3, false);
  brush.rect(0, 250, 600, 180);
  
  brush.wash("#cda78c", 25);
  brush.fillTexture(0.5, 0.4, false);
  brush.rect(0, 300, 600, 160);
  
  // Jagged charcoal rock formations
  brush.set("charcoal", "#3a302c", 1.2);
  brush.strokeWeight(1.5);
  brush.beginShape(0.2);
  brush.vertex(50, 380);
  brush.vertex(120, 320);
  brush.vertex(180, 360);
  brush.vertex(240, 310);
  brush.vertex(300, 370);
  brush.vertex(360, 300);
  brush.vertex(420, 350);
  brush.vertex(480, 320);
  brush.vertex(550, 390);
  brush.vertex(550, 600);
  brush.vertex(50, 600);
  brush.endShape(true);
  
  // Additional jagged layers with 2B
  brush.set("2B", "#4a3f3b", 0.8);
  brush.strokeWeight(1);
  brush.beginShape(0.3);
  brush.vertex(100, 400);
  brush.vertex(160, 350);
  brush.vertex(220, 380);
  brush.vertex(280, 340);
  brush.vertex(340, 390);
  brush.vertex(400, 330);
  brush.vertex(460, 370);
  brush.vertex(460, 600);
  brush.vertex(100, 600);
  brush.endShape(true);
  
  // Thin pen-drawn horizon line
  brush.set("pen", "#222", 0.3);
  brush.line(0, 300, 600, 300);
  
  noLoop();
}