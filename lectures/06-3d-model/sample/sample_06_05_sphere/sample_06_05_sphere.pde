void setup() {
  size(720, 320, P3D);
}

void draw() {
  background(245);

  pushMatrix();
  translate(180, height / 2);
  sphereDetail(6);
  fill(100, 160, 230);
  sphere(90);
  popMatrix();

  pushMatrix();
  translate(540, height / 2);
  sphereDetail(30);
  fill(240, 150, 90);
  sphere(90);
  popMatrix();

}
