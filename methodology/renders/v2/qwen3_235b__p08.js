function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdf7f0");
  translate(-width/2, -height/2);

  // Distant fog layer - soft watercolor wash
  brush.fill("#d8e0f8", 80);
  brush.fillBleed(0.6, "out");
  brush.noStroke();
  brush.beginShape(0.2);
  brush.vertex(0, 400);
  brush.vertex(200, 320);
  brush.vertex(400, 340);
  brush.vertex(600, 380);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Midground water - subtle gradient wash
  brush.fill("#a8b8e0", 110);
  brush.fillBleed(0.3, "out");
  brush.beginShape(0.1);
  brush.vertex(0, 450);
  brush.vertex(600, 480);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Foreground dock wash
  brush.fill("#c0b090", 95);
  brush.fillBleed(0.25, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 500);
  brush.vertex(200, 520);
  brush.vertex(400, 510);
  brush.vertex(600, 530);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  // Masts - faint graphite lines
  brush.set("2H", "#555", 0.6);
  brush.line(150, 200, 150, 500);
  brush.line(220, 250, 220, 510);
  brush.line(350, 280, 350, 520);
  brush.line(420, 260, 420, 515);

  // Ropes and rigging - very light HB lines
  brush.set("HB", "#666", 0.4);
  brush.line(150, 220, 180, 300);
  brush.line(150, 260, 200, 380);
  brush.line(220, 280, 260, 400);
  brush.line(350, 300, 320, 420);
  brush.line(350, 340, 380, 450);
  brush.line(420, 290, 390, 440);

  // Small boat silhouettes - subtle 2B
  brush.set("2B", "#333", 0.8);
  brush.line(100, 510, 180, 515);
  brush.line(280, 525, 340, 530);
  brush.line(400, 535, 460, 540);

  // Fog texture - faint spray in HB
  brush.set("HB", "#e0e8f8", 1.5);
  for (let i = 0; i < 30; i++) {
    let x = random(50, 550);
    let y = random(100, 300);
    brush.flowLine(x, y, random(20, 60), random(360));
  }

  noLoop();
}