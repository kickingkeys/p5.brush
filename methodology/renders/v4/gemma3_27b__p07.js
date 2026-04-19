function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const sprayColors = ["#e8574c", "#4f8dc7", "#f2b84c", "#2a2a2a", "#993344"];
  const markerColors = ["#333333", "#666666", "#999999"];

  // Overlapping circles
  for (let i = 0; i < 40; i++) {
    brush.set("spray", random(sprayColors), random(0.8, 2.8));
    brush.circle(random(-250, 250), random(-250, 250), random(30, 80));
  }

  // Drips
  for (let i = 0; i < 14; i++) {
    brush.set("spray", random(sprayColors), random(0.4, 0.8));
    const x = random(50, 550);
    const y = random(50, 550);
    brush.line(x, y, x + random(-4, 4), y + random(40, 120));
  }

  // Arrows / tags
  for (let i = 0; i < 6; i++) {
    brush.set("marker", random(markerColors), random(1.5, 2.5));
    const x0 = random(80, 500);
    const y0 = random(100, 500);
    brush.beginShape();
    brush.vertex(x0, y0);
    brush.vertex(x0 + random(40, 120), y0 + random(-30, 30));
    brush.vertex(x0 + random(120, 220), y0 + random(-20, 20));
    brush.endShape(CLOSE);
  }

  // Ghosted hand-drawn marks
  brush.set("2H", "#cccccc", 0.5);
  for (let i = 0; i < 10; i++) {
    brush.beginShape();
    brush.vertex(random(-250, 250), random(-250, 250));
    brush.vertex(random(-250, 250), random(-250, 250));
    brush.vertex(random(-250, 250), random(-250, 250));
    brush.endShape(CLOSE);
  }

  // Charcoal splatters
  brush.set("charcoal", "#333", 0.8);
  for(let i = 0; i < 8; i++) {
    brush.beginShape();
    brush.vertex(random(-250, 250), random(-250, 250));
    brush.vertex(random(-250, 250), random(-250, 250));
    brush.vertex(random(-250, 250), random(-250, 250));
    brush.endShape(CLOSE);
  }

  noLoop();
}