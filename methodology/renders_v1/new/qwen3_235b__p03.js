function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("hand");
  brush.wiggle(5);
  
  // Loose charcoal contour and gesture
  brush.set("charcoal", "#1a1a1a", 1.8);
  brush.beginShape(0.3);
  brush.vertex(300, 100);
  brush.vertex(320, 200);
  brush.vertex(360, 220);
  brush.vertex(380, 280);
  brush.vertex(350, 350);
  brush.vertex(300, 400);
  brush.vertex(250, 380);
  brush.vertex(230, 320);
  brush.vertex(260, 250);
  brush.vertex(280, 200);
  brush.vertex(300, 100);
  brush.endShape(true);
  
  // Heavy smudges trailing behind motion
  brush.set("charcoal", "#555555", 2.5);
  brush.spline([[380, 280], [420, 320], [450, 350]], 0.4);
  brush.spline([[350, 350], [390, 380], [430, 400]], 0.5);
  brush.spline([[300, 400], [330, 430], [370, 450]], 0.4);
  brush.spline([[250, 380], [270, 420], [300, 460]], 0.5);
  
  // Mid-tone massing on torso and limbs
  brush.mass("pastel", "#333333", { strength: 0.7, precision: 0.4, outline: false });
  brush.beginShape(0.2);
  brush.vertex(320, 200);
  brush.vertex(360, 220);
  brush.vertex(350, 350);
  brush.vertex(300, 400);
  brush.vertex(250, 380);
  brush.vertex(230, 320);
  brush.vertex(260, 250);
  brush.vertex(280, 200);
  brush.endShape(true);
  brush.noMass();
  
  // Light hatching on limbs for form
  brush.hatchStyle("2H", "#666666", 0.7);
  brush.hatch(6, 45, { rand: 0.1 });
  brush.beginShape(0.2);
  brush.vertex(360, 220);
  brush.vertex(380, 280);
  brush.vertex(350, 350);
  brush.vertex(300, 400);
  brush.endShape(true);
  brush.noHatch();
  
  // Dynamic spray trail behind the leap
  brush.set("spray", "#888888", 2.0);
  for (let i = 0; i < 80; i++) {
    const x = random(380, 500);
    const y = random(150, 400);
    const len = random(20, 60);
    brush.flowLine(x, y, len, random(180, 270));
  }
  
  brush.noField();
  noLoop();
}