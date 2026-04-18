function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Pavement
  brush.fill("#444444", 200);
  brush.rect(0, -150, 600, 150);

  // Buildings
  brush.fill("#333333", 230);
  brush.rect(-250, -100, 150, 100);
  brush.rect(100, -100, 150, 100);

  // Rain - spray
  brush.set("spray", "#8888ff", 0.7);
  for (let i = 0; i < 100; i++) {
    let x = random(-300, 300);
    let y = random(-100, 100);
    brush.line(x, y, x, y + random(50, 150));
  }

  // Neon signs - marker + cpencil
  brush.set("marker", "#ff0000", 2.5);
  brush.rect(150, -200, 80, 20);

  brush.set("cpencil", "#ff00ff", 1.5); // magenta
  brush.rect(250, -200, 80, 20);

  // Silhouettes - charcoal
  brush.set("charcoal", "#000000", 0.8);
  brush.beginShape();
  brush.vertex(-150, -100);
  brush.vertex(-100, -150);
  brush.vertex(-50, -100);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(50, -150);
  brush.vertex(100, -100);
  brush.vertex(150, -150);
  brush.endShape(CLOSE);

  // Water reflections - watercolor-like wash
   brush.fill("#6666ff", 80);
   brush.rect(0, -150, 600, 50);

  noLoop();
}