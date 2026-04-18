function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("waves");

  const colors = [
    "#d28c8c",
    "#cda896",
    "#b57a70",
    "#d8a051",
    "#e4bc7f",
    "#c68d4a",
    "#e8b4b8"
  ];

  brush.noStroke();

  for (let i = 0; i < 45; i++) {
    let x = random(-50, 650);
    let y = random(-50, 650);
    let r = random(40, 160);
    let col = random(colors);
    let op = random(50, 130);

    brush.fill(col, op);
    brush.fillBleed(random(0.3, 0.8), "out");
    brush.fillTexture(random(0.4, 0.7), random(0.4, 0.8));

    brush.circle(x, y, r, random(0.2, 0.8));
  }

  brush.noFill();
  
  for (let i = 0; i < 12; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let r = random(20, 80);
    brush.set("2H", random(colors), random(0.5, 1.5));
    brush.circle(x, y, r, true);
  }

  for (let i = 0; i < 6; i++) {
    let x = random(100, 500);
    let y = random(100, 500);
    let r = random(30, 100);
    brush.set("spray", random(colors), random(0.8, 1.5));
    brush.circle(x, y, r, true);
  }

  noLoop();
}