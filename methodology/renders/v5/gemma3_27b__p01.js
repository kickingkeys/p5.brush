function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  const palette = ["#d7a6a1", "#c88f91", "#d7b07c", "#c79a5e", "#b9874c"];
  noStroke();

  for (let i = 0; i < 40; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const r = random(40, 100);

    brush.fill(random(palette), random(30, 65));
    brush.fillBleed(random(0.3, 0.5), "out");
    brush.circle(x, y, r);
  }

  noFill();
  brush.set("2B", "#333", 0.5);
  for (let i = 0; i < 10; i++) {
    const x = random(50, 550);
    const y = random(50, 550);
    const r = random(20, 60);
    brush.circle(x, y, r);
  }

  noLoop();
}