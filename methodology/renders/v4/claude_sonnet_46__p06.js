function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // Define a swirling wind vector field
  brush.addField("swirl", function(t, field) {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let x = col / field.length;
        let y = row / field[0].length;
        let cx = 0.5, cy = 0.45;
        let dx = x - cx;
        let dy = y - cy;
        let angle = atan2(dy, dx);
        let dist = sqrt(dx * dx + dy * dy);
        field[col][row] = angle * (180 / PI) + 90 + dist * 120;
      }
    }
    return field;
  });

  brush.field("swirl");
  brush.wiggle(2);

  // Bird gesture parameters
  // Each bird is a short spline of 2-3 points making a quick "V" or arc shape
  // Using marker brush for bold gestural marks

  let birdData = [
    { x: 80,  y: 90,  size: 0.6, color: "#2a2420" },
    { x: 150, y: 60,  size: 0.5, color: "#3a3028" },
    { x: 230, y: 110, size: 0.7, color: "#1e1c18" },
    { x: 310, y: 75,  size: 0.55, color: "#2e2820" },
    { x: 400, y: 95,  size: 0.65, color: "#251f1a" },
    { x: 480, y: 55,  size: 0.5, color: "#333028" },
    { x: 540, y: 130, size: 0.6, color: "#2a2218" },
    { x: 60,  y: 180, size: 0.45, color: "#3c3228" },
    { x: 130, y: 210, size: 0.7, color: "#1e1a14" },
    { x: 200, y: 170, size: 0.55, color: "#2c2620" },
    { x: 290, y: 200, size: 0.6, color: "#28221c" },
    { x: 370, y: 155, size: 0.5, color: "#342e24" },
    { x: 450, y: 190, size: 0.65, color: "#221e18" },
    { x: 520, y: 220, size: 0.55, color: "#2e2820" },
    { x: 100, y: 290, size: 0.6, color: "#302a22" },
    { x: 170, y: 320, size: 0.5, color: "#262018" },
    { x: 250, y: 270, size: 0.7, color: "#1c1814" },
    { x: 330, y: 300, size: 0.6, color: "#2a2420" },
    { x: 410, y: 260, size: 0.55, color: "#322c24" },
    { x: 490, y: 310, size: 0.65, color: "#201c16" },
    { x: 560, y: 280, size: 0.45, color: "#2e2820" },
    { x: 70,  y: 390, size: 0.55, color: "#282218" },
    { x: 145, y: 420, size: 0.6, color: "#1e1a14" },
    { x: 220, y: 370, size: 0.5, color: "#342e26" },
    { x: 300, y: 410, size: 0.65, color: "#24201a" },
    { x: 380, y: 380, size: 0.55, color: "#2c2820" },
    { x: 455, y: 430, size: 0.6, color: "#1a1612" },
    { x: 530, y: 390, size: 0.5, color: "#30281e" },
    { x: 90,  y: 490, size: 0.6, color: "#282018" },
    { x: 165, y: 520, size: 0.5, color: "#201c16" },
    { x: 240, y: 470, size: 0.65, color: "#2e2820" },
    { x: 320, y: 510, size: 0.55, color: "#261e16" },
    { x: 400, y: 480, size: 0.6, color: "#1c1810" },
    { x: 475, y: 530, size: 0.5, color: "#322a20" },
    { x: 550, y: 490, size: 0.55, color: "#28221a" },
    { x: 110, y: 560, size: 0.45, color: "#2a2418" },
    { x: 200, y: 575, size: 0.5, color: "#1e1a12" },
    { x: 310, y: 565, size: 0.55, color: "#2c2620" },
    { x: 420, y: 570, size: 0.5, color: "#242018" },
    { x: 510, y: 560, size: 0.45, color: "#302820" },
  ];

  // Draw each bird as a quick marker gesture
  // A bird in flight = two short angled lines meeting at a center body point
  // We'll use spline with 3 points: left wingtip -> body -> right wingtip
  // The field will bend these naturally

  for (let i = 0; i < birdData.length; i++) {
    let b = birdData[i];
    let w = random(14, 28) * b.size; // wingspan half-width
    let h = random(4, 10) * b.size;  // wing dip/rise
    let tilt = random(-20, 20);       // slight rotation for variety

    // Wing spread angle influenced by position for natural variation
    let spread = random(0.3, 0.7);

    // Left wingtip, body center, right wingtip
    // Body center is the pivot; wings curve upward
    let lx = b.x - w;
    let ly = b.y + h * spread;
    let rx = b.x + w;
    let ry = b.y + h * spread;
    let bx = b.x;
    let by = b.y;

    // Rotate wing points slightly for tilt
    let cosT = cos(tilt);
    let sinT = sin(tilt);

    function rotPt(px, py) {
      let dx = px - bx;
      let dy = py - by;
      return [bx + dx * cosT - dy * sinT, by + dx * sinT + dy * cosT];
    }

    let lp = rotPt(lx, ly);
    let rp = rotPt(rx, ry);

    // Weight varies per bird for hand-pressure feel
    let wt = random(0.5, 1.4) * b.size;

    brush.set("marker", b.color, wt);
    brush.spline([
      [lp[0], lp[1], 0.5],
      [bx, by, 0.8],
      [rp[0], rp[1], 0.5]
    ], 0.45);
  }

  // Add a few distant tiny birds very high up for depth
  let tinyBirds = [
    { x: 185, y: 35 },
    { x: 270, y: 28 },
    { x: 345, y: 42 },
    { x: 430, y: 30 },
  ];

  for (let b of tinyBirds) {
    let w = random(6, 10);
    let h = random(2, 4);
    brush.set("marker", "#3a3228", random(0.3, 0.5));
    brush.spline([
      [b.x - w, b.y + h],
      [b.x, b.y],
      [b.x + w, b.y + h]
    ], 0.4);
  }

  brush.noField();

  noLoop();
}