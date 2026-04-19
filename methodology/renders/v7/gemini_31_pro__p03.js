function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("hand");
  brush.wiggle(4);

  brush.noStroke();
  brush.noFill();

  brush.hatchStyle("charcoal", "#666", 0.7);
  brush.hatch(6, 340, { rand: 0.2, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(40, 480);
  brush.vertex(300, 400);
  brush.vertex(320, 200);
  brush.vertex(100, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.mass("pastel", "#555", { strength: 0.35, precision: 0.2, gradient: 0.5 });
  brush.beginShape(0.5);
  brush.vertex(50, 450);
  brush.vertex(300, 380);
  brush.vertex(320, 330);
  brush.vertex(100, 400);
  brush.endShape(true);
  brush.noMass();

  brush.mass("pastel", "#3a3a3a", { strength: 0.5, precision: 0.3 });
  brush.beginShape(0.5);
  brush.vertex(220, 380);
  brush.vertex(330, 230);
  brush.vertex(280, 250);
  brush.vertex(180, 350);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#111", { strength: 0.8, precision: 0.4, outline: true });
  brush.beginShape(0.4);
  brush.vertex(280, 360);
  brush.vertex(340, 350);
  brush.vertex(330, 220);
  brush.vertex(300, 230);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#050505", { strength: 0.9, precision: 0.5 });
  brush.beginShape(0.4);
  brush.vertex(270, 370);
  brush.vertex(320, 350);
  brush.vertex(240, 390);
  brush.vertex(180, 410);
  brush.endShape(true);
  brush.noMass();

  brush.set("charcoal", "#444", 0.8);
  brush.spline([[250, 380], [180, 420], [90, 450]], 0.2);
  brush.spline([[280, 300], [220, 330], [140, 360]], 0.2);
  brush.spline([[310, 200], [250, 230], [160, 250]], 0.3);

  brush.set("charcoal", "#1a1a1a", 1.5);
  brush.spline([[290, 360, 1], [310, 280, 1.5], [325, 220, 0.8]], 0.4);

  brush.set("charcoal", "#0a0a0a", 2.0);
  brush.spline([[290, 360, 1.5], [200, 390, 1.2], [90, 430, 0.3]], 0.2);

  brush.set("charcoal", "#222", 1.2);
  brush.spline([[330, 340, 1], [430, 310, 0.8], [530, 270, 0.4]], 0.3);
  brush.spline([[530, 270, 0.4], [550, 280, 0.6], [540, 290, 0.2]], 0.5);

  brush.set("charcoal", "#111", 1.0);
  brush.spline([[325, 220, 0.8], [400, 180, 1.0], [490, 140, 0.4]], 0.4);
  brush.spline([[310, 230, 0.8], [220, 250, 1.2], [140, 290, 0.5]], 0.4);

  brush.set("charcoal", "#000", 1.8);
  brush.spline([[325, 220, 1], [345, 175, 1.5], [330, 145, 0.8], [305, 180, 1], [320, 210, 0.5]], 0.5);

  brush.set("charcoal", "#000", 2.5);
  brush.spline([[290, 360, 1.2], [320, 345, 0.5]], 0.2);
  brush.spline([[305, 240, 1.0], [325, 220, 0.4]], 0.2);

  brush.set("charcoal", "#333", 0.6);
  brush.line(200, 500, 100, 530);
  brush.line(350, 400, 250, 450);
  brush.line(450, 250, 350, 300);

  brush.noField();
  noLoop();
}