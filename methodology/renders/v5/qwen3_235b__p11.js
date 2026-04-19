function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  
  // Background hatching with earth tones
  let earthColors = ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#B8860B"];
  
  // Draw intersecting rectangles with hatching
  for (let i = 0; i < 8; i++) {
    let x = random(-50, 500);
    let y = random(-50, 500);
    let w = random(100, 400);
    let h = random(100, 400);
    
    // Choose random earth tone
    let color = random(earthColors);
    
    // Apply colored pencil hatching
    brush.hatchStyle("cpencil", color, random(0.6, 1.2));
    let angle = random([30, 60, 45, 90]);
    brush.hatch(random(4, 8), angle, { rand: random(0.05, 0.15), continuous: true });
    
    // Draw rectangle shape
    brush.rect(x, y, w, h);
    brush.noHatch();
    
    // Add structural lines with pen
    brush.set("pen", "#5D4037", random(0.8, 1.5));
    brush.rect(x, y, w, h);
    
    // Add some cross-hatching with darker pencil
    brush.hatchStyle("2B", "#5D4037", random(0.7, 1.0));
    brush.hatch(random(6, 10), angle + 90, { rand: 0.1, continuous: true });
    brush.rect(x, y, w, h);
    brush.noHatch();
  }
  
  // Add some foreground gestural lines with rotring
  brush.set("rotring", "#3E2723", random(1.0, 2.0));
  for (let i = 0; i < 12; i++) {
    let x1 = random(0, 600);
    let y1 = random(0, 600);
    let x2 = x1 + random(-150, 150);
    let y2 = y1 + random(-150, 150);
    brush.line(x1, y1, x2, y2);
  }
  
  // Add subtle spray texture in some areas
  brush.set("spray", "#8D6E63", 1.5);
  for (let i = 0; i < 6; i++) {
    let x = random(100, 500);
    let y = random(100, 500);
    for (let j = 0; j < 8; j++) {
      brush.flowLine(x + random(-40, 40), y + random(-40, 40), random(20, 60), random(360));
    }
  }
  
  // Add some pastel texture in selected areas
  brush.mass("pastel", "#BCAAA4", {
    precision: 0.6,
    strength: 0.5,
    gradient: 0.4
  });
  for (let i = 0; i < 4; i++) {
    let x = random(100, 500);
    let y = random(100, 500);
    let w = random(60, 120);
    let h = random(60, 120);
    brush.rect(x, y, w, h);
  }
  brush.noMass();
  
  noLoop();
}