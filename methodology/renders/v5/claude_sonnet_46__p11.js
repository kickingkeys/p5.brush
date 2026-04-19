function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  angleMode(DEGREES);

  // Define a palette of muted earth tones for cpencil
  const earthTones = [
    "#7a5c3a",
    "#5a7a6a",
    "#8a7a4a",
    "#6a4a3a",
    "#4a6a5a",
    "#9a8a6a",
    "#7a6a8a",
    "#5a4a6a",
    "#8a6a5a",
    "#3a5a4a"
  ];

  // Define rectangles inspired by Diebenkorn's Ocean Park series
  // Large overlapping planes that divide the canvas
  const rects = [
    { x: 0,   y: 0,   w: 360, h: 220 },
    { x: 280, y: 0,   w: 320, h: 180 },
    { x: 0,   y: 180, w: 200, h: 260 },
    { x: 160, y: 140, w: 280, h: 200 },
    { x: 380, y: 150, w: 220, h: 280 },
    { x: 0,   y: 400, w: 320, h: 200 },
    { x: 280, y: 380, w: 180, h: 220 },
    { x: 420, y: 390, w: 180, h: 210 },
    { x: 100, y: 320, w: 320, h: 160 },
    { x: 50,  y: 50,  w: 180, h: 280 },
    { x: 300, y: 260, w: 260, h: 180 },
    { x: 150, y: 460, w: 200, h: 140 },
  ];

  const hatchAngles = [15, 45, 75, 105, 135, 0, 30, 60, 90, 120];

  // Draw each rectangle with cpencil hatching at varied angles and colors
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const color1 = earthTones[i % earthTones.length];
    const color2 = earthTones[(i + 3) % earthTones.length];
    const angle1 = hatchAngles[i % hatchAngles.length];
    const angle2 = hatchAngles[(i + 2) % hatchAngles.length];
    const spacing1 = 4 + (i % 4) * 2;
    const spacing2 = 5 + (i % 3) * 2;

    brush.noStroke();

    // First hatch layer
    brush.hatchStyle("cpencil", color1, 0.7 + (i % 3) * 0.15);
    brush.hatch(spacing1, angle1, { rand: 0.04, continuous: true });
    brush.noFill();
    brush.rect(r.x, r.y, r.w, r.h);
    brush.noHatch();

    // Second hatch layer at a different angle for optical mixing
    brush.hatchStyle("cpencil", color2, 0.55 + (i % 4) * 0.1);
    brush.hatch(spacing2 + 2, angle2, { rand: 0.05, continuous: true });
    brush.noFill();
    brush.rect(r.x, r.y, r.w, r.h);
    brush.noHatch();
  }

  // Overlay with rotring pen hatching in darker tones for shadow zones
  const shadowZones = [
    { x: 280, y: 140, w: 160, h: 100, angle: 60 },
    { x: 0,   y: 400, w: 160, h: 200, angle: 120 },
    { x: 380, y: 300, w: 120, h: 130, angle: 45 },
    { x: 150, y: 320, w: 180, h: 100, angle: 90 },
    { x: 420, y: 0,   w: 180, h: 150, angle: 75 },
  ];

  for (let i = 0; i < shadowZones.length; i++) {
    const s = shadowZones[i];
    brush.hatchStyle("rotring", "#3a3020", 0.3);
    brush.hatch(3, s.angle, { rand: 0.04, continuous: true });
    brush.noStroke();
    brush.noFill();
    brush.rect(s.x, s.y, s.w, s.h);
    brush.noHatch();

    // Cross-hatch the same zone
    brush.hatchStyle("rotring", "#3a3020", 0.25);
    brush.hatch(4, s.angle + 45, { rand: 0.03, continuous: true });
    brush.rect(s.x, s.y, s.w, s.h);
    brush.noHatch();
  }

  // Draw structural dividing lines with pen to echo Diebenkorn's grid structure
  brush.noFill();
  brush.noHatch();

  // Horizontal structural lines
  const hLines = [
    { x1: 0,   y1: 180, x2: 600, y2: 185 },
    { x1: 0,   y1: 380, x2: 600, y2: 378 },
    { x1: 50,  y1: 320, x2: 420, y2: 325 },
    { x1: 160, y1: 140, x2: 440, y2: 143 },
    { x1: 0,   y1: 460, x2: 350, y2: 462 },
  ];

  for (const ln of hLines) {
    brush.set("pen", "#2a2018", 0.9);
    brush.line(ln.x1, ln.y1, ln.x2, ln.y2);
  }

  // Vertical structural lines
  const vLines = [
    { x1: 280, y1: 0,   x2: 282, y2: 380 },
    { x1: 380, y1: 0,   x2: 382, y2: 600 },
    { x1: 160, y1: 140, x2: 162, y2: 480 },
    { x1: 420, y1: 140, x2: 422, y2: 600 },
    { x1: 50,  y1: 50,  x2: 52,  y2: 400 },
  ];

  for (const ln of vLines) {
    brush.set("pen", "#2a2018", 0.9);
    brush.line(ln.x1, ln.y1, ln.x2, ln.y2);
  }

  // Diagonal accent lines for tension and movement
  brush.set("rotring", "#4a3828", 0.5);
  brush.line(0, 0, 160, 140);
  brush.line(280, 0, 160, 140);
  brush.line(160, 140, 280, 380);
  brush.line(380, 150, 600, 0);
  brush.line(380, 150, 600, 390);
  brush.line(0, 180, 160, 320);
  brush.line(280, 380, 420, 390);
  brush.line(0, 400, 280, 600);
  brush.line(420, 390, 600, 600);

  // Light HB pencil tone lines for subtle texture across the whole surface
  brush.set("HB", "#5a4a30", 0.5);
  for (let y = 20; y < 600; y += 80) {
    brush.line(0, y + random(-5, 5), 600, y + random(-5, 5));
  }
  for (let x = 20; x < 600; x += 80) {
    brush.line(x + random(-5, 5), 0, x + random(-5, 5), 600);
  }

  noLoop();
}