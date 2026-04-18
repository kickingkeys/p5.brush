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

  brush.noStroke();
  
  brush.mass("pastel", "#8c8884", { strength: 0.35, precision: 0.15, outline: false });
  brush.beginShape(0.6);
  brush.vertex(80, 550);
  brush.vertex(250, 420);
  brush.vertex(350, 250);
  brush.vertex(280, 280);
  brush.vertex(120, 480);
  brush.endShape(CLOSE);
  
  brush.mass("pastel", "#5a5550", { strength: 0.5, precision: 0.2, outline: false });
  brush.beginShape(0.5);
  brush.vertex(150, 480);
  brush.vertex(280, 350);
  brush.vertex(360, 210);
  brush.vertex(320, 240);
  brush.vertex(200, 420);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.set("spray", "#3b3836", 2.2);
  for (let i = 0; i < 60; i++) {
    let t = random();
    let x = lerp(100, 360, t) + random(-30, 30) + (t * 40);
    let y = lerp(520, 200, t) + random(-30, 30) - (t * 20);
    brush.flowLine(x, y, random(10, 40), random(360));
  }

  brush.mass("crayon", "#2c2a28", { strength: 0.7, precision: 0.4, outline: false });
  brush.beginShape(0.4);
  brush.vertex(280, 320);
  brush.vertex(350, 220);
  brush.vertex(320, 210);
  brush.vertex(250, 300);
  brush.endShape(CLOSE);
  brush.noMass();

  brush.hatchStyle("charcoal", "#222", 1.2);
  brush.hatch(5, 45, { rand: 0.2, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(280, 320);
  brush.vertex(380, 300);
  brush.vertex(360, 330);
  brush.vertex(260, 350);
  brush.endShape(CLOSE);
  brush.noHatch();

  brush.noFill();
  
  brush.set("charcoal", "#555", 0.6);
  brush.spline([[100, 520, 0.2], [220, 420, 0.8], [340, 260, 0.2]], 0.3);
  brush.spline([[140, 540, 0.1], [260, 440, 0.6], [380, 280, 0.1]], 0.3);

  brush.set("charcoal", "#181615", 1.5);
  
  brush.spline([[280, 320, 1.2], [320, 260, 1.8], [360, 210, 1.0]], 0.4);
  
  brush.set("charcoal", "#111", 1.2);
  brush.circle(390, 170, 22, true);
  brush.spline([[370, 190, 0.8], [390, 160, 1.5], [410, 180, 0.6]], 0.5);

  brush.set("charcoal", "#1a1817", 1.3);
  brush.spline([[350, 220, 1.5], [430, 160, 1.0], [510, 120, 0.4]], 0.3);
  
  brush.set("charcoal", "#252220", 1.1);
  brush.spline([[340, 230, 1.2], [260, 210, 0.8], [170, 240, 0.3]], 0.4);

  brush.set("charcoal", "#151413", 1.6);
  brush.spline([[280, 320, 1.8], [380, 300, 1.4], [450, 370, 0.8], [480, 440, 0.4]], 0.5);
  
  brush.set("charcoal", "#181615", 1.5);
  brush.spline([[270, 330, 1.6], [200, 420, 1.2], [110, 510, 0.7], [60, 560, 0.2]], 0.2);

  brush.set("charcoal", "#0a0908", 2.0);
  brush.spline([[270, 325, 1.0], [290, 315, 2.0], [310, 300, 0.8]], 0.2);
  brush.spline([[340, 230, 0.8], [360, 215, 1.8], [370, 200, 0.6]], 0.3);
  
  brush.set("charcoal", "#333", 0.5);
  for(let i = 0; i < 5; i++) {
      brush.spline([
          [380 + random(-20, 20), 170 + random(-20, 20), random(0.2, 0.8)],
          [390 + random(-20, 20), 160 + random(-20, 20), random(0.2, 0.8)],
          [400 + random(-20, 20), 180 + random(-20, 20), random(0.2, 0.8)]
      ], 0.6);
  }

  brush.noField();
  noLoop();
}