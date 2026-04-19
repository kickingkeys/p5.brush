function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  
  randomSeed(142);
  noiseSeed(142);

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

  const palette = ["#2a3860", "#4f628e", "#8895b3", "#d6c5c3", "#a39ba8"];

  let spawnPoints = [];
  for (let i = 0; i < 450; i++) {
    let x = random(-50, width + 50);
    let y = random(-50, height + 50);
    if (dist(x, y, width / 2, height / 2) < 280 || random() > 0.6) {
      spawnPoints.push([x, y]);
    }
  }

  for (let i = 0; i < spawnPoints.length; i++) {
    let [x, y] = spawnPoints[i];
    brush.set("spray", random(palette), random(2.5, 3.8));
    brush.flowLine(x, y, random(50, 110), 0);
  }

  for (let i = 0; i < spawnPoints.length; i++) {
    let [x, y] = spawnPoints[i];
    let sx = x + random(-15, 15);
    let sy = y + random(-15, 15);
    brush.set("spray", random(palette), random(1.2, 2.4));
    brush.flowLine(sx, sy, random(30, 75), 0);
  }

  for (let i = 0; i < spawnPoints.length * 0.7; i++) {
    let [x, y] = spawnPoints[i];
    let sx = x + random(-8, 8);
    let sy = y + random(-8, 8);
    brush.set("spray", random(palette), random(0.5, 1.1));
    brush.flowLine(sx, sy, random(15, 40), 0);
  }

  for (let i = 0; i < spawnPoints.length * 0.25; i++) {
    let [x, y] = spawnPoints[i];
    let sx = x + random(-3, 3);
    let sy = y + random(-3, 3);
    brush.set("charcoal", random(palette), random(0.3, 0.6));
    brush.flowLine(sx, sy, random(4, 12), 0);
  }

  brush.noField();
  noLoop();
}