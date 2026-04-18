function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const blooms = [
    { x: 160, y: 150, r: 110, color: "#d4a0a0", opacity: 60 },
    { x: 320, y: 200, r: 130, color: "#c8855a", opacity: 50 },
    { x: 480, y: 160, r: 95,  color: "#d9b08c", opacity: 55 },
    { x: 100, y: 320, r: 105, color: "#c97a7a", opacity: 58 },
    { x: 260, y: 350, r: 140, color: "#e8c4a0", opacity: 52 },
    { x: 430, y: 310, r: 120, color: "#d48a6e", opacity: 60 },
    { x: 190, y: 490, r: 100, color: "#c8a080", opacity: 55 },
    { x: 370, y: 470, r: 115, color: "#d9a090", opacity: 50 },
    { x: 530, y: 440, r: 90,  color: "#c87060", opacity: 58 },
    { x: 310, y: 120, r: 80,  color: "#e0b898", opacity: 48 },
    { x: 60,  y: 500, r: 85,  color: "#d4907a", opacity: 52 },
    { x: 500, y: 530, r: 100, color: "#c89080", opacity: 55 },
  ];

  for (let b of blooms) {
    brush.noStroke();
    brush.fill(b.color, b.opacity);
    brush.fillBleed(0.38, "out");
    brush.fillTexture(0.7, 0.55);
    brush.circle(b.x, b.y, b.r);
  }

  const washes = [
    { x: 220, y: 260, r: 70,  color: "#b86050", opacity: 28 },
    { x: 400, y: 230, r: 80,  color: "#c8905a", opacity: 25 },
    { x: 150, y: 420, r: 65,  color: "#d4a878", opacity: 30 },
    { x: 460, y: 390, r: 75,  color: "#c07060", opacity: 27 },
    { x: 300, y: 520, r: 60,  color: "#d89070", opacity: 28 },
  ];

  for (let w of washes) {
    brush.noStroke();
    brush.fill(w.color, w.opacity);
    brush.fillBleed(0.25, "out");
    brush.fillTexture(0.5, 0.4);
    brush.circle(w.x, w.y, w.r);
  }

  const accents = [
    { x: 180, y: 190, r: 38,  color: "#a05040", opacity: 40 },
    { x: 350, y: 300, r: 45,  color: "#b87050", opacity: 38 },
    { x: 270, y: 430, r: 35,  color: "#c08060", opacity: 42 },
    { x: 470, y: 200, r: 40,  color: "#b86858", opacity: 38 },
    { x: 120, y: 360, r: 32,  color: "#c07868", opacity: 40 },
    { x: 520, y: 340, r: 36,  color: "#b87060", opacity: 38 },
    { x: 80,  y: 180, r: 42,  color: "#d4a080", opacity: 35 },
    { x: 420, y: 510, r: 38,  color: "#c08878", opacity: 40 },
  ];

  for (let a of accents) {
    brush.noStroke();
    brush.fill(a.color, a.opacity);
    brush.fillBleed(0.45, "out");
    brush.fillTexture(0.8, 0.65);
    brush.circle(a.x, a.y, a.r);
  }

  const softLines = [
    { x1: 80,  y1: 150, x2: 520, y2: 180 },
    { x1: 60,  y1: 350, x2: 540, y2: 320 },
    { x1: 100, y1: 500, x2: 500, y2: 470 },
    { x1: 200, y1: 80,  x2: 380, y2: 560 },
  ];

  brush.set("charcoal", "#c09080", 0.18);
  for (let l of softLines) {
    brush.line(l.x1, l.y1, l.x2, l.y2);
  }

  brush.set("2B", "#b07060", 0.12);
  for (let b of blooms) {
    if (b.r > 110) {
      brush.arc(b.x, b.y, b.r * 0.85, -30, 200);
    }
  }

  noLoop();
}