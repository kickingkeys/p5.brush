function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width/2, -height/2);
  background("#fffaf3");
  
  brush.field("hand");
  brush.wiggle(4);
  
  // Loose gesture of dancer mid-leap with trailing smudges
  brush.mass("pastel", "#332222", { strength: 0.6, precision: 0.4, gradient: 0.5, outline: false });
  const body = [];
  for (let a = 0; a < 36; a++) {
    const angle = (a / 36) * TWO_PI;
    const radius = a < 18 ? 
      120 + noise(cos(angle) * 0.2, sin(angle) * 0.2) * 60 : 
      80 + noise(cos(angle) * 0.2, sin(angle) * 0.2) * 40;
    const x = 300 + cos(angle) * radius;
    const y = 280 + sin(angle) * radius;
    body.push([x, y]);
  }
  brush.beginShape(0.3);
  for (const [x, y] of body) {
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noMass();
  
  // Dynamic trailing smudges
  brush.set("charcoal", "#554444", 1.8);
  for (let i = 0; i < 15; i++) {
    const offset = random(-40, -10);
    brush.flowLine(300 + offset, 280 + offset * 0.5, random(60, 120), random(200, 260));
  }
  
  // Light structural lines with HB
  brush.set("HB", "#222", 0.7);
  brush.spline([
    [300, 180],
    [310, 240],
    [330, 270],
    [350, 300],
    [360, 330]
  ], 0.4);
  
  brush.spline([
    [300, 180],
    [290, 240],
    [270, 270],
    [250, 300],
    [240, 330]
  ], 0.4);
  
  // Arm gestures with 2B
  brush.set("2B", "#111", 1.2);
  brush.spline([
    [330, 270, 0.5],
    [380, 240, 0.8],
    [410, 220, 1.0]
  ], 0.5);
  
  brush.spline([
    [270, 270, 0.5],
    [220, 240, 0.7],
    [190, 230, 0.9]
  ], 0.5);
  
  brush.noField();
  noLoop();
}