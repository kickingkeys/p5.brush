function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  
  // Define forest zones with varying hatch density
  const zones = [
    { x: 100, y: 100, w: 150, h: 150, type: 'trunk', angle: 45 },
    { x: 300, y: 120, w: 180, h: 130, type: 'shadow', angle: 120 },
    { x: 200, y: 300, w: 220, h: 180, type: 'undergrowth', angle: 75 },
    { x: 50, y: 350, w: 120, h: 100, type: 'trunk', angle: 135 },
    { x: 400, y: 380, w: 140, h: 110, type: 'shadow', angle: 30 }
  ];
  
  // Draw each zone with appropriate hatching
  for (let zone of zones) {
    if (zone.type === 'trunk') {
      // Trunks - medium density vertical rhythm
      brush.hatchStyle("rotring", "#000", 0.4);
      brush.hatch(6, zone.angle, { rand: 0.1, continuous: true });
      brush.rect(zone.x, zone.y, zone.w, zone.h, "corner");
      
      // Add secondary cross-hatch for bark texture
      brush.hatch(8, (zone.angle + 90) % 180, { rand: 0.08, continuous: true });
      brush.rect(zone.x + 20, zone.y + 20, zone.w - 40, zone.h - 40, "corner");
      
    } else if (zone.type === 'shadow') {
      // Deep shadows - dense crosshatching
      brush.hatchStyle("2B", "#000", 0.8);
      brush.hatch(3, zone.angle, { rand: 0.15, continuous: true });
      brush.rect(zone.x, zone.y, zone.w, zone.h, "corner");
      
      brush.hatch(4, (zone.angle + 90) % 180, { rand: 0.12, continuous: true });
      brush.rect(zone.x + 15, zone.y + 15, zone.w - 30, zone.h - 30, "corner");
      
    } else if (zone.type === 'undergrowth') {
      // Undergrowth - complex layered hatching
      brush.hatchStyle("HB", "#000", 0.5);
      brush.hatch(5, zone.angle, { rand: 0.1, continuous: true });
      brush.rect(zone.x, zone.y, zone.w, zone.h, "corner");
      
      brush.hatch(7, (zone.angle + 60) % 180, { rand: 0.08, continuous: true });
      brush.rect(zone.x + 10, zone.y + 10, zone.w - 20, zone.h - 20, "corner");
      
      brush.hatch(9, (zone.angle + 120) % 180, { rand: 0.06, continuous: true });
      brush.rect(zone.x + 20, zone.y + 20, zone.w - 40, zone.h - 40, "corner");
    }
  }
  
  // Add random individual trunks as vertical hatch marks
  brush.hatchStyle("pen", "#000", 0.6);
  for (let i = 0; i < 25; i++) {
    const x = random(20, 580);
    const y = random(20, 580);
    const h = random(40, 120);
    
    brush.hatch(4, 90, { rand: 0.05 });
    brush.rect(x - 15, y, 30, h, "center");
  }
  
  // Add fine detail with 2H for distant texture
  brush.hatchStyle("2H", "#000", 0.3);
  brush.hatch(10, 45, { rand: 0.05, continuous: true });
  brush.rect(0, 0, width, height, "corner");
  
  // Final chaotic layer with cpencil at slight angle for organic feel
  brush.field("hand");
  brush.wiggle(2);
  brush.hatchStyle("cpencil", "#000", 0.4);
  brush.hatch(8, 65, { rand: 0.1 });
  brush.rect(20, 20, width - 40, height - 40, "corner");
  brush.noField();
  
  // Clean up states
  brush.noHatch();
  brush.noFill();
  
  noLoop();
}