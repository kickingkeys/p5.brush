function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("wind", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let x = map(c, 0, field.length, 0, width);
        let y = map(r, 0, field[0].length, 0, height);
        
        let cx = width * 0.4;
        let cy = height * 0.6;
        
        let dx = x - cx;
        let dy = y - cy;
        let angle = atan2(dy, dx);
        let radius = sqrt(dx * dx + dy * dy);
        
        let flowAngle = angle + 90 + map(radius, 0, 400, 60, 0);
        let n = (noise(x * 0.004, y * 0.004) * 2 - 1) * 45;
        
        field[c][r] = flowAngle + n;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("wind");

  brush.set("2H", "#e3dfd5", 0.6);
  for (let i = 0; i < 200; i++) {
    brush.flowLine(random(width), random(height), random(30, 250), 0);
  }

  brush.set("spray", "#e8e5dc", 1.5);
  for (let i = 0; i < 60; i++) {
    brush.flowLine(random(width), random(height), random(20, 100), 0);
  }

  let birds = [];
  for (let i = 0; i < 7; i++) {
    let px = random(100, width - 100);
    let py = random(100, height - 100);
    let pos = new brush.Position(px, py);
    
    let numBirds = floor(random(8, 25));
    for (let j = 0; j < numBirds; j++) {
      pos.moveTo(0, random(15, 45), 5);
      
      let bx = pos.x + random(-35, 35);
      let by = pos.y + random(-35, 35);
      
      if (bx > 30 && bx < width - 30 && by > 30 && by < height - 30) {
        birds.push({ x: bx, y: by });
      }
    }
  }

  for (let b of birds) {
    let bpos = new brush.Position(b.x, b.y);
    let a = bpos.angle();
    
    push();
    translate(b.x, b.y);
    rotate(a);
    
    let size = random(0.5, 1.3);
    let weight = random(0.8, 1.6);
    let isAccent = random() > 0.88;
    let col = isAccent ? "#d6452d" : "#21201e";
    
    brush.set("marker", col, weight);
    
    let wingSpan = 12 * size;
    let sweep = 8 * size;
    
    brush.spline([
      [-sweep, -wingSpan, 0.2], 
      [sweep, 0, 1.3], 
      [-sweep, wingSpan, 0.2]
    ], 0.65);
    
    pop();
  }

  brush.set("marker", "#7a7671", 0.4);
  for (let i = 0; i < 70; i++) {
    let x = random(width);
    let y = random(height);
    let bpos = new brush.Position(x, y);
    
    push();
    translate(x, y);
    rotate(bpos.angle());
    brush.line(-3, 0, 3, 0);
    pop();
  }

  noLoop();
}