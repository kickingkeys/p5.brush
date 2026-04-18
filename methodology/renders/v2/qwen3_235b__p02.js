function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdfbf4");
  translate(-width/2, -height/2);

  brush.noFill();
  brush.noHatch();
  brush.noMass();

  // Fine HB outlines for grass blades and seed heads
  brush.set("HB", "#333", 0.8);
  for (let i = 0; i < 12; i++) {
    const x = 80 + i * 40 + random(-10, 10);
    const y = 120 + random(-20, 20);
    const len = random(280, 340);
    const angle = random(-5, 5);
    const offsetX = i % 2 === 0 ? -20 : 20;
    brush.beginShape(0.3);
    brush.vertex(x + offsetX, y);
    brush.vertex(x + offsetX + cos(radians(angle)) * len, y + sin(radians(angle)) * len, 0.6);
    brush.endShape();
  }

  // HB stems and central shafts
  brush.set("HB", "#333", 1.0);
  brush.line(300, 180, 310, 460);
  brush.line(290, 200, 285, 440);

  // 2H fine hatching for light tones on seed heads
  brush.hatchStyle("2H", "#666", 0.6);
  brush.hatch(6, 85, { rand: 0.05, continuous: true });
  brush.beginShape(0.2);
  for (let a = 0; a < 360; a += 15) {
    const r = 30 + random(5);
    const x = 305 + cos(radians(a)) * r;
    const y = 195 + sin(radians(a)) * r;
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noHatch();

  // 2B dense hatching for shadow zones at base
  brush.hatchStyle("2B", "#222", 1.2);
  brush.hatch(3, 45, { rand: 0.08, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(270, 420);
  brush.vertex(280, 460);
  brush.vertex(320, 450);
  brush.vertex(310, 410);
  brush.endShape(true);
  brush.noHatch();

  // Cross hatching with 2B at 135 degrees
  brush.hatch(4, 135, { rand: 0.07, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(270, 420);
  brush.vertex(280, 460);
  brush.vertex(320, 450);
  brush.vertex(310, 410);
  brush.endShape(true);
  brush.noHatch();

  // HB contour hatching along grass blades
  brush.hatchStyle("HB", "#333", 0.9);
  brush.hatch(5, 88, { rand: 0.04 });
  for (let i = 0; i < 8; i++) {
    const x = 100 + i * 50 + random(-5, 5);
    const y = 140 + random(-15, 15);
    const len = random(260, 300);
    brush.beginShape(0.2);
    brush.vertex(x, y);
    brush.vertex(x + len * 0.95, y + len * 0.25);
    brush.endShape();
  }
  brush.noHatch();

  // Unfinished edges: sparse random HB strokes outside main forms
  brush.set("HB", "#444", 0.6);
  for (let i = 0; i < 15; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    brush.line(x, y, x + random(10, 40), y + random(5, 20));
  }

  // Faint 2H texture in background — atmospheric ground
  brush.hatchStyle("2H", "#888", 0.4);
  brush.hatch(10, random(360), { rand: 0.2 });
  brush.rect(0, 0, width, height, "corner");
  brush.noHatch();

  brush.noStroke();
  noLoop();
}