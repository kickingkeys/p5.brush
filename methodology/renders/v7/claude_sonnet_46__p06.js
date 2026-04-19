function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Custom swirling wind field
  brush.addField("swirl", function(t, field) {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let x = col / field.length;
        let y = row / field[0].length;
        let cx = x - 0.5;
        let cy = y - 0.5;
        let angle = atan2(cy, cx) * (180 / PI);
        let dist = sqrt(cx * cx + cy * cy);
        field[col][row] = angle + 90 + dist * 180 + noise(cx * 3, cy * 3) * 60;
      }
    }
    return field;
  });

  brush.field("swirl");
  brush.wiggle(2);

  // Bird colors — dark, expressive marks
  let birdColors = ["#1a1a2e", "#16213e", "#0f3460", "#2c2c54", "#333333", "#1b1b2f"];

  // Generate flock spawn points — scattered across canvas
  let birds = [];
  // Dense cluster upper-left
  for (let i = 0; i < 18; i++) {
    birds.push({
      x: random(60, 220),
      y: random(50, 200),
      color: random(birdColors),
      weight: random(0.6, 1.4),
      len: random(18, 40)
    });
  }
  // Mid-canvas scatter
  for (let i = 0; i < 22; i++) {
    birds.push({
      x: random(180, 480),
      y: random(150, 420),
      color: random(birdColors),
      weight: random(0.5, 1.3),
      len: random(14, 35)
    });
  }
  // Lower-right cluster
  for (let i = 0; i < 15; i++) {
    birds.push({
      x: random(350, 560),
      y: random(350, 560),
      color: random(birdColors),
      weight: random(0.5, 1.2),
      len: random(12, 30)
    });
  }
  // Stragglers
  for (let i = 0; i < 10; i++) {
    birds.push({
      x: random(30, 580),
      y: random(30, 580),
      color: random(birdColors),
      weight: random(0.4, 0.9),
      len: random(10, 22)
    });
  }

  // Draw each bird as a quick marker gesture — a curved wing-stroke
  for (let b of birds) {
    brush.set("marker", b.color, b.weight);

    // Wing gesture: two short curved splines forming a bird silhouette
    let wx = b.x;
    let wy = b.y;
    let wl = b.len;

    // Left wing arc
    let lx0 = wx;
    let ly0 = wy;
    let lx1 = wx - wl * 0.5;
    let ly1 = wy - wl * 0.25;
    let lx2 = wx - wl * 1.0;
    let ly2 = wy + wl * 0.1;

    // Right wing arc
    let rx0 = wx;
    let ry0 = wy;
    let rx1 = wx + wl * 0.5;
    let ry1 = wy - wl * 0.25;
    let rx2 = wx + wl * 1.0;
    let ry2 = wy + wl * 0.1;

    // Draw left wing with pressure variation — heavy at body, light at tip
    brush.spline([
      [lx0, ly0, 1.1],
      [lx1, ly1, 0.8],
      [lx2, ly2, 0.3]
    ], 0.5);

    // Draw right wing
    brush.spline([
      [rx0, ry0, 1.1],
      [rx1, ry1, 0.8],
      [rx2, ry2, 0.3]
    ], 0.5);

    // Tiny body dot — a short stub at center
    brush.set("marker", b.color, b.weight * 0.7);
    brush.line(wx - wl * 0.08, wy + wl * 0.05, wx + wl * 0.08, wy + wl * 0.05);
  }

  // Add a few distant tiny birds — just single short strokes
  brush.set("marker", "#2c2c54", 0.4);
  for (let i = 0; i < 12; i++) {
    let tx = random(40, 560);
    let ty = random(40, 560);
    let tl = random(5, 12);
    brush.spline([
      [tx - tl, ty + random(-2, 2), 0.6],
      [tx, ty - tl * 0.3, 0.9],
      [tx + tl, ty + random(-2, 2), 0.6]
    ], 0.4);
  }

  brush.noField();

  noLoop();
}