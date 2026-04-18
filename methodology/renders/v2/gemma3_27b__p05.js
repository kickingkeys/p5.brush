function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let trunkCount = 10;
  let trunkSpacing = width / (trunkCount + 1);
  let trunkWidth = trunkSpacing * 0.6;

  for (let i = 0; i < trunkCount; i++) {
    let x = (i + 1) * trunkSpacing;
    let y = height * 0.8;
    let h = height * 0.2;

    brush.set("pen", "#000", 1.2);
    brush.rect(x - trunkWidth / 2, y - h, trunkWidth, h);

    brush.set("2B", "#000", 0.8);
    brush.hatch(2, 45, {rand: 0.05, continuous: true});
    brush.beginShape();
    brush.vertex(x - trunkWidth / 2, y - h);
    brush.vertex(x + trunkWidth / 2, y - h);
    brush.vertex(x + trunkWidth / 2, y);
    brush.vertex(x - trunkWidth / 2, y);
    brush.endShape(CLOSE);
    brush.noHatch();
  }

  let undergrowthCount = 20;
  for (let i = 0; i < undergrowthCount; i++) {
    let x = random(width);
    let y = random(height * 0.6, height * 0.8);
    let size = random(10, 30);

    brush.set("charcoal", "#000", 0.6);
    brush.ellipse(x, y, size, size);
  }

  let shadowCount = 15;
  for (let i = 0; i < shadowCount; i++) {
    let x = random(width);
    let y = random(height * 0.4, height * 0.6);
    let size = random(20, 50);

    brush.set("2H", "#333", 0.5);
    brush.ellipse(x, y, size, size);
  }

  brush.set("rotring", "#000", 0.3);
  brush.hatch(1, 0, {rand: 0.1});
  brush.beginShape();
  brush.vertex(0, height);
  brush.vertex(width, height);
  brush.vertex(width, 0);
  brush.vertex(0, 0);
  brush.endShape(CLOSE);
  brush.noHatch();

  noLoop();
}