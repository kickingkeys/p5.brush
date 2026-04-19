function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Face outline
  brush.set("pen", "#333", 0.8);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(150, -100);
  brush.vertex(200, 0);
  brush.vertex(150, 100);
  brush.vertex(0, 150);
  brush.vertex(-150, 100);
  brush.vertex(-200, 0);
  brush.vertex(-150, -100);
  brush.endShape(true);

  // Eyes
  brush.set("2B", "#444", 1.2);
  brush.circle(50, 50, 20);
  brush.circle(-50, 50, 20);

  // Nose
  brush.set("HB", "#666", 1.0);
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(20, 30);
  brush.vertex(-20, 30);
  brush.endShape(true);

  // Mouth
  brush.set("rotring", "#888", 0.6);
  brush.arc(0, 80, 40, radians(180), radians(0));

  // Cheeks - pastel
  brush.set("pastel", "#e9967a", 0.5);
  brush.fill("#e9967a", 150);
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(150, 100);
  brush.vertex(80, 120);
  brush.vertex(0, 100);
  brush.endShape(true);

  brush.set("pastel", "#e9967a", 0.5);
  brush.fill("#e9967a", 150);
  brush.beginShape();
  brush.vertex(-100, 50);
  brush.vertex(-150, 100);
  brush.vertex(-80, 120);
  brush.vertex(0, 100);
  brush.endShape(true);

  // Hair - crayon
  brush.set("crayon", "#a0522d", 0.7);
  brush.beginShape();
  brush.vertex(-200, -50);
  brush.vertex(-200, -150);
  brush.vertex(-100, -200);
  brush.vertex(0, -180);
  brush.vertex(100, -200);
  brush.vertex(200, -150);
  brush.vertex(200, -50);
  brush.endShape(true);

  noLoop();
}