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
    let y = random(-150, 150);
    let size = random(50, 120);

    brush.fill("#f2d7d5", random(120, 180));
    brush.fillBleed(0.3, "out");
    brush.noStroke();
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 10) {
      let r = size / 2;
      let px = x + cos(a) * r;
      let py = y + sin(a) * r;
      brush.vertex(px, py);
    }
    brush.endShape(true);
  }

  for (let i = 0; i < 10; i++) {
    let x = random(-150, 150);
    let y = random(-100, 100);
    let size = random(30, 80);

    brush.fill("#e9c46a", random(100, 160));
    brush.fillBleed(0.2, "out");
    brush.noStroke();
    brush.beginShape(0.4);
    for (let a = 0; a < 360; a += 15) {
      let r = size / 2;
      let px = x + cos(a) * r;
      let py = y + sin(a) * r;
      brush.vertex(px, py);
    }
    brush.endShape(true);
  }

  noLoop();
}