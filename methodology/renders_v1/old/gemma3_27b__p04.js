function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Face outline
  brush.set("2B", "#a89078", 1.2);
  brush.noFill();
  brush.circle(0, 0, 150);

  // Eyes
  brush.set("HB", "#333", 0.8);
  brush.noFill();
  brush.circle(-40, -20, 20);
  brush.circle(40, -20, 20);

  // Nose
  brush.set("2H", "#e0c8a8", 1);
  brush.noFill();
  brush.arc(0, 10, 40, 180, 360);

  // Mouth
  brush.set("rotring", "#8b4513", 0.6);
  brush.noFill();
  brush.arc(0, 40, 60, 180, 360);

  // Cheeks (layered strokes)
  brush.set("pastel", "#f08080", 0.5);
  brush.noStroke();
  brush.fill("#f08080", 100);
  brush.circle(-50, 30, 30);
  brush.set("crayon", "#dda0dd", 0.4);
  brush.noStroke();
  brush.fill("#dda0dd", 80);
  brush.circle(50, 30, 30);

  // Hair (spray effect)
  brush.set("spray", "#333", 0.9);
  brush.noStroke();
  brush.fill("#333", 120);
  brush.circle(0, 80, 50);

  // Ear
  brush.set("2B", "#a89078", 0.7);
  brush.noFill();
  brush.arc(-70, 60, 30, 270, 360);

  //Shadows
  brush.set("charcoal", "#444", 0.3);
  brush.noStroke();
  brush.fill("#444", 50);
  brush.circle(-60, -30, 15);

  noLoop();
}