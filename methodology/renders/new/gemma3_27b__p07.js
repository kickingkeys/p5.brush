function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let numLayers = 20;
  for (let i = 0; i < numLayers; i++) {
    let alpha = map(i, 0, numLayers, 50, 200);
    let x = random(0, 600);
    let y = random(0, 600);
    let size = random(30, 100);

    let brushChoice = floor(random(0, 11));

    switch (brushChoice) {
      case 0: // 2B
        brush.set("2B", "#333", random(0.8, 2.0));
        brush.circle(x, y, size);
        break;
      case 1: // HB
        brush.set("HB", "#555", random(0.5, 1.5));
        brush.circle(x, y, size);
        break;
      case 2: // 2H
        brush.set("2H", "#777", random(0.3, 1.0));
        brush.circle(x, y, size);
        break;
      case 3: // cpencil
        brush.set("cpencil", "#ff6666", random(0.5, 1.0));
        brush.circle(x, y, size);
        break;
      case 4: // pen
        brush.set("pen", "#000", random(0.2, 0.8));
        brush.circle(x, y, size);
        break;
      case 5: // rotring
        brush.set("rotring", "#000", random(0.1, 0.5));
        brush.circle(x, y, size);
        break;
      case 6: // spray
        brush.set("spray", "#cc3333", random(0.1, 0.3));
        brush.circle(x, y, size);
        break;
      case 7: // marker
        brush.set("marker", "#ff0000", random(0.5, 1.5));
        brush.circle(x, y, size);
        break;
      case 8: // charcoal
        brush.set("charcoal", "#222", random(0.3, 1.0));
        brush.circle(x, y, size);
        break;
      case 9: // pastel
        brush.set("pastel", "#dda0dd", random(0.4, 0.8));
        brush.circle(x, y, size);
        break;
      case 10: // crayon
        brush.set("crayon", "#008080", random(0.6, 1.2));
        brush.circle(x, y, size);
        break;
    }
  }

  noLoop();
}