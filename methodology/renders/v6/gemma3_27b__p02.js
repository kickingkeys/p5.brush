function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
  angleMode(DEGREES);
}

function draw() {
  translate(-width/2, -height/2);

  // Grass blade 1
  brush.set("2H", "#333", 0.5);
  brush.line(100, 150, 100, 250);
  brush.strokeWeight(0.8);
  brush.set("HB", "#333", 1);
  brush.line(100, 250, 120, 270);
  brush.line(100, 250, 80, 270);

  // Grass blade 2
  brush.set("2H", "#333", 0.5);
  brush.line(150, 180, 150, 280);
  brush.strokeWeight(0.8);
  brush.set("HB", "#333", 1);
  brush.line(150, 280, 170, 300);
  brush.line(150, 280, 130, 300);

  // Seed Head 1
  brush.noStroke();
  brush.set("charcoal", "#333", 0.7);
  brush.beginShape();
  brush.vertex(200, 100);
  brush.vertex(210, 110);
  brush.vertex(220, 100);
  brush.vertex(210, 90);
  brush.endShape(CLOSE);
  brush.set("2H", "#333", 0.3);
  brush.hatch(5, 45, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(200, 100);
  brush.vertex(210, 110);
  brush.vertex(220, 100);
  brush.vertex(210, 90);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Seed Head 2
  brush.noStroke();
  brush.set("charcoal", "#333", 0.7);
  brush.beginShape();
  brush.vertex(250, 120);
  brush.vertex(260, 130);
  brush.vertex(270, 120);
  brush.vertex(260, 110);
  brush.endShape(CLOSE);
  brush.set("2H", "#333", 0.3);
  brush.hatch(5, 45, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(250, 120);
  brush.vertex(260, 130);
  brush.vertex(270, 120);
  brush.vertex(260, 110);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Grass blade 3
  brush.set("2H", "#333", 0.5);
  brush.line(300, 160, 300, 260);
  brush.strokeWeight(0.8);
  brush.set("HB", "#333", 1);
  brush.line(300, 260, 320, 280);
  brush.line(300, 260, 280, 280);

  // Grass blade 4
  brush.set("2H", "#333", 0.5);
  brush.line(350, 190, 350, 290);
  brush.strokeWeight(0.8);
  brush.set("HB", "#333", 1);
  brush.line(350, 290, 370, 310);
  brush.line(350, 290, 330, 310);

  // Seed Head 3
  brush.noStroke();
  brush.set("charcoal", "#333", 0.7);
  brush.beginShape();
  brush.vertex(400, 130);
  brush.vertex(410, 140);
  brush.vertex(420, 130);
  brush.vertex(410, 120);
  brush.endShape(CLOSE);
  brush.set("2H", "#333", 0.3);
  brush.hatch(5, 45, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(400, 130);
  brush.vertex(410, 140);
  brush.vertex(420, 130);
  brush.vertex(410, 120);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Seed Head 4
  brush.noStroke();
  brush.set("charcoal", "#333", 0.7);
  brush.beginShape();
  brush.vertex(450, 140);
  brush.vertex(460, 150);
  brush.vertex(470, 140);
  brush.vertex(460, 130);
  brush.endShape(CLOSE);
  brush.set("2H", "#333", 0.3);
  brush.hatch(5, 45, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(450, 140);
  brush.vertex(460, 150);
  brush.vertex(470, 140);
  brush.vertex(460, 130);
  brush.endShape(CLOSE);
  brush.noHatch();

  noLoop();
}