function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  let rectCount = 10;
  let spacing = 80;

  for (let i = 0; i < rectCount; i++) {
    let x = random(-200, 200);
    let y = random(-200, 200);
    let w = random(50, 150);
    let h = random(50, 150);

    let rotation = random(0, 90);

    push();
    translate(x, y);
    rotate(rotation);

    // Charcoal outline
    brush.set("charcoal", "#333", 1.2);
    brush.noFill();
    brush.rect(0, 0, w, h);

    // Pastel fill with hatching
    brush.fill("#c8a290", 80);
    brush.hatchStyle("2H", "#b08d7b", 0.7);
    brush.hatch(4, 45);
    brush.rect(0, 0, w, h);
    brush.noHatch();

    // Crayon details
    brush.set("crayon", "#a37d63", 0.6);
    brush.beginShape();
    brush.vertex(-w/2, -h/2);
    brush.vertex(w/2, -h/2);
    brush.vertex(w/2, h/2);
    brush.vertex(-w/2, h/2);
    brush.endShape(CLOSE);
    brush.noStroke();

    pop();
  }

  noLoop();
}