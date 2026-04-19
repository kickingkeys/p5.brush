function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Field for wind direction
  brush.addField("windFlow", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = map(noise(c * 0.05, r * 0.05, t * 0.01), 0, 1, -90, 90);
      }
    }
    return field;
  });
  brush.field("windFlow");
  brush.wiggle(2);

  // Bird trails using marker
  brush.set("marker", "#333333", 0.8);
  for (let i = 0; i < 100; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(20, 60);
    brush.flowLine(x, y, len, 0);
  }

  // Sparse charcoal outlines for body shape suggestions
  brush.set("charcoal", "#666666", 0.3);
  for (let i = 0; i < 30; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let size = random(10, 30);
    brush.beginShape();
    for (let j = 0; j < 10; j++) {
      let angle = map(j, 0, 10, 0, 360);
      let radius = size;
      let px = x + radius * cos(angle);
      let py = y + radius * sin(angle);
      brush.vertex(px, py);
    }
    brush.endShape(CLOSE);
  }

  brush.noField();
  brush.noStroke();
  noLoop(); // Draw once
}