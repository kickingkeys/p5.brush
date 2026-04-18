function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Rectangle 1
  brush.set("HB", "#664d34", 1.2);
  brush.rect(50, 50, 150, 200);

  // Rectangle 2
  brush.set("2B", "#4a3b2a", 1.5);
  brush.rect(-50, 150, 200, 100);

  // Rectangle 3
  brush.set("cpencil", "#b8860b", 0.8);
  brush.rect(100, -50, 100, 150);

  // Hatching on Rectangle 1
  brush.hatchStyle("rotring", "#333", 0.5);
  brush.hatch(5, 45, {rand: 0.1});
  brush.beginShape();
  brush.rect(50, 50, 150, 200);
  brush.endShape();
  brush.noHatch();

  // Hatching on Rectangle 2
  brush.hatchStyle("2H", "#555", 0.4);
  brush.hatch(4, 135, {rand: 0.05});
  brush.beginShape();
  brush.rect(-50, 150, 200, 100);
  brush.endShape();
  brush.noHatch();

  // Fill and Texture on Rectangle 3
  brush.fill("#d4a017", 150);
  brush.fillTexture(0.7, 0.4);
  brush.beginShape();
  brush.rect(100, -50, 100, 150);
  brush.endShape();
  brush.noFill();

  // Charcoal outline
  brush.set("charcoal", "#222", 0.7);
  brush.beginShape();
  brush.rect(50, 50, 150, 200);
  brush.endShape();

  brush.beginShape();
  brush.rect(-50, 150, 200, 100);
  brush.endShape();

  brush.beginShape();
  brush.rect(100, -50, 100, 150);
  brush.endShape();

  noLoop();
}