function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noStroke();
  
  // Base watercolor blooms with bleed and texture
  brush.fillTexture(0.7, 0.4);
  
  // First bloom - dusty pink
  brush.fill("#d46a6a", 180);
  brush.fillBleed(0.3, "out");
  brush.circle(300, 300, 120);
  
  // Second bloom - ochre, overlapping
  brush.fill("#cc9955", 160);
  brush.fillBleed(0.35, "out");
  brush.circle(350, 320, 100);
  
  // Third bloom - lighter pink
  brush.fill("#e08a8a", 140);
  brush.fillBleed(0.25, "out");
  brush.circle(270, 280, 90);
  
  // Fourth bloom - deeper ochre
  brush.fill("#b3860b", 130);
  brush.fillBleed(0.4, "out");
  brush.circle(320, 260, 110);
  
  // Add subtle directional strokes with cpencil for organic texture
  brush.set("cpencil", "#a64942", 0.8);
  brush.spline([[280, 250], [310, 290], [340, 270]], 0.4);
  
  brush.set("cpencil", "#997733", 0.7);
  brush.spline([[330, 310], [360, 340], [380, 320]], 0.3);
  
  // Soft spray overlay for atmospheric effect
  brush.field("curved");
  brush.set("spray", "#d46a6a", 1.2);
  for (let i = 0; i < 20; i++) {
    const angle = random(360);
    const x = 300 + cos(radians(angle)) * 40;
    const y = 300 + sin(radians(angle)) * 40;
    brush.flowLine(x, y, random(15, 35), random(360));
  }
  
  brush.set("spray", "#cc9955", 1.0);
  for (let i = 0; i < 15; i++) {
    const angle = random(360);
    const x = 350 + cos(radians(angle)) * 30;
    const y = 320 + sin(radians(angle)) * 30;
    brush.flowLine(x, y, random(10, 25), random(360));
  }
  brush.noField();
  
  noLoop();
}