function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Create a vector field
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

  // Spawn points
  const numParticles = 100;
  const spawnPoints = [];
  for (let i = 0; i < numParticles; i++) {
    spawnPoints.push([random(-300, 300), random(-300, 300)]);
  }

  // Draw particles with spray trails
  brush.set("spray", "#2a3860", 1.5);
  for (const [x, y] of spawnPoints) {
    brush.flowLine(x, y, random(20, 40), 0);
  }
  brush.noField();
  brush.noWiggle();

  // Add some charcoal strokes for highlights
  brush.set("charcoal", "#ddd", 0.8);
  for (let i = 0; i < 20; i++) {
    const x = random(-300, 300);
    const y = random(-300, 300);
    brush.beginShape();
    brush.vertex(x, y);
    brush.endShape();
  }

  noLoop();
}