function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.addField("swirl", function(t, field) {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let x = map(col, 0, field.length, 0, width);
        let y = map(row, 0, field[0].length, 0, height);
        let d = dist(x, y, width/2, height/2);
        let angle = atan2(y - height/2, x - width/2);
        field[col][row] = degrees(angle) + (d < 200 ? -90 : 0);
      }
    }
    return field;
  });

  brush.field("swirl");
  brush.set("spray", "#663344", 0.8);
  
  for (let i = 0; i < 120; i++) {
    let angle = random(TWO_PI);
    let d = random(20, 180);
    let x = width/2 + cos(angle) * d;
    let y = height/2 + sin(angle) * d;
    
    let steps = int(random(15, 40));
    for (let j = 0; j < steps; j++) {
      brush.flowLine(x, y, random(3, 8), random(360));
      let nextAngle = noise(x * 0.01, y * 0.01, frameCount * 0.02) * TWO_PI;
      x += cos(nextAngle) * random(2, 6);
      y += sin(nextAngle) * random(2, 6);
    }
  }
  
  brush.noField();
  noLoop();
}