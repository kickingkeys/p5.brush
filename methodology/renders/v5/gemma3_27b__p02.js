function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Grass stalk 1
  brush.set("2B", "#333", 0.8);
  brush.line(100, 200, 100, 300);

  // Grass stalk 2
  brush.set("2B", "#333", 0.7);
  brush.line(150, 220, 150, 280);

  // Seed head 1
  brush.set("HB", "#444", 0.6);
  brush.circle(100, 300, 15);

  // Seed head 2
  brush.set("HB", "#444", 0.5);
  brush.circle(150, 280, 12);

  // Fine details - hatching
  brush.hatchStyle("2H", "#666", 0.4);
  brush.hatch(3, 45, { rand: 0.05, continuous: true });
  brush.beginShape();
  brush.vertex(100, 200);
  brush.vertex(105, 210);
  brush.vertex(95, 210);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Seed head shadow - charcoal
  brush.set("charcoal", "#222", 0.5);
  brush.circle(100, 300, 8);

  // Additional blades of grass
  brush.set("2B", "#333", 0.6);
  brush.line(200, 230, 200, 270);
  brush.line(250, 210, 250, 250);

  // More seed heads
  brush.set("HB", "#444", 0.4);
  brush.circle(200, 270, 10);
  brush.circle(250, 250, 9);
  
  noLoop();
}