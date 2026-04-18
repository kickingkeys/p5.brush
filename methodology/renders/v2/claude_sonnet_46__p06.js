function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);

  brush.addField("swirl", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let x = c / field.length;
        let y = r / field[0].length;
        let dx = x - 0.5;
        let dy = y - 0.5;
        let angle = atan2(dy, dx) * (180 / PI);
        let dist = sqrt(dx * dx + dy * dy);
        field[c][r] = angle + dist * 280 + noise(x * 2.5, y * 2.5) * 90;
      }
    }
    return field;
  });
}

function draw() {
  translate(-width / 2, -height / 2);

  brush.field("swirl");
  brush.wiggle(2);

  let flockData = [
    { x: 80,  y: 110, color: "#1a1a2e", weight: 1.1, size: 22 },
    { x: 140, y: 75,  color: "#1a1a2e", weight: 0.9, size: 16 },
    { x: 210, y: 95,  color: "#2a2a3e", weight: 1.3, size: 28 },
    { x: 175, y: 145, color: "#1a1a2e", weight: 0.7, size: 14 },
    { x: 260, y: 60,  color: "#2a2a3e", weight: 1.0, size: 20 },
    { x: 310, y: 90,  color: "#1a1a2e", weight: 1.2, size: 24 },
    { x: 350, y: 55,  color: "#2a2a3e", weight: 0.8, size: 18 },
    { x: 400, y: 120, color: "#1a1a2e", weight: 1.4, size: 30 },
    { x: 440, y: 80,  color: "#2a2a3e", weight: 0.9, size: 16 },
    { x: 480, y: 105, color: "#1a1a2e", weight: 1.1, size: 22 },
    { x: 520, y: 65,  color: "#2a2a3e", weight: 0.7, size: 14 },
    { x: 550, y: 130, color: "#1a1a2e", weight: 1.0, size: 20 },
    { x: 100, y: 200, color: "#1a1a2e", weight: 1.3, size: 26 },
    { x: 60,  y: 250, color: "#2a2a3e", weight: 0.8, size: 16 },
    { x: 150, y: 230, color: "#1a1a2e", weight: 1.0, size: 20 },
    { x: 200, y: 190, color: "#2a2a3e", weight: 1.2, size: 24 },
    { x: 270, y: 220, color: "#1a1a2e", weight: 0.9, size: 18 },
    { x: 320, y: 180, color: "#2a2a3e", weight: 1.4, size: 30 },
    { x: 370, y: 240, color: "#1a1a2e", weight: 0.7, size: 14 },
    { x: 430, y: 200, color: "#2a2a3e", weight: 1.1, size: 22 },
    { x: 490, y: 170, color: "#1a1a2e", weight: 1.3, size: 26 },
    { x: 540, y: 220, color: "#2a2a3e", weight: 0.8, size: 16 },
    { x: 570, y: 185, color: "#1a1a2e", weight: 1.0, size: 20 },
    { x: 90,  y: 320, color: "#2a2a3e", weight: 1.2, size: 24 },
    { x: 50,  y: 370, color: "#1a1a2e", weight: 0.9, size: 18 },
    { x: 130, y: 350, color: "#2a2a3e", weight: 1.4, size: 28 },
    { x: 190, y: 310, color: "#1a1a2e", weight: 0.7, size: 14 },
    { x: 240, y: 360, color: "#2a2a3e", weight: 1.1, size: 22 },
    { x: 300, y: 330, color: "#1a1a2e", weight: 1.3, size: 26 },
    { x: 355, y: 300, color: "#2a2a3e", weight: 0.8, size: 16 },
    { x: 410, y: 350, color: "#1a1a2e", weight: 1.0, size: 20 },
    { x: 460, y: 315, color: "#2a2a3e", weight: 1.2, size: 24 },
    { x: 510, y: 360, color: "#1a1a2e", weight: 0.9, size: 18 },
    { x: 560, y: 330, color: "#2a2a3e", weight: 1.4, size: 30 },
    { x: 75,  y: 440, color: "#1a1a2e", weight: 0.7, size: 14 },
    { x: 120, y: 470, color: "#2a2a3e", weight: 1.1, size: 22 },
    { x: 170, y: 430, color: "#1a1a2e", weight: 1.3, size: 26 },
    { x: 230, y: 460, color: "#2a2a3e", weight: 0.8, size: 16 },
    { x: 285, y: 440, color: "#1a1a2e", weight: 1.0, size: 20 },
    { x: 340, y: 480, color: "#2a2a3e", weight: 1.2, size: 24 },
    { x: 395, y: 445, color: "#1a1a2e", weight: 0.9, size: 18 },
    { x: 445, y: 475, color: "#2a2a3e", weight: 1.4, size: 28 },
    { x: 500, y: 440, color: "#1a1a2e", weight: 0.7, size: 14 },
    { x: 545, y: 470, color: "#2a2a3e", weight: 1.1, size: 22 },
    { x: 110, y: 540, color: "#1a1a2e", weight: 1.3, size: 26 },
    { x: 200, y: 555, color: "#2a2a3e", weight: 0.8, size: 16 },
    { x: 290, y: 530, color: "#1a1a2e", weight: 1.0, size: 20 },
    { x: 380, y: 550, color: "#2a2a3e", weight: 1.2, size: 24 },
    { x: 470, y: 535, color: "#1a1a2e", weight: 0.9, size: 18 },
    { x: 555, y: 555, color: "#2a2a3e", weight: 1.4, size: 30 },
  ];

  for (let bird of flockData) {
    brush.set("marker", bird.color, bird.weight);

    let wx = bird.x;
    let wy = bird.y;
    let s = bird.size;

    // Left wing arc
    let leftPts = [
      [wx, wy],
      [wx - s * 0.45, wy - s * 0.28],
      [wx - s * 0.9, wy - s * 0.08],
    ];
    brush.spline(leftPts, 0.45);

    // Right wing arc
    let rightPts = [
      [wx, wy],
      [wx + s * 0.45, wy - s * 0.28],
      [wx + s * 0.9, wy - s * 0.08],
    ];
    brush.spline(rightPts, 0.45);
  }

  brush.noField();

  noLoop();
}