function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Background layer with soft wash
  brush.wash("#e8c5a8", 40);
  brush.noStroke();
  brush.rect(0, 0, width, height);
  brush.noWash();

  // Large horizontal rectangle with light hatching
  brush.stroke("#8d7c6b");
  brush.strokeWeight(0.8);
  brush.hatch(8, 15, { rand: 0.2, gradient: 0.3 });
  brush.hatchStyle("2H", "#8d7c6b", 0.9);
  brush.noFill();
  brush.rect(60, 120, 480, 140, "corner");

  // Vertical rectangle with denser hatching
  brush.hatch(6, 75, { rand: 0.1, continuous: true });
  brush.hatchStyle("HB", "#5c4a3c", 1.1);
  brush.noFill();
  brush.rect(380, 40, 140, 480, "corner");

  // Diagonal overlapping rectangle
  push();
  translate(200, 100);
  rotate(radians(12));
  brush.hatch(10, 0, { rand: 0.15 });
  brush.hatchStyle("cpencil", "#a67c52", 0.9);
  brush.noFill();
  brush.rect(0, 0, 300, 200, "corner");
  pop();

  // Small detailed rectangle in center
  brush.set("rotring", "#3a3a3a", 0.7);
  brush.hatch(4, 45, { rand: 0.05, continuous: true });
  brush.hatchStyle("pen", "#3a3a3a", 0.6);
  brush.noFill();
  brush.rect(width/2 - 90, height/2 - 90, 180, 180, "center");

  // Subtle texture overlay with spray
  brush.set("spray", "#6b4f3b", 0.5);
  brush.noHatch();
  brush.noFill();
  brush.line(100, 100, 500, 150);
  brush.line(500, 150, 450, 500);
  brush.line(450, 500, 150, 450);
  brush.line(150, 450, 100, 100);

  // Charcoal sketch marks
  brush.set("charcoal", "#444", 1.2);
  brush.noHatch();
  brush.noFill();
  brush.line(80, 520, 520, 520);
  brush.line(520, 520, 520, 80);

  // Colored pencil accents with pastel
  brush.set("pastel", "#c7a378", 1.0);
  brush.noHatch();
  brush.strokeWeight(1.5);
  brush.line(200, 200, 400, 200);
  brush.line(400, 200, 400, 400);

  // Crayon fill suggestion in muted tone
  brush.mass("crayon", "#b58e70", {
    precision: 0.6,
    strength: 0.8,
    gradient: 0.4,
    outline: false
  });
  brush.circle(150, 450, 60);

  noLoop();
}