function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(104);
  noiseSeed(104);

  brush.noStroke();
  brush.fillTexture(0.6, 0.3);

  const fogPalette = ["#eaddd7", "#d8d0d6", "#c5c8cf", "#dfc5c1", "#f0e6d3", "#e6e0d8"];
  for (let i = 0; i < 45; i++) {
    let x = random(20, 580);
    let y = random(20, 480);
    let r = random(90, 220);
    brush.fill(random(fogPalette), random(25, 55));
    brush.fillBleed(random(0.4, 0.7), "out");
    brush.circle(x, y, r);
  }

  const waterPalette = ["#8b95a6", "#737e93", "#9ba2b3", "#a8a1a3", "#b5b0b1"];
  for (let i = 0; i < 25; i++) {
    let x = random(50, 550);
    let y = random(380, 580);
    let w = random(150, 350);
    let h = random(20, 60);
    brush.fill(random(waterPalette), random(35, 70));
    brush.fillBleed(random(0.3, 0.6), "out");
    brush.rect(x, y, w, h, "center");
  }

  drawBoat(220, 430, 140, 35, "#52545c", "#2f3138");
  drawBoat(440, 470, 180, 45, "#635855", "#3d322f");
  drawBoat(340, 395, 90, 20, "#948f91", "#6b6768");

  brush.noFill();
  brush.noWash();

  brush.set("HB", "#3a3a3a", 0.8);
  
  brush.line(195, 430, 195, 180);
  brush.line(245, 430, 245, 230);
  
  brush.line(410, 470, 410, 140);
  brush.line(470, 470, 470, 210);
  
  brush.set("2H", "#555555", 0.5);
  brush.line(340, 395, 340, 270);

  brush.set("2H", "#4a4a4a", 0.4);
  
  brush.spline([[195, 180], [170, 300], [150, 430]], 0.2);
  brush.spline([[195, 220], [220, 320], [245, 430]], 0.2);
  brush.line(195, 180, 245, 230);
  
  brush.spline([[410, 140], [370, 300], [350, 470]], 0.2);
  brush.spline([[410, 140], [440, 170], [470, 210]], 0.2);
  brush.spline([[470, 210], [490, 340], [510, 470]], 0.2);
  brush.line(410, 260, 470, 470);
  
  brush.spline([[340, 270], [325, 330], [300, 395]], 0.1);
  brush.spline([[340, 270], [355, 330], [380, 395]], 0.1);

  brush.set("2H", "#6c6c6c", 0.5);
  brush.line(40, 375, 280, 375);
  brush.line(380, 380, 560, 380);
  
  brush.set("HB", "#444444", 0.4);
  for (let i = 0; i < 25; i++) {
    let rx = random(100, 500);
    let ry = random(440, 580);
    let len = random(15, 50);
    brush.line(rx, ry, rx + len, ry);
  }

  noLoop();
}

function drawBoat(cx, cy, w, h, baseColor, shadowColor) {
  let pts = [];
  for (let i = 0; i <= 20; i++) {
    let t = i / 20;
    let x = lerp(cx - w / 2, cx + w / 2, t);
    let yOffset = sin(t * 180) * h;
    pts.push([x, cy + yOffset]);
  }
  pts.push([cx + w / 2, cy]);
  pts.push([cx - w / 2, cy]);

  brush.fillTexture(0.8, 0.4);
  brush.wash(baseColor, 160);
  brush.fill(baseColor, 190);
  brush.fillBleed(0.25, "out");
  brush.noStroke();
  
  brush.beginShape(0.3);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noWash();

  brush.fill(shadowColor, 130);
  brush.fillBleed(0.4, "in");
  brush.beginShape(0.3);
  for (let p of pts) {
    brush.vertex(lerp(cx, p[0], 0.85), lerp(cy, p[1], 0.85) + h * 0.15);
  }
  brush.endShape(CLOSE);
}