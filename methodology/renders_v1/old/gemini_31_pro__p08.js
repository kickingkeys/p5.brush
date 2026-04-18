function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.fillTexture(0.6, 0.15);
  brush.fillBleed(0.7, "out");

  brush.fill("#f5e6d3", 70);
  brush.circle(300, 250, 350, true);

  brush.fill("#e6dcd3", 60);
  brush.rect(0, 0, 600, 350);

  brush.fill("#c2cbd4", 50);
  brush.circle(150, 180, 400, true);
  brush.circle(500, 200, 300, true);
  brush.circle(300, 100, 450, true);

  brush.fill("#aeb8c3", 75);
  brush.rect(0, 330, 600, 270);
  
  brush.fill("#9da8b5", 65);
  brush.circle(300, 450, 500, true);

  brush.fill("#8b96a3", 40);
  brush.polygon([
    [-20, 320], [250, 325], [400, 322], [620, 330], [620, 360], [-20, 360]
  ]);

  brush.fill("#7c8794", 55);
  brush.polygon([[100, 335], [240, 335], [210, 360], [120, 360]]);
  brush.polygon([[400, 345], [520, 345], [500, 375], [420, 375]]);

  brush.fill("#616a75", 70);
  brush.polygon([[200, 370], [420, 370], [380, 430], [230, 430]]);

  brush.noFill();

  brush.set("2H", "#6a7480", 0.5);
  brush.line(160, 335, 160, 180);
  brush.line(200, 335, 200, 210);
  brush.line(460, 345, 460, 200);

  brush.set("2H", "#6a7480", 0.3);
  brush.line(100, 335, 160, 180);
  brush.line(160, 180, 200, 210);
  brush.line(240, 335, 200, 210);
  brush.line(400, 345, 460, 200);
  brush.line(520, 345, 460, 200);

  brush.set("HB", "#454d57", 0.7);
  brush.line(280, 370, 280, 100);
  brush.line(350, 370, 350, 160);

  brush.set("HB", "#525b66", 0.6);
  brush.line(240, 220, 320, 200);
  brush.line(320, 250, 380, 240);

  brush.set("cpencil", "#525b66", 0.4);
  brush.spline([[200, 370], [230, 260], [280, 100]], 0.3);
  brush.spline([[420, 370], [390, 260], [350, 160]], 0.3);
  brush.line(280, 100, 350, 160);
  brush.line(280, 160, 200, 370);
  brush.line(350, 220, 420, 370);

  brush.set("2B", "#2e343b", 0.8);
  brush.spline([[200, 370], [230, 430], [380, 430], [420, 370]], 0.1);
  brush.line(200, 370, 420, 370);

  brush.field("waves");
  brush.set("HB", "#828e9c", 0.5);
  for (let i = 0; i < 60; i++) {
    let rx = random(50, 550);
    let ry = random(340, 580);
    let len = random(15, 50);
    brush.strokeWeight(map(ry, 340, 580, 0.8, 0.2));
    brush.flowLine(rx, ry, len, 0);
  }
  brush.noField();

  brush.set("spray", "#eef2f5", 1.5);
  for (let i = 0; i < 12; i++) {
    brush.circle(random(600), random(100, 300), random(60, 180));
  }

  noLoop();
}