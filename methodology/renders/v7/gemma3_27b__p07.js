function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Spray base layer
  brush.set("spray", "#e8574c", 1.0);
  for (let i = 0; i < 40; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let size = random(20, 60);
    brush.circle(x, y, size);
  }

  // Charcoal drips
  brush.set("charcoal", "#333", 1.0);
  for (let i = 0; i < 20; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(40, 120);
    brush.line(x, y, x + random(-10, 10), y + len);
  }

  // Rotring arrows
  brush.set("rotring", "#2a3860", 0.8);
  for (let i = 0; i < 10; i++) {
    let x1 = random(0, 600);
    let y1 = random(0, 600);
    let x2 = x1 + random(50, 150);
    let y2 = y1 + random(50, 150);
    brush.line(x1, y1, x2, y2);
    let angle = atan2(y2 - y1, x2 - x1);
    let arrowLength = 15;
    let arrowX = x2 - arrowLength * cos(angle - 30);
    let arrowY = y2 - arrowLength * sin(angle - 30);
    brush.line(x2, y2, arrowX, arrowY);
    arrowX = x2 - arrowLength * cos(angle + 30);
    arrowY = y2 - arrowLength * sin(angle + 30);
    brush.line(x2, y2, arrowX, arrowY);
  }
  
  // Crayon tags
  brush.set("crayon", "#ff9988", 1.2);
  let tagText = "p5brush";
  let fontSize = 30;
  let x = 100;
  let y = 300;
  for (let i = 0; i < tagText.length; i++) {
      let char = tagText.charAt(i);
      let textWidth = 15; // Approximate character width
      brush.rect(x, y, textWidth, fontSize);
      x += textWidth + 5;
  }

  noLoop();
}