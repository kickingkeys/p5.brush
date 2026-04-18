function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noStroke();
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  randomSeed(42);
  noiseSeed(42);

  // soft atmospheric under-wash
  brush.noStroke();
  brush.fillTexture(0.85, 0.45);
  for (let i = 0; i < 7; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    let r = random(90, 170);
    let pts = organicBlob(x, y, r, 28, 0.18);
    brush.wash(random([
      "#d6a07e",
      "#c98d7a",
      "#d8b07a",
      "#c78667",
      "#b97a5f"
    ]), random(50, 80));
    brush.fill(random([
      "#d19a9a",
      "#d7a38d",
      "#c98b8b",
      "#c9a06d",
      "#bf8a73",
      "#b98561"
    ]), random(55, 95));
    brush.fillBleed(random(0.5, 0.7), "out");
    drawBlob(pts, 0.5);
    brush.noWash();
  }

  // main watercolor blooms
  let blooms = [];
  for (let i = 0; i < 16; i++) {
    let x = random(80, 520);
    let y = random(80, 520);
    let r = random(45, 105);
    blooms.push({ x, y, r });
  }

  for (let b of blooms) {
    let baseCol = random([
      "#cf9a96",
      "#d5a28d",
      "#c88b88",
      "#cda476",
      "#b98370",
      "#d7b07d",
      "#c69077"
    ]);

    let warmShadow = random([
      "#b87472",
      "#b6805e",
      "#ad6f67",
      "#b98a58",
      "#a86856"
    ]);

    let pts = organicBlob(b.x, b.y, b.r, int(random(26, 36)), 0.22 + random(0.03));

    brush.noStroke();
    brush.fillTexture(0.9, 0.5);

    // saturated base
    brush.wash(baseCol, random(115, 150));
    brush.fill(baseCol, random(130, 175));
    brush.fillBleed(random(0.28, 0.42), "out");
    drawBlob(pts, 0.52);
    brush.noWash();

    // inner bloom layer
    brush.fill(warmShadow, random(60, 105));
    brush.fillBleed(random(0.3, 0.46), "in");
    drawScaledBlob(pts, b.x, b.y, random(0.68, 0.82), 0.5);

    // subtle offset stain to encourage overlap richness
    let ox = random(-14, 14);
    let oy = random(-14, 14);
    brush.fill(random([
      "#d7a79d",
      "#d3b07a",
      "#c8927b",
      "#c68480",
      "#bb7b66"
    ]), random(45, 85));
    brush.fillBleed(random(0.22, 0.36), "out");
    drawOffsetScaledBlob(pts, b.x, b.y, ox, oy, random(0.78, 0.94), 0.48);

    // granulating center accent
    brush.fill(random([
      "#a86e68",
      "#a97854",
      "#9f6257",
      "#b08263"
    ]), random(22, 48));
    brush.fillBleed(random(0.18, 0.28), "in");
    drawScaledBlob(pts, b.x, b.y, random(0.38, 0.56), 0.45);
  }

  // faint dry pencil contours in a few places
  brush.noFill();
  brush.noWash();
  brush.noHatch();
  brush.wiggle(1.2);
  brush.set("cpencil", "#a77772", 0.45);
  for (let i = 0; i < 8; i++) {
    let b = random(blooms);
    let pts = organicBlob(b.x, b.y, b.r * random(0.72, 1.02), 18, 0.14);
    brush.spline(pts.map(p => [p[0], p[1], random(0.7, 1.1)]), 0.35);
  }
  brush.noField();

  // a few soft spray freckles for watercolor sediment feeling
  brush.set("spray", "#b8816a", 0.35);
  for (let i = 0; i < 140; i++) {
    let b = random(blooms);
    let a = random(360);
    let rr = random(b.r * 0.15, b.r * 0.8);
    let x = b.x + cos(a) * rr;
    let y = b.y + sin(a) * rr;
    brush.line(x, y, x + random(-0.5, 0.5), y + random(-0.5, 0.5));
  }

  noLoop();
}

function organicBlob(cx, cy, r, steps, roughness) {
  let pts = [];
  let seedA = random(1000);
  for (let i = 0; i < steps; i++) {
    let a = map(i, 0, steps, 0, 360);
    let n = noise(seedA + cos(a) * 0.9, seedA + sin(a) * 0.9);
    let rr = r * (1 - roughness + n * roughness * 2.0);
    pts.push([cx + cos(a) * rr, cy + sin(a) * rr]);
  }
  return pts;
}

function drawBlob(pts, curvature) {
  brush.beginShape(curvature);
  for (let p of pts) {
    brush.vertex(p[0], p[1]);
  }
  brush.endShape(true);
}

function drawScaledBlob(pts, cx, cy, sc, curvature) {
  brush.beginShape(curvature);
  for (let p of pts) {
    brush.vertex(lerp(cx, p[0], sc), lerp(cy, p[1], sc));
  }
  brush.endShape(true);
}

function drawOffsetScaledBlob(pts, cx, cy, ox, oy, sc, curvature) {
  brush.beginShape(curvature);
  for (let p of pts) {
    brush.vertex(lerp(cx, p[0], sc) + ox, lerp(cy, p[1], sc) + oy);
  }
  brush.endShape(true);
}