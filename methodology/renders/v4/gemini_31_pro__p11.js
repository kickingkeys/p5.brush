function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.wiggle(1);
  brush.noFill();
  brush.noStroke();

  const palettes = [
    ["#7b8c9c", "#5c6c7c", "#3e4c5c"],
    ["#dca754", "#c99136", "#a67325"],
    ["#b86d52", "#9c543d", "#7a3e2a"],
    ["#8f9a78", "#727d5d", "#566044"],
    ["#e6d5b8", "#cbb897", "#a89678"],
    ["#fffaf3", "#e8e3dc", "#d1ccc5"]
  ];

  const blocks = [
    [40, 40, 320, 140, 2],
    [370, 40, 190, 140, 1],
    [40, 190, 100, 370, 3],
    [150, 190, 410, 260, 0],
    [150, 460, 240, 100, 4],
    [400, 460, 160, 100, 1],
    [100, 100, 180, 180, 4],
    [300, 120, 120, 200, 3],
    [200, 350, 150, 150, 2],
    [60, 250, 140, 80, 5]
  ];

  for (let b of blocks) {
    let x = b[0], y = b[1], w = b[2], h = b[3], cIdx = b[4];
    let cols = palettes[cIdx];
    let baseAngle = random(0, 45);

    if (cIdx === 5) {
      brush.hatchStyle("2H", cols[1], 0.5);
      brush.hatch(10, baseAngle, { rand: 0.1, continuous: true });
      brush.rect(x, y, w, h);
      brush.noHatch();
    } else {
      brush.hatchStyle("cpencil", cols[0], 0.9);
      brush.hatch(random(3.5, 4.5), baseAngle, { rand: 0.05 });
      brush.rect(x, y, w, h);
      brush.noHatch();

      brush.hatchStyle("cpencil", cols[1], 0.7);
      brush.hatch(random(4.5, 5.5), baseAngle + random(40, 50), { rand: 0.05 });
      brush.rect(x, y, w, h);
      brush.noHatch();

      brush.hatchStyle("cpencil", cols[2], 0.6);
      brush.hatch(random(6, 8), baseAngle + random(85, 95), { rand: 0.08 });
      brush.rect(x, y, w, h);
      brush.noHatch();
    }

    brush.set("pen", "#2a2a2a", random(0.6, 1.0));
    brush.rect(x, y, w, h);
    brush.noStroke();
  }

  brush.set("pen", "#1a1a1a", 1.3);
  brush.line(40, 190, 560, 190);
  brush.line(150, 40, 150, 560);
  brush.line(40, 460, 560, 460);
  brush.line(370, 40, 370, 460);

  brush.set("2H", "#555", 0.6);
  brush.line(40, 40, 220, 220);
  brush.line(560, 40, 370, 190);
  brush.line(150, 460, 40, 560);
  
  brush.set("rotring", "#333", 0.4);
  for (let i = 0; i < 5; i++) {
    let lx = random(150, 560);
    brush.line(lx, 190, lx, 450);
  }

  noLoop();
}