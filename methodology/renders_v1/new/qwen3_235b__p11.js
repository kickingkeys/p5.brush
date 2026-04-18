function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("curved");
  brush.wiggle(1.5);

  // Large background planes with colored pencil hatching
  brush.hatchStyle("cpencil", "#b58c6f", 0.7);
  brush.hatch(12, 45, { rand: 0.08 });
  brush.beginShape();
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 300);
  brush.vertex(0, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#a39d75", 0.6);
  brush.hatch(10, -30, { rand: 0.06 });
  brush.beginShape();
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Mid-sized rectangles with pencil hatching
  brush.hatchStyle("2H", "#5c4a3d", 0.5);
  brush.hatch(8, 60, { rand: 0.05 });
  brush.beginShape();
  brush.vertex(100, 100);
  brush.vertex(500, 100);
  brush.vertex(500, 250);
  brush.vertex(100, 250);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#4a443f", 0.8);
  brush.hatch(5, 0, { rand: 0.07 });
  brush.beginShape();
  brush.vertex(150, 200);
  brush.vertex(450, 200);
  brush.vertex(450, 500);
  brush.vertex(150, 500);
  brush.endShape(true);
  brush.noHatch();

  // Smaller dark rectangle with dense 2B
  brush.hatchStyle("2B", "#30261d", 1.2);
  brush.hatch(3, 90, { rand: 0.08 });
  brush.beginShape();
  brush.vertex(350, 300);
  brush.vertex(550, 300);
  brush.vertex(550, 550);
  brush.vertex(350, 550);
  brush.endShape(true);
  brush.noHatch();

  // Structural lines with pen and rotring
  brush.set("pen", "#2a1f18", 1.1);
  brush.line(0, 300, 600, 300);
  brush.line(100, 0, 100, 600);

  brush.set("rotring", "#1a1a1a", 0.7);
  brush.line(500, 0, 500, 600);
  brush.line(0, 500, 600, 500);

  // Accent hatching with pastel and crayon
  brush.mass("pastel", "#c9a57c", { precision: 0.6, strength: 0.5, gradient: 0.2 });
  brush.circle(150, 150, 60);
  brush.noMass();

  brush.mass("crayon", "#8c6c54", { precision: 0.4, strength: 0.7 });
  brush.rect(400, 100, 120, 80, "corner");
  brush.noMass();

  brush.noField();
  noLoop();
}