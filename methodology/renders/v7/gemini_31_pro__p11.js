const palette = [
  "#a36244", 
  "#b88849", 
  "#576b53", 
  "#4d5b6b", 
  "#8a8070", 
  "#3a3b34", 
  "#c45a49", 
  "#73857e"  
];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.noFill();
  brush.noWash();
  brush.noStroke();

  brush.hatchStyle("2H", "#999", 0.5);
  brush.hatch(12, 45, { rand: 0.1, continuous: true });
  brush.beginShape(0.1);
  brush.vertex(20, 20);
  brush.vertex(580, 25);
  brush.vertex(575, 580);
  brush.vertex(25, 575);
  brush.endShape(CLOSE);
  brush.noHatch();

  let regions = [
    { x: 40, y: 40, w: 260, h: 190 },
    { x: 280, y: 50, w: 270, h: 240 },
    { x: 50, y: 210, w: 190, h: 320 },
    { x: 220, y: 260, w: 330, h: 160 },
    { x: 200, y: 390, w: 210, h: 170 },
    { x: 390, y: 370, w: 160, h: 190 },
    { x: 130, y: 160, w: 150, h: 130 },
    { x: 420, y: 190, w: 110, h: 150 },
    { x: 60, y: 460, w: 480, h: 90 }
  ];

  for (let r of regions) {
    let c1 = random(palette);
    let c2 = random(palette);
    while (c2 === c1) c2 = random(palette);

    let pts = [
      [r.x + random(-15, 15), r.y + random(-15, 15)],
      [r.x + r.w + random(-15, 15), r.y + random(-15, 15)],
      [r.x + r.w + random(-15, 15), r.y + r.h + random(-15, 15)],
      [r.x + random(-15, 15), r.y + r.h + random(-15, 15)]
    ];

    brush.hatchStyle("cpencil", c1, random(0.7, 1.0));
    brush.hatch(random(3.5, 5.5), random(10, 40), { rand: 0.05, continuous: true });
    brush.beginShape(0.2);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(CLOSE);
    brush.noHatch();

    brush.hatchStyle("cpencil", c2, random(0.6, 0.9));
    brush.hatch(random(4.0, 6.0), random(70, 110), { rand: 0.05, continuous: true });
    brush.beginShape(0.2);
    for (let p of pts) brush.vertex(p[0], p[1]);
    brush.endShape(CLOSE);
    brush.noHatch();

    if (random() > 0.4) {
      let c3 = random(palette);
      while (c3 === c1 || c3 === c2) c3 = random(palette);
      
      brush.hatchStyle("cpencil", c3, random(0.5, 0.8));
      brush.hatch(random(5.0, 8.0), random(130, 170), { rand: 0.06, continuous: true });
      brush.beginShape(0.2);
      for (let p of pts) brush.vertex(p[0], p[1]);
      brush.endShape(CLOSE);
      brush.noHatch();
    }

    brush.set("pen", random() > 0.5 ? "#2a2a2a" : "#3d3d3d", random(0.7, 1.4));
    brush.beginShape(0.3);
    for (let p of pts) brush.vertex(p[0], p[1], random(0.5, 1.2));
    brush.endShape(CLOSE);
    brush.noStroke();
  }

  brush.set("rotring", "#1a1a1a", 0.7);
  brush.line(160, 20, 150, 580);
  brush.line(440, 30, 455, 560);
  brush.line(30, 240, 570, 255);
  brush.line(40, 420, 560, 410);

  brush.set("HB", "#444", 0.9);
  brush.line(280, 40, 270, 550);
  brush.line(50, 100, 550, 115);
  brush.line(200, 380, 550, 370);

  for (let i = 0; i < 6; i++) {
    brush.set("2B", "#222", random(0.8, 1.5));
    let x = random(50, 550);
    let y = random(50, 550);
    brush.line(x, y, x + random(-30, 30), y + random(-30, 30));
  }

  noLoop();
}