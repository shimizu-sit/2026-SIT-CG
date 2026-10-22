void setup() {
  size(700, 350);
  rectMode(CENTER);
}

void draw() {
  background(245);

  pushMatrix();
  translate(170, height / 2);
  translate(80, 0);
  rotate(radians(30));
  fill(80, 160, 220);
  rect(0, 0, 140, 60);
  popMatrix();

  pushMatrix();
  translate(530, height / 2);
  rotate(radians(30));
  translate(80, 0);
  fill(240, 120, 80);
  rect(0, 0, 140, 60);
  popMatrix();
}
