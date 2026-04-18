function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("waves");

  brush.noFill();
  for (let i = 0; i < 18; i++) {
    brush.set("spray", "#2a2522", random(2, 6));
    let ox = random(-90, -10);
    let oy = random(10, 90);
    brush.spline([
      [350 + ox, 320 + oy],
      [250 + ox, 380 + oy],
      [130 + ox, 430 + oy]
    ], 0.5);

    brush.set("charcoal", "#111", random(0.5, 2));
    brush.line(380 + ox, 240 + oy, 280 + ox, 360 + oy);
  }

  brush.noStroke();
  brush.fill("#3a3530", 12);
  brush.fillBleed(0.8, "out");
  brush.circle(260, 390, 65, true);
  brush.circle(180, 440, 55, true);
  brush.circle(310, 310, 75, true);
  brush.circle(350, 230, 45, true);

  brush.noFill();
  for (let i = 0; i < 6; i++) {
    brush.set("2B", "#4a403a", random(0.5, 1.2));
    let rx = () => random(-6, 6);
    let ry = () => random(-6, 6);

    brush.spline([
      [400 + rx(), 200 + ry()],
      [380 + rx(), 240 + ry()],
      [350 + rx(), 320 + ry()]
    ], 0.3);

    brush.spline([
      [350 + rx(), 320 + ry()],
      [420 + rx(), 310 + ry()],
      [520 + rx(), 330 + ry()]
    ], 0.2);

    brush.spline([
      [350 + rx(), 320 + ry()],
      [250 + rx(), 350 + ry()],
      [130 + rx(), 400 + ry()]
    ], 0.2);

    brush.spline([
      [380 + rx(), 240 + ry()],
      [440 + rx(), 180 + ry()],
      [500 + rx(), 130 + ry()]
    ], 0.2);

    brush.spline([
      [380 + rx(), 240 + ry()],
      [310 + rx(), 250 + ry()],
      [240 + rx(), 220 + ry()]
    ], 0.2);
  }

  brush.set("charcoal", "#1a1512", 1.8);

  brush.circle(400, 190, 15, true);
  brush.circle(402, 188, 14, true);

  brush.spline([[400, 205], [380, 240], [350, 320]], 0.4);
  brush.spline([[395, 205], [375, 240], [345, 320]], 0.4);

  brush.spline([[405, 200], [390, 245], [360, 315]], 0.5);

  brush.spline([[350, 320], [430, 315], [525, 340]], 0.3);
  brush.spline([[355, 325], [425, 325], [515, 345]], 0.3);

  brush.spline([[350, 320], [260, 345], [140, 410]], 0.3);
  brush.spline([[340, 315], [250, 335], [130, 395]], 0.3);

  brush.spline([[380, 240], [445, 175], [510, 120]], 0.2);

  brush.spline([[380, 240], [305, 255], [230, 230]], 0.2);

  brush.set("charcoal", "#0a0807", 2.5);
  brush.line(350, 320, 380, 240);
  brush.line(380, 240, 415, 205);
  brush.line(350, 320, 400, 318);
  brush.line(350, 320, 290, 335);

  brush.hatch(5, 45, { rand: 0.3, continuous: false });
  brush.hatchStyle("charcoal", "#2a2522", 1);
  brush.noStroke();
  brush.beginShape(0.3);
  brush.vertex(380, 240);
  brush.vertex(350, 320);
  brush.vertex(335, 310);
  brush.vertex(365, 235);
  brush.endShape(true);

  brush.noHatch();
  brush.noFill();
  brush.set("spray", "#1a1512", 2);
  for (let i = 0; i < 12; i++) {
    brush.line(
      random(80, 280), random(380, 520),
      random(180, 360), random(260, 420)
    );
  }

  noLoop();
}