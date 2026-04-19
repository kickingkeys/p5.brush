function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Pavement
  brush.fill("#5f6f7b", 150);
  brush.rect(0, -150, 600, 150, "center");

  // Neon marker streaks (red)
  brush.set("marker", "#ff4136", 2);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(150, 50);
  brush.vertex(200, 100);
  brush.vertex(250, 50);
  brush.endShape(CLOSE);

  brush.beginShape();
  brush.vertex(-150, -50);
  brush.vertex(-200, -100);
  brush.vertex(-250, -50);
  brush.endShape(CLOSE);

  // Watercolor rain (blue)
  brush.set("spray", "#4fc3f7", 0.4);
  for (let i = 0; i < 200; i++) {
    const x = random(-300, 300);
    const y = random(-100, 100);
    brush.flowLine(x, y, random(10, 30), 90);
  }

  // Charcoal silhouettes
  brush.set("charcoal", "#222", 0.8);
  brush.noFill();
  brush.strokeWeight(1);
  brush.beginShape();
  brush.vertex(100, -100);
  brush.vertex(150, -150);
  brush.vertex(200, -100);
  brush.endShape();

  brush.beginShape();
  brush.vertex(-100, -100);
  brush.vertex(-150, -150);
  brush.vertex(-200, -100);
  brush.endShape();
  
  brush.set("spray", "#4fc3f7", 0.1);
  for (let i = 0; i < 50; i++) {
    const x = random(-300, 300);
    const y = random(-100, 100);
    brush.flowLine(x, y, random(10, 30), 90);
  }

  noLoop();
}