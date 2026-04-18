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
    let cx = random(60, 540);
    let cy = random(60, 540);
    let size = random(0.4, 1.1);
    let speed = random(0.5, 1.0);

    // Each bird is a quick marker gesture — two curved wing strokes
    let wingSpread = random(8, 22) * size;
    let wingCurve = random(0.15, 0.45);

    // Pick a dark ink color with slight variation
    let grayVal = floor(random(20, 90));
    let col = color(grayVal, grayVal - 5, grayVal + 10);

    brush.set("marker", col, speed * size * 0.7);

    // Left wing
    let leftPts = [
      [cx, cy],
      [cx - wingSpread * 0.55, cy - wingSpread * wingCurve],
      [cx - wingSpread, cy + wingSpread * 0.08]
    ];
    brush.spline(leftPts, 0.5);

    // Right wing
    let rightPts = [
      [cx, cy],
      [cx + wingSpread * 0.55, cy - wingSpread * wingCurve],
      [cx + wingSpread, cy + wingSpread * 0.08]
    ];
    brush.spline(rightPts, 0.5);

    // Tiny body dot — a short thick stroke
    brush.set("marker", col, speed * size * 1.1);
    brush.line(cx - 1.5 * size, cy, cx + 2.5 * size, cy + 0.5 * size);
  }

  // Add a few flow lines to suggest the wind current
  brush.field("spiral");
  brush.set("pen", color(180, 175, 160, 60), 0.18);

  for (let w = 0; w < 6; w++) {
    let sx = random(80, 520);
    let sy = random(80, 520);
    let len = random(60, 160);
    let dir = random(360);
    brush.flowLine(sx, sy, len, dir);
  }

  brush.noField();

  noLoop();
}