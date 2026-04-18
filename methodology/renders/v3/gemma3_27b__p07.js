function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
  angleMode(DEGREES);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let numLayers = 50;

  for (let i = 0; i < numLayers; i++) {
    let x = random(0, 600);
    let y = random(0, 600);
    let size = random(20, 80);
    let opacity = random(30, 180);

    let brushType = floor(random(0, 10));

    switch (brushType) {
      case 0: // Circle - spray
        brush.set("spray", "#cc0033", 1);
        brush.fill("#cc0033", opacity);
        brush.circle(x, y, size);
        break;
      case 1: // Drip - charcoal
        brush.set("charcoal", "#333", 1);
        brush.stroke("#333");
        brush.strokeWeight(random(1,3));
        line(x, y, x + random(-20, 20), y + size);
        break;
      case 2: // Arrow - pen
        brush.set("pen", "#000", 1.2);
        brush.stroke("#000");
        push();
        translate(x, y);
        rotate(random(0, 360));
        beginShape();
        vertex(0, -size / 2);
        vertex(size / 2, 0);
        vertex(0, size / 2);
        vertex(-size / 2, 0);
        endShape(CLOSE);
        pop();
        break;
      case 3: // Ghost Hand - 2B
        brush.set("2B", "#aaa", 0.5);
        brush.noFill();
        brush.stroke("#aaa");
        brush.strokeWeight(random(0.5, 1.5));
        beginShape();
        for (let j = 0; j < 5; j++) {
          let angle = j * 72;
          let radius = size / 2;
          let px = x + cos(angle) * radius * random(0.5, 1.5);
          let py = y + sin(angle) * radius * random(0.5, 1.5);
          vertex(px, py);
        }
        endShape(CLOSE);
        break;
      case 4: // Pastel fill
        brush.set("pastel", "#ff8800", 1);
        brush.fill("#ff8800", opacity);
        brush.beginShape();
        for (let j = 0; j < 5; j++) {
          let angle = j * 72;
          let radius = size / 2;
          let px = x + cos(angle) * radius;
          let py = y + sin(angle) * radius;
          vertex(px, py);
        }
        brush.endShape(CLOSE);
        break;
      case 5: // Crayon splatter
        brush.set("crayon", "#00cc00", 1);
        brush.fill("#00cc00", opacity);
        brush.circle(x + random(-size/2, size/2), y + random(-size/2, size/2), random(5,15));
        break;
      case 6: // 2H scratch
        brush.set("2H", "#666", 0.8);
        brush.stroke("#666");
        brush.strokeWeight(random(0.2, 0.8));
        line(x, y, x + random(-size, size), y + random(-size, size));
        break;
      case 7: // Rotring dash
        brush.set("rotring", "#000", 0.5);
        brush.stroke("#000");
        brush.strokeWeight(random(0.5,1.5));
        line(x, y, x + random(-size/2, size/2), y);
        break;
      case 8: // HB line
        brush.set("HB", "#333", 1);
        brush.stroke("#333");
        brush.strokeWeight(random(0.5,2));
        line(x, y, x + random(-size, size), y + random(-size, size));
        break;
      case 9: // Marker blob
        brush.set("marker", "#0000ff", 1);
        brush.fill("#0000ff", opacity);
        brush.circle(x, y, size/2);
        break;
    }
  }

  noLoop();
}