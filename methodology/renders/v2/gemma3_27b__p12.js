function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const numParticles = 150;
  const spawnPoints = [];
  for (let i = 0; i < numParticles; i++) {
    spawnPoints.push([random(-250, 250), random(-250, 250)]);
  }

  brush.addField("swarmFlow", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        field[c][r] = noise(c * 0.04, r * 0.04) * 360;
      }
    }
    return field;
  });
  brush.field("swarmFlow");
  brush.wiggle(2);

  brush.set("spray", "#2a3860", 1.5);
  for (const [x, y] of spawnPoints) {
    brush.flowLine(x, y, random(20, 40), 0);
  }
  brush.noField();

  noLoop();
}