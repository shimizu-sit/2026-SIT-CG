float angle = 0;

void setup() {
  size(700, 400);
  rectMode(CENTER);
}

void draw() {
  background(245);
  translate(width / 2, height / 2);

  pushMatrix();
  rotate(angle);
  fill(80, 160, 220);
  rect(110, 0, 120, 50);
  popMatrix();

  pushMatrix();
  rotate(-angle * 2);
  fill(240, 120, 80);
  rect(-110, 0, 120, 50);
  popMatrix();

  angle += radians(2);
}
