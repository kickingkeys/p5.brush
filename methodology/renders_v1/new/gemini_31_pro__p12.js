function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  brush.addField("ethereal", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let n = noise(col * 0.02, row * 0.02);
        field[col][row] = n * 720;
      }
    }
    return field;
  });
  
  brush.field("ethereal");

  let swarm = [];
  
  for (let i = 0; i < 8; i++) {
    let cx = random(100, 500);
    let cy = random(100, 500);
    for (let j = 0; j < 80; j++) {
      swarm.push({
        x: cx + randomGaussian(0, 45),
        y: cy + randomGaussian(0, 45)
      });
    }
  }
  
  for (let i = 0; i < 200; i++) {
    swarm.push({
      x: random(50, 550),
      y: random(50, 550)
    });
  }

  let passes = [
    { c: "#7b8794", w: 3.5, len: 120, ox: 25, oy: 25 },
    { c: "#8a7b94", w: 2.5, len: 90, ox: 12, oy: 12 },
    { c: "#6b7a8f", w: 1.5, len: 60, ox: 0, oy: 0 },
    { c: "#5b6370", w: 0.8, len: 35, ox: -12, oy: -12 },
    { c: "#3d4554", w: 0.4, len: 15, ox: -25, oy: -25 }
  ];

  for (let pass of passes) {
    brush.set("spray", pass.c, pass.w);
    for (let p of swarm) {
      let jx = p.x + pass.ox + random(-pass.w * 4, pass.w * 4);
      let jy = p.y + pass.oy + random(-pass.w * 4, pass.w * 4);
      brush.flowLine(jx, jy, pass.len * random(0.7, 1.3), random(-3, 3));
    }
  }

  brush.set("charcoal", "#2a2d34", 0.4);
  for (let p of swarm) {
    if (random() < 0.12) {
      brush.flowLine(p.x, p.y, random(30, 100), 0);
    }
  }

  brush.noField();
  noLoop();
}