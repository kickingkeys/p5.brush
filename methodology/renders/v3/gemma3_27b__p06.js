function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Vector field for bird motion
  brush.field("curved");

  // Bird parameters
  let numBirds = 50;
  let birdColor = "#333333";
  let birdSize = 5;

  // Generate and draw birds
  for (let i = 0; i < numBirds; i++) {
    let x = random(-250, 250);
    let y = random(-250, 250);
    let angle = random(360);

    brush.set("marker", birdColor, 0.8);
    brush.flowLine(x, y, random(10, 30), angle);
  }

  // Wind effect
  brush.noField();
  brush.set("spray", "#e0e0e0", 0.2);
  for (let i = 0; i < 100; i++) {
    let x = random(-300, 300);
    let y = random(-300, 300);
    brush.circle(x, y, random(1, 3));
  }

  noLoop();
}