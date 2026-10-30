void setup() {
  size(600, 400, P3D);
  sphereDetail(16);
}

void draw() {
  background(245);
  translate(width / 2, height / 2);

  pushMatrix();
  translate(-160, 0, -100);
  fill(100, 150, 230);
  sphere(50);
  popMatrix();

  pushMatrix();
  translate(0, 0, 0);
  fill(240, 150, 80);
  sphere(50);
  popMatrix();

  pushMatrix();
  translate(160, 0, 100);
  fill(110, 190, 120);
  sphere(50);
  popMatrix();

}
