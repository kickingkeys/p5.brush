function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  const palette = [
    "#dca7a5", 
    "#c68786", 
    "#dcb285", 
    "#c79b63", 
    "#ba8a5b", 
    "#e3b8a6",
    "#d6958a"
  ];

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);

  for (let i = 0; i < 50; i++) {
    let cx = random(20, 580);
    let cy = random(20, 580);
    let baseR = random(30, 120);
    let col = random(palette);

    brush.fill(col, random(30, 65));
    brush.fillBleed(random(0.4, 0.7), "out");

    brush.beginShape(0.5);
    let noiseOffset = random(1000);
    for (let j = 0; j < 40; j++) {
      let a = (j / 40) * 360;
      let n = noise(noiseOffset + cos(a) * 0.6, noiseOffset + sin(a) * 0.6);
      let r = baseR * (0.75 + n * 0.5);
      brush.vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    brush.endShape(CLOSE);
  }

  brush.noFill();
  noLoop();
}