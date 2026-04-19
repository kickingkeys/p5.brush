function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set up face structure with slight irregularity
  brush.field("hand");
  brush.wiggle(2);

  // Base layer - very light colored pencil strokes in unexpected colors
  brush.hatchStyle("cpencil", "#884488", 0.7);
  brush.hatch(8, 15, { rand: 0.08, continuous: false });
  brush.beginShape(0.3);
  brush.vertex(300, 150);
  brush.vertex(450, 250);
  brush.vertex(400, 450);
  brush.vertex(200, 450);
  brush.vertex(150, 250);
  brush.vertex(300, 150);
  brush.endShape(true);
  brush.noHatch();

  // Mid tones with different color - warm memory tone
  brush.hatchStyle("cpencil", "#cc6644", 0.9);
  brush.hatch(6, 75, { rand: 0.1, continuous: true });
  brush.beginShape(0.4);
  brush.vertex(300, 180);
  brush.vertex(420, 240);
  brush.vertex(380, 400);
  brush.vertex(220, 400);
  brush.vertex(180, 240);
  brush.vertex(300, 180);
  brush.endShape(true);
  brush.noHatch();

  // Darker accents in purple-blue for contrast
  brush.hatchStyle("cpencil", "#444488", 1.1);
  brush.hatch(4, 120, { rand: 0.12, continuous: true });
  brush.beginShape(0.3);
  brush.vertex(300, 200);
  brush.vertex(390, 250);
  brush.vertex(360, 360);
  brush.vertex(240, 360);
  brush.vertex(210, 250);
  brush.vertex(300, 200);
  brush.endShape(true);
  brush.noHatch();

  // Eye region with finer 2H pencil
  brush.hatchStyle("2H", "#333366", 0.5);
  brush.hatch(10, 30, { rand: 0.05 });
  brush.circle(250, 280, 30, 0.3);
  brush.circle(350, 280, 30, 0.3);
  brush.noHatch();

  // Nose suggestion with HB
  brush.hatchStyle("HB", "#665566", 0.8);
  brush.hatch(5, 45);
  brush.line(290, 310, 310, 340);
  brush.line(310, 310, 330, 340);
  brush.noHatch();

  // Cheek and jaw with soft strokes
  brush.hatchStyle("cpencil", "#aa5544", 0.6);
  brush.hatch(7, 60, { rand: 0.07 });
  brush.spline([[200,280],[220,320],[250,350],[280,360]], 0.4);
  brush.spline([[400,280],[380,320],[350,350],[320,360]], 0.4);
  brush.noHatch();

  // Hair with flowing strokes in unexpected green
  brush.set("cpencil", "#226644", 1.2);
  brush.spline([[300,150],[280,200],[270,250],[275,300]], 0.3);
  brush.spline([[300,150],[320,200],[330,250],[325,300]], 0.3);
  brush.spline([[280,160],[250,210],[230,270],[220,330]], 0.4);
  brush.spline([[320,160],[350,210],[370,270],[380,330]], 0.4);

  // Final subtle details with rotring in blue
  brush.set("rotring", "#335577", 0.4);
  brush.line(295, 270, 295, 290);
  brush.line(345, 270, 345, 290);

  brush.noField();
  noLoop();
}