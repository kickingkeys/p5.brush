function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.noFill();
  brush.noWash();
  brush.noMass();

  // Background hatching with colored pencil
  brush.hatchStyle("cpencil", "#a67c52", 0.7);
  brush.hatch(8, 15, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(50, 50);
  brush.vertex(550, 50);
  brush.vertex(550, 300);
  brush.vertex(50, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#c49a6c", 0.6);
  brush.hatch(7, 75, { rand: 0.12, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(150, 100);
  brush.vertex(500, 120);
  brush.vertex(500, 400);
  brush.vertex(150, 380);
  brush.endShape(true);
  brush.noHatch();

  // Mid-ground rectangles with pen and pencil
  brush.hatchStyle("pen", "#5d4037", 0.4);
  brush.hatch(5, 45, { rand: 0.05, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(100, 200);
  brush.vertex(400, 180);
  brush.vertex(400, 350);
  brush.vertex(100, 370);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#6d4c41", 0.8);
  brush.hatch(6, 105, { rand: 0.08, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(200, 150);
  brush.vertex(480, 160);
  brush.vertex(480, 320);
  brush.vertex(200, 310);
  brush.endShape(true);
  brush.noHatch();

  // Foreground structural lines with rotring
  brush.set("rotring", "#3e2723", 1.2);
  brush.line(80, 400, 520, 410);
  brush.line(80, 400, 80, 520);
  brush.line(520, 410, 520, 530);
  brush.line(80, 520, 520, 530);

  // Additional cross-hatching in dark areas
  brush.hatchStyle("2B", "#4e342e", 1.0);
  brush.hatch(4, 25, { rand: 0.1 });
  brush.hatch(4, 115, { rand: 0.1 });
  brush.beginShape(0.1);
  brush.vertex(300, 420);
  brush.vertex(500, 430);
  brush.vertex(500, 510);
  brush.vertex(300, 500);
  brush.endShape(true);
  brush.noHatch();

  // Accent hatching with pastel for warmth
  brush.hatchStyle("pastel", "#bcaaa4", 0.5);
  brush.hatch(10, 60, { rand: 0.15 });
  brush.beginShape(0.1);
  brush.vertex(350, 100);
  brush.vertex(450, 110);
  brush.vertex(450, 250);
  brush.vertex(350, 240);
  brush.endShape(true);
  brush.noHatch();

  // Final contour with HB pencil
  brush.set("HB", "#5d4037", 1.0);
  brush.rect(100, 100, 300, 200, "corner");
  brush.rect(180, 180, 320, 180, "corner");

  brush.noStroke();
  brush.noHatch();
  noLoop();
}