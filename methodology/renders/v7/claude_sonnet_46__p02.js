function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- Tall grass stem 1 ---
  brush.set("HB", "#2a2a2a", 0.7);
  brush.spline([
    [120, 580, 0.4],
    [118, 480, 0.6],
    [122, 380, 0.7],
    [115, 280, 0.8],
    [108, 180, 0.5],
    [112, 100, 0.3]
  ], 0.35);

  // Seed head top of stem 1 - elongated oval cluster
  brush.set("HB", "#1e1e1e", 0.6);
  brush.spline([
    [112, 100, 0.4],
    [107, 80, 0.6],
    [110, 60, 0.7],
    [114, 42, 0.6],
    [116, 28, 0.4]
  ], 0.4);

  // Seed head hatching - dense
  brush.noStroke();
  brush.hatchStyle("2H", "#444", 0.5);
  brush.hatch(3, 70, { rand: 0.08, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(104, 28);
  brush.vertex(112, 22);
  brush.vertex(119, 30);
  brush.vertex(120, 50);
  brush.vertex(116, 68);
  brush.vertex(109, 72);
  brush.vertex(104, 60);
  brush.vertex(103, 42);
  brush.endShape(true);
  brush.noHatch();

  // Side spikelets on stem 1
  brush.set("HB", "#333", 0.5);
  brush.spline([[115, 160, 0.3], [130, 148, 0.5], [145, 140, 0.3]], 0.3);
  brush.spline([[114, 200, 0.3], [98, 188, 0.5], [84, 182, 0.3]], 0.3);
  brush.spline([[116, 240, 0.3], [133, 228, 0.5], [148, 222, 0.3]], 0.3);
  brush.spline([[113, 290, 0.3], [96, 278, 0.4], [80, 272, 0.2]], 0.3);

  // Tiny spikelet ellipses
  brush.set("2H", "#555", 0.4);
  brush.spline([[143, 140, 0.3], [147, 136, 0.4], [150, 132, 0.3]], 0.5);
  brush.spline([[80, 182, 0.3], [76, 178, 0.4], [73, 174, 0.3]], 0.5);
  brush.spline([[146, 222, 0.3], [150, 218, 0.4], [153, 214, 0.3]], 0.5);
  brush.spline([[76, 272, 0.3], [72, 268, 0.4], [69, 264, 0.3]], 0.5);

  // --- Tall grass stem 2 ---
  brush.set("HB", "#2a2a2a", 0.8);
  brush.spline([
    [220, 590, 0.5],
    [224, 490, 0.7],
    [218, 390, 0.8],
    [226, 290, 0.8],
    [220, 190, 0.6],
    [215, 90, 0.4]
  ], 0.3);

  // Seed head stem 2 - drooping panicle
  brush.set("HB", "#222", 0.6);
  brush.spline([
    [215, 90, 0.5],
    [220, 72, 0.6],
    [228, 58, 0.7],
    [238, 48, 0.6],
    [248, 44, 0.4]
  ], 0.45);

  // Panicle seed cluster hatching
  brush.noStroke();
  brush.hatchStyle("2B", "#1a1a1a", 0.7);
  brush.hatch(2.5, 55, { rand: 0.1, continuous: true, gradient: 0.2 });
  brush.beginShape(0.5);
  brush.vertex(225, 42);
  brush.vertex(238, 36);
  brush.vertex(252, 40);
  brush.vertex(256, 56);
  brush.vertex(248, 68);
  brush.vertex(234, 70);
  brush.vertex(224, 60);
  brush.endShape(true);
  brush.noHatch();

  // Side branches panicle
  brush.set("2H", "#444", 0.45);
  brush.spline([[228, 58, 0.3], [240, 52, 0.4], [252, 50, 0.3]], 0.35);
  brush.spline([[222, 70, 0.3], [210, 65, 0.4], [198, 62, 0.3]], 0.35);

  // Stem 2 side leaves
  brush.set("HB", "#303030", 0.55);
  brush.spline([[222, 240, 0.4], [240, 220, 0.6], [258, 200, 0.4]], 0.4);
  brush.spline([[220, 340, 0.4], [200, 320, 0.6], [182, 302, 0.4]], 0.4);
  brush.spline([[223, 430, 0.4], [244, 412, 0.6], [262, 396, 0.4]], 0.4);

  // Leaf vein lines
  brush.set("2H", "#555", 0.35);
  brush.spline([[222, 240, 0.3], [242, 222, 0.4], [255, 202, 0.2]], 0.5);
  brush.spline([[220, 340, 0.3], [202, 322, 0.4], [184, 304, 0.2]], 0.5);

  // --- Stem 3 - shorter, bent ---
  brush.set("HB", "#2e2e2e", 0.65);
  brush.spline([
    [350, 600, 0.5],
    [346, 510, 0.7],
    [352, 420, 0.8],
    [360, 330, 0.7],
    [372, 240, 0.6],
    [388, 160, 0.5],
    [410, 95, 0.4]
  ], 0.4);

  // Drooping seed head stem 3
  brush.set("HB", "#1e1e1e", 0.6);
  brush.spline([
    [410, 95, 0.5],
    [420, 76, 0.6],
    [432, 62, 0.6],
    [438, 52, 0.5]
  ], 0.5);

  // Seed cluster stem 3 - round heavy head
  brush.noStroke();
  brush.hatchStyle("2B", "#111", 0.8);
  brush.hatch(2, 40, { rand: 0.12, continuous: false });
  brush.beginShape(0.55);
  brush.vertex(428, 42);
  brush.vertex(440, 36);
  brush.vertex(452, 42);
  brush.vertex(456, 56);
  brush.vertex(450, 68);
  brush.vertex(436, 72);
  brush.vertex(424, 64);
  brush.vertex(420, 50);
  brush.endShape(true);
  brush.noHatch();

  // Cross hatch shadow on seed head 3
  brush.hatchStyle("2H", "#333", 0.4);
  brush.hatch(4, 130, { rand: 0.07, continuous: true });
  brush.beginShape(0.55);
  brush.vertex(428, 42);
  brush.vertex(440, 36);
  brush.vertex(452, 42);
  brush.vertex(456, 56);
  brush.vertex(450, 68);
  brush.vertex(436, 72);
  brush.vertex(424, 64);
  brush.vertex(420, 50);
  brush.endShape(true);
  brush.noHatch();

  // Stem 3 side spikelets
  brush.set("HB", "#383838", 0.5);
  brush.spline([[365, 280, 0.3], [382, 268, 0.5], [396, 260, 0.3]], 0.35);
  brush.spline([[358, 350, 0.3], [340, 338, 0.5], [324, 330, 0.3]], 0.35);
  brush.spline([[370, 210, 0.3], [388, 198, 0.5], [404, 190, 0.3]], 0.35);

  // Tiny spikelet tips
  brush.set("2H", "#555", 0.35);
  brush.spline([[394, 260, 0.3], [400, 255, 0.4], [404, 250, 0.2]], 0.5);
  brush.spline([[322, 330, 0.3], [318, 325, 0.4], [314, 320, 0.2]], 0.5);

  // --- Stem 4 - very thin, fine 2H ---
  brush.set("2H", "#4a4a4a", 0.5);
  brush.spline([
    [470, 590, 0.4],
    [468, 510, 0.5],
    [472, 430, 0.6],
    [466, 350, 0.6],
    [460, 270, 0.5],
    [454, 195, 0.4],
    [448, 130, 0.3]
  ], 0.3);

  // Delicate seed head stem 4 - fine wispy
  brush.set("2H", "#3a3a3a", 0.45);
  brush.spline([
    [448, 130, 0.4],
    [443, 112, 0.5],
    [438, 96, 0.5],
    [432, 82, 0.4],
    [426, 70, 0.3]
  ], 0.4);

  // Wispy spikelet lines stem 4
  brush.set("2H", "#555", 0.35);
  for (let i = 0; i < 6; i++) {
    let baseY = 70 + i * 10;
    let baseX = 426 + i * 2;
    brush.spline([
      [baseX, baseY, 0.3],
      [baseX - 8 + i * 3, baseY - 8, 0.4],
      [baseX - 14 + i * 4, baseY - 16, 0.2]
    ], 0.45);
    brush.spline([
      [baseX, baseY, 0.3],
      [baseX + 8 - i * 2, baseY - 8, 0.4],
      [baseX + 14 - i * 3, baseY - 16, 0.2]
    ], 0.45);
  }

  // Stem 4 leaves
  brush.set("2H", "#484848", 0.4);
  brush.spline([[464, 310, 0.3], [480, 295, 0.5], [494, 282, 0.3]], 0.4);
  brush.spline([[466, 400, 0.3], [450, 385, 0.5], [436, 372, 0.3]], 0.4);

  // --- Stem 5 - background, faint ---
  brush.set("2H", "#888", 0.4);
  brush.spline([
    [300, 600, 0.3],
    [296, 520, 0.4],
    [302, 440, 0.5],
    [298, 360, 0.5],
    [292, 280, 0.4],
    [286, 200, 0.3],
    [280, 130, 0.2]
  ], 0.3);

  // Faint background seed head
  brush.set("2H", "#999", 0.35);
  brush.spline([
    [280, 130, 0.3],
    [275, 112, 0.4],
    [270, 98, 0.4],
    [265, 86, 0.3]
  ], 0.4);

  // --- Ground grass blades at base ---
  brush.set("HB", "#2a2a2a", 0.55);
  let bladeStarts = [
    [60, 600], [90, 600], [160, 600], [190, 600],
    [260, 600], [310, 600], [390, 600], [430, 600],
    [510, 600], [540, 600], [570, 600]
  ];
  let bladeTips = [
    [40, 540], [100, 530], [148, 525], [178, 515],
    [245, 520], [322, 510], [378, 518], [445, 508],
    [500, 522], [555, 515], [562, 505]
  ];
  for (let i = 0; i < bladeStarts.length; i++) {
    brush.spline([
      [bladeStarts[i][0], bladeStarts[i][1], 0.5],
      [bladeStarts[i][0] + (bladeTips[i][0] - bladeStarts[i][0]) * 0.5,
       bladeStarts[i][1] - 35, 0.6],
      [bladeTips[i][0], bladeTips[i][1], 0.2]
    ], 0.4);
  }

  // --- Hatched tonal shadow zones on ground ---
  brush.noStroke();
  brush.hatchStyle("2H", "#666", 0.4);
  brush.hatch(8, 10, { rand: 0.1, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(60, 600);
  brush.vertex(180, 600);
  brush.vertex(170, 555);
  brush.vertex(80, 560);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2H", "#777", 0.35);
  brush.hatch(9, 15, { rand: 0.08, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(340, 600);
  brush.vertex(480, 600);
  brush.vertex(468, 548);
  brush.vertex(352, 552);
  brush.endShape(true);
  brush.noHatch();

  // --- Scattered small seed dots and marks ---
  brush.set("2B", "#1a1a1a", 0.6);
  let dotPositions = [
    [155, 145], [162, 135], [148, 128],
    [290, 88], [298, 78], [285, 72],
    [502, 165], [510, 155], [496, 148],
    [380, 480], [388, 470]
  ];
  for (let d of dotPositions) {
    brush.spline([
      [d[0] - 3, d[1], 0.3],
      [d[0], d[1] - 4, 0.5],
      [d[0] + 3, d[1], 0.3]
    ], 0.6);
  }

  // --- Additional fine cross hatching on seed head 1 ---
  brush.noStroke();
  brush.hatchStyle("2H", "#555", 0.35);
  brush.hatch(5, 145, { rand: 0.06, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(104, 28);
  brush.vertex(112, 22);
  brush.vertex(119, 30);
  brush.vertex(120, 50);
  brush.vertex(116, 68);
  brush.vertex(109, 72);
  brush.vertex(104, 60);
  brush.vertex(103, 42);
  brush.endShape(true);
  brush.noHatch();

  // --- Unfinished trailing stem lines - fading off ---
  brush.set("2H", "#aaa", 0.3);
  brush.spline([
    [530, 580, 0.4],
    [528, 500, 0.5],
    [524, 420, 0.4],
    [520, 340, 0.3],
    [516, 270, 0.2]
  ], 0.3);

  brush.set("2H", "#bbb", 0.25);
  brush.spline([
    [560, 590, 0.3],
    [558, 520, 0.4],
    [554, 450, 0.3],
    [550, 380, 0.2]
  ], 0.3);

  // --- A few loose observation marks / sketch lines ---
  brush.set("HB", "#555", 0.45);
  brush.spline([
    [42, 350, 0.3],
    [56, 340, 0.5],
    [70, 332, 0.4],
    [82, 326, 0.2]
  ], 0.35);

  brush.set("2H", "#777", 0.35);
  brush.spline([
    [500, 400, 0.3],
    [514, 388, 0.4],
    [526, 378, 0.3]
  ], 0.35);

  noLoop();
}