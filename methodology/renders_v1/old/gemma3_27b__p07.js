function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let numLayers = 50;
  for (let i = 0; i < numLayers; i++) {
    let x = random(-250, 250);
    let y = random(-250, 250);
    let size = random(20, 80);
    let opacity = random(20, 150);
    let brushType = random(["spray", "marker", "pastel", "crayon", "2B", "HB"]);
    let color = color(random(0, 255), random(0, 255), random(0, 255), opacity);

    brush.set(brushType, color, random(0.5, 2));

    if (random(1) < 0.3) {
      brush.circle(x, y, size);
    } else if (random(1) < 0.6) {
      brush.rect(x - size / 2, y - size / 2, size, size);
    } else if (random(1) < 0.8) {
      brush.line(x - size / 2, y, x + size / 2, y);
    } else {
      let angle = random(0, 360);
      push();
      translate(x, y);
      rotate(angle);
      brush.line(-size / 2, 0, size / 2, 0);
      pop();
    }
  }

  let numDrips = 20;
  for (let i = 0; i < numDrips; i++) {
    let x = random(-250, 250);
    let y = random(-250, 250);
    let length = random(30, 70);
    let color = color(random(0, 255), random(0, 255), random(0, 255), random(50, 100));
    brush.set("crayon", color, 1.5);
    brush.line(x, y, x, y + length);
  }

  let numArrows = 15;
  for (let i = 0; i < numArrows; i++) {
      let x = random(-250, 250);
      let y = random(-250, 250);
      let size = random(10, 40);
      let angle = random(0, 360);
      let color = color(random(0, 255), random(0, 255), random(0, 255), random(50, 150));
      brush.set("rotring", color, 1);
      push();
      translate(x, y);
      rotate(angle);
      brush.line(0, 0, size, 0);
      brush.line(0, -size / 2, size, size / 2);
      brush.line(0, size / 2, size, -size / 2);
      pop();
  }


  noLoop();
}