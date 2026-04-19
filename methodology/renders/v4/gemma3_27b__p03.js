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
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(150, -100);
  brush.vertex(300, -50);
  brush.vertex(250, 100);
  brush.vertex(100, 150);
  brush.endShape(CLOSE);

  // Body - pastel fill
  brush.fill("#e6b8af", 150);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(150, -100);
  brush.vertex(300, -50);
  brush.vertex(250, 100);
  brush.vertex(100, 150);
  brush.endShape(CLOSE);

  // Motion lines - spray
  brush.set("spray", "#808080", 0.8);
  for (let i = 0; i < 20; i++) {
    let x = 250 + random(-50, 50);
    let y = 50 + random(-50, 50);
    let angle = random(0, 360);
    let len = random(20, 60);
    brush.push();
    brush.translate(x, y);
    brush.rotate(angle);
    brush.line(0, 0, 0, len);
    brush.pop();
  }
    // Additional smudge - crayon
    brush.set("crayon", "#a7a7a7", 1.0);
    brush.beginShape();
    brush.vertex(300, -50);
    brush.vertex(350, 0);
    brush.vertex(320, 50);
    brush.vertex(280, -20);
    brush.endShape(CLOSE);
    
    // Limb detail - rotring
    brush.set("rotring", "#444", 0.5);
    brush.line(150, -100, 200, -150);

  noLoop();
}