const palette = ["#d4b872", "#9e5c41", "#687f87", "#7a8266", "#b0a99f", "#e6d5c3", "#c26d5c"];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  background("#fffaf3");
}

function draw() {
  translate(-width/2, -height/2);
  
  brush.wiggle(1.5);
  brush.noFill();

  let rects = [];
  for (let i = 0; i < 35; i++) {
    let x = floor(random(-100, 550) / 40) * 40;
    let y = floor(random(-100, 550) / 40) * 40;
    let w = floor(random(80, 400) / 40) * 40;
    let h = floor(random(80, 400) / 40) * 40;
    rects.push({ x, y, w, h });
  }

  rects.sort((a, b) => (b.w * b.h) - (a.w * a.h));

  for (let r of rects) {
    let c1 = random(palette);
    let c2 = random(palette);

    brush.noStroke();

    brush.hatchStyle("cpencil", c1, 0.9);
    brush.hatch(random(3.5, 6), random([0, 45, 90, 135]), { rand: 0.1, continuous: true });
    brush.rect(r.x, r.y, r.w, r.h);
    brush.noHatch();

    if (random() > 0.3) {
      brush.hatchStyle("cpencil", c2, 0.7);
      brush.hatch(random(4.5, 8), random([0, 45, 90, 135, 15, 75]), { rand: 0.1, continuous: true });
      brush.rect(r.x, r.y, r.w, r.h);
      brush.noHatch();
    }

    if (random() > 0.75) {
      brush.hatchStyle("rotring", "#4a4a4a", 0.4);
      brush.hatch(2.5, random([0, 90]), { rand: 0.05, continuous: true });
      brush.rect(r.x, r.y, r.w, r.h);
      brush.noHatch();
    }

    if (random() > 0.15) {
      brush.set("pen", "#333333", random(0.6, 1.4));
      let ext = 30;
      
      brush.line(r.x - random(ext), r.y, r.x + r.w + random(ext), r.y);
      brush.line(r.x, r.y - random(ext), r.x, r.y + r.h + random(ext));
      brush.line(r.x - random(ext), r.y + r.h, r.x + r.w + random(ext), r.y + r.h);
      brush.line(r.x + r.w, r.y - random(ext), r.x + r.w, r.y + r.h + random(ext));
    }
  }

  brush.noField();
  noLoop();
}