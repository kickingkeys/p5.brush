function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width/2, -height/2);

  let trunkCount = 15;
  let trunkSpacing = width / (trunkCount + 1);
  let trunkHeightRange = [150, 250];
  let trunkWidthRange = [8, 15];

  for (let i = 0; i < trunkCount; i++) {
    let x = (i + 1) * trunkSpacing;
    let trunkHeight = random(trunkHeightRange[0], trunkHeightRange[1]);
    let trunkWidth = random(trunkWidthRange[0], trunkWidthRange[1]);

    brush.set("pen", "#000", 1.2);
    brush.beginShape();
    brush.vertex(x - trunkWidth / 2, 0);
    brush.vertex(x + trunkWidth / 2, 0);
    brush.vertex(x + trunkWidth / 2, trunkHeight);
    brush.vertex(x - trunkWidth / 2, trunkHeight);
    brush.endShape(CLOSE);

    // Add some branching
    let branchCount = int(random(2, 5));
    for (let j = 0; j < branchCount; j++) {
      let branchAngle = random(30, 150);
      let branchLength = random(30, 80);
      let branchX = x + (trunkWidth / 2) * cos(radians(branchAngle));
      let branchY = trunkHeight + (trunkWidth / 2) * sin(radians(branchAngle));
      brush.set("pen", "#000", 0.8);
      brush.line(x, trunkHeight, branchX, branchY);
    }
  }

  // Undergrowth
  brush.set("2H", "#000", 0.5);
  for (let i = 0; i < 50; i++) {
    let x = random(0, width);
    let y = random(height * 0.8, height);
    brush.hatch(6, random(0, 360), { rand: 0.1 });
    brush.beginShape();
    brush.vertex(x, y);
    brush.vertex(x + random(-5, 5), y + random(5, 10));
    brush.vertex(x + random(-10, 10), y + random(5, 10));
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  // Shadows
  brush.set("charcoal", "#000", 0.6);
  let shadowHeight = height * 0.2;
  brush.rect(0, height - shadowHeight, width, shadowHeight);

  noLoop();
}