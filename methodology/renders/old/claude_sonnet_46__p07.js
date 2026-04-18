function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#f5ede0");
  translate(-width / 2, -height / 2);

  // --- Background wash layer: large ghosted circles ---
  brush.noStroke();
  brush.fill("#c8b8a2", 18);
  brush.fillBleed(0.45, "out");
  brush.fillTexture(0.7, 0.5);
  brush.circle(120, 310, 160);

  brush.fill("#b0a090", 14);
  brush.fillBleed(0.5, "out");
  brush.circle(480, 200, 200);

  brush.fill("#d4c4b0", 12);
  brush.fillBleed(0.6, "out");
  brush.circle(300, 480, 180);

  brush.fill("#a89880", 10);
  brush.fillBleed(0.55, "out");
  brush.circle(550, 480, 140);

  // --- Spray paint circles: big bold overlapping rings ---
  brush.noFill();
  brush.set("spray", "#1a1a2e", 2.8);
  brush.strokeWeight(2.8);
  brush.circle(150, 280, 140, 0.3);

  brush.set("spray", "#c0392b", 2.5);
  brush.circle(350, 180, 120, 0.2);

  brush.set("spray", "#1abc9c", 2.2);
  brush.circle(460, 380, 160, 0.4);

  brush.set("spray", "#f39c12", 2.0);
  brush.circle(230, 450, 100, 0.3);

  brush.set("spray", "#8e44ad", 2.6);
  brush.circle(80, 100, 90, 0.2);

  brush.set("spray", "#2980b9", 2.4);
  brush.circle(520, 130, 110, 0.25);

  // --- Marker fills: flat bold color blocks ---
  brush.noStroke();
  brush.wash("#c0392b", 55);
  brush.circle(150, 280, 70);
  brush.noWash();

  brush.wash("#1abc9c", 45);
  brush.circle(460, 380, 80);
  brush.noWash();

  brush.wash("#f39c12", 40);
  brush.circle(350, 180, 55);
  brush.noWash();

  brush.wash("#8e44ad", 35);
  brush.circle(80, 100, 42);
  brush.noWash();

  // --- Marker strokes: thick bold outlines and slashes ---
  brush.noFill();
  brush.set("marker", "#1a1a2e", 1.8);
  brush.line(60, 180, 260, 200);
  brush.line(60, 188, 260, 208);

  brush.set("marker", "#c0392b", 2.0);
  brush.line(300, 50, 420, 130);

  brush.set("marker", "#f39c12", 1.6);
  brush.line(400, 300, 580, 260);
  brush.line(400, 310, 580, 270);

  brush.set("marker", "#1abc9c", 1.5);
  brush.line(100, 500, 300, 540);

  // --- Arrow shapes drawn with marker ---
  brush.set("marker", "#c0392b", 1.4);
  // Arrow 1: pointing right at top area
  brush.line(320, 90, 420, 90);
  brush.line(400, 72, 420, 90);
  brush.line(400, 108, 420, 90);

  brush.set("marker", "#1a1a2e", 1.3);
  // Arrow 2: pointing down-right in mid area
  brush.line(200, 350, 270, 420);
  brush.line(248, 400, 270, 420);
  brush.line(250, 398, 270, 420);
  brush.line(252, 402, 270, 420);

  brush.set("marker", "#8e44ad", 1.4);
  // Arrow 3: pointing left near bottom
  brush.line(500, 520, 380, 520);
  brush.line(400, 505, 380, 520);
  brush.line(400, 535, 380, 520);

  // --- Charcoal smears and gestural marks ---
  brush.set("charcoal", "#2c2c2c", 1.2);
  brush.wiggle(4);
  brush.line(30, 400, 200, 360);
  brush.line(35, 415, 195, 375);
  brush.line(40, 430, 185, 390);

  brush.set("charcoal", "#3a2a1a", 1.0);
  brush.line(350, 460, 590, 430);
  brush.line(355, 475, 590, 445);

  brush.noField();

  // --- HB pencil: hand-drawn ghosted circle outlines ---
  brush.set("HB", "#444444", 0.6);
  brush.wiggle(2);
  brush.circle(300, 300, 200, 0.8);
  brush.circle(300, 300, 130, 0.6);

  brush.set("HB", "#555555", 0.5);
  brush.circle(150, 150, 80, 0.7);
  brush.circle(480, 460, 90, 0.5);

  brush.noField();

  // --- 2B pencil: rough scrawled lines and cross-hatching ---
  brush.set("2B", "#1a1a1a", 0.9);
  brush.wiggle(3);
  brush.line(440, 50, 590, 180);
  brush.line(450, 60, 595, 190);

  brush.set("2B", "#222222", 0.8);
  brush.line(10, 520, 150, 590);
  brush.line(20, 535, 155, 595);

  brush.noField();

  // --- Hatch fills on some shapes ---
  brush.noStroke();
  brush.noFill();
  brush.hatch(8, 45, { rand: 0.2, continuous: false, gradient: 0.3 });
  brush.hatchStyle("rotring", "#1a1a2e", 0.7);
  brush.circle(350, 180, 55);
  brush.noHatch();

  brush.hatch(6, 135, { rand: 0.15, continuous: false, gradient: 0.2 });
  brush.hatchStyle("pen", "#c0392b", 0.6);
  brush.circle(80, 100, 42);
  brush.noHatch();

  brush.hatch(10, 60, { rand: 0.25, continuous: true, gradient: 0.4 });
  brush.hatchStyle("2H", "#1abc9c", 0.5);
  brush.rect(380, 400, 130, 80, "center");
  brush.noHatch();

  // --- Rotring pen: tight precise lines, tags, scrawls ---
  brush.set("rotring", "#1a1a2e", 0.5);
  brush.noField();
  // Tag-like zigzag
  brush.beginShape(0.0);
  brush.vertex(60, 60);
  brush.vertex(90, 40);
  brush.vertex(120, 65);
  brush.vertex(150, 42);
  brush.vertex(180, 68);
  brush.endShape(false);

  brush.set("rotring", "#8e44ad", 0.5);
  brush.beginShape(0.0);
  brush.vertex(400, 540);
  brush.vertex(430, 520);
  brush.vertex(460, 545);
  brush.vertex(490, 518);
  brush.vertex(520, 542);
  brush.endShape(false);

  // --- cpencil: soft ghosted loops and arcs ---
  brush.set("cpencil", "#7a6a5a", 0.7);
  brush.wiggle(2);
  brush.arc(300, 300, 240, 20, 160);
  brush.arc(300, 300, 240, 200, 340);

  brush.set("cpencil", "#8a7a6a", 0.6);
  brush.arc(480, 200, 150, 180, 360);

  brush.noField();

  // --- Spray drips: thin vertical spray lines suggesting drips ---
  brush.set("spray", "#c0392b", 1.2);
  brush.line(150, 280, 145, 420);
  brush.line(160, 280, 158, 400);
  brush.line(170, 280, 168, 380);

  brush.set("spray", "#1abc9c", 1.0);
  brush.line(460, 380, 455, 520);
  brush.line(475, 380, 472, 500);

  brush.set("spray", "#f39c12", 0.9);
  brush.line(350, 180, 345, 300);
  brush.line(365, 180, 362, 280);

  // --- Final dark marker bold X marks ---
  brush.set("marker", "#1a1a2e", 1.6);
  brush.noField();
  // X mark 1
  brush.line(510, 60, 560, 110);
  brush.line(560, 60, 510, 110);
  // X mark 2
  brush.line(30, 540, 70, 580);
  brush.line(70, 540, 30, 580);

  // --- 2H pencil: very faint ghosted construction lines ---
  brush.set("2H", "#aaaaaa", 0.4);
  brush.wiggle(1);
  brush.line(0, 300, 600, 300);
  brush.line(300, 0, 300, 600);
  brush.line(0, 0, 600, 600);
  brush.line(600, 0, 0, 600);

  brush.noField();

  noLoop();
}