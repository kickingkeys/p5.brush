function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Custom vector field for swirling motion
  brush.addField("swirlField", (t, field) => {
    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        const distX = col - field.length / 2;
        const distY = row - field[0].length / 2;
        const angle = Math.atan2(distY, distX) * 180 / Math.PI + t * 2;
        field[col][row] = angle;
      }
    }
    return field;
  });
  brush.field("swirlField");

  // Particle trails with spray
  const numParticles = 100;
  for (let i = 0; i < numParticles; i++) {
    const x = random(-200, 200);
    const y = random(-200, 200);

    brush.set("spray", "#2a3860", 1.5);
    brush.flowLine(x, y, random(10, 25), 0);
  }

  // Charcoal outline for structure
  brush.set("charcoal", "#333", 0.5);
  brush.beginShape();
  for (let i = 0; i < 360; i += 10) {
    const angle = i;
    const radius = random(50, 150);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    brush.vertex(x, y);
  }
  brush.endShape(CLOSE);

  noLoop();
}