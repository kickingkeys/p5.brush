function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set base spray layer - overlapping circles with soft edges
  brush.set("spray", "#222222", 2.8);
  for (let i = 0; i < 15; i++) {
    let x = random(50, 550);
    let y = random(50, 550);
    let r = random(60, 120);
    brush.circle(x, y, r);
  }

  // Add ghosted hand-drawn marks with wiggle
  brush.field("hand");
  brush.wiggle(2);

  brush.set("HB", "#555", 0.8);
  brush.spline([[100,100,0.5], [200,120,1.0], [300,110,0.7]], 0.4);
  brush.spline([[400,200,0.6], [480,250,1.1], [520,300,0.8]], 0.5);

  // Add drips with charcoal
  brush.set("charcoal", "#333", 1.2);
  brush.spline([[150, 50], [155, 120], [153, 200]], 0.2);
  brush.spline([[320, 60], [322, 140], [318, 260]], 0.2);

  // Add spray drips
  brush.set("spray", "#1a1a88", 1.5);
  for (let i = 0; i < 8; i++) {
    brush.flowLine(random(100, 500), random(80, 120), random(40, 90), 90);
  }

  // Add hand-drawn arrows with rotring
  brush.noField();
  brush.set("rotring", "#0000ff", 0.7);
  // Arrow 1
  brush.line(100, 400, 180, 440);
  brush.spline([[175, 435], [160, 440], [170, 420]], 0.3);
  // Arrow 2
  brush.line(320, 500, 400, 460);
  brush.spline([[395, 462], [390, 475], [410, 470]], 0.3);

  // Add overlapping pastel circles with mass fill
  brush.mass("pastel", "#cc6699", {
    precision: 0.6,
    strength: 0.5,
    gradient: 0.2,
    outline: false
  });
  brush.circle(200, 400, 60);
  brush.noMass();

  brush.mass("pastel", "#6688aa", {
    precision: 0.5,
    strength: 0.6,
    gradient: 0.3,
    outline: false
  });
  brush.circle(260, 380, 50);
  brush.noMass();

  // Add textured patches with cpencil hatch
  brush.hatchStyle("cpencil", "#995544", 0.7);
  brush.hatch(6, 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(400, 300);
  brush.vertex(480, 290);
  brush.vertex(490, 370);
  brush.vertex(410, 380);
  brush.endShape(true);
  brush.noHatch();

  // Add fragmented outlines with pen
  brush.set("pen", "#222222", 1.1);
  brush.spline([[50, 300], [100, 320], [140, 310], [180, 330]], 0.4);
  brush.spline([[220, 480], [260, 500], [300, 490], [340, 510]], 0.5);

  // Add faded marker tags
  brush.set("marker", "#880000", 1.5);
  brush.line(420, 100, 470, 130);
  brush.line(430, 110, 480, 140);

  brush.set("marker", "#006666", 1.3);
  brush.line(500, 200, 540, 180);
  brush.line(510, 210, 550, 190);

  // Add light 2H texture
  brush.set("2H", "#aaaaaa", 0.6);
  for (let i = 0; i < 5; i++) {
    let x = random(10, 590);
    let y = random(10, 590);
    brush.circle(x, y, random(5, 15));
  }

  // Final overlapping spray halo
  brush.set("spray", "#444444", 1.2);
  brush.circle(300, 300, 200);

  noLoop();
}