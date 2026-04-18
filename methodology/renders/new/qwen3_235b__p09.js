function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width/2, -height/2);
  background("#fdf6e9");

  // Wet watercolor bleeds for rainy street
  brush.fill("#1a4b5c", 180);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.7, 0.4);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(0, 400);
  brush.vertex(600, 420);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Distant blurred lights with spray
  brush.field("curved");
  brush.set("spray", "#ff9ea3", 2.8);
  for (let i = 0; i < 20; i++) {
    const x = random(50, 550);
    const y = random(50, 200);
    brush.flowLine(x, y, random(10, 25), random(360));
  }

  // Neon marker reflections on wet pavement
  brush.wash("#ff3366", 120);
  brush.noStroke();
  brush.beginShape();
  brush.vertex(100, 500);
  brush.vertex(500, 520);
  brush.vertex(500, 540);
  brush.vertex(100, 520);
  brush.endShape(true);

  brush.wash("#33ccff", 100);
  brush.beginShape();
  brush.vertex(200, 550);
  brush.vertex(450, 560);
  brush.vertex(450, 575);
  brush.vertex(200, 565);
  brush.endShape(true);

  // Sparse ink silhouettes of passersby
  brush.set("pen", "#222", 1.2);
  for (let i = 0; i < 5; i++) {
    const x = random(50, 550);
    brush.line(x, 480, x + random(-10, 10), 430);
  }

  // Distant architectural details with light hatching
  brush.hatchStyle("2H", "#666", 0.7);
  brush.hatch(8, 90, { rand: 0.05 });
  brush.beginShape();
  brush.vertex(40, 300);
  brush.vertex(100, 300);
  brush.vertex(100, 600);
  brush.vertex(40, 600);
  brush.endShape(true);

  brush.hatchStyle("2H", "#666", 0.7);
  brush.hatch(8, 90, { rand: 0.05 });
  brush.beginShape();
  brush.vertex(500, 320);
  brush.vertex(540, 320);
  brush.vertex(540, 600);
  brush.vertex(500, 600);
  brush.endShape(true);

  brush.noField();
  noLoop();
}