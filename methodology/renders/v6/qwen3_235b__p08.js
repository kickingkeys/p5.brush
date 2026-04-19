function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  // Foggy watercolor sky base
  brush.noStroke();
  brush.fill("#e6f0ff", 180);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.4, 0.3);
  brush.rect(0, 0, 600, 300);
  
  // Soft watercolor harbor water
  brush.fill("#d4e6f2", 160);
  brush.fillBleed(0.4, "out");
  brush.rect(0, 300, 600, 300);
  
  // Distant silhouettes with soft watercolor wash
  brush.wash("#6b7a9f", 200);
  brush.rect(100, 280, 400, 60);
  brush.wash("#5a6a8a", 210);
  brush.rect(150, 310, 300, 80);
  
  // Faint masts and rigging with graphite pencils
  brush.set("2H", "#999", 0.6);
  // Masts
  brush.line(200, 250, 200, 350);
  brush.line(300, 240, 300, 360);
  brush.line(400, 260, 400, 340);
  // Cross rigging
  brush.set("2H", "#aaa", 0.4);
  brush.line(190, 300, 210, 300);
  brush.line(290, 310, 310, 310);
  brush.line(390, 300, 410, 300);
  
  // Subtle ropes and deck lines
  brush.set("HB", "#777", 0.5);
  brush.spline([[180, 350], [220, 370], [260, 360]], 0.3);
  brush.spline([[280, 360], [320, 380], [360, 370]], 0.3);
  brush.spline([[380, 350], [420, 370], [460, 360]], 0.3);
  
  // Faint anchor points and texture
  brush.set("2B", "#555", 0.4);
  brush.hatch(8, 90, { rand: 0.1 });
  brush.rect(190, 345, 20, 10);
  brush.hatch(8, 0, { rand: 0.1 });
  brush.rect(290, 355, 20, 10);
  brush.hatch(8, 90, { rand: 0.1 });
  brush.rect(390, 345, 20, 10);
  
  brush.noFill();
  brush.noHatch();
  brush.noStroke();
  
  noLoop();
}