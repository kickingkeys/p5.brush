function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Layered sand-colored washes for cracked desert
  brush.noStroke();
  brush.wash("#e8d5b7", 180);
  brush.fillBleed(0.2, "out");
  brush.fill("#f0dcbf", 160);
  brush.fillTexture(0.4, 0.3);
  brush.beginShape(0.2);
  brush.vertex(50, 100);
  brush.vertex(550, 80);
  brush.vertex(550, 500);
  brush.vertex(50, 520);
  brush.endShape(true);
  brush.noWash();

  // Jagged charcoal rock formations
  brush.field("hand");
  brush.wiggle(4);
  brush.set("charcoal", "#3a3a3a", 1.8);
  brush.beginShape(0.3);
  brush.vertex(100, 150);
  brush.vertex(160, 130);
  brush.vertex(200, 180);
  brush.vertex(260, 140);
  brush.vertex(300, 190);
  brush.vertex(360, 150);
  brush.vertex(400, 200);
  brush.vertex(460, 160);
  brush.vertex(500, 220);
  brush.vertex(520, 400);
  brush.vertex(80, 410);
  brush.endShape(true);
  brush.noField();

  // Secondary rock layer with mass fill
  brush.mass("pastel", "#5d4d4d", {
    precision: 0.4,
    strength: 0.6,
    gradient: 0.4,
    outline: false
  });
  brush.beginShape(0.3);
  brush.vertex(200, 200);
  brush.vertex(300, 190);
  brush.vertex(380, 220);
  brush.vertex(420, 300);
  brush.vertex(350, 320);
  brush.vertex(280, 280);
  brush.vertex(220, 300);
  brush.endShape(true);
  brush.noMass();

  // Thin pen-drawn horizon line
  brush.set("pen", "#222", 0.6);
  brush.line(50, 300, 550, 300);

  noLoop();
}