function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Create a custom vector field that swirls like a storm
  brush.addField("swirl", function(t, field) {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        const x = (col - field.length * 0.5) * 1.0;
        const y = (row - field[0].length * 0.5) * 1.0;
        const angle = atan2(y, x) + noise(x * 0.01, y * 0.01, t * 0.005) * 10;
        field[col][row] = degrees(angle);
      }
    }
    return field;
  });

  // Activate the field and subtle hand-wiggle for organic trails
  brush.field("swirl");
  brush.wiggle(2);

  // Set spray brush for ghostly trails
  brush.set("spray", "#5a3f3f", 2.0);

  // Generate 150 particle agents across the canvas
  for (let i = 0; i < 150; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    // Each particle leaves a short, curved trail following the field
    brush.flowLine(x, y, random(20, 60), 0);
  }

  // Deactivate field and wiggle
  brush.noField();

  // Add subtle dry-media texture with mass fills in warm tones
  brush.mass("pastel", "#d4a5a5", {
    strength: 0.6,
    precision: 0.4,
    gradient: 0.5,
    outline: false
  });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * TWO_PI;
    const r = 80 + random(-20, 20);
    const cx = 300 + cos(a) * 100;
    const cy = 300 + sin(a) * 60;
    brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
  }
  brush.endShape(true);
  brush.noMass();

  // Final structural ghost lines with HB pencil
  brush.set("HB", "#332222", 0.8);
  for (let i = 0; i < 8; i++) {
    const offset = i * 15;
    brush.spline([
      [100 + offset, 100],
      [250 + random(-20, 20), 200 + random(-10, 10)],
      [400 + random(-15, 15), 300],
      [500, 400 + offset]
    ], 0.3);
  }

  noLoop();
}