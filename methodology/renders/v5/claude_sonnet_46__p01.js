function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  const dustyPinks = [
    "#c9847a",
    "#c47b8a",
    "#b87070",
    "#d4917e",
    "#c28880",
    "#b96e6e",
    "#cc8878"
  ];

  const ochres = [
    "#b8924a",
    "#c09a52",
    "#b38840",
    "#c4a05a",
    "#aa8038",
    "#bf9848",
    "#c8a460"
  ];

  const allColors = dustyPinks.concat(ochres);

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  for (let i = 0; i < 28; i++) {
    const x = random(40, 560);
    const y = random(40, 560);
    const r = random(50, 130);
    const col = random(allColors);
    const op = random(28, 62);
    const bleed = random(0.35, 0.62);

    brush.fill(col, op);
    brush.fillBleed(bleed, "out");
    brush.circle(x, y, r);
  }

  brush.noFill();

  noLoop();
}