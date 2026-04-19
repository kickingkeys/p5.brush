function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width/2, -height/2);

  // Face outline
  brush.set("pen", "#444", 0.8);
  brush.beginShape();
  brush.vertex(0, -150);
  brush.vertex(100, -200);
  brush.vertex(200, -150);
  brush.vertex(250, -50);
  brush.vertex(200, 50);
  brush.vertex(100, 100);
  brush.vertex(0, 50);
  brush.vertex(-100, 100);
  brush.vertex(-200, 50);
  brush.vertex(-250, -50);
  brush.vertex(-200, -150);
  brush.vertex(-100, -200);
  brush.endShape(false);

  // Layered strokes - unexpected colors
  let colors = ["#e6b8af", "#a8d0e6", "#d9ead3", "#f5b7b1", "#c39fd3"];

  for (let i = 0; i < 10; i++) {
    brush.set("cpencil", random(colors), 0.3 + random(0.2));
    brush.beginShape();
    brush.vertex(random(-150, 150), random(-100, 100));
    brush.vertex(random(-150, 150), random(-100, 100));
    brush.vertex(random(-150, 150), random(-100, 100));
    brush.endShape();
  }

  for (let i = 0; i < 5; i++) {
    brush.set("pastel", random(colors), 0.5 + random(0.3));
    brush.beginShape();
    brush.vertex(random(-100, 100), random(-50, 50));
    brush.vertex(random(-100, 100), random(-50, 50));
    brush.endShape();
  }

  // Subtle shading with 2B
  brush.set("2B", "#333", 0.1);
  brush.beginShape();
  brush.vertex(-100, 50);
  brush.vertex(-50, 100);
  brush.vertex(0, 100);
  brush.vertex(50, 50);
  brush.endShape(false);

    // Eyes
  brush.set("pen", "#333", 0.5);
  brush.circle(75, 20, 5);
  brush.circle(-75, 20, 5);

  noLoop();
}