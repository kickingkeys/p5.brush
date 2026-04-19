function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
  angleMode(DEGREES);
}

function draw() {
  translate(-width/2, -height/2);

  // Face outline
  brush.set("pen", "#4a4e69", 0.8);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(150, -200);
  brush.vertex(250, -150);
  brush.vertex(200, -50);
  brush.vertex(-50, -50);
  brush.endShape(CLOSE);
  noStroke();

  // Cheek - layered cpencil
  brush.fill("#f28482", 80);
  brush.beginShape();
  brush.vertex(50, -80);
  brush.vertex(180, -130);
  brush.vertex(220, -80);
  brush.vertex(100, -50);
  brush.endShape(CLOSE);
  brush.fill("#e8a87c", 100);
  brush.beginShape();
  brush.vertex(70, -90);
  brush.vertex(160, -140);
  brush.vertex(200, -90);
  brush.vertex(80, -40);
  brush.endShape(CLOSE);
  brush.fill("#e07a5f", 120);
  brush.beginShape();
  brush.vertex(90, -100);
  brush.vertex(140, -150);
  brush.vertex(180, -100);
  brush.vertex(60, -30);
  brush.endShape(CLOSE);


  // Eye - spray and charcoal
  brush.set("spray", "#81b29a", 0.6);
  brush.circle(80, -130, 20);
  brush.set("charcoal", "#2d3e50", 0.3);
  brush.circle(70, -130, 7);

  // Nose - 2H hatching
  brush.hatchStyle("2H", "#a98467", 0.5);
  brush.hatch(3, 45);
  brush.beginShape();
  brush.vertex(120, -90);
  brush.vertex(140, -110);
  brush.vertex(130, -70);
  brush.endShape(CLOSE);
  noHatch();

  // Mouth - pastel
  brush.set("pastel", "#d35400", 0.7);
  brush.beginShape();
  brush.vertex(80, -50);
  brush.vertex(140, -50);
  brush.vertex(120, -30);
  brush.endShape(CLOSE);

  // Hair - crayon
  brush.set("crayon", "#34495e", 1.0);
  brush.beginShape();
  brush.vertex(-50, -50);
  brush.vertex(-80, -150);
  brush.vertex(30, -200);
  brush.vertex(50, -100);
  brush.endShape(CLOSE);
  
  noLoop();
}