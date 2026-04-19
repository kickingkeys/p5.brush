function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Define muted earth tone palette
  const colors = ["#c9a57a", "#b88c6b", "#a37256", "#8c5a45", "#6b4839", "#c2b280", "#9c8b6e"];

  // Randomly generate intersecting rectangles
  const rects = [];
  for (let i = 0; i < 8; i++) {
    const x = random(-100, 500);
    const y = random(-100, 500);
    const w = random(200, 400);
    const h = random(200, 400);
    rects.push({ x, y, w, h });
  }

  // Draw intersecting hatched rectangles
  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i];
    const angle = random([0, 45, 90, 135]);
    const hatchSpacing = random([3, 5, 7]);
    const color = random(colors);

    // Apply colored pencil hatching
    brush.hatchStyle("cpencil", color, random(0.6, 1.2));
    brush.hatch(hatchSpacing, angle, { rand: random(0.05, 0.15), continuous: true });

    // Draw rectangle shape with slight irregularity
    brush.beginShape(random(0.2, 0.4));
    brush.vertex(rect.x, rect.y);
    brush.vertex(rect.x + rect.w, rect.y + random(-10, 10));
    brush.vertex(rect.x + rect.w + random(-10, 10), rect.y + rect.h);
    brush.vertex(rect.x + random(-10, 10), rect.y + rect.h + random(-10, 10));
    brush.endShape(true);
    brush.noHatch();

    // Add subtle structural lines with pen
    brush.set("pen", "#5a4a3a", random(0.8, 1.4));
    brush.strokeWeight(random(0.8, 1.2));
    brush.rect(rect.x, rect.y, rect.w, rect.h, "corner");
  }

  // Add focal area with darker hatching
  brush.hatchStyle("2B", "#6b4839", 1.3);
  brush.hatch(4, 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.3);
  const cx = 300, cy = 300, size = 180;
  brush.vertex(cx - size/2, cy - size/2);
  brush.vertex(cx + size/2, cy - size/2 + 20);
  brush.vertex(cx + size/2 + 20, cy + size/2);
  brush.vertex(cx - size/2 + 10, cy + size/2 - 10);
  brush.endShape(true);
  brush.noHatch();

  // Final structural lines with rotring
  brush.set("rotring", "#333", 1.6);
  brush.strokeWeight(1.8);
  brush.rect(100, 100, 400, 400, "corner");

  noLoop();
}