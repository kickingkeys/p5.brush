function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("swarmFlow", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.035, r * 0.035) * 360 * 2;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("swarmFlow");
  brush.wiggle(2);

  let spawns = [];
  for (let i = 0; i < 6; i++) {
    let cx = random(150, 450);
    let cy = random(150, 450);
    for (let j = 0; j < 90; j++) {
      spawns.push([cx + randomGaussian() * 45, cy + randomGaussian() * 45]);
    }
  }

  brush.set("spray", "#1e2433", 3.2);
  for (let p of spawns) {
    brush.flowLine(p[0] + random(-15, 15), p[1] + random(-15, 15), random(50, 100), 0);
  }

  brush.set("spray", "#34445e", 2.4);
  for (let p of spawns) {
    brush.flowLine(p[0] + random(-10, 10), p[1] + random(-10, 10), random(40, 80), 0);
  }

  brush.set("spray", "#5b738c", 1.6);
  for (let p of spawns) {
    brush.flowLine(p[0] + random(-5, 5), p[1] + random(-5, 5), random(25, 60), 0);
  }

  brush.set("spray", "#8fa7b8", 0.9);
  for (let p of spawns) {
    brush.flowLine(p[0] + random(-2, 2), p[1] + random(-2, 2), random(15, 40), 0);
  }

  brush.set("spray", "#cddce6", 0.5);
  for (let p of spawns) {
    if (random() > 0.3) {
      brush.flowLine(p[0], p[1], random(10, 25), 0);
    }
  }

  brush.set("charcoal", "#151a26", 0.8);
  for (let p of spawns) {
    if (random() > 0.6) {
      brush.flowLine(p[0], p[1], random(15, 45), 0);
    }
  }

  brush.set("rotring", "#151a26", 0.35);
  for (let p of spawns) {
    if (random() > 0.85) {
      brush.flowLine(p[0], p[1], random(5, 20), 0);
    }
  }

  brush.noField();
  noLoop();
}