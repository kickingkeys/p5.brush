function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fdf9f0");
  translate(-width/2, -height/2);
  
  // Set up pencil brushes for graphite study
  brush.noFill();
  brush.noWash();
  brush.noMass();
  brush.noField();
  
  // Base grass stems and leaves with HB - light construction lines
  brush.set("HB", "#555", 0.8);
  // Grass stems
  brush.line(180, 140, 190, 300);
  brush.line(200, 130, 210, 320);
  brush.line(220, 135, 225, 310);
  brush.line(240, 145, 245, 315);
  // Long blade leaves
  brush.spline([[190, 280, 0.5], [170, 220, 0.7], [160, 180, 0.8], [150, 160, 0.6]], 0.3);
  brush.spline([[210, 300, 0.5], [200, 240, 0.7], [195, 200, 0.8], [190, 180, 0.6]], 0.3);
  brush.spline([[225, 290, 0.5], [240, 230, 0.7], [250, 190, 0.8], [260, 170, 0.6]], 0.3);
  brush.spline([[245, 300, 0.5], [260, 240, 0.7], [270, 200, 0.8], [280, 180, 0.6]], 0.3);
  
  // Seed heads with 2H - very light, sparse
  brush.set("2H", "#777", 0.6);
  // Clustered seed heads - light stipple and tiny lines
  for (let i = 0; i < 15; i++) {
    let angle = random(360);
    let length = random(2, 6);
    brush.line(190 + cos(angle) * 4, 130 + sin(angle) * 4, 
               190 + cos(angle) * (4 + length), 130 + sin(angle) * (4 + length));
  }
  for (let i = 0; i < 15; i++) {
    let angle = random(360);
    let length = random(2, 5);
    brush.line(210 + cos(angle) * 5, 120 + sin(angle) * 5, 
               210 + cos(angle) * (5 + length), 120 + sin(angle) * (5 + length));
  }
  for (let i = 0; i < 12; i++) {
    let angle = random(360);
    let length = random(3, 6);
    brush.line(220 + cos(angle) * 4, 125 + sin(angle) * 4, 
               220 + cos(angle) * (4 + length), 125 + sin(angle) * (4 + length));
  }
  for (let i = 0; i < 14; i++) {
    let angle = random(360);
    let length = random(2, 5);
    brush.line(240 + cos(angle) * 5, 135 + sin(angle) * 5, 
               240 + cos(angle) * (5 + length), 135 + sin(angle) * (5 + length));
  }
  
  // Mid-tone hatching on grass blades with 2H
  brush.hatchStyle("2H", "#666", 0.7);
  brush.hatch(6, 45, { rand: 0.08, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(190, 280);
  brush.vertex(170, 220);
  brush.vertex(160, 180);
  brush.vertex(150, 160);
  brush.vertex(155, 162);
  brush.vertex(165, 182);
  brush.vertex(175, 222);
  brush.vertex(195, 282);
  brush.endShape(true);
  brush.noHatch();
  
  brush.hatchStyle("2H", "#666", 0.7);
  brush.hatch(5, 50, { rand: 0.07, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(210, 300);
  brush.vertex(200, 240);
  brush.vertex(195, 200);
  brush.vertex(190, 180);
  brush.vertex(195, 183);
  brush.vertex(200, 203);
  brush.vertex(205, 243);
  brush.vertex(215, 303);
  brush.endShape(true);
  brush.noHatch();
  
  // Darker shadow zones with 2B
  brush.hatchStyle("2B", "#333", 1.3);
  brush.hatch(3, 40, { rand: 0.12, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(225, 290);
  brush.vertex(240, 230);
  brush.vertex(250, 190);
  brush.vertex(260, 170);
  brush.vertex(262, 173);
  brush.vertex(252, 193);
  brush.vertex(242, 233);
  brush.vertex(227, 293);
  brush.endShape(true);
  brush.noHatch();
  
  brush.hatchStyle("2B", "#333", 1.4);
  brush.hatch(2.5, 35, { rand: 0.15, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(245, 300);
  brush.vertex(260, 240);
  brush.vertex(270, 200);
  brush.vertex(280, 180);
  brush.vertex(283, 183);
  brush.vertex(273, 203);
  brush.vertex(263, 243);
  brush.vertex(250, 303);
  brush.endShape(true);
  brush.noHatch();
  
  // Final contours and details with pen and HB
  brush.set("pen", "#444", 1.2);
  brush.spline([[180, 140, 0.6], [190, 300, 1.0]], 0.2);
  brush.spline([[200, 130, 0.6], [210, 320, 1.0]], 0.2);
  brush.spline([[220, 135, 0.6], [225, 310, 1.0]], 0.2);
  brush.spline([[240, 145, 0.6], [245, 315, 1.0]], 0.2);
  
  // Reinforce one side of leaves for depth
  brush.set("HB", "#333", 1.0);
  brush.spline([[150, 160], [160, 180], [170, 220], [190, 280]], 0.3);
  brush.spline([[190, 180], [200, 240], [210, 300]], 0.3);
  
  // Unfinished edges - leave some lines open, some hatching incomplete
  // Some seed heads only partially indicated
  brush.set("2H", "#888", 0.5);
  brush.line(255, 150, 265, 130);
  brush.line(260, 155, 270, 135);
  brush.line(235, 140, 245, 120);
  brush.line(240, 145, 250, 125);
  
  noLoop();
}