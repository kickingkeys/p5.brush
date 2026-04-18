function setup() {
  createCanvas(600, 600, WEBGL);
  brush.scaleBrushes(3);
}

function draw() {
  background("#fffaf3");
  translate(-width/2, -height/2);

  // Set up smudge effect with charcoal
  brush.set("charcoal", "#333", 1.8);
  brush.wiggle(4);

  // Draw trailing smudges first - implied motion
  brush.strokeWeight(2.5);
  brush.line(200, 400, 320, 280);
  brush.line(210, 410, 340, 290);
  brush.line(195, 395, 310, 270);

  // Light structure with HB
  brush.set("HB", "#555", 1.2);
  brush.line(280, 320, 300, 240); // raised leg
  brush.line(300, 240, 340, 200); // extended arm
  brush.line(280, 320, 240, 380); // torso down
  brush.line(240, 380, 260, 440); // back leg
  brush.line(240, 380, 200, 360); // forward arm

  // Reinforce silhouette with 2B charcoal
  brush.set("2B", "#000", 1.5);
  brush.strokeWeight(1.8);
  brush.line(300, 240, 340, 200); // arm
  brush.line(280, 320, 300, 240); // raised leg
  brush.line(280, 320, 240, 380); // torso
  brush.line(240, 380, 260, 440); // back leg
  brush.line(240, 380, 200, 360); // arm

  // Head and facial features with fine HB
  brush.set("HB", "#000", 0.8);
  brush.circle(310, 220, 15);
  brush.line(318, 215, 330, 210); // gaze forward

  // Add dynamic gestural lines with charcoal
  brush.set("charcoal", "#000", 2);
  brush.strokeWeight(2.2);
  brush.line(340, 200, 380, 180); // arm extension
  brush.line(260, 440, 290, 460); // foot push

  // Smudge overlay with low-opacity charcoal
  brush.set("charcoal", "#000", 0.6);
  brush.strokeWeight(3);
  brush.line(340, 200, 370, 190);
  brush.line(260, 440, 280, 470);

  // Final emphasis on key contours with 2B
  brush.set("2B", "#000", 1.7);
  brush.strokeWeight(2);
  brush.line(300, 240, 340, 200);
  brush.line(280, 320, 300, 240);
  brush.line(240, 380, 260, 440);

  // Suggestive ground shadow with spray
  brush.set("spray", "#000", 0.3);
  brush.strokeWeight(4);
  brush.circle(250, 450, 40);

  noLoop();
}