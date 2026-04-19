function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("hand");
  brush.wiggle(5);

  const head = [430, 160];
  const chest = [360, 220];
  const hips = [290, 280];
  const frontKnee = [450, 250];
  const frontFoot = [540, 280];
  const backKnee = [200, 360];
  const backFoot = [110, 460];
  const frontElbow = [410, 130];
  const frontHand = [480, 100];
  const backElbow = [280, 210];
  const backHand = [210, 170];

  const trailColors = ["#a39e98", "#8c8781", "#6b6660", "#4a4641"];
  for (let i = 0; i < 90; i++) {
    brush.set("spray", random(trailColors), random(1.5, 4.0));
    let t = random();
    let bx = lerp(backFoot[0], chest[0], t) + random(-50, 50);
    let by = lerp(backFoot[1], chest[1], t) + random(-50, 50);
    let dx = random(-40, -120);
    let dy = random(40, 120);
    brush.line(bx, by, bx + dx, by + dy);
  }

  brush.mass("pastel", "#333333", { strength: 0.6, precision: 0.4, gradient: 0.5 });
  brush.beginShape(0.4);
  brush.vertex(chest[0] - 25, chest[1] - 15);
  brush.vertex(chest[0] + 25, chest[1] + 15);
  brush.vertex(hips[0] + 20, hips[1] + 15);
  brush.vertex(hips[0] - 20, hips[1] - 15);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#1a1a1a", { strength: 0.8, precision: 0.3, outline: false });
  brush.beginShape(0.4);
  brush.vertex(hips[0], hips[1]);
  brush.vertex(hips[0] - 15, hips[1] + 25);
  brush.vertex(backKnee[0] - 15, backKnee[1] + 10);
  brush.vertex(backKnee[0] + 15, backKnee[1] - 10);
  brush.endShape(true);
  brush.noMass();

  brush.hatchStyle("charcoal", "#444444", 1.5);
  brush.hatch(8, 135, { rand: 0.2, continuous: true });
  brush.beginShape(0.5);
  brush.vertex(chest[0] - 50, chest[1]);
  brush.vertex(hips[0] + 50, hips[1]);
  brush.vertex(backKnee[0] + 50, backKnee[1]);
  brush.vertex(backKnee[0] - 50, backKnee[1]);
  brush.endShape(true);
  brush.noHatch();

  brush.set("charcoal", "#555555", 0.6);
  for (let i = 0; i < 3; i++) {
    brush.spline([
      [chest[0] + random(-20, 20), chest[1] + random(-20, 20)],
      [hips[0] + random(-20, 20), hips[1] + random(-20, 20)],
      [backKnee[0] + random(-20, 20), backKnee[1] + random(-20, 20)],
      [backFoot[0] + random(-20, 20), backFoot[1] + random(-20, 20)]
    ], 0.4);
    brush.spline([
      [chest[0] + random(-20, 20), chest[1] + random(-20, 20)],
      [frontKnee[0] + random(-20, 20), frontKnee[1] + random(-20, 20)],
      [frontFoot[0] + random(-20, 20), frontFoot[1] + random(-20, 20)]
    ], 0.3);
  }

  brush.set("charcoal", "#0a0a0a", 1.4);
  
  brush.spline([
    [head[0], head[1], 0.5],
    [chest[0], chest[1], 1.5],
    [hips[0], hips[1], 1.2]
  ], 0.4);

  brush.spline([
    [chest[0], chest[1], 1.0],
    [frontElbow[0], frontElbow[1], 0.8],
    [frontHand[0], frontHand[1], 0.3]
  ], 0.2);

  brush.spline([
    [chest[0] - 10, chest[1] + 10, 0.9],
    [backElbow[0], backElbow[1], 0.7],
    [backHand[0], backHand[1], 0.2]
  ], 0.3);

  brush.spline([
    [hips[0], hips[1], 1.2],
    [frontKnee[0], frontKnee[1], 0.8],
    [frontFoot[0], frontFoot[1], 0.4]
  ], 0.2);

  brush.spline([
    [hips[0], hips[1], 1.4],
    [backKnee[0], backKnee[1], 1.2],
    [backFoot[0], backFoot[1], 0.6]
  ], 0.3);

  brush.set("charcoal", "#111111", 1.0);
  brush.spline([
    [head[0] - 15, head[1] - 15, 0.5],
    [head[0] + 12, head[1] - 18, 0.8],
    [head[0] + 18, head[1] + 12, 0.6],
    [head[0] - 12, head[1] + 18, 1.0],
    [head[0] - 18, head[1] - 10, 0.4]
  ], 0.5);

  brush.set("charcoal", "#000000", 2.0);
  brush.line(hips[0] - 5, hips[1] + 5, backKnee[0], backKnee[1]);
  brush.line(chest[0] - 5, chest[1], hips[0] - 5, hips[1]);

  brush.noField();
  noLoop();
}