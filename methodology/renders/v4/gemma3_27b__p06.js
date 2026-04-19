function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let numBirds = 50;
  let spawnPoints = [];
  for (let i = 0; i < numBirds; i++) {
    spawnPoints.push([random(100, 500), random(100, 500)]);
  }

  brush.field("curved");
  brush.wiggle(2);

  brush.set("marker", "#2a3860", 0.8);
  for (const [x, y] of spawnPoints) {
    let length = random(30, 70);
    let dir = random(360);
    brush.flowLine(x, y, length, dir);
  }
  brush.noField();

  noLoop();
}