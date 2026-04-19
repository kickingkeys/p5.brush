function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  
  // Define forest structure with overlapping hatched zones
  const zones = [
    { type: "distant", x: 100, y: 200, w: 120, h: 180, angle: 45, spacing: 6 },
    { type: "mid", x: 180, y: 180, w: 140, h: 220, angle: 60, spacing: 4 },
    { type: "foreground", x: 300, y: 160, w: 200, h: 260, angle: 75, spacing: 3 },
    { type: "shadow", x: 220, y: 200, w: 100, h: 180, angle: 120, spacing: 2 },
    { type: "undergrowth", x: 400, y: 300, w: 120, h: 120, angle: 30, spacing: 5 }
  ];
  
  // Draw each zone with dense cross-hatching at varying angles
  for (let zone of zones) {
    // Primary hatch direction
    brush.hatchStyle("rotring", "#000", 0.3);
    brush.hatch(zone.spacing, zone.angle, { rand: 0.05, continuous: true });
    brush.rect(zone.x, zone.y, zone.w, zone.h);
    brush.noHatch();
    
    // Cross-hatch for density
    brush.hatchStyle("rotring", "#000", 0.3);
    brush.hatch(zone.spacing * 1.4, zone.angle + 90, { rand: 0.05, continuous: true });
    brush.rect(zone.x, zone.y, zone.w, zone.h);
    brush.noHatch();
  }
  
  // Add vertical tree trunks with pen outlines
  brush.set("pen", "#000", 1.1);
  for (let i = 0; i < 15; i++) {
    const x = random(50, 550);
    const h = random(100, 200);
    brush.line(x, 400, x, 400 - h);
  }
  
  // Add organic clusters with cpencil for textured undergrowth
  brush.hatchStyle("cpencil", "#000", 0.6);
  for (let i = 0; i < 8; i++) {
    const x = random(100, 500);
    const y = random(350, 450);
    const r = random(30, 60);
    brush.hatch(4, random(0, 360), { rand: 0.1 });
    brush.circle(x, y, r);
    brush.noHatch();
  }
  
  // Reinforce darkest areas with 2B cross-hatching
  brush.hatchStyle("2B", "#000", 1.0);
  for (let zone of zones.filter(z => ["foreground", "shadow"].includes(z.type))) {
    brush.hatch(zone.spacing * 0.7, zone.angle, { rand: 0.08, continuous: true });
    brush.rect(zone.x, zone.y, zone.w, zone.h);
    brush.noHatch();
    
    brush.hatch(zone.spacing * 0.7, zone.angle + 90, { rand: 0.08, continuous: true });
    brush.rect(zone.x, zone.y, zone.w, zone.h);
    brush.noHatch();
  }
  
  // Final structural pen lines for depth
  brush.set("pen", "#000", 1.3);
  for (let i = 0; i < 8; i++) {
    const x1 = random(20, 580);
    const x2 = x1 + random(-80, 80);
    const y1 = random(100, 300);
    const y2 = y1 + random(40, 120);
    brush.spline([[x1, y1, 0.7], [x2, y2, 1.0]], 0.4);
  }
  
  noLoop();
}