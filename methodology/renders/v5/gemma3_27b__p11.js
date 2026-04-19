function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Rectangle 1
  brush.set("2B", "#443322", 1.2);
  brush.rect(50, 50, 150, 100);

  // Rectangle 2 (overlapping)
  brush.set("HB", "#664433", 0.8);
  brush.rect(100, 80, 120, 80);

  // Rectangle 3 (overlapping)
  brush.set("cpencil", "#a3886a", 0.6);
  brush.rect(70, 120, 100, 60);

  // Rectangle 4
  brush.set("rotring", "#222", 0.5);
  brush.rect(-50, -75, 80, 120);

  // Hatching on Rectangle 1
  brush.hatchStyle("2H", "#443322", 0.7);
  brush.hatch(3, 45, {rand: 0.05});
  brush.beginShape();
  brush.vertex(50, 50);
  brush.vertex(200, 50);
  brush.vertex(200, 150);
  brush.vertex(50, 150);
  brush.endShape(CLOSE);
  brush.noHatch();
  brush.noStroke();

  // Pastel fill on Rectangle 2
  brush.fill("#d9c1a7", 160);
  brush.mass("pastel", "#d9c1a7", {strength: 0.5, precision: 0.4});
  brush.beginShape();
  brush.vertex(100, 80);
  brush.vertex(220, 80);
  brush.vertex(220, 160);
  brush.vertex(100, 160);
  brush.endShape(CLOSE);
  brush.noMass();
  brush.noFill();

  // Charcoal strokes on Rectangle 3
  brush.set("charcoal", "#333", 0.9);
  brush.beginShape();
  brush.vertex(70, 120);
  brush.vertex(170, 120);
  brush.vertex(170, 180);
  brush.vertex(70, 180);
  brush.endShape(CLOSE);
  brush.noStroke();

  // Spray effect on Rectangle 4
  brush.set("spray", "#777", 0.8);
  for (let i = 0; i < 50; i++) {
      brush.flowLine(random(-50, 30), random(-75, 45), random(10, 20), 0);
  }

  noLoop();
}