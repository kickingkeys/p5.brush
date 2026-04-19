function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width/2, -height/2);
  background("#fffaf3");

  // Set angle mode for consistent angles
  angleMode(DEGREES);

  // Base layer: large muted earth tone rectangles with crosshatching
  // Using a palette inspired by Diebenkorn: ochres, siennas, umbers, greys
  const colors = ["#c8a27a", "#a67c52", "#6b5b4b", "#8c7853", "#b8a594"];
  
  // Create several overlapping rectangles
  const rects = [
    { x: 100, y: 80, w: 400, h: 200, color: colors[0] },
    { x: 150, y: 180, w: 300, h: 250, color: colors[1] },
    { x: 80, y: 200, w: 200, h: 300, color: colors[2] },
    { x: 200, y: 100, w: 350, h: 180, color: colors[3] },
    { x: 250, y: 250, w: 220, h: 220, color: colors[4] }
  ];

  for (let r of rects) {
    // Use mass fill with crayon for earthy texture
    brush.mass("crayon", r.color, { precision: 0.6, strength: 0.7, outline: false });
    brush.noStroke();
    brush.rect(r.x, r.y, r.w, r.h, "corner");
    brush.noMass();

    // Add directional hatching with colored pencil at 45 degrees
    brush.hatchStyle("cpencil", "#5e3e2a", 0.7);
    brush.hatch(8, 45, { rand: 0.1, continuous: true });
    brush.noStroke();
    brush.rect(r.x + 10, r.y + 10, r.w - 20, r.h - 20, "corner");
    brush.noHatch();

    // Add crosshatch with pen at -45 degrees for structure
    brush.hatchStyle("pen", "#333", 0.4);
    brush.hatch(6, -45, { rand: 0.05, continuous: true });
    brush.noStroke();
    brush.rect(r.x + 15, r.y + 15, r.w - 30, r.h - 30, "corner");
    brush.noHatch();
  }

  // Add some linear elements with rotring for definition
  brush.set("rotring", "#5e3e2a", 1.2);
  brush.line(0, 150, 600, 150);
  brush.line(0, 300, 600, 300);
  brush.line(200, 0, 200, 600);
  brush.line(400, 0, 400, 600);

  // Subtle spray texture in background areas
  brush.set("spray", "#c8a27a", 1.5);
  brush.wiggle(2);
  for (let i = 0; i < 40; i++) {
    brush.flowLine(random(0, 600), random(0, 600), random(10, 25), random(360));
  }
  brush.noField();

  // Final structural lines with pen
  brush.set("pen", "#333", 1.5);
  brush.line(100, 80, 100, 280);
  brush.line(500, 180, 500, 430);
  brush.line(80, 200, 80, 500);

  noLoop();
}