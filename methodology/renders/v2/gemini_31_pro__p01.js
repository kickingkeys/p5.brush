function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const palettes = [
    { wash: "#d49a9a", fill: "#c47c7c", inner: "#a85c5c" },
    { wash: "#e8c382", fill: "#d6a858", inner: "#b88635" },
    { wash: "#c79b8f", fill: "#ab7769", inner: "#8c5647" },
    { wash: "#e3b1b1", fill: "#d18c8c", inner: "#b36262" },
    { wash: "#d6a378", fill: "#c28755", inner: "#9e673a" }
  ];

  randomSeed(12345);
  noiseSeed(12345);

  brush.field("curved");

  for (let i = 0; i < 18; i++) {
    let cx = random(50, 550);
    let cy = random(50, 550);
    let baseR = random(40, 140);
    let pal = random(palettes);

    let pts = [];
    let noiseOffset = random(1000);
    for (let a = 0; a < TWO_PI; a += TWO_PI / 36) {
      let r = baseR + noise(cos(a) * 0.8 + noiseOffset, sin(a) * 0.8 + noiseOffset) * 45;
      pts.push([cx + cos(a) * r, cy + sin(a) * r]);
    }

    brush.fillTexture(0.85, 0.4);
    brush.wash(pal.wash, 150);
    brush.fill(pal.fill, 170);
    brush.fillBleed(0.35, "out");
    brush.noStroke();
    
    brush.beginShape(0.5);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(CLOSE);
    brush.noWash();

    brush.fill(pal.inner, 80);
    brush.fillBleed(0.45, "in");
    brush.beginShape(0.5);
    for (let p of pts) {
      brush.vertex(lerp(cx, p[0], 0.75), lerp(cy, p[1], 0.75));
    }
    brush.endShape(CLOSE);
    brush.noFill();

    if (random() > 0.5) {
      brush.set("cpencil", pal.inner, 0.5);
      let sliceStart = floor(random(0, 10));
      let sliceEnd = sliceStart + floor(random(8, 16));
      brush.spline(pts.slice(sliceStart, sliceEnd), 0.4);
    }
    brush.noStroke();
  }

  brush.set("spray", "#a85c5c", 0.6);
  for (let i = 0; i < 80; i++) {
    brush.flowLine(random(600), random(600), random(4, 12), random(TWO_PI));
  }

  brush.set("spray", "#c28755", 0.4);
  for (let i = 0; i < 60; i++) {
    brush.flowLine(random(600), random(600), random(3, 8), random(TWO_PI));
  }

  brush.noField();
  brush.noStroke();
  
  noLoop();
}