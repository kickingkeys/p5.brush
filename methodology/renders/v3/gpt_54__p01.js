function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  const palette = [
    "#c58b92",
    "#b97a82",
    "#d2a08f",
    "#c79272",
    "#b98557",
    "#a96f5f",
    "#d6a58f"
  ];

  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noField();
  brush.fillTexture(0.58, 0.32);

  for (let i = 0; i < 34; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let r = random(42, 120);

    if (i < 10) r = random(85, 135);

    brush.fill(random(palette), random(30, 62));
    brush.fillBleed(random(0.34, 0.58), "out");
    brush.circle(x, y, r, random(0.08, 0.35));
  }

  for (let i = 0; i < 18; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let r = random(28, 78);

    brush.fill(random(palette), random(22, 45));
    brush.fillBleed(random(0.38, 0.62), "out");
    brush.circle(x, y, r, random(0.15, 0.45));
  }

  brush.noFill();

  noLoop();
}