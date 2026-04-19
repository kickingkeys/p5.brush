function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noStroke();
  noFill();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  const palette = [
    "#d9a7a7",
    "#c88f91",
    "#d7b07c",
    "#c99a67",
    "#b98359",
    "#e0b8ab",
    "#c79b82"
  ];

  brush.noField();
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noWash();

  brush.fillTexture(0.58, 0.32);

  for (let i = 0; i < 28; i++) {
    const x = random(70, 530);
    const y = random(70, 530);
    const r = random(38, 95);

    brush.fill(random(palette), random(28, 62));
    brush.fillBleed(random(0.34, 0.58), "out");
    brush.circle(x, y, r, random(0.08, 0.45));
  }

  for (let i = 0; i < 14; i++) {
    const x = random(90, 510);
    const y = random(90, 510);
    const r = random(55, 120);

    brush.fill(random(palette), random(22, 46));
    brush.fillBleed(random(0.42, 0.68), "out");
    brush.circle(x, y, r, random(0.12, 0.55));
  }

  brush.noFill();
  noLoop();
}