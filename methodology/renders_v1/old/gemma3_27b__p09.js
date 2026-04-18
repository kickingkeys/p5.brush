function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Wet pavement reflections
  brush.set("marker", "blue", 1.2);
  brush.fill("rgba(0, 0, 255, 0.2)", 80);
  brush.rect(0, 0, 600, 200);

  brush.set("rotring", "#008080", 0.8);
  brush.noFill();
  brush.stroke(0, 0, 255);
  brush.strokeWeight(0.5);
  brush.line(100, 100, 500, 100);
  brush.line(200, 150, 400, 150);

  // Neon sign glow (using pastel)
  brush.set("pastel", "red", 2);
  brush.fill("rgba(255, 0, 0, 0.3)",150);
  brush.noStroke();
  brush.circle(300, -150, 100);

  // Silhouettes of people (charcoal)
  brush.set("charcoal", "#333", 0.6);
  brush.noFill();
  // Person 1
  brush.beginShape();
  brush.vertex(-150, 0);
  brush.vertex(-100, -100);
  brush.vertex(-50, -100);
  brush.vertex(-100, 0);
  brush.endShape(true);
  // Person 2
  brush.beginShape();
  brush.vertex(150, 0);
  brush.vertex(200, -80);
  brush.vertex(250, -80);
  brush.vertex(200, 0);
  brush.endShape(true);

  // Rain streaks (spray)
  brush.set("spray", "#c0c0c0", 0.2);
  for (let i = 0; i < 50; i++) {
    brush.line(random(-300, 300), random(-200, 200), random(-300, 300), random(200, 400));
  }

  // Wet sidewalk detail (2B)
  brush.set("2B", "#222", 0.4);
  brush.noFill();
  brush.strokeWeight(0.8);
  brush.beginShape();
  brush.vertex(-200, 200);
  brush.vertex(-200, 250);
  brush.vertex(200, 250);
  brush.vertex(200, 200);
  brush.endShape(true);

  noLoop();
}