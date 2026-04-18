function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set color palette inspired by memory: soft pinks, faded golds, dusty blues
  const skinTones = ["#f4c2c2", "#e6a8d7", "#d4a5a5"];
  const shadowColors = ["#8B4000", "#5C3317", "#4A3C8C"];
  const highlightColors = ["#ffebcd", "#ffe4b5", "#fffacd"];

  // Random seed for reproducible randomness
  randomSeed(42);
  noiseSeed(42);

  // Face outline with imperfect, layered strokes
  brush.set("cpencil", random(skinTones), 0.8);
  brush.noFill();
  brush.beginShape();
  // Organic face shape with noise
  for (let a = 0; a < 360; a += 10) {
    let angle = radians(a);
    let radius = 120 + noise(a * 0.01, frameCount * 0.001) * 20;
    let x = 300 + cos(angle) * radius;
    let y = 300 + sin(angle) * radius;
    brush.vertex(x, y);
  }
  brush.endShape(true);

  // Layered, cross-hatched fill for face with varying colors
  // First layer: soft pinks at 45 degrees
  brush.hatchStyle("cpencil", random(skinTones), 0.7);
  brush.hatch(6, 45, { rand: 0.1 });
  brush.beginShape();
  for (let a = 0; a < 360; a += 10) {
    let angle = radians(a);
    let radius = 120 + noise(a * 0.01 + 100, frameCount * 0.001) * 10;
    let x = 300 + cos(angle) * radius;
    let y = 300 + sin(angle) * radius;
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noHatch();

  // Second layer: faded golds at 135 degrees for crosshatch
  brush.hatchStyle("cpencil", random(highlightColors), 0.6);
  brush.hatch(8, 135, { rand: 0.1 });
  brush.beginShape();
  for (let a = 0; a < 360; a += 10) {
    let angle = radians(a);
    let radius = 120 + noise(a * 0.01 + 200, frameCount * 0.001) * 10;
    let x = 300 + cos(angle) * radius;
    let y = 300 + sin(angle) * radius;
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noHatch();

  // Add eyes with simple cross shapes, layered
  const eyeX = [270, 330];
  const eyeY = 280;
  for (let i = 0; i < 2; i++) {
    // Base stroke
    brush.set("cpencil", random(shadowColors), 0.5);
    brush.line(eyeX[i], eyeY, eyeX[i] + 10, eyeY + 10);
    brush.line(eyeX[i] + 10, eyeY, eyeX[i], eyeY + 10);
    
    // Imperfect second stroke
    brush.set("cpencil", random(skinTones), 0.4);
    brush.line(eyeX[i] + 1, eyeY + 1, eyeX[i] + 11, eyeY + 11);
    brush.line(eyeX[i] + 11, eyeY + 1, eyeX[i] + 1, eyeY + 11);
  }

  // Mouth with wobbly line
  brush.set("cpencil", "#cc3366", 0.6);
  brush.spline([
    [290, 340], [300, 350], [310, 350], [320, 340]
  ], 0.3);

  // Add memory-like smudges with pastel over face
  brush.field("hand");
  brush.wiggle(2);

  // Cheek color with soft pastel strokes
  brush.set("pastel", "#ff9999", 0.6);
  for (let i = 0; i < 20; i++) {
    let offsetX = random(-20, 20);
    let offsetY = random(-10, 10);
    brush.flowLine(270 + offsetX, 310 + offsetY, random(10, 20), random(360));
    brush.flowLine(330 + offsetX, 310 + offsetY, random(10, 20), random(360));
  }

  brush.noField();

  // Add abstract, hair-like strokes at top
  brush.set("cpencil", "#b0a080", 0.7);
  for (let i = 0; i < 50; i++) {
    let x = 250 + random(-60, 100);
    let y = 200 + random(-40, 20);
    let len = random(20, 60);
    let dir = random(-30, 30);
    brush.flowLine(x, y, len, dir);
  }

  // Final imperfections: faint graphite texture
  brush.hatchStyle("2H", "#a09080", 0.4);
  brush.hatch(12, 0, { rand: 0.05 });
  brush.rect(240, 220, 120, 100, "corner");
  brush.noHatch();

  noLoop();
}