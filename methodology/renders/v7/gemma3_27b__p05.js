function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Tree trunks (charcoal + pen)
  brush.set("charcoal", "#333", 1.5);
  brush.beginShape();
  brush.vertex(100, 0);
  brush.vertex(100, 200);
  brush.vertex(120, 200);
  brush.vertex(120, 0);
  brush.endShape(CLOSE);

  brush.set("pen", "#000", 0.8);
  brush.beginShape();
  brush.vertex(100, 0);
  brush.vertex(100, 200);
  brush.vertex(120, 200);
  brush.vertex(120, 0);
  brush.endShape(CLOSE);

  // Undergrowth (crayon + pastel)
  brush.mass("crayon", "#556b2f", { strength: 0.5, precision: 0.3 });
  brush.beginShape();
  brush.vertex(200, 50);
  brush.vertex(250, 100);
  brush.vertex(220, 150);
  brush.vertex(180, 100);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.mass("pastel", "#8fbc8f", {strength: 0.4, precision: 0.4});
    brush.beginShape();
    brush.vertex(200, -50);
    brush.vertex(250, 0);
    brush.vertex(220, 50);
    brush.vertex(180, 0);
    brush.endShape(CLOSE);
  brush.noMass();

  // Shadows (2B pencil hatching)
  brush.hatchStyle("2B", "#333", 0.7);
  brush.hatch(3, 45, {rand: 0.05});
  brush.beginShape();
  brush.vertex(50, 50);
  brush.vertex(150, 50);
  brush.vertex(150, 150);
  brush.vertex(50, 150);
  brush.endShape(CLOSE);
  brush.noHatch();
  
  // More shadows (HB pen)
  brush.hatchStyle("pen", "#000", 0.4);
  brush.hatch(4, 135, {rand: 0.1});
  brush.beginShape();
    brush.vertex(300, 50);
    brush.vertex(400, 50);
    brush.vertex(400, 150);
    brush.vertex(300, 150);
    brush.endShape(CLOSE);
  brush.noHatch();

  // Scattered marks
  brush.set("spray", "#696969", 0.5);
  for(let i = 0; i < 20; i++){
    brush.flowLine(random(0, 600), random(0, 600), random(20,50), 0);
  }

  
  noLoop();
}