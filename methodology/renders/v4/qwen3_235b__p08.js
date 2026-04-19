function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Soft watercolor washes for foggy harbor
  brush.noStroke();
  brush.fill("#d4a017", 45);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.6, 0.4);
  brush.circle(300, 200, 180);
  
  brush.fill("#6b7c93", 38);
  brush.fillBleed(0.6, "out");
  brush.circle(400, 350, 220);
  
  brush.fill("#9b8f80", 32);
  brush.fillBleed(0.4, "out");
  brush.circle(180, 400, 140);
  
  // Faint graphite lines for masts and ropes
  brush.set("2H", "#a0a0a0", 0.6);
  brush.line(280, 100, 280, 220);
  brush.line(320, 120, 320, 240);
  brush.line(360, 110, 360, 230);
  
  // Rope lines with slight variation
  brush.set("HB", "#888888", 0.4);
  brush.line(280, 220, 320, 240);
  brush.line(320, 240, 360, 230);
  brush.line(280, 200, 300, 260);
  brush.line(300, 260, 340, 250);
  
  // Subtle mast cross-lines
  brush.set("2B", "#666666", 0.5);
  brush.line(275, 140, 285, 140);
  brush.line(315, 160, 325, 160);
  brush.line(355, 150, 365, 150);
  
  noLoop();
}