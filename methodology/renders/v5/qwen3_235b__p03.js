function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.field("hand");
  brush.wiggle(4);

  // Loose gesture lines with charcoal
  brush.set("charcoal", "#1a1a1a", 2.0);
  brush.strokeWeight(2.5);
  brush.spline([
    [200, 400],
    [250, 320, 1.8],
    [300, 280, 1.2],
    [350, 200, 0.8]
  ], 0.4);

  brush.spline([
    [300, 400],
    [330, 350, 1.6],
    [340, 300, 1.0],
    [320, 250, 0.6]
  ], 0.3);

  brush.spline([
    [250, 180],
    [280, 160, 1.4],
    [320, 170, 0.9],
    [360, 150, 0.7]
  ], 0.5);

  // Smudge trails with pastel massing
  brush.mass("pastel", "#332222", {
    strength: 0.6,
    precision: 0.4,
    gradient: 0.5,
    outline: false
  });
  brush.beginShape(0.2);
  brush.vertex(260, 330);
  brush.vertex(280, 310);
  brush.vertex(310, 290);
  brush.vertex(330, 270);
  brush.vertex(340, 240);
  brush.vertex(320, 230);
  brush.vertex(300, 260);
  brush.vertex(270, 290);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#443333", {
    strength: 0.5,
    precision: 0.3,
    gradient: 0.4,
    outline: false
  });
  brush.beginShape(0.2);
  brush.vertex(330, 310);
  brush.vertex(350, 290);
  brush.vertex(370, 270);
  brush.vertex(380, 250);
  brush.vertex(360, 240);
  brush.vertex(340, 260);
  brush.vertex(320, 280);
  brush.endShape(true);
  brush.noMass();

  // Light structural details with HB
  brush.set("HB", "#555", 1.0);
  brush.spline([
    [260, 330],
    [275, 300],
    [290, 270]
  ], 0.3);

  brush.spline([
    [330, 310],
    [345, 280],
    [360, 250]
  ], 0.3);

  // Final smudges with spray for motion blur
  brush.set("spray", "#222", 1.8);
  for (let i = 0; i < 12; i++) {
    const x = random(280, 370);
    const y = random(220, 270);
    brush.flowLine(x, y, random(20, 50), random(200, 260));
  }

  brush.noField();
  noLoop();
}