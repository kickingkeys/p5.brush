function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Spray-painted circles
  brush.set("spray", "#cc3366", 1.2);
  brush.noFill();
  for (let i = 0; i < 15; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let r = random(30, 80);
    brush.circle(x, y, r, random(0.2, 0.8));
  }

  // Drips below some circles
  brush.set("spray", "#cc3366", 0.8);
  for (let i = 0; i < 8; i++) {
    let x = random(70, 530);
    let y = random(100, 500);
    let len = random(20, 60);
    brush.strokeWeight(random(0.6, 1.4));
    brush.line(x, y, x + random(-5, 5), y + len);
  }

  // Arrows
  brush.set("marker", "#2255aa", 1.1);
  for (let i = 0; i < 12; i++) {
    let x1 = random(20, 580);
    let y1 = random(20, 580);
    let angle = random(TWO_PI);
    let length = random(30, 70);
    let x2 = x1 + cos(angle) * length;
    let y2 = y1 + sin(angle) * length;
    
    brush.strokeWeight(1);
    brush.line(x1, y1, x2, y2);
    
    // Arrowhead
    brush.strokeWeight(1.4);
    let a = angle + PI + PI/6;
    let x3 = x2 + cos(a) * 15;
    let y3 = y2 + sin(a) * 15;
    brush.line(x2, y2, x3, y3);
    
    a = angle + PI - PI/6;
    x3 = x2 + cos(a) * 15;
    y3 = y2 + sin(a) * 15;
    brush.line(x2, y2, x3, y3);
  }

  // Ghosted hand-drawn marks
  brush.wiggle(2);
  brush.set("2H", "#a0a0b0", 0.7);
  brush.strokeWeight(0.5);
  for (let i = 0; i < 20; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let len = random(20, 100);
    let angle = random(TWO_PI);
    let x2 = x + cos(angle) * len;
    let y2 = y + sin(angle) * len;
    brush.line(x, y, x2, y2);
  }

  // Overlapping scribbles with different pencils
  let tools = ["2B", "HB", "cpencil", "pen", "rotring", "charcoal", "pastel", "crayon"];
  for (let i = 0; i < 30; i++) {
    let tool = random(tools);
    let color = tool === "charcoal" ? "#333" :
                tool === "pastel" ? "#ff9ecb" :
                tool === "crayon" ? "#ffb74d" :
                tool === "pen" ? "#224488" :
                tool === "rotring" ? "#111" :
                "#555";
    let w = random(0.6, 1.3);
    brush.set(tool, color, w);
    brush.strokeWeight(random(0.6, 1.4));
    
    let x = random(30, 570);
    let y = random(30, 570);
    let npoints = int(random(4, 10));
    brush.beginShape();
    for (let j = 0; j < npoints; j++) {
      let px = x + random(-40, 40);
      let py = y + random(-40, 40);
      brush.vertex(px, py, random(0.6, 1.4));
    }
    brush.endShape(false);
  }

  // Faint circular overlays
  brush.set("2H", "#e0e0e0", 0.5);
  brush.noFill();
  for (let i = 0; i < 10; i++) {
    let x = random(100, 500);
    let y = random(100, 500);
    let r = random(100, 200);
    brush.strokeWeight(0.3);
    brush.circle(x, y, r, 0.1);
  }

  noLoop();
}