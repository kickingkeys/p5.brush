function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  for (let i = 0; i < 20; i++) {
    let x = random(-200, 200);
    let y = random(-200, 200);
    let radius = random(40, 100);

    let bloomColor = color(random(230, 255), random(200, 240), random(200, 230));
    let bleed = random(0.1, 0.4);

    brush.fill(bloomColor, 120);
    brush.fillBleed(bleed);
    brush.noStroke();
    brush.circle(x, y, radius, true);
  }

  for (let i = 0; i < 10; i++) {
    let x = random(-150, 150);
    let y = random(-150, 150);
    let radius = random(60, 120);

    let bloomColor = color(random(220, 255), random(180, 220), random(160, 200));
    let bleed = random(0.2, 0.5);

    brush.fill(bloomColor, 80);
    brush.fillBleed(bleed);
    brush.noStroke();
    brush.circle(x, y, radius, true);
  }

  noLoop();
}