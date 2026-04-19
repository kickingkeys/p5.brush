let centers = [];

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

  centers = [
    [220, 380],
    [400, 220],
    [300, 320]
  ];
}

function getSpawnPoint() {
  let center = random(centers);
  let r = randomGaussian(0, 75);
  let theta = random(360);
  return [center[0] + r * cos(theta), center[1] + r * sin(theta)];
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("swarmFlow");
  brush.wiggle(2);

  const palette = ["#1a2639", "#3e5476", "#6b82a8", "#9eb2ce", "#cfd9e8"];

  brush.set("spray", palette[4], 3.2);
  for (let i = 0; i < 200; i++) {
    let [x, y] = getSpawnPoint();
    brush.flowLine(x, y, random(50, 100), 0);
  }

  for (let i = 0; i < 250; i++) {
    brush.set("spray", random([palette[2], palette[3]]), random(2.0, 2.8));
    let [x, y] = getSpawnPoint();
    brush.flowLine(x, y, random(30, 70), 0);
  }

  for (let i = 0; i < 200; i++) {
    brush.set("spray", random([palette[0], palette[1]]), random(1.0, 1.8));
    let [x, y] = getSpawnPoint();
    brush.flowLine(x, y, random(20, 50), 0);
  }

  for (let i = 0; i < 150; i++) {
    brush.set("spray", palette[0], random(0.4, 0.9));
    let [x, y] = getSpawnPoint();
    brush.flowLine(x, y, random(10, 30), 0);
  }

  brush.noField();
  brush.wiggle(1);

  for (let i = 0; i < 100; i++) {
    brush.set("charcoal", "#111824", random(0.3, 0.6));
    let [x, y] = getSpawnPoint();
    brush.line(x, y, x + random(-2, 2), y + random(-2, 2));
  }

  noLoop();
}