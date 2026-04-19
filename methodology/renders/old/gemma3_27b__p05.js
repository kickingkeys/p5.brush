function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width/2, -height/2);

  // Tree trunks
  brush.set("charcoal", "#000", 0.8);
  brush.line(100, 100, 100, 300);
  brush.line(200, 150, 200, 350);
  brush.line(300, 80, 300, 280);
  brush.line(400, 120, 400, 320);
  brush.line(500, 180, 500, 380);

  // Tree branches + hatching
  brush.set("rotring", "#000", 0.5);
  brush.hatch(2, 45);
  brush.line(100, 200, 150, 150);
  brush.line(100, 250, 170, 280);
  brush.line(200, 250, 250, 200);
  brush.line(200, 300, 270, 330);
  brush.line(300, 180, 350, 130);
  brush.line(300, 230, 370, 260);
  brush.line(400, 220, 450, 170);
  brush.line(400, 270, 470, 300);
  brush.line(500, 280, 550, 230);
  brush.line(500, 330, 570, 360);
  brush.noHatch();

  // Undergrowth & Shadows
  brush.set("2B", "#000", 0.3);
  brush.noStroke();
  brush.fill("#000", 80);
  brush.circle(130, 310, 20);
  brush.circle(230, 360, 15);
  brush.circle(320, 290, 25);
  brush.circle(410, 330, 18);
  brush.circle(520, 390, 22);
  brush.noFill();

  brush.set("pastel", "#000", 0.4);
  brush.hatch(1.5, 135);
  brush.rect(50, 300, 100, 50);
  brush.rect(250, 350, 80, 40);
  brush.rect(350, 250, 70, 60);
  brush.rect(450, 300, 90, 50);
  brush.rect(550, 370, 60, 40);
  brush.noHatch();

  brush.set("crayon", "#000", 0.2);
  brush.noStroke();
  brush.fill("#000", 50);
  brush.circle(180, 380, 30);
  brush.circle(380, 320, 40);
  brush.noFill();

  brush.set("pen", "#000", 0.6);
  brush.line(50, 400, 550, 400);
  brush.line(50, 450, 550, 450);
  noLoop();
}