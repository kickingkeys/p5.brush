let palette = ["#d2b48c", "#8f9779", "#c87d55", "#6b5b4e", "#e6d5c3", "#a3a897", "#b86b5d", "#4a535c", "#7a8b8b", "#d9a05b"];

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  let blocks = [];
  
  function splitRect(x, y, w, h, depth) {
    if (depth === 0) {
      blocks.push({ x, y, w, h });
      return;
    }
    if (w > h && w > 120) {
      let split = random(0.3, 0.7) * w;
      splitRect(x, y, split, h, depth - 1);
      splitRect(x + split, y, w - split, h, depth - 1);
    } else if (h > 120) {
      let split = random(0.3, 0.7) * h;
      splitRect(x, y, w, split, depth - 1);
      splitRect(x, y + split, w, h - split, depth - 1);
    } else {
      blocks.push({ x, y, w, h });
    }
  }

  splitRect(40, 40, 520, 520, 4);

  for (let i = 0; i < 7; i++) {
    blocks.push({
      x: random(30, 400),
      y: random(30, 400),
      w: random(80, 220),
      h: random(80, 220)
    });
  }

  for (let b of blocks) {
    let col = random(palette);
    let treatment = random(["hatch", "mass", "fill", "hatch_and_fill", "hatch"]); 

    brush.noStroke();
    brush.noFill();
    brush.noHatch();
    brush.noMass();

    if (treatment === "mass") {
      brush.mass(random(["cpencil", "pastel", "crayon"]), col, {
        precision: random(0.2, 0.5),
        strength: random(0.6, 1),
        outline: true
      });
      brush.rect(b.x, b.y, b.w, b.h);
    } else {
      if (treatment === "fill" || treatment === "hatch_and_fill") {
        brush.fill(col, random(50, 140));
        brush.fillBleed(random(0.1, 0.3), "out");
      }

      if (treatment === "hatch" || treatment === "hatch_and_fill") {
        let hCol = treatment === "hatch_and_fill" ? random(palette) : col;
        brush.set(random(["pen", "rotring", "HB", "2H", "2B"]), hCol, random(0.6, 1.2));
        brush.hatch(random(4, 10), random([0, 45, 90, 135, 85, 5]), {
          rand: random(0, 0.1),
          continuous: random() > 0.4,
          gradient: random(0, 0.25)
        });
      }

      if (treatment === "fill") {
        brush.noStroke();
      } else if (treatment !== "hatch_and_fill") {
        brush.stroke(col);
      } else {
        brush.stroke(random(["#3a3a3a", col]));
      }

      let rx = b.x + random(-5, 5);
      let ry = b.y + random(-5, 5);
      let rw = b.w + random(-10, 10);
      let rh = b.h + random(-10, 10);
      brush.rect(rx, ry, rw, rh);
    }
  }

  brush.noFill();
  brush.noHatch();
  brush.noMass();
  
  for (let i = 0; i < 15; i++) {
    brush.set(random(["charcoal", "2B", "cpencil"]), random(["#2b2b2b", "#4a535c", "#6b5b4e"]), random(0.8, 1.5));
    let x1 = random(20, 580);
    let y1 = random(20, 580);
    let isVert = random() > 0.5;
    let len = random(100, 450);

    if (isVert) {
      brush.line(x1, y1, x1 + random(-10, 10), y1 + len);
    } else {
      brush.line(x1, y1, x1 + len, y1 + random(-10, 10));
    }
  }

  noLoop();
}