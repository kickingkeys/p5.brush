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
        field[col][row] = atan2(dy, dx) + sin(t * 0.01 + dy * 0.02) * 20;
      }
    }
    return field;
  });
  
  brush.field("swirl");
  brush.wiggle(2);
  
  brush.set("spray", "#553344", 2.0);
  for (let i = 0; i < 120; i++) {
    const angle = random(TWO_PI);
    const radius = random(100, 200);
    const x = 300 + cos(angle) * radius;
    const y = 300 + sin(angle) * radius;
    brush.flowLine(x, y, random(20, 60), 0);
  }
  
  brush.noField();
  noLoop();
}