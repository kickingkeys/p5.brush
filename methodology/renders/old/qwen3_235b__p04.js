function setup() {
  createCanvas(600, 600, WEBGL)
  brush.scaleBrushes(3)
}

function draw() {
  background("#fffaf3")
  translate(-width/2, -height/2)

  // Set angle mode for consistent angles
  angleMode(DEGREES)

  // Define a palette of unexpected colored pencil tones
  const colors = ["#c47ba5", "#8a5a9c", "#5a8c9c", "#a0c4a5", "#d4a08a", "#6b8c7a", "#b57a4c"]

  // Subtle wobble to make strokes feel organic
  brush.wiggle(2)

  // Base face shape with soft 2B pencil in mauve
  brush.set("2B", "#c47ba5", 1.2)
  brush.noFill()
  brush.beginShape(0.3)
  brush.vertex(300, 180)
  brush.vertex(200, 240)
  brush.vertex(220, 480)
  brush.vertex(380, 480)
  brush.vertex(400, 240)
  brush.vertex(300, 180)
  brush.endShape(true)

  // Jawline with broken strokes in dusty blue
  brush.set("HB", "#5a8c9c", 0.9)
  brush.line(220, 480, 260, 500)
  brush.line(380, 480, 340, 500)

  // Cheek tones with soft pastel layers
  brush.set("pastel", "#d4a08a", 1.5)
  brush.fill("#d4a08a", 80)
  brush.noStroke()
  brush.circle(240, 300, 60, 0.3)
  brush.circle(360, 300, 60, 0.3)

  // Nose with light 2H in unexpected green
  brush.set("2H", "#6b8c7a", 0.7)
  brush.strokeWeight(0.8)
  brush.line(290, 320, 310, 360)

  // Eye sockets as hollows with charcoal
  brush.set("charcoal", "#222", 1)
  brush.fill("#1a1a1a", 60)
  brush.noStroke()
  brush.ellipse(270, 260, 40, 25)
  brush.ellipse(330, 260, 40, 25)

  // Eyebrows with crayon in violet
  brush.set("crayon", "#8a5a9c", 1.3)
  brush.strokeWeight(1.1)
  brush.line(260, 240, 290, 230)
  brush.line(310, 230, 340, 240)

  // Lips with layered pastel and HB
  brush.set("pastel", "#b57a4c", 1.1)
  brush.fill("#b57a4c", 90)
  brush.stroke("#8a5a9c")
  brush.strokeWeight(0.6)
  brush.beginShape(0.4)
  brush.vertex(290, 380)
  brush.vertex(300, 400)
  brush.vertex(310, 380)
  brush.vertex(300, 390)
  brush.endShape(true)

  // Hair implied with wild strokes in deep blue and violet
  brush.set("cpencil", "#5a8c9c", 1.6)
  for (let i = 0; i < 12; i++) {
    const x = random(230, 370)
    const y = random(160, 240)
    brush.line(x, y, x + random(-40, 40), y + random(-60, -20))
  }

  brush.set("cpencil", "#8a5a9c", 1.4)
  for (let i = 0; i < 8; i++) {
    const x = random(250, 350)
    const y = random(170, 230)
    brush.line(x, y, x + random(-30, 30), y + random(-50, -10))
  }

  // Forehead and cheek with faint hatch in green
  brush.hatch(8, 15, { rand: 0.2, gradient: 0.4 })
  brush.hatchStyle("2H", "#6b8c7a", 0.6)
  brush.rect(260, 220, 80, 100, "corner")
  brush.noHatch()

  // Final stray marks to suggest memory fading
  brush.set("pen", "#c47ba5", 0.5)
  brush.line(200, 200, 230, 220)
  brush.line(400, 200, 370, 220)
  brush.line(250, 500, 270, 480)
  brush.line(350, 500, 330, 480)

  // Add faint spray texture for paper grain
  brush.set("spray", "#d4a08a", 0.8)
  brush.strokeWeight(0.4)
  for (let i = 0; i < 50; i++) {
    const x = random(200, 400)
    const y = random(180, 500)
    brush.point(x, y)
  }

  noLoop()
}