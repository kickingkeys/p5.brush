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
    "#c7898f",
    "#d49a95",
    "#b97d7d",
    "#c79a6a",
    "#b9874c",
    "#a86f52",
    "#d7b07c"
  ];

  brush.noField();
  brush.noStroke();
  brush.noHatch();
  brush.noMass();
  brush.noWash();

  brush.fillTexture(0.58, 0.28);

  for (let i = 0; i < 26; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    let r = random(38, 92);

    if (i < 8) r = random(70, 120);

    brush.fill(random(palette), random(28, 62));
    brush.fillBleed(random(0.34, 0.58), "out");
    brush.circle(x, y, r, random(0.08, 0.35));
  }

  for (let i = 0; i < 14; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    let r = random(28, 64);

    brush.fill(random(palette), random(18, 36));
    brush.fillBleed(random(0.45, 0.68), "out");
    brush.circle(x, y, r, random(0.15, 0.45));
  }

  brush.noFill();
  brush.noWash();
  brush.noHatch();
  brush.noMass();
  brush.noStroke();
  brush.noField();

  noLoop();
}