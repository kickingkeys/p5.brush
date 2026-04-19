function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.addField("swirl", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        const dx = col - field.length * 0.5;
        const dy = row - field[0].length * 0.5;
        const angle = atan2(dy, dx);
        const len = noise(dx * 0.01, dy * 0.01, t * 0.005) * 360;
        field[col][row] = angle + len;
      }
    }
    return field;
  });

  brush.field("swirl");
  brush.wiggle(2);

  brush.set("spray", "#e8b4a8", 2.8);
  const count = 150;
  for (let i = 0; i < count; i++) {
    const x = random(100, 500);
    const y = random(100, 500);
    const length = random(40, 80);
    const dir = random(360);
    brush.flowLine(x, y, length, dir);
  }

  brush.noField();
  noLoop();
}