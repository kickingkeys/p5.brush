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

  brush.noField();
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noWash();

  brush.fillTexture(0.58, 0.28);

  let palette = [
    "#c88f91",
    "#d7a6a1",
    "#c79a5e",
    "#d7b07c",
    "#b9874c",
    "#b97d7f"
  ];

  for (let i = 0; i < 26; i++) {
    let x = random(70, 530);
    let y = random(70, 530);

    if (random() < 0.35) {
      x = constrain(randomGaussian(width * 0.5, 90), 60, 540);
      y = constrain(randomGaussian(height * 0.5, 90), 60, 540);
    }

    let r = random(40, 110);
    let col = random(palette);
    let alpha = random(32, 62);

    brush.fill(col, alpha);
    brush.fillBleed(random(0.36, 0.56), "out");
    brush.circle(x, y, r, random(0.12, 0.45));
  }

  for (let i = 0; i < 12; i++) {
    let x = constrain(randomGaussian(width * 0.5, 110), 50, 550);
    let y = constrain(randomGaussian(height * 0.5, 110), 50, 550);
    let r = random(55, 125);

    brush.fill(random(palette), random(24, 46));
    brush.fillBleed(random(0.42, 0.64), "out");
    brush.circle(x, y, r, random(0.15, 0.5));
  }

  brush.noFill();
  brush.noWash();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  noLoop();
}