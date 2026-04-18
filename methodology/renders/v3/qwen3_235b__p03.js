function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("hand");
  brush.wiggle(4);
  
  // Loose gesture of dancer mid-leap with trailing smudges
  // Charcoal body and limbs
  brush.set("charcoal", "#2a2a2a", 2.0);
  brush.strokeWeight(2.8);
  brush.spline([
    [280, 180], [300, 200, 1.8], [320, 240, 1.2], [330, 280, 0.8], [325, 320, 1.5], [310, 360]
  ], 0.6);
  
  brush.set("charcoal", "#333", 1.8);
  brush.spline([
    [300, 200], [270, 230, 1.6], [250, 270, 1.0], [240, 310]
  ], 0.5);
  
  brush.set("charcoal", "#444", 1.5);
  brush.spline([
    [320, 240], [350, 220, 1.7], [380, 210, 1.3], [400, 205]
  ], 0.6);
  
  // Trailing smudges and motion blur
  brush.set("spray", "#1f1f1f", 1.8);
  for (let i = 0; i < 12; i++) {
    const offset = random(-20, 20);
    brush.flowLine(300 + offset, 280, random(40, 90), random(180, 300));
  }
  
  brush.set("spray", "#2a2a2a", 1.2);
  for (let i = 0; i < 10; i++) {
    const offset = random(-15, 15);
    brush.flowLine(250 + offset, 300, random(25, 60), random(200, 320));
  }
  
  // Lighter structural lines with HB
  brush.set("HB", "#555", 1.0);
  brush.strokeWeight(1.2);
  brush.line(300, 200, 310, 360);
  brush.line(300, 200, 270, 230);
  brush.line(300, 200, 350, 220);
  
  // Pastel for soft volume hints
  brush.mass("pastel", "#3a3a3a", {
    strength: 0.5,
    precision: 0.6,
    gradient: 0.4
  });
  let legShape = [];
  for (let a = 0; a < 18; a++) {
    const angle = (a / 18) * TWO_PI;
    const radius = a < 9 ? 15 + random(-3, 3) : 25 + random(-4, 4);
    const x = 310 + cos(angle) * 10 + (a >= 9 ? 15 : 0);
    const y = 320 + sin(angle) * radius;
    legShape.push([x, y]);
  }
  brush.polygon(legShape);
  brush.noMass();
  
  // Light accents with 2H
  brush.hatchStyle("2H", "#888", 0.8);
  brush.hatch(10, 45, { rand: 0.1, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(290, 210);
  brush.vertex(280, 230);
  brush.vertex(290, 250);
  brush.vertex(300, 240);
  brush.endShape(true);
  brush.noHatch();
  
  brush.noField();
  noLoop();
}