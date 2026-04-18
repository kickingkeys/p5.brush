function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);
  
  brush.noStroke();
  brush.noFill();
  brush.noWash();
  brush.noHatch();
  brush.noMass();
  brush.noField();

  // Define a function to draw a hatched rectangle
  function hatchedRect(x, y, w, h, angle, color, hatchDist, hatchAngle, brushName = "cpencil") {
    brush.push();
    brush.translate(x, y);
    
    // Fill with wash for base color
    brush.wash(color, 180);
    brush.noStroke();
    brush.rect(0, 0, w, h, "center");
    brush.noWash();
    
    // Add hatching
    brush.hatchStyle(brushName, color, 0.8);
    brush.hatch(hatchDist, hatchAngle, { rand: 0.1 });
    brush.rect(0, 0, w, h, "center");
    brush.noHatch();
    
    // Add soft outline
    brush.set("pen", color, 0.6);
    brush.noFill();
    brush.rect(0, 0, w, h, "center");
    
    brush.pop();
  }

  // Color palette - muted earth tones
  const colors = ["#a67c52", "#c49a6c", "#8b636c", "#c9a9a6", "#5f5f5f"];

  // Draw intersecting rectangles
  hatchedRect(300, 200, 350, 180, 0, colors[0], 6, 15, "cpencil");
  hatchedRect(250, 300, 280, 220, 0, colors[1], 8, 75, "cpencil");
  hatchedRect(400, 350, 200, 160, 0, colors[2], 5, 45, "cpencil");
  hatchedRect(200, 400, 320, 140, 0, colors[3], 7, -30, "cpencil");
  hatchedRect(320, 250, 240, 180, 0, colors[4], 6, 60, "cpencil");

  // Add structural lines with pen
  brush.set("pen", "#5f5f5f", 1.0);
  brush.line(100, 180, 500, 180);
  brush.line(150, 280, 550, 280);
  brush.line(200, 340, 580, 340);
  brush.line(120, 390, 520, 390);

  // Add some subtle cross-hatching in one area with 2H
  brush.hatchStyle("2H", "#8b636c", 0.5);
  brush.hatch(4, 0, { rand: 0.05 });
  brush.hatch(4, 90, { rand: 0.05 });
  brush.rect(350, 250, 100, 100, "center");
  brush.noHatch();

  // Final outline accents with rotring
  brush.set("rotring", "#5f5f5f", 0.7);
  brush.rect(300, 200, 350, 180, "center");
  brush.rect(250, 300, 280, 220, "center");

  noLoop();
}