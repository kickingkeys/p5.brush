function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("curved");

  brush.noStroke();
  brush.mass("pastel", "#666666", { strength: 0.5, precision: 0.2, gradient: 0.8, outline: false });
  brush.beginShape(0.4);
  brush.vertex(60, 560);
  brush.vertex(140, 460);
  brush.vertex(280, 310);
  brush.vertex(250, 360);
  brush.vertex(100, 530);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.mass("crayon", "#444444", { strength: 0.7, precision: 0.3, outline: false });
  brush.beginShape(0.5);
  brush.vertex(160, 420);
  brush.vertex(280, 290);
  brush.vertex(340, 240);
  brush.vertex(250, 330);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.set("spray", "#3a3a3a", 2.5);
  for (let i = 0; i < 70; i++) {
    let sx = random(80, 350);
    let sy = random(260, 520);
    brush.flowLine(sx, sy, random(15, 45), random(360));
  }

  brush.noField();
  brush.field("hand");
  brush.wiggle(5);

  let strokes = [
    [[260, 280, 0.8], [310, 220, 1.2], [350, 170, 0.9], [380, 140, 1.5], [390, 120, 0.5]],
    [[250, 290, 0.5], [300, 230, 1.4], [340, 180, 1.0], [375, 145, 1.2]],
    [[370, 130, 0.8], [390, 110, 1.1], [405, 135, 0.9], [380, 150, 0.6], [365, 130, 0.4]],
    [[260, 280, 1.5], [340, 270, 1.0], [420, 250, 1.2], [480, 220, 0.8], [530, 200, 0.4]],
    [[270, 295, 1.0], [350, 285, 0.8], [430, 265, 1.4], [500, 230, 0.7]],
    [[260, 280, 1.4], [210, 340, 1.1], [160, 400, 1.3], [110, 460, 0.6]],
    [[245, 270, 0.9], [195, 330, 1.5], [145, 390, 1.0], [90, 450, 0.5]],
    [[310, 220, 1.2], [380, 180, 0.9], [440, 130, 1.1], [470, 100, 0.4]],
    [[320, 235, 0.8], [390, 195, 1.0], [450, 145, 0.7]],
    [[310, 220, 1.3], [250, 190, 1.0], [190, 170, 1.2], [140, 160, 0.5]],
    [[310, 220, 0.6], [290, 240, 0.9], [270, 270, 0.5]],
    [[330, 200, 0.7], [310, 230, 1.1], [280, 280, 0.6]]
  ];

  for (let s of strokes) {
    brush.set("charcoal", "#2a2a2a", random(0.6, 1.3));
    brush.spline(s, 0.3);
  }

  brush.set("charcoal", "#111111", 1.8);
  let accents = [
    [[260, 280, 1.5], [280, 260, 1.8], [310, 220, 1.4]],
    [[310, 220, 1.6], [330, 200, 1.2]],
    [[260, 280, 1.7], [230, 310, 1.3]],
    [[340, 270, 1.5], [370, 265, 1.1]],
    [[380, 140, 1.4], [390, 120, 1.8]]
  ];

  for (let a of accents) {
    brush.spline(a, 0.2);
  }

  brush.set("charcoal", "#555555", 0.7);
  brush.spline([[100, 500, 0.1], [180, 420, 0.8], [280, 320, 1.2], [400, 200, 0.5], [500, 100, 0.1]], 0.4);
  brush.spline([[150, 520, 0.2], [230, 430, 0.9], [320, 300, 1.0], [450, 180, 0.4]], 0.5);

  brush.noField();
  noLoop();
}