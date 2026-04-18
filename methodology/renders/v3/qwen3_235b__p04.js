function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  brush.wiggle(1.5);
  
  // Face outline with memory-like imperfection
  brush.set("cpencil", "#8B4513", 0.8);
  brush.hatch(8, random(30, 50), { rand: 0.1 });
  let facePts = [];
  for (let i = 0; i < 40; i++) {
    const a = map(i, 0, 40, 0, TWO_PI);
    const r = 140 + noise(i * 0.1, frameCount * 0.001) * 30;
    const x = 300 + cos(a) * r;
    const y = 300 + sin(a) * r;
    facePts.push([x, y]);
  }
  brush.spline(facePts, 0.4);
  brush.noHatch();
  
  // Eyes - asymmetrical, suggestion only
  brush.set("cpencil", "#2F4F4F", 0.6);
  brush.spline([[270, 260, 0.5], [275, 262, 0.3], [278, 261, 0.5]], 0.3);
  brush.spline([[340, 255, 0.4], [342, 258, 0.6]], 0.2);
  
  // Nose - implied by strokes
  brush.set("cpencil", "#8B5A2B", 0.5);
  brush.spline([[300, 280], [305, 310]], 0.3);
  
  // Mouth - fragmented, fading
  brush.set("cpencil", "#CD5C5C", 0.7);
  brush.spline([[280, 350], [300, 355], [320, 353]], 0.2);
  
  // Cheek color - layered strokes
  brush.hatchStyle("cpencil", "#D2691E", 0.6);
  brush.hatch(6, 40, { rand: 0.15 });
  brush.beginShape(0.4);
  for (let i = 0; i < 20; i++) {
    const a = map(i, 0, 20, -PI/3, PI/3);
    const r = 60 + random(-10, 10);
    const x = 280 + cos(a) * r;
    const y = 300 + sin(a) * r;
    brush.vertex(x, y);
  }
  brush.endShape(true);
  brush.noHatch();
  
  // Hair - directional strokes in unexpected color
  brush.set("cpencil", "#4682B4", 1.0);
  for (let i = 0; i < 15; i++) {
    const x = 250 + random(-40, 10);
    const y = 220 + random(-20, 20);
    const len = random(60, 100);
    brush.spline([[x, y], [x - 20, y + len]], 0.1);
  }
  
  // Memory fade - sparse 2H strokes
  brush.set("2H", "#A0522D", 0.4);
  for (let i = 0; i < 8; i++) {
    brush.spline([
      [random(200, 400), random(200, 400)], 
      [random(200, 400), random(200, 400)]
    ], 0.2);
  }
  
  // Final suggestion of form with pen
  brush.set("pen", "#556B2F", 0.5);
  brush.spline([[300, 200], [300, 240]], 0.3);
  
  brush.noStroke();
  noLoop();
}