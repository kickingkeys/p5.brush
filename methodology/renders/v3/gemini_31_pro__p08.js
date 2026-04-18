function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noStroke();
  brush.noHatch();
  
  brush.fillTexture(0.55, 0.3);

  let dawnFogPalette = ["#e8e9ed", "#dcdde1", "#e3d8d6", "#d5d9df", "#ece5de", "#f2e8da"];
  for (let i = 0; i < 45; i++) {
    let x = random(20, 580);
    let y = random(20, 450);
    let r = random(80, 180);
    brush.fill(random(dawnFogPalette), random(25, 55));
    brush.fillBleed(random(0.4, 0.7), "out");
    brush.circle(x, y, r, true);
  }

  brush.fill("#fcebc2", 45);
  brush.fillBleed(0.6, "out");
  brush.circle(420, 220, 140, true);
  brush.fill("#fcebc2", 60);
  brush.fillBleed(0.4, "out");
  brush.circle(420, 220, 70, true);

  let waterPalette = ["#a3b1bc", "#94a2ae", "#b1bcc5", "#8695a1", "#d0d6da"];
  for (let i = 0; i < 35; i++) {
    let x = random(40, 560);
    let y = random(380, 580);
    let w = random(120, 300);
    let h = random(15, 45);
    brush.fill(random(waterPalette), random(30, 70));
    brush.fillBleed(random(0.3, 0.6), "out");
    brush.rect(x, y, w, h, "center");
  }

  let bx = 180;
  let by = 460;

  brush.fillTexture(0.75, 0.4);
  brush.wash("#343d46", 140);
  brush.fill("#252c33", 170);
  brush.fillBleed(0.35, "out");
  
  brush.beginShape(0.4);
  brush.vertex(bx - 90, by - 25);
  brush.vertex(bx + 70, by - 15);
  brush.vertex(bx + 50, by + 35);
  brush.vertex(bx - 70, by + 20);
  brush.endShape(CLOSE);
  brush.noWash();

  brush.fill("#15191d", 110);
  brush.fillBleed(0.4, "in");
  brush.beginShape(0.4);
  brush.vertex(bx - 70, by - 15);
  brush.vertex(bx + 50, by - 5);
  brush.vertex(bx + 30, by + 20);
  brush.vertex(bx - 50, by + 10);
  brush.endShape(CLOSE);

  let bx2 = 460;
  let by2 = 410;

  brush.fillTexture(0.65, 0.35);
  brush.wash("#65737e", 100);
  brush.fill("#4f5b66", 130);
  brush.fillBleed(0.4, "out");
  
  brush.beginShape(0.4);
  brush.vertex(bx2 - 60, by2 - 15);
  brush.vertex(bx2 + 45, by2 - 5);
  brush.vertex(bx2 + 30, by2 + 20);
  brush.vertex(bx2 - 45, by2 + 10);
  brush.endShape(CLOSE);
  brush.noWash();

  brush.fill("#343d46", 80);
  brush.fillBleed(0.4, "in");
  brush.beginShape(0.4);
  brush.vertex(bx2 - 45, by2 - 5);
  brush.vertex(bx2 + 30, by2 + 5);
  brush.vertex(bx2 + 15, by2 + 15);
  brush.vertex(bx2 - 30, by2 + 5);
  brush.endShape(CLOSE);

  brush.fillTexture(0.5, 0.2);
  brush.fill("#252c33", 50);
  brush.fillBleed(0.5, "out");
  brush.rect(bx - 10, by + 45, 130, 35, "center");
  
  brush.fill("#4f5b66", 45);
  brush.rect(bx2 - 5, by2 + 30, 80, 25, "center");

  for (let i = 0; i < 8; i++) {
    brush.fill(random(dawnFogPalette), random(20, 45));
    brush.fillBleed(0.6, "out");
    brush.circle(bx + random(-50, 50), by + random(-20, 20), random(40, 90), true);
    brush.circle(bx2 + random(-30, 30), by2 + random(-10, 10), random(30, 70), true);
  }

  brush.noFill();
  brush.field("hand");
  brush.wiggle(1);

  brush.set("HB", "#222222", 1.1);
  brush.line(bx - 25, by - 20, bx - 25, by - 280);

  brush.set("HB", "#333333", 0.8);
  brush.line(bx + 25, by - 15, bx + 25, by - 190);

  brush.set("2H", "#444444", 0.6);
  brush.line(bx2 - 15, by2 - 10, bx2 - 15, by2 - 160);

  brush.set("2H", "#555555", 0.4);
  brush.line(320, 380, 320, 260); 
  brush.line(100, 390, 100, 290); 

  brush.set("2H", "#3a3a3a", 0.5);
  brush.spline([[bx - 25, by - 270], [bx - 65, by - 140], [bx - 85, by - 25]], 0.25);
  brush.spline([[bx - 25, by - 220], [bx + 35, by - 110], [bx + 65, by - 15]], 0.25);
  brush.line(bx - 25, by - 190, bx + 25, by - 100);
  brush.spline([[bx + 25, by - 180], [bx + 45, by - 90], [bx + 55, by - 15]], 0.15);
  brush.line(bx - 25, by - 80, bx - 90, by - 25);

  brush.set("2H", "#666666", 0.4);
  brush.spline([[bx2 - 15, by2 - 150], [bx2 - 40, by2 - 70], [bx2 - 55, by2 - 15]], 0.2);
  brush.line(bx2 - 15, by2 - 130, bx2 + 40, by2 - 5);
  brush.line(bx2 - 15, by2 - 80, bx2 + 25, by2 - 5);

  brush.set("2H", "#888888", 0.3);
  brush.line(320, 265, 300, 380);
  brush.line(320, 290, 340, 380);

  brush.noField();
  noLoop();
}