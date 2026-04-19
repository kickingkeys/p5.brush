function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  brush.field("hand");
  brush.wiggle(2);
  
  // Face outline with shifting colored pencil
  const faceColors = ["#cc4466", "#665588", "#883355", "#446677"];
  for (let i = 0; i < 4; i++) {
    brush.hatchStyle("cpencil", random(faceColors), random(0.6, 1.0));
    brush.hatch(random(6, 10), random([30, 45, 60]), { rand: random(0.05, 0.12), continuous: true });
    brush.beginShape(0.4);
    for (let a = 0; a < 360; a += 10) {
      const angle = radians(a);
      const baseR = 120;
      const x = 300 + cos(angle) * baseR + noise(a * 0.02, frameCount * 0.005) * 25;
      const y = 300 + sin(angle) * baseR + noise(a * 0.02 + 10, frameCount * 0.005) * 20;
      brush.vertex(x, y);
    }
    brush.endShape(true);
  }

  // Eyes - asymmetric, layered
  const eyeX1 = 260, eyeY1 = 270;
  const eyeX2 = 330, eyeY2 = 265;
  for (let i = 0; i < 3; i++) {
    brush.hatchStyle("cpencil", "#223344", random(0.5, 0.8));
    brush.hatch(random(3, 6), random([75, 90, 105]), { rand: 0.1, continuous: true });
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 15) {
      const angle = radians(a);
      const rx = 15 + noise(i, 0) * 8;
      const ry = 8 + noise(i, 1) * 5;
      const x = eyeX1 + cos(angle) * rx + noise(a * 0.1, i) * 4;
      const y = eyeY1 + sin(angle) * ry + noise(a * 0.1 + 5, i) * 3;
      brush.vertex(x, y);
    }
    brush.endShape(true);
    
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 15) {
      const angle = radians(a);
      const rx = 18 + noise(i, 2) * 9;
      const ry = 9 + noise(i, 3) * 6;
      const x = eyeX2 + cos(angle) * rx + noise(a * 0.1, i + 10) * 5;
      const y = eyeY2 + sin(angle) * ry + noise(a * 0.1 + 5, i + 10) * 4;
      brush.vertex(x, y);
    }
    brush.endShape(true);
  }

  // Mouth - blurred suggestion
  brush.hatchStyle("cpencil", "#aa3355", 0.6);
  brush.hatch(8, 45, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  for (let a = 0; a < 180; a += 10) {
    const angle = radians(a);
    const x = 280 + a * 0.6 + noise(a * 0.03) * 8;
    const y = 340 + sin(angle) * 15 + noise(a * 0.03 + 100) * 10;
    brush.vertex(x, y);
  }
  brush.endShape(false);

  // Hair - gestural strokes
  const hairColors = ["#775533", "#884422", "#663311", "#996644"];
  brush.field("curved");
  for (let i = 0; i < 25; i++) {
    const x = random(220, 380);
    const y = random(180, 250);
    brush.set("cpencil", random(hairColors), random(0.7, 1.2));
    const len = random(60, 120);
    const angle = random(-60, 60);
    brush.spline([
      [x, y],
      [x + cos(radians(angle)) * len * 0.7, y + sin(radians(angle)) * len * 0.7],
      [x + cos(radians(angle + random(-20, 20))) * len, y + sin(radians(angle + random(-20, 20))) * len]
    ], 0.4);
  }

  // Memory fade - soft spray overlay
  brush.field("hand");
  brush.set("spray", "#cc99aa", 1.8);
  for (let i = 0; i < 40; i++) {
    brush.flowLine(
      random(200, 400),
      random(220, 380),
      random(15, 35),
      random(360)
    );
  }

  brush.noField();
  noLoop();
}