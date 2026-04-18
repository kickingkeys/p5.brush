function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  // Desert floor - layered washes
  brush.fill("#d2b48c", 80);
  brush.rect(0, 0, 600, 200, "center");
  brush.fill("#a0522d", 60);
  brush.rect(0, 0, 600, 100, "center");
  brush.fill("#8b4513", 40);
  brush.rect(0, 0, 600, 50, "center");

  // Rock formations - charcoal and 2B
  brush.noStroke();
  brush.set("charcoal", "#333", 1.2);
  brush.beginShape();
  brush.vertex(150, 100);
  brush.vertex(250, 150);
  brush.vertex(200, 200);
  brush.vertex(100, 150);
  brush.endShape(true);

  brush.set("2B", "#333", 1);
  brush.beginShape();
  brush.vertex(-150, -50);
  brush.vertex(-50, 50);
  brush.vertex(-100, -100);
  brush.endShape(true);

  // Horizon line - thin pen
  brush.stroke("#000");
  brush.set("pen", "#000", 0.2);
  brush.line(-300, 250, 300, 250);

  // Small details - spray and crayon
  brush.set("spray", "#778899", 0.1);
  for (let i = 0; i < 20; i++) {
    let x = random(-250, 250);
    let y = random(50, 150);
    brush.circle(x, y, random(2, 5));
  }

  brush.set("crayon", "#f08080", 0.5);
  brush.beginShape();
  brush.vertex(200, -100);
  brush.vertex(250, -50);
  brush.vertex(200, 0);
  brush.endShape(true);

  noLoop();
}