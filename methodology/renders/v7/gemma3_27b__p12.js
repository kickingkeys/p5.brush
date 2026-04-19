function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Custom vector field for particle movement
  let field = [];
  for (let x = 0; x < 600; x++) {
    field[x] = [];
    for (let y = 0; y < 600; y++) {
      let angle = noise(x * 0.01, y * 0.01) * 360;
      field[x][y] = angle;
    }
  }

  // Particle spawn points
  let spawnPoints = [];
  for (let i = 0; i < 150; i++) {
    spawnPoints.push([random(-250, 250), random(-250, 250)]);
  }

  // Draw particles with trails
  brush.set("spray", "#2a3860", 1.5);
  for (let i = 0; i < spawnPoints.length; i++) {
    let x = spawnPoints[i][0];
    let y = spawnPoints[i][1];
    let angle = field[Math.floor(x + 300)][Math.floor(y + 300)];

    // Draw trail
    for (let j = 0; j < 5; j++) {
      let trailX = x + cos(angle) * j * 2;
      let trailY = y + sin(angle) * j * 2;

      brush.stroke("#2a3860");
      brush.strokeWeight(0.5);
      brush.line(trailX, trailY, trailX + cos(angle) * 2, trailY + sin(angle) * 2);
    }
  }
  
  // Add some charcoal lines to suggest structure
  brush.set("charcoal", "#333", 0.8);
  brush.line(-280, -280, 280, 280);
  brush.line(-280, 280, 280, -280);

  noLoop();
}