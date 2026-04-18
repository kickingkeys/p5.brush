function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  // Foggy dawn watercolor washes
  brush.noStroke();
  brush.wash("#e0f5ff", 180);
  brush.fill("#d0ebff", 160);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.6, 0.3);
  brush.rect(0, 300, 600, 300);
  
  brush.wash("#f0e6ff", 140);
  brush.fill("#e8d9ff", 120);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.7, 0.4);
  brush.rect(0, 200, 600, 150);
  
  brush.wash("#fff0e0", 160);
  brush.fill("#ffe8cc", 130);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.5, 0.2);
  brush.circle(300, 80, 120);
  
  // Faint graphite pencil lines for masts and ropes
  brush.set("2H", "#888", 0.6);
  for (let i = 0; i < 12; i++) {
    const x = 50 + i * 45;
    const height = 100 + random(30);
    brush.line(x, 400, x, 400 - height);
    
    // Ropes
    const mastTop = 400 - height;
    brush.spline([
      [x, mastTop],
      [x + random(20, 40), mastTop + random(20, 40)],
      [x + random(40, 70), 420 + random(10)]
    ], 0.3);
  }
  
  // Slightly stronger lines for main masts
  brush.set("HB", "#555", 0.8);
  brush.line(150, 400, 150, 280);
  brush.line(450, 400, 450, 260);
  brush.line(300, 400, 300, 240);
  
  // Connecting rigging
  brush.spline([[150, 290], [220, 320], [300, 250]], 0.4);
  brush.spline([[300, 250], [380, 290], [450, 270]], 0.4);
  
  // Distant boats
  brush.set("2H", "#aaa", 0.5);
  for (let i = 0; i < 8; i++) {
    const x = 30 + i * 70;
    const y = 380 + random(10);
    brush.rect(x, y, 40, 10);
    brush.line(x + 20, y, x + 20, y - 15 - random(10));
  }
  
  noLoop();
}