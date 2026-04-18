function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set up base hatching for large background rectangle
  brush.hatchStyle("2H", "#8B6F47", 0.7);
  brush.hatch(8, 30, { rand: 0.1, continuous: true });
  brush.noStroke();
  brush.fill("#D4B88C", 80);
  brush.rect(60, 60, 480, 480, "corner");
  brush.noHatch();

  // Add diagonal hatched rectangle in muted tone
  brush.hatchStyle("cpencil", "#A47E74", 0.8);
  brush.hatch(6, 45, { rand: 0.12 });
  brush.noFill();
  brush.stroke("#A47E74");
  brush.strokeWeight(1.2);
  brush.rect(120, 100, 360, 180, "center");
  brush.noHatch();

  // Overlay vertical hatching with pen
  brush.hatchStyle("pen", "#5E503F", 0.4);
  brush.hatch(5, 90, { rand: 0.05, continuous: true });
  brush.noFill();
  brush.rect(200, 250, 200, 150, "center");
  brush.noHatch();

  // Add horizontal hatching with rotring
  brush.hatchStyle("rotring", "#6B6B47", 0.5);
  brush.hatch(4, 0, { rand: 0.08 });
  brush.noFill();
  brush.rect(300, 150, 180, 120, "center");
  brush.noHatch();

  // Cross-hatching with 2B for depth
  brush.hatchStyle("2B", "#7D5C4F", 1.0);
  brush.hatch(7, 135, { rand: 0.15 });
  brush.hatch(7, 45, { rand: 0.15 });
  brush.noFill();
  brush.rect(150, 350, 300, 100, "center");
  brush.noHatch();

  // Accent with charcoal gesture
  brush.set("charcoal", "#4A4A4A", 1.3);
  brush.line(50, 500, 550, 500);

  // Small pastel rectangle with light hatching
  brush.hatchStyle("pastel", "#C4A484", 0.6);
  brush.hatch(10, 60, { rand: 0.1 });
  brush.noFill();
  brush.rect(420, 80, 80, 60, "center");
  brush.noHatch();

  // Crayon accent lines
  brush.set("crayon", "#9C7C5C", 1.1);
  for (let x = 0; x < width; x += 20) {
    brush.line(x, 0, x + random(-30, 30), height);
  }

  noLoop();
}