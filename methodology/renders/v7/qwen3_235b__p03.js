function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.field("hand");
  brush.wiggle(4);
  
  // Loose charcoal gesture for dancer's form
  brush.set("charcoal", "#000", 2.0);
  brush.spline([
    [300, 200, 1.0], [320, 240, 0.8], [350, 280, 1.2], [370, 320, 1.0], 
    [360, 360, 0.7], [340, 380, 0.9], [320, 360, 1.1], [300, 340, 0.8]
  ], 0.6);
  
  // Trailing smudge with spray effect
  brush.set("spray", "#333", 3.5);
  for (let i = 0; i < 25; i++) {
    const x = 300 + random(-40, 20);
    const y = 340 + random(-10, 40);
    brush.flowLine(x, y, random(15, 40), random(180, 270));
  }
  
  // Light structural hints with HB
  brush.set("HB", "#444", 0.8);
  brush.spline([[300, 200], [280, 260], [270, 300]], 0.4);
  brush.spline([[300, 340], [290, 380], [285, 420]], 0.5);
  
  // Dynamic arcs for motion energy
  brush.set("2B", "#222", 1.5);
  for (let a = 0; a < 2; a++) {
    brush.arc(300, 300, 80 + a * 30, 0 + a * PI/3, PI + a * PI/3);
  }
  
  // Soft pastel fill for implied volume zones
  brush.mass("pastel", "#555", {
    strength: 0.6,
    precision: 0.4,
    gradient: 0.5,
    outline: false
  });
  brush.beginShape(0.3);
  brush.vertex(320, 280);
  brush.vertex(350, 320);
  brush.vertex(330, 350);
  brush.vertex(300, 340);
  brush.endShape(true);
  brush.noMass();
  
  // Flowing contour extensions
  brush.set("charcoal", "#111", 1.8);
  brush.spline([[370, 320], [400, 340], [420, 370]], 0.7);
  brush.spline([[340, 380], [360, 410], [380, 430]], 0.6);
  
  brush.noField();
  noLoop();
}