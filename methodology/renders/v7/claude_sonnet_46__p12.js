let spawnPoints = [];
let fieldAngles = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);

  brush.addField("ghostFlow", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let nx = c * 0.18;
        let ny = r * 0.18;
        field[c][r] = noise(nx, ny) * 360;
      }
    }
    return field;
  });

  brush.field("ghostFlow");
  brush.wiggle(2);

  for (let i = 0; i < 220; i++) {
    spawnPoints.push([random(30, 570), random(30, 570)]);
  }
}

function draw() {
  translate(-width / 2, -height / 2);

  // Layer 1: deep shadow clouds, heavy spray
  brush.set("spray", "#1a1a3a", 3.2);
  for (let i = 0; i < 80; i++) {
    let [x, y] = spawnPoints[i];
    brush.flowLine(x, y, random(45, 90), 0);
  }

  // Layer 2: mid-dark indigo cloud mass
  brush.set("spray", "#2a2a5a", 2.5);
  for (let i = 0; i < 80; i++) {
    let [x, y] = spawnPoints[i];
    let ox = random(-18, 18);
    let oy = random(-18, 18);
    brush.flowLine(x + ox, y + oy, random(30, 65), 0);
  }

  // Layer 3: mid blue-grey
  brush.set("spray", "#3d4a72", 1.8);
  for (let i = 40; i < 140; i++) {
    let [x, y] = spawnPoints[i];
    let ox = random(-12, 12);
    let oy = random(-12, 12);
    brush.flowLine(x + ox, y + oy, random(20, 50), 0);
  }

  // Layer 4: lighter steel blue
  brush.set("spray", "#6070a0", 1.2);
  for (let i = 60; i < 160; i++) {
    let [x, y] = spawnPoints[i];
    let ox = random(-8, 8);
    let oy = random(-8, 8);
    brush.flowLine(x + ox, y + oy, random(15, 38), 0);
  }

  // Layer 5: soft lavender mist
  brush.set("spray", "#8890b8", 0.8);
  for (let i = 80; i < 180; i++) {
    let [x, y] = spawnPoints[i];
    let ox = random(-6, 6);
    let oy = random(-6, 6);
    brush.flowLine(x + ox, y + oy, random(10, 28), 0);
  }

  // Layer 6: pale ghost highlights
  brush.set("spray", "#b8bdd8", 0.45);
  for (let i = 120; i < 210; i++) {
    let [x, y] = spawnPoints[i];
    let ox = random(-4, 4);
    let oy = random(-4, 4);
    brush.flowLine(x + ox, y + oy, random(6, 18), 0);
  }

  // Layer 7: near-white shimmer
  brush.set("spray", "#dde0ee", 0.28);
  for (let i = 150; i < 220; i++) {
    let [x, y] = spawnPoints[i];
    let ox = random(-3, 3);
    let oy = random(-3, 3);
    brush.flowLine(x + ox, y + oy, random(4, 12), 0);
  }

  // Accent: a few warm amber ghost traces
  brush.set("spray", "#c8a060", 0.6);
  for (let i = 0; i < 30; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    brush.flowLine(x, y, random(20, 45), 0);
  }

  // Accent: dusty rose traces
  brush.set("spray", "#c08888", 0.5);
  for (let i = 0; i < 25; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    brush.flowLine(x, y, random(15, 35), 0);
  }

  brush.noField();

  noLoop();
}