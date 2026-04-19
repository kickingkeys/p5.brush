function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.55, 0.3);
  
  const skyPalette = ["#f7e8df", "#f2dcdb", "#e3dbe0", "#d1d6dc", "#e8e1da"];
  for (let i = 0; i < 35; i++) {
    let x = random(50, 550);
    let y = random(50, 350);
    let r = random(60, 180);
    brush.fill(random(skyPalette), random(40, 75));
    brush.fillBleed(random(0.4, 0.6), "out");
    
    brush.beginShape(0.5);
    for (let a = 0; a < 360; a += 45) {
      let rOff = r + random(-25, 25);
      brush.vertex(x + cos(a) * rOff, y + sin(a) * rOff);
    }
    brush.endShape(CLOSE);
  }

  const waterPalette = ["#a3b1bc", "#8898a6", "#b5c0c8", "#7a8b99", "#d4d0ce"];
  for (let i = 0; i < 45; i++) {
    let x = random(20, 580);
    let y = random(320, 580);
    let w = random(120, 250);
    let h = random(30, 70);
    brush.fill(random(waterPalette), random(50, 90));
    brush.fillBleed(random(0.3, 0.5), "out");
    
    brush.beginShape(0.4);
    for (let a = 0; a < 360; a += 30) {
      let xOff = (w / 2) + random(-15, 15);
      let yOff = (h / 2) + random(-10, 10);
      brush.vertex(x + cos(a) * xOff, y + sin(a) * yOff);
    }
    brush.endShape(CLOSE);
  }

  let boats = [
    { x: 220, y: 420, s: 1.1 },
    { x: 420, y: 380, s: 0.85 },
    { x: 330, y: 480, s: 1.4 },
    { x: 120, y: 360, s: 0.6 }
  ];

  for (let b of boats) {
    brush.fill("#59626b", 110);
    brush.fillBleed(0.25, "in");
    brush.beginShape(0.2);
    brush.vertex(b.x - 45 * b.s, b.y - 12 * b.s);
    brush.vertex(b.x + 55 * b.s, b.y - 12 * b.s);
    brush.vertex(b.x + 35 * b.s, b.y + 18 * b.s);
    brush.vertex(b.x - 25 * b.s, b.y + 18 * b.s);
    brush.endShape(CLOSE);
  }
  
  brush.noFill();

  brush.field("hand");
  brush.wiggle(1);

  for (let i = 0; i < 12; i++) {
    let x = random(80, 520);
    let y = random(300, 340);
    let h = random(30, 80);
    brush.set("2H", "#78838d", random(0.3, 0.6));
    brush.line(x, y, x, y - h);
    if (random() > 0.4) {
      brush.spline([[x, y - h * 0.8], [x + random(8, 15), y - h * 0.4], [x + random(10, 25), y]], 0.2);
    }
  }

  for (let b of boats) {
    let mastH = random(120, 200) * b.s;
    
    brush.set("HB", "#3b434a", random(0.8, 1.2));
    brush.line(b.x + 5 * b.s, b.y - 10 * b.s, b.x + 5 * b.s, b.y - 10 * b.s - mastH);
    
    if (random() > 0.3) {
      let mast2H = mastH * random(0.6, 0.8);
      brush.set("2H", "#485159", random(0.6, 0.9));
      brush.line(b.x - 20 * b.s, b.y - 10 * b.s, b.x - 20 * b.s, b.y - 10 * b.s - mast2H);
    }

    brush.set("2H", "#4f5861", random(0.4, 0.7));
    brush.spline([
      [b.x - 40 * b.s, b.y - 10 * b.s],
      [b.x - 10 * b.s, b.y - 10 * b.s - mastH * 0.4],
      [b.x + 5 * b.s, b.y - 10 * b.s - mastH * 0.9]
    ], 0.4);
    
    brush.spline([
      [b.x + 50 * b.s, b.y - 10 * b.s],
      [b.x + 25 * b.s, b.y - 10 * b.s - mastH * 0.35],
      [b.x + 5 * b.s, b.y - 10 * b.s - mastH * 0.85]
    ], 0.4);
    
    brush.set("HB", "#3b434a", random(0.6, 1.0));
    brush.line(b.x - 15 * b.s, b.y - 10 * b.s - mastH * 0.2, b.x + 35 * b.s, b.y - 10 * b.s - mastH * 0.15);
  }

  brush.set("2H", "#697782", random(0.4, 0.7));
  for (let i = 0; i < 30; i++) {
    let x = random(40, 500);
    let y = random(330, 580);
    let w = random(20, 100);
    brush.line(x, y, x + w, y);
  }

  brush.noField();
  noLoop();
}