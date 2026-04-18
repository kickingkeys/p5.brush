function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let numParticles = 50;
  for (let i = 0; i < numParticles; i++) {
    let x = random(-250, 250);
    let y = random(-250, 250);

    brush.set(random(["2B", "HB", "2H", "cpencil", "pen", "rotring", "spray", "marker", "charcoal", "pastel", "crayon"]),
              `hsl(${random(360)}, 60%, 60%)`,
              random(0.5, 2));

    brush.field(random(["hand", "curved", "zigzag", "waves", "seabed", "spiral", "columns"]));
    brush.refreshField(frameCount * 0.02);

    for (let j = 0; j < 10; j++) {
      brush.line(x, y, x + random(-10, 10), y + random(-10, 10));
      x += random(-2, 2);
      y += random(-2, 2);
    }
  }

  noLoop();
}