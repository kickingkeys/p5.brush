function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("ghostField", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.025, r * 0.025) * 540;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("ghostField");
  brush.wiggle(2);

  let particles = [];
  for (let i = 0; i < 400; i++) {
    let u = random();
    let v = random();
    let r = 220 * Math.pow(u, 1.5); 
    let theta = v * 360;
    particles.push([300 + r * cos(theta), 300 + r * sin(theta)]);
  }

  brush.set("spray", "#2c3140", 3.5);
  for (let p of particles) {
    brush.flowLine(p[0], p[1], random(60, 110), 0);
  }

  brush.set("spray", "#4a536b", 2.6);
  for (let p of particles) {
    brush.flowLine(p[0] + random(-8, 8), p[1] + random(-8, 8), random(50, 90), 0);
  }

  brush.set("spray", "#737f99", 1.8);
  for (let p of particles) {
    brush.flowLine(p[0] + random(-5, 5), p[1] + random(-5, 5), random(35, 70), 0);
  }

  brush.set("spray", "#a8b3c7", 1.0);
  for (let p of particles) {
    brush.flowLine(p[0] + random(-3, 3), p[1] + random(-3, 3), random(20, 50), 0);
  }

  brush.set("spray", "#dce1eb", 0.5);
  for (let p of particles) {
    brush.flowLine(p[0], p[1], random(10, 30), 0);
  }

  brush.set("pen", "#1a1d26", 0.4);
  for (let p of particles) {
    if (random() > 0.4) {
      brush.flowLine(p[0], p[1], random(2, 6), 0);
    }
  }

  brush.noField();
  noLoop();
}