function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("swarmFlow", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.03, r * 0.03) * 360;
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

  const spawnPoints = (count) => {
    let pts = [];
    while (pts.length < count) {
      let x = random(20, 580);
      let y = random(20, 580);
      if (noise(x * 0.006, y * 0.006) > 0.42) {
        pts.push([x, y]);
      }
    }
    return pts;
  };

  brush.set("spray", "#0f172a", 3.2);
  let pts1 = spawnPoints(90);
  for (let p of pts1) {
    brush.flowLine(p[0], p[1], random(45, 85), 0);
  }

  brush.set("spray", "#1e3a8a", 2.4);
  let pts2 = spawnPoints(130);
  for (let p of pts2) {
    brush.flowLine(p[0] + random(-10, 10), p[1] + random(-10, 10), random(35, 60), 0);
  }

  brush.set("spray", "#334155", 1.5);
  let pts3 = spawnPoints(160);
  for (let p of pts3) {
    brush.flowLine(p[0] + random(-8, 8), p[1] + random(-8, 8), random(25, 45), 0);
  }

  brush.set("spray", "#0d9488", 0.9);
  let pts4 = spawnPoints(110);
  for (let p of pts4) {
    brush.flowLine(p[0] + random(-5, 5), p[1] + random(-5, 5), random(15, 30), 0);
  }

  brush.set("charcoal", "#0f172a", 0.6);
  let pts5 = spawnPoints(70);
  for (let p of pts5) {
    brush.flowLine(p[0], p[1], random(5, 12), 0);
  }

  brush.noField();
  noLoop();
}