function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noFill();
  
  // Light base hatching with 2H
  brush.hatchStyle("2H", "#888", 0.6);
  brush.hatch(10, 45, { rand: 0.08, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(120, 400);
  brush.vertex(135, 200);
  brush.vertex(150, 180);
  brush.vertex(160, 220);
  brush.vertex(170, 410);
  brush.endShape(true);
  brush.noHatch();
  
  // Mid-tone hatching with HB
  brush.hatchStyle("HB", "#555", 0.9);
  brush.hatch(6, 55, { rand: 0.1, continuous: true });
  brush.beginShape(0.2);
  brush.vertex(130, 380);
  brush.vertex(142, 210);
  brush.vertex(152, 195);
  brush.vertex(162, 230);
  brush.vertex(172, 390);
  brush.endShape(true);
  brush.noHatch();
  
  // Dark shadow areas with 2B
  brush.hatchStyle("2B", "#333", 1.3);
  brush.hatch(3, 50, { rand: 0.12, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(138, 360);
  brush.vertex(146, 220);
  brush.vertex(154, 210);
  brush.vertex(164, 240);
  brush.vertex(174, 370);
  brush.endShape(true);
  brush.noHatch();
  
  // Outer stem outlines with HB
  brush.set("HB", "#444", 1.1);
  brush.spline([[135, 400], [140, 300, 0.8], [145, 220, 0.6], [150, 180]], 0.4);
  
  // Seed head structure with fine pen lines
  brush.set("pen", "#555", 0.8);
  brush.line(148, 182, 148, 160);
  brush.line(148, 160, 145, 150);
  brush.line(148, 160, 151, 152);
  brush.line(148, 160, 149, 148);
  brush.line(148, 160, 153, 155);
  
  // Secondary grass blade with HB
  brush.set("HB", "#666", 1.0);
  brush.spline([[160, 410], [170, 300, 0.7], [175, 250, 0.5], [180, 240]], 0.3);
  
  // Fine 2H hatching on secondary blade
  brush.hatchStyle("2H", "#777", 0.5);
  brush.hatch(9, 60, { rand: 0.07 });
  brush.beginShape(0.2);
  brush.vertex(162, 405);
  brush.vertex(172, 305);
  brush.vertex(177, 255);
  brush.vertex(182, 245);
  brush.vertex(183, 247);
  brush.vertex(178, 258);
  brush.vertex(173, 308);
  brush.vertex(163, 408);
  brush.endShape(true);
  brush.noHatch();
  
  // Unfinished edge effect with broken lines
  brush.set("HB", "#666", 0.9);
  brush.spline([[120, 400], [110, 380], [105, 360]], 0.3);
  brush.spline([[170, 410], [180, 390], [185, 370]], 0.3);
  
  // Distant grass hints with 2H
  brush.set("2H", "#999", 0.7);
  brush.line(200, 350, 210, 300);
  brush.line(205, 360, 215, 310);
  brush.line(195, 370, 202, 330);
  
  noLoop();
}