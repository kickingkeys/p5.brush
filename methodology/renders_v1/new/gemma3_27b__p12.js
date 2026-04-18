function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let field = createVectorField();

  let numParticles = 100;
  for (let i = 0; i < numParticles; i++) {
    let x = random(-200, 200);
    let y = random(-200, 200);
    let pos = createVector(x, y);

    for (let j = 0; j < 50; j++) {
      let force = field.get(pos.x, pos.y);
      pos.add(force);

      brush.set("spray", "#333333", 0.2);
      brush.noStroke();
      brush.circle(pos.x, pos.y, 1);
    }
  }

  noLoop();
}

function createVectorField() {
  let field = new Array(width);
  for (let i = 0; i < width; i++) {
    field[i] = new Array(height);
    for (let j = 0; j < height; j++) {
      let angle = noise(i * 0.01, j * 0.01) * 360;
      field[i][j] = p5.Vector.fromAngle(radians(angle), 1);
    }
  }
  return {
    get: function(x, y) {
      let i = floor(constrain(x + width/2, 0, width - 1));
      let j = floor(constrain(y + height/2, 0, height - 1));
      return field[i][j];
    }
  };
}