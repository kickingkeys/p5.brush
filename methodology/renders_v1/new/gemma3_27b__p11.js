function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Rectangle 1
  brush.set("2B", "#333", 1.2);
  brush.rect(50, 50, 150, 100, "center");

  // Rectangle 2
  brush.set("HB", "#555", 1.0);
  brush.rect(-50, -50, 120, 80, "center");

  // Rectangle 3 - Colored Pencil
  brush.set("cpencil", "#a67b5b", 0.8);
  brush.rect(150, -100, 80, 120, "center");

  // Hatching on Rectangle 1
  brush.hatchStyle("2H", "#666", 0.5);
  brush.hatch(5, 45, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(50 + 75, 50 + 50);
  brush.vertex(-50 + 75, 50 + 50);
  brush.vertex(-50 + 75, -50 + 50);
  brush.vertex(50 + 75, -50 + 50);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Charcoal Outline on Rectangle 2
  brush.set("charcoal", "#222", 1.5);
  brush.beginShape();
  brush.vertex(-50 + 60, -50 + 40);
  brush.vertex(50 + 60, -50 + 40);
  brush.vertex(50 + 60, 50 + 40);
  brush.vertex(-50 + 60, 50 + 40);
  brush.endShape(CLOSE);

  // Pastel fill on Rectangle 3
  brush.noStroke();
  brush.mass("pastel", "#f0e68c", { strength: 0.6, precision: 0.4 });
  brush.beginShape();
  brush.vertex(150 + 40, -100 + 60);
  brush.vertex(150 - 40, -100 + 60);
  brush.vertex(150 - 40, -100 - 60);
  brush.vertex(150 + 40, -100 - 60);
  brush.endShape(CLOSE);
  brush.noMass();

  noLoop();
}