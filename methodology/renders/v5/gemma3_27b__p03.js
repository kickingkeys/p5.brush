function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Charcoal skeleton
  brush.set("charcoal", "#333", 1.2);
  beginShape();
  vertex(100, -50);
  vertex(250, 100);
  vertex(350, 0);
  vertex(280, -150);
  vertex(150, -100);
  endShape(CLOSE);

  // Pastel shading
  brush.mass("pastel", "#d9a77b", { strength: 0.7, precision: 0.4, gradient: 0.3 });
  beginShape();
  vertex(100, -50);
  vertex(250, 100);
  vertex(350, 0);
  vertex(280, -150);
  vertex(150, -100);
  endShape(CLOSE);
  brush.noMass();

  // Charcoal smudges (motion trails)
  brush.set("charcoal", "#333", 0.8);
  brush.field("curved");
  brush.wiggle(2);
  for (let i = 0; i < 30; i++) {
    let x = 250 + random(-50, 50);
    let y = 100 + random(-30, 30);
    brush.line(x, y, x + random(-20, 20), y + random(30, 60));
  }
  brush.noField();

  // Accent with pastel highlights
  brush.set("pastel", "#f9dcc4", 0.6);
  brush.beginShape();
  vertex(150, -100);
  vertex(200, -70);
  vertex(220, -50);
  vertex(180, -80);
  endShape(CLOSE);
  brush.noFill();

  noLoop();
}