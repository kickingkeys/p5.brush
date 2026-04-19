function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Wet watercolor bleeds for street and sky
  brush.noStroke();
  brush.fill("#4a6b8a", 45);
  brush.fillBleed(0.5, "out");
  brush.fillTexture(0.6, 0.3);
  brush.rect(0, 0, 600, 600);

  // Vertical watercolor drips
  for (let i = 0; i < 20; i++) {
    const x = random(50, 550);
    const w = random(2, 8);
    brush.fill("#3a5a7a", random(30, 60));
    brush.fillBleed(0.6, "out");
    brush.fillTexture(0.5, 0.4);
    brush.rect(x, 100, w, random(200, 400));
  }

  // Neon marker smears on pavement
  brush.noStroke();
  const neonColors = ["#ff3366", "#33ccff", "#ffcc33", "#9933ff"];
  for (let i = 0; i < 15; i++) {
    const x = random(20, 580);
    const y = random(300, 580);
    const w = random(30, 120);
    const h = random(8, 20);
    brush.wash(random(neonColors), random(180, 220));
    brush.rect(x, y, w, h, "corner");
  }

  // Wet neon reflections — horizontal marker blur
  brush.field("waves");
  brush.refreshField(frameCount / 10);
  for (let i = 0; i < 12; i++) {
    const x = random(20, 500);
    const y = random(400, 550);
    brush.set("marker", random(neonColors), random(0.8, 1.4));
    brush.line(x, y, x + random(40, 100), y);
  }
  brush.noField();

  // Sparse ink silhouettes of passersby
  brush.set("2B", "#111", 1.6);
  for (let i = 0; i < 8; i++) {
    const x = random(100, 500);
    const y = random(320, 480);
    const h = random(60, 100);
    brush.spline([
      [x, y],
      [x + random(-5, 5), y - h * 0.6],
      [x + random(-8, 8), y - h]
    ], 0.3);
  }

  // Distant umbrella silhouettes with HB
  brush.set("HB", "#333", 1.2);
  for (let i = 0; i < 5; i++) {
    const x = random(50, 550);
    const y = random(280, 330);
    brush.circle(x, y, random(8, 14), 0.3);
  }

  // Sparse ground puddle textures with spray
  brush.field("hand");
  brush.wiggle(2);
  brush.set("spray", "#2a4a6a", 1.8);
  for (let i = 0; i < 10; i++) {
    const x = random(100, 500);
    const y = random(400, 580);
    for (let j = 0; j < 8; j++) {
      brush.flowLine(x + random(-20, 20), y + random(-10, 10), random(10, 25), random(360));
    }
  }
  brush.noField();

  // Light rain streaks with 2H — sparse and faint
  brush.set("2H", "#666", 0.7);
  for (let i = 0; i < 30; i++) {
    const x = random(20, 580);
    const y1 = random(10, 200);
    const y2 = y1 + random(40, 100);
    brush.line(x, y1, x + random(-3, 3), y2);
  }

  noLoop();
}