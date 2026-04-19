function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("hand");
  brush.wiggle(4);

  brush.noStroke();

  brush.mass("pastel", "#555555", { strength: 0.35, precision: 0.15, gradient: 0.6 });
  brush.beginShape(0.4);
  brush.vertex(60, 580);
  brush.vertex(160, 490);
  brush.vertex(280, 380);
  brush.vertex(240, 440);
  brush.vertex(110, 590);
  brush.endShape(CLOSE);

  brush.beginShape(0.4);
  brush.vertex(130, 370);
  brush.vertex(250, 290);
  brush.vertex(220, 340);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.mass("crayon", "#2a2a2a", { strength: 0.65, precision: 0.35, outline: false });
  brush.beginShape(0.5);
  brush.vertex(210, 430);
  brush.vertex(290, 340);
  brush.vertex(250, 390);
  brush.endShape(CLOSE);

  brush.beginShape(0.5);
  brush.vertex(240, 280);
  brush.vertex(310, 250);
  brush.vertex(290, 310);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.noFill();

  brush.set("charcoal", "#111111", 1.2);
  brush.circle(350, 180, 22, true);
  brush.set("charcoal", "#333333", 0.7);
  brush.circle(348, 182, 25, true);

  brush.set("charcoal", "#0a0a0a", 1.8);
  brush.spline([
    [340, 200, 0.6],
    [310, 250, 1.2],
    [290, 310, 1.5],
    [305, 340, 0.8]
  ], 0.3);

  brush.set("charcoal", "#222222", 1.0);
  brush.spline([
    [355, 205, 0.4],
    [325, 245, 1.0],
    [310, 290, 1.2],
    [320, 320, 0.6]
  ], 0.3);

  brush.set("charcoal", "#111111", 1.5);
  brush.spline([
    [305, 340, 1.2],
    [390, 320, 1.5],
    [470, 270, 0.8],
    [520, 230, 0.3]
  ], 0.2);

  brush.set("charcoal", "#444444", 0.8);
  brush.spline([
    [295, 330, 0.8],
    [380, 305, 1.0],
    [460, 260, 0.5]
  ], 0.2);

  brush.set("charcoal", "#050505", 1.6);
  brush.spline([
    [290, 310, 1.4],
    [230, 380, 1.2],
    [150, 480, 0.9],
    [90, 540, 0.2]
  ], 0.2);

  brush.set("charcoal", "#1a1a1a", 1.3);
  brush.spline([
    [320, 240, 1.2],
    [400, 200, 1.0],
    [460, 140, 0.4]
  ], 0.2);

  brush.set("charcoal", "#222222", 1.2);
  brush.spline([
    [300, 255, 1.0],
    [230, 275, 0.8],
    [160, 310, 0.3]
  ], 0.2);

  brush.set("charcoal", "#444444", 0.5);
  for (let i = 0; i < 14; i++) {
    let ox = random(-35, 35);
    let oy = random(-35, 35);
    brush.spline([
      [80 + ox, 550 + oy, 0.1],
      [170 + ox, 460 + oy, 0.5],
      [270 + ox, 360 + oy, 0.1]
    ], 0.4);
  }

  for (let i = 0; i < 10; i++) {
    let ox = random(-25, 25);
    let oy = random(-25, 25);
    brush.spline([
      [140 + ox, 340 + oy, 0.1],
      [210 + ox, 290 + oy, 0.4],
      [290 + ox, 230 + oy, 0.1]
    ], 0.3);
  }

  brush.set("charcoal", "#000000", 2.3);
  brush.line(290, 310, 305, 335);
  brush.line(310, 250, 325, 245);
  brush.line(230, 380, 245, 370);

  brush.noField();
  noLoop();
}