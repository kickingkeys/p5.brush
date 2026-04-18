function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
  angleMode(DEGREES);
}

function draw() {
  translate(-width/2, -height/2);

  // Face outline
  brush.set("2B", "#444", 0.8);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(150, -100);
  brush.vertex(200, 50);
  brush.vertex(0, 100);
  brush.vertex(-150, 50);
  brush.vertex(-200, -100);
  brush.endShape(CLOSE);

  // Nose
  brush.set("HB", "#a0522d", 0.6);
  brush.beginShape();
  brush.vertex(50, 0);
  brush.vertex(75, 20);
  brush.vertex(50, 40);
  brush.vertex(25, 20);
  brush.endShape(CLOSE);

  // Eyes
  brush.set("cpencil", "#6a5acd", 0.7);
  brush.circle(100, -50, 20);
  brush.circle(-100, -50, 20);

  // Mouth
  brush.set("crayon", "#dc143c", 0.9);
  brush.arc(0, 80, 50, 180, 360);

  // Cheek highlights
  brush.set("pastel", "#ffb6c1", 0.4);
  brush.circle(75, 30, 15);
  brush.circle(-75, 30, 15);

  // Hair
  brush.set("charcoal", "#333", 0.5);
  brush.beginShape();
  brush.vertex(-200, -100);
  brush.vertex(-250, -150);
  brush.vertex(-150, -180);
  brush.vertex(-50, -150);
  brush.endShape(CLOSE);
  brush.set("charcoal", "#333", 0.3);
  brush.beginShape();
  brush.vertex(-200, -100);
  brush.vertex(-250, -150);
  brush.vertex(-150, -180);
  brush.vertex(-50, -150);
  brush.endShape();

  // Subtle color layers
  brush.set("cpencil", "#98fb98", 0.2);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(150, -100);
  brush.vertex(200, 50);
  brush.vertex(0, 100);
  brush.vertex(-150, 50);
  brush.vertex(-200, -100);
  brush.endShape(CLOSE);

  brush.set("spray", "#dda0dd", 0.1);
  for (let i = 0; i < 50; i++) {
    brush.circle(random(-200, 200), random(-150, 150), random(5, 10));
  }

  noLoop();
}