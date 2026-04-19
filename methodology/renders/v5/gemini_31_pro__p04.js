function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  randomSeed(104);
  noiseSeed(104);

  brush.noFill();
  brush.noWash();
  brush.noStroke();

  brush.field("hand");
  brush.wiggle(2);

  function drawOrganicShape(cx, cy, rx, ry, numPts, nScale) {
    brush.beginShape(0.5);
    for (let i = 0; i < numPts; i++) {
      let a = i * (360 / numPts);
      let n = noise(cx + cos(a) * nScale, cy + sin(a) * nScale);
      let x = cx + cos(a) * (rx + n * 40 - 20);
      let y = cy + sin(a) * (ry + n * 40 - 20);
      brush.vertex(x, y);
    }
    brush.endShape(CLOSE);
  }

  brush.hatchStyle("cpencil", "#2a9d8f", 0.9);
  brush.hatch(6, 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(250, 400); brush.vertex(180, 600); 
  brush.vertex(420, 600); brush.vertex(350, 400);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#9d4edd", 0.7);
  brush.hatch(8, 120, { rand: 0.15, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(250, 400); brush.vertex(150, 600); 
  brush.vertex(450, 600); brush.vertex(350, 400);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#f4a261", 0.8);
  brush.hatch(4, 30, { rand: 0.05 });
  drawOrganicShape(300, 270, 100, 130, 24, 0.02);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#e9c46a", 0.6);
  brush.hatch(5, 85, { rand: 0.08 });
  drawOrganicShape(300, 270, 105, 135, 24, 0.02);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#ff006e", 0.7);
  brush.hatch(7, 150, { rand: 0.1 });
  drawOrganicShape(300, 270, 110, 140, 24, 0.02);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#264653", 1.0);
  brush.hatch(5, 15, { rand: 0.1 });
  drawOrganicShape(240, 290, 35, 110, 16, 0.05);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#9d4edd", 0.9);
  brush.hatch(6, 75, { rand: 0.1 });
  drawOrganicShape(240, 290, 45, 100, 16, 0.05);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#e76f51", 0.9);
  brush.hatch(3, 160, { rand: 0.15 });
  drawOrganicShape(255, 240, 25, 15, 12, 0.1); 
  drawOrganicShape(345, 240, 25, 15, 12, 0.1); 
  brush.noHatch();

  brush.hatchStyle("cpencil", "#264653", 1.1);
  brush.hatch(4, 70, { rand: 0.1 });
  drawOrganicShape(255, 240, 20, 12, 12, 0.1);
  drawOrganicShape(345, 240, 20, 12, 12, 0.1);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#e76f51", 0.8);
  brush.hatch(5, 45, { rand: 0.1 });
  drawOrganicShape(240, 310, 20, 25, 12, 0.05);
  drawOrganicShape(360, 310, 20, 25, 12, 0.05);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#2a9d8f", 1.2);
  brush.hatch(7, 45, { rand: 0.2, continuous: true });
  drawOrganicShape(300, 160, 150, 70, 30, 0.03);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#9d4edd", 0.8);
  brush.hatch(9, 135, { rand: 0.2, continuous: true });
  drawOrganicShape(300, 160, 170, 80, 30, 0.03);
  brush.noHatch();

  brush.noHatch();
  
  brush.set("cpencil", "#264653", 1.2);
  brush.spline([
    [220, 200, 0.5],
    [200, 280, 1.0],
    [250, 400, 1.2],
    [350, 400, 0.8],
    [400, 280, 0.6],
    [380, 200, 0.4]
  ], 0.4);

  brush.set("cpencil", "#9d4edd", 1.0);
  brush.spline([
    [250, 400, 0.8],
    [220, 480, 1.2],
    [150, 600, 0.5]
  ], 0.3);
  brush.spline([
    [350, 400, 0.8],
    [380, 480, 1.2],
    [450, 600, 0.5]
  ], 0.3);

  brush.set("cpencil", "#e76f51", 1.0);
  brush.spline([
    [300, 240, 0.4],
    [290, 290, 0.8],
    [310, 310, 1.1],
    [295, 320, 0.6]
  ], 0.5);

  brush.set("cpencil", "#ff006e", 0.9);
  brush.spline([
    [275, 350, 0.3],
    [300, 355, 1.2],
    [325, 345, 0.4]
  ], 0.4);

  brush.noField();
  brush.field("curved");
  
  let memoryColors = ["#f4a261", "#2a9d8f", "#9d4edd", "#e9c46a"];
  for(let i = 0; i < 12; i++) {
    brush.set("cpencil", random(memoryColors), random(0.6, 1.5));
    let sx = random(100, 500);
    let sy = random(50, 550);
    brush.flowLine(sx, sy, random(30, 100), random(360));
  }

  brush.noField();
  noLoop();
}