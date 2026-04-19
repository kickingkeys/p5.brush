function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  randomSeed(42);
  noiseSeed(42);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.noStroke();
  brush.fillTexture(0.6, 0.2);
  brush.fill("#f4e8d8", 140);
  brush.fillBleed(0.4, "out");
  brush.rect(300, 150, 600, 300, "center");
  brush.noFill();

  brush.set("pen", "#222", 0.6);
  brush.line(20, 300, 580, 300);

  brush.fillTexture(0.75, 0.4);
  drawWash(300, "#e8d5b7", 180);

  drawRock(120, 302, 90, 120);
  drawRock(500, 301, 130, 160);
  drawRock(420, 305, 50, 70);

  drawWash(330, "#dfc29b", 190);

  drawRock(260, 360, 200, 150);
  drawRock(150, 345, 110, 95);

  drawWash(400, "#d1a97a", 200);

  drawWash(480, "#c28e57", 210);

  brush.set("HB", "#5c3d26", 0.5);
  brush.field("hand");
  brush.wiggle(2);
  for(let i = 0; i < 90; i++) {
    let x = random(20, 580);
    let y = random(480, 590);
    let a = random([30, 90, 150, 210, 270, 330]) + random(-15, 15);
    brush.flowLine(x, y, random(15, 50), a);
  }
  brush.noField();

  noLoop();
}

function drawWash(yBase, colorHex, opacity) {
  brush.noStroke();
  brush.fill(colorHex, opacity);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.4);
  brush.vertex(-20, yBase);
  for(let x = 0; x <= 620; x += 40) {
    brush.vertex(x, yBase + noise(x * 0.015, yBase * 0.1) * 35 - 15);
  }
  brush.vertex(620, 620);
  brush.vertex(-20, 620);
  brush.endShape(CLOSE);
  brush.noFill();
}

function drawRock(cx, cy, w, h) {
  brush.noStroke();
  brush.mass("crayon", "#282523", { strength: 0.85, precision: 0.3, outline: true });
  brush.beginShape(0.1);
  let pts = [];
  pts.push([cx - w/2, cy]);
  pts.push([cx - w*0.3, cy - h*0.4 + random(-10, 10)]);
  pts.push([cx - w*0.1, cy - h*0.8 + random(-15, 15)]);
  pts.push([cx + w*0.15, cy - h + random(-20, 20)]);
  pts.push([cx + w*0.35, cy - h*0.5 + random(-10, 10)]);
  pts.push([cx + w/2, cy]);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.set("charcoal", "#151311", 1.2);
  brush.field("hand");
  brush.wiggle(3);
  brush.line(pts[3][0], pts[3][1], cx, cy);
  brush.line(pts[2][0], pts[2][1], cx - w*0.1, cy);
  brush.line(pts[4][0], pts[4][1], cx + w*0.2, cy);
  brush.noField();
  
  brush.hatchStyle("charcoal", "#3a3633", 0.8);
  brush.hatch(6, 65, { rand: 0.15 });
  brush.beginShape(0.1);
  for (let p of pts) brush.vertex(p[0], p[1]);
  brush.endShape(CLOSE);
  brush.noHatch();
}