function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set up for graphite drawing
  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noField();

  // Outer grass stems - light 2H
  brush.set("2H", "#666", 0.6);
  for (let i = 0; i < 8; i++) {
    const x = 100 + i * 60;
    const y1 = 150 + random(-20, 20);
    const y2 = 450 + random(-20, 20);
    brush.line(x, y1, x + random(20, 40), y2);
  }

  // Mid-tone stems - HB
  brush.set("HB", "#444", 0.8);
  for (let i = 0; i < 6; i++) {
    const x = 120 + i * 70;
    const y1 = 130 + random(-15, 15);
    const y2 = 430 + random(-15, 15);
    brush.line(x, y1, x + random(30, 50), y2);
  }

  // Darker stems and seed heads - 2B
  brush.set("2B", "#222", 1.2);
  for (let i = 0; i < 4; i++) {
    const x = 140 + i * 100;
    const y1 = 120 + random(-10, 10);
    const y2 = 400 + random(-10, 10);
    brush.line(x, y1, x + random(40, 60), y2);
    
    // Seed heads as small clusters
    for (let j = 0; j < 5; j++) {
      const angle = random(TWO_PI);
      const length = random(8, 15);
      brush.line(
        x + random(40, 60) + cos(angle) * 3,
        y2 + sin(angle) * 3,
        x + random(40, 60) + cos(angle) * (3 + length),
        y2 + sin(angle) * (3 + length)
      );
    }
  }

  // Hatching for depth and shadow zones
  // Light shadow zones with 2H cross hatching
  brush.hatchStyle("2H", "#666", 0.5);
  brush.hatch(8, 45, { rand: 0.08, continuous: true });
  brush.hatch(9, 135, { rand: 0.08, continuous: true });
  let points = [];
  for (let i = 0; i < 20; i++) {
    const a = map(i, 0, 19, 0, PI);
    const r = 200 + noise(i * 0.1) * 30;
    points.push([300 + cos(a) * r, 400 + sin(a) * r]);
  }
  brush.polygon(points);
  brush.noHatch();

  // Mid-tone shadow zones with HB
  brush.hatchStyle("HB", "#444", 0.7);
  brush.hatch(5, 50, { rand: 0.1, continuous: true });
  brush.hatch(6, 140, { rand: 0.1, continuous: true });
  points = [];
  for (let i = 0; i < 15; i++) {
    const a = map(i, 0, 14, 0, PI);
    const r = 180 + noise(i * 0.1 + 100) * 20;
    points.push([320 + cos(a) * r, 410 + sin(a) * r]);
  }
  brush.polygon(points);
  brush.noHatch();

  // Detail lines and unfinished edges
  brush.set("pen", "#333", 0.4);
  for (let i = 0; i < 12; i++) {
    const x = 110 + i * 40;
    const y = 160 + random(-10, 10);
    const len = random(20, 80);
    brush.line(x, y, x + len, y + random(5, 15));
  }

  // Some grass blades with pressure variation
  brush.set("HB", "#444", 1);
  const bladePts = [
    [[200, 300, 0.3], [210, 280, 0.6], [215, 250, 1.0]],
    [[250, 320, 0.3], [260, 300, 0.6], [265, 270, 1.0]],
    [[300, 310, 0.3], [310, 290, 0.6], [315, 260, 1.0]],
    [[350, 330, 0.3], [360, 310, 0.6], [365, 280, 1.0]]
  ];
  for (const pts of bladePts) {
    brush.spline(pts, 0.4);
  }

  brush.noStroke();
  noLoop();
}