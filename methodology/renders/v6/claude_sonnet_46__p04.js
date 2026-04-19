function setup() {
  createCanvas(600, 600, WEBGL);
  background("#fffaf3");
  brush.scaleBrushes(3);
}

function draw() {
  translate(-width / 2, -height / 2);

  const cx = 300;
  const cy = 300;

  // --- Neck ---
  brush.noFill();
  brush.hatchStyle("cpencil", "#c9a87c", 0.7);
  brush.hatch(5, 80, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(265, 420);
  brush.vertex(258, 480);
  brush.vertex(342, 480);
  brush.vertex(335, 420);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b8906a", 0.55);
  brush.hatch(6, 110, { rand: 0.04 });
  brush.beginShape(0.4);
  brush.vertex(268, 425);
  brush.vertex(262, 478);
  brush.vertex(338, 478);
  brush.vertex(332, 425);
  brush.endShape(true);
  brush.noHatch();

  // --- Shoulders ---
  brush.hatchStyle("cpencil", "#8fa8c8", 0.75);
  brush.hatch(5, 30, { rand: 0.06, continuous: true });
  brush.beginShape(0.35);
  brush.vertex(160, 540);
  brush.vertex(200, 478);
  brush.vertex(400, 478);
  brush.vertex(440, 540);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6d8fae", 0.6);
  brush.hatch(6, 65, { rand: 0.05 });
  brush.beginShape(0.35);
  brush.vertex(165, 540);
  brush.vertex(205, 480);
  brush.vertex(395, 480);
  brush.vertex(435, 540);
  brush.endShape(true);
  brush.noHatch();

  // --- Face base layer ---
  // Organic face shape with noise-like perturbation
  const faceVerts = [];
  const faceAngles = 32;
  for (let i = 0; i < faceAngles; i++) {
    const t = i / faceAngles;
    const a = t * TWO_PI - HALF_PI;
    const rx = 100 + noise(cos(a) * 0.3 + 1.5, sin(a) * 0.3 + 1.5) * 18 - 9;
    const ry = 120 + noise(cos(a) * 0.3 + 3.5, sin(a) * 0.3 + 3.5) * 14 - 7;
    faceVerts.push([cx + cos(a) * rx, cy - 20 + sin(a) * ry]);
  }

  // Base warm skin
  brush.hatchStyle("cpencil", "#d4a882", 0.8);
  brush.hatch(4, 50, { rand: 0.06, continuous: true });
  brush.beginShape(0.5);
  for (const v of faceVerts) brush.vertex(v[0], v[1]);
  brush.endShape(true);
  brush.noHatch();

  // Second skin layer — cooler undertone
  brush.hatchStyle("cpencil", "#c49aaa", 0.65);
  brush.hatch(5, 100, { rand: 0.05 });
  brush.beginShape(0.5);
  for (const v of faceVerts) brush.vertex(lerp(cx, v[0], 0.9), lerp(cy - 20, v[1], 0.9));
  brush.endShape(true);
  brush.noHatch();

  // Third layer — golden-green memory tint
  brush.hatchStyle("cpencil", "#a8b87a", 0.55);
  brush.hatch(6, 140, { rand: 0.07 });
  brush.beginShape(0.5);
  for (const v of faceVerts) brush.vertex(lerp(cx, v[0], 0.75), lerp(cy - 20, v[1], 0.75));
  brush.endShape(true);
  brush.noHatch();

  // --- Shadow zones on face ---
  // Left cheek shadow
  brush.hatchStyle("cpencil", "#7a5a7a", 0.6);
  brush.hatch(4, 60, { rand: 0.08 });
  brush.beginShape(0.45);
  brush.vertex(200, 290);
  brush.vertex(195, 330);
  brush.vertex(215, 370);
  brush.vertex(245, 380);
  brush.vertex(255, 340);
  brush.vertex(240, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6a4a6a", 0.5);
  brush.hatch(5, 100, { rand: 0.06 });
  brush.beginShape(0.45);
  brush.vertex(202, 295);
  brush.vertex(198, 328);
  brush.vertex(217, 365);
  brush.vertex(243, 375);
  brush.vertex(252, 338);
  brush.vertex(238, 303);
  brush.endShape(true);
  brush.noHatch();

  // Right cheek — warmer blush
  brush.hatchStyle("cpencil", "#c47a6a", 0.65);
  brush.hatch(4, 45, { rand: 0.07 });
  brush.beginShape(0.45);
  brush.vertex(345, 300);
  brush.vertex(360, 330);
  brush.vertex(358, 365);
  brush.vertex(335, 375);
  brush.vertex(318, 348);
  brush.vertex(322, 308);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b06858", 0.5);
  brush.hatch(5, 85, { rand: 0.06 });
  brush.beginShape(0.45);
  brush.vertex(348, 305);
  brush.vertex(356, 332);
  brush.vertex(354, 362);
  brush.vertex(333, 372);
  brush.vertex(320, 346);
  brush.vertex(325, 312);
  brush.endShape(true);
  brush.noHatch();

  // Forehead — cool blue-violet memory wash
  brush.hatchStyle("cpencil", "#8888bb", 0.6);
  brush.hatch(5, 25, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(225, 170);
  brush.vertex(255, 155);
  brush.vertex(300, 150);
  brush.vertex(345, 155);
  brush.vertex(375, 170);
  brush.vertex(370, 215);
  brush.vertex(230, 215);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#6a6a99", 0.5);
  brush.hatch(6, 70, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(232, 175);
  brush.vertex(260, 160);
  brush.vertex(300, 155);
  brush.vertex(340, 160);
  brush.vertex(368, 175);
  brush.vertex(363, 212);
  brush.vertex(237, 212);
  brush.endShape(true);
  brush.noHatch();

  // Chin area — deeper shadow
  brush.hatchStyle("cpencil", "#8a6a4a", 0.6);
  brush.hatch(4, 90, { rand: 0.07 });
  brush.beginShape(0.4);
  brush.vertex(258, 390);
  brush.vertex(275, 405);
  brush.vertex(300, 410);
  brush.vertex(325, 405);
  brush.vertex(342, 390);
  brush.vertex(330, 378);
  brush.vertex(270, 378);
  brush.endShape(true);
  brush.noHatch();

  // --- Eyes ---
  // Left eye socket — deep indigo
  brush.hatchStyle("cpencil", "#3a3a6a", 0.7);
  brush.hatch(3, 15, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(225, 268);
  brush.vertex(245, 258);
  brush.vertex(268, 260);
  brush.vertex(278, 272);
  brush.vertex(268, 282);
  brush.vertex(245, 283);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#22224a", 0.55);
  brush.hatch(3, 55, { rand: 0.04 });
  brush.beginShape(0.4);
  brush.vertex(228, 270);
  brush.vertex(247, 261);
  brush.vertex(266, 263);
  brush.vertex(275, 273);
  brush.vertex(266, 281);
  brush.vertex(247, 281);
  brush.endShape(true);
  brush.noHatch();

  // Left eye highlight — pale gold
  brush.hatchStyle("cpencil", "#ddc87a", 0.5);
  brush.hatch(4, 80, { rand: 0.04 });
  brush.beginShape(0.4);
  brush.vertex(232, 268);
  brush.vertex(244, 263);
  brush.vertex(255, 265);
  brush.vertex(256, 274);
  brush.vertex(245, 277);
  brush.vertex(233, 274);
  brush.endShape(true);
  brush.noHatch();

  // Right eye socket
  brush.hatchStyle("cpencil", "#3a3a6a", 0.7);
  brush.hatch(3, 15, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(322, 268);
  brush.vertex(332, 258);
  brush.vertex(355, 260);
  brush.vertex(375, 272);
  brush.vertex(362, 283);
  brush.vertex(338, 282);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#22224a", 0.55);
  brush.hatch(3, 55, { rand: 0.04 });
  brush.beginShape(0.4);
  brush.vertex(325, 270);
  brush.vertex(334, 261);
  brush.vertex(354, 263);
  brush.vertex(372, 273);
  brush.vertex(360, 281);
  brush.vertex(340, 281);
  brush.endShape(true);
  brush.noHatch();

  // Right eye highlight
  brush.hatchStyle("cpencil", "#ddc87a", 0.5);
  brush.hatch(4, 80, { rand: 0.04 });
  brush.beginShape(0.4);
  brush.vertex(335, 268);
  brush.vertex(346, 263);
  brush.vertex(357, 265);
  brush.vertex(358, 274);
  brush.vertex(347, 277);
  brush.vertex(336, 274);
  brush.endShape(true);
  brush.noHatch();

  // --- Nose bridge ---
  brush.hatchStyle("cpencil", "#9a7a5a", 0.6);
  brush.hatch(4, 80, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(290, 285);
  brush.vertex(295, 285);
  brush.vertex(298, 340);
  brush.vertex(305, 355);
  brush.vertex(312, 340);
  brush.vertex(310, 285);
  brush.vertex(305, 285);
  brush.endShape(false);
  brush.noHatch();

  // Nose tip
  brush.hatchStyle("cpencil", "#c48a6a", 0.65);
  brush.hatch(3, 45, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(282, 348);
  brush.vertex(300, 358);
  brush.vertex(318, 348);
  brush.vertex(315, 338);
  brush.vertex(300, 342);
  brush.vertex(285, 338);
  brush.endShape(true);
  brush.noHatch();

  // Nose shadow — cool purple
  brush.hatchStyle("cpencil", "#7a5a8a", 0.5);
  brush.hatch(4, 100, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(283, 350);
  brush.vertex(275, 358);
  brush.vertex(280, 365);
  brush.vertex(295, 360);
  brush.vertex(298, 350);
  brush.endShape(true);
  brush.noHatch();

  // --- Lips ---
  // Upper lip — dusty rose
  brush.hatchStyle("cpencil", "#b06878", 0.75);
  brush.hatch(3, 30, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(272, 375);
  brush.vertex(285, 368);
  brush.vertex(300, 372);
  brush.vertex(315, 368);
  brush.vertex(328, 375);
  brush.vertex(315, 382);
  brush.vertex(300, 380);
  brush.vertex(285, 382);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#8a4858", 0.6);
  brush.hatch(4, 75, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(275, 376);
  brush.vertex(287, 370);
  brush.vertex(300, 374);
  brush.vertex(313, 370);
  brush.vertex(325, 376);
  brush.vertex(313, 381);
  brush.vertex(300, 379);
  brush.vertex(287, 381);
  brush.endShape(true);
  brush.noHatch();

  // Lower lip — warmer
  brush.hatchStyle("cpencil", "#c47a7a", 0.75);
  brush.hatch(3, 50, { rand: 0.05, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(272, 383);
  brush.vertex(285, 382);
  brush.vertex(300, 380);
  brush.vertex(315, 382);
  brush.vertex(328, 383);
  brush.vertex(320, 396);
  brush.vertex(300, 400);
  brush.vertex(280, 396);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#a05858", 0.6);
  brush.hatch(4, 90, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(275, 384);
  brush.vertex(300, 381);
  brush.vertex(325, 384);
  brush.vertex(318, 395);
  brush.vertex(300, 398);
  brush.vertex(282, 395);
  brush.endShape(true);
  brush.noHatch();

  // --- Eyebrows — gestural strokes ---
  brush.hatchStyle("cpencil", "#4a3a5a", 0.7);
  brush.hatch(3, 10, { rand: 0.08, continuous: true });
  brush.beginShape(0.35);
  brush.vertex(222, 248);
  brush.vertex(240, 242);
  brush.vertex(260, 240);
  brush.vertex(278, 245);
  brush.endShape(false);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#3a2a4a", 0.55);
  brush.hatch(3, 40, { rand: 0.07 });
  brush.beginShape(0.35);
  brush.vertex(225, 250);
  brush.vertex(242, 244);
  brush.vertex(260, 242);
  brush.vertex(276, 247);
  brush.endShape(false);
  brush.noHatch();

  // Right eyebrow
  brush.hatchStyle("cpencil", "#4a3a5a", 0.7);
  brush.hatch(3, 10, { rand: 0.08, continuous: true });
  brush.beginShape(0.35);
  brush.vertex(322, 245);
  brush.vertex(340, 240);
  brush.vertex(360, 242);
  brush.vertex(378, 248);
  brush.endShape(false);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#3a2a4a", 0.55);
  brush.hatch(3, 40, { rand: 0.07 });
  brush.beginShape(0.35);
  brush.vertex(324, 247);
  brush.vertex(341, 242);
  brush.vertex(360, 244);
  brush.vertex(376, 250);
  brush.endShape(false);
  brush.noHatch();

  // --- Hair ---
  // Main hair mass — deep blue-black
  const hairVerts = [];
  hairVerts.push([195, 220]);
  hairVerts.push([185, 190]);
  hairVerts.push([190, 165]);
  hairVerts.push([205, 148]);
  hairVerts.push([225, 138]);
  hairVerts.push([255, 130]);
  hairVerts.push([300, 128]);
  hairVerts.push([345, 130]);
  hairVerts.push([370, 140]);
  hairVerts.push([388, 158]);
  hairVerts.push([395, 178]);
  hairVerts.push([395, 205]);
  hairVerts.push([405, 230]);
  hairVerts.push([390, 210]);
  hairVerts.push([375, 185]);
  hairVerts.push([350, 170]);
  hairVerts.push([300, 162]);
  hairVerts.push([250, 168]);
  hairVerts.push([218, 182]);
  hairVerts.push([205, 205]);

  brush.hatchStyle("cpencil", "#2a2a4a", 0.8);
  brush.hatch(3, 20, { rand: 0.06, continuous: true });
  brush.beginShape(0.45);
  for (const v of hairVerts) brush.vertex(v[0], v[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#1a1a38", 0.65);
  brush.hatch(4, 60, { rand: 0.05 });
  brush.beginShape(0.45);
  for (const v of hairVerts) brush.vertex(v[0], v[1]);
  brush.endShape(true);
  brush.noHatch();

  // Hair highlights — dusty teal
  brush.hatchStyle("cpencil", "#4a6a7a", 0.55);
  brush.hatch(5, 35, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(240, 135);
  brush.vertex(300, 130);
  brush.vertex(355, 138);
  brush.vertex(375, 158);
  brush.vertex(340, 172);
  brush.vertex(300, 165);
  brush.vertex(260, 170);
  brush.vertex(225, 162);
  brush.vertex(215, 148);
  brush.endShape(true);
  brush.noHatch();

  // Hair — warm auburn streak
  brush.hatchStyle("cpencil", "#7a3a2a", 0.55);
  brush.hatch(5, 25, { rand: 0.07 });
  brush.beginShape(0.4);
  brush.vertex(195, 210);
  brush.vertex(200, 175);
  brush.vertex(218, 158);
  brush.vertex(248, 145);
  brush.vertex(260, 152);
  brush.vertex(240, 165);
  brush.vertex(218, 178);
  brush.vertex(208, 200);
  brush.endShape(true);
  brush.noHatch();

  // --- Ear suggestions ---
  brush.hatchStyle("cpencil", "#c49a7a", 0.6);
  brush.hatch(4, 70, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(196, 300);
  brush.vertex(192, 320);
  brush.vertex(196, 342);
  brush.vertex(208, 348);
  brush.vertex(215, 338);
  brush.vertex(210, 318);
  brush.vertex(212, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b08868", 0.5);
  brush.hatch(5, 110, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(198, 302);
  brush.vertex(194, 322);
  brush.vertex(198, 340);
  brush.vertex(207, 345);
  brush.vertex(213, 336);
  brush.vertex(208, 320);
  brush.vertex(210, 303);
  brush.endShape(true);
  brush.noHatch();

  // Right ear
  brush.hatchStyle("cpencil", "#c49a7a", 0.6);
  brush.hatch(4, 70, { rand: 0.06 });
  brush.beginShape(0.4);
  brush.vertex(388, 300);
  brush.vertex(392, 318);
  brush.vertex(390, 338);
  brush.vertex(382, 348);
  brush.vertex(375, 342);
  brush.vertex(378, 320);
  brush.vertex(376, 300);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#b08868", 0.5);
  brush.hatch(5, 110, { rand: 0.05 });
  brush.beginShape(0.4);
  brush.vertex(386, 303);
  brush.vertex(390, 320);
  brush.vertex(388, 336);
  brush.vertex(381, 345);
  brush.vertex(375, 340);
  brush.vertex(378, 322);
  brush.vertex(376, 303);
  brush.endShape(true);
  brush.noHatch();

  // --- Atmospheric memory traces ---
  // Loose scattered strokes suggesting fragmented memory
  brush.hatchStyle("cpencil", "#9988bb", 0.45);
  brush.hatch(8, 55, { rand: 0.15 });
  brush.beginShape(0.3);
  brush.vertex(100, 120);
  brush.vertex(180, 95);
  brush.vertex(250, 100);
  brush.vertex(200, 150);
  brush.vertex(130, 160);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#aabb88", 0.4);
  brush.hatch(9, 35, { rand: 0.18 });
  brush.beginShape(0.3);
  brush.vertex(380, 90);
  brush.vertex(460, 110);
  brush.vertex(500, 160);
  brush.vertex(450, 170);
  brush.vertex(390, 140);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#bb9977", 0.4);
  brush.hatch(10, 75, { rand: 0.2 });
  brush.beginShape(0.3);
  brush.vertex(80, 380);
  brush.vertex(140, 400);
  brush.vertex(160, 450);
  brush.vertex(100, 460);
  brush.vertex(70, 430);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("cpencil", "#7799aa", 0.4);
  brush.hatch(9, 120, { rand: 0.18 });
  brush.beginShape(0.3);
  brush.vertex(440, 400);
  brush.vertex(510, 390);
  brush.vertex(530, 450);
  brush.vertex(470, 460);
  brush.vertex(430, 435);
  brush.endShape(true);
  brush.noHatch();

  noLoop();
}