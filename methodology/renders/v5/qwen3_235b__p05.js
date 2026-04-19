function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.noFill();

  // Distant tree trunks - sparse vertical hatching
  brush.hatchStyle("2H", "#666", 0.6);
  brush.hatch(12, 90, { rand: 0.05 });
  brush.beginShape(0.2);
  brush.vertex(100, 50);
  brush.vertex(180, 50);
  brush.vertex(180, 400);
  brush.vertex(100, 400);
  brush.endShape(true);
  brush.noHatch();

  // Mid distance trees - denser hatching
  brush.hatchStyle("HB", "#333", 0.9);
  brush.hatch(6, 90, { rand: 0.07 });
  brush.beginShape(0.3);
  brush.vertex(220, 70);
  brush.vertex(280, 70);
  brush.vertex(280, 380);
  brush.vertex(220, 380);
  brush.endShape(true);
  brush.noHatch();

  // Foreground tree trunk - very dense
  brush.hatchStyle("2B", "#000", 1.2);
  brush.hatch(3, 90, { rand: 0.05 });
  brush.beginShape(0.3);
  brush.vertex(320, 100);
  brush.vertex(370, 90);
  brush.vertex(370, 350);
  brush.vertex(320, 360);
  brush.endShape(true);
  brush.noHatch();

  // Undergrowth layer - cross hatching at 45 degrees
  brush.hatchStyle("2H", "#444", 0.7);
  brush.hatch(8, 45, { rand: 0.08 });
  brush.hatch(9, 135, { rand: 0.08 });
  brush.beginShape(0.4);
  brush.vertex(50, 300);
  brush.vertex(550, 280);
  brush.vertex(550, 600);
  brush.vertex(50, 600);
  brush.endShape(true);
  brush.noHatch();

  // Deep shadow zones - cross hatching with 2B
  brush.hatchStyle("2B", "#000", 1.3);
  brush.hatch(4, 60, { rand: 0.06 });
  brush.hatch(5, 120, { rand: 0.07 });
  brush.beginShape(0.3);
  brush.vertex(400, 200);
  brush.vertex(550, 180);
  brush.vertex(550, 400);
  brush.vertex(400, 420);
  brush.endShape(true);
  brush.noHatch();

  // Organic tangle of foreground branches - freeform hatching
  brush.hatchStyle("HB", "#222", 0.8);
  brush.hatch(5, 30, { rand: 0.1 });
  brush.hatch(6, 110, { rand: 0.1 });
  brush.beginShape(0.5);
  brush.vertex(100, 400);
  brush.vertex(300, 380);
  brush.vertex(350, 550);
  brush.vertex(120, 580);
  brush.endShape(true);
  brush.noHatch();

  // Final pen outlines on key trunks for definition
  brush.set("pen", "#000", 1.5);
  brush.beginShape(0.3);
  brush.vertex(320, 100);
  brush.vertex(370, 90);
  brush.vertex(370, 350);
  brush.vertex(320, 360);
  brush.endShape(true);

  noLoop();
}