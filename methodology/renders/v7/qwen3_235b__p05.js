function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noField();

  // Tree trunks - vertical rotring lines
  brush.hatchStyle("rotring", "#000", 0.8);
  for (let x = 50; x < width; x += 25) {
    brush.hatch(8, 90, { rand: 0.1, continuous: false });
    brush.beginShape(0.2);
    brush.vertex(x, 100);
    brush.vertex(x + random(-2, 2), 480 + random(-10, 10));
    brush.endShape(false);
    brush.noHatch();
  }

  // Undergrowth - dense cross-hatching with 2B and HB
  brush.wiggle(2);
  brush.field("hand");

  // Lower section - dense undergrowth
  for (let y = 350; y < height - 50; y += 40) {
    // Horizontal layer
    brush.hatchStyle("2B", "#000", 1.4);
    brush.hatch(3, 0, { rand: 0.15, continuous: true });
    brush.beginShape(0.3);
    for (let x = 40; x < width - 40; x += 30) {
      brush.vertex(x + random(-15, 15), y + random(-10, 10));
    }
    brush.endShape(false);
    brush.noHatch();

    // Diagonal layer
    brush.hatchStyle("HB", "#000", 1.1);
    brush.hatch(4, 45, { rand: 0.12, continuous: true });
    brush.beginShape(0.3);
    for (let x = 40; x < width - 40; x += 30) {
      brush.vertex(x + random(-15, 15), y + 20 + random(-10, 10));
    }
    brush.endShape(false);
    brush.noHatch();
  }

  // Mid-layer thicket - crisscross pattern
  brush.wiggle(1.5);
  for (let i = 0; i < 15; i++) {
    const x = random(80, width - 80);
    const y = random(200, 400);
    const len = random(60, 120);
    
    brush.hatchStyle("2H", "#000", 0.7);
    brush.hatch(6, random(30, 60), { rand: 0.1 });
    brush.beginShape(0.4);
    brush.vertex(x, y);
    brush.vertex(x + cos(radians(45)) * len, y + sin(radians(45)) * len);
    brush.endShape(false);
    brush.noHatch();
  }

  // Shadow zones - deep crosshatching at base
  brush.wiggle(3);
  const shadowZones = [[150, 450], [300, 470], [450, 430]];
  for (const [cx, cy] of shadowZones) {
    // Vertical foundation
    brush.hatchStyle("2B", "#000", 1.6);
    brush.hatch(2, 90, { rand: 0.18, continuous: true });
    brush.beginShape(0.2);
    brush.vertex(cx - 30, cy - 10);
    brush.vertex(cx - 20, cy + 60);
    brush.vertex(cx + 20, cy + 60);
    brush.vertex(cx + 30, cy - 10);
    brush.endShape(true);
    brush.noHatch();
    
    // Cross layer
    brush.hatchStyle("HB", "#000", 1.3);
    brush.hatch(3, 135, { rand: 0.15, continuous: true });
    brush.beginShape(0.2);
    brush.vertex(cx - 30, cy - 10);
    brush.vertex(cx - 20, cy + 60);
    brush.vertex(cx + 20, cy + 60);
    brush.vertex(cx + 30, cy - 10);
    brush.endShape(true);
    brush.noHatch();
  }

  // Final contour and depth lines
  brush.set("pen", "#000", 1.6);
  const contours = [
    [[100, 150], [120, 280], [110, 400]],
    [[200, 130], [230, 300], [210, 450]],
    [[350, 140], [370, 290], [360, 420]],
    [[480, 160], [490, 310], [470, 440]]
  ];
  
  for (const pts of contours) {
    const points = pts.map(p => [p[0] + random(-8, 8), p[1] + random(-5, 5)]);
    brush.spline(points, 0.3);
  }

  noLoop();
}