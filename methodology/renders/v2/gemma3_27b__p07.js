function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
  background("#fffaf3");
}

function draw() {
  translate(-width/2, -height/2);

  for (let i = 0; i < 150; i++) {
    let x = random(-250, 250);
    let y = random(-250, 250);
    let size = random(20, 60);
    let opacity = random(50, 200);
    let color = color(random(255), random(255), random(255), opacity);

    let tool = floor(random(0, 10));
    switch (tool) {
      case 0:
        brush.set("spray", color, 1);
        brush.circle(x, y, size);
        break;
      case 1:
        brush.set("marker", color, 0.8);
        brush.circle(x, y, size);
        break;
      case 2:
        brush.set("crayon", color, 1.2);
        brush.circle(x, y, size);
        break;
      case 3:
        brush.set("pastel", color, 1);
        brush.circle(x, y, size);
        break;
      case 4:
        brush.set("2B", color, 0.5);
        brush.circle(x, y, size);
        break;
      case 5:
        brush.set("HB", color, 0.7);
        brush.circle(x, y, size);
        break;
      case 6:
        brush.set("2H", color, 0.3);
        brush.circle(x, y, size);
        break;
      case 7:
        brush.set("rotring", color, 0.6);
        brush.circle(x, y, size);
        break;
      case 8:
        brush.set("pen", color, 0.4);
        brush.circle(x, y, size);
        break;
      case 9:
        brush.set("charcoal", color, 1);
        brush.circle(x, y, size);
        break;
    }
  }

  for (let i = 0; i < 80; i++) {
    let x = random(-250, 250);
    let y = random(-250, 250);
    let angle = random(0, 360);
    let length = random(30,80);
    let opacity = random(30,100);
    let arrowColor = color(random(0,100), random(0,100), random(0,100), opacity);

    brush.set("rotring", arrowColor, 0.5);
    push();
    translate(x,y);
    rotate(angle);
    beginShape();
    vertex(0, 0);
    vertex(length, 0);
    vertex(length/2, 15);
    vertex(length/2, -15);
    endShape(CLOSE);
    pop();
  }

  for (let i = 0; i < 50; i++){
    let x = random(-250, 250);
    let y = random(-250, 250);
    let size = random(50, 100);
    let opacity = random(20, 60);
    let ghostColor = color(255, 255, 255, opacity);

    brush.set("cpencil", ghostColor, 0.2);
    brush.beginShape();
    for(let j = 0; j < 360; j += 10) {
      let r = size/2 + noise(j * 0.05) * 10;
      let px = x + cos(j) * r;
      let py = y + sin(j) * r;
      vertex(px, py);
    }
    brush.endShape(CLOSE);
  }

  noLoop();
}