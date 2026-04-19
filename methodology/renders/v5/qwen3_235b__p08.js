function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Foggy watercolor washes for harbor
  brush.noStroke();
  brush.fillTexture(0.6, 0.4);
  
  // Distant water - soft horizontal blur
  brush.wash("#d4e1e8", 180);
  brush.fill("#b8c9d4", 140);
  brush.fillBleed(0.5, "out");
  brush.rect(0, 300, 600, 200, "corner");
  
  // Harbor mist - overlapping soft circles
  const mistColors = ["#e6eef2", "#d9e4ea", "#cdd9e0"];
  for (let i = 0; i < 18; i++) {
    const x = random(50, 550);
    const y = random(80, 280);
    const r = random(60, 120);
    brush.fill(random(mistColors), random(25, 55));
    brush.fillBleed(random(0.4, 0.6), "out");
    brush.circle(x, y, r);
  }
  
  // Dock shadow - subtle grounding
  brush.fill("#a2b2bc", 90);
  brush.fillBleed(0.3, "out");
  brush.rect(0, 500, 600, 40, "corner");
  
  // Faint graphite lines for masts and ropes
  brush.noFill();
  brush.noWash();
  brush.set("2H", "#555", 0.6);
  
  // Masts - thin verticals
  for (let i = 0; i < 8; i++) {
    const x = 80 + i * 70;
    brush.line(x, 200, x, 460);
  }
  
  // Cross rigging - light diagonal lines
  brush.set("2H", "#666", 0.4);
  for (let i = 0; i < 5; i++) {
    const x1 = 60 + i * 120;
    const x2 = 100 + i * 120;
    brush.line(x1, 240, x1 + 40, 320);
    brush.line(x2, 320, x2 - 40, 400);
  }
  
  // Anchored boat silhouettes
  brush.set("HB", "#444", 0.8);
  for (let i = 0; i < 4; i++) {
    const x = 100 + i * 140;
    brush.spline([
      [x-30, 480],
      [x, 470, 1.2],
      [x+30, 480]
    ], 0.3);
  }
  
  // Dock planks - subtle texture
  brush.set("2H", "#777", 0.3);
  for (let y = 505; y < 535; y += 3) {
    brush.line(0, y, 600, y);
  }
  
  noLoop();
}