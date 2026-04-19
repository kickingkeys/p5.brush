function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  // Set up muted earth tone palette
  const colors = {
    light: "#d4a574",
    mid: "#b88d6a",
    dark: "#8c6b4d",
    accent: "#a67c52"
  };
  
  // Define rectangle parameters
  const rects = [
    { x: 80, y: 100, w: 440, h: 120, angle: 0 },
    { x: 120, y: 200, w: 360, h: 280, angle: 15 },
    { x: 200, y: 150, w: 200, h: 320, angle: -10 },
    { x: 280, y: 80, w: 240, h: 180, angle: 5 }
  ];
  
  // Draw hatched rectangles with varying density and tones
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const isDark = i % 2 === 0;
    const rectColor = isDark ? colors.dark : colors.mid;
    const accentColor = colors.accent;
    
    push();
    translate(r.x + r.w/2, r.y + r.h/2);
    rotate(radians(r.angle));
    
    // Apply colored pencil hatching
    brush.hatchStyle("cpencil", rectColor, 0.7);
    brush.hatch(isDark ? 4 : 6, 45, { rand: 0.1 });
    brush.noStroke();
    brush.beginShape();
    brush.vertex(-r.w/2, -r.h/2);
    brush.vertex(r.w/2, -r.h/2);
    brush.vertex(r.w/2, r.h/2);
    brush.vertex(-r.w/2, r.h/2);
    brush.endShape(true);
    brush.noHatch();
    
    // Add secondary hatch layer at different angle
    brush.hatchStyle("cpencil", accentColor, 0.5);
    brush.hatch(isDark ? 5 : 7, 135, { rand: 0.08 });
    brush.beginShape();
    brush.vertex(-r.w/2 + 20, -r.h/2 + 20);
    brush.vertex(r.w/2 - 20, -r.h/2 + 20);
    brush.vertex(r.w/2 - 20, r.h/2 - 20);
    brush.vertex(-r.w/2 + 20, r.h/2 - 20);
    brush.endShape(true);
    brush.noHatch();
    
    pop();
  }
  
  // Add structural pen lines at intersections
  brush.set("pen", colors.dark, 1.2);
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    push();
    translate(r.x + r.w/2, r.y + r.h/2);
    rotate(radians(r.angle));
    brush.noFill();
    brush.rect(0, 0, r.w, r.h);
    brush.noStroke();
    pop();
  }
  
  // Add subtle rotring accents on some edges
  brush.set("rotring", colors.accent, 0.4);
  for (let i = 0; i < rects.length; i += 2) {
    const r = rects[i];
    push();
    translate(r.x + r.w/2, r.y + r.h/2);
    rotate(radians(r.angle));
    brush.line(-r.w/2 + 10, -r.h/2, r.w/2 - 10, -r.h/2);
    brush.line(r.w/2, -r.h/2 + 10, r.w/2, r.h/2 - 10);
    pop();
  }
  
  // Add light HB pencil texture in background zones
  brush.hatchStyle("HB", "#a88c73", 0.5);
  brush.hatch(8, 30, { rand: 0.15 });
  brush.beginShape();
  brush.vertex(50, 50);
  brush.vertex(250, 50);
  brush.vertex(200, 120);
  brush.vertex(60, 110);
  brush.endShape(true);
  brush.noHatch();
  
  noLoop();
}