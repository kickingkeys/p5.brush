function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set up colored pencil layers with unexpected hues
  // Building the portrait from background to foreground with memory-like imperfections

  // Light base tones with 2H cpencil in pale pink and blue
  brush.hatchStyle("2H", "#d4a6c8", 0.7);
  brush.hatch(8, 15, { rand: 0.08 });
  brush.beginShape(0.3);
  brush.vertex(200, 180);
  brush.vertex(400, 180);
  brush.vertex(420, 300);
  brush.vertex(400, 420);
  brush.vertex(200, 420);
  brush.vertex(180, 300);
  brush.endShape(true);
  brush.noHatch();

  // Mid tones with cpencil in soft green and orange cross-hatching
  brush.hatchStyle("cpencil", "#b8cc52", 0.9);
  brush.hatch(6, 60, { rand: 0.1 });
  brush.beginShape(0.2);
  brush.vertex(220, 200);
  brush.vertex(380, 200);
  brush.vertex(400, 300);
  brush.vertex(380, 400);
  brush.vertex(220, 400);
  brush.vertex(200, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#e6af2e", 0.8);
  brush.hatch(5, 105, { rand: 0.12 });
  brush.beginShape(0.2);
  brush.vertex(220, 200);
  brush.vertex(380, 200);
  brush.vertex(400, 300);
  brush.vertex(380, 400);
  brush.vertex(220, 400);
  brush.vertex(200, 300);
  brush.endShape(true);
  brush.noHatch();

  // Structural details with pen in deep purple and blue
  brush.set("pen", "#58334e", 1.2);
  let eyePoints = [[250, 260], [255, 265], [250, 270], [245, 265]];
  brush.spline(eyePoints, 0.4);
  brush.spline([[250, 260], [248, 258], [246, 259], [245, 261]], 0.3);

  brush.set("pen", "#3a506b", 1.2);
  let otherEyePoints = [[350, 260], [355, 265], [350, 270], [345, 265]];
  brush.spline(otherEyePoints, 0.4);
  brush.spline([[350, 260], [348, 258], [346, 259], [345, 261]], 0.3);

  // Mouth with rotring in faded red, slightly blurred
  brush.set("rotring", "#d1495b", 1.1);
  brush.spline([[290, 330], [300, 340], [320, 340], [330, 330]], 0.5);

  // Cheek and brow accents with pastel in warm coral
  brush.hatchStyle("pastel", "#e3644b", 1.0);
  brush.hatch(4, 30, { rand: 0.15 });
  brush.beginShape(0.4);
  brush.vertex(230, 240);
  brush.vertex(270, 240);
  brush.vertex(280, 260);
  brush.vertex(270, 280);
  brush.vertex(230, 280);
  brush.vertex(220, 260);
  brush.endShape(true);
  brush.noHatch();

  // Memory-like fading strokes with spray in translucent colors
  brush.set("spray", "#70c1b3", 1.8);
  for (let i = 0; i < 15; i++) {
    let x = random(250, 350);
    let y = random(200, 250);
    brush.flowLine(x, y, random(10, 25), random(360));
  }

  brush.set("spray", "#a0a8b8", 1.5);
  for (let i = 0; i < 12; i++) {
    let x = random(280, 320);
    let y = random(300, 350);
    brush.flowLine(x, y, random(8, 20), random(360));
  }

  // Final contour and hair with charcoal for soft depth
  brush.set("charcoal", "#2f2a26", 1.0);
  brush.spline([[300, 150], [340, 180], [360, 220], [370, 280], [360, 340], [350, 400], [330, 440]], 0.5);
  brush.spline([[300, 150], [260, 180], [240, 220], [230, 280], [240, 340], [250, 400], [270, 440]], 0.5);

  // Slight imperfections and texture with 2B and HB
  brush.set("2B", "#4a4a4a", 0.6);
  brush.line(250, 250, 252, 252);
  brush.line(350, 250, 348, 252);

  brush.set("HB", "#6b6b6b", 0.5);
  brush.line(300, 300, 305, 305);

  noLoop();
}