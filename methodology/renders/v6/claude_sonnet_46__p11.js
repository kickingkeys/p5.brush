function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const rects = [
    { x: 20,  y: 20,  w: 280, h: 200, angle: 30,  color: "#5c4a2a", spacing: 8,  brush: "rotring", weight: 0.4 },
    { x: 60,  y: 80,  w: 320, h: 160, angle: 120, color: "#3a5c3a", spacing: 6,  brush: "rotring", weight: 0.35 },
    { x: 150, y: 10,  w: 260, h: 240, angle: 75,  color: "#7a5c3a", spacing: 10, brush: "rotring", weight: 0.3 },
    { x: 300, y: 40,  w: 280, h: 180, angle: 150, color: "#4a4a6a", spacing: 7,  brush: "rotring", weight: 0.4 },
    { x: 30,  y: 220, w: 300, h: 200, angle: 45,  color: "#6a4a2a", spacing: 9,  brush: "rotring", weight: 0.35 },
    { x: 250, y: 180, w: 320, h: 220, angle: 100, color: "#3a4a5c", spacing: 5,  brush: "rotring", weight: 0.3 },
    { x: 10,  y: 380, w: 260, h: 200, angle: 60,  color: "#5a3a2a", spacing: 8,  brush: "rotring", weight: 0.4 },
    { x: 320, y: 300, w: 260, h: 260, angle: 135, color: "#4a5a3a", spacing: 6,  brush: "rotring", weight: 0.35 },
    { x: 140, y: 350, w: 300, h: 220, angle: 20,  color: "#6a5a4a", spacing: 11, brush: "rotring", weight: 0.3 },
    { x: 40,  y: 440, w: 340, h: 140, angle: 90,  color: "#3a3a5a", spacing: 7,  brush: "rotring", weight: 0.4 },
    { x: 350, y: 420, w: 230, h: 170, angle: 50,  color: "#5c3a3a", spacing: 9,  brush: "rotring", weight: 0.35 },
    { x: 200, y: 460, w: 380, h: 130, angle: 110, color: "#4a5c4a", spacing: 6,  brush: "rotring", weight: 0.3 },
  ];

  const cpencilLayers = [
    { x: 30,  y: 30,  w: 240, h: 180, angle: 35,  color: "#8b6a3a", spacing: 12, weight: 0.7 },
    { x: 80,  y: 90,  w: 280, h: 150, angle: 125, color: "#4a6b4a", spacing: 14, weight: 0.6 },
    { x: 160, y: 20,  w: 220, h: 220, angle: 80,  color: "#7a5c3a", spacing: 11, weight: 0.7 },
    { x: 310, y: 50,  w: 240, h: 160, angle: 155, color: "#5a5a7a", spacing: 13, weight: 0.6 },
    { x: 50,  y: 230, w: 260, h: 180, angle: 50,  color: "#7a5a3a", spacing: 12, weight: 0.7 },
    { x: 260, y: 190, w: 280, h: 200, angle: 105, color: "#4a5a6a", spacing: 10, weight: 0.6 },
    { x: 20,  y: 390, w: 220, h: 180, angle: 65,  color: "#6a4a3a", spacing: 14, weight: 0.7 },
    { x: 330, y: 310, w: 220, h: 240, angle: 140, color: "#5a6a4a", spacing: 11, weight: 0.6 },
    { x: 150, y: 360, w: 260, h: 200, angle: 25,  color: "#7a6a5a", spacing: 13, weight: 0.7 },
    { x: 50,  y: 450, w: 300, h: 130, angle: 95,  color: "#4a4a6a", spacing: 12, weight: 0.6 },
    { x: 360, y: 430, w: 200, h: 155, angle: 55,  color: "#6a4a4a", spacing: 10, weight: 0.7 },
    { x: 210, y: 470, w: 340, h: 120, angle: 115, color: "#5a6c5a", spacing: 13, weight: 0.6 },
  ];

  // Second cpencil pass at offset angles for optical mixing
  const cpencilLayer2 = [
    { x: 30,  y: 30,  w: 240, h: 180, angle: 80,  color: "#6b4a1a", spacing: 14, weight: 0.55 },
    { x: 80,  y: 90,  w: 280, h: 150, angle: 170, color: "#2a4b2a", spacing: 16, weight: 0.5 },
    { x: 160, y: 20,  w: 220, h: 220, angle: 125, color: "#5a3c1a", spacing: 13, weight: 0.55 },
    { x: 310, y: 50,  w: 240, h: 160, angle: 200, color: "#3a3a5a", spacing: 15, weight: 0.5 },
    { x: 50,  y: 230, w: 260, h: 180, angle: 95,  color: "#5a3a1a", spacing: 14, weight: 0.55 },
    { x: 260, y: 190, w: 280, h: 200, angle: 150, color: "#2a3a4a", spacing: 12, weight: 0.5 },
    { x: 20,  y: 390, w: 220, h: 180, angle: 110, color: "#4a2a1a", spacing: 16, weight: 0.55 },
    { x: 330, y: 310, w: 220, h: 240, angle: 185, color: "#3a4a2a", spacing: 13, weight: 0.5 },
    { x: 150, y: 360, w: 260, h: 200, angle: 70,  color: "#5a4a3a", spacing: 15, weight: 0.55 },
    { x: 50,  y: 450, w: 300, h: 130, angle: 140, color: "#2a2a4a", spacing: 14, weight: 0.5 },
    { x: 360, y: 430, w: 200, h: 155, angle: 100, color: "#4a2a2a", spacing: 12, weight: 0.55 },
    { x: 210, y: 470, w: 340, h: 120, angle: 160, color: "#3a4c3a", spacing: 15, weight: 0.5 },
  ];

  // Draw pen hatching
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    brush.noStroke();
    brush.hatchStyle(r.brush, r.color, r.weight);
    brush.hatch(r.spacing, r.angle, { rand: 0.04, continuous: true });
    brush.noFill();
    brush.beginShape(0.2);
    brush.vertex(r.x, r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x, r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // Draw cpencil layer 1
  for (let i = 0; i < cpencilLayers.length; i++) {
    const r = cpencilLayers[i];
    brush.noStroke();
    brush.hatchStyle("cpencil", r.color, r.weight);
    brush.hatch(r.spacing, r.angle, { rand: 0.05 });
    brush.noFill();
    brush.beginShape(0.2);
    brush.vertex(r.x, r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x, r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // Draw cpencil layer 2 (optical mixing)
  for (let i = 0; i < cpencilLayer2.length; i++) {
    const r = cpencilLayer2[i];
    brush.noStroke();
    brush.hatchStyle("cpencil", r.color, r.weight);
    brush.hatch(r.spacing, r.angle, { rand: 0.05 });
    brush.noFill();
    brush.beginShape(0.2);
    brush.vertex(r.x, r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x, r.y + r.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // Pen outlines for select rectangles to anchor structure
  const outlineRects = [
    { x: 20,  y: 20,  w: 280, h: 200, color: "#3a2a10", weight: 0.9 },
    { x: 300, y: 40,  w: 280, h: 180, color: "#2a3a2a", weight: 0.8 },
    { x: 30,  y: 220, w: 300, h: 200, color: "#3a2a20", weight: 0.85 },
    { x: 250, y: 180, w: 320, h: 220, color: "#2a3040", weight: 0.8 },
    { x: 10,  y: 380, w: 260, h: 200, color: "#3a2010", weight: 0.9 },
    { x: 320, y: 300, w: 260, h: 260, color: "#2a3020", weight: 0.8 },
    { x: 200, y: 460, w: 380, h: 130, color: "#2a2a3a", weight: 0.85 },
  ];

  for (let i = 0; i < outlineRects.length; i++) {
    const r = outlineRects[i];
    brush.set("pen", r.color, r.weight);
    brush.noFill();
    brush.noHatch();
    brush.beginShape(0.15);
    brush.vertex(r.x, r.y);
    brush.vertex(r.x + r.w, r.y);
    brush.vertex(r.x + r.w, r.y + r.h);
    brush.vertex(r.x, r.y + r.h);
    brush.endShape(true);
  }

  // A few HB contour lines for additional structure
  const hbLines = [
    { x1: 20,  y1: 220, x2: 580, y2: 200, color: "#4a3a2a", weight: 0.6 },
    { x1: 150, y1: 10,  x2: 160, y2: 590, color: "#3a4a3a", weight: 0.5 },
    { x1: 300, y1: 20,  x2: 290, y2: 590, color: "#4a4a6a", weight: 0.5 },
    { x1: 10,  y1: 380, x2: 590, y2: 370, color: "#5a3a2a", weight: 0.55 },
    { x1: 10,  y1: 460, x2: 590, y2: 450, color: "#3a5a3a", weight: 0.5 },
    { x1: 60,  y1: 10,  x2: 55,  y2: 590, color: "#5a4a3a", weight: 0.5 },
    { x1: 560, y1: 10,  x2: 555, y2: 590, color: "#4a3a5a", weight: 0.5 },
  ];

  brush.noHatch();
  brush.noFill();
  for (let i = 0; i < hbLines.length; i++) {
    const l = hbLines[i];
    brush.set("HB", l.color, l.weight);
    brush.line(l.x1, l.y1, l.x2, l.y2);
  }

  noLoop();
}