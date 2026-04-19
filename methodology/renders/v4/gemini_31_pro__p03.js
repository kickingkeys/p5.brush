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
  brush.mass("pastel", "#d4d0c9", {
    strength: 0.3,
    precision: 0.2,
    gradient: 0.8,
    outline: false
  });
  brush.beginShape(0.4);
  brush.vertex(380, 200);
  brush.vertex(450, 300);
  brush.vertex(520, 500);
  brush.vertex(460, 520);
  brush.vertex(350, 380);
  brush.vertex(310, 260);
  brush.endShape(true);
  brush.noMass();

  brush.mass("pastel", "#b0aba2", {
    strength: 0.45,
    precision: 0.3,
    gradient: 0.5,
    outline: false
  });
  brush.beginShape(0.5);
  brush.vertex(350, 160);
  brush.vertex(400, 180);
  brush.vertex(480, 280);
  brush.vertex(440, 320);
  brush.vertex(330, 240);
  brush.endShape(true);
  brush.noMass();

  brush.noStroke();
  brush.hatchStyle("charcoal", "#8a8680", 0.7);
  brush.hatch(7, 135, { rand: 0.25, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(330, 250);
  brush.vertex(420, 380);
  brush.vertex(500, 480);
  brush.vertex(450, 490);
  brush.vertex(360, 390);
  brush.vertex(290, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("charcoal", "#706d68", 0.5);
  brush.hatch(5, 110, { rand: 0.15, continuous: true });
  brush.beginShape(0.5);
  brush.vertex(340, 150);
  brush.vertex(420, 200);
  brush.vertex(490, 260);
  brush.vertex(460, 290);
  brush.vertex(350, 220);
  brush.endShape(true);
  brush.noHatch();

  brush.set("spray", "#615d58", 2.5);
  for (let i = 0; i < 45; i++) {
    let sx = random(320, 520);
    let sy = random(200, 500);
    brush.flowLine(sx, sy, random(15, 40), random(120, 160));
  }

  brush.set("charcoal", "#524f4a", 0.6);
  for (let i = 0; i < 6; i++) {
    brush.spline([
      [480 + random(-20, 20), 480 + random(-20, 20), random(0.2, 0.6)],
      [380 + random(-15, 15), 380 + random(-15, 15), random(0.3, 0.8)],
      [280 + random(-10, 10), 320 + random(-10, 10), random(0.5, 1.0)]
    ], 0.3);
  }

  for (let i = 0; i < 5; i++) {
    brush.spline([
      [460 + random(-15, 15), 260 + random(-15, 15), random(0.2, 0.5)],
      [380 + random(-10, 10), 220 + random(-10, 10), random(0.4, 0.7)],
      [320 + random(-10, 10), 210 + random(-10, 10), random(0.5, 1.0)]
    ], 0.4);
  }

  brush.set("charcoal", "#2b2a28", 1.0);
  for (let i = 0; i < 3; i++) {
    let ox = random(-5, 5);
    let oy = random(-5, 5);
    brush.spline([
      [330 + ox, 160 + oy, random(0.8, 1.5)],
      [300 + ox, 240 + oy, random(0.6, 1.2)],
      [280 + ox, 320 + oy, random(1.0, 1.8)]
    ], 0.4);
    
    brush.spline([
      [280 + ox, 320 + oy, random(1.0, 1.5)],
      [190 + ox, 290 + oy, random(0.7, 1.2)],
      [100 + ox, 250 + oy, random(0.4, 0.8)]
    ], 0.3);

    brush.spline([
      [280 + ox, 320 + oy, random(1.0, 1.5)],
      [350 + ox, 410 + oy, random(0.6, 1.1)],
      [430 + ox, 480 + oy, random(0.3, 0.7)]
    ], 0.3);

    brush.spline([
      [310 + ox, 220 + oy, random(0.8, 1.3)],
      [220 + ox, 180 + oy, random(0.5, 1.0)],
      [140 + ox, 120 + oy, random(0.3, 0.6)]
    ], 0.4);
  }

  brush.set("charcoal", "#2b2a28", 1.0);
  for (let i = 0; i < 4; i++) {
    brush.circle(345 + random(-4, 4), 145 + random(-4, 4), 18 + random(-3, 3), true);
  }

  brush.set("charcoal", "#121110", 2.2);
  brush.spline([
    [340, 165, 1.5],
    [305, 245, 1.0],
    [285, 320, 2.0]
  ], 0.4);

  brush.spline([
    [285, 320, 1.8],
    [210, 300, 1.2],
    [150, 275, 0.6]
  ], 0.3);

  brush.spline([
    [285, 320, 1.5],
    [330, 380, 1.0],
    [360, 420, 0.4]
  ], 0.3);

  brush.spline([
    [315, 215, 1.4],
    [260, 195, 1.0],
    [200, 155, 0.5]
  ], 0.4);

  brush.spline([
    [335, 155, 1.2],
    [355, 140, 1.8],
    [330, 135, 1.0]
  ], 0.5);

  brush.set("spray", "#1a1918", 1.2);
  for (let i = 0; i < 15; i++) {
    brush.flowLine(random(270, 350), random(130, 340), random(5, 15), random(360));
  }

  brush.noField();
  noLoop();
}