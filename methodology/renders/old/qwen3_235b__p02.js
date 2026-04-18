function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  brush.set("2H", "#333", 0.8);
  brush.line(100, 500, 130, 300);
  brush.line(130, 300, 110, 250);
  brush.line(130, 300, 150, 270);
  brush.line(130, 300, 140, 330);

  brush.set("2B", "#222", 1.2);
  brush.line(200, 500, 240, 280);
  brush.line(240, 280, 220, 220);
  brush.line(240, 280, 260, 250);
  brush.line(240, 280, 250, 310);

  brush.set("HB", "#444", 1);
  brush.line(300, 500, 350, 290);
  brush.line(350, 290, 330, 240);
  brush.line(350, 290, 370, 260);
  brush.line(350, 290, 360, 320);

  brush.set("cpencil", "#555", 0.9);
  brush.line(400, 500, 440, 270);
  brush.line(440, 270, 420, 210);
  brush.line(440, 270, 460, 240);
  brush.line(440, 270, 450, 300);

  brush.set("pen", "#3a3a3a", 0.7);
  brush.line(150, 520, 180, 310);
  brush.line(180, 310, 160, 260);
  brush.line(180, 310, 190, 340);

  for (let i = 0; i < 3; i++) {
    let x = 500 + random(-10, 10);
    let y = 500 + random(-10, 10);
    brush.set("2H", "#444", 0.6);
    brush.line(x, y, x + 20, y - 200);
    brush.line(x + 20, y - 200, x + 15, y - 230);
    brush.line(x + 20, y - 200, x + 25, y - 190);
  }

  brush.set("HB", "#333", 0.8);
  brush.hatch(4, -30);
  brush.hatchStyle("HB", "#333", 0.8);
  let stem1 = new brush.Polygon([[125, 250], [128, 248], [128, 220], [125, 222]]);
  stem1.hatch(4, -30);

  brush.set("2B", "#222", 1.1);
  brush.hatch(6, 45);
  let seedHead1 = new brush.Polygon([[110, 245], [115, 240], [112, 220], [108, 222]]);
  seedHead1.hatch(6, 45);

  brush.set("HB", "#333", 0.9);
  brush.hatch(5, 0);
  let stem2 = new brush.Polygon([[348, 290], [352, 288], [352, 260], [348, 262]]);
  stem2.hatch(5, 0);

  brush.set("2B", "#222", 1);
  brush.hatch(7, 60);
  let seedHead2 = new brush.Polygon([[330, 235], [338, 230], [335, 210], [328, 215]]);
  seedHead2.hatch(7, 60);

  brush.set("cpencil", "#444", 1);
  brush.hatch(8, -45);
  let stem3 = new brush.Polygon([[448, 270], [452, 268], [452, 240], [448, 242]]);
  stem3.hatch(8, -45);

  brush.set("2B", "#222", 1.2);
  brush.hatch(6, 30);
  let seedHead3 = new brush.Polygon([[420, 205], [428, 200], [425, 180], [418, 185]]);
  seedHead3.hatch(6, 30);

  for (let i = 0; i < 20; i++) {
    let x = 100 + random(-20, 500);
    let y = 100 + random(-20, 400);
    if (random() > 0.7) {
      brush.set("2H", "#555", 0.5);
      brush.line(x, y, x + random(2, 5), y - random(30, 60));
    }
  }

  noLoop();
}