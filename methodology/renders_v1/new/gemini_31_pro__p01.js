function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  const palettes = [
    { wash: "#e8b4b8", fill: "#c88284", inner: "#9e5b5e" },
    { wash: "#f4d8cd", fill: "#dca29d", inner: "#b5736f" },
    { wash: "#f2d7b4", fill: "#dfb15b", inner: "#b8860b" },
    { wash: "#eadd8c", fill: "#d4a017", inner: "#a67c00" },
    { wash: "#e6cabb", fill: "#c6934b", inner: "#8f6024" }
  ];

  randomSeed(8472);
  noiseSeed(8472);

  brush.field("curved");
  for (let i = 0; i < 3; i++) {
    brush.set("spray", palettes[i].fill, 2.5);
    for (let j = 0; j < 60; j++) {
      brush.flowLine(random(width), random(height), random(15, 40), random(360));
    }
  }
  brush.noField();

  for (let b = 0; b < 45; b++) {
    let cx = random(-50, width + 50);
    let cy = random(-50, height + 50);
    let r = random(30, 140);
    let pal = random(palettes);
    let nx = random(1000);
    let ny = random(1000);

    let pts = [];
    for (let a = 0; a < 360; a += 12) {
      let n = noise(cos(a) * 0.6 + nx, sin(a) * 0.6 + ny);
      let rad = r + (n - 0.5) * r * 0.45;
      pts.push([cx + cos(a) * rad, cy + sin(a) * rad]);
    }

    brush.noStroke();
    brush.fillTexture(0.85, 0.45);
    brush.wash(pal.wash, 160);
    brush.fill(pal.fill, 180);
    brush.fillBleed(0.35, "out");
    brush.beginShape(0.5);
    for (let p of pts) {
      brush.vertex(p[0], p[1]);
    }
    brush.endShape(CLOSE);
    brush.noWash();

    brush.fill(pal.inner, 90);
    brush.fillBleed(0.45, "in");
    brush.beginShape(0.5);
    for (let p of pts) {
      brush.vertex(lerp(cx, p[0], 0.8), lerp(cy, p[1], 0.8));
    }
    brush.endShape(CLOSE);
    brush.noFill();

    if (random() > 0.5) {
      brush.set("cpencil", pal.inner, 0.6);
      let sliceLen = floor(random(8, 16));
      let startIdx = floor(random(pts.length - sliceLen));
      brush.spline(pts.slice(startIdx, startIdx + sliceLen), 0.45);
    }
  }

  noLoop();
}