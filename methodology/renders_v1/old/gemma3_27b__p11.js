function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Rectangle 1
  brush.set("2B", "#4a3f35", 1);
  brush.rect(0, 0, 150, 200);

  // Rectangle 2
  brush.set("HB", "#5d4037", 1);
  brush.rect(50, 50, 100, 150);

  // Rectangle 3
  brush.set("2H", "#776355", 0.8);
  brush.rect(100, 100, 120, 80);

  // Hatching on Rectangle 3
  brush.hatch(5, 45);
  brush.fill("#f0e6d2", 100);
  brush.rect(100, 100, 120, 80);
  brush.noHatch();

  // Charcoal lines
  brush.set("charcoal", "#222222", 1.5);
  brush.line(250, 50, 350, 150);
  brush.line(300, 200, 400, 100);
  
  // Pastel fill - rounded rectangle
  brush.fill("#e0b2a2", 150);
  brush.noStroke();
  brush.rect(450, 100, 80, 50, "center");

  // Crayon shading
  brush.set("crayon", "#905e3e", 1);
  brush.rect(450, 250, 50, 70);

  noLoop();
}