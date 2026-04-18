function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // Forest floor / ground shadow
  brush.hatchStyle("rotring", "#111", 0.4);
  brush.hatch(2, 80, { rand: 0.08, continuous: true, gradient: 0.4 });
  brush.noStroke();
  brush.beginShape(0);
  brush.vertex(0, 480);
  brush.vertex(600, 480);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Dense undergrowth base — horizontal dense hatching
  brush.hatchStyle("2B", "#1a1a1a", 0.7);
  brush.hatch(3, 0, { rand: 0.12, continuous: false, gradient: 0.3 });
  brush.beginShape(0);
  brush.vertex(0, 440);
  brush.vertex(600, 440);
  brush.vertex(600, 560);
  brush.vertex(0, 560);
  brush.endShape(true);
  brush.noHatch();

  // Mid undergrowth — diagonal
  brush.hatchStyle("pen", "#222", 0.5);
  brush.hatch(4, 35, { rand: 0.1, continuous: true, gradient: 0.2 });
  brush.beginShape(0);
  brush.vertex(0, 400);
  brush.vertex(600, 400);
  brush.vertex(600, 520);
  brush.vertex(0, 520);
  brush.endShape(true);
  brush.noHatch();

  // Tree trunk definitions — vertical strokes
  const trunks = [
    { x: 55, w: 18, h1: 60, h2: 560 },
    { x: 120, w: 28, h1: 20, h2: 580 },
    { x: 195, w: 14, h1: 100, h2: 520 },
    { x: 255, w: 32, h1: 0, h2: 600 },
    { x: 320, w: 12, h1: 140, h2: 500 },
    { x: 370, w: 24, h1: 30, h2: 570 },
    { x: 430, w: 20, h1: 80, h2: 540 },
    { x: 490, w: 30, h1: 10, h2: 590 },
    { x: 545, w: 16, h1: 120, h2: 510 },
    { x: 85, w: 10, h1: 180, h2: 490 },
    { x: 160, w: 8, h1: 200, h2: 480 },
    { x: 290, w: 10, h1: 160, h2: 470 },
    { x: 460, w: 8, h1: 220, h2: 460 },
    { x: 510, w: 12, h1: 190, h2: 500 },
  ];

  // Draw each trunk with vertical hatching layers
  for (let t of trunks) {
    let cx = t.x;
    let hw = t.w / 2;

    // Dark shadow side (left)
    brush.hatchStyle("2B", "#0d0d0d", 0.9);
    brush.hatch(1.5, 90, { rand: 0.04, continuous: true });
    brush.beginShape(0);
    brush.vertex(cx - hw, t.h1);
    brush.vertex(cx - hw * 0.2, t.h1);
    brush.vertex(cx - hw * 0.2, t.h2);
    brush.vertex(cx - hw, t.h2);
    brush.endShape(true);
    brush.noHatch();

    // Mid tone
    brush.hatchStyle("HB", "#2a2a2a", 0.6);
    brush.hatch(2.5, 88, { rand: 0.05, continuous: true });
    brush.beginShape(0);
    brush.vertex(cx - hw * 0.2, t.h1);
    brush.vertex(cx + hw * 0.5, t.h1);
    brush.vertex(cx + hw * 0.5, t.h2);
    brush.vertex(cx - hw * 0.2, t.h2);
    brush.endShape(true);
    brush.noHatch();

    // Light side (right)
    brush.hatchStyle("2H", "#555", 0.4);
    brush.hatch(4, 86, { rand: 0.06, continuous: true });
    brush.beginShape(0);
    brush.vertex(cx + hw * 0.5, t.h1);
    brush.vertex(cx + hw, t.h1);
    brush.vertex(cx + hw, t.h2);
    brush.vertex(cx + hw * 0.5, t.h2);
    brush.endShape(true);
    brush.noHatch();

    // Bark texture — short cross strokes
    brush.hatchStyle("rotring", "#111", 0.3);
    brush.hatch(6, 5, { rand: 0.15, continuous: false });
    brush.beginShape(0);
    brush.vertex(cx - hw, t.h1);
    brush.vertex(cx + hw, t.h1);
    brush.vertex(cx + hw, t.h2);
    brush.vertex(cx - hw, t.h2);
    brush.endShape(true);
    brush.noHatch();
  }

  // Canopy shadow zones — upper forest darkness
  brush.hatchStyle("2B", "#0a0a0a", 0.8);
  brush.hatch(2, 45, { rand: 0.1, continuous: false, gradient: 0.5 });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 180);
  brush.vertex(0, 180);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#1a1a1a", 0.6);
  brush.hatch(3, 135, { rand: 0.08, continuous: true, gradient: 0.3 });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 160);
  brush.vertex(0, 160);
  brush.endShape(true);
  brush.noHatch();

  // Cross-hatch canopy layer
  brush.hatchStyle("rotring", "#222", 0.35);
  brush.hatch(5, 60, { rand: 0.07, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 220);
  brush.vertex(0, 220);
  brush.endShape(true);
  brush.noHatch();

  // Mid-canopy foliage patches — irregular zones of dense hatching
  const foliageZones = [
    { x: 0, y: 60, w: 180, h: 140 },
    { x: 140, y: 40, w: 160, h: 120 },
    { x: 270, y: 20, w: 200, h: 160 },
    { x: 420, y: 50, w: 180, h: 130 },
    { x: 500, y: 30, w: 100, h: 150 },
    { x: 30, y: 150, w: 120, h: 100 },
    { x: 200, y: 130, w: 140, h: 110 },
    { x: 350, y: 110, w: 160, h: 120 },
  ];

  for (let z of foliageZones) {
    brush.hatchStyle("2B", "#111", 0.7);
    brush.hatch(2, 20 + z.x * 0.1, { rand: 0.12, continuous: false });
    brush.beginShape(0);
    brush.vertex(z.x, z.y);
    brush.vertex(z.x + z.w, z.y);
    brush.vertex(z.x + z.w, z.y + z.h);
    brush.vertex(z.x, z.y + z.h);
    brush.endShape(true);
    brush.noHatch();

    brush.hatchStyle("pen", "#1a1a1a", 0.45);
    brush.hatch(3.5, 70 + z.y * 0.05, { rand: 0.09, continuous: true });
    brush.beginShape(0);
    brush.vertex(z.x, z.y);
    brush.vertex(z.x + z.w, z.y);
    brush.vertex(z.x + z.w, z.y + z.h);
    brush.vertex(z.x, z.y + z.h);
    brush.endShape(true);
    brush.noHatch();
  }

  // Undergrowth detail — vertical grass/fern strokes
  brush.hatchStyle("pen", "#111", 0.4);
  brush.hatch(2.5, 92, { rand: 0.18, continuous: false, gradient: 0.4 });
  brush.beginShape(0);
  brush.vertex(0, 360);
  brush.vertex(600, 360);
  brush.vertex(600, 480);
  brush.vertex(0, 480);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("HB", "#222", 0.55);
  brush.hatch(3, 75, { rand: 0.14, continuous: true });
  brush.beginShape(0);
  brush.vertex(0, 380);
  brush.vertex(600, 380);
  brush.vertex(600, 460);
  brush.vertex(0, 460);
  brush.endShape(true);
  brush.noHatch();

  // Shadow pools at tree bases
  for (let t of trunks) {
    let cx = t.x;
    let hw = t.w * 1.8;
    let sy = t.h2 - 30;

    brush.hatchStyle("2B", "#080808", 0.9);
    brush.hatch(1.8, 15, { rand: 0.06, continuous: true });
    brush.beginShape(0);
    brush.vertex(cx - hw, sy);
    brush.vertex(cx + hw, sy);
    brush.vertex(cx + hw * 0.7, min(sy + 50, 600));
    brush.vertex(cx - hw * 0.7, min(sy + 50, 600));
    brush.endShape(true);
    brush.noHatch();
  }

  // Atmospheric diagonal light rays — very sparse
  brush.hatchStyle("2H", "#888", 0.3);
  brush.hatch(22, 68, { rand: 0.05, continuous: false, gradient: 0.6 });
  brush.beginShape(0);
  brush.vertex(100, 100);
  brush.vertex(500, 100);
  brush.vertex(500, 400);
  brush.vertex(100, 400);
  brush.endShape(true);
  brush.noHatch();

  // Final weaving layer — full-canvas cross-hatch at very low density
  brush.hatchStyle("rotring", "#333", 0.25);
  brush.hatch(18, 110, { rand: 0.04, continuous: false });
  brush.beginShape(0);
  brush.vertex(0, 0);
  brush.vertex(600, 0);
  brush.vertex(600, 600);
  brush.vertex(0, 600);
  brush.endShape(true);
  brush.noHatch();

  // Trunk outlines — pen contour lines
  brush.noHatch();
  brush.noFill();
  for (let t of trunks) {
    if (t.w > 15) {
      brush.set("pen", "#0d0d0d", 0.9);
      brush.line(t.x - t.w / 2, t.h1, t.x - t.w / 2, t.h2);
      brush.set("pen", "#1a1a1a", 0.6);
      brush.line(t.x + t.w / 2, t.h1, t.x + t.w / 2, t.h2);
    }
  }

  noLoop();
}