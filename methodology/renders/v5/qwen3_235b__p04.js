function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.noFill();
  angleMode(DEGREES);

  // Memory-like face structure with colored pencil
  const cx = 300;
  const cy = 280;
  const faceWidth = 180;
  const faceHeight = 240;

  // Base face shape with soft, layered cpencil strokes
  const colors = ["#d4a017", "#b30000", "#5e2c7f", "#004d4d", "#8c5626"];
  for (let i = 0; i < 8; i++) {
    const offset = i * 2;
    const r = map(noise(i * 0.3), 0, 1, faceHeight * 0.45, faceHeight * 0.55);
    brush.hatchStyle("cpencil", random(colors), random(0.6, 1.0));
    brush.hatch(6 + offset, random([30, 75, 120]), { rand: 0.1 });
    beginShape();
    for (let a = 0; a < 360; a += 10) {
      const x = cx + cos(a) * (faceWidth / 2 + noise(a * 0.1, i * 0.1) * 40);
      const y = cy + sin(a) * (faceHeight / 2 + noise(a * 0.1 + 100, i * 0.1) * 60);
      vertex(x, y);
    }
    endShape(CLOSE);
    brush.noHatch();
  }

  // Eyes - imperfect, layered dots
  for (let i = 0; i < 3; i++) {
    brush.set("cpencil", "#222266", random(0.8, 1.4));
    circle(cx - 50, cy - 20, 12 + i * 3);
    circle(cx + 50, cy - 20, 12 + i * 3);
  }

  // Mouth - smudged, colored lines
  for (let i = 0; i < 5; i++) {
    brush.set("cpencil", random(["#990033", "#660033", "#cc3366"]), random(0.5, 1.0));
    let yOffset = noise(i * 0.8) * 8 - 4;
    line(cx - 40, cy + 60 + yOffset, cx + 40, cy + 60 + yOffset);
  }

  // Hair - wild colored strokes
  const hairColors = ["#cc8800", "#995522", "#dd7711", "#884400", "#aa6655"];
  for (let i = 0; i < 20; i++) {
    const angle = random(-45, 45);
    const len = random(60, 120);
    const x = cx + random(-80, 80);
    const y = cy - 100;
    const endX = x + cos(angle) * len;
    const endY = y + sin(angle) * len;
    brush.set("cpencil", random(hairColors), random(0.4, 0.9));
    line(x, y, endX, endY);
  }

  // Memory fragments - faint overlapping strokes
  brush.wiggle(2);
  for (let i = 0; i < 15; i++) {
    brush.set("2H", random(colors), random(0.3, 0.6));
    const x1 = random(100, 500);
    const y1 = random(100, 500);
    const x2 = x1 + random(-80, 80);
    const y2 = y1 + random(-80, 80);
    line(x1, y1, x2, y2);
  }
  brush.noField();

  noLoop();
}