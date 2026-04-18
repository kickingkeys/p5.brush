function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);
  
  randomSeed(8765);
  
  brush.noStroke();
  brush.noFill();

  brush.hatchStyle("2H", "#888", 0.5);
  brush.hatch(10, 45, { rand: 0.15, continuous: true });
  brush.rect(-50, -50, 700, 700);
  brush.hatch(10, 135, { rand: 0.15, continuous: true });
  brush.rect(-50, -50, 700, 700);

  for (let i = 0; i < 40; i++) {
    let x = random(-50, 650);
    let w = random(10, 25);
    brush.hatchStyle("pen", "#444", 0.6);
    brush.hatch(random(3, 6), random(87, 93), { rand: 0.1 });
    brush.rect(x, -50, w, 700);
  }

  for (let i = 0; i < 45; i++) {
    let x = random(-20, 620);
    let w = random(15, 40);
    let hAngle = random(88, 92);
    let dist = random(2, 4.5);

    brush.hatchStyle("rotring", "#222", 0.8);
    brush.hatch(dist, hAngle, { rand: 0.05, continuous: true });
    brush.rect(x, -50, w, 700);

    if (random() > 0.3) {
      brush.hatchStyle("rotring", "#222", 0.5);
      brush.hatch(dist * 1.5, hAngle + random(80, 100), { rand: 0.1 });
      brush.rect(x, -50, w, 700);
    }
    
    if (random() > 0.4) {
      let bx = x + w / 2;
      let by = random(50, 350);
      let bw = random(60, 180);
      let bh = random(6, 14);
      let bAngle = random() > 0.5 ? random(15, 45) : random(135, 165);
      
      push();
      translate(bx, by);
      rotate(bAngle);
      brush.hatchStyle("pen", "#1a1a1a", 0.7);
      brush.hatch(2.5, 0, { rand: 0.1, continuous: true });
      brush.rect(0, 0, bw, bh);
      
      if (random() > 0.5) {
        brush.hatchStyle("pen", "#1a1a1a", 0.4);
        brush.hatch(3, 90, { rand: 0.1 });
        brush.rect(0, 0, bw, bh);
      }
      pop();
    }
  }

  for (let i = 0; i < 18; i++) {
    let x = random(-20, 600);
    let w = random(35, 70);
    
    brush.hatchStyle("rotring", "#0a0a0a", 1.2);
    brush.hatch(2, random(89, 91), { rand: 0.02, continuous: true });
    brush.rect(x, -50, w, 700);

    brush.hatchStyle("rotring", "#0a0a0a", 0.9);
    brush.hatch(3.5, random(10, 20), { rand: 0.05 });
    brush.rect(x, -50, w, 700);

    brush.hatchStyle("rotring", "#0a0a0a", 0.9);
    brush.hatch(3.5, random(160, 170), { rand: 0.05 });
    brush.rect(x, -50, w, 700);
  }

  for (let i = 0; i < 90; i++) {
    let cx = random(-50, 650);
    let cy = random(400, 650);
    let r = random(40, 160);
    let a = random(360);
    let d = random(1.5, 5);
    
    brush.hatchStyle(random() > 0.5 ? "pen" : "rotring", "#050505", random(0.7, 1.3));
    brush.hatch(d, a, { rand: 0.1, continuous: true });
    brush.circle(cx, cy, r);
    
    if (random() > 0.4) {
      brush.hatchStyle("pen", "#050505", random(0.5, 1.0));
      brush.hatch(d * 1.2, a + random(70, 110), { rand: 0.1, continuous: true });
      brush.circle(cx, cy, r);
    }
  }
  
  for (let i = 0; i < 50; i++) {
    let px = random(-50, 650);
    let py = random(480, 650);
    let pts = [];
    let sides = floor(random(3, 7));
    for (let j = 0; j < sides; j++) {
      pts.push([px + random(-90, 90), py + random(-90, 90)]);
    }
    
    brush.hatchStyle("rotring", "#000000", random(1.0, 1.5));
    brush.hatch(random(1.5, 3), random(360), { rand: 0.05, continuous: true });
    brush.polygon(pts);
    
    brush.hatchStyle("rotring", "#000000", random(0.8, 1.2));
    brush.hatch(random(2, 4), random(360), { rand: 0.05, continuous: true });
    brush.polygon(pts);
  }

  noLoop();
}