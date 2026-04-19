function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Overlapping spray-painted circles with varying weights and colors
  brush.set("spray", "#e8574c", 2.5);
  brush.flowLine(150, 150, 120, 0);
  brush.set("spray", "#4f8dc7", 2.2);
  brush.flowLine(200, 180, 100, 45);
  brush.set("spray", "#f2b84c", 2.0);
  brush.flowLine(250, 160, 110, 90);
  brush.set("spray", "#2a2a2a", 2.3);
  brush.flowLine(180, 220, 95, 135);

  // Drips - short downward lines with thin spray
  brush.set("spray", "#e8574c", 0.6);
  for (let i = 0; i < 8; i++) {
    const x = random(100, 300);
    const y = random(100, 300);
    brush.line(x, y, x + random(-3, 3), y + random(30, 80));
  }

  // Arrows / tags using splines
  brush.set("marker", "#2a2a2a", 1.8);
  const arrowPoints1 = [[350, 100], [400, 140, 0.7], [450, 120]];
  brush.spline(arrowPoints1, 0.4);

  brush.set("marker", "#4f8dc7", 1.6);
  const arrowPoints2 = [[380, 200], [420, 230, 0.6], [470, 210]];
  brush.spline(arrowPoints2, 0.4);

  // Ghosted hand-drawn marks with varying pressure
  brush.set("charcoal", "#666", 0.7);
  brush.spline([[100, 400, 0.5], [150, 420, 1.0], [200, 400, 0.6]], 0.3);

  brush.set("cpencil", "#884466", 0.8);
  brush.spline([[220, 410, 0.4], [260, 440, 0.9], [300, 420, 0.5]], 0.3);

  // Faint background hatching using rotring
  brush.hatchStyle("rotring", "#aaa", 0.3);
  brush.hatch(6, 15, { rand: 0.05, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(50, 500);
  brush.vertex(250, 550);
  brush.vertex(270, 520);
  brush.vertex(100, 510);
  brush.endShape(true);
  brush.noHatch();

  // Small fragmented pastel marks
  brush.set("pastel", "#cc5544", 1.0);
  brush.line(400, 300, 440, 320);

  brush.set("crayon", "#993344", 1.1);
  brush.line(410, 310, 450, 340);

  noLoop();
}