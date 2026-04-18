function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("hand");
  brush.wiggle(5);
  
  // Loose gesture of dancer mid-leap with trailing smudges
  brush.set("charcoal", "#1a1a1a", 2.8);
  brush.spline([
    [200, 400], [220, 350, 1.8], [260, 300, 2.4], [300, 260, 3.0], 
    [340, 240, 2.6], [380, 250, 2.0], [400, 280, 1.5]
  ], 0.6);
  
  // Arm extension with fading weight
  brush.set("charcoal", "#333", 1.6);
  brush.spline([
    [260, 300], [290, 260, 1.4], [320, 230, 1.0], [340, 210, 0.7]
  ], 0.5);
  
  // Trailing smudge from leg
  brush.set("charcoal", "#444", 1.2);
  for (let i = 0; i < 15; i++) {
    const x = random(180, 210);
    const y = random(410, 440);
    brush.line(200, 400, x, y);
  }
  
  // Light contour with 2B for depth
  brush.set("2B", "#555", 0.8);
  brush.spline([
    [300, 260], [320, 270], [330, 290], [325, 310], 
    [310, 330], [290, 340], [270, 350]
  ], 0.4);
  
  // Fill body zone with pastel for textured mass
  brush.mass("pastel", "#222", {
    strength: 0.6,
    precision: 0.4,
    gradient: 0.5,
    outline: false
  });
  brush.beginShape(0.3);
  brush.vertex(260, 300);
  brush.vertex(300, 260);
  brush.vertex(320, 270);
  brush.vertex(330, 290);
  brush.vertex(325, 310);
  brush.vertex(310, 330);
  brush.vertex(290, 340);
  brush.vertex(270, 350);
  brush.endShape(true);
  brush.noMass();
  
  // Directional spray behind for motion blur
  brush.set("spray", "#000", 2.0);
  for (let i = 0; i < 25; i++) {
    brush.flowLine(
      random(150, 250), random(350, 450),
      random(20, 60), random(200, 250)
    );
  }
  
  brush.noField();
  noLoop();
}