function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(42);
  noiseSeed(42);

  const palette = [
    "#c98f95",
    "#b97b82",
    "#d2a07d",
    "#b98558",
    "#d7a6a1",
    "#c79a6a"
  ];

  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  brush.fillTexture(0.6, 0.32);

  for (let i = 0; i < 26; i++) {
    let x = random(70, 530);
    let y = random(70, 530);

    if (random() < 0.35) {
      x = constrain(randomGaussian(300, 95), 60, 540);
      y = constrain(randomGaussian(300, 95), 60, 540);
    }

    let r = random(42, 108);
    let col = random(palette);

    brush.fill(col, random(30, 62));
    brush.fillBleed(random(0.34, 0.56), "out");
    brush.circle(x, y, r, random(0.08, 0.35));
  }

  for (let i = 0; i < 12; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    let r = random(55, 130);
    let col = random(palette);

    brush.fill(col, random(22, 42));
    brush.fillBleed(random(0.42, 0.68), "out");
    brush.circle(x, y, r, random(0.15, 0.45));
  }

  brush.noFill();

  noLoop();
}