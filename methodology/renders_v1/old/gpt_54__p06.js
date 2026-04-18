function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width / 2, -height / 2);

  randomSeed(24);
  noiseSeed(24);

  // subtle paper breath
  brush.noField();
  brush.noHatch();
  brush.noFill();
  brush.set("2H", "#d8cfc2", 0.35);
  for (let i = 0; i < 90; i++) {
    let x = random(20, 580);
    let y = random(20, 580);
    let len = random(8, 22);
    let a = random(-20, 20);
    push();
    translate(x, y);
    rotate(a);
    brush.line(-len * 0.5, 0, len * 0.5, 0);
    pop();
  }

  // custom swirling wind field
  brush.addField("swirlwind", function(t, field) {
    let cx1 = 180;
    let cy1 = 220;
    let cx2 = 430;
    let cy2 = 360;

    for (let col = 0; col < field.length; col++) {
      for (let row = 0; row < field[0].length; row++) {
        let x = map(col, 0, field.length - 1, 0, width);
        let y = map(row, 0, field[0].length - 1, 0, height);

        let a1 = atan2(y - cy1, x - cx1) + 90;
        let a2 = atan2(y - cy2, x - cx2) - 90;
        let mixAmt = 0.55 + 0.45 * sin((x + y) * 0.02);
        let ang = lerp(a1, a2, mixAmt);

        ang += map(noise(x * 0.008, y * 0.008), 0, 1, -22, 22);
        field[col][row] = ang;
      }
    }
    return field;
  });

  // faint wind traces
  brush.field("swirlwind");
  brush.set("2H", "#d7cec1", 0.45);
  for (let i = 0; i < 55; i++) {
    let x = random(40, 560);
    let y = random(40, 560);
    brush.flowLine(x, y, random(24, 70), random(-15, 15));
  }

  // flock paths + birds
  let flockCount = 42;
  for (let i = 0; i < flockCount; i++) {
    let x = random(60, 540);
    let y = random(70, 530);

    let tone = random();
    let bodyBrush = tone < 0.45 ? "marker" : tone < 0.75 ? "pen" : "rotring";
    let wingBrush = random() < 0.35 ? "HB" : bodyBrush;

    let birdCol = random() < 0.18 ? "#61564a" : "#2f2a26";
    let scale = random(0.65, 1.45);

    // invisible wind path suggested by trailing gesture
    if (random() < 0.9) {
      brush.set("2H", "#cfc5b7", 0.28 * scale);
      brush.flowLine(x, y, random(18, 46) * scale, random(-12, 12));
    }

    // bird gesture
    push();
    translate(x, y);

    let dir = brushFieldAngleAtPoint(x, y);
    rotate(dir + random(-22, 22));

    let flap = random(18, 42);
    let span = random(8, 18) * scale;
    let lift = random(5, 14) * scale;
    let body = random(2, 5) * scale;

    brush.noField();

    // wings
    brush.set(wingBrush, birdCol, 0.7 * scale);
    brush.beginStroke("curve", -span, 2);
    brush.move(-flap * 0.45, span * 0.55, 0.95);
    brush.endStroke(-flap * 0.95, 0.35);

    brush.beginStroke("curve", span, 2);
    brush.move(180 + flap * 0.45, span * 0.55, 0.95);
    brush.endStroke(180 + flap * 0.95, 0.35);

    // body dart
    if (random() < 0.85) {
      brush.set(bodyBrush, birdCol, 0.55 * scale);
      brush.line(-body * 0.4, 0, body * 0.8, -lift * 0.12);
    }

    // occasional extra flick for speed
    if (random() < 0.35) {
      brush.set("marker", birdCol, 0.35 * scale);
      brush.line(-body * 0.2, 0.8, body * 0.4, 1.4);
    }

    pop();

    brush.field("swirlwind");
  }

  // a few closer birds with bolder gestures
  for (let i = 0; i < 9; i++) {
    let x = random(90, 510);
    let y = random(120, 500);
    let scale = random(1.5, 2.3);
    let dir = brushFieldAngleAtPoint(x, y);

    push();
    translate(x, y);
    rotate(dir + random(-18, 18));

    let flap = random(24, 40);
    let span = random(12, 18) * scale;
    let body = random(3, 5) * scale;
    let col = "#241f1b";

    brush.noField();
    brush.set("marker", col, 0.9 * scale);
    brush.beginStroke("curve", -span, 3);
    brush.move(-flap * 0.4, span * 0.6, 1.0);
    brush.endStroke(-flap, 0.28);

    brush.beginStroke("curve", span, 3);
    brush.move(180 + flap * 0.4, span * 0.6, 1.0);
    brush.endStroke(180 + flap, 0.28);

    brush.set("pen", col, 0.55 * scale);
    brush.line(-body * 0.4, 0, body, -0.4);

    pop();

    brush.field("swirlwind");
  }

  // lightly anchor composition with a few airy charcoal sweeps
  brush.noField();
  brush.set("charcoal", "#c8bcaa", 0.3);
  for (let i = 0; i < 7; i++) {
    let pts = [];
    let x0 = random(40, 560);
    let y0 = random(50, 550);
    for (let j = 0; j < 4; j++) {
      pts.push([
        x0 + j * random(20, 45),
        y0 + sin(j * 35 + random(360)) * random(8, 20)
      ]);
    }
    brush.spline(pts, 0.65);
  }

  noLoop();
}

function brushFieldAngleAtPoint(x, y) {
  let cx1 = 180;
  let cy1 = 220;
  let cx2 = 430;
  let cy2 = 360;

  let a1 = atan2(y - cy1, x - cx1) + 90;
  let a2 = atan2(y - cy2, x - cx2) - 90;
  let mixAmt = 0.55 + 0.45 * sin((x + y) * 0.02);
  let ang = lerp(a1, a2, mixAmt);
  ang += map(noise(x * 0.008, y * 0.008), 0, 1, -22, 22);
  return ang;
}