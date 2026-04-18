function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Body outline - charcoal, slightly wobbly
  brush.set("charcoal", "#333", 1.2);
  brush.field("hand");
  brush.wiggle(2);
  brush.beginShape(0.3);
  brush.vertex(0, -100);
  brush.vertex(50, -150);
  brush.vertex(150, -100);
  brush.vertex(100, 50);
  brush.vertex(-50, 50);
  brush.vertex(-100, -50);
  brush.endShape(true);
  brush.noField();
  brush.noWiggle();
  
  // Leg - charcoal, lighter weight
  brush.set("charcoal", "#666", 0.8);
  brush.line(100, 50, 150, 150);
  
  // Arm - charcoal
  brush.set("charcoal", "#444", 1.0);
  brush.line(0, -100, -50, -50);
  

  // Smudge trails - spray, multiple passes for buildup
  let trailColor = "#333";
  let trailOpacity = 150;

  brush.set("spray", trailColor, 0.8);
  for (let i = 0; i < 30; i++) {
    brush.line(0, -100, -30, -150); //Arm trail
  }
  brush.set("spray", trailColor, 0.6);
    for (let i = 0; i < 40; i++) {
    brush.line(100, 50, 120, 170); //Leg trail
  }
  
  brush.set("spray", trailColor, 0.4);
    for (let i = 0; i < 50; i++) {
    brush.line(0, -100, -20, -180); //Arm trail
  }

  // Fill body - pastel, for slight texture
  brush.noStroke();
  brush.fill("#e0d0c0", 180);
  brush.beginShape(0.3);
  brush.vertex(0, -100);
  brush.vertex(50, -150);
  brush.vertex(150, -100);
  brush.vertex(100, 50);
  brush.vertex(-50, 50);
  brush.vertex(-100, -50);
  brush.endShape(true);
  
  noLoop();
}