function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  let numBirds = 50;
  for (let i = 0; i < numBirds; i++) {
    let x = random(-250, 250);
    let y = random(-250, 250);
    let angle = random(0, 360);
    let speed = random(1, 3);
    let brushType = random(['2B', 'HB', '2H', 'cpencil', 'pen', 'rotring', 'spray', 'marker', 'charcoal', 'pastel', 'crayon']);
    let color = color(random(50, 200), random(50, 200), random(50, 200));

    brush.set(brushType, color, random(0.5, 1.5));

    let pathLength = random(20, 80);
    let curveFactor = random(-10, 10);

    brush.beginStroke("curve", x, y);
    for (let j = 0; j < pathLength; j++) {
      let angleVariation = map(sin(j * 0.1 + frameCount * 0.05), -1, 1, -20, 20);
      let newAngle = angle + angleVariation;
      brush.move(newAngle, speed, random(0.3, 0.8));
    }
    brush.endStroke(angle + angleVariation, random(0.5, 1));
  }

  noLoop();
}