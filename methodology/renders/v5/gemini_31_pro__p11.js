function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  let rawZones = [
    [[40, 40], [180, 40], [190, 320], [50, 310]],
    [[180, 40], [550, 50], [540, 200], [210, 180], [190, 120]],
    [[150, 160], [320, 170], [300, 380], [130, 360]],
    [[300, 200], [540, 200], [560, 530], [280, 550]],
    [[50, 310], [280, 330], [290, 540], [40, 520]],
    [[550, 50], [580, 50], [580, 530], [560, 530]],
    [[40, 20], [550, 20], [550, 40], [40, 40]],
    [[190, 120], [210, 180], [150, 160]]
  ];

  let colorPairs = [
    ["#657b85", "#8c9b9e"],
    ["#e6d39a", "#f0e5c2"],
    ["#c46d5e", "#a65c47"],
    ["#94a37a", "#728059"],
    ["#e8c37b", "#d9a05b"],
    ["#5c7a77", "#8ea6a3"],
    ["#b5847f", "#96625d"],
    ["#c7b375", "#a89452"]
  ];

  let zones = [];
  for (let i = 0; i < rawZones.length; i++) {
    let noisyPts = rawZones[i].map(p => [p[0] + random(-4, 4), p[1] + random(-4, 4)]);
    zones.push({
      pts: noisyPts,
      c1: colorPairs[i][0],
      c2: colorPairs[i][1],
      a1: random(15, 75),
      a2: random(105, 165),
      d1: random(3.5, 5.0),
      d2: random(4.5, 6.0)
    });
  }

  brush.noFill();
  brush.noStroke();

  for (let z of zones) {
    brush.hatchStyle("cpencil", z.c1, 0.9);
    brush.hatch(z.d1, z.a1, { rand: 0.06 });
    brush.beginShape(0.1);
    for (let p of z.pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("cpencil", z.c2, 0.7);
    brush.hatch(z.d2, z.a2, { rand: 0.06 });
    brush.beginShape(0.1);
    for (let p of z.pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
    brush.noHatch();
  }

  brush.hatchStyle("rotring", "#3a3836", 0.5);
  brush.hatch(3, 45, { rand: 0.03, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(180, 40);
  brush.vertex(260, 40);
  brush.vertex(250, 120);
  brush.vertex(190, 120);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#3a3836", 0.6);
  brush.hatch(2.5, 120, { rand: 0.04, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(50, 310);
  brush.vertex(130, 315);
  brush.vertex(120, 380);
  brush.vertex(45, 370);
  brush.endShape(true);
  brush.noHatch();

  brush.noFill();
  brush.noHatch();
  for (let z of zones) {
    brush.set("pen", "#2b2927", random(0.8, 1.4));
    brush.beginShape(0.2);
    for (let p of z.pts) brush.vertex(p[0], p[1]);
    brush.endShape(true);
  }

  brush.set("pen", "#1a1918", 1.6);
  let lines = [
    [180, 20, 190, 560],
    [20, 200, 580, 200],
    [300, 170, 280, 560],
    [20, 310, 300, 330],
    [540, 20, 560, 570]
  ];

  for (let l of lines) {
    brush.line(l[0] + random(-2, 2), l[1] + random(-2, 2), l[2] + random(-2, 2), l[3] + random(-2, 2));
  }

  brush.set("cpencil", "#c46d5e", 1.2);
  brush.line(60, 560, 220, 545);
  brush.set("cpencil", "#e8c37b", 1.0);
  brush.line(510, 60, 550, 280);

  noLoop();
}