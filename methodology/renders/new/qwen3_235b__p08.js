function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  // Foggy watercolor washes for the harbor
  brush.wash("#d4e1e8", 180);
  brush.fill("#b0c7d9", 160);
  brush.fillBleed(0.5, "out");
  brush.noStroke();
  brush.beginShape(0.3);
  brush.vertex(0, 300);
  brush.vertex(600, 320);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  
  // Distant hills with soft bleed
  brush.wash("#8baaa0", 140);
  brush.fill("#a3c4b6", 130);
  brush.fillBleed(0.4, "out");
  brush.beginShape(0.2);
  brush.vertex(0, 300);
  brush.vertex(200, 200);
  brush.vertex(400, 230);
  brush.vertex(600, 190);
  brush.vertex(600, 320);
  brush.vertex(0, 300);
  brush.endShape(true);
  
  // Fog layers with subtle texture
  brush.fill("#e6edf0", 90);
  brush.fillTexture(0.4, 0.2);
  brush.beginShape(0.1);
  brush.vertex(0, 180);
  brush.vertex(600, 160);
  brush.vertex(600, 240);
  brush.vertex(0, 260);
  brush.endShape(true);
  
  // Masts and rigging with faint graphite lines
  brush.set("2H", "#666", 0.6);
  brush.line(150, 100, 150, 400);
  brush.line(170, 120, 170, 380);
  brush.line(400, 90, 400, 420);
  brush.line(420, 110, 420, 400);
  
  // Ropes and rigging details
  brush.set("HB", "#555", 0.5);
  brush.spline([[150, 150], [180, 200], [150, 250]], 0.6);
  brush.spline([[170, 180], [200, 230], [170, 280]], 0.6);
  brush.spline([[400, 130], [370, 180], [400, 230]], 0.6);
  brush.spline([[420, 160], [390, 210], [420, 260]], 0.6);
  
  // Distant boat silhouettes
  brush.set("2B", "#444", 0.7);
  brush.spline([[100, 400], [180, 390], [220, 410]], 0.2);
  brush.spline([[350, 420], [420, 410], [460, 430]], 0.2);
  
  // Soft spray for fog effect near water
  brush.field("hand");
  brush.wiggle(2);
  brush.set("spray", "#d4e1e8", 1.8);
  for (let i = 0; i < 50; i++) {
    const x = random(width);
    const y = random(500, 600);
    const len = random(20, 60);
    brush.flowLine(x, y, len, random(160, 200));
  }
  brush.noField();
  
  // Final subtle texture on water
  brush.hatchStyle("2H", "#a0b8c8", 0.4);
  brush.hatch(8, 0, { rand: 0.1 });
  brush.beginShape(0.1);
  brush.vertex(0, 300);
  brush.vertex(600, 320);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();
  
  noLoop();
}