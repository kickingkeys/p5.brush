function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.set("rotring", "black", 1);
  brush.noFill();
  
  // Tree trunks
  for (let i = 0; i < 15; i++) {
    const x = random(50, 550);
    const y = random(100, 500);
    const w = random(10, 25);
    const h = random(150, 300);
    
    brush.hatch(3, 90, { rand: 0.2, gradient: 0.4 });
    brush.rect(x, y, w, h, "center");
  }
  
  // Undergrowth clusters
  for (let i = 0; i < 20; i++) {
    const x = random(20, 580);
    const y = random(400, 580);
    const size = random(40, 100);
    
    brush.hatch(2.5, random(0, 360), { rand: 0.3, continuous: true });
    brush.circle(x, y, size, 0.3);
  }
  
  // Shadow layers with dense crosshatching
  for (let i = 0; i < 8; i++) {
    const x = random(30, 500);
    const y = random(80, 400);
    const w = random(80, 180);
    const h = random(60, 120);
    
    // Vertical hatching
    brush.hatch(4, 90, { rand: 0.1 });
    brush.rect(x, y, w, h, "corner");
    
    // Horizontal hatching
    push();
    brush.hatch(4, 0, { rand: 0.1 });
    brush.rect(x, y, w, h, "corner");
    pop();
  }
  
  // Add subtle texture with fine diagonal hatching
  for (let i = 0; i < 12; i++) {
    const x = random(0, 600);
    const y = random(0, 600);
    const w = random(100, 300);
    const h = random(100, 300);
    
    brush.hatch(6, 45, { rand: 0.15 });
    brush.rect(x, y, w, h, "corner");
    
    brush.hatch(6, 135, { rand: 0.15 });
    brush.rect(x, y, w, h, "corner");
  }
  
  // Final abstract dense patches
  const denseAreas = [
    { x: 100, y: 150, w: 120, h: 100 },
    { x: 400, y: 100, w: 100, h: 140 },
    { x: 250, y: 350, w: 150, h: 120 }
  ];
  
  for (const area of denseAreas) {
    brush.hatch(2, 90, { rand: 0.1, gradient: 0.6 });
    brush.rect(area.x, area.y, area.w, area.h, "corner");
    
    push();
    brush.hatch(2, 0, { rand: 0.1, gradient: 0.6 });
    brush.rect(area.x, area.y, area.w, area.h, "corner");
    pop();
    
    push();
    brush.hatch(3, 45, { rand: 0.1 });
    brush.rect(area.x, area.y, area.w, area.h, "corner");
    pop();
    
    push();
    brush.hatch(3, 135, { rand: 0.1 });
    brush.rect(area.x, area.y, area.w, area.h, "corner");
    pop();
  }
  
  noLoop();
}