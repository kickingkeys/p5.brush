function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdf8f0");
  translate(-width/2, -height/2);

  brush.field("curved");
  brush.wiggle(1);

  // Large background blooms
  brush.fillTexture(0.7, 0.4);
  brush.wash("#d4a017", 160);
  brush.fill("#b8860b", 190);
  brush.fillBleed(0.6, "out");
  brush.noStroke();
  brush.circle(300, 300, 200, 0.7);
  brush.noWash();

  brush.fillTexture(0.8, 0.5);
  brush.wash("#e9967a", 150);
  brush.fill("#cd5c5c", 180);
  brush.fillBleed(0.5, "out");
  brush.circle(400, 200, 160, 0.6);

  brush.fillTexture(0.75, 0.45);
  brush.wash("#f4a460", 170);
  brush.fill("#daa520", 200);
  brush.fillBleed(0.4, "out");
  brush.circle(200, 250, 180, 0.8);

  // Medium overlapping blooms
  brush.fillTexture(0.7, 0.4);
  brush.wash("#ffccbb", 155);
  brush.fill("#ff9988", 185);
  brush.fillBleed(0.35, "out");
  brush.circle(320, 320, 120, 0.5);

  brush.fillTexture(0.8, 0.5);
  brush.wash("#deb887", 165);
  brush.fill("#d2b48c", 195);
  brush.fillBleed(0.45, "out");
  brush.circle(380, 350, 140, 0.6);

  // Smaller blooms and details
  brush.fillTexture(0.65, 0.4);
  brush.wash("#ffdead", 170);
  brush.fill("#ffebcd", 200);
  brush.fillBleed(0.3, "out");
  brush.circle(260, 180, 100, 0.4);

  brush.fillTexture(0.75, 0.5);
  brush.wash("#d2691e", 160);
  brush.fill("#8b4513", 180);
  brush.fillBleed(0.4, "in");
  brush.circle(450, 300, 90, 0.5);

  // Subtle contour lines with colored pencil
  brush.set("cpencil", "#8b4513", 0.6);
  brush.spline([[450,300], [480,330], [470,370]], 0.3);

  brush.set("cpencil", "#cd5c5c", 0.5);
  brush.spline([[320,320], [350,290], [370,310]], 0.4);

  // Soft directional strokes with pastel
  brush.set("pastel", "#e9967a", 0.8);
  brush.spline([[200,250], [230,280], [260,270]], 0.3);

  brush.set("pastel", "#f4a460", 0.7);
  brush.spline([[380,350], [410,380], [430,360]], 0.3);

  brush.noField();
  noLoop();
}