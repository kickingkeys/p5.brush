function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Vector field for wind
  brush.addField("windFlow", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.05, r * 0.05) * 180; // Wind direction
      }
    }
    return field;
  });
  brush.field("windFlow");
  brush.wiggle(2);

  // Birds as marker trails
  const numBirds = 50;
  for (let i = 0; i < numBirds; i++) {
    const x = random(0, 600);
    const y = random(0, 600);
    const length = random(20, 50);
    const angle = random(0, 360);

    brush.set("marker", "#333", 0.8);
    brush.flowLine(x, y, length, angle);
  }

  brush.noField();
  brush.noStroke();
  noLoop();
}