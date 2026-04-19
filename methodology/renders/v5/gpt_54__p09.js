function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(17);
  noiseSeed(17);

  // Soft rainy atmosphere
  brush.noStroke();
  brush.fillTexture(0.6, 0.28);

  // Night sky wash layers
  brush.wash("#1a2340", 120);
  brush.fill("#24345b", 90);
  brush.fillBleed(0.45, "out");
  brush.beginShape(0.5);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 250);
  brush.vertex(470, 235);
  brush.vertex(330, 215);
  brush.vertex(170, 230);
  brush.vertex(0, 245);
  brush.endShape(true);
  brush.noWash();

  brush.fill("#314472", 55);
  brush.fillBleed(0.55, "out");
  for (let i = 0; i < 8; i++) {
    let cx = random(40, 560);
    let cy = random(40, 220);
    let r = random(60, 150);
    brush.circle(cx, cy, r, 0.25);
  }

  // Distant building masses in wet watercolor
  let buildings = [
    { x: 10, w: 90, h: 185, c: "#19233c" },
    { x: 85, w: 75, h: 145, c: "#223050" },
    { x: 148, w: 82, h: 215, c: "#1f2945" },
    { x: 215, w: 62, h: 165, c: "#182034" },
    { x: 266, w: 96, h: 235, c: "#202b47" },
    { x: 350, w: 88, h: 175, c: "#172238" },
    { x: 425, w: 74, h: 205, c: "#202744" },
    { x: 488, w: 98, h: 160, c: "#1b2339" }
  ];

  for (let b of buildings) {
    let top = 300 - b.h;
    brush.wash(b.c, 88);
    brush.fill(b.c, 70);
    brush.fillBleed(0.24, "out");
    brush.beginShape(0.35);
    brush.vertex(b.x, 300);
    brush.vertex(b.x + random(-3, 3), top + random(5, 18));
    brush.vertex(b.x + b.w * 0.28 + random(-4, 4), top + random(-4, 12));
    brush.vertex(b.x + b.w * 0.6 + random(-4, 4), top + random(4, 16));
    brush.vertex(b.x + b.w + random(-3, 3), top + random(6, 20));
    brush.vertex(b.x + b.w, 300);
    brush.endShape(true);
    brush.noWash();
  }

  // Slight lower haze
  brush.fill("#6d87a8", 22);
  brush.fillBleed(0.6, "out");
  for (let i = 0; i < 7; i++) {
    brush.circle(random(60, 540), random(240, 340), random(55, 110), 0.35);
  }

  // Neon marker smears in windows/signs
  brush.wiggle(1);

  function neonRect(x, y, w, h, c1, c2) {
    brush.noStroke();
    brush.wash(c1, 220);
    brush.beginShape(0.22);
    brush.vertex(x, y);
    brush.vertex(x + w, y + random(-2, 2));
    brush.vertex(x + w, y + h);
    brush.vertex(x, y + h + random(-2, 2));
    brush.endShape(true);

    brush.wash(c2, 180);
    brush.beginShape(0.22);
    brush.vertex(x + 3, y + 2);
    brush.vertex(x + w - 4, y + 1);
    brush.vertex(x + w - 2, y + h - 2);
    brush.vertex(x + 2, y + h - 1);
    brush.endShape(true);
    brush.noWash();
  }

  neonRect(58, 168, 28, 66, "#ff3e8e", "#ff9cc4");
  neonRect(176, 132, 22, 78, "#37c9ff", "#a8ecff");
  neonRect(293, 120, 34, 92, "#ffd34f", "#fff0a4");
  neonRect(391, 160, 26, 72, "#ff6b4e", "#ffc1a8");
  neonRect(516, 182, 24, 62, "#6cffc2", "#bafce5");
  neonRect(448, 118, 18, 54, "#d86dff", "#f0b8ff");
  neonRect(110, 145, 16, 48, "#f85d5d", "#ffb1b1");

  // Marker outlines on selected signs
  brush.set("marker", "#2a2030", 0.75);
  brush.rect(58, 168, 28, 66, "corner");
  brush.rect(293, 120, 34, 92, "corner");
  brush.rect(391, 160, 26, 72, "corner");

  // Street and pavement watercolor base
  brush.noStroke();
  brush.fillTexture(0.82, 0.42);
  brush.wash("#3a4460", 140);
  brush.fill("#47546f", 120);
  brush.fillBleed(0.35, "out");
  brush.beginShape(0.45);
  brush.vertex(0, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noWash();

  // Perspective street wedge
  brush.fill("#2c3348", 145);
  brush.fillBleed(0.28, "out");
  brush.beginShape(0.35);
  brush.vertex(248, 300);
  brush.vertex(352, 300);
  brush.vertex(452, 600);
  brush.vertex(148, 600);
  brush.endShape(true);

  // Sidewalk planes
  brush.fill("#5c667a", 78);
  brush.fillBleed(0.22, "out");
  brush.beginShape(0.3);
  brush.vertex(0, 300);
  brush.vertex(248, 300);
  brush.vertex(148, 600);
  brush.vertex(0, 600);
  brush.endShape(true);

  brush.fill("#566074", 62);
  brush.fillBleed(0.22, "out");
  brush.beginShape(0.3);
  brush.vertex(352, 300);
  brush.vertex(600, 300);
  brush.vertex(600, 600);
  brush.vertex(452, 600);
  brush.endShape(true);

  // Reflected neon watercolor bleeds on pavement
  let reflections = [
    { x: 74, y: 352, w: 34, h: 175, c: "#ff4d98" },
    { x: 186, y: 332, w: 24, h: 150, c: "#41cfff" },
    { x: 302, y: 326, w: 44, h: 205, c: "#ffd55a" },
    { x: 402, y: 347, w: 30, h: 158, c: "#ff7456" },
    { x: 522, y: 364, w: 28, h: 145, c: "#77ffd0" },
    { x: 454, y: 314, w: 22, h: 122, c: "#dc82ff" }
  ];

  for (let r of reflections) {
    brush.fill(r.c, 50);
    brush.fillBleed(0.62, "out");
    brush.beginShape(0.5);
    brush.vertex(r.x - r.w * 0.5, r.y);
    brush.vertex(r.x + r.w * 0.5, r.y + random(-4, 4));
    brush.vertex(r.x + r.w * 0.35, r.y + r.h * 0.35);
    brush.vertex(r.x + r.w * 0.8, r.y + r.h);
    brush.vertex(r.x - r.w * 0.6, r.y + r.h + random(-6, 8));
    brush.vertex(r.x - r.w * 0.25, r.y + r.h * 0.35);
    brush.endShape(true);
  }

  // Opaque marker smears inside reflections
  for (let r of reflections) {
    brush.noStroke();
    brush.wash(r.c, 208);
    brush.beginShape(0.18);
    brush.vertex(r.x - r.w * 0.18, r.y + 12);
    brush.vertex(r.x + r.w * 0.16, r.y + 8);
    brush.vertex(r.x + r.w * 0.12, r.y + r.h * 0.75);
    brush.vertex(r.x - r.w * 0.12, r.y + r.h * 0.78);
    brush.endShape(true);
    brush.noWash();
  }

  // Wet streaks and rain drag with spray
  brush.field("seabed");
  let rainCols = ["#b7c4de", "#8ea1c7", "#d7dded"];
  for (let i = 0; i < 180; i++) {
    let x = random(0, 600);
    let y = random(10, 590);
    let len = random(6, 22);
    brush.set("spray", random(rainCols), random(0.18, 0.55));
    brush.flowLine(x, y, len, 100);
  }
  brush.noField();

  // Road sheen horizontal/diagonal drags
  brush.set("spray", "#b9c8db", 0.35);
  for (let i = 0; i < 75; i++) {
    let x = random(50, 550);
    let y = random(320, 590);
    brush.line(x, y, x + random(18, 70), y + random(-3, 8));
  }

  // Perspective guide ink lines on street
  brush.set("2H", "#7f8796", 0.35);
  brush.line(248, 300, 148, 600);
  brush.line(352, 300, 452, 600);

  brush.set("HB", "#5f6675", 0.25);
  for (let i = 0; i < 7; i++) {
    let yy = map(i, 0, 6, 340, 590);
    brush.line(170 + i * 7, yy, 430 - i * 7, yy + random(-3, 3));
  }

  // Sparse passersby silhouettes
  function person(x, y, s, umbrella, lean) {
    let h = 70 * s;
    let w = 18 * s;

    brush.noStroke();
    brush.fill("#20232b", 110);
    brush.fillBleed(0.12, "out");
    brush.beginShape(0.28);
    brush.vertex(x - w * 0.7, y);
    brush.vertex(x - w * 0.95 + lean, y + h * 0.35);
    brush.vertex(x - w * 0.55 + lean, y + h * 0.95);
    brush.vertex(x + w * 0.45 + lean, y + h);
    brush.vertex(x + w * 0.95, y + h * 0.34);
    brush.vertex(x + w * 0.7, y + h * 0.05);
    brush.endShape(true);

    brush.set("pen", "#18181d", 0.7 * s);
    brush.circle(x, y - 12 * s, 8 * s, 0.2);

    brush.set("rotring", "#121217", 0.45 * s);
    brush.line(x - 3 * s, y + h * 0.95, x - 8 * s + lean * 0.6, y + h + 20 * s);
    brush.line(x + 2 * s, y + h * 0.96, x + 7 * s + lean * 0.6, y + h + 19 * s);

    if (umbrella) {
      brush.set("pen", "#1c1d24", 0.65 * s);
      brush.arc(x + 6 * s, y - 18 * s, 30 * s, 190, 350);
      brush.set("rotring", "#1c1d24", 0.3 * s);
      brush.line(x + 6 * s, y - 18 * s, x + 1 * s, y + 16 * s);
    }

    // reflection
    brush.noStroke();
    brush.fill("#1b2030", 28);
    brush.fillBleed(0.35, "out");
    brush.beginShape(0.32);
    brush.vertex(x - 8 * s, y + h + 6 * s);
    brush.vertex(x + 8 * s, y + h + 6 * s);
    brush.vertex(x + 13 * s, y + h + 36 * s);
    brush.vertex(x - 14 * s, y + h + 38 * s);
    brush.endShape(true);
  }

  person(172, 372, 0.88, true, -2);
  person(303, 402, 1.05, true, 2);
  person(402, 350, 0.74, false, -1);
  person(494, 392, 0.92, true, 1);

  // Distant tiny silhouettes
  for (let i = 0; i < 5; i++) {
    let x = 70 + i * 95 + random(-12, 12);
    let y = 282 + random(2, 16);
    brush.set("rotring", "#1d2230", 0.2);
    brush.line(x, y, x - random(1, 3), y + random(10, 16));
    brush.line(x, y, x + random(1, 3), y + random(10, 16));
    brush.set("pen", "#1d2230", 0.22);
    brush.circle(x, y - 3, 2.8, 0.1);
  }

  // Ink accents on building edges and silhouettes
  brush.set("rotring", "#202534", 0.22);
  for (let b of buildings) {
    brush.line(b.x + b.w, 300 - b.h + 10, b.x + b.w, 300);
  }

  // Charcoal / crayon muted street textures
  brush.mass("crayon", "#384152", {
    strength: 0.38,
    precision: 0.55,
    gradient: 0.25,
    outline: false
  });
  brush.beginShape(0.35);
  brush.vertex(0, 420);
  brush.vertex(600, 395);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noMass();

  brush.mass("pastel", "#2a303d", {
    strength: 0.28,
    precision: 0.62,
    gradient: 0.45,
    outline: false
  });
  brush.beginShape(0.3);
  brush.vertex(220, 300);
  brush.vertex(380, 300);
  brush.vertex(448, 600);
  brush.vertex(150, 600);
  brush.endShape(true);
  brush.noMass();

  // Sparse graphite hatching to suggest rain-dark pavement
  brush.hatchStyle("2B", "#465062", 0.24);
  brush.hatch(12, 102, { rand: 0.1, continuous: true, gradient: 0.25 });
  brush.beginShape(0.25);
  brush.vertex(0, 330);
  brush.vertex(600, 315);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Final ink touches
  brush.set("pen", "#20222a", 0.35);
  brush.line(0, 300, 600, 300);

  noLoop();
}