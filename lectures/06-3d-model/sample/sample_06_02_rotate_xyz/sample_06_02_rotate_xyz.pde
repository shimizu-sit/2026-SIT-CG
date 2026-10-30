void setup() {
  size(720, 260, P3D);
  rectMode(CENTER);
}

void draw() {
  background(245);
  float angle = radians(30);

  pushMatrix();
  translate(120, height / 2);
  rotateX(angle);
  fill(80, 160, 220);
  box(100, 60, 40);
  popMatrix();

  pushMatrix();
  translate(360, height / 2);
  rotateY(angle);
  fill(240, 150, 80);
  box(100, 60, 40);
  popMatrix();

  pushMatrix();
  translate(600, height / 2);
  rotateZ(angle);
  fill(120, 190, 120);
  box(100, 60, 40);
  popMatrix();

}
