function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Distant buildings as silhouettes
  brush.set("charcoal", "#1a1a1a", 1.2);
  brush.noFill();
  brush.rect(50, 100, 120, 300);
  brush.rect(200, 80, 100, 350);
  brush.rect(350, 70, 140, 370);
  brush.rect(520, 90, 110, 320);

  // Wet ground with watercolor bleed
  brush.fill("#0a0a2a", 40);
  brush.fillBleed(0.6, "out");
  brush.noStroke();
  brush.rect(0, 300, 600, 300, "corner");

  // Neon sign reflections on wet pavement
  brush.set("marker", "red", 1.5);
  brush.line(60, 580, 180, 580);
  brush.set("marker", "blue", 1.5);
  brush.line(220, 570, 320, 570);
  brush.set("marker", "magenta", 1.5);
  brush.line(370, 560, 470, 560);
  brush.set("marker", "yellow", 1.5);
  brush.line(500, 550, 580, 550);

  // Streetlight glow with soft pastel
  brush.fill("yellow", 20);
  brush.fillTexture(0.8, 0.3);
  brush.noStroke();
  brush.circle(100, 480, 15);
  brush.circle(500, 470, 12);

  // Passersby silhouettes with ink
  brush.set("pen", "#222", 0.8);
  for (let i = 0; i < 5; i++) {
    let x = 80 + i * 120;
    let y = 500 + random(-20, 20);
    brush.line(x, y, x, y - 40);
  }

  // Rain streaks
  brush.set("HB", "#333", 0.4);
  for (let i = 0; i < 50; i++) {
    let x = random(0, 600);
    let y1 = random(0, 200);
    let y2 = y1 + random(50, 100);
    brush.line(x, y1, x, y2);
  }

  // Final noLoop
  noLoop();
}