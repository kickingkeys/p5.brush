function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.set("2B", "#333", 1.2);
  brush.line(50, 50, 200, 150);

  brush.set("HB", "#666", 0.8);
  brush.line(200, 150, 350, 50);

  brush.set("charcoal", "#000", 1);
  brush.circle(400, 100, 60);

  brush.set("spray", "#ff6666", 0.5);
  for (let i = 0; i < 10; i++) {
    let x = random(50, 550);
    let y = random(150, 400);
    brush.circle(x, y, random(5, 15));
  }

  brush.set("rotring", "#003366", 0.7);
  brush.rect(100, 250, 100, 50);

  brush.set("crayon", "#ffcc00", 1.5);
  brush.fill("#ffcc00", 100);
  brush.noStroke();
  brush.circle(500, 300, 80);

  brush.set("pen", "#000", 0.6);
  brush.beginShape();
  brush.vertex(150, 400);
  brush.vertex(250, 450);
  brush.vertex(350, 400);
  brush.endShape(true);

  brush.set("pastel", "#aaffaa", 1.3);
  brush.hatch(5, 45);
  brush.rect(400, 400, 80, 60, "center");

  brush.set("2H", "#999", 0.5);
  brush.line(50, 500, 550, 500);

  brush.set("cpencil", "#444", 1);
  brush.circle(200, 500, 40);

  noLoop();
}