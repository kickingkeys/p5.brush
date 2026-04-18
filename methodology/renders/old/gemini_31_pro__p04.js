function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width/2, -height/2);

  let palette = [
    "#ff3366", "#00c2d1", "#f9e076", 
    "#3a0ca3", "#4cc9f0", "#f72585", 
    "#118ab2", "#ef476f", "#ffd166"
  ];
  
  let structuralBrushes = ["cpencil", "2B", "HB"];
  let detailBrushes = ["2H", "pen", "rotring"];
  let textureBrushes = ["charcoal", "pastel", "crayon"];

  brush.noFill();
  brush.noHatch();
  brush.field("seabed");

  for (let i = 0; i < 40; i++) {
    brush.set(random(textureBrushes), random(palette), random(1.5, 3.5));
    let x = random(150, 450);
    let y = random(100, 500);
    brush.flowLine(x, y, random(40, 150), random(360));
  }

  for (let i = 0; i < 80; i++) {
    let pts = [];
    let rColor = random(palette);
    let rBrush = random(structuralBrushes);
    brush.set(rBrush, rColor, random(0.5, 1.5));
    
    let jx = random(-15, 15);
    let jy = random(-15, 15);
    
    pts.push([random(180, 220) + jx, random(150, 200) + jy]); 
    pts.push([random(170, 190) + jx, random(250, 300) + jy]); 
    pts.push([random(220, 260) + jx, random(400, 450) + jy]); 
    pts.push([random(280, 320) + jx, random(470, 500) + jy]); 
    pts.push([random(340, 380) + jx, random(400, 450) + jy]); 
    pts.push([random(410, 430) + jx, random(250, 300) + jy]); 
    pts.push([random(380, 420) + jx, random(150, 200) + jy]); 
    
    brush.spline(pts, random(0.3, 0.7));
  }

  function drawScribble(cx, cy, radius, density) {
    for (let i = 0; i < density; i++) {
      brush.set(random(structuralBrushes), random(palette), random(0.4, 1.2));
      let pts = [];
      for (let j = 0; j < 5; j++) {
        let angle = random(360);
        let r = random(radius * 0.2, radius);
        pts.push([cx + cos(angle) * r, cy + sin(angle) * r]);
      }
      brush.spline(pts, 0.8);
    }
  }

  drawScribble(230, 270, 35, 45);
  drawScribble(370, 270, 35, 45);

  for (let i = 0; i < 35; i++) {
    brush.set(random(detailBrushes), random(palette), random(0.3, 1.0));
    brush.spline([
      [300 + random(-15, 15), 270 + random(-10, 10)],
      [300 + random(-25, 5), 340 + random(-10, 10)],
      [300 + random(-15, 15), 360 + random(-5, 5)]
    ], random(0.4, 0.8));
  }

  for (let i = 0; i < 50; i++) {
    brush.set(random(structuralBrushes), random(palette), random(0.5, 1.5));
    brush.spline([
      [260 + random(-20, 20), 410 + random(-8, 8)],
      [300 + random(-10, 10), 415 + random(-8, 8)],
      [340 + random(-20, 20), 410 + random(-8, 8)]
    ], random(0.2, 0.6));
  }

  for (let i = 0; i < 120; i++) {
    brush.set(random(detailBrushes), random(palette), random(0.2, 0.8));
    let ex = random() > 0.5 ? random(200, 260) : random(340, 400);
    let ey = random(270, 310);
    let length = random(20, 180);
    let angle = 90 + random(-15, 15);
    brush.flowLine(ex, ey, length, angle);
  }

  brush.field("curved");
  for (let i = 0; i < 60; i++) {
    brush.set(random(structuralBrushes), random(palette), random(0.5, 1.5));
    let sx = random(200, 400);
    let sy = random(450, 500);
    brush.flowLine(sx, sy, random(50, 250), random(70, 110));
  }

  for (let i = 0; i < 100; i++) {
    brush.set(random(detailBrushes), random(palette), random(0.1, 0.5));
    let x = random(100, 500);
    let y = random(50, 550);
    brush.line(x, y, x + random(-10, 10), y + random(-10, 10));
  }

  noLoop();
}