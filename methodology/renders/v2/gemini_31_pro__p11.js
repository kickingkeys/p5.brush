function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("hand");
  brush.wiggle(1);

  const palette = [
    "#b87a5a", 
    "#7e8a71", 
    "#d1b894", 
    "#6b7c87", 
    "#a89475", 
    "#8f5b4d", 
    "#525e56", 
    "#cc9b5e"  
  ];

  let rects = [];
  
  for (let i = 0; i < 24; i++) {
    let w = floor(random(2, 9)) * 40;
    let h = floor(random(2, 9)) * 40;
    let x = floor(random(1, 13)) * 40 + 20;
    let y = floor(random(1, 13)) * 40 + 20;

    if (x + w > 560) w = 560 - x;
    if (y + h > 560) h = 560 - y;

    if (w > 20 && h > 20) {
      rects.push({ x, y, w, h });
    }
  }

  brush.noFill();

  for (let r of rects) {
    let col1 = random(palette);
    let col2 = random(palette);
    let angle1 = random([0, 45, 90, 135, 15, 75, 105]);
    let angle2 = angle1 + random([45, 90, -45]);

    brush.noStroke();

    brush.hatchStyle("cpencil", col1, random(0.8, 1.4));
    brush.hatch(random(2.5, 5), angle1, { rand: 0.08, continuous: true });
    brush.rect(r.x, r.y, r.w, r.h);

    if (random() > 0.3) {
      brush.hatchStyle("cpencil", col2, random(0.6, 1.1));
      brush.hatch(random(3.5, 6), angle2, { rand: 0.1, continuous: true });
      brush.rect(r.x, r.y, r.w, r.h);
    }

    if (random() > 0.7) {
      brush.hatchStyle("HB", "#4a4a4a", random(0.5, 0.9));
      brush.hatch(random(5, 8), random([30, 60, 120]), { rand: 0.05, continuous: true });
      brush.rect(r.x, r.y, r.w, r.h);
    }
  }

  brush.noHatch();

  for (let r of rects) {
    brush.noHatch();
    brush.noFill();

    brush.set("rotring", "#555", random(0.3, 0.6));
    brush.line(r.x - random(15, 60), r.y, r.x + r.w + random(15, 60), r.y);
    brush.line(r.x, r.y - random(15, 60), r.x, r.y + r.h + random(15, 60));
    brush.line(r.x - random(15, 60), r.y + r.h, r.x + r.w + random(15, 60), r.y + r.h);
    brush.line(r.x + r.w, r.y - random(15, 60), r.x + r.w, r.y + r.h + random(15, 60));

    brush.set("pen", "#2c2c2c", random(0.6, 1.4));
    brush.rect(r.x, r.y, r.w, r.h);
  }

  brush.noField();
  noLoop();
}