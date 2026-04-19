const palette = ["#e8574c", "#4f8dc7", "#f2b84c", "#2a2a2a", "#1fc499", "#d64585", "#f0f0f0"];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("hand");
  brush.wiggle(3);
  for (let i = 0; i < 20; i++) {
    brush.set(random(["2H", "HB", "charcoal"]), random(palette), random(0.4, 1.0));
    let pts = [];
    let cx = random(50, 550);
    let cy = random(50, 550);
    for (let j = 0; j < random(4, 12); j++) {
      pts.push([cx + random(-60, 60), cy + random(-60, 60), random(0.5, 1.2)]);
    }
    brush.spline(pts, random(0.1, 0.6));
  }
  brush.noField();

  for (let i = 0; i < 85; i++) {
    brush.set("spray", random(palette), random(0.8, 3.5));
    brush.flowLine(
      random(30, 570), random(30, 570),
      random(15, 60), random(360)
    );
  }

  for (let i = 0; i < 45; i++) {
    brush.set("spray", random(palette), random(0.3, 0.9));
    let x = random(40, 560);
    let y = random(80, 450);
    brush.line(x, y, x + random(-5, 5), y + random(40, 160));
  }

  brush.field("curved");
  for (let i = 0; i < 15; i++) {
    brush.set(random(["spray", "marker", "charcoal"]), random(palette), random(1.5, 3.0));
    let x0 = random(60, 480);
    let y0 = random(80, 520);
    let dirX = random([1, -1]);
    let dirY = random([1, -1]);
    
    brush.spline([
      [x0, y0, random(0.6, 1.0)],
      [x0 + random(30, 90) * dirX, y0 + random(10, 50) * dirY, random(0.5, 1.0)],
      [x0 + random(90, 160) * dirX, y0 + random(30, 90) * dirY, random(0.4, 0.8)]
    ], 0.4);
  }
  brush.noField();

  noLoop();
}