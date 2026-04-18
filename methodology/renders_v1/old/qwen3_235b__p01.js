function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.set("pastel", "#d4a5a5", 1);
  brush.noStroke();
  brush.fill("#d4a5a5", 140);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.7, 0.5);
  brush.circle(200, 200, 80);

  brush.set("pastel", "#e8c8a8", 1);
  brush.fill("#e8c8a8", 130);
  brush.fillBleed(0.25, "out");
  brush.fillTexture(0.6, 0.4);
  brush.circle(280, 210, 90);

  brush.set("pastel", "#d4a5a5", 1);
  brush.fill("#d4a5a5", 120);
  brush.fillBleed(0.2, "out");
  brush.fillTexture(0.65, 0.45);
  brush.circle(240, 280, 100);

  brush.set("pastel", "#e8c8a8", 1);
  brush.fill("#e8c8a8", 110);
  brush.fillBleed(0.3, "out");
  brush.fillTexture(0.7, 0.5);
  brush.circle(320, 310, 85);

  brush.set("crayon", "#d4a5a5", 1.2);
  brush.strokeWeight(1.5);
  brush.circle(200, 200, 80);

  brush.set("crayon", "#e8c8a8", 1.2);
  brush.strokeWeight(1.4);
  brush.circle(280, 210, 90);

  brush.set("pastel", "#d4a5a5", 1);
  brush.fill("#d4a5a5", 90);
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.8, 0.6);
  brush.circle(380, 180, 60);

  brush.set("pastel", "#e8c8a8", 1);
  brush.fill("#e8c8a8", 85);
  brush.fillBleed(0.35, "out");
  brush.fillTexture(0.75, 0.55);
  brush.circle(160, 350, 70);

  brush.set("crayon", "#d4a5a5", 1.2);
  brush.strokeWeight(1.3);
  brush.circle(380, 180, 60);

  brush.set("crayon", "#e8c8a8", 1.2);
  brush.strokeWeight(1.2);
  brush.circle(160, 350, 70);

  noLoop();
}