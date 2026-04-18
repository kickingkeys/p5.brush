function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Define rectangles
  let rects = [
    { x: 100, y: 50, w: 150, h: 100 },
    { x: -100, y: 150, w: 120, h: 80 },
    { x: 200, y: -50, w: 90, h: 130 },
    { x: -250, y: -100, w: 70, h: 110 },
    { x: 50, y: -200, w: 110, h: 90 }
  ];

  // Charcoal outlines and pastel fills
  for (let rect of rects) {
    brush.set("charcoal", "#333", 0.8);
    brush.rect(rect.x, rect.y, rect.w, rect.h);

    brush.noStroke();
    brush.fill("#a89078", 150);
    brush.mass("pastel", "#a89078", {strength: 0.6, precision: 0.4});
    brush.beginShape();
    brush.vertex(rect.x, rect.y);
    brush.vertex(rect.x + rect.w, rect.y);
    brush.vertex(rect.x + rect.w, rect.y + rect.h);
    brush.vertex(rect.x, rect.y + rect.h);
    brush.endShape(CLOSE);
    brush.noMass();
  }

  // HB pencil hatching for shading
  brush.set("HB", "#444", 0.6);
  brush.hatch(3, 45, {rand: 0.05, continuous: true});
  brush.beginShape();
  brush.vertex(100, 50);
  brush.vertex(250, 50);
  brush.vertex(250, 150);
  brush.vertex(100, 150);
  brush.endShape(CLOSE);
  brush.noHatch();

  // Rotring pen details
  brush.set("rotring", "#222", 0.4);
  brush.line(50, 200, 200, 200);
  brush.line(-150, 100, -50, 100);

  noLoop();
}