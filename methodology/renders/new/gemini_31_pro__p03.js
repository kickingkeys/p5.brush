function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);

  brush.addField("leap", (t, field) => {
    for (let c = 0; c < field.length; c++) {
      for (let r = 0; r < field[0].length; r++) {
        let n = noise(c * 0.1, r * 0.1) * 30 - 15;
        field[c][r] = -40 + n;
      }
    }
    return field;
  });
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  brush.field("leap");

  brush.noStroke();
  brush.mass("pastel", "#555555", { strength: 0.35, precision: 0.2, gradient: 0.8 });
  brush.beginShape(0.6);
  brush.vertex(80, 560);
  brush.vertex(280, 360);
  brush.vertex(380, 230);
  brush.vertex(340, 290);
  brush.vertex(140, 500);
  brush.endShape(true);
  brush.noMass();

  brush.mass("crayon", "#2a2a2a", { strength: 0.6, precision: 0.35, outline: false });
  brush.beginShape(0.5);
  brush.vertex(160, 480);
  brush.vertex(270, 360);
  brush.vertex(330, 290);
  brush.vertex(260, 390);
  brush.endShape(true);
  brush.noMass();

  brush.set("spray", "#3a3a3a", 2.8);
  for (let i = 0; i < 90; i++) {
    let t = random();
    let x = lerp(80, 360, t) + random(-60, 60);
    let y = lerp(540, 260, t) + random(-60, 60);
    brush.flowLine(x, y, random(15, 45), random(360));
  }

  brush.set("spray", "#111111", 1.2);
  for (let i = 0; i < 50; i++) {
    let t = random();
    let x = lerp(130, 320, t) + random(-30, 30);
    let y = lerp(490, 300, t) + random(-30, 30);
    brush.flowLine(x, y, random(5, 20), random(360));
  }

  brush.hatchStyle("charcoal", "#4a4a4a", 0.6);
  brush.hatch(7, -40, { rand: 0.25, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(100, 550);
  brush.vertex(380, 250);
  brush.vertex(420, 310);
  brush.vertex(160, 580);
  brush.endShape(true);
  brush.noHatch();

  brush.noField();

  brush.wiggle(3);
  brush.set("HB", "#666666", 0.8);
  brush.spline([[110, 510, 0.2], [280, 340, 0.8], [370, 210, 0.4], [480, 150, 0.1]], 0.4);
  brush.spline([[280, 340], [210, 410], [130, 490]], 0.2);
  brush.spline([[280, 340], [390, 270], [490, 290]], 0.2);
  brush.spline([[340, 260], [240, 230], [170, 210]], 0.2);
  brush.spline([[340, 260], [410, 180], [460, 120]], 0.2);

  brush.field("hand");
  brush.wiggle(5);
  brush.set("charcoal", "#1a1a1a", 1.8);

  brush.spline([[260, 360, 0.6], [300, 300, 1.6], [340, 250, 1.3], [365, 210, 0.5]], 0.3);
  
  brush.spline([[280, 340, 1.2], [230, 380, 0.9], [170, 440, 1.5], [120, 500, 0.3]], 0.2);
  
  brush.spline([[290, 330, 1.0], [370, 280, 1.6], [440, 265, 0.8], [510, 285, 0.2]], 0.3);
  
  brush.spline([[340, 260, 1.1], [400, 190, 0.8], [470, 130, 0.2]], 0.2);
  
  brush.spline([[330, 270, 0.9], [250, 240, 1.3], [180, 215, 0.3]], 0.2);
  
  brush.spline([[355, 220, 0.5], [375, 185, 1.3], [395, 205, 0.9], [370, 235, 0.4]], 0.6);

  brush.wiggle(2);
  brush.set("charcoal", "#080808", 2.4);
  brush.spline([[285, 335, 1.6], [325, 275, 1.9]], 0.2);
  brush.spline([[360, 290, 1.3], [385, 275, 1.6]], 0.1);
  brush.spline([[165, 450, 1.6], [115, 505, 0.4]], 0.1);
  brush.spline([[335, 265, 1.4], [355, 245, 1.1]], 0.2);

  brush.noField();
  noLoop();
}