function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("hand");
  brush.wiggle(4);

  // Loose contour with HB
  brush.set("HB", "#333", 1.2);
  brush.beginShape(0.4);
  brush.vertex(200, 300);
  brush.vertex(220, 250);
  brush.vertex(280, 230);
  brush.vertex(340, 280);
  brush.vertex(320, 340);
  brush.vertex(260, 360);
  brush.vertex(200, 300);
  brush.endShape(true);

  // Dynamic motion smudges with 2B and spray
  brush.set("2B", "#111", 2.0);
  brush.flowLine(340, 280, 60, 315);
  brush.flowLine(320, 340, 50, 300);
  brush.set("2B", "#111", 1.5);
  for (let i = 0; i < 8; i++) {
    const x = random(280, 350);
    const y = random(300, 380);
    brush.flowLine(x, y, random(20, 40), random(360));
  }

  // Massed charcoal fill for shadowed areas
  brush.mass("pastel", "#222", { strength: 0.8, precision: 0.3, gradient: 0.4, outline: false });
  brush.beginShape(0.3);
  brush.vertex(260, 360);
  brush.vertex(280, 320);
  brush.vertex(320, 340);
  brush.endShape(true);
  brush.noMass();

  // Light hatching with 2H for subtle form on limbs
  brush.hatchStyle("2H", "#666", 0.7);
  brush.hatch(9, 40, { rand: 0.1, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(220, 250);
  brush.vertex(240, 200);
  brush.vertex(260, 220);
  brush.vertex(240, 260);
  brush.endShape(true);
  brush.noHatch();

  // Final directional smudges with charcoal
  brush.set("charcoal", "#000", 2.2);
  brush.spline([[340, 280, 1.0], [380, 240, 0.6]], 0.3);
  brush.spline([[320, 340, 1.0], [360, 310, 0.5]], 0.3);

  brush.noField();
  noLoop();
}