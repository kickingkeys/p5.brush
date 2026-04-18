function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  brush.field("spiral");

  let birdCount = 38;

  for (let i = 0; i < birdCount; i++) {
    let x = random(40, 560);
    let y = random(40, 560);

    let size = random(0.4, 1.4);
    let darkness = random(30, 90);
    let col = color(darkness, darkness - 10, darkness + 5);

    brush.set("marker", col, size * 0.6);

    drawBird(x, y, size);
  }

  noLoop();
}

function drawBird(x, y, size) {
  let span = size * random(14, 22);
  let wingCurve = size * random(3, 7);
  let bodyTilt = random(-18, 18);

  let wx1 = x - span * 0.5;
  let wy1 = y + wingCurve * 0.5;
  let wx2 = x + span * 0.5;
  let wy2 = y + wingCurve * 0.5;

  let tipDip = random(0.2, 0.6);

  brush.beginShape(0.55);
  brush.vertex(wx1, wy1, 0.4);
  brush.vertex(wx1 + span * 0.18, y - wingCurve * tipDip, 0.9);
  brush.vertex(x, y, 1.0);
  brush.vertex(wx2 - span * 0.18, y - wingCurve * tipDip, 0.9);
  brush.vertex(wx2, wy2, 0.4);
  brush.endShape(false);
}