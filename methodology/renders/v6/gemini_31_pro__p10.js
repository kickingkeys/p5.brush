function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noFill();
  brush.noHatch();
  brush.set("pen", "#222222", 0.6);
  brush.line(0, 300, 600, 300);

  brush.noStroke();
  brush.fillTexture(0.7, 0.4);

  const sandLayers = [
    { w: "#e6cba8", f: "#d4a373", startY: 310, amp: 15 },
    { w: "#dcb08a", f: "#c88b5c", startY: 380, amp: 25 },
    { w: "#cfa07a", f: "#b97a48", startY: 460, amp: 40 }
  ];

  for (let i = 0; i < sandLayers.length; i++) {
    brush.wash(sandLayers[i].w, 140);
    brush.fill(sandLayers[i].f, 170);
    brush.fillBleed(0.3, "out");
    brush.beginShape(0.4);
    brush.vertex(0, 600);
    brush.vertex(0, sandLayers[i].startY);
    
    for (let x = 0; x <= 600; x += 30) {
      let y = sandLayers[i].startY + noise(x * 0.008, i * 10) * sandLayers[i].amp;
      brush.vertex(x, y);
    }
    
    brush.vertex(600, sandLayers[i].startY);
    brush.vertex(600, 600);
    brush.endShape(CLOSE);
  }
  
  brush.noWash();
  brush.noFill();

  brush.field("hand");
  brush.wiggle(3);
  brush.noStroke();

  brush.mass("pastel", "#4a4a4a", { strength: 0.6, precision: 0.4, outline: false });
  brush.hatchStyle("charcoal", "#333333", 0.9);
  brush.hatch(5, 55, { rand: 0.15 });
  brush.beginShape(0);
  brush.vertex(380, 300);
  brush.vertex(405, 230);
  brush.vertex(430, 250);
  brush.vertex(460, 190);
  brush.vertex(490, 260);
  brush.vertex(530, 300);
  brush.endShape(CLOSE);
  brush.noMass();
  brush.noHatch();

  brush.mass("crayon", "#1a1a1a", { strength: 0.85, precision: 0.2, outline: true });
  brush.hatchStyle("charcoal", "#0a0a0a", 1.5);
  brush.hatch(3, 110, { rand: 0.2 });
  brush.beginShape(0);
  brush.vertex(40, 320);
  brush.vertex(70, 210);
  brush.vertex(110, 140);
  brush.vertex(140, 180);
  brush.vertex(170, 110);
  brush.vertex(210, 190);
  brush.vertex(250, 260);
  brush.vertex(300, 320);
  brush.endShape(CLOSE);
  brush.noMass();
  brush.noHatch();
  brush.noField();

  brush.set("cpencil", "#9c6a43", 0.5);
  for (let i = 0; i < 25; i++) {
    let px = random(20, 580);
    let py = random(320, 580);
    brush.line(px, py, px + random(20, 80), py + random(-3, 3));
  }

  brush.set("rotring", "#3a251a", 0.8);
  drawCrack(300, 600, -90, 120, 4);
  drawCrack(480, 600, -105, 90, 3);
  drawCrack(120, 600, -75, 100, 3);

  noLoop();
}

function drawCrack(x, y, angle, len, depth) {
  if (depth === 0) return;
  
  let pts = [];
  pts.push([x, y, 1.2]);
  
  let cx = x;
  let cy = y;
  let segments = floor(random(4, 7));
  let segLen = len / segments;
  
  for (let i = 1; i <= segments; i++) {
    let a = angle + random(-30, 30);
    cx += cos(a) * segLen;
    cy += sin(a) * segLen;
    let pressure = map(i, 0, segments, 1.2, 0.2);
    pts.push([cx, cy, pressure]);
    
    if (random() < 0.45 && depth > 1) {
      drawCrack(cx, cy, angle + random(-50, 50), len * 0.6, depth - 1);
    }
  }
  
  brush.spline(pts, 0.1);
}