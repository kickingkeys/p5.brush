let particles = [];
let numParticles = 120;
let fieldName = "swarmFlow";

function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);

  brush.addField("swarmFlow", function(t, field) {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let nx = c * 0.08;
        let ny = r * 0.08;
        field[c][r] = noise(nx, ny) * 360;
      }
    }
    return field;
  });

  brush.field("swarmFlow");
  brush.wiggle(2);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(40, 560),
      y: random(40, 560),
      col: random(["#1a1a2e", "#16213e", "#0f3460", "#533483", "#2c2c54", "#3d2b56", "#1b1b2f"]),
      w: random(1.2, 3.2),
      len: random(25, 70),
      alpha: random(0.4, 1.0)
    });
  }
}

function draw() {
  translate(-width / 2, -height / 2);

  for (let p of particles) {
    let opacity = floor(p.alpha * 255);
    brush.set("spray", p.col, p.w);
    brush.flowLine(p.x, p.y, p.len, 0);
  }

  // Second pass — lighter, smaller trails for ghostly layering
  brush.wiggle(4);
  let ghostColors = ["#7b8cde", "#a29bfe", "#b8c0ff", "#c8b6ff", "#dbbfff"];
  for (let i = 0; i < 60; i++) {
    let x = random(30, 570);
    let y = random(30, 570);
    let col = random(ghostColors);
    brush.set("spray", col, random(0.5, 1.6));
    brush.flowLine(x, y, random(15, 45), 0);
  }

  // Third pass — very faint wide spray for atmospheric cloud base
  brush.wiggle(1);
  for (let i = 0; i < 30; i++) {
    let x = random(60, 540);
    let y = random(60, 540);
    brush.set("spray", "#c0c8e8", random(2.5, 3.8));
    brush.flowLine(x, y, random(40, 80), 0);
  }

  brush.noField();
  noLoop();
}