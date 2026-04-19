function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Ground / soil shadow at base ---
  brush.hatchStyle("2B", "#111", 1.4);
  brush.hatch(2, 90, { rand: 0.18, continuous: false, gradient: 0.4 });
  brush.noStroke();
  brush.beginShape(0.0);
  brush.vertex(0, 480);
  brush.vertex(600, 480);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // --- Deep undergrowth shadow band ---
  brush.hatchStyle("2B", "#1a1a1a", 1.2);
  brush.hatch(3, 75, { rand: 0.2, continuous: true, gradient: 0.3 });
  brush.beginShape(0.0);
  brush.vertex(0, 420);
  brush.vertex(600, 420);
  brush.vertex(600, 530);
  brush.vertex(0, 530);
  brush.endShape(true);
  brush.noHatch();

  // Cross-hatch the deep shadow
  brush.hatchStyle("rotring", "#000", 0.5);
  brush.hatch(4, 135, { rand: 0.12, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 420);
  brush.vertex(600, 420);
  brush.vertex(600, 530);
  brush.vertex(0, 530);
  brush.endShape(true);
  brush.noHatch();

  // --- Trunk definitions ---
  // Each trunk: vertical hatching + cross-hatch shadow side

  let trunks = [
    { x: 55,  topY: 30,  botY: 490, w: 22, shadowSide: "right" },
    { x: 130, topY: 10,  botY: 500, w: 18, shadowSide: "left"  },
    { x: 200, topY: 50,  botY: 495, w: 26, shadowSide: "right" },
    { x: 270, topY: 20,  botY: 500, w: 20, shadowSide: "left"  },
    { x: 340, topY: 40,  botY: 492, w: 24, shadowSide: "right" },
    { x: 410, topY: 15,  botY: 498, w: 19, shadowSide: "left"  },
    { x: 475, topY: 60,  botY: 488, w: 28, shadowSide: "right" },
    { x: 545, topY: 25,  botY: 495, w: 17, shadowSide: "left"  },
    // Secondary thinner trunks between main ones
    { x: 90,  topY: 80,  botY: 485, w: 10, shadowSide: "right" },
    { x: 165, topY: 100, botY: 482, w: 8,  shadowSide: "left"  },
    { x: 235, topY: 70,  botY: 487, w: 11, shadowSide: "right" },
    { x: 305, topY: 90,  botY: 484, w: 9,  shadowSide: "left"  },
    { x: 375, topY: 60,  botY: 489, w: 12, shadowSide: "right" },
    { x: 445, topY: 110, botY: 483, w: 8,  shadowSide: "left"  },
    { x: 510, topY: 85,  botY: 486, w: 10, shadowSide: "right" },
  ];

  for (let t of trunks) {
    let x = t.x, top = t.topY, bot = t.botY, w = t.w;
    let cx = x - w / 2;

    // Light side — sparse vertical HB hatching
    brush.hatchStyle("HB", "#444", 0.6);
    brush.hatch(4, 88, { rand: 0.04, continuous: true });
    brush.beginShape(0.0);
    brush.vertex(cx, top);
    brush.vertex(cx + w * 0.6, top);
    brush.vertex(cx + w * 0.6, bot);
    brush.vertex(cx, bot);
    brush.endShape(true);
    brush.noHatch();

    // Dark shadow side — dense 2B vertical + diagonal cross
    let sx = t.shadowSide === "right" ? cx + w * 0.55 : cx;
    let sw = w * 0.5;
    brush.hatchStyle("2B", "#111", 1.0);
    brush.hatch(2.5, 88, { rand: 0.06, continuous: true });
    brush.beginShape(0.0);
    brush.vertex(sx, top);
    brush.vertex(sx + sw, top);
    brush.vertex(sx + sw, bot);
    brush.vertex(sx, bot);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("rotring", "#000", 0.4);
    brush.hatch(3.5, 118, { rand: 0.08, continuous: false });
    brush.beginShape(0.0);
    brush.vertex(sx, top);
    brush.vertex(sx + sw, top);
    brush.vertex(sx + sw, bot);
    brush.vertex(sx, bot);
    brush.endShape(true);
    brush.noHatch();

    // Bark texture — short horizontal rotring lines across full trunk
    brush.hatchStyle("rotring", "#333", 0.3);
    brush.hatch(9, 5, { rand: 0.15, continuous: false });
    brush.beginShape(0.0);
    brush.vertex(cx, top);
    brush.vertex(cx + w, top);
    brush.vertex(cx + w, bot);
    brush.vertex(cx, bot);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Canopy / upper forest darkness ---
  // Dense hatching that weaves across the top, creating tangled branches

  // Layer 1: broad diagonal sweep across full top
  brush.hatchStyle("2B", "#1c1c1c", 1.1);
  brush.hatch(3, 55, { rand: 0.22, continuous: true, gradient: 0.5 });
  brush.beginShape(0.0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 220);
  brush.vertex(0, 220);
  brush.endShape(true);
  brush.noHatch();

  // Layer 2: crossing angle
  brush.hatchStyle("HB", "#222", 0.8);
  brush.hatch(4, 125, { rand: 0.18, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 180);
  brush.vertex(0, 180);
  brush.endShape(true);
  brush.noHatch();

  // Layer 3: very dense top strip — near black
  brush.hatchStyle("2B", "#000", 1.3);
  brush.hatch(1.8, 90, { rand: 0.1, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 80);
  brush.vertex(0, 80);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#000", 0.4);
  brush.hatch(2.5, 40, { rand: 0.14, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 80);
  brush.vertex(0, 80);
  brush.endShape(true);
  brush.noHatch();

  // --- Mid-canopy transition zone ---
  brush.hatchStyle("HB", "#2a2a2a", 0.9);
  brush.hatch(5, 68, { rand: 0.25, continuous: true, gradient: 0.6 });
  brush.beginShape(0.0);
  brush.vertex(0, 160);
  brush.vertex(600, 160);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#555", 0.5);
  brush.hatch(7, 110, { rand: 0.2, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 160);
  brush.vertex(600, 160);
  brush.vertex(600, 320);
  brush.vertex(0, 320);
  brush.endShape(true);
  brush.noHatch();

  // --- Branch network — thin diagonal pen lines across mid zone ---
  // Simulate overlapping branches as dense angled hatching at multiple angles

  // Branch layer A
  brush.hatchStyle("pen", "#111", 0.7);
  brush.hatch(6, 30, { rand: 0.3, continuous: true });
  brush.beginShape(0.0);
  brush.vertex(0, 80);
  brush.vertex(600, 80);
  brush.vertex(600, 280);
  brush.vertex(0, 280);
  brush.endShape(true);
  brush.noHatch();

  // Branch layer B — steeper angle
  brush.hatchStyle("pen", "#222", 0.5);
  brush.hatch(8, 150, { rand: 0.28, continuous: true });
  brush.beginShape(0.0);
  brush.vertex(0, 80);
  brush.vertex(600, 80);
  brush.vertex(600, 260);
  brush.vertex(0, 260);
  brush.endShape(true);
  brush.noHatch();

  // Branch layer C — near horizontal, lighter
  brush.hatchStyle("rotring", "#444", 0.35);
  brush.hatch(10, 10, { rand: 0.35, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 100);
  brush.vertex(600, 100);
  brush.vertex(600, 250);
  brush.vertex(0, 250);
  brush.endShape(true);
  brush.noHatch();

  // --- Undergrowth / ferns — lower mid zone ---
  // Radiating short hatch clusters suggesting foliage clumps

  let shrubZones = [
    { x1: 0,   x2: 120, y1: 340, y2: 470 },
    { x1: 100, x2: 220, y1: 350, y2: 460 },
    { x1: 200, x2: 320, y1: 335, y2: 465 },
    { x1: 300, x2: 420, y1: 345, y2: 468 },
    { x1: 400, x2: 520, y1: 340, y2: 462 },
    { x1: 480, x2: 600, y1: 338, y2: 470 },
  ];

  for (let z of shrubZones) {
    // Primary angle
    brush.hatchStyle("HB", "#333", 0.8);
    brush.hatch(4, 60, { rand: 0.2, continuous: true });
    brush.beginShape(0.0);
    brush.vertex(z.x1, z.y1);
    brush.vertex(z.x2, z.y1);
    brush.vertex(z.x2, z.y2);
    brush.vertex(z.x1, z.y2);
    brush.endShape(true);
    brush.noHatch();

    // Counter angle
    brush.hatchStyle("2B", "#1e1e1e", 1.0);
    brush.hatch(5, 120, { rand: 0.18, continuous: false });
    brush.beginShape(0.0);
    brush.vertex(z.x1, z.y1 + 20);
    brush.vertex(z.x2, z.y1 + 20);
    brush.vertex(z.x2, z.y2);
    brush.vertex(z.x1, z.y2);
    brush.endShape(true);
    brush.noHatch();
  }

  // Dense undergrowth cross-hatch across full lower band
  brush.hatchStyle("rotring", "#111", 0.4);
  brush.hatch(3, 80, { rand: 0.15, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 390);
  brush.vertex(600, 390);
  brush.vertex(600, 440);
  brush.vertex(0, 440);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#000", 1.1);
  brush.hatch(2, 45, { rand: 0.1, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 440);
  brush.vertex(600, 440);
  brush.vertex(600, 490);
  brush.vertex(0, 490);
  brush.endShape(true);
  brush.noHatch();

  // --- Light shafts — sparse 2H vertical lines cutting down ---
  // These create a sense of light filtering through canopy

  let shaftXs = [40, 110, 185, 250, 320, 390, 455, 525];
  for (let sx of shaftXs) {
    brush.hatchStyle("2H", "#888", 0.4);
    brush.hatch(14, 89, { rand: 0.05, continuous: false, gradient: 0.7 });
    brush.beginShape(0.0);
    brush.vertex(sx - 12, 90);
    brush.vertex(sx + 12, 90);
    brush.vertex(sx + 16, 400);
    brush.vertex(sx - 16, 400);
    brush.endShape(true);
    brush.noHatch();
  }

  // --- Final unifying dark overlay on upper third ---
  // Weave everything together with a very fine rotring mesh
  brush.hatchStyle("rotring", "#000", 0.3);
  brush.hatch(5, 45, { rand: 0.08, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 300);
  brush.vertex(0, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("rotring", "#000", 0.3);
  brush.hatch(6, 135, { rand: 0.08, continuous: false });
  brush.beginShape(0.0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 300);
  brush.vertex(0, 300);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}