function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width / 2, -height / 2);

  // --- warm paper tone base ---
  // (background already set in setup)

  // --- smear / motion trail behind the leap ---
  // Heavy smudge trails sweeping left-to-right and upward
  brush.field("hand");
  brush.wiggle(5);

  // broad smudge layer 1 - darkest trailing mass
  brush.mass("crayon", "#2a2420", {
    strength: 0.85,
    precision: 0.15,
    gradient: 0.6,
    outline: false
  });
  brush.noStroke();
  brush.beginShape(0.55);
  brush.vertex(60, 340);
  brush.vertex(110, 290);
  brush.vertex(175, 270);
  brush.vertex(230, 285);
  brush.vertex(260, 320);
  brush.vertex(240, 370);
  brush.vertex(190, 390);
  brush.vertex(120, 385);
  brush.vertex(70, 365);
  brush.endShape(true);
  brush.noMass();

  // broad smudge layer 2 - mid-tone trailing blur
  brush.mass("pastel", "#3d3530", {
    strength: 0.6,
    precision: 0.2,
    gradient: 0.7,
    outline: false
  });
  brush.beginShape(0.5);
  brush.vertex(80, 360);
  brush.vertex(150, 310);
  brush.vertex(220, 300);
  brush.vertex(280, 330);
  brush.vertex(290, 380);
  brush.vertex(240, 420);
  brush.vertex(160, 430);
  brush.vertex(90, 410);
  brush.endShape(true);
  brush.noMass();

  // lighter smudge ghost - leftward motion blur
  brush.mass("pastel", "#5c5047", {
    strength: 0.35,
    precision: 0.1,
    gradient: 0.8,
    outline: false
  });
  brush.beginShape(0.6);
  brush.vertex(30, 380);
  brush.vertex(90, 330);
  brush.vertex(170, 320);
  brush.vertex(220, 360);
  brush.vertex(200, 420);
  brush.vertex(120, 445);
  brush.vertex(45, 430);
  brush.endShape(true);
  brush.noMass();

  // --- hatch shading on trailing mass ---
  brush.hatchStyle("charcoal", "#1e1a17", 1.8);
  brush.hatch(5, 135, { rand: 0.18, continuous: true, gradient: 0.5 });
  brush.beginShape(0.45);
  brush.vertex(80, 330);
  brush.vertex(160, 285);
  brush.vertex(240, 300);
  brush.vertex(265, 355);
  brush.vertex(220, 400);
  brush.vertex(130, 410);
  brush.vertex(75, 385);
  brush.endShape(true);
  brush.noHatch();

  brush.hatchStyle("2B", "#2a2420", 1.2);
  brush.hatch(7, 60, { rand: 0.12, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(60, 350);
  brush.vertex(130, 300);
  brush.vertex(210, 310);
  brush.vertex(250, 360);
  brush.vertex(220, 415);
  brush.vertex(130, 430);
  brush.vertex(65, 400);
  brush.endShape(true);
  brush.noHatch();

  // --- figure body: torso mid-leap ---
  // torso tilted forward, arms flung wide
  brush.noFill();
  brush.noHatch();

  // torso core - dark charcoal, gestural
  brush.set("charcoal", "#1a1510", 1.4);
  brush.spline([
    [300, 230],
    [310, 260],
    [315, 295],
    [308, 330],
    [295, 355]
  ], 0.45);

  // torso width suggestion
  brush.set("charcoal", "#1a1510", 1.1);
  brush.spline([
    [280, 245],
    [310, 255],
    [335, 250],
    [345, 270],
    [335, 295],
    [310, 300],
    [285, 295],
    [275, 275]
  ], 0.4);

  // --- head ---
  brush.set("charcoal", "#1a1510", 1.0);
  brush.spline([
    [295, 175],
    [310, 168],
    [325, 172],
    [330, 185],
    [325, 198],
    [310, 205],
    [297, 200],
    [291, 188]
  ], 0.5);

  // neck
  brush.set("charcoal", "#1a1510", 0.9);
  brush.spline([
    [308, 205],
    [310, 218],
    [308, 230]
  ], 0.3);

  // --- left arm flung high and back (trailing arm) ---
  brush.set("charcoal", "#1a1510", 1.2);
  brush.spline([
    [285, 248],
    [255, 225],
    [220, 200],
    [185, 185],
    [155, 190],
    [130, 205]
  ], 0.5);

  // left hand gesture
  brush.set("charcoal", "#1a1510", 0.8);
  brush.spline([
    [130, 205],
    [118, 198],
    [110, 210],
    [120, 220]
  ], 0.4);
  brush.spline([
    [130, 205],
    [122, 215],
    [115, 225]
  ], 0.3);

  // --- right arm reaching forward and up ---
  brush.set("charcoal", "#1a1510", 1.3);
  brush.spline([
    [335, 248],
    [370, 218],
    [410, 195],
    [450, 180],
    [490, 178],
    [520, 185]
  ], 0.5);

  // right hand gesture - fingers splayed
  brush.set("charcoal", "#1a1510", 0.7);
  brush.spline([
    [520, 185],
    [535, 175],
    [548, 170]
  ], 0.3);
  brush.spline([
    [520, 185],
    [533, 185],
    [545, 182]
  ], 0.3);
  brush.spline([
    [520, 185],
    [530, 195],
    [540, 195]
  ], 0.3);
  brush.spline([
    [520, 185],
    [527, 200],
    [534, 205]
  ], 0.3);

  // --- left leg: extended back and up (leap trailing leg) ---
  brush.set("charcoal", "#1a1510", 1.3);
  brush.spline([
    [298, 355],
    [270, 385],
    [240, 410],
    [205, 430],
    [170, 440],
    [140, 435],
    [110, 420]
  ], 0.5);

  // left foot pointed
  brush.set("charcoal", "#1a1510", 0.85);
  brush.spline([
    [110, 420],
    [95, 415],
    [80, 420],
    [72, 430]
  ], 0.35);

  // --- right leg: thrust forward and down (lead leg) ---
  brush.set("charcoal", "#1a1510", 1.3);
  brush.spline([
    [310, 355],
    [340, 375],
    [375, 400],
    [405, 430],
    [420, 460],
    [425, 490]
  ], 0.5);

  // right foot pointed downward
  brush.set("charcoal", "#1a1510", 0.85);
  brush.spline([
    [425, 490],
    [428, 505],
    [435, 515],
    [445, 520]
  ], 0.35);

  // --- secondary loose gesture lines for energy ---
  brush.set("charcoal", "#2a2420", 0.7);
  brush.wiggle(6);
  // energy line along body axis
  brush.spline([
    [130, 210],
    [200, 225],
    [270, 250],
    [310, 280],
    [360, 310],
    [440, 370],
    [520, 188]
  ], 0.3);

  brush.wiggle(4);
  // loose contour repeat - torso
  brush.set("charcoal", "#1e1a17", 0.9);
  brush.spline([
    [275, 240],
    [300, 235],
    [330, 242],
    [342, 265],
    [332, 300],
    [310, 315],
    [285, 308],
    [272, 285]
  ], 0.45);

  // --- smudge hatch over trailing leg area ---
  brush.hatchStyle("2B", "#1a1510", 1.5);
  brush.hatch(4, 110, { rand: 0.2, continuous: true, gradient: 0.4 });
  brush.beginShape(0.5);
  brush.vertex(90, 415);
  brush.vertex(145, 390);
  brush.vertex(210, 400);
  brush.vertex(260, 435);
  brush.vertex(240, 470);
  brush.vertex(170, 480);
  brush.vertex(100, 460);
  brush.vertex(75, 440);
  brush.endShape(true);
  brush.noHatch();

  // --- dark accent marks: joints and weight points ---
  brush.noField();
  brush.wiggle(3);

  // shoulder joints
  brush.set("2B", "#111010", 1.6);
  brush.line(278, 248, 290, 255);
  brush.line(332, 248, 342, 255);

  // hip joints
  brush.set("2B", "#111010", 1.4);
  brush.line(292, 352, 303, 362);
  brush.line(312, 352, 320, 362);

  // knee of lead leg
  brush.set("2B", "#111010", 1.2);
  brush.line(390, 418, 400, 428);

  // elbow of reaching arm
  brush.set("2B", "#111010", 1.1);
  brush.line(445, 183, 452, 193);

  // --- light HB tone lines for form on torso ---
  brush.set("HB", "#3a3028", 0.8);
  brush.wiggle(2);
  brush.spline([
    [290, 248],
    [305, 265],
    [308, 290],
    [300, 318],
    [290, 340]
  ], 0.35);
  brush.spline([
    [325, 250],
    [330, 270],
    [325, 295],
    [315, 320],
    [305, 345]
  ], 0.35);

  // --- very light smudge haze over whole figure for atmosphere ---
  brush.wiggle(7);
  brush.hatchStyle("charcoal", "#3d3530", 0.6);
  brush.hatch(14, 30, { rand: 0.25, continuous: false, gradient: 0.3 });
  brush.beginShape(0.6);
  brush.vertex(100, 160);
  brush.vertex(540, 160);
  brush.vertex(540, 540);
  brush.vertex(100, 540);
  brush.endShape(true);
  brush.noHatch();

  brush.noField();

  noLoop();
}