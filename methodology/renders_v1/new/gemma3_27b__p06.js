function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let numBirds = 50;
  for (let i = 0; i < numBirds; i++) {
    let x = random(-200, 200);
    let y = random(-200, 200);
    let angle = random(0, 360);
    let length = random(50, 150);
    let swirl = map(sin(frameCount * 0.05 + i * 0.2), -1, 1, -20, 20);

    push();
    translate(x, y);
    rotate(angle + swirl);

    brush.set("marker", "#333", 0.8);
    brush.line(0, 0, length, 0);

    pop();
  }

  noLoop();
}