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
  brush.vertex(100, -50);
  brush.vertex(200, -100);
  brush.vertex(250, 0);
  brush.vertex(200, 100);
  brush.vertex(100, 50);
  brush.endShape(CLOSE);

  // Cheek 1 - layered strokes
  brush.set("cpencil", "#e08e79", 0.7);
  brush.beginShape();
  brush.vertex(100, -50);
  brush.vertex(150, -20);
  brush.vertex(180, 20);
  brush.vertex(120, 40);
  brush.endShape(CLOSE);
  brush.set("cpencil", "#f4d03f", 0.5);
  brush.beginShape();
  brush.vertex(100, -50);
  brush.vertex(150, -20);
  brush.vertex(180, 20);
  brush.vertex(120, 40);
  brush.endShape(CLOSE);
  brush.set("pastel", "#9c27b0", 0.4);
    brush.beginShape();
  brush.vertex(100, -50);
  brush.vertex(150, -20);
  brush.vertex(180, 20);
  brush.vertex(120, 40);
  brush.endShape(CLOSE);

  // Cheek 2 - layered strokes
  brush.set("cpencil", "#aed6f1", 0.7);
  brush.beginShape();
  brush.vertex(180, -100);
  brush.vertex(230, -60);
  brush.vertex(250, 0);
  brush.vertex(200, 50);
  brush.endShape(CLOSE);
  brush.set("cpencil", "#f06292", 0.5);
  brush.beginShape();
  brush.vertex(180, -100);
  brush.vertex(230, -60);
  brush.vertex(250, 0);
  brush.vertex(200, 50);
  brush.endShape(CLOSE);
  brush.set("pastel", "#ffb74d", 0.4);
    brush.beginShape();
  brush.vertex(180, -100);
  brush.vertex(230, -60);
  brush.vertex(250, 0);
  brush.vertex(200, 50);
  brush.endShape(CLOSE);

  // Nose - simple shape
  brush.set("2H", "#6d4c41", 0.6);
  brush.beginShape();
  brush.vertex(150, -20);
  brush.vertex(170, 0);
  brush.vertex(160, 20);
  brush.endShape(CLOSE);

  // Eye - abstracted
  brush.set("pen", "#333", 0.5);
  brush.arc(80, -80, 30, 180, 360);

  // Mouth - simple line
  brush.set("charcoal", "#222", 1.2);
  brush.line(150, 50, 200, 60);

  noLoop();
}